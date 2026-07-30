import axios from "axios";

import {
  tokenService,
} from "../services/tokenService";
import { ROUTES } from "../utils/routePaths";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? "http://localhost:8080/api/v1"
    : "");

if (!API_BASE_URL) {
  throw new Error(
    "VITE_API_BASE_URL is required in production.",
  );
}

const API_TIMEOUT = Number(
  import.meta.env.VITE_API_TIMEOUT ||
    180000,
);

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,

  headers: {
    Accept: "application/json",
  },
});

const refreshClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,

  headers: {
    "Content-Type":
      "application/json",

    Accept:
      "application/json",
  },
});

let refreshPromise = null;

const activeRequestControllers =
  new Set();

function getLoginRoute() {
  return ROUTES.LOGIN || "/login";
}

function redirectTo(path) {
  const targetPath =
    path || getLoginRoute();

  if (
    window.location.pathname ===
    targetPath
  ) {
    return;
  }

  window.location.replace(
    targetPath,
  );
}

function removeRequestController(
  config,
) {
  const controller =
    config?._requestAbortController;

  if (!controller) {
    return;
  }

  activeRequestControllers.delete(
    controller,
  );
}

export function cancelAllRequests(
  reason = "Request cancelled",
) {
  activeRequestControllers.forEach(
    (controller) => {
      if (
        !controller.signal.aborted
      ) {
        controller.abort(reason);
      }
    },
  );

  activeRequestControllers.clear();
}

export function isRequestCancelled(
  error,
) {
  return (
    axios.isCancel(error) ||
    error?.code === "ERR_CANCELED" ||
    error?.name === "CanceledError" ||
    error?.name === "AbortError"
  );
}

function clearAuthenticationAndRedirect() {
  /*
   * Token pehle clear karo, taaki koi
   * nayi protected request start na ho.
   */
  tokenService.clearSession();

  /*
   * Existing profile/notification requests
   * turant cancel karo.
   */
  cancelAllRequests(
    "Authentication session ended",
  );

  redirectTo(
    getLoginRoute(),
  );
}

async function refreshAccessToken() {
  const refreshToken =
    tokenService.getRefreshToken();

  if (!refreshToken) {
    throw new Error(
      "Refresh token is unavailable.",
    );
  }

  const response =
    await refreshClient.post(
      "/auth/refresh-token",
      {
        refreshToken,
      },
    );

  const responseBody =
    response?.data?.data ??
    response?.data;

  const newAccessToken =
    responseBody?.accessToken;

  const newRefreshToken =
    responseBody?.refreshToken ||
    refreshToken;

  if (!newAccessToken) {
    throw new Error(
      "Access token was not returned.",
    );
  }

  tokenService.setTokens({
    accessToken:
      newAccessToken,

    refreshToken:
      newRefreshToken,
  });

  return newAccessToken;
}

axiosClient.interceptors.request.use(
  (config) => {
    const accessToken =
      tokenService.getAccessToken();

    config.headers =
      config.headers || {};

    if (accessToken) {
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    /*
     * Component ne khud AbortSignal nahi diya,
     * to request ko global logout cancellation
     * system me register karo.
     */
    if (!config.signal) {
      const controller =
        new AbortController();

      activeRequestControllers.add(
        controller,
      );

      config.signal =
        controller.signal;

      config._requestAbortController =
        controller;
    }

    return config;
  },

  (error) =>
    Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => {
    removeRequestController(
      response.config,
    );

    return response;
  },

  async (error) => {
    const originalRequest =
      error.config;

    removeRequestController(
      originalRequest,
    );

    if (isRequestCancelled(error)) {
      return Promise.reject(error);
    }

    const status =
      error.response?.status;

    const requestUrl =
      originalRequest?.url || "";

    const isLoginRequest =
      requestUrl.includes(
        "/auth/login",
      );

    const isRegisterRequest =
      requestUrl.includes(
        "/auth/register",
      );

    const isRefreshRequest =
      requestUrl.includes(
        "/auth/refresh-token",
      );

    const isLogoutRequest =
      requestUrl.includes(
        "/auth/logout",
      );

    const isPublicAuthRequest =
      isLoginRequest ||
      isRegisterRequest ||
      isRefreshRequest ||
      isLogoutRequest;

    /*
     * Logout ke baad React component agar
     * /users/me ya notification API dubara call
     * kare aur 401 aaye, retry mat karo.
     * Login page par immediately bhejo.
     */
    if (
      status === 401 &&
      !isPublicAuthRequest &&
      !tokenService.hasSession()
    ) {
      clearAuthenticationAndRedirect();

      return Promise.reject(error);
    }

    /*
     * Active session me access token expire hua
     * ho to refresh token se ek baar retry karo.
     */
    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isPublicAuthRequest &&
      tokenService.hasSession()
    ) {
      originalRequest._retry =
        true;

      try {
        if (!refreshPromise) {
          refreshPromise =
            refreshAccessToken()
              .finally(() => {
                refreshPromise =
                  null;
              });
        }

        const accessToken =
          await refreshPromise;

        originalRequest.headers =
          originalRequest.headers ||
          {};

        originalRequest
          .headers
          .Authorization =
          `Bearer ${accessToken}`;

        /*
         * Purana AbortSignal completed ho sakta
         * hai, retry ke liye naya signal banega.
         */
        delete originalRequest.signal;
        delete originalRequest
          ._requestAbortController;

        return axiosClient(
          originalRequest,
        );
      } catch (refreshError) {
        clearAuthenticationAndRedirect();

        return Promise.reject(
          refreshError,
        );
      }
    }

    if (
      status === 403 &&
      !isPublicAuthRequest
    ) {
      redirectTo(
        ROUTES.FORBIDDEN ||
          "/forbidden",
      );
    }

    if (
      status >= 500 &&
      import.meta.env.PROD
    ) {
      console.error(
        "Server request failed:",
        {
          method:
            originalRequest?.method,

          url:
            originalRequest?.url,

          status,
        },
      );
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
import axios from "axios";

import {
  tokenService,
} from "../services/tokenService";
import { ROUTES } from "../utils/routePaths";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api/v1";

const API_TIMEOUT = Number(
  import.meta.env.VITE_API_TIMEOUT ||
    20000,
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

/*
 * A single refresh request will be shared
 * when multiple requests receive 401 together.
 */
let refreshPromise = null;

/*
 * Tracks every active authenticated request.
 * These requests are cancelled immediately
 * when the user logs out.
 */
const activeRequestControllers =
  new Set();

function redirectTo(path) {
  if (
    !path ||
    window.location.pathname === path
  ) {
    return;
  }

  window.location.replace(path);
}

function createRequestController() {
  const controller =
    new AbortController();

  activeRequestControllers.add(
    controller,
  );

  return controller;
}

function removeRequestController(config) {
  const controller =
    config?._requestAbortController;

  if (!controller) {
    return;
  }

  activeRequestControllers.delete(
    controller,
  );
}

/*
 * Cancels all pending Axios requests.
 * Used during logout and invalid sessions.
 */
export function cancelAllRequests(
  reason = "Session ended",
) {
  activeRequestControllers.forEach(
    (controller) => {
      try {
        controller.abort(reason);
      } catch {
        // Ignore already-aborted controllers.
      }
    },
  );

  activeRequestControllers.clear();
}

/*
 * Axios cancellation helper.
 */
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

  const newAccessToken =
    response.data?.accessToken;

  const newRefreshToken =
    response.data?.refreshToken ||
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

    if (accessToken) {
      config.headers =
        config.headers || {};

      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    /*
     * Do not override a signal explicitly
     * supplied by a component.
     */
    if (!config.signal) {
      const controller =
        createRequestController();

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

    /*
     * Cancellation during logout is expected.
     * Do not refresh tokens or redirect to
     * error pages for cancelled requests.
     */
    if (isRequestCancelled(error)) {
      return Promise.reject(error);
    }

    const status =
      error.response?.status;

    const requestUrl =
      originalRequest?.url || "";

    const isAuthRequest =
      requestUrl.includes(
        "/auth/login",
      ) ||
      requestUrl.includes(
        "/auth/register",
      ) ||
      requestUrl.includes(
        "/auth/logout",
      ) ||
      requestUrl.includes(
        "/auth/refresh-token",
      );

    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthRequest &&
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
         * Old request signal may already
         * be completed or aborted.
         */
        delete originalRequest.signal;
        delete originalRequest
          ._requestAbortController;

        return axiosClient(
          originalRequest,
        );
      } catch (refreshError) {
        cancelAllRequests(
          "Authentication expired",
        );

        tokenService.clearSession();

        redirectTo(
          ROUTES.LOGIN ||
            ROUTES.UNAUTHORIZED ||
            "/login",
        );

        return Promise.reject(
          refreshError,
        );
      }
    }

    if (
      status === 403 &&
      !requestUrl.includes(
        "/auth/",
      )
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
import axios from "axios";

import {
  tokenService,
} from "../services/tokenService";

import {
  ROUTES,
} from "../utils/routePaths";

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

function getForbiddenRoute() {
  return (
    ROUTES.FORBIDDEN ||
    "/forbidden"
  );
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
   * Existing profile, dashboard,
   * notification aur other protected
   * requests ko immediately cancel karo.
   */
  cancelAllRequests(
    "Authentication session ended",
  );

  /*
   * Login page par hard redirect use kiya
   * hai taaki protected React state aur
   * mounted components completely reset ho.
   */
  redirectTo(
    getLoginRoute(),
  );
}

function isPublicAuthenticationRequest(
  requestUrl = "",
) {
  return (
    requestUrl.includes(
      "/auth/login",
    ) ||
    requestUrl.includes(
      "/auth/register",
    ) ||
    requestUrl.includes(
      "/auth/refresh-token",
    ) ||
    requestUrl.includes(
      "/auth/logout",
    ) ||
    requestUrl.includes(
      "/auth/verify-email",
    ) ||
    requestUrl.includes(
      "/auth/resend",
    ) ||
    requestUrl.includes(
      "/auth/forgot-password",
    ) ||
    requestUrl.includes(
      "/auth/reset-password",
    )
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
    responseBody?.accessToken ??
    responseBody?.access_token ??
    responseBody?.token ??
    responseBody?.jwtToken;

  const newRefreshToken =
    responseBody?.refreshToken ??
    responseBody?.refresh_token ??
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
    } else {
      /*
       * Retried ya reused config me purana
       * Authorization header bacha ho to
       * session clear hone ke baad remove karo.
       */
      delete config.headers.Authorization;
    }

    /*
     * Component ne khud AbortSignal nahi diya,
     * to request ko global cancellation
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
      error?.config;

    removeRequestController(
      originalRequest,
    );

    /*
     * Logout ya component unmount ke time
     * cancel hui requests ko authentication
     * error ki tarah process mat karo.
     */
    if (isRequestCancelled(error)) {
      return Promise.reject(error);
    }

    const status =
      error?.response?.status;

    const requestUrl =
      originalRequest?.url || "";

    const isPublicAuthRequest =
      isPublicAuthenticationRequest(
        requestUrl,
      );

    /*
     * Browser ko response nahi mila:
     * possible network issue, backend sleep,
     * DNS issue, timeout ya CORS failure.
     *
     * Is case me 401/403 flow execute nahi
     * karna chahiye because status undefined hai.
     */
    if (!error.response) {
      if (import.meta.env.PROD) {
        console.error(
          "Network request failed:",
          {
            method:
              originalRequest?.method,

            url:
              originalRequest?.url,

            code:
              error?.code,

            message:
              error?.message,
          },
        );
      }

      return Promise.reject(error);
    }

    /*
     * Logout ke baad mounted component agar
     * /users/me, dashboard ya notification API
     * call kare aur backend 401 return kare,
     * refresh attempt mat karo.
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
     * ho to refresh token se sirf ek baar retry.
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
        /*
         * Multiple APIs ek saath 401 dein to
         * sirf ek refresh request execute hogi.
         */
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

        /*
         * Refresh ke wait ke dauran user logout
         * kar sakta hai. Aise case me request
         * retry nahi honi chahiye.
         */
        if (
          !tokenService.hasSession()
        ) {
          throw new Error(
            "Authentication session ended during token refresh.",
          );
        }

        originalRequest.headers =
          originalRequest.headers ||
          {};

        originalRequest
          .headers
          .Authorization =
          `Bearer ${accessToken}`;

        /*
         * Purana AbortSignal completed ya
         * aborted ho sakta hai. Retry request
         * ke liye naya controller create hoga.
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

    /*
     * Public login/register request ka 401/403
     * form component khud display karega.
     * Global redirect nahi karna.
     */
    if (
      status === 401 &&
      isPublicAuthRequest
    ) {
      return Promise.reject(error);
    }

    /*
     * Logout ke baad backend /users/me ko
     * 403 return kare to forbidden page par
     * redirect nahi karna.
     *
     * Session nahi hai to login page correct hai.
     */
    if (
      status === 403 &&
      !isPublicAuthRequest
    ) {
      if (
        !tokenService.hasSession()
      ) {
        clearAuthenticationAndRedirect();

        return Promise.reject(error);
      }

      /*
       * Active valid session ke saath 403 ka
       * meaning authorization/permission denied.
       */
      redirectTo(
        getForbiddenRoute(),
      );

      return Promise.reject(error);
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
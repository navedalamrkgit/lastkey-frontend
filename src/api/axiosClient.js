import axios from "axios";

import {
  tokenService,
} from "../services/tokenService";
import { ROUTES } from "../utils/routePaths";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://localhost:8080/api/v1";

const axiosClient =
  axios.create({
    baseURL: API_BASE_URL,

    timeout: Number(
      import.meta.env
        .VITE_API_TIMEOUT ||
        20000,
    ),

    headers: {
      Accept: "application/json",
    },
  });

const refreshClient =
  axios.create({
    baseURL: API_BASE_URL,

    timeout: Number(
      import.meta.env
        .VITE_API_TIMEOUT ||
        20000,
    ),

    headers: {
      "Content-Type":
        "application/json",
      Accept: "application/json",
    },
  });

let refreshPromise = null;

function redirectTo(path) {
  if (
    window.location.pathname !== path
  ) {
    window.location.assign(path);
  }
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
      config.headers.Authorization =
        `Bearer ${accessToken}`;
    }

    return config;
  },

  (error) =>
    Promise.reject(error),
);

axiosClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest =
      error.config;

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
        "/auth/refresh-token",
      );

    if (
      status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {
      originalRequest._retry = true;

      try {
        if (!refreshPromise) {
          refreshPromise =
            refreshAccessToken().finally(
              () => {
                refreshPromise = null;
              },
            );
        }

        const accessToken =
          await refreshPromise;

        originalRequest.headers.Authorization =
          `Bearer ${accessToken}`;

        return axiosClient(
          originalRequest,
        );
      } catch (refreshError) {
        tokenService.clearTokens();

        redirectTo(
          ROUTES.UNAUTHORIZED,
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
        ROUTES.FORBIDDEN,
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
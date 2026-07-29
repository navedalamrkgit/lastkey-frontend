export const appConfig = {
  appName: import.meta.env.VITE_APP_NAME || "LastKey",

  apiBaseUrl:
    import.meta.env.VITE_API_BASE_URL ||
    "http://localhost:8080/api/v1",

  environment:
    import.meta.env.VITE_APP_ENV || "development",

  tokenKeys: {
    accessToken: "lastkey_access_token",
    refreshToken: "lastkey_refresh_token",
    user: "lastkey_user",
  },

  pagination: {
    defaultPage: 0,
    defaultPageSize: 10,
  },

  upload: {
    maxFileSize: 10 * 1024 * 1024,

    allowedMimeTypes: [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/webp",
    ],
  },
};
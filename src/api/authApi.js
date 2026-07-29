import axiosClient from "./axiosClient";

export const authApi = {
  register(registrationData) {
    return axiosClient.post(
      "/auth/register",
      registrationData,
    );
  },

  login(credentials) {
    return axiosClient.post(
      "/auth/login",
      credentials,
    );
  },

  verifyEmail(verificationData) {
    return axiosClient.post(
      "/auth/verify-email",
      verificationData,
    );
  },

  resendVerificationOtp(email) {
    return axiosClient.post(
      "/auth/resend-verification-otp",
      {
        email,
      },
    );
  },

  forgotPassword(email) {
    return axiosClient.post(
      "/auth/forgot-password",
      {
        email,
      },
    );
  },

  resetPassword(resetData) {
    return axiosClient.post(
      "/auth/reset-password",
      resetData,
    );
  },

  refreshToken(refreshToken) {
    return axiosClient.post(
      "/auth/refresh-token",
      {
        refreshToken,
      },
    );
  },

  logout(refreshToken) {
    return axiosClient.post(
      "/auth/logout",
      {
        refreshToken,
      },
    );
  },
};
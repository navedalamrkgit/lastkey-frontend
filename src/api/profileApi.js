import axiosClient from "./axiosClient";

export const profileApi = {
  getProfile() {
    return axiosClient.get("/users/me");
  },

  updateProfile(profileData) {
    return axiosClient.put(
      "/users/me",
      profileData,
    );
  },

  /**
   * Upload profile image
   * Backend expects multipart/form-data
   */
  updateProfileImage(file) {
    const formData = new FormData();

    formData.append(
      "file",
      file,
    );

    return axiosClient.post(
      "/users/me/profile-image",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      },
    );
  },

  /**
   * Send email verification OTP
   */
  resendEmailVerification() {
    return axiosClient.post(
      "/users/me/email-verification/send",
    );
  },

  /**
   * Verify OTP
   */
  verifyEmailOtp(otp) {
    return axiosClient.post(
      "/users/me/email-verification/verify",
      {
        otp,
      },
    );
  },

  deactivateAccount(password) {
    return axiosClient.post(
      "/users/me/deactivate",
      {
        password,
      },
    );
  },

  /**
   * These endpoints don't exist in the
   * current backend controller.
   * Keep them only after implementing
   * them on the backend.
   */

  getAccountSettings() {
    return Promise.reject(
      new Error(
        "Account settings endpoint is not implemented in backend.",
      ),
    );
  },

  updateAccountSettings() {
    return Promise.reject(
      new Error(
        "Account settings endpoint is not implemented in backend.",
      ),
    );
  },
};
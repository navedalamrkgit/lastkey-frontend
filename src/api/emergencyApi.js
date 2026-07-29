import axiosClient from "./axiosClient";

const EMERGENCY_ENDPOINT = "/emergencies";

export const emergencyApi = {
  /**
   * Create a new emergency request.
   * POST /api/v1/emergencies
   */
  createEmergencyRequest(requestData) {
    return axiosClient.post(
      EMERGENCY_ENDPOINT,
      requestData,
    );
  },

  /**
   * Get current owner's emergency requests.
   * GET /api/v1/emergencies
   */
  getEmergencyRequests(params = {}) {
    return axiosClient.get(
      EMERGENCY_ENDPOINT,
      {
        params,
      },
    );
  },

  /**
   * Get one emergency request.
   * GET /api/v1/emergencies/{id}
   */
  getEmergencyRequestById(
    emergencyRequestId,
  ) {
    return axiosClient.get(
      `${EMERGENCY_ENDPOINT}/${emergencyRequestId}`,
    );
  },

  /**
   * Update an emergency request.
   * PUT /api/v1/emergencies/{id}
   */
  updateEmergencyRequest(
    emergencyRequestId,
    requestData,
  ) {
    return axiosClient.put(
      `${EMERGENCY_ENDPOINT}/${emergencyRequestId}`,
      requestData,
    );
  },

  /**
   * Cancel an emergency request.
   * PATCH /api/v1/emergencies/{id}/cancel
   */
  cancelEmergencyRequest(
    emergencyRequestId,
    actionData = {},
  ) {
    return axiosClient.patch(
      `${EMERGENCY_ENDPOINT}/${emergencyRequestId}/cancel`,
      actionData,
    );
  },

  /**
   * Approve an emergency request.
   * ADMIN only.
   * PATCH /api/v1/emergencies/{id}/approve
   */
  approveEmergencyRequest(
    emergencyRequestId,
    actionData = {},
  ) {
    return axiosClient.patch(
      `${EMERGENCY_ENDPOINT}/${emergencyRequestId}/approve`,
      actionData,
    );
  },

  /**
   * Reject an emergency request.
   * ADMIN only.
   * PATCH /api/v1/emergencies/{id}/reject
   */
  rejectEmergencyRequest(
    emergencyRequestId,
    actionData,
  ) {
    return axiosClient.patch(
      `${EMERGENCY_ENDPOINT}/${emergencyRequestId}/reject`,
      actionData,
    );
  },

  /**
   * Send identity verification OTP.
   * Backend endpoint:
   * POST /api/v1/emergencies/{id}/otp/send
   */
  sendVerificationOtp(
    emergencyRequestId,
  ) {
    return axiosClient.post(
      `${EMERGENCY_ENDPOINT}/${emergencyRequestId}/otp/send`,
    );
  },

  /**
   * Verify emergency OTP.
   *
   * Backend accepts OTP as a request parameter:
   * POST /api/v1/emergencies/{id}/otp/verify?otp=123456
   */
  verifyEmergencyOtp(
    emergencyRequestId,
    verificationData,
  ) {
    const otp =
      typeof verificationData === "string"
        ? verificationData.trim()
        : String(
            verificationData?.otp || "",
          ).trim();

    return axiosClient.post(
      `${EMERGENCY_ENDPOINT}/${emergencyRequestId}/otp/verify`,
      null,
      {
        params: {
          otp,
        },
      },
    );
  },

  /**
   * Get emergency OTP verification status.
   * GET /api/v1/emergencies/{id}/otp/status
   */
  getEmergencyOtpStatus(
    emergencyRequestId,
  ) {
    return axiosClient.get(
      `${EMERGENCY_ENDPOINT}/${emergencyRequestId}/otp/status`,
    );
  },

  /**
   * Compatibility alias for pages that use another method name.
   */
  getOtpVerificationStatus(
    emergencyRequestId,
  ) {
    return axiosClient.get(
      `${EMERGENCY_ENDPOINT}/${emergencyRequestId}/otp/status`,
    );
  },

  /**
   * Get emergency request history.
   * GET /api/v1/emergencies/{id}/history
   */
  getEmergencyRequestHistory(
    emergencyRequestId,
  ) {
    return axiosClient.get(
      `${EMERGENCY_ENDPOINT}/${emergencyRequestId}/history`,
    );
  },

  /**
   * Release approved documents.
   * ADMIN only.
   * POST /api/v1/emergencies/{id}/release
   */
  releaseDocuments(
    emergencyRequestId,
  ) {
    return axiosClient.post(
      `${EMERGENCY_ENDPOINT}/${emergencyRequestId}/release`,
    );
  },

  /**
   * Compatibility method for pages using the old method name.
   */
  releaseEmergencyAccess(
    emergencyRequestId,
  ) {
    return axiosClient.post(
      `${EMERGENCY_ENDPOINT}/${emergencyRequestId}/release`,
    );
  },

  /**
   * Get released documents.
   * GET /api/v1/emergencies/{id}/released-documents
   */
  getReleasedDocuments(
    emergencyRequestId,
  ) {
    return axiosClient.get(
      `${EMERGENCY_ENDPOINT}/${emergencyRequestId}/released-documents`,
    );
  },

  /**
   * Revoke a released document.
   * ADMIN only.
   * PATCH /api/v1/emergencies/releases/{releaseHistoryId}/revoke
   */
  revokeReleasedDocument(
    releaseHistoryId,
    actionData,
  ) {
    return axiosClient.patch(
      `${EMERGENCY_ENDPOINT}/releases/${releaseHistoryId}/revoke`,
      actionData,
    );
  },
};

export default emergencyApi;
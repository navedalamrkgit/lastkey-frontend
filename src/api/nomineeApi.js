import axiosClient from "./axiosClient";

export const nomineeApi = {
  /**
   * Create a new nominee.
   * POST /api/v1/nominees
   */
  createNominee(data) {
    return axiosClient.post("/nominees", data);
  },

  /**
   * Get all nominees.
   * GET /api/v1/nominees
   */
  getNominees(params = {}) {
    return axiosClient.get("/nominees", {
      params,
    });
  },

  /**
   * Get one nominee by ID.
   * GET /api/v1/nominees/{nomineeId}
   */
  getNomineeById(nomineeId) {
    if (!nomineeId) {
      throw new Error("Nominee ID is required.");
    }

    return axiosClient.get(
      `/nominees/${nomineeId}`,
    );
  },

  /**
   * Update nominee details.
   * PATCH /api/v1/nominees/{nomineeId}
   */
  updateNominee(nomineeId, data) {
    if (!nomineeId) {
      throw new Error("Nominee ID is required.");
    }

    return axiosClient.patch(
      `/nominees/${nomineeId}`,
      data,
    );
  },

  /**
   * Soft-delete a nominee.
   * DELETE /api/v1/nominees/{nomineeId}
   */
  deleteNominee(nomineeId) {
    if (!nomineeId) {
      throw new Error("Nominee ID is required.");
    }

    return axiosClient.delete(
      `/nominees/${nomineeId}`,
    );
  },

  /**
   * Mark nominee as primary.
   * PATCH /api/v1/nominees/{nomineeId}/primary
   */
  setPrimaryNominee(nomineeId) {
    if (!nomineeId) {
      throw new Error("Nominee ID is required.");
    }

    return axiosClient.patch(
      `/nominees/${nomineeId}/primary`,
    );
  },

  /**
   * Resend verification OTP.
   * POST /api/v1/nominees/{nomineeId}/resend-verification-otp
   */
  resendVerificationOtp(nomineeId) {
    if (!nomineeId) {
      throw new Error("Nominee ID is required.");
    }

    return axiosClient.post(
      `/nominees/${nomineeId}/resend-verification-otp`,
    );
  },

  /**
   * Verify nominee.
   *
   * Supports:
   * verifyNominee(id, "123456")
   * verifyNominee(id, { otp: "123456" })
   */
  verifyNominee(nomineeId, otpValue) {
    if (!nomineeId) {
      throw new Error("Nominee ID is required.");
    }

    const otp =
      typeof otpValue === "string"
        ? otpValue
        : otpValue?.otp;

    if (!otp) {
      throw new Error("OTP is required.");
    }

    return axiosClient.post(
      `/nominees/${nomineeId}/verify`,
      {
        otp: String(otp).trim(),
      }
    );
  },

  /**
   * Get assigned documents.
   * GET /api/v1/nominees/{nomineeId}/documents
   */
  getAssignedDocuments(nomineeId) {
    if (!nomineeId) {
      throw new Error("Nominee ID is required.");
    }

    return axiosClient.get(
      `/nominees/${nomineeId}/documents`,
    );
  },

  /**
   * Assign document.
   * POST /api/v1/nominees/{nomineeId}/documents/{documentId}
   */
  assignDocument(
    nomineeId,
    documentId,
    permissions,
  ) {
    if (!nomineeId || !documentId) {
      throw new Error(
        "Nominee ID and document ID are required."
      );
    }

    return axiosClient.post(
      `/nominees/${nomineeId}/documents/${documentId}`,
      permissions,
    );
  },

  /**
   * Update document permissions.
   * PATCH /api/v1/nominees/{nomineeId}/documents/{documentId}
   */
  updateDocumentAccess(
    nomineeId,
    documentId,
    permissions,
  ) {
    if (!nomineeId || !documentId) {
      throw new Error(
        "Nominee ID and document ID are required."
      );
    }

    return axiosClient.patch(
      `/nominees/${nomineeId}/documents/${documentId}`,
      permissions,
    );
  },

  /**
   * Remove document access.
   * DELETE /api/v1/nominees/{nomineeId}/documents/{documentId}
   */
  removeDocumentAccess(
    nomineeId,
    documentId,
  ) {
    if (!nomineeId || !documentId) {
      throw new Error(
        "Nominee ID and document ID are required."
      );
    }

    return axiosClient.delete(
      `/nominees/${nomineeId}/documents/${documentId}`,
    );
  },
};

export default nomineeApi;
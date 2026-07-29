import axiosClient from "./axiosClient";

export const documentApi = {
  getDocuments(
    params = {},
  ) {
    return axiosClient.get(
      "/documents",
      {
        params,
      },
    );
  },

  getDocumentById(
    documentId,
  ) {
    return axiosClient.get(
      `/documents/${documentId}`,
    );
  },

  uploadDocument(
    formData,
    onUploadProgress,
  ) {
    /*
     * Do not manually set Content-Type.
     *
     * The browser automatically adds:
     * multipart/form-data; boundary=...
     */
    return axiosClient.post(
      "/documents",
      formData,
      {
        onUploadProgress,
      },
    );
  },

  updateDocument(
    documentId,
    documentData,
  ) {
    return axiosClient.patch(
      `/documents/${documentId}`,
      documentData,
    );
  },

  deleteDocument(
    documentId,
  ) {
    return axiosClient.delete(
      `/documents/${documentId}`,
    );
  },

  downloadDocument(
    documentId,
  ) {
    return axiosClient.get(
      `/documents/${documentId}/download`,
      {
        responseType: "blob",
      },
    );
  },

  previewDocument(
    documentId,
  ) {
    return axiosClient.get(
      `/documents/${documentId}/preview`,
      {
        responseType: "blob",
      },
    );
  },

  analyzeDocument(
    documentId,
  ) {
    return axiosClient.post(
      `/documents/${documentId}/analyze`,
    );
  },

  getDocumentAnalysis(
    documentId,
  ) {
    return axiosClient.get(
      `/documents/${documentId}/analysis`,
    );
  },
};

export default documentApi;
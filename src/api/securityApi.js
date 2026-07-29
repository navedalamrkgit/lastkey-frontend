import axiosClient from "./axiosClient";

export const securityApi = {
  getSecurityOverview() {
    return axiosClient.get(
      "/security/overview",
    );
  },

  changePassword(passwordData) {
  return axiosClient.put(
    "/users/me/password",
    passwordData,
  );
},

  getLoginActivity(params = {}) {
    return axiosClient.get(
      "/security/login-activity",
      {
        params,
      },
    );
  },

  getActiveSessions() {
    return axiosClient.get(
      "/security/sessions",
    );
  },

  revokeSession(sessionId) {
    return axiosClient.delete(
      `/security/sessions/${sessionId}`,
    );
  },

  revokeOtherSessions() {
    return axiosClient.delete(
      "/security/sessions/others",
    );
  },
};
import axiosClient from "./axiosClient";

export const dashboardApi = {
  getOverview() {
    return axiosClient.get("/dashboard");
  },

  getRecentActivity(limit = 6) {
    return axiosClient.get("/dashboard/recent-activity", {
      params: {
        limit,
      },
    });
  },

  getRecentDocuments(limit = 5) {
    return axiosClient.get("/dashboard/recent-documents", {
      params: {
        limit,
      },
    });
  },
};
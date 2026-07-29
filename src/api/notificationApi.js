import axiosClient from "./axiosClient";

export const notificationApi = {
  getNotifications(params = {}) {
    return axiosClient.get("/notifications", {
      params,
    });
  },

  getNotificationById(notificationId) {
    return axiosClient.get(
      `/notifications/${notificationId}`,
    );
  },

  getUnreadCount() {
    return axiosClient.get(
      "/notifications/unread-count",
    );
  },

  markAsRead(notificationId) {
    return axiosClient.patch(
      `/notifications/${notificationId}/read`,
    );
  },

  markAsUnread(notificationId) {
    return axiosClient.patch(
      `/notifications/${notificationId}/unread`,
    );
  },

  markAllAsRead() {
    return axiosClient.patch(
      "/notifications/read-all",
    );
  },

  deleteNotification(notificationId) {
    return axiosClient.delete(
      `/notifications/${notificationId}`,
    );
  },

  deleteAllReadNotifications() {
    return axiosClient.delete(
      "/notifications/read",
    );
  },
};
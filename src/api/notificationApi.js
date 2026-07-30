import axiosClient from "./axiosClient";
import {
  tokenService,
} from "../services/tokenService";

function ensureAuthenticated() {
  if (
    !tokenService.hasSession()
  ) {
    return Promise.reject(
      new Error(
        "Authentication session is unavailable.",
      ),
    );
  }

  return null;
}

export const notificationApi = {
  getNotifications(params = {}) {
    const sessionError =
      ensureAuthenticated();

    if (sessionError) {
      return sessionError;
    }

    return axiosClient.get(
      "/notifications",
      {
        params,
      },
    );
  },

  getNotificationById(
    notificationId,
  ) {
    const sessionError =
      ensureAuthenticated();

    if (sessionError) {
      return sessionError;
    }

    return axiosClient.get(
      `/notifications/${notificationId}`,
    );
  },

  getUnreadCount() {
    const sessionError =
      ensureAuthenticated();

    if (sessionError) {
      return sessionError;
    }

    return axiosClient.get(
      "/notifications/unread-count",
    );
  },

  markAsRead(notificationId) {
    const sessionError =
      ensureAuthenticated();

    if (sessionError) {
      return sessionError;
    }

    return axiosClient.patch(
      `/notifications/${notificationId}/read`,
    );
  },

  markAsUnread(notificationId) {
    const sessionError =
      ensureAuthenticated();

    if (sessionError) {
      return sessionError;
    }

    return axiosClient.patch(
      `/notifications/${notificationId}/unread`,
    );
  },

  markAllAsRead() {
    const sessionError =
      ensureAuthenticated();

    if (sessionError) {
      return sessionError;
    }

    return axiosClient.patch(
      "/notifications/read-all",
    );
  },

  deleteNotification(
    notificationId,
  ) {
    const sessionError =
      ensureAuthenticated();

    if (sessionError) {
      return sessionError;
    }

    return axiosClient.delete(
      `/notifications/${notificationId}`,
    );
  },

  deleteAllReadNotifications() {
    const sessionError =
      ensureAuthenticated();

    if (sessionError) {
      return sessionError;
    }

    return axiosClient.delete(
      "/notifications/read",
    );
  },
};
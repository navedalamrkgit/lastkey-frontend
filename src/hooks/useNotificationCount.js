import {
  useQuery,
} from "@tanstack/react-query";

import {
  notificationApi,
} from "../api/notificationApi";

function normalizeUnreadCount(response) {
  const data = response?.data;

  if (
    typeof data === "number"
  ) {
    return data;
  }

  return Number(
    data?.unreadCount ??
      data?.count ??
      0,
  );
}

export function useNotificationCount() {
  return useQuery({
    queryKey: [
      "notifications",
      "unread-count",
    ],

    queryFn: async () => {
      const response =
        await notificationApi.getUnreadCount();

      return normalizeUnreadCount(
        response,
      );
    },

    staleTime: 30 * 1000,

    refetchInterval:
      60 * 1000,

    refetchOnWindowFocus: true,

    retry: 1,
  });
}
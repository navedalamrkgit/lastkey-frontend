import {
  Bell,
  CheckCheck,
  Inbox,
} from "lucide-react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import {
  notificationApi,
} from "../../api/notificationApi";
import NotificationIcon from "../notifications/NotificationIcon";
import {
  formatRelativeDate,
} from "../../utils/formatDate";
import {
  getErrorMessage,
} from "../../utils/errorHandler";
import { ROUTES } from "../../utils/routePaths";

function normalizeDropdownNotifications(
  response,
) {
  const data = response?.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (
    Array.isArray(data?.content)
  ) {
    return data.content;
  }

  if (
    Array.isArray(
      data?.notifications,
    )
  ) {
    return data.notifications;
  }

  return [];
}

function isUnread(notification) {
  return (
    notification.read === false ||
    notification.isRead === false
  );
}

export default function NotificationDropdown({
  onClose,
}) {
  const queryClient =
    useQueryClient();

  const notificationQuery =
    useQuery({
      queryKey: [
        "notifications",
        "dropdown",
      ],

      queryFn: async () => {
        const response =
          await notificationApi.getNotifications({
            page: 0,
            size: 5,
            sort:
              "createdAt,desc",
          });

        return normalizeDropdownNotifications(
          response,
        );
      },

      staleTime: 20 * 1000,

      retry: 1,
    });

  function invalidateNotifications() {
    queryClient.invalidateQueries({
      queryKey: [
        "notifications",
      ],
    });
  }

  const markAsReadMutation =
    useMutation({
      mutationFn: (
        notificationId,
      ) =>
        notificationApi.markAsRead(
          notificationId,
        ),

      onSuccess: () => {
        invalidateNotifications();
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to update the notification.",
          ),
        );
      },
    });

  const markAllMutation =
    useMutation({
      mutationFn: () =>
        notificationApi.markAllAsRead(),

      onSuccess: () => {
        toast.success(
          "All notifications marked as read.",
        );

        invalidateNotifications();
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to mark notifications as read.",
          ),
        );
      },
    });

  const notifications =
    notificationQuery.data || [];

  const unreadCount =
    notifications.filter(
      isUnread,
    ).length;

  function handleNotificationClick(
    notification,
  ) {
    if (isUnread(notification)) {
      markAsReadMutation.mutate(
        notification.id,
      );
    }

    onClose?.();
  }

  return (
    <div className="absolute right-0 top-[calc(100%+12px)] z-40 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-950/15">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
        <div>
          <h2 className="font-extrabold text-slate-950">
            Notifications
          </h2>

          <p className="mt-0.5 text-xs text-slate-500">
            {unreadCount > 0
              ? `${unreadCount} unread update${unreadCount === 1 ? "" : "s"}`
              : "You are all caught up"}
          </p>
        </div>

        <button
          type="button"
          disabled={
            unreadCount === 0 ||
            markAllMutation.isPending
          }
          onClick={() =>
            markAllMutation.mutate()
          }
          className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-slate-400"
        >
          <CheckCheck className="h-4 w-4" />
          Mark all read
        </button>
      </div>

      <div className="max-h-[420px] overflow-y-auto">
        {notificationQuery.isLoading ? (
          <div className="space-y-2 p-4">
            {Array.from({
              length: 4,
            }).map((_, index) => (
              <div
                key={index}
                className="shimmer h-20 rounded-2xl"
              />
            ))}
          </div>
        ) : notificationQuery.isError ? (
          <div className="px-5 py-10 text-center">
            <Bell className="mx-auto h-8 w-8 text-red-300" />

            <p className="mt-3 text-sm font-bold text-slate-700">
              Unable to load notifications
            </p>
          </div>
        ) : notifications.length ===
          0 ? (
          <div className="px-5 py-10 text-center">
            <Inbox className="mx-auto h-9 w-9 text-slate-300" />

            <p className="mt-3 text-sm font-bold text-slate-700">
              No notifications
            </p>

            <p className="mt-1 text-xs text-slate-400">
              New updates will appear here.
            </p>
          </div>
        ) : (
          notifications.map(
            (notification) => {
              const unread =
                isUnread(notification);

              const target =
                notification.actionUrl ||
                notification.targetUrl ||
                ROUTES.NOTIFICATIONS;

              return (
                <Link
                  key={
                    notification.id
                  }
                  to={target}
                  onClick={() =>
                    handleNotificationClick(
                      notification,
                    )
                  }
                  className={[
                    "flex items-start gap-3 border-b border-slate-100 px-5 py-4 transition last:border-b-0",
                    unread
                      ? "bg-blue-50/40 hover:bg-blue-50"
                      : "hover:bg-slate-50",
                  ].join(" ")}
                >
                  <NotificationIcon
                    type={
                      notification.type
                    }
                    size="medium"
                  />

                  <span className="min-w-0 flex-1">
                    <span className="flex items-start justify-between gap-3">
                      <span
                        className={[
                          "line-clamp-1 text-sm text-slate-900",
                          unread
                            ? "font-extrabold"
                            : "font-bold",
                        ].join(" ")}
                      >
                        {
                          notification.title
                        }
                      </span>

                      {unread && (
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                      )}
                    </span>

                    <span className="mt-1 line-clamp-2 block text-xs leading-5 text-slate-500">
                      {notification.message ||
                        notification.description}
                    </span>

                    <span className="mt-2 block text-[11px] font-semibold text-slate-400">
                      {formatRelativeDate(
                        notification.createdAt,
                      )}
                    </span>
                  </span>
                </Link>
              );
            },
          )
        )}
      </div>

      <div className="border-t border-slate-100 p-3">
        <Link
          to={ROUTES.NOTIFICATIONS}
          onClick={onClose}
          className="flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
        >
          <Bell className="h-4 w-4" />
          View all notifications
        </Link>
      </div>
    </div>
  );
}
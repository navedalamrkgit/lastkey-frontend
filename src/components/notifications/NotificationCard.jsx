import {
  Check,
  CheckCheck,
  ExternalLink,
  Mail,
  MailOpen,
  Trash2,
} from "lucide-react";
import {
  Link,
} from "react-router-dom";

import NotificationIcon from "./NotificationIcon";
import {
  getNotificationPriority,
  getNotificationType,
} from "../../config/notificationConfig";
import {
  formatRelativeDate,
} from "../../utils/formatDate";

export default function NotificationCard({
  notification,
  marking = false,
  deleting = false,
  onMarkAsRead,
  onMarkAsUnread,
  onDelete,
}) {
  const typeConfig =
    getNotificationType(
      notification.type,
    );

  const priorityConfig =
    getNotificationPriority(
      notification.priority,
    );

  const isUnread =
    notification.read === false ||
    notification.isRead === false;

  const actionUrl =
    notification.actionUrl ||
    notification.targetUrl;

  return (
    <article
      className={[
        "group relative rounded-3xl border p-5 transition-all duration-300",
        isUnread
          ? "border-blue-200 bg-blue-50/40 shadow-sm hover:border-blue-300 hover:shadow-lg"
          : "border-slate-200 bg-white shadow-sm hover:border-slate-300 hover:shadow-lg",
      ].join(" ")}
    >
      {isUnread && (
        <span className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-blue-600" />
      )}

      <div className="flex items-start gap-4">
        <NotificationIcon
          type={notification.type}
          size="medium"
        />

        <div className="min-w-0 flex-1 pr-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {typeConfig.label}
            </span>

            {notification.priority &&
              notification.priority !==
                "NORMAL" && (
                <span
                  className={[
                    "rounded-full border px-2 py-0.5",
                    "text-[9px] font-bold uppercase tracking-wider",
                    priorityConfig.className,
                  ].join(" ")}
                >
                  {priorityConfig.label}
                </span>
              )}
          </div>

          <h2
            className={[
              "mt-2 pr-3 text-sm text-slate-950",
              isUnread
                ? "font-extrabold"
                : "font-bold",
            ].join(" ")}
          >
            {notification.title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {notification.message ||
              notification.description}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-[11px] font-semibold text-slate-400">
              {formatRelativeDate(
                notification.createdAt,
              )}
            </span>

            {actionUrl && (
              <Link
                to={actionUrl}
                onClick={() => {
                  if (isUnread) {
                    onMarkAsRead(
                      notification,
                    );
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 transition hover:text-blue-700"
              >
                {notification.actionLabel ||
                  "View details"}

                <ExternalLink className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-slate-200/70 pt-4">
        {isUnread ? (
          <button
            type="button"
            disabled={marking}
            onClick={() =>
              onMarkAsRead(
                notification,
              )
            }
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-blue-600 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {marking ? (
              <Check className="h-4 w-4 animate-pulse" />
            ) : (
              <MailOpen className="h-4 w-4" />
            )}

            Mark as read
          </button>
        ) : (
          <button
            type="button"
            disabled={marking}
            onClick={() =>
              onMarkAsUnread(
                notification,
              )
            }
            className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Mail className="h-4 w-4" />

            Mark as unread
          </button>
        )}

        <button
          type="button"
          disabled={deleting}
          onClick={() =>
            onDelete(notification)
          }
          className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Trash2 className="h-4 w-4" />

          Delete
        </button>

        {!isUnread && (
          <span className="ml-auto inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
            <CheckCheck className="h-3.5 w-3.5" />
            Read
          </span>
        )}
      </div>
    </article>
  );
}
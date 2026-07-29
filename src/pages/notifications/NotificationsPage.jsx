import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BellRing,
  CheckCheck,
  Clock3,
  Mail,
  MailOpen,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import { notificationApi } from "../../api/notificationApi";
import EmptyNotificationState from "../../components/notifications/EmptyNotificationState";
import NotificationCard from "../../components/notifications/NotificationCard";
import NotificationFilters from "../../components/notifications/NotificationFilters";
import NotificationSkeleton from "../../components/notifications/NotificationSkeleton";
import Button from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import { getErrorMessage } from "../../utils/errorHandler";

function normalizeNotifications(response) {
  const data = response?.data;

  if (Array.isArray(data)) {
    return {
      notifications: data,
      page: 0,
      totalPages: 1,
      totalElements: data.length,
    };
  }

  if (Array.isArray(data?.content)) {
    return {
      notifications: data.content,
      page: Number(data.number || 0),
      totalPages: Number(data.totalPages || 1),
      totalElements: Number(
        data.totalElements || data.content.length,
      ),
    };
  }

  if (Array.isArray(data?.notifications)) {
    return {
      notifications: data.notifications,
      page: Number(data.page || 0),
      totalPages: Number(data.totalPages || 1),
      totalElements: Number(
        data.totalElements || data.notifications.length,
      ),
    };
  }

  return {
    notifications: [],
    page: 0,
    totalPages: 1,
    totalElements: 0,
  };
}

function isUnread(notification) {
  return (
    notification.read === false ||
    notification.isRead === false
  );
}

function getNotificationCategory(notification) {
  const value = String(
    notification?.type ||
      notification?.category ||
      notification?.title ||
      "",
  ).toUpperCase();

  if (
    value.includes("EMERGENCY") ||
    value.includes("ACCESS_REQUEST")
  ) {
    return "EMERGENCY";
  }

  if (
    value.includes("SECURITY") ||
    value.includes("LOGIN") ||
    value.includes("PASSWORD")
  ) {
    return "SECURITY";
  }

  if (
    value.includes("DOCUMENT") ||
    value.includes("EXPIRY") ||
    value.includes("REMINDER")
  ) {
    return "DOCUMENT";
  }

  if (
    value.includes("NOMINEE") ||
    value.includes("BENEFICIARY")
  ) {
    return "NOMINEE";
  }

  return "SYSTEM";
}

function getPriority(notification) {
  const value = String(
    notification?.priority ||
      notification?.severity ||
      notification?.type ||
      "",
  ).toUpperCase();

  if (
    value.includes("CRITICAL") ||
    value.includes("EMERGENCY") ||
    value.includes("DANGER")
  ) {
    return "CRITICAL";
  }

  if (
    value.includes("HIGH") ||
    value.includes("WARNING") ||
    value.includes("SECURITY")
  ) {
    return "IMPORTANT";
  }

  return "INFO";
}

function MetricCard({
  icon: Icon,
  label,
  value,
  description,
  accent,
  glow,
}) {
  return (
    <article
      className="group relative overflow-hidden rounded-[28px] border p-5 transition duration-300 hover:-translate-y-1"
      style={{
        color: "var(--text-primary)",
        borderColor: "var(--border-primary)",
        background:
          "linear-gradient(145deg, color-mix(in srgb, var(--surface-primary) 96%, transparent), color-mix(in srgb, var(--surface-secondary) 94%, transparent))",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full blur-3xl transition duration-500 group-hover:scale-125"
        style={{ background: glow }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{
            color: accent,
            background: `color-mix(in srgb, ${accent} 15%, transparent)`,
          }}
        >
          <Icon className="h-5 w-5" />
        </span>

        <span
          className="rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em]"
          style={{
            color: accent,
            borderColor: `color-mix(in srgb, ${accent} 28%, transparent)`,
            background: `color-mix(in srgb, ${accent} 9%, transparent)`,
          }}
        >
          Live
        </span>
      </div>

      <p className="relative mt-5 text-3xl font-black tracking-tight">
        {value}
      </p>

      <p className="relative mt-1 text-sm font-black">
        {label}
      </p>

      <p
        className="relative mt-2 text-xs leading-5"
        style={{ color: "var(--text-muted)" }}
      >
        {description}
      </p>
    </article>
  );
}

function FilterPill({
  active,
  label,
  count,
  onClick,
  accent,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-xs font-black transition hover:-translate-y-0.5"
      style={
        active
          ? {
              color: "#ffffff",
              borderColor: accent,
              background: `linear-gradient(135deg, ${accent}, color-mix(in srgb, ${accent} 66%, #7c3aed))`,
              boxShadow: `0 10px 26px color-mix(in srgb, ${accent} 25%, transparent)`,
            }
          : {
              color: "var(--text-secondary)",
              borderColor: "var(--border-primary)",
              background: "var(--surface-primary)",
            }
      }
    >
      {label}
      <span
        className="rounded-full px-2 py-0.5 text-[10px]"
        style={{
          background: active
            ? "rgba(255,255,255,0.16)"
            : "var(--surface-inner)",
          color: active
            ? "#ffffff"
            : "var(--text-muted)",
        }}
      >
        {count}
      </span>
    </button>
  );
}

export default function NotificationsPage() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [readStatus, setReadStatus] = useState("");
  const [page, setPage] = useState(0);
  const [notificationToDelete, setNotificationToDelete] =
    useState(null);
  const [
    deleteReadDialogOpen,
    setDeleteReadDialogOpen,
  ] = useState(false);
  const [activeMutationId, setActiveMutationId] =
    useState(null);

  const notificationQuery = useQuery({
    queryKey: ["notifications", { page }],
    queryFn: async () => {
      const response =
        await notificationApi.getNotifications({
          page,
          size: 20,
          sort: "createdAt,desc",
        });

      return normalizeNotifications(response);
    },
  });

  function invalidateNotificationQueries() {
    queryClient.invalidateQueries({
      queryKey: ["notifications"],
    });
  }

  const markAsReadMutation = useMutation({
    mutationFn: (notificationId) =>
      notificationApi.markAsRead(notificationId),

    onMutate: (notificationId) => {
      setActiveMutationId(notificationId);
    },

    onSuccess: invalidateNotificationQueries,

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          "Unable to mark the notification as read.",
        ),
      );
    },

    onSettled: () => {
      setActiveMutationId(null);
    },
  });

  const markAsUnreadMutation = useMutation({
    mutationFn: (notificationId) =>
      notificationApi.markAsUnread(notificationId),

    onMutate: (notificationId) => {
      setActiveMutationId(notificationId);
    },

    onSuccess: invalidateNotificationQueries,

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          "Unable to mark the notification as unread.",
        ),
      );
    },

    onSettled: () => {
      setActiveMutationId(null);
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: () =>
      notificationApi.markAllAsRead(),

    onSuccess: () => {
      toast.success(
        "All notifications marked as read.",
      );

      invalidateNotificationQueries();
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          "Unable to mark all notifications as read.",
        ),
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (notificationId) =>
      notificationApi.deleteNotification(
        notificationId,
      ),

    onMutate: (notificationId) => {
      setActiveMutationId(notificationId);
    },

    onSuccess: () => {
      toast.success("Notification deleted.");
      setNotificationToDelete(null);
      invalidateNotificationQueries();
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          "Unable to delete the notification.",
        ),
      );
    },

    onSettled: () => {
      setActiveMutationId(null);
    },
  });

  const deleteReadMutation = useMutation({
    mutationFn: () =>
      notificationApi.deleteAllReadNotifications(),

    onSuccess: () => {
      toast.success(
        "Read notifications deleted.",
      );

      setDeleteReadDialogOpen(false);
      invalidateNotificationQueries();
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          "Unable to delete read notifications.",
        ),
      );
    },
  });

  const notifications =
    notificationQuery.data?.notifications || [];

  const categoryCounts = useMemo(() => {
    return notifications.reduce(
      (result, notification) => {
        const category =
          getNotificationCategory(notification);

        result[category] =
          (result[category] || 0) + 1;

        return result;
      },
      {
        SECURITY: 0,
        EMERGENCY: 0,
        DOCUMENT: 0,
        NOMINEE: 0,
        SYSTEM: 0,
      },
    );
  }, [notifications]);

  const criticalCount = useMemo(
    () =>
      notifications.filter(
        (notification) =>
          getPriority(notification) === "CRITICAL",
      ).length,
    [notifications],
  );

  const filteredNotifications = useMemo(() => {
    const normalizedSearch =
      search.trim().toLowerCase();

    return notifications.filter(
      (notification) => {
        const matchesSearch =
          !normalizedSearch ||
          [
            notification.title,
            notification.message,
            notification.description,
          ]
            .filter(Boolean)
            .some((value) =>
              String(value)
                .toLowerCase()
                .includes(normalizedSearch),
            );

        const category =
          getNotificationCategory(notification);

        const matchesType =
          !type ||
          category === type ||
          notification.type === type ||
          notification.type?.startsWith(type);

        const unread = isUnread(notification);

        const matchesReadStatus =
          !readStatus ||
          (readStatus === "UNREAD" && unread) ||
          (readStatus === "READ" && !unread);

        return (
          matchesSearch &&
          matchesType &&
          matchesReadStatus
        );
      },
    );
  }, [
    notifications,
    search,
    type,
    readStatus,
  ]);

  const unreadCount =
    notifications.filter(isUnread).length;

  const readCount =
    notifications.length - unreadCount;

  const hasFilters = Boolean(
    search || type || readStatus,
  );

  const clearFilters = () => {
    setSearch("");
    setType("");
    setReadStatus("");
  };

  const currentPage =
    notificationQuery.data?.page || 0;

  const totalPages =
    notificationQuery.data?.totalPages || 1;

  const totalElements =
    notificationQuery.data?.totalElements ||
    notifications.length;

  const filterOptions = [
    {
      value: "",
      label: "All",
      count: notifications.length,
      accent: "#7c3aed",
    },
    {
      value: "SECURITY",
      label: "Security",
      count: categoryCounts.SECURITY,
      accent: "#06b6d4",
    },
    {
      value: "EMERGENCY",
      label: "Emergency",
      count: categoryCounts.EMERGENCY,
      accent: "#f43f5e",
    },
    {
      value: "DOCUMENT",
      label: "Documents",
      count: categoryCounts.DOCUMENT,
      accent: "#f59e0b",
    },
    {
      value: "NOMINEE",
      label: "Nominees",
      count: categoryCounts.NOMINEE,
      accent: "#10b981",
    },
    {
      value: "SYSTEM",
      label: "System",
      count: categoryCounts.SYSTEM,
      accent: "#8b5cf6",
    },
  ];

  return (
    <div
      className="page-enter min-h-full px-4 py-5 sm:px-6 lg:px-8 lg:py-7"
      style={{
        color: "var(--text-primary)",
        background:
          "radial-gradient(circle at 10% 0%, rgba(124,58,237,0.10), transparent 28rem), radial-gradient(circle at 95% 5%, rgba(249,115,22,0.08), transparent 26rem), var(--app-background)",
      }}
    >
      <div className="mx-auto max-w-[1440px]">
        <section
          className="relative overflow-hidden rounded-[36px] border p-6 sm:p-8"
          style={{
            borderColor: "var(--border-primary)",
            background:
              "linear-gradient(135deg, #0b1120 0%, #131a2f 50%, #1a1230 100%)",
            boxShadow:
              "0 28px 80px rgba(2,8,23,0.28)",
          }}
        >
          <div className="absolute -left-20 -top-24 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-orange-500/15 blur-3xl" />
          <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative grid gap-7 xl:grid-cols-[1fr_auto] xl:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 via-fuchsia-600 to-orange-500 text-white shadow-xl shadow-fuchsia-950/30">
                  <BellRing className="h-6 w-6" />
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-violet-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Notification hub
                </span>
              </div>

              <h1 className="mt-5 text-3xl font-black tracking-[-0.03em] text-white sm:text-4xl">
                Your account activity, beautifully organised.
              </h1>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                Review security alerts, emergency requests,
                document reminders and nominee updates from
                one focused inbox.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-500/10 px-3 py-2 text-xs font-bold text-cyan-200">
                  <ShieldCheck className="h-4 w-4" />
                  Security alerts
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-orange-300/15 bg-orange-500/10 px-3 py-2 text-xs font-bold text-orange-200">
                  <Clock3 className="h-4 w-4" />
                  Document reminders
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-200">
                  <Zap className="h-4 w-4" />
                  Live account feed
                </span>
              </div>
            </div>

            <div className="grid min-w-[290px] gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[26px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                      Unread now
                    </p>
                    <p className="mt-2 text-4xl font-black text-white">
                      {unreadCount}
                    </p>
                  </div>

                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-600 to-violet-600 text-white">
                    <Mail className="h-5 w-5" />
                  </span>
                </div>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl">
                <p className="text-xs leading-5 text-slate-300">
                  Page{" "}
                  <span className="font-black text-white">
                    {currentPage + 1}
                  </span>{" "}
                  of{" "}
                  <span className="font-black text-white">
                    {totalPages}
                  </span>
                </p>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-orange-400"
                    style={{
                      width: `${Math.max(
                        12,
                        Math.min(
                          100,
                          ((currentPage + 1) /
                            totalPages) *
                            100,
                        ),
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={BellRing}
            label="Total notifications"
            value={totalElements}
            description="All account events available in your notification history."
            accent="#8b5cf6"
            glow="rgba(139,92,246,0.20)"
          />

          <MetricCard
            icon={Mail}
            label="Unread"
            value={unreadCount}
            description="Updates still waiting for your attention."
            accent="#06b6d4"
            glow="rgba(6,182,212,0.18)"
          />

          <MetricCard
            icon={AlertTriangle}
            label="Critical"
            value={criticalCount}
            description="High-priority alerts that may require immediate review."
            accent="#f43f5e"
            glow="rgba(244,63,94,0.18)"
          />

          <MetricCard
            icon={MailOpen}
            label="Reviewed"
            value={readCount}
            description="Notifications already opened and reviewed."
            accent="#10b981"
            glow="rgba(16,185,129,0.18)"
          />
        </section>

        <section
          className="mt-6 rounded-[32px] border p-4 sm:p-5"
          style={{
            borderColor: "var(--border-primary)",
            background: "var(--surface-primary)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-500">
                  Focus your inbox
                </p>
                <h2 className="mt-1 text-xl font-black">
                  Filter account activity
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => (
                  <FilterPill
                    key={option.value || "ALL"}
                    active={type === option.value}
                    label={option.label}
                    count={option.count}
                    accent={option.accent}
                    onClick={() => {
                      setType(option.value);
                      setPage(0);
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              className="rounded-[24px] border p-4"
              style={{
                borderColor: "var(--border-primary)",
                background: "var(--surface-inner)",
              }}
            >
              <NotificationFilters
                search={search}
                type={type}
                readStatus={readStatus}
                onSearchChange={setSearch}
                onTypeChange={setType}
                onReadStatusChange={setReadStatus}
                onClear={clearFilters}
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="inline-flex items-center gap-2 text-xs font-bold">
                <Search
                  className="h-4 w-4"
                  style={{ color: "var(--accent-secondary)" }}
                />
                <span style={{ color: "var(--text-muted)" }}>
                  {filteredNotifications.length} notifications visible
                </span>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  size="medium"
                  variant="secondary"
                  leftIcon={Trash2}
                  disabled={readCount === 0}
                  onClick={() =>
                    setDeleteReadDialogOpen(true)
                  }
                >
                  Delete read
                </Button>

                <Button
                  size="medium"
                  leftIcon={CheckCheck}
                  loading={
                    markAllAsReadMutation.isPending
                  }
                  loadingText="Updating..."
                  disabled={unreadCount === 0}
                  onClick={() =>
                    markAllAsReadMutation.mutate()
                  }
                >
                  Mark all as read
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-7">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">
                Notification stream
              </p>
              <h2 className="mt-1 text-2xl font-black tracking-tight">
                Recent account updates
              </h2>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Open, review or remove individual notifications.
              </p>
            </div>

            {!notificationQuery.isLoading &&
              !notificationQuery.isError && (
                <span
                  className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-2 text-xs font-black"
                  style={{
                    color: "var(--text-secondary)",
                    borderColor: "var(--border-primary)",
                    background: "var(--surface-primary)",
                  }}
                >
                  <BellRing className="h-4 w-4 text-violet-500" />
                  {filteredNotifications.length} visible
                </span>
              )}
          </div>

          <div className="space-y-4">
            {notificationQuery.isLoading ? (
              Array.from({ length: 6 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="rounded-[30px] border p-1"
                    style={{
                      borderColor:
                        "var(--border-primary)",
                      background:
                        "var(--surface-primary)",
                    }}
                  >
                    <NotificationSkeleton />
                  </div>
                ),
              )
            ) : notificationQuery.isError ? (
              <div
                className="rounded-[30px] border p-8 text-center"
                style={{
                  borderColor:
                    "color-mix(in srgb, #f43f5e 30%, transparent)",
                  background:
                    "color-mix(in srgb, #f43f5e 8%, var(--surface-primary))",
                }}
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500">
                  <BellRing className="h-7 w-7" />
                </span>

                <h2 className="mt-5 text-lg font-black">
                  Unable to load notifications
                </h2>

                <p
                  className="mx-auto mt-2 max-w-xl text-sm leading-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  {getErrorMessage(
                    notificationQuery.error,
                    "Check the notification backend endpoint.",
                  )}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    notificationQuery.refetch()
                  }
                  className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-5 text-xs font-black text-rose-500 transition hover:-translate-y-0.5"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try again
                </button>
              </div>
            ) : filteredNotifications.length ===
              0 ? (
              <div
                className="overflow-hidden rounded-[30px] border"
                style={{
                  borderColor:
                    "var(--border-primary)",
                  background:
                    "var(--surface-primary)",
                }}
              >
                <EmptyNotificationState
                  filtered={hasFilters}
                  onClearFilters={clearFilters}
                />
              </div>
            ) : (
              filteredNotifications.map(
                (notification) => {
                  const category =
                    getNotificationCategory(
                      notification,
                    );

                  const accentMap = {
                    SECURITY: "#06b6d4",
                    EMERGENCY: "#f43f5e",
                    DOCUMENT: "#f59e0b",
                    NOMINEE: "#10b981",
                    SYSTEM: "#8b5cf6",
                  };

                  const accent =
                    accentMap[category] ||
                    accentMap.SYSTEM;

                  return (
                    <div
                      key={notification.id}
                      className="group relative overflow-hidden rounded-[30px] border p-[1px] transition duration-300 hover:-translate-y-0.5"
                      style={{
                        borderColor:
                          "var(--border-primary)",
                        background: `linear-gradient(135deg, color-mix(in srgb, ${accent} 68%, transparent), var(--border-primary), transparent)`,
                        boxShadow:
                          "var(--card-shadow)",
                      }}
                    >
                      <div
                        className="relative overflow-hidden rounded-[29px]"
                        style={{
                          background:
                            "var(--surface-primary)",
                        }}
                      >
                        <div
                          className="absolute inset-y-0 left-0 w-1"
                          style={{
                            background: `linear-gradient(180deg, ${accent}, color-mix(in srgb, ${accent} 45%, transparent))`,
                          }}
                        />

                        <NotificationCard
                          notification={notification}
                          marking={
                            activeMutationId ===
                              notification.id &&
                            (markAsReadMutation.isPending ||
                              markAsUnreadMutation.isPending)
                          }
                          deleting={
                            activeMutationId ===
                              notification.id &&
                            deleteMutation.isPending
                          }
                          onMarkAsRead={(
                            selectedNotification,
                          ) =>
                            markAsReadMutation.mutate(
                              selectedNotification.id,
                            )
                          }
                          onMarkAsUnread={(
                            selectedNotification,
                          ) =>
                            markAsUnreadMutation.mutate(
                              selectedNotification.id,
                            )
                          }
                          onDelete={
                            setNotificationToDelete
                          }
                        />
                      </div>
                    </div>
                  );
                },
              )
            )}
          </div>
        </section>

        {!notificationQuery.isLoading &&
          !notificationQuery.isError &&
          totalPages > 1 && (
            <div
              className="mt-7 flex flex-col gap-4 rounded-[28px] border p-4 sm:flex-row sm:items-center sm:justify-between"
              style={{
                borderColor: "var(--border-primary)",
                background: "var(--surface-primary)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <button
                type="button"
                disabled={currentPage <= 0}
                onClick={() =>
                  setPage((current) =>
                    Math.max(current - 1, 0),
                  )
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border px-4 text-xs font-black transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  color: "var(--text-secondary)",
                  borderColor:
                    "var(--border-primary)",
                  background:
                    "var(--surface-inner)",
                }}
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="text-center">
                <p
                  className="text-[10px] font-black uppercase tracking-[0.16em]"
                  style={{
                    color: "var(--text-subtle)",
                  }}
                >
                  Notification pages
                </p>
                <p className="mt-1 text-sm font-black">
                  Page {currentPage + 1} of{" "}
                  {totalPages}
                </p>
              </div>

              <button
                type="button"
                disabled={
                  currentPage >= totalPages - 1
                }
                onClick={() =>
                  setPage(
                    (current) => current + 1,
                  )
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border px-4 text-xs font-black transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                style={{
                  color: "var(--text-secondary)",
                  borderColor:
                    "var(--border-primary)",
                  background:
                    "var(--surface-inner)",
                }}
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

        <section
          className="mt-7 overflow-hidden rounded-[30px] border p-6 sm:p-7"
          style={{
            borderColor:
              "color-mix(in srgb, #10b981 25%, var(--border-primary))",
            background:
              "linear-gradient(135deg, color-mix(in srgb, #10b981 10%, var(--surface-primary)), color-mix(in srgb, #06b6d4 7%, var(--surface-primary)))",
          }}
        >
          <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-500">
              <ShieldCheck className="h-6 w-6" />
            </span>

            <div>
              <h2 className="text-base font-black">
                Notification controls are synchronised
              </h2>

              <p
                className="mt-1 text-sm leading-6"
                style={{ color: "var(--text-muted)" }}
              >
                Read status and deletion actions continue
                using your existing API and React Query cache
                invalidation.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-xs font-black text-emerald-500">
              <CheckCheck className="h-4 w-4" />
              Live updates
            </span>
          </div>
        </section>
      </div>

      <ConfirmDialog
        open={Boolean(notificationToDelete)}
        title="Delete notification?"
        description="This notification will be permanently removed from your account."
        confirmText="Delete notification"
        danger
        loading={deleteMutation.isPending}
        onCancel={() =>
          setNotificationToDelete(null)
        }
        onConfirm={() =>
          deleteMutation.mutate(
            notificationToDelete.id,
          )
        }
      />

      <ConfirmDialog
        open={deleteReadDialogOpen}
        title="Delete all read notifications?"
        description="All notifications currently marked as read will be permanently removed."
        confirmText="Delete read notifications"
        danger
        loading={deleteReadMutation.isPending}
        onCancel={() =>
          setDeleteReadDialogOpen(false)
        }
        onConfirm={() =>
          deleteReadMutation.mutate()
        }
      />
    </div>
  );
}
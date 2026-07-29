import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Laptop,
  LockKeyhole,
  MonitorSmartphone,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Wifi,
} from "lucide-react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  useMemo,
  useState,
} from "react";
import toast from "react-hot-toast";

import {
  securityApi,
} from "../../api/securityApi";
import ActiveSessionCard from "../../components/security/ActiveSessionCard";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import {
  getErrorMessage,
} from "../../utils/errorHandler";

function normalizeSessionResponse(response) {
  const data = response?.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.sessions)) {
    return data.sessions;
  }

  return [];
}

function formatRelativeActivity(value) {
  if (!value) {
    return "Activity unavailable";
  }

  const parsedDate = new Date(value);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Activity unavailable";
  }

  const difference = Date.now() - parsedDate.getTime();
  const minutes = Math.floor(difference / 60000);

  if (minutes < 1) {
    return "Active just now";
  }

  if (minutes < 60) {
    return `Active ${minutes} min ago`;
  }

  const hours = Math.floor(minutes / 60);

  if (hours < 24) {
    return `Active ${hours} hr ago`;
  }

  const days = Math.floor(hours / 24);

  return `Active ${days} day${days === 1 ? "" : "s"} ago`;
}

function getDeviceIcon(session) {
  const deviceText = [
    session?.deviceName,
    session?.deviceType,
    session?.userAgent,
    session?.browser,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (
    deviceText.includes("mobile") ||
    deviceText.includes("android") ||
    deviceText.includes("iphone")
  ) {
    return Smartphone;
  }

  return Laptop;
}

function InsightCard({
  icon: Icon,
  label,
  value,
  description,
  tone = "slate",
}) {
  const toneStyles = {
    slate:
      "border-slate-200 bg-white text-slate-950",
    blue:
      "border-blue-200 bg-blue-50/70 text-blue-950",
    emerald:
      "border-emerald-200 bg-emerald-50/70 text-emerald-950",
  };

  const iconStyles = {
    slate:
      "bg-slate-100 text-slate-600",
    blue:
      "bg-white text-blue-600 shadow-sm",
    emerald:
      "bg-white text-emerald-600 shadow-sm",
  };

  return (
    <article
      className={`rounded-[28px] border p-5 shadow-sm ${toneStyles[tone]}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconStyles[tone]}`}
        >
          <Icon className="h-5 w-5" />
        </span>

        <span className="rounded-full border border-current/10 bg-white/60 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] opacity-70">
          Live
        </span>
      </div>

      <p className="mt-5 text-3xl font-black tracking-tight">
        {value}
      </p>

      <p className="mt-1 text-sm font-extrabold">
        {label}
      </p>

      <p className="mt-2 text-xs leading-5 opacity-65">
        {description}
      </p>
    </article>
  );
}

export default function ActiveSessionsPage() {
  const queryClient =
    useQueryClient();

  const [
    sessionToRevoke,
    setSessionToRevoke,
  ] = useState(null);

  const [
    revokeAllOpen,
    setRevokeAllOpen,
  ] = useState(false);

  const sessionQuery =
    useQuery({
      queryKey: [
        "active-sessions",
      ],

      queryFn: async () => {
        const response =
          await securityApi.getActiveSessions();

        return normalizeSessionResponse(
          response,
        );
      },
    });

  const revokeMutation =
    useMutation({
      mutationFn: (sessionId) =>
        securityApi.revokeSession(
          sessionId,
        ),

      onSuccess: () => {
        toast.success(
          "Session revoked successfully.",
        );

        setSessionToRevoke(null);

        queryClient.invalidateQueries({
          queryKey: [
            "active-sessions",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "security-overview",
          ],
        });
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to revoke the session.",
          ),
        );
      },
    });

  const revokeAllMutation =
    useMutation({
      mutationFn: () =>
        securityApi.revokeOtherSessions(),

      onSuccess: () => {
        toast.success(
          "All other sessions were revoked.",
        );

        setRevokeAllOpen(false);

        queryClient.invalidateQueries({
          queryKey: [
            "active-sessions",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "security-overview",
          ],
        });
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to revoke other sessions.",
          ),
        );
      },
    });

  const sessions =
    sessionQuery.data || [];

  const otherSessionCount =
    sessions.filter(
      (session) =>
        !session.current,
    ).length;

  const currentSession =
    useMemo(
      () =>
        sessions.find(
          (session) =>
            session.current,
        ) || null,
      [sessions],
    );

  const recentlyActiveCount =
    useMemo(() => {
      const oneDayAgo =
        Date.now() -
        24 * 60 * 60 * 1000;

      return sessions.filter(
        (session) => {
          const rawDate =
            session.lastActiveAt ||
            session.lastActivityAt ||
            session.updatedAt ||
            session.createdAt;

          if (!rawDate) {
            return false;
          }

          const timestamp =
            new Date(rawDate).getTime();

          return (
            !Number.isNaN(timestamp) &&
            timestamp >= oneDayAgo
          );
        },
      ).length;
    }, [sessions]);

  const CurrentDeviceIcon =
    getDeviceIcon(
      currentSession,
    );

  return (
    <div className="page-enter min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(16,185,129,0.07),_transparent_30%)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          eyebrow="Device security"
          title="Active sessions"
          description="Review devices currently signed in and revoke any session you do not recognise."
          actions={
            <div className="flex flex-wrap gap-3">
              <Button
                size="medium"
                variant="secondary"
                leftIcon={RefreshCw}
                loading={
                  sessionQuery.isFetching &&
                  !sessionQuery.isLoading
                }
                loadingText="Refreshing..."
                onClick={() =>
                  sessionQuery.refetch()
                }
              >
                Refresh
              </Button>

              <Button
                size="medium"
                variant="danger"
                leftIcon={ShieldAlert}
                disabled={
                  otherSessionCount === 0
                }
                onClick={() =>
                  setRevokeAllOpen(true)
                }
              >
                Revoke all others
              </Button>
            </div>
          }
        />

        <section className="relative mt-7 overflow-hidden rounded-[34px] border border-slate-200/80 bg-slate-950 px-6 py-7 text-white shadow-2xl shadow-slate-950/10 sm:px-8 sm:py-8">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-20 left-1/3 h-52 w-52 rounded-full bg-emerald-400/10 blur-3xl" />

          <div className="relative grid gap-7 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-200">
                <Sparkles className="h-3.5 w-3.5" />
                Session intelligence
              </span>

              <h2 className="mt-5 max-w-2xl text-2xl font-black tracking-tight sm:text-3xl">
                You stay in control of every signed-in device.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                LastKey tracks active sessions so you can quickly remove unknown devices and reduce the risk of unauthorised account access.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <LockKeyhole className="h-4 w-4 text-blue-300" />
                  Instant revocation
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <Wifi className="h-4 w-4 text-emerald-300" />
                  Device visibility
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <ShieldCheck className="h-4 w-4 text-violet-300" />
                  Current session protected
                </span>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-blue-300">
                  <CurrentDeviceIcon className="h-7 w-7" />
                </span>

                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    Current device
                  </p>

                  <p className="mt-1 truncate text-base font-extrabold text-white">
                    {currentSession?.deviceName ||
                      "This device"}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {formatRelativeActivity(
                      currentSession?.lastActiveAt ||
                        currentSession?.lastActivityAt ||
                        currentSession?.updatedAt ||
                        currentSession?.createdAt,
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-xs font-bold text-emerald-200">
                <CheckCircle2 className="h-4 w-4" />
                This session remains signed in during bulk revocation.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <InsightCard
            icon={MonitorSmartphone}
            label="Signed-in devices"
            value={sessions.length}
            description="All sessions currently authorised for your account."
          />

          <InsightCard
            icon={ShieldAlert}
            label="Other sessions"
            value={otherSessionCount}
            description="Devices that can be revoked without signing out this device."
            tone="blue"
          />

          <InsightCard
            icon={Clock3}
            label="Recently active"
            value={recentlyActiveCount}
            description="Sessions with activity recorded during the last 24 hours."
            tone="emerald"
          />
        </section>

        <section className="mt-7">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">
                Session inventory
              </p>

              <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                Devices with account access
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Revoke anything unfamiliar. Current-device access is clearly identified.
              </p>
            </div>

            {!sessionQuery.isLoading &&
              !sessionQuery.isError && (
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  {sessions.length} active{" "}
                  {sessions.length === 1
                    ? "session"
                    : "sessions"}
                </span>
              )}
          </div>

          {sessionQuery.isLoading ? (
            <div className="grid gap-5 md:grid-cols-2">
              {Array.from({
                length: 4,
              }).map((_, index) => (
                <LoadingSkeleton
                  key={index}
                  className="h-72 rounded-[28px]"
                />
              ))}
            </div>
          ) : sessionQuery.isError ? (
            <div className="rounded-[30px] border border-red-200 bg-red-50/80 p-8 text-center shadow-sm">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-red-500 shadow-sm">
                <AlertCircle className="h-7 w-7" />
              </span>

              <p className="mt-5 text-base font-extrabold text-red-950">
                Unable to load active sessions
              </p>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-red-700">
                {getErrorMessage(
                  sessionQuery.error,
                  "Check the active session endpoint.",
                )}
              </p>

              <button
                type="button"
                onClick={() =>
                  sessionQuery.refetch()
                }
                className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-white px-4 py-2.5 text-xs font-extrabold text-red-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <RefreshCw className="h-4 w-4" />
                Try again
              </button>
            </div>
          ) : sessions.length === 0 ? (
            <div className="rounded-[30px] border border-dashed border-slate-300 bg-white/80 p-12 text-center shadow-sm">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                <Laptop className="h-8 w-8" />
              </span>

              <p className="mt-5 text-base font-extrabold text-slate-800">
                No active sessions found
              </p>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Signed-in devices will appear here when session information becomes available.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {sessions.map(
                (session) => (
                  <div
                    key={session.id}
                    className="group rounded-[30px] bg-gradient-to-br from-slate-200 via-white to-blue-100 p-px shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="h-full rounded-[29px] bg-white">
                      <ActiveSessionCard
                        session={session}
                        revoking={
                          revokeMutation.isPending &&
                          sessionToRevoke?.id ===
                            session.id
                        }
                        onRevoke={
                          setSessionToRevoke
                        }
                      />
                    </div>
                  </div>
                ),
              )}
            </div>
          )}
        </section>

        <section className="mt-7 rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
          <div className="grid gap-6 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <ShieldCheck className="h-6 w-6" />
            </span>

            <div>
              <h2 className="text-base font-black text-slate-950">
                See something you do not recognise?
              </h2>

              <p className="mt-1 text-sm leading-6 text-slate-500">
                Revoke the session immediately, then change your password and review your recent login activity.
              </p>
            </div>

            <div className="flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs font-extrabold text-emerald-700">
              <ShieldCheck className="h-4 w-4" />
              Security controls active
            </div>
          </div>
        </section>
      </div>

      <ConfirmDialog
        open={Boolean(
          sessionToRevoke,
        )}
        title="Revoke this session?"
        description={`${sessionToRevoke?.deviceName || "This device"} will be signed out and will need to authenticate again.`}
        confirmText="Revoke session"
        danger
        loading={
          revokeMutation.isPending
        }
        onCancel={() =>
          setSessionToRevoke(null)
        }
        onConfirm={() => {
          if (
            sessionToRevoke?.id
          ) {
            revokeMutation.mutate(
              sessionToRevoke.id,
            );
          }
        }}
      />

      <ConfirmDialog
        open={revokeAllOpen}
        title="Revoke all other sessions?"
        description="Every device except your current session will be signed out."
        confirmText="Revoke all others"
        danger
        loading={
          revokeAllMutation.isPending
        }
        onCancel={() =>
          setRevokeAllOpen(false)
        }
        onConfirm={() =>
          revokeAllMutation.mutate()
        }
      />
    </div>
  );
}
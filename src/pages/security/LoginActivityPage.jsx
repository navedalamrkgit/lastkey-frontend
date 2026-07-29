import {
  Activity,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Filter,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";
import {
  useQuery,
} from "@tanstack/react-query";

import {
  securityApi,
} from "../../api/securityApi";
import LoginActivityItem from "../../components/security/LoginActivityItem";
import PageHeader from "../../components/layout/PageHeader";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import {
  getErrorMessage,
} from "../../utils/errorHandler";

function normalizeActivityResponse(
  response,
) {
  const data = response?.data;

  if (Array.isArray(data)) {
    return {
      activities: data,
      totalPages: 1,
      page: 0,
    };
  }

  if (Array.isArray(data?.content)) {
    return {
      activities: data.content,
      totalPages:
        Number(data.totalPages) ||
        1,
      page:
        Number(data.number) || 0,
    };
  }

  return {
    activities:
      data?.activities || [],
    totalPages:
      Number(data?.totalPages) ||
      1,
    page: Number(data?.page) || 0,
  };
}

function MetricCard({
  icon: Icon,
  label,
  value,
  description,
  tone = "slate",
}) {
  const tones = {
    slate: {
      shell:
        "border-slate-200 bg-white",
      icon:
        "bg-slate-100 text-slate-600",
      value:
        "text-slate-950",
      text:
        "text-slate-500",
    },
    emerald: {
      shell:
        "border-emerald-200 bg-emerald-50/70",
      icon:
        "bg-white text-emerald-600 shadow-sm",
      value:
        "text-emerald-950",
      text:
        "text-emerald-700",
    },
    amber: {
      shell:
        "border-amber-200 bg-amber-50/70",
      icon:
        "bg-white text-amber-600 shadow-sm",
      value:
        "text-amber-950",
      text:
        "text-amber-700",
    },
    red: {
      shell:
        "border-red-200 bg-red-50/70",
      icon:
        "bg-white text-red-600 shadow-sm",
      value:
        "text-red-950",
      text:
        "text-red-700",
    },
  };

  const style =
    tones[tone] || tones.slate;

  return (
    <article
      className={`rounded-[28px] border p-5 shadow-sm ${style.shell}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${style.icon}`}
        >
          <Icon className="h-5 w-5" />
        </span>

        <span className="rounded-full border border-current/10 bg-white/60 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.16em] opacity-70">
          Recent
        </span>
      </div>

      <p
        className={`mt-5 text-3xl font-black tracking-tight ${style.value}`}
      >
        {value}
      </p>

      <p
        className={`mt-1 text-sm font-extrabold ${style.value}`}
      >
        {label}
      </p>

      <p
        className={`mt-2 text-xs leading-5 ${style.text}`}
      >
        {description}
      </p>
    </article>
  );
}

export default function LoginActivityPage() {
  const [
    page,
    setPage,
  ] = useState(0);

  const [
    status,
    setStatus,
  ] = useState("");

  const activityQuery =
    useQuery({
      queryKey: [
        "login-activity",
        {
          page,
          status,
        },
      ],

      queryFn: async () => {
        const response =
          await securityApi.getLoginActivity({
            page,
            size: 20,
            status:
              status || undefined,
            sort:
              "createdAt,desc",
          });

        return normalizeActivityResponse(
          response,
        );
      },
    });

  const activities =
    activityQuery.data
      ?.activities || [];

  const currentPage =
    activityQuery.data?.page ||
    0;

  const totalPages =
    activityQuery.data
      ?.totalPages || 1;

  const summary =
    useMemo(() => {
      const result = {
        total: activities.length,
        success: 0,
        failed: 0,
        blocked: 0,
      };

      activities.forEach(
        (activity) => {
          const activityStatus =
            String(
              activity?.status ||
                activity?.loginStatus ||
                "",
            ).toUpperCase();

          if (
            activityStatus ===
            "SUCCESS"
          ) {
            result.success += 1;
          } else if (
            activityStatus ===
            "BLOCKED"
          ) {
            result.blocked += 1;
          } else if (
            activityStatus ===
            "FAILED"
          ) {
            result.failed += 1;
          }
        },
      );

      return result;
    }, [activities]);

  const activeFilterLabel =
    status === "SUCCESS"
      ? "Successful attempts"
      : status === "FAILED"
        ? "Failed attempts"
        : status === "BLOCKED"
          ? "Blocked attempts"
          : "All attempts";

  return (
    <div className="page-enter min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.08),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(59,130,246,0.07),_transparent_28%)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow="Security history"
          title="Login activity"
          description="Review successful, failed and blocked sign-in attempts."
          actions={
            <button
              type="button"
              onClick={() =>
                activityQuery.refetch()
              }
              disabled={
                activityQuery.isFetching
              }
              className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-extrabold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-blue-200 hover:text-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  activityQuery.isFetching
                    ? "animate-spin"
                    : ""
                }`}
              />
              Refresh
            </button>
          }
        />

        <section className="relative mt-7 overflow-hidden rounded-[34px] border border-slate-200/80 bg-slate-950 px-6 py-7 text-white shadow-2xl shadow-slate-950/10 sm:px-8 sm:py-8">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />
          <div className="absolute -bottom-20 left-1/4 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative grid gap-7 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-violet-200">
                <Sparkles className="h-3.5 w-3.5" />
                Login intelligence
              </span>

              <h2 className="mt-5 max-w-2xl text-2xl font-black tracking-tight sm:text-3xl">
                Every sign-in attempt tells a security story.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Review account access patterns, catch unusual behaviour early, and confirm that recognised devices are the only ones signing in.
              </p>

              <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold text-slate-300">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-300" />
                  Successful logins
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <ShieldAlert className="h-4 w-4 text-amber-300" />
                  Failed attempts
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                  <XCircle className="h-4 w-4 text-red-300" />
                  Blocked access
                </span>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-400">
                    Current view
                  </p>

                  <p className="mt-2 text-lg font-black text-white">
                    {activeFilterLabel}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Page {currentPage + 1} of{" "}
                    {totalPages}
                  </p>
                </div>

                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-violet-300">
                  <Activity className="h-5 w-5" />
                </span>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/10 px-4 py-3 text-xs leading-5 text-slate-300">
                Use filters to focus on failed or blocked access when investigating suspicious account activity.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon={Activity}
            label="Events on page"
            value={summary.total}
            description="Total login records loaded for the current page."
          />

          <MetricCard
            icon={CheckCircle2}
            label="Successful"
            value={summary.success}
            description="Sign-ins completed successfully."
            tone="emerald"
          />

          <MetricCard
            icon={AlertCircle}
            label="Failed"
            value={summary.failed}
            description="Attempts that could not authenticate."
            tone="amber"
          />

          <MetricCard
            icon={XCircle}
            label="Blocked"
            value={summary.blocked}
            description="Access prevented by account security controls."
            tone="red"
          />
        </section>

        <section className="mt-7 rounded-[30px] border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                <Filter className="h-5 w-5" />
              </span>

              <div>
                <p className="text-sm font-black text-slate-950">
                  Filter login events
                </p>

                <p className="mt-0.5 text-xs text-slate-500">
                  Narrow the activity timeline by security result.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  value={status}
                  onChange={(event) => {
                    setStatus(
                      event.target.value,
                    );

                    setPage(0);
                  }}
                  className="h-12 min-w-56 appearance-none rounded-2xl border border-slate-200 bg-white pl-11 pr-10 text-sm font-bold text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                >
                  <option value="">
                    All login attempts
                  </option>

                  <option value="SUCCESS">
                    Successful
                  </option>

                  <option value="FAILED">
                    Failed
                  </option>

                  <option value="BLOCKED">
                    Blocked
                  </option>
                </select>
              </div>

              {status && (
                <button
                  type="button"
                  onClick={() => {
                    setStatus("");
                    setPage(0);
                  }}
                  className="inline-flex h-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 px-4 text-xs font-extrabold text-slate-600 transition hover:border-slate-300 hover:bg-white"
                >
                  Clear filter
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="mt-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-violet-600">
                Activity timeline
              </p>

              <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                Recent sign-in events
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Review time, location, device and result for every login attempt.
              </p>
            </div>

            {!activityQuery.isLoading &&
              !activityQuery.isError && (
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 shadow-sm">
                  <Activity className="h-4 w-4 text-violet-600" />
                  {activities.length} event
                  {activities.length === 1
                    ? ""
                    : "s"}
                </span>
              )}
          </div>

          <div className="space-y-4">
            {activityQuery.isLoading ? (
              Array.from({
                length: 7,
              }).map((_, index) => (
                <LoadingSkeleton
                  key={index}
                  className="h-36 rounded-[28px]"
                />
              ))
            ) : activityQuery.isError ? (
              <div className="rounded-[30px] border border-red-200 bg-red-50/80 p-8 text-center shadow-sm">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-red-500 shadow-sm">
                  <Activity className="h-7 w-7" />
                </span>

                <p className="mt-5 text-base font-extrabold text-red-950">
                  Unable to load login activity
                </p>

                <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-red-700">
                  {getErrorMessage(
                    activityQuery.error,
                    "Check the login activity endpoint.",
                  )}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    activityQuery.refetch()
                  }
                  className="mt-5 inline-flex items-center gap-2 rounded-2xl border border-red-200 bg-white px-4 py-2.5 text-xs font-extrabold text-red-700 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <RefreshCw className="h-4 w-4" />
                  Try again
                </button>
              </div>
            ) : activities.length === 0 ? (
              <div className="rounded-[30px] border border-dashed border-slate-300 bg-white/80 p-12 text-center shadow-sm">
                <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                  <Activity className="h-8 w-8" />
                </span>

                <p className="mt-5 text-base font-extrabold text-slate-800">
                  No login activity found
                </p>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Try a different filter or check back after your next account sign-in.
                </p>
              </div>
            ) : (
              activities.map(
                (activity) => (
                  <div
                    key={activity.id}
                    className="group rounded-[30px] bg-gradient-to-br from-slate-200 via-white to-violet-100 p-px shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <div className="rounded-[29px] bg-white">
                      <LoginActivityItem
                        activity={activity}
                      />
                    </div>
                  </div>
                ),
              )
            )}
          </div>
        </section>

        {!activityQuery.isLoading &&
          !activityQuery.isError &&
          totalPages > 1 && (
            <div className="mt-7 flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <button
                type="button"
                disabled={
                  currentPage <= 0
                }
                onClick={() =>
                  setPage(
                    (current) =>
                      Math.max(
                        current - 1,
                        0,
                      ),
                  )
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-extrabold text-slate-700 transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </button>

              <div className="text-center">
                <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
                  Activity pages
                </p>

                <p className="mt-1 text-sm font-black text-slate-700">
                  Page {currentPage + 1} of{" "}
                  {totalPages}
                </p>
              </div>

              <button
                type="button"
                disabled={
                  currentPage >=
                  totalPages - 1
                }
                onClick={() =>
                  setPage(
                    (current) =>
                      current + 1,
                  )
                }
                className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-xs font-extrabold text-slate-700 transition hover:border-blue-200 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}

        <section className="mt-7 rounded-[30px] border border-emerald-200 bg-emerald-50/70 p-6 shadow-sm sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </span>

            <div>
              <h2 className="text-base font-black text-emerald-950">
                Found an unfamiliar login?
              </h2>

              <p className="mt-1 text-sm leading-6 text-emerald-700">
                Change your password immediately and revoke unknown active sessions from the security center.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-2xl border border-emerald-200 bg-white px-4 py-3 text-xs font-extrabold text-emerald-700 shadow-sm">
              <ShieldCheck className="h-4 w-4" />
              Monitoring enabled
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
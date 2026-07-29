import {
  Activity,
  ArrowUpRight,
  BadgeCheck,
  CheckCircle2,
  Fingerprint,
  KeyRound,
  Laptop,
  LockKeyhole,
  Radar,
  ShieldCheck,
  ShieldEllipsis,
  ShieldX,
  Sparkles,
  UserCheck,
} from "lucide-react";
import {
  useQuery,
} from "@tanstack/react-query";
import {
  Link,
} from "react-router-dom";

import {
  securityApi,
} from "../../api/securityApi";
import SecurityChecklist from "../../components/security/SecurityChecklist";
import SecurityScoreCard from "../../components/security/SecurityScoreCard";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import {
  getErrorMessage,
} from "../../utils/errorHandler";
import {
  ROUTES,
} from "../../utils/routePaths";

const QUICK_ACTIONS = [
  {
    title: "Change password",
    description:
      "Refresh your credentials and keep account access protected.",
    to: ROUTES.CHANGE_PASSWORD,
    icon: KeyRound,
    tone:
      "from-blue-500/15 via-blue-50 to-white border-blue-200",
    iconClass:
      "bg-blue-600 text-white shadow-blue-600/20",
    textClass:
      "text-blue-700",
  },
  {
    title: "Login activity",
    description:
      "Inspect successful, failed and blocked sign-in attempts.",
    to: ROUTES.LOGIN_ACTIVITY,
    icon: Activity,
    tone:
      "from-violet-500/15 via-violet-50 to-white border-violet-200",
    iconClass:
      "bg-violet-600 text-white shadow-violet-600/20",
    textClass:
      "text-violet-700",
  },
  {
    title: "Active sessions",
    description:
      "Review signed-in devices and revoke unfamiliar access.",
    to: ROUTES.ACTIVE_SESSIONS,
    icon: Laptop,
    tone:
      "from-emerald-500/15 via-emerald-50 to-white border-emerald-200",
    iconClass:
      "bg-emerald-600 text-white shadow-emerald-600/20",
    textClass:
      "text-emerald-700",
  },
];

function getSecurityMeta(score) {
  const numericScore =
    Number(score) || 0;

  if (numericScore >= 80) {
    return {
      title:
        "Your protection is strong",
      description:
        "Your account has a healthy security posture. Keep reviewing devices and login activity regularly.",
      icon:
        ShieldCheck,
      badge:
        "Strong protection",
      badgeClass:
        "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
      glowClass:
        "from-emerald-400/20 via-blue-500/10 to-transparent",
      statusText:
        "Protected",
    };
  }

  if (numericScore >= 50) {
    return {
      title:
        "A few actions can improve your protection",
      description:
        "Review the recommended actions below to strengthen account access and identity security.",
      icon:
        ShieldEllipsis,
      badge:
        "Needs attention",
      badgeClass:
        "border-amber-300/20 bg-amber-400/10 text-amber-200",
      glowClass:
        "from-amber-400/20 via-orange-500/10 to-transparent",
      statusText:
        "Review recommended",
    };
  }

  return {
    title:
      "Important security actions are required",
    description:
      "Review recommendations, recent access and signed-in devices as soon as possible.",
    icon:
      ShieldX,
    badge:
      "At risk",
    badgeClass:
      "border-rose-300/20 bg-rose-400/10 text-rose-200",
    glowClass:
      "from-rose-400/20 via-red-500/10 to-transparent",
    statusText:
      "Action required",
  };
}

function MetricCard({
  icon: Icon,
  label,
  value,
  helper,
  tone = "blue",
}) {
  const tones = {
    blue: {
      shell:
        "border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50",
      icon:
        "bg-blue-600 text-white shadow-blue-600/20",
      accent:
        "text-blue-700",
    },
    rose: {
      shell:
        "border-rose-200 bg-gradient-to-br from-rose-50 via-white to-orange-50",
      icon:
        "bg-rose-600 text-white shadow-rose-600/20",
      accent:
        "text-rose-700",
    },
    emerald: {
      shell:
        "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50",
      icon:
        "bg-emerald-600 text-white shadow-emerald-600/20",
      accent:
        "text-emerald-700",
    },
    violet: {
      shell:
        "border-violet-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50",
      icon:
        "bg-violet-600 text-white shadow-violet-600/20",
      accent:
        "text-violet-700",
    },
  };

  const style =
    tones[tone] || tones.blue;

  return (
    <article
      className={`group rounded-[28px] border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${style.shell}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-lg ${style.icon}`}
        >
          <Icon className="h-5 w-5" />
        </span>

        <span className="text-3xl font-black tracking-tight text-slate-950">
          {value}
        </span>
      </div>

      <p
        className={`mt-5 text-[10px] font-black uppercase tracking-[0.16em] ${style.accent}`}
      >
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-600">
        {helper}
      </p>
    </article>
  );
}

export default function SecurityCenterPage() {
  const securityQuery =
    useQuery({
      queryKey: [
        "security-overview",
      ],

      queryFn: async () => {
        const response =
          await securityApi.getSecurityOverview();

        return response.data;
      },
    });

  if (
    securityQuery.isLoading
  ) {
    return (
      <div className="min-h-full bg-slate-50 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="w-full min-w-0">
          <LoadingSkeleton className="h-64 rounded-[36px]" />

          <div className="mt-6 grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
            <LoadingSkeleton className="h-[560px] rounded-[32px]" />
            <LoadingSkeleton className="h-[560px] rounded-[32px]" />
          </div>
        </div>
      </div>
    );
  }

  if (
    securityQuery.isError
  ) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-4 py-16">
        <div className="w-full max-w-lg rounded-[32px] border border-red-100 bg-white p-8 text-center shadow-xl shadow-red-100/40">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-red-50 text-red-500">
            <ShieldX className="h-8 w-8" />
          </span>

          <h1 className="mt-5 text-2xl font-black text-slate-950">
            Security overview unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {getErrorMessage(
              securityQuery.error,
              "Security information could not be loaded.",
            )}
          </p>

          <button
            type="button"
            onClick={() =>
              securityQuery.refetch()
            }
            className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-slate-950 px-6 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const overview =
    securityQuery.data || {};

  const securityMeta =
    getSecurityMeta(
      overview.securityScore,
    );

  const SecurityMetaIcon =
    securityMeta.icon;

  const recommendations =
    overview.recommendations || [];

  const metrics = [
    {
      label:
        "Active sessions",
      value:
        overview.activeSessionCount ??
        0,
      helper:
        "Devices currently signed in",
      icon:
        Laptop,
      tone:
        "blue",
    },
    {
      label:
        "Failed logins",
      value:
        overview.failedLoginCount ??
        0,
      helper:
        "Recent attempts detected",
      icon:
        LockKeyhole,
      tone:
        "rose",
    },
    {
      label:
        "Trusted nominees",
      value:
        overview.verifiedNomineeCount ??
        0,
      helper:
        "Verified emergency contacts",
      icon:
        UserCheck,
      tone:
        "emerald",
    },
    {
      label:
        "Recommendations",
      value:
        recommendations.length,
      helper:
        "Security actions available",
      icon:
        BadgeCheck,
      tone:
        "violet",
    },
  ];

  return (
    <div className="page-enter min-h-full min-w-0 overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.12),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(139,92,246,0.10),_transparent_28%),linear-gradient(180deg,#f8fbff_0%,#eef4ff_36%,#f8fafc_100%)] py-2 sm:py-3 lg:py-4">
      <div className="w-full min-w-0">
        <section className="relative overflow-hidden rounded-[36px] border border-slate-800 bg-slate-950 text-white shadow-2xl shadow-slate-950/20">
          <div
            className={`absolute inset-0 bg-gradient-to-br ${securityMeta.glowClass}`}
          />

          <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:32px_32px]" />

          <div className="relative grid gap-8 p-6 sm:p-8 xl:grid-cols-[1.2fr_0.8fr] xl:p-10">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-blue-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Security intelligence
                </span>

                <span
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.16em] ${securityMeta.badgeClass}`}
                >
                  <SecurityMetaIcon className="h-3.5 w-3.5" />
                  {securityMeta.badge}
                </span>
              </div>

              <h1 className="mt-6 max-w-3xl text-3xl font-black leading-tight tracking-[-0.03em] sm:text-4xl lg:text-[42px]">
                {securityMeta.title}
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                {securityMeta.description}
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to={
                    ROUTES.LOGIN_ACTIVITY
                  }
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-white px-5 text-sm font-black !text-slate-950 shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-50 hover:!text-slate-950"
                >
                  View login activity
                  <ArrowUpRight className="h-4 w-4" />
                </Link>

                <Link
                  to={
                    ROUTES.ACTIVE_SESSIONS
                  }
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.08] px-5 text-sm font-black text-white backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/[0.14]"
                >
                  Review devices
                  <Laptop className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[26px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-200">
                    <Radar className="h-5 w-5" />
                  </span>

                  <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-emerald-200">
                    Live
                  </span>
                </div>

                <p className="mt-5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Protection status
                </p>

                <p className="mt-1 text-xl font-black text-white">
                  {securityMeta.statusText}
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  LastKey continuously monitors access, activity and trusted relationships.
                </p>
              </div>

              <div className="rounded-[26px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-200">
                    <Fingerprint className="h-5 w-5" />
                  </span>

                  <span className="rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-blue-200">
                    Monitored
                  </span>
                </div>

                <p className="mt-5 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                  Identity protection
                </p>

                <p className="mt-1 text-xl font-black text-white">
                  Active monitoring
                </p>

                <p className="mt-2 text-xs leading-5 text-slate-400">
                  Sign-ins, devices and nominee verification remain under review.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map(
            (metric) => (
              <MetricCard
                key={
                  metric.label
                }
                {...metric}
              />
            ),
          )}
        </section>

        <section className="mt-6 grid min-w-0 items-start gap-6 xl:grid-cols-[340px_minmax(0,1fr)] 2xl:grid-cols-[360px_minmax(0,1fr)]">
          <div className="self-start xl:sticky xl:top-24">
            <SecurityScoreCard
              score={
                overview.securityScore
              }
              label={
                overview.securityLabel
              }
            />

            <div className="mt-5 overflow-hidden rounded-[30px] border border-violet-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 p-5 shadow-lg shadow-violet-100/40">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-600/20">
                  <Fingerprint className="h-5 w-5" />
                </span>

                <span className="rounded-full border border-violet-200 bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.14em] text-violet-700">
                  Identity
                </span>
              </div>

              <h3 className="mt-5 text-xl font-black text-slate-950">
                Protection is continuously monitored
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-600">
                LastKey tracks active access, login attempts and verified nominee relationships to help protect your digital legacy.
              </p>

              <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-3.5 py-3 text-xs font-bold text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Security checks are available
              </div>
            </div>
          </div>

          <div className="min-w-0 max-w-full space-y-6">
            <section className="overflow-hidden rounded-[30px] border border-slate-200 bg-white/90 shadow-xl shadow-slate-200/40 backdrop-blur">
              <div className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-r from-slate-950 via-blue-950 to-slate-950 px-5 py-5 text-white sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-300">
                    Recommended actions
                  </p>

                  <h2 className="mt-1 text-xl font-black">
                    Improve your protection
                  </h2>

                  <p className="mt-1 text-sm text-slate-300">
                    Complete the suggested actions to strengthen your security score.
                  </p>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs font-black text-blue-200">
                  {recommendations.length} available
                </span>
              </div>

              <div className="p-4 sm:p-6">
                <SecurityChecklist
                  recommendations={
                    recommendations
                  }
                />
              </div>
            </section>

            <section>
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-600">
                    Security controls
                  </p>

                  <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
                    Manage your protection
                  </h2>
                </div>

                <p className="text-sm text-slate-500">
                  Open a control to review or update it.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-3">
                {QUICK_ACTIONS.map(
                  (action) => {
                    const Icon =
                      action.icon;

                    return (
                      <Link
                        key={
                          action.title
                        }
                        to={
                          action.to
                        }
                        className={`group relative overflow-hidden rounded-[28px] border bg-gradient-to-br p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${action.tone}`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <span
                            className={`flex h-12 w-12 items-center justify-center rounded-2xl shadow-lg ${action.iconClass}`}
                          >
                            <Icon className="h-5 w-5" />
                          </span>

                          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition group-hover:border-slate-300 group-hover:text-slate-700">
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>

                        <p
                          className={`mt-5 text-[10px] font-black uppercase tracking-[0.16em] ${action.textClass}`}
                        >
                          Control
                        </p>

                        <h3 className="mt-1 text-lg font-black text-slate-950">
                          {action.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {action.description}
                        </p>
                      </Link>
                    );
                  },
                )}
              </div>
            </section>

            <section className="min-w-0 overflow-hidden rounded-[30px] border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-teal-50 p-5 shadow-sm sm:p-6">
              <div className="grid min-w-0 gap-5 2xl:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] 2xl:items-center">
                <div className="flex min-w-0 items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                    <ShieldCheck className="h-5 w-5" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-600">
                      Recommended focus
                    </p>

                    <h3 className="mt-1 text-lg font-black text-emerald-950">
                      Keep key security areas reviewed
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-emerald-700">
                      Regularly review password hygiene, device access and login history.
                    </p>
                  </div>
                </div>

                <div className="grid w-full min-w-0 gap-2 sm:grid-cols-3">
                  {[
                    "Password hygiene",
                    "Device access",
                    "Login history",
                  ].map(
                    (item) => (
                      <div
                        key={item}
                        className="min-w-0 rounded-2xl border border-emerald-200 bg-white/80 px-3 py-3 text-center text-xs font-black leading-5 text-emerald-800"
                      >
                        {item}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    </div>
  );
}
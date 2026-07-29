import {
  ArrowRight,
  CheckCircle2,
  Fingerprint,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routePaths";

export default function SecurityScoreCard({
  score = 82,
}) {
  const safeScore = Math.min(
    Math.max(Number(score) || 0, 0),
    100,
  );

  const circumference =
    2 * Math.PI * 44;

  const dashOffset =
    circumference -
    (safeScore / 100) * circumference;

  const status =
    safeScore >= 90
      ? "Excellent"
      : safeScore >= 75
        ? "Strong"
        : safeScore >= 55
          ? "Fair"
          : "Needs attention";

  const checklist = [
    {
      title: "Email address verified",
      completed: true,
    },
    {
      title: "Strong password configured",
      completed: true,
    },
    {
      title: "Emergency nominee pending",
      completed: false,
    },
  ];

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-6 shadow-[var(--card-shadow)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-accent)] hover:shadow-[var(--card-shadow-hover)]">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500" />

      <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-emerald-500/15 blur-3xl transition duration-500 group-hover:scale-125" />

      <div className="pointer-events-none absolute -bottom-24 -left-20 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-300">
              <ShieldCheck className="h-4 w-4" />
              Security score
            </p>

            <h2 className="mt-3 text-xl font-black tracking-[-0.025em] text-[var(--text-primary)]">
              Your vault is {status.toLowerCase()}
            </h2>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
              Complete the remaining security actions to make your
              LastKey account even harder to compromise.
            </p>
          </div>

          <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 shadow-sm sm:flex dark:text-emerald-300">
            <Fingerprint className="h-5 w-5" />
          </span>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-[150px_minmax(0,1fr)] sm:items-center">
          <div className="relative mx-auto h-36 w-36 shrink-0">
            <svg
              viewBox="0 0 100 100"
              className="h-full w-full -rotate-90 drop-shadow-[0_0_18px_rgba(16,185,129,0.18)]"
            >
              <defs>
                <linearGradient
                  id="securityScoreGradient"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#10b981"
                  />
                  <stop
                    offset="50%"
                    stopColor="#06b6d4"
                  />
                  <stop
                    offset="100%"
                    stopColor="#3b82f6"
                  />
                </linearGradient>
              </defs>

              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="var(--surface-inner)"
                strokeWidth="8"
              />

              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="url(#securityScoreGradient)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                className="transition-all duration-1000"
              />
            </svg>

            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 bg-clip-text text-4xl font-black tracking-[-0.055em] text-transparent">
                {safeScore}
              </span>

              <span className="mt-0.5 text-[9px] font-black uppercase tracking-[0.14em] text-[var(--text-subtle)]">
                out of 100
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {checklist.map((item) => (
              <div
                key={item.title}
                className="flex items-center gap-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-3.5"
              >
                <span
                  className={[
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border",
                    item.completed
                      ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                      : "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
                  ].join(" ")}
                >
                  {item.completed ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                </span>

                <span className="flex-1 text-xs font-semibold text-[var(--text-secondary)]">
                  {item.title}
                </span>

                <span
                  className={[
                    "text-[10px] font-black uppercase tracking-[0.08em]",
                    item.completed
                      ? "text-emerald-700 dark:text-emerald-300"
                      : "text-amber-700 dark:text-amber-300",
                  ].join(" ")}
                >
                  {item.completed ? "Done" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Link
          to={ROUTES.SECURITY_CENTER}
          className="mt-6 flex items-center justify-between rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-inner)] px-4 py-3 text-sm font-bold text-[var(--text-primary)] transition hover:border-[var(--border-accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-primary)]"
        >
          Improve security score
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
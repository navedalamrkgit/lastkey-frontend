import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  ShieldAlert,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routePaths";

export default function EmergencyStatusCard({
  nomineeCount = 2,
  verifiedNomineeCount = 1,
}) {
  const safeNomineeCount = Math.max(
    Number(nomineeCount) || 0,
    0,
  );

  const safeVerifiedCount = Math.min(
    Math.max(Number(verifiedNomineeCount) || 0, 0),
    safeNomineeCount,
  );

  const ready =
    safeNomineeCount > 0 &&
    safeVerifiedCount > 0;

  const verificationPercentage =
    safeNomineeCount > 0
      ? Math.round(
          (safeVerifiedCount / safeNomineeCount) * 100,
        )
      : 0;

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-6 shadow-[var(--card-shadow)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-accent)] hover:shadow-[var(--card-shadow-hover)]">
      <div
        className={[
          "absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r",
          ready
            ? "from-emerald-500 via-teal-500 to-cyan-500"
            : "from-amber-500 via-orange-500 to-rose-500",
        ].join(" ")}
      />

      <div
        className={[
          "pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full blur-3xl transition duration-500 group-hover:scale-125",
          ready
            ? "bg-emerald-500/15"
            : "bg-amber-500/15",
        ].join(" ")}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <span
            className={[
              "flex h-12 w-12 items-center justify-center rounded-2xl border shadow-sm",
              ready
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
            ].join(" ")}
          >
            {ready ? (
              <ShieldCheck className="h-6 w-6" />
            ) : (
              <ShieldAlert className="h-6 w-6" />
            )}
          </span>

          <span
            className={[
              "rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em]",
              ready
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
            ].join(" ")}
          >
            {ready
              ? "Configured"
              : "Action required"}
          </span>
        </div>

        <h2 className="mt-5 text-xl font-black tracking-[-0.025em] text-[var(--text-primary)]">
          Emergency access
        </h2>

        <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
          {ready
            ? "Your emergency release plan has at least one verified nominee and is ready for review."
            : "Add and verify a trusted nominee to complete your emergency release plan."}
        </p>

        <div className="mt-5 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-primary)] bg-[var(--surface-primary)] text-[var(--text-secondary)] shadow-sm">
              <UsersRound className="h-5 w-5" />
            </span>

            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-[var(--text-primary)]">
                {safeVerifiedCount} of {safeNomineeCount} verified
              </p>

              <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                Trusted nominees
              </p>
            </div>

            <span
              className={[
                "flex h-8 w-8 items-center justify-center rounded-xl",
                ready
                  ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : "bg-amber-500/10 text-amber-700 dark:text-amber-300",
              ].join(" ")}
            >
              {ready ? (
                <CheckCircle2 className="h-4 w-4" />
              ) : (
                <Clock3 className="h-4 w-4" />
              )}
            </span>
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-primary)]">
            <div
              className={[
                "h-full rounded-full bg-gradient-to-r transition-all duration-700",
                ready
                  ? "from-emerald-500 to-cyan-500"
                  : "from-amber-500 to-orange-500",
              ].join(" ")}
              style={{
                width: `${verificationPercentage}%`,
              }}
            />
          </div>
        </div>

        <Link
          to={ROUTES.EMERGENCY}
          className="mt-5 flex items-center justify-between rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-primary)] px-4 py-3 text-sm font-bold text-[var(--text-primary)] transition hover:border-[var(--border-accent)] hover:bg-[var(--surface-hover)] hover:text-[var(--accent-primary)]"
        >
          Review emergency plan
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
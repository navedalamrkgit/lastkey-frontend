import {
  ArrowDownRight,
  ArrowUpRight,
  MoreHorizontal,
} from "lucide-react";

const accentStyles = {
  blue: {
    line: "from-blue-500 via-indigo-500 to-violet-500",
    icon:
      "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    glow: "bg-blue-500/15",
    progress: "from-blue-500 to-indigo-500",
  },
  violet: {
    line: "from-violet-500 via-fuchsia-500 to-indigo-500",
    icon:
      "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
    glow: "bg-violet-500/15",
    progress: "from-violet-500 to-fuchsia-500",
  },
  cyan: {
    line: "from-cyan-500 via-sky-500 to-blue-500",
    icon:
      "border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
    glow: "bg-cyan-500/15",
    progress: "from-cyan-500 to-blue-500",
  },
  emerald: {
    line: "from-emerald-500 via-teal-500 to-cyan-500",
    icon:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    glow: "bg-emerald-500/15",
    progress: "from-emerald-500 to-cyan-500",
  },
  amber: {
    line: "from-amber-500 via-orange-500 to-rose-500",
    icon:
      "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    glow: "bg-amber-500/15",
    progress: "from-amber-500 to-orange-500",
  },
  rose: {
    line: "from-rose-500 via-pink-500 to-orange-500",
    icon:
      "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    glow: "bg-rose-500/15",
    progress: "from-rose-500 to-orange-500",
  },
};

export default function DashboardStatCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  trendDirection = "up",
  accent = "blue",
  progress = 72,
  iconClassName = "",
}) {
  const isPositive = trendDirection === "up";
  const styles =
    accentStyles[accent] ||
    accentStyles.blue;

  const safeProgress = Math.min(
    Math.max(Number(progress) || 0, 0),
    100,
  );

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-[26px]",
        "border border-[var(--border-primary)]",
        "bg-[var(--surface-primary)] p-5 sm:p-6",
        "shadow-[var(--card-shadow)]",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:border-[var(--border-accent)]",
        "hover:shadow-[var(--card-shadow-hover)]",
      ].join(" ")}
    >
      <span
        className={[
          "absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r",
          styles.line,
        ].join(" ")}
      />

      <span
        className={[
          "pointer-events-none absolute -right-16 -top-16",
          "h-36 w-36 rounded-full blur-3xl",
          "opacity-70 transition duration-300",
          "group-hover:scale-125 group-hover:opacity-100",
          styles.glow,
        ].join(" ")}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span
          className={[
            "flex h-12 w-12 items-center justify-center",
            "rounded-2xl border shadow-sm",
            "transition duration-300",
            "group-hover:scale-105 group-hover:-rotate-3",
            iconClassName || styles.icon,
          ].join(" ")}
        >
          <Icon className="h-[22px] w-[22px]" />
        </span>

        <div className="flex items-center gap-2">
          {trend ? (
            <span
              className={[
                "inline-flex items-center gap-1 rounded-full border",
                "px-2.5 py-1 text-[11px] font-black",
                isPositive
                  ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                  : "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
              ].join(" ")}
            >
              {isPositive ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5" />
              )}

              {trend}
            </span>
          ) : null}

          <button
            type="button"
            aria-label={`${title} options`}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-[var(--text-subtle)] transition hover:border-[var(--border-primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="relative mt-6">
        <p className="text-sm font-semibold text-[var(--text-muted)]">
          {title}
        </p>

        <p className="mt-1 text-3xl font-black tracking-[-0.045em] text-[var(--text-primary)]">
          {value}
        </p>

        <p className="mt-2 min-h-5 text-xs leading-5 text-[var(--text-subtle)]">
          {description}
        </p>
      </div>

      <div className="relative mt-5 h-1.5 overflow-hidden rounded-full bg-[var(--surface-inner)]">
        <div
          className={[
            "h-full rounded-full bg-gradient-to-r",
            "shadow-[0_0_16px_rgba(59,130,246,0.22)]",
            "transition-all duration-700",
            styles.progress,
          ].join(" ")}
          style={{
            width: `${safeProgress}%`,
          }}
        />
      </div>
    </article>
  );
}
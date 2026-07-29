import {
  ArrowUpRight,
  FilePlus2,
  Fingerprint,
  ShieldAlert,
  UserRoundPlus,
} from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routePaths";

const actions = [
  {
    title: "Upload document",
    description: "Add a protected file to your encrypted vault.",
    path: ROUTES.DOCUMENT_UPLOAD,
    icon: FilePlus2,
    accent: "blue",
  },
  {
    title: "Add nominee",
    description: "Choose someone you trust for your legacy plan.",
    path: ROUTES.ADD_NOMINEE,
    icon: UserRoundPlus,
    accent: "violet",
  },
  {
    title: "Emergency plan",
    description: "Review release conditions and waiting periods.",
    path: ROUTES.EMERGENCY,
    icon: ShieldAlert,
    accent: "rose",
  },
  {
    title: "Security center",
    description: "Strengthen account and vault protection.",
    path: ROUTES.SECURITY_CENTER,
    icon: Fingerprint,
    accent: "emerald",
  },
];

const accentStyles = {
  blue: {
    line: "from-blue-500 via-indigo-500 to-violet-500",
    icon:
      "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    glow: "bg-blue-500/15",
  },
  violet: {
    line: "from-violet-500 via-fuchsia-500 to-indigo-500",
    icon:
      "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
    glow: "bg-violet-500/15",
  },
  rose: {
    line: "from-rose-500 via-pink-500 to-orange-500",
    icon:
      "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    glow: "bg-rose-500/15",
  },
  emerald: {
    line: "from-emerald-500 via-teal-500 to-cyan-500",
    icon:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    glow: "bg-emerald-500/15",
  },
};

export default function QuickActions() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {actions.map((action) => {
        const Icon = action.icon;
        const styles = accentStyles[action.accent];

        return (
          <Link
            key={action.title}
            to={action.path}
            className={[
              "group relative overflow-hidden rounded-[24px]",
              "border border-[var(--border-primary)]",
              "bg-[var(--surface-primary)] p-5",
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
                "pointer-events-none absolute -right-12 -top-12",
                "h-28 w-28 rounded-full blur-3xl",
                "opacity-0 transition-opacity duration-300",
                "group-hover:opacity-100",
                styles.glow,
              ].join(" ")}
            />

            <span className="relative flex items-start justify-between gap-4">
              <span
                className={[
                  "flex h-12 w-12 shrink-0 items-center justify-center",
                  "rounded-2xl border shadow-sm",
                  "transition duration-300",
                  "group-hover:scale-105 group-hover:-rotate-3",
                  styles.icon,
                ].join(" ")}
              >
                <Icon className="h-5 w-5" />
              </span>

              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border-primary)] bg-[var(--surface-inner)] text-[var(--text-subtle)] transition duration-300 group-hover:border-[var(--border-accent)] group-hover:bg-[var(--accent-soft)] group-hover:text-[var(--accent-primary)]">
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </span>

            <span className="relative mt-5 block">
              <span className="block text-sm font-black tracking-[-0.01em] text-[var(--text-primary)]">
                {action.title}
              </span>

              <span className="mt-2 block text-xs leading-5 text-[var(--text-muted)]">
                {action.description}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
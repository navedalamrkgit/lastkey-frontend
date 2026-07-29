import {
  CheckCircle2,
  Clock3,
  ShieldAlert,
  XCircle,
} from "lucide-react";

import {
  NOMINEE_STATUSES,
} from "../../config/nomineeConfig";

const statusStyles = {
  VERIFIED: {
    icon: CheckCircle2,
    className:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  PENDING: {
    icon: Clock3,
    className:
      "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  REJECTED: {
    icon: XCircle,
    className:
      "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
  SUSPENDED: {
    icon: ShieldAlert,
    className:
      "border-slate-500/20 bg-slate-500/10 text-slate-700 dark:text-slate-300",
  },
};

export default function NomineeStatusBadge({
  status = "PENDING",
}) {
  const normalizedStatus =
    String(status || "PENDING")
      .trim()
      .toUpperCase();

  const statusConfig =
    NOMINEE_STATUSES[
      normalizedStatus
    ] ||
    NOMINEE_STATUSES.PENDING;

  const visualConfig =
    statusStyles[
      normalizedStatus
    ] ||
    statusStyles.PENDING;

  const Icon = visualConfig.icon;

  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
        "text-[10px] font-black uppercase tracking-[0.08em]",
        visualConfig.className,
      ].join(" ")}
    >
      <Icon className="h-3.5 w-3.5" />
      {statusConfig.label}
    </span>
  );
}
import { getEmergencyStatus } from "../../config/emergencyConfig";

export default function EmergencyStatusBadge({ status="PENDING_VERIFICATION" }) {
  const config = getEmergencyStatus(status);
  const Icon = config.icon;

  return (
    <span
      className={[
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5",
        "text-[11px] font-black uppercase tracking-[0.12em]",
        "shadow-sm transition-all duration-200",
        config.className,
      ].join(" ")}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/60 dark:bg-white/10">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span>{config.label}</span>
    </span>
  );
}
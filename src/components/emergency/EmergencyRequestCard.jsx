import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Fingerprint,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

import EmergencyStatusBadge from "./EmergencyStatusBadge";
import {
  getEmergencyTypeLabel,
} from "../../config/emergencyConfig";
import { formatDate } from "../../utils/formatDate";
import { ROUTES } from "../../utils/routePaths";
import { buildRoute } from "../../utils/routeUtils";

function InfoRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] px-3.5 py-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--border-primary)] bg-[var(--surface-primary)] text-[var(--text-subtle)]">
        <Icon className="h-4 w-4" />
      </span>

      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-[0.14em] text-[var(--text-subtle)]">
          {label}
        </p>

        <p className="mt-1 truncate text-xs font-bold text-[var(--text-primary)]">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function EmergencyRequestCard({
  request,
}) {
  const detailsPath = buildRoute(
    ROUTES.EMERGENCY_DETAILS,
    {
      requestId: request.id,
    },
  );

  const nomineeName =
    request.nomineeName ||
    request.nominee?.fullName ||
    [
      request.nominee?.firstName,
      request.nominee?.lastName,
    ]
      .filter(Boolean)
      .join(" ") ||
    "Nominee";

  const requestCode = String(
    request.id || "request",
  ).slice(0, 8);

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-[28px]",
        "border border-[var(--border-primary)]",
        "bg-[var(--surface-primary)] p-5",
        "shadow-[var(--card-shadow)]",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:border-amber-500/25",
        "hover:shadow-[var(--card-shadow-hover)]",
      ].join(" ")}
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />

      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-amber-500/12 blur-3xl transition duration-500 group-hover:scale-125" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <EmergencyStatusBadge
            status={request.status}
          />

          <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-primary)] bg-[var(--surface-inner)] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[var(--text-subtle)]">
            <Fingerprint className="h-3 w-3" />
            {requestCode}
          </span>
        </div>

        <Link
          to={detailsPath}
          className="mt-5 block"
        >
          <p className="text-[10px] font-black uppercase tracking-[0.14em] text-amber-700 dark:text-amber-300">
            Emergency request
          </p>

          <h2 className="mt-2 line-clamp-2 min-h-14 text-xl font-black leading-7 tracking-[-0.03em] text-[var(--text-primary)] transition group-hover:text-amber-700 dark:group-hover:text-amber-300">
            {getEmergencyTypeLabel(
              request.emergencyType,
            )}
          </h2>
        </Link>

        <p className="mt-3 line-clamp-3 min-h-[66px] text-sm leading-6 text-[var(--text-muted)]">
          {request.description ||
            "No emergency description was provided."}
        </p>

        <div className="mt-5 grid gap-3">
          <InfoRow
            icon={UserRound}
            label="Nominee"
            value={nomineeName}
          />

          <div className="grid grid-cols-2 gap-3">
            <InfoRow
              icon={CalendarDays}
              label="Incident"
              value={formatDate(
                request.incidentDate,
              )}
            />

            <InfoRow
              icon={Clock3}
              label="Created"
              value={formatDate(
                request.createdAt,
              )}
            />
          </div>
        </div>

        <Link
          to={detailsPath}
          className="mt-5 flex items-center justify-between rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-primary)] px-4 py-3.5 text-sm font-black text-[var(--text-primary)] transition hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300"
        >
          Open request control room

          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
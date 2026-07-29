import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  FileCheck2,
  KeyRound,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";

import { formatDate } from "../../utils/formatDate";

const statusMeta = {
  DRAFT: {
    label: "Request created",
    icon: Clock3,
    tone:
      "border-slate-500/20 bg-slate-500/10 text-slate-700 dark:text-slate-300",
  },
  PENDING_VERIFICATION: {
    label: "Identity verification pending",
    icon: KeyRound,
    tone:
      "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  IDENTITY_VERIFIED: {
    label: "Identity verified",
    icon: ShieldCheck,
    tone:
      "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  },
  UNDER_REVIEW: {
    label: "Evidence under review",
    icon: FileCheck2,
    tone:
      "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  },
  WAITING_PERIOD: {
    label: "Waiting period started",
    icon: Clock3,
    tone:
      "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  },
  APPROVED: {
    label: "Request approved",
    icon: CheckCircle2,
    tone:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  ACCESS_RELEASED: {
    label: "Document access released",
    icon: ShieldCheck,
    tone:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  },
  REJECTED: {
    label: "Request rejected",
    icon: XCircle,
    tone:
      "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
  CANCELLED: {
    label: "Request cancelled",
    icon: XCircle,
    tone:
      "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
  EXPIRED: {
    label: "Request expired",
    icon: AlertTriangle,
    tone:
      "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  },
};

function getEventStatus(event) {
  return (
    event.status ||
    event.eventType ||
    event.type ||
    "DRAFT"
  );
}

function getEventTitle(event) {
  const status =
    getEventStatus(event);

  return (
    event.title ||
    event.label ||
    event.action ||
    statusMeta[status]?.label ||
    String(status)
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/^\w/, (letter) =>
        letter.toUpperCase(),
      )
  );
}

function getEventDescription(event) {
  return (
    event.description ||
    event.message ||
    event.details ||
    event.note ||
    ""
  );
}

function getEventDate(event) {
  return (
    event.createdAt ||
    event.timestamp ||
    event.eventDate ||
    event.date ||
    event.updatedAt
  );
}

export default function EmergencyTimeline({
  events = [],
}) {
  if (!events.length) {
    return (
      <div className="rounded-2xl border border-dashed border-[var(--border-secondary)] bg-[var(--surface-inner)] px-4 py-8 text-center">
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300">
          <Clock3 className="h-5 w-5" />
        </span>

        <p className="mt-4 text-sm font-black text-[var(--text-primary)]">
          Timeline not started
        </p>

        <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
          Verification and review activity will appear here as the request progresses.
        </p>
      </div>
    );
  }

  return (
    <ol className="relative">
      {events.map((event, index) => {
        const status =
          getEventStatus(event);

        const meta =
          statusMeta[status] ||
          statusMeta.DRAFT;

        const Icon = meta.icon;
        const isLast =
          index === events.length - 1;

        return (
          <li
            key={
              event.id ||
              `${status}-${index}`
            }
            className="relative flex gap-4 pb-6 last:pb-0"
          >
            {!isLast && (
              <span className="absolute left-[19px] top-10 h-[calc(100%-16px)] w-px bg-gradient-to-b from-[var(--border-secondary)] to-transparent" />
            )}

            <span
              className={[
                "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border shadow-sm",
                meta.tone,
              ].join(" ")}
            >
              <Icon className="h-4.5 w-4.5" />
            </span>

            <div className="min-w-0 flex-1 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-4 transition hover:border-[var(--border-secondary)] hover:bg-[var(--surface-hover)]">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black text-[var(--text-primary)]">
                      {getEventTitle(event)}
                    </p>

                    {index === 0 && (
                      <Sparkles className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-300" />
                    )}
                  </div>

                  {getEventDescription(
                    event,
                  ) && (
                    <p className="mt-1.5 text-xs leading-5 text-[var(--text-muted)]">
                      {getEventDescription(
                        event,
                      )}
                    </p>
                  )}
                </div>

                {getEventDate(event) && (
                  <time className="shrink-0 rounded-full border border-[var(--border-primary)] bg-[var(--surface-primary)] px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.08em] text-[var(--text-subtle)]">
                    {formatDate(
                      getEventDate(event),
                    )}
                  </time>
                )}
              </div>

              {(event.performedBy ||
                event.actorName ||
                event.reviewedBy) && (
                <p className="mt-3 text-[10px] font-semibold text-[var(--text-subtle)]">
                  Updated by{" "}
                  {event.performedBy ||
                    event.actorName ||
                    event.reviewedBy}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
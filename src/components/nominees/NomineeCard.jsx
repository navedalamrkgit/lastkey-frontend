import {
  ChevronRight,
  FileLock2,
  Mail,
  MoreVertical,
  Phone,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

import NomineeStatusBadge from "./NomineeStatusBadge";
import {
  getRelationshipLabel,
} from "../../config/nomineeConfig";
import { ROUTES } from "../../utils/routePaths";
import { buildRoute } from "../../utils/routeUtils";
import { getInitials } from "../../utils/getInitials";

export default function NomineeCard({
  nominee,
  onDelete,
}) {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const menuRef = useRef(null);

  const detailsPath = buildRoute(
    ROUTES.NOMINEE_DETAILS,
    {
      nomineeId: nominee.id,
    },
  );

  const permissionsPath = buildRoute(
    ROUTES.NOMINEE_PERMISSIONS,
    {
      nomineeId: nominee.id,
    },
  );

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target,
        )
      ) {
        setMenuOpen(false);
      }
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  const initials = getInitials(
    nominee.firstName,
    nominee.lastName,
  );

  const fullName = [
    nominee.firstName,
    nominee.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const assignedDocumentCount =
    nominee.assignedDocumentCount || 0;

  const emergencyEnabled =
    Boolean(
      nominee.emergencyAccessEnabled,
    );

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-[28px]",
        "border border-[var(--border-primary)]",
        "bg-[var(--surface-primary)] p-5",
        "shadow-[var(--card-shadow)]",
        "transition-all duration-300",
        "hover:-translate-y-1",
        "hover:border-[var(--border-accent)]",
        "hover:shadow-[var(--card-shadow-hover)]",
      ].join(" ")}
    >
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500" />

      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl transition duration-500 group-hover:scale-125" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <Link
            to={detailsPath}
            className="flex min-w-0 items-center gap-3"
          >
            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[20px] bg-gradient-to-br from-violet-600 via-fuchsia-600 to-indigo-600 text-sm font-black text-white shadow-[0_14px_30px_rgba(124,58,237,0.28)] transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_35%)]" />
              <span className="relative">
                {initials || "NA"}
              </span>
            </span>

            <span className="min-w-0">
              <span className="block truncate text-base font-black tracking-[-0.02em] text-[var(--text-primary)] transition group-hover:text-violet-700 dark:group-hover:text-violet-300">
                {fullName || "Unnamed nominee"}
              </span>

              <span className="mt-1 block text-xs font-semibold text-[var(--text-muted)]">
                {getRelationshipLabel(
                  nominee.relationship,
                )}
              </span>
            </span>
          </Link>

          <div
            ref={menuRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setMenuOpen(
                  (current) => !current,
                )
              }
              className={[
                "flex h-9 w-9 items-center justify-center rounded-xl",
                "border border-transparent",
                "text-[var(--text-subtle)]",
                "transition duration-200",
                "hover:border-[var(--border-primary)]",
                "hover:bg-[var(--surface-hover)]",
                "hover:text-[var(--text-primary)]",
                menuOpen
                  ? "border-[var(--border-primary)] bg-[var(--surface-hover)] text-[var(--text-primary)]"
                  : "",
              ].join(" ")}
              aria-label={`Actions for ${nominee.firstName || "nominee"}`}
              aria-expanded={menuOpen}
              aria-haspopup="menu"
            >
              <MoreVertical className="h-5 w-5" />
            </button>

            {menuOpen && (
              <div
                role="menu"
                className="absolute right-0 top-11 z-30 w-56 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-elevated)] p-2 shadow-[var(--card-shadow-hover)] backdrop-blur-xl"
              >
                <Link
                  to={detailsPath}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  role="menuitem"
                >
                  <ChevronRight className="h-4 w-4 text-violet-600 dark:text-violet-300" />
                  View details
                </Link>

                <Link
                  to={permissionsPath}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  role="menuitem"
                >
                  <FileLock2 className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  Manage permissions
                </Link>

                <div className="my-1 h-px bg-[var(--border-primary)]" />

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);

                    if (
                      typeof onDelete ===
                      "function"
                    ) {
                      onDelete(nominee);
                    }
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-500/10 dark:text-rose-300"
                  role="menuitem"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove nominee
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <NomineeStatusBadge
            status={nominee.status}
          />

          <span
            className={[
              "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1",
              "text-[10px] font-black uppercase tracking-[0.08em]",
              emergencyEnabled
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-[var(--border-primary)] bg-[var(--surface-inner)] text-[var(--text-subtle)]",
            ].join(" ")}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            {emergencyEnabled
              ? "Emergency enabled"
              : "Emergency off"}
          </span>
        </div>

        <div className="mt-5 space-y-3 border-t border-[var(--border-primary)] pt-4">
          <div className="flex items-center gap-3 rounded-xl px-1 py-1 text-xs text-[var(--text-muted)]">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--border-primary)] bg-[var(--surface-inner)] text-[var(--text-subtle)]">
              <Mail className="h-4 w-4" />
            </span>

            <span className="truncate">
              {nominee.email ||
                "Email not added"}
            </span>
          </div>

          <div className="flex items-center gap-3 rounded-xl px-1 py-1 text-xs text-[var(--text-muted)]">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-[var(--border-primary)] bg-[var(--surface-inner)] text-[var(--text-subtle)]">
              <Phone className="h-4 w-4" />
            </span>

            <span className="truncate">
              {nominee.phone ||
                "Phone not added"}
            </span>
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300">
                <FileLock2 className="h-4 w-4" />
              </span>

              <div>
                <p className="text-xs font-bold text-[var(--text-secondary)]">
                  Assigned documents
                </p>

                <p className="mt-0.5 text-[10px] text-[var(--text-subtle)]">
                  Permission-controlled files
                </p>
              </div>
            </div>

            <span className="text-xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
              {assignedDocumentCount}
            </span>
          </div>
        </div>

        <Link
          to={detailsPath}
          className="mt-4 flex items-center justify-between rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-primary)] px-4 py-3 text-sm font-bold text-[var(--text-primary)] transition hover:border-[var(--border-accent)] hover:bg-[var(--surface-hover)] hover:text-[var(--accent-primary)]"
        >
          Open nominee profile

          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
import {
  CalendarClock,
  ChevronRight,
  Download,
  Eye,
  FileText,
  MoreVertical,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";

import DocumentStatusBadge from "./DocumentStatusBadge";
import {
  getDocumentCategory,
} from "../../config/documentConfig";
import {
  ROUTES,
} from "../../utils/routePaths";
import {
  buildRoute,
} from "../../utils/routeUtils";
import {
  formatDate,
} from "../../utils/formatDate";
import {
  formatFileSize,
  getFileExtension,
} from "../../utils/fileUtils";

function getSafeRoute(
  routePattern,
  fallbackPath,
  documentId,
) {
  if (
    typeof routePattern !== "string" ||
    !routePattern.trim()
  ) {
    return fallbackPath;
  }

  return buildRoute(
    routePattern,
    {
      documentId,
    },
  );
}

export default function DocumentCard({
  document: documentData,
  onDownload,
  onDelete,
}) {
  const [
    menuOpen,
    setMenuOpen,
  ] = useState(false);

  const menuRef =
    useRef(null);

  const category =
    getDocumentCategory(
      documentData?.category,
    );

  const CategoryIcon =
    category?.icon ||
    FileText;

  const documentId =
    documentData?.id;

  const detailsPath =
    getSafeRoute(
      ROUTES.DOCUMENT_DETAILS,
      `/dashboard/documents/${documentId}`,
      documentId,
    );

  const previewPath =
    getSafeRoute(
      ROUTES.DOCUMENT_PREVIEW,
      `/dashboard/documents/${documentId}/preview`,
      documentId,
    );

  const analysisPath =
    getSafeRoute(
      ROUTES.DOCUMENT_ANALYSIS,
      `/dashboard/documents/${documentId}/analysis`,
      documentId,
    );

  useEffect(() => {
    function handleOutsideClick(
      event,
    ) {
      if (
        menuRef.current &&
        !menuRef.current.contains(
          event.target,
        )
      ) {
        setMenuOpen(false);
      }
    }

    function handleEscape(
      event,
    ) {
      if (
        event.key ===
        "Escape"
      ) {
        setMenuOpen(false);
      }
    }

    /*
     * Use window.document explicitly.
     * The component receives a prop previously named
     * "document", which otherwise shadows the browser's
     * global document object.
     */
    window.document.addEventListener(
      "mousedown",
      handleOutsideClick,
    );

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () => {
      window.document.removeEventListener(
        "mousedown",
        handleOutsideClick,
      );

      window.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, []);

  if (
    !documentData ||
    !documentId
  ) {
    return null;
  }

  const extension =
    getFileExtension(
      documentData.fileName ||
        documentData.originalFileName ||
        documentData.title,
    ) || "FILE";

  const fileSize =
    documentData.fileSizeLabel ||
    formatFileSize(
      documentData.fileSize,
    );

  const expiryLabel =
    documentData.expiryDate
      ? formatDate(
          documentData.expiryDate,
        )
      : "No expiry";

  const issuerLabel =
    documentData.issuer ||
    "Private issuer";

  const isExpiring =
    documentData.status ===
    "EXPIRING_SOON";

  const categoryLabel =
    category?.label ||
    "Uncategorised";

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
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500" />

      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl transition duration-500 group-hover:scale-125" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[20px] border border-blue-500/20 bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-violet-500/10 text-blue-700 shadow-[0_14px_30px_rgba(59,130,246,0.16)] transition duration-300 group-hover:-rotate-3 group-hover:scale-105 dark:text-blue-300">
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.4),transparent_35%)]" />

              <CategoryIcon className="relative h-6 w-6" />
            </span>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[var(--border-primary)] bg-[var(--surface-inner)] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[var(--text-subtle)]">
                  {extension}
                </span>

                <DocumentStatusBadge
                  status={
                    documentData.status
                  }
                />
              </div>
            </div>
          </div>

          <div
            ref={menuRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() =>
                setMenuOpen(
                  (current) =>
                    !current,
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
              aria-label={`Actions for ${documentData.title}`}
              aria-expanded={
                menuOpen
              }
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
                  to={previewPath}
                  onClick={() =>
                    setMenuOpen(
                      false,
                    )
                  }
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  role="menuitem"
                >
                  <Eye className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  Preview
                </Link>

                <Link
                  to={analysisPath}
                  onClick={() =>
                    setMenuOpen(
                      false,
                    )
                  }
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  role="menuitem"
                >
                  <Sparkles className="h-4 w-4 text-violet-600 dark:text-violet-300" />
                  AI analysis
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);

                    if (
                      typeof onDownload ===
                      "function"
                    ) {
                      onDownload(
                        documentData,
                      );
                    }
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-[var(--text-secondary)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  role="menuitem"
                >
                  <Download className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                  Download
                </button>

                <div className="my-1 h-px bg-[var(--border-primary)]" />

                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);

                    if (
                      typeof onDelete ===
                      "function"
                    ) {
                      onDelete(
                        documentData,
                      );
                    }
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-700 transition hover:bg-rose-500/10 dark:text-rose-300"
                  role="menuitem"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete document
                </button>
              </div>
            )}
          </div>
        </div>

        <Link
          to={detailsPath}
          className="mt-5 block"
        >
          <h2 className="line-clamp-2 min-h-12 text-lg font-black leading-6 tracking-[-0.025em] text-[var(--text-primary)] transition group-hover:text-blue-700 dark:group-hover:text-blue-300">
            {documentData.title}
          </h2>

          <p className="mt-2 text-xs font-bold text-[var(--text-muted)]">
            {categoryLabel}
          </p>
        </Link>

        <div className="mt-5 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--text-subtle)]">
                Issuer
              </p>

              <p className="mt-1 truncate text-sm font-bold text-[var(--text-primary)]">
                {issuerLabel}
              </p>
            </div>

            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300">
              <Sparkles className="h-4 w-4" />
            </span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)] p-3.5">
            <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--text-subtle)]">
              File size
            </p>

            <p className="mt-2 text-sm font-black text-[var(--text-primary)]">
              {fileSize}
            </p>
          </div>

          <div
            className={[
              "rounded-2xl border p-3.5",
              isExpiring
                ? "border-amber-500/20 bg-amber-500/10"
                : "border-[var(--border-primary)] bg-[var(--surface-primary)]",
            ].join(" ")}
          >
            <p className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-[var(--text-subtle)]">
              <CalendarClock
                className={[
                  "h-3.5 w-3.5",
                  isExpiring
                    ? "text-amber-600 dark:text-amber-300"
                    : "",
                ].join(" ")}
              />
              Expiry
            </p>

            <p
              className={[
                "mt-2 text-sm font-black",
                isExpiring
                  ? "text-amber-700 dark:text-amber-300"
                  : "text-[var(--text-primary)]",
              ].join(" ")}
            >
              {expiryLabel}
            </p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Link
            to={previewPath}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-primary)] px-4 py-3 text-sm font-bold text-[var(--text-primary)] transition hover:border-blue-500/30 hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <Eye className="h-4 w-4" />
            Preview
          </Link>

          <Link
            to={analysisPath}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-violet-500/20 bg-violet-500/10 px-4 py-3 text-sm font-bold text-violet-700 transition hover:-translate-y-0.5 hover:bg-violet-500/15 dark:text-violet-300"
          >
            <Sparkles className="h-4 w-4" />
            AI insight
          </Link>
        </div>

        <Link
          to={detailsPath}
          className="mt-3 flex items-center justify-between rounded-2xl px-1 py-2 text-sm font-bold text-[var(--text-secondary)] transition hover:text-[var(--accent-primary)]"
        >
          Open document details

          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
import {
  ArrowRight,
  FileImage,
  FileText,
  MoreHorizontal,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routePaths";
import { formatDate } from "../../utils/formatDate";

const demoDocuments = [
  {
    id: "1",
    name: "Life Insurance Policy.pdf",
    category: "Insurance",
    size: "2.4 MB",
    uploadedAt: new Date().toISOString(),
    type: "PDF",
    status: "Verified",
  },
  {
    id: "2",
    name: "Property Registration.pdf",
    category: "Property",
    size: "4.8 MB",
    uploadedAt: new Date(Date.now() - 86400000).toISOString(),
    type: "PDF",
    status: "Protected",
  },
  {
    id: "3",
    name: "Bank Nominee Form.jpg",
    category: "Banking",
    size: "1.2 MB",
    uploadedAt: new Date(Date.now() - 172800000).toISOString(),
    type: "IMAGE",
    status: "Review",
  },
  {
    id: "4",
    name: "PAN Card.png",
    category: "Identity",
    size: "850 KB",
    uploadedAt: new Date(Date.now() - 259200000).toISOString(),
    type: "IMAGE",
    status: "Protected",
  },
];

const categoryStyles = {
  Insurance:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Property:
    "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  Banking:
    "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  Identity:
    "border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
};

const statusStyles = {
  Verified:
    "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  Protected:
    "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
  Review:
    "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
};

export default function RecentDocuments({
  documents = demoDocuments,
}) {
  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-[var(--border-primary)] bg-[var(--surface-primary)] shadow-[var(--card-shadow)]">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

      <div className="flex flex-col gap-4 border-b border-[var(--border-primary)] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent-primary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]" />
            Secure vault
          </p>

          <h2 className="mt-2 text-lg font-black tracking-[-0.02em] text-[var(--text-primary)]">
            Recent documents
          </h2>

          <p className="mt-1 text-xs text-[var(--text-muted)]">
            Latest files added to your protected workspace
          </p>
        </div>

        <Link
          to={ROUTES.DOCUMENTS}
          className="inline-flex w-fit items-center gap-2 rounded-xl border border-[var(--border-primary)] bg-[var(--surface-inner)] px-3.5 py-2 text-xs font-bold text-[var(--text-secondary)] transition hover:border-[var(--border-accent)] hover:bg-[var(--accent-soft)] hover:text-[var(--accent-primary)]"
        >
          View all
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      <div className="p-3 sm:p-4">
        {documents.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[var(--border-secondary)] bg-[var(--surface-inner)] px-6 py-12 text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300">
              <FileText className="h-6 w-6" />
            </span>

            <p className="mt-4 text-sm font-black text-[var(--text-primary)]">
              No documents uploaded
            </p>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              Upload your first important document to secure it.
            </p>

            <Link
              to={ROUTES.DOCUMENT_UPLOAD}
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_10px_22px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-500"
            >
              <Upload className="h-4 w-4" />
              Upload document
            </Link>
          </div>
        ) : (
          <div className="space-y-2">
            {documents.map((document) => {
              const Icon =
                document.type === "IMAGE"
                  ? FileImage
                  : FileText;

              return (
                <div
                  key={document.id}
                  className="group/row flex items-center gap-3 rounded-2xl border border-transparent px-3 py-3.5 transition-all duration-200 hover:border-[var(--border-primary)] hover:bg-[var(--surface-hover)] sm:px-4"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/15 to-violet-500/10 text-blue-700 shadow-sm transition duration-300 group-hover/row:scale-105 dark:text-blue-300">
                    <Icon className="h-5 w-5" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex min-w-0 items-center gap-2">
                      <p className="truncate text-sm font-bold text-[var(--text-primary)]">
                        {document.name}
                      </p>

                      <span
                        className={[
                          "hidden shrink-0 rounded-full border px-2 py-0.5",
                          "text-[9px] font-black uppercase tracking-[0.08em]",
                          statusStyles[document.status] ||
                            statusStyles.Protected,
                          "md:inline-flex",
                        ].join(" ")}
                      >
                        {document.status || "Protected"}
                      </span>
                    </div>

                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-[11px] text-[var(--text-subtle)]">
                      <span
                        className={[
                          "rounded-full border px-2 py-0.5 font-bold",
                          categoryStyles[document.category] ||
                            "border-[var(--border-primary)] bg-[var(--surface-inner)] text-[var(--text-muted)]",
                        ].join(" ")}
                      >
                        {document.category}
                      </span>

                      <span>{document.size}</span>
                      <span aria-hidden="true">•</span>
                      <span>{formatDate(document.uploadedAt)}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-transparent text-[var(--text-subtle)] opacity-80 transition group-hover/row:border-[var(--border-primary)] group-hover/row:bg-[var(--surface-primary)] group-hover/row:text-[var(--text-primary)] sm:opacity-0 sm:group-hover/row:opacity-100"
                    aria-label={`Options for ${document.name}`}
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </article>
  );
}
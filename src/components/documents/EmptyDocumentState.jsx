import {
  FilePlus2,
  FolderSearch2,
  RotateCcw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routePaths";

export default function EmptyDocumentState({
  filtered = false,
  onClearFilters,
}) {
  return (
    <section className="relative overflow-hidden rounded-[30px] border border-dashed border-[var(--border-secondary)] bg-[var(--surface-secondary)] px-5 py-14 text-center sm:px-8 sm:py-18">
      <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-xl">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-blue-500/20 via-cyan-500/15 to-violet-500/20 blur-xl" />

          <span className="relative flex h-20 w-20 items-center justify-center rounded-[26px] border border-blue-500/20 bg-[var(--surface-primary)] text-blue-700 shadow-[var(--card-shadow)] dark:text-blue-300">
            {filtered ? (
              <FolderSearch2 className="h-9 w-9" />
            ) : (
              <ShieldCheck className="h-9 w-9" />
            )}
          </span>

          <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-xl border border-violet-500/20 bg-violet-500/10 text-violet-700 shadow-sm dark:text-violet-300">
            <Sparkles className="h-4 w-4" />
          </span>
        </div>

        <p className="mt-7 text-[10px] font-black uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">
          {filtered
            ? "No matching records"
            : "Secure vault ready"}
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-[-0.035em] text-[var(--text-primary)] sm:text-3xl">
          {filtered
            ? "No documents match your filters"
            : "Your document vault is empty"}
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--text-muted)]">
          {filtered
            ? "Try changing the search term, category or status to find the document you need."
            : "Upload identity records, insurance policies, investments and other important documents to keep them organised and protected."}
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {filtered ? (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)] px-5 text-sm font-black text-[var(--text-primary)] shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--border-accent)] hover:bg-[var(--surface-hover)]"
            >
              <RotateCcw className="h-4 w-4" />
              Clear filters
            </button>
          ) : (
            <Link
              to={ROUTES.DOCUMENT_UPLOAD}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 text-sm font-black text-white shadow-[0_16px_40px_rgba(79,70,229,0.26)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_45px_rgba(79,70,229,0.34)]"
            >
              <FilePlus2 className="h-4 w-4" />
              Upload first document
            </Link>
          )}
        </div>

        {!filtered && (
          <div className="mx-auto mt-8 grid max-w-lg gap-3 text-left sm:grid-cols-3">
            {[
              "Encrypted storage",
              "Expiry tracking",
              "AI document insights",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)] px-3 py-3 text-center text-[11px] font-bold text-[var(--text-secondary)]"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
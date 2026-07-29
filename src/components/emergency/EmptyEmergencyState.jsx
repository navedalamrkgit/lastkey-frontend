import {
  FilterX,
  Plus,
  RotateCcw,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../ui/Button";
import { ROUTES } from "../../utils/routePaths";

export default function EmptyEmergencyState({
  filtered = false,
  onClearFilter,
}) {
  return (
    <section className="relative overflow-hidden rounded-[30px] border border-dashed border-[var(--border-secondary)] bg-[var(--surface-secondary)] px-5 py-14 text-center sm:px-8 sm:py-18">
      <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-20 h-64 w-64 rounded-full bg-rose-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-xl">
        <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
          <span className="absolute inset-0 rounded-[30px] bg-gradient-to-br from-amber-500/20 via-orange-500/15 to-rose-500/20 blur-xl" />

          <span className="relative flex h-20 w-20 items-center justify-center rounded-[26px] border border-amber-500/20 bg-[var(--surface-primary)] text-amber-700 shadow-[var(--card-shadow)] dark:text-amber-300">
            {filtered ? (
              <FilterX className="h-9 w-9" />
            ) : (
              <ShieldAlert className="h-9 w-9" />
            )}
          </span>

          <span className="absolute -right-1 -top-1 flex h-8 w-8 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-700 shadow-sm dark:text-rose-300">
            <Sparkles className="h-4 w-4" />
          </span>
        </div>

        <p className="mt-7 text-[10px] font-black uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
          {filtered
            ? "No matching cases"
            : "Emergency protocol ready"}
        </p>

        <h2 className="mt-3 text-2xl font-black tracking-[-0.035em] text-[var(--text-primary)] sm:text-3xl">
          {filtered
            ? "No requests match this stage"
            : "No emergency requests yet"}
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--text-muted)]">
          {filtered
            ? "Choose another workflow stage or clear the current filter to view all emergency requests."
            : "Emergency requests, nominee verification, evidence review and controlled document release will appear here."}
        </p>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {filtered ? (
            <button
              type="button"
              onClick={onClearFilter}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)] px-5 text-sm font-black text-[var(--text-primary)] shadow-sm transition hover:-translate-y-0.5 hover:border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-700 dark:hover:text-amber-300"
            >
              <RotateCcw className="h-4 w-4" />
              Clear filter
            </button>
          ) : (
            <Link
              to={ROUTES.CREATE_EMERGENCY}
              className="inline-block"
            >
              <Button leftIcon={Plus}>
                Create emergency request
              </Button>
            </Link>
          )}
        </div>

        {!filtered && (
          <div className="mx-auto mt-8 grid max-w-lg gap-3 text-left sm:grid-cols-3">
            {[
              "Identity verification",
              "Evidence review",
              "Controlled release",
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
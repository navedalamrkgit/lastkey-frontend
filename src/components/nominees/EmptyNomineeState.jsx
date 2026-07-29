import {
  FilterX,
  ShieldCheck,
  Sparkles,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";

import Button from "../ui/Button";
import { ROUTES } from "../../utils/routePaths";

export default function EmptyNomineeState({
  filtered = false,
  onClearFilters,
}) {
  return (
    <section className="relative overflow-hidden rounded-[30px] border border-dashed border-[var(--border-secondary)] bg-[var(--surface-primary)] px-6 py-16 text-center shadow-[var(--card-shadow)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.14),transparent_34%),radial-gradient(circle_at_90%_100%,rgba(59,130,246,0.10),transparent_30%)]" />

      <div className="pointer-events-none absolute -left-16 -top-16 h-40 w-40 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-xl">
        <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-[26px] border border-violet-500/20 bg-gradient-to-br from-violet-500/15 via-fuchsia-500/10 to-blue-500/10 text-violet-700 shadow-[0_18px_38px_rgba(124,58,237,0.15)] dark:text-violet-300">
          {filtered ? (
            <FilterX className="h-9 w-9" />
          ) : (
            <UsersRound className="h-9 w-9" />
          )}
        </span>

        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.16em] text-violet-700 dark:text-violet-300">
          <Sparkles className="h-3.5 w-3.5" />

          {filtered
            ? "No results found"
            : "Build your trusted network"}
        </div>

        <h2 className="mt-5 text-2xl font-black tracking-[-0.035em] text-[var(--text-primary)]">
          {filtered
            ? "No matching nominees"
            : "No trusted nominees yet"}
        </h2>

        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--text-muted)]">
          {filtered
            ? "Try changing your search, relationship or verification filters to discover matching nominees."
            : "Add a trusted family member, legal advisor or another person who may receive selected information under your rules."}
        </p>

        {!filtered && (
          <div className="mx-auto mt-7 grid max-w-lg gap-3 sm:grid-cols-3">
            {[
              "Secure access",
              "Verified identity",
              "Controlled release",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-3"
              >
                <ShieldCheck className="mx-auto h-4 w-4 text-emerald-700 dark:text-emerald-300" />

                <p className="mt-2 text-[10px] font-bold text-[var(--text-secondary)]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          {filtered ? (
            <Button
              variant="secondary"
              onClick={onClearFilters}
              leftIcon={FilterX}
            >
              Clear filters
            </Button>
          ) : (
            <Link
              to={ROUTES.ADD_NOMINEE}
            >
              <Button
                leftIcon={UserRoundPlus}
                className="shadow-[0_14px_32px_rgba(124,58,237,0.24)]"
              >
                Add first nominee
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
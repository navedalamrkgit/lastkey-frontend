import {
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
  UserRoundCheck,
  UsersRound,
  X,
} from "lucide-react";

const relationshipOptions = [
  { value: "", label: "All relationships" },
  { value: "SPOUSE", label: "Spouse" },
  { value: "PARENT", label: "Parent" },
  { value: "CHILD", label: "Child" },
  { value: "SIBLING", label: "Sibling" },
  { value: "RELATIVE", label: "Relative" },
  { value: "FRIEND", label: "Friend" },
  {
    value: "LEGAL_ADVISOR",
    label: "Legal advisor",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];

const statusOptions = [
  { value: "", label: "All statuses" },
  { value: "VERIFIED", label: "Verified" },
  { value: "PENDING", label: "Pending" },
  { value: "REJECTED", label: "Rejected" },
  { value: "SUSPENDED", label: "Suspended" },
];

function FilterSelect({
  label,
  value,
  onChange,
  icon: Icon,
  options,
}) {
  return (
    <label className="group block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.16em] text-[var(--text-subtle)]">
        {label}
      </span>

      <span className="relative block">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-subtle)] transition group-focus-within:text-[var(--accent-primary)]">
          <Icon className="h-4 w-4" />
        </span>

        <select
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          className={[
            "h-12 w-full appearance-none rounded-2xl",
            "border border-[var(--border-primary)]",
            "bg-[var(--surface-inner)]",
            "pl-10 pr-10 text-sm font-semibold",
            "text-[var(--text-primary)]",
            "outline-none transition duration-200",
            "hover:border-[var(--border-secondary)]",
            "focus:border-[var(--border-accent)]",
            "focus:ring-4 focus:ring-violet-500/10",
          ].join(" ")}
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <SlidersHorizontal className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)]" />
      </span>
    </label>
  );
}

export default function NomineeFilters({
  search = "",
  status = "",
  relationship = "",
  onSearchChange,
  onStatusChange,
  onRelationshipChange,
  onClear,
}) {
  const activeFilterCount = [
    search,
    status,
    relationship,
  ].filter(Boolean).length;

  const hasFilters =
    activeFilterCount > 0;

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-[var(--border-primary)] bg-[var(--surface-secondary)] p-4 sm:p-5">
      <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300">
              <Filter className="h-4 w-4" />
            </span>

            <div>
              <p className="text-sm font-black tracking-[-0.015em] text-[var(--text-primary)]">
                Find a nominee
              </p>

              <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                Search and narrow your trusted network.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {hasFilters && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-violet-700 dark:text-violet-300">
                <SlidersHorizontal className="h-3.5 w-3.5" />
                {activeFilterCount} active
              </span>
            )}

            <button
              type="button"
              onClick={onClear}
              disabled={!hasFilters}
              className={[
                "inline-flex h-10 items-center justify-center gap-2 rounded-xl px-3.5",
                "border border-[var(--border-primary)]",
                "bg-[var(--surface-primary)]",
                "text-xs font-bold text-[var(--text-secondary)]",
                "transition duration-200",
                hasFilters
                  ? "hover:border-[var(--border-accent)] hover:bg-[var(--surface-hover)] hover:text-[var(--accent-primary)]"
                  : "cursor-not-allowed opacity-40",
              ].join(" ")}
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Clear
            </button>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(260px,1.5fr)_minmax(190px,0.75fr)_minmax(210px,0.85fr)]">
          <label className="group block">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.16em] text-[var(--text-subtle)]">
              Search nominee
            </span>

            <span className="relative block">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)] transition group-focus-within:text-[var(--accent-primary)]" />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  onSearchChange(
                    event.target.value,
                  )
                }
                placeholder="Search by name, email or phone..."
                className={[
                  "h-12 w-full rounded-2xl",
                  "border border-[var(--border-primary)]",
                  "bg-[var(--surface-inner)]",
                  "pl-10 pr-11 text-sm font-semibold",
                  "text-[var(--text-primary)]",
                  "placeholder:text-[var(--text-subtle)]",
                  "outline-none transition duration-200",
                  "hover:border-[var(--border-secondary)]",
                  "focus:border-[var(--border-accent)]",
                  "focus:ring-4 focus:ring-violet-500/10",
                ].join(" ")}
              />

              {search && (
                <button
                  type="button"
                  onClick={() =>
                    onSearchChange("")
                  }
                  className="absolute right-3 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-lg text-[var(--text-subtle)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </span>
          </label>

          <FilterSelect
            label="Verification status"
            value={status}
            onChange={onStatusChange}
            icon={UserRoundCheck}
            options={statusOptions}
          />

          <FilterSelect
            label="Relationship"
            value={relationship}
            onChange={
              onRelationshipChange
            }
            icon={UsersRound}
            options={
              relationshipOptions
            }
          />
        </div>

        {hasFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {search && (
              <button
                type="button"
                onClick={() =>
                  onSearchChange("")
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-primary)] bg-[var(--surface-primary)] px-3 py-1.5 text-[10px] font-bold text-[var(--text-secondary)] transition hover:border-[var(--border-accent)] hover:text-[var(--accent-primary)]"
              >
                Search: “{search}”
                <X className="h-3 w-3" />
              </button>
            )}

            {status && (
              <button
                type="button"
                onClick={() =>
                  onStatusChange("")
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-primary)] bg-[var(--surface-primary)] px-3 py-1.5 text-[10px] font-bold text-[var(--text-secondary)] transition hover:border-[var(--border-accent)] hover:text-[var(--accent-primary)]"
              >
                {
                  statusOptions.find(
                    (item) =>
                      item.value === status,
                  )?.label
                }
                <X className="h-3 w-3" />
              </button>
            )}

            {relationship && (
              <button
                type="button"
                onClick={() =>
                  onRelationshipChange("")
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-primary)] bg-[var(--surface-primary)] px-3 py-1.5 text-[10px] font-bold text-[var(--text-secondary)] transition hover:border-[var(--border-accent)] hover:text-[var(--accent-primary)]"
              >
                {
                  relationshipOptions.find(
                    (item) =>
                      item.value ===
                      relationship,
                  )?.label
                }
                <X className="h-3 w-3" />
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
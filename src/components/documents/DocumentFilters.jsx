import {
  Grid2X2,
  List,
  RotateCcw,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { DOCUMENT_CATEGORIES } from "../../config/documentConfig";

const statusOptions = [
  { value: "", label: "All statuses" },
  { value: "ACTIVE", label: "Active" },
  {
    value: "EXPIRING_SOON",
    label: "Expiring soon",
  },
  { value: "EXPIRED", label: "Expired" },
  {
    value: "PROCESSING",
    label: "Processing",
  },
  { value: "ARCHIVED", label: "Archived" },
];

function FilterSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <label className="group block">
      <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.16em] text-[var(--text-subtle)]">
        {label}
      </span>

      <span className="relative block">
        <SlidersHorizontal className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)] transition group-focus-within:text-[var(--accent-primary)]" />

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
            "focus:ring-4 focus:ring-blue-500/10",
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

        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[10px] text-[var(--text-subtle)]">
          ▼
        </span>
      </span>
    </label>
  );
}

export default function DocumentFilters({
  search = "",
  category = "",
  status = "",
  viewMode = "grid",
  onSearchChange,
  onCategoryChange,
  onStatusChange,
  onViewModeChange,
  onClear,
}) {
  const activeFilterCount = [
    search,
    category,
    status,
  ].filter(Boolean).length;

  const hasFilters =
    activeFilterCount > 0;

  return (
    <section className="relative overflow-hidden rounded-[26px] border border-[var(--border-primary)] bg-[var(--surface-secondary)] p-4 sm:p-5">
      <div className="pointer-events-none absolute -right-24 -top-24 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative">
        <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300">
                <SlidersHorizontal className="h-4 w-4" />
              </span>

              <div>
                <p className="text-sm font-black tracking-[-0.015em] text-[var(--text-primary)]">
                  Search your vault
                </p>

                <p className="mt-0.5 text-xs text-[var(--text-muted)]">
                  Find documents by title, issuer, status or category.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {hasFilters && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-blue-700 dark:text-blue-300">
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

            <div className="flex rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-1">
              <button
                type="button"
                onClick={() =>
                  onViewModeChange("grid")
                }
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-xl transition",
                  viewMode === "grid"
                    ? "bg-[var(--surface-primary)] text-blue-600 shadow-sm dark:text-blue-300"
                    : "text-[var(--text-subtle)] hover:text-[var(--text-primary)]",
                ].join(" ")}
                aria-label="Grid view"
              >
                <Grid2X2 className="h-4.5 w-4.5" />
              </button>

              <button
                type="button"
                onClick={() =>
                  onViewModeChange("table")
                }
                className={[
                  "flex h-9 w-9 items-center justify-center rounded-xl transition",
                  viewMode === "table"
                    ? "bg-[var(--surface-primary)] text-blue-600 shadow-sm dark:text-blue-300"
                    : "text-[var(--text-subtle)] hover:text-[var(--text-primary)]",
                ].join(" ")}
                aria-label="Table view"
              >
                <List className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[minmax(300px,1.5fr)_minmax(210px,0.8fr)_minmax(190px,0.7fr)]">
          <label className="group block">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.16em] text-[var(--text-subtle)]">
              Search documents
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
                placeholder="Search title, issuer or document number..."
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
                  "focus:ring-4 focus:ring-blue-500/10",
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
            label="Category"
            value={category}
            onChange={onCategoryChange}
            options={[
              {
                value: "",
                label: "All categories",
              },
              ...DOCUMENT_CATEGORIES,
            ]}
          />

          <FilterSelect
            label="Status"
            value={status}
            onChange={onStatusChange}
            options={statusOptions}
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

            {category && (
              <button
                type="button"
                onClick={() =>
                  onCategoryChange("")
                }
                className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-primary)] bg-[var(--surface-primary)] px-3 py-1.5 text-[10px] font-bold text-[var(--text-secondary)] transition hover:border-[var(--border-accent)] hover:text-[var(--accent-primary)]"
              >
                {
                  DOCUMENT_CATEGORIES.find(
                    (item) =>
                      item.value ===
                      category,
                  )?.label
                }
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
          </div>
        )}
      </div>
    </section>
  );
}
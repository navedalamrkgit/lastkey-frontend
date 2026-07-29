import {
  Filter,
  Search,
  X,
} from "lucide-react";

import {
  NOTIFICATION_FILTER_OPTIONS,
} from "../../config/notificationConfig";

export default function NotificationFilters({
  search,
  type,
  readStatus,
  onSearchChange,
  onTypeChange,
  onReadStatusChange,
  onClear,
}) {
  const hasFilters =
    Boolean(
      search ||
        type ||
        readStatus,
    );

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />

          <input
            type="search"
            value={search}
            onChange={(event) =>
              onSearchChange(
                event.target.value,
              )
            }
            placeholder="Search notification title or message..."
            className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm outline-none transition hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
          />
        </div>

        <div className="relative">
          <Filter className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

          <select
            value={type}
            onChange={(event) =>
              onTypeChange(
                event.target.value,
              )
            }
            className="h-12 min-w-52 rounded-2xl border border-slate-200 bg-white pl-11 pr-4 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
          >
            {NOTIFICATION_FILTER_OPTIONS.map(
              (option) => (
                <option
                  key={
                    option.value ||
                    "all"
                  }
                  value={option.value}
                >
                  {option.label}
                </option>
              ),
            )}
          </select>
        </div>

        <select
          value={readStatus}
          onChange={(event) =>
            onReadStatusChange(
              event.target.value,
            )
          }
          className="h-12 min-w-44 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
        >
          <option value="">
            All statuses
          </option>

          <option value="UNREAD">
            Unread only
          </option>

          <option value="READ">
            Read only
          </option>
        </select>

        {hasFilters && (
          <button
            type="button"
            onClick={onClear}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl px-3 text-xs font-bold text-red-600 transition hover:bg-red-50"
          >
            <X className="h-4 w-4" />
            Clear filters
          </button>
        )}
      </div>
    </section>
  );
}
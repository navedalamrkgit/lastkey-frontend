import {
  BellOff,
  CheckCheck,
} from "lucide-react";

import Button from "../ui/Button";

export default function EmptyNotificationState({
  filtered = false,
  onClearFilters,
}) {
  return (
    <section className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
        {filtered ? (
          <BellOff className="h-8 w-8" />
        ) : (
          <CheckCheck className="h-8 w-8" />
        )}
      </span>

      <h2 className="mt-5 text-xl font-extrabold text-slate-950">
        {filtered
          ? "No matching notifications"
          : "You are all caught up"}
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
        {filtered
          ? "Try changing the notification type or read-status filter."
          : "New document, nominee, emergency and security alerts will appear here."}
      </p>

      {filtered && (
        <Button
          className="mt-7"
          variant="secondary"
          onClick={onClearFilters}
        >
          Clear filters
        </Button>
      )}
    </section>
  );
}
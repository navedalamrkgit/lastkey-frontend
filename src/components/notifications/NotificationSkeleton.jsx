import LoadingSkeleton from "../ui/LoadingSkeleton";

export default function NotificationSkeleton() {
  return (
    <div className="flex gap-4 rounded-3xl border border-slate-200 bg-white p-5">
      <LoadingSkeleton className="h-11 w-11 shrink-0" />

      <div className="min-w-0 flex-1">
        <LoadingSkeleton className="h-4 w-2/3" />

        <LoadingSkeleton className="mt-3 h-3 w-full" />

        <LoadingSkeleton className="mt-2 h-3 w-5/6" />

        <LoadingSkeleton className="mt-4 h-3 w-28" />
      </div>
    </div>
  );
}
import { DOCUMENT_STATUSES } from "../../config/documentConfig";

export default function DocumentStatusBadge({
  status = "ACTIVE",
}) {
  const statusConfig =
    DOCUMENT_STATUSES[status] ||
    DOCUMENT_STATUSES.ACTIVE;

  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1",
        "text-[10px] font-bold uppercase tracking-wider",
        statusConfig.className,
      ].join(" ")}
    >
      {statusConfig.label}
    </span>
  );
}
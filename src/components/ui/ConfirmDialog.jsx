import { AlertTriangle, X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

import Button from "./Button";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  danger = false,
  onConfirm,
  onCancel,
}) {
  useEffect(() => {
    if (!open) {
      return undefined;
    }

    function handleEscape(event) {
      if (event.key === "Escape" && !loading) {
        onCancel?.();
      }
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, loading, onCancel]);

  if (!open || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 z-0 cursor-default bg-slate-950/65 backdrop-blur-sm"
        onClick={() => {
          if (!loading) {
            onCancel?.();
          }
        }}
        aria-label="Close confirmation dialog"
      />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
        className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_30px_90px_-20px_rgba(15,23,42,0.55)]"
      >
        <button
          type="button"
          disabled={loading}
          onClick={onCancel}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:pointer-events-none disabled:opacity-50"
          aria-label="Close dialog"
        >
          <X className="h-5 w-5" />
        </button>

        <span
          className={[
            "flex h-12 w-12 items-center justify-center rounded-2xl",
            danger
              ? "bg-red-50 text-red-600"
              : "bg-amber-50 text-amber-600",
          ].join(" ")}
        >
          <AlertTriangle className="h-6 w-6" />
        </span>

        <h2
          id="confirm-dialog-title"
          className="mt-5 pr-10 text-xl font-extrabold text-slate-950"
        >
          {title}
        </h2>

        <p
          id="confirm-dialog-description"
          className="mt-3 text-sm leading-6 text-slate-500"
        >
          {description}
        </p>

        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="secondary"
            size="medium"
            disabled={loading}
            onClick={onCancel}
          >
            {cancelText}
          </Button>

          <Button
            variant={danger ? "danger" : "primary"}
            size="medium"
            loading={loading}
            loadingText="Cancelling..."
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </section>
    </div>,
    document.body,
  );
}
import {
  BadgeCheck,
  Download,
  Eye,
  FileImage,
  FileText,
  ScanText,
  ShieldCheck,
  Trash2,
} from "lucide-react";

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "Unknown size";
  }

  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );

  const value = bytes / 1024 ** unitIndex;

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

function getDocumentIcon(contentType = "") {
  return contentType.startsWith("image/")
    ? FileImage
    : FileText;
}

export default function EvidencePreviewCard({
  evidence,
  onPreview,
  onDownload,
  onDelete,
  deleting = false,
}) {
  if (!evidence) {
    return null;
  }

  const fileName =
    evidence.fileName ||
    evidence.originalFileName ||
    evidence.name ||
    "Evidence document";

  const contentType =
    evidence.contentType ||
    evidence.type ||
    "";

  const Icon = getDocumentIcon(contentType);

  const confidence =
    evidence.aiConfidence ??
    evidence.ocrConfidence ??
    null;

  const documentType =
    evidence.detectedDocumentType ||
    evidence.documentType ||
    "Supporting evidence";

  const status =
    evidence.status ||
    evidence.processingStatus ||
    "UPLOADED";

  return (
    <article className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_-38px_rgba(15,23,42,0.45)]">
      <div className="relative flex min-h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 via-white to-indigo-50 p-6">
        {evidence.previewUrl && contentType.startsWith("image/") ? (
          <img
            src={evidence.previewUrl}
            alt={fileName}
            className="max-h-56 w-full rounded-2xl object-contain"
          />
        ) : (
          <div className="flex flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-white text-indigo-600 shadow-sm">
              <Icon className="h-7 w-7" />
            </span>

            <p className="mt-4 max-w-xs truncate text-sm font-black text-slate-900">
              {fileName}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              Preview will be available after processing.
            </p>
          </div>
        )}

        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/90 px-2.5 py-1.5 text-[9px] font-black uppercase tracking-[0.1em] text-emerald-700 backdrop-blur">
          <BadgeCheck className="h-3.5 w-3.5" />
          {status}
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-base font-black text-slate-950">
              {fileName}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {formatFileSize(
                evidence.fileSize ||
                  evidence.size,
              )}
            </p>
          </div>

          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <Icon className="h-4.5 w-4.5" />
          </span>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
              Detected type
            </p>

            <p className="mt-2 text-sm font-black text-slate-900">
              {documentType}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
              AI confidence
            </p>

            <p className="mt-2 text-sm font-black text-slate-900">
              {confidence == null
                ? "Pending"
                : `${Math.round(confidence)}%`}
            </p>
          </div>
        </div>

        {evidence.extractedText && (
          <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-4">
            <div className="flex items-center gap-2 text-indigo-700">
              <ScanText className="h-4 w-4" />

              <p className="text-[10px] font-black uppercase tracking-[0.16em]">
                OCR preview
              </p>
            </div>

            <p className="mt-3 line-clamp-5 whitespace-pre-wrap text-xs leading-5 text-slate-600">
              {evidence.extractedText}
            </p>
          </div>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onPreview?.(evidence)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-xs font-black text-white transition hover:bg-slate-800"
          >
            <Eye className="h-4 w-4" />
            Preview
          </button>

          {onDownload && (
            <button
              type="button"
              onClick={() => onDownload(evidence)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black text-slate-700 transition hover:bg-slate-50"
            >
              <Download className="h-4 w-4" />
              Download
            </button>
          )}

          {onDelete && (
            <button
              type="button"
              disabled={deleting}
              onClick={() => onDelete(evidence)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 text-xs font-black text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              {deleting ? "Removing..." : "Remove"}
            </button>
          )}
        </div>

        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4">
          <ShieldCheck className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-600" />

          <p className="text-xs leading-5 text-emerald-800">
            Integrity and security checks remain attached to this evidence
            throughout the review process.
          </p>
        </div>
      </div>
    </article>
  );
}
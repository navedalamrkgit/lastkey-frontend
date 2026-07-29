import {
  CheckCircle2,
  CloudUpload,
  FileImage,
  FileText,
  LoaderCircle,
  ShieldCheck,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";

const ACCEPTED_FILE_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

const MAX_FILE_SIZE = 20 * 1024 * 1024;

function formatFileSize(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 KB";
  }

  const units = ["B", "KB", "MB", "GB"];
  const unitIndex = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1,
  );

  const value = bytes / 1024 ** unitIndex;

  return `${value.toFixed(value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}

function getFileIcon(file) {
  if (file?.type?.startsWith("image/")) {
    return FileImage;
  }

  return FileText;
}

function validateFile(file) {
  if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
    return "Only PDF, JPG and PNG files are supported.";
  }

  if (file.size > MAX_FILE_SIZE) {
    return "Each file must be smaller than 20 MB.";
  }

  return null;
}

export default function EvidenceUploadCard({
  files = [],
  uploading = false,
  uploadProgress = 0,
  onFilesSelected,
  onRemoveFile,
  disabled = false,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState("");

  const processFiles = useCallback(
    (fileList) => {
      const selectedFiles = Array.from(fileList || []);

      if (selectedFiles.length === 0) {
        return;
      }

      const validFiles = [];
      let validationMessage = "";

      selectedFiles.forEach((file) => {
        const error = validateFile(file);

        if (error && !validationMessage) {
          validationMessage = `${file.name}: ${error}`;
        }

        if (!error) {
          validFiles.push(file);
        }
      });

      setLocalError(validationMessage);

      if (validFiles.length > 0) {
        onFilesSelected?.(validFiles);
      }
    },
    [onFilesSelected],
  );

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled || uploading) {
      return;
    }

    processFiles(event.dataTransfer.files);
  };

  return (
    <section className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.45)] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
            Supporting evidence
          </p>

          <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-slate-950">
            Upload emergency documents
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Add clear proof such as a medical report, death certificate,
            insurance letter, FIR or other official evidence.
          </p>
        </div>

        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <CloudUpload className="h-5 w-5" />
        </span>
      </div>

      <button
        type="button"
        disabled={disabled || uploading}
        onClick={() => inputRef.current?.click()}
        onDragEnter={(event) => {
          event.preventDefault();
          if (!disabled && !uploading) {
            setIsDragging(true);
          }
        }}
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDragLeave={(event) => {
          event.preventDefault();

          if (event.currentTarget === event.target) {
            setIsDragging(false);
          }
        }}
        onDrop={handleDrop}
        className={[
          "mt-6 flex min-h-56 w-full flex-col items-center justify-center rounded-[26px] border-2 border-dashed px-6 py-8 text-center transition-all duration-200",
          isDragging
            ? "border-indigo-500 bg-indigo-50 ring-4 ring-indigo-500/10"
            : "border-slate-300 bg-slate-50/70 hover:border-indigo-300 hover:bg-indigo-50/40",
          disabled || uploading
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer",
        ].join(" ")}
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-3xl border border-indigo-100 bg-white text-indigo-600 shadow-sm">
          {uploading ? (
            <LoaderCircle className="h-7 w-7 animate-spin" />
          ) : (
            <UploadCloud className="h-7 w-7" />
          )}
        </span>

        <p className="mt-5 text-base font-black text-slate-950">
          {uploading
            ? "Uploading evidence..."
            : "Drag and drop evidence here"}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          or click to browse files
        </p>

        <p className="mt-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500 shadow-sm">
          PDF · JPG · PNG · Maximum 20 MB
        </p>

        {uploading && (
          <div className="mt-6 w-full max-w-sm">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500">
              <span>Upload progress</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 transition-all duration-300"
                style={{
                  width: `${Math.min(Math.max(uploadProgress, 0), 100)}%`,
                }}
              />
            </div>
          </div>
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        className="hidden"
        onChange={(event) => {
          processFiles(event.target.files);
          event.target.value = "";
        }}
      />

      {localError && (
        <p className="mt-3 text-xs font-bold text-rose-600">
          {localError}
        </p>
      )}

      {files.length > 0 && (
        <div className="mt-6 space-y-3">
          {files.map((item) => {
            const file = item.file || item;
            const Icon = getFileIcon(file);
            const fileId =
              item.id ||
              item.evidenceId ||
              `${file.name}-${file.size}`;

            return (
              <article
                key={fileId}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:flex-row sm:items-center"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm">
                  <Icon className="h-5 w-5" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-slate-950">
                    {file.name || item.fileName || "Evidence document"}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    <span>
                      {formatFileSize(file.size || item.fileSize)}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-slate-300" />

                    <span>
                      {(file.type || item.contentType || "Document")
                        .split("/")
                        .pop()
                        ?.toUpperCase()}
                    </span>

                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-emerald-700">
                      <CheckCircle2 className="h-3 w-3" />
                      Uploaded
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onRemoveFile?.(item)}
                  disabled={disabled || uploading}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-3 text-xs font-black text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Trash2 className="h-4 w-4" />
                  Remove
                </button>
              </article>
            );
          })}
        </div>
      )}

      <div className="mt-5 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

        <div>
          <p className="text-sm font-black text-blue-950">
            Protected upload
          </p>

          <p className="mt-1 text-xs leading-5 text-blue-800/80">
            Files are uploaded through the secured emergency workflow and are
            available only to authorised reviewers.
          </p>
        </div>
      </div>
    </section>
  );
}
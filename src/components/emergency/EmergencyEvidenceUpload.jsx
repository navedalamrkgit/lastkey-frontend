import {
  CheckCircle2,
  FileCheck2,
  FileUp,
  ShieldCheck,
  Trash2,
  UploadCloud,
  XCircle,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";

import Button from "../ui/Button";
import {
  EVIDENCE_TYPES,
} from "../../config/emergencyConfig";
import { formatFileSize } from "../../utils/fileUtils";

const MAX_FILE_SIZE =
  10 * 1024 * 1024;

function getEvidenceTypeLabel(value) {
  return (
    EVIDENCE_TYPES.find(
      (item) => item.value === value,
    )?.label ||
    String(value || "Evidence")
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/^\w/, (letter) =>
        letter.toUpperCase(),
      )
  );
}

function EvidenceItem({
  item,
  onDelete,
}) {
  return (
    <article className="group flex items-center gap-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-4 transition hover:border-emerald-500/25 hover:bg-emerald-500/5">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
        <FileCheck2 className="h-4.5 w-4.5" />
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-black text-[var(--text-primary)]">
          {item.fileName ||
            item.name ||
            "Evidence file"}
        </p>

        <div className="mt-1 flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold text-[var(--text-muted)]">
            {getEvidenceTypeLabel(
              item.evidenceType,
            )}
          </span>

          {item.fileSize && (
            <>
              <span className="h-1 w-1 rounded-full bg-[var(--text-subtle)]" />

              <span className="text-[10px] font-bold text-[var(--text-muted)]">
                {formatFileSize(
                  item.fileSize,
                )}
              </span>
            </>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={() => onDelete(item)}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-transparent text-[var(--text-subtle)] transition hover:border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-700 dark:hover:text-rose-300"
        aria-label={`Delete ${
          item.fileName ||
          item.name ||
          "evidence"
        }`}
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </article>
  );
}

export default function EmergencyEvidenceUpload({
  evidence = [],
  uploading = false,
  uploadProgress = 0,
  onUpload,
  onDelete,
}) {
  const [
    file,
    setFile,
  ] = useState(null);

  const [
    evidenceType,
    setEvidenceType,
  ] = useState("");

  const [
    description,
    setDescription,
  ] = useState("");

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    maxSize: MAX_FILE_SIZE,

    accept: {
      "application/pdf": [".pdf"],
      "image/jpeg": [
        ".jpg",
        ".jpeg",
      ],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },

    onDropAccepted: (
      acceptedFiles,
    ) => {
      setFile(
        acceptedFiles[0] || null,
      );
    },
  });

  const canUpload = useMemo(
    () =>
      Boolean(
        file &&
          evidenceType &&
          !uploading,
      ),
    [
      file,
      evidenceType,
      uploading,
    ],
  );

  const rejectionMessage =
    fileRejections[0]?.errors?.[0]
      ?.code === "file-too-large"
      ? "The file exceeds the 10 MB limit."
      : fileRejections.length
        ? "Only PDF, JPG, PNG and WEBP files are supported."
        : "";

  async function handleUpload() {
    if (
      !canUpload ||
      typeof onUpload !== "function"
    ) {
      return;
    }

    await onUpload({
      file,
      evidenceType,
      description:
        description.trim(),
    });

    setFile(null);
    setEvidenceType("");
    setDescription("");
  }

  return (
    <section className="relative overflow-hidden rounded-[30px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-5 shadow-[var(--card-shadow)] sm:p-6">
      <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-1/4 h-56 w-56 rounded-full bg-violet-500/8 blur-3xl" />

      <div className="relative">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300">
              <ShieldCheck className="h-5 w-5" />
            </span>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
                Verification evidence
              </p>

              <h2 className="mt-1 text-lg font-black tracking-[-0.025em] text-[var(--text-primary)]">
                Supporting evidence
              </h2>

              <p className="mt-1 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
                Upload documents that support the emergency claim and help reviewers verify the request.
              </p>
            </div>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="h-3.5 w-3.5" />
            {evidence.length} uploaded
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.14em] text-[var(--text-subtle)]">
              Evidence type
            </span>

            <select
              id="evidenceType"
              value={evidenceType}
              onChange={(event) =>
                setEvidenceType(
                  event.target.value,
                )
              }
              className="h-12 w-full rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] px-4 text-sm font-semibold text-[var(--text-primary)] outline-none transition hover:border-[var(--border-secondary)] focus:border-[var(--border-accent)] focus:ring-4 focus:ring-blue-500/10"
            >
              <option value="">
                Select evidence type
              </option>

              {EVIDENCE_TYPES.map(
                (item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ),
              )}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-[10px] font-black uppercase tracking-[0.14em] text-[var(--text-subtle)]">
              Description
            </span>

            <input
              id="evidenceDescription"
              value={description}
              onChange={(event) =>
                setDescription(
                  event.target.value,
                )
              }
              placeholder="Optional evidence description"
              className="h-12 w-full rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] px-4 text-sm font-semibold text-[var(--text-primary)] placeholder:text-[var(--text-subtle)] outline-none transition hover:border-[var(--border-secondary)] focus:border-[var(--border-accent)] focus:ring-4 focus:ring-blue-500/10"
            />
          </label>
        </div>

        <div className="mt-5">
          {file ? (
            <div className="relative overflow-hidden rounded-[24px] border border-emerald-500/20 bg-emerald-500/10 p-5">
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-500/15 blur-3xl" />

              <div className="relative flex items-center gap-4">
                <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-[var(--surface-primary)] text-emerald-700 shadow-sm dark:text-emerald-300">
                  <FileCheck2 className="h-6 w-6" />
                </span>

                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-black text-[var(--text-primary)]">
                    {file.name}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-2 text-[10px] font-bold text-[var(--text-muted)]">
                    <span>
                      {formatFileSize(
                        file.size,
                      )}
                    </span>

                    <span className="h-1 w-1 rounded-full bg-[var(--text-subtle)]" />

                    <span>
                      Ready to upload
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={uploading}
                  onClick={() =>
                    setFile(null)
                  }
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-rose-500/20 bg-[var(--surface-primary)] text-rose-700 transition hover:bg-rose-500/10 disabled:cursor-not-allowed disabled:opacity-50 dark:text-rose-300"
                  aria-label="Remove selected file"
                >
                  <Trash2 className="h-4.5 w-4.5" />
                </button>
              </div>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={[
                "group relative flex min-h-52 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[26px] border-2 border-dashed px-6 py-9 text-center transition duration-300",
                isDragReject
                  ? "border-rose-500/40 bg-rose-500/10"
                  : isDragActive
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-[var(--border-secondary)] bg-[var(--surface-inner)] hover:border-blue-500/35 hover:bg-blue-500/5",
              ].join(" ")}
            >
              <input
                {...getInputProps()}
              />

              <div className="pointer-events-none absolute -top-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl transition duration-300 group-hover:scale-125" />

              <span
                className={[
                  "relative flex h-16 w-16 items-center justify-center rounded-[22px] border shadow-sm transition duration-300 group-hover:-translate-y-1",
                  isDragReject
                    ? "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300"
                    : "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
                ].join(" ")}
              >
                {isDragReject ? (
                  <XCircle className="h-7 w-7" />
                ) : isDragActive ? (
                  <UploadCloud className="h-7 w-7" />
                ) : (
                  <FileUp className="h-7 w-7" />
                )}
              </span>

              <p className="relative mt-5 text-sm font-black text-[var(--text-primary)]">
                {isDragReject
                  ? "This file is not supported"
                  : isDragActive
                    ? "Drop the file here"
                    : "Upload supporting evidence"}
              </p>

              <p className="relative mt-2 max-w-sm text-xs leading-5 text-[var(--text-muted)]">
                Drag and drop a file here, or click to browse. PDF, JPG, PNG or WEBP up to 10 MB.
              </p>

              <span className="relative mt-4 rounded-full border border-[var(--border-primary)] bg-[var(--surface-primary)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-[var(--text-subtle)]">
                Encrypted on upload
              </span>
            </div>
          )}

          {rejectionMessage && (
            <p className="mt-2 text-xs font-bold text-rose-700 dark:text-rose-300">
              {rejectionMessage}
            </p>
          )}
        </div>

        {uploading && (
          <div className="mt-5 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
            <div className="flex items-center justify-between gap-3 text-xs font-black text-blue-700 dark:text-blue-300">
              <span>
                Uploading evidence
              </span>

              <span>
                {uploadProgress}%
              </span>
            </div>

            <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-blue-500/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-cyan-500 to-violet-500 transition-all duration-300"
                style={{
                  width: `${Math.min(
                    Math.max(
                      uploadProgress,
                      0,
                    ),
                    100,
                  )}%`,
                }}
              />
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-[var(--text-muted)]">
            Select an evidence type and a valid file before uploading.
          </p>

          <Button
            disabled={!canUpload}
            loading={uploading}
            loadingText="Uploading evidence..."
            leftIcon={FileUp}
            onClick={handleUpload}
          >
            Upload evidence
          </Button>
        </div>

        {evidence.length > 0 && (
          <div className="mt-7 border-t border-[var(--border-primary)] pt-6">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-black text-[var(--text-primary)]">
                  Uploaded evidence
                </p>

                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  Files currently attached to this emergency request.
                </p>
              </div>

              <span className="rounded-full border border-[var(--border-primary)] bg-[var(--surface-inner)] px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[var(--text-subtle)]">
                {evidence.length} file
                {evidence.length === 1
                  ? ""
                  : "s"}
              </span>
            </div>

            <div className="space-y-3">
              {evidence.map((item) => (
                <EvidenceItem
                  key={item.id}
                  item={item}
                  onDelete={onDelete}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
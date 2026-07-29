import {
  FileCheck2,
  FileUp,
  Trash2,
} from "lucide-react";
import { useDropzone } from "react-dropzone";

import { appConfig } from "../../config/appConfig";
import { formatFileSize } from "../../utils/fileUtils";

export default function FileDropzone({
  file,
  onFileChange,
  error,
  disabled = false,
}) {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
  } = useDropzone({
    disabled,

    multiple: false,

    maxSize:
      appConfig.upload.maxFileSize,

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
      onFileChange?.(
        acceptedFiles[0] || null,
      );
    },
  });

  if (file) {
    return (
      <div
        className={[
          "flex items-center gap-4 rounded-3xl border p-5",
          error
            ? "border-red-300 bg-red-50"
            : "border-emerald-200 bg-emerald-50",
        ].join(" ")}
      >
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
          <FileCheck2 className="h-6 w-6" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold text-slate-900">
            {file.name}
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {formatFileSize(file.size)}
          </p>
        </div>

        <button
          type="button"
          disabled={disabled}
          onClick={() =>
            onFileChange?.(null)
          }
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-500 shadow-sm transition hover:bg-red-50"
          aria-label="Remove selected file"
        >
          <Trash2 className="h-4.5 w-4.5" />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={[
          "flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-10 text-center transition",
          disabled
            ? "cursor-not-allowed opacity-60"
            : "",
          isDragReject || error
            ? "border-red-300 bg-red-50"
            : isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-slate-300 bg-slate-50 hover:border-blue-400 hover:bg-blue-50/50",
        ].join(" ")}
      >
        <input {...getInputProps()} />

        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
          <FileUp className="h-7 w-7" />
        </span>

        <p className="mt-5 text-sm font-extrabold text-slate-900">
          {isDragActive
            ? "Drop your file here"
            : "Drag and drop your document"}
        </p>

        <p className="mt-2 text-xs leading-5 text-slate-500">
          Or click to browse from your computer.
        </p>

        <p className="mt-4 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          PDF, JPG, PNG or WEBP • Maximum 10 MB
        </p>
      </div>

      {error && (
        <p className="mt-2 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
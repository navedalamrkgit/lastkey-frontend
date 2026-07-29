import {
  Download,
  Eye,
  Sparkles,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import DocumentStatusBadge from "./DocumentStatusBadge";
import {
  getDocumentCategory,
} from "../../config/documentConfig";
import { ROUTES } from "../../utils/routePaths";
import { buildRoute } from "../../utils/routeUtils";
import { formatDate } from "../../utils/formatDate";
import {
  formatFileSize,
  getFileExtension,
} from "../../utils/fileUtils";

export default function DocumentTable({
  documents,
  onDownload,
  onDelete,
}) {
  return (
    <div className="overflow-hidden rounded-[28px] border border-[var(--border-primary)] bg-[var(--surface-primary)] shadow-[var(--card-shadow)]">
      <div className="flex items-center justify-between border-b border-[var(--border-primary)] px-5 py-4">
        <div>
          <p className="text-sm font-black tracking-[-0.015em] text-[var(--text-primary)]">
            Vault records
          </p>

          <p className="mt-0.5 text-xs text-[var(--text-muted)]">
            {documents.length} secured document
            {documents.length === 1
              ? ""
              : "s"}
          </p>
        </div>

        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.08em] text-emerald-700 dark:text-emerald-300">
          Encrypted
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1040px] w-full">
          <thead className="border-b border-[var(--border-primary)] bg-[var(--surface-inner)]">
            <tr>
              {[
                "Document",
                "Category",
                "Status",
                "Expiry",
                "Size",
                "Actions",
              ].map((heading) => (
                <th
                  key={heading}
                  className="px-5 py-4 text-left text-[10px] font-black uppercase tracking-[0.14em] text-[var(--text-subtle)]"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--border-primary)]">
            {documents.map(
              (document) => {
                const category =
                  getDocumentCategory(
                    document.category,
                  );

                const Icon =
                  category.icon;

                const detailsPath =
                  buildRoute(
                    ROUTES.DOCUMENT_DETAILS,
                    {
                      documentId:
                        document.id,
                    },
                  );

                const previewPath =
                  buildRoute(
                    ROUTES.DOCUMENT_PREVIEW,
                    {
                      documentId:
                        document.id,
                    },
                  );

                const analysisPath =
                  buildRoute(
                    ROUTES.DOCUMENT_ANALYSIS,
                    {
                      documentId:
                        document.id,
                    },
                  );

                const extension =
                  getFileExtension(
                    document.fileName ||
                      document.title,
                  ) || "FILE";

                return (
                  <tr
                    key={document.id}
                    className="group transition hover:bg-[var(--surface-hover)]"
                  >
                    <td className="px-5 py-4">
                      <Link
                        to={detailsPath}
                        className="flex items-center gap-3"
                      >
                        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/15 via-cyan-500/10 to-violet-500/10 text-blue-700 dark:text-blue-300">
                          <Icon className="h-5 w-5" />
                        </span>

                        <span className="min-w-0">
                          <span className="block max-w-xs truncate text-sm font-black text-[var(--text-primary)] transition group-hover:text-blue-700 dark:group-hover:text-blue-300">
                            {document.title}
                          </span>

                          <span className="mt-1 flex items-center gap-2">
                            <span className="max-w-[210px] truncate text-[11px] text-[var(--text-subtle)]">
                              {document.fileName}
                            </span>

                            <span className="rounded-full border border-[var(--border-primary)] bg-[var(--surface-inner)] px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.08em] text-[var(--text-subtle)]">
                              {extension}
                            </span>
                          </span>
                        </span>
                      </Link>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full border border-[var(--border-primary)] bg-[var(--surface-inner)] px-3 py-1.5 text-xs font-bold text-[var(--text-secondary)]">
                        {category.label}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <DocumentStatusBadge
                        status={
                          document.status
                        }
                      />
                    </td>

                    <td className="px-5 py-4">
                      <div className="text-sm font-bold text-[var(--text-primary)]">
                        {document.expiryDate
                          ? formatDate(
                              document.expiryDate,
                            )
                          : "No expiry"}
                      </div>

                      <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--text-subtle)]">
                        {document.expiryDate
                          ? "Renewal tracked"
                          : "Permanent"}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-[var(--text-secondary)]">
                        {document.fileSizeLabel ||
                          formatFileSize(
                            document.fileSize,
                          )}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Link
                          to={previewPath}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[var(--text-subtle)] transition hover:border-blue-500/20 hover:bg-blue-500/10 hover:text-blue-700 dark:hover:text-blue-300"
                          aria-label="Preview document"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>

                        <Link
                          to={analysisPath}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[var(--text-subtle)] transition hover:border-violet-500/20 hover:bg-violet-500/10 hover:text-violet-700 dark:hover:text-violet-300"
                          aria-label="Analyze document"
                        >
                          <Sparkles className="h-4 w-4" />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            onDownload(
                              document,
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[var(--text-subtle)] transition hover:border-emerald-500/20 hover:bg-emerald-500/10 hover:text-emerald-700 dark:hover:text-emerald-300"
                          aria-label="Download document"
                        >
                          <Download className="h-4 w-4" />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            onDelete(document)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[var(--text-subtle)] transition hover:border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-700 dark:hover:text-rose-300"
                          aria-label="Delete document"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

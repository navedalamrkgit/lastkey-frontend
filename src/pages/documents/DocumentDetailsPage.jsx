import {
  ArrowLeft,
  CalendarDays,
  Download,
  Eye,
  FileKey2,
  Info,
  Sparkles,
} from "lucide-react";
import {
  useQuery,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  Link,
  useParams,
} from "react-router-dom";

import { documentApi } from "../../api/documentApi";
import DocumentStatusBadge from "../../components/documents/DocumentStatusBadge";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/ui/Button";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import {
  getDocumentCategory,
} from "../../config/documentConfig";
import { getErrorMessage } from "../../utils/errorHandler";
import {
  downloadBlob,
  formatFileSize,
} from "../../utils/fileUtils";
import { formatDate } from "../../utils/formatDate";
import { ROUTES } from "../../utils/routePaths";
import { buildRoute } from "../../utils/routeUtils";

export default function DocumentDetailsPage() {
  const {
    documentId,
  } = useParams();

  const documentQuery =
    useQuery({
      queryKey: [
        "document",
        documentId,
      ],

      queryFn: async () => {
        const response =
          await documentApi.getDocumentById(
            documentId,
          );

        return response.data;
      },
    });

  async function handleDownload() {
    try {
      const response =
        await documentApi.downloadDocument(
          documentId,
        );

      downloadBlob(
        response.data,
        documentQuery.data
          ?.fileName ||
          documentQuery.data
            ?.title,
      );
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "Unable to download the document.",
        ),
      );
    }
  }

  if (documentQuery.isLoading) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <LoadingSkeleton className="h-28" />
          <LoadingSkeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (documentQuery.isError) {
    return (
      <div className="px-4 py-16 text-center">
        <Info className="mx-auto h-12 w-12 text-red-400" />

        <h1 className="mt-5 text-2xl font-extrabold text-slate-950">
          Document unavailable
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {getErrorMessage(
            documentQuery.error,
            "The document could not be loaded.",
          )}
        </p>

        <Link
          to={ROUTES.DOCUMENTS}
          className="mt-6 inline-block"
        >
          <Button
            leftIcon={ArrowLeft}
          >
            Back to documents
          </Button>
        </Link>
      </div>
    );
  }

  const document =
    documentQuery.data;

  const category =
    getDocumentCategory(
      document.category,
    );

  const CategoryIcon =
    category.icon;

  const previewPath =
    buildRoute(
      ROUTES.DOCUMENT_PREVIEW,
      {
        documentId,
      },
    );

  const analysisPath =
    buildRoute(
      ROUTES.DOCUMENT_ANALYSIS,
      {
        documentId,
      },
    );

  const details = [
    {
      label: "Category",
      value: category.label,
    },
    {
      label: "Document number",
      value:
        document.documentNumber ||
        "Not provided",
    },
    {
      label: "Issued by",
      value:
        document.issuer ||
        "Not provided",
    },
    {
      label: "Issue date",
      value: document.issueDate
        ? formatDate(
            document.issueDate,
          )
        : "Not provided",
    },
    {
      label: "Expiry date",
      value: document.expiryDate
        ? formatDate(
            document.expiryDate,
          )
        : "No expiry",
    },
    {
      label: "File size",
      value:
        document.fileSizeLabel ||
        formatFileSize(
          document.fileSize,
        ),
    },
    {
      label: "Uploaded",
      value: document.uploadedAt
        ? formatDate(
            document.uploadedAt,
          )
        : "Not available",
    },
    {
      label: "Reminder",
      value:
        document.reminderEnabled
          ? "Enabled"
          : "Disabled",
    },
  ];

  return (
    <div className="page-enter px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow="Document details"
          title={document.title}
          description="Review document information, status and available actions."
          actions={
            <>
              <Link
                to={ROUTES.DOCUMENTS}
              >
                <Button
                  size="medium"
                  variant="secondary"
                  leftIcon={ArrowLeft}
                >
                  Back
                </Button>
              </Link>

              <Button
                size="medium"
                variant="secondary"
                leftIcon={Download}
                onClick={handleDownload}
              >
                Download
              </Button>
            </>
          }
        />

        <section className="mt-7 grid gap-6 lg:grid-cols-[1fr_320px]">
          <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-start">
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-blue-50 text-blue-600">
                <CategoryIcon className="h-8 w-8" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <DocumentStatusBadge
                    status={
                      document.status
                    }
                  />

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                    {category.label}
                  </span>
                </div>

                <h2 className="mt-4 break-words text-xl font-extrabold text-slate-950">
                  {document.fileName}
                </h2>

                {document.description && (
                  <p className="mt-3 text-sm leading-7 text-slate-500">
                    {
                      document.description
                    }
                  </p>
                )}
              </div>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {details.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                >
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {detail.label}
                  </p>

                  <p className="mt-2 break-words text-sm font-bold text-slate-800">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>
          </article>

          <aside className="space-y-5">
            <div className="rounded-3xl bg-slate-950 p-6 text-white">
              <FileKey2 className="h-7 w-7 text-blue-400" />

              <h2 className="mt-5 text-lg font-extrabold">
                Document actions
              </h2>

              <div className="mt-5 space-y-3">
                <Link
                  to={previewPath}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-bold transition hover:bg-white/10"
                >
                  <Eye className="h-4.5 w-4.5 text-blue-300" />
                  Preview document
                </Link>

                <Link
                  to={analysisPath}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-bold transition hover:bg-white/10"
                >
                  <Sparkles className="h-4.5 w-4.5 text-violet-300" />
                  AI document analysis
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <CalendarDays className="h-6 w-6 text-amber-600" />

              <h2 className="mt-4 text-sm font-extrabold text-slate-950">
                Expiry monitoring
              </h2>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                {document.expiryDate
                  ? `This document is currently scheduled to expire on ${formatDate(
                      document.expiryDate,
                    )}.`
                  : "This document does not currently have an expiry date."}
              </p>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
import {
  ArrowLeft,
  Download,
  FileWarning,
} from "lucide-react";
import {
  useEffect,
  useMemo,
} from "react";
import {
  useQuery,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  Link,
  useParams,
} from "react-router-dom";

import { documentApi } from "../../api/documentApi";
import Button from "../../components/ui/Button";
import FullPageLoader from "../../components/ui/FullPageLoader";
import { getErrorMessage } from "../../utils/errorHandler";
import {
  createObjectPreview,
  downloadBlob,
} from "../../utils/fileUtils";
import { ROUTES } from "../../utils/routePaths";
import { buildRoute } from "../../utils/routeUtils";

export default function DocumentPreviewPage() {
  const {
    documentId,
  } = useParams();

  const previewQuery =
    useQuery({
      queryKey: [
        "document-preview",
        documentId,
      ],

      queryFn: async () => {
        const response =
          await documentApi.previewDocument(
            documentId,
          );

        return response;
      },
    });

  const previewUrl = useMemo(() => {
    if (!previewQuery.data?.data) {
      return "";
    }

    return createObjectPreview(
      previewQuery.data.data,
    );
  }, [previewQuery.data]);

  useEffect(() => {
    if (!previewUrl) {
      return undefined;
    }

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  async function handleDownload() {
    try {
      const response =
        await documentApi.downloadDocument(
          documentId,
        );

      downloadBlob(
        response.data,
        `document-${documentId}`,
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

  if (previewQuery.isLoading) {
    return (
      <FullPageLoader message="Preparing secure document preview..." />
    );
  }

  const detailsPath =
    buildRoute(
      ROUTES.DOCUMENT_DETAILS,
      {
        documentId,
      },
    );

  if (
    previewQuery.isError ||
    !previewUrl
  ) {
    return (
      <div className="flex min-h-[calc(100vh-72px)] items-center justify-center px-4">
        <div className="max-w-md text-center">
          <FileWarning className="mx-auto h-12 w-12 text-red-400" />

          <h1 className="mt-5 text-2xl font-extrabold text-slate-950">
            Preview unavailable
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            {getErrorMessage(
              previewQuery.error,
              "The document preview could not be loaded.",
            )}
          </p>

          <Link
            to={detailsPath}
            className="mt-6 inline-block"
          >
            <Button
              leftIcon={ArrowLeft}
            >
              Back to document
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const contentType =
    previewQuery.data.headers[
      "content-type"
    ] || "";

  const isPdf =
    contentType.includes(
      "application/pdf",
    );

  return (
    <div className="flex min-h-[calc(100vh-72px)] flex-col bg-slate-900">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-950 px-4 py-4 sm:px-6">
        <Link
          to={detailsPath}
          className="inline-flex items-center gap-2 text-sm font-bold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to document
        </Link>

        <Button
          size="small"
          leftIcon={Download}
          onClick={handleDownload}
        >
          Download
        </Button>
      </header>

      <main className="flex flex-1 items-center justify-center overflow-auto p-4 sm:p-6">
        {isPdf ? (
          <iframe
            src={previewUrl}
            title="Document preview"
            className="h-[calc(100vh-150px)] w-full max-w-6xl rounded-2xl bg-white"
          />
        ) : (
          <img
            src={previewUrl}
            alt="Document preview"
            className="max-h-[calc(100vh-150px)] max-w-full rounded-2xl bg-white object-contain shadow-2xl"
          />
        )}
      </main>
    </div>
  );
}
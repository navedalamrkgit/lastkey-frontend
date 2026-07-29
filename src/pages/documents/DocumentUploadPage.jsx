import {
  ArrowLeft,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import {
  useState,
} from "react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  documentApi,
} from "../../api/documentApi";
import DocumentUploadForm from "../../components/documents/DocumentUploadForm";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/ui/Button";
import {
  getErrorMessage,
} from "../../utils/errorHandler";
import {
  ROUTES,
} from "../../utils/routePaths";
import {
  buildRoute,
} from "../../utils/routeUtils";

const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function normalizeOptionalText(
  value,
) {
  if (
    value === null ||
    value === undefined
  ) {
    return null;
  }

  const normalizedValue =
    String(value).trim();

  return normalizedValue || null;
}

function normalizeCategoryId(
  value,
) {
  const normalizedValue =
    normalizeOptionalText(
      value,
    );

  if (!normalizedValue) {
    return null;
  }

  return UUID_PATTERN.test(
    normalizedValue,
  )
    ? normalizedValue
    : null;
}

function buildDocumentFormData(
  values,
) {
  if (!values?.file) {
    throw new Error(
      "Please select a document.",
    );
  }

  const title =
    values.title?.trim();

  if (!title) {
    throw new Error(
      "Document title is required.",
    );
  }

  const requestPayload = {
    title,

    description:
      normalizeOptionalText(
        values.description,
      ),

    categoryId:
      normalizeCategoryId(
        values.categoryId ||
          values.category,
      ),

    expiryDate:
      values.expiryDate ||
      null,
  };

  const formData =
    new FormData();

  formData.append(
    "file",
    values.file,
  );

  formData.append(
    "request",
    new Blob(
      [
        JSON.stringify(
          requestPayload,
        ),
      ],
      {
        type: "application/json",
      },
    ),
  );

  return formData;
}

export default function DocumentUploadPage() {
  const navigate =
    useNavigate();

  const queryClient =
    useQueryClient();

  const [
    uploadProgress,
    setUploadProgress,
  ] = useState(0);

  const uploadMutation =
    useMutation({
      mutationFn: (
        values,
      ) => {
        const formData =
          buildDocumentFormData(
            values,
          );

        return documentApi.uploadDocument(
          formData,
          (
            progressEvent,
          ) => {
            if (
              !progressEvent.total
            ) {
              return;
            }

            const progress =
              Math.round(
                (progressEvent.loaded *
                  100) /
                  progressEvent.total,
              );

            setUploadProgress(
              progress,
            );
          },
        );
      },

      onSuccess: async (
        response,
      ) => {
        toast.success(
          "Document uploaded securely.",
        );

        await queryClient.invalidateQueries({
          queryKey: [
            "documents",
          ],
        });

        const documentId =
          response.data?.id ||
          response.data
            ?.documentId;

        if (documentId) {
          const detailsPath =
            buildRoute(
              ROUTES.DOCUMENT_DETAILS,
              {
                documentId,
              },
            );

          navigate(
            detailsPath,
            {
              replace: true,
            },
          );

          return;
        }

        navigate(
          ROUTES.DOCUMENTS,
          {
            replace: true,
          },
        );
      },

      onError: (
        error,
      ) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to upload the document.",
          ),
        );
      },

      onSettled: () => {
        setUploadProgress(0);
      },
    });

  return (
    <div className="page-enter px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          eyebrow="Secure upload"
          title="Add a document"
          description="Upload an important document and add information that helps LastKey organise and monitor it."
          actions={
            <Link
              to={
                ROUTES.DOCUMENTS
              }
            >
              <Button
                variant="secondary"
                size="medium"
                leftIcon={
                  ArrowLeft
                }
              >
                Back to vault
              </Button>
            </Link>
          }
        />

        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_280px]">
          <DocumentUploadForm
            loading={
              uploadMutation.isPending
            }
            uploadProgress={
              uploadProgress
            }
            onSubmit={(values) =>
              uploadMutation.mutate(
                values,
              )
            }
          />

          <aside className="space-y-5">
            <div className="rounded-3xl bg-slate-950 p-6 text-white">
              <LockKeyhole className="h-7 w-7 text-blue-400" />

              <h2 className="mt-5 text-lg font-extrabold">
                Secure upload
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                The document is sent through your authenticated API session and stored securely.
              </p>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <ShieldCheck className="h-6 w-6 text-emerald-600" />

              <h2 className="mt-4 text-sm font-extrabold text-slate-950">
                Before uploading
              </h2>

              <ul className="mt-4 space-y-3 text-xs leading-5 text-slate-500">
                <li>
                  Make sure the document is readable.
                </li>

                <li>
                  Avoid uploading duplicate copies.
                </li>

                <li>
                  Verify the document details and expiry date.
                </li>

                <li>
                  Upload only files you are authorised to store.
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
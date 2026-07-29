import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  FilePlus2,
  Files,
  FolderLock,
  HardDrive,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { documentApi } from "../../api/documentApi";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Button from "../../components/ui/Button";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import DocumentCard from "../../components/documents/DocumentCard";
import DocumentFilters from "../../components/documents/DocumentFilters";
import DocumentTable from "../../components/documents/DocumentTable";
import EmptyDocumentState from "../../components/documents/EmptyDocumentState";
import PageHeader from "../../components/layout/PageHeader";
import { getErrorMessage } from "../../utils/errorHandler";
import {
  downloadBlob,
  formatFileSize,
} from "../../utils/fileUtils";
import { ROUTES } from "../../utils/routePaths";

const demoDocuments = [
  {
    id: "demo-1",
    title: "Life Insurance Policy",
    fileName: "life-insurance-policy.pdf",
    fileSize: 2480000,
    category: "INSURANCE",
    status: "EXPIRING_SOON",
    issuer: "Secure Life Insurance",
    documentNumber: "POL-2026-001",
    uploadedAt: "2026-07-20T10:30:00",
    expiryDate: "2026-08-15",
  },
  {
    id: "demo-2",
    title: "Property Registration",
    fileName: "property-registration.pdf",
    fileSize: 4820000,
    category: "PROPERTY",
    status: "ACTIVE",
    issuer: "Ghaziabad Development Authority",
    uploadedAt: "2026-07-18T11:30:00",
    expiryDate: null,
  },
  {
    id: "demo-3",
    title: "PAN Card",
    fileName: "pan-card.png",
    fileSize: 850000,
    category: "IDENTITY",
    status: "ACTIVE",
    issuer: "Income Tax Department",
    uploadedAt: "2026-07-12T14:10:00",
    expiryDate: null,
  },
  {
    id: "demo-4",
    title: "Fixed Deposit Certificate",
    fileName: "fixed-deposit.pdf",
    fileSize: 1290000,
    category: "INVESTMENT",
    status: "ACTIVE",
    issuer: "State Bank of India",
    uploadedAt: "2026-07-08T09:20:00",
    expiryDate: "2027-06-30",
  },
];

function normalizeDocumentResponse(response) {
  const data = response?.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.content)) {
    return data.content;
  }

  if (Array.isArray(data?.documents)) {
    return data.documents;
  }

  return [];
}

function VaultMetric({
  icon: Icon,
  label,
  value,
  detail,
  tone = "blue",
}) {
  const tones = {
    blue: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    amber:
      "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    violet:
      "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  };

  return (
    <article className="relative overflow-hidden rounded-[26px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-5 shadow-[var(--card-shadow)]">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative">
        <span
          className={[
            "flex h-11 w-11 items-center justify-center rounded-2xl border",
            tones[tone],
          ].join(" ")}
        >
          <Icon className="h-5 w-5" />
        </span>

        <p className="mt-5 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
          {value}
        </p>

        <p className="mt-1 text-sm font-black text-[var(--text-primary)]">
          {label}
        </p>

        <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
          {detail}
        </p>
      </div>
    </article>
  );
}

export default function DocumentsPage() {
  const queryClient =
    useQueryClient();

  const [search, setSearch] =
    useState("");
  const [category, setCategory] =
    useState("");
  const [status, setStatus] =
    useState("");
  const [viewMode, setViewMode] =
    useState("grid");
  const [
    documentToDelete,
    setDocumentToDelete,
  ] = useState(null);

  const documentsQuery = useQuery({
    queryKey: ["documents"],

    queryFn: async () => {
      const response =
        await documentApi.getDocuments();

      return normalizeDocumentResponse(
        response,
      );
    },

    retry: 1,
  });

  const deleteMutation =
    useMutation({
      mutationFn: (documentId) =>
        documentApi.deleteDocument(
          documentId,
        ),

      onSuccess: () => {
        toast.success(
          "Document deleted successfully.",
        );

        setDocumentToDelete(null);

        queryClient.invalidateQueries({
          queryKey: ["documents"],
        });
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to delete the document.",
          ),
        );
      },
    });

  const documents =
    documentsQuery.isError
      ? demoDocuments
      : documentsQuery.data || [];

  const analytics = useMemo(() => {
    const totalSize = documents.reduce(
      (sum, item) =>
        sum +
        (Number(item.fileSize) || 0),
      0,
    );

    const active = documents.filter(
      (item) =>
        item.status === "ACTIVE",
    ).length;

    const expiring = documents.filter(
      (item) =>
        item.status ===
        "EXPIRING_SOON",
    ).length;

    const categories = new Set(
      documents
        .map((item) => item.category)
        .filter(Boolean),
    ).size;

    return {
      totalSize,
      active,
      expiring,
      categories,
    };
  }, [documents]);

  const filteredDocuments =
    useMemo(() => {
      const normalizedSearch =
        search.trim().toLowerCase();

      return documents.filter(
        (item) => {
          const matchesSearch =
            !normalizedSearch ||
            [
              item.title,
              item.fileName,
              item.category,
              item.issuer,
              item.documentNumber,
            ]
              .filter(Boolean)
              .some((value) =>
                String(value)
                  .toLowerCase()
                  .includes(
                    normalizedSearch,
                  ),
              );

          const matchesCategory =
            !category ||
            item.category === category;

          const matchesStatus =
            !status ||
            item.status === status;

          return (
            matchesSearch &&
            matchesCategory &&
            matchesStatus
          );
        },
      );
    }, [
      documents,
      search,
      category,
      status,
    ]);

  async function handleDownload(
    item,
  ) {
    if (
      String(item.id).startsWith(
        "demo-",
      )
    ) {
      toast(
        "Download requires a connected backend document.",
      );

      return;
    }

    try {
      const response =
        await documentApi.downloadDocument(
          item.id,
        );

      downloadBlob(
        response.data,
        item.fileName || item.title,
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

  function clearFilters() {
    setSearch("");
    setCategory("");
    setStatus("");
  }

  const hasFilters = Boolean(
    search || category || status,
  );

  return (
    <div className="page-enter px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1600px]">
        <PageHeader
          eyebrow="Secure document vault"
          title="Your documents"
          description="Upload, organise, review and control access to your most important records."
          actions={
            <Link
              to={ROUTES.DOCUMENT_UPLOAD}
            >
              <Button
                size="medium"
                leftIcon={FilePlus2}
              >
                Upload document
              </Button>
            </Link>
          }
        />

        <section className="relative mt-7 overflow-hidden rounded-[32px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-6 shadow-[var(--card-shadow)] sm:p-8">
          <div className="pointer-events-none absolute -right-28 -top-32 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative grid gap-8 xl:grid-cols-[1.4fr_0.8fr] xl:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-blue-700 dark:text-blue-300">
                <ShieldCheck className="h-3.5 w-3.5" />
                Zero-trust document vault
              </span>

              <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-[-0.045em] text-[var(--text-primary)] sm:text-4xl">
                Your most important records, protected and always ready.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--text-muted)] sm:text-base">
                LastKey keeps sensitive documents organised, encrypted and ready for controlled access when they matter most.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={ROUTES.DOCUMENT_UPLOAD}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 px-5 text-sm font-black text-white shadow-[0_16px_40px_rgba(79,70,229,0.25)] transition hover:-translate-y-0.5"
                >
                  <FilePlus2 className="h-4 w-4" />
                  Add document
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setStatus(
                      "EXPIRING_SOON",
                    )
                  }
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-secondary)] px-5 text-sm font-black text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:border-amber-500/30 hover:bg-amber-500/10"
                >
                  Review expiries
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-[26px] border border-violet-500/20 bg-gradient-to-br from-violet-500/12 via-blue-500/8 to-cyan-500/10 p-5">
              <div className="flex items-start justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300">
                  <BrainCircuit className="h-5 w-5" />
                </span>

                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-300">
                  AI enabled
                </span>
              </div>

              <p className="mt-5 text-lg font-black text-[var(--text-primary)]">
                Vault intelligence
              </p>

              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                Automatically classify records, surface missing details and track approaching expiry dates.
              </p>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)] p-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--text-subtle)]">
                    Categories
                  </p>
                  <p className="mt-2 text-xl font-black text-[var(--text-primary)]">
                    {analytics.categories}
                  </p>
                </div>

                <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)] p-3">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--text-subtle)]">
                    Vault size
                  </p>
                  <p className="mt-2 text-xl font-black text-[var(--text-primary)]">
                    {formatFileSize(
                      analytics.totalSize,
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {documentsQuery.isError && (
          <div className="mt-6 flex gap-3 rounded-2xl border border-amber-500/25 bg-amber-500/10 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700 dark:text-amber-300" />

            <div>
              <p className="text-sm font-black text-amber-800 dark:text-amber-200">
                Document API is unavailable
              </p>

              <p className="mt-1 text-xs leading-5 text-amber-700 dark:text-amber-300">
                Demo records are being displayed until the backend connection is restored.
              </p>
            </div>
          </div>
        )}

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <VaultMetric
            icon={Files}
            label="Total documents"
            value={documents.length}
            detail="All secured vault records"
            tone="blue"
          />

          <VaultMetric
            icon={FolderLock}
            label="Expiring soon"
            value={analytics.expiring}
            detail="Documents requiring attention"
            tone="amber"
          />

          <VaultMetric
            icon={ShieldCheck}
            label="Active records"
            value={analytics.active}
            detail="Available and protected"
            tone="emerald"
          />

          <VaultMetric
            icon={HardDrive}
            label="Storage used"
            value={formatFileSize(
              analytics.totalSize,
            )}
            detail={`${analytics.categories} organised categories`}
            tone="violet"
          />
        </section>

        <div className="mt-6">
          <DocumentFilters
            search={search}
            category={category}
            status={status}
            viewMode={viewMode}
            onSearchChange={setSearch}
            onCategoryChange={
              setCategory
            }
            onStatusChange={setStatus}
            onViewModeChange={
              setViewMode
            }
            onClear={clearFilters}
          />
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black text-[var(--text-primary)]">
              {filteredDocuments.length} document
              {filteredDocuments.length === 1
                ? ""
                : "s"}
            </p>

            <p className="mt-1 text-xs text-[var(--text-muted)]">
              {hasFilters
                ? "Showing records matching your current filters."
                : "All records currently stored in your vault."}
            </p>
          </div>

          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-300">
            <Sparkles className="h-3.5 w-3.5" />
            Encrypted and monitored
          </span>
        </div>

        <section className="mt-5">
          {documentsQuery.isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {Array.from({
                length: 8,
              }).map((_, index) => (
                <LoadingSkeleton
                  key={index}
                  className="h-[460px] rounded-[28px]"
                />
              ))}
            </div>
          ) : filteredDocuments.length ===
            0 ? (
            <EmptyDocumentState
              filtered={hasFilters}
              onClearFilters={
                clearFilters
              }
            />
          ) : viewMode === "grid" ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {filteredDocuments.map(
                (item) => (
                  <DocumentCard
                    key={item.id}
                    document={item}
                    onDownload={
                      handleDownload
                    }
                    onDelete={
                      setDocumentToDelete
                    }
                  />
                ),
              )}
            </div>
          ) : (
            <DocumentTable
              documents={
                filteredDocuments
              }
              onDownload={
                handleDownload
              }
              onDelete={
                setDocumentToDelete
              }
            />
          )}
        </section>
      </div>

      <ConfirmDialog
        open={Boolean(
          documentToDelete,
        )}
        title="Delete this document?"
        description={`${
          documentToDelete?.title ||
          "This document"
        } will be removed from your vault. This action may not be reversible.`}
        confirmText="Delete document"
        danger
        loading={
          deleteMutation.isPending
        }
        onCancel={() =>
          setDocumentToDelete(null)
        }
        onConfirm={() => {
          if (
            String(
              documentToDelete?.id,
            ).startsWith("demo-")
          ) {
            toast(
              "Demo documents cannot be deleted.",
            );

            setDocumentToDelete(null);

            return;
          }

          deleteMutation.mutate(
            documentToDelete.id,
          );
        }}
      />
    </div>
  );
}
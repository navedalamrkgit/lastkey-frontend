import {
  ArrowLeft,
  Ban,
  CheckCircle2,
  FileCheck2,
  Send,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  Link,
  useParams,
} from "react-router-dom";

import { emergencyApi } from "../../api/emergencyApi";
import EmergencyEvidenceUpload from "../../components/emergency/EmergencyEvidenceUpload";
import EmergencyStatusBadge from "../../components/emergency/EmergencyStatusBadge";
import EmergencyTimeline from "../../components/emergency/EmergencyTimeline";
import ReleasedDocumentCard from "../../components/emergency/ReleasedDocumentCard";
import WaitingPeriodCard from "../../components/emergency/WaitingPeriodCard";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import {
  getEmergencyTypeLabel,
} from "../../config/emergencyConfig";
import { getErrorMessage } from "../../utils/errorHandler";
import { downloadBlob } from "../../utils/fileUtils";
import { formatDate } from "../../utils/formatDate";
import { ROUTES } from "../../utils/routePaths";
import { buildRoute } from "../../utils/routeUtils";

function DetailCard({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--text-subtle)]">
        {label}
      </p>

      <p className="mt-2 break-words text-sm font-black text-[var(--text-primary)]">
        {value || "Not available"}
      </p>
    </div>
  );
}

export default function EmergencyDetailsPage() {
  const { requestId } =
    useParams();

  const queryClient =
    useQueryClient();

  const [
    uploadProgress,
    setUploadProgress,
  ] = useState(0);

  const [
    cancelDialogOpen,
    setCancelDialogOpen,
  ] = useState(false);

  const requestQuery =
    useQuery({
      queryKey: [
        "emergency-request",
        requestId,
      ],

      queryFn: async () => {
        const response =
          await emergencyApi.getEmergencyRequestById(
            requestId,
          );

        return response.data;
      },
    });

  const releasedDocumentsQuery =
    useQuery({
      queryKey: [
        "released-documents",
        requestId,
      ],

      queryFn: async () => {
        const response =
          await emergencyApi.getReleasedDocuments(
            requestId,
          );

        const data =
          response.data;

        if (Array.isArray(data)) {
          return data;
        }

        return (
          data?.documents || []
        );
      },

      enabled:
        requestQuery.data
          ?.status ===
        "ACCESS_RELEASED",
    });

  const uploadMutation =
    useMutation({
      mutationFn: ({
        file,
        evidenceType,
        description,
      }) => {
        const formData =
          new FormData();

        formData.append(
          "file",
          file,
        );

        formData.append(
          "evidenceType",
          evidenceType,
        );

        formData.append(
          "description",
          description,
        );

        return emergencyApi.uploadEvidence(
          requestId,
          formData,
          (progressEvent) => {
            if (
              !progressEvent.total
            ) {
              return;
            }

            setUploadProgress(
              Math.round(
                (progressEvent.loaded *
                  100) /
                  progressEvent.total,
              ),
            );
          },
        );
      },

      onSuccess: () => {
        toast.success(
          "Evidence uploaded successfully.",
        );

        queryClient.invalidateQueries({
          queryKey: [
            "emergency-request",
            requestId,
          ],
        });
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to upload evidence.",
          ),
        );
      },

      onSettled: () => {
        setUploadProgress(0);
      },
    });

  const deleteEvidenceMutation =
    useMutation({
      mutationFn: (
        evidenceId,
      ) =>
        emergencyApi.deleteEvidence(
          requestId,
          evidenceId,
        ),

      onSuccess: () => {
        toast.success(
          "Evidence removed.",
        );

        queryClient.invalidateQueries({
          queryKey: [
            "emergency-request",
            requestId,
          ],
        });
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to remove evidence.",
          ),
        );
      },
    });

  const submitMutation =
    useMutation({
      mutationFn: () =>
        emergencyApi.submitEmergencyRequest(
          requestId,
        ),

      onSuccess: () => {
        toast.success(
          "Request submitted for review.",
        );

        queryClient.invalidateQueries({
          queryKey: [
            "emergency-request",
            requestId,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "emergency-requests",
          ],
        });
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to submit the request.",
          ),
        );
      },
    });

  const cancelMutation =
    useMutation({
      mutationFn: () =>
        emergencyApi.cancelEmergencyRequest(
          requestId,
        ),

      onSuccess: () => {
        toast.success(
          "Emergency request cancelled.",
        );

        setCancelDialogOpen(false);

        queryClient.invalidateQueries({
          queryKey: [
            "emergency-request",
            requestId,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "emergency-requests",
          ],
        });
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to cancel the request.",
          ),
        );
      },
    });

  if (
    requestQuery.isLoading
  ) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <LoadingSkeleton className="h-28" />
          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <LoadingSkeleton className="h-[620px]" />
            <LoadingSkeleton className="h-[480px]" />
          </div>
        </div>
      </div>
    );
  }

  if (
    requestQuery.isError
  ) {
    return (
      <div className="px-4 py-16 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[24px] border border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300">
          <XCircle className="h-8 w-8" />
        </span>

        <h1 className="mt-5 text-2xl font-black tracking-[-0.03em] text-[var(--text-primary)]">
          Emergency request unavailable
        </h1>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--text-muted)]">
          {getErrorMessage(
            requestQuery.error,
            "The request could not be loaded.",
          )}
        </p>

        <Link
          to={ROUTES.EMERGENCY}
          className="mt-6 inline-block"
        >
          <Button
            leftIcon={ArrowLeft}
          >
            Back to requests
          </Button>
        </Link>
      </div>
    );
  }

  const request =
    requestQuery.data;

  const verificationPath =
    buildRoute(
      ROUTES.EMERGENCY_VERIFY,
      {
        requestId,
      },
    );

  const canSubmit =
    [
      "DRAFT",
      "PENDING_VERIFICATION",
    ].includes(request.status) &&
    request.identityVerified &&
    (request.evidence?.length ||
      0) > 0;

  const canCancel =
    ![
      "ACCESS_RELEASED",
      "REJECTED",
      "CANCELLED",
      "EXPIRED",
    ].includes(request.status);

  const releasedDocuments =
    releasedDocumentsQuery.data ||
    [];

  async function handleDownload(
    releasedDocument,
  ) {
    try {
      const response =
        await emergencyApi.downloadReleasedDocument(
          requestId,
          releasedDocument.id,
        );

      downloadBlob(
        response.data,
        releasedDocument.fileName ||
          releasedDocument.title,
      );
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "Unable to download the released document.",
        ),
      );
    }
  }

  return (
    <div className="page-enter px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl">
        <PageHeader
          eyebrow="Emergency request"
          title={getEmergencyTypeLabel(
            request.emergencyType,
          )}
          description="Review request information, identity verification, evidence and access-release status."
          actions={
            <>
              <Link
                to={ROUTES.EMERGENCY}
              >
                <Button
                  size="medium"
                  variant="secondary"
                  leftIcon={ArrowLeft}
                >
                  Back
                </Button>
              </Link>

              {canCancel && (
                <Button
                  size="medium"
                  variant="danger"
                  leftIcon={Ban}
                  onClick={() =>
                    setCancelDialogOpen(
                      true,
                    )
                  }
                >
                  Cancel request
                </Button>
              )}
            </>
          }
        />

        <section className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <article className="relative overflow-hidden rounded-[32px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-5 shadow-[var(--card-shadow)] sm:p-6">
              <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative">
                <div className="flex flex-col gap-5 border-b border-[var(--border-primary)] pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <EmergencyStatusBadge
                      status={
                        request.status
                      }
                    />

                    <h2 className="mt-4 text-xl font-black tracking-[-0.025em] text-[var(--text-primary)]">
                      Request information
                    </h2>

                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      Core details submitted for this emergency access request.
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-[var(--border-primary)] bg-[var(--surface-inner)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-[var(--text-subtle)]">
                    Request #
                    {String(
                      request.id,
                    ).slice(0, 8)}
                  </span>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <DetailCard
                    label="Nominee"
                    value={
                      request.nomineeName ||
                      request.nominee
                        ?.fullName
                    }
                  />

                  <DetailCard
                    label="Incident date"
                    value={formatDate(
                      request.incidentDate,
                    )}
                  />

                  <DetailCard
                    label="Contact phone"
                    value={
                      request.contactPhone
                    }
                  />

                  <DetailCard
                    label="Created"
                    value={formatDate(
                      request.createdAt,
                    )}
                  />
                </div>

                <div className="mt-5 rounded-[24px] border border-[var(--border-primary)] bg-[var(--surface-inner)] p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--text-subtle)]">
                    Emergency description
                  </p>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[var(--text-muted)]">
                    {request.description ||
                      "No description provided."}
                  </p>
                </div>

                <div className="mt-4 rounded-[24px] border border-blue-500/20 bg-blue-500/10 p-5">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-blue-700 dark:text-blue-300">
                    Requested access reason
                  </p>

                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-[var(--text-muted)]">
                    {request.requestedAccessReason ||
                      "No access reason provided."}
                  </p>
                </div>
              </div>
            </article>

            {[
              "DRAFT",
              "PENDING_VERIFICATION",
            ].includes(
              request.status,
            ) && (
              <EmergencyEvidenceUpload
                evidence={
                  request.evidence || []
                }
                uploading={
                  uploadMutation.isPending
                }
                uploadProgress={
                  uploadProgress
                }
                onUpload={async (
                  values,
                ) => {
                  await uploadMutation.mutateAsync(
                    values,
                  );
                }}
                onDelete={(item) =>
                  deleteEvidenceMutation.mutate(
                    item.id,
                  )
                }
              />
            )}

            {canSubmit && (
              <section className="relative overflow-hidden rounded-[30px] border border-emerald-500/20 bg-emerald-500/10 p-6">
                <div className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-emerald-500/15 blur-3xl" />

                <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-[var(--surface-primary)] text-emerald-700 dark:text-emerald-300">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                        Ready to continue
                      </p>

                      <h2 className="mt-1 text-lg font-black text-[var(--text-primary)]">
                        Request ready for review
                      </h2>

                      <p className="mt-1 text-sm leading-6 text-[var(--text-muted)]">
                        Identity verification and supporting evidence are complete.
                      </p>
                    </div>
                  </div>

                  <Button
                    leftIcon={Send}
                    loading={
                      submitMutation.isPending
                    }
                    loadingText="Submitting request..."
                    onClick={() =>
                      submitMutation.mutate()
                    }
                  >
                    Submit for review
                  </Button>
                </div>
              </section>
            )}

            {request.status ===
              "ACCESS_RELEASED" && (
              <section className="rounded-[30px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-5 shadow-[var(--card-shadow)] sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                    <FileCheck2 className="h-5 w-5" />
                  </span>

                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                      Approved access
                    </p>

                    <h2 className="mt-1 text-lg font-black text-[var(--text-primary)]">
                      Released documents
                    </h2>

                    <p className="mt-1 text-sm text-[var(--text-muted)]">
                      These documents were approved for emergency access.
                    </p>
                  </div>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {releasedDocuments.map(
                    (
                      releasedDocument,
                    ) => (
                      <ReleasedDocumentCard
                        key={
                          releasedDocument.id
                        }
                        document={
                          releasedDocument
                        }
                        onDownload={
                          handleDownload
                        }
                      />
                    ),
                  )}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            {!request.identityVerified && (
              <section className="relative overflow-hidden rounded-[30px] border border-amber-500/20 bg-amber-500/10 p-6">
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-500/15 blur-3xl" />

                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-[var(--surface-primary)] text-amber-700 dark:text-amber-300">
                    <UserRoundCheck className="h-5 w-5" />
                  </span>

                  <p className="mt-5 text-[10px] font-black uppercase tracking-[0.12em] text-amber-700 dark:text-amber-300">
                    Action required
                  </p>

                  <h2 className="mt-1 text-lg font-black text-[var(--text-primary)]">
                    Identity verification required
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                    Verify the nominee before submitting the request.
                  </p>

                  <Link
                    to={verificationPath}
                    className="mt-5 block"
                  >
                    <Button
                      fullWidth
                      leftIcon={
                        ShieldCheck
                      }
                    >
                      Verify identity
                    </Button>
                  </Link>
                </div>
              </section>
            )}

            {request.identityVerified && (
              <section className="rounded-[28px] border border-emerald-500/20 bg-emerald-500/10 p-5">
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-emerald-500/20 bg-[var(--surface-primary)] text-emerald-700 dark:text-emerald-300">
                    <ShieldCheck className="h-4.5 w-4.5" />
                  </span>

                  <div>
                    <p className="text-sm font-black text-[var(--text-primary)]">
                      Identity verified
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                      The nominee identity check has been completed.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {request.status ===
              "WAITING_PERIOD" && (
              <WaitingPeriodCard
                waitingPeriodHours={
                  request.waitingPeriodHours
                }
                releaseAt={
                  request.releaseAt
                }
              />
            )}

            <section className="rounded-[30px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-6 shadow-[var(--card-shadow)]">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300">
                  <Sparkles className="h-4.5 w-4.5" />
                </span>

                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-[var(--text-subtle)]">
                    Activity log
                  </p>

                  <h2 className="mt-1 font-black text-[var(--text-primary)]">
                    Request timeline
                  </h2>
                </div>
              </div>

              <div className="mt-6">
                <EmergencyTimeline
                  events={
                    request.timeline ||
                    []
                  }
                />
              </div>
            </section>

            {request.rejectionReason && (
              <section className="rounded-[28px] border border-rose-500/20 bg-rose-500/10 p-5">
                <XCircle className="h-6 w-6 text-rose-700 dark:text-rose-300" />

                <h2 className="mt-4 text-sm font-black text-[var(--text-primary)]">
                  Rejection reason
                </h2>

                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                  {
                    request.rejectionReason
                  }
                </p>
              </section>
            )}
          </aside>
        </section>
      </div>

      <ConfirmDialog
        open={cancelDialogOpen}
        title="Cancel emergency request?"
        description="The request will be closed and cannot continue through verification or release."
        confirmText="Cancel request"
        danger
        loading={
          cancelMutation.isPending
        }
        onCancel={() =>
          setCancelDialogOpen(false)
        }
        onConfirm={() =>
          cancelMutation.mutate()
        }
      />
    </div>
  );
}
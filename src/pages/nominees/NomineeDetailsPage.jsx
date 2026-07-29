import {
  ArrowLeft,
  FileLock2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  useState,
} from "react";
import toast from "react-hot-toast";
import {
  Link,
  useParams,
} from "react-router-dom";

import { nomineeApi } from "../../api/nomineeApi";
import NomineeForm from "../../components/nominees/NomineeForm";
import NomineeStatusBadge from "../../components/nominees/NomineeStatusBadge";
import VerificationCard from "../../components/nominees/VerificationCard";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/ui/Button";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import {
  getRelationshipLabel,
} from "../../config/nomineeConfig";
import { formatDate } from "../../utils/formatDate";
import { getErrorMessage } from "../../utils/errorHandler";
import { ROUTES } from "../../utils/routePaths";
import { buildRoute } from "../../utils/routeUtils";
import { getInitials } from "../../utils/getInitials";

export default function NomineeDetailsPage() {
  const {
    nomineeId,
  } = useParams();

  const queryClient =
    useQueryClient();

  const [
    editing,
    setEditing,
  ] = useState(false);

  const nomineeQuery =
    useQuery({
      queryKey: [
        "nominee",
        nomineeId,
      ],

      queryFn: async () => {
        const response =
          await nomineeApi.getNomineeById(
            nomineeId,
          );

        return response.data;
      },
    });

  const updateMutation =
    useMutation({
      mutationFn: (values) =>
        nomineeApi.updateNominee(
          nomineeId,
          values,
        ),

      onSuccess: () => {
        toast.success(
          "Nominee updated successfully.",
        );

        setEditing(false);

        queryClient.invalidateQueries({
          queryKey: [
            "nominee",
            nomineeId,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: ["nominees"],
        });
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to update the nominee.",
          ),
        );
      },
    });

  const verifyMutation =
    useMutation({
      mutationFn: (values) =>
        nomineeApi.verifyNominee(
          nomineeId,
          values,
        ),

      onSuccess: () => {
        toast.success(
          "Nominee verified successfully.",
        );

        queryClient.invalidateQueries({
          queryKey: [
            "nominee",
            nomineeId,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: ["nominees"],
        });
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "The verification code is invalid or expired.",
          ),
        );
      },
    });

  const resendMutation =
    useMutation({
      mutationFn: () =>
        nomineeApi.resendVerificationOtp(
          nomineeId,
        ),

      onSuccess: () => {
        toast.success(
          "A new verification code has been sent.",
        );
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to resend the verification code.",
          ),
        );
      },
    });

  if (nomineeQuery.isLoading) {
    return (
      <div className="w-full py-3">
        <div className="w-full space-y-6">
          <LoadingSkeleton className="h-28" />
          <LoadingSkeleton className="h-96" />
        </div>
      </div>
    );
  }

  if (nomineeQuery.isError) {
    return (
      <div className="px-4 py-16 text-center">
        <UserRound className="mx-auto h-12 w-12 text-red-400" />

        <h1 className="mt-5 text-2xl font-extrabold text-slate-950">
          Nominee unavailable
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          {getErrorMessage(
            nomineeQuery.error,
            "The nominee could not be loaded.",
          )}
        </p>

        <Link
          to={ROUTES.NOMINEES}
          className="mt-6 inline-block"
        >
          <Button
            leftIcon={ArrowLeft}
          >
            Back to nominees
          </Button>
        </Link>
      </div>
    );
  }

  const nominee =
    nomineeQuery.data;

  const permissionsPath =
    buildRoute(
      ROUTES.NOMINEE_PERMISSIONS,
      {
        nomineeId,
      },
    );

  const initials =
    getInitials(
      nominee.firstName,
      nominee.lastName,
    );

  if (editing) {
    return (
      <div className="page-enter w-full py-1">
        <div className="w-full">
          <PageHeader
            eyebrow="Edit nominee"
            title={`Update ${nominee.firstName}'s information`}
            description="Update personal details and the nominee’s initial emergency preference."
            actions={
              <Button
                size="medium"
                variant="secondary"
                leftIcon={ArrowLeft}
                onClick={() =>
                  setEditing(false)
                }
              >
                Cancel editing
              </Button>
            }
          />

          <div className="mt-7">
            <NomineeForm
              initialValues={nominee}
              submitText="Save changes"
              loading={
                updateMutation.isPending
              }
              onSubmit={(values) =>
                updateMutation.mutate(
                  values,
                )
              }
            />
          </div>
        </div>
      </div>
    );
  }

  const details = [
    {
      label: "Relationship",
      value:
        getRelationshipLabel(
          nominee.relationship,
        ),
    },
    {
      label: "Date of birth",
      value: nominee.dateOfBirth
        ? formatDate(
            nominee.dateOfBirth,
          )
        : "Not provided",
    },
    {
      label: "Priority",
      value:
        nominee.priorityLevel ||
        1,
    },
    {
      label: "Assigned documents",
      value:
        nominee.assignedDocumentCount ||
        0,
    },
  ];

  return (
    <div className="page-enter w-full py-1">
      <div className="w-full">
        <PageHeader
          eyebrow="Nominee profile"
          title={`${nominee.firstName} ${nominee.lastName}`}
          description="Review nominee information, verification and access permissions."
          actions={
            <>
              <Link
                to={ROUTES.NOMINEES}
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
                leftIcon={Pencil}
                onClick={() =>
                  setEditing(true)
                }
              >
                Edit nominee
              </Button>
            </>
          }
        />

        <section className="mt-7 grid w-full gap-6 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-start 2xl:grid-cols-[minmax(0,1fr)_390px]">
          <div className="min-w-0 space-y-6">
            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-start">
                <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-violet-600 text-lg font-extrabold text-white">
                  {initials}
                </span>

                <div className="min-w-0 flex-1">
                  <NomineeStatusBadge
                    status={
                      nominee.status
                    }
                  />

                  <h2 className="mt-4 text-2xl font-extrabold text-slate-950">
                    {nominee.firstName}{" "}
                    {nominee.lastName}
                  </h2>

                  <p className="mt-1 text-sm font-semibold text-slate-500">
                    {getRelationshipLabel(
                      nominee.relationship,
                    )}
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Mail className="h-5 w-5 text-blue-600" />

                  <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Email
                  </p>

                  <p className="mt-1 break-words text-sm font-bold text-slate-800">
                    {nominee.email}
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <Phone className="h-5 w-5 text-emerald-600" />

                  <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Mobile
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-800">
                    {nominee.phone}
                  </p>
                </div>

                {nominee.address && (
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
                    <MapPin className="h-5 w-5 text-red-500" />

                    <p className="mt-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Address
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      {nominee.address}
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 2xl:grid-cols-4">
                {details.map((detail) => (
                  <div
                    key={detail.label}
                    className="rounded-2xl border border-slate-200 p-4"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {detail.label}
                    </p>

                    <p className="mt-2 text-sm font-extrabold text-slate-900">
                      {detail.value}
                    </p>
                  </div>
                ))}
              </div>

              {nominee.notes && (
                <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-amber-700">
                    Private notes
                  </p>

                  <p className="mt-2 text-sm leading-6 text-amber-800">
                    {nominee.notes}
                  </p>
                </div>
              )}
            </article>

            <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <FileLock2 className="h-5 w-5" />
                </span>

                <div>
                  <h2 className="font-extrabold text-slate-950">
                    Document permissions
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Control which files this nominee may receive.
                  </p>
                </div>
              </div>

              <Link
                to={permissionsPath}
                className="mt-5 flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-4 text-sm font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                Manage document access
                <FileLock2 className="h-4.5 w-4.5" />
              </Link>
            </article>
          </div>

          <aside className="min-w-0 space-y-6 xl:sticky xl:top-[102px]">
            <VerificationCard
              nominee={nominee}
              verifying={
                verifyMutation.isPending
              }
              resending={
                resendMutation.isPending
              }
              onVerify={async (
                values,
              ) => {
                await verifyMutation.mutateAsync(
                  values,
                );
              }}
              onResend={async () => {
                await resendMutation.mutateAsync();
              }}
            />

            <section className="rounded-3xl bg-slate-950 p-6 text-white">
              <ShieldCheck className="h-7 w-7 text-blue-400" />

              <h2 className="mt-5 text-lg font-extrabold">
                Emergency access
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {nominee.emergencyAccessEnabled
                  ? "This nominee may initiate a verified emergency-access request."
                  : "Emergency-access requests are currently disabled for this nominee."}
              </p>

              <span
                className={[
                  "mt-5 inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider",
                  nominee.emergencyAccessEnabled
                    ? "bg-emerald-500/15 text-emerald-300"
                    : "bg-white/10 text-slate-400",
                ].join(" ")}
              >
                {nominee.emergencyAccessEnabled
                  ? "Enabled"
                  : "Disabled"}
              </span>
            </section>
          </aside>
        </section>
      </div>
    </div>
  );
}
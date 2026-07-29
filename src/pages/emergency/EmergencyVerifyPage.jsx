import {
  zodResolver,
} from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  KeyRound,
  MailCheck,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  Controller,
  useForm,
} from "react-hook-form";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { emergencyApi } from "../../api/emergencyApi";
import OTPInput from "../../components/auth/OTPInput";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/ui/Button";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import {
  emergencyOtpSchema,
} from "../../schemas/emergencySchema";
import { getErrorMessage } from "../../utils/errorHandler";
import { ROUTES } from "../../utils/routePaths";
import { buildRoute } from "../../utils/routeUtils";

function VerificationStep({
  icon: Icon,
  title,
  description,
  active = false,
  complete = false,
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={[
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition",
          complete
            ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
            : active
              ? "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300"
              : "border-[var(--border-primary)] bg-[var(--surface-inner)] text-[var(--text-subtle)]",
        ].join(" ")}
      >
        {complete ? (
          <CheckCircle2 className="h-4.5 w-4.5" />
        ) : (
          <Icon className="h-4.5 w-4.5" />
        )}
      </span>

      <div className="min-w-0">
        <p className="text-sm font-black text-[var(--text-primary)]">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function EmergencyVerifyPage() {
  const {
    requestId,
  } = useParams();

  const navigate =
    useNavigate();

  const queryClient =
    useQueryClient();

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

  const {
    control,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm({
    resolver: zodResolver(
      emergencyOtpSchema,
    ),

    defaultValues: {
      otp: "",
    },
  });

  const sendOtpMutation =
    useMutation({
      mutationFn: () =>
        emergencyApi.sendVerificationOtp(
          requestId,
        ),

      onSuccess: () => {
        toast.success(
          "Verification OTP sent.",
        );
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to send OTP.",
          ),
        );
      },
    });

  const verifyMutation =
    useMutation({
      mutationFn: (values) =>
        emergencyApi.verifyEmergencyOtp(
          requestId,
          values,
        ),

      onSuccess: () => {
        toast.success(
          "Identity verified successfully.",
        );

        queryClient.invalidateQueries({
          queryKey: [
            "emergency-request",
            requestId,
          ],
        });

        navigate(
          buildRoute(
            ROUTES.EMERGENCY_DETAILS,
            {
              requestId,
            },
          ),
          {
            replace: true,
          },
        );
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "The OTP is invalid or expired.",
          ),
        );
      },
    });

  if (requestQuery.isLoading) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <LoadingSkeleton className="h-28" />
          <LoadingSkeleton className="h-[520px]" />
        </div>
      </div>
    );
  }

  const detailsPath =
    buildRoute(
      ROUTES.EMERGENCY_DETAILS,
      {
        requestId,
      },
    );

  const request =
    requestQuery.data;

  return (
    <div className="page-enter px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          eyebrow="Identity verification"
          title="Verify emergency request"
          description="Complete OTP verification before submitting the emergency request for review."
          actions={
            <Link to={detailsPath}>
              <Button
                size="medium"
                variant="secondary"
                leftIcon={ArrowLeft}
              >
                Back
              </Button>
            </Link>
          }
        />

        <section className="mt-7 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="relative overflow-hidden rounded-[34px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-5 shadow-[var(--card-shadow)] sm:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-28 left-1/4 h-56 w-56 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-4">
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[22px] border border-blue-500/20 bg-blue-500/10 text-blue-700 shadow-sm dark:text-blue-300">
                    <MailCheck className="h-7 w-7" />
                  </span>

                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-blue-700 dark:text-blue-300">
                      <Sparkles className="h-3.5 w-3.5" />
                      Secure verification
                    </div>

                    <h2 className="mt-4 text-xl font-black tracking-[-0.03em] text-[var(--text-primary)] sm:text-2xl">
                      Enter verification code
                    </h2>

                    <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--text-muted)]">
                      A six-digit OTP will be sent to the registered nominee contact. Enter it below to confirm identity.
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] px-4 py-3 text-left sm:text-right">
                  <p className="text-[9px] font-black uppercase tracking-[0.12em] text-[var(--text-subtle)]">
                    Request
                  </p>

                  <p className="mt-1 text-xs font-black text-[var(--text-primary)]">
                    #
                    {String(
                      request?.id ||
                        requestId,
                    ).slice(0, 8)}
                  </p>
                </div>
              </div>

              <div className="mt-7 rounded-[26px] border border-[var(--border-primary)] bg-[var(--surface-inner)] p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.1em] text-[var(--text-subtle)]">
                      Step 1
                    </p>

                    <p className="mt-1 text-sm font-black text-[var(--text-primary)]">
                      Request a one-time password
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                      The OTP is sent only to the registered nominee contact.
                    </p>
                  </div>

                  <Button
                    variant="secondary"
                    leftIcon={RefreshCw}
                    loading={
                      sendOtpMutation.isPending
                    }
                    loadingText="Sending OTP..."
                    onClick={() =>
                      sendOtpMutation.mutate()
                    }
                  >
                    Send verification OTP
                  </Button>
                </div>
              </div>

              <form
                onSubmit={handleSubmit(
                  (values) =>
                    verifyMutation.mutate(
                      values,
                    ),
                )}
                className="mt-6"
              >
                <div className="rounded-[26px] border border-[var(--border-primary)] bg-[var(--surface-inner)] p-5 sm:p-6">
                  <div className="mb-5">
                    <p className="text-xs font-black uppercase tracking-[0.1em] text-[var(--text-subtle)]">
                      Step 2
                    </p>

                    <p className="mt-1 text-sm font-black text-[var(--text-primary)]">
                      Enter the six-digit code
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                      OTPs are time-sensitive and may expire after a short period.
                    </p>
                  </div>

                  <Controller
                    name="otp"
                    control={control}
                    render={({ field }) => (
                      <OTPInput
                        value={field.value}
                        onChange={
                          field.onChange
                        }
                        error={
                          errors.otp?.message
                        }
                        disabled={
                          verifyMutation.isPending
                        }
                      />
                    )}
                  />

                  <Button
                    type="submit"
                    fullWidth
                    className="mt-6"
                    loading={
                      verifyMutation.isPending
                    }
                    loadingText="Verifying identity..."
                    leftIcon={ShieldCheck}
                  >
                    Verify identity
                  </Button>
                </div>
              </form>

              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-blue-700 dark:text-blue-300" />

                <p className="text-xs leading-5 text-[var(--text-muted)]">
                  LastKey uses identity verification to help prevent unauthorized emergency access and fraudulent release requests.
                </p>
              </div>
            </div>
          </div>

          <aside className="space-y-5">
            <section className="rounded-[28px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-5 shadow-[var(--card-shadow)]">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--text-subtle)]">
                Verification flow
              </p>

              <div className="mt-5 space-y-5">
                <VerificationStep
                  icon={MailCheck}
                  title="Send OTP"
                  description="Generate a secure code for the registered nominee."
                  active
                  complete={
                    sendOtpMutation.isSuccess
                  }
                />

                <div className="ml-5 h-5 w-px bg-[var(--border-primary)]" />

                <VerificationStep
                  icon={KeyRound}
                  title="Enter code"
                  description="Provide the six-digit code received by the nominee."
                  active={
                    sendOtpMutation.isSuccess
                  }
                />

                <div className="ml-5 h-5 w-px bg-[var(--border-primary)]" />

                <VerificationStep
                  icon={ShieldCheck}
                  title="Confirm identity"
                  description="Verify the nominee and return to the request."
                />
              </div>
            </section>

            <section className="rounded-[28px] border border-amber-500/20 bg-amber-500/10 p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-amber-500/20 bg-[var(--surface-primary)] text-amber-700 dark:text-amber-300">
                  <Clock3 className="h-4.5 w-4.5" />
                </span>

                <div>
                  <p className="text-sm font-black text-[var(--text-primary)]">
                    OTP expired?
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">
                    Send a new code and use only the most recent OTP.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[28px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-5 shadow-[var(--card-shadow)]">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[var(--text-subtle)]">
                Security note
              </p>

              <p className="mt-3 text-xs leading-6 text-[var(--text-muted)]">
                Never share the verification code with anyone other than the authorized nominee completing this process.
              </p>
            </section>
          </aside>
        </section>
      </div>
    </div>
  );
}
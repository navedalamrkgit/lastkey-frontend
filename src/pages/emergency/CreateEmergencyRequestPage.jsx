import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Fingerprint,
  LoaderCircle,
  LockKeyhole,
  Phone,
  Save,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { emergencyApi } from "../../api/emergencyApi";
import { nomineeApi } from "../../api/nomineeApi";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";
import { EMERGENCY_TYPES } from "../../config/emergencyConfig";
import { emergencyRequestSchema } from "../../schemas/emergencySchema";
import { getErrorMessage } from "../../utils/errorHandler";
import { ROUTES } from "../../utils/routePaths";
import { buildRoute } from "../../utils/routeUtils";

function normalizeNominees(response) {
  const data = response?.data;

  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.content)) return data.content;
  if (Array.isArray(data.data)) return data.data;
  if (Array.isArray(data.nominees)) return data.nominees;
  if (Array.isArray(data.data?.content)) return data.data.content;

  return [];
}

function FieldError({ message }) {
  if (!message) return null;

  return (
    <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-rose-600">
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      {message}
    </p>
  );
}

function SectionHeading({
  icon: Icon,
  eyebrow,
  title,
  description,
  step,
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-indigo-200/70 bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-600 shadow-sm">
        <Icon className="h-5 w-5" />
        {step && (
          <span className="absolute -right-2 -top-2 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-white bg-slate-950 px-1.5 text-[10px] font-black text-white">
            {step}
          </span>
        )}
      </div>

      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-indigo-600">
          {eyebrow}
        </p>

        <h2 className="mt-1 text-xl font-black tracking-[-0.025em] text-slate-950">
          {title}
        </h2>

        <p className="mt-1.5 max-w-2xl text-sm leading-6 text-slate-500">
          {description}
        </p>
      </div>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
  description,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
      <div className="flex items-center justify-between gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-indigo-200">
          <Icon className="h-4 w-4" />
        </span>

        <span className="text-sm font-black text-white">
          {value}
        </span>
      </div>

      <p className="mt-3 text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-xs leading-5 text-slate-300">
        {description}
      </p>
    </div>
  );
}

function SecurityRow({
  label,
  value,
  icon: Icon = CheckCircle2,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3.5">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
          <Icon className="h-4 w-4" />
        </span>

        <span className="text-xs font-bold text-slate-700">
          {label}
        </span>
      </div>

      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700">
        {value}
      </span>
    </div>
  );
}

function getNomineeName(nominee) {
  return (
    [nominee?.firstName, nominee?.lastName]
      .filter(Boolean)
      .join(" ") ||
    nominee?.email ||
    "Nominee"
  );
}

function getInitials(nominee) {
  const name = getNomineeName(nominee);

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export default function CreateEmergencyRequestPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const nomineeQuery = useQuery({
    queryKey: ["verified-emergency-nominees"],

    queryFn: async () => {
      const response = await nomineeApi.getNominees({
        status: "VERIFIED",
      });

      return normalizeNominees(response);
    },

    retry: 1,
    staleTime: 60 * 1000,
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      emergencyRequestSchema,
    ),

    defaultValues: {
      nomineeId: "",
      emergencyType: "",
      incidentDate: "",
      description: "",
      requestedAccessReason: "",
      contactPhone: "",
      declarationAccepted: false,
    },
  });

  const selectedNomineeId = watch("nomineeId");
  const selectedEmergencyType = watch("emergencyType");
  const description = watch("description") || "";
  const requestedAccessReason =
    watch("requestedAccessReason") || "";
  const incidentDate = watch("incidentDate");
  const contactPhone = watch("contactPhone") || "";
  const declarationAccepted =
    watch("declarationAccepted");

  const createMutation = useMutation({
    mutationFn: (values) => {
      const reasonParts = [
        `Emergency type: ${values.emergencyType}`,
        `Incident date: ${values.incidentDate}`,
        `Description: ${values.description.trim()}`,
        `Requested access reason: ${values.requestedAccessReason.trim()}`,
        `Contact phone: ${values.contactPhone.trim()}`,
      ];

      return emergencyApi.createEmergencyRequest({
        nomineeId: values.nomineeId,
        triggerType: "OWNER_CREATED",
        reason: reasonParts.join("\n"),
        evidenceUrl: null,
        waitingPeriodDays: 7,
      });
    },

    onSuccess: (response) => {
      toast.success(
        "Emergency request created successfully.",
      );

      queryClient.invalidateQueries({
        queryKey: ["emergency-requests"],
      });

      const requestId =
        response.data?.id ||
        response.data?.requestId;

      if (requestId) {
        navigate(
          buildRoute(
            ROUTES.EMERGENCY_VERIFY,
            { requestId },
          ),
          { replace: true },
        );
      } else {
        navigate(
          ROUTES.EMERGENCY,
          { replace: true },
        );
      }
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          "Unable to create the emergency request.",
        ),
      );
    },
  });

  const nominees = nomineeQuery.data || [];

  const selectedNominee = useMemo(
    () =>
      nominees.find(
        (nominee) =>
          nominee.id === selectedNomineeId,
      ),
    [nominees, selectedNomineeId],
  );

  const completenessScore = useMemo(() => {
    const checks = [
      Boolean(selectedNomineeId),
      Boolean(selectedEmergencyType),
      Boolean(incidentDate),
      /^\d{10}$/.test(contactPhone),
      description.trim().length >= 20,
      requestedAccessReason.trim().length >= 10,
      declarationAccepted === true,
    ];

    return Math.round(
      (checks.filter(Boolean).length /
        checks.length) *
        100,
    );
  }, [
    selectedNomineeId,
    selectedEmergencyType,
    incidentDate,
    contactPhone,
    description,
    requestedAccessReason,
    declarationAccepted,
  ]);

  const descriptionSignals = useMemo(
    () => [
      {
        label: "Incident explained",
        complete:
          description.trim().length >= 20,
      },
      {
        label: "Date selected",
        complete: Boolean(incidentDate),
      },
      {
        label: "Access purpose added",
        complete:
          requestedAccessReason.trim().length >=
          10,
      },
      {
        label: "Contact available",
        complete: /^\d{10}$/.test(
          contactPhone,
        ),
      },
    ],
    [
      description,
      incidentDate,
      requestedAccessReason,
      contactPhone,
    ],
  );

  const textareaClass = (hasError) =>
    [
      "w-full resize-y rounded-2xl border px-4 py-4 text-sm leading-6 text-slate-800 outline-none transition-all placeholder:text-slate-400",
      hasError
        ? "border-rose-300 bg-rose-50/40 ring-4 ring-rose-50 focus:border-rose-400"
        : "border-slate-200 bg-slate-50/70 hover:border-slate-300 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10",
    ].join(" ");

  return (
    <div className="page-enter min-h-full bg-[radial-gradient(circle_at_12%_0%,rgba(99,102,241,0.10),transparent_28%),radial-gradient(circle_at_88%_10%,rgba(14,165,233,0.08),transparent_24%),linear-gradient(to_bottom,#f8fafc,#ffffff_44%)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1480px]">
        <PageHeader
          eyebrow="Emergency workflow"
          title="Create emergency request"
          description="Begin a controlled, verified and fully auditable emergency-access process."
          actions={
            <Link to={ROUTES.EMERGENCY}>
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

        <section className="relative mt-7 overflow-hidden rounded-[34px] border border-slate-800 bg-slate-950 px-6 py-8 text-white shadow-[0_30px_90px_-38px_rgba(15,23,42,0.9)] sm:px-8 lg:px-10 lg:py-10">
          <div className="pointer-events-none absolute -left-24 -top-28 h-80 w-80 rounded-full bg-indigo-500/25 blur-[100px]" />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-[100px]" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:28px_28px]" />

          <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_440px] xl:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-300/15 bg-indigo-300/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.18em] text-indigo-200">
                <Sparkles className="h-4 w-4" />
                Protected request · Step 1 of 4
              </div>

              <h1 className="mt-6 max-w-3xl text-3xl font-black tracking-[-0.045em] sm:text-4xl lg:text-5xl">
                Start a secure emergency
                access request
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Documents stay locked while
                identity, evidence and access
                conditions are reviewed. Nothing is
                released automatically.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                {[
                  "OTP verification",
                  "Evidence review",
                  "Waiting period",
                  "Complete audit trail",
                ].map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3.5 py-2 text-xs font-bold text-slate-200 backdrop-blur"
                  >
                    <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
              <MetricCard
                icon={Fingerprint}
                label="Identity"
                value="Required"
                description="Secure OTP confirmation"
              />

              <MetricCard
                icon={FileCheck2}
                label="Evidence"
                value="Reviewed"
                description="Proof checked before approval"
              />

              <MetricCard
                icon={Clock3}
                label="Release"
                value="Controlled"
                description="Policy-based waiting period"
              />
            </div>
          </div>
        </section>

        <form
          onSubmit={handleSubmit((values) =>
            createMutation.mutate(values),
          )}
          className="mt-7 grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]"
          noValidate
        >
          <div className="min-w-0 space-y-6">
            <section className="rounded-[32px] border border-slate-200/80 bg-white p-5 shadow-[0_22px_70px_-45px_rgba(15,23,42,0.5)] sm:p-7 lg:p-8">
              <SectionHeading
                icon={UserRound}
                step="1"
                eyebrow="Verified nominee"
                title="Choose who is requesting access"
                description="Only verified nominees can begin this protected workflow."
              />

              <input
                type="hidden"
                {...register("nomineeId")}
              />

              <div className="mt-7">
                {nomineeQuery.isLoading ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {Array.from({
                      length: 2,
                    }).map((_, index) => (
                      <div
                        key={index}
                        className="h-28 animate-pulse rounded-2xl border border-slate-200 bg-slate-50"
                      />
                    ))}
                  </div>
                ) : nomineeQuery.isError ? (
                  <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5">
                    <p className="text-sm font-black text-rose-800">
                      Unable to load verified nominees
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        nomineeQuery.refetch()
                      }
                      className="mt-3 inline-flex items-center gap-2 text-xs font-black text-rose-700"
                    >
                      <LoaderCircle className="h-4 w-4" />
                      Retry loading
                    </button>
                  </div>
                ) : nominees.length === 0 ? (
                  <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
                    <p className="text-sm font-black text-amber-900">
                      No verified nominee is available.
                    </p>

                    <p className="mt-2 text-xs leading-5 text-amber-800">
                      Verify at least one nominee before
                      creating an emergency request.
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {nominees.map((nominee) => {
                      const selected =
                        nominee.id ===
                        selectedNomineeId;

                      return (
                        <button
                          key={nominee.id}
                          type="button"
                          onClick={() =>
                            setValue(
                              "nomineeId",
                              nominee.id,
                              {
                                shouldValidate: true,
                                shouldDirty: true,
                              },
                            )
                          }
                          className={[
                            "group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200",
                            selected
                              ? "border-indigo-500 bg-indigo-50 ring-4 ring-indigo-500/10"
                              : "border-slate-200 bg-white hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md",
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-black",
                              selected
                                ? "bg-indigo-600 text-white"
                                : "bg-slate-100 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-700",
                            ].join(" ")}
                          >
                            {getInitials(
                              nominee,
                            )}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-black text-slate-950">
                              {getNomineeName(
                                nominee,
                              )}
                            </span>

                            <span className="mt-1 block truncate text-xs text-slate-500">
                              {nominee.relationship ||
                                nominee.email}
                            </span>

                            <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-emerald-700">
                              <BadgeCheck className="h-3 w-3" />
                              Verified
                            </span>
                          </span>

                          <span
                            className={[
                              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2",
                              selected
                                ? "border-indigo-600 bg-indigo-600 text-white"
                                : "border-slate-200 text-transparent",
                            ].join(" ")}
                          >
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                )}

                <FieldError
                  message={
                    errors.nomineeId?.message
                  }
                />
              </div>
            </section>

            <section className="rounded-[32px] border border-slate-200/80 bg-white p-5 shadow-[0_22px_70px_-45px_rgba(15,23,42,0.5)] sm:p-7 lg:p-8">
              <SectionHeading
                icon={AlertTriangle}
                step="2"
                eyebrow="Emergency classification"
                title="Select the emergency type"
                description="Choose the category that best describes the situation."
              />

              <input
                type="hidden"
                {...register("emergencyType")}
              />

              <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {EMERGENCY_TYPES.map(
                  (item) => {
                    const selected =
                      selectedEmergencyType ===
                      item.value;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() =>
                          setValue(
                            "emergencyType",
                            item.value,
                            {
                              shouldValidate: true,
                              shouldDirty: true,
                            },
                          )
                        }
                        className={[
                          "relative min-h-24 rounded-2xl border p-4 text-left transition-all duration-200",
                          selected
                            ? "border-indigo-500 bg-gradient-to-br from-indigo-50 to-violet-50 ring-4 ring-indigo-500/10"
                            : "border-slate-200 bg-slate-50/60 hover:-translate-y-0.5 hover:border-indigo-200 hover:bg-white hover:shadow-md",
                        ].join(" ")}
                      >
                        <span
                          className={[
                            "flex h-9 w-9 items-center justify-center rounded-xl",
                            selected
                              ? "bg-indigo-600 text-white"
                              : "bg-white text-slate-500 shadow-sm",
                          ].join(" ")}
                        >
                          <AlertTriangle className="h-4 w-4" />
                        </span>

                        <span className="mt-3 block text-sm font-black text-slate-900">
                          {item.label}
                        </span>

                        {selected && (
                          <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-indigo-600" />
                        )}
                      </button>
                    );
                  },
                )}
              </div>

              <FieldError
                message={
                  errors.emergencyType?.message
                }
              />
            </section>

            <section className="rounded-[32px] border border-slate-200/80 bg-white p-5 shadow-[0_22px_70px_-45px_rgba(15,23,42,0.5)] sm:p-7 lg:p-8">
              <SectionHeading
                icon={CalendarDays}
                step="3"
                eyebrow="Incident information"
                title="Add date and contact details"
                description="Provide information reviewers can verify during the assessment."
              />

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <div className="relative">
                  <CalendarDays className="pointer-events-none absolute left-4 top-[43px] z-10 h-4 w-4 text-slate-400" />

                  <FormInput
                    label="Incident date"
                    name="incidentDate"
                    type="date"
                    error={
                      errors.incidentDate
                        ?.message
                    }
                    required
                    className="pl-11"
                    {...register(
                      "incidentDate",
                    )}
                  />
                </div>

                <div className="relative">
                  <Phone className="pointer-events-none absolute left-4 top-[43px] z-10 h-4 w-4 text-slate-400" />

                  <FormInput
                    label="Contact phone"
                    name="contactPhone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    placeholder="9876543210"
                    error={
                      errors.contactPhone
                        ?.message
                    }
                    required
                    className="pl-11"
                    {...register(
                      "contactPhone",
                    )}
                  />
                </div>
              </div>
            </section>

            <section className="rounded-[32px] border border-slate-200/80 bg-white p-5 shadow-[0_22px_70px_-45px_rgba(15,23,42,0.5)] sm:p-7 lg:p-8">
              <SectionHeading
                icon={FileCheck2}
                step="4"
                eyebrow="Emergency statement"
                title="Explain what happened"
                description="Use clear, specific and verifiable details to help reviewers understand the request."
              />

              <div className="mt-7">
                <div className="flex items-end justify-between gap-4">
                  <label
                    htmlFor="description"
                    className="text-sm font-black text-slate-800"
                  >
                    Emergency description
                    <span className="ml-1 text-rose-500">
                      *
                    </span>
                  </label>

                  <span className="text-[11px] font-bold text-slate-400">
                    {description.length} / 1500
                  </span>
                </div>

                <textarea
                  id="description"
                  rows={7}
                  placeholder="Describe the incident, current situation, timeline and all important context..."
                  className={textareaClass(
                    Boolean(
                      errors.description,
                    ),
                  )}
                  {...register("description")}
                />

                <FieldError
                  message={
                    errors.description?.message
                  }
                />
              </div>

              <div className="mt-6">
                <div className="flex items-end justify-between gap-4">
                  <label
                    htmlFor="requestedAccessReason"
                    className="text-sm font-black text-slate-800"
                  >
                    Why is document access
                    required?
                    <span className="ml-1 text-rose-500">
                      *
                    </span>
                  </label>

                  <span className="text-[11px] font-bold text-slate-400">
                    {
                      requestedAccessReason.length
                    }{" "}
                    / 1000
                  </span>
                </div>

                <textarea
                  id="requestedAccessReason"
                  rows={5}
                  placeholder="Explain the exact purpose of access and how the documents will be used..."
                  className={textareaClass(
                    Boolean(
                      errors.requestedAccessReason,
                    ),
                  )}
                  {...register(
                    "requestedAccessReason",
                  )}
                />

                <FieldError
                  message={
                    errors
                      .requestedAccessReason
                      ?.message
                  }
                />
              </div>

              <div className="mt-6 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50/80 to-white p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-indigo-600">
                      Request quality
                    </p>

                    <p className="mt-1 text-lg font-black text-slate-950">
                      {completenessScore}% complete
                    </p>
                  </div>

                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-indigo-100 sm:max-w-48">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 transition-all duration-500"
                      style={{
                        width: `${completenessScore}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {descriptionSignals.map(
                    (signal) => (
                      <div
                        key={signal.label}
                        className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2.5"
                      >
                        {signal.complete ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}

                        <span className="text-xs font-bold text-slate-700">
                          {signal.label}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </section>

            <label
              className={[
                "group flex cursor-pointer items-start gap-4 rounded-[28px] border p-5 transition-all duration-200 sm:p-6",
                errors.declarationAccepted
                  ? "border-rose-200 bg-rose-50/60 ring-4 ring-rose-50"
                  : "border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/70 hover:border-amber-300 hover:shadow-md",
              ].join(" ")}
            >
              <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
                <input
                  type="checkbox"
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-amber-300 bg-white transition checked:border-amber-600 checked:bg-amber-600 focus:outline-none focus:ring-4 focus:ring-amber-500/15"
                  {...register(
                    "declarationAccepted",
                  )}
                />

                <Check className="pointer-events-none absolute h-3.5 w-3.5 scale-0 text-white transition peer-checked:scale-100" />
              </span>

              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

              <span>
                <span className="block text-sm font-black text-amber-950">
                  Accuracy and authorisation
                  declaration
                </span>

                <span className="mt-1.5 block text-xs leading-6 text-amber-800">
                  I confirm that the
                  information provided is accurate
                  and that I am authorised to
                  submit this emergency request.
                  False or misleading information
                  may result in rejection.
                </span>

                {errors.declarationAccepted && (
                  <span className="mt-2 flex items-center gap-1.5 text-xs font-bold text-rose-600">
                    <AlertCircle className="h-3.5 w-3.5" />
                    {
                      errors
                        .declarationAccepted
                        .message
                    }
                  </span>
                )}
              </span>
            </label>

            <section className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-black text-slate-900">
                  Ready to begin verification?
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  You will be redirected to the
                  secure nominee verification
                  step.
                </p>
              </div>

              <Button
                type="submit"
                loading={
                  createMutation.isPending
                }
                loadingText="Creating request..."
                leftIcon={Save}
                disabled={
                  createMutation.isPending ||
                  nomineeQuery.isLoading ||
                  nomineeQuery.isError ||
                  nominees.length === 0
                }
                className="shrink-0 shadow-[0_14px_30px_rgba(79,70,229,0.22)]"
              >
                Create protected request
              </Button>
            </section>
          </div>

          <aside className="min-w-0 space-y-5 xl:sticky xl:top-6 xl:self-start">
            <section className="relative overflow-hidden rounded-[30px] bg-slate-950 p-6 text-white shadow-[0_25px_75px_-40px_rgba(15,23,42,0.95)]">
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-indigo-500/25 blur-3xl" />

              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-indigo-300">
                  <LockKeyhole className="h-5 w-5" />
                </span>

                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">
                  Live request status
                </p>

                <h2 className="mt-2 text-xl font-black tracking-[-0.025em]">
                  Protected workflow
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Creating this request starts
                  verification only. It does not
                  release any protected document.
                </p>

                <div className="mt-6 rounded-2xl border border-emerald-400/15 bg-emerald-400/10 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-xs font-black text-emerald-300">
                      <BadgeCheck className="h-4 w-4" />
                      Audit protection
                    </span>

                    <span className="rounded-full bg-emerald-300/10 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-emerald-300">
                      Active
                    </span>
                  </div>

                  <p className="mt-2 text-xs leading-5 text-emerald-100/70">
                    Verification events, review
                    decisions and release actions
                    are recorded.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.45)]">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                Security status
              </p>

              <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-slate-950">
                All controls enabled
              </h2>

              <div className="mt-5 space-y-3">
                <SecurityRow
                  label="OTP verification"
                  value="Required"
                  icon={Fingerprint}
                />

                <SecurityRow
                  label="Evidence review"
                  value="Enabled"
                  icon={FileCheck2}
                />

                <SecurityRow
                  label="Waiting period"
                  value="Policy"
                  icon={Clock3}
                />

                <SecurityRow
                  label="Audit trail"
                  value="Recording"
                  icon={ShieldCheck}
                />
              </div>
            </section>

            <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.45)]">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                    Request readiness
                  </p>

                  <p className="mt-2 text-3xl font-black tracking-[-0.045em] text-slate-950">
                    {completenessScore}%
                  </p>
                </div>

                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <Sparkles className="h-5 w-5" />
                </span>
              </div>

              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 transition-all duration-500"
                  style={{
                    width: `${completenessScore}%`,
                  }}
                />
              </div>

              {selectedNominee && (
                <div className="mt-5 rounded-2xl border border-indigo-100 bg-indigo-50/70 p-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.16em] text-indigo-600">
                    Selected nominee
                  </p>

                  <p className="mt-1 text-sm font-black text-slate-950">
                    {getNomineeName(
                      selectedNominee,
                    )}
                  </p>
                </div>
              )}
            </section>

            <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.45)]">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
                What happens next
              </p>

              <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-slate-950">
                Four controlled steps
              </h2>

              <ol className="relative mt-6 before:absolute before:bottom-4 before:left-[17px] before:top-4 before:w-px before:bg-slate-200">
                {[
                  [
                    Fingerprint,
                    "Verify identity",
                    "The nominee confirms the request using a secure OTP.",
                  ],
                  [
                    FileCheck2,
                    "Upload evidence",
                    "Supporting proof is attached for review.",
                  ],
                  [
                    ShieldCheck,
                    "Complete review",
                    "The request is assessed against security policy.",
                  ],
                  [
                    Clock3,
                    "Waiting period",
                    "Documents remain locked until all controls complete.",
                  ],
                ].map(
                  (
                    [
                      Icon,
                      title,
                      detail,
                    ],
                    index,
                  ) => (
                    <li
                      key={title}
                      className="relative flex gap-3.5 pb-5 last:pb-0"
                    >
                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600">
                        <Icon className="h-4 w-4" />
                      </div>

                      <div className="pt-0.5">
                        <p className="text-[9px] font-black uppercase tracking-[0.16em] text-slate-400">
                          Step {index + 1}
                        </p>

                        <p className="mt-0.5 text-sm font-black text-slate-900">
                          {title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {detail}
                        </p>
                      </div>
                    </li>
                  ),
                )}
              </ol>
            </section>
          </aside>
        </form>
      </div>
    </div>
  );
}
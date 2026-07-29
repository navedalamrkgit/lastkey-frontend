import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Download,
  FileCheck2,
  KeyRound,
  LockKeyhole,
  Mail,
  RefreshCw,
  ShieldCheck,
  Sparkles,
  TimerReset,
} from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

import { emergencyApi } from "../../api/emergencyApi";
import OTPInput from "../../components/auth/OTPInput";
import Logo from "../../components/branding/Logo";
import ReleasedDocumentCard from "../../components/emergency/ReleasedDocumentCard";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import { publicEmergencyAccessSchema } from "../../schemas/emergencySchema";
import { getErrorMessage } from "../../utils/errorHandler";
import { downloadBlob } from "../../utils/fileUtils";
import { formatDate } from "../../utils/formatDate";

function normalizeDocuments(response) {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.documents)) return data.documents;
  if (Array.isArray(data?.content)) return data.content;
  return [];
}

function SecurityPoint({ icon: Icon, title, description }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-blue-300">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-sm font-black text-white">{title}</p>
        <p className="mt-1 text-xs leading-5 text-slate-400">{description}</p>
      </div>
    </div>
  );
}

export default function EmergencyPortalPage() {
  const { accessCode, token } = useParams();
  const portalCode = accessCode || token;
  const [verified, setVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [downloadingId, setDownloadingId] = useState(null);

  const publicRequestQuery = useQuery({
    queryKey: ["public-emergency-request", portalCode],
    queryFn: async () => {
      if (!portalCode) throw new Error("Emergency access code is missing.");
      const response = await emergencyApi.getPublicRequest(portalCode);
      return response.data;
    },
    enabled: Boolean(portalCode),
    retry: 1,
  });

  const releasedDocumentsQuery = useQuery({
    queryKey: ["public-released-documents", portalCode],
    queryFn: async () =>
      normalizeDocuments(await emergencyApi.getPublicReleasedDocuments(portalCode)),
    enabled: Boolean(portalCode && verified),
    retry: 1,
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(publicEmergencyAccessSchema),
    defaultValues: { email: "", otp: "" },
  });

  const verifyMutation = useMutation({
    mutationFn: (values) => emergencyApi.verifyPublicAccess(portalCode, values),
    onSuccess: (_, values) => {
      setVerifiedEmail(values.email);
      setVerified(true);
      toast.success("Emergency access verified.");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error, "Access verification failed."));
    },
  });

  async function handleDownload(releasedDocument) {
    try {
      setDownloadingId(releasedDocument.id);
      const response = await emergencyApi.downloadPublicReleasedDocument(
        portalCode,
        releasedDocument.id,
      );
      downloadBlob(
        response.data,
        releasedDocument.fileName || releasedDocument.title || "released-document",
      );
      toast.success("Document download started.");
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to download the document."));
    } finally {
      setDownloadingId(null);
    }
  }

  if (publicRequestQuery.isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 px-4 py-10">
        <div className="mx-auto max-w-6xl space-y-6">
          <div className="flex justify-center"><LoadingSkeleton className="h-14 w-44 rounded-2xl" /></div>
          <LoadingSkeleton className="h-44 rounded-[34px]" />
          <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
            <LoadingSkeleton className="h-[520px] rounded-[30px]" />
            <LoadingSkeleton className="h-[520px] rounded-[30px]" />
          </div>
        </div>
      </div>
    );
  }

  if (publicRequestQuery.isError || !portalCode) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-rose-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="relative max-w-md rounded-[32px] border border-white/10 bg-white/[0.04] p-8 text-center text-white shadow-2xl backdrop-blur-xl">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-[24px] border border-rose-400/20 bg-rose-500/10 text-rose-300">
            <LockKeyhole className="h-8 w-8" />
          </span>
          <h1 className="mt-5 text-2xl font-black tracking-[-0.03em]">Access link unavailable</h1>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            {getErrorMessage(publicRequestQuery.error, "This emergency access link is invalid or expired.")}
          </p>
          <button
            type="button"
            onClick={() => publicRequestQuery.refetch()}
            className="mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 text-sm font-black text-white transition hover:bg-white/10"
          >
            <RefreshCw className="h-4 w-4" /> Try again
          </button>
        </div>
      </div>
    );
  }

  const request = publicRequestQuery.data || {};
  const documents = releasedDocumentsQuery.data || [];
  const requestReference = String(request.id || portalCode || "")
    .slice(0, 8)
    .toUpperCase();

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-8 sm:px-6 lg:py-10">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 left-1/4 h-[500px] w-[500px] rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="flex justify-center">
          <Logo variant="light" showTagline />
        </div>

        <section className="mt-8 overflow-hidden rounded-[40px] border border-white/10 bg-white shadow-[0_35px_100px_rgba(2,6,23,0.45)]">
          <header className="relative overflow-hidden bg-slate-950 px-6 py-8 text-white sm:px-10 sm:py-10">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-300">
                  <ShieldCheck className="h-4 w-4" /> Secure emergency portal
                </div>
                <h1 className="mt-5 text-3xl font-black tracking-[-0.04em] sm:text-4xl">Emergency document access</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
                  Verify your identity to access only the documents approved for this emergency request.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-300">Reference {requestReference}</span>
                  {request.expiresAt && (
                    <span className="rounded-full border border-amber-400/20 bg-amber-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-amber-300">Expires {formatDate(request.expiresAt)}</span>
                  )}
                </div>
              </div>
              <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[24px] border border-white/10 bg-white/5 text-blue-300 shadow-xl">
                <KeyRound className="h-8 w-8" />
              </span>
            </div>
          </header>

          {!verified ? (
            <form
              onSubmit={handleSubmit((values) => verifyMutation.mutate(values))}
              className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_350px]"
            >
              <div className="rounded-[30px] border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-blue-700">
                  <Sparkles className="h-3.5 w-3.5" /> Verification required
                </div>
                <h2 className="mt-4 text-2xl font-black tracking-[-0.03em] text-slate-950">Confirm your identity</h2>
                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Use the nominee email registered with this request and the six-digit OTP sent through the secure verification channel.
                </p>

                <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-5 w-5 text-blue-600" />
                    <div><p className="text-sm font-black text-slate-800">Registered nominee only</p><p className="mt-1 text-xs leading-5 text-slate-500">The email must match the nominee assigned to this emergency request.</p></div>
                  </div>
                </div>

                <div className="mt-7">
                  <FormInput
                    label="Registered nominee email"
                    name="email"
                    type="email"
                    placeholder="nominee@example.com"
                    error={errors.email?.message}
                    required
                    autoComplete="email"
                    {...register("email")}
                  />
                </div>

                <div className="mt-6">
                  <label className="mb-3 block text-sm font-semibold text-slate-700">Verification OTP</label>
                  <Controller
                    name="otp"
                    control={control}
                    render={({ field }) => (
                      <OTPInput
                        value={field.value}
                        onChange={field.onChange}
                        error={errors.otp?.message}
                        disabled={verifyMutation.isPending}
                      />
                    )}
                  />
                </div>

                <Button
                  type="submit"
                  fullWidth
                  className="mt-7"
                  loading={verifyMutation.isPending}
                  loadingText="Verifying access..."
                  leftIcon={ShieldCheck}
                >
                  Verify secure access
                </Button>

                <p className="mt-4 text-center text-[11px] leading-5 text-slate-400">
                  Verification attempts may be logged for security and audit protection.
                </p>
              </div>

              <aside className="space-y-5">
                <section className="rounded-[30px] bg-slate-950 p-6 text-white">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-blue-300">Security controls</p>
                  <div className="mt-5 space-y-3">
                    <SecurityPoint icon={LockKeyhole} title="Protected access" description="Documents remain hidden until successful verification." />
                    <SecurityPoint icon={TimerReset} title="Time-limited portal" description="Access may expire automatically based on release policy." />
                    <SecurityPoint icon={FileCheck2} title="Approved files only" description="Only specifically released documents are displayed." />
                  </div>
                </section>

                <section className="rounded-[28px] border border-amber-200 bg-amber-50 p-6">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <div><p className="text-sm font-black text-amber-950">Security reminder</p><p className="mt-2 text-sm leading-6 text-amber-800">Never share your OTP or emergency-access link with an unauthorized person.</p></div>
                  </div>
                </section>
              </aside>
            </form>
          ) : (
            <div className="p-6 sm:p-10">
              <div className="rounded-[30px] border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-200 bg-white text-emerald-600 shadow-sm">
                      <CheckCircle2 className="h-5 w-5" />
                    </span>
                    <div><h2 className="text-xl font-black text-emerald-950">Access verified</h2><p className="mt-2 text-sm leading-6 text-emerald-700">Verified for {verifiedEmail || "the registered nominee"}. Approved documents are available below.</p></div>
                  </div>
                  <span className="w-fit rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-emerald-700">Secure session active</span>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div><p className="text-[10px] font-black uppercase tracking-[0.12em] text-blue-700">Released documents</p><h3 className="mt-1 text-2xl font-black tracking-[-0.03em] text-slate-950">Emergency access files</h3><p className="mt-2 text-sm text-slate-500">Download and store these files securely.</p></div>
                <span className="w-fit rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-black text-slate-600">{documents.length} document{documents.length === 1 ? "" : "s"}</span>
              </div>

              {releasedDocumentsQuery.isError ? (
                <div className="mt-7 rounded-[28px] border border-rose-200 bg-rose-50 p-8 text-center">
                  <AlertTriangle className="mx-auto h-9 w-9 text-rose-600" />
                  <p className="mt-4 text-sm font-black text-rose-900">Unable to load released documents</p>
                  <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-rose-700">{getErrorMessage(releasedDocumentsQuery.error, "Please retry the secure document request.")}</p>
                  <button type="button" onClick={() => releasedDocumentsQuery.refetch()} className="mt-5 inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-white px-4 text-xs font-black text-rose-700"><RefreshCw className="h-4 w-4" /> Retry</button>
                </div>
              ) : (
                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  {releasedDocumentsQuery.isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => <LoadingSkeleton key={index} className="h-64 rounded-[28px]" />)
                  ) : documents.length === 0 ? (
                    <div className="rounded-[28px] border border-dashed border-slate-300 bg-slate-50 p-12 text-center md:col-span-2">
                      <Download className="mx-auto h-10 w-10 text-slate-300" />
                      <p className="mt-4 text-sm font-black text-slate-700">No documents released</p>
                      <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500">Approved documents will appear here when the controlled release process is complete.</p>
                    </div>
                  ) : (
                    documents.map((releasedDocument) => (
                      <div key={releasedDocument.id} className="relative">
                        <ReleasedDocumentCard document={releasedDocument} onDownload={handleDownload} />
                        {downloadingId === releasedDocument.id && (
                          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[28px] bg-white/70 backdrop-blur-sm">
                            <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-xs font-black text-blue-700 shadow-lg"><RefreshCw className="h-4 w-4 animate-spin" /> Preparing download</span>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {request.releaseMessage && (
                <div className="mt-7 rounded-[28px] border border-blue-200 bg-blue-50 p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.12em] text-blue-700">Message from account holder</p>
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-blue-800">{request.releaseMessage}</p>
                </div>
              )}

              <div className="mt-7 flex flex-col gap-3 rounded-[28px] border border-slate-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="text-sm font-black text-slate-800">Finished reviewing?</p><p className="mt-1 text-xs text-slate-500">Close this browser tab to end your local portal session.</p></div>
                <span className="inline-flex items-center gap-2 text-xs font-black text-slate-500"><ShieldCheck className="h-4 w-4 text-emerald-600" /> Audit-protected access <ArrowRight className="h-4 w-4" /></span>
              </div>
            </div>
          )}
        </section>

        <p className="mt-6 text-center text-xs leading-5 text-slate-500">LastKey secure emergency access · Never share your OTP or access link.</p>
      </div>
    </div>
  );
}
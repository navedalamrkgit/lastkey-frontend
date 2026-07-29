import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  KeyRound,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  securityApi,
} from "../../api/securityApi";
import ChangePasswordForm from "../../components/profile/ChangePasswordForm";
import PageHeader from "../../components/layout/PageHeader";
import {
  getErrorMessage,
} from "../../utils/errorHandler";

function SecurityPoint({
  icon: Icon,
  title,
  description,
}) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.05] p-4">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-300">
        <Icon className="h-4 w-4" />
      </span>

      <div>
        <p className="text-sm font-extrabold text-white">
          {title}
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function ChangePasswordPage() {
  const queryClient =
    useQueryClient();

  const changePasswordMutation =
    useMutation({
      mutationFn: (values) =>
        securityApi.changePassword(
          values,
        ),

      onSuccess: () => {
        toast.success(
          "Password changed successfully.",
        );

        queryClient.invalidateQueries({
          queryKey: [
            "security-overview",
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "active-sessions",
          ],
        });
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to change your password.",
          ),
        );
      },
    });

  return (
    <div className="page-enter min-h-full bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.08),_transparent_34%),radial-gradient(circle_at_top_right,_rgba(139,92,246,0.07),_transparent_28%)] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow="Account security"
          title="Change password"
          description="Update your password and keep your LastKey account protected."
        />

        <section className="relative mt-7 overflow-hidden rounded-[34px] border border-slate-200/80 bg-slate-950 px-6 py-7 text-white shadow-2xl shadow-slate-950/10 sm:px-8 sm:py-8">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-20 left-1/4 h-52 w-52 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="relative grid gap-7 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em] text-blue-200">
                <Sparkles className="h-3.5 w-3.5" />
                Credential protection
              </span>

              <h2 className="mt-5 max-w-2xl text-2xl font-black tracking-tight sm:text-3xl">
                A strong password is the first lock on your digital legacy.
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300">
                Choose a unique password that is difficult to guess and not reused anywhere else. Your account protects sensitive documents, nominees and emergency access settings.
              </p>
            </div>

            <div className="grid gap-3">
              <SecurityPoint
                icon={LockKeyhole}
                title="Use a unique password"
                description="Never reuse your LastKey password on another service."
              />

              <SecurityPoint
                icon={Eye}
                title="Keep it private"
                description="Do not share your password through messages, email or screenshots."
              />

              <SecurityPoint
                icon={RefreshCw}
                title="Rotate when needed"
                description="Change it immediately after any suspicious sign-in activity."
              />
            </div>
          </div>
        </section>

        <div className="mt-7 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-[32px] bg-gradient-to-br from-slate-200 via-white to-blue-100 p-px shadow-sm">
            <section className="rounded-[31px] bg-white p-5 sm:p-7">
              <div className="mb-6 flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <KeyRound className="h-6 w-6" />
                </span>

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-600">
                    Password update
                  </p>

                  <h2 className="mt-1 text-xl font-black tracking-tight text-slate-950">
                    Create a stronger credential
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Enter your current password, then choose and confirm your new password.
                  </p>
                </div>
              </div>

              <ChangePasswordForm
                loading={
                  changePasswordMutation.isPending
                }
                onSubmit={async (
                  values,
                ) => {
                  await changePasswordMutation.mutateAsync(
                    values,
                  );
                }}
              />
            </section>
          </div>

          <aside className="space-y-5">
            <section className="rounded-[30px] border border-emerald-200 bg-emerald-50/80 p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm">
                <ShieldCheck className="h-5 w-5" />
              </span>

              <h2 className="mt-5 text-lg font-black text-emerald-950">
                Password checklist
              </h2>

              <div className="mt-4 space-y-3">
                {[
                  "Use at least 12 characters",
                  "Mix uppercase and lowercase letters",
                  "Include numbers and symbols",
                  "Avoid names, birthdays and common words",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />

                    <p className="text-xs font-semibold leading-5 text-emerald-800">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-[30px] border border-amber-200 bg-amber-50/80 p-6 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-amber-600 shadow-sm">
                <AlertTriangle className="h-5 w-5" />
              </span>

              <h2 className="mt-5 text-lg font-black text-amber-950">
                After changing
              </h2>

              <p className="mt-3 text-sm leading-6 text-amber-800">
                Depending on backend policy, older sessions may be revoked and other devices may need to sign in again.
              </p>
            </section>

            <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-slate-400">
                Security tip
              </p>

              <h2 className="mt-3 text-base font-black text-slate-950">
                Review active sessions after updating
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Confirm that only recognised devices remain signed in to your account.
              </p>
            </section>
          </aside>
        </div>

        <section className="mt-7 rounded-[30px] border border-blue-200 bg-blue-50/70 p-6 shadow-sm sm:p-7">
          <div className="grid gap-5 lg:grid-cols-[auto_1fr_auto] lg:items-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </span>

            <div>
              <h2 className="text-base font-black text-blue-950">
                Your security settings stay connected
              </h2>

              <p className="mt-1 text-sm leading-6 text-blue-700">
                A successful password update refreshes the security overview and session information used across LastKey.
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-2xl border border-blue-200 bg-white px-4 py-3 text-xs font-extrabold text-blue-700 shadow-sm">
              <LockKeyhole className="h-4 w-4" />
              Protected workflow
            </span>
          </div>
        </section>
      </div>
    </div>
  );
}
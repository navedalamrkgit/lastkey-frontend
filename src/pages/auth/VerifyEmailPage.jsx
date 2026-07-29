import {
  zodResolver,
} from "@hookform/resolvers/zod";
import {
  CheckCircle2,
  MailCheck,
  RefreshCw,
} from "lucide-react";
import {
  useEffect,
  useState,
} from "react";
import {
  Controller,
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import AuthShell from "../../components/auth/AuthShell";
import OTPInput from "../../components/auth/OTPInput";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";
import { useAuth } from "../../hooks/useAuth";
import { verifyEmailSchema } from "../../schemas/authSchema";
import { getErrorMessage } from "../../utils/errorHandler";
import { ROUTES } from "../../utils/routePaths";

const RESEND_SECONDS = 60;

export default function VerifyEmailPage() {
  const navigate = useNavigate();

  const [
    searchParams,
  ] = useSearchParams();

  const queryEmail =
    searchParams.get("email") || "";

  const {
    verifyEmail,
    resendVerificationOtp,
  } = useAuth();

  const [
    resendTimer,
    setResendTimer,
  ] = useState(RESEND_SECONDS);

  const [
    isResending,
    setIsResending,
  ] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    getValues,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(
      verifyEmailSchema,
    ),

    defaultValues: {
      email: queryEmail,
      otp: "",
    },
  });

  useEffect(() => {
    if (resendTimer <= 0) {
      return undefined;
    }

    const timeoutId = window.setTimeout(
      () => {
        setResendTimer(
          (current) => current - 1,
        );
      },
      1000,
    );

    return () =>
      window.clearTimeout(
        timeoutId,
      );
  }, [resendTimer]);

  async function onSubmit(values) {
    try {
      await verifyEmail({
        email:
          values.email
            .trim()
            .toLowerCase(),

        otp: values.otp,
      });

      toast.success(
        "Email verified successfully.",
      );

      navigate(ROUTES.LOGIN, {
        replace: true,

        state: {
          message:
            "Your email is verified. Sign in to continue.",
        },
      });
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "The verification code is invalid or expired.",
        ),
      );
    }
  }

  async function handleResend() {
    const email =
      getValues("email")
        ?.trim()
        .toLowerCase();

    if (!email) {
      toast.error(
        "Enter your email address first.",
      );

      return;
    }

    try {
      setIsResending(true);

      await resendVerificationOtp(
        email,
      );

      setResendTimer(
        RESEND_SECONDS,
      );

      toast.success(
        "A new verification code has been sent.",
      );
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "Unable to resend the verification code.",
        ),
      );
    } finally {
      setIsResending(false);
    }
  }

  return (
    <AuthShell
      eyebrow="Verify your identity"
      title="Check your inbox"
      description="Enter the six-digit code sent to your registered email address."
      footer={
        <p className="text-center text-sm text-slate-500">
          Already verified?{" "}
          <Link
            to={ROUTES.LOGIN}
            className="font-bold text-blue-600 transition hover:text-blue-700"
          >
            Sign in
          </Link>
        </p>
      }
    >
      <form
        onSubmit={handleSubmit(
          onSubmit,
        )}
        className="space-y-6"
        noValidate
      >
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

            <div>
              <p className="text-sm font-bold text-blue-950">
                Verification required
              </p>

              <p className="mt-1 text-xs leading-5 text-blue-700">
                The code expires after a limited time. Do not share it with anyone.
              </p>
            </div>
          </div>
        </div>

        <FormInput
          label="Email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          required
          {...register("email")}
        />

        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-700">
            Verification code
            <span className="ml-1 text-red-500">
              *
            </span>
          </label>

          <Controller
            name="otp"
            control={control}
            render={({
              field,
            }) => (
              <OTPInput
                value={field.value}
                onChange={field.onChange}
                disabled={isSubmitting}
                error={
                  errors.otp?.message
                }
              />
            )}
          />
        </div>

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          loadingText="Verifying code..."
          leftIcon={CheckCircle2}
        >
          Verify email
        </Button>

        <div className="text-center">
          <p className="text-sm text-slate-500">
            Didn&apos;t receive the code?
          </p>

          <button
            type="button"
            disabled={
              resendTimer > 0 ||
              isResending
            }
            onClick={handleResend}
            className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-blue-700 disabled:cursor-not-allowed disabled:text-slate-400"
          >
            <RefreshCw
              className={[
                "h-4 w-4",
                isResending
                  ? "animate-spin"
                  : "",
              ].join(" ")}
            />

            {isResending
              ? "Sending code..."
              : resendTimer > 0
                ? `Resend in ${resendTimer}s`
                : "Resend verification code"}
          </button>
        </div>
      </form>
    </AuthShell>
  );
}
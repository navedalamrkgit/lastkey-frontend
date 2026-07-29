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
import {
  zodResolver,
} from "@hookform/resolvers/zod";

import OTPInput from "../auth/OTPInput";
import Button from "../ui/Button";
import {
  nomineeVerificationSchema,
} from "../../schemas/nomineeSchema";

const RESEND_SECONDS = 60;

export default function VerificationCard({
  nominee,
  verifying = false,
  resending = false,
  onVerify,
  onResend,
}) {
  const [
    timer,
    setTimer,
  ] = useState(0);

  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
    },
  } = useForm({
    resolver: zodResolver(
      nomineeVerificationSchema,
    ),

    defaultValues: {
      otp: "",
    },
  });

  useEffect(() => {
    if (timer <= 0) {
      return undefined;
    }

    const timeoutId =
      window.setTimeout(() => {
        setTimer(
          (current) =>
            current - 1,
        );
      }, 1000);

    return () =>
      window.clearTimeout(
        timeoutId,
      );
  }, [timer]);

  async function handleVerification(
    values,
  ) {
    await onVerify(values);

    reset({
      otp: "",
    });
  }

  async function handleResend() {
    await onResend();

    setTimer(
      RESEND_SECONDS,
    );
  }

  if (
    nominee.status ===
    "VERIFIED"
  ) {
    return (
      <section className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
        <CheckCircle2 className="h-8 w-8 text-emerald-600" />

        <h2 className="mt-5 text-lg font-extrabold text-emerald-950">
          Nominee verified
        </h2>

        <p className="mt-2 text-sm leading-6 text-emerald-700">
          The nominee’s email identity has been verified successfully.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
      <MailCheck className="h-8 w-8 text-blue-600" />

      <h2 className="mt-5 text-lg font-extrabold text-blue-950">
        Verify nominee
      </h2>

      <p className="mt-2 text-sm leading-6 text-blue-700">
        Enter the six-digit code sent to{" "}
        <strong>
          {nominee.email}
        </strong>
        .
      </p>

      <form
        onSubmit={handleSubmit(
          handleVerification,
        )}
        className="mt-6"
      >
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <OTPInput
              value={field.value}
              onChange={field.onChange}
              error={
                errors.otp?.message
              }
              disabled={verifying}
            />
          )}
        />

        <Button
          type="submit"
          fullWidth
          className="mt-5"
          loading={verifying}
          loadingText="Verifying nominee..."
        >
          Verify nominee
        </Button>
      </form>

      <button
        type="button"
        disabled={
          timer > 0 ||
          resending
        }
        onClick={handleResend}
        className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-blue-700 transition disabled:cursor-not-allowed disabled:text-slate-400"
      >
        <RefreshCw
          className={[
            "h-4 w-4",
            resending
              ? "animate-spin"
              : "",
          ].join(" ")}
        />

        {resending
          ? "Sending code..."
          : timer > 0
            ? `Resend in ${timer}s`
            : "Resend verification code"}
      </button>
    </section>
  );
}
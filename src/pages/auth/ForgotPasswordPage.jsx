import {
  zodResolver,
} from "@hookform/resolvers/zod";
import {
  ArrowRight,
  AtSign,
  CircleCheck,
} from "lucide-react";
import {
  useState,
} from "react";
import {
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import AuthShell from "../../components/auth/AuthShell";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";
import { useAuth } from "../../hooks/useAuth";
import { forgotPasswordSchema } from "../../schemas/authSchema";
import { getErrorMessage } from "../../utils/errorHandler";
import { ROUTES } from "../../utils/routePaths";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const { forgotPassword } =
    useAuth();

  const [
    submittedEmail,
    setSubmittedEmail,
  ] = useState("");

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(
      forgotPasswordSchema,
    ),

    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values) {
    const email =
      values.email
        .trim()
        .toLowerCase();

    try {
      await forgotPassword(email);

      setSubmittedEmail(email);

      toast.success(
        "Password reset instructions have been sent.",
      );
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "Unable to send the password reset code.",
        ),
      );
    }
  }

  if (submittedEmail) {
    return (
      <AuthShell
        eyebrow="Check your inbox"
        title="Reset instructions sent"
        description={`We sent a password reset code to ${submittedEmail}.`}
        footer={
          <p className="text-center text-sm text-slate-500">
            Remembered your password?{" "}
            <Link
              to={ROUTES.LOGIN}
              className="font-bold text-blue-600"
            >
              Sign in
            </Link>
          </p>
        }
      >
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
            <CircleCheck className="h-7 w-7" />
          </div>

          <h2 className="mt-4 text-lg font-extrabold text-emerald-950">
            Email sent successfully
          </h2>

          <p className="mt-2 text-sm leading-6 text-emerald-700">
            Use the reset code from your email to create a new password.
          </p>

          <Button
            className="mt-6"
            fullWidth
            rightIcon={ArrowRight}
            onClick={() =>
              navigate(
                `${ROUTES.RESET_PASSWORD}?email=${encodeURIComponent(
                  submittedEmail,
                )}`,
              )
            }
          >
            Continue to reset password
          </Button>

          <button
            type="button"
            onClick={() =>
              setSubmittedEmail("")
            }
            className="mt-4 text-sm font-bold text-slate-500 transition hover:text-slate-950"
          >
            Use another email address
          </button>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      eyebrow="Account recovery"
      title="Forgot your password?"
      description="Enter your registered email address and we will send you a secure reset code."
      footer={
        <p className="text-center text-sm text-slate-500">
          Remembered your password?{" "}
          <Link
            to={ROUTES.LOGIN}
            className="font-bold text-blue-600 transition hover:text-blue-700"
          >
            Return to sign in
          </Link>
        </p>
      }
    >
      <form
        onSubmit={handleSubmit(
          onSubmit,
        )}
        className="space-y-5"
        noValidate
      >
        <FormInput
          label="Registered email address"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          icon={AtSign}
          error={errors.email?.message}
          required
          {...register("email")}
        />

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs leading-5 text-slate-600">
          For your security, LastKey will never ask for your password through email or phone.
        </div>

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          loadingText="Sending reset code..."
          rightIcon={ArrowRight}
        >
          Send password reset code
        </Button>
      </form>
    </AuthShell>
  );
}
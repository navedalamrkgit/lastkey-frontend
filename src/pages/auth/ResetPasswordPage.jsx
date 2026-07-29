import {
  zodResolver,
} from "@hookform/resolvers/zod";
import {
  CheckCircle2,
} from "lucide-react";
import {
  Controller,
  useForm,
  useWatch,
} from "react-hook-form";
import toast from "react-hot-toast";
import {
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import AuthShell from "../../components/auth/AuthShell";
import OTPInput from "../../components/auth/OTPInput";
import PasswordStrength from "../../components/auth/PasswordStrength";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";
import PasswordInput from "../../components/ui/PasswordInput";
import { useAuth } from "../../hooks/useAuth";
import { resetPasswordSchema } from "../../schemas/authSchema";
import { getErrorMessage } from "../../utils/errorHandler";
import { ROUTES } from "../../utils/routePaths";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [
    searchParams,
  ] = useSearchParams();

  const queryEmail =
    searchParams.get("email") || "";

  const { resetPassword } =
    useAuth();

  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(
      resetPasswordSchema,
    ),

    defaultValues: {
      email: queryEmail,
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = useWatch({
    control,
    name: "newPassword",
  });

  async function onSubmit(values) {
    try {
      await resetPassword({
        email:
          values.email
            .trim()
            .toLowerCase(),

        otp: values.otp,

        newPassword:
          values.newPassword,

        confirmPassword:
          values.confirmPassword,
      });

      toast.success(
        "Your password has been reset successfully.",
      );

      navigate(ROUTES.LOGIN, {
        replace: true,

        state: {
          message:
            "Password updated successfully. Sign in using your new password.",
        },
      });
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "Unable to reset your password. The code may be invalid or expired.",
        ),
      );
    }
  }

  return (
    <AuthShell
      eyebrow="Secure password reset"
      title="Create a new password"
      description="Enter the reset code from your email and choose a strong new password."
      footer={
        <p className="text-center text-sm text-slate-500">
          Return to{" "}
          <Link
            to={ROUTES.LOGIN}
            className="font-bold text-blue-600 transition hover:text-blue-700"
          >
            sign in
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
            Reset code
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

        <div>
          <PasswordInput
            label="New password"
            name="newPassword"
            autoComplete="new-password"
            placeholder="Create a strong new password"
            error={
              errors.newPassword
                ?.message
            }
            required
            {...register(
              "newPassword",
            )}
          />

          <PasswordStrength
            password={newPassword}
          />
        </div>

        <PasswordInput
          label="Confirm new password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Re-enter your new password"
          error={
            errors.confirmPassword
              ?.message
          }
          required
          {...register(
            "confirmPassword",
          )}
        />

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          loadingText="Updating password..."
          leftIcon={CheckCircle2}
        >
          Update password
        </Button>
      </form>
    </AuthShell>
  );
}
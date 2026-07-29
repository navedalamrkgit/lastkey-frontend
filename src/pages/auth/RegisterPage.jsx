import {
  zodResolver,
} from "@hookform/resolvers/zod";
import {
  ArrowRight,
  AtSign,
  Phone,
  UserRound,
} from "lucide-react";
import {
  useForm,
  useWatch,
} from "react-hook-form";
import toast from "react-hot-toast";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import AuthShell from "../../components/auth/AuthShell";
import PasswordStrength from "../../components/auth/PasswordStrength";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";
import PasswordInput from "../../components/ui/PasswordInput";
import { useAuth } from "../../hooks/useAuth";
import { registerSchema } from "../../schemas/authSchema";
import { getErrorMessage } from "../../utils/errorHandler";
import { ROUTES } from "../../utils/routePaths";

export default function RegisterPage() {
  const navigate = useNavigate();

  const { register: createAccount } =
    useAuth();

  const {
    register,
    handleSubmit,
    control,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(
      registerSchema,
    ),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const password = useWatch({
    control,
    name: "password",
  });

  async function onSubmit(values) {
    try {
      const payload = {
        firstName:
          values.firstName.trim(),

        lastName:
          values.lastName.trim(),

        email:
          values.email
            .trim()
            .toLowerCase(),

        phone:
          values.phone.trim(),

        password:
          values.password,
      };

      await createAccount(payload);

      toast.success(
        "Account created. Check your email for the verification code.",
      );

      navigate(
        `${ROUTES.VERIFY_EMAIL}?email=${encodeURIComponent(
          payload.email,
        )}`,
        {
          replace: true,
        },
      );
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "Unable to create your account.",
        ),
      );
    }
  }

  return (
    <AuthShell
      eyebrow="Create your vault"
      title="Start protecting your digital legacy"
      description="Create your secure account and organise everything your family may need in the future."
      footer={
        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
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
        className="space-y-5"
        noValidate
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <FormInput
            label="First name"
            name="firstName"
            placeholder="Naved"
            autoComplete="given-name"
            icon={UserRound}
            error={
              errors.firstName?.message
            }
            required
            {...register("firstName")}
          />

          <FormInput
            label="Last name"
            name="lastName"
            placeholder="Alam"
            autoComplete="family-name"
            icon={UserRound}
            error={
              errors.lastName?.message
            }
            required
            {...register("lastName")}
          />
        </div>

        <FormInput
          label="Email address"
          name="email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          icon={AtSign}
          error={errors.email?.message}
          required
          {...register("email")}
        />

        <FormInput
          label="Mobile number"
          name="phone"
          type="tel"
          placeholder="9876543210"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={10}
          icon={Phone}
          error={errors.phone?.message}
          helperText="Enter a 10-digit Indian mobile number."
          required
          {...register("phone")}
        />

        <div>
          <PasswordInput
            label="Create password"
            name="password"
            autoComplete="new-password"
            placeholder="Create a strong password"
            error={
              errors.password?.message
            }
            required
            {...register("password")}
          />

          <PasswordStrength
            password={password}
          />
        </div>

        <PasswordInput
          label="Confirm password"
          name="confirmPassword"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          error={
            errors.confirmPassword
              ?.message
          }
          required
          {...register(
            "confirmPassword",
          )}
        />

        <div>
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              {...register(
                "acceptTerms",
              )}
            />

            <span className="text-xs leading-5 text-slate-600">
              I agree to the{" "}
              <Link
                to={ROUTES.TERMS}
                className="font-bold text-blue-600"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to={ROUTES.PRIVACY}
                className="font-bold text-blue-600"
              >
                Privacy Policy
              </Link>
              .
            </span>
          </label>

          {errors.acceptTerms && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {
                errors.acceptTerms
                  .message
              }
            </p>
          )}
        </div>

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          loadingText="Creating secure account..."
          rightIcon={ArrowRight}
        >
          Create secure account
        </Button>
      </form>
    </AuthShell>
  );
}
import {
  zodResolver,
} from "@hookform/resolvers/zod";
import {
  ArrowRight,
  AtSign,
  CheckCircle2,
} from "lucide-react";
import {
  useEffect,
} from "react";
import {
  useForm,
} from "react-hook-form";
import toast from "react-hot-toast";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import AuthShell from "../../components/auth/AuthShell";
import Button from "../../components/ui/Button";
import FormInput from "../../components/ui/FormInput";
import PasswordInput from "../../components/ui/PasswordInput";
import { useAuth } from "../../hooks/useAuth";
import { loginSchema } from "../../schemas/authSchema";
import { getErrorMessage } from "../../utils/errorHandler";
import { ROUTES } from "../../utils/routePaths";

const AUTH_ROUTES = new Set([
  ROUTES.LOGIN,
  ROUTES.REGISTER,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.RESET_PASSWORD,
  ROUTES.VERIFY_EMAIL,
  ROUTES.UNAUTHORIZED,
]);

function getSafeRedirectPath(
  locationRedirect,
  storedRedirect,
) {
  const possibleRedirects = [
    locationRedirect,
    storedRedirect,
  ];

  const validRedirect =
    possibleRedirects.find(
      (redirectPath) => {
        if (
          typeof redirectPath !==
          "string"
        ) {
          return false;
        }

        const normalizedPath =
          redirectPath.trim();

        if (
          !normalizedPath.startsWith(
            "/",
          )
        ) {
          return false;
        }

        if (
          normalizedPath.startsWith(
            "//",
          )
        ) {
          return false;
        }

        const pathname =
          normalizedPath.split("?")[0];

        if (
          AUTH_ROUTES.has(pathname)
        ) {
          return false;
        }

        return true;
      },
    );

  return (
    validRedirect ||
    ROUTES.DASHBOARD
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    resolver: zodResolver(
      loginSchema,
    ),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const stateMessage =
      location.state?.message;

    if (!stateMessage) {
      return;
    }

    toast.success(stateMessage);

    window.history.replaceState(
      {},
      document.title,
      window.location.pathname,
    );
  }, [location.state]);

  async function onSubmit(values) {
    try {
      const loginResult =
        await login(values);

      const redirectFromState =
        location.state?.from;

      const savedRedirect =
        sessionStorage.getItem(
          "lastkey_redirect_after_login",
        );

      const redirectPath =
        getSafeRedirectPath(
          redirectFromState,
          savedRedirect,
        );

      sessionStorage.removeItem(
        "lastkey_redirect_after_login",
      );

      if (import.meta.env.DEV) {
        console.log(
          "Login completed:",
          {
            userId:
              loginResult?.user
                ?.id ||
              loginResult?.userId,
            redirectPath,
          },
        );
      }

      toast.success(
        "Welcome back to LastKey.",
      );

      navigate(redirectPath, {
        replace: true,
      });
    } catch (error) {
      console.error(
        "Login failed:",
        error,
      );

      toast.error(
        getErrorMessage(
          error,
          "Unable to sign in. Check your email and password.",
        ),
      );
    }
  }

  return (
    <AuthShell
      eyebrow="Welcome back"
      title="Access your secure vault"
      description="Sign in to manage your documents, nominees and digital legacy."
      footer={
        <p className="text-center text-sm text-slate-500">
          New to LastKey?{" "}
          <Link
            to={ROUTES.REGISTER}
            className="font-bold text-blue-600 transition hover:text-blue-700"
          >
            Create your account
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
          icon={AtSign}
          error={
            errors.email?.message
          }
          required
          {...register("email")}
        />

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-slate-700"
            >
              Password

              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <Link
              to={
                ROUTES.FORGOT_PASSWORD
              }
              className="text-xs font-bold text-blue-600 transition hover:text-blue-700"
            >
              Forgot password?
            </Link>
          </div>

          <PasswordInput
            name="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            error={
              errors.password?.message
            }
            {...register(
              "password",
            )}
          />
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
          />

          <span className="text-sm text-slate-600">
            Keep me signed in on this trusted device.
          </span>
        </label>

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          disabled={isSubmitting}
          loadingText="Signing in securely..."
          rightIcon={ArrowRight}
        >
          Sign in to LastKey
        </Button>
      </form>

      <div className="mt-7 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
        <div className="flex items-start gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

          <div>
            <p className="text-sm font-bold text-emerald-900">
              Secure authentication
            </p>

            <p className="mt-1 text-xs leading-5 text-emerald-700">
              Your session is protected
              using access and refresh
              token authentication.
            </p>
          </div>
        </div>
      </div>
    </AuthShell>
  );
}
import {
  Check,
  Eye,
  EyeOff,
  KeyRound,
  LockKeyhole,
  Save,
  ShieldCheck,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";
import {
  useForm,
} from "react-hook-form";

function PasswordInput({
  id,
  label,
  placeholder,
  register,
  error,
  visible,
  onToggleVisibility,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-bold text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <LockKeyhole className="pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />

        <input
          id={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={[
            "h-13 w-full rounded-2xl border bg-white pl-11 pr-12 text-sm font-semibold text-slate-900 outline-none transition",
            "placeholder:font-medium placeholder:text-slate-400",
            "focus:ring-4",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
              : "border-slate-200 focus:border-blue-500 focus:ring-blue-500/10",
          ].join(" ")}
          {...register}
        />

        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label={
            visible
              ? `Hide ${label.toLowerCase()}`
              : `Show ${label.toLowerCase()}`
          }
        >
          {visible ? (
            <EyeOff className="h-4.5 w-4.5" />
          ) : (
            <Eye className="h-4.5 w-4.5" />
          )}
        </button>
      </div>

      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function getPasswordStrength(password) {
  if (!password) {
    return {
      score: 0,
      label: "Not entered",
    };
  }

  let score = 0;

  if (password.length >= 8) {
    score += 1;
  }

  if (password.length >= 12) {
    score += 1;
  }

  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
    score += 1;
  }

  if (/\d/.test(password)) {
    score += 1;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score += 1;
  }

  const labels = [
    "Very weak",
    "Weak",
    "Fair",
    "Good",
    "Strong",
    "Very strong",
  ];

  return {
    score,
    label: labels[score],
  };
}

export default function ChangePasswordForm({
  loading = false,
  onSubmit,
}) {
  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: {
      errors,
    },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword =
    watch("newPassword") || "";

  const passwordStrength =
    useMemo(
      () =>
        getPasswordStrength(
          newPassword,
        ),
      [newPassword],
    );

  const passwordChecks = [
    {
      label: "At least 12 characters",
      valid:
        newPassword.length >= 12,
    },
    {
      label: "Uppercase and lowercase letters",
      valid:
        /[a-z]/.test(newPassword) &&
        /[A-Z]/.test(newPassword),
    },
    {
      label: "At least one number",
      valid:
        /\d/.test(newPassword),
    },
    {
      label: "At least one special character",
      valid:
        /[^A-Za-z0-9]/.test(
          newPassword,
        ),
    },
  ];

  async function submitHandler(values) {
    if (
      typeof onSubmit !==
      "function"
    ) {
      return;
    }

    await onSubmit({
      currentPassword:
        values.currentPassword,
      newPassword:
        values.newPassword,
      confirmPassword:
        values.confirmPassword,
    });

    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(
        submitHandler,
      )}
      className="space-y-6"
      noValidate
    >
      <PasswordInput
        id="currentPassword"
        label="Current password"
        placeholder="Enter your current password"
        visible={
          showCurrentPassword
        }
        onToggleVisibility={() =>
          setShowCurrentPassword(
            (current) => !current,
          )
        }
        autoComplete="current-password"
        error={
          errors.currentPassword
            ?.message
        }
        register={register(
          "currentPassword",
          {
            required:
              "Current password is required.",
          },
        )}
      />

      <div className="h-px bg-slate-100" />

      <PasswordInput
        id="newPassword"
        label="New password"
        placeholder="Create a strong new password"
        visible={
          showNewPassword
        }
        onToggleVisibility={() =>
          setShowNewPassword(
            (current) => !current,
          )
        }
        autoComplete="new-password"
        error={
          errors.newPassword
            ?.message
        }
        register={register(
          "newPassword",
          {
            required:
              "New password is required.",

            minLength: {
              value: 12,
              message:
                "Password must contain at least 12 characters.",
            },

            validate: {
              differentFromCurrent: (
                value,
                formValues,
              ) =>
                value !==
                  formValues.currentPassword ||
                "New password must be different from your current password.",

              uppercase: (value) =>
                /[A-Z]/.test(
                  value,
                ) ||
                "Include at least one uppercase letter.",

              lowercase: (value) =>
                /[a-z]/.test(
                  value,
                ) ||
                "Include at least one lowercase letter.",

              number: (value) =>
                /\d/.test(
                  value,
                ) ||
                "Include at least one number.",

              specialCharacter: (
                value,
              ) =>
                /[^A-Za-z0-9]/.test(
                  value,
                ) ||
                "Include at least one special character.",
            },
          },
        )}
      />

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
            Password strength
          </p>

          <span className="text-xs font-extrabold text-slate-700">
            {passwordStrength.label}
          </span>
        </div>

        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {Array.from({
            length: 5,
          }).map((_, index) => (
            <span
              key={index}
              className={[
                "h-2 rounded-full transition",
                index <
                passwordStrength.score
                  ? "bg-blue-600"
                  : "bg-slate-200",
              ].join(" ")}
            />
          ))}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {passwordChecks.map(
            (check) => (
              <div
                key={check.label}
                className="flex items-center gap-2"
              >
                <span
                  className={[
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                    check.valid
                      ? "bg-emerald-100 text-emerald-600"
                      : "bg-slate-200 text-slate-400",
                  ].join(" ")}
                >
                  <Check className="h-3 w-3" />
                </span>

                <p
                  className={[
                    "text-xs font-semibold",
                    check.valid
                      ? "text-emerald-700"
                      : "text-slate-500",
                  ].join(" ")}
                >
                  {check.label}
                </p>
              </div>
            ),
          )}
        </div>
      </div>

      <PasswordInput
        id="confirmPassword"
        label="Confirm new password"
        placeholder="Enter the new password again"
        visible={
          showConfirmPassword
        }
        onToggleVisibility={() =>
          setShowConfirmPassword(
            (current) => !current,
          )
        }
        autoComplete="new-password"
        error={
          errors.confirmPassword
            ?.message
        }
        register={register(
          "confirmPassword",
          {
            required:
              "Please confirm your new password.",

            validate: (
              value,
              formValues,
            ) =>
              value ===
                formValues.newPassword ||
              "Passwords do not match.",
          },
        )}
      />

      <section className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
            <ShieldCheck className="h-4.5 w-4.5" />
          </span>

          <div>
            <p className="text-sm font-extrabold text-blue-950">
              Secure password update
            </p>

            <p className="mt-1 text-xs leading-5 text-blue-700">
              Your current password is required to authorise this sensitive account change.
            </p>
          </div>
        </div>
      </section>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
          <KeyRound className="h-4 w-4" />

          Passwords are never displayed publicly.
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-6 text-sm font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/35 border-t-white" />

              Updating password...
            </>
          ) : (
            <>
              <Save className="h-4.5 w-4.5" />

              Change password
            </>
          )}
        </button>
      </div>
    </form>
  );
}
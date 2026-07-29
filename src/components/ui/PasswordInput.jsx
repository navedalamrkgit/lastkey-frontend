import { Eye, EyeOff, LockKeyhole } from "lucide-react";
import { useState } from "react";

export default function PasswordInput({
  label,
  name,
  error,
  helperText,
  required = false,
  className = "",
  inputClassName = "",
  style,
  ...props
}) {
  const [showPassword, setShowPassword] =
    useState(false);

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-semibold text-slate-700"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        <LockKeyhole
          className={[
            "pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2",
            error
              ? "text-red-400"
              : "text-slate-400",
          ].join(" ")}
        />

        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          className={[
            "auth-form-input h-12 w-full rounded-2xl border bg-white pl-11 pr-12 text-sm",
            "outline-none transition-all duration-200",
            error
              ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
              : "border-slate-200 hover:border-slate-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
            inputClassName,
          ].join(" ")}
          style={{
            color: "#0f172a",
            WebkitTextFillColor: "#0f172a",
            caretColor: "#2563eb",
            backgroundColor: "#ffffff",
            ...style,
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={
            error
              ? `${name}-error`
              : helperText
                ? `${name}-helper`
                : undefined
          }
          {...props}
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword((current) => !current)
          }
          className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          aria-label={
            showPassword
              ? "Hide password"
              : "Show password"
          }
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {error && (
        <p
          id={`${name}-error`}
          className="mt-1.5 text-xs font-medium text-red-600"
        >
          {error}
        </p>
      )}

      {!error && helperText && (
        <p
          id={`${name}-helper`}
          className="mt-1.5 text-xs text-slate-500"
        >
          {helperText}
        </p>
      )}
    </div>
  );
}
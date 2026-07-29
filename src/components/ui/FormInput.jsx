export default function FormInput({
  label,
  name,
  error,
  helperText,
  icon: Icon,
  required = false,
  className = "",
  inputClassName = "",
  style,
  ...props
}) {
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
        {Icon && (
          <Icon
            className={[
              "pointer-events-none absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2",
              error
                ? "text-red-400"
                : "text-slate-400",
            ].join(" ")}
          />
        )}

        <input
          id={name}
          name={name}
          className={[
            "auth-form-input h-12 w-full rounded-2xl border bg-white text-sm",
            "outline-none transition-all duration-200",
            Icon ? "pl-11" : "pl-4",
            "pr-4",
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
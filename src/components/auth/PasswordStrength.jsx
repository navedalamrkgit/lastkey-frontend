import {
  Check,
  Circle,
  ShieldCheck,
} from "lucide-react";

function getPasswordScore(password) {
  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const score = Object.values(checks).filter(
    Boolean,
  ).length;

  return {
    score,
    checks,
  };
}

function getStrengthDetails(score) {
  if (score <= 1) {
    return {
      label: "Very weak",
      barClass: "bg-red-500",
      textClass: "text-red-600",
    };
  }

  if (score === 2) {
    return {
      label: "Weak",
      barClass: "bg-orange-500",
      textClass: "text-orange-600",
    };
  }

  if (score === 3) {
    return {
      label: "Fair",
      barClass: "bg-amber-500",
      textClass: "text-amber-600",
    };
  }

  if (score === 4) {
    return {
      label: "Strong",
      barClass: "bg-blue-500",
      textClass: "text-blue-600",
    };
  }

  return {
    label: "Very strong",
    barClass: "bg-emerald-500",
    textClass: "text-emerald-600",
  };
}

const requirements = [
  {
    key: "length",
    label: "At least 8 characters",
  },
  {
    key: "uppercase",
    label: "One uppercase letter",
  },
  {
    key: "lowercase",
    label: "One lowercase letter",
  },
  {
    key: "number",
    label: "One number",
  },
  {
    key: "special",
    label: "One special character",
  },
];

export default function PasswordStrength({
  password = "",
}) {
  if (!password) {
    return null;
  }

  const {
    score,
    checks,
  } = getPasswordScore(password);

  const strength = getStrengthDetails(score);

  return (
    <div className="mt-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <ShieldCheck className="h-4 w-4 text-slate-500" />

          Password strength
        </div>

        <span
          className={`text-xs font-bold ${strength.textClass}`}
        >
          {strength.label}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-5 gap-1.5">
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <span
            key={index}
            className={[
              "h-1.5 rounded-full transition-colors",
              index < score
                ? strength.barClass
                : "bg-slate-200",
            ].join(" ")}
          />
        ))}
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {requirements.map((requirement) => {
          const passed =
            checks[requirement.key];

          return (
            <div
              key={requirement.key}
              className={[
                "flex items-center gap-2 text-xs",
                passed
                  ? "text-emerald-700"
                  : "text-slate-500",
              ].join(" ")}
            >
              {passed ? (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-2.5 w-2.5" />
                </span>
              ) : (
                <Circle className="h-3.5 w-3.5" />
              )}

              {requirement.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
import {
  useMemo,
  useRef,
} from "react";

export default function OTPInput({
  value = "",
  onChange,
  length = 6,
  disabled = false,
  error,
}) {
  const inputRefs = useRef([]);

  const digits = useMemo(() => {
    const normalized = String(value)
      .slice(0, length)
      .split("");

    return Array.from(
      {
        length,
      },
      (_, index) => normalized[index] || "",
    );
  }, [value, length]);

  function updateDigits(nextDigits) {
    onChange?.(nextDigits.join(""));
  }

  function handleChange(index, event) {
    const rawValue = event.target.value;

    const numericValue = rawValue.replace(
      /\D/g,
      "",
    );

    if (!numericValue) {
      const nextDigits = [...digits];

      nextDigits[index] = "";

      updateDigits(nextDigits);

      return;
    }

    const pastedDigits = numericValue
      .slice(0, length - index)
      .split("");

    const nextDigits = [...digits];

    pastedDigits.forEach(
      (digit, offset) => {
        nextDigits[index + offset] = digit;
      },
    );

    updateDigits(nextDigits);

    const nextIndex = Math.min(
      index + pastedDigits.length,
      length - 1,
    );

    inputRefs.current[nextIndex]?.focus();
  }

  function handleKeyDown(index, event) {
    if (
      event.key === "Backspace" &&
      !digits[index] &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      event.key === "ArrowLeft" &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }

    if (
      event.key === "ArrowRight" &&
      index < length - 1
    ) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(event) {
    event.preventDefault();

    const pastedValue = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    if (!pastedValue) {
      return;
    }

    const nextDigits = Array.from(
      {
        length,
      },
      (_, index) => pastedValue[index] || "",
    );

    updateDigits(nextDigits);

    const focusIndex = Math.min(
      pastedValue.length,
      length - 1,
    );

    inputRefs.current[focusIndex]?.focus();
  }

  return (
    <div>
      <div
        className="flex justify-between gap-2 sm:gap-3"
        onPaste={handlePaste}
      >
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(element) => {
              inputRefs.current[index] = element;
            }}
            type="text"
            inputMode="numeric"
            autoComplete={
              index === 0
                ? "one-time-code"
                : "off"
            }
            maxLength={length}
            value={digit}
            disabled={disabled}
            onChange={(event) =>
              handleChange(index, event)
            }
            onKeyDown={(event) =>
              handleKeyDown(index, event)
            }
            onFocus={(event) =>
              event.target.select()
            }
            className={[
              "h-13 min-w-0 flex-1 rounded-2xl border bg-white text-center text-lg font-extrabold text-slate-950",
              "outline-none transition-all duration-200",
              "disabled:cursor-not-allowed disabled:bg-slate-100 disabled:opacity-60",
              error
                ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
            ].join(" ")}
            aria-label={`OTP digit ${index + 1}`}
          />
        ))}
      </div>

      {error && (
        <p className="mt-2 text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
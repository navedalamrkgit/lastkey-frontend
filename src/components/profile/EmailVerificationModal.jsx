import {
  CheckCircle2,
  MailCheck,
  RefreshCw,
  ShieldCheck,
  X,
} from "lucide-react";
import {
  useEffect,
  useRef,
  useState,
} from "react";

const OTP_LENGTH = 6;
const RESEND_TIME = 30;

function getEmptyOtp() {
  return Array.from({
    length: OTP_LENGTH,
  }).map(() => "");
}

export default function EmailVerificationModal({
  open,
  email,
  verifying = false,
  resending = false,
  onClose,
  onVerify,
  onResend,
}) {
  const [
    otp,
    setOtp,
  ] = useState(
    getEmptyOtp,
  );

  const [
    resendSeconds,
    setResendSeconds,
  ] = useState(
    RESEND_TIME,
  );

  const inputRefs =
    useRef([]);

  useEffect(() => {
    if (!open) {
      setOtp(
        getEmptyOtp(),
      );

      setResendSeconds(
        RESEND_TIME,
      );

      return undefined;
    }

    const focusTimer =
      window.setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 150);

    return () =>
      window.clearTimeout(
        focusTimer,
      );
  }, [open]);

  useEffect(() => {
    if (
      !open ||
      resendSeconds <= 0
    ) {
      return undefined;
    }

    const timer =
      window.setInterval(() => {
        setResendSeconds(
          (current) =>
            Math.max(
              current - 1,
              0,
            ),
        );
      }, 1000);

    return () =>
      window.clearInterval(
        timer,
      );
  }, [
    open,
    resendSeconds,
  ]);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const handleEscape = (
      event,
    ) => {
      if (
        event.key ===
          "Escape" &&
        !verifying &&
        !resending
      ) {
        onClose?.();
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape,
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleEscape,
      );
  }, [
    open,
    verifying,
    resending,
    onClose,
  ]);

  if (!open) {
    return null;
  }

  const otpValue =
    otp.join("");

  const otpComplete =
    /^\d{6}$/.test(
      otpValue,
    );

  const updateOtpDigit = (
    index,
    value,
  ) => {
    const digit =
      value
        .replace(/\D/g, "")
        .slice(-1);

    setOtp(
      (current) => {
        const updated = [
          ...current,
        ];

        updated[index] =
          digit;

        return updated;
      },
    );

    if (
      digit &&
      index <
        OTP_LENGTH - 1
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }
  };

  const handleOtpKeyDown = (
    event,
    index,
  ) => {
    if (
      event.key ===
        "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }

    if (
      event.key ===
        "ArrowLeft" &&
      index > 0
    ) {
      inputRefs.current[
        index - 1
      ]?.focus();
    }

    if (
      event.key ===
        "ArrowRight" &&
      index <
        OTP_LENGTH - 1
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();
    }

    if (
      event.key ===
        "Enter" &&
      otpComplete &&
      !verifying
    ) {
      onVerify?.(
        otpValue,
      );
    }
  };

  const handlePaste = (
    event,
  ) => {
    event.preventDefault();

    const pastedOtp =
      event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(
          0,
          OTP_LENGTH,
        );

    if (!pastedOtp) {
      return;
    }

    const updatedOtp =
      getEmptyOtp();

    pastedOtp
      .split("")
      .forEach(
        (
          digit,
          index,
        ) => {
          updatedOtp[index] =
            digit;
        },
      );

    setOtp(
      updatedOtp,
    );

    const focusIndex =
      Math.min(
        pastedOtp.length,
        OTP_LENGTH - 1,
      );

    inputRefs.current[
      focusIndex
    ]?.focus();
  };

  const handleSubmit = (
    event,
  ) => {
    event.preventDefault();

    if (
      !otpComplete ||
      verifying
    ) {
      return;
    }

    onVerify?.(
      otpValue,
    );
  };

  const handleResend = () => {
    if (
      resendSeconds > 0 ||
      resending
    ) {
      return;
    }

    setOtp(
      getEmptyOtp(),
    );

    setResendSeconds(
      RESEND_TIME,
    );

    onResend?.();

    window.setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  };

  const handleBackdropClick = (
    event,
  ) => {
    if (
      event.target ===
        event.currentTarget &&
      !verifying &&
      !resending
    ) {
      onClose?.();
    }
  };

  return (
    <div
      role="presentation"
      onMouseDown={
        handleBackdropClick
      }
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 px-4 py-6 backdrop-blur-sm"
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="email-verification-title"
        className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-[0_32px_100px_-20px_rgba(15,23,42,0.65)]"
      >
        <div className="relative overflow-hidden bg-slate-950 px-6 pb-8 pt-6 text-white sm:px-8">
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-indigo-500/30 blur-3xl" />

          <div className="absolute -bottom-20 left-12 h-40 w-40 rounded-full bg-cyan-400/15 blur-3xl" />

          <button
            type="button"
            aria-label="Close verification modal"
            disabled={
              verifying ||
              resending
            }
            onClick={
              onClose
            }
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-slate-300 transition hover:bg-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-indigo-300/20 bg-indigo-400/15 text-indigo-300 shadow-[0_14px_32px_rgba(99,102,241,0.2)]">
              <MailCheck className="h-7 w-7" />
            </span>

            <p className="mt-5 inline-flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-indigo-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              Secure verification
            </p>

            <h2
              id="email-verification-title"
              className="mt-2 text-2xl font-black tracking-tight"
            >
              Verify your email
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              Enter the six-digit OTP sent to your registered email address.
            </p>

            {email && (
              <p className="mt-3 break-all text-sm font-bold text-white">
                {email}
              </p>
            )}
          </div>
        </div>

        <form
          onSubmit={
            handleSubmit
          }
          className="px-6 py-7 sm:px-8"
        >
          <label className="block text-center text-xs font-extrabold uppercase tracking-[0.14em] text-slate-500">
            Verification code
          </label>

          <div
            onPaste={
              handlePaste
            }
            className="mt-5 grid grid-cols-6 gap-2 sm:gap-3"
          >
            {otp.map(
              (
                digit,
                index,
              ) => (
                <input
                  key={index}
                  ref={(element) => {
                    inputRefs.current[
                      index
                    ] =
                      element;
                  }}
                  type="text"
                  inputMode="numeric"
                  autoComplete={
                    index === 0
                      ? "one-time-code"
                      : "off"
                  }
                  maxLength={1}
                  value={
                    digit
                  }
                  disabled={
                    verifying
                  }
                  onChange={(
                    event,
                  ) =>
                    updateOtpDigit(
                      index,
                      event.target
                        .value,
                    )
                  }
                  onKeyDown={(
                    event,
                  ) =>
                    handleOtpKeyDown(
                      event,
                      index,
                    )
                  }
                  aria-label={`OTP digit ${
                    index + 1
                  }`}
                  className="h-14 min-w-0 rounded-2xl border border-slate-200 bg-slate-50 text-center text-xl font-black text-slate-950 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:opacity-60 sm:h-16 sm:text-2xl"
                />
              ),
            )}
          </div>

          <p className="mt-4 text-center text-xs leading-5 text-slate-500">
            You can paste the complete OTP directly into the input boxes.
          </p>

          <button
            type="submit"
            disabled={
              !otpComplete ||
              verifying
            }
            className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 text-sm font-extrabold text-white shadow-[0_14px_34px_rgba(79,70,229,0.25)] transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            {verifying ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                Verifying OTP...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Verify email
              </>
            )}
          </button>

          <div className="mt-5 flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row">
            <p className="text-xs text-slate-500">
              Did not receive the code?
            </p>

            <button
              type="button"
              disabled={
                resendSeconds >
                  0 ||
                resending
              }
              onClick={
                handleResend
              }
              className="inline-flex items-center gap-2 text-xs font-extrabold text-indigo-600 transition hover:text-indigo-700 disabled:cursor-not-allowed disabled:text-slate-400"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${
                  resending
                    ? "animate-spin"
                    : ""
                }`}
              />

              {resending
                ? "Sending..."
                : resendSeconds >
                    0
                  ? `Resend in ${resendSeconds}s`
                  : "Resend OTP"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
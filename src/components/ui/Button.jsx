import {
  LoaderCircle,
} from "lucide-react";

const variants = {
  primary: [
    "border border-indigo-500/20",
    "bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600",
    "text-white",
    "shadow-[0_16px_35px_-15px_rgba(79,70,229,0.75)]",
    "hover:-translate-y-0.5",
    "hover:shadow-[0_22px_45px_-16px_rgba(124,58,237,0.8)]",
    "focus:ring-indigo-500/20",
  ].join(" "),

  blue: [
    "border border-blue-500/20",
    "bg-gradient-to-r from-blue-600 to-cyan-500",
    "text-white",
    "shadow-[0_16px_35px_-15px_rgba(37,99,235,0.72)]",
    "hover:-translate-y-0.5",
    "hover:shadow-[0_22px_45px_-16px_rgba(8,145,178,0.75)]",
    "focus:ring-blue-500/20",
  ].join(" "),

  success: [
    "border border-emerald-500/20",
    "bg-gradient-to-r from-emerald-600 to-teal-500",
    "text-white",
    "shadow-[0_16px_35px_-15px_rgba(5,150,105,0.68)]",
    "hover:-translate-y-0.5",
    "focus:ring-emerald-500/20",
  ].join(" "),

  warning: [
    "border border-amber-500/20",
    "bg-gradient-to-r from-amber-500 to-orange-500",
    "text-white",
    "shadow-[0_16px_35px_-15px_rgba(217,119,6,0.7)]",
    "hover:-translate-y-0.5",
    "focus:ring-amber-500/20",
  ].join(" "),

  danger: [
    "border border-rose-500/20",
    "bg-gradient-to-r from-rose-600 to-red-500",
    "text-white",
    "shadow-[0_16px_35px_-15px_rgba(225,29,72,0.72)]",
    "hover:-translate-y-0.5",
    "focus:ring-rose-500/20",
  ].join(" "),

  dark: [
    "border border-slate-800",
    "bg-slate-950 text-white",
    "shadow-[0_16px_35px_-15px_rgba(15,23,42,0.72)]",
    "hover:-translate-y-0.5",
    "hover:bg-slate-900",
    "focus:ring-slate-500/20",
  ].join(" "),

  secondary: [
    "border border-slate-200/90",
    "bg-white/85 text-slate-700",
    "shadow-[0_12px_30px_-22px_rgba(15,23,42,0.5)]",
    "backdrop-blur-xl",
    "hover:-translate-y-0.5",
    "hover:border-indigo-200",
    "hover:bg-indigo-50/70",
    "hover:text-indigo-700",
    "focus:ring-indigo-500/10",
  ].join(" "),

  ghost: [
    "border border-transparent",
    "bg-transparent text-slate-600",
    "hover:bg-slate-100",
    "hover:text-slate-950",
    "focus:ring-slate-500/10",
  ].join(" "),
};

const sizes = {
  small:
    "min-h-9 rounded-xl px-4 py-2 text-xs",

  medium:
    "min-h-11 rounded-2xl px-5 py-2.5 text-sm",

  large:
    "min-h-13 rounded-2xl px-6 py-3 text-sm",

  xl:
    "min-h-14 rounded-[18px] px-7 py-3.5 text-base",
};

export default function Button({
  children,
  type = "button",
  variant = "primary",
  size = "large",
  loading = false,
  loadingText = "Please wait...",
  fullWidth = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  disabled = false,
  className = "",
  ...props
}) {
  const isDisabled =
    disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={[
        "group relative inline-flex",
        "items-center justify-center",
        "gap-2 overflow-hidden",
        "font-bold tracking-[-0.01em]",
        "transition-all duration-300",
        "focus:outline-none focus:ring-4",
        "disabled:pointer-events-none",
        "disabled:opacity-55",
        "active:scale-[0.975]",
        variants[variant] ||
          variants.primary,
        sizes[size] || sizes.large,
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      <span
        className="
          pointer-events-none
          absolute inset-y-0
          -left-20 w-16
          rotate-12
          bg-white/25
          blur-md
          transition-transform
          duration-700
          group-hover:translate-x-[450px]
        "
      />

      {loading ? (
        <>
          <LoaderCircle className="h-4 w-4 animate-spin" />

          <span className="relative z-10">
            {loadingText}
          </span>
        </>
      ) : (
        <>
          {LeftIcon && (
            <LeftIcon
              className="
                relative z-10
                h-4 w-4 shrink-0
                transition-transform
                duration-300
                group-hover:-translate-x-0.5
              "
            />
          )}

          <span className="relative z-10">
            {children}
          </span>

          {RightIcon && (
            <RightIcon
              className="
                relative z-10
                h-4 w-4 shrink-0
                transition-transform
                duration-300
                group-hover:translate-x-1
              "
            />
          )}
        </>
      )}
    </button>
  );
}
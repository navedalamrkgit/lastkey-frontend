const variants = {
  default: [
    "border-slate-200/80",
    "bg-white",
    "shadow-[0_18px_45px_-30px_rgba(15,23,42,0.38)]",
  ].join(" "),

  glass: [
    "border-white/75",
    "bg-white/70",
    "shadow-[0_20px_55px_-32px_rgba(15,23,42,0.38)]",
    "backdrop-blur-2xl",
  ].join(" "),

  indigo: [
    "border-indigo-200/70",
    "bg-gradient-to-br from-indigo-50 via-white to-violet-50",
    "shadow-[0_20px_55px_-32px_rgba(79,70,229,0.45)]",
  ].join(" "),

  cyan: [
    "border-cyan-200/70",
    "bg-gradient-to-br from-cyan-50 via-white to-sky-50",
    "shadow-[0_20px_55px_-32px_rgba(8,145,178,0.42)]",
  ].join(" "),

  emerald: [
    "border-emerald-200/70",
    "bg-gradient-to-br from-emerald-50 via-white to-teal-50",
    "shadow-[0_20px_55px_-32px_rgba(5,150,105,0.42)]",
  ].join(" "),

  amber: [
    "border-amber-200/70",
    "bg-gradient-to-br from-amber-50 via-white to-orange-50",
    "shadow-[0_20px_55px_-32px_rgba(217,119,6,0.42)]",
  ].join(" "),

  rose: [
    "border-rose-200/70",
    "bg-gradient-to-br from-rose-50 via-white to-pink-50",
    "shadow-[0_20px_55px_-32px_rgba(225,29,72,0.4)]",
  ].join(" "),

  dark: [
    "border-white/10",
    "bg-slate-950 text-white",
    "shadow-[0_26px_70px_-34px_rgba(15,23,42,0.85)]",
  ].join(" "),
};

export default function Card({
  children,
  variant = "default",
  hoverable = false,
  className = "",
  as: Component = "div",
  ...props
}) {
  return (
    <Component
      className={[
        "relative overflow-hidden",
        "rounded-[28px] border",
        variants[variant] ||
          variants.default,
        hoverable
          ? [
              "transition-all",
              "duration-300",
              "hover:-translate-y-1.5",
              "hover:shadow-[0_30px_75px_-34px_rgba(15,23,42,0.38)]",
            ].join(" ")
          : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </Component>
  );
}
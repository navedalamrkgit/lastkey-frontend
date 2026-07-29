import { KeyRound, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/routePaths";

export default function Logo({
  variant = "dark",
  showTagline = false,
  clickable = true,
}) {
  const isLight = variant === "light";

  const content = (
    <div className="flex items-center gap-3">
      <div
        className={[
          "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
          "shadow-lg transition-transform duration-300 group-hover:scale-105",
          isLight
            ? "bg-white text-slate-950 shadow-black/10"
            : "bg-slate-950 text-white shadow-slate-950/20",
        ].join(" ")}
      >
        <KeyRound className="h-5 w-5" />

        <span
          className={[
            "absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full border-2",
            isLight
              ? "border-slate-950 bg-blue-500 text-white"
              : "border-white bg-blue-600 text-white",
          ].join(" ")}
        >
          <ShieldCheck className="h-3 w-3" />
        </span>
      </div>

      <div>
        <p
          className={[
            "text-xl font-extrabold tracking-tight",
            isLight
              ? "text-white"
              : "text-slate-950",
          ].join(" ")}
        >
          LastKey
        </p>

        {showTagline && (
          <p
            className={[
              "mt-0.5 text-[11px] font-medium tracking-wide",
              isLight
                ? "text-slate-400"
                : "text-slate-500",
            ].join(" ")}
          >
            Your digital legacy, protected.
          </p>
        )}
      </div>
    </div>
  );

  if (!clickable) {
    return content;
  }

  return (
    <Link
      to={ROUTES.HOME}
      className="group inline-flex"
      aria-label="Go to LastKey home page"
    >
      {content}
    </Link>
  );
}
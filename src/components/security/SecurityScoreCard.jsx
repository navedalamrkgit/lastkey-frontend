import {
  ArrowUpRight,
  CheckCircle2,
  Radar,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";

function getScoreTheme(score) {
  if (score >= 85) {
    return {
      label: "Strong",
      description:
        "Your account is well protected. Keep reviewing devices and login activity regularly.",
      ring:
        "url(#securityStrongGradient)",
      badge:
        "border-emerald-300/20 bg-emerald-400/10 text-emerald-200",
      accent:
        "text-emerald-300",
      progress:
        "from-emerald-400 via-teal-400 to-cyan-400",
      icon:
        "bg-emerald-500/15 text-emerald-300",
    };
  }

  if (score >= 65) {
    return {
      label: "Good",
      description:
        "Your protection is healthy, with a few opportunities for improvement.",
      ring:
        "url(#securityGoodGradient)",
      badge:
        "border-blue-300/20 bg-blue-400/10 text-blue-200",
      accent:
        "text-blue-300",
      progress:
        "from-blue-400 via-indigo-400 to-violet-400",
      icon:
        "bg-blue-500/15 text-blue-300",
    };
  }

  if (score >= 40) {
    return {
      label: "Needs attention",
      description:
        "Complete the recommended actions to strengthen your account protection.",
      ring:
        "url(#securityWarningGradient)",
      badge:
        "border-amber-300/20 bg-amber-400/10 text-amber-200",
      accent:
        "text-amber-300",
      progress:
        "from-amber-400 via-orange-400 to-yellow-400",
      icon:
        "bg-amber-500/15 text-amber-300",
    };
  }

  return {
    label: "At risk",
    description:
      "Review your recommendations, devices and login history as soon as possible.",
    ring:
      "url(#securityRiskGradient)",
    badge:
      "border-rose-300/20 bg-rose-400/10 text-rose-200",
    accent:
      "text-rose-300",
    progress:
      "from-rose-400 via-red-400 to-orange-400",
    icon:
      "bg-rose-500/15 text-rose-300",
  };
}

export default function SecurityScoreCard({
  score = 0,
  label,
}) {
  const normalizedScore = Math.min(
    Math.max(Number(score) || 0, 0),
    100,
  );

  const theme = getScoreTheme(
    normalizedScore,
  );

  const scoreLabel =
    label || theme.label;

  const circumference =
    2 * Math.PI * 43;

  const dashOffset =
    circumference -
    (normalizedScore / 100) *
      circumference;

  const remainingScore =
    Math.max(
      100 - normalizedScore,
      0,
    );

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-slate-950 p-6 text-white shadow-2xl shadow-slate-950/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(37,99,235,0.25),transparent_32%),radial-gradient(circle_at_85%_20%,rgba(139,92,246,0.18),transparent_30%),radial-gradient(circle_at_50%_100%,rgba(16,185,129,0.12),transparent_32%)]" />

      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(255,255,255,.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.3)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-400/20 bg-blue-500/10 text-blue-200">
              <ShieldCheck className="h-5 w-5" />
            </span>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-blue-300">
                Protection score
              </p>

              <h2 className="mt-1 text-xl font-black">
                Security score
              </h2>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] ${theme.badge}`}
          >
            <span className="h-2 w-2 rounded-full bg-current shadow-[0_0_10px_currentColor]" />

            {scoreLabel}
          </span>
        </div>

        <div className="mt-7 grid gap-6 sm:grid-cols-[190px_minmax(0,1fr)] sm:items-center">
          <div className="mx-auto">
            <div className="relative h-44 w-44">
              <div className="absolute inset-3 rounded-full bg-blue-500/10 blur-2xl" />

              <svg
                viewBox="0 0 100 100"
                className="relative h-full w-full -rotate-90 drop-shadow-[0_0_18px_rgba(59,130,246,0.18)]"
              >
                <defs>
                  <linearGradient
                    id="securityStrongGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#34d399"
                    />

                    <stop
                      offset="50%"
                      stopColor="#2dd4bf"
                    />

                    <stop
                      offset="100%"
                      stopColor="#22d3ee"
                    />
                  </linearGradient>

                  <linearGradient
                    id="securityGoodGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#60a5fa"
                    />

                    <stop
                      offset="50%"
                      stopColor="#818cf8"
                    />

                    <stop
                      offset="100%"
                      stopColor="#a78bfa"
                    />
                  </linearGradient>

                  <linearGradient
                    id="securityWarningGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#fbbf24"
                    />

                    <stop
                      offset="50%"
                      stopColor="#fb923c"
                    />

                    <stop
                      offset="100%"
                      stopColor="#facc15"
                    />
                  </linearGradient>

                  <linearGradient
                    id="securityRiskGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="#fb7185"
                    />

                    <stop
                      offset="50%"
                      stopColor="#f87171"
                    />

                    <stop
                      offset="100%"
                      stopColor="#fb923c"
                    />
                  </linearGradient>
                </defs>

                <circle
                  cx="50"
                  cy="50"
                  r="43"
                  fill="none"
                  stroke="rgba(255,255,255,0.09)"
                  strokeWidth="8"
                />

                <circle
                  cx="50"
                  cy="50"
                  r="43"
                  fill="none"
                  stroke={theme.ring}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={
                    circumference
                  }
                  strokeDashoffset={
                    dashOffset
                  }
                  className="transition-all duration-700 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black tracking-tight text-white">
                  {normalizedScore}
                </span>

                <span className="mt-1 text-[10px] font-black uppercase tracking-[0.16em] text-slate-500">
                  Out of 100
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Sparkles className={`h-4 w-4 ${theme.accent}`} />

              <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                Current posture
              </p>
            </div>

            <h3 className="mt-2 text-2xl font-black text-white">
              {scoreLabel}
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {theme.description}
            </p>

            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-400">
                  Protection progress
                </span>

                <span className="text-white">
                  {normalizedScore}%
                </span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${theme.progress} transition-all duration-700`}
                  style={{
                    width: `${normalizedScore}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
            <div className="flex items-center gap-3">
              <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${theme.icon}`}>
                <TrendingUp className="h-4.5 w-4.5" />
              </span>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                  Current level
                </p>

                <p className="mt-1 text-sm font-black text-white">
                  {normalizedScore} points
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[22px] border border-white/10 bg-white/[0.05] p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300">
                <Radar className="h-4.5 w-4.5" />
              </span>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
                  Remaining
                </p>

                <p className="mt-1 text-sm font-black text-white">
                  {remainingScore} points
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 rounded-[22px] border border-emerald-400/15 bg-emerald-500/10 px-4 py-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-emerald-300" />

            <div>
              <p className="text-xs font-black text-emerald-100">
                Security monitoring active
              </p>

              <p className="mt-0.5 text-[11px] text-emerald-200/70">
                Score updates as account protection changes.
              </p>
            </div>
          </div>

          <ArrowUpRight className="h-4 w-4 shrink-0 text-emerald-300" />
        </div>
      </div>
    </section>
  );
}
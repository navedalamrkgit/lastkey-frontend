import {
  AlertCircle,
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileSearch2,
  Gauge,
  Lightbulb,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

function Stat({
  label,
  value,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
        {label}
      </p>

      <p className="mt-2 text-lg font-black tracking-[-0.025em] text-slate-950">
        {value}
      </p>
    </div>
  );
}

function SignalRow({
  label,
  complete,
}) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
      {complete ? (
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
      ) : (
        <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />
      )}

      <span className="text-xs font-bold text-slate-700">
        {label}
      </span>
    </div>
  );
}

function SuggestionRow({
  text,
}) {
  return (
    <div className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/80 px-3 py-2.5">
      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />

      <span className="text-xs leading-5 text-amber-900">
        {text}
      </span>
    </div>
  );
}

function getSeverity(type) {
  const normalized = String(type || "")
    .trim()
    .toUpperCase();

  if (
    normalized.includes("DEATH") ||
    normalized.includes("MEDICAL") ||
    normalized.includes("ACCIDENT")
  ) {
    return {
      label: "High",
      score: 90,
      description:
        "Immediate review is recommended for this emergency category.",
      badgeClass:
        "bg-rose-50 text-rose-700 border-rose-200",
      barClass:
        "from-rose-500 via-orange-500 to-amber-400",
    };
  }

  if (
    normalized.includes("LEGAL") ||
    normalized.includes("FRAUD") ||
    normalized.includes("POLICE") ||
    normalized.includes("PROPERTY")
  ) {
    return {
      label: "Medium",
      score: 65,
      description:
        "This request may require supporting legal or official evidence.",
      badgeClass:
        "bg-amber-50 text-amber-700 border-amber-200",
      barClass:
        "from-amber-500 via-yellow-500 to-lime-400",
    };
  }

  if (!normalized) {
    return {
      label: "Pending",
      score: 0,
      description:
        "Select an emergency type to estimate severity.",
      badgeClass:
        "bg-slate-50 text-slate-600 border-slate-200",
      barClass:
        "from-slate-300 to-slate-400",
    };
  }

  return {
    label: "Low",
    score: 35,
    description:
      "Standard review controls will apply.",
    badgeClass:
      "bg-blue-50 text-blue-700 border-blue-200",
    barClass:
      "from-blue-500 to-cyan-400",
  };
}

function buildSuggestions({
  description,
  requestedAccessReason,
  incidentDate,
  contactPhone,
}) {
  const text = `${description || ""} ${requestedAccessReason || ""}`.toLowerCase();

  const suggestions = [];

  if (!incidentDate) {
    suggestions.push(
      "Add the exact incident date.",
    );
  }

  if (
    !/\b(hospital|clinic|doctor|police|fir|court|insurance|certificate|authority)\b/.test(
      text,
    )
  ) {
    suggestions.push(
      "Mention any hospital, police, court, insurance or authority reference.",
    );
  }

  if (
    !/\b(time|morning|evening|night|am|pm)\b/.test(
      text,
    )
  ) {
    suggestions.push(
      "Include the approximate incident time or timeline.",
    );
  }

  if (
    !/\b(document|insurance|claim|legal|property|bank|medical|certificate)\b/.test(
      requestedAccessReason?.toLowerCase() ||
        "",
    )
  ) {
    suggestions.push(
      "Explain exactly which documents are needed and how they will be used.",
    );
  }

  if (!/^\d{10}$/.test(contactPhone || "")) {
    suggestions.push(
      "Provide a valid 10-digit contact number for verification.",
    );
  }

  return suggestions.slice(0, 4);
}

export default function EmergencyRequestInsights({
  emergencyType = "",
  description = "",
  requestedAccessReason = "",
  incidentDate = "",
  contactPhone = "",
  completenessScore = 0,
}) {
  const normalizedDescription =
    description.trim();

  const normalizedReason =
    requestedAccessReason.trim();

  const wordCount = normalizedDescription
    ? normalizedDescription
        .split(/\s+/)
        .filter(Boolean).length
    : 0;

  const readingSeconds = Math.max(
    5,
    Math.round((wordCount / 180) * 60),
  );

  const qualityLabel =
    completenessScore >= 90
      ? "Excellent"
      : completenessScore >= 70
        ? "Good"
        : completenessScore >= 45
          ? "Needs detail"
          : "Incomplete";

  const severity =
    getSeverity(emergencyType);

  const suggestions = buildSuggestions({
    description,
    requestedAccessReason,
    incidentDate,
    contactPhone,
  });

  const signals = [
    {
      label: "Incident explained",
      complete:
        normalizedDescription.length >= 20,
    },
    {
      label: "Access purpose explained",
      complete:
        normalizedReason.length >= 10,
    },
    {
      label: "Incident date selected",
      complete: Boolean(incidentDate),
    },
    {
      label: "Contact number valid",
      complete: /^\d{10}$/.test(
        contactPhone,
      ),
    },
  ];

  return (
    <section className="space-y-5">
      <article className="relative overflow-hidden rounded-[30px] border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.45)]">
        <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-indigo-400/15 blur-3xl" />

        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-100 bg-white text-indigo-600 shadow-sm">
              <BrainCircuit className="h-5 w-5" />
            </span>

            <span className="rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em] text-indigo-700">
              Live analysis
            </span>
          </div>

          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
            AI request analysis
          </p>

          <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-slate-950">
            Request quality
          </h2>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-4xl font-black tracking-[-0.05em] text-slate-950">
                {completenessScore}%
              </p>

              <p className="mt-1 text-xs font-bold text-slate-500">
                {qualityLabel}
              </p>
            </div>

            <Gauge className="h-8 w-8 text-indigo-500" />
          </div>

          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-indigo-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 transition-all duration-500"
              style={{
                width: `${Math.min(
                  Math.max(
                    completenessScore,
                    0,
                  ),
                  100,
                )}%`,
              }}
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3 xl:grid-cols-1 2xl:grid-cols-3">
            <Stat
              label="Words"
              value={wordCount}
            />

            <Stat
              label="Characters"
              value={
                normalizedDescription.length
              }
            />

            <Stat
              label="Reading"
              value={`${readingSeconds}s`}
            />
          </div>
        </div>
      </article>

      <article className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.45)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
              Emergency severity
            </p>

            <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-slate-950">
              Review priority
            </h2>
          </div>

          <span
            className={[
              "rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.14em]",
              severity.badgeClass,
            ].join(" ")}
          >
            {severity.label}
          </span>
        </div>

        <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className={[
              "h-full rounded-full bg-gradient-to-r transition-all duration-500",
              severity.barClass,
            ].join(" ")}
            style={{
              width: `${severity.score}%`,
            }}
          />
        </div>

        <p className="mt-4 text-xs leading-5 text-slate-500">
          {severity.description}
        </p>
      </article>

      <article className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.45)]">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <FileSearch2 className="h-4.5 w-4.5" />
          </span>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
              Detected details
            </p>

            <h2 className="mt-1 text-lg font-black text-slate-950">
              Request signals
            </h2>
          </div>
        </div>

        <div className="mt-5 space-y-2.5">
          {signals.map((signal) => (
            <SignalRow
              key={signal.label}
              label={signal.label}
              complete={signal.complete}
            />
          ))}
        </div>
      </article>

      {suggestions.length > 0 && (
        <article className="rounded-[30px] border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50/70 p-6 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.35)]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-amber-600 shadow-sm">
              <Sparkles className="h-4.5 w-4.5" />
            </span>

            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-amber-700">
                Smart suggestions
              </p>

              <h2 className="mt-1 text-lg font-black text-amber-950">
                Improve your request
              </h2>
            </div>
          </div>

          <div className="mt-5 space-y-2.5">
            {suggestions.map(
              (suggestion) => (
                <SuggestionRow
                  key={suggestion}
                  text={suggestion}
                />
              ),
            )}
          </div>
        </article>
      )}

      <article className="rounded-[30px] border border-blue-100 bg-blue-50/70 p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

          <div>
            <p className="text-sm font-black text-blue-950">
              Analysis is guidance only
            </p>

            <p className="mt-1.5 text-xs leading-5 text-blue-800/80">
              Final approval depends on OTP verification, supporting evidence and configured review policies.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-blue-700">
                <BadgeCheck className="h-3.5 w-3.5" />
                Auditable
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-blue-700">
                <Clock3 className="h-3.5 w-3.5" />
                Real time
              </span>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
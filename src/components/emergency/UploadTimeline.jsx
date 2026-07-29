import {
  BrainCircuit,
  CheckCircle2,
  Clock3,
  FileCheck2,
  ScanText,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";

const DEFAULT_STEPS = [
  {
    key: "uploaded",
    title: "Evidence uploaded",
    description:
      "The document was securely attached to the emergency request.",
    icon: UploadCloud,
  },
  {
    key: "ocr",
    title: "OCR completed",
    description:
      "Readable text was extracted from the uploaded document.",
    icon: ScanText,
  },
  {
    key: "ai",
    title: "AI validation",
    description:
      "Document type, quality and confidence were analysed.",
    icon: BrainCircuit,
  },
  {
    key: "review",
    title: "Reviewer assessment",
    description:
      "An authorised reviewer checks the submitted evidence.",
    icon: ShieldCheck,
  },
  {
    key: "ready",
    title: "Ready for decision",
    description:
      "The evidence is available for the approval workflow.",
    icon: FileCheck2,
  },
];

function normalizeStatus(status) {
  return String(status || "")
    .trim()
    .toLowerCase();
}

function getStepState(stepIndex, currentIndex) {
  if (stepIndex < currentIndex) {
    return "complete";
  }

  if (stepIndex === currentIndex) {
    return "active";
  }

  return "pending";
}

export default function UploadTimeline({
  currentStep = "uploaded",
  steps = DEFAULT_STEPS,
}) {
  const normalizedCurrentStep =
    normalizeStatus(currentStep);

  const currentIndex = Math.max(
    steps.findIndex(
      (step) =>
        normalizeStatus(step.key) ===
        normalizedCurrentStep,
    ),
    0,
  );

  return (
    <section className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.45)]">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
            Evidence timeline
          </p>

          <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-slate-950">
            Processing status
          </h2>
        </div>

        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Clock3 className="h-5 w-5" />
        </span>
      </div>

      <ol className="relative mt-7 before:absolute before:bottom-5 before:left-[19px] before:top-5 before:w-px before:bg-slate-200">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const state = getStepState(
            index,
            currentIndex,
          );

          return (
            <li
              key={step.key}
              className="relative flex gap-4 pb-6 last:pb-0"
            >
              <span
                className={[
                  "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border transition-all",
                  state === "complete"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                    : state === "active"
                      ? "border-indigo-600 bg-indigo-600 text-white ring-4 ring-indigo-500/10"
                      : "border-slate-200 bg-white text-slate-400",
                ].join(" ")}
              >
                {state === "complete" ? (
                  <CheckCircle2 className="h-4.5 w-4.5" />
                ) : (
                  <Icon className="h-4.5 w-4.5" />
                )}
              </span>

              <div className="pt-0.5">
                <p
                  className={[
                    "text-[9px] font-black uppercase tracking-[0.16em]",
                    state === "active"
                      ? "text-indigo-600"
                      : state === "complete"
                        ? "text-emerald-600"
                        : "text-slate-400",
                  ].join(" ")}
                >
                  {state === "complete"
                    ? "Completed"
                    : state === "active"
                      ? "In progress"
                      : `Step ${index + 1}`}
                </p>

                <p className="mt-1 text-sm font-black text-slate-900">
                  {step.title}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
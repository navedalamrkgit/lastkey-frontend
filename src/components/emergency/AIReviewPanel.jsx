import {
  BadgeCheck,
  BrainCircuit,
  CheckCircle2,
  FileCheck2,
  ScanText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

function QualityItem({
  label,
  value,
  complete = true,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3.5">
      <div className="flex items-center gap-3">
        <span
          className={[
            "flex h-8 w-8 items-center justify-center rounded-xl",
            complete
              ? "bg-emerald-50 text-emerald-600"
              : "bg-amber-50 text-amber-600",
          ].join(" ")}
        >
          <CheckCircle2 className="h-4 w-4" />
        </span>

        <span className="text-xs font-bold text-slate-700">
          {label}
        </span>
      </div>

      <span className="text-xs font-black text-slate-950">
        {value}
      </span>
    </div>
  );
}

export default function AIReviewPanel({
  review = {},
}) {
  const confidence =
    review.confidence ??
    review.aiConfidence ??
    0;

  const detectedType =
    review.detectedDocumentType ||
    review.documentType ||
    "Pending analysis";

  const extractedText =
    review.extractedText ||
    review.ocrText ||
    "";

  const quality =
    review.imageQuality ||
    "Pending";

  const resolution =
    review.resolutionQuality ||
    "Pending";

  const blur =
    review.blurStatus ||
    "Pending";

  const readability =
    review.textReadability ||
    "Pending";

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
              AI review
            </span>
          </div>

          <p className="mt-6 text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">
            Document analysis
          </p>

          <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-slate-950">
            {detectedType}
          </h2>

          <div className="mt-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-4xl font-black tracking-[-0.05em] text-slate-950">
                {Math.round(confidence)}%
              </p>

              <p className="mt-1 text-xs font-bold text-slate-500">
                AI confidence
              </p>
            </div>

            <Sparkles className="h-8 w-8 text-indigo-500" />
          </div>

          <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-indigo-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-500 transition-all duration-500"
              style={{
                width: `${Math.min(
                  Math.max(confidence, 0),
                  100,
                )}%`,
              }}
            />
          </div>
        </div>
      </article>

      <article className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.45)]">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <FileCheck2 className="h-4.5 w-4.5" />
          </span>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-emerald-600">
              Quality checks
            </p>

            <h2 className="mt-1 text-lg font-black text-slate-950">
              Document condition
            </h2>
          </div>
        </div>

        <div className="mt-5 space-y-3">
          <QualityItem
            label="Image quality"
            value={quality}
            complete={quality !== "Poor"}
          />

          <QualityItem
            label="Resolution"
            value={resolution}
            complete={resolution !== "Low"}
          />

          <QualityItem
            label="Blur"
            value={blur}
            complete={
              !String(blur)
                .toLowerCase()
                .includes("high")
            }
          />

          <QualityItem
            label="Text readability"
            value={readability}
            complete={
              !String(readability)
                .toLowerCase()
                .includes("poor")
            }
          />
        </div>
      </article>

      <article className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_18px_55px_-38px_rgba(15,23,42,0.45)]">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <ScanText className="h-4.5 w-4.5" />
          </span>

          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-indigo-600">
              OCR preview
            </p>

            <h2 className="mt-1 text-lg font-black text-slate-950">
              Extracted document text
            </h2>
          </div>
        </div>

        <div className="mt-5 max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-950 p-4">
          <pre className="whitespace-pre-wrap break-words font-sans text-xs leading-6 text-slate-300">
            {extractedText ||
              "OCR text will appear here after document processing."}
          </pre>
        </div>
      </article>

      <article className="rounded-[30px] border border-emerald-100 bg-emerald-50/70 p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

          <div>
            <p className="text-sm font-black text-emerald-950">
              Automated checks completed
            </p>

            <p className="mt-1.5 text-xs leading-5 text-emerald-800/80">
              AI analysis supports the reviewer but does not independently
              approve or release protected documents.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700">
                <BadgeCheck className="h-3.5 w-3.5" />
                Integrity checked
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-700">
                <ShieldCheck className="h-3.5 w-3.5" />
                Audit enabled
              </span>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
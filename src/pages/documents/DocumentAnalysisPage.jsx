import {
  AlertTriangle,
  ArrowLeft,
  BrainCircuit,
  CalendarClock,
  CheckCircle2,
  FileSearch,
  Play,
  Sparkles,
} from "lucide-react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  Link,
  useParams,
} from "react-router-dom";

import { documentApi } from "../../api/documentApi";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/ui/Button";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import { getErrorMessage } from "../../utils/errorHandler";
import { ROUTES } from "../../utils/routePaths";
import { buildRoute } from "../../utils/routeUtils";

export default function DocumentAnalysisPage() {
  const {
    documentId,
  } = useParams();

  const queryClient =
    useQueryClient();

  const documentQuery =
    useQuery({
      queryKey: [
        "document",
        documentId,
      ],

      queryFn: async () => {
        const response =
          await documentApi.getDocumentById(
            documentId,
          );

        return response.data;
      },
    });

  const analysisQuery =
    useQuery({
      queryKey: [
        "document-analysis",
        documentId,
      ],

      queryFn: async () => {
        const response =
          await documentApi.getDocumentAnalysis(
            documentId,
          );

        return response.data;
      },

      retry: false,
    });

  const analyzeMutation =
    useMutation({
      mutationFn: () =>
        documentApi.analyzeDocument(
          documentId,
        ),

      onSuccess: () => {
        toast.success(
          "Document analysis completed.",
        );

        queryClient.invalidateQueries({
          queryKey: [
            "document-analysis",
            documentId,
          ],
        });
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to analyze the document.",
          ),
        );
      },
    });

  const detailsPath =
    buildRoute(
      ROUTES.DOCUMENT_DETAILS,
      {
        documentId,
      },
    );

  if (
    documentQuery.isLoading
  ) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <LoadingSkeleton className="h-28" />
          <LoadingSkeleton className="h-96" />
        </div>
      </div>
    );
  }

  const analysis =
    analysisQuery.data;

  const keyInformation =
    analysis?.keyInformation ||
    analysis?.extractedFields ||
    {};

  const risks =
    analysis?.risks ||
    analysis?.warnings ||
    [];

  const recommendations =
    analysis?.recommendations ||
    [];

  return (
    <div className="page-enter px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow="AI document intelligence"
          title={
            documentQuery.data
              ?.title ||
            "Document analysis"
          }
          description="Review extracted information, expiry details, risks and intelligent recommendations."
          actions={
            <>
              <Link
                to={detailsPath}
              >
                <Button
                  size="medium"
                  variant="secondary"
                  leftIcon={ArrowLeft}
                >
                  Back
                </Button>
              </Link>

              <Button
                size="medium"
                leftIcon={Play}
                loading={
                  analyzeMutation.isPending
                }
                loadingText="Analyzing..."
                onClick={() =>
                  analyzeMutation.mutate()
                }
              >
                {analysis
                  ? "Run analysis again"
                  : "Analyze document"}
              </Button>
            </>
          }
        />

        {analysisQuery.isError &&
          !analysis && (
            <section className="mt-7 rounded-3xl border border-violet-200 bg-violet-50 p-7 text-center">
              <BrainCircuit className="mx-auto h-12 w-12 text-violet-600" />

              <h2 className="mt-5 text-xl font-extrabold text-violet-950">
                No AI analysis available
              </h2>

              <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-violet-700">
                Start an analysis to extract important information, identify expiry dates and review potential document risks.
              </p>

              <Button
                className="mt-6"
                leftIcon={Sparkles}
                loading={
                  analyzeMutation.isPending
                }
                loadingText="Analyzing document..."
                onClick={() =>
                  analyzeMutation.mutate()
                }
              >
                Start AI analysis
              </Button>
            </section>
          )}

        {analysis && (
          <>
            <section className="mt-7 grid gap-5 lg:grid-cols-3">
              <article className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
                <FileSearch className="h-6 w-6 text-blue-600" />

                <p className="mt-5 text-sm font-bold text-blue-900">
                  Detected category
                </p>

                <p className="mt-1 text-2xl font-extrabold text-blue-950">
                  {analysis.detectedCategory ||
                    documentQuery.data
                      ?.category ||
                    "Not detected"}
                </p>
              </article>

              <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />

                <p className="mt-5 text-sm font-bold text-emerald-900">
                  Confidence score
                </p>

                <p className="mt-1 text-2xl font-extrabold text-emerald-950">
                  {analysis.confidenceScore !=
                  null
                    ? `${Math.round(
                        Number(
                          analysis.confidenceScore,
                        ) *
                          (Number(
                            analysis.confidenceScore,
                          ) <= 1
                            ? 100
                            : 1),
                      )}%`
                    : "Not available"}
                </p>
              </article>

              <article className="rounded-3xl border border-amber-200 bg-amber-50 p-6">
                <CalendarClock className="h-6 w-6 text-amber-600" />

                <p className="mt-5 text-sm font-bold text-amber-900">
                  Expiry detected
                </p>

                <p className="mt-1 text-2xl font-extrabold text-amber-950">
                  {analysis.expiryDate ||
                    documentQuery.data
                      ?.expiryDate ||
                    "No expiry"}
                </p>
              </article>
            </section>

            <section className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="space-y-6">
                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
                      <BrainCircuit className="h-5 w-5" />
                    </span>

                    <div>
                      <h2 className="font-extrabold text-slate-950">
                        AI summary
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Generated document overview
                      </p>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-slate-600">
                    {analysis.summary ||
                      "No summary was generated for this document."}
                  </p>
                </article>

                <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h2 className="font-extrabold text-slate-950">
                    Extracted information
                  </h2>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    {Object.keys(
                      keyInformation,
                    ).length === 0 ? (
                      <p className="text-sm text-slate-500">
                        No structured information was extracted.
                      </p>
                    ) : (
                      Object.entries(
                        keyInformation,
                      ).map(
                        ([
                          key,
                          value,
                        ]) => (
                          <div
                            key={key}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-4"
                          >
                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {key
                                .replace(
                                  /([A-Z])/g,
                                  " $1",
                                )
                                .replace(
                                  /^./,
                                  (character) =>
                                    character.toUpperCase(),
                                )}
                            </p>

                            <p className="mt-2 break-words text-sm font-bold text-slate-800">
                              {String(
                                value,
                              )}
                            </p>
                          </div>
                        ),
                      )
                    )}
                  </div>
                </article>
              </div>

              <aside className="space-y-6">
                <article className="rounded-3xl border border-red-200 bg-red-50 p-6">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-red-600" />

                    <h2 className="font-extrabold text-red-950">
                      Risks and warnings
                    </h2>
                  </div>

                  <div className="mt-5 space-y-3">
                    {risks.length ===
                    0 ? (
                      <p className="text-sm leading-6 text-red-700">
                        No major document risks were detected.
                      </p>
                    ) : (
                      risks.map(
                        (
                          risk,
                          index,
                        ) => (
                          <div
                            key={index}
                            className="rounded-2xl border border-red-200 bg-white/70 p-4 text-sm leading-6 text-red-800"
                          >
                            {typeof risk ===
                            "string"
                              ? risk
                              : risk.message ||
                                JSON.stringify(
                                  risk,
                                )}
                          </div>
                        ),
                      )
                    )}
                  </div>
                </article>

                <article className="rounded-3xl border border-emerald-200 bg-emerald-50 p-6">
                  <div className="flex items-center gap-3">
                    <Sparkles className="h-6 w-6 text-emerald-600" />

                    <h2 className="font-extrabold text-emerald-950">
                      Recommendations
                    </h2>
                  </div>

                  <div className="mt-5 space-y-3">
                    {recommendations.length ===
                    0 ? (
                      <p className="text-sm leading-6 text-emerald-700">
                        Keep the document details updated and review it periodically.
                      </p>
                    ) : (
                      recommendations.map(
                        (
                          recommendation,
                          index,
                        ) => (
                          <div
                            key={index}
                            className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-white/70 p-4"
                          >
                            <CheckCircle2 className="mt-0.5 h-4.5 w-4.5 shrink-0 text-emerald-600" />

                            <p className="text-sm leading-6 text-emerald-800">
                              {typeof recommendation ===
                              "string"
                                ? recommendation
                                : recommendation.message ||
                                  JSON.stringify(
                                    recommendation,
                                  )}
                            </p>
                          </div>
                        ),
                      )
                    )}
                  </div>
                </article>
              </aside>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
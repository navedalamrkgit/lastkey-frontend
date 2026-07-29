import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  FileLock2,
  ShieldAlert,
  Sparkles,
  UsersRound,
  WandSparkles,
} from "lucide-react";
import {
  motion,
} from "framer-motion";
import {
  Link,
} from "react-router-dom";

import CTASection from "../../components/landing/CTASection";
import FeaturesSection from "../../components/landing/FeaturesSection";
import Button from "../../components/ui/Button";
import { ROUTES } from "../../utils/routePaths";

const featureDetails = [
  {
    icon: FileLock2,
    eyebrow: "Document protection",
    title: "A professional vault for every important document.",
    description:
      "Organise identity, financial, legal, insurance and property records inside one secure digital workspace.",

    points: [
      "Secure file uploads",
      "Document categories",
      "Expiry-date reminders",
      "Preview and access controls",
    ],

    accent:
      "from-blue-600 to-cyan-500",

    surface:
      "border-blue-200/80 bg-gradient-to-br from-blue-50 via-white to-cyan-50",

    badge:
      "border-blue-200 bg-blue-50 text-blue-700",

    number:
      "text-blue-600",

    visual:
      "from-blue-950 via-indigo-950 to-cyan-950",

    glow:
      "bg-blue-400/20",
  },

  {
    icon: BrainCircuit,
    eyebrow: "AI intelligence",
    title: "Understand documents without reading every page manually.",
    description:
      "Use intelligent analysis to categorise files, identify important information and highlight possible risks.",

    points: [
      "Automatic categorisation",
      "Important detail extraction",
      "Document summaries",
      "Duplicate and risk detection",
    ],

    accent:
      "from-violet-600 to-fuchsia-500",

    surface:
      "border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50",

    badge:
      "border-violet-200 bg-violet-50 text-violet-700",

    number:
      "text-violet-600",

    visual:
      "from-violet-950 via-fuchsia-950 to-slate-950",

    glow:
      "bg-violet-400/20",
  },

  {
    icon: UsersRound,
    eyebrow: "Trusted access",
    title: "Give every nominee only the access they actually need.",
    description:
      "Create different permissions for different people instead of sharing your entire digital vault.",

    points: [
      "Nominee verification",
      "Document-level assignment",
      "Permission controls",
      "Access-status tracking",
    ],

    accent:
      "from-emerald-600 to-teal-500",

    surface:
      "border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50",

    badge:
      "border-emerald-200 bg-emerald-50 text-emerald-700",

    number:
      "text-emerald-600",

    visual:
      "from-emerald-950 via-teal-950 to-slate-950",

    glow:
      "bg-emerald-400/20",
  },

  {
    icon: ShieldAlert,
    eyebrow: "Emergency protection",
    title: "Release information through a verified and controlled workflow.",
    description:
      "Support emergency access through identity verification, evidence review and configurable waiting periods.",

    points: [
      "Emergency request creation",
      "OTP verification",
      "Evidence upload",
      "Approved document release",
    ],

    accent:
      "from-rose-600 to-orange-500",

    surface:
      "border-rose-200/80 bg-gradient-to-br from-rose-50 via-white to-orange-50",

    badge:
      "border-rose-200 bg-rose-50 text-rose-700",

    number:
      "text-rose-600",

    visual:
      "from-rose-950 via-orange-950 to-slate-950",

    glow:
      "bg-rose-400/20",
  },
];

export default function FeaturesPage() {
  return (
    <div className="page-enter">
      <section
        className="
          landing-page-header
          section-shell
          overflow-hidden
        "
      >
        <div className="soft-grid absolute inset-0 opacity-55" />

        <div className="noise-overlay" />

        <div
          className="
            aurora-blob
            -left-32 top-4
            h-80 w-80
            bg-blue-300/20
            float-slow
          "
        />

        <div
          className="
            aurora-blob
            -right-32 bottom-0
            h-96 w-96
            bg-violet-300/20
            float-medium
          "
        />

        <div
          className="
            relative mx-auto
            max-w-5xl
            px-4 py-24
            text-center
            sm:px-6
            sm:py-28
            lg:px-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.65,
            }}
          >
            <div
              className="
                inline-flex
                items-center gap-2
                rounded-full
                border border-indigo-200
                bg-white/80
                px-4 py-2
                text-xs
                font-black
                text-indigo-700
                shadow-sm
                backdrop-blur-xl
              "
            >
              <WandSparkles className="h-4 w-4" />

              LastKey feature ecosystem
            </div>

            <h1
              className="
                text-balance
                mt-7
                text-5xl
                font-black
                leading-[1.02]
                tracking-[-0.055em]
                text-slate-950
                sm:text-6xl
                lg:text-7xl
              "
            >
              Everything required to protect

              <span className="gradient-text block">
                your digital legacy.
              </span>
            </h1>

            <p
              className="
                mx-auto mt-7
                max-w-3xl
                text-base
                leading-8
                text-slate-600
                sm:text-lg
              "
            >
              From secure document storage to nominee permissions,
              AI analysis and verified emergency access, LastKey
              brings every important workflow into one platform.
            </p>

            <div
              className="
                mt-9 flex
                flex-col
                justify-center
                gap-3
                sm:flex-row
              "
            >
              <Link to={ROUTES.REGISTER}>
                <Button
                  fullWidth
                  size="xl"
                  rightIcon={ArrowRight}
                  className="sm:w-auto"
                >
                  Create free vault
                </Button>
              </Link>

              <Link to={ROUTES.SECURITY}>
                <Button
                  fullWidth
                  size="xl"
                  variant="secondary"
                  className="sm:w-auto"
                >
                  Explore security
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <FeaturesSection showHeader={false} />

      <section
        className="
          section-shell
          overflow-hidden
          bg-gradient-to-b
          from-slate-50
          via-white
          to-slate-50
          py-24
          sm:py-28
        "
      >
        <div className="soft-grid absolute inset-0 opacity-30" />

        <div className="section-container">
          <motion.div
            initial={{
              opacity: 0,
              y: 22,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.65,
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <div
              className="
                inline-flex
                items-center gap-2
                rounded-full
                border border-cyan-200
                bg-cyan-50
                px-4 py-2
                text-xs
                font-black
                text-cyan-700
              "
            >
              <Sparkles className="h-4 w-4" />

              Explore every workflow
            </div>

            <h2
              className="
                text-balance
                mt-6
                text-4xl
                font-black
                tracking-[-0.045em]
                text-slate-950
                sm:text-5xl
                lg:text-6xl
              "
            >
              Powerful features,

              <span className="gradient-text block">
                designed to stay simple.
              </span>
            </h2>

            <p
              className="
                mx-auto mt-6
                max-w-2xl
                text-base
                leading-8
                text-slate-600
                sm:text-lg
              "
            >
              Every part of LastKey is designed to solve a real
              organisation, privacy or emergency-access problem.
            </p>
          </motion.div>

          <div className="mt-16 space-y-10">
            {featureDetails.map(
              (
                feature,
                index,
              ) => {
                const Icon =
                  feature.icon;

                return (
                  <motion.article
                    key={feature.title}
                    initial={{
                      opacity: 0,
                      y: 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.18,
                    }}
                    transition={{
                      duration: 0.65,
                    }}
                    className={[
                      "relative",
                      "isolate",
                      "grid",
                      "overflow-hidden",
                      "rounded-[36px]",
                      "border",
                      "p-6",
                      "shadow-[0_28px_75px_-45px_rgba(15,23,42,0.45)]",
                      "sm:p-8",
                      "lg:grid-cols-2",
                      "lg:items-center",
                      "lg:gap-12",
                      feature.surface,
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "absolute",
                        "-right-20",
                        "-top-20",
                        "h-52",
                        "w-52",
                        "rounded-full",
                        "blur-3xl",
                        feature.glow,
                      ].join(" ")}
                    />

                    <div
                      className={
                        index % 2 === 1
                          ? "lg:order-2"
                          : ""
                      }
                    >
                      <div
                        className={[
                          "inline-flex",
                          "items-center",
                          "gap-2",
                          "rounded-full",
                          "border",
                          "px-3.5",
                          "py-2",
                          "text-[10px]",
                          "font-black",
                          "uppercase",
                          "tracking-[0.16em]",
                          feature.badge,
                        ].join(" ")}
                      >
                        <Sparkles className="h-3.5 w-3.5" />

                        {feature.eyebrow}
                      </div>

                      <span
                        className={[
                          "mt-6",
                          "flex",
                          "h-14",
                          "w-14",
                          "items-center",
                          "justify-center",
                          "rounded-2xl",
                          "bg-gradient-to-br",
                          "text-white",
                          "shadow-lg",
                          feature.accent,
                        ].join(" ")}
                      >
                        <Icon className="h-6 w-6" />
                      </span>

                      <h2
                        className="
                          text-balance
                          mt-6
                          text-3xl
                          font-black
                          tracking-[-0.035em]
                          text-slate-950
                          sm:text-4xl
                        "
                      >
                        {feature.title}
                      </h2>

                      <p
                        className="
                          mt-5
                          max-w-xl
                          text-sm
                          leading-7
                          text-slate-600
                          sm:text-base
                        "
                      >
                        {feature.description}
                      </p>

                      <div className="mt-7 grid gap-3 sm:grid-cols-2">
                        {feature.points.map(
                          (point) => (
                            <div
                              key={point}
                              className="
                                flex
                                items-center
                                gap-3
                                rounded-2xl
                                border border-white/80
                                bg-white/70
                                px-4 py-3
                                text-sm
                                font-bold
                                text-slate-700
                                shadow-sm
                                backdrop-blur-xl
                              "
                            >
                              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />

                              {point}
                            </div>
                          ),
                        )}
                      </div>
                    </div>

                    <div
                      className={[
                        "relative",
                        "mt-8",
                        "overflow-hidden",
                        "rounded-[30px]",
                        "bg-gradient-to-br",
                        "p-6",
                        "text-white",
                        "shadow-2xl",
                        "lg:mt-0",
                        index % 2 === 1
                          ? "lg:order-1"
                          : "",
                        feature.visual,
                      ].join(" ")}
                    >
                      <div className="landing-grid-dark absolute inset-0 opacity-40" />

                      <div
                        className="
                          absolute
                          -right-16 -top-16
                          h-44 w-44
                          rounded-full
                          bg-white/10
                          blur-3xl
                        "
                      />

                      <div className="relative">
                        <div className="flex items-center justify-between">
                          <div>
                            <p
                              className="
                                text-[10px]
                                font-black
                                uppercase
                                tracking-[0.18em]
                                text-white/60
                              "
                            >
                              Feature overview
                            </p>

                            <p className="mt-2 text-xl font-black">
                              {feature.eyebrow}
                            </p>
                          </div>

                          <span
                            className={[
                              "flex",
                              "h-12",
                              "w-12",
                              "items-center",
                              "justify-center",
                              "rounded-2xl",
                              "bg-gradient-to-br",
                              "text-white",
                              feature.accent,
                            ].join(" ")}
                          >
                            <Icon className="h-5 w-5" />
                          </span>
                        </div>

                        <div className="mt-8 grid grid-cols-2 gap-4">
                          {feature.points.map(
                            (
                              point,
                              pointIndex,
                            ) => (
                              <motion.div
                                key={point}
                                whileHover={{
                                  y: -5,
                                }}
                                className="
                                  rounded-2xl
                                  border border-white/10
                                  bg-white/[0.07]
                                  p-4
                                  backdrop-blur-xl
                                "
                              >
                                <p
                                  className={[
                                    "text-3xl",
                                    "font-black",
                                    feature.number,
                                  ].join(" ")}
                                >
                                  {String(
                                    pointIndex +
                                      1,
                                  ).padStart(
                                    2,
                                    "0",
                                  )}
                                </p>

                                <p className="mt-4 text-xs font-bold leading-5 text-slate-200">
                                  {point}
                                </p>
                              </motion.div>
                            ),
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              },
            )}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
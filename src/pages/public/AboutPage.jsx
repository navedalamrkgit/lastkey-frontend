import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  FileCheck2,
  HeartHandshake,
  KeyRound,
  Lightbulb,
  LockKeyhole,
  Network,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  UsersRound,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import CTASection from "../../components/landing/CTASection";
import Button from "../../components/ui/Button";
import { ROUTES } from "../../utils/routePaths";

const values = [
  {
    icon: ShieldCheck,
    title: "Security first",
    description:
      "Sensitive documents and access decisions must always be protected through deliberate security controls.",
    accent: "from-blue-600 to-cyan-500",
    surface:
      "border-blue-200/80 bg-gradient-to-br from-blue-50 via-white to-cyan-50",
    glow: "bg-blue-400/20",
  },
  {
    icon: HeartHandshake,
    title: "Family clarity",
    description:
      "Technology should reduce confusion and make important information easier for trusted family members to find.",
    accent: "from-rose-500 to-pink-500",
    surface:
      "border-rose-200/80 bg-gradient-to-br from-rose-50 via-white to-pink-50",
    glow: "bg-rose-400/20",
  },
  {
    icon: BrainCircuit,
    title: "Useful intelligence",
    description:
      "AI should help users organise, understand and review documents without making the experience complicated.",
    accent: "from-violet-600 to-fuchsia-500",
    surface:
      "border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50",
    glow: "bg-violet-400/20",
  },
  {
    icon: LockKeyhole,
    title: "Privacy by design",
    description:
      "Access should remain controlled, visible and limited to the people and information selected by the account owner.",
    accent: "from-emerald-600 to-teal-500",
    surface:
      "border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50",
    glow: "bg-emerald-400/20",
  },
];

const journeySteps = [
  {
    icon: Search,
    step: "01",
    title: "Problem identified",
    description:
      "Important family information is often spread across devices, cupboards, email accounts and cloud folders.",
    accent: "from-blue-600 to-cyan-500",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
  },
  {
    icon: Lightbulb,
    step: "02",
    title: "Research and planning",
    description:
      "We studied how secure storage, nominees and emergency access could work together inside one simple platform.",
    accent: "from-amber-500 to-orange-500",
    badge: "bg-amber-50 text-amber-700 border-amber-200",
  },
  {
    icon: Network,
    step: "03",
    title: "Secure architecture",
    description:
      "The platform was structured around protected APIs, role-based permissions and controlled document access.",
    accent: "from-emerald-600 to-teal-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  {
    icon: BrainCircuit,
    step: "04",
    title: "AI integration",
    description:
      "Intelligent document categorisation, extraction and risk detection were added to improve organisation.",
    accent: "from-violet-600 to-fuchsia-500",
    badge: "bg-violet-50 text-violet-700 border-violet-200",
  },
  {
    icon: Rocket,
    step: "05",
    title: "Building LastKey",
    description:
      "Every module now works toward one goal: making digital legacy preparation practical for ordinary families.",
    accent: "from-rose-500 to-orange-500",
    badge: "bg-rose-50 text-rose-700 border-rose-200",
  },
];

const statistics = [
  {
    icon: ShieldCheck,
    value: "100%",
    label: "Security focused",
    description: "Protection considered across every workflow.",
    accent: "from-blue-600 to-cyan-500",
  },
  {
    icon: FileCheck2,
    value: "50+",
    label: "Document types",
    description: "Designed for important personal and family records.",
    accent: "from-violet-600 to-fuchsia-500",
  },
  {
    icon: KeyRound,
    value: "24/7",
    label: "Vault availability",
    description: "Important information remains organised and accessible.",
    accent: "from-emerald-600 to-teal-500",
  },
  {
    icon: UsersRound,
    value: "Role-based",
    label: "Controlled access",
    description: "Every user receives only the permissions they need.",
    accent: "from-amber-500 to-orange-500",
  },
];

const vaultItems = [
  {
    label: "Identity documents",
    status: "Protected",
    accent: "bg-blue-500",
  },
  {
    label: "Insurance records",
    status: "Organised",
    accent: "bg-violet-500",
  },
  {
    label: "Trusted nominees",
    status: "Verified",
    accent: "bg-emerald-500",
  },
  {
    label: "Emergency workflow",
    status: "Configured",
    accent: "bg-orange-500",
  },
];

export default function AboutPage() {
  return (
    <div className="page-enter">
      {/* Hero */}
      <section className="section-shell overflow-hidden bg-gradient-to-b from-orange-50 via-white to-violet-50">
        <div className="soft-grid absolute inset-0 opacity-40" />
        <div className="noise-overlay" />

        <div className="aurora-blob -left-32 top-8 h-96 w-96 bg-orange-300/25 float-slow" />

        <div className="aurora-blob -right-32 bottom-0 h-[430px] w-[430px] bg-violet-300/25 float-medium" />

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-14 px-4 py-24 sm:px-6 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <motion.div
            initial={{
              opacity: 0,
              x: -28,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-4 py-2 text-xs font-black text-orange-700 shadow-sm backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />

              Built for families and their future
            </div>

            <h1 className="text-balance mt-7 max-w-4xl text-5xl font-black leading-[1.02] tracking-[-0.055em] text-slate-950 sm:text-6xl lg:text-7xl">
              Digital legacy starts with

              <span className="block bg-gradient-to-r from-orange-500 via-rose-500 to-violet-600 bg-clip-text text-transparent">
                responsibility.
              </span>
            </h1>

            <p className="mt-7 max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              LastKey helps people organise important information,
              assign trusted nominees and prepare controlled access
              before their families are left searching for answers.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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

              <Link to={ROUTES.FEATURES}>
                <Button
                  fullWidth
                  size="xl"
                  variant="secondary"
                  className="sm:w-auto"
                >
                  Explore LastKey
                </Button>
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Secure document vault",
                "Verified nominees",
                "Controlled emergency access",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-3.5 py-2 text-xs font-bold text-slate-600 shadow-sm backdrop-blur-xl"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />

                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 28,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-orange-300/25 via-rose-300/20 to-violet-300/25 blur-3xl" />

            <div className="relative overflow-hidden rounded-[38px] border border-white/70 bg-slate-950 p-6 text-white shadow-[0_35px_100px_-40px_rgba(15,23,42,0.7)] sm:p-8">
              <div className="landing-grid-dark absolute inset-0 opacity-40" />

              <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-violet-500/20 blur-3xl" />

              <div className="absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-orange-500/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-300">
                      LastKey overview
                    </p>

                    <h2 className="mt-2 text-2xl font-black">
                      Family protection vault
                    </h2>
                  </div>

                  <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 via-rose-500 to-violet-600 text-white shadow-lg shadow-violet-500/25">
                    <KeyRound className="h-6 w-6" />
                  </span>
                </div>

                <div className="mt-7 rounded-[28px] border border-white/10 bg-white/[0.07] p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-400">
                        Vault readiness
                      </p>

                      <p className="mt-1 text-3xl font-black">
                        92%
                      </p>
                    </div>

                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                      Protected
                    </span>
                  </div>

                  <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: "92%",
                      }}
                      transition={{
                        duration: 1.2,
                        delay: 0.4,
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
                    />
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  {vaultItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{
                        opacity: 0,
                        x: 20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        duration: 0.45,
                        delay: 0.45 + index * 0.09,
                      }}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.055] px-4 py-3.5 backdrop-blur-xl"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${item.accent}`}
                        />

                        <span className="text-sm font-bold text-slate-200">
                          {item.label}
                        </span>
                      </div>

                      <span className="text-xs font-bold text-slate-400">
                        {item.status}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-shell overflow-hidden bg-white py-24 sm:py-28">
        <div className="soft-grid absolute inset-0 opacity-25" />

        <div className="section-container">
          <div className="grid items-center gap-14 lg:grid-cols-[0.95fr_1.05fr]">
            <motion.div
              initial={{
                opacity: 0,
                x: -24,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.65,
              }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black text-blue-700">
                <Target className="h-4 w-4" />

                Our purpose
              </div>

              <h2 className="text-balance mt-6 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
                Turning scattered information into

                <span className="gradient-text block">
                  structured family clarity.
                </span>
              </h2>

              <p className="mt-6 text-base leading-8 text-slate-600">
                LastKey aims to make digital legacy preparation
                understandable, secure and practical. People should be
                able to organise important records and define future
                access without unsafe password sharing or unstructured
                folders.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  {
                    title: "Our mission",
                    description:
                      "Give people one secure system for organising documents and future access.",
                  },
                  {
                    title: "Our vision",
                    description:
                      "A future where families are never left uncertain about critical information.",
                  },
                  {
                    title: "Why LastKey",
                    description:
                      "Because preparation today can prevent confusion during difficult moments.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="flex gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50/60 hover:shadow-md"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                    <div>
                      <h3 className="text-sm font-black text-slate-950">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 24,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.65,
              }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-blue-200/40 to-violet-200/40 blur-3xl" />

              <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 p-7 text-white shadow-2xl sm:p-10">
                <div className="landing-grid-dark absolute inset-0 opacity-40" />

                <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />

                <div className="relative">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 text-white shadow-lg">
                    <HeartHandshake className="h-6 w-6" />
                  </span>

                  <p className="mt-7 text-xs font-black uppercase tracking-[0.18em] text-cyan-300">
                    The problem we are solving
                  </p>

                  <blockquote className="mt-5 text-2xl font-black leading-snug sm:text-3xl">
                    “Families may know that important documents exist,
                    but not where they are, how to access them or which
                    version is current.”
                  </blockquote>

                  <p className="mt-6 text-sm leading-7 text-slate-300">
                    LastKey closes this gap through structured storage,
                    nominee permissions, document intelligence and a
                    controlled emergency-release process.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    {[
                      {
                        value: "One",
                        label: "Organised vault",
                      },
                      {
                        value: "Clear",
                        label: "Access rules",
                      },
                      {
                        value: "Smart",
                        label: "Document insights",
                      },
                      {
                        value: "Safe",
                        label: "Emergency release",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur-xl"
                      >
                        <p className="text-xl font-black text-cyan-300">
                          {item.value}
                        </p>

                        <p className="mt-2 text-xs font-semibold text-slate-300">
                          {item.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-shell overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24 sm:py-28">
        <div className="soft-grid absolute inset-0 opacity-25" />

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
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-black text-violet-700">
              <Sparkles className="h-4 w-4" />

              What guides LastKey
            </div>

            <h2 className="text-balance mt-6 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl lg:text-6xl">
              Principles behind

              <span className="gradient-text block">
                every product decision.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              LastKey is designed around trust, family clarity,
              responsible intelligence and controlled access.
            </p>
          </motion.div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <motion.article
                  key={value.title}
                  initial={{
                    opacity: 0,
                    y: 28,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.2,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                  }}
                  whileHover={{
                    y: -9,
                  }}
                  className={[
                    "group",
                    "relative",
                    "isolate",
                    "overflow-hidden",
                    "rounded-[30px]",
                    "border",
                    "p-7",
                    "shadow-[0_24px_60px_-40px_rgba(15,23,42,0.5)]",
                    value.surface,
                  ].join(" ")}
                >
                  <div
                    className={[
                      "absolute",
                      "-right-16",
                      "-top-16",
                      "h-40",
                      "w-40",
                      "rounded-full",
                      "blur-3xl",
                      "transition-transform",
                      "duration-500",
                      "group-hover:scale-125",
                      value.glow,
                    ].join(" ")}
                  />

                  <div className="relative">
                    <span
                      className={[
                        "flex",
                        "h-14",
                        "w-14",
                        "items-center",
                        "justify-center",
                        "rounded-2xl",
                        "bg-gradient-to-br",
                        "text-white",
                        "shadow-lg",
                        "transition-transform",
                        "duration-300",
                        "group-hover:rotate-6",
                        "group-hover:scale-110",
                        value.accent,
                      ].join(" ")}
                    >
                      <Icon className="h-6 w-6" />
                    </span>

                    <h3 className="mt-7 text-xl font-black text-slate-950">
                      {value.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {value.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="section-shell overflow-hidden bg-slate-950 py-24 text-white sm:py-28">
        <div className="landing-grid-dark absolute inset-0 opacity-40" />
        <div className="noise-overlay opacity-[0.045]" />

        <div className="aurora-blob -left-32 top-20 h-80 w-80 bg-blue-600/20" />

        <div className="aurora-blob -right-32 bottom-0 h-96 w-96 bg-violet-600/20" />

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
            className="relative mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-black text-cyan-300">
              <Rocket className="h-4 w-4" />

              The LastKey journey
            </div>

            <h2 className="text-balance mt-6 text-4xl font-black tracking-[-0.045em] sm:text-5xl lg:text-6xl">
              From a real-life problem to

              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                a secure digital platform.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              LastKey is being built step by step around the practical
              challenges families face when important information is
              difficult to locate or access.
            </p>
          </motion.div>

          <div className="relative mx-auto mt-16 max-w-4xl">
            <div className="absolute bottom-8 left-6 top-8 w-px bg-gradient-to-b from-blue-500 via-violet-500 to-orange-500 md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-8">
              {journeySteps.map((item, index) => {
                const Icon = item.icon;
                const isRight = index % 2 === 1;

                return (
                  <motion.article
                    key={item.title}
                    initial={{
                      opacity: 0,
                      x: isRight ? 28 : -28,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.25,
                    }}
                    transition={{
                      duration: 0.55,
                    }}
                    className="relative grid items-center md:grid-cols-2 md:gap-16"
                  >
                    <div
                      className={[
                        "ml-16",
                        "md:ml-0",
                        isRight
                          ? "md:col-start-2"
                          : "md:col-start-1 md:text-right",
                      ].join(" ")}
                    >
                      <div className="rounded-[28px] border border-white/10 bg-white/[0.065] p-6 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.09]">
                        <span
                          className={[
                            "inline-flex",
                            "rounded-full",
                            "border",
                            "px-3",
                            "py-1.5",
                            "text-[10px]",
                            "font-black",
                            "uppercase",
                            "tracking-[0.16em]",
                            item.badge,
                          ].join(" ")}
                        >
                          Step {item.step}
                        </span>

                        <h3 className="mt-4 text-xl font-black">
                          {item.title}
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <span
                      className={[
                        "absolute",
                        "left-0",
                        "top-1/2",
                        "z-10",
                        "flex",
                        "h-12",
                        "w-12",
                        "-translate-y-1/2",
                        "items-center",
                        "justify-center",
                        "rounded-2xl",
                        "bg-gradient-to-br",
                        "text-white",
                        "shadow-lg",
                        "md:left-1/2",
                        "md:-translate-x-1/2",
                        item.accent,
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="section-shell overflow-hidden bg-white py-24 sm:py-28">
        <div className="soft-grid absolute inset-0 opacity-25" />

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
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-black text-emerald-700">
              <ShieldCheck className="h-4 w-4" />

              Designed for meaningful protection
            </div>

            <h2 className="text-balance mt-6 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
              One platform with a

              <span className="gradient-text block">
                clear responsibility.
              </span>
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {statistics.map((statistic, index) => {
              const Icon = statistic.icon;

              return (
                <motion.article
                  key={statistic.label}
                  initial={{
                    opacity: 0,
                    y: 24,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -7,
                  }}
                  className="group rounded-[30px] border border-slate-200 bg-white p-6 text-center shadow-[0_22px_60px_-42px_rgba(15,23,42,0.5)] transition-shadow hover:shadow-xl"
                >
                  <span
                    className={[
                      "mx-auto",
                      "flex",
                      "h-13",
                      "w-13",
                      "items-center",
                      "justify-center",
                      "rounded-2xl",
                      "bg-gradient-to-br",
                      "text-white",
                      "shadow-lg",
                      "transition-transform",
                      "duration-300",
                      "group-hover:scale-110",
                      statistic.accent,
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <p className="mt-6 text-3xl font-black tracking-[-0.04em] text-slate-950">
                    {statistic.value}
                  </p>

                  <h3 className="mt-2 text-sm font-black text-slate-800">
                    {statistic.label}
                  </h3>

                  <p className="mt-3 text-xs leading-6 text-slate-500">
                    {statistic.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
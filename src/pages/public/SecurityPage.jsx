import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  ServerCog,
  ShieldCheck,
  ShieldEllipsis,
  Sparkles,
} from "lucide-react";
import {
  motion,
} from "framer-motion";
import {
  Link,
} from "react-router-dom";

import CTASection from "../../components/landing/CTASection";
import Button from "../../components/ui/Button";
import { ROUTES } from "../../utils/routePaths";

const securityLayers = [
  {
    icon: KeyRound,
    title: "Secure authentication",
    description:
      "Access and refresh tokens protect active sessions and support controlled renewal.",

    surface:
      "border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50",

    accent:
      "from-blue-600 to-cyan-500",

    glow:
      "bg-blue-400/20",
  },

  {
    icon: Fingerprint,
    title: "Identity verification",
    description:
      "Email verification, OTP checks and nominee validation protect sensitive actions.",

    surface:
      "border-violet-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50",

    accent:
      "from-violet-600 to-fuchsia-500",

    glow:
      "bg-violet-400/20",
  },

  {
    icon: LockKeyhole,
    title: "Access permissions",
    description:
      "Users, nominees and administrators receive only the permissions required for their roles.",

    surface:
      "border-cyan-200 bg-gradient-to-br from-cyan-50 via-white to-sky-50",

    accent:
      "from-cyan-600 to-sky-500",

    glow:
      "bg-cyan-400/20",
  },

  {
    icon: Activity,
    title: "Activity visibility",
    description:
      "Authentication, document and emergency events remain available for security review.",

    surface:
      "border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50",

    accent:
      "from-amber-500 to-orange-500",

    glow:
      "bg-amber-400/20",
  },

  {
    icon: ServerCog,
    title: "Backend protection",
    description:
      "Spring Security, validation and protected API routes form the server-side defence layer.",

    surface:
      "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50",

    accent:
      "from-emerald-600 to-teal-500",

    glow:
      "bg-emerald-400/20",
  },

  {
    icon: ShieldCheck,
    title: "Emergency safeguards",
    description:
      "Verification, evidence review and waiting periods reduce unauthorised release risk.",

    surface:
      "border-rose-200 bg-gradient-to-br from-rose-50 via-white to-pink-50",

    accent:
      "from-rose-600 to-pink-500",

    glow:
      "bg-rose-400/20",
  },
];

const checklist = [
  "Use a strong and unique password.",
  "Never share OTP codes or access tokens.",
  "Review active sessions regularly.",
  "Keep nominee details current.",
  "Respond quickly to security alerts.",
];

export default function SecurityPage() {
  return (
    <div className="page-enter">
      <section
        className="
          section-shell
          overflow-hidden
          bg-slate-950
          text-white
        "
      >
        <div className="landing-grid-dark absolute inset-0 opacity-45" />

        <div className="noise-overlay opacity-[0.045]" />

        <div
          className="
            aurora-blob
            -left-36 top-0
            h-96 w-96
            bg-blue-600/25
            float-slow
          "
        />

        <div
          className="
            aurora-blob
            -right-36 bottom-0
            h-[430px] w-[430px]
            bg-violet-600/25
            float-medium
          "
        />

        <div
          className="
            relative mx-auto
            grid max-w-[1440px]
            items-center gap-14
            px-4 py-24
            sm:px-6
            sm:py-28
            lg:grid-cols-[1fr_0.85fr]
            lg:px-8
          "
        >
          <motion.div
            initial={{
              opacity: 0,
              x: -26,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.7,
            }}
          >
            <div
              className="
                inline-flex
                items-center gap-2
                rounded-full
                border border-cyan-400/20
                bg-cyan-400/10
                px-4 py-2
                text-xs
                font-black
                text-cyan-300
              "
            >
              <ShieldEllipsis className="h-4 w-4" />

              LastKey security architecture
            </div>

            <h1
              className="
                text-balance
                mt-7
                max-w-4xl
                text-5xl
                font-black
                leading-[1.02]
                tracking-[-0.055em]
                sm:text-6xl
                lg:text-7xl
              "
            >
              Protection across every

              <span
                className="
                  block
                  bg-gradient-to-r
                  from-cyan-300
                  via-blue-300
                  to-violet-300
                  bg-clip-text
                  text-transparent
                "
              >
                sensitive workflow.
              </span>
            </h1>

            <p
              className="
                mt-7
                max-w-3xl
                text-base
                leading-8
                text-slate-300
                sm:text-lg
              "
            >
              LastKey combines authentication, role-based
              permissions, identity verification, controlled
              emergency release and activity visibility to protect
              critical information.
            </p>

            <div
              className="
                mt-9 flex
                flex-col gap-3
                sm:flex-row
              "
            >
              <Link to={ROUTES.REGISTER}>
                <Button
                  fullWidth
                  size="xl"
                  variant="blue"
                  rightIcon={ArrowRight}
                  className="sm:w-auto"
                >
                  Create protected vault
                </Button>
              </Link>

              <Link to={ROUTES.FEATURES}>
                <Button
                  fullWidth
                  size="xl"
                  variant="secondary"
                  className="sm:w-auto"
                >
                  Explore features
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              x: 26,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            transition={{
              duration: 0.8,
            }}
            className="relative"
          >
            <div
              className="
                absolute
                -inset-8
                rounded-full
                bg-gradient-to-br
                from-cyan-500/20
                via-blue-500/20
                to-violet-500/20
                blur-3xl
              "
            />

            <div
              className="
                relative
                overflow-hidden
                rounded-[36px]
                border border-white/10
                bg-white/[0.065]
                p-6
                shadow-2xl
                shadow-black/35
                backdrop-blur-2xl
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.18em]
                      text-cyan-300
                    "
                  >
                    Live protection
                  </p>

                  <h2 className="mt-2 text-2xl font-black">
                    Security score
                  </h2>
                </div>

                <span
                  className="
                    flex h-13 w-13
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-cyan-400
                    via-blue-500
                    to-violet-500
                    text-white
                    shadow-lg
                    shadow-blue-500/30
                  "
                >
                  <ShieldCheck className="h-6 w-6" />
                </span>
              </div>

              <div
                className="
                  mt-7 grid
                  items-center gap-7
                  rounded-[28px]
                  border border-white/10
                  bg-slate-950/45
                  p-6
                  sm:grid-cols-[auto_1fr]
                "
              >
                <div className="relative mx-auto h-40 w-40">
                  <svg
                    viewBox="0 0 100 100"
                    className="h-full w-full -rotate-90"
                  >
                    <defs>
                      <linearGradient
                        id="securityPageGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor="#22d3ee"
                        />

                        <stop
                          offset="50%"
                          stopColor="#3b82f6"
                        />

                        <stop
                          offset="100%"
                          stopColor="#8b5cf6"
                        />
                      </linearGradient>
                    </defs>

                    <circle
                      cx="50"
                      cy="50"
                      r="43"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="8"
                    />

                    <motion.circle
                      cx="50"
                      cy="50"
                      r="43"
                      fill="none"
                      stroke="url(#securityPageGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="270"
                      initial={{
                        strokeDashoffset: 270,
                      }}
                      animate={{
                        strokeDashoffset: 28,
                      }}
                      transition={{
                        duration: 1.4,
                        delay: 0.35,
                      }}
                    />
                  </svg>

                  <div
                    className="
                      absolute inset-0
                      flex flex-col
                      items-center
                      justify-center
                    "
                  >
                    <span className="text-4xl font-black">
                      90
                    </span>

                    <span
                      className="
                        mt-1 text-[10px]
                        font-black
                        uppercase
                        tracking-[0.18em]
                        text-cyan-300
                      "
                    >
                      Protected
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    "Identity verified",
                    "Secure password enabled",
                    "No suspicious sessions",
                    "Nominee review pending",
                  ].map(
                    (
                      item,
                      index,
                    ) => (
                      <div
                        key={item}
                        className="
                          flex items-center
                          justify-between
                          rounded-xl
                          border border-white/10
                          bg-white/[0.055]
                          px-4 py-3
                        "
                      >
                        <span className="text-xs font-semibold text-slate-300">
                          {item}
                        </span>

                        <CheckCircle2
                          className={[
                            "h-4 w-4",
                            index < 3
                              ? "text-emerald-400"
                              : "text-amber-400",
                          ].join(" ")}
                        />
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section
        className="
          section-shell
          overflow-hidden
          bg-gradient-to-b
          from-white
          via-slate-50
          to-white
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
                border border-emerald-200
                bg-emerald-50
                px-4 py-2
                text-xs
                font-black
                text-emerald-700
              "
            >
              <Sparkles className="h-4 w-4" />

              Layered security model
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
              Protection is built into

              <span className="gradient-text block">
                every LastKey workflow.
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
              Security is not limited to login. It continues
              through document management, nominee access and
              emergency release.
            </p>
          </motion.div>

          <div
            className="
              mt-16 grid
              gap-6
              md:grid-cols-2
              lg:grid-cols-3
            "
          >
            {securityLayers.map(
              (
                layer,
                index,
              ) => {
                const Icon =
                  layer.icon;

                return (
                  <motion.article
                    key={layer.title}
                    initial={{
                      opacity: 0,
                      y: 26,
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
                      delay:
                        index * 0.07,
                    }}
                    whileHover={{
                      y: -8,
                    }}
                    className={[
                      "group",
                      "relative",
                      "isolate",
                      "overflow-hidden",
                      "rounded-[30px]",
                      "border",
                      "p-7",
                      "shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)]",
                      layer.surface,
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "absolute",
                        "-right-14",
                        "-top-14",
                        "h-36",
                        "w-36",
                        "rounded-full",
                        "blur-3xl",
                        "transition-transform",
                        "duration-500",
                        "group-hover:scale-125",
                        layer.glow,
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
                          "group-hover:scale-110",
                          "group-hover:rotate-3",
                          layer.accent,
                        ].join(" ")}
                      >
                        <Icon className="h-6 w-6" />
                      </span>

                      <h3 className="mt-7 text-xl font-black text-slate-950">
                        {layer.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-slate-600">
                        {layer.description}
                      </p>
                    </div>
                  </motion.article>
                );
              },
            )}
          </div>

          <motion.div
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
              amount: 0.25,
            }}
            transition={{
              duration: 0.65,
            }}
            className="
              relative mt-16
              overflow-hidden
              rounded-[36px]
              bg-gradient-to-br
              from-slate-950
              via-emerald-950
              to-teal-950
              p-7
              text-white
              shadow-2xl
              shadow-emerald-950/25
              sm:p-10
              lg:grid
              lg:grid-cols-[0.9fr_1.1fr]
              lg:items-center
              lg:gap-12
            "
          >
            <div className="landing-grid-dark absolute inset-0 opacity-35" />

            <div
              className="
                absolute
                -left-20 -top-24
                h-72 w-72
                rounded-full
                bg-emerald-500/20
                blur-3xl
              "
            />

            <div className="relative">
              <span
                className="
                  flex h-13 w-13
                  items-center
                  justify-center
                  rounded-2xl
                  border border-white/10
                  bg-white/10
                  text-emerald-300
                "
              >
                <ShieldCheck className="h-6 w-6" />
              </span>

              <p
                className="
                  mt-6 text-xs
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-emerald-300
                "
              >
                Your security checklist
              </p>

              <h2
                className="
                  mt-3
                  text-3xl
                  font-black
                  tracking-[-0.035em]
                  sm:text-4xl
                "
              >
                Users remain part of the protection system.
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                Strong platform security works best when account
                owners also follow safe authentication and access
                practices.
              </p>
            </div>

            <div className="relative mt-8 space-y-3 lg:mt-0">
              {checklist.map(
                (
                  item,
                  index,
                ) => (
                  <motion.div
                    key={item}
                    initial={{
                      opacity: 0,
                      x: 18,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.4,
                      delay:
                        index * 0.07,
                    }}
                    className="
                      flex items-center
                      gap-3
                      rounded-2xl
                      border border-white/10
                      bg-white/[0.07]
                      p-4
                      backdrop-blur-xl
                      transition
                      hover:bg-white/[0.11]
                    "
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />

                    <p className="text-sm font-semibold text-slate-200">
                      {item}
                    </p>
                  </motion.div>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
import {
  Activity,
  CheckCircle2,
  Eye,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  ScanLine,
  ShieldCheck,
  ShieldOff,
  Smartphone,
  Sparkles,
  UserCheck,
} from "lucide-react";
import {
  motion,
} from "framer-motion";
import {
  Link,
} from "react-router-dom";

import Button from "../ui/Button";
import { ROUTES } from "../../utils/routePaths";

const securityPoints = [
  {
    icon: LockKeyhole,
    title: "Encrypted protection",
    description:
      "Sensitive account and document information remains protected across secure storage and transmission workflows.",

    iconClass:
      "from-blue-500 to-cyan-400 shadow-blue-500/30",

    background:
      "border-blue-400/20 bg-blue-500/10",
  },

  {
    icon: Fingerprint,
    title: "Verified identity",
    description:
      "Authentication, nominee verification and permission checks protect every sensitive action.",

    iconClass:
      "from-violet-500 to-fuchsia-400 shadow-violet-500/30",

    background:
      "border-violet-400/20 bg-violet-500/10",
  },

  {
    icon: ScanLine,
    title: "Continuous visibility",
    description:
      "Important logins, document changes and emergency-access events remain visible for review.",

    iconClass:
      "from-emerald-500 to-teal-400 shadow-emerald-500/30",

    background:
      "border-emerald-400/20 bg-emerald-500/10",
  },
];

const checklist = [
  {
    label: "Email address verified",
    completed: true,
    color:
      "text-emerald-400",
  },
  {
    label: "Strong password enabled",
    completed: true,
    color:
      "text-cyan-400",
  },
  {
    label: "Access activity reviewed",
    completed: true,
    color:
      "text-violet-400",
  },
  {
    label: "Nominee verification pending",
    completed: false,
    color:
      "text-amber-400",
  },
];

const miniStats = [
  {
    icon: ShieldOff,
    value: "0",
    label: "Suspicious sessions",
    style:
      "border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
  },
  {
    icon: Smartphone,
    value: "4",
    label: "Trusted devices",
    style:
      "border-blue-400/20 bg-blue-500/10 text-blue-300",
  },
  {
    icon: UserCheck,
    value: "3",
    label: "Verified nominees",
    style:
      "border-violet-400/20 bg-violet-500/10 text-violet-300",
  },
];

export default function SecuritySection() {
  return (
    <section
      className="
        section-shell
        overflow-hidden
        bg-slate-950
        py-22
        text-white
        sm:py-28
      "
    >
      <div className="noise-overlay opacity-[0.045]" />

      <div
        className="
          soft-grid
          absolute inset-0
          opacity-20
        "
      />

      <div
        className="
          aurora-blob
          -left-40 top-0
          h-[430px] w-[430px]
          bg-blue-600/25
          float-slow
        "
      />

      <div
        className="
          aurora-blob
          -right-44 top-1/3
          h-[460px] w-[460px]
          bg-violet-600/25
          float-medium
        "
      />

      <div
        className="
          aurora-blob
          bottom-0 left-[42%]
          h-[320px] w-[320px]
          bg-cyan-500/15
          pulse-glow
        "
      />

      <div
        className="
          section-container
          grid items-center
          gap-16
          lg:grid-cols-[0.9fr_1.1fr]
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            x: -28,
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
            duration: 0.7,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="relative"
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
              backdrop-blur-xl
            "
          >
            <ShieldCheck className="h-4 w-4" />

            Security-first architecture
          </div>

          <h2
            className="
              text-balance
              mt-7
              max-w-2xl
              text-4xl
              font-black
              leading-[1.04]
              tracking-[-0.045em]
              sm:text-5xl
              lg:text-6xl
            "
          >
            Your private information deserves

            <span
              className="
                mt-2 block
                bg-gradient-to-r
                from-blue-300
                via-violet-300
                to-cyan-300
                bg-clip-text
                text-transparent
              "
            >
              serious protection.
            </span>
          </h2>

          <p
            className="
              mt-6
              max-w-xl
              text-base
              leading-8
              text-slate-300
              sm:text-lg
            "
          >
            LastKey protects important
            information through verified
            access, controlled permissions,
            secure sessions and transparent
            activity tracking.
          </p>

          <div className="mt-9 space-y-4">
            {securityPoints.map(
              (
                point,
                index,
              ) => {
                const Icon =
                  point.icon;

                return (
                  <motion.div
                    key={point.title}
                    initial={{
                      opacity: 0,
                      y: 18,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.5,
                      delay:
                        index * 0.09,
                    }}
                    whileHover={{
                      x: 7,
                    }}
                    className={[
                      "group",
                      "flex",
                      "gap-4",
                      "rounded-2xl",
                      "border",
                      "p-4",
                      "backdrop-blur-xl",
                      "transition-colors",
                      "duration-300",
                      point.background,
                    ].join(" ")}
                  >
                    <span
                      className={[
                        "flex",
                        "h-12",
                        "w-12",
                        "shrink-0",
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
                        point.iconClass,
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <div>
                      <h3 className="text-sm font-black text-white">
                        {point.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-6 text-slate-400">
                        {point.description}
                      </p>
                    </div>
                  </motion.div>
                );
              },
            )}
          </div>

          <Link
            to={ROUTES.SECURITY}
            className="mt-9 inline-block"
          >
            <Button
              variant="blue"
              size="xl"
              rightIcon={Eye}
            >
              Explore security centre
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.94,
            x: 30,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.8,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="relative"
        >
          <div
            className="
              absolute -inset-10
              rounded-full
              bg-gradient-to-br
              from-blue-600/20
              via-violet-600/20
              to-cyan-500/15
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
              p-4
              shadow-2xl
              shadow-black/40
              backdrop-blur-2xl
              sm:p-6
            "
          >
            <div
              className="
                absolute
                -right-20 -top-24
                h-72 w-72
                rounded-full
                bg-violet-500/20
                blur-3xl
              "
            />

            <div
              className="
                absolute
                -bottom-24 -left-16
                h-64 w-64
                rounded-full
                bg-cyan-500/15
                blur-3xl
              "
            />

            <div className="relative">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div
                    className="
                      inline-flex
                      items-center gap-2
                      rounded-full
                      border border-blue-400/20
                      bg-blue-500/10
                      px-3 py-1.5
                      text-[10px]
                      font-black
                      uppercase
                      tracking-[0.18em]
                      text-blue-300
                    "
                  >
                    <Activity className="h-3.5 w-3.5" />

                    Live protection
                  </div>

                  <h3 className="mt-3 text-2xl font-black">
                    Security centre
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    Account protection overview
                  </p>
                </div>

                <motion.span
                  animate={{
                    rotate: [
                      0,
                      4,
                      -4,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    flex h-13 w-13
                    items-center justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-blue-500
                    via-violet-500
                    to-fuchsia-500
                    text-white
                    shadow-lg
                    shadow-violet-500/30
                  "
                >
                  <KeyRound className="h-6 w-6" />
                </motion.span>
              </div>

              <div
                className="
                  mt-7
                  grid items-center
                  gap-7
                  rounded-[28px]
                  border border-white/10
                  bg-slate-950/45
                  p-5
                  sm:grid-cols-[auto_1fr]
                  sm:p-6
                "
              >
                <div
                  className="
                    relative mx-auto
                    h-40 w-40
                    shrink-0
                  "
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="h-full w-full -rotate-90"
                  >
                    <defs>
                      <linearGradient
                        id="securityGradient"
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
                          stopColor="#6366f1"
                        />

                        <stop
                          offset="100%"
                          stopColor="#d946ef"
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
                      stroke="url(#securityGradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="270"
                      initial={{
                        strokeDashoffset: 270,
                      }}
                      whileInView={{
                        strokeDashoffset: 35,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 1.4,
                        delay: 0.25,
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
                      87
                    </span>

                    <span
                      className="
                        mt-1
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.18em]
                        text-cyan-300
                      "
                    >
                      Strong
                    </span>
                  </div>

                  <div
                    className="
                      absolute inset-5
                      -z-10
                      rounded-full
                      bg-indigo-500/15
                      blur-xl
                    "
                  />
                </div>

                <div className="space-y-3">
                  {checklist.map(
                    (
                      item,
                      index,
                    ) => (
                      <motion.div
                        key={item.label}
                        initial={{
                          opacity: 0,
                          x: 15,
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
                            0.45 +
                            index * 0.08,
                        }}
                        className="
                          flex items-center
                          justify-between
                          gap-4
                          rounded-xl
                          border border-white/10
                          bg-white/[0.055]
                          px-4 py-3
                          transition
                          hover:bg-white/[0.09]
                        "
                      >
                        <span className="text-xs font-semibold text-slate-300">
                          {item.label}
                        </span>

                        <CheckCircle2
                          className={[
                            "h-4",
                            "w-4",
                            item.color,
                          ].join(" ")}
                        />
                      </motion.div>
                    ),
                  )}
                </div>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">
                {miniStats.map(
                  (
                    stat,
                    index,
                  ) => {
                    const Icon =
                      stat.icon;

                    return (
                      <motion.div
                        key={stat.label}
                        initial={{
                          opacity: 0,
                          y: 16,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.45,
                          delay:
                            0.65 +
                            index * 0.08,
                        }}
                        whileHover={{
                          y: -5,
                        }}
                        className={[
                          "rounded-2xl",
                          "border",
                          "p-4",
                          "backdrop-blur-xl",
                          stat.style,
                        ].join(" ")}
                      >
                        <div className="flex items-center justify-between">
                          <Icon className="h-5 w-5" />

                          <Sparkles className="h-3.5 w-3.5 opacity-50" />
                        </div>

                        <p className="mt-4 text-2xl font-black text-white">
                          {stat.value}
                        </p>

                        <p className="mt-1 text-[11px] font-semibold text-slate-400">
                          {stat.label}
                        </p>
                      </motion.div>
                    );
                  },
                )}
              </div>
            </div>
          </div>

          <motion.div
            animate={{
              y: [
                0,
                -8,
                0,
              ],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -bottom-7 -right-3
              hidden
              rounded-2xl
              border border-emerald-400/20
              bg-slate-900/90
              p-4
              shadow-2xl
              backdrop-blur-xl
              sm:block
            "
          >
            <div className="flex items-center gap-3">
              <span
                className="
                  flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  bg-gradient-to-br
                  from-emerald-500
                  to-teal-400
                  text-white
                "
              >
                <ShieldCheck className="h-5 w-5" />
              </span>

              <div>
                <p className="text-xs font-black text-white">
                  All systems protected
                </p>

                <p className="mt-0.5 text-[10px] text-slate-400">
                  Last scan completed now
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
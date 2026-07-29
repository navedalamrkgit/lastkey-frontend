import {
  ArrowRight,
  Check,
  FileCheck2,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  UsersRound,
  Zap,
} from "lucide-react";
import {
  motion,
} from "framer-motion";
import {
  Link,
} from "react-router-dom";

import Button from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../utils/routePaths";

const heroBenefits = [
  {
    label: "Encrypted storage",
    color:
      "border-blue-200 bg-blue-50 text-blue-700",
  },
  {
    label: "Nominee permissions",
    color:
      "border-violet-200 bg-violet-50 text-violet-700",
  },
  {
    label: "Emergency safeguards",
    color:
      "border-rose-200 bg-rose-50 text-rose-700",
  },
];

const activityBars = [
  {
    height: 42,
    color:
      "from-blue-600 to-cyan-400",
  },
  {
    height: 62,
    color:
      "from-violet-600 to-fuchsia-400",
  },
  {
    height: 48,
    color:
      "from-cyan-600 to-sky-400",
  },
  {
    height: 78,
    color:
      "from-emerald-600 to-teal-400",
  },
  {
    height: 58,
    color:
      "from-amber-500 to-orange-400",
  },
  {
    height: 90,
    color:
      "from-rose-600 to-pink-400",
  },
  {
    height: 72,
    color:
      "from-indigo-600 to-violet-400",
  },
];

export default function HeroSection() {
  const {
    isAuthenticated,
  } = useAuth();

  return (
    <section
      className="
        landing-hero
        section-shell
        min-h-[calc(100vh-72px)]
      "
    >
      <div className="soft-grid absolute inset-0 opacity-60" />

      <div className="noise-overlay" />

      <div
        className="
          aurora-blob
          -left-40 top-10
          h-[430px] w-[430px]
          bg-blue-400/25
          float-slow
        "
      />

      <div
        className="
          aurora-blob
          -right-36 top-12
          h-[420px] w-[420px]
          bg-violet-400/25
          float-medium
        "
      />

      <div
        className="
          aurora-blob
          bottom-0 left-[45%]
          h-[350px] w-[350px]
          bg-cyan-300/20
          pulse-glow
        "
      />

      <div
        className="
          section-container
          grid min-h-[calc(100vh-72px)]
          items-center gap-16
          py-20
          lg:grid-cols-[0.95fr_1.05fr]
          lg:py-24
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 26,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.75,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        >
          <div
            className="
              inline-flex items-center
              gap-2 rounded-full
              border border-indigo-200/80
              bg-white/80
              px-4 py-2
              text-xs font-extrabold
              text-indigo-700
              shadow-sm
              backdrop-blur-xl
            "
          >
            <span
              className="
                flex h-6 w-6
                items-center justify-center
                rounded-full
                bg-gradient-to-br
                from-indigo-600
                to-violet-600
                text-white
                shadow-md
                shadow-indigo-500/25
              "
            >
              <Sparkles className="h-3.5 w-3.5" />
            </span>

            Your digital life, protected beautifully
          </div>

          <h1
            className="
              text-balance
              mt-7
              max-w-3xl
              text-5xl
              font-black
              leading-[0.98]
              tracking-[-0.055em]
              text-slate-950
              sm:text-6xl
              lg:text-[72px]
              xl:text-[82px]
            "
          >
            Protect what matters.

            <span className="gradient-text mt-2 block">
              Prepare for what’s next.
            </span>
          </h1>

          <p
            className="
              mt-7 max-w-2xl
              text-base
              leading-8
              text-slate-600
              sm:text-lg
            "
          >
            Store important documents,
            organise your digital legacy,
            assign trusted nominees and
            create a secure emergency-access
            plan—all in one intelligent vault.
          </p>

          <div
            className="
              mt-9 flex
              flex-col gap-3
              sm:flex-row
              sm:items-center
            "
          >
            <Link
              to={
                isAuthenticated
                  ? ROUTES.DASHBOARD
                  : ROUTES.REGISTER
              }
            >
              <Button
                fullWidth
                size="xl"
                className="sm:w-auto"
                rightIcon={ArrowRight}
              >
                {isAuthenticated
                  ? "Open your vault"
                  : "Create your secure vault"}
              </Button>
            </Link>

            <Link to={ROUTES.FEATURES}>
              <Button
                fullWidth
                size="xl"
                variant="secondary"
                className="sm:w-auto"
                leftIcon={ScanSearch}
              >
                Explore how it works
              </Button>
            </Link>
          </div>

          <div
            className="
              mt-8 flex
              flex-wrap gap-3
            "
          >
            {heroBenefits.map(
              ({
                label,
                color,
              }) => (
                <span
                  key={label}
                  className={[
                    "inline-flex",
                    "items-center",
                    "gap-2",
                    "rounded-full",
                    "border",
                    "px-3.5",
                    "py-2",
                    "text-xs",
                    "font-bold",
                    color,
                  ].join(" ")}
                >
                  <Check className="h-3.5 w-3.5" />

                  {label}
                </span>
              ),
            )}
          </div>

          <div
            className="
              mt-10
              grid max-w-xl
              grid-cols-3
              gap-3
            "
          >
            {[
              {
                value: "256-bit",
                label: "Security ready",
                color:
                  "text-blue-600",
              },
              {
                value: "24/7",
                label: "Secure access",
                color:
                  "text-violet-600",
              },
              {
                value: "100%",
                label: "User controlled",
                color:
                  "text-emerald-600",
              },
            ].map(
              ({
                value,
                label,
                color,
              }) => (
                <div
                  key={label}
                  className="
                    rounded-2xl
                    border border-white/80
                    bg-white/65
                    px-4 py-4
                    shadow-sm
                    backdrop-blur-xl
                  "
                >
                  <p
                    className={[
                      "text-xl",
                      "font-black",
                      "tracking-tight",
                      color,
                    ].join(" ")}
                  >
                    {value}
                  </p>

                  <p
                    className="
                      mt-1 text-[11px]
                      font-semibold
                      text-slate-500
                    "
                  >
                    {label}
                  </p>
                </div>
              ),
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
            x: 30,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          transition={{
            duration: 0.85,
            delay: 0.12,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="
            relative mx-auto
            w-full max-w-3xl
          "
        >
          <div
            className="
              absolute -inset-8
              rounded-[48px]
              bg-gradient-to-br
              from-blue-500/25
              via-violet-500/20
              to-cyan-500/20
              blur-3xl
              pulse-glow
            "
          />

          <div
            className="
              glass-surface
              relative overflow-hidden
              rounded-[36px]
              p-3
            "
          >
            <div
              className="
                overflow-hidden
                rounded-[28px]
                border border-slate-200/80
                bg-slate-50/90
              "
            >
              <div
                className="
                  flex items-center
                  justify-between
                  border-b
                  border-slate-200/80
                  bg-white/90
                  px-5 py-4
                  backdrop-blur-xl
                "
              >
                <div className="flex items-center gap-3">
                  <span
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      from-indigo-600
                      via-violet-600
                      to-fuchsia-600
                      text-white
                      shadow-lg
                      shadow-violet-500/25
                    "
                  >
                    <KeyRound className="h-5 w-5" />
                  </span>

                  <div>
                    <p className="text-sm font-black text-slate-950">
                      LastKey Vault
                    </p>

                    <p className="mt-0.5 text-[11px] font-medium text-slate-500">
                      Intelligent legacy protection
                    </p>
                  </div>
                </div>

                <span
                  className="
                    inline-flex
                    items-center
                    gap-1.5
                    rounded-full
                    border
                    border-emerald-200
                    bg-emerald-50
                    px-3 py-1.5
                    text-[10px]
                    font-black
                    uppercase
                    tracking-[0.13em]
                    text-emerald-700
                  "
                >
                  <ShieldCheck className="h-3.5 w-3.5" />

                  Protected
                </span>
              </div>

              <div className="grid gap-4 p-5 sm:grid-cols-3">
                <MetricCard
                  icon={FileCheck2}
                  value="24"
                  label="Protected files"
                  className="
                    border-blue-200
                    bg-gradient-to-br
                    from-blue-50
                    to-cyan-50
                    text-blue-600
                  "
                />

                <MetricCard
                  icon={UsersRound}
                  value="3"
                  label="Trusted nominees"
                  className="
                    border-violet-200
                    bg-gradient-to-br
                    from-violet-50
                    to-fuchsia-50
                    text-violet-600
                  "
                />

                <MetricCard
                  icon={Fingerprint}
                  value="92%"
                  label="Security score"
                  className="
                    border-emerald-200
                    bg-gradient-to-br
                    from-emerald-50
                    to-teal-50
                    text-emerald-600
                  "
                />
              </div>

              <div
                className="
                  grid gap-4
                  px-5 pb-5
                  lg:grid-cols-[1.12fr_0.88fr]
                "
              >
                <div
                  className="
                    rounded-3xl
                    border
                    border-slate-200/90
                    bg-white
                    p-5
                    shadow-sm
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-black text-slate-900">
                        Vault activity
                      </p>

                      <p className="mt-1 text-[11px] font-medium text-slate-500">
                        Protection events this week
                      </p>
                    </div>

                    <span
                      className="
                        rounded-full
                        border border-indigo-100
                        bg-indigo-50
                        px-2.5 py-1
                        text-[10px]
                        font-black
                        text-indigo-700
                      "
                    >
                      +18%
                    </span>
                  </div>

                  <div
                    className="
                      mt-7 flex
                      h-32 items-end
                      gap-2.5
                    "
                  >
                    {activityBars.map(
                      (
                        bar,
                        index,
                      ) => (
                        <motion.div
                          key={index}
                          initial={{
                            height: 0,
                          }}
                          animate={{
                            height:
                              `${bar.height}%`,
                          }}
                          transition={{
                            duration: 0.75,
                            delay:
                              0.55 +
                              index * 0.07,
                          }}
                          className={[
                            "flex-1",
                            "rounded-t-xl",
                            "bg-gradient-to-t",
                            bar.color,
                            "shadow-sm",
                          ].join(" ")}
                        />
                      ),
                    )}
                  </div>
                </div>

                <div
                  className="
                    relative overflow-hidden
                    rounded-3xl
                    bg-gradient-to-br
                    from-slate-950
                    via-indigo-950
                    to-violet-950
                    p-5
                    text-white
                    shadow-xl
                    shadow-indigo-950/20
                  "
                >
                  <div
                    className="
                      absolute
                      -right-14 -top-14
                      h-36 w-36
                      rounded-full
                      bg-cyan-400/20
                      blur-3xl
                    "
                  />

                  <div
                    className="
                      absolute
                      -bottom-16 -left-10
                      h-32 w-32
                      rounded-full
                      bg-fuchsia-500/20
                      blur-3xl
                    "
                  />

                  <div className="relative">
                    <span
                      className="
                        flex h-11 w-11
                        items-center justify-center
                        rounded-2xl
                        border border-white/10
                        bg-white/10
                        text-cyan-300
                      "
                    >
                      <LockKeyhole className="h-5 w-5" />
                    </span>

                    <p className="mt-5 text-lg font-black">
                      Emergency plan ready
                    </p>

                    <p className="mt-2 text-xs leading-5 text-slate-300">
                      Two nominees are verified
                      and your release preferences
                      are configured.
                    </p>

                    <div className="mt-6 h-2.5 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        animate={{
                          width: "84%",
                        }}
                        transition={{
                          duration: 1.1,
                          delay: 0.65,
                        }}
                        className="
                          h-full rounded-full
                          bg-gradient-to-r
                          from-cyan-400
                          via-blue-400
                          to-violet-400
                        "
                      />
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Readiness
                      </span>

                      <span className="text-xs font-black text-white">
                        84%
                      </span>
                    </div>
                  </div>
                </div>
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
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -bottom-7 -left-5
              hidden
              rounded-2xl
              border border-emerald-200/80
              bg-white/90
              p-4
              shadow-xl
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
                  to-teal-500
                  text-white
                  shadow-lg
                  shadow-emerald-500/25
                "
              >
                <ShieldCheck className="h-5 w-5" />
              </span>

              <div>
                <p className="text-xs font-black text-slate-900">
                  Security scan complete
                </p>

                <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                  No suspicious activity found
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [
                0,
                7,
                0,
              ],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              absolute
              -right-4 -top-7
              hidden
              rounded-2xl
              border border-violet-200/80
              bg-white/90
              p-4
              shadow-xl
              backdrop-blur-xl
              sm:block
            "
          >
            <div className="flex items-center gap-3">
              <span
                className="
                  flex h-9 w-9
                  items-center justify-center
                  rounded-xl
                  bg-violet-100
                  text-violet-600
                "
              >
                <Zap className="h-4 w-4" />
              </span>

              <div>
                <p className="text-xs font-black text-slate-900">
                  Document protected
                </p>

                <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                  Insurance Policy.pdf
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function MetricCard({
  icon: Icon,
  value,
  label,
  className,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      transition={{
        duration: 0.24,
      }}
      className={[
        "rounded-2xl",
        "border",
        "p-4",
        "shadow-sm",
        className,
      ].join(" ")}
    >
      <span
        className="
          flex h-9 w-9
          items-center justify-center
          rounded-xl
          bg-white/80
          shadow-sm
        "
      >
        <Icon className="h-4.5 w-4.5" />
      </span>

      <p className="mt-4 text-2xl font-black tracking-tight text-slate-950">
        {value}
      </p>

      <p className="mt-1 text-[11px] font-semibold text-slate-500">
        {label}
      </p>
    </motion.div>
  );
}
import {
  ArrowUpRight,
  BellRing,
  BrainCircuit,
  FileLock2,
  ScanSearch,
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

import { ROUTES } from "../../utils/routePaths";

const features = [
  {
    icon: FileLock2,
    title: "Secure document vault",
    description:
      "Protect identity, financial, legal and property documents in one intelligent digital workspace.",

    wrapper:
      "border-blue-200/80 bg-gradient-to-br from-blue-50 via-white to-cyan-50",

    iconStyle:
      "bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-blue-500/25",

    accent:
      "text-blue-600",

    glow:
      "bg-blue-400/20",
  },

  {
    icon: UsersRound,
    title: "Trusted nominees",
    description:
      "Assign controlled permissions to people you trust without giving immediate access to your private files.",

    wrapper:
      "border-violet-200/80 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50",

    iconStyle:
      "bg-gradient-to-br from-violet-600 to-fuchsia-500 text-white shadow-violet-500/25",

    accent:
      "text-violet-600",

    glow:
      "bg-violet-400/20",
  },

  {
    icon: ShieldAlert,
    title: "Emergency safeguards",
    description:
      "Release selected information only after verification, evidence review and configured waiting periods.",

    wrapper:
      "border-rose-200/80 bg-gradient-to-br from-rose-50 via-white to-orange-50",

    iconStyle:
      "bg-gradient-to-br from-rose-600 to-orange-500 text-white shadow-rose-500/25",

    accent:
      "text-rose-600",

    glow:
      "bg-rose-400/20",
  },

  {
    icon: BrainCircuit,
    title: "AI organisation",
    description:
      "Automatically classify documents, extract important details and generate clear summaries from your files.",

    wrapper:
      "border-indigo-200/80 bg-gradient-to-br from-indigo-50 via-white to-violet-50",

    iconStyle:
      "bg-gradient-to-br from-indigo-600 to-violet-500 text-white shadow-indigo-500/25",

    accent:
      "text-indigo-600",

    glow:
      "bg-indigo-400/20",
  },

  {
    icon: ScanSearch,
    title: "Document intelligence",
    description:
      "Detect missing information, duplicate files, expiry dates and possible risks before they become problems.",

    wrapper:
      "border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50",

    iconStyle:
      "bg-gradient-to-br from-emerald-600 to-teal-500 text-white shadow-emerald-500/25",

    accent:
      "text-emerald-600",

    glow:
      "bg-emerald-400/20",
  },

  {
    icon: BellRing,
    title: "Smart reminders",
    description:
      "Receive meaningful alerts about expiry dates, nominee verification, security events and important activity.",

    wrapper:
      "border-amber-200/80 bg-gradient-to-br from-amber-50 via-white to-yellow-50",

    iconStyle:
      "bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-amber-500/25",

    accent:
      "text-amber-600",

    glow:
      "bg-amber-400/20",
  },
];

export default function FeaturesSection({
  showHeader = true,
}) {
  return (
    <section
      className="
        section-shell
        bg-gradient-to-b
        from-white
        via-slate-50/70
        to-white
        py-22
        sm:py-28
      "
    >
      <div
        className="
          aurora-blob
          -left-32 top-1/4
          h-72 w-72
          bg-violet-300/14
        "
      />

      <div
        className="
          aurora-blob
          -right-32 bottom-10
          h-80 w-80
          bg-cyan-300/14
        "
      />

      <div className="section-container">
        {showHeader && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
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
            className="
              mx-auto
              max-w-3xl
              text-center
            "
          >
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border border-violet-200
                bg-violet-50
                px-4 py-2
                text-xs
                font-black
                text-violet-700
              "
            >
              <WandSparkles className="h-4 w-4" />

              One platform. Complete protection.
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
              Every part of your digital life

              <span className="gradient-text block">
                deserves its own protection.
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
              LastKey combines security,
              intelligence, access control and
              emergency planning without making
              the experience complicated.
            </p>
          </motion.div>
        )}

        <div
          className="
            mt-14 grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {features.map(
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
                    duration: 0.55,
                    delay:
                      index * 0.07,
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
                    "shadow-[0_20px_50px_-34px_rgba(15,23,42,0.45)]",
                    "transition-shadow",
                    "duration-300",
                    "hover:shadow-[0_32px_75px_-34px_rgba(15,23,42,0.42)]",
                    feature.wrapper,
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
                      feature.glow,
                    ].join(" ")}
                  />

                  <div
                    className="
                      absolute
                      inset-x-8 top-0
                      h-px
                      bg-gradient-to-r
                      from-transparent
                      via-slate-400/25
                      to-transparent
                    "
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
                        "shadow-lg",
                        "transition-transform",
                        "duration-300",
                        "group-hover:scale-110",
                        "group-hover:rotate-3",
                        feature.iconStyle,
                      ].join(" ")}
                    >
                      <Icon className="h-6 w-6" />
                    </span>

                    <h3
                      className="
                        mt-7
                        text-xl
                        font-black
                        tracking-tight
                        text-slate-950
                      "
                    >
                      {feature.title}
                    </h3>

                    <p
                      className="
                        mt-3
                        text-sm
                        leading-7
                        text-slate-600
                      "
                    >
                      {feature.description}
                    </p>

                    <Link
                      to={ROUTES.FEATURES}
                      className={[
                        "mt-7",
                        "inline-flex",
                        "items-center",
                        "gap-2",
                        "text-sm",
                        "font-black",
                        "transition-all",
                        "duration-300",
                        "group-hover:gap-3",
                        feature.accent,
                      ].join(" ")}
                    >
                      Explore feature

                      <ArrowUpRight className="h-4 w-4" />
                    </Link>
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
            amount: 0.3,
          }}
          transition={{
            duration: 0.65,
          }}
          className="
            relative mt-14
            overflow-hidden
            rounded-[34px]
            bg-gradient-to-br
            from-slate-950
            via-indigo-950
            to-violet-950
            p-7
            text-white
            shadow-2xl
            shadow-indigo-950/20
            sm:p-9
            lg:grid
            lg:grid-cols-[0.9fr_1.3fr]
            lg:items-center
            lg:gap-10
          "
        >
          <div
            className="
              absolute
              -left-20 -top-20
              h-72 w-72
              rounded-full
              bg-blue-500/20
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-24 right-10
              h-72 w-72
              rounded-full
              bg-fuchsia-500/20
              blur-3xl
            "
          />

          <div className="relative">
            <span
              className="
                flex h-13 w-13
                items-center justify-center
                rounded-2xl
                border border-white/10
                bg-white/10
                text-cyan-300
                backdrop-blur
              "
            >
              <Sparkles className="h-6 w-6" />
            </span>

            <h3
              className="
                mt-6
                max-w-md
                text-3xl
                font-black
                tracking-tight
                sm:text-4xl
              "
            >
              Security should feel powerful,

              <span className="block text-cyan-300">
                not complicated.
              </span>
            </h3>

            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300">
              Every LastKey workflow is
              designed around privacy,
              transparency and controlled
              access from the beginning.
            </p>
          </div>

          <div
            className="
              relative mt-8
              grid gap-4
              sm:grid-cols-2
              lg:mt-0
            "
          >
            {[
              {
                title:
                  "Role-based permissions",
                color:
                  "from-blue-500 to-cyan-400",
              },
              {
                title:
                  "Secure JWT sessions",
                color:
                  "from-violet-500 to-fuchsia-400",
              },
              {
                title:
                  "Verified nominee workflow",
                color:
                  "from-emerald-500 to-teal-400",
              },
              {
                title:
                  "Transparent activity history",
                color:
                  "from-amber-500 to-orange-400",
              },
            ].map(
              ({
                title,
                color,
              }) => (
                <div
                  key={title}
                  className="
                    group/check
                    rounded-2xl
                    border border-white/10
                    bg-white/[0.07]
                    p-4
                    backdrop-blur-xl
                    transition
                    hover:-translate-y-1
                    hover:bg-white/[0.11]
                  "
                >
                  <span
                    className={[
                      "flex",
                      "h-9",
                      "w-9",
                      "items-center",
                      "justify-center",
                      "rounded-xl",
                      "bg-gradient-to-br",
                      color,
                      "text-white",
                      "shadow-lg",
                    ].join(" ")}
                  >
                    <Sparkles className="h-4 w-4" />
                  </span>

                  <p className="mt-4 text-sm font-bold text-slate-100">
                    {title}
                  </p>
                </div>
              ),
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
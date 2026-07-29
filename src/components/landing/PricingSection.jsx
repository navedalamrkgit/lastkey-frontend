import {
  ArrowRight,
  Check,
  Crown,
  Gem,
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
import { ROUTES } from "../../utils/routePaths";

const plans = [
  {
    name: "Essential",
    price: "₹0",
    period: "forever",
    description:
      "For individuals beginning their secure digital legacy journey.",

    icon: ShieldCheck,

    eyebrow:
      "Start securely",

    accent:
      "blue",

    featured: false,

    wrapper:
      "border-blue-200/80 bg-gradient-to-br from-blue-50 via-white to-cyan-50",

    iconStyle:
      "from-blue-600 to-cyan-500 shadow-blue-500/25",

    badgeStyle:
      "border-blue-200 bg-blue-50 text-blue-700",

    checkStyle:
      "bg-blue-100 text-blue-600",

    buttonVariant:
      "blue",

    glow:
      "bg-blue-400/20",

    features: [
      "Up to 10 protected documents",
      "One trusted nominee",
      "Basic expiry reminders",
      "Secure personal dashboard",
      "Account activity history",
    ],
  },

  {
    name: "Secure Plus",
    price: "₹299",
    period: "per month",
    description:
      "For complete personal and family legacy protection.",

    icon: Crown,

    eyebrow:
      "Complete protection",

    accent:
      "violet",

    featured: true,

    wrapper:
      "border-violet-400/30 bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-950 text-white",

    iconStyle:
      "from-violet-500 to-fuchsia-500 shadow-violet-500/35",

    badgeStyle:
      "border-fuchsia-400/20 bg-fuchsia-400/10 text-fuchsia-200",

    checkStyle:
      "bg-violet-400/15 text-violet-300",

    buttonVariant:
      "primary",

    glow:
      "bg-violet-500/25",

    features: [
      "Up to 200 protected documents",
      "Five trusted nominees",
      "Emergency-access workflow",
      "AI document organisation",
      "Advanced security centre",
      "Priority smart reminders",
    ],
  },

  {
    name: "Family",
    price: "₹599",
    period: "per month",
    description:
      "For families protecting multiple profiles and shared information.",

    icon: UsersRound,

    eyebrow:
      "Protect together",

    accent:
      "emerald",

    featured: false,

    wrapper:
      "border-emerald-200/80 bg-gradient-to-br from-emerald-50 via-white to-teal-50",

    iconStyle:
      "from-emerald-600 to-teal-500 shadow-emerald-500/25",

    badgeStyle:
      "border-emerald-200 bg-emerald-50 text-emerald-700",

    checkStyle:
      "bg-emerald-100 text-emerald-600",

    buttonVariant:
      "success",

    glow:
      "bg-emerald-400/20",

    features: [
      "Up to five family profiles",
      "Shared family administration",
      "Advanced access permissions",
      "Expanded protected storage",
      "Family emergency planning",
      "Priority support",
    ],
  },
];

export default function PricingSection({
  fullPage = false,
}) {
  return (
    <section
      className={[
        "section-shell",
        "overflow-hidden",
        fullPage
          ? "bg-slate-50 py-18 sm:py-24"
          : "bg-gradient-to-b from-white via-indigo-50/30 to-white py-22 sm:py-28",
      ].join(" ")}
    >
      <div
        className="
          soft-grid
          absolute inset-0
          opacity-40
        "
      />

      <div
        className="
          aurora-blob
          -left-32 top-0
          h-80 w-80
          bg-blue-300/16
        "
      />

      <div
        className="
          aurora-blob
          -right-32 bottom-0
          h-96 w-96
          bg-violet-300/18
        "
      />

      <div className="section-container">
        {!fullPage && (
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
            className="
              mx-auto
              max-w-3xl
              text-center
            "
          >
            <div
              className="
                inline-flex
                items-center gap-2
                rounded-full
                border border-indigo-200
                bg-indigo-50
                px-4 py-2
                text-xs
                font-black
                text-indigo-700
              "
            >
              <Gem className="h-4 w-4" />

              Simple and flexible pricing
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
              Start free and upgrade

              <span className="gradient-text block">
                as your vault grows.
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
              Choose the storage,
              nominee-management and
              emergency-protection level
              that fits your needs today.
            </p>
          </motion.div>
        )}

        <div
          className={[
            "relative",
            "grid",
            "gap-7",
            "lg:grid-cols-3",
            fullPage
              ? ""
              : "mt-16",
          ].join(" ")}
        >
          {plans.map(
            (
              plan,
              index,
            ) => {
              const Icon =
                plan.icon;

              return (
                <motion.article
                  key={plan.name}
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
                    amount: 0.15,
                  }}
                  transition={{
                    duration: 0.58,
                    delay:
                      index * 0.1,
                  }}
                  whileHover={{
                    y:
                      plan.featured
                        ? -12
                        : -8,
                  }}
                  className={[
                    "group",
                    "relative",
                    "isolate",
                    "overflow-hidden",
                    "rounded-[34px]",
                    "border",
                    "p-7",
                    "transition-shadow",
                    "duration-300",
                    plan.featured
                      ? "shadow-[0_35px_90px_-35px_rgba(76,29,149,0.75)] lg:-translate-y-6"
                      : "shadow-[0_24px_60px_-38px_rgba(15,23,42,0.45)] hover:shadow-[0_34px_80px_-38px_rgba(15,23,42,0.45)]",
                    plan.wrapper,
                  ].join(" ")}
                >
                  <div
                    className={[
                      "absolute",
                      "-right-16",
                      "-top-16",
                      "h-48",
                      "w-48",
                      "rounded-full",
                      "blur-3xl",
                      "transition-transform",
                      "duration-500",
                      "group-hover:scale-125",
                      plan.glow,
                    ].join(" ")}
                  />

                  {plan.featured && (
                    <>
                      <div
                        className="
                          absolute inset-0
                          bg-[linear-gradient(120deg,transparent_20%,rgba(255,255,255,0.08)_40%,transparent_60%)]
                          bg-[length:220%_100%]
                          gradient-shift
                        "
                      />

                      <span
                        className="
                          absolute
                          right-5 top-5
                          inline-flex
                          items-center gap-1.5
                          rounded-full
                          border border-fuchsia-400/20
                          bg-fuchsia-400/10
                          px-3 py-1.5
                          text-[10px]
                          font-black
                          uppercase
                          tracking-[0.14em]
                          text-fuchsia-200
                          backdrop-blur
                        "
                      >
                        <Sparkles className="h-3.5 w-3.5" />

                        Most popular
                      </span>
                    </>
                  )}

                  <div className="relative">
                    <div className="flex items-center justify-between gap-4">
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
                          plan.iconStyle,
                        ].join(" ")}
                      >
                        <Icon className="h-6 w-6" />
                      </span>

                      {!plan.featured && (
                        <span
                          className={[
                            "rounded-full",
                            "border",
                            "px-3",
                            "py-1.5",
                            "text-[10px]",
                            "font-black",
                            "uppercase",
                            "tracking-[0.13em]",
                            plan.badgeStyle,
                          ].join(" ")}
                        >
                          {plan.eyebrow}
                        </span>
                      )}
                    </div>

                    <h3
                      className={[
                        "mt-7",
                        "text-2xl",
                        "font-black",
                        "tracking-tight",
                        plan.featured
                          ? "text-white"
                          : "text-slate-950",
                      ].join(" ")}
                    >
                      {plan.name}
                    </h3>

                    <p
                      className={[
                        "mt-3",
                        "min-h-14",
                        "text-sm",
                        "leading-7",
                        plan.featured
                          ? "text-slate-300"
                          : "text-slate-600",
                      ].join(" ")}
                    >
                      {plan.description}
                    </p>

                    <div className="mt-8 flex items-end gap-2">
                      <span
                        className={[
                          "text-5xl",
                          "font-black",
                          "tracking-[-0.05em]",
                          plan.featured
                            ? "text-white"
                            : "text-slate-950",
                        ].join(" ")}
                      >
                        {plan.price}
                      </span>

                      <span
                        className={[
                          "pb-1.5",
                          "text-xs",
                          "font-semibold",
                          plan.featured
                            ? "text-slate-400"
                            : "text-slate-500",
                        ].join(" ")}
                      >
                        {plan.period}
                      </span>
                    </div>

                    <div
                      className={[
                        "my-8",
                        "h-px",
                        plan.featured
                          ? "bg-gradient-to-r from-transparent via-white/20 to-transparent"
                          : "bg-gradient-to-r from-transparent via-slate-300 to-transparent",
                      ].join(" ")}
                    />

                    <ul className="space-y-4">
                      {plan.features.map(
                        (
                          feature,
                          featureIndex,
                        ) => (
                          <motion.li
                            key={feature}
                            initial={{
                              opacity: 0,
                              x: -10,
                            }}
                            whileInView={{
                              opacity: 1,
                              x: 0,
                            }}
                            viewport={{
                              once: true,
                            }}
                            transition={{
                              duration: 0.35,
                              delay:
                                0.25 +
                                featureIndex *
                                  0.05,
                            }}
                            className="flex items-start gap-3"
                          >
                            <span
                              className={[
                                "mt-0.5",
                                "flex",
                                "h-5",
                                "w-5",
                                "shrink-0",
                                "items-center",
                                "justify-center",
                                "rounded-full",
                                plan.checkStyle,
                              ].join(" ")}
                            >
                              <Check className="h-3 w-3" />
                            </span>

                            <span
                              className={[
                                "text-sm",
                                "leading-6",
                                plan.featured
                                  ? "text-slate-300"
                                  : "text-slate-600",
                              ].join(" ")}
                            >
                              {feature}
                            </span>
                          </motion.li>
                        ),
                      )}
                    </ul>

                    <Link
                      to={ROUTES.REGISTER}
                      className="mt-9 block"
                    >
                      <Button
                        fullWidth
                        size="xl"
                        variant={
                          plan.buttonVariant
                        }
                        rightIcon={ArrowRight}
                      >
                        {plan.name ===
                        "Essential"
                          ? "Start free"
                          : `Choose ${plan.name}`}
                      </Button>
                    </Link>

                    <p
                      className={[
                        "mt-4",
                        "text-center",
                        "text-[11px]",
                        "font-semibold",
                        plan.featured
                          ? "text-slate-500"
                          : "text-slate-400",
                      ].join(" ")}
                    >
                      No hidden setup fees
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
            duration: 0.55,
          }}
          className="
            mx-auto mt-12
            flex max-w-3xl
            flex-col
            items-center
            justify-between
            gap-5
            rounded-[28px]
            border border-indigo-200/70
            bg-white/75
            p-5
            shadow-[0_20px_50px_-35px_rgba(79,70,229,0.45)]
            backdrop-blur-xl
            sm:flex-row
            sm:p-6
          "
        >
          <div className="flex items-center gap-4">
            <span
              className="
                flex h-12 w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-amber-500
                to-orange-500
                text-white
                shadow-lg
                shadow-amber-500/25
              "
            >
              <Zap className="h-5 w-5" />
            </span>

            <div>
              <p className="text-sm font-black text-slate-950">
                Not sure which plan fits?
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Begin free and upgrade only when you need more protection.
              </p>
            </div>
          </div>

          <Link
            to={ROUTES.REGISTER}
            className="shrink-0"
          >
            <Button
              variant="secondary"
              rightIcon={ArrowRight}
            >
              Create free vault
            </Button>
          </Link>
        </motion.div>

        <p className="mt-7 text-center text-xs text-slate-400">
          Pricing is currently shown for
          product demonstration and may be
          updated before public launch.
        </p>
      </div>
    </section>
  );
}
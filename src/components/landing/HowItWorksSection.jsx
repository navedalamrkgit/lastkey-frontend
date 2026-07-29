import {
  CheckCircle2,
  FileUp,
  KeyRound,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: FileUp,
    title: "Build your secure vault",
    description:
      "Upload identity, financial, property, insurance and legal documents into one protected workspace.",
    accent:
      "from-blue-600 to-cyan-500",
    surface:
      "border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50",
    numberStyle:
      "text-blue-600",
    glow:
      "bg-blue-400/20",
  },
  {
    number: "02",
    icon: UserRoundCheck,
    title: "Add trusted nominees",
    description:
      "Choose the people you trust and define exactly which information they may receive during an emergency.",
    accent:
      "from-violet-600 to-fuchsia-500",
    surface:
      "border-violet-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50",
    numberStyle:
      "text-violet-600",
    glow:
      "bg-violet-400/20",
  },
  {
    number: "03",
    icon: KeyRound,
    title: "Configure access rules",
    description:
      "Set verification requirements, waiting periods and document-level permissions for every nominee.",
    accent:
      "from-amber-500 to-orange-500",
    surface:
      "border-amber-200 bg-gradient-to-br from-amber-50 via-white to-orange-50",
    numberStyle:
      "text-amber-600",
    glow:
      "bg-amber-400/20",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Stay protected",
    description:
      "LastKey helps you monitor security, document status, nominee readiness and important account activity.",
    accent:
      "from-emerald-600 to-teal-500",
    surface:
      "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50",
    numberStyle:
      "text-emerald-600",
    glow:
      "bg-emerald-400/20",
  },
];

const protectionItems = [
  "Controlled document permissions",
  "Verified nominee identities",
  "Configurable waiting periods",
  "Transparent release timeline",
];

export default function HowItWorksSection() {
  return (
    <section
      className="
        section-shell
        bg-gradient-to-b
        from-white
        via-slate-50
        to-white
        py-24
        sm:py-28
      "
    >
      <div className="soft-grid absolute inset-0 opacity-35" />

      <div
        className="
          aurora-blob
          -left-36 top-16
          h-80 w-80
          bg-blue-300/15
        "
      />

      <div
        className="
          aurora-blob
          -right-36 bottom-12
          h-80 w-80
          bg-rose-300/15
        "
      />

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
              items-center
              gap-2
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

            Simple setup. Powerful protection.
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
            Protect your digital legacy

            <span className="gradient-text block">
              in four clear steps.
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-2xl
              text-base
              leading-8
              text-slate-600
              sm:text-lg
            "
          >
            LastKey keeps complex security and emergency
            workflows understandable without reducing the
            level of protection.
          </p>
        </motion.div>

        <div
          className="
            relative
            mt-16
            grid
            gap-6
            md:grid-cols-2
            xl:grid-cols-4
          "
        >
          <div
            className="
              absolute
              left-[10%]
              right-[10%]
              top-16
              hidden
              h-px
              bg-gradient-to-r
              from-blue-300
              via-violet-300
              via-amber-300
              to-emerald-300
              xl:block
            "
          />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.title}
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
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.09,
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
                  "p-6",
                  "shadow-[0_22px_55px_-36px_rgba(15,23,42,0.42)]",
                  "transition-shadow",
                  "duration-300",
                  "hover:shadow-[0_34px_75px_-36px_rgba(15,23,42,0.46)]",
                  step.surface,
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
                    step.glow,
                  ].join(" ")}
                />

                <div className="relative">
                  <div className="flex items-start justify-between">
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
                        step.accent,
                      ].join(" ")}
                    >
                      <Icon className="h-6 w-6" />
                    </span>

                    <span
                      className={[
                        "text-4xl",
                        "font-black",
                        "tracking-[-0.06em]",
                        "opacity-30",
                        step.numberStyle,
                      ].join(" ")}
                    >
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-black text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
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
            relative
            mt-14
            overflow-hidden
            rounded-[34px]
            border border-indigo-200/70
            bg-gradient-to-r
            from-indigo-50
            via-white
            to-cyan-50
            p-7
            shadow-[0_25px_65px_-40px_rgba(79,70,229,0.5)]
            sm:p-9
            lg:flex
            lg:items-center
            lg:justify-between
            lg:gap-10
          "
        >
          <div
            className="
              absolute
              -left-20 -top-20
              h-52 w-52
              rounded-full
              bg-violet-300/20
              blur-3xl
            "
          />

          <div className="relative max-w-xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-indigo-600">
              Protection without confusion
            </p>

            <h3 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
              You remain in control at every stage.
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              Documents are not automatically shared. Every
              release follows the access rules and safeguards
              configured by the vault owner.
            </p>
          </div>

          <div
            className="
              relative
              mt-7
              grid
              gap-3
              sm:grid-cols-2
              lg:mt-0
              lg:min-w-[440px]
            "
          >
            {protectionItems.map((item) => (
              <div
                key={item}
                className="
                  flex
                  items-center
                  gap-3
                  rounded-2xl
                  border border-white
                  bg-white/75
                  px-4 py-3
                  text-sm
                  font-bold
                  text-slate-700
                  shadow-sm
                  backdrop-blur-xl
                "
              >
                <span
                  className="
                    flex
                    h-7 w-7
                    shrink-0
                    items-center
                    justify-center
                    rounded-lg
                    bg-emerald-100
                    text-emerald-600
                  "
                >
                  <CheckCircle2 className="h-4 w-4" />
                </span>

                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
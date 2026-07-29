import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileCheck2,
  HeartHandshake,
  LockKeyhole,
  ShieldAlert,
  Siren,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Button from "../ui/Button";
import { ROUTES } from "../../utils/routePaths";

const timeline = [
  {
    icon: Siren,
    title: "Emergency request submitted",
    description:
      "A nominee starts a controlled access request.",
    color:
      "from-rose-600 to-orange-500",
    state:
      "Completed",
  },
  {
    icon: UserCheck,
    title: "Identity and evidence verified",
    description:
      "Required identity and supporting evidence are reviewed.",
    color:
      "from-violet-600 to-fuchsia-500",
    state:
      "Completed",
  },
  {
    icon: Clock3,
    title: "Waiting period activated",
    description:
      "Your configured safeguard period prevents immediate release.",
    color:
      "from-amber-500 to-orange-500",
    state:
      "Active",
  },
  {
    icon: FileCheck2,
    title: "Approved documents released",
    description:
      "Only permitted files become available to the nominee.",
    color:
      "from-emerald-600 to-teal-500",
    state:
      "Protected",
  },
];

export default function EmergencySection() {
  return (
    <section
      className="
        section-shell
        overflow-hidden
        bg-gradient-to-br
        from-rose-50
        via-orange-50/60
        to-amber-50
        py-24
        sm:py-28
      "
    >
      <div className="soft-grid absolute inset-0 opacity-35" />

      <div
        className="
          aurora-blob
          -left-36 top-8
          h-96 w-96
          bg-rose-300/22
          float-slow
        "
      />

      <div
        className="
          aurora-blob
          -right-36 bottom-0
          h-96 w-96
          bg-amber-300/25
          float-medium
        "
      />

      <div
        className="
          section-container
          grid
          items-center
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
          }}
        >
          <div
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border border-rose-200
              bg-white/75
              px-4 py-2
              text-xs
              font-black
              text-rose-700
              shadow-sm
              backdrop-blur-xl
            "
          >
            <ShieldAlert className="h-4 w-4" />

            Protection when your family needs it most
          </div>

          <h2
            className="
              text-balance
              mt-7
              max-w-2xl
              text-4xl
              font-black
              leading-[1.03]
              tracking-[-0.045em]
              text-slate-950
              sm:text-5xl
              lg:text-6xl
            "
          >
            Emergency access without

            <span
              className="
                mt-2
                block
                bg-gradient-to-r
                from-rose-600
                via-orange-500
                to-amber-500
                bg-clip-text
                text-transparent
              "
            >
              sacrificing your privacy.
            </span>
          </h2>

          <p
            className="
              mt-6
              max-w-xl
              text-base
              leading-8
              text-slate-600
              sm:text-lg
            "
          >
            Give trusted people a clear way to request
            essential information while verification,
            evidence checks and waiting periods protect
            against unauthorised access.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: LockKeyhole,
                title: "No immediate access",
                text: "Nominees cannot open private files before approval.",
                style:
                  "border-rose-200 bg-rose-50 text-rose-600",
              },
              {
                icon: HeartHandshake,
                title: "Your rules remain active",
                text: "Only the documents and permissions you selected apply.",
                style:
                  "border-amber-200 bg-amber-50 text-amber-600",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  whileHover={{
                    y: -5,
                  }}
                  className="
                    rounded-2xl
                    border border-white
                    bg-white/75
                    p-5
                    shadow-[0_18px_45px_-32px_rgba(15,23,42,0.4)]
                    backdrop-blur-xl
                  "
                >
                  <span
                    className={[
                      "flex",
                      "h-11",
                      "w-11",
                      "items-center",
                      "justify-center",
                      "rounded-2xl",
                      "border",
                      item.style,
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <h3 className="mt-4 text-sm font-black text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs leading-6 text-slate-600">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <Link
            to={ROUTES.REGISTER}
            className="mt-9 inline-block"
          >
            <Button
              variant="danger"
              size="xl"
              rightIcon={ArrowRight}
            >
              Create your protection plan
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.95,
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
          }}
          className="relative"
        >
          <div
            className="
              absolute
              -inset-8
              rounded-[44px]
              bg-gradient-to-br
              from-rose-400/25
              via-orange-400/20
              to-amber-400/20
              blur-3xl
            "
          />

          <div
            className="
              relative
              overflow-hidden
              rounded-[36px]
              border border-white
              bg-white/80
              p-4
              shadow-[0_35px_90px_-40px_rgba(159,18,57,0.45)]
              backdrop-blur-2xl
              sm:p-6
            "
          >
            <div
              className="
                flex
                items-center
                justify-between
                gap-4
                rounded-[24px]
                bg-gradient-to-r
                from-slate-950
                via-rose-950
                to-orange-950
                px-5 py-5
                text-white
              "
            >
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-rose-300">
                  Emergency workflow
                </p>

                <h3 className="mt-2 text-xl font-black">
                  Protected release timeline
                </h3>
              </div>

              <span
                className="
                  flex
                  h-12 w-12
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-rose-500
                  to-orange-500
                  text-white
                  shadow-lg
                  shadow-rose-500/30
                "
              >
                <Siren className="h-6 w-6" />
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {timeline.map((step, index) => {
                const Icon = step.icon;
                const isLast =
                  index === timeline.length - 1;

                return (
                  <motion.div
                    key={step.title}
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.1,
                    }}
                    className="relative flex gap-4"
                  >
                    {!isLast && (
                      <div
                        className="
                          absolute
                          left-[23px]
                          top-12
                          h-[calc(100%+16px)]
                          w-px
                          bg-gradient-to-b
                          from-slate-300
                          to-transparent
                        "
                      />
                    )}

                    <span
                      className={[
                        "relative",
                        "z-10",
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
                        step.color,
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <div
                      className="
                        flex-1
                        rounded-2xl
                        border border-slate-200
                        bg-white
                        p-4
                        shadow-sm
                      "
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-sm font-black text-slate-950">
                            {step.title}
                          </h4>

                          <p className="mt-1.5 text-xs leading-5 text-slate-500">
                            {step.description}
                          </p>
                        </div>

                        <span
                          className="
                            shrink-0
                            rounded-full
                            bg-slate-100
                            px-2.5 py-1
                            text-[9px]
                            font-black
                            uppercase
                            tracking-wider
                            text-slate-600
                          "
                        >
                          {step.state}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div
              className="
                mt-6
                flex
                items-center
                gap-3
                rounded-2xl
                border border-emerald-200
                bg-emerald-50
                p-4
              "
            >
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />

              <p className="text-xs font-bold leading-5 text-emerald-800">
                Documents remain protected until every required
                verification and waiting-period condition is satisfied.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
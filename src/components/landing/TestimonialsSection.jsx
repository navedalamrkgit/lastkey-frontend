import {
  BriefcaseBusiness,
  Heart,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "LastKey helped me organise important policies, property papers and nominee information without making the process feel technical.",
    name: "Ananya Sharma",
    role: "Working professional",
    initials: "AS",
    accent:
      "from-blue-600 to-cyan-500",
    card:
      "border-blue-200 bg-gradient-to-br from-blue-50 via-white to-cyan-50",
    icon: BriefcaseBusiness,
  },
  {
    quote:
      "The controlled nominee workflow is the feature I value most. My family knows where important information is, but my privacy stays protected.",
    name: "Rohan Mehta",
    role: "Family vault owner",
    initials: "RM",
    accent:
      "from-violet-600 to-fuchsia-500",
    card:
      "border-violet-200 bg-gradient-to-br from-violet-50 via-white to-fuchsia-50",
    icon: UsersRound,
  },
  {
    quote:
      "Emergency planning usually feels uncomfortable. LastKey turns it into a clear, secure and responsible process.",
    name: "Priya Verma",
    role: "Independent consultant",
    initials: "PV",
    accent:
      "from-rose-600 to-orange-500",
    card:
      "border-rose-200 bg-gradient-to-br from-rose-50 via-white to-orange-50",
    icon: Heart,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      className="
        section-shell
        bg-white
        py-24
        sm:py-28
      "
    >
      <div
        className="
          aurora-blob
          -left-32 top-12
          h-80 w-80
          bg-cyan-300/14
        "
      />

      <div
        className="
          aurora-blob
          -right-36 bottom-0
          h-96 w-96
          bg-violet-300/15
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
              border border-emerald-200
              bg-emerald-50
              px-4 py-2
              text-xs
              font-black
              text-emerald-700
            "
          >
            <ShieldCheck className="h-4 w-4" />

            Designed around real family needs
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
            Protection that gives people

            <span className="gradient-text block">
              clarity and confidence.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
            LastKey is designed to make document management,
            nominee planning and emergency preparation easier
            to understand.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const Icon = testimonial.icon;

            return (
              <motion.article
                key={testimonial.name}
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
                  delay: index * 0.1,
                }}
                whileHover={{
                  y: -9,
                }}
                className={[
                  "group",
                  "relative",
                  "overflow-hidden",
                  "rounded-[30px]",
                  "border",
                  "p-7",
                  "shadow-[0_24px_60px_-38px_rgba(15,23,42,0.45)]",
                  testimonial.card,
                ].join(" ")}
              >
                <Quote
                  className="
                    absolute
                    right-6 top-6
                    h-14 w-14
                    text-slate-900/[0.05]
                  "
                />

                <div className="relative">
                  <div className="flex items-center justify-between">
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
                        "shadow-lg",
                        "transition-transform",
                        "duration-300",
                        "group-hover:rotate-3",
                        "group-hover:scale-110",
                        testimonial.accent,
                      ].join(" ")}
                    >
                      <Icon className="h-5 w-5" />
                    </span>

                    <div className="flex gap-1 text-amber-400">
                      {Array.from({
                        length: 5,
                      }).map((_, starIndex) => (
                        <Star
                          key={starIndex}
                          className="h-4 w-4 fill-current"
                        />
                      ))}
                    </div>
                  </div>

                  <p className="mt-7 text-base font-semibold leading-8 text-slate-700">
                    “{testimonial.quote}”
                  </p>

                  <div className="mt-8 flex items-center gap-3 border-t border-slate-200/80 pt-5">
                    <span
                      className={[
                        "flex",
                        "h-11",
                        "w-11",
                        "items-center",
                        "justify-center",
                        "rounded-full",
                        "bg-gradient-to-br",
                        "text-xs",
                        "font-black",
                        "text-white",
                        testimonial.accent,
                      ].join(" ")}
                    >
                      {testimonial.initials}
                    </span>

                    <div>
                      <p className="text-sm font-black text-slate-950">
                        {testimonial.name}
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {[
            "Privacy focused",
            "Family ready",
            "Easy to organise",
            "Secure by design",
          ].map((item, index) => (
            <motion.span
              key={item}
              initial={{
                opacity: 0,
                scale: 0.9,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.07,
              }}
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border border-slate-200
                bg-slate-50
                px-4 py-2
                text-xs
                font-bold
                text-slate-600
              "
            >
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />

              {item}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
import {
  ArrowRight,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Button from "../ui/Button";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../utils/routePaths";

export default function CTASection() {
  const {
    isAuthenticated,
  } = useAuth();

  return (
    <section className="section-shell bg-white px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
      <motion.div
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
          amount: 0.25,
        }}
        transition={{
          duration: 0.7,
        }}
        className="
          relative
          mx-auto
          max-w-[1380px]
          overflow-hidden
          rounded-[40px]
          bg-gradient-to-br
          from-slate-950
          via-indigo-950
          to-violet-950
          px-6 py-16
          text-white
          shadow-[0_40px_110px_-45px_rgba(49,46,129,0.75)]
          sm:px-10
          lg:px-16
          lg:py-20
        "
      >
        <div className="noise-overlay opacity-[0.05]" />
        <div className="landing-grid-dark absolute inset-0 opacity-50" />

        <div
          className="
            aurora-blob
            -left-32 -top-32
            h-96 w-96
            bg-blue-500/30
            float-slow
          "
        />

        <div
          className="
            aurora-blob
            -right-24 -bottom-28
            h-96 w-96
            bg-fuchsia-500/30
            float-medium
          "
        />

        <div
          className="
            aurora-blob
            left-[45%] top-1/3
            h-72 w-72
            bg-cyan-400/15
            pulse-glow
          "
        />

        <div
          className="
            relative
            grid
            items-center
            gap-12
            lg:grid-cols-[1fr_auto]
          "
        >
          <div className="max-w-3xl">
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border border-white/10
                bg-white/10
                px-4 py-2
                text-xs
                font-black
                text-cyan-200
                backdrop-blur-xl
              "
            >
              <Sparkles className="h-4 w-4" />

              Start building your digital safety net
            </div>

            <h2
              className="
                text-balance
                mt-6
                text-4xl
                font-black
                leading-[1.02]
                tracking-[-0.05em]
                sm:text-5xl
                lg:text-6xl
              "
            >
              Your important information deserves more than

              <span
                className="
                  mt-2 block
                  bg-gradient-to-r
                  from-cyan-300
                  via-violet-300
                  to-fuchsia-300
                  bg-clip-text
                  text-transparent
                "
              >
                a folder and a password.
              </span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Create your secure LastKey vault, organise
              essential documents and prepare trusted access
              before it becomes urgent.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              {[
                "Start free",
                "No setup fee",
                "Upgrade anytime",
              ].map((item) => (
                <span
                  key={item}
                  className="
                    inline-flex
                    items-center
                    gap-2
                    text-sm
                    font-bold
                    text-slate-200
                  "
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="relative lg:min-w-[300px]">
            <div
              className="
                absolute
                -inset-6
                rounded-[34px]
                bg-gradient-to-br
                from-blue-500/30
                to-fuchsia-500/30
                blur-2xl
              "
            />

            <div
              className="
                relative
                rounded-[30px]
                border border-white/10
                bg-white/[0.08]
                p-6
                backdrop-blur-2xl
              "
            >
              <span
                className="
                  flex
                  h-14 w-14
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
                <KeyRound className="h-6 w-6" />
              </span>

              <p className="mt-5 text-xl font-black">
                Ready to protect your legacy?
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                Your secure vault can be ready in just a few
                minutes.
              </p>

              <Link
                to={
                  isAuthenticated
                    ? ROUTES.DASHBOARD
                    : ROUTES.REGISTER
                }
                className="mt-6 block"
              >
                <Button
                  fullWidth
                  size="xl"
                  rightIcon={ArrowRight}
                >
                  {isAuthenticated
                    ? "Open dashboard"
                    : "Create free vault"}
                </Button>
              </Link>

              <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-400">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />

                Secure by design
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
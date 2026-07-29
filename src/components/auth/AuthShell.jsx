import {
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import Logo from "../branding/Logo";
import { ROUTES } from "../../utils/routePaths";

const securityFeatures = [
  {
    icon: LockKeyhole,
    title: "Encrypted digital vault",
    description:
      "Keep documents, credentials and sensitive records protected in one secure place.",
  },
  {
    icon: Fingerprint,
    title: "Controlled nominee access",
    description:
      "Choose exactly who can access selected information and under which conditions.",
  },
  {
    icon: ShieldCheck,
    title: "Protected emergency release",
    description:
      "Assets remain locked until identity, evidence and configured policies are verified.",
  },
];

const trustItems = [
  "Encrypted communication",
  "Secure session protection",
  "Auditable access workflow",
];

export default function AuthShell({
  title,
  description,
  eyebrow = "Secure access",
  children,
  footer,
}) {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[minmax(0,1.05fr)_minmax(540px,0.95fr)]">
        {/* Premium left hero panel */}
        <section className="relative hidden min-h-screen overflow-hidden bg-slate-950 lg:flex lg:flex-col lg:justify-between">
          {/* Background layers */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.26),transparent_34%),radial-gradient(circle_at_82%_18%,rgba(139,92,246,0.22),transparent_30%),radial-gradient(circle_at_55%_85%,rgba(14,165,233,0.16),transparent_35%),linear-gradient(145deg,#020617_0%,#0f172a_45%,#111827_100%)]" />

            <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
            <div className="absolute right-[-8rem] top-[-6rem] h-[30rem] w-[30rem] rounded-full bg-violet-500/15 blur-[130px]" />
            <div className="absolute bottom-[-12rem] left-[28%] h-[32rem] w-[32rem] rounded-full bg-cyan-500/10 blur-[140px]" />

            <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:64px_64px]" />

            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/70 to-transparent" />
          </div>

          {/* Decorative floating elements */}
          <div className="pointer-events-none absolute right-16 top-28 h-24 w-24 rotate-12 rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl">
            <div className="flex h-full items-center justify-center">
              <KeyRound className="h-9 w-9 text-blue-300/80" />
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-28 right-24 h-16 w-16 -rotate-12 rounded-2xl border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-xl">
            <div className="flex h-full items-center justify-center">
              <ShieldCheck className="h-7 w-7 text-violet-300/80" />
            </div>
          </div>

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between px-10 pt-9 xl:px-14 xl:pt-11">
            <Logo variant="light" showTagline />

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-400/10 px-3.5 py-2 text-xs font-bold text-emerald-200 backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Vault protection active
            </div>
          </div>

          {/* Main hero content */}
          <div className="relative z-10 px-10 py-10 xl:px-14">
            <div className="max-w-[42rem]">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-xs font-bold text-blue-100 shadow-lg shadow-blue-950/20 backdrop-blur-xl">
                <Sparkles className="h-4 w-4 text-blue-300" />
                Built for your digital future
              </div>

              <h2 className="mt-7 max-w-2xl text-[2.7rem] font-black leading-[1.08] tracking-[-0.04em] text-white xl:text-[3.5rem]">
                Keep what matters
                <span className="block bg-gradient-to-r from-blue-300 via-cyan-200 to-violet-300 bg-clip-text text-transparent">
                  secure and accessible.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 xl:text-lg">
                Protect your important documents, appoint trusted nominees and
                prepare a controlled digital legacy for the people who matter
                most.
              </p>

              <div className="mt-9 grid gap-3">
                {securityFeatures.map(
                  ({
                    icon: Icon,
                    title: featureTitle,
                    description: featureDescription,
                  }) => (
                    <div
                      key={featureTitle}
                      className="group flex items-start gap-4 rounded-[1.35rem] border border-white/10 bg-white/[0.055] p-4 shadow-[0_18px_45px_-28px_rgba(0,0,0,0.9)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-blue-300/25 hover:bg-white/[0.08]"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-300/15 bg-gradient-to-br from-blue-400/20 to-violet-400/10 text-blue-200 shadow-inner shadow-white/5">
                        <Icon className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-extrabold text-white">
                          {featureTitle}
                        </h3>

                        <p className="mt-1 text-sm leading-6 text-slate-400">
                          {featureDescription}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="relative z-10 flex items-center justify-between border-t border-white/10 px-10 py-6 text-xs text-slate-400 xl:px-14">
            <span>
              © {new Date().getFullYear()} LastKey. Secure by design.
            </span>

            <div className="flex items-center gap-2 font-semibold text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              Security-first architecture
            </div>
          </div>
        </section>

        {/* Form section */}
        <section className="relative flex min-h-screen flex-col overflow-hidden bg-white">
          {/* Mobile background decoration */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_45%),radial-gradient(circle_at_top_left,rgba(14,165,233,0.10),transparent_42%)] lg:hidden" />

          {/* Desktop subtle decoration */}
          <div className="pointer-events-none absolute right-[-8rem] top-[-8rem] hidden h-80 w-80 rounded-full bg-indigo-100/70 blur-3xl lg:block" />
          <div className="pointer-events-none absolute bottom-[-10rem] left-[-8rem] hidden h-80 w-80 rounded-full bg-blue-100/60 blur-3xl lg:block" />

          {/* Mobile header */}
          <div className="relative z-10 flex items-center justify-between border-b border-slate-200/70 bg-white/80 px-5 py-4 backdrop-blur-xl sm:px-8 lg:hidden">
            <Logo />

            <Link
              to={ROUTES.HOME}
              className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-600 transition hover:text-blue-600"
            >
              Home
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Form container */}
          <div className="relative z-10 flex flex-1 items-center justify-center px-5 py-10 sm:px-8 lg:px-12 xl:px-20">
            <div className="page-enter w-full max-w-[31rem]">
              <div className="mb-8 hidden lg:block">
                <Link
                  to={ROUTES.HOME}
                  className="group inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-blue-600"
                >
                  <span className="transition-transform group-hover:-translate-x-1">
                    ←
                  </span>
                  Back to LastKey
                </Link>
              </div>

              <div className="rounded-[2rem] border border-slate-200/80 bg-white/95 p-1 shadow-[0_35px_90px_-45px_rgba(15,23,42,0.55)] backdrop-blur-xl sm:p-2 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                <div className="p-5 sm:p-7 lg:p-0">
                  {/* Heading */}
                  <div className="mb-8">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-3.5 py-2 text-xs font-extrabold text-blue-700 shadow-sm">
                      <ShieldCheck className="h-4 w-4" />
                      {eyebrow}
                    </div>

                    <h1 className="text-3xl font-black leading-tight tracking-[-0.035em] text-slate-950 sm:text-[2.55rem]">
                      {title}
                    </h1>

                    <p className="mt-3 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
                      {description}
                    </p>
                  </div>

                  {/* Page-specific form */}
                  {children}

                  {/* Shared trust panel */}
                  <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80">
                    <div className="flex items-start gap-3 border-b border-slate-200 px-4 py-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                        <BadgeCheck className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="text-sm font-extrabold text-slate-900">
                          Protected LastKey session
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          Your sign-in activity is handled through secure
                          authentication and encrypted communication.
                        </p>
                      </div>
                    </div>

                    <div className="grid gap-2 px-4 py-3 sm:grid-cols-3">
                      {trustItems.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2 text-[11px] font-semibold text-slate-600"
                        >
                          <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-600" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {footer && (
                    <div className="mt-7 border-t border-slate-200 pt-6">
                      {footer}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="relative z-10 border-t border-slate-200/80 bg-white/80 px-5 py-4 text-center text-[11px] font-medium text-slate-400 backdrop-blur-xl sm:px-8">
            LastKey uses secure authentication and encrypted communication to
            help protect your account.
          </div>
        </section>
      </div>
    </main>
  );
}
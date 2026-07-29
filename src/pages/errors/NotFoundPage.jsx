import {
  ArrowLeft,
  Compass,
  Home,
  KeyRound,
  LockKeyhole,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { ROUTES } from "../../utils/routePaths";

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute left-[-8rem] top-[-8rem] h-[26rem] w-[26rem] rounded-full bg-violet-600/20 blur-3xl" />

        <div className="absolute right-[-8rem] top-[10rem] h-[24rem] w-[24rem] rounded-full bg-cyan-500/20 blur-3xl" />

        <div className="absolute bottom-[-10rem] left-[35%] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/15 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:52px_52px]" />
      </div>

      <section className="relative z-10 flex min-h-screen items-center justify-center px-5 py-16 sm:px-8">
        <div className="mx-auto w-full max-w-6xl">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm font-semibold text-violet-200 backdrop-blur-xl">
                <Sparkles className="h-4 w-4" />

                Lost in the vault?
              </div>

              <div className="relative inline-block">
                <h1 className="bg-gradient-to-r from-white via-violet-200 to-cyan-200 bg-clip-text text-[7rem] font-black leading-none tracking-[-0.08em] text-transparent sm:text-[10rem] lg:text-[12rem]">
                  404
                </h1>

                <div className="absolute -right-4 top-2 flex h-14 w-14 rotate-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl sm:-right-8 sm:h-16 sm:w-16">
                  <KeyRound className="h-7 w-7 text-cyan-300 sm:h-8 sm:w-8" />
                </div>
              </div>

              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                This page is not inside your vault
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg lg:mx-0">
                The page may have been moved, deleted, or the address may be
                incorrect. Your LastKey account and protected information are
                still safe.
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <Link
                  to={ROUTES.HOME}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-6 py-3 font-semibold text-white shadow-[0_18px_45px_rgba(124,58,237,0.3)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(6,182,212,0.35)]"
                >
                  <Home className="h-5 w-5" />
                  Return home
                </Link>

                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-slate-100 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/30 hover:bg-white/10"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Go back
                </button>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-slate-400 lg:justify-start">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Secure platform
                </div>

                <div className="flex items-center gap-2">
                  <LockKeyhole className="h-4 w-4 text-cyan-400" />
                  Encrypted data
                </div>

                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-violet-400" />
                  Easy navigation
                </div>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-r from-violet-500/30 via-fuchsia-500/20 to-cyan-500/30 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
                <div className="mb-8 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400">
                      LastKey navigation
                    </p>

                    <h3 className="mt-1 text-xl font-bold text-white">
                      Find your way back
                    </h3>
                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20">
                    <Search className="h-6 w-6 text-cyan-300" />
                  </div>
                </div>

                <div className="space-y-4">
                  <Link
                    to={ROUTES.HOME}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-1 hover:border-violet-400/40 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300">
                        <Home className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="font-semibold text-white">
                          Home
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          Return to the main page
                        </p>
                      </div>
                    </div>

                    <ArrowLeft className="h-5 w-5 rotate-180 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" />
                  </Link>

                  <Link
                    to={ROUTES.FEATURES}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-300">
                        <Sparkles className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="font-semibold text-white">
                          Features
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          Explore LastKey capabilities
                        </p>
                      </div>
                    </div>

                    <ArrowLeft className="h-5 w-5 rotate-180 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" />
                  </Link>

                  <Link
                    to={ROUTES.SECURITY}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                        <ShieldCheck className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="font-semibold text-white">
                          Security
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          Learn how your data stays safe
                        </p>
                      </div>
                    </div>

                    <ArrowLeft className="h-5 w-5 rotate-180 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" />
                  </Link>

                  <Link
                    to={ROUTES.CONTACT}
                    className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-400/40 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-fuchsia-500/15 text-fuchsia-300">
                        <Compass className="h-5 w-5" />
                      </div>

                      <div>
                        <p className="font-semibold text-white">
                          Contact support
                        </p>

                        <p className="mt-1 text-sm text-slate-400">
                          Get help from our team
                        </p>
                      </div>
                    </div>

                    <ArrowLeft className="h-5 w-5 rotate-180 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" />
                  </Link>
                </div>

                <div className="mt-7 rounded-2xl border border-cyan-400/15 bg-cyan-400/[0.07] p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />

                    <p className="text-sm leading-6 text-slate-300">
                      This is only a navigation error. Your documents, nominees,
                      security settings, and account data remain protected.
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-white/10 bg-slate-900/80 p-4 shadow-xl backdrop-blur-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      System status
                    </p>

                    <p className="text-sm font-semibold text-white">
                      All systems secure
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default NotFoundPage;
import {
  ArrowRight,
  ExternalLink,
  GitBranch,
  Heart,
  KeyRound,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  motion,
} from "framer-motion";
import {
  Link as RouterLink,
} from "react-router-dom";

import Logo from "../branding/Logo";
import Button from "../ui/Button";
import { ROUTES } from "../../utils/routePaths";

const footerGroups = [
  {
    title: "Product",
    accent:
      "from-blue-500 to-cyan-400",
    links: [
      {
        label: "Features",
        path: ROUTES.FEATURES,
      },
      {
        label: "Security",
        path: ROUTES.SECURITY,
      },
      {
        label: "Pricing",
        path: ROUTES.PRICING,
      },
      {
        label: "Dashboard",
        path: ROUTES.DASHBOARD,
      },
    ],
  },
  {
    title: "Company",
    accent:
      "from-violet-500 to-fuchsia-400",
    links: [
      {
        label: "About LastKey",
        path: ROUTES.ABOUT,
      },
      {
        label: "Create account",
        path: ROUTES.REGISTER,
      },
      {
        label: "Sign in",
        path: ROUTES.LOGIN,
      },
    ],
  },
  {
    title: "Legal",
    accent:
      "from-emerald-500 to-teal-400",
    links: [
      {
        label: "Privacy policy",
        path: ROUTES.PRIVACY,
      },
      {
        label: "Terms of service",
        path: ROUTES.TERMS,
      },
    ],
  },
];

const trustItems = [
  "Controlled access",
  "Secure authentication",
  "Verified nominees",
];

export default function LandingFooter() {
  return (
    <footer
      className="
        section-shell
        overflow-hidden
        bg-slate-950
        text-white
      "
    >
      <div className="noise-overlay opacity-[0.045]" />

      <div className="landing-grid-dark absolute inset-0 opacity-35" />

      <div
        className="
          aurora-blob
          -left-36 top-20
          h-80 w-80
          bg-blue-600/20
        "
      />

      <div
        className="
          aurora-blob
          -right-32 bottom-0
          h-96 w-96
          bg-fuchsia-600/20
        "
      />

      <div className="section-container py-12 sm:py-16">
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
            relative
            overflow-hidden
            rounded-[34px]
            border border-white/10
            bg-white/[0.065]
            p-6
            shadow-2xl
            backdrop-blur-2xl
            sm:p-8
            lg:grid
            lg:grid-cols-[1fr_auto]
            lg:items-center
            lg:gap-12
          "
        >
          <div
            className="
              absolute
              -left-20 -top-24
              h-64 w-64
              rounded-full
              bg-cyan-500/20
              blur-3xl
            "
          />

          <div
            className="
              absolute
              -bottom-24 right-24
              h-64 w-64
              rounded-full
              bg-violet-500/20
              blur-3xl
            "
          />

          <div className="relative max-w-3xl">
            <div
              className="
                inline-flex
                items-center gap-2
                rounded-full
                border border-white/10
                bg-white/10
                px-3.5 py-2
                text-xs
                font-black
                text-cyan-200
              "
            >
              <Sparkles className="h-4 w-4" />

              Start protecting what matters
            </div>

            <h2
              className="
                mt-5
                text-3xl
                font-black
                tracking-[-0.04em]
                sm:text-4xl
                lg:text-5xl
              "
            >
              Build a safer digital future

              <span
                className="
                  block
                  bg-gradient-to-r
                  from-cyan-300
                  via-violet-300
                  to-fuchsia-300
                  bg-clip-text
                  text-transparent
                "
              >
                for the people you trust.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
              Organise important documents,
              configure trusted access and
              prepare before information
              becomes difficult to find.
            </p>
          </div>

          <div
            className="
              relative mt-7
              flex flex-col gap-3
              sm:flex-row
              lg:mt-0
              lg:flex-col
              lg:min-w-[260px]
            "
          >
            <RouterLink
              to={ROUTES.REGISTER}
              className="block"
            >
              <Button
                fullWidth
                size="xl"
                rightIcon={ArrowRight}
              >
                Create free vault
              </Button>
            </RouterLink>

            <RouterLink
              to={ROUTES.FEATURES}
              className="block"
            >
              <Button
                fullWidth
                size="large"
                variant="secondary"
              >
                Explore features
              </Button>
            </RouterLink>
          </div>
        </motion.div>

        <div
          className="
            relative mt-14
            grid gap-12
            lg:grid-cols-[1.1fr_1.5fr]
          "
        >
          <div className="max-w-md">
            <Logo showTagline />

            <p className="mt-6 text-sm leading-7 text-slate-400">
              LastKey helps individuals and
              families protect important
              information, manage trusted
              nominees and prepare controlled
              emergency access.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {trustItems.map(
                (item) => (
                  <span
                    key={item}
                    className="
                      inline-flex
                      items-center gap-1.5
                      rounded-full
                      border border-white/10
                      bg-white/[0.06]
                      px-3 py-1.5
                      text-[10px]
                      font-bold
                      text-slate-300
                    "
                  >
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />

                    {item}
                  </span>
                ),
              )}
            </div>

            <div className="mt-7 flex items-center gap-3">
              <SocialButton
                href="mailto:support@lastkey.example"
                label="Email LastKey"
                icon={Mail}
                hoverClass="hover:border-blue-400/40 hover:bg-blue-500/10 hover:text-blue-300"
              />

              <SocialButton
                label="LastKey LinkedIn"
                icon={ExternalLink}
                hoverClass="hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-300"
              />

              <SocialButton
                label="LastKey GitHub"
                icon={GitBranch}
                hoverClass="hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-emerald-300"
              />
            </div>
          </div>

          <div
            className="
              grid gap-8
              sm:grid-cols-3
            "
          >
            {footerGroups.map(
              (group) => (
                <div key={group.title}>
                  <div className="flex items-center gap-3">
                    <span
                      className={[
                        "h-2.5",
                        "w-2.5",
                        "rounded-full",
                        "bg-gradient-to-br",
                        group.accent,
                      ].join(" ")}
                    />

                    <h3 className="text-sm font-black text-white">
                      {group.title}
                    </h3>
                  </div>

                  <ul className="mt-6 space-y-3.5">
                    {group.links.map(
                      (link) => (
                        <li key={link.path}>
                          <RouterLink
                            to={link.path}
                            className="
                              group/link
                              inline-flex
                              items-center gap-2
                              text-sm
                              text-slate-400
                              transition-all
                              duration-300
                              hover:translate-x-1
                              hover:text-white
                            "
                          >
                            {link.label}

                            <ArrowRight
                              className="
                                h-3.5 w-3.5
                                opacity-0
                                transition-all
                                group-hover/link:opacity-100
                              "
                            />
                          </RouterLink>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              ),
            )}
          </div>
        </div>

        <div
          className="
            relative mt-14
            flex flex-col
            gap-5
            border-t
            border-white/10
            pt-7
            text-xs
            text-slate-500
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <p>
            © {new Date().getFullYear()}{" "}
            LastKey. All rights reserved.
          </p>

          <div
            className="
              flex flex-wrap
              items-center gap-5
            "
          >
            <div className="flex items-center gap-2 text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span
                  className="
                    absolute inline-flex
                    h-full w-full
                    animate-ping
                    rounded-full
                    bg-emerald-400
                    opacity-60
                  "
                />

                <span
                  className="
                    relative inline-flex
                    h-2 w-2
                    rounded-full
                    bg-emerald-500
                  "
                />
              </span>

              Secure by design
            </div>

            <div className="flex items-center gap-1.5 text-slate-400">
              Built with

              <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />

              for safer families
            </div>

            <div className="flex items-center gap-2">
              <KeyRound className="h-3.5 w-3.5 text-violet-400" />

              Digital legacy protection
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialButton({
  href,
  label,
  icon: Icon,
  hoverClass,
}) {
  const className = [
    "flex h-11 w-11",
    "items-center",
    "justify-center",
    "rounded-2xl",
    "border border-white/10",
    "bg-white/[0.055]",
    "text-slate-400",
    "transition-all",
    "duration-300",
    "hover:-translate-y-1",
    hoverClass,
  ].join(" ");

  if (href) {
    return (
      <a
        href={href}
        className={className}
        aria-label={label}
      >
        <Icon className="h-4.5 w-4.5" />
      </a>
    );
  }

  return (
    <button
      type="button"
      className={className}
      aria-label={label}
    >
      <Icon className="h-4.5 w-4.5" />
    </button>
  );
}
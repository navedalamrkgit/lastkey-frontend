import { useMemo, useState } from "react";
import {
  ArrowRight,
  BellRing,
  CheckCircle2,
  ChevronRight,
  Clock3,
  Cookie,
  Database,
  Eye,
  FileKey2,
  FileText,
  Fingerprint,
  Globe2,
  KeyRound,
  LockKeyhole,
  Mail,
  Menu,
  Scale,
  ServerCog,
  ShieldCheck,
  Sparkles,
  UserCheck,
  UsersRound,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Button from "../../components/ui/Button";
import { ROUTES } from "../../utils/routePaths";

const privacySections = [
  {
    id: "introduction",
    number: "01",
    title: "Introduction",
    shortTitle: "Introduction",
    icon: FileText,
    description:
      "An overview of how LastKey approaches privacy and protects personal information.",
  },
  {
    id: "information-we-collect",
    number: "02",
    title: "Information we collect",
    shortTitle: "Information collected",
    icon: Database,
    description:
      "The information you provide directly and the limited technical data created while using LastKey.",
  },
  {
    id: "how-we-use-information",
    number: "03",
    title: "How we use information",
    shortTitle: "How data is used",
    icon: ServerCog,
    description:
      "How information supports account security, vault functionality, communication and product improvement.",
  },
  {
    id: "document-and-vault-data",
    number: "04",
    title: "Document and vault data",
    shortTitle: "Vault data",
    icon: FileKey2,
    description:
      "How uploaded documents, metadata and nominee permissions are handled within the platform.",
  },
  {
    id: "sharing-and-disclosure",
    number: "05",
    title: "Sharing and disclosure",
    shortTitle: "Data sharing",
    icon: UsersRound,
    description:
      "The limited circumstances in which information may be shared with service providers or authorised parties.",
  },
  {
    id: "data-security",
    number: "06",
    title: "Data security",
    shortTitle: "Security",
    icon: LockKeyhole,
    description:
      "The safeguards designed to reduce unauthorised access, alteration, loss and misuse.",
  },
  {
    id: "data-retention",
    number: "07",
    title: "Data retention",
    shortTitle: "Retention",
    icon: Clock3,
    description:
      "How long account, security, audit and document information may be retained.",
  },
  {
    id: "your-rights",
    number: "08",
    title: "Your privacy rights",
    shortTitle: "Your rights",
    icon: UserCheck,
    description:
      "Your ability to review, update, export or request deletion of eligible personal information.",
  },
  {
    id: "cookies",
    number: "09",
    title: "Cookies and similar technologies",
    shortTitle: "Cookies",
    icon: Cookie,
    description:
      "How essential storage and related technologies may support authentication and platform preferences.",
  },
  {
    id: "international-processing",
    number: "10",
    title: "International processing",
    shortTitle: "International data",
    icon: Globe2,
    description:
      "How information may be processed in locations where infrastructure or service providers operate.",
  },
  {
    id: "policy-updates",
    number: "11",
    title: "Updates to this policy",
    shortTitle: "Policy updates",
    icon: BellRing,
    description:
      "How material changes to this privacy policy may be communicated.",
  },
  {
    id: "contact",
    number: "12",
    title: "Contact and privacy questions",
    shortTitle: "Contact",
    icon: Mail,
    description:
      "How to raise privacy questions or request help concerning personal information.",
  },
];

const privacyHighlights = [
  {
    icon: ShieldCheck,
    title: "Privacy by design",
    description:
      "Privacy and access control are considered throughout the design of vault, nominee and emergency-access workflows.",
    accent:
      "from-blue-500 to-cyan-500",
    iconClass:
      "bg-blue-50 text-blue-600",
  },
  {
    icon: Fingerprint,
    title: "Controlled access",
    description:
      "Adding a nominee does not automatically grant unrestricted access to every document stored in your vault.",
    accent:
      "from-violet-500 to-fuchsia-500",
    iconClass:
      "bg-violet-50 text-violet-600",
  },
  {
    icon: Eye,
    title: "Clear visibility",
    description:
      "Account activity, access history and important security events should remain understandable to the vault owner.",
    accent:
      "from-emerald-500 to-teal-500",
    iconClass:
      "bg-emerald-50 text-emerald-600",
  },
];

const informationCategories = [
  {
    title: "Account information",
    description:
      "Your name, email address, phone number, password credentials and profile details.",
  },
  {
    title: "Vault information",
    description:
      "Documents, document metadata, categories, descriptions, reminders and access settings you choose to store.",
  },
  {
    title: "Nominee information",
    description:
      "Names, contact details, relationship information and permissions connected to trusted nominees.",
  },
  {
    title: "Security information",
    description:
      "Login activity, session data, verification status, device information and security-related events.",
  },
  {
    title: "Technical information",
    description:
      "Browser type, operating system, IP address, timestamps and diagnostic information generated through platform use.",
  },
  {
    title: "Communication information",
    description:
      "Messages, support requests, feedback and other information you send to the LastKey team.",
  },
];

const useCases = [
  {
    icon: KeyRound,
    title: "Provide core services",
    description:
      "Create accounts, authenticate users, store documents and manage nominees and emergency-access workflows.",
  },
  {
    icon: ShieldCheck,
    title: "Protect accounts",
    description:
      "Detect suspicious activity, maintain access logs and help prevent unauthorised use of LastKey services.",
  },
  {
    icon: BellRing,
    title: "Send important updates",
    description:
      "Deliver verification messages, security alerts, document reminders and changes related to your account.",
  },
  {
    icon: ServerCog,
    title: "Improve the platform",
    description:
      "Understand performance, diagnose technical issues and improve reliability, accessibility and usability.",
  },
];

const rights = [
  "Request access to eligible personal information associated with your account.",
  "Correct inaccurate or incomplete account information.",
  "Request deletion of eligible personal information, subject to legal and security obligations.",
  "Request an export of supported account or vault information.",
  "Withdraw optional consent where processing depends on consent.",
  "Raise a concern regarding how personal information is handled.",
];

function SectionHeading({
  number,
  title,
  description,
  icon: Icon,
}) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/10">
        <Icon className="h-5 w-5" />
      </span>

      <div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-black uppercase tracking-[0.18em] text-violet-600">
            Section {number}
          </span>
        </div>

        <h2 className="mt-2 text-2xl font-black tracking-[-0.035em] text-slate-950 sm:text-3xl">
          {title}
        </h2>

        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}

function PrivacySection({
  id,
  number,
  title,
  description,
  icon,
  children,
}) {
  return (
    <motion.section
      id={id}
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
        amount: 0.15,
      }}
      transition={{
        duration: 0.55,
      }}
      className="scroll-mt-32 rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.5)] sm:p-8"
    >
      <SectionHeading
        number={number}
        title={title}
        description={description}
        icon={icon}
      />

      <div className="mt-7 border-t border-slate-100 pt-7">
        {children}
      </div>
    </motion.section>
  );
}

export default function PrivacyPage() {
  const [mobileNavigationOpen, setMobileNavigationOpen] =
    useState(false);

  const lastUpdated = useMemo(
    () => "26 July 2026",
    [],
  );

  const handleSectionNavigation = (sectionId) => {
    setMobileNavigationOpen(false);

    window.setTimeout(() => {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 50);
  };

  return (
    <div className="page-enter overflow-hidden bg-slate-50">
      {/* Hero */}
      <section className="section-shell overflow-hidden bg-slate-950 text-white">
        <div className="landing-grid-dark absolute inset-0 opacity-50" />
        <div className="noise-overlay opacity-[0.05]" />

        <div className="aurora-blob -left-40 top-10 h-[430px] w-[430px] bg-blue-600/25 float-slow" />

        <div className="aurora-blob -right-36 bottom-[-120px] h-[500px] w-[500px] bg-violet-600/25 float-medium" />

        <div className="relative mx-auto max-w-[1440px] px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              initial={{
                opacity: 0,
                x: -28,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                duration: 0.7,
              }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-black text-blue-200 backdrop-blur-xl">
                <ShieldCheck className="h-4 w-4" />
                Privacy Policy
              </div>

              <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.03] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Your information deserves
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                  clarity and protection.
                </span>
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                This Privacy Policy explains what information LastKey
                may collect, why it is used, how it is protected and
                the choices available to you.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur-xl">
                  <Clock3 className="h-4 w-4 text-cyan-300" />
                  Updated {lastUpdated}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur-xl">
                  <Scale className="h-4 w-4 text-violet-300" />
                  Plain-language overview
                </span>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  variant="primary"
                  rightIcon={ChevronRight}
                  onClick={() =>
                    handleSectionNavigation(
                      "information-we-collect",
                    )
                  }
                >
                  Read the policy
                </Button>

                <Link to={ROUTES.REGISTER}>
                  <Button
                    size="lg"
                    variant="secondary"
                    rightIcon={ArrowRight}
                  >
                    Create an account
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                x: 0,
                scale: 1,
              }}
              transition={{
                duration: 0.75,
                delay: 0.08,
              }}
              className="relative"
            >
              <div className="absolute -inset-8 rounded-full bg-gradient-to-br from-blue-500/20 via-violet-500/10 to-transparent blur-3xl" />

              <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur-2xl sm:p-7">
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white">
                      <FileKey2 className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-sm font-black text-white">
                        Privacy overview
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        LastKey data principles
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                    Protected
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      icon: LockKeyhole,
                      title: "Secure access",
                      value: "Controlled",
                    },
                    {
                      icon: Eye,
                      title: "Data visibility",
                      value: "Transparent",
                    },
                    {
                      icon: UserCheck,
                      title: "User choices",
                      value: "Available",
                    },
                  ].map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.title}
                        initial={{
                          opacity: 0,
                          x: 20,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          duration: 0.5,
                          delay: 0.3 + index * 0.1,
                        }}
                        className="flex items-center justify-between rounded-[22px] border border-white/10 bg-white/[0.05] p-4"
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-blue-200">
                            <Icon className="h-4 w-4" />
                          </span>

                          <span className="text-sm font-bold text-slate-200">
                            {item.title}
                          </span>
                        </div>

                        <span className="text-xs font-black text-emerald-300">
                          {item.value}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                <div className="mt-5 rounded-[22px] border border-violet-400/20 bg-violet-400/10 p-4">
                  <div className="flex gap-3">
                    <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />

                    <p className="text-sm leading-6 text-slate-300">
                      LastKey is designed so that document access,
                      nominee permissions and emergency workflows remain
                      deliberate and understandable.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Privacy highlights */}
      <section className="section-shell overflow-hidden bg-white py-20 sm:py-24">
        <div className="soft-grid absolute inset-0 opacity-25" />

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
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-black text-violet-700">
              <Fingerprint className="h-4 w-4" />
              Our privacy approach
            </div>

            <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
              Privacy principles that support
              <span className="gradient-text block">
                every important workflow.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
              LastKey aims to make security, access and personal-data
              handling understandable rather than hidden behind complex
              language.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {privacyHighlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
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
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group relative overflow-hidden rounded-[30px] border border-slate-200 bg-white p-7 shadow-[0_26px_70px_-52px_rgba(15,23,42,0.5)]"
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent}`}
                  />

                  <span
                    className={`flex h-13 w-13 items-center justify-center rounded-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${item.iconClass}`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <h3 className="mt-6 text-xl font-black tracking-[-0.025em] text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mobile table of contents button */}
      <div className="sticky top-20 z-30 border-y border-slate-200 bg-white/90 px-4 py-3 backdrop-blur-xl lg:hidden">
        <button
          type="button"
          onClick={() =>
            setMobileNavigationOpen(
              (currentValue) => !currentValue,
            )
          }
          className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800"
        >
          <span className="flex items-center gap-2">
            <Menu className="h-4 w-4" />
            Privacy policy sections
          </span>

          {mobileNavigationOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {mobileNavigationOpen && (
          <div className="mt-3 max-h-[55vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
            {privacySections.map((section) => (
              <button
                key={section.id}
                type="button"
                onClick={() =>
                  handleSectionNavigation(section.id)
                }
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
              >
                <span className="text-xs font-black text-violet-600">
                  {section.number}
                </span>

                {section.shortTitle}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Policy content */}
      <section className="section-shell overflow-visible bg-slate-50 py-20 sm:py-24">
        <div className="soft-grid absolute inset-0 opacity-25" />

        <div className="section-container">
          <div className="grid items-start gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            {/* Desktop table of contents */}
            <aside className="hidden lg:sticky lg:top-28 lg:block">
              <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_70px_-52px_rgba(15,23,42,0.5)]">
                <div className="border-b border-slate-100 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                    On this page
                  </p>

                  <h2 className="mt-2 text-lg font-black text-slate-950">
                    Privacy policy
                  </h2>
                </div>

                <nav className="max-h-[65vh] overflow-y-auto p-2">
                  {privacySections.map((section) => (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() =>
                        handleSectionNavigation(section.id)
                      }
                      className="group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition hover:bg-slate-50"
                    >
                      <span className="text-[11px] font-black text-violet-600">
                        {section.number}
                      </span>

                      <span className="flex-1 text-sm font-bold text-slate-600 transition group-hover:text-slate-950">
                        {section.shortTitle}
                      </span>

                      <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-violet-600" />
                    </button>
                  ))}
                </nav>
              </div>

              <div className="mt-5 rounded-[26px] border border-blue-200 bg-gradient-to-br from-blue-50 to-violet-50 p-5">
                <ShieldCheck className="h-6 w-6 text-blue-600" />

                <h3 className="mt-4 text-sm font-black text-slate-950">
                  Privacy question?
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-600">
                  Review the contact section for information about
                  raising a privacy-related request.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    handleSectionNavigation("contact")
                  }
                  className="mt-4 inline-flex items-center gap-2 text-xs font-black text-blue-700"
                >
                  Go to contact section
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </aside>

            <main className="min-w-0 space-y-7">
                              <PrivacySection
                id="introduction"
                number="01"
                title="Introduction"
                description={
                  privacySections[0].description
                }
                icon={privacySections[0].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    LastKey is a digital legacy and secure-document
                    management platform designed to help users organise
                    important records, assign trusted nominees and
                    prepare controlled emergency-access workflows.
                  </p>

                  <p>
                    This Privacy Policy explains how LastKey may
                    collect, use, store, protect and disclose personal
                    information when you use the website, application,
                    services or related features.
                  </p>

                  <p>
                    By creating an account or using LastKey, you
                    acknowledge that your information may be handled as
                    described in this policy. Where consent is legally
                    required, LastKey should request it separately and
                    clearly.
                  </p>
                </div>

                <div className="mt-7 rounded-[24px] border border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50 p-5">
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
                      <ShieldCheck className="h-5 w-5" />
                    </span>

                    <div>
                      <h3 className="text-sm font-black text-slate-950">
                        Privacy-policy scope
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        This policy covers personal information handled
                        through LastKey services. It does not control the
                        independent privacy practices of third-party
                        websites or services you may access through
                        external links.
                      </p>
                    </div>
                  </div>
                </div>
              </PrivacySection>

              <PrivacySection
                id="information-we-collect"
                number="02"
                title="Information we collect"
                description={
                  privacySections[1].description
                }
                icon={privacySections[1].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  The information collected depends on the features you
                  use, the information you choose to provide and the
                  technical activity generated while interacting with
                  the platform.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {informationCategories.map(
                    (category, index) => (
                      <motion.article
                        key={category.title}
                        initial={{
                          opacity: 0,
                          y: 16,
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
                          duration: 0.4,
                          delay: index * 0.04,
                        }}
                        className="rounded-[22px] border border-slate-200 bg-slate-50 p-5"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          </span>

                          <div>
                            <h3 className="text-sm font-black text-slate-950">
                              {category.title}
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                              {category.description}
                            </p>
                          </div>
                        </div>
                      </motion.article>
                    ),
                  )}
                </div>

                <div className="mt-7 rounded-[24px] border border-amber-200 bg-amber-50 p-5">
                  <div className="flex gap-4">
                    <Database className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />

                    <p className="text-sm leading-7 text-amber-900">
                      Do not upload information that you are not
                      authorised to store or manage. You are responsible
                      for ensuring that nominee and third-party
                      information is provided lawfully.
                    </p>
                  </div>
                </div>
              </PrivacySection>

              <PrivacySection
                id="how-we-use-information"
                number="03"
                title="How we use information"
                description={
                  privacySections[2].description
                }
                icon={privacySections[2].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Personal information may be used when reasonably
                  necessary to operate LastKey, protect users, maintain
                  platform integrity and provide requested services.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {useCases.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.article
                        key={item.title}
                        initial={{
                          opacity: 0,
                          scale: 0.97,
                        }}
                        whileInView={{
                          opacity: 1,
                          scale: 1,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.25,
                        }}
                        transition={{
                          duration: 0.4,
                          delay: index * 0.05,
                        }}
                        className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                          <Icon className="h-5 w-5" />
                        </span>

                        <h3 className="mt-4 text-base font-black text-slate-950">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {item.description}
                        </p>
                      </motion.article>
                    );
                  })}
                </div>

                <div className="mt-7 space-y-3">
                  {[
                    "Comply with applicable legal obligations and valid lawful requests.",
                    "Enforce platform terms, investigate misuse and protect the rights of users and LastKey.",
                    "Develop analytics using aggregated or appropriately de-identified information where possible.",
                    "Personalise relevant features, preferences and security recommendations.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl bg-slate-50 px-4 py-3"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                      <span className="text-sm leading-7 text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </PrivacySection>

              <PrivacySection
                id="document-and-vault-data"
                number="04"
                title="Document and vault data"
                description={
                  privacySections[3].description
                }
                icon={privacySections[3].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    Documents uploaded to LastKey may contain sensitive
                    financial, identity, insurance, legal, medical,
                    property or personal information. LastKey should
                    treat this information as confidential vault data.
                  </p>

                  <p>
                    Vault information should only be made available
                    according to the access permissions, nominee roles
                    and emergency conditions configured by the account
                    owner, subject to verification and platform rules.
                  </p>
                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      icon: LockKeyhole,
                      title: "Private by default",
                      description:
                        "Documents remain linked to the account owner unless access is deliberately granted.",
                    },
                    {
                      icon: UsersRound,
                      title: "Permission based",
                      description:
                        "Nominees should only receive access to the records and actions specifically assigned to them.",
                    },
                    {
                      icon: FileKey2,
                      title: "Workflow controlled",
                      description:
                        "Emergency release should depend on configured conditions, verification and audit records.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <article
                        key={item.title}
                        className="rounded-[22px] border border-slate-200 bg-slate-50 p-5"
                      >
                        <Icon className="h-5 w-5 text-violet-600" />

                        <h3 className="mt-4 text-sm font-black text-slate-950">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-7 rounded-[24px] border border-violet-200 bg-violet-50 p-5">
                  <div className="flex gap-4">
                    <Fingerprint className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" />

                    <div>
                      <h3 className="text-sm font-black text-violet-950">
                        Automated document features
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-violet-900">
                        When AI classification, extraction or analysis
                        features are used, relevant document content may
                        be processed to provide the requested result.
                        Production systems should limit this processing
                        to what is necessary and apply appropriate
                        security controls.
                      </p>
                    </div>
                  </div>
                </div>
              </PrivacySection>

              <PrivacySection
                id="sharing-and-disclosure"
                number="05"
                title="Sharing and disclosure"
                description={
                  privacySections[4].description
                }
                icon={privacySections[4].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  LastKey should not sell personal vault information.
                  Information may only be shared where reasonably
                  necessary for service operation, user-authorised
                  access, legal compliance or platform protection.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    {
                      title: "Authorised nominees",
                      description:
                        "Information may be disclosed to nominees according to the permissions and emergency conditions selected by the account owner.",
                    },
                    {
                      title: "Service providers",
                      description:
                        "Trusted infrastructure, storage, communication, security, analytics or support providers may process limited information on behalf of LastKey.",
                    },
                    {
                      title: "Legal requirements",
                      description:
                        "Information may be disclosed when required by applicable law, court order or another valid legal process.",
                    },
                    {
                      title: "Safety and platform protection",
                      description:
                        "Information may be used or disclosed to investigate fraud, security incidents, misuse or threats to users and services.",
                    },
                    {
                      title: "Business restructuring",
                      description:
                        "Information may be transferred as part of a merger, acquisition, financing, reorganisation or sale, subject to appropriate safeguards.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.title}
                      className="grid gap-3 rounded-[22px] border border-slate-200 bg-white p-5 sm:grid-cols-[42px_1fr]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-xs font-black text-slate-700">
                        {String(index + 1).padStart(
                          2,
                          "0",
                        )}
                      </span>

                      <div>
                        <h3 className="text-sm font-black text-slate-950">
                          {item.title}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </PrivacySection>

              <PrivacySection
                id="data-security"
                number="06"
                title="Data security"
                description={
                  privacySections[5].description
                }
                icon={privacySections[5].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  LastKey should use reasonable administrative,
                  technical and organisational safeguards appropriate
                  to the sensitivity of the information handled.
                </p>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {[
                    "Encryption for supported data in transit and at rest.",
                    "Password hashing and secure authentication controls.",
                    "Role-based and permission-based access management.",
                    "Session, login and suspicious-activity monitoring.",
                    "Audit logging for sensitive account and vault events.",
                    "Backups, recovery procedures and infrastructure safeguards.",
                    "Restricted administrative access based on operational need.",
                    "Security reviews, updates and vulnerability management.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-4"
                    >
                      <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                      <span className="text-sm leading-6 text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-7 rounded-[24px] border border-rose-200 bg-rose-50 p-5">
                  <div className="flex gap-4">
                    <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-rose-700" />

                    <div>
                      <h3 className="text-sm font-black text-rose-950">
                        No system is completely risk-free
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-rose-900">
                        Although reasonable safeguards can reduce risk,
                        no internet-based service can guarantee absolute
                        security. Users should protect their credentials,
                        enable available verification features and
                        promptly report suspicious activity.
                      </p>
                    </div>
                  </div>
                </div>
              </PrivacySection>

              <PrivacySection
                id="data-retention"
                number="07"
                title="Data retention"
                description={
                  privacySections[6].description
                }
                icon={privacySections[6].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    Personal information may be retained while an
                    account remains active and for a reasonable period
                    afterwards where necessary to complete deletion,
                    maintain security, resolve disputes or comply with
                    legal obligations.
                  </p>

                  <p>
                    Retention periods may differ according to the type
                    of information, its sensitivity, the reason it was
                    collected and applicable regulatory requirements.
                  </p>
                </div>

                <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200">
                  {[
                    {
                      label: "Active account data",
                      value:
                        "Retained while required to provide the service.",
                    },
                    {
                      label: "Deleted vault content",
                      value:
                        "Removed according to deletion and backup-clearing processes.",
                    },
                    {
                      label: "Security and audit logs",
                      value:
                        "May be retained for fraud prevention, investigation and compliance.",
                    },
                    {
                      label: "Legal records",
                      value:
                        "May be retained for the period required by applicable law.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.label}
                      className={`grid gap-2 px-5 py-5 sm:grid-cols-[220px_1fr] ${
                        index > 0
                          ? "border-t border-slate-200"
                          : ""
                      }`}
                    >
                      <span className="text-sm font-black text-slate-950">
                        {item.label}
                      </span>

                      <span className="text-sm leading-7 text-slate-600">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </PrivacySection>

              <PrivacySection
                id="your-rights"
                number="08"
                title="Your privacy rights"
                description={
                  privacySections[7].description
                }
                icon={privacySections[7].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Depending on your location and applicable law, you may
                  have rights regarding personal information associated
                  with your account.
                </p>

                <div className="mt-7 space-y-3">
                  {rights.map((right, index) => (
                    <motion.div
                      key={right}
                      initial={{
                        opacity: 0,
                        x: -14,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{
                        once: true,
                        amount: 0.3,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.04,
                      }}
                      className="flex items-start gap-4 rounded-[20px] border border-slate-200 bg-slate-50 p-4"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                        <CheckCircle2 className="h-4 w-4" />
                      </span>

                      <span className="text-sm leading-7 text-slate-700">
                        {right}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-7 rounded-[24px] border border-blue-200 bg-blue-50 p-5">
                  <p className="text-sm leading-7 text-blue-900">
                    LastKey may need to verify your identity before
                    completing a privacy request. Certain requests may
                    be limited where retention is required for security,
                    legal compliance, fraud prevention or the rights of
                    other individuals.
                  </p>
                </div>
              </PrivacySection>

              <PrivacySection
                id="cookies"
                number="09"
                title="Cookies and similar technologies"
                description={
                  privacySections[8].description
                }
                icon={privacySections[8].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    LastKey may use cookies, local storage, session
                    storage and similar technologies to maintain login
                    sessions, remember preferences, protect accounts and
                    understand service performance.
                  </p>

                  <p>
                    Essential technologies may be required for core
                    platform operation. Optional analytics or
                    preference technologies should be managed according
                    to applicable consent requirements.
                  </p>
                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      title: "Essential",
                      description:
                        "Support authentication, security and core platform functions.",
                      status: "Required",
                    },
                    {
                      title: "Preferences",
                      description:
                        "Remember selected settings and interface choices.",
                      status: "Optional",
                    },
                    {
                      title: "Analytics",
                      description:
                        "Help understand platform performance and feature usage.",
                      status: "Optional",
                    },
                  ].map((item) => (
                    <article
                      key={item.title}
                      className="rounded-[22px] border border-slate-200 bg-white p-5"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-sm font-black text-slate-950">
                          {item.title}
                        </h3>

                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-black uppercase tracking-wider ${
                            item.status === "Required"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>
              </PrivacySection>

              <PrivacySection
                id="international-processing"
                number="10"
                title="International processing"
                description={
                  privacySections[9].description
                }
                icon={privacySections[9].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    LastKey infrastructure or service providers may
                    operate in more than one country. As a result,
                    personal information may be processed outside the
                    region in which you live.
                  </p>

                  <p>
                    Where cross-border processing occurs, appropriate
                    contractual, technical or organisational safeguards
                    should be used as required by applicable law.
                  </p>
                </div>

                <div className="mt-7 rounded-[24px] border border-slate-200 bg-gradient-to-br from-slate-50 to-blue-50 p-5">
                  <div className="flex gap-4">
                    <Globe2 className="mt-0.5 h-6 w-6 shrink-0 text-blue-600" />

                    <div>
                      <h3 className="text-sm font-black text-slate-950">
                        Data-location transparency
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        Production deployment should maintain clear
                        records of hosting regions, subprocessors and
                        applicable international-transfer safeguards.
                      </p>
                    </div>
                  </div>
                </div>
              </PrivacySection>

              <PrivacySection
                id="policy-updates"
                number="11"
                title="Updates to this policy"
                description={
                  privacySections[10].description
                }
                icon={privacySections[10].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    This Privacy Policy may be updated to reflect
                    changes in LastKey features, legal requirements,
                    security practices or business operations.
                  </p>

                  <p>
                    When a material change is made, LastKey may provide
                    notice through the website, account dashboard,
                    email or another appropriate communication method.
                  </p>
                </div>

                <div className="mt-7 flex flex-col gap-5 rounded-[24px] border border-violet-200 bg-violet-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white">
                      <Clock3 className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-violet-700">
                        Current version
                      </p>

                      <p className="mt-1 text-sm font-black text-violet-950">
                        Last updated: {lastUpdated}
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-violet-700 shadow-sm">
                    Version 1.0
                  </span>
                </div>
              </PrivacySection>

              <PrivacySection
                id="contact"
                number="12"
                title="Contact and privacy questions"
                description={
                  privacySections[11].description
                }
                icon={privacySections[11].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  For privacy questions, access requests, correction
                  requests, deletion requests or concerns about how
                  information is handled, contact the LastKey privacy
                  team.
                </p>

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                      <Mail className="h-5 w-5" />
                    </span>

                    <h3 className="mt-4 text-sm font-black text-slate-950">
                      Email
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Send privacy-related questions to:
                    </p>

                    <a
                      href="mailto:privacy@lastkey.app"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-black text-blue-700 hover:text-blue-800"
                    >
                      privacy@lastkey.app
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>

                  <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                      <FileText className="h-5 w-5" />
                    </span>

                    <h3 className="mt-4 text-sm font-black text-slate-950">
                      Include in your request
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Provide your account email, request type and enough
                      detail to understand the issue. Do not email
                      passwords or sensitive vault documents.
                    </p>
                  </div>
                </div>

                <div className="mt-7 rounded-[24px] border border-emerald-200 bg-emerald-50 p-5">
                  <div className="flex gap-4">
                    <UserCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700" />

                    <p className="text-sm leading-7 text-emerald-900">
                      Identity verification may be required before
                      account information is disclosed, corrected,
                      exported or deleted.
                    </p>
                  </div>
                </div>
              </PrivacySection>
            </main>
          </div>
        </div>
      </section>

      {/* Policy summary */}
      <section className="section-shell overflow-hidden bg-white py-20 sm:py-24">
        <div className="soft-grid absolute inset-0 opacity-20" />

        <div className="section-container">
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
              duration: 0.6,
            }}
            className="overflow-hidden rounded-[34px] border border-slate-200 bg-slate-950 p-7 text-white shadow-[0_34px_90px_-48px_rgba(15,23,42,0.75)] sm:p-10"
          >
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-black text-emerald-300">
                  <ShieldCheck className="h-4 w-4" />
                  Privacy summary
                </div>

                <h2 className="mt-6 max-w-3xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                  Your vault should remain private, controlled and
                  understandable.
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                  LastKey aims to collect only relevant information,
                  protect sensitive records, respect configured access
                  permissions and provide meaningful privacy choices.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  "No automatic nominee access",
                  "No sale of vault data",
                  "Privacy requests supported",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />

                    <span className="text-sm font-bold text-slate-200">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-shell overflow-hidden bg-gradient-to-br from-blue-600 via-violet-600 to-fuchsia-600 py-20 text-white sm:py-24">
        <div className="landing-grid-dark absolute inset-0 opacity-25" />
        <div className="noise-overlay opacity-[0.04]" />

        <div className="section-container text-center">
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
              duration: 0.6,
            }}
            className="mx-auto max-w-4xl"
          >
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-xl">
              <FileKey2 className="h-6 w-6" />
            </span>

            <h2 className="mt-7 text-4xl font-black tracking-[-0.045em] sm:text-5xl">
              Build your secure digital vault with confidence.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100">
              Organise important documents, assign trusted nominees and
              prepare controlled emergency access with LastKey.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to={ROUTES.REGISTER}>
                <Button
                  size="lg"
                  variant="light"
                  rightIcon={ArrowRight}
                >
                  Create free account
                </Button>
              </Link>

              <Link to={ROUTES.SECURITY}>
                <Button
                  size="lg"
                  variant="secondary"
                  rightIcon={ShieldCheck}
                >
                  Explore security
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
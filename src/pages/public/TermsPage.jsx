import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  Ban,
  BellRing,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  FileKey2,
  FileText,
  Fingerprint,
  Globe2,
  KeyRound,
  Landmark,
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

const termsSections = [
  {
    id: "acceptance",
    number: "01",
    title: "Acceptance of terms",
    shortTitle: "Acceptance",
    icon: BadgeCheck,
    description:
      "When these terms apply and what it means to create or use a LastKey account.",
  },
  {
    id: "eligibility",
    number: "02",
    title: "Eligibility and account registration",
    shortTitle: "Eligibility",
    icon: UserCheck,
    description:
      "The requirements for creating an account and keeping registration information accurate.",
  },
  {
    id: "account-security",
    number: "03",
    title: "Account security",
    shortTitle: "Account security",
    icon: KeyRound,
    description:
      "Your responsibilities for credentials, devices, sessions and suspicious account activity.",
  },
  {
    id: "services",
    number: "04",
    title: "LastKey services",
    shortTitle: "Services",
    icon: ServerCog,
    description:
      "An overview of the vault, document, nominee, reminder and emergency-access features.",
  },
  {
    id: "vault-content",
    number: "05",
    title: "Vault content and user responsibilities",
    shortTitle: "Vault content",
    icon: FileKey2,
    description:
      "Rules governing the documents and information you upload, store or manage through LastKey.",
  },
  {
    id: "nominees",
    number: "06",
    title: "Nominees and trusted contacts",
    shortTitle: "Nominees",
    icon: UsersRound,
    description:
      "Your responsibilities when adding nominees and configuring their permissions.",
  },
  {
    id: "emergency-access",
    number: "07",
    title: "Emergency-access workflows",
    shortTitle: "Emergency access",
    icon: ShieldCheck,
    description:
      "How emergency-access requests, verification and controlled release may operate.",
  },
  {
    id: "subscriptions",
    number: "08",
    title: "Plans, subscriptions and payments",
    shortTitle: "Subscriptions",
    icon: CreditCard,
    description:
      "Terms related to paid plans, billing cycles, renewals, taxes and payment processing.",
  },
  {
    id: "prohibited-use",
    number: "09",
    title: "Prohibited activities",
    shortTitle: "Prohibited use",
    icon: Ban,
    description:
      "Activities that are not allowed when accessing or using LastKey services.",
  },
  {
    id: "intellectual-property",
    number: "10",
    title: "Intellectual property",
    shortTitle: "Intellectual property",
    icon: Fingerprint,
    description:
      "Ownership of LastKey software, branding, content and user-provided information.",
  },
  {
    id: "third-party-services",
    number: "11",
    title: "Third-party services",
    shortTitle: "Third parties",
    icon: Globe2,
    description:
      "How external providers, integrations and links may interact with LastKey.",
  },
  {
    id: "availability",
    number: "12",
    title: "Service availability and changes",
    shortTitle: "Availability",
    icon: Clock3,
    description:
      "How LastKey may maintain, update, suspend or modify platform features.",
  },
  {
    id: "termination",
    number: "13",
    title: "Suspension and termination",
    shortTitle: "Termination",
    icon: AlertTriangle,
    description:
      "When accounts may be restricted, suspended or closed.",
  },
  {
    id: "disclaimers",
    number: "14",
    title: "Disclaimers",
    shortTitle: "Disclaimers",
    icon: Scale,
    description:
      "Important limitations concerning platform information, availability and professional advice.",
  },
  {
    id: "liability",
    number: "15",
    title: "Limitation of liability",
    shortTitle: "Liability",
    icon: Landmark,
    description:
      "The limits that may apply to LastKey’s responsibility where legally permitted.",
  },
  {
    id: "changes",
    number: "16",
    title: "Changes to these terms",
    shortTitle: "Changes",
    icon: BellRing,
    description:
      "How revised terms may be published and communicated.",
  },
  {
    id: "contact",
    number: "17",
    title: "Contact information",
    shortTitle: "Contact",
    icon: Mail,
    description:
      "How to contact LastKey regarding these terms or your account.",
  },
];

const serviceHighlights = [
  {
    icon: FileKey2,
    title: "Secure document vault",
    description:
      "Store and organise important records, document details, categories and reminders.",
  },
  {
    icon: UsersRound,
    title: "Nominee management",
    description:
      "Add trusted contacts and configure specific access permissions for supported workflows.",
  },
  {
    icon: ShieldCheck,
    title: "Controlled emergency access",
    description:
      "Prepare verification-based workflows for releasing selected information when required.",
  },
  {
    icon: BellRing,
    title: "Important reminders",
    description:
      "Receive supported alerts related to documents, security events and account activity.",
  },
];

const prohibitedActivities = [
  "Using LastKey for unlawful, fraudulent, deceptive or harmful activities.",
  "Uploading information you do not have the legal right or authority to store.",
  "Attempting to access another user’s account, vault, documents or nominee information.",
  "Bypassing authentication, verification, permissions, rate limits or security controls.",
  "Uploading malware, malicious scripts, corrupted files or harmful technical content.",
  "Reverse engineering, scraping or extracting platform data except where legally permitted.",
  "Using automated systems in a way that disrupts or overloads LastKey infrastructure.",
  "Impersonating another person, nominee, organisation or LastKey representative.",
  "Using the service to distribute spam, threats, harassment or abusive content.",
  "Reselling or commercially exploiting LastKey without written authorisation.",
];

const accountResponsibilities = [
  {
    icon: KeyRound,
    title: "Protect credentials",
    description:
      "Use a strong password and do not share your login credentials, verification codes or recovery information.",
  },
  {
    icon: Fingerprint,
    title: "Use trusted devices",
    description:
      "Avoid accessing sensitive vault information through untrusted, compromised or publicly shared devices.",
  },
  {
    icon: BellRing,
    title: "Report suspicious activity",
    description:
      "Notify LastKey promptly when you believe your account, credentials or documents may be compromised.",
  },
  {
    icon: UserCheck,
    title: "Maintain accurate information",
    description:
      "Keep your email address, phone number, nominee details and other account information current.",
  },
];

function TermsSectionHeading({
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
        <span className="text-xs font-black uppercase tracking-[0.18em] text-violet-600">
          Section {number}
        </span>

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

function TermsSection({
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
        amount: 0.12,
      }}
      transition={{
        duration: 0.55,
      }}
      className="scroll-mt-32 rounded-[30px] border border-slate-200 bg-white p-6 shadow-[0_24px_70px_-52px_rgba(15,23,42,0.5)] sm:p-8"
    >
      <TermsSectionHeading
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

function InformationNotice({
  icon: Icon,
  title,
  children,
  variant = "blue",
}) {
  const styles = {
    blue: {
      wrapper: "border-blue-200 bg-blue-50",
      icon: "bg-blue-600 text-white",
      title: "text-blue-950",
      text: "text-blue-900",
    },
    violet: {
      wrapper: "border-violet-200 bg-violet-50",
      icon: "bg-violet-600 text-white",
      title: "text-violet-950",
      text: "text-violet-900",
    },
    amber: {
      wrapper: "border-amber-200 bg-amber-50",
      icon: "bg-amber-500 text-white",
      title: "text-amber-950",
      text: "text-amber-900",
    },
    rose: {
      wrapper: "border-rose-200 bg-rose-50",
      icon: "bg-rose-600 text-white",
      title: "text-rose-950",
      text: "text-rose-900",
    },
    emerald: {
      wrapper: "border-emerald-200 bg-emerald-50",
      icon: "bg-emerald-600 text-white",
      title: "text-emerald-950",
      text: "text-emerald-900",
    },
  };

  const selectedStyle = styles[variant];

  return (
    <div
      className={`rounded-[24px] border p-5 ${selectedStyle.wrapper}`}
    >
      <div className="flex gap-4">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${selectedStyle.icon}`}
        >
          <Icon className="h-5 w-5" />
        </span>

        <div>
          <h3
            className={`text-sm font-black ${selectedStyle.title}`}
          >
            {title}
          </h3>

          <div
            className={`mt-2 text-sm leading-7 ${selectedStyle.text}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TermsPage() {
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
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-black text-violet-200 backdrop-blur-xl">
                <Scale className="h-4 w-4" />
                Terms of Service
              </div>

              <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.03] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Clear terms for a
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                  trusted digital legacy.
                </span>
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                These Terms explain the rules, responsibilities and
                conditions that apply when you access or use LastKey,
                including its vault, nominee and emergency-access
                features.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur-xl">
                  <Clock3 className="h-4 w-4 text-cyan-300" />
                  Updated {lastUpdated}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur-xl">
                  <FileText className="h-4 w-4 text-violet-300" />
                  Version 1.0
                </span>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  variant="primary"
                  rightIcon={ChevronRight}
                  onClick={() =>
                    handleSectionNavigation("acceptance")
                  }
                >
                  Read the terms
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
                      <FileText className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-sm font-black text-white">
                        Terms overview
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Your use of LastKey
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                    Active
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      icon: BadgeCheck,
                      title: "Account rules",
                      value: "Clear",
                    },
                    {
                      icon: FileKey2,
                      title: "Vault responsibilities",
                      value: "Defined",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Access workflows",
                      value: "Controlled",
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
                      LastKey helps organise and manage digital records,
                      but users remain responsible for the accuracy,
                      legality and suitability of the information they
                      store.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core principles */}
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
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black text-blue-700">
              <ShieldCheck className="h-4 w-4" />
              Platform responsibilities
            </div>

            <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
              Designed for responsible and
              <span className="gradient-text block">
                deliberate digital planning.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
              LastKey provides tools for organising information and
              configuring trusted-access workflows. The account owner
              controls what is stored and how supported permissions are
              configured.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {serviceHighlights.map((item, index) => {
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
                    delay: index * 0.07,
                  }}
                  whileHover={{
                    y: -8,
                  }}
                  className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-48px_rgba(15,23,42,0.5)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 text-violet-600 transition duration-300 group-hover:rotate-6 group-hover:scale-110">
                    <Icon className="h-5 w-5" />
                  </span>

                  <h3 className="mt-5 text-base font-black text-slate-950">
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

      {/* Mobile table of contents */}
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
            Terms sections
          </span>

          {mobileNavigationOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {mobileNavigationOpen && (
          <div className="mt-3 max-h-[55vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">
            {termsSections.map((section) => (
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

      {/* Terms content */}
      <section className="section-shell overflow-visible bg-slate-50 py-20 sm:py-24">
        <div className="soft-grid absolute inset-0 opacity-25" />

        <div className="section-container">
          <div className="grid items-start gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            {/* Desktop navigation */}
            <aside className="hidden lg:sticky lg:top-28 lg:block">
              <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_70px_-52px_rgba(15,23,42,0.5)]">
                <div className="border-b border-slate-100 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                    On this page
                  </p>

                  <h2 className="mt-2 text-lg font-black text-slate-950">
                    Terms of Service
                  </h2>
                </div>

                <nav className="max-h-[65vh] overflow-y-auto p-2">
                  {termsSections.map((section) => (
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

              <div className="mt-5 rounded-[26px] border border-violet-200 bg-gradient-to-br from-violet-50 to-blue-50 p-5">
                <Scale className="h-6 w-6 text-violet-600" />

                <h3 className="mt-4 text-sm font-black text-slate-950">
                  Terms question?
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-600">
                  Review the final contact section for information about
                  account or legal questions.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    handleSectionNavigation("contact")
                  }
                  className="mt-4 inline-flex items-center gap-2 text-xs font-black text-violet-700"
                >
                  Go to contact section
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </aside>

            <main className="min-w-0 space-y-7">
              <TermsSection
                id="acceptance"
                number="01"
                title="Acceptance of terms"
                description={
                  termsSections[0].description
                }
                icon={termsSections[0].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    These Terms of Service govern your access to and use
                    of LastKey’s website, software, applications,
                    document-management tools, nominee features,
                    emergency-access workflows and related services.
                  </p>

                  <p>
                    By creating an account, accessing the platform or
                    using any LastKey feature, you agree to be bound by
                    these Terms and the applicable Privacy Policy.
                  </p>

                  <p>
                    When you use LastKey on behalf of an organisation,
                    you confirm that you have authority to accept these
                    Terms for that organisation.
                  </p>
                </div>

                <InformationNotice
                  icon={BadgeCheck}
                  title="Please review before using LastKey"
                  variant="blue"
                >
                  Do not create an account or continue using the service
                  when you do not agree with these Terms.
                </InformationNotice>
              </TermsSection>

              <TermsSection
                id="eligibility"
                number="02"
                title="Eligibility and account registration"
                description={
                  termsSections[1].description
                }
                icon={termsSections[1].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    You must have the legal capacity to enter into a
                    binding agreement under the laws applicable to you.
                    Where minimum-age requirements apply, you must meet
                    those requirements before creating an account.
                  </p>

                  <p>
                    You agree to provide accurate, complete and current
                    registration information and to update it whenever
                    relevant details change.
                  </p>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Correct identity",
                      description:
                        "Do not register using false, misleading or unauthorised identity information.",
                    },
                    {
                      title: "Valid contact details",
                      description:
                        "Maintain an active email address and phone number where required for verification.",
                    },
                    {
                      title: "One responsible owner",
                      description:
                        "The registered account owner remains responsible for account activity and configuration.",
                    },
                    {
                      title: "Accurate nominees",
                      description:
                        "Provide correct information when adding nominees, trusted contacts or authorised representatives.",
                    },
                  ].map((item) => (
                    <article
                      key={item.title}
                      className="rounded-[22px] border border-slate-200 bg-slate-50 p-5"
                    >
                      <CheckCircle2 className="h-5 w-5 text-emerald-600" />

                      <h3 className="mt-4 text-sm font-black text-slate-950">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>

                <InformationNotice
                  icon={AlertTriangle}
                  title="Verification may be required"
                  variant="amber"
                >
                  LastKey may request reasonable information to verify
                  identity, ownership, nominee status or an
                  emergency-access request.
                </InformationNotice>
              </TermsSection>

              <TermsSection
                id="account-security"
                number="03"
                title="Account security"
                description={
                  termsSections[2].description
                }
                icon={termsSections[2].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  You are responsible for taking reasonable steps to
                  protect your account, credentials and devices from
                  unauthorised access.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {accountResponsibilities.map(
                    (item, index) => {
                      const Icon = item.icon;

                      return (
                        <motion.article
                          key={item.title}
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
                    },
                  )}
                </div>

                <InformationNotice
                  icon={LockKeyhole}
                  title="Unauthorised access"
                  variant="rose"
                >
                  Contact LastKey promptly if you believe that your
                  password, session, device, verification method or
                  vault has been compromised.
                </InformationNotice>
              </TermsSection>

              <TermsSection
                id="services"
                number="04"
                title="LastKey services"
                description={
                  termsSections[3].description
                }
                icon={termsSections[3].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  LastKey may provide tools that help users organise
                  important information, store supported documents,
                  manage trusted contacts, configure access rules and
                  prepare digital-legacy workflows.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    {
                      title: "Document organisation",
                      description:
                        "Upload, categorise, describe and manage supported personal or administrative records.",
                    },
                    {
                      title: "Nominee configuration",
                      description:
                        "Add trusted contacts and define supported permissions or document relationships.",
                    },
                    {
                      title: "Emergency workflow",
                      description:
                        "Configure supported conditions and verification steps for controlled release.",
                    },
                    {
                      title: "Reminders and notifications",
                      description:
                        "Receive supported reminders, security alerts and service communications.",
                    },
                    {
                      title: "AI-assisted features",
                      description:
                        "Use supported classification, extraction, risk-detection or organisation tools where available.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.title}
                      className="grid gap-3 rounded-[22px] border border-slate-200 bg-white p-5 sm:grid-cols-[42px_1fr]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-xs font-black text-violet-700">
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

                <InformationNotice
                  icon={ServerCog}
                  title="Features may evolve"
                  variant="violet"
                >
                  LastKey may add, remove, improve or modify features as
                  the platform develops, subject to these Terms and
                  applicable law.
                </InformationNotice>
              </TermsSection>

              <TermsSection
                id="vault-content"
                number="05"
                title="Vault content and user responsibilities"
                description={
                  termsSections[4].description
                }
                icon={termsSections[4].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    You remain responsible for all documents,
                    descriptions, metadata, instructions, nominee
                    details and other content submitted through your
                    account.
                  </p>

                  <p>
                    You confirm that you have the necessary rights,
                    authority and lawful basis to upload, store, manage
                    and share the information you provide.
                  </p>
                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      icon: BadgeCheck,
                      title: "Accurate",
                      description:
                        "Keep document information, dates, descriptions and instructions reasonably accurate.",
                    },
                    {
                      icon: Scale,
                      title: "Lawful",
                      description:
                        "Do not store stolen, fraudulent, unlawful or unauthorised information.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Appropriate",
                      description:
                        "Avoid storing content that creates unnecessary risk or violates another person’s rights.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <article
                        key={item.title}
                        className="rounded-[22px] border border-slate-200 bg-slate-50 p-5"
                      >
                        <Icon className="h-5 w-5 text-blue-600" />

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

                <InformationNotice
                  icon={FileKey2}
                  title="LastKey does not verify every document"
                  variant="amber"
                >
                  Unless explicitly stated, LastKey does not guarantee
                  that uploaded documents are authentic, legally valid,
                  complete, current or suitable for a particular
                  purpose.
                </InformationNotice>
              </TermsSection>

              <TermsSection
                id="nominees"
                number="06"
                title="Nominees and trusted contacts"
                description={
                  termsSections[5].description
                }
                icon={termsSections[5].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    A nominee or trusted contact is a person you add for
                    a supported access, notification or digital-legacy
                    workflow.
                  </p>

                  <p>
                    Adding a nominee does not automatically give that
                    person access to your complete account or every
                    stored document.
                  </p>
                </div>

                <div className="mt-7 space-y-3">
                  {[
                    "Provide correct nominee identity and contact information.",
                    "Ensure you have the right to provide the nominee’s personal information.",
                    "Configure document and access permissions carefully.",
                    "Review nominee details whenever personal relationships or circumstances change.",
                    "Remove outdated or unauthorised nominees promptly.",
                    "Explain relevant responsibilities to nominees where appropriate.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-4"
                    >
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                      <span className="text-sm leading-7 text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <InformationNotice
                  icon={UsersRound}
                  title="Nominee participation"
                  variant="blue"
                >
                  A nominee may be required to create or verify an
                  account, confirm identity and accept applicable terms
                  before receiving supported access.
                </InformationNotice>
              </TermsSection>

              <TermsSection
                id="emergency-access"
                number="07"
                title="Emergency-access workflows"
                description={
                  termsSections[6].description
                }
                icon={termsSections[6].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  LastKey may provide features intended to support the
                  controlled release of selected information following
                  configured conditions, requests and verification.
                </p>

                <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200">
                  {[
                    {
                      step: "01",
                      title: "Request submitted",
                      description:
                        "An authorised or claimed nominee starts a supported emergency-access request.",
                    },
                    {
                      step: "02",
                      title: "Identity checked",
                      description:
                        "LastKey may request identity, contact or supporting verification information.",
                    },
                    {
                      step: "03",
                      title: "Conditions reviewed",
                      description:
                        "Configured waiting periods, owner responses and access rules may be evaluated.",
                    },
                    {
                      step: "04",
                      title: "Approved data released",
                      description:
                        "Only supported documents or permissions approved by the workflow should be released.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.step}
                      className={`grid gap-4 p-5 sm:grid-cols-[52px_1fr] ${
                        index > 0
                          ? "border-t border-slate-200"
                          : ""
                      }`}
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-xs font-black text-white">
                        {item.step}
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

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  <InformationNotice
                    icon={AlertTriangle}
                    title="No guaranteed outcome"
                    variant="amber"
                  >
                    LastKey cannot guarantee that every request will be
                    approved, completed within a specific period or
                    accepted by an external authority.
                  </InformationNotice>

                  <InformationNotice
                    icon={Scale}
                    title="Not a legal substitute"
                    variant="violet"
                  >
                    Emergency-access settings do not replace a legally
                    valid will, nomination, trust, power of attorney or
                    professional estate-planning advice.
                  </InformationNotice>
                </div>
              </TermsSection>
                            <TermsSection
                id="subscriptions"
                number="08"
                title="Plans, subscriptions and payments"
                description={
                  termsSections[7].description
                }
                icon={termsSections[7].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    LastKey may offer free and paid plans with different
                    storage limits, features, permissions and support
                    options.
                  </p>

                  <p>
                    The price, billing period and included features
                    displayed at the time of purchase form part of your
                    subscription agreement.
                  </p>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {[
                    {
                      title: "Billing authorisation",
                      description:
                        "You authorise the selected payment provider to charge applicable fees using the payment method you provide.",
                    },
                    {
                      title: "Recurring subscriptions",
                      description:
                        "Recurring plans may renew automatically until cancelled, unless different terms are displayed during purchase.",
                    },
                    {
                      title: "Taxes and charges",
                      description:
                        "Displayed prices may exclude taxes, duties, bank charges or other fees required by applicable law or payment providers.",
                    },
                    {
                      title: "Plan changes",
                      description:
                        "Upgrades may apply immediately, while downgrades may take effect from the next billing cycle.",
                    },
                  ].map((item) => (
                    <article
                      key={item.title}
                      className="rounded-[22px] border border-slate-200 bg-slate-50 p-5"
                    >
                      <CreditCard className="h-5 w-5 text-violet-600" />

                      <h3 className="mt-4 text-sm font-black text-slate-950">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {item.description}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200">
                  {[
                    {
                      label: "Free plan",
                      value:
                        "May include limited storage, users, nominees or premium features.",
                    },
                    {
                      label: "Paid plan",
                      value:
                        "Provides the features and limits shown for the selected subscription.",
                    },
                    {
                      label: "Cancellation",
                      value:
                        "Stops future renewals but may not immediately end access already paid for.",
                    },
                    {
                      label: "Failed payment",
                      value:
                        "May result in retries, restrictions, downgrade or suspension after reasonable notice.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.label}
                      className={`grid gap-2 px-5 py-5 sm:grid-cols-[190px_1fr] ${
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

                <InformationNotice
                  icon={CreditCard}
                  title="Refunds and billing disputes"
                  variant="blue"
                >
                  Refund eligibility, trial conditions and promotional
                  pricing should be determined by the terms displayed at
                  purchase and applicable consumer law. Contact support
                  promptly when you believe a charge is incorrect.
                </InformationNotice>
              </TermsSection>

              <TermsSection
                id="prohibited-use"
                number="09"
                title="Prohibited activities"
                description={
                  termsSections[8].description
                }
                icon={termsSections[8].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  You must use LastKey responsibly and must not misuse
                  the service, interfere with platform operations or
                  violate the rights of other people.
                </p>

                <div className="mt-7 grid gap-4">
                  {prohibitedActivities.map(
                    (activity, index) => (
                      <motion.div
                        key={activity}
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
                          amount: 0.25,
                        }}
                        transition={{
                          duration: 0.35,
                          delay: index * 0.03,
                        }}
                        className="flex items-start gap-4 rounded-[20px] border border-slate-200 bg-white p-4"
                      >
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                          <Ban className="h-4 w-4" />
                        </span>

                        <span className="text-sm leading-7 text-slate-700">
                          {activity}
                        </span>
                      </motion.div>
                    ),
                  )}
                </div>

                <InformationNotice
                  icon={AlertTriangle}
                  title="Security enforcement"
                  variant="rose"
                >
                  LastKey may investigate suspected misuse and may
                  restrict access, preserve relevant records or report
                  unlawful activity where reasonably necessary.
                </InformationNotice>
              </TermsSection>

              <TermsSection
                id="intellectual-property"
                number="10"
                title="Intellectual property"
                description={
                  termsSections[9].description
                }
                icon={termsSections[9].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    LastKey and its licensors retain ownership of the
                    platform, source code, interfaces, branding,
                    designs, documentation and other protected
                    materials associated with the service.
                  </p>

                  <p>
                    Subject to these Terms, LastKey grants you a limited,
                    personal, non-exclusive, non-transferable and
                    revocable right to use the service for its intended
                    purpose.
                  </p>
                </div>

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <article className="rounded-[24px] border border-blue-200 bg-blue-50 p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
                      <Fingerprint className="h-5 w-5" />
                    </span>

                    <h3 className="mt-4 text-base font-black text-blue-950">
                      LastKey property
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-blue-900">
                      Software, features, visual design, logos,
                      trademarks, workflows, documentation and original
                      platform content remain owned by LastKey or its
                      licensors.
                    </p>
                  </article>

                  <article className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                      <FileKey2 className="h-5 w-5" />
                    </span>

                    <h3 className="mt-4 text-base font-black text-emerald-950">
                      Your content
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-emerald-900">
                      You retain rights in documents and information you
                      lawfully upload. You grant LastKey the limited
                      permission needed to host, process, secure and
                      display that content for providing the service.
                    </p>
                  </article>
                </div>

                <InformationNotice
                  icon={Sparkles}
                  title="Feedback"
                  variant="violet"
                >
                  When you voluntarily provide product ideas or
                  suggestions, LastKey may use them to improve the
                  platform without creating an obligation to compensate
                  you, unless separately agreed in writing.
                </InformationNotice>
              </TermsSection>

              <TermsSection
                id="third-party-services"
                number="11"
                title="Third-party services"
                description={
                  termsSections[10].description
                }
                icon={termsSections[10].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    LastKey may depend on third-party services for cloud
                    hosting, storage, email, notifications, payments,
                    analytics, identity verification or other platform
                    operations.
                  </p>

                  <p>
                    External services may have their own terms, privacy
                    policies and operational limitations. LastKey does
                    not control independent third-party websites or
                    services.
                  </p>
                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      icon: ServerCog,
                      title: "Infrastructure",
                      description:
                        "Cloud hosting, databases, backups and delivery infrastructure.",
                    },
                    {
                      icon: CreditCard,
                      title: "Payments",
                      description:
                        "Payment processors may handle card or banking information directly.",
                    },
                    {
                      icon: Globe2,
                      title: "External links",
                      description:
                        "Links may direct you to services governed by separate policies.",
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

                <InformationNotice
                  icon={Globe2}
                  title="Independent services"
                  variant="amber"
                >
                  Review third-party terms before using an external
                  integration or service. LastKey is not responsible for
                  independent content, policies or actions outside its
                  reasonable control.
                </InformationNotice>
              </TermsSection>

              <TermsSection
                id="availability"
                number="12"
                title="Service availability and changes"
                description={
                  termsSections[11].description
                }
                icon={termsSections[11].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  LastKey aims to provide a reliable service, but
                  continuous, uninterrupted or error-free availability
                  cannot be guaranteed.
                </p>

                <div className="mt-7 space-y-4">
                  {[
                    {
                      title: "Maintenance",
                      description:
                        "The service may be temporarily unavailable during planned or emergency maintenance.",
                    },
                    {
                      title: "Feature improvements",
                      description:
                        "Interfaces, workflows, limits and capabilities may change as the product develops.",
                    },
                    {
                      title: "Security response",
                      description:
                        "Features or access may be restricted temporarily to investigate or prevent security risks.",
                    },
                    {
                      title: "External dependencies",
                      description:
                        "Availability may be affected by internet providers, cloud services, devices or third-party systems.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.title}
                      className="grid gap-3 rounded-[22px] border border-slate-200 bg-white p-5 sm:grid-cols-[42px_1fr]"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-xs font-black text-blue-700">
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

                <InformationNotice
                  icon={Clock3}
                  title="Maintain independent records"
                  variant="blue"
                >
                  Keep appropriate independent copies of critical
                  documents and instructions. LastKey should not be your
                  only record where immediate offline access is
                  necessary.
                </InformationNotice>
              </TermsSection>

              <TermsSection
                id="termination"
                number="13"
                title="Suspension and termination"
                description={
                  termsSections[12].description
                }
                icon={termsSections[12].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    You may stop using LastKey and request account
                    closure through supported account settings or by
                    contacting the appropriate support channel.
                  </p>

                  <p>
                    LastKey may restrict, suspend or terminate access
                    when reasonably necessary to protect users, enforce
                    these Terms, comply with law or address security and
                    payment issues.
                  </p>
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2">
                  {[
                    "Material or repeated violation of these Terms.",
                    "Fraudulent, abusive or unlawful activity.",
                    "Unauthorised access attempts or security threats.",
                    "Failure to pay applicable subscription charges.",
                    "A valid legal or regulatory requirement.",
                    "Long-term inactivity where permitted and after appropriate notice.",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-4"
                    >
                      <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                      <span className="text-sm leading-7 text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>

                <InformationNotice
                  icon={FileKey2}
                  title="Export important information first"
                  variant="amber"
                >
                  Before closing your account, download any supported
                  information you need. Account deletion may result in
                  permanent loss of stored content after applicable
                  retention and backup-clearing periods.
                </InformationNotice>
              </TermsSection>

              <TermsSection
                id="disclaimers"
                number="14"
                title="Disclaimers"
                description={
                  termsSections[13].description
                }
                icon={termsSections[13].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  To the extent permitted by law, LastKey is provided on
                  an “as available” basis. The service may contain
                  limitations, interruptions or errors.
                </p>

                <div className="mt-7 grid gap-4">
                  {[
                    {
                      title: "Not legal advice",
                      description:
                        "LastKey does not provide legal, succession, estate-planning or regulatory advice.",
                    },
                    {
                      title: "Not financial advice",
                      description:
                        "Document organisation and reminders do not constitute banking, investment, insurance or tax advice.",
                    },
                    {
                      title: "No document validation",
                      description:
                        "Unless clearly stated, LastKey does not certify the authenticity or legal effect of uploaded records.",
                    },
                    {
                      title: "No guaranteed emergency release",
                      description:
                        "Verification, disputes, system issues or legal restrictions may delay or prevent an emergency-access request.",
                    },
                    {
                      title: "AI-assisted results",
                      description:
                        "Automated classification, extraction or risk indicators may be incomplete, inaccurate or require human review.",
                    },
                  ].map((item) => (
                    <article
                      key={item.title}
                      className="rounded-[22px] border border-slate-200 bg-white p-5"
                    >
                      <div className="flex items-start gap-4">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                          <AlertTriangle className="h-5 w-5" />
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
                    </article>
                  ))}
                </div>

                <InformationNotice
                  icon={Scale}
                  title="Seek professional guidance"
                  variant="violet"
                >
                  Consult a qualified professional when preparing a
                  will, nomination, trust, insurance instruction,
                  financial plan or other legally significant document.
                </InformationNotice>
              </TermsSection>

              <TermsSection
                id="liability"
                number="15"
                title="Limitation of liability"
                description={
                  termsSections[14].description
                }
                icon={termsSections[14].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    To the maximum extent permitted by applicable law,
                    LastKey and its directors, employees, contractors,
                    affiliates and service providers will not be liable
                    for indirect, incidental, special, consequential or
                    punitive loss arising from use of the service.
                  </p>

                  <p>
                    This may include loss of profits, opportunity,
                    reputation, data or access resulting from events
                    outside LastKey’s reasonable control.
                  </p>
                </div>

                <div className="mt-7 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                  <h3 className="text-sm font-black text-slate-950">
                    Where liability cannot legally be excluded
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    LastKey’s total liability may be limited to the
                    amount paid by you for the relevant service during
                    the period specified by applicable law or, where no
                    payment was made, another reasonable minimum amount
                    permitted by law.
                  </p>
                </div>

                <InformationNotice
                  icon={Landmark}
                  title="Consumer rights remain"
                  variant="emerald"
                >
                  Nothing in these Terms excludes rights, guarantees or
                  remedies that cannot lawfully be excluded or limited
                  under applicable consumer-protection law.
                </InformationNotice>
              </TermsSection>

              <TermsSection
                id="changes"
                number="16"
                title="Changes to these terms"
                description={
                  termsSections[15].description
                }
                icon={termsSections[15].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    LastKey may update these Terms to reflect changes in
                    the service, law, security practices, subscription
                    features or business operations.
                  </p>

                  <p>
                    Material updates may be communicated through email,
                    account notifications, the website or another
                    appropriate method.
                  </p>

                  <p>
                    Continued use of LastKey after revised Terms become
                    effective may constitute acceptance where legally
                    permitted.
                  </p>
                </div>

                <div className="mt-7 flex flex-col gap-5 rounded-[24px] border border-violet-200 bg-violet-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-white">
                      <Clock3 className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.14em] text-violet-700">
                        Current terms
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
              </TermsSection>

              <TermsSection
                id="contact"
                number="17"
                title="Contact information"
                description={
                  termsSections[16].description
                }
                icon={termsSections[16].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Contact the LastKey team for questions about these
                  Terms, account access, billing, platform use or legal
                  notices.
                </p>

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <article className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                      <Mail className="h-5 w-5" />
                    </span>

                    <h3 className="mt-4 text-sm font-black text-slate-950">
                      General and account support
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Contact the support team for account, billing or
                      platform-related questions.
                    </p>

                    <a
                      href="mailto:support@lastkey.app"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-black text-blue-700 hover:text-blue-800"
                    >
                      support@lastkey.app
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </article>

                  <article className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                      <Scale className="h-5 w-5" />
                    </span>

                    <h3 className="mt-4 text-sm font-black text-slate-950">
                      Legal notices
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Use the legal contact for formal notices or
                      questions concerning these Terms.
                    </p>

                    <a
                      href="mailto:legal@lastkey.app"
                      className="mt-3 inline-flex items-center gap-2 text-sm font-black text-violet-700 hover:text-violet-800"
                    >
                      legal@lastkey.app
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </article>
                </div>

                <InformationNotice
                  icon={Mail}
                  title="Do not send sensitive credentials"
                  variant="rose"
                >
                  Never include passwords, one-time codes, recovery keys
                  or complete sensitive vault documents in an email
                  message.
                </InformationNotice>
              </TermsSection>
            </main>
          </div>
        </div>
      </section>

      {/* Terms summary */}
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
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-black text-blue-300">
                  <BadgeCheck className="h-4 w-4" />
                  Terms summary
                </div>

                <h2 className="mt-6 max-w-3xl text-3xl font-black tracking-[-0.04em] sm:text-4xl">
                  Use LastKey responsibly and keep your digital legacy
                  information accurate.
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
                  Protect your account, upload only authorised content,
                  configure nominees carefully and maintain independent
                  copies of critical records.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  "Protect account access",
                  "Store authorised content",
                  "Review nominee settings",
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
              <ShieldCheck className="h-6 w-6" />
            </span>

            <h2 className="mt-7 text-4xl font-black tracking-[-0.045em] sm:text-5xl">
              Ready to organise your digital legacy?
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-blue-100">
              Create your secure vault, organise important records and
              prepare trusted access with LastKey.
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

              <Link to={ROUTES.PRIVACY}>
                <Button
                  size="lg"
                  variant="secondary"
                  rightIcon={LockKeyhole}
                >
                  Read privacy policy
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
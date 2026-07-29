import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  BadgeCheck,
  BookOpen,
  Building2,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Fingerprint,
  Globe2,
  Handshake,
  Landmark,
  LockKeyhole,
  Mail,
  Menu,
  Scale,
  ScrollText,
  ServerCog,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
  X,
} from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import Button from "../../components/ui/Button";
import { ROUTES } from "../../utils/routePaths";

const legalSections = [
  {
    id: "legal-overview",
    number: "01",
    title: "Legal overview",
    shortTitle: "Overview",
    icon: Scale,
    description:
      "An introduction to the legal information governing LastKey and its services.",
  },
  {
    id: "company-information",
    number: "02",
    title: "Company information",
    shortTitle: "Company",
    icon: Building2,
    description:
      "Information about the organisation responsible for operating LastKey.",
  },
  {
    id: "platform-role",
    number: "03",
    title: "Role of the platform",
    shortTitle: "Platform role",
    icon: ServerCog,
    description:
      "What LastKey provides and the responsibilities that remain with account owners.",
  },
  {
    id: "legal-documents",
    number: "04",
    title: "Applicable legal documents",
    shortTitle: "Legal documents",
    icon: FileText,
    description:
      "The policies and agreements that apply when you access or use LastKey.",
  },
  {
    id: "compliance",
    number: "05",
    title: "Compliance commitments",
    shortTitle: "Compliance",
    icon: BadgeCheck,
    description:
      "How LastKey approaches privacy, security, accountability and legal compliance.",
  },
  {
    id: "data-protection",
    number: "06",
    title: "Data protection",
    shortTitle: "Data protection",
    icon: Database,
    description:
      "The principles used to process and protect personal and vault-related information.",
  },
  {
    id: "security",
    number: "07",
    title: "Security commitments",
    shortTitle: "Security",
    icon: ShieldCheck,
    description:
      "Technical and organisational measures used to protect LastKey accounts and data.",
  },
  {
    id: "intellectual-property",
    number: "08",
    title: "Intellectual property",
    shortTitle: "IP rights",
    icon: Fingerprint,
    description:
      "Ownership and permitted use of LastKey software, branding and original content.",
  },
  {
    id: "copyright",
    number: "09",
    title: "Copyright notice",
    shortTitle: "Copyright",
    icon: BookOpen,
    description:
      "Rules concerning copying, distribution and reproduction of LastKey materials.",
  },
  {
    id: "trademarks",
    number: "10",
    title: "Trademarks",
    shortTitle: "Trademarks",
    icon: Award,
    description:
      "Information about LastKey names, logos and brand identifiers.",
  },
  {
    id: "open-source",
    number: "11",
    title: "Open-source software",
    shortTitle: "Open source",
    icon: Code2,
    description:
      "How third-party open-source software may be used within the LastKey platform.",
  },
  {
    id: "external-services",
    number: "12",
    title: "External services and links",
    shortTitle: "External services",
    icon: ExternalLink,
    description:
      "Important information about third-party websites, services and integrations.",
  },
  {
    id: "legal-requests",
    number: "13",
    title: "Legal and regulatory requests",
    shortTitle: "Legal requests",
    icon: Landmark,
    description:
      "How LastKey may respond to valid legal, regulatory or law-enforcement requests.",
  },
  {
    id: "disputes",
    number: "14",
    title: "Disputes and governing terms",
    shortTitle: "Disputes",
    icon: Handshake,
    description:
      "General information about dispute resolution and applicable legal terms.",
  },
  {
    id: "updates",
    number: "15",
    title: "Updates to legal information",
    shortTitle: "Updates",
    icon: Clock3,
    description:
      "How LastKey may update, revise or publish legal information.",
  },
  {
    id: "contact",
    number: "16",
    title: "Legal contact",
    shortTitle: "Contact",
    icon: Mail,
    description:
      "How to contact LastKey about legal notices, rights or compliance questions.",
  },
];

const legalDocumentCards = [
  {
    icon: ScrollText,
    title: "Terms of Service",
    description:
      "The contractual rules that govern access to and use of LastKey.",
    route: ROUTES.TERMS,
    action: "Read terms",
  },
  {
    icon: LockKeyhole,
    title: "Privacy Policy",
    description:
      "How personal information is collected, used, protected and managed.",
    route: ROUTES.PRIVACY,
    action: "Read privacy policy",
  },
  {
    icon: ShieldCheck,
    title: "Security information",
    description:
      "The security principles and protections used across the platform.",
    route: ROUTES.SECURITY,
    action: "View security",
  },
];

const companyDetails = [
  {
    label: "Platform name",
    value: "LastKey",
  },
  {
    label: "Service type",
    value: "Digital legacy and secure information-management platform",
  },
  {
    label: "Primary service",
    value: "LastKey web application",
  },
  {
    label: "Legal email",
    value: "legal@lastkey.app",
  },
  {
    label: "Support email",
    value: "support@lastkey.app",
  },
  {
    label: "Last updated",
    value: "26 July 2026",
  },
];

const complianceCommitments = [
  {
    icon: BadgeCheck,
    title: "Lawful processing",
    description:
      "Personal information should be handled for defined, legitimate and transparent purposes.",
  },
  {
    icon: UserCheck,
    title: "User control",
    description:
      "Users should be able to manage account details, permissions and supported rights.",
  },
  {
    icon: Database,
    title: "Data minimisation",
    description:
      "Only information reasonably needed to provide and protect the service should be processed.",
  },
  {
    icon: ShieldCheck,
    title: "Security by design",
    description:
      "Security considerations should be integrated into architecture, workflows and product decisions.",
  },
];

const securityPrinciples = [
  {
    icon: LockKeyhole,
    title: "Access controls",
    description:
      "Authentication, session controls and permissions help limit access to authorised users.",
  },
  {
    icon: Database,
    title: "Protected storage",
    description:
      "Sensitive platform information should be stored using appropriate technical safeguards.",
  },
  {
    icon: ServerCog,
    title: "Operational monitoring",
    description:
      "Systems may be monitored for suspicious activity, abuse, errors and service reliability.",
  },
  {
    icon: AlertTriangle,
    title: "Incident response",
    description:
      "Security incidents should be investigated, contained and handled according to applicable obligations.",
  },
];

const platformResponsibilities = [
  {
    icon: ServerCog,
    title: "What LastKey provides",
    items: [
      "Secure account and vault functionality",
      "Document organisation tools",
      "Nominee and trusted-contact features",
      "Supported emergency-access workflows",
      "Reminders and account notifications",
    ],
  },
  {
    icon: UserCheck,
    title: "What users control",
    items: [
      "Accuracy of account information",
      "Documents and information uploaded",
      "Nominee and permission configuration",
      "Independent copies of critical records",
      "Professional legal and financial decisions",
    ],
  },
];

const dataProtectionPrinciples = [
  {
    number: "01",
    title: "Defined purpose",
    description:
      "Information should be processed for account operation, security, support and supported platform functionality.",
  },
  {
    number: "02",
    title: "Limited access",
    description:
      "Access to personal and vault-related information should be restricted according to role and operational need.",
  },
  {
    number: "03",
    title: "Reasonable retention",
    description:
      "Information should not be retained longer than reasonably necessary, subject to legal and operational obligations.",
  },
  {
    number: "04",
    title: "Supported user rights",
    description:
      "Access, correction, deletion and privacy requests should be handled according to applicable law.",
  },
];

const intellectualPropertyItems = [
  {
    icon: Code2,
    title: "Platform software",
    description:
      "The source code, application logic, architecture and technical implementation remain protected intellectual property.",
  },
  {
    icon: Sparkles,
    title: "Product design",
    description:
      "Interfaces, illustrations, workflows and visual elements may be protected by applicable rights.",
  },
  {
    icon: FileText,
    title: "Documentation",
    description:
      "Guides, help content, policy text and educational materials may not be reproduced without permission.",
  },
  {
    icon: Users,
    title: "User content",
    description:
      "Users retain ownership of eligible content they upload, subject to licences needed to operate the service.",
  },
];

const copyrightPermissions = [
  "View LastKey pages for personal and lawful use",
  "Save reasonable copies of policies for personal records",
  "Share direct links to publicly available LastKey pages",
  "Use platform materials where written permission has been granted",
];

const copyrightRestrictions = [
  "Republish LastKey content as your own material",
  "Sell, licence or commercially distribute platform content",
  "Copy the interface or product experience to create a competing service",
  "Remove ownership, copyright or attribution notices",
];

const trademarkGuidelines = [
  {
    title: "Do not imply endorsement",
    description:
      "LastKey names or visual identifiers must not be used in a way that suggests sponsorship or partnership without written permission.",
  },
  {
    title: "Avoid confusing branding",
    description:
      "Do not register or use names, domains, applications or logos that could reasonably be confused with LastKey.",
  },
  {
    title: "Respect brand integrity",
    description:
      "Official marks should not be modified, distorted or combined with unrelated branding without approval.",
  },
];

const openSourcePrinciples = [
  {
    icon: Code2,
    title: "Third-party licences",
    description:
      "Open-source components remain subject to the licence terms provided by their respective owners.",
  },
  {
    icon: BookOpen,
    title: "Required notices",
    description:
      "Applicable attribution, copyright and licence notices may be provided within product documentation.",
  },
  {
    icon: ShieldCheck,
    title: "No ownership transfer",
    description:
      "Using an open-source component does not transfer ownership of LastKey’s original software or product design.",
  },
];

const externalServiceExamples = [
  "Cloud hosting and infrastructure providers",
  "Email, notification and communication services",
  "Analytics, monitoring and error-reporting tools",
  "Payment processors for eligible subscriptions",
  "Identity, authentication or verification providers",
];

const legalRequestSteps = [
  {
    number: "01",
    title: "Request validation",
    description:
      "The authority, scope and legal basis of the request may be reviewed before information is disclosed.",
  },
  {
    number: "02",
    title: "Scope limitation",
    description:
      "LastKey may seek to narrow requests that are unclear, excessive or unsupported.",
  },
  {
    number: "03",
    title: "User notification",
    description:
      "Where legally permitted, affected users may be notified about a request involving their information.",
  },
  {
    number: "04",
    title: "Secure response",
    description:
      "Required information may be disclosed using appropriate and documented channels.",
  },
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

function LegalSection({
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

function LegalNotice({
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

  const selectedStyle = styles[variant] ?? styles.blue;

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
          <h3 className={`text-sm font-black ${selectedStyle.title}`}>
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

function DocumentCard({
  icon: Icon,
  title,
  description,
  route,
  action,
  index,
}) {
  return (
    <motion.article
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
        amount: 0.25,
      }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
      }}
      whileHover={{
        y: -7,
      }}
      className="group rounded-[26px] border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-48px_rgba(15,23,42,0.5)]"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-violet-50 text-violet-600 transition duration-300 group-hover:rotate-6 group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </span>

      <h3 className="mt-5 text-lg font-black text-slate-950">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        {description}
      </p>

      <Link
        to={route}
        className="mt-5 inline-flex items-center gap-2 text-sm font-black text-violet-700 transition hover:text-violet-800"
      >
        {action}

        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </Link>
    </motion.article>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  index = 0,
  dark = false,
}) {
  return (
    <motion.article
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
        amount: 0.25,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
      }}
      className={`rounded-[24px] border p-5 ${
        dark
          ? "border-slate-800 bg-slate-950 text-white"
          : "border-slate-200 bg-slate-50"
      }`}
    >
      <span
        className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
          dark
            ? "bg-white/10 text-blue-200"
            : "bg-violet-100 text-violet-700"
        }`}
      >
        <Icon className="h-5 w-5" />
      </span>

      <h3
        className={`mt-4 text-base font-black ${
          dark ? "text-white" : "text-slate-950"
        }`}
      >
        {title}
      </h3>

      <p
        className={`mt-2 text-sm leading-7 ${
          dark ? "text-slate-300" : "text-slate-600"
        }`}
      >
        {description}
      </p>
    </motion.article>
  );
}

function CheckList({ items, color = "emerald" }) {
  const iconStyles = {
    emerald: "text-emerald-600",
    violet: "text-violet-600",
    blue: "text-blue-600",
    rose: "text-rose-600",
  };

  const selectedIconStyle =
    iconStyles[color] ?? iconStyles.emerald;

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item} className="flex items-start gap-3">
          <CheckCircle2
            className={`mt-1 h-4 w-4 shrink-0 ${selectedIconStyle}`}
          />

          <span className="text-sm leading-7 text-slate-600">
            {item}
          </span>
        </div>
      ))}
    </div>
  );
}

function NumberedItem({
  number,
  title,
  description,
  hasBorder = false,
}) {
  return (
    <div
      className={`grid gap-4 p-5 sm:grid-cols-[52px_1fr] ${
        hasBorder ? "border-t border-slate-200" : ""
      }`}
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-xs font-black text-blue-700">
        {number}
      </span>

      <div>
        <h3 className="text-sm font-black text-slate-950">
          {title}
        </h3>

        <p className="mt-2 text-sm leading-7 text-slate-600">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function LegalPage() {
  const [mobileNavigationOpen, setMobileNavigationOpen] =
    useState(false);

  const lastUpdated = useMemo(() => "26 July 2026", []);

  const handleSectionNavigation = (sectionId) => {
    setMobileNavigationOpen(false);

    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };
    return (
    <div className="page-enter overflow-hidden bg-slate-50">
      {/* Hero section */}
      <section className="section-shell relative overflow-hidden bg-slate-950 text-white">
        <div className="landing-grid-dark absolute inset-0 opacity-50" />
        <div className="noise-overlay absolute inset-0 opacity-[0.05]" />

        <div className="aurora-blob absolute -left-40 top-10 h-[430px] w-[430px] bg-blue-600/25 blur-3xl" />
        <div className="aurora-blob absolute -right-36 bottom-[-120px] h-[500px] w-[500px] bg-violet-600/25 blur-3xl" />

        <div className="relative mx-auto max-w-[1440px] px-4 py-24 sm:px-6 sm:py-28 lg:px-8">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr]">
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
                Legal information
              </div>

              <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.03] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Legal clarity for a
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                  trusted digital platform.
                </span>
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                Explore LastKey&apos;s legal information, company
                details, compliance commitments, intellectual-property
                notices and platform responsibilities.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur-xl">
                  <Clock3 className="h-4 w-4 text-cyan-300" />
                  Updated {lastUpdated}
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur-xl">
                  <BadgeCheck className="h-4 w-4 text-emerald-300" />
                  Legal information centre
                </span>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  variant="primary"
                  rightIcon={ChevronRight}
                  onClick={() =>
                    handleSectionNavigation("legal-overview")
                  }
                >
                  Explore legal information
                </Button>

                <Link to={ROUTES.TERMS}>
                  <Button
                    size="lg"
                    variant="secondary"
                    rightIcon={ArrowRight}
                  >
                    Read Terms
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
                      <Landmark className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-sm font-black text-white">
                        Legal centre
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        LastKey policies and notices
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                    Current
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      icon: ScrollText,
                      title: "Terms of Service",
                      value: "Published",
                    },
                    {
                      icon: LockKeyhole,
                      title: "Privacy Policy",
                      value: "Published",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Security information",
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
                      This page provides general legal information.
                      Specific rights and obligations are explained in
                      the relevant policy or agreement.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Legal document cards */}
      <section className="section-shell relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="soft-grid absolute inset-0 opacity-25" />

        <div className="section-container relative">
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
              <BookOpen className="h-4 w-4" />
              Key legal documents
            </div>

            <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
              Everything important,
              <span className="gradient-text block">
                organised in one place.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
              Review the documents that explain how LastKey operates,
              protects information and defines user responsibilities.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {legalDocumentCards.map((document, index) => (
              <DocumentCard
                key={document.title}
                {...document}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile section navigation */}
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
            Legal sections
          </span>

          {mobileNavigationOpen ? (
            <X className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
        </button>

        {mobileNavigationOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-3 max-h-[55vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl"
          >
            {legalSections.map((section) => {
              const Icon = section.icon;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() =>
                    handleSectionNavigation(section.id)
                  }
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition hover:bg-slate-100"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 transition group-hover:bg-violet-100">
                    <Icon className="h-4 w-4" />
                  </span>

                  <span className="flex-1">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-violet-600">
                      Section {section.number}
                    </span>

                    <span className="mt-0.5 block text-sm font-bold text-slate-700 group-hover:text-slate-950">
                      {section.shortTitle}
                    </span>
                  </span>

                  <ChevronRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-violet-600" />
                </button>
              );
            })}
          </motion.div>
        )}
      </div>

      {/* Main legal content */}
      <section className="section-shell relative overflow-visible bg-slate-50 py-20 sm:py-24">
        <div className="soft-grid absolute inset-0 opacity-25" />

        <div className="section-container relative">
          <div className="grid items-start gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
            {/* Desktop sidebar */}
            <aside className="hidden lg:sticky lg:top-28 lg:block">
              <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_24px_70px_-52px_rgba(15,23,42,0.5)]">
                <div className="border-b border-slate-100 p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                    On this page
                  </p>

                  <h2 className="mt-2 text-lg font-black text-slate-950">
                    Legal information
                  </h2>
                </div>

                <nav className="max-h-[65vh] overflow-y-auto p-2">
                  {legalSections.map((section) => (
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
                <CircleHelp className="h-6 w-6 text-violet-600" />

                <h3 className="mt-4 text-sm font-black text-slate-950">
                  Need legal assistance?
                </h3>

                <p className="mt-2 text-xs leading-6 text-slate-600">
                  Use the legal-contact section for formal notices,
                  compliance questions or supported rights requests.
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
                              <LegalSection
                id="legal-overview"
                number="01"
                title="Legal overview"
                description={legalSections[0].description}
                icon={legalSections[0].icon}
              >
                <div className="space-y-5 text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  <p>
                    LastKey is a digital legacy and secure
                    information-management platform designed to help
                    users organise important records, manage trusted
                    contacts and prepare supported access workflows.
                  </p>

                  <p>
                    This page provides a central overview of LastKey&apos;s
                    legal notices, company information, compliance
                    commitments, intellectual-property rights and
                    platform responsibilities.
                  </p>

                  <p>
                    Specific rights and obligations may also be governed
                    by the Terms of Service, Privacy Policy, applicable
                    subscription terms and laws relevant to your
                    location.
                  </p>
                </div>

                <div className="mt-7">
                  <LegalNotice
                    icon={Scale}
                    title="General information only"
                    variant="violet"
                  >
                    This page explains LastKey&apos;s general legal
                    framework. It does not provide legal, financial,
                    succession or estate-planning advice for your
                    individual situation.
                  </LegalNotice>
                </div>
              </LegalSection>

              <LegalSection
                id="company-information"
                number="02"
                title="Company information"
                description={legalSections[1].description}
                icon={legalSections[1].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  LastKey is the platform name used for the digital
                  legacy and secure information-management service
                  described across this website.
                </p>

                <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                  {companyDetails.map((detail, index) => (
                    <div
                      key={detail.label}
                      className={`grid gap-2 px-5 py-5 sm:grid-cols-[190px_1fr] ${
                        index > 0
                          ? "border-t border-slate-200"
                          : ""
                      }`}
                    >
                      <span className="text-sm font-black text-slate-950">
                        {detail.label}
                      </span>

                      <span className="text-sm leading-7 text-slate-600">
                        {detail.value}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-7">
                  <LegalNotice
                    icon={Building2}
                    title="Complete official details before launch"
                    variant="blue"
                  >
                    Replace placeholder contact and organisation details
                    with the official legal entity name, registered
                    office address, registration number and jurisdiction
                    before the platform is launched commercially.
                  </LegalNotice>
                </div>
              </LegalSection>

              <LegalSection
                id="platform-role"
                number="03"
                title="Role of the platform"
                description={legalSections[2].description}
                icon={legalSections[2].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  LastKey provides digital tools that help users store,
                  organise and manage supported information. It does not
                  replace professional legal, financial, insurance,
                  succession or estate-planning services.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {platformResponsibilities.map((group) => {
                    const Icon = group.icon;

                    return (
                      <article
                        key={group.title}
                        className="rounded-[24px] border border-slate-200 bg-slate-50 p-5"
                      >
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                          <Icon className="h-5 w-5" />
                        </span>

                        <h3 className="mt-4 text-base font-black text-slate-950">
                          {group.title}
                        </h3>

                        <div className="mt-4">
                          <CheckList items={group.items} />
                        </div>
                      </article>
                    );
                  })}
                </div>

                <div className="mt-7">
                  <LegalNotice
                    icon={AlertTriangle}
                    title="Not a substitute for formal planning"
                    variant="amber"
                  >
                    Important succession, nomination, estate and
                    financial decisions should also be documented
                    through legally valid instruments and qualified
                    professional advice.
                  </LegalNotice>
                </div>
              </LegalSection>

              <LegalSection
                id="legal-documents"
                number="04"
                title="Applicable legal documents"
                description={legalSections[3].description}
                icon={legalSections[3].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Your use of LastKey may be governed by several
                  documents depending on the features, subscriptions and
                  services you access.
                </p>

                <div className="mt-7 space-y-4">
                  {legalDocumentCards.map((document) => {
                    const Icon = document.icon;

                    return (
                      <Link
                        key={document.title}
                        to={document.route}
                        className="group flex flex-col gap-4 rounded-[22px] border border-slate-200 bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg sm:flex-row sm:items-center"
                      >
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
                          <Icon className="h-5 w-5" />
                        </span>

                        <div className="flex-1">
                          <h3 className="text-sm font-black text-slate-950">
                            {document.title}
                          </h3>

                          <p className="mt-2 text-sm leading-7 text-slate-600">
                            {document.description}
                          </p>
                        </div>

                        <ArrowRight className="h-5 w-5 text-slate-300 transition duration-300 group-hover:translate-x-1 group-hover:text-violet-600" />
                      </Link>
                    );
                  })}
                </div>

                <div className="mt-7">
                  <LegalNotice
                    icon={FileText}
                    title="Additional terms may apply"
                    variant="blue"
                  >
                    Where a specific service, integration, subscription
                    or purchase includes additional terms, those terms
                    may apply together with the general policies listed
                    above.
                  </LegalNotice>
                </div>
              </LegalSection>

              <LegalSection
                id="compliance"
                number="05"
                title="Compliance commitments"
                description={legalSections[4].description}
                icon={legalSections[4].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  LastKey aims to develop and operate the platform in a
                  way that supports lawful, transparent and responsible
                  handling of user information.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {complianceCommitments.map(
                    (commitment, index) => (
                      <FeatureCard
                        key={commitment.title}
                        {...commitment}
                        index={index}
                      />
                    ),
                  )}
                </div>

                <div className="mt-7">
                  <LegalNotice
                    icon={BadgeCheck}
                    title="Compliance evolves over time"
                    variant="emerald"
                  >
                    Legal and regulatory requirements may change.
                    LastKey may update policies, controls and procedures
                    as the platform, user base and applicable
                    obligations evolve.
                  </LegalNotice>
                </div>
              </LegalSection>

              <LegalSection
                id="data-protection"
                number="06"
                title="Data protection"
                description={legalSections[5].description}
                icon={legalSections[5].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  LastKey&apos;s data-protection approach is based on
                  purpose limitation, access control, transparency,
                  security and reasonable retention practices.
                </p>

                <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                  {dataProtectionPrinciples.map(
                    (principle, index) => (
                      <NumberedItem
                        key={principle.number}
                        {...principle}
                        hasBorder={index > 0}
                      />
                    ),
                  )}
                </div>

                <div className="mt-7">
                  <LegalNotice
                    icon={Database}
                    title="Review the Privacy Policy"
                    variant="violet"
                  >
                    The Privacy Policy provides more detailed
                    information about data categories, processing
                    purposes, storage, retention, sharing and supported
                    user rights.
                  </LegalNotice>
                </div>
              </LegalSection>

              <LegalSection
                id="security"
                number="07"
                title="Security commitments"
                description={legalSections[6].description}
                icon={legalSections[6].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  LastKey aims to use appropriate technical and
                  organisational measures to protect accounts,
                  documents, permissions and platform operations.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {securityPrinciples.map((principle, index) => (
                    <FeatureCard
                      key={principle.title}
                      {...principle}
                      index={index}
                      dark
                    />
                  ))}
                </div>

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <LegalNotice
                    icon={ShieldCheck}
                    title="Shared responsibility"
                    variant="emerald"
                  >
                    LastKey protects the platform, while users remain
                    responsible for protecting passwords, devices,
                    verification codes and account-recovery details.
                  </LegalNotice>

                  <LegalNotice
                    icon={AlertTriangle}
                    title="No system is risk-free"
                    variant="amber"
                  >
                    No online platform can guarantee absolute security.
                    Users should maintain appropriate independent copies
                    of highly critical records.
                  </LegalNotice>
                </div>

                <div className="mt-7">
                  <Link
                    to={ROUTES.SECURITY}
                    className="group inline-flex items-center gap-2 text-sm font-black text-violet-700 transition hover:text-violet-800"
                  >
                    Read the complete security overview
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </div>
              </LegalSection>

              <LegalSection
                id="intellectual-property"
                number="08"
                title="Intellectual property"
                description={legalSections[7].description}
                icon={legalSections[7].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  LastKey and its licensors retain all rights, title and
                  interest in the platform, including its software,
                  interface, designs, branding, documentation, features
                  and original content.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  {intellectualPropertyItems.map((item, index) => (
                    <FeatureCard
                      key={item.title}
                      {...item}
                      index={index}
                    />
                  ))}
                </div>

                <div className="mt-7">
                  <LegalNotice
                    icon={Fingerprint}
                    title="Limited permission to use LastKey"
                    variant="violet"
                  >
                    Access to LastKey grants a limited, personal,
                    revocable and non-transferable right to use the
                    platform according to the Terms of Service. It does
                    not transfer ownership of LastKey or its
                    intellectual property.
                  </LegalNotice>
                </div>
              </LegalSection>
                            <LegalSection
                id="copyright"
                number="09"
                title="Copyright notice"
                description={legalSections[8].description}
                icon={legalSections[8].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Unless otherwise stated, LastKey&apos;s website,
                  application, original written content, product
                  materials, visual elements and documentation are
                  protected by applicable copyright laws.
                </p>

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <article className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white">
                        <CheckCircle2 className="h-5 w-5" />
                      </span>

                      <h3 className="text-base font-black text-emerald-950">
                        Permitted use
                      </h3>
                    </div>

                    <div className="mt-5">
                      <CheckList
                        items={copyrightPermissions}
                        color="emerald"
                      />
                    </div>
                  </article>

                  <article className="rounded-[24px] border border-rose-200 bg-rose-50 p-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-600 text-white">
                        <AlertTriangle className="h-5 w-5" />
                      </span>

                      <h3 className="text-base font-black text-rose-950">
                        Restricted use
                      </h3>
                    </div>

                    <div className="mt-5">
                      <CheckList
                        items={copyrightRestrictions}
                        color="rose"
                      />
                    </div>
                  </article>
                </div>

                <div className="mt-7">
                  <LegalNotice
                    icon={BookOpen}
                    title="Permission requests"
                    variant="blue"
                  >
                    Requests to reproduce, publish or commercially use
                    LastKey-owned content should be submitted to the
                    legal contact address before the material is used.
                  </LegalNotice>
                </div>
              </LegalSection>

              <LegalSection
                id="trademarks"
                number="10"
                title="Trademarks"
                description={legalSections[9].description}
                icon={legalSections[9].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  The LastKey name, product identity, logos, icons,
                  slogans and related visual identifiers may be
                  protected as trademarks, service marks or other brand
                  assets.
                </p>

                <div className="mt-7 space-y-4">
                  {trademarkGuidelines.map((guideline, index) => (
                    <motion.article
                      key={guideline.title}
                      initial={{
                        opacity: 0,
                        x: 18,
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
                        duration: 0.4,
                        delay: index * 0.06,
                      }}
                      className="flex gap-4 rounded-[22px] border border-slate-200 bg-slate-50 p-5"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-xs font-black text-violet-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h3 className="text-sm font-black text-slate-950">
                          {guideline.title}
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-slate-600">
                          {guideline.description}
                        </p>
                      </div>
                    </motion.article>
                  ))}
                </div>

                <div className="mt-7">
                  <LegalNotice
                    icon={Award}
                    title="No automatic brand licence"
                    variant="violet"
                  >
                    Accessing or using LastKey does not grant permission
                    to use its brand identity, logos or marks in
                    advertising, products, domains or public
                    communications.
                  </LegalNotice>
                </div>
              </LegalSection>

              <LegalSection
                id="open-source"
                number="11"
                title="Open-source software"
                description={legalSections[10].description}
                icon={legalSections[10].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  LastKey may incorporate open-source libraries,
                  frameworks and software components developed and
                  maintained by third parties.
                </p>

                <div className="mt-7 grid gap-5 md:grid-cols-3">
                  {openSourcePrinciples.map((principle, index) => (
                    <FeatureCard
                      key={principle.title}
                      {...principle}
                      index={index}
                    />
                  ))}
                </div>

                <div className="mt-7">
                  <LegalNotice
                    icon={Code2}
                    title="Separate licence terms"
                    variant="blue"
                  >
                    Open-source components are governed by their own
                    licences. Those licences apply only to the relevant
                    components and do not grant rights over LastKey&apos;s
                    independently developed software or branding.
                  </LegalNotice>
                </div>
              </LegalSection>

              <LegalSection
                id="external-services"
                number="12"
                title="External services and links"
                description={legalSections[11].description}
                icon={legalSections[11].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  LastKey may rely on or provide access to third-party
                  websites, integrations and infrastructure services.
                  These services may operate under their own terms,
                  privacy policies and security practices.
                </p>

                <div className="mt-7 rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white">
                      <Globe2 className="h-5 w-5" />
                    </span>

                    <div>
                      <h3 className="text-base font-black text-slate-950">
                        Examples of external providers
                      </h3>

                      <p className="mt-1 text-sm text-slate-600">
                        Services that may support platform operations.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <CheckList
                      items={externalServiceExamples}
                      color="blue"
                    />
                  </div>
                </div>

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <LegalNotice
                    icon={ExternalLink}
                    title="Third-party terms"
                    variant="violet"
                  >
                    When you access an external service, its own legal
                    terms and privacy practices may govern your use of
                    that service.
                  </LegalNotice>

                  <LegalNotice
                    icon={AlertTriangle}
                    title="Independent responsibility"
                    variant="amber"
                  >
                    LastKey is not responsible for external content,
                    availability or conduct that remains outside its
                    reasonable control.
                  </LegalNotice>
                </div>
              </LegalSection>

              <LegalSection
                id="legal-requests"
                number="13"
                title="Legal and regulatory requests"
                description={legalSections[12].description}
                icon={legalSections[12].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  LastKey may receive requests from courts, regulators,
                  public authorities or law-enforcement agencies. Any
                  disclosure should be limited to what is legally
                  required and reasonably verified.
                </p>

                <div className="mt-7 overflow-hidden rounded-[24px] border border-slate-200 bg-white">
                  {legalRequestSteps.map((step, index) => (
                    <NumberedItem
                      key={step.number}
                      {...step}
                      hasBorder={index > 0}
                    />
                  ))}
                </div>

                <div className="mt-7">
                  <LegalNotice
                    icon={Landmark}
                    title="Emergency disclosures"
                    variant="rose"
                  >
                    Where permitted by law, LastKey may disclose limited
                    information when it reasonably believes this is
                    necessary to prevent serious harm, fraud, abuse or a
                    significant security threat.
                  </LegalNotice>
                </div>
              </LegalSection>

              <LegalSection
                id="disputes"
                number="14"
                title="Disputes and governing terms"
                description={legalSections[13].description}
                icon={legalSections[13].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Disputes related to LastKey should first be addressed
                  through good-faith communication. The applicable Terms
                  of Service may define the governing law, jurisdiction
                  and formal dispute-resolution procedure.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-3">
                  {[
                    {
                      icon: Mail,
                      title: "Direct communication",
                      description:
                        "Contact LastKey with a clear description of the issue and the resolution requested.",
                    },
                    {
                      icon: Handshake,
                      title: "Good-faith resolution",
                      description:
                        "Both parties should make reasonable efforts to resolve eligible concerns informally.",
                    },
                    {
                      icon: Scale,
                      title: "Formal process",
                      description:
                        "Unresolved disputes may proceed according to applicable law and the Terms of Service.",
                    },
                  ].map((item, index) => (
                    <FeatureCard
                      key={item.title}
                      {...item}
                      index={index}
                    />
                  ))}
                </div>

                <div className="mt-7">
                  <LegalNotice
                    icon={Scale}
                    title="Jurisdiction details"
                    variant="blue"
                  >
                    Before public launch, the Terms of Service should
                    identify the official legal entity, governing law
                    and competent courts or another valid
                    dispute-resolution mechanism.
                  </LegalNotice>
                </div>
              </LegalSection>

              <LegalSection
                id="updates"
                number="15"
                title="Updates to legal information"
                description={legalSections[14].description}
                icon={legalSections[14].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  LastKey may revise this page and related legal
                  documents to reflect changes in law, platform
                  features, security practices, business operations or
                  third-party services.
                </p>

                <div className="mt-7 grid gap-5 sm:grid-cols-2">
                  <article className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                    <Clock3 className="h-6 w-6 text-violet-600" />

                    <h3 className="mt-4 text-base font-black text-slate-950">
                      Effective date
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Updated information generally becomes effective
                      when published unless a different date is stated.
                    </p>
                  </article>

                  <article className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                    <BadgeCheck className="h-6 w-6 text-emerald-600" />

                    <h3 className="mt-4 text-base font-black text-slate-950">
                      Material changes
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      Where appropriate, users may receive notice of
                      significant updates through email, account
                      notifications or the website.
                    </p>
                  </article>
                </div>

                <div className="mt-7">
                  <LegalNotice
                    icon={Clock3}
                    title="Review policies regularly"
                    variant="violet"
                  >
                    The revision date shown on each legal document helps
                    users identify when it was most recently updated.
                    Continued use may be subject to the revised terms.
                  </LegalNotice>
                </div>
              </LegalSection>

              <LegalSection
                id="contact"
                number="16"
                title="Legal contact"
                description={legalSections[15].description}
                icon={legalSections[15].icon}
              >
                <p className="text-sm leading-7 text-slate-600 sm:text-base sm:leading-8">
                  Contact LastKey for formal legal notices, copyright
                  concerns, trademark questions, privacy-rights
                  requests, regulatory enquiries or compliance-related
                  matters.
                </p>

                <div className="mt-7 grid gap-5 md:grid-cols-2">
                  <article className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white">
                      <Mail className="h-5 w-5" />
                    </span>

                    <h3 className="mt-5 text-lg font-black text-slate-950">
                      Legal enquiries
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      For legal notices, intellectual-property matters
                      and regulatory requests.
                    </p>

                    <a
                      href="mailto:legal@lastkey.app"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-black text-violet-700 transition hover:text-violet-800"
                    >
                      legal@lastkey.app
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </article>

                  <article className="rounded-[24px] border border-slate-200 bg-slate-50 p-6">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600 text-white">
                      <CircleHelp className="h-5 w-5" />
                    </span>

                    <h3 className="mt-5 text-lg font-black text-slate-950">
                      General support
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-slate-600">
                      For account assistance, product questions and
                      general support enquiries.
                    </p>

                    <a
                      href="mailto:support@lastkey.app"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-black text-violet-700 transition hover:text-violet-800"
                    >
                      support@lastkey.app
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </article>
                </div>

                <div className="mt-7">
                  <LegalNotice
                    icon={Mail}
                    title="Include useful request details"
                    variant="emerald"
                  >
                    Include your name, account email where applicable,
                    the nature of your request and any relevant
                    supporting information. Do not email passwords,
                    recovery codes or full confidential documents.
                  </LegalNotice>
                </div>
              </LegalSection>
            </main>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-shell relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
        <div className="landing-grid-dark absolute inset-0 opacity-50" />

        <div className="absolute -left-40 top-0 h-[400px] w-[400px] rounded-full bg-blue-600/20 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-3xl" />

        <div className="section-container relative">
          <motion.div
            initial={{
              opacity: 0,
              y: 26,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
              amount: 0.35,
            }}
            transition={{
              duration: 0.6,
            }}
            className="overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.06] px-6 py-12 text-center shadow-2xl backdrop-blur-2xl sm:px-10 sm:py-16"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-violet-900/30">
              <ShieldCheck className="h-6 w-6" />
            </span>

            <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              Build your digital legacy
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                with clarity and control.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">
              Create your LastKey account and start organising the
              information, documents and trusted relationships that
              matter most.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link to={ROUTES.REGISTER}>
                <Button
                  size="lg"
                  variant="primary"
                  rightIcon={ArrowRight}
                >
                  Create your account
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

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs font-bold text-slate-400">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Secure account setup
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Clear privacy controls
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Trusted-contact workflows
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
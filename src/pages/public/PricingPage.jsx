import { Fragment, useState } from "react";
import {
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Crown,
  FileCheck2,
  LockKeyhole,
  Minus,
  Rocket,
  ShieldCheck,
  Sparkles,
  Star,
  UsersRound,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { Link } from "react-router-dom";

import CTASection from "../../components/landing/CTASection";
import Button from "../../components/ui/Button";
import { ROUTES } from "../../utils/routePaths";

const plans = [
  {
    id: "starter",
    name: "Starter",
    description:
      "A secure starting point for organising your essential personal documents.",
    icon: Rocket,
    monthlyPrice: 0,
    yearlyPrice: 0,
    priceSuffix: "forever",
    accent: "from-blue-600 to-cyan-500",
    softBackground:
      "from-blue-50 via-white to-cyan-50",
    border: "border-blue-200",
    iconBackground: "bg-blue-100 text-blue-700",
    buttonVariant: "secondary",
    badge: null,
    features: [
      "Up to 25 documents",
      "2 trusted nominees",
      "1 GB secure storage",
      "Basic document organisation",
      "Emergency-access preparation",
      "Account activity overview",
    ],
  },
  {
    id: "professional",
    name: "Professional",
    description:
      "Advanced protection for individuals and families managing important records.",
    icon: Crown,
    monthlyPrice: 499,
    yearlyPrice: 4790,
    priceSuffix: "per month",
    accent:
      "from-violet-600 via-purple-600 to-fuchsia-500",
    softBackground:
      "from-violet-50 via-white to-fuchsia-50",
    border: "border-violet-300",
    iconBackground:
      "bg-violet-100 text-violet-700",
    buttonVariant: "primary",
    badge: "Most popular",
    features: [
      "Up to 500 documents",
      "10 trusted nominees",
      "25 GB secure storage",
      "AI document classification",
      "Document insights and reminders",
      "Complete emergency workflow",
      "Detailed audit history",
      "Priority email support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description:
      "Flexible security and administration for organisations and professional teams.",
    icon: Building2,
    monthlyPrice: null,
    yearlyPrice: null,
    priceSuffix: "custom pricing",
    accent:
      "from-amber-500 via-orange-500 to-rose-500",
    softBackground:
      "from-amber-50 via-white to-orange-50",
    border: "border-amber-300",
    iconBackground:
      "bg-amber-100 text-amber-700",
    buttonVariant: "dark",
    badge: "Custom",
    features: [
      "Unlimited document capacity",
      "Unlimited authorised members",
      "Custom storage allocation",
      "Organisation-level permissions",
      "Advanced security monitoring",
      "Custom emergency workflows",
      "Dedicated onboarding support",
      "Service-level support options",
    ],
  },
];

const comparisonRows = [
  {
    category: "Vault",
    features: [
      {
        name: "Secure document storage",
        starter: "1 GB",
        professional: "25 GB",
        enterprise: "Custom",
      },
      {
        name: "Document limit",
        starter: "25",
        professional: "500",
        enterprise: "Unlimited",
      },
      {
        name: "File organisation",
        starter: true,
        professional: true,
        enterprise: true,
      },
      {
        name: "Document version history",
        starter: false,
        professional: true,
        enterprise: true,
      },
    ],
  },
  {
    category: "AI and automation",
    features: [
      {
        name: "AI document classification",
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: "Smart document insights",
        starter: false,
        professional: true,
        enterprise: true,
      },
      {
        name: "Expiry and renewal reminders",
        starter: "Basic",
        professional: "Advanced",
        enterprise: "Advanced",
      },
      {
        name: "Risk monitoring",
        starter: false,
        professional: "Standard",
        enterprise: "Custom",
      },
    ],
  },
  {
    category: "Access and nominees",
    features: [
      {
        name: "Trusted nominees",
        starter: "2",
        professional: "10",
        enterprise: "Unlimited",
      },
      {
        name: "Role-based permissions",
        starter: "Basic",
        professional: "Advanced",
        enterprise: "Custom",
      },
      {
        name: "Emergency access workflow",
        starter: "Basic",
        professional: "Complete",
        enterprise: "Custom",
      },
      {
        name: "Access audit logs",
        starter: "Limited",
        professional: "Complete",
        enterprise: "Complete",
      },
    ],
  },
  {
    category: "Support",
    features: [
      {
        name: "Help centre access",
        starter: true,
        professional: true,
        enterprise: true,
      },
      {
        name: "Email support",
        starter: "Standard",
        professional: "Priority",
        enterprise: "Dedicated",
      },
      {
        name: "Onboarding support",
        starter: false,
        professional: false,
        enterprise: true,
      },
      {
        name: "Custom implementation support",
        starter: false,
        professional: false,
        enterprise: true,
      },
    ],
  },
];

const frequentlyAskedQuestions = [
  {
    question:
      "Can I start using LastKey for free?",
    answer:
      "Yes. The Starter plan lets you create a secure vault, upload essential documents and add up to two trusted nominees without entering payment information.",
  },
  {
    question: "Can I change my plan later?",
    answer:
      "Yes. You can upgrade when you need more storage, documents, nominees or advanced security features. Your existing vault information remains available during the change.",
  },
  {
    question:
      "What happens when I reach my storage limit?",
    answer:
      "Your existing documents remain protected. You will need to remove unnecessary files or upgrade your plan before uploading additional documents.",
  },
  {
    question: "Is yearly billing cheaper?",
    answer:
      "Yes. The yearly Professional plan includes a saving compared with paying month by month.",
  },
  {
    question:
      "Are my uploaded documents encrypted?",
    answer:
      "LastKey is designed around protected storage, controlled access and secure communication. Production deployment should use encryption in transit and at rest together with strong access controls.",
  },
  {
    question:
      "Does a nominee get immediate access?",
    answer:
      "No. Nominee access depends on the permissions and emergency-release conditions configured by the vault owner. Adding a nominee does not automatically expose every document.",
  },
  {
    question:
      "What is included in the Enterprise plan?",
    answer:
      "Enterprise plans can include custom storage, organisation-level roles, administrative controls, dedicated onboarding and customised emergency workflows.",
  },
];

function PriceValue({
  plan,
  yearlyBilling,
}) {
  if (plan.monthlyPrice === null) {
    return (
      <div className="mt-7">
        <p className="text-4xl font-black tracking-[-0.05em] text-slate-950">
          Let&apos;s talk
        </p>

        <p className="mt-2 text-sm font-semibold text-slate-500">
          {plan.priceSuffix}
        </p>
      </div>
    );
  }

  const displayedPrice = yearlyBilling
    ? plan.yearlyPrice
    : plan.monthlyPrice;

  if (displayedPrice === 0) {
    return (
      <div className="mt-7">
        <p className="text-5xl font-black tracking-[-0.06em] text-slate-950">
          Free
        </p>

        <p className="mt-2 text-sm font-semibold text-slate-500">
          No payment card required
        </p>
      </div>
    );
  }

  return (
    <div className="mt-7">
      <div className="flex items-end gap-2">
        <p className="text-5xl font-black tracking-[-0.06em] text-slate-950">
          ₹
          {displayedPrice.toLocaleString(
            "en-IN",
          )}
        </p>

        <span className="pb-1.5 text-sm font-bold text-slate-500">
          /{yearlyBilling ? "year" : "month"}
        </span>
      </div>

      {yearlyBilling ? (
        <p className="mt-2 text-sm font-semibold text-emerald-600">
          Equivalent to approximately ₹399 per
          month
        </p>
      ) : (
        <p className="mt-2 text-sm font-semibold text-slate-500">
          Cancel or change your plan anytime
        </p>
      )}
    </div>
  );
}

function ComparisonValue({ value }) {
  if (value === true) {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <Check className="h-4 w-4 stroke-[3]" />
      </span>
    );
  }

  if (value === false) {
    return (
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-400">
        <Minus className="h-4 w-4" />
      </span>
    );
  }

  return (
    <span className="text-sm font-bold text-slate-700">
      {value}
    </span>
  );
}

export default function PricingPage() {
  const [yearlyBilling, setYearlyBilling] =
    useState(true);

  const [openQuestion, setOpenQuestion] =
    useState(0);

  const handleQuestionToggle = (index) => {
    setOpenQuestion((currentIndex) =>
      currentIndex === index ? null : index,
    );
  };

  return (
    <div className="page-enter overflow-hidden">
      {/* Hero */}
      <section className="section-shell overflow-hidden bg-slate-950 text-white">
        <div className="landing-grid-dark absolute inset-0 opacity-50" />
        <div className="noise-overlay opacity-[0.05]" />

        <div className="aurora-blob -left-40 top-0 h-[430px] w-[430px] bg-blue-600/25 float-slow" />
        <div className="aurora-blob -right-40 bottom-0 h-[480px] w-[480px] bg-violet-600/25 float-medium" />

        <div className="relative mx-auto max-w-[1440px] px-4 py-24 text-center sm:px-6 sm:py-28 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mx-auto max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-xs font-black text-violet-200 backdrop-blur-xl">
              <Sparkles className="h-4 w-4" />
              Simple & Transparent Pricing
            </div>

            <h1 className="mt-8 text-5xl font-black tracking-[-0.06em] leading-[1.02] sm:text-6xl lg:text-7xl">
              Protect what matters.
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                Upgrade only when you need more.
              </span>
            </h1>

            <p className="mx-auto mt-7 max-w-3xl text-lg leading-8 text-slate-300">
              Start for free and securely organize your digital life.
              Scale effortlessly as your family, documents and emergency
              workflows grow.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {[
                "No hidden fees",
                "Cancel anytime",
                "Bank-grade security",
              ].map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur-xl"
                >
                  <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-10 inline-flex items-center rounded-2xl border border-white/10 bg-white/[0.07] p-1.5 backdrop-blur-xl">
              <button
                type="button"
                onClick={() => setYearlyBilling(false)}
                className={`rounded-xl px-5 py-3 text-sm font-black transition ${
                  yearlyBilling
                    ? "text-slate-400 hover:text-white"
                    : "bg-white text-slate-950 shadow-lg"
                }`}
              >
                Monthly
              </button>

              <button
                type="button"
                onClick={() => setYearlyBilling(true)}
                className={`rounded-xl px-5 py-3 text-sm font-black transition ${
                  yearlyBilling
                    ? "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Yearly
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="section-shell bg-gradient-to-b from-slate-50 via-white to-slate-50 py-24">
        <div className="section-container">
          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              const featured = plan.id === "professional";

              return (
                <motion.article
                  key={plan.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -10 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  viewport={{ once: true }}
                  className={`relative overflow-hidden rounded-[32px] border bg-gradient-to-br p-8 ${
                    plan.softBackground
                  } ${plan.border} ${
                    featured
                      ? "lg:-mt-6 shadow-[0_35px_90px_-40px_rgba(124,58,237,0.55)]"
                      : "shadow-[0_25px_70px_-45px_rgba(15,23,42,0.45)]"
                  }`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r ${plan.accent}`}
                  />

                  {plan.badge && (
                    <div
                      className={`absolute right-6 top-6 rounded-full px-3 py-1 text-xs font-black ${
                        featured
                          ? "bg-violet-600 text-white"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {plan.badge}
                    </div>
                  )}

                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl ${plan.iconBackground}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <h2 className="mt-6 text-2xl font-black text-slate-950">
                    {plan.name}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {plan.description}
                  </p>

                  <PriceValue
                    plan={plan}
                    yearlyBilling={yearlyBilling}
                  />

                  <div className="my-8 h-px bg-slate-200" />

                  <div className="space-y-4">
                    {plan.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-start gap-3"
                      >
                        <span
                          className={`mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br ${plan.accent} text-white`}
                        >
                          <Check className="h-3 w-3 stroke-[3]" />
                        </span>

                        <span className="text-sm font-semibold text-slate-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    {plan.id === "enterprise" ? (
                      <Link to={ROUTES.REGISTER}>
                        <Button
                          fullWidth
                          size="lg"
                          variant={plan.buttonVariant}
                          rightIcon={ArrowRight}
                        >
                          Get Started
                        </Button>
                      </Link>
                    ) : (
                      <Link to={ROUTES.REGISTER}>
                        <Button
                          fullWidth
                          size="lg"
                          variant={plan.buttonVariant}
                          rightIcon={ArrowRight}
                        >
                          {plan.id === "starter"
                            ? "Start for Free"
                            : "Choose Professional"}
                        </Button>
                      </Link>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mx-auto mt-20 max-w-4xl rounded-[30px] border border-slate-200 bg-white p-8 shadow-[0_25px_70px_-45px_rgba(15,23,42,0.5)]"
          >
            <div className="grid items-center gap-6 sm:grid-cols-[auto_1fr_auto]">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                <ShieldCheck className="h-6 w-6" />
              </span>

              <div>
                <h3 className="text-lg font-black text-slate-950">
                  Security included in every plan
                </h3>

                <p className="mt-2 text-sm leading-7 text-slate-500">
                  Every LastKey plan includes secure authentication,
                  encrypted vault access and controlled nominee
                  permissions.
                </p>
              </div>

              <div className="flex items-center gap-2 text-sm font-black text-emerald-600">
                <LockKeyhole className="h-5 w-5" />
                Protected
              </div>
            </div>
          </motion.div>
        </div>
      </section>
            {/* Feature comparison */}
      <section className="section-shell overflow-hidden bg-white py-24 sm:py-28">
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
            transition={{
              duration: 0.65,
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-xs font-black text-blue-700">
              <FileCheck2 className="h-4 w-4" />
              Compare plans
            </div>

            <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
              Find the protection level that
              <span className="gradient-text block">
                matches your needs.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
              Compare storage, AI capabilities, nominee access,
              emergency workflows and support across all LastKey plans.
            </p>
          </motion.div>

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
              amount: 0.1,
            }}
            transition={{
              duration: 0.65,
            }}
            className="mt-14 overflow-hidden rounded-[30px] border border-slate-200 bg-white shadow-[0_30px_90px_-55px_rgba(15,23,42,0.55)]"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[820px] border-collapse">
                <thead>
                  <tr className="bg-slate-950 text-white">
                    <th className="w-[40%] px-6 py-6 text-left text-sm font-black">
                      Features
                    </th>

                    <th className="px-5 py-6 text-center text-sm font-black">
                      Starter
                    </th>

                    <th className="bg-violet-600 px-5 py-6 text-center text-sm font-black">
                      <span className="inline-flex items-center gap-2">
                        <Star className="h-4 w-4 fill-current" />
                        Professional
                      </span>
                    </th>

                    <th className="px-5 py-6 text-center text-sm font-black">
                      Enterprise
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {comparisonRows.map((group) => (
                    <Fragment key={group.category}>
                      <tr>
                        <td
                          colSpan={4}
                          className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-xs font-black uppercase tracking-[0.15em] text-slate-500"
                        >
                          {group.category}
                        </td>
                      </tr>

                      {group.features.map((feature) => (
                        <tr
                          key={feature.name}
                          className="border-t border-slate-100 transition-colors hover:bg-slate-50/70"
                        >
                          <td className="px-6 py-5 text-sm font-bold text-slate-700">
                            {feature.name}
                          </td>

                          <td className="px-5 py-5 text-center">
                            <ComparisonValue
                              value={feature.starter}
                            />
                          </td>

                          <td className="bg-violet-50/45 px-5 py-5 text-center">
                            <ComparisonValue
                              value={feature.professional}
                            />
                          </td>

                          <td className="px-5 py-5 text-center">
                            <ComparisonValue
                              value={feature.enterprise}
                            />
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-shell overflow-hidden bg-gradient-to-b from-slate-50 to-white py-24 sm:py-28">
        <div className="soft-grid absolute inset-0 opacity-30" />

        <div className="section-container">
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr]">
            <motion.div
              initial={{
                opacity: 0,
                x: -22,
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
                duration: 0.65,
              }}
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-black text-violet-700">
                <CircleHelp className="h-4 w-4" />
                Pricing questions
              </div>

              <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
                Frequently asked
                <span className="gradient-text block">
                  questions.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-8 text-slate-600">
                Everything you need to know before selecting a LastKey
                plan.
              </p>

              <div className="mt-8 rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                    <UsersRound className="h-5 w-5" />
                  </span>

                  <div>
                    <h3 className="text-sm font-black text-slate-950">
                      Need help choosing?
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Create your account and begin with the free plan.
                      You can upgrade later when your requirements grow.
                    </p>
                  </div>
                </div>

                <Link
                  to={ROUTES.REGISTER}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-600 transition hover:text-blue-700"
                >
                  Start with LastKey
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <div className="space-y-4">
              {frequentlyAskedQuestions.map((item, index) => {
                const isOpen = openQuestion === index;

                return (
                  <motion.article
                    key={item.question}
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
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.04,
                    }}
                    className={`overflow-hidden rounded-[24px] border bg-white transition-all duration-300 ${
                      isOpen
                        ? "border-violet-300 shadow-[0_20px_55px_-38px_rgba(124,58,237,0.55)]"
                        : "border-slate-200 shadow-sm hover:border-slate-300"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        handleQuestionToggle(index)
                      }
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
                    >
                      <span className="flex items-center gap-4">
                        <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${
                            isOpen
                              ? "bg-violet-600 text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {isOpen ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <CircleHelp className="h-4 w-4" />
                          )}
                        </span>

                        <span className="text-sm font-black leading-6 text-slate-950 sm:text-base">
                          {item.question}
                        </span>
                      </span>

                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{
                            height: 0,
                            opacity: 0,
                          }}
                          animate={{
                            height: "auto",
                            opacity: 1,
                          }}
                          exit={{
                            height: 0,
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.28,
                          }}
                        >
                          <div className="border-t border-slate-100 px-5 pb-6 pt-5 sm:px-6">
                            <p className="text-sm leading-7 text-slate-600">
                              {item.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
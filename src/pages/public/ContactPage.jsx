import { useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  Building2,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Clock3,
  FileText,
  Headphones,
  LifeBuoy,
  LockKeyhole,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

import Button from "../../components/ui/Button";
import { ROUTES } from "../../utils/routePaths";

const contactOptions = [
  {
    icon: Headphones,
    title: "Product support",
    description:
      "Get help with your account, documents, nominees, notifications and platform features.",
    email: "support@lastkey.app",
    responseTime: "Usually within 24 hours",
  },
  {
    icon: ShieldCheck,
    title: "Security enquiries",
    description:
      "Report security concerns, suspicious activity or responsible-disclosure information.",
    email: "security@lastkey.app",
    responseTime: "Priority review",
  },
  {
    icon: FileText,
    title: "Legal and privacy",
    description:
      "Contact us about legal notices, privacy rights, copyright or compliance matters.",
    email: "legal@lastkey.app",
    responseTime: "Usually within 2 business days",
  },
  {
    icon: Users,
    title: "Partnerships",
    description:
      "Discuss business partnerships, institutional use or collaboration opportunities.",
    email: "partners@lastkey.app",
    responseTime: "Usually within 2 business days",
  },
];

const supportDetails = [
  {
    icon: Clock3,
    label: "Support hours",
    value: "Monday to Saturday",
    detail: "9:00 AM – 7:00 PM IST",
  },
  {
    icon: MapPin,
    label: "Primary location",
    value: "Ghaziabad, Uttar Pradesh",
    detail: "India",
  },
  {
    icon: Mail,
    label: "General email",
    value: "hello@lastkey.app",
    detail: "For general enquiries",
  },
];

const enquirySubjects = [
  "General enquiry",
  "Account support",
  "Technical issue",
  "Security concern",
  "Privacy request",
  "Legal enquiry",
  "Partnership opportunity",
  "Feedback or suggestion",
];

const frequentlyAskedQuestions = [
  {
    question: "How quickly will LastKey respond?",
    answer:
      "Most general and account-support enquiries are reviewed within 24 hours. Legal, privacy and partnership requests may take up to two business days. Security reports receive priority review.",
  },
  {
    question: "Should I include my password or recovery code?",
    answer:
      "No. Never send your password, one-time verification code, private key or account-recovery code through the contact form or email.",
  },
  {
    question: "How do I report suspicious account activity?",
    answer:
      "Choose the Security concern subject and explain what you noticed, when it occurred and which account email is affected. Avoid including sensitive credentials.",
  },
  {
    question: "Can I request deletion of my personal data?",
    answer:
      "Yes. Choose Privacy request and provide the email connected to your account. Identity verification may be required before the request is completed.",
  },
  {
    question: "Can organisations partner with LastKey?",
    answer:
      "Yes. LastKey may explore partnerships with legal, financial, insurance, healthcare and digital-service organisations. Select Partnership opportunity in the contact form.",
  },
];

const initialFormValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
  consent: false,
};

function ContactOptionCard({
  icon: Icon,
  title,
  description,
  email,
  responseTime,
  index,
}) {
  return (
    <motion.article
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
        duration: 0.5,
        delay: index * 0.07,
      }}
      whileHover={{
        y: -7,
      }}
      className="group rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_24px_65px_-50px_rgba(15,23,42,0.55)] transition duration-300 hover:border-violet-200"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-violet-100 text-violet-700 transition duration-300 group-hover:rotate-6 group-hover:scale-110">
        <Icon className="h-5 w-5" />
      </span>

      <h3 className="mt-5 text-lg font-black tracking-[-0.025em] text-slate-950">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-slate-600">
        {description}
      </p>

      <a
        href={`mailto:${email}`}
        className="mt-5 inline-flex items-center gap-2 text-sm font-black text-violet-700 transition hover:text-violet-900"
      >
        {email}

        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
      </a>

      <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4 text-xs font-bold text-slate-500">
        <Clock3 className="h-4 w-4 text-emerald-600" />
        {responseTime}
      </div>
    </motion.article>
  );
}

function SupportDetailCard({
  icon: Icon,
  label,
  value,
  detail,
  index,
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
        amount: 0.3,
      }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
      }}
      className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
        <Icon className="h-5 w-5" />
      </span>

      <p className="mt-4 text-xs font-black uppercase tracking-[0.15em] text-blue-300">
        {label}
      </p>

      <h3 className="mt-2 text-base font-black text-white">
        {value}
      </h3>

      <p className="mt-1 text-sm text-slate-400">
        {detail}
      </p>
    </motion.article>
  );
}

function FormField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  onChange,
  icon: Icon,
  autoComplete,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-black text-slate-800"
      >
        {label}
      </label>

      <div className="relative">
        <Icon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onChange={onChange}
          className={`h-13 w-full rounded-2xl border bg-white py-3.5 pl-11 pr-4 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 ${
            error
              ? "border-rose-400 ring-4 ring-rose-100"
              : "border-slate-200 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          }`}
        />
      </div>

      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-rose-600">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

function SelectField({
  label,
  name,
  value,
  error,
  onChange,
  options,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-black text-slate-800"
      >
        {label}
      </label>

      <div className="relative">
        <CircleHelp className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={`h-13 w-full appearance-none rounded-2xl border bg-white py-3.5 pl-11 pr-11 text-sm outline-none transition ${
            value ? "text-slate-950" : "text-slate-400"
          } ${
            error
              ? "border-rose-400 ring-4 ring-rose-100"
              : "border-slate-200 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          }`}
        >
          <option value="">Select a subject</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>

      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-rose-600">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

function TextAreaField({
  label,
  name,
  value,
  error,
  onChange,
  placeholder,
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <label
          htmlFor={name}
          className="block text-sm font-black text-slate-800"
        >
          {label}
        </label>

        <span className="text-xs font-bold text-slate-400">
          {value.length}/1500
        </span>
      </div>

      <div className="relative">
        <MessageSquare className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-slate-400" />

        <textarea
          id={name}
          name={name}
          value={value}
          maxLength={1500}
          placeholder={placeholder}
          onChange={onChange}
          rows={7}
          className={`w-full resize-none rounded-2xl border bg-white py-3.5 pl-11 pr-4 text-sm leading-7 text-slate-950 outline-none transition placeholder:text-slate-400 ${
            error
              ? "border-rose-400 ring-4 ring-rose-100"
              : "border-slate-200 focus:border-violet-400 focus:ring-4 focus:ring-violet-100"
          }`}
        />
      </div>

      {error && (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-rose-600">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      )}
    </div>
  );
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}) {
  return (
    <article className="overflow-hidden rounded-[22px] border border-slate-200 bg-white">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6"
      >
        <span className="text-sm font-black leading-6 text-slate-950 sm:text-base">
          {question}
        </span>

        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition duration-300 ${
            isOpen
              ? "rotate-180 bg-violet-600 text-white"
              : "bg-violet-50 text-violet-700"
          }`}
        >
          <ChevronDown className="h-4 w-4" />
        </span>
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
              duration: 0.3,
            }}
          >
            <p className="border-t border-slate-100 px-5 py-5 text-sm leading-7 text-slate-600 sm:px-6">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

export default function ContactPage() {
  const [formValues, setFormValues] =
    useState(initialFormValues);

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionComplete, setSubmissionComplete] =
    useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState(0);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (formErrors[name]) {
      setFormErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }

    if (submissionComplete) {
      setSubmissionComplete(false);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formValues.name.trim()) {
      errors.name = "Please enter your name.";
    } else if (formValues.name.trim().length < 2) {
      errors.name = "Name must contain at least 2 characters.";
    }

    if (!formValues.email.trim()) {
      errors.email = "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        formValues.email.trim(),
      )
    ) {
      errors.email = "Please enter a valid email address.";
    }

    if (!formValues.subject) {
      errors.subject = "Please select an enquiry subject.";
    }

    if (!formValues.message.trim()) {
      errors.message = "Please describe how we can help.";
    } else if (formValues.message.trim().length < 20) {
      errors.message =
        "Please provide at least 20 characters of detail.";
    }

    if (!formValues.consent) {
      errors.consent =
        "Please confirm that we may process this enquiry.";
    }

    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      await new Promise((resolve) =>
        window.setTimeout(resolve, 900),
      );

      setSubmissionComplete(true);
      setFormValues(initialFormValues);
    } finally {
      setIsSubmitting(false);
    }
  };
    return (
    <div className="page-enter overflow-hidden bg-slate-50">
      {/* Hero section */}
      <section className="section-shell relative overflow-hidden bg-slate-950 text-white">
        <div className="landing-grid-dark absolute inset-0 opacity-50" />
        <div className="noise-overlay absolute inset-0 opacity-[0.05]" />

        <div className="aurora-blob absolute -left-40 top-8 h-[430px] w-[430px] bg-blue-600/25 blur-3xl" />
        <div className="aurora-blob absolute -right-44 bottom-[-120px] h-[520px] w-[520px] bg-violet-600/25 blur-3xl" />

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
                <MessageSquare className="h-4 w-4" />
                Contact LastKey
              </div>

              <h1 className="mt-7 max-w-4xl text-5xl font-black leading-[1.03] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
                Let&apos;s solve what
                <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                  matters to you.
                </span>
              </h1>

              <p className="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                Reach out for account support, security concerns,
                privacy requests, partnerships or general questions
                about LastKey.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur-xl">
                  <Clock3 className="h-4 w-4 text-cyan-300" />
                  Support within 24 hours
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-bold text-slate-300 backdrop-blur-xl">
                  <ShieldCheck className="h-4 w-4 text-emerald-300" />
                  Secure enquiry handling
                </span>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  variant="primary"
                  rightIcon={Send}
                  onClick={() =>
                    document
                      .getElementById("contact-form")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                  }
                >
                  Send a message
                </Button>

                <a href="mailto:support@lastkey.app">
                  <Button
                    size="lg"
                    variant="secondary"
                    rightIcon={Mail}
                  >
                    Email support
                  </Button>
                </a>
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
                      <LifeBuoy className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="text-sm font-black text-white">
                        Support centre
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Help when you need it
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-300">
                    Online
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      icon: Headphones,
                      title: "Account and product support",
                      value: "24 hours",
                    },
                    {
                      icon: ShieldCheck,
                      title: "Security reports",
                      value: "Priority",
                    },
                    {
                      icon: FileText,
                      title: "Legal and privacy",
                      value: "2 days",
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
                    <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-violet-300" />

                    <p className="text-sm leading-6 text-slate-300">
                      Never include passwords, verification codes,
                      recovery keys or complete confidential documents
                      in your message.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact category cards */}
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
              <Sparkles className="h-4 w-4" />
              Choose the right team
            </div>

            <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
              Get your message to the
              <span className="gradient-text block">
                people who can help.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-600">
              Select the contact route that best matches your enquiry
              for faster and more relevant assistance.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {contactOptions.map((option, index) => (
              <ContactOptionCard
                key={option.title}
                {...option}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact form and support details */}
      <section
        id="contact-form"
        className="section-shell scroll-mt-24 relative overflow-hidden bg-slate-50 py-20 sm:py-24"
      >
        <div className="soft-grid absolute inset-0 opacity-25" />

        <div className="section-container relative">
          <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.92fr)]">
            <motion.div
              initial={{
                opacity: 0,
                x: -24,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.55,
              }}
              className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.55)] sm:p-8"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-white shadow-lg shadow-violet-500/20">
                  <Send className="h-5 w-5" />
                </span>

                <div>
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-violet-600">
                    Send an enquiry
                  </span>

                  <h2 className="mt-2 text-3xl font-black tracking-[-0.04em] text-slate-950 sm:text-4xl">
                    How can we help?
                  </h2>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
                    Complete the form and provide enough detail for our
                    team to understand and route your request.
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {submissionComplete ? (
                  <motion.div
                    key="success-state"
                    initial={{
                      opacity: 0,
                      scale: 0.97,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.97,
                    }}
                    className="mt-8 rounded-[26px] border border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8"
                  >
                    <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20">
                      <CheckCircle2 className="h-7 w-7" />
                    </span>

                    <h3 className="mt-5 text-2xl font-black text-emerald-950">
                      Message received
                    </h3>

                    <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-emerald-900">
                      Thank you for contacting LastKey. Your enquiry has
                      been recorded and will be reviewed by the
                      appropriate team.
                    </p>

                    <Button
                      size="md"
                      variant="primary"
                      className="mt-6"
                      onClick={() =>
                        setSubmissionComplete(false)
                      }
                    >
                      Send another message
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form-fields"
                    initial={{
                      opacity: 0,
                    }}
                    animate={{
                      opacity: 1,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="mt-8 space-y-6"
                  >
                    <div className="grid gap-6 sm:grid-cols-2">
                      <FormField
                        label="Full name"
                        name="name"
                        placeholder="Enter your full name"
                        value={formValues.name}
                        error={formErrors.name}
                        onChange={handleInputChange}
                        icon={User}
                        autoComplete="name"
                      />

                      <FormField
                        label="Email address"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        value={formValues.email}
                        error={formErrors.email}
                        onChange={handleInputChange}
                        icon={Mail}
                        autoComplete="email"
                      />
                    </div>

                    <SelectField
                      label="Enquiry subject"
                      name="subject"
                      value={formValues.subject}
                      error={formErrors.subject}
                      onChange={handleInputChange}
                      options={enquirySubjects}
                    />

                    <TextAreaField
                      label="Your message"
                      name="message"
                      value={formValues.message}
                      error={formErrors.message}
                      onChange={handleInputChange}
                      placeholder="Explain what happened, what you need help with and any useful non-sensitive details."
                    />

                    <div>
                      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <input
                          type="checkbox"
                          name="consent"
                          checked={formValues.consent}
                          onChange={handleInputChange}
                          className="mt-1 h-4 w-4 rounded border-slate-300 accent-violet-600"
                        />

                        <span className="text-sm leading-7 text-slate-600">
                          I confirm that LastKey may process the
                          information in this form to respond to my
                          enquiry according to the{" "}
                          <Link
                            to={ROUTES.PRIVACY}
                            className="font-black text-violet-700 hover:text-violet-900"
                          >
                            Privacy Policy
                          </Link>
                          .
                        </span>
                      </label>

                      {formErrors.consent && (
                        <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-rose-600">
                          <AlertCircle className="h-3.5 w-3.5" />
                          {formErrors.consent}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-4 border-t border-slate-100 pt-6 sm:flex-row sm:items-center sm:justify-between">
                      <p className="flex items-start gap-2 text-xs leading-6 text-slate-500">
                        <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                        Your message should not contain passwords,
                        one-time codes or recovery keys.
                      </p>

                      <Button
                        type="submit"
                        size="lg"
                        variant="primary"
                        rightIcon={Send}
                        disabled={isSubmitting}
                      >
                        {isSubmitting
                          ? "Sending..."
                          : "Send message"}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.aside
              initial={{
                opacity: 0,
                x: 24,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.55,
                delay: 0.08,
              }}
              className="overflow-hidden rounded-[32px] bg-slate-950 p-6 text-white shadow-2xl sm:p-8"
            >
              <div className="relative">
                <div className="absolute -right-24 -top-24 h-60 w-60 rounded-full bg-violet-600/20 blur-3xl" />

                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
                    <Building2 className="h-5 w-5" />
                  </span>

                  <p className="mt-6 text-xs font-black uppercase tracking-[0.16em] text-blue-300">
                    Support information
                  </p>

                  <h2 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white">
                    Here when your digital legacy needs attention.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    Our support routes are organised so account,
                    privacy, legal and security questions reach the
                    right team.
                  </p>

                  <div className="mt-8 grid gap-4">
                    {supportDetails.map((detail, index) => (
                      <SupportDetailCard
                        key={detail.label}
                        {...detail}
                        index={index}
                      />
                    ))}
                  </div>

                  <div className="mt-6 rounded-[24px] border border-amber-300/20 bg-amber-300/10 p-5">
                    <div className="flex gap-3">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-300" />

                      <div>
                        <h3 className="text-sm font-black text-amber-100">
                          Emergency situations
                        </h3>

                        <p className="mt-2 text-sm leading-7 text-amber-100/80">
                          LastKey support is not an emergency service.
                          For immediate threats to life, safety or
                          property, contact the appropriate local
                          emergency authority.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>
            {/* FAQ section */}
      <section className="section-shell relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="soft-grid absolute inset-0 opacity-25" />

        <div className="section-container relative">
          <div className="grid items-start gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <motion.div
              initial={{
                opacity: 0,
                x: -24,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.55,
              }}
              className="lg:sticky lg:top-28"
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-xs font-black text-violet-700">
                <CircleHelp className="h-4 w-4" />
                Frequently asked questions
              </div>

              <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-slate-950 sm:text-5xl">
                Quick answers before
                <span className="gradient-text block">
                  you send a message.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">
                These answers cover the most common support, privacy,
                security and partnership questions.
              </p>

              <div className="mt-8 rounded-[26px] border border-blue-200 bg-gradient-to-br from-blue-50 to-violet-50 p-6">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
                  <Headphones className="h-5 w-5" />
                </span>

                <h3 className="mt-5 text-lg font-black text-slate-950">
                  Still need help?
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Send your enquiry through the form and our team will
                  route it to the appropriate support channel.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    document
                      .getElementById("contact-form")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                  }
                  className="mt-5 inline-flex items-center gap-2 text-sm font-black text-violet-700 transition hover:text-violet-900"
                >
                  Open contact form
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 24,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.15,
              }}
              transition={{
                duration: 0.55,
                delay: 0.08,
              }}
              className="space-y-4"
            >
              {frequentlyAskedQuestions.map((faq, index) => (
                <FAQItem
                  key={faq.question}
                  {...faq}
                  isOpen={openFAQIndex === index}
                  onToggle={() =>
                    setOpenFAQIndex((currentIndex) =>
                      currentIndex === index ? -1 : index,
                    )
                  }
                />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust and safety section */}
      <section className="section-shell relative overflow-hidden bg-slate-950 py-20 text-white sm:py-24">
        <div className="landing-grid-dark absolute inset-0 opacity-45" />

        <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-violet-600/20 blur-3xl" />

        <div className="section-container relative">
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
              duration: 0.55,
            }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-xs font-black text-emerald-200">
              <ShieldCheck className="h-4 w-4" />
              Safe communication
            </div>

            <h2 className="mt-6 text-4xl font-black tracking-[-0.045em] text-white sm:text-5xl">
              Your support message should be
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                useful, not sensitive.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">
              Share enough context for us to help, but keep credentials
              and highly confidential information out of email and
              support forms.
            </p>
          </motion.div>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: LockKeyhole,
                title: "Never share credentials",
                description:
                  "Do not include passwords, one-time codes, recovery keys or authentication secrets.",
              },
              {
                icon: FileText,
                title: "Limit confidential documents",
                description:
                  "Avoid sending complete identity, financial, legal or medical records unless officially requested.",
              },
              {
                icon: BadgeCheck,
                title: "Use verified channels",
                description:
                  "Only communicate through official LastKey pages and published email addresses.",
              },
            ].map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.title}
                  initial={{
                    opacity: 0,
                    y: 20,
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
                    duration: 0.45,
                    delay: index * 0.07,
                  }}
                  className="rounded-[26px] border border-white/10 bg-white/[0.06] p-6 backdrop-blur-xl"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </span>

                  <h3 className="mt-5 text-lg font-black text-white">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    {item.description}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-shell relative overflow-hidden bg-white py-20 sm:py-24">
        <div className="soft-grid absolute inset-0 opacity-25" />

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
            className="overflow-hidden rounded-[34px] bg-gradient-to-br from-slate-950 via-slate-900 to-violet-950 px-6 py-12 text-center text-white shadow-2xl sm:px-10 sm:py-16"
          >
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-violet-900/30">
              <Sparkles className="h-6 w-6" />
            </span>

            <h2 className="mx-auto mt-7 max-w-3xl text-4xl font-black tracking-[-0.045em] sm:text-5xl">
              Ready to organise what
              <span className="block bg-gradient-to-r from-cyan-300 via-blue-300 to-violet-300 bg-clip-text text-transparent">
                matters beyond today?
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-slate-300">
              Create your LastKey account and begin building a secure,
              organised digital legacy for yourself and the people you
              trust.
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
                Secure by design
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Privacy-focused
              </span>

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                Built for trusted access
              </span>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
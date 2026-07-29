import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircle,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  Globe2,
  Home,
  Mail,
  MapPin,
  Phone,
  Save,
  Sparkles,
  UserRound,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { profileSchema } from "../../schemas/profileSchema";

const DEFAULT_VALUES = {
  firstName: "",
  lastName: "",
  phone: "",
  dateOfBirth: "",
  occupation: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  postalCode: "",
};

const inputClass = [
  "profile-input h-12 w-full rounded-[16px] border px-4 text-sm font-semibold",
  "outline-none transition duration-200",
  "focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/10",
].join(" ");

function Field({
  id,
  label,
  error,
  icon: Icon,
  iconClass = "bg-violet-500/15 text-violet-300",
  required = false,
  className = "",
  ...props
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-bold" style={{ color: "var(--text-secondary)" }}>
        {label}
        {required ? <span className="ml-1 text-rose-400">*</span> : null}
      </label>
      <div className="relative">
        {Icon ? (
          <span
            className={`pointer-events-none absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl ${iconClass}`}
          >
            <Icon className="h-4 w-4" />
          </span>
        ) : null}
        <input
          id={id}
          className={`${inputClass} ${Icon ? "pl-14" : ""}`}
          style={{ color: "var(--text-primary)", WebkitTextFillColor: "var(--text-primary)", background: "var(--surface-inner)", borderColor: "var(--border-primary)", caretColor: "var(--accent-primary)" }}
          {...props}
        />
      </div>
      {error ? (
        <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-rose-500">
          <AlertCircle className="h-3.5 w-3.5" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

function SectionHeader({ icon: Icon, eyebrow, title, description, tone = "violet" }) {
  const toneClasses = {
    violet: {
      icon: "from-violet-600 to-fuchsia-500",
      eyebrow: "text-violet-500",
      glow: "bg-violet-500/10",
    },
    rose: {
      icon: "from-rose-500 to-orange-500",
      eyebrow: "text-rose-500",
      glow: "bg-orange-500/10",
    },
  };

  const selected = toneClasses[tone] ?? toneClasses.violet;

  return (
    <div className="relative flex items-start gap-3">
      <div className={`pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full ${selected.glow} blur-3xl`} />
      <span
        className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${selected.icon} shadow-lg`}
      >
        <Icon className="h-5 w-5 text-white" />
      </span>
      <div className="relative">
        <p className={`text-[10px] font-black uppercase tracking-[0.2em] ${selected.eyebrow}`}>
          {eyebrow}
        </p>
        <h2 className="mt-1 text-xl font-black sm:text-2xl" style={{ color: "var(--text-primary)" }}>{title}</h2>
        <p className="mt-1 text-sm leading-6" style={{ color: "var(--text-muted)" }}>{description}</p>
      </div>
    </div>
  );
}

export default function ProfileForm({ profile, loading = false, onSubmit }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!profile) return;
    reset({
      firstName: profile.firstName || "",
      lastName: profile.lastName || "",
      phone: profile.phone || "",
      dateOfBirth: profile.dateOfBirth || "",
      occupation: profile.occupation || "",
      address: profile.address || "",
      city: profile.city || "",
      state: profile.state || "",
      country: profile.country || "India",
      postalCode: profile.postalCode || "",
    });
  }, [profile, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-w-0 space-y-5" noValidate>
      <style>{`
        .profile-input::placeholder {
          color: var(--text-subtle) !important;
          opacity: 1;
          -webkit-text-fill-color: var(--text-subtle);
        }

        .profile-input::-webkit-calendar-picker-indicator {
          opacity: .8;
          cursor: pointer;
        }

        :root[data-theme="dark"] .profile-input::-webkit-calendar-picker-indicator {
          filter: invert(1) brightness(1.35);
        }

        :root[data-theme="light"] .profile-input::-webkit-calendar-picker-indicator {
          filter: none;
        }
      `}</style>
      <section className="relative overflow-hidden rounded-[30px] border p-5 sm:p-7" style={{ borderColor: "color-mix(in srgb, #8b5cf6 24%, var(--border-primary))", background: "linear-gradient(145deg, color-mix(in srgb, #8b5cf6 5%, var(--surface-primary)), var(--surface-primary))", boxShadow: "var(--card-shadow)" }}>
        <SectionHeader
          icon={UserRound}
          eyebrow="Personal details"
          title="Personal Information"
          description="Update the identity details connected to your LastKey account."
          tone="violet"
        />

        <div className="mt-7 grid gap-5 md:grid-cols-2">
          <Field
            id="firstName"
            label="First name"
            placeholder="Naved"
            icon={UserRound}
            required
            error={errors.firstName?.message}
            {...register("firstName")}
          />
          <Field
            id="lastName"
            label="Last name"
            placeholder="Alam"
            icon={UserRound}
            required
            error={errors.lastName?.message}
            {...register("lastName")}
          />

          <div>
            <label className="mb-2 block text-sm font-bold" style={{ color: "var(--text-secondary)" }}>Email address</label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                <Mail className="h-4 w-4" />
              </span>
              <input
                value={profile?.email || ""}
                readOnly
                className={`${inputClass} pl-14 opacity-95`}
                style={{ color: "var(--text-muted)", WebkitTextFillColor: "var(--text-muted)", background: "var(--surface-inner)", borderColor: "var(--border-primary)" }}
              />
            </div>
            <p className="mt-2 text-xs" style={{ color: "var(--text-subtle)" }}>
              Email is managed through account verification.
            </p>
          </div>

          <Field
            id="phone"
            label="Mobile number"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="9876543210"
            icon={Phone}
            iconClass="bg-emerald-500/15 text-emerald-300"
            required
            error={errors.phone?.message}
            {...register("phone")}
          />
          <Field
            id="dateOfBirth"
            label="Date of birth"
            type="date"
            icon={CalendarDays}
            iconClass="bg-cyan-500/15 text-cyan-300"
            error={errors.dateOfBirth?.message}
            {...register("dateOfBirth")}
          />
          <Field
            id="occupation"
            label="Occupation"
            placeholder="Software developer"
            icon={BriefcaseBusiness}
            iconClass="bg-amber-500/15 text-amber-300"
            error={errors.occupation?.message}
            {...register("occupation")}
          />
        </div>
      </section>

      <section className="relative overflow-hidden rounded-[30px] border p-5 sm:p-7" style={{ borderColor: "color-mix(in srgb, #f43f5e 22%, var(--border-primary))", background: "linear-gradient(145deg, color-mix(in srgb, #f43f5e 4%, var(--surface-primary)), var(--surface-primary))", boxShadow: "var(--card-shadow)" }}>
        <SectionHeader
          icon={MapPin}
          eyebrow="Location"
          title="Address Information"
          description="Keep your residential details accurate for secure recovery workflows."
          tone="rose"
        />

        <div className="mt-7 grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
          <div className="md:col-span-2 2xl:col-span-3">
            <label htmlFor="address" className="mb-2 block text-sm font-bold" style={{ color: "var(--text-secondary)" }}>
              Street address
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                <Home className="h-4 w-4" />
              </span>
              <textarea
                id="address"
                rows={3}
                placeholder="House number, street and area"
                className="profile-input w-full resize-none rounded-[18px] border py-3 pl-14 pr-4 text-sm font-semibold outline-none transition focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                style={{ color: "var(--text-primary)", WebkitTextFillColor: "var(--text-primary)", background: "var(--surface-inner)", borderColor: "var(--border-primary)", caretColor: "var(--accent-primary)" }}
                {...register("address")}
              />
            </div>
            {errors.address ? (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-rose-500">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.address.message}
              </p>
            ) : null}
          </div>

          <Field
            id="city"
            label="City"
            placeholder="Ghaziabad"
            icon={Building2}
            iconClass="bg-emerald-500/15 text-emerald-300"
            error={errors.city?.message}
            {...register("city")}
          />
          <Field
            id="state"
            label="State"
            placeholder="Uttar Pradesh"
            icon={Building2}
            iconClass="bg-blue-500/15 text-blue-300"
            error={errors.state?.message}
            {...register("state")}
          />
          <Field
            id="postalCode"
            label="Postal code"
            inputMode="numeric"
            maxLength={6}
            placeholder="201001"
            icon={MapPin}
            iconClass="bg-pink-500/15 text-pink-300"
            error={errors.postalCode?.message}
            {...register("postalCode")}
          />
          <Field
            id="country"
            label="Country"
            placeholder="India"
            icon={Globe2}
            iconClass="bg-cyan-500/15 text-cyan-300"
            className="md:col-span-2 2xl:col-span-3"
            error={errors.country?.message}
            {...register("country")}
          />
        </div>
      </section>

      <section className="overflow-hidden rounded-[26px] bg-gradient-to-r from-violet-600 via-fuchsia-600 to-orange-500 p-[1px] shadow-[0_18px_50px_rgba(168,85,247,.18)]">
        <div className="flex flex-col gap-4 rounded-[25px] px-5 py-4 sm:flex-row sm:items-center sm:justify-between" style={{ background: "var(--surface-primary)" }}>
          <div className="flex items-center gap-3">
            <span
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                isDirty
                  ? "bg-fuchsia-500/15 text-fuchsia-300"
                  : "bg-emerald-500/15 text-emerald-300"
              }`}
            >
              {isDirty ? <Sparkles className="h-5 w-5" /> : <CheckCircle2 className="h-5 w-5" />}
            </span>
            <div>
              <p className="text-sm font-black" style={{ color: "var(--text-primary)" }}>
                {isDirty ? "Unsaved profile changes" : "Profile is up to date"}
              </p>
              <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                {isDirty
                  ? "Review and save your latest changes."
                  : "Your latest information is active."}
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !isDirty}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-black !text-slate-950 shadow-lg transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
          >
            <Save className={`h-4 w-4 ${loading ? "animate-pulse" : ""}`} />
            {loading ? "Saving profile..." : "Save changes"}
          </button>
        </div>
      </section>
    </form>
  );
}
import {
  zodResolver,
} from "@hookform/resolvers/zod";
import {
  BellRing,
  CalendarClock,
  Check,
  CheckCircle2,
  EyeOff,
  FileClock,
  Globe2,
  KeyRound,
  Mail,
  Megaphone,
  Save,
  ShieldAlert,
  ShieldCheck,
  UserRoundCheck,
} from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import Button from "../ui/Button";
import {
  accountSettingsSchema,
} from "../../schemas/profileSchema";

const DEFAULT_VALUES = {
  emailNotifications: true,
  documentExpiryNotifications: true,
  securityNotifications: true,
  nomineeNotifications: true,
  emergencyNotifications: true,
  marketingEmails: false,
  hideSensitiveDocumentNames: false,
  requirePasswordForDownloads: false,
  defaultEmergencyWaitingPeriod: 72,
  timezone: "Asia/Kolkata",
};

const TONES = {
  blue: {
    accent: "#2563eb",
    glow: "rgba(37,99,235,0.13)",
  },
  cyan: {
    accent: "#06b6d4",
    glow: "rgba(6,182,212,0.13)",
  },
  violet: {
    accent: "#8b5cf6",
    glow: "rgba(139,92,246,0.13)",
  },
  emerald: {
    accent: "#10b981",
    glow: "rgba(16,185,129,0.13)",
  },
  amber: {
    accent: "#f59e0b",
    glow: "rgba(245,158,11,0.13)",
  },
  rose: {
    accent: "#f43f5e",
    glow: "rgba(244,63,94,0.13)",
  },
};

function SectionHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  tone = "blue",
}) {
  const style =
    TONES[tone] ?? TONES.blue;

  return (
    <div
      className="flex items-start gap-4 border-b pb-5"
      style={{
        borderColor: "var(--border-primary)",
      }}
    >
      <span
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
        style={{
          color: style.accent,
          background: style.glow,
        }}
      >
        <Icon className="h-5 w-5" />
      </span>

      <div>
        <p
          className="text-[10px] font-black uppercase tracking-[0.18em]"
          style={{ color: style.accent }}
        >
          {eyebrow}
        </p>

        <h2 className="mt-1 text-xl font-black">
          {title}
        </h2>

        <p
          className="mt-1 text-sm leading-6"
          style={{ color: "var(--text-muted)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function ToggleRow({
  id,
  name,
  icon: Icon,
  title,
  description,
  register,
  watch,
  tone = "blue",
  recommended = false,
}) {
  const enabled = Boolean(watch(name));
  const style =
    TONES[tone] ?? TONES.blue;

  return (
    <label
      htmlFor={id}
      className="group relative flex cursor-pointer items-start gap-4 overflow-hidden rounded-[24px] border p-4 transition duration-300 hover:-translate-y-0.5"
      style={{
        color: "var(--text-primary)",
        borderColor: enabled
          ? `color-mix(in srgb, ${style.accent} 34%, var(--border-primary))`
          : "var(--border-primary)",
        background: enabled
          ? `linear-gradient(135deg, color-mix(in srgb, ${style.accent} 10%, var(--surface-primary)), color-mix(in srgb, ${style.accent} 4%, var(--surface-secondary)))`
          : "var(--surface-primary)",
        boxShadow: enabled
          ? `0 14px 34px color-mix(in srgb, ${style.accent} 12%, transparent)`
          : "none",
      }}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full blur-3xl transition duration-500 group-hover:scale-125"
        style={{
          background: enabled
            ? style.glow
            : "transparent",
        }}
      />

      <span
        className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl transition duration-300 group-hover:rotate-3 group-hover:scale-105"
        style={{
          color: style.accent,
          background: style.glow,
        }}
      >
        <Icon className="h-5 w-5" />
      </span>

      <span className="relative min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-black">
            {title}
          </span>

          {recommended ? (
            <span
              className="rounded-full border px-2 py-1 text-[9px] font-black uppercase tracking-[0.12em]"
              style={{
                color: style.accent,
                borderColor: `color-mix(in srgb, ${style.accent} 25%, transparent)`,
                background: `color-mix(in srgb, ${style.accent} 9%, transparent)`,
              }}
            >
              Recommended
            </span>
          ) : null}
        </span>

        <span
          className="mt-1 block text-xs leading-5"
          style={{ color: "var(--text-muted)" }}
        >
          {description}
        </span>
      </span>

      <span className="relative mt-1 shrink-0">
        <input
          id={id}
          type="checkbox"
          className="sr-only"
          {...register(name)}
        />

        <span
          className="relative block h-8 w-14 rounded-full border transition-all duration-300"
          style={{
            borderColor: enabled
              ? style.accent
              : "var(--border-primary)",
            background: enabled
              ? `linear-gradient(135deg, ${style.accent}, color-mix(in srgb, ${style.accent} 65%, #7c3aed))`
              : "var(--surface-inner)",
            boxShadow: enabled
              ? `0 8px 22px color-mix(in srgb, ${style.accent} 24%, transparent)`
              : "none",
          }}
        >
          <span
            className={`absolute top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-all duration-300 ${
              enabled ? "left-7" : "left-1"
            }`}
          >
            {enabled ? (
              <Check
                className="h-3.5 w-3.5"
                style={{ color: style.accent }}
              />
            ) : null}
          </span>
        </span>
      </span>
    </label>
  );
}

function SettingSection({
  children,
  tone = "blue",
  className = "",
}) {
  const style =
    TONES[tone] ?? TONES.blue;

  return (
    <section
      className={`relative overflow-hidden rounded-[30px] border p-4 sm:p-5 ${className}`}
      style={{
        borderColor:
          `color-mix(in srgb, ${style.accent} 20%, var(--border-primary))`,
        background:
          `linear-gradient(145deg, color-mix(in srgb, ${style.accent} 5%, var(--surface-primary)), color-mix(in srgb, var(--surface-secondary) 92%, transparent))`,
        boxShadow: "var(--card-shadow)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full blur-3xl"
        style={{ background: style.glow }}
      />
      <div className="relative">
        {children}
      </div>
    </section>
  );
}

export default function AccountSettingsForm({
  settings,
  loading = false,
  onSubmit,
}) {
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: {
      errors,
      isDirty,
    },
  } = useForm({
    resolver: zodResolver(
      accountSettingsSchema,
    ),
    defaultValues: DEFAULT_VALUES,
  });

  useEffect(() => {
    if (!settings) {
      return;
    }

    reset({
      ...DEFAULT_VALUES,
      ...settings,
      defaultEmergencyWaitingPeriod:
        Number(
          settings.defaultEmergencyWaitingPeriod ??
            72,
        ),
    });
  }, [settings, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
      <SettingSection tone="cyan">
        <SectionHeader
          icon={BellRing}
          eyebrow="Communication"
          title="Notification preferences"
          description="Choose which account updates and alerts deserve your attention."
          tone="cyan"
        />

        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          <ToggleRow
            id="emailNotifications"
            name="emailNotifications"
            icon={Mail}
            title="Email notifications"
            description="Receive important account updates by email."
            register={register}
            watch={watch}
            tone="blue"
            recommended
          />

          <ToggleRow
            id="documentExpiryNotifications"
            name="documentExpiryNotifications"
            icon={FileClock}
            title="Document expiry alerts"
            description="Get reminders before important documents expire."
            register={register}
            watch={watch}
            tone="amber"
            recommended
          />

          <ToggleRow
            id="securityNotifications"
            name="securityNotifications"
            icon={ShieldAlert}
            title="Security alerts"
            description="Receive new-login and suspicious-activity alerts."
            register={register}
            watch={watch}
            tone="rose"
            recommended
          />

          <ToggleRow
            id="nomineeNotifications"
            name="nomineeNotifications"
            icon={UserRoundCheck}
            title="Nominee updates"
            description="Receive nominee verification and permission updates."
            register={register}
            watch={watch}
            tone="violet"
          />

          <ToggleRow
            id="emergencyNotifications"
            name="emergencyNotifications"
            icon={ShieldCheck}
            title="Emergency access updates"
            description="Stay informed about emergency requests and releases."
            register={register}
            watch={watch}
            tone="emerald"
            recommended
          />

          <ToggleRow
            id="marketingEmails"
            name="marketingEmails"
            icon={Megaphone}
            title="Product and feature emails"
            description="Receive optional product announcements and guides."
            register={register}
            watch={watch}
            tone="amber"
          />
        </div>
      </SettingSection>

      <SettingSection tone="violet">
        <SectionHeader
          icon={EyeOff}
          eyebrow="Privacy"
          title="Sensitive-data protection"
          description="Add extra friction around document visibility and protected downloads."
          tone="violet"
        />

        <div className="mt-5 grid gap-4 xl:grid-cols-2">
          <ToggleRow
            id="hideSensitiveDocumentNames"
            name="hideSensitiveDocumentNames"
            icon={EyeOff}
            title="Hide sensitive document names"
            description="Mask document names in previews and notifications."
            register={register}
            watch={watch}
            tone="violet"
          />

          <ToggleRow
            id="requirePasswordForDownloads"
            name="requirePasswordForDownloads"
            icon={KeyRound}
            title="Require password before download"
            description="Ask for your password before protected downloads."
            register={register}
            watch={watch}
            tone="violet"
            recommended
          />
        </div>
      </SettingSection>

      <SettingSection tone="emerald">
        <SectionHeader
          icon={ShieldCheck}
          eyebrow="Emergency workflow"
          title="Emergency access defaults"
          description="Set the default waiting period and account timezone used by new requests."
          tone="emerald"
        />

        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <div
            className="rounded-[24px] border p-4"
            style={{
              borderColor: "var(--border-primary)",
              background: "var(--surface-primary)",
            }}
          >
            <label
              htmlFor="defaultEmergencyWaitingPeriod"
              className="flex items-center gap-2 text-sm font-black"
            >
              <CalendarClock className="h-4 w-4 text-emerald-500" />
              Default waiting period
            </label>

            <p
              className="mt-1 text-xs leading-5"
              style={{ color: "var(--text-muted)" }}
            >
              Delay before an approved emergency release can proceed.
            </p>

            <select
              id="defaultEmergencyWaitingPeriod"
              className="mt-4 h-12 w-full rounded-2xl border px-4 text-sm font-bold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              style={{
                color: "var(--text-primary)",
                WebkitTextFillColor:
                  "var(--text-primary)",
                borderColor:
                  "var(--border-primary)",
                background:
                  "var(--surface-inner)",
              }}
              {...register(
                "defaultEmergencyWaitingPeriod",
                {
                  valueAsNumber: true,
                },
              )}
            >
              <option value={0}>
                No waiting period
              </option>
              <option value={24}>
                24 hours
              </option>
              <option value={48}>
                48 hours
              </option>
              <option value={72}>
                72 hours
              </option>
              <option value={168}>
                7 days
              </option>
              <option value={336}>
                14 days
              </option>
            </select>

            {errors.defaultEmergencyWaitingPeriod ? (
              <p className="mt-2 text-xs font-semibold text-red-500">
                {
                  errors.defaultEmergencyWaitingPeriod
                    .message
                }
              </p>
            ) : null}
          </div>

          <div
            className="rounded-[24px] border p-4"
            style={{
              borderColor: "var(--border-primary)",
              background: "var(--surface-primary)",
            }}
          >
            <label
              htmlFor="timezone"
              className="flex items-center gap-2 text-sm font-black"
            >
              <Globe2 className="h-4 w-4 text-emerald-500" />
              Account timezone
            </label>

            <p
              className="mt-1 text-xs leading-5"
              style={{ color: "var(--text-muted)" }}
            >
              Used when displaying and calculating emergency times.
            </p>

            <select
              id="timezone"
              className="mt-4 h-12 w-full rounded-2xl border px-4 text-sm font-bold outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              style={{
                color: "var(--text-primary)",
                WebkitTextFillColor:
                  "var(--text-primary)",
                borderColor:
                  "var(--border-primary)",
                background:
                  "var(--surface-inner)",
              }}
              {...register("timezone")}
            >
              <option value="Asia/Kolkata">
                India Standard Time
              </option>
              <option value="UTC">
                Coordinated Universal Time
              </option>
              <option value="Asia/Dubai">
                Gulf Standard Time
              </option>
              <option value="Europe/London">
                London
              </option>
              <option value="America/New_York">
                New York
              </option>
            </select>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[22px] border border-emerald-500/20 bg-emerald-500/8 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-500">
              Policy state
            </p>
            <p className="mt-2 text-sm font-black">
              Active and ready
            </p>
          </div>

          <div className="rounded-[22px] border border-cyan-500/20 bg-cyan-500/8 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-cyan-500">
              Timezone
            </p>
            <p className="mt-2 text-sm font-black">
              {watch("timezone")}
            </p>
          </div>

          <div className="rounded-[22px] border border-violet-500/20 bg-violet-500/8 p-4">
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-violet-500">
              Waiting period
            </p>
            <p className="mt-2 text-sm font-black">
              {watch(
                "defaultEmergencyWaitingPeriod",
              )}
              {" hours"}
            </p>
          </div>
        </div>
      </SettingSection>

      <section
        className="sticky bottom-3 z-20 rounded-[26px] border p-4 backdrop-blur-xl"
        style={{
          borderColor: isDirty
            ? "color-mix(in srgb, #f59e0b 35%, var(--border-primary))"
            : "color-mix(in srgb, #10b981 28%, var(--border-primary))",
          background:
            "color-mix(in srgb, var(--surface-primary) 92%, transparent)",
          boxShadow:
            "0 22px 60px rgba(2,8,23,0.22)",
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span
              className="flex h-11 w-11 items-center justify-center rounded-2xl"
              style={{
                color: isDirty
                  ? "#f59e0b"
                  : "#10b981",
                background: isDirty
                  ? "rgba(245,158,11,0.12)"
                  : "rgba(16,185,129,0.12)",
              }}
            >
              <CheckCircle2 className="h-5 w-5" />
            </span>

            <div>
              <p className="text-sm font-black">
                {isDirty
                  ? "Unsaved changes"
                  : "All changes saved"}
              </p>

              <p
                className="mt-0.5 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                {isDirty
                  ? "Save your preferences before leaving this page."
                  : "Your account preferences are up to date."}
              </p>
            </div>
          </div>

          <Button
            type="submit"
            leftIcon={Save}
            loading={loading}
            loadingText="Saving settings..."
            disabled={loading || !isDirty}
          >
            Save settings
          </Button>
        </div>
      </section>
    </form>
  );
}
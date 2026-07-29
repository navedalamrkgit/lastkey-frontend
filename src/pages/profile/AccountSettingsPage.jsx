import {
  AlertTriangle,
  BellRing,
  CheckCircle2,
  Gauge,
  LockKeyhole,
  Settings,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { profileApi } from "../../api/profileApi";
import AccountSettingsForm from "../../components/profile/AccountSettingsForm";
import { tokenService } from "../../services/tokenService";
import { getErrorMessage } from "../../utils/errorHandler";

const STORAGE_KEY = "lastkey-account-settings";

const DEFAULT_SETTINGS = {
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

function loadStoredSettings() {
  try {
    const savedSettings =
      window.localStorage.getItem(STORAGE_KEY);

    if (!savedSettings) {
      return DEFAULT_SETTINGS;
    }

    return {
      ...DEFAULT_SETTINGS,
      ...JSON.parse(savedSettings),
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function StatCard({
  icon: Icon,
  label,
  value,
  description,
  accent,
  glow,
}) {
  return (
    <article
      className="group relative overflow-hidden rounded-[28px] border p-5 transition duration-300 hover:-translate-y-1"
      style={{
        color: "var(--text-primary)",
        borderColor: "var(--border-primary)",
        background:
          "linear-gradient(145deg, color-mix(in srgb, var(--surface-primary) 97%, transparent), color-mix(in srgb, var(--surface-secondary) 94%, transparent))",
        boxShadow: "var(--card-shadow)",
      }}
    >
      <div
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full blur-3xl transition duration-500 group-hover:scale-125"
        style={{ background: glow }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span
          className="flex h-11 w-11 items-center justify-center rounded-2xl"
          style={{
            color: accent,
            background: `color-mix(in srgb, ${accent} 14%, transparent)`,
          }}
        >
          <Icon className="h-5 w-5" />
        </span>

        <span
          className="rounded-full border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em]"
          style={{
            color: accent,
            borderColor: `color-mix(in srgb, ${accent} 28%, transparent)`,
            background: `color-mix(in srgb, ${accent} 8%, transparent)`,
          }}
        >
          Live
        </span>
      </div>

      <p className="relative mt-5 text-3xl font-black tracking-tight">
        {value}
      </p>

      <p className="relative mt-1 text-sm font-black">
        {label}
      </p>

      <p
        className="relative mt-2 text-xs leading-5"
        style={{ color: "var(--text-muted)" }}
      >
        {description}
      </p>
    </article>
  );
}

export default function AccountSettingsPage() {
  const [settings, setSettings] =
    useState(loadStoredSettings);
  const [savingSettings, setSavingSettings] =
    useState(false);
  const [
    showDeactivateModal,
    setShowDeactivateModal,
  ] = useState(false);
  const [
    deactivationPassword,
    setDeactivationPassword,
  ] = useState("");

  const enabledPreferenceCount = useMemo(
    () =>
      [
        settings.emailNotifications,
        settings.documentExpiryNotifications,
        settings.securityNotifications,
        settings.nomineeNotifications,
        settings.emergencyNotifications,
        settings.hideSensitiveDocumentNames,
        settings.requirePasswordForDownloads,
      ].filter(Boolean).length,
    [settings],
  );

  const securityScore = useMemo(() => {
    let score = 64;

    if (settings.securityNotifications) score += 10;
    if (settings.emergencyNotifications) score += 8;
    if (settings.hideSensitiveDocumentNames) score += 8;
    if (settings.requirePasswordForDownloads) score += 10;

    return Math.min(score, 100);
  }, [settings]);

  const saveAccountSettings = (values) => {
    setSavingSettings(true);

    try {
      const normalizedSettings = {
        ...DEFAULT_SETTINGS,
        ...values,
        defaultEmergencyWaitingPeriod: Number(
          values.defaultEmergencyWaitingPeriod ??
            DEFAULT_SETTINGS.defaultEmergencyWaitingPeriod,
        ),
        timezone:
          values.timezone ||
          DEFAULT_SETTINGS.timezone,
      };

      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(normalizedSettings),
      );

      setSettings(normalizedSettings);
      toast.success("Account settings saved.");
    } catch {
      toast.error(
        "Unable to save account settings.",
      );
    } finally {
      setSavingSettings(false);
    }
  };

  const deactivateMutation = useMutation({
    mutationFn: () =>
      profileApi.deactivateAccount(
        deactivationPassword,
      ),

    onSuccess: (response) => {
      const successMessage =
        response.data?.message ??
        response.data?.data?.message ??
        "Account deactivated successfully.";

      toast.success(successMessage);
      setShowDeactivateModal(false);
      setDeactivationPassword("");
      tokenService.clearTokens();

      window.setTimeout(() => {
        window.location.assign("/login");
      }, 800);
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          "Unable to deactivate account.",
        ),
      );
    },
  });

  const closeDeactivateModal = () => {
    if (deactivateMutation.isPending) {
      return;
    }

    setShowDeactivateModal(false);
    setDeactivationPassword("");
  };

  const handleDeactivateAccount = (event) => {
    event.preventDefault();

    if (!deactivationPassword.trim()) {
      toast.error(
        "Enter your current password.",
      );
      return;
    }

    deactivateMutation.mutate();
  };

  return (
    <div
      className="page-enter min-h-full px-4 py-5 sm:px-6 lg:px-8 lg:py-7"
      style={{
        color: "var(--text-primary)",
        background:
          "radial-gradient(circle at 8% 0%, rgba(124,58,237,0.10), transparent 28rem), radial-gradient(circle at 96% 8%, rgba(6,182,212,0.08), transparent 26rem), radial-gradient(circle at 60% 100%, rgba(16,185,129,0.06), transparent 30rem), var(--app-background)",
      }}
    >
      <div className="mx-auto max-w-[1440px]">
        <section
          className="relative overflow-hidden rounded-[38px] border p-6 sm:p-8 lg:p-10"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background:
              "linear-gradient(135deg, #090f1d 0%, #121b33 48%, #21123a 100%)",
            boxShadow:
              "0 30px 90px rgba(2,8,23,0.34)",
          }}
        >
          <div className="absolute -left-24 -top-28 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-fuchsia-500/18 blur-3xl" />
          <div className="absolute bottom-[-8rem] left-[38%] h-64 w-64 rounded-full bg-emerald-500/12 blur-3xl" />

          <div className="relative grid gap-8 xl:grid-cols-[1.15fr_0.85fr] xl:items-center">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-violet-600 to-fuchsia-600 text-white shadow-xl shadow-violet-950/30">
                  <Settings className="h-6 w-6" />
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/20 bg-violet-500/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.18em] text-violet-200">
                  <Sparkles className="h-3.5 w-3.5" />
                  Personal control center
                </span>
              </div>

              <h1 className="mt-6 max-w-4xl text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
                Make LastKey work exactly the way you do.
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">
                Fine-tune communication, sensitive-data
                protection and emergency-access defaults from
                one secure command center.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/15 bg-cyan-500/10 px-3 py-2 text-xs font-bold text-cyan-200">
                  <BellRing className="h-4 w-4" />
                  Smart notifications
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-violet-300/15 bg-violet-500/10 px-3 py-2 text-xs font-bold text-violet-200">
                  <LockKeyhole className="h-4 w-4" />
                  Privacy controls
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-500/10 px-3 py-2 text-xs font-bold text-emerald-200">
                  <ShieldCheck className="h-4 w-4" />
                  Emergency policy
                </span>
              </div>
            </div>

            <div className="rounded-[30px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-xl sm:p-6">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
                    Protection score
                  </p>

                  <div className="mt-3 flex items-end gap-2">
                    <span className="text-5xl font-black text-white">
                      {securityScore}
                    </span>
                    <span className="pb-1 text-sm font-black text-slate-400">
                      /100
                    </span>
                  </div>
                </div>

                <span className="flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-500/12 text-emerald-300">
                  <Gauge className="h-6 w-6" />
                </span>
              </div>

              <div className="mt-5 h-2.5 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-500 to-fuchsia-500 transition-all duration-700"
                  style={{
                    width: `${securityScore}%`,
                  }}
                />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
                  <p className="text-2xl font-black text-white">
                    {enabledPreferenceCount}
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-slate-400">
                    Controls active
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-3">
                  <p className="text-2xl font-black text-white">
                    {settings.defaultEmergencyWaitingPeriod}h
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-slate-400">
                    Waiting period
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-300">
                <CheckCircle2 className="h-4 w-4" />
                Preferences stored securely
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            icon={BellRing}
            label="Notifications"
            value={
              [
                settings.emailNotifications,
                settings.documentExpiryNotifications,
                settings.securityNotifications,
                settings.nomineeNotifications,
                settings.emergencyNotifications,
              ].filter(Boolean).length
            }
            description="Important communication channels currently enabled."
            accent="#06b6d4"
            glow="rgba(6,182,212,0.18)"
          />

          <StatCard
            icon={LockKeyhole}
            label="Privacy controls"
            value={
              [
                settings.hideSensitiveDocumentNames,
                settings.requirePasswordForDownloads,
              ].filter(Boolean).length
            }
            description="Sensitive-data safeguards currently active."
            accent="#8b5cf6"
            glow="rgba(139,92,246,0.18)"
          />

          <StatCard
            icon={Zap}
            label="Emergency delay"
            value={`${settings.defaultEmergencyWaitingPeriod}h`}
            description="Default waiting period before emergency release."
            accent="#10b981"
            glow="rgba(16,185,129,0.18)"
          />

          <StatCard
            icon={ShieldCheck}
            label="Security score"
            value={`${securityScore}%`}
            description="Calculated from your active protection preferences."
            accent="#f59e0b"
            glow="rgba(245,158,11,0.18)"
          />
        </section>

        <section
          className="mt-6 overflow-hidden rounded-[34px] border"
          style={{
            borderColor: "var(--border-primary)",
            background:
              "color-mix(in srgb, var(--surface-primary) 96%, transparent)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <div
            className="flex flex-col gap-4 border-b px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7"
            style={{
              borderColor: "var(--border-primary)",
              background:
                "linear-gradient(135deg, color-mix(in srgb, var(--surface-secondary) 90%, transparent), color-mix(in srgb, var(--surface-primary) 94%, transparent))",
            }}
          >
            <div className="flex items-start gap-3">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-violet-500/12 text-violet-500">
                <Settings className="h-5 w-5" />
              </span>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-violet-500">
                  Preference manager
                </p>

                <h2 className="mt-1 text-xl font-black">
                  Configure your account
                </h2>

                <p
                  className="mt-1 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  Every setting is grouped by purpose and
                  updates instantly when saved.
                </p>
              </div>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-2 text-xs font-black text-emerald-500">
              <ShieldCheck className="h-4 w-4" />
              Secure preferences
            </span>
          </div>

          <div className="p-4 sm:p-6 lg:p-7">
            <AccountSettingsForm
              settings={settings}
              loading={savingSettings}
              onSubmit={saveAccountSettings}
            />
          </div>
        </section>

        <section
          className="relative mt-7 overflow-hidden rounded-[30px] border p-5 sm:p-6"
          style={{
            borderColor:
              "color-mix(in srgb, #ef4444 32%, var(--border-primary))",
            background:
              "linear-gradient(135deg, color-mix(in srgb, #ef4444 12%, var(--surface-primary)), color-mix(in srgb, #f97316 8%, var(--surface-primary)))",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-red-500/12 blur-3xl" />

          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500 text-white shadow-lg shadow-red-500/20">
                <AlertTriangle className="h-5 w-5" />
              </span>

              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-500">
                  Danger zone
                </p>

                <h2 className="mt-1 text-lg font-black">
                  Account deactivation
                </h2>

                <p
                  className="mt-1 max-w-3xl text-sm leading-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  Deactivation blocks future access, clears
                  your session and requires password
                  confirmation.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowDeactivateModal(true)
              }
              className="inline-flex h-11 items-center justify-center rounded-2xl bg-red-600 px-5 text-sm font-black text-white shadow-lg shadow-red-600/20 transition hover:-translate-y-0.5 hover:bg-red-700"
            >
              Deactivate account
            </button>
          </div>
        </section>

        {showDeactivateModal && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/75 px-4 py-8 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            onMouseDown={(event) => {
              if (
                event.target ===
                event.currentTarget
              ) {
                closeDeactivateModal();
              }
            }}
          >
            <div
              className="w-full max-w-md overflow-hidden rounded-[30px] border shadow-2xl"
              style={{
                borderColor: "var(--border-primary)",
                background: "var(--surface-primary)",
              }}
            >
              <div className="flex items-start justify-between bg-gradient-to-r from-red-600 to-rose-600 px-6 py-5 text-white">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-100">
                    Final confirmation
                  </p>

                  <h2 className="mt-1 text-xl font-black">
                    Deactivate account
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={closeDeactivateModal}
                  disabled={
                    deactivateMutation.isPending
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 transition hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form
                onSubmit={handleDeactivateAccount}
                className="p-6"
              >
                <p
                  className="mb-5 text-sm leading-6"
                  style={{ color: "var(--text-muted)" }}
                >
                  Enter your current password to confirm this
                  action. This will immediately sign you out.
                </p>

                <label
                  htmlFor="deactivationPassword"
                  className="mb-2 block text-sm font-black"
                >
                  Current password
                </label>

                <input
                  id="deactivationPassword"
                  type="password"
                  value={deactivationPassword}
                  onChange={(event) =>
                    setDeactivationPassword(
                      event.target.value,
                    )
                  }
                  placeholder="Enter your current password"
                  className="h-12 w-full rounded-2xl border px-4 text-sm outline-none focus:ring-4 focus:ring-red-500/10"
                  style={{
                    color: "var(--text-primary)",
                    WebkitTextFillColor:
                      "var(--text-primary)",
                    borderColor:
                      "var(--border-primary)",
                    background:
                      "var(--surface-inner)",
                    caretColor: "#ef4444",
                  }}
                />

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeDeactivateModal}
                    className="h-11 rounded-2xl border px-5 text-sm font-bold"
                    style={{
                      color: "var(--text-secondary)",
                      borderColor:
                        "var(--border-primary)",
                      background:
                        "var(--surface-inner)",
                    }}
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      deactivateMutation.isPending ||
                      !deactivationPassword.trim()
                    }
                    className="h-11 rounded-2xl bg-red-600 px-5 text-sm font-black text-white disabled:opacity-50"
                  >
                    {deactivateMutation.isPending
                      ? "Deactivating..."
                      : "Confirm"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
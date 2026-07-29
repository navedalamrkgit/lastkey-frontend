import {
  Clock3,
  Globe2,
  MapPin,
  ShieldCheck,
  Trash2,
  Wifi,
} from "lucide-react";

import Button from "../ui/Button";
import {
  getDeviceIcon,
} from "../../config/securityConfig";
import {
  formatRelativeDate,
} from "../../utils/formatDate";

function DeviceIcon({
  deviceType,
  className,
}) {
  const Icon =
    getDeviceIcon(deviceType);

  return (
    <Icon className={className} />
  );
}

function InfoPill({
  icon: Icon,
  label,
  value,
  tone = "blue",
}) {
  const tones = {
    blue:
      "border-blue-100 bg-blue-50 text-blue-700",
    rose:
      "border-rose-100 bg-rose-50 text-rose-700",
    emerald:
      "border-emerald-100 bg-emerald-50 text-emerald-700",
    slate:
      "border-slate-200 bg-slate-50 text-slate-700",
  };

  return (
    <div
      className={`flex min-w-0 items-center gap-2 rounded-2xl border px-3 py-2.5 ${tones[tone] ?? tones.blue}`}
    >
      <Icon className="h-4 w-4 shrink-0" />

      <div className="min-w-0">
        <p className="text-[9px] font-black uppercase tracking-[0.13em] opacity-65">
          {label}
        </p>

        <p className="mt-0.5 truncate text-xs font-bold">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function ActiveSessionCard({
  session,
  revoking = false,
  onRevoke,
}) {
  const deviceName =
    session.deviceName ||
    session.browser ||
    "Unknown device";

  const browser =
    session.browser ||
    "Unknown browser";

  const operatingSystem =
    session.operatingSystem ||
    "Unknown operating system";

  const location =
    session.location ||
    "Location unavailable";

  const ipAddress =
    session.ipAddress ||
    "IP unavailable";

  const lastActivity =
    formatRelativeDate(
      session.lastActivityAt ||
        session.createdAt,
    );

  return (
    <article
      className={[
        "group relative overflow-hidden rounded-[30px] border p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6",
        session.current
          ? "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-teal-50 shadow-emerald-100/40"
          : "border-slate-200 bg-gradient-to-br from-white via-slate-50/70 to-blue-50/30 shadow-slate-200/40",
      ].join(" ")}
    >
      <div
        className={[
          "pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl transition duration-300 group-hover:scale-110",
          session.current
            ? "bg-emerald-300/25"
            : "bg-blue-300/20",
        ].join(" ")}
      />

      <div className="relative">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <span
              className={[
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] shadow-lg",
                session.current
                  ? "bg-emerald-600 text-white shadow-emerald-600/20"
                  : "bg-slate-950 text-white shadow-slate-950/15",
              ].join(" ")}
            >
              <DeviceIcon
                deviceType={
                  session.deviceType ||
                  session.deviceName
                }
                className="h-6 w-6"
              />
            </span>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-base font-black text-slate-950">
                  {deviceName}
                </h2>

                {session.current ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-emerald-700 shadow-sm">
                    <ShieldCheck className="h-3 w-3" />
                    Current session
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-slate-500 shadow-sm">
                    <Wifi className="h-3 w-3" />
                    Signed in
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm font-semibold text-slate-600">
                {browser}
              </p>

              <p className="mt-0.5 text-xs text-slate-500">
                {operatingSystem}
              </p>
            </div>
          </div>

          <span
            className={[
              "inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.13em]",
              session.current
                ? "border-emerald-200 bg-emerald-100 text-emerald-700"
                : "border-blue-200 bg-blue-50 text-blue-700",
            ].join(" ")}
          >
            <span
              className={[
                "h-2 w-2 rounded-full",
                session.current
                  ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.75)]"
                  : "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.65)]",
              ].join(" ")}
            />

            {session.current
              ? "This device"
              : "Active"}
          </span>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-3">
          <InfoPill
            icon={MapPin}
            label="Location"
            value={location}
            tone="rose"
          />

          <InfoPill
            icon={Globe2}
            label="IP address"
            value={ipAddress}
            tone="blue"
          />

          <InfoPill
            icon={Clock3}
            label="Last active"
            value={lastActivity}
            tone={
              session.current
                ? "emerald"
                : "slate"
            }
          />
        </div>

        {session.current ? (
          <div className="mt-5 flex items-start gap-3 rounded-[22px] border border-emerald-200 bg-white/80 px-4 py-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
              <ShieldCheck className="h-4 w-4" />
            </span>

            <div>
              <p className="text-sm font-black text-emerald-950">
                Current trusted session
              </p>

              <p className="mt-1 text-xs leading-5 text-emerald-700">
                This is the device you are currently using to access LastKey.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-5 flex flex-col gap-4 rounded-[22px] border border-slate-200 bg-white/80 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-black text-slate-950">
                Do you recognize this device?
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                Revoke this session immediately if the device or location looks unfamiliar.
              </p>
            </div>

            <Button
              className="shrink-0"
              variant="danger"
              leftIcon={Trash2}
              loading={revoking}
              loadingText="Revoking..."
              onClick={() =>
                onRevoke(session)
              }
            >
              Revoke session
            </Button>
          </div>
        )}
      </div>
    </article>
  );
}
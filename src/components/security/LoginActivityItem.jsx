import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Globe2,
  MapPin,
  ShieldBan,
} from "lucide-react";

import {
  getDeviceIcon,
  LOGIN_ACTIVITY_STATUS,
} from "../../config/securityConfig";
import {
  formatDate,
} from "../../utils/formatDate";

function DeviceIcon({ deviceType, className }) {
  const Icon = getDeviceIcon(deviceType);
  return <Icon className={className} />;
}

function Pill({ icon: Icon, value, tone }) {
  const tones = {
    blue: "border-blue-100 bg-blue-50 text-blue-700",
    rose: "border-rose-100 bg-rose-50 text-rose-700",
    slate: "border-slate-200 bg-slate-50 text-slate-700",
  };
  return (
    <div className={`flex items-center gap-2 rounded-2xl border px-3 py-2 ${tones[tone]}`}>
      <Icon className="h-4 w-4 shrink-0"/>
      <span className="truncate text-xs font-bold">{value}</span>
    </div>
  );
}

export default function LoginActivityItem({ activity }) {
  const status =
    LOGIN_ACTIVITY_STATUS[activity.status] ||
    LOGIN_ACTIVITY_STATUS.SUCCESS;

  const StatusIcon = status.icon;

  const danger =
    activity.status !== "SUCCESS";

  return (
    <article className={`group relative overflow-hidden rounded-[30px] border p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
      danger
        ? "border-rose-200 bg-gradient-to-br from-rose-50 via-white to-orange-50"
        : "border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-cyan-50"
    }`}>
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-blue-300/10 blur-3xl"/>

      <div className="relative flex flex-col gap-5 sm:flex-row">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[20px] bg-slate-950 text-white shadow-lg">
          <DeviceIcon
            deviceType={activity.deviceType || activity.deviceName}
            className="h-6 w-6"
          />
        </span>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-base font-black text-slate-950">
              {activity.deviceName || activity.browser || "Unknown device"}
            </h2>

            <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] ${status.className}`}>
              <StatusIcon className="h-3 w-3"/>
              {status.label}
            </span>
          </div>

          <p className="mt-1 text-sm font-semibold text-slate-600">
            {(activity.browser || "Unknown browser")} • {(activity.operatingSystem || "Unknown operating system")}
          </p>

          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <Pill icon={MapPin} value={activity.location || "Location unavailable"} tone="rose"/>
            <Pill icon={Globe2} value={activity.ipAddress || "IP unavailable"} tone="blue"/>
            <Pill
              icon={Clock3}
              value={formatDate(activity.createdAt,{hour:"2-digit",minute:"2-digit"})}
              tone="slate"
            />
          </div>

          {activity.failureReason ? (
            <div className="mt-5 flex gap-3 rounded-[22px] border border-rose-200 bg-rose-50 p-4">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rose-600"/>
              <div>
                <p className="text-sm font-black text-rose-800">
                  Failed login detected
                </p>
                <p className="mt-1 text-xs leading-5 text-rose-700">
                  {activity.failureReason}
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-5 flex gap-3 rounded-[22px] border border-emerald-200 bg-emerald-50 p-4">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600"/>
              <div>
                <p className="text-sm font-black text-emerald-800">
                  Verified login
                </p>
                <p className="mt-1 text-xs leading-5 text-emerald-700">
                  This sign-in completed successfully and no suspicious activity was detected.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="sm:w-36">
          <div className="rounded-[22px] border border-slate-200 bg-white p-4 text-center shadow-sm">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100">
              {danger ? <ShieldBan className="h-5 w-5 text-rose-600"/> : <CheckCircle2 className="h-5 w-5 text-emerald-600"/>}
            </div>
            <p className="mt-3 text-[10px] font-black uppercase tracking-[0.14em] text-slate-500">
              Risk
            </p>
            <p className="mt-1 text-sm font-black text-slate-950">
              {danger ? "Review" : "Safe"}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
import {
  FileCheck2,
  KeyRound,
  ShieldCheck,
  UserRoundPlus,
} from "lucide-react";

import { formatRelativeDate } from "../../utils/formatDate";

const activityTypes = {
  DOCUMENT: {
    icon: FileCheck2,
    iconClassName: "bg-blue-50 text-blue-600",
  },
  NOMINEE: {
    icon: UserRoundPlus,
    iconClassName: "bg-violet-50 text-violet-600",
  },
  SECURITY: {
    icon: ShieldCheck,
    iconClassName: "bg-emerald-50 text-emerald-600",
  },
  AUTH: {
    icon: KeyRound,
    iconClassName: "bg-amber-50 text-amber-600",
  },
};

const demoActivities = [
  {
    id: 1,
    title: "Document uploaded",
    description: "Life Insurance Policy.pdf was added.",
    type: "DOCUMENT",
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
  },
  {
    id: 2,
    title: "Nominee added",
    description: "A new trusted nominee was added.",
    type: "NOMINEE",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 3,
    title: "Security scan completed",
    description: "No suspicious account activity detected.",
    type: "SECURITY",
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 4,
    title: "Successful login",
    description: "A login was recorded from your trusted device.",
    type: "AUTH",
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function RecentActivity({
  activities = demoActivities,
}) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <h2 className="font-extrabold text-slate-950">
          Recent activity
        </h2>

        <p className="mt-1 text-xs text-slate-500">
          Latest changes across your account
        </p>
      </div>

      <div className="mt-6 space-y-1">
        {activities.map((activity, index) => {
          const type =
            activityTypes[activity.type] ||
            activityTypes.SECURITY;

          const Icon = type.icon;

          return (
            <div
              key={activity.id}
              className="relative flex gap-4 pb-5 last:pb-0"
            >
              {index < activities.length - 1 && (
                <span className="absolute left-5 top-10 h-[calc(100%-24px)] w-px bg-slate-200" />
              )}

              <span
                className={`relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${type.iconClassName}`}
              >
                <Icon className="h-4.5 w-4.5" />
              </span>

              <div className="min-w-0 pt-0.5">
                <p className="text-sm font-bold text-slate-900">
                  {activity.title}
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-500">
                  {activity.description}
                </p>

                <p className="mt-1.5 text-[11px] font-semibold text-slate-400">
                  {formatRelativeDate(activity.createdAt)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
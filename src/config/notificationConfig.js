import {
  BellRing,
  FileClock,
  FileText,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  UserRoundCheck,
  UsersRound,
} from "lucide-react";

export const NOTIFICATION_TYPES = {
  DOCUMENT: {
    label: "Document",
    icon: FileText,
    iconClassName:
      "bg-blue-50 text-blue-600",
  },

  DOCUMENT_EXPIRY: {
    label: "Document expiry",
    icon: FileClock,
    iconClassName:
      "bg-amber-50 text-amber-600",
  },

  NOMINEE: {
    label: "Nominee",
    icon: UsersRound,
    iconClassName:
      "bg-violet-50 text-violet-600",
  },

  NOMINEE_VERIFICATION: {
    label: "Nominee verification",
    icon: UserRoundCheck,
    iconClassName:
      "bg-violet-50 text-violet-600",
  },

  EMERGENCY: {
    label: "Emergency access",
    icon: ShieldAlert,
    iconClassName:
      "bg-red-50 text-red-600",
  },

  SECURITY: {
    label: "Security",
    icon: ShieldCheck,
    iconClassName:
      "bg-emerald-50 text-emerald-600",
  },

  AUTHENTICATION: {
    label: "Authentication",
    icon: KeyRound,
    iconClassName:
      "bg-cyan-50 text-cyan-600",
  },

  SYSTEM: {
    label: "System",
    icon: BellRing,
    iconClassName:
      "bg-slate-100 text-slate-600",
  },
};

export const NOTIFICATION_PRIORITIES = {
  LOW: {
    label: "Low",
    className:
      "border-slate-200 bg-slate-100 text-slate-600",
  },

  NORMAL: {
    label: "Normal",
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  HIGH: {
    label: "High",
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  CRITICAL: {
    label: "Critical",
    className:
      "border-red-200 bg-red-50 text-red-700",
  },
};

export const NOTIFICATION_FILTER_OPTIONS = [
  {
    value: "",
    label: "All notifications",
  },
  {
    value: "DOCUMENT",
    label: "Documents",
  },
  {
    value: "NOMINEE",
    label: "Nominees",
  },
  {
    value: "EMERGENCY",
    label: "Emergency",
  },
  {
    value: "SECURITY",
    label: "Security",
  },
  {
    value: "AUTHENTICATION",
    label: "Authentication",
  },
  {
    value: "SYSTEM",
    label: "System",
  },
];

export function getNotificationType(type) {
  return (
    NOTIFICATION_TYPES[type] ||
    NOTIFICATION_TYPES.SYSTEM
  );
}

export function getNotificationPriority(priority) {
  return (
    NOTIFICATION_PRIORITIES[priority] ||
    NOTIFICATION_PRIORITIES.NORMAL
  );
}
import {
  Eye,
  FileDown,
  ShieldCheck,
} from "lucide-react";

export const NOMINEE_RELATIONSHIPS = [
  {
    value: "FATHER",
    label: "Father",
  },
  {
    value: "MOTHER",
    label: "Mother",
  },
  {
    value: "SPOUSE",
    label: "Spouse",
  },
  {
    value: "SON",
    label: "Son",
  },
  {
    value: "DAUGHTER",
    label: "Daughter",
  },
  {
    value: "BROTHER",
    label: "Brother",
  },
  {
    value: "SISTER",
    label: "Sister",
  },
  {
    value: "FRIEND",
    label: "Friend",
  },
  {
    value: "LEGAL_ADVISOR",
    label: "Legal advisor",
  },
  {
    value: "OTHER",
    label: "Other",
  },
];

export const NOMINEE_STATUSES = {
  PENDING: {
    label: "Verification pending",
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  VERIFIED: {
    label: "Verified",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },

  REJECTED: {
    label: "Verification rejected",
    className:
      "border-red-200 bg-red-50 text-red-700",
  },

  SUSPENDED: {
    label: "Suspended",
    className:
      "border-slate-200 bg-slate-100 text-slate-600",
  },
};

export const NOMINEE_PERMISSION_TYPES = [
  {
    value: "VIEW",
    label: "View document",
    description:
      "The nominee may securely view the assigned document after approved release.",
    icon: Eye,
  },
  {
    value: "DOWNLOAD",
    label: "Download document",
    description:
      "The nominee may download a copy after approved emergency access.",
    icon: FileDown,
  },
  {
    value: "EMERGENCY_ACCESS",
    label: "Emergency access",
    description:
      "The nominee may request access through the emergency verification workflow.",
    icon: ShieldCheck,
  },
];

export function getRelationshipLabel(value) {
  return (
    NOMINEE_RELATIONSHIPS.find(
      (relationship) =>
        relationship.value === value,
    )?.label || "Other"
  );
}
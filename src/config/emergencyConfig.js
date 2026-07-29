import {
  Ban,
  CheckCircle2,
  Clock3,
  FileCheck2,
  FileSearch,
  Hourglass,
  ShieldAlert,
  XCircle,
} from "lucide-react";

export const EMERGENCY_REQUEST_STATUSES = {
  DRAFT: {
    label: "Draft",
    description: "The request has not been submitted.",
    className:
      "border-slate-200 bg-slate-100 text-slate-600",
    icon: FileSearch,
  },

  PENDING_VERIFICATION: {
    label: "Verification pending",
    description:
      "The nominee must complete identity and OTP verification.",
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
    icon: ShieldAlert,
  },

  UNDER_REVIEW: {
    label: "Under review",
    description:
      "The submitted evidence is currently being reviewed.",
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
    icon: FileSearch,
  },

  WAITING_PERIOD: {
    label: "Waiting period",
    description:
      "The security waiting period is currently active.",
    className:
      "border-violet-200 bg-violet-50 text-violet-700",
    icon: Hourglass,
  },

  APPROVED: {
    label: "Approved",
    description:
      "The emergency request has been approved.",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },

  ACCESS_RELEASED: {
    label: "Access released",
    description:
      "Approved documents are available to the nominee.",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: FileCheck2,
  },

  REJECTED: {
    label: "Rejected",
    description:
      "The emergency request was rejected.",
    className:
      "border-red-200 bg-red-50 text-red-700",
    icon: XCircle,
  },

  CANCELLED: {
    label: "Cancelled",
    description:
      "The emergency request was cancelled.",
    className:
      "border-slate-200 bg-slate-100 text-slate-600",
    icon: Ban,
  },

  EXPIRED: {
    label: "Expired",
    description:
      "The request or access period has expired.",
    className:
      "border-red-200 bg-red-50 text-red-700",
    icon: Clock3,
  },
};

export const EMERGENCY_TYPES = [
  {
    value: "MEDICAL_EMERGENCY",
    label: "Medical emergency",
  },
  {
    value: "DEATH",
    label: "Death of account holder",
  },
  {
    value: "INCAPACITATION",
    label: "Account holder incapacitated",
  },
  {
    value: "MISSING_PERSON",
    label: "Account holder missing",
  },
  {
    value: "LEGAL_REQUIREMENT",
    label: "Legal requirement",
  },
  {
    value: "OTHER",
    label: "Other emergency",
  },
];

export const EVIDENCE_TYPES = [
  {
    value: "MEDICAL_CERTIFICATE",
    label: "Medical certificate",
  },
  {
    value: "DEATH_CERTIFICATE",
    label: "Death certificate",
  },
  {
    value: "POLICE_REPORT",
    label: "Police report",
  },
  {
    value: "LEGAL_ORDER",
    label: "Legal order",
  },
  {
    value: "IDENTITY_PROOF",
    label: "Identity proof",
  },
  {
    value: "OTHER",
    label: "Other supporting evidence",
  },
];

export function getEmergencyStatus(status) {
  return (
    EMERGENCY_REQUEST_STATUSES[status] ||
    EMERGENCY_REQUEST_STATUSES.PENDING_VERIFICATION
  );
}

export function getEmergencyTypeLabel(type) {
  return (
    EMERGENCY_TYPES.find(
      (item) => item.value === type,
    )?.label || "Emergency request"
  );
}
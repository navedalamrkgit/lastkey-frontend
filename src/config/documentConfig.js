import {
  BadgeIndianRupee,
  BriefcaseBusiness,
  Building2,
  FileHeart,
  FileKey2,
  FileText,
  GraduationCap,
  Landmark,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const DOCUMENT_CATEGORIES = [
  {
    value: "IDENTITY",
    label: "Identity",
    icon: UserRound,
  },
  {
    value: "BANKING",
    label: "Banking",
    icon: Landmark,
  },
  {
    value: "INSURANCE",
    label: "Insurance",
    icon: ShieldCheck,
  },
  {
    value: "PROPERTY",
    label: "Property",
    icon: Building2,
  },
  {
    value: "INVESTMENT",
    label: "Investment",
    icon: BadgeIndianRupee,
  },
  {
    value: "MEDICAL",
    label: "Medical",
    icon: FileHeart,
  },
  {
    value: "EDUCATION",
    label: "Education",
    icon: GraduationCap,
  },
  {
    value: "BUSINESS",
    label: "Business",
    icon: BriefcaseBusiness,
  },
  {
    value: "CREDENTIAL",
    label: "Credential",
    icon: FileKey2,
  },
  {
    value: "OTHER",
    label: "Other",
    icon: FileText,
  },
];

export const DOCUMENT_STATUSES = {
  ACTIVE: {
    label: "Active",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
  },

  EXPIRING_SOON: {
    label: "Expiring soon",
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
  },

  EXPIRED: {
    label: "Expired",
    className:
      "border-red-200 bg-red-50 text-red-700",
  },

  PROCESSING: {
    label: "Processing",
    className:
      "border-blue-200 bg-blue-50 text-blue-700",
  },

  ARCHIVED: {
    label: "Archived",
    className:
      "border-slate-200 bg-slate-100 text-slate-600",
  },
};

export function getDocumentCategory(categoryValue) {
  return (
    DOCUMENT_CATEGORIES.find(
      (category) => category.value === categoryValue,
    ) || DOCUMENT_CATEGORIES.at(-1)
  );
}
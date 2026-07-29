import {
  AlertTriangle,
  CheckCircle2,
  KeyRound,
  Laptop,
  MailCheck,
  ShieldCheck,
  Smartphone,
  UserRoundCheck,
} from "lucide-react";

export const SECURITY_RECOMMENDATIONS = {
  EMAIL_VERIFIED: {
    title: "Verify your email address",
    description:
      "Email verification protects recovery and sensitive account actions.",
    icon: MailCheck,
  },

  STRONG_PASSWORD: {
    title: "Use a strong password",
    description:
      "Use a unique password containing uppercase, lowercase, numbers and symbols.",
    icon: KeyRound,
  },

  PROFILE_COMPLETE: {
    title: "Complete your profile",
    description:
      "Keep your contact and identity information accurate and current.",
    icon: UserRoundCheck,
  },

  REVIEW_SESSIONS: {
    title: "Review active sessions",
    description:
      "Remove devices or browsers that you no longer use or recognise.",
    icon: Laptop,
  },

  NOMINEE_VERIFIED: {
    title: "Verify trusted nominees",
    description:
      "Verified nominees make emergency workflows safer and more reliable.",
    icon: ShieldCheck,
  },
};

export const LOGIN_ACTIVITY_STATUS = {
  SUCCESS: {
    label: "Successful",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700",
    icon: CheckCircle2,
  },

  FAILED: {
    label: "Failed",
    className:
      "border-red-200 bg-red-50 text-red-700",
    icon: AlertTriangle,
  },

  BLOCKED: {
    label: "Blocked",
    className:
      "border-amber-200 bg-amber-50 text-amber-700",
    icon: AlertTriangle,
  },
};

export function getDeviceIcon(deviceType = "") {
  const normalizedType =
    String(deviceType).toLowerCase();

  if (
    normalizedType.includes("mobile") ||
    normalizedType.includes("android") ||
    normalizedType.includes("iphone")
  ) {
    return Smartphone;
  }

  return Laptop;
}
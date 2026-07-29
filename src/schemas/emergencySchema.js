import { z } from "zod";

export const emergencyRequestSchema = z.object({
  nomineeId: z
    .string()
    .min(1, "Select a nominee."),

  emergencyType: z
    .string()
    .min(1, "Select the emergency type."),

  incidentDate: z
    .string()
    .min(1, "Incident date is required."),

  description: z
    .string()
    .trim()
    .min(
      20,
      "Provide at least 20 characters explaining the emergency.",
    )
    .max(
      1500,
      "Description cannot exceed 1500 characters.",
    ),

  requestedAccessReason: z
    .string()
    .trim()
    .min(
      10,
      "Explain why access to the documents is required.",
    )
    .max(
      1000,
      "Access reason cannot exceed 1000 characters.",
    ),

  contactPhone: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian mobile number.",
    ),

  declarationAccepted: z.literal(true, {
    errorMap: () => ({
      message:
        "You must accept the declaration before submitting.",
    }),
  }),
});

export const emergencyOtpSchema = z.object({
  otp: z
    .string()
    .trim()
    .regex(
      /^\d{6}$/,
      "Enter the complete 6-digit OTP.",
    ),
});

export const publicEmergencyAccessSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Enter a valid email address."),

  otp: z
    .string()
    .trim()
    .regex(
      /^\d{6}$/,
      "Enter the complete 6-digit OTP.",
    ),
});

export const emergencyReviewSchema = z.object({
  reviewNote: z
    .string()
    .trim()
    .max(
      1000,
      "Review note cannot exceed 1000 characters.",
    )
    .optional(),

  waitingPeriodHours: z
    .number()
    .int()
    .min(0)
    .max(720),
});

export const emergencyRejectionSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(
      10,
      "Provide a clear rejection reason.",
    )
    .max(
      1000,
      "Rejection reason cannot exceed 1000 characters.",
    ),
});
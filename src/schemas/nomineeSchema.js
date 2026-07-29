import { z } from "zod";

export const nomineeSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(
      2,
      "First name must contain at least 2 characters.",
    )
    .max(
      50,
      "First name cannot exceed 50 characters.",
    ),

  lastName: z
    .string()
    .trim()
    .min(
      2,
      "Last name must contain at least 2 characters.",
    )
    .max(
      50,
      "Last name cannot exceed 50 characters.",
    ),

  email: z
    .string()
    .trim()
    .min(
      1,
      "Email address is required.",
    )
    .email(
      "Enter a valid email address.",
    )
    .transform((value) =>
      value.toLowerCase(),
    ),

  phone: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian mobile number.",
    ),

  relationship: z
    .string()
    .min(
      1,
      "Select your relationship with the nominee.",
    ),

  dateOfBirth: z
    .string()
    .optional(),

  address: z
    .string()
    .trim()
    .max(
      300,
      "Address cannot exceed 300 characters.",
    )
    .optional(),

  notes: z
    .string()
    .trim()
    .max(
      500,
      "Notes cannot exceed 500 characters.",
    )
    .optional(),

  emergencyAccessEnabled:
    z.boolean(),

  priorityLevel: z
    .number()
    .int()
    .min(
      1,
      "Priority must be at least 1.",
    )
    .max(
      10,
      "Priority cannot exceed 10.",
    ),
});

export const nomineeVerificationSchema =
  z.object({
    otp: z
      .string()
      .trim()
      .regex(
        /^\d{6}$/,
        "Enter the complete 6-digit verification code.",
      ),
  });

export const nomineePermissionSchema =
  z.object({
    documentPermissions:
      z.array(
        z.object({
          documentId:
            z.string(),

          permissions:
            z.array(
              z.enum([
                "VIEW",
                "DOWNLOAD",
                "EMERGENCY_ACCESS",
              ]),
            ),
        }),
      ),

    emergencyAccessEnabled:
      z.boolean(),

    waitingPeriodHours:
      z
        .number()
        .int()
        .min(0)
        .max(720),

    releaseMessage:
      z
        .string()
        .trim()
        .max(
          1000,
          "Release message cannot exceed 1000 characters.",
        )
        .optional(),
  });
import { z } from "zod";

export const profileSchema = z.object({
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

  phone: z
    .string()
    .trim()
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit Indian mobile number.",
    ),

  profileImageUrl: z
    .string()
    .trim()
    .url(
      "Enter a valid image URL.",
    )
    .or(z.literal(""))
    .optional(),

  dateOfBirth: z
    .string()
    .optional(),

  occupation: z
    .string()
    .trim()
    .max(
      100,
      "Occupation cannot exceed 100 characters.",
    )
    .optional(),

  address: z
    .string()
    .trim()
    .max(
      300,
      "Address cannot exceed 300 characters.",
    )
    .optional(),

  city: z
    .string()
    .trim()
    .max(
      100,
      "City cannot exceed 100 characters.",
    )
    .optional(),

  state: z
    .string()
    .trim()
    .max(
      100,
      "State cannot exceed 100 characters.",
    )
    .optional(),

  country: z
    .string()
    .trim()
    .max(
      100,
      "Country cannot exceed 100 characters.",
    )
    .optional(),

  postalCode: z
    .string()
    .trim()
    .regex(
      /^\d{6}$/,
      "Enter a valid 6-digit postal code.",
    )
    .or(z.literal(""))
    .optional(),
});

export const accountSettingsSchema =
  z.object({
    emailNotifications:
      z.boolean(),

    documentExpiryNotifications:
      z.boolean(),

    securityNotifications:
      z.boolean(),

    nomineeNotifications:
      z.boolean(),

    emergencyNotifications:
      z.boolean(),

    marketingEmails:
      z.boolean(),

    hideSensitiveDocumentNames:
      z.boolean(),

    requirePasswordForDownloads:
      z.boolean(),

    defaultEmergencyWaitingPeriod:
      z
        .number()
        .int()
        .min(0)
        .max(720),

    timezone: z
      .string()
      .min(
        1,
        "Select a timezone.",
      ),
  });

export const deactivateAccountSchema =
  z.object({
    password: z
      .string()
      .min(
        1,
        "Enter your password.",
      ),

    confirmation: z
      .string()
      .trim()
      .refine(
        (value) =>
          value === "DEACTIVATE",
        "Type DEACTIVATE exactly.",
      ),
  });
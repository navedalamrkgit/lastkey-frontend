import { z } from "zod";

export const changePasswordSchema =
  z
    .object({
      currentPassword: z
        .string()
        .min(
          1,
          "Enter your current password.",
        ),

      newPassword: z
        .string()
        .min(
          8,
          "New password must contain at least 8 characters.",
        )
        .regex(
          /[A-Z]/,
          "Include at least one uppercase letter.",
        )
        .regex(
          /[a-z]/,
          "Include at least one lowercase letter.",
        )
        .regex(
          /\d/,
          "Include at least one number.",
        )
        .regex(
          /[^A-Za-z0-9]/,
          "Include at least one special character.",
        ),

      confirmPassword: z
        .string()
        .min(
          1,
          "Confirm your new password.",
        ),
    })
    .refine(
      (values) =>
        values.newPassword ===
        values.confirmPassword,
      {
        path: [
          "confirmPassword",
        ],
        message:
          "Passwords do not match.",
      },
    )
    .refine(
      (values) =>
        values.currentPassword !==
        values.newPassword,
      {
        path: ["newPassword"],
        message:
          "New password must be different from the current password.",
      },
    );
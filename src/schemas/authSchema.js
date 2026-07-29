import { z } from "zod";

const emailSchema = z
  .string()
  .trim()
  .min(1, "Email address is required.")
  .email("Enter a valid email address.")
  .transform((value) => value.toLowerCase());

const passwordSchema = z
  .string()
  .min(8, "Password must contain at least 8 characters.")
  .max(64, "Password cannot exceed 64 characters.")
  .regex(
    /[A-Z]/,
    "Password must contain at least one uppercase letter.",
  )
  .regex(
    /[a-z]/,
    "Password must contain at least one lowercase letter.",
  )
  .regex(
    /\d/,
    "Password must contain at least one number.",
  )
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character.",
  );

export const loginSchema = z.object({
  email: emailSchema,

  password: z
    .string()
    .min(1, "Password is required."),
});

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(2, "First name must contain at least 2 characters.")
      .max(50, "First name cannot exceed 50 characters.")
      .regex(
        /^[A-Za-z][A-Za-z\s'-]*$/,
        "First name can contain letters, spaces, apostrophes and hyphens.",
      ),

    lastName: z
      .string()
      .trim()
      .min(2, "Last name must contain at least 2 characters.")
      .max(50, "Last name cannot exceed 50 characters.")
      .regex(
        /^[A-Za-z][A-Za-z\s'-]*$/,
        "Last name can contain letters, spaces, apostrophes and hyphens.",
      ),

    email: emailSchema,

    phone: z
      .string()
      .trim()
      .regex(
        /^[6-9]\d{9}$/,
        "Enter a valid 10-digit Indian mobile number.",
      ),

    password: passwordSchema,

    confirmPassword: z
      .string()
      .min(1, "Confirm your password."),

    acceptTerms: z.literal(true, {
      errorMap: () => ({
        message:
          "You must accept the Terms of Service and Privacy Policy.",
      }),
    }),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match.",
    },
  );

export const verifyEmailSchema = z.object({
  email: emailSchema,

  otp: z
    .string()
    .trim()
    .regex(
      /^\d{6}$/,
      "Enter the complete 6-digit verification code.",
    ),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    email: emailSchema,

    otp: z
      .string()
      .trim()
      .regex(
        /^\d{6}$/,
        "Enter the complete 6-digit reset code.",
      ),

    newPassword: passwordSchema,

    confirmPassword: z
      .string()
      .min(1, "Confirm your new password."),
  })
  .refine(
    (data) =>
      data.newPassword === data.confirmPassword,
    {
      path: ["confirmPassword"],
      message: "Passwords do not match.",
    },
  );
import { z } from "zod";

import { appConfig } from "../config/appConfig";

export const documentUploadSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Document title must contain at least 2 characters.")
    .max(120, "Document title cannot exceed 120 characters."),

  category: z
    .string()
    .min(1, "Select a document category."),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),

  documentNumber: z
    .string()
    .trim()
    .max(100, "Document number cannot exceed 100 characters.")
    .optional(),

  issuer: z
    .string()
    .trim()
    .max(120, "Issuer cannot exceed 120 characters.")
    .optional(),

  issueDate: z
    .string()
    .optional(),

  expiryDate: z
    .string()
    .optional(),

  reminderEnabled: z.boolean(),

  file: z
    .instanceof(File, {
      message: "Select a document file.",
    })
    .refine(
      (file) =>
        file.size <= appConfig.upload.maxFileSize,
      "File size cannot exceed 10 MB.",
    )
    .refine(
      (file) =>
        appConfig.upload.allowedMimeTypes.includes(
          file.type,
        ),
      "Only PDF, JPG, PNG and WEBP files are supported.",
    ),
}).refine(
  (data) => {
    if (!data.issueDate || !data.expiryDate) {
      return true;
    }

    return (
      new Date(data.expiryDate) >=
      new Date(data.issueDate)
    );
  },
  {
    path: ["expiryDate"],
    message:
      "Expiry date cannot be earlier than issue date.",
  },
);
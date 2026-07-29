import {
  zodResolver,
} from "@hookform/resolvers/zod";
import {
  BellRing,
  Save,
} from "lucide-react";
import {
  Controller,
  useForm,
} from "react-hook-form";

import FileDropzone from "./FileDropzone";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import {
  DOCUMENT_CATEGORIES,
} from "../../config/documentConfig";
import {
  documentUploadSchema,
} from "../../schemas/documentSchema";

export default function DocumentUploadForm({
  onSubmit,
  loading = false,
  uploadProgress = 0,
}) {
  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm({
    resolver: zodResolver(
      documentUploadSchema,
    ),

    defaultValues: {
      title: "",
      category: "",
      description: "",
      documentNumber: "",
      issuer: "",
      issueDate: "",
      expiryDate: "",
      reminderEnabled: true,
      file: undefined,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-extrabold text-slate-950">
          Select document
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Choose a supported document from your computer.
        </p>

        <div className="mt-6">
          <Controller
            name="file"
            control={control}
            render={({ field }) => (
              <FileDropzone
                file={field.value}
                onFileChange={
                  field.onChange
                }
                error={
                  errors.file?.message
                }
                disabled={loading}
              />
            )}
          />
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-extrabold text-slate-950">
          Document information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Add details that will make the document easier to identify.
        </p>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <FormInput
            label="Document title"
            name="title"
            placeholder="Life Insurance Policy"
            error={
              errors.title?.message
            }
            required
            {...register("title")}
          />

          <div>
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Category
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <select
              id="category"
              className={[
                "h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none transition",
                errors.category
                  ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
              ].join(" ")}
              {...register("category")}
            >
              <option value="">
                Select category
              </option>

              {DOCUMENT_CATEGORIES.map(
                (category) => (
                  <option
                    key={category.value}
                    value={category.value}
                  >
                    {category.label}
                  </option>
                ),
              )}
            </select>

            {errors.category && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {
                  errors.category
                    .message
                }
              </p>
            )}
          </div>

          <FormInput
            label="Document number"
            name="documentNumber"
            placeholder="Optional reference number"
            error={
              errors.documentNumber
                ?.message
            }
            {...register(
              "documentNumber",
            )}
          />

          <FormInput
            label="Issued by"
            name="issuer"
            placeholder="Organisation or authority"
            error={
              errors.issuer?.message
            }
            {...register("issuer")}
          />

          <FormInput
            label="Issue date"
            name="issueDate"
            type="date"
            error={
              errors.issueDate?.message
            }
            {...register("issueDate")}
          />

          <FormInput
            label="Expiry date"
            name="expiryDate"
            type="date"
            error={
              errors.expiryDate
                ?.message
            }
            helperText="Leave empty if the document does not expire."
            {...register("expiryDate")}
          />

          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Description
            </label>

            <textarea
              id="description"
              rows={4}
              placeholder="Add notes about this document..."
              className={[
                "w-full resize-none rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition",
                errors.description
                  ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
              ].join(" ")}
              {...register("description")}
            />

            {errors.description && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {
                  errors.description
                    .message
                }
              </p>
            )}
          </div>
        </div>

        <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-4">
          <input
            type="checkbox"
            className="mt-0.5 h-4 w-4 rounded border-blue-300 text-blue-600 focus:ring-blue-500"
            {...register(
              "reminderEnabled",
            )}
          />

          <BellRing className="mt-0.5 h-4.5 w-4.5 shrink-0 text-blue-600" />

          <span>
            <span className="block text-sm font-bold text-blue-950">
              Enable expiry reminders
            </span>

            <span className="mt-1 block text-xs leading-5 text-blue-700">
              Receive notifications before the document expires.
            </span>
          </span>
        </label>
      </section>

      {loading && (
        <section className="rounded-3xl border border-blue-200 bg-blue-50 p-5">
          <div className="flex items-center justify-between text-xs font-bold text-blue-800">
            <span>
              Uploading securely
            </span>

            <span>
              {uploadProgress}%
            </span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-blue-100">
            <div
              className="h-full rounded-full bg-blue-600 transition-all"
              style={{
                width: `${uploadProgress}%`,
              }}
            />
          </div>
        </section>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
          loadingText="Uploading document..."
          leftIcon={Save}
        >
          Save document securely
        </Button>
      </div>
    </form>
  );
}
import {
  zodResolver,
} from "@hookform/resolvers/zod";
import {
  AtSign,
  Phone,
  Save,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import {
  useEffect,
} from "react";
import {
  useForm,
} from "react-hook-form";

import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import {
  NOMINEE_RELATIONSHIPS,
} from "../../config/nomineeConfig";
import {
  nomineeSchema,
} from "../../schemas/nomineeSchema";

export default function NomineeForm({
  initialValues,
  onSubmit,
  loading = false,
  submitText = "Add nominee",
}) {
  const {
    register,
    reset,
    handleSubmit,
    formState: {
      errors,
    },
  } = useForm({
    resolver: zodResolver(
      nomineeSchema,
    ),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      relationship: "",
      dateOfBirth: "",
      address: "",
      notes: "",
      emergencyAccessEnabled:
        false,
      priorityLevel: 1,
    },
  });

  useEffect(() => {
    if (!initialValues) {
      return;
    }

    reset({
      firstName:
        initialValues.firstName ||
        "",

      lastName:
        initialValues.lastName ||
        "",

      email:
        initialValues.email || "",

      phone:
        initialValues.phone || "",

      relationship:
        initialValues.relationship ||
        "",

      dateOfBirth:
        initialValues.dateOfBirth ||
        "",

      address:
        initialValues.address || "",

      notes:
        initialValues.notes || "",

      emergencyAccessEnabled:
        Boolean(
          initialValues.emergencyAccessEnabled,
        ),

      priorityLevel:
        Number(
          initialValues.priorityLevel ||
            1,
        ),
    });
  }, [initialValues, reset]);

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit,
      )}
      className="space-y-6"
      noValidate
    >
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <div>
          <h2 className="text-lg font-extrabold text-slate-950">
            Personal information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter accurate details for the trusted person.
          </p>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <FormInput
            label="First name"
            name="firstName"
            placeholder="First name"
            icon={UserRound}
            error={
              errors.firstName?.message
            }
            required
            {...register("firstName")}
          />

          <FormInput
            label="Last name"
            name="lastName"
            placeholder="Last name"
            icon={UserRound}
            error={
              errors.lastName?.message
            }
            required
            {...register("lastName")}
          />

          <FormInput
            label="Email address"
            name="email"
            type="email"
            placeholder="nominee@example.com"
            icon={AtSign}
            error={
              errors.email?.message
            }
            required
            {...register("email")}
          />

          <FormInput
            label="Mobile number"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="9876543210"
            icon={Phone}
            error={
              errors.phone?.message
            }
            required
            {...register("phone")}
          />

          <div>
            <label
              htmlFor="relationship"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Relationship
              <span className="ml-1 text-red-500">
                *
              </span>
            </label>

            <select
              id="relationship"
              className={[
                "h-12 w-full rounded-2xl border bg-white px-4 text-sm outline-none transition",
                errors.relationship
                  ? "border-red-300 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
                  : "border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10",
              ].join(" ")}
              {...register(
                "relationship",
              )}
            >
              <option value="">
                Select relationship
              </option>

              {NOMINEE_RELATIONSHIPS.map(
                (item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ),
              )}
            </select>

            {errors.relationship && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {
                  errors.relationship
                    .message
                }
              </p>
            )}
          </div>

          <FormInput
            label="Date of birth"
            name="dateOfBirth"
            type="date"
            error={
              errors.dateOfBirth
                ?.message
            }
            {...register(
              "dateOfBirth",
            )}
          />

          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Address
            </label>

            <textarea
              id="address"
              rows={3}
              placeholder="Nominee residential address"
              className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              {...register("address")}
            />

            {errors.address && (
              <p className="mt-1.5 text-xs font-medium text-red-600">
                {
                  errors.address
                    .message
                }
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-extrabold text-slate-950">
          Access preferences
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          These settings may be changed later from the permission page.
        </p>

        <label className="mt-6 flex cursor-pointer items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
          <input
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-emerald-300 text-emerald-600 focus:ring-emerald-500"
            {...register(
              "emergencyAccessEnabled",
            )}
          />

          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

          <span>
            <span className="block text-sm font-bold text-emerald-950">
              Allow emergency-access requests
            </span>

            <span className="mt-1 block text-xs leading-5 text-emerald-700">
              The nominee may initiate a verified emergency request. Documents are not released immediately.
            </span>
          </span>
        </label>

        <div className="mt-5">
          <label
            htmlFor="priorityLevel"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Nominee priority
          </label>

          <input
            id="priorityLevel"
            type="number"
            min="1"
            max="10"
            className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            {...register(
              "priorityLevel",
              {
                valueAsNumber: true,
              },
            )}
          />

          <p className="mt-1.5 text-xs text-slate-500">
            Priority 1 is the highest priority nominee.
          </p>

          {errors.priorityLevel && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {
                errors.priorityLevel
                  .message
              }
            </p>
          )}
        </div>

        <div className="mt-5">
          <label
            htmlFor="notes"
            className="mb-2 block text-sm font-semibold text-slate-700"
          >
            Private notes
          </label>

          <textarea
            id="notes"
            rows={4}
            placeholder="Add private notes about this nominee..."
            className="w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
            {...register("notes")}
          />

          {errors.notes && (
            <p className="mt-1.5 text-xs font-medium text-red-600">
              {errors.notes.message}
            </p>
          )}
        </div>
      </section>

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
          loadingText="Saving nominee..."
          leftIcon={Save}
        >
          {submitText}
        </Button>
      </div>
    </form>
  );
}
import {
  ArrowLeft,
  MailCheck,
  ShieldCheck,
} from "lucide-react";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import { nomineeApi } from "../../api/nomineeApi";
import NomineeForm from "../../components/nominees/NomineeForm";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/ui/Button";
import { getErrorMessage } from "../../utils/errorHandler";
import { ROUTES } from "../../utils/routePaths";
import { buildRoute } from "../../utils/routeUtils";

export default function AddNomineePage() {
  const navigate =
    useNavigate();

  const queryClient =
    useQueryClient();

  const createMutation =
    useMutation({
      mutationFn: (values) =>
        nomineeApi.createNominee({
          ...values,

          firstName:
            values.firstName.trim(),

          lastName:
            values.lastName.trim(),

          email:
            values.email
              .trim()
              .toLowerCase(),

          phone:
            values.phone.trim(),

          address:
            values.address?.trim() ||
            null,

          notes:
            values.notes?.trim() ||
            null,

          dateOfBirth:
            values.dateOfBirth ||
            null,
        }),

      onSuccess: (response) => {
        toast.success(
          "Nominee added. Verification instructions have been sent.",
        );

        queryClient.invalidateQueries({
          queryKey: ["nominees"],
        });

        const nomineeId =
          response.data?.id ||
          response.data?.nomineeId;

        if (nomineeId) {
          navigate(
            buildRoute(
              ROUTES.NOMINEE_DETAILS,
              {
                nomineeId,
              },
            ),
            {
              replace: true,
            },
          );
        } else {
          navigate(
            ROUTES.NOMINEES,
            {
              replace: true,
            },
          );
        }
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to add the nominee.",
          ),
        );
      },
    });

  return (
    <div className="page-enter px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-5xl">
        <PageHeader
          eyebrow="Trusted nominee"
          title="Add a nominee"
          description="Add someone you trust and configure their initial emergency-access preference."
          actions={
            <Link
              to={ROUTES.NOMINEES}
            >
              <Button
                size="medium"
                variant="secondary"
                leftIcon={ArrowLeft}
              >
                Back to nominees
              </Button>
            </Link>
          }
        />

        <div className="mt-7 grid gap-6 lg:grid-cols-[1fr_280px]">
          <NomineeForm
            loading={
              createMutation.isPending
            }
            onSubmit={(values) =>
              createMutation.mutate(
                values,
              )
            }
          />

          <aside className="space-y-5">
            <section className="rounded-3xl bg-slate-950 p-6 text-white">
              <ShieldCheck className="h-7 w-7 text-blue-400" />

              <h2 className="mt-5 text-lg font-extrabold">
                Controlled access
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Adding a nominee does not give immediate access to documents.
              </p>
            </section>

            <section className="rounded-3xl border border-blue-200 bg-blue-50 p-6">
              <MailCheck className="h-6 w-6 text-blue-600" />

              <h2 className="mt-4 text-sm font-extrabold text-blue-950">
                Verification email
              </h2>

              <p className="mt-2 text-xs leading-6 text-blue-700">
                A verification code will be sent to the nominee’s email address after creation.
              </p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
import {
  ArrowLeft,
  Clock3,
  Save,
  ShieldCheck,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  Link,
  useParams,
} from "react-router-dom";

import { nomineeApi } from "../../api/nomineeApi";
import PermissionSelector from "../../components/nominees/PermissionSelector";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/ui/Button";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import { getErrorMessage } from "../../utils/errorHandler";
import { ROUTES } from "../../utils/routePaths";
import { buildRoute } from "../../utils/routeUtils";

function normalizeDocuments(
  response,
) {
  const data = response?.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (
    Array.isArray(data?.content)
  ) {
    return data.content;
  }

  if (
    Array.isArray(data?.documents)
  ) {
    return data.documents;
  }

  return [];
}

function convertPermissionResponse(
  response,
) {
  const data =
    response?.data || {};

  const permissionMap = {};

  const documentPermissions =
    data.documentPermissions ||
    data.permissions ||
    [];

  documentPermissions.forEach(
    (item) => {
      permissionMap[
        item.documentId
      ] = item.permissions || [];
    },
  );

  return {
    permissionMap,

    emergencyAccessEnabled:
      Boolean(
        data.emergencyAccessEnabled,
      ),

    waitingPeriodHours:
      Number(
        data.waitingPeriodHours ||
          24,
      ),

    releaseMessage:
      data.releaseMessage || "",
  };
}

export default function NomineePermissionsPage() {
  const {
    nomineeId,
  } = useParams();

  const queryClient =
    useQueryClient();

  const [
    permissions,
    setPermissions,
  ] = useState({});

  const [
    emergencyAccessEnabled,
    setEmergencyAccessEnabled,
  ] = useState(false);

  const [
    waitingPeriodHours,
    setWaitingPeriodHours,
  ] = useState(24);

  const [
    releaseMessage,
    setReleaseMessage,
  ] = useState("");

  const nomineeQuery =
    useQuery({
      queryKey: [
        "nominee",
        nomineeId,
      ],

      queryFn: async () => {
        const response =
          await nomineeApi.getNomineeById(
            nomineeId,
          );

        return response.data;
      },
    });

  const documentsQuery =
    useQuery({
      queryKey: [
        "nominee-assignable-documents",
        nomineeId,
      ],

      queryFn: async () => {
        const response =
          await nomineeApi.getAssignableDocuments(
            nomineeId,
          );

        return normalizeDocuments(
          response,
        );
      },
    });

  const permissionQuery =
    useQuery({
      queryKey: [
        "nominee-permissions",
        nomineeId,
      ],

      queryFn: async () => {
        const response =
          await nomineeApi.getNomineePermissions(
            nomineeId,
          );

        return convertPermissionResponse(
          response,
        );
      },
    });

  useEffect(() => {
    if (!permissionQuery.data) {
      return;
    }

    setPermissions(
      permissionQuery.data
        .permissionMap,
    );

    setEmergencyAccessEnabled(
      permissionQuery.data
        .emergencyAccessEnabled,
    );

    setWaitingPeriodHours(
      permissionQuery.data
        .waitingPeriodHours,
    );

    setReleaseMessage(
      permissionQuery.data
        .releaseMessage,
    );
  }, [permissionQuery.data]);

  const saveMutation =
    useMutation({
      mutationFn: () => {
        const documentPermissions =
          Object.entries(
            permissions,
          )
            .filter(
              ([, permissionList]) =>
                permissionList.length >
                0,
            )
            .map(
              ([
                documentId,
                permissionList,
              ]) => ({
                documentId,
                permissions:
                  permissionList,
              }),
            );

        return nomineeApi.updateNomineePermissions(
          nomineeId,
          {
            documentPermissions,
            emergencyAccessEnabled,
            waitingPeriodHours:
              Number(
                waitingPeriodHours,
              ),
            releaseMessage:
              releaseMessage.trim(),
          },
        );
      },

      onSuccess: () => {
        toast.success(
          "Nominee permissions saved successfully.",
        );

        queryClient.invalidateQueries({
          queryKey: [
            "nominee-permissions",
            nomineeId,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: [
            "nominee",
            nomineeId,
          ],
        });

        queryClient.invalidateQueries({
          queryKey: ["nominees"],
        });
      },

      onError: (error) => {
        toast.error(
          getErrorMessage(
            error,
            "Unable to save nominee permissions.",
          ),
        );
      },
    });

  const assignedDocumentCount =
    useMemo(
      () =>
        Object.values(
          permissions,
        ).filter(
          (permissionList) =>
            permissionList.length >
            0,
        ).length,
      [permissions],
    );

  const detailsPath =
    buildRoute(
      ROUTES.NOMINEE_DETAILS,
      {
        nomineeId,
      },
    );

  const loading =
    nomineeQuery.isLoading ||
    documentsQuery.isLoading ||
    permissionQuery.isLoading;

  if (loading) {
    return (
      <div className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <LoadingSkeleton className="h-28" />
          <LoadingSkeleton className="h-[500px]" />
        </div>
      </div>
    );
  }

  if (
    nomineeQuery.isError ||
    documentsQuery.isError ||
    permissionQuery.isError
  ) {
    return (
      <div className="px-4 py-16 text-center">
        <ShieldCheck className="mx-auto h-12 w-12 text-red-400" />

        <h1 className="mt-5 text-2xl font-extrabold text-slate-950">
          Permissions unavailable
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Check the nominee permission and assignable-document endpoints.
        </p>

        <Link
          to={detailsPath}
          className="mt-6 inline-block"
        >
          <Button
            leftIcon={ArrowLeft}
          >
            Back to nominee
          </Button>
        </Link>
      </div>
    );
  }

  const nominee =
    nomineeQuery.data;

  const documents =
    documentsQuery.data || [];

  return (
    <div className="page-enter px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-6xl">
        <PageHeader
          eyebrow="Document permissions"
          title={`${nominee.firstName} ${nominee.lastName}`}
          description="Choose which documents may be viewed or downloaded after an approved emergency request."
          actions={
            <>
              <Link
                to={detailsPath}
              >
                <Button
                  size="medium"
                  variant="secondary"
                  leftIcon={ArrowLeft}
                >
                  Back
                </Button>
              </Link>

              <Button
                size="medium"
                leftIcon={Save}
                loading={
                  saveMutation.isPending
                }
                loadingText="Saving permissions..."
                onClick={() =>
                  saveMutation.mutate()
                }
              >
                Save permissions
              </Button>
            </>
          }
        />

        <section className="mt-7 grid gap-6 lg:grid-cols-[1fr_330px]">
          <div>
            <div className="mb-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-950">
                    Document assignments
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Assign only the minimum access required.
                  </p>
                </div>

                <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                  {assignedDocumentCount}{" "}
                  assigned
                </span>
              </div>
            </div>

            <PermissionSelector
              documents={documents}
              permissions={
                permissions
              }
              onChange={
                setPermissions
              }
            />
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl bg-slate-950 p-6 text-white">
              <ShieldCheck className="h-7 w-7 text-blue-400" />

              <h2 className="mt-5 text-lg font-extrabold">
                Emergency settings
              </h2>

              <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                <input
                  type="checkbox"
                  checked={
                    emergencyAccessEnabled
                  }
                  onChange={(event) =>
                    setEmergencyAccessEnabled(
                      event.target
                        .checked,
                    )
                  }
                  className="mt-0.5 h-4 w-4 rounded border-slate-500 text-blue-600 focus:ring-blue-500"
                />

                <span>
                  <span className="block text-sm font-bold text-white">
                    Allow emergency requests
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-slate-400">
                    The nominee may begin the verified emergency workflow.
                  </span>
                </span>
              </label>

              <div className="mt-5">
                <label
                  htmlFor="waitingPeriodHours"
                  className="mb-2 flex items-center gap-2 text-xs font-bold text-slate-300"
                >
                  <Clock3 className="h-4 w-4" />
                  Waiting period
                </label>

                <select
                  id="waitingPeriodHours"
                  value={
                    waitingPeriodHours
                  }
                  onChange={(event) =>
                    setWaitingPeriodHours(
                      Number(
                        event.target
                          .value,
                      ),
                    )
                  }
                  disabled={
                    !emergencyAccessEnabled
                  }
                  className="h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option
                    value="0"
                    className="text-slate-900"
                  >
                    No waiting period
                  </option>

                  <option
                    value="24"
                    className="text-slate-900"
                  >
                    24 hours
                  </option>

                  <option
                    value="48"
                    className="text-slate-900"
                  >
                    48 hours
                  </option>

                  <option
                    value="72"
                    className="text-slate-900"
                  >
                    72 hours
                  </option>

                  <option
                    value="168"
                    className="text-slate-900"
                  >
                    7 days
                  </option>

                  <option
                    value="336"
                    className="text-slate-900"
                  >
                    14 days
                  </option>
                </select>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-sm font-extrabold text-slate-950">
                Release message
              </h2>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                This message may be shown to the nominee after approved document release.
              </p>

              <textarea
                rows={6}
                value={releaseMessage}
                onChange={(event) =>
                  setReleaseMessage(
                    event.target.value,
                  )
                }
                maxLength={1000}
                placeholder="Add instructions or a personal message..."
                className="mt-4 w-full resize-none rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />

              <p className="mt-2 text-right text-[10px] font-semibold text-slate-400">
                {releaseMessage.length}
                /1000
              </p>
            </section>
          </aside>
        </section>
      </div>
    </div>
  );
}
import {
  Check,
  FileText,
} from "lucide-react";

import {
  NOMINEE_PERMISSION_TYPES,
} from "../../config/nomineeConfig";

export default function PermissionSelector({
  documents,
  permissions,
  onChange,
}) {
  function hasPermission(
    documentId,
    permission,
  ) {
    return Boolean(
      permissions[
        documentId
      ]?.includes(permission),
    );
  }

  function togglePermission(
    documentId,
    permission,
  ) {
    const currentPermissions =
      permissions[documentId] || [];

    const nextPermissions =
      currentPermissions.includes(
        permission,
      )
        ? currentPermissions.filter(
            (item) =>
              item !== permission,
          )
        : [
            ...currentPermissions,
            permission,
          ];

    onChange({
      ...permissions,
      [documentId]:
        nextPermissions,
    });
  }

  return (
    <div className="space-y-4">
      {documents.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 p-10 text-center">
          <FileText className="mx-auto h-10 w-10 text-slate-300" />

          <p className="mt-4 text-sm font-bold text-slate-700">
            No documents available
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Upload documents before assigning nominee permissions.
          </p>
        </div>
      ) : (
        documents.map(
          (document) => (
            <article
              key={document.id}
              className="rounded-3xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <FileText className="h-5 w-5" />
                </span>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-950">
                    {document.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500">
                    {document.category ||
                      "Document"}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 lg:grid-cols-3">
                {NOMINEE_PERMISSION_TYPES.map(
                  (permission) => {
                    const Icon =
                      permission.icon;

                    const selected =
                      hasPermission(
                        document.id,
                        permission.value,
                      );

                    return (
                      <button
                        key={
                          permission.value
                        }
                        type="button"
                        onClick={() =>
                          togglePermission(
                            document.id,
                            permission.value,
                          )
                        }
                        className={[
                          "relative rounded-2xl border p-4 text-left transition",
                          selected
                            ? "border-blue-300 bg-blue-50"
                            : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50",
                        ].join(" ")}
                      >
                        {selected && (
                          <span className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                            <Check className="h-3 w-3" />
                          </span>
                        )}

                        <Icon
                          className={[
                            "h-5 w-5",
                            selected
                              ? "text-blue-600"
                              : "text-slate-400",
                          ].join(" ")}
                        />

                        <p className="mt-3 text-sm font-bold text-slate-900">
                          {
                            permission.label
                          }
                        </p>

                        <p className="mt-1 text-xs leading-5 text-slate-500">
                          {
                            permission.description
                          }
                        </p>
                      </button>
                    );
                  },
                )}
              </div>
            </article>
          ),
        )
      )}
    </div>
  );
}
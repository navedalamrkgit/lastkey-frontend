import {
  Activity,
  ArrowRight,
  CheckCircle2,
  Fingerprint,
  ShieldCheck,
  Sparkles,
  UserRoundCheck,
  UserRoundPlus,
  UsersRound,
} from "lucide-react";
import {
  useMemo,
  useState,
} from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { nomineeApi } from "../../api/nomineeApi";
import EmptyNomineeState from "../../components/nominees/EmptyNomineeState";
import NomineeCard from "../../components/nominees/NomineeCard";
import NomineeFilters from "../../components/nominees/NomineeFilters";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/ui/Button";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import { getErrorMessage } from "../../utils/errorHandler";
import { ROUTES } from "../../utils/routePaths";

function normalizeNomineeResponse(response) {
  const data = response?.data;

  if (Array.isArray(data)) {
    return data;
  }

  if (Array.isArray(data?.content)) {
    return data.content;
  }

  if (Array.isArray(data?.nominees)) {
    return data.nominees;
  }

  return [];
}

const statStyles = {
  violet: {
    line: "from-violet-500 via-fuchsia-500 to-indigo-500",
    icon:
      "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
    glow: "bg-violet-500/15",
    progress: "from-violet-500 to-fuchsia-500",
  },
  emerald: {
    line: "from-emerald-500 via-teal-500 to-cyan-500",
    icon:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    glow: "bg-emerald-500/15",
    progress: "from-emerald-500 to-cyan-500",
  },
  blue: {
    line: "from-blue-500 via-indigo-500 to-violet-500",
    icon:
      "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    glow: "bg-blue-500/15",
    progress: "from-blue-500 to-indigo-500",
  },
};

function PremiumStatCard({
  title,
  value,
  description,
  icon: Icon,
  accent,
  progress,
}) {
  const styles = statStyles[accent] || statStyles.blue;

  return (
    <article className="group relative overflow-hidden rounded-[26px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-5 shadow-[var(--card-shadow)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--border-accent)] hover:shadow-[var(--card-shadow-hover)]">
      <span
        className={[
          "absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r",
          styles.line,
        ].join(" ")}
      />

      <span
        className={[
          "pointer-events-none absolute -right-16 -top-16",
          "h-36 w-36 rounded-full blur-3xl",
          "transition duration-500 group-hover:scale-125",
          styles.glow,
        ].join(" ")}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span
          className={[
            "flex h-12 w-12 items-center justify-center",
            "rounded-2xl border shadow-sm",
            "transition duration-300",
            "group-hover:scale-105 group-hover:-rotate-3",
            styles.icon,
          ].join(" ")}
        >
          <Icon className="h-5 w-5" />
        </span>

        <span className="rounded-full border border-[var(--border-primary)] bg-[var(--surface-inner)] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-[var(--text-subtle)]">
          Live
        </span>
      </div>

      <div className="relative mt-6">
        <p className="text-3xl font-black tracking-[-0.045em] text-[var(--text-primary)]">
          {value}
        </p>

        <p className="mt-1 text-sm font-bold text-[var(--text-secondary)]">
          {title}
        </p>

        <p className="mt-2 text-xs leading-5 text-[var(--text-muted)]">
          {description}
        </p>
      </div>

      <div className="relative mt-5 h-1.5 overflow-hidden rounded-full bg-[var(--surface-inner)]">
        <div
          className={[
            "h-full rounded-full bg-gradient-to-r",
            "transition-all duration-700",
            styles.progress,
          ].join(" ")}
          style={{
            width: `${Math.min(
              Math.max(progress, 0),
              100,
            )}%`,
          }}
        />
      </div>
    </article>
  );
}

export default function NomineesPage() {
  const queryClient = useQueryClient();

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [
    relationship,
    setRelationship,
  ] = useState("");

  const [
    nomineeToDelete,
    setNomineeToDelete,
  ] = useState(null);

  const nomineesQuery = useQuery({
    queryKey: ["nominees"],

    queryFn: async () => {
      const response =
        await nomineeApi.getNominees();

      return normalizeNomineeResponse(
        response,
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (nomineeId) =>
      nomineeApi.deleteNominee(
        nomineeId,
      ),

    onSuccess: () => {
      toast.success(
        "Nominee removed successfully.",
      );

      setNomineeToDelete(null);

      queryClient.invalidateQueries({
        queryKey: ["nominees"],
      });
    },

    onError: (error) => {
      toast.error(
        getErrorMessage(
          error,
          "Unable to remove the nominee.",
        ),
      );
    },
  });

  const nominees =
    nomineesQuery.data || [];

  const filteredNominees =
    useMemo(() => {
      const normalizedSearch =
        search
          .trim()
          .toLowerCase();

      return nominees.filter(
        (nominee) => {
          const matchesSearch =
            !normalizedSearch ||
            [
              nominee.firstName,
              nominee.lastName,
              nominee.email,
              nominee.phone,
            ]
              .filter(Boolean)
              .some((value) =>
                String(value)
                  .toLowerCase()
                  .includes(
                    normalizedSearch,
                  ),
              );

          const matchesStatus =
            !status ||
            nominee.status === status;

          const matchesRelationship =
            !relationship ||
            nominee.relationship ===
              relationship;

          return (
            matchesSearch &&
            matchesStatus &&
            matchesRelationship
          );
        },
      );
    }, [
      nominees,
      search,
      status,
      relationship,
    ]);

  function clearFilters() {
    setSearch("");
    setStatus("");
    setRelationship("");
  }

  const hasFilters = Boolean(
    search ||
      status ||
      relationship,
  );

  const verifiedCount =
    nominees.filter(
      (nominee) =>
        nominee.status === "VERIFIED",
    ).length;

  const emergencyCount =
    nominees.filter(
      (nominee) =>
        nominee.emergencyAccessEnabled,
    ).length;

  const verificationRate =
    nominees.length > 0
      ? Math.round(
          (verifiedCount /
            nominees.length) *
            100,
        )
      : 0;

  const emergencyRate =
    nominees.length > 0
      ? Math.round(
          (emergencyCount /
            nominees.length) *
            100,
        )
      : 0;

  return (
    <div className="page-enter px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1680px]">
        <section className="relative overflow-hidden rounded-[32px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-6 shadow-[var(--card-shadow)] sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_8%_0%,rgba(139,92,246,0.17),transparent_34%),radial-gradient(circle_at_88%_10%,rgba(59,130,246,0.15),transparent_30%),radial-gradient(circle_at_70%_110%,rgba(6,182,212,0.11),transparent_36%)]" />

          <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-500/15 blur-[90px]" />
          <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-blue-500/15 blur-[90px]" />

          <div className="relative flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-violet-700 dark:text-violet-300">
                <Sparkles className="h-4 w-4" />
                Trusted access network
              </div>

              <h1 className="mt-6 text-3xl font-black tracking-[-0.045em] text-[var(--text-primary)] sm:text-4xl lg:text-5xl">
                Your nominees
              </h1>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                Manage trusted people, verification status and
                document-level permissions from one secure command center.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-secondary)] px-4 py-3 text-xs font-bold text-[var(--text-secondary)]">
                  <UsersRound className="h-4 w-4 text-violet-600 dark:text-violet-300" />
                  {nominees.length} total nominees
                </span>

                <span className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-secondary)] px-4 py-3 text-xs font-bold text-[var(--text-secondary)]">
                  <UserRoundCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                  {verifiedCount} verified
                </span>

                <span className="inline-flex items-center gap-2 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-secondary)] px-4 py-3 text-xs font-bold text-[var(--text-secondary)]">
                  <ShieldCheck className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                  {emergencyCount} emergency-enabled
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row xl:flex-col">
              <Link to={ROUTES.ADD_NOMINEE}>
                <Button
                  size="medium"
                  leftIcon={UserRoundPlus}
                  className="w-full shadow-[0_14px_32px_rgba(124,58,237,0.24)]"
                >
                  Add nominee
                </Button>
              </Link>

              <Link
                to={ROUTES.EMERGENCY}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-secondary)] px-5 py-3 text-sm font-bold text-[var(--text-primary)] transition hover:-translate-y-0.5 hover:border-[var(--border-accent)] hover:bg-[var(--surface-hover)]"
              >
                Review emergency plan
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          <PremiumStatCard
            title="Total nominees"
            value={nominees.length}
            description="People included in your trusted access network."
            icon={UsersRound}
            accent="violet"
            progress={
              nominees.length > 0
                ? 100
                : 0
            }
          />

          <PremiumStatCard
            title="Verified nominees"
            value={verifiedCount}
            description={`${verificationRate}% of your nominees are verified.`}
            icon={UserRoundCheck}
            accent="emerald"
            progress={verificationRate}
          />

          <PremiumStatCard
            title="Emergency-enabled"
            value={emergencyCount}
            description={`${emergencyRate}% can receive emergency access.`}
            icon={ShieldCheck}
            accent="blue"
            progress={emergencyRate}
          />
        </section>

        <section className="mt-6 grid gap-6 2xl:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <div className="rounded-[28px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-4 shadow-[var(--card-shadow)] sm:p-5">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--accent-primary)]">
                    Nominee directory
                  </p>

                  <h2 className="mt-1 text-lg font-black tracking-[-0.02em] text-[var(--text-primary)]">
                    Trusted people
                  </h2>
                </div>

                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border-primary)] bg-[var(--surface-inner)] px-3 py-1.5 text-[11px] font-bold text-[var(--text-muted)]">
                  <Activity className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-300" />
                  Live verification status
                </span>
              </div>

              <NomineeFilters
                search={search}
                status={status}
                relationship={
                  relationship
                }
                onSearchChange={setSearch}
                onStatusChange={setStatus}
                onRelationshipChange={
                  setRelationship
                }
                onClear={clearFilters}
              />
            </div>

            <section className="mt-6">
              {nomineesQuery.isLoading ? (
                <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                  {Array.from({
                    length: 6,
                  }).map((_, index) => (
                    <LoadingSkeleton
                      key={index}
                      className="h-80 rounded-[28px]"
                    />
                  ))}
                </div>
              ) : nomineesQuery.isError ? (
                <div className="rounded-[28px] border border-rose-500/20 bg-rose-500/10 p-8 text-center shadow-[var(--card-shadow)]">
                  <p className="text-sm font-black text-rose-700 dark:text-rose-300">
                    Unable to load nominees
                  </p>

                  <p className="mt-2 text-xs text-rose-700/80 dark:text-rose-300/80">
                    {getErrorMessage(
                      nomineesQuery.error,
                      "Check the nominee backend endpoint.",
                    )}
                  </p>
                </div>
              ) : filteredNominees.length ===
                0 ? (
                <EmptyNomineeState
                  filtered={hasFilters}
                  onClearFilters={
                    clearFilters
                  }
                />
              ) : (
                <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
                  {filteredNominees.map(
                    (nominee) => (
                      <NomineeCard
                        key={nominee.id}
                        nominee={nominee}
                        onDelete={
                          setNomineeToDelete
                        }
                      />
                    ),
                  )}
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <article className="relative overflow-hidden rounded-[28px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-6 shadow-[var(--card-shadow)]">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500" />
              <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-emerald-500/15 blur-3xl" />

              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                  <Fingerprint className="h-6 w-6" />
                </span>

                <h2 className="mt-5 text-xl font-black tracking-[-0.025em] text-[var(--text-primary)]">
                  Verification health
                </h2>

                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                  Verified nominees make your emergency access plan more reliable.
                </p>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="text-4xl font-black tracking-[-0.05em] text-[var(--text-primary)]">
                      {verificationRate}%
                    </p>

                    <p className="mt-1 text-xs font-semibold text-[var(--text-muted)]">
                      verified
                    </p>
                  </div>

                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="h-5 w-5" />
                  </span>
                </div>

                <div className="mt-4 h-2 overflow-hidden rounded-full bg-[var(--surface-inner)]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 transition-all duration-700"
                    style={{
                      width: `${verificationRate}%`,
                    }}
                  />
                </div>
              </div>
            </article>

            <article className="relative overflow-hidden rounded-[28px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-6 shadow-[var(--card-shadow)]">
              <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500" />

              <div className="relative">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
                  Access readiness
                </p>

                <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-[var(--text-primary)]">
                  Emergency access
                </h2>

                <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">
                  Review who can receive access and under which conditions.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="flex items-center justify-between rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-3.5">
                    <span className="text-xs font-semibold text-[var(--text-secondary)]">
                      Trusted nominees
                    </span>

                    <span className="text-sm font-black text-[var(--text-primary)]">
                      {nominees.length}
                    </span>
                  </div>

                  <div className="flex items-center justify-between rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-3.5">
                    <span className="text-xs font-semibold text-[var(--text-secondary)]">
                      Emergency-enabled
                    </span>

                    <span className="text-sm font-black text-[var(--text-primary)]">
                      {emergencyCount}
                    </span>
                  </div>
                </div>

                <Link
                  to={ROUTES.EMERGENCY}
                  className="mt-5 flex items-center justify-between rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-secondary)] px-4 py-3 text-sm font-bold text-[var(--text-primary)] transition hover:border-[var(--border-accent)] hover:bg-[var(--surface-hover)] hover:text-[var(--accent-primary)]"
                >
                  Open emergency plan
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </aside>
        </section>
      </div>

      <ConfirmDialog
        open={Boolean(
          nomineeToDelete,
        )}
        title="Remove this nominee?"
        description={`${nomineeToDelete?.firstName || "This nominee"} will lose all assigned document permissions and emergency-access rights.`}
        confirmText="Remove nominee"
        danger
        loading={
          deleteMutation.isPending
        }
        onCancel={() =>
          setNomineeToDelete(null)
        }
        onConfirm={() =>
          deleteMutation.mutate(
            nomineeToDelete.id,
          )
        }
      />
    </div>
  );
}
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Clock3,
  FileSearch,
  Filter,
  Hourglass,
  Plus,
  RefreshCw,
  Search,
  ShieldAlert,
  ShieldCheck,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { emergencyApi } from "../../api/emergencyApi";
import EmergencyRequestCard from "../../components/emergency/EmergencyRequestCard";
import EmptyEmergencyState from "../../components/emergency/EmptyEmergencyState";
import EmergencyStatusBadge from "../../components/emergency/EmergencyStatusBadge";
import PageHeader from "../../components/layout/PageHeader";
import Button from "../../components/ui/Button";
import LoadingSkeleton from "../../components/ui/LoadingSkeleton";
import {
  EMERGENCY_TYPES,
  getEmergencyTypeLabel,
} from "../../config/emergencyConfig";
import { getErrorMessage } from "../../utils/errorHandler";
import { formatDate } from "../../utils/formatDate";
import { ROUTES } from "../../utils/routePaths";
import { buildRoute } from "../../utils/routeUtils";

function normalizeRequests(response) {
  const data = response?.data;
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.content)) return data.content;
  if (Array.isArray(data?.requests)) return data.requests;
  return [];
}

const STATUS_OPTIONS = [
  { label: "All statuses", value: "" },
  { label: "Verification", value: "PENDING_VERIFICATION" },
  { label: "Under review", value: "UNDER_REVIEW" },
  { label: "Waiting period", value: "WAITING_PERIOD" },
  { label: "Access released", value: "ACCESS_RELEASED" },
  { label: "Rejected", value: "REJECTED" },
];

const CHART_STATUSES = [
  ["Verification", "PENDING_VERIFICATION"],
  ["Review", "UNDER_REVIEW"],
  ["Waiting", "WAITING_PERIOD"],
  ["Released", "ACCESS_RELEASED"],
  ["Closed", "CLOSED"],
];

function MetricCard({ icon: Icon, label, value, detail, tone = "blue" }) {
  const tones = {
    blue: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    amber: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    violet: "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
    emerald:
      "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  };

  return (
    <article className="group relative overflow-hidden rounded-[28px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-5 shadow-[var(--card-shadow)] transition duration-300 hover:-translate-y-1">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-500/10 blur-3xl transition group-hover:scale-125" />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">
            {value}
          </p>
          <p className="mt-2 text-sm font-black text-[var(--text-primary)]">{label}</p>
          <p className="mt-1 text-xs leading-5 text-[var(--text-muted)]">{detail}</p>
        </div>
        <span
          className={["flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border", tones[tone]].join(
            " ",
          )}
        >
          <Icon className="h-5 w-5" />
        </span>
      </div>
    </article>
  );
}

function SelectFilter({ value, onChange, children, ariaLabel }) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      aria-label={ariaLabel}
      className="h-11 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)] px-4 text-sm font-bold text-[var(--text-primary)] outline-none transition focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/10"
    >
      {children}
    </select>
  );
}

export default function EmergencyDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const requestQuery = useQuery({
    queryKey: ["emergency-requests"],
    queryFn: async () => normalizeRequests(await emergencyApi.getEmergencyRequests()),
  });

  const requests = requestQuery.data || [];

  const metrics = useMemo(() => {
    const count = (statuses) => requests.filter((item) => statuses.includes(item.status)).length;
    return {
      total: requests.length,
      pending: count(["DRAFT", "PENDING_VERIFICATION", "UNDER_REVIEW"]),
      waiting: count(["WAITING_PERIOD", "APPROVED"]),
      released: count(["ACCESS_RELEASED"]),
    };
  }, [requests]);

  const filteredRequests = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return requests.filter((request) => {
      const searchableText = [
        request.id,
        request.nomineeName,
        request.nominee?.fullName,
        request.description,
        request.requestedAccessReason,
        getEmergencyTypeLabel(request.emergencyType || request.type),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        (!query || searchableText.includes(query)) &&
        (!statusFilter || request.status === statusFilter) &&
        (!typeFilter || (request.emergencyType || request.type) === typeFilter)
      );
    });
  }, [requests, searchQuery, statusFilter, typeFilter]);

  const chartData = useMemo(
    () =>
      CHART_STATUSES.map(([name, status]) => ({
        name,
        requests:
          status === "CLOSED"
            ? requests.filter((item) => ["REJECTED", "CANCELLED", "EXPIRED"].includes(item.status)).length
            : requests.filter((item) => item.status === status).length,
      })),
    [requests],
  );

  const recentRequests = useMemo(
    () =>
      [...requests]
        .sort(
          (a, b) =>
            new Date(b.updatedAt || b.createdAt || 0).getTime() -
            new Date(a.updatedAt || a.createdAt || 0).getTime(),
        )
        .slice(0, 5),
    [requests],
  );

  const hasFilters = Boolean(searchQuery || statusFilter || typeFilter);
  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("");
    setTypeFilter("");
  };

  return (
    <div className="page-enter px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-[1600px]">
        <PageHeader
          eyebrow="Emergency access"
          title="Emergency control centre"
          description="Monitor every request from nominee verification through controlled document release."
          actions={
            <Link to={ROUTES.CREATE_EMERGENCY}>
              <Button size="medium" leftIcon={Plus}>Create request</Button>
            </Link>
          }
        />

        <section className="relative mt-7 overflow-hidden rounded-[34px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-6 shadow-[var(--card-shadow)] sm:p-8">
          <div className="pointer-events-none absolute -right-32 -top-36 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="relative grid gap-8 xl:grid-cols-[1.35fr_0.65fr] xl:items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] text-amber-700 dark:text-amber-300">
                <ShieldAlert className="h-3.5 w-3.5" /> Controlled release protocol
              </span>
              <h2 className="mt-5 max-w-3xl text-3xl font-black tracking-[-0.045em] text-[var(--text-primary)] sm:text-4xl">
                Every emergency request. One secure operational view.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
                Review verification progress, evidence status, waiting periods and released access without losing audit visibility.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to={ROUTES.CREATE_EMERGENCY}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 px-5 text-sm font-black text-white shadow-[0_16px_40px_rgba(249,115,22,0.28)] transition hover:-translate-y-0.5"
                >
                  <Plus className="h-4 w-4" /> Start emergency request
                </Link>
                <button
                  type="button"
                  onClick={() => setStatusFilter("UNDER_REVIEW")}
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-secondary)] px-5 text-sm font-black text-[var(--text-primary)] transition hover:-translate-y-0.5"
                >
                  Review active cases <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-blue-500/8 to-violet-500/10 p-6">
              <div className="flex items-center justify-between gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-300">Audit protected</span>
              </div>
              <p className="mt-5 text-lg font-black text-[var(--text-primary)]">Emergency readiness</p>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">Identity verification and evidence review remain mandatory before any approved release.</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)] p-3">
                  <p className="text-2xl font-black text-[var(--text-primary)]">{metrics.pending}</p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.1em] text-[var(--text-subtle)]">Need action</p>
                </div>
                <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)] p-3">
                  <p className="text-2xl font-black text-[var(--text-primary)]">{metrics.released}</p>
                  <p className="mt-1 text-[10px] font-black uppercase tracking-[0.1em] text-[var(--text-subtle)]">Released</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={FileSearch} label="Total requests" value={metrics.total} detail="All emergency cases" tone="blue" />
          <MetricCard icon={ShieldAlert} label="Pending verification" value={metrics.pending} detail="Draft, verification or review" tone="amber" />
          <MetricCard icon={Hourglass} label="Waiting period" value={metrics.waiting} detail="Security delay or approved" tone="violet" />
          <MetricCard icon={CheckCircle2} label="Access released" value={metrics.released} detail="Documents available securely" tone="emerald" />
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
          <article className="rounded-[30px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-5 shadow-[var(--card-shadow)] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-[var(--text-primary)]"><BarChart3 className="h-5 w-5" /><h3 className="font-black">Request analytics</h3></div>
                <p className="mt-1 text-xs text-[var(--text-muted)]">Current request distribution by workflow stage.</p>
              </div>
              <span className="rounded-full border border-[var(--border-primary)] bg-[var(--surface-inner)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-[var(--text-subtle)]">Live overview</span>
            </div>
            <div className="mt-6 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ opacity: 0.08 }} contentStyle={{ borderRadius: 16, border: "1px solid rgba(148,163,184,.25)" }} />
                  <Bar dataKey="requests" radius={[10, 10, 4, 4]} fill="currentColor" className="text-blue-500" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="rounded-[30px] border border-[var(--border-primary)] bg-[var(--surface-primary)] p-5 shadow-[var(--card-shadow)] sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2"><Activity className="h-5 w-5 text-violet-500" /><h3 className="font-black text-[var(--text-primary)]">Recent activity</h3></div>
                <p className="mt-1 text-xs text-[var(--text-muted)]">Latest request updates.</p>
              </div>
              <Clock3 className="h-5 w-5 text-[var(--text-subtle)]" />
            </div>
            <div className="mt-5 space-y-3">
              {recentRequests.length === 0 ? (
                <p className="rounded-2xl border border-dashed border-[var(--border-primary)] p-6 text-center text-sm text-[var(--text-muted)]">No recent activity yet.</p>
              ) : recentRequests.map((request) => (
                <Link
                  key={request.id}
                  to={buildRoute(ROUTES.EMERGENCY_DETAILS, { requestId: request.id })}
                  className="group flex items-start gap-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-3.5 transition hover:border-blue-500/25 hover:bg-blue-500/5"
                >
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-blue-500 ring-4 ring-blue-500/10" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-black text-[var(--text-primary)]">{getEmergencyTypeLabel(request.emergencyType || request.type)}</p>
                    <p className="mt-1 truncate text-xs text-[var(--text-muted)]">{request.nomineeName || request.nominee?.fullName || "Nominee not available"}</p>
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.08em] text-[var(--text-subtle)]">{formatDate(request.updatedAt || request.createdAt)}</p>
                  </div>
                  <ArrowRight className="mt-2 h-4 w-4 text-[var(--text-subtle)] transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 rounded-[30px] border border-[var(--border-primary)] bg-[var(--surface-secondary)] p-4 sm:p-5">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300"><Filter className="h-4 w-4" /></span>
              <div><p className="text-sm font-black text-[var(--text-primary)]">Find requests</p><p className="mt-0.5 text-xs text-[var(--text-muted)]">Search and narrow the operational queue.</p></div>
            </div>
            <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
              <label className="relative min-w-[240px] flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-subtle)]" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search nominee, request or reason..."
                  className="h-11 w-full rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)] pl-11 pr-4 text-sm font-medium text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-subtle)] focus:border-blue-500/40 focus:ring-4 focus:ring-blue-500/10"
                />
              </label>
              <SelectFilter value={statusFilter} onChange={setStatusFilter} ariaLabel="Filter by status">
                {STATUS_OPTIONS.map((item) => <option key={item.value || "all"} value={item.value}>{item.label}</option>)}
              </SelectFilter>
              <SelectFilter value={typeFilter} onChange={setTypeFilter} ariaLabel="Filter by emergency type">
                <option value="">All emergency types</option>
                {EMERGENCY_TYPES.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </SelectFilter>
              {hasFilters && (
                <button type="button" onClick={clearFilters} className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-rose-500/20 bg-rose-500/10 px-4 text-xs font-black text-rose-700 dark:text-rose-300"><X className="h-4 w-4" /> Clear</button>
              )}
            </div>
          </div>
        </section>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div><p className="text-sm font-black text-[var(--text-primary)]">{filteredRequests.length} request{filteredRequests.length === 1 ? "" : "s"}</p><p className="mt-1 text-xs text-[var(--text-muted)]">{hasFilters ? "Showing requests matching your filters." : "Showing every emergency request in your account."}</p></div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => requestQuery.refetch()} className="inline-flex items-center gap-2 rounded-full border border-[var(--border-primary)] bg-[var(--surface-primary)] px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-[var(--text-secondary)]"><RefreshCw className="h-3.5 w-3.5" /> Refresh</button>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] text-emerald-700 dark:text-emerald-300"><ShieldCheck className="h-3.5 w-3.5" /> Identity gated</span>
          </div>
        </div>

        <section className="mt-5">
          {requestQuery.isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <LoadingSkeleton key={index} className="h-[430px] rounded-[28px]" />)}</div>
          ) : requestQuery.isError ? (
            <div className="rounded-[28px] border border-rose-500/20 bg-rose-500/10 p-8 text-center">
              <AlertTriangle className="mx-auto h-9 w-9 text-rose-700 dark:text-rose-300" />
              <p className="mt-4 text-sm font-black text-rose-800 dark:text-rose-200">Unable to load emergency requests</p>
              <p className="mx-auto mt-2 max-w-lg text-xs leading-5 text-rose-700 dark:text-rose-300">{getErrorMessage(requestQuery.error, "Check the emergency request endpoint.")}</p>
              <button type="button" onClick={() => requestQuery.refetch()} className="mt-5 inline-flex h-10 items-center justify-center rounded-xl border border-rose-500/20 bg-[var(--surface-primary)] px-4 text-xs font-black text-rose-700">Try again</button>
            </div>
          ) : filteredRequests.length === 0 ? (
            <EmptyEmergencyState filtered={hasFilters} onClearFilter={clearFilters} />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filteredRequests.map((request) => <EmergencyRequestCard key={request.id} request={request} />)}</div>
          )}
        </section>
      </div>
    </div>
  );
}
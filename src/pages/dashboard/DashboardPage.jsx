import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  Clock3,
  CloudUpload,
  FileCheck2,
  FileClock,
  FileText,
  Fingerprint,
  KeyRound,
  LockKeyhole,
  MoreHorizontal,
  Plus,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Upload,
  UserRoundCheck,
  Users,
  Zap,
} from "lucide-react";

import { profileApi } from "../../api/profileApi";
import { useAuth } from "../../hooks/useAuth";
import { ROUTES } from "../../utils/routePaths";

const accentMap = {
  blue: {
    line: "from-blue-500 via-indigo-500 to-violet-500",
    icon: "border-blue-500/20 bg-blue-500/10 text-blue-600 dark:text-blue-300",
    glow: "bg-blue-500/20",
    bar: "from-blue-500 to-indigo-500",
  },
  violet: {
    line: "from-violet-500 via-fuchsia-500 to-indigo-500",
    icon: "border-violet-500/20 bg-violet-500/10 text-violet-600 dark:text-violet-300",
    glow: "bg-violet-500/20",
    bar: "from-violet-500 to-fuchsia-500",
  },
  cyan: {
    line: "from-cyan-500 via-sky-500 to-blue-500",
    icon: "border-cyan-500/20 bg-cyan-500/10 text-cyan-700 dark:text-cyan-300",
    glow: "bg-cyan-500/20",
    bar: "from-cyan-500 to-blue-500",
  },
  emerald: {
    line: "from-emerald-500 via-teal-500 to-cyan-500",
    icon: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    glow: "bg-emerald-500/20",
    bar: "from-emerald-500 to-cyan-500",
  },
  amber: {
    line: "from-amber-500 via-orange-500 to-rose-500",
    icon: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    glow: "bg-amber-500/20",
    bar: "from-amber-500 to-orange-500",
  },
  rose: {
    line: "from-rose-500 via-pink-500 to-orange-500",
    icon: "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
    glow: "bg-rose-500/20",
    bar: "from-rose-500 to-orange-500",
  },
};

const dashboardStats = [
  { id: 1, title: "Protected documents", value: "24", description: "+4 this month", icon: FileText, accent: "violet", progress: 78 },
  { id: 2, title: "Verified nominees", value: "3", description: "All nominees active", icon: UserRoundCheck, accent: "cyan", progress: 100 },
  { id: 3, title: "Security score", value: "92%", description: "+8% from last review", icon: ShieldCheck, accent: "emerald", progress: 92 },
  { id: 4, title: "Pending actions", value: "2", description: "Requires attention", icon: AlertTriangle, accent: "amber", progress: 35 },
];

const quickActions = [
  { id: 1, title: "Upload document", description: "Add a protected file to your encrypted vault.", icon: CloudUpload, route: ROUTES.DOCUMENT_UPLOAD, accent: "blue" },
  { id: 2, title: "Add nominee", description: "Assign a trusted person to your legacy plan.", icon: Users, route: ROUTES.ADD_NOMINEE, accent: "cyan" },
  { id: 3, title: "Emergency access", description: "Review release rules and waiting periods.", icon: KeyRound, route: ROUTES.EMERGENCY, accent: "rose" },
  { id: 4, title: "Security center", description: "Strengthen account and vault protection.", icon: Fingerprint, route: ROUTES.SECURITY_CENTER, accent: "emerald" },
];

const recentDocuments = [
  { id: 1, name: "Life Insurance Policy", category: "Insurance", size: "2.4 MB", updatedAt: "2 hours ago", status: "Verified", icon: FileCheck2, accent: "emerald" },
  { id: 2, name: "Property Ownership Deed", category: "Property", size: "5.8 MB", updatedAt: "Yesterday", status: "Protected", icon: FileText, accent: "violet" },
  { id: 3, name: "Bank Account Summary", category: "Finance", size: "1.1 MB", updatedAt: "3 days ago", status: "Review", icon: FileClock, accent: "amber" },
];

const nominees = [
  { id: 1, name: "Aarav Alam", relation: "Brother", initials: "AA", status: "Verified" },
  { id: 2, name: "Sara Khan", relation: "Sister", initials: "SK", status: "Verified" },
  { id: 3, name: "Imran Alam", relation: "Father", initials: "IA", status: "Pending" },
];

const securityChecklist = [
  { id: 1, title: "Email verified", completed: true },
  { id: 2, title: "Strong password enabled", completed: true },
  { id: 3, title: "Recovery nominee added", completed: true },
  { id: 4, title: "Two-factor authentication", completed: false },
];

const activityData = [42, 64, 50, 78, 62, 90, 74];
const activityLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function PremiumCard({ children, accent, className = "", hover = true }) {
  const style = accentMap[accent] || accentMap.blue;

  return (
    <article className={["dashboard-premium-card group relative overflow-hidden rounded-[28px] border border-[var(--border-primary)] bg-[var(--surface-primary)] shadow-[var(--card-shadow)] transition-all duration-300", hover ? "hover:-translate-y-1 hover:border-[var(--border-accent)] hover:shadow-[var(--card-shadow-hover)]" : "", className].join(" ")}>
      {accent && (
        <>
          <div className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r ${style.line}`} />
          <div className={`pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full blur-3xl ${style.glow}`} />
        </>
      )}
      <div className="relative">{children}</div>
    </article>
  );
}

function StatCard({ title, value, description, icon: Icon, accent, progress }) {
  const style = accentMap[accent];

  return (
    <PremiumCard accent={accent} className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border shadow-[0_8px_20px_rgba(15,23,42,0.08)] ${style.icon}`}>
          <Icon className="h-5 w-5" />
        </span>
        <button type="button" aria-label={`${title} options`} className="flex h-9 w-9 items-center justify-center rounded-xl border border-transparent text-[var(--text-subtle)] transition hover:border-[var(--border-primary)] hover:bg-[var(--surface-hover)] hover:text-[var(--text-primary)]">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <p className="mt-6 text-sm font-semibold text-[var(--text-muted)]">{title}</p>
      <div className="mt-2 flex items-end justify-between gap-4">
        <p className="text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">{value}</p>
        <p className="text-right text-xs font-semibold leading-5 text-[var(--text-subtle)]">{description}</p>
      </div>

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[var(--surface-inner)]">
        <div className={`h-full rounded-full bg-gradient-to-r transition-all duration-700 ${style.bar}`} style={{ width: `${progress}%` }} />
      </div>
    </PremiumCard>
  );
}

function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.22em] text-[var(--accent-primary)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent-primary)]" />
          {eyebrow}
        </p>
        <h2 className="mt-2 text-xl font-black tracking-[-0.025em] text-[var(--text-primary)] sm:text-2xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--text-muted)]">{description}</p>}
      </div>
      {action}
    </div>
  );
}

function StatusBadge({ status }) {
  const classes = {
    Verified: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
    Protected: "border-blue-500/20 bg-blue-500/10 text-blue-700 dark:text-blue-300",
    Review: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
    Pending: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  };

  return <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] ${classes[status] || classes.Protected}`}>{status}</span>;
}

function extractProfilePayload(response) {
  const responseBody = response?.data ?? response;

  return (
    responseBody?.data ??
    responseBody?.result ??
    responseBody?.profile ??
    responseBody
  );
}

function getDisplayName(user) {
  const firstName = user?.firstName?.trim();

  if (firstName) {
    return firstName;
  }

  const fullName =
    user?.fullName?.trim() ||
    user?.name?.trim();

  if (fullName) {
    return fullName.split(/\s+/)[0];
  }

  const email = user?.email?.trim();

  if (email) {
    const emailName = email.split("@")[0];

    return emailName
      .replace(/[._-]+/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());
  }

  return "User";
}

export default function DashboardPage() {
  const { user, updateUser } = useAuth();
  const [dashboardUser, setDashboardUser] = useState(user);

  useEffect(() => {
    setDashboardUser(user);
  }, [user]);

  useEffect(() => {
    let isMounted = true;

    async function loadCurrentUserProfile() {
      try {
        const response = await profileApi.getProfile();
        const currentProfile = extractProfilePayload(response);

        if (!isMounted || !currentProfile) {
          return;
        }

        setDashboardUser(currentProfile);
        updateUser(currentProfile);
      } catch (error) {
        // The dashboard can still use the user saved during login.
        console.error("Unable to load dashboard user profile:", error);
      }
    }

    loadCurrentUserProfile();

    return () => {
      isMounted = false;
    };
  }, [updateUser]);

  const userName = getDisplayName(dashboardUser || user);

  return (
    <main className="dashboard-premium min-h-screen bg-[var(--app-background)] text-[var(--text-primary)]">
      <div className="mx-auto w-full max-w-[1680px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
        <section className="dashboard-hero relative overflow-hidden rounded-[32px] border border-[var(--border-primary)] bg-[var(--surface-primary)] shadow-[var(--card-shadow)]">
          <div className="dashboard-hero-grid relative grid lg:grid-cols-[minmax(0,1fr)_390px]">
            <div className="relative overflow-hidden p-6 sm:p-8 lg:p-10 xl:p-12">
              <div className="dashboard-aurora dashboard-aurora-one" />
              <div className="dashboard-aurora dashboard-aurora-two" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-[11px] font-black uppercase tracking-[0.2em] text-blue-700 dark:text-blue-300">
                  <Sparkles className="h-4 w-4" />
                  Digital legacy command center
                </div>

                <h1 className="mt-6 max-w-4xl text-3xl font-black tracking-[-0.045em] text-[var(--text-primary)] sm:text-4xl lg:text-5xl xl:text-[3.4rem] xl:leading-[1.05]">
                  Welcome back, <span className="bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 bg-clip-text text-transparent">{userName}</span>
                </h1>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--text-secondary)] sm:text-base">
                  Your encrypted vault is protected and your legacy plan is looking strong. Review recent activity and complete the remaining security recommendations.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link to={ROUTES.DOCUMENT_UPLOAD} className="dashboard-primary-button inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-6 py-3 text-sm font-bold text-white">
                    <Upload className="h-5 w-5" />
                    Upload document
                  </Link>
                  <Link to={ROUTES.SECURITY_CENTER} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-[var(--border-secondary)] bg-[var(--surface-secondary)] px-6 py-3 text-sm font-bold text-[var(--text-primary)] shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--border-accent)] hover:bg-[var(--surface-hover)]">
                    <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-300" />
                    Review security
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs font-semibold text-[var(--text-muted)]">
                  <span className="flex items-center gap-2"><LockKeyhole className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />AES-256 encrypted</span>
                  <span className="flex items-center gap-2"><Activity className="h-4 w-4 text-blue-600 dark:text-blue-300" />Live protection</span>
                  <span className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-violet-600 dark:text-violet-300" />24 files secured</span>
                </div>
              </div>
            </div>

            <div className="dashboard-health-panel border-t border-[var(--border-primary)] p-6 sm:p-8 lg:border-l lg:border-t-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--text-subtle)]">Vault health</p>
                  <p className="mt-2 text-3xl font-black tracking-[-0.04em] text-[var(--text-primary)]">Excellent</p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">Protected and ready</p>
                </div>
                <span className="relative flex h-16 w-16 items-center justify-center rounded-[22px] border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 shadow-[0_14px_30px_rgba(16,185,129,0.16)] dark:text-emerald-300">
                  <ShieldCheck className="relative h-8 w-8" />
                </span>
              </div>

              <div className="mt-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-[var(--text-secondary)]">Protection score</span>
                  <span className="font-black text-emerald-700 dark:text-emerald-300">92%</span>
                </div>
                <div className="mt-3 h-2.5 overflow-hidden rounded-full border border-[var(--border-primary)] bg-[var(--surface-inner)] p-[2px]">
                  <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-[0_0_16px_rgba(16,185,129,0.34)]" />
                </div>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                {[{ label: "Files", value: "24" }, { label: "Nominees", value: "3" }, { label: "Alerts", value: "0" }].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)] p-3 text-center">
                    <p className="text-lg font-black text-[var(--text-primary)]">{item.value}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--text-subtle)]">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-300" />
                <p className="text-sm leading-6 text-[var(--text-secondary)]">All critical documents are currently protected.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardStats.map((stat) => <StatCard key={stat.id} {...stat} />)}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.78fr)]">
          <div className="space-y-6">
            <PremiumCard accent="violet" className="p-6 sm:p-7">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div className="flex gap-4">
                  <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border ${accentMap.violet.icon}`}><BrainCircuit className="h-6 w-6" /></span>
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-black tracking-[-0.025em] text-[var(--text-primary)]">LastKey AI insight</h2>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-violet-700 dark:text-violet-300"><Zap className="h-3 w-3" />Smart recommendation</span>
                    </div>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--text-secondary)]">Your digital legacy plan is 86% complete. Enable two-factor authentication and review your pending nominee to improve emergency readiness.</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link to={ROUTES.SECURITY_CENTER} className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(37,99,235,0.2)] transition hover:-translate-y-0.5">Improve security<ArrowRight className="h-4 w-4" /></Link>
                      <Link to={ROUTES.NOMINEES} className="inline-flex items-center gap-2 rounded-xl border border-[var(--border-secondary)] bg-[var(--surface-inner)] px-4 py-2.5 text-sm font-bold text-[var(--text-primary)] transition hover:border-[var(--border-accent)] hover:bg-[var(--surface-hover)]">Review nominees</Link>
                    </div>
                  </div>
                </div>
                <div className="min-w-[170px] rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-secondary)] p-5 text-center shadow-sm">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--text-subtle)]">Plan readiness</p>
                  <p className="mt-2 bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-4xl font-black tracking-[-0.05em] text-transparent">86%</p>
                  <div className="mt-3 flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300"><TrendingUp className="h-4 w-4" />12% improved</div>
                </div>
              </div>
            </PremiumCard>

            <PremiumCard accent="blue" className="p-6 sm:p-7">
              <SectionHeader eyebrow="Vault analytics" title="Protection activity" description="A quick view of activity across your encrypted vault." action={<span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300"><TrendingUp className="h-3.5 w-3.5" />+18.4%</span>} />
              <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,1fr)_190px]">
                <div className="dashboard-chart relative h-52 overflow-hidden rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-5">
                  <div className="flex h-full items-end gap-3 sm:gap-5">
                    {activityData.map((value, index) => (
                      <div key={activityLabels[index]} className="flex h-full flex-1 flex-col items-center justify-end gap-3">
                        <div className="flex h-full w-full items-end justify-center">
                          <div className="dashboard-chart-bar w-full max-w-10 rounded-t-xl bg-gradient-to-t from-blue-600 via-indigo-500 to-violet-400 shadow-[0_0_22px_rgba(79,70,229,0.22)]" style={{ height: `${value}%`, animationDelay: `${index * 70}ms` }} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-subtle)]">{activityLabels[index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {[{ label: "Uploads", value: "12", accent: "blue" }, { label: "Reviews", value: "7", accent: "violet" }, { label: "Security", value: "5", accent: "emerald" }].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-4">
                      <span className={`block h-2 w-2 rounded-full ${item.accent === "blue" ? "bg-blue-500" : item.accent === "violet" ? "bg-violet-500" : "bg-emerald-500"}`} />
                      <p className="mt-3 text-2xl font-black text-[var(--text-primary)]">{item.value}</p>
                      <p className="mt-1 text-xs font-semibold text-[var(--text-muted)]">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </PremiumCard>

            <PremiumCard className="p-6 sm:p-7">
              <SectionHeader eyebrow="Quick access" title="What would you like to do?" description="Manage your vault, nominees, emergency preferences and security." />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {quickActions.map((action) => {
                  const Icon = action.icon;
                  const style = accentMap[action.accent];
                  return (
                    <Link key={action.id} to={action.route} className="group/action relative overflow-hidden rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--border-accent)] hover:bg-[var(--surface-hover)] hover:shadow-lg">
                      <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r ${style.line}`} />
                      <div className="flex items-center gap-4">
                        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border transition duration-300 group-hover/action:scale-105 ${style.icon}`}><Icon className="h-5 w-5" /></span>
                        <span className="min-w-0 flex-1"><span className="block text-sm font-bold text-[var(--text-primary)]">{action.title}</span><span className="mt-1 block text-xs leading-5 text-[var(--text-muted)]">{action.description}</span></span>
                        <ArrowRight className="h-4 w-4 text-[var(--text-subtle)] transition group-hover/action:translate-x-1 group-hover/action:text-[var(--accent-primary)]" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </PremiumCard>

            <PremiumCard className="p-6 sm:p-7">
              <SectionHeader eyebrow="Secure vault" title="Recent documents" description="Latest protected files and verification status." action={<Link to={ROUTES.DOCUMENTS} className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent-primary)] transition hover:opacity-75">View all<ArrowRight className="h-4 w-4" /></Link>} />
              <div className="mt-6 space-y-3">
                {recentDocuments.map((document) => {
                  const Icon = document.icon;
                  return (
                    <Link key={document.id} to={ROUTES.DOCUMENTS} className="group/document flex flex-col gap-4 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-4 transition hover:border-[var(--border-accent)] hover:bg-[var(--surface-hover)] sm:flex-row sm:items-center">
                      <div className="flex min-w-0 flex-1 items-center gap-4">
                        <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border ${accentMap[document.accent].icon}`}><Icon className="h-5 w-5" /></span>
                        <div className="min-w-0"><p className="truncate text-sm font-bold text-[var(--text-primary)]">{document.name}</p><p className="mt-1 text-xs text-[var(--text-muted)]">{document.category} · {document.size} · {document.updatedAt}</p></div>
                      </div>
                      <StatusBadge status={document.status} />
                    </Link>
                  );
                })}
              </div>
            </PremiumCard>
          </div>

          <aside className="space-y-6">
            <PremiumCard accent="emerald" className="p-6">
              <SectionHeader eyebrow="Account protection" title="Security checklist" description="Complete the remaining steps to strengthen your account." />
              <div className="mt-6 space-y-3">
                {securityChecklist.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-3.5">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${item.completed ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300" : "bg-amber-500/15 text-amber-700 dark:text-amber-300"}`}>{item.completed ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}</span>
                    <span className="flex-1 text-sm font-semibold text-[var(--text-secondary)]">{item.title}</span>
                    <span className={`text-xs font-bold ${item.completed ? "text-emerald-700 dark:text-emerald-300" : "text-amber-700 dark:text-amber-300"}`}>{item.completed ? "Done" : "Pending"}</span>
                  </div>
                ))}
              </div>
              <Link to={ROUTES.SECURITY_CENTER} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(5,150,105,0.22)] transition hover:-translate-y-0.5">Open security center<ArrowRight className="h-4 w-4" /></Link>
            </PremiumCard>

            <PremiumCard accent="cyan" className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div><p className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-700 dark:text-cyan-300">Trusted people</p><h2 className="mt-2 text-xl font-black text-[var(--text-primary)]">Nominee overview</h2></div>
                <Link to={ROUTES.ADD_NOMINEE} aria-label="Add nominee" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-secondary)] bg-[var(--surface-inner)] text-[var(--text-secondary)] transition hover:border-[var(--border-accent)] hover:bg-[var(--surface-hover)]"><Plus className="h-5 w-5" /></Link>
              </div>
              <div className="mt-6 space-y-3">
                {nominees.map((nominee) => (
                  <Link key={nominee.id} to={ROUTES.NOMINEES} className="flex items-center gap-3 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-inner)] p-3.5 transition hover:border-[var(--border-accent)] hover:bg-[var(--surface-hover)]">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/15 to-violet-500/15 text-sm font-black text-blue-700 dark:text-blue-300">{nominee.initials}</span>
                    <span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-[var(--text-primary)]">{nominee.name}</span><span className="text-xs text-[var(--text-muted)]">{nominee.relation}</span></span>
                    <StatusBadge status={nominee.status} />
                  </Link>
                ))}
              </div>
            </PremiumCard>

            <PremiumCard accent="rose" className="p-6">
              <div className="flex items-start justify-between gap-4">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${accentMap.rose.icon}`}><AlertTriangle className="h-5 w-5" /></span>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700 dark:text-emerald-300">No active request</span>
              </div>
              <h2 className="mt-5 text-xl font-black text-[var(--text-primary)]">Emergency access</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--text-muted)]">Your emergency release plan is active and protected.</p>
              <Link to={ROUTES.EMERGENCY} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-rose-600 to-pink-600 px-4 py-3 text-sm font-bold text-white shadow-[0_12px_28px_rgba(225,29,72,0.2)] transition hover:-translate-y-0.5">Review emergency plan<ArrowRight className="h-4 w-4" /></Link>
            </PremiumCard>
          </aside>
        </section>

        <section className="mt-6 flex flex-col gap-4 rounded-2xl border border-[var(--border-primary)] bg-[var(--surface-primary)] px-5 py-4 shadow-[var(--card-shadow)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3"><span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400" /></span><p className="text-sm font-semibold text-[var(--text-secondary)]">All LastKey systems are operational</p></div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--text-muted)]"><ShieldCheck className="h-4 w-4 text-emerald-500" />End-to-end protected</div>
        </section>
      </div>
    </main>
  );
}
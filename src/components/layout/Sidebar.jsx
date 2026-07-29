import {
  Bell,
  ChevronRight,
  FileText,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";
import {
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";

import { ROUTES } from "../../utils/routePaths";
import { tokenService } from "../../services/tokenService";

const workspaceItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    to: ROUTES.DASHBOARD,
    exact: true,
  },
  {
    id: "documents",
    label: "Documents",
    icon: FileText,
    to: ROUTES.DOCUMENTS,
  },
  {
    id: "nominees",
    label: "Nominees",
    icon: UsersRound,
    to: ROUTES.NOMINEES,
  },
  {
    id: "emergency",
    label: "Emergency Access",
    icon: ShieldAlert,
    to: ROUTES.EMERGENCY,
  },
];

const accountItems = [
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    to: ROUTES.NOTIFICATIONS,
  },
  {
    id: "security",
    label: "Security Center",
    icon: ShieldCheck,
    to: ROUTES.SECURITY_CENTER,
  },
  {
    id: "profile",
    label: "Profile",
    icon: UserRound,
    to: ROUTES.PROFILE ?? "/profile",
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    to: ROUTES.SETTINGS ?? "/settings",
  },
];

function normalizePath(path) {
  if (!path || path === "/") {
    return "/";
  }

  return path.replace(/\/+$/, "");
}

function isRouteActive(
  pathname,
  routePath,
  exact = false,
) {
  const currentPath =
    normalizePath(pathname);

  const targetPath =
    normalizePath(routePath);

  if (exact) {
    return currentPath === targetPath;
  }

  return (
    currentPath === targetPath ||
    currentPath.startsWith(
      `${targetPath}/`,
    )
  );
}

function SidebarLink({
  item,
  pathname,
  onNavigate,
}) {
  const Icon = item.icon;

  const active = isRouteActive(
    pathname,
    item.to,
    item.exact,
  );

  return (
    <NavLink
      to={item.to}
      end={item.exact}
      onClick={onNavigate}
      aria-current={
        active ? "page" : undefined
      }
      className={[
        "sidebar-link group",
        "relative flex min-h-[60px] w-full items-center gap-4 overflow-hidden rounded-2xl",
        "px-3.5 py-3 no-underline transition-all duration-300",
        active
          ? "sidebar-link-active"
          : "",
      ].join(" ")}
    >
      {active && (
        <>
          <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/[0.08] to-transparent" />

          <span className="pointer-events-none absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-white shadow-[0_0_18px_rgba(255,255,255,0.7)]" />
        </>
      )}

      <span
        className={[
          "sidebar-link-icon relative z-10",
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
          active
            ? "sidebar-link-icon-active"
            : "",
        ].join(" ")}
      >
        <Icon
          className="h-[21px] w-[21px]"
          strokeWidth={1.9}
        />
      </span>

      <span className="relative z-10 min-w-0 flex-1 truncate text-[15px] font-semibold">
        {item.label}
      </span>

      <ChevronRight
        className={[
          "sidebar-chevron relative z-10 h-5 w-5 shrink-0",
          active
            ? "sidebar-chevron-active"
            : "",
        ].join(" ")}
      />
    </NavLink>
  );
}

function SidebarSection({
  title,
  items,
  pathname,
  onNavigate,
}) {
  return (
    <nav aria-label={title}>
      <p className="sidebar-section-label mb-4 px-3 text-xs font-black uppercase tracking-[0.22em]">
        {title}
      </p>

      <div className="space-y-2">
        {items.map((item) => (
          <SidebarLink
            key={item.id}
            item={item}
            pathname={pathname}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </nav>
  );
}

function Sidebar({
  isOpen = false,
  onClose = () => {},
  onLogout,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const homeRoute =
    ROUTES.HOME ??
    ROUTES.LANDING ??
    "/";

  function handleNavigation() {
    if (window.innerWidth < 1024) {
      onClose();
    }
  }

  async function handleLogout() {
    if (
      typeof onLogout === "function"
    ) {
      await onLogout();
      return;
    }

    tokenService.clearSession();

    navigate(
      ROUTES.LOGIN ?? "/login",
      {
        replace: true,
      },
    );
  }

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/65 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={[
          "premium-sidebar relative overflow-hidden",
          "fixed inset-y-0 left-0 z-50",
          "flex h-screen w-[280px] flex-col",
          "transition-transform duration-300 ease-in-out",
          "lg:sticky lg:top-0 lg:z-30 lg:translate-x-0",
          isOpen
            ? "translate-x-0"
            : "-translate-x-full",
        ].join(" ")}
      >
        <div className="pointer-events-none absolute -left-24 top-16 h-56 w-56 rounded-full bg-blue-500/10 blur-[90px]" />

        <div className="pointer-events-none absolute -right-28 bottom-24 h-64 w-64 rounded-full bg-violet-500/10 blur-[100px]" />

        <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-blue-500/25 to-transparent" />

        <div className="sidebar-brand relative flex min-h-[132px] items-center px-5">
          <NavLink
            to={homeRoute}
            onClick={handleNavigation}
            aria-label="Open LastKey home page"
            className="group flex min-w-0 flex-1 items-center gap-4 rounded-2xl no-underline"
          >
            <div className="sidebar-logo relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[22px] transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
              <ShieldCheck
                className="h-8 w-8"
                strokeWidth={2}
              />

              <span className="sidebar-logo-badge absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full">
                <ShieldCheck
                  className="h-4 w-4"
                  strokeWidth={2.2}
                />
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <p className="sidebar-heading truncate text-2xl font-black tracking-tight">
                Last
                <span className="theme-accent-text">
                  Key
                </span>
              </p>

              <p className="sidebar-muted mt-1 truncate text-sm font-medium">
                Your digital legacy, protected.
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="sidebar-close-button ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="relative flex-1 overflow-y-auto px-4 py-6">
          <SidebarSection
            title="Workspace"
            items={workspaceItems}
            pathname={location.pathname}
            onNavigate={handleNavigation}
          />

          <div className="sidebar-divider my-6 h-px" />

          <SidebarSection
            title="Account"
            items={accountItems}
            pathname={location.pathname}
            onNavigate={handleNavigation}
          />
        </div>

        <div className="sidebar-footer relative p-4">
          <div className="sidebar-security-card relative overflow-hidden rounded-2xl p-4 shadow-sm">
            <div className="pointer-events-none absolute -right-8 -top-8 h-20 w-20 rounded-full bg-emerald-500/10 blur-2xl" />

            <div className="relative flex items-start gap-3">
              <span className="sidebar-security-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                <ShieldCheck className="h-5 w-5" />
              </span>

              <div className="min-w-0">
                <p className="sidebar-security-title text-sm font-bold">
                  Vault protected
                </p>

                <p className="sidebar-muted mt-1 text-xs leading-5">
                  Your current session is secure.
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="sidebar-logout mt-3 flex min-h-12 w-full items-center gap-3 rounded-2xl border border-transparent px-4 text-left transition-all duration-300 hover:border-rose-500/15"
          >
            <LogOut className="h-5 w-5 shrink-0" />

            <span className="flex-1 text-sm font-bold">
              Sign out
            </span>
          </button>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
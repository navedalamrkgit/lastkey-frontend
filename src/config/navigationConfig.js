import {
  Bell,
  FileText,
  Gauge,
  LayoutDashboard,
  ShieldAlert,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";

import { ROUTES } from "../utils/routePaths";

export const primaryNavigation = [
  {
    label: "Dashboard",
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
  },
  {
    label: "Documents",
    path: ROUTES.DOCUMENTS,
    icon: FileText,
  },
  {
    label: "Nominees",
    path: ROUTES.NOMINEES,
    icon: UsersRound,
  },
  {
    label: "Emergency Access",
    path: ROUTES.EMERGENCY,
    icon: ShieldAlert,
  },
  {
    label: "Notifications",
    path: ROUTES.NOTIFICATIONS,
    icon: Bell,
  },
];

export const secondaryNavigation = [
  {
    label: "Security Center",
    path: ROUTES.SECURITY_CENTER,
    icon: ShieldCheck,
  },
  {
    label: "Profile",
    path: ROUTES.PROFILE,
    icon: UserRound,
  },
];

export const adminNavigation = [
  {
    label: "Admin Dashboard",
    path: ROUTES.ADMIN_DASHBOARD,
    icon: Gauge,
  },
];
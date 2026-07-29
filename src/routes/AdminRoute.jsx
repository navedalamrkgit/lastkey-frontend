import {
  Navigate,
  Outlet,
} from "react-router-dom";

import FullPageLoader from "../components/ui/FullPageLoader";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../utils/routePaths";

export default function AdminRoute() {
  const {
    user,
    isAuthenticated,
    isInitializing,
  } = useAuth();

  if (isInitializing) {
    return (
      <FullPageLoader message="Checking administrator access..." />
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
      />
    );
  }

  const normalizedRole = String(
    user?.role || "",
  ).toUpperCase();

  if (normalizedRole !== "ADMIN") {
    return (
      <Navigate
        to={ROUTES.FORBIDDEN}
        replace
      />
    );
  }

  return <Outlet />;
}
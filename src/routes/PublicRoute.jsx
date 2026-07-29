import {
  Navigate,
  Outlet,
} from "react-router-dom";

import FullPageLoader from "../components/ui/FullPageLoader";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../utils/routePaths";

export default function PublicRoute() {
  const {
    isAuthenticated,
    isInitializing,
  } = useAuth();

  if (isInitializing) {
    return (
      <FullPageLoader message="Checking your account..." />
    );
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.DASHBOARD}
        replace
      />
    );
  }

  return <Outlet />;
}
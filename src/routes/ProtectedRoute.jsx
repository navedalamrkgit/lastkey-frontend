import {
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

import FullPageLoader from "../components/ui/FullPageLoader";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../utils/routePaths";

export default function ProtectedRoute() {
  const {
    isAuthenticated,
    isInitializing,
  } = useAuth();

  const location = useLocation();

  if (isInitializing) {
    return (
      <FullPageLoader message="Verifying your secure session..." />
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to={ROUTES.LOGIN}
        replace
        state={{
          from: location.pathname + location.search,
        }}
      />
    );
  }

  return <Outlet />;
}
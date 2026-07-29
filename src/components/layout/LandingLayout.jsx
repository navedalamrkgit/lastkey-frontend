import {
  useEffect,
} from "react";
import {
  Outlet,
  useLocation,
} from "react-router-dom";

import LandingFooter from "../landing/LandingFooter";
import LandingNavbar from "../landing/LandingNavbar";

export default function LandingLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [location.pathname]);

  return (
    <div className="landing-shell min-h-screen overflow-x-hidden">
      <LandingNavbar />

      <main>
        <Outlet />
      </main>

      <LandingFooter />
    </div>
  );
}
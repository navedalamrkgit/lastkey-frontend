import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";

import MobileSidebar from "./MobileSidebar";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
  const [
    mobileSidebarOpen,
    setMobileSidebarOpen,
  ] = useState(false);

  const closeMobileSidebar =
    useCallback(() => {
      setMobileSidebarOpen(false);
    }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Desktop Sidebar */}
      <div className="fixed inset-y-0 left-0 z-40 hidden w-[280px] lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      <MobileSidebar
        open={mobileSidebarOpen}
        onClose={closeMobileSidebar}
      />

      {/* Main Layout */}
      <div className="flex min-h-screen flex-col lg:ml-[280px]">
        {/* Topbar */}
        <Topbar
          onOpenSidebar={() =>
            setMobileSidebarOpen(true)
          }
        />

        {/* Content */}
        <main className="flex-1">
          <div className="mx-auto w-full max-w-[1700px] px-4 py-5 sm:px-6 lg:px-8 xl:px-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
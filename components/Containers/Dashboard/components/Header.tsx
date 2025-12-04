"use client";

import { Bell, User, Menu, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";

import { useDashboard } from "../context/DashboardContext";
import type { AppDispatch } from "@/store/store";
import { loginReset, fetchLoginUserReset } from "@/store/authSlice";

const sectionTitles: Record<string, string> = {
  overview: "Dashboard",
  "inventory-transfer": "Inventory Transfer",
  orders: "Order Management",
  notifications: "Notifications",
  reports: "Reports",
  incidents: "Incidents",
  "live-pouch-status": "Live Pouch Status",
  "pouch-history": "Pouch History",
};
export function DashboardHeader() {
  const { sidebarOpen, setSidebarOpen, activeSection } = useDashboard();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [, , removeCookie] = useCookies(["auth"]);

  const currentTitle = sectionTitles[activeSection] || "Dashboard";

  const handleLogout = () => {
    // Clear auth cookie using react-cookie
    removeCookie("auth", { path: "/" });

    // Reset auth state in Redux (matching svastha pattern)
    dispatch(loginReset());
    dispatch(fetchLoginUserReset());

    // Redirect to login page
    router.push("/login");
  };

  return (
    <header className="px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden"
          aria-label={sidebarOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setSidebarOpen((open) => !open)}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            {currentTitle}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Welcome back
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-4">
        <div className="relative">
          <button className="p-2 text-gray-400 hover:text-gray-600 relative">
            <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
              3
            </span>
          </button>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
              User
            </p>
            <p className="text-xs text-gray-500 capitalize">
              Role
            </p>
          </div>

          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-blue-600" />
          </div>

          <button
            type="button"
            className="p-2 text-gray-400 hover:text-gray-600"
            title="Logout"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}



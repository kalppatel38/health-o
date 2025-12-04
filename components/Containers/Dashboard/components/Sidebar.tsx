"use client";

import {
  Activity,
  AlertTriangle,
  Bell,
  Calendar,
  ClipboardList,
  FileText,
  Package,
  Search,
} from "lucide-react";
import {
  useDashboard,
  DashboardSectionId,
} from "../context/DashboardContext";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems: { id: DashboardSectionId; label: string; icon: any }[] = [
  {
    id: "overview",
    label: "Dashboard",
    icon: Package,
  },
  {
    id: "inventory-transfer",
    label: "Inventory Transfer",
    icon: FileText,
  },
  {
    id: "orders",
    label: "Order Management",
    icon: ClipboardList,
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
  },
  {
    id: "reports",
    label: "Reports",
    icon: Search,
  },
  {
    id: "incidents",
    label: "Incidents",
    icon: AlertTriangle,
  },
  {
    id: "live-pouch-status",
    label: "Live Pouch Status",
    icon: Activity,
  },
  {
    id: "pouch-history",
    label: "Pouch History",
    icon: Calendar,
  },
];

export function DashboardSidebar() {
  const { activeSection, setActiveSection, sidebarOpen, setSidebarOpen } =
    useDashboard();

  return (
    <>
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-gray-200 bg-white transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 md:z-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-gray-900 truncate">
                HealthO EMS
              </h1>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Logistics Portal
              </p>
            </div>
          </div>
        </div>

        <nav className="p-4 overflow-y-auto">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;

              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection(item.id);
                      // Close the sidebar on small screens after navigation
                      if (typeof window !== "undefined" && window.innerWidth < 768) {
                        setSidebarOpen(false);
                      }
                    }}
                    className={cn(
                      buttonVariants({
                        variant: "ghost",
                        size: "lg",
                        className:
                          "w-full justify-start space-x-3 rounded-xl text-left transition-all",
                      }),
                      isActive
                        ? "bg-blue-50 text-blue-700 border border-blue-200"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    <span className="font-medium truncate">{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen ? (
        <button
          type="button"
          aria-label="Close navigation menu"
          className="fixed inset-0 z-30 bg-black/30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}
    </>
  );
}



"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type DashboardSectionId =
  | "overview"
  | "inventory-transfer"
  | "orders"
  | "notifications"
  | "reports"
  | "incidents"
  | "live-pouch-status"
  | "pouch-history";

type DashboardContextValue = {
  activeSection: DashboardSectionId;
  setActiveSection: Dispatch<SetStateAction<DashboardSectionId>>;
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
};

const DashboardContext = createContext<DashboardContextValue | undefined>(
  undefined
);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [activeSection, setActiveSection] =
    useState<DashboardSectionId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <DashboardContext.Provider
      value={{ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return ctx;
}



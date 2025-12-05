"use client";

import { ReactNode } from "react";

import DashboardSidebar from "@/components/Containers/Dashboard/components/Sidebar";
import DashboardHeader from "@/components/Containers/Dashboard/components/Header";
import { DashboardProvider } from "@/components/Containers/Dashboard/context/DashboardContext";

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </DashboardProvider>
  );
};
export default DashboardLayout;


"use client";

import { useMemo } from "react";
import { useDashboard } from "./context/DashboardContext";
import { DashboardScene } from "./DashboardScene";
import { InventoryTransferContainer } from "./components/InventoryTransfer/InventoryTransferContainer";
import { OrderManagementContainer } from "./components/OrderManagement/OrderManagementContainer";
import { OverviewContainer } from "./components/Overview/OverviewContainer";
import { NotificationsCenterContainer } from "./components/NotificationsCenter/NotificationsCenterContainer";
import { ReportsContainer } from "./components/Reports/ReportsContainer";
import { IncidentsContainer } from "./components/Incidents/IncidentsContainer";
import { LivePouchStatusContainer } from "./components/LivePouchStatus/LivePouchStatusContainer";
import { PouchHistoryContainer } from "./components/PouchHistory/PouchHistoryContainer";
import type { DashboardSectionId } from "./context/DashboardContext";

const DashboardContainer = () => {
  const { activeSection } = useDashboard();

  const renderContent = useMemo(() => {
    const contentMap: Record<DashboardSectionId, React.ReactNode> = {
      overview: <OverviewContainer />,
      "inventory-transfer": <InventoryTransferContainer />,
      orders: <OrderManagementContainer />,
      notifications: <NotificationsCenterContainer />,
      reports: <ReportsContainer />,
      incidents: <IncidentsContainer />,
      "live-pouch-status": <LivePouchStatusContainer />,
      "pouch-history": <PouchHistoryContainer />,
    };

    return contentMap[activeSection] || <div>Welcome to the dashboard overview.</div>;
  }, [activeSection]);

  return <DashboardScene>{renderContent}</DashboardScene>;
};

export { DashboardContainer };

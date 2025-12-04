"use client";

import {
  activityItems,
  depotSections,
  headquartersInventoryItems,
  lowStockItems,
} from "../../data/dashboard-overview";
import { OverviewScene } from "./OverviewScene";

export function OverviewContainer() {
  return (
    <OverviewScene
      activityItems={activityItems}
      depotSections={depotSections}
      headquartersInventoryItems={headquartersInventoryItems}
      lowStockItems={lowStockItems}
    />
  );
}


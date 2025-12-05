"use client";

import {
  activityItems,
  depotSections,
  headquartersInventoryItems,
  lowStockItems,
} from "../../data/dashboard-overview";
import OverviewScene from "./OverviewScene";

const OverviewContainer = () => {
  return (
    <OverviewScene
      activityItems={activityItems}
      depotSections={depotSections}
      headquartersInventoryItems={headquartersInventoryItems}
      lowStockItems={lowStockItems}
    />
  );
};

export default OverviewContainer;


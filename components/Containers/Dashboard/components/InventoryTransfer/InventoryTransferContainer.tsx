"use client";

import {
  LOCATIONS,
  RECENT_TRANSFERS,
  TRANSFER_STATUS_CONFIG,
} from "../../data/inventory-transfer";
import { InventoryTransferScene } from "./InventoryTransferScene";

export function InventoryTransferContainer() {
  return (
    <InventoryTransferScene
      locations={LOCATIONS}
      recentTransfers={RECENT_TRANSFERS}
      transferStatusConfig={TRANSFER_STATUS_CONFIG}
    />
  );
}


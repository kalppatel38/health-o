"use client";

import { useState } from "react";
import {
  EXPIRY_SUMMARY_ROWS,
  ORDER_HISTORY_ROWS,
  ORDER_QUANTITIES,
  ORDER_STATUS_CONFIG,
  STATUS_FLOW_STEPS,
  THRESHOLD_SUMMARY_ROWS,
  type OrderVersion,
} from "../../data/order-management";
import { OrderManagementScene } from "./OrderManagementScene";

const OrderManagementContainer = () => {
  const [showNewOrder, setShowNewOrder] = useState(false);
  const [orderVersion, setOrderVersion] = useState<OrderVersion>("expiry");

  return (
    <OrderManagementScene
      showNewOrder={showNewOrder}
      orderVersion={orderVersion}
      setShowNewOrder={setShowNewOrder}
      setOrderVersion={setOrderVersion}
      expirySummaryRows={EXPIRY_SUMMARY_ROWS}
      thresholdSummaryRows={THRESHOLD_SUMMARY_ROWS}
      orderHistoryRows={ORDER_HISTORY_ROWS}
      orderQuantities={ORDER_QUANTITIES}
      orderStatusConfig={ORDER_STATUS_CONFIG}
      statusFlowSteps={STATUS_FLOW_STEPS}
    />
  );
};

export { OrderManagementContainer };


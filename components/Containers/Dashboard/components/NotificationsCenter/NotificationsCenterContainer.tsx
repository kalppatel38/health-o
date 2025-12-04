"use client";

import { useState } from "react";
import {
  NOTIFICATION_FILTERS,
  NOTIFICATION_ITEMS,
  NOTIFICATION_QUICK_LINKS,
  NOTIFICATION_SUMMARY,
  type NotificationFilterKey,
} from "../../data/notifications";
import { NotificationsCenterScene } from "./NotificationsCenterScene";

export function NotificationsCenterContainer() {
  const [activeFilter] = useState<NotificationFilterKey>("all");

  return (
    <NotificationsCenterScene
      activeFilter={activeFilter}
      notificationFilters={NOTIFICATION_FILTERS}
      notificationItems={NOTIFICATION_ITEMS}
      notificationQuickLinks={NOTIFICATION_QUICK_LINKS}
      notificationSummary={NOTIFICATION_SUMMARY}
    />
  );
}


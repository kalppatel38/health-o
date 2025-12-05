"use client";

import { useState } from "react";
import {
  POUCH_REPORTS,
} from "../../data/pouch-history";
import { PouchHistoryScene } from "./PouchHistoryScene";

const PouchHistoryContainer = () => {
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);

  return (
    <PouchHistoryScene
      selectedReportId={selectedReportId}
      setSelectedReportId={setSelectedReportId}
      pouchReports={POUCH_REPORTS}
    />
  );
};

export { PouchHistoryContainer };


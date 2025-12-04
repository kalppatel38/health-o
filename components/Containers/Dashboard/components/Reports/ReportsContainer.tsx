"use client";

import { useState } from "react";
import {
  REPORT_HISTORY,
  REPORT_STATS,
  QUICK_REPORT_TEMPLATES,
  type ReportType,
} from "../../data/reports";
import { ReportsScene } from "./ReportsScene";

export function ReportsContainer() {
  const [activeTab, setActiveTab] = useState<ReportType>("medication");
  const [paramedicFilter, setParamedicFilter] = useState<
    "all" | "incident" | "usage"
  >("all");
  const [reportType, setReportType] = useState("administration");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <ReportsScene
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      reportHistory={REPORT_HISTORY}
      reportStats={REPORT_STATS}
      quickReportTemplates={QUICK_REPORT_TEMPLATES}
      paramedicFilter={paramedicFilter}
      setParamedicFilter={setParamedicFilter}
      reportType={reportType}
      setReportType={setReportType}
      startDate={startDate}
      setStartDate={setStartDate}
      endDate={endDate}
      setEndDate={setEndDate}
    />
  );
}


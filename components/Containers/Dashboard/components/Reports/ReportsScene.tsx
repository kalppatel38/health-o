"use client";

import {
  FileText,
  Package,
  Filter,
  Download,
  Calendar,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ReportType } from "../../data/reports";

interface ReportsSceneProps {
  activeTab: ReportType;
  setActiveTab: (tab: ReportType) => void;
  reportHistory: Array<any>;
  reportStats: Record<ReportType, any> & {
    thisMonth?: number;
    paramedicIncident?: number;
    paramedicUsage?: number;
  };
  quickReportTemplates: Array<any>;
  paramedicFilter: "all" | "incident" | "usage";
  setParamedicFilter: (filter: "all" | "incident" | "usage") => void;
  reportType: string;
  setReportType: (type: string) => void;
  startDate: string;
  setStartDate: (date: string) => void;
  endDate: string;
  setEndDate: (date: string) => void;
}

export function ReportsScene(props: ReportsSceneProps) {
  const {
    activeTab,
    setActiveTab,
    reportHistory,
    reportStats,
    quickReportTemplates,
    paramedicFilter,
    setParamedicFilter,
    reportType,
    setReportType,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = props;

  const handleGenerateReport = () => {
    // TODO: Implement report generation logic
    console.log("Generate report clicked");
  };

  const handleSubmitReport = () => {
    // TODO: Implement report generation logic
    console.log("Generating report:", {
      reportType,
      startDate,
      endDate,
    });
    // Reset form
    setReportType("administration");
    setStartDate("");
    setEndDate("");
  };

  const handleCancelReport = () => {
    // Reset form
    setReportType("administration");
    setStartDate("");
    setEndDate("");
  };

  const handleDownloadReport = (reportId: string) => {
    // TODO: Implement download logic
    console.log("Download report:", reportId);
  };

  const handleViewReport = (reportId: string) => {
    // TODO: Implement view logic
    console.log("View report:", reportId);
  };

  const handleGenerateTemplate = (templateId: string) => {
    // TODO: Implement template generation logic
    console.log("Generate template:", templateId);
  };

  return (
    <div className="space-y-6">
      {/* Header + Generate Report Button */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">
                Reports Module
              </CardTitle>
              <CardDescription className="text-gray-600">
                Generate and download medication and inventory reports
              </CardDescription>
            </div>
            <Button
              type="button"
              className="flex items-center space-x-2"
              onClick={handleGenerateReport}
            >
              <Filter className="w-4 h-4" />
              <span>Generate Report</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Report Type Tabs */}
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1 flex-wrap">
            <Button
              type="button"
              onClick={() => {
                setActiveTab("medication");
                setParamedicFilter("all");
              }}
              variant={activeTab === "medication" ? "default" : "ghost"}
              className={`flex items-center space-x-2 ${
                activeTab === "medication"
                  ? "bg-white text-blue-600 shadow-sm"
                  : ""
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Medication Reports</span>
            </Button>
            <Button
              type="button"
              onClick={() => {
                setActiveTab("inventory");
                setParamedicFilter("all");
              }}
              variant={activeTab === "inventory" ? "default" : "ghost"}
              className={`flex items-center space-x-2 ${
                activeTab === "inventory"
                  ? "bg-white text-blue-600 shadow-sm"
                  : ""
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Inventory Reports</span>
            </Button>
            <Button
              type="button"
              onClick={() => {
                setActiveTab("paramedic");
                setParamedicFilter("all");
              }}
              variant={activeTab === "paramedic" ? "default" : "ghost"}
              className={`flex items-center space-x-2 ${
                activeTab === "paramedic"
                  ? "bg-white text-blue-600 shadow-sm"
                  : ""
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Paramedic Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generate New Report Form */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="p-6 border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Generate New Report
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          <div>
            <Label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </Label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="administration">Inventory Report</option>
              <option value="usage">Controlled Substances Usage Report</option>
              <option value="incident">Controlled Substances Incident Report</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              type="button"
              className="flex items-center space-x-2 bg-green-600 hover:bg-green-700"
              onClick={handleSubmitReport}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Generate Report</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={handleCancelReport}
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-50 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Medication Reports</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reportStats.medication}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-50 rounded-lg">
                <Package className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Inventory Reports</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reportStats.inventory}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-50 rounded-lg">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Paramedic Reports</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reportStats.paramedic}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* This Month Card - Only show for medication and inventory */}
      {activeTab !== "paramedic" && (
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {reportStats.thisMonth}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Paramedic Filter Section - Only show for paramedic tab */}
      {activeTab === "paramedic" && (
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <CardHeader className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">
                Filter by type:
              </span>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant={paramedicFilter === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setParamedicFilter("all")}
                  className={paramedicFilter === "all" ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : ""}
                >
                  All Reports
                </Button>
                <Button
                  type="button"
                  variant={paramedicFilter === "incident" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setParamedicFilter("incident")}
                  className={paramedicFilter === "incident" ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : ""}
                >
                  Incident Reports
                </Button>
                <Button
                  type="button"
                  variant={paramedicFilter === "usage" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setParamedicFilter("usage")}
                  className={paramedicFilter === "usage" ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : ""}
                >
                  Usage Reports
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <p className="text-2xl font-bold text-red-600">
                  {reportStats.paramedicIncident || 0}
                </p>
                <p className="text-sm text-gray-600">Incident Reports</p>
                <p className="text-xs text-gray-500">
                  Broken/wasted medications
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">
                  {reportStats.paramedicUsage || 0}
                </p>
                <p className="text-sm text-gray-600">Usage Reports</p>
                <p className="text-xs text-gray-500">
                  Medication administrations
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Report History Table */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="p-6 border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-900 capitalize">
            {activeTab} Reports History
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Report Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Period
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Generated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reportHistory.filter((report) => {
                  if (report.type !== activeTab) return false;
                  if (
                    activeTab === "paramedic" &&
                    paramedicFilter !== "all" &&
                    report.subtype !== paramedicFilter
                  )
                    return false;
                  return true;
                }).map((report) => {
                  // Determine icon based on report type
                  const TableIcon =
                    report.type === "inventory" ? Package : FileText;
                  // Determine badge color based on report type
                  const badgeColor =
                    report.type === "inventory" || report.subtype
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800";
                  // Determine badge text
                  const badgeText = report.subtype || report.type;

                  return (
                    <tr key={report.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 bg-gray-50 rounded-lg mr-3">
                            <TableIcon className="w-4 h-4 text-gray-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {report.name || ""}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {report.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor} capitalize`}
                        >
                          {badgeText}
                        </span>
                      </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.period}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.generated}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="flex items-center space-x-1 bg-blue-100 text-blue-700 hover:bg-blue-200"
                          onClick={() => handleDownloadReport(report.id)}
                        >
                          <Download className="w-3 h-3" />
                          <span>Download</span>
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800"
                          onClick={() => handleViewReport(report.id)}
                        >
                          View
                        </Button>
                      </div>
                    </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Report Templates */}
      <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <CardHeader className="p-6 border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Quick Report Templates
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Generate commonly used reports with pre-configured settings
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickReportTemplates.map((template) => {
              const iconBgColor =
                template.iconColor === "blue"
                  ? "bg-blue-50"
                  : template.iconColor === "green"
                  ? "bg-green-50"
                  : "bg-purple-50";
              const iconTextColor =
                template.iconColor === "blue"
                  ? "text-blue-600"
                  : template.iconColor === "green"
                  ? "text-green-600"
                  : "text-purple-600";
              const buttonBgColor =
                template.iconColor === "blue"
                  ? "bg-blue-600 hover:bg-blue-700"
                  : template.iconColor === "green"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-purple-600 hover:bg-purple-700";

              const IconComponent =
                template.type === "inventory" ? Package : FileText;
              const TrendIcon =
                template.id === "quarterly-audit" ? TrendingUp : null;

              return (
                <div
                  key={template.id}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-center mb-3">
                    <div className={`p-2 ${iconBgColor} rounded-lg`}>
                      {TrendIcon ? (
                        <TrendIcon className={`w-5 h-5 ${iconTextColor}`} />
                      ) : (
                        <IconComponent className={`w-5 h-5 ${iconTextColor}`} />
                      )}
                    </div>
                    <h4 className="text-sm font-medium text-gray-900 ml-3">
                      {template.title}
                    </h4>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    {template.description}
                  </p>
                  <Button
                    type="button"
                    size="sm"
                    className={`w-full ${buttonBgColor}`}
                    onClick={() => handleGenerateTemplate(template.id)}
                  >
                    Generate Now
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


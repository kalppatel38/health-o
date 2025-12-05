"use client";

import { Calendar, Camera, Download, Eye, FileTextIcon, Search, Syringe } from "lucide-react";
import type { ReportType, Report } from "../../data/pouch-history";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PouchHistorySceneProps {
  selectedReportId: string | null;
  setSelectedReportId: (id: string | null) => void;
  pouchReports: Report[];
}

const PouchHistoryScene = (props: PouchHistorySceneProps) => {
  const { selectedReportId, setSelectedReportId, pouchReports } = props;
  const selectedReport = pouchReports.find((r) => r.id === selectedReportId);

  const getTypeBadgeColor = (type: ReportType) => {
    switch (type) {
      case "count out":
        return "text-blue-600 bg-blue-50";
      case "administration":
        return "text-orange-600 bg-orange-50";
      case "count in":
        return "text-green-600 bg-green-50";
    }
  };

  const getTypeIcon = (type: ReportType) => {
    switch (type) {
      case "count out":
      case "count in":
        return FileTextIcon;
      case "administration":
        return Syringe;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Pouch History &amp; Audit Trail
        </h2>
        <p className="text-gray-600">
          Track and audit all pouch transactions with detailed history
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <Input
                type="date"
                className="w-auto"
                defaultValue="2024-01-01"
              />
              <span className="text-gray-500">to</span>
              <Input
                type="date"
                className="w-auto"
                defaultValue="2024-01-31"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search by pouch number or user..."
                className="w-64"
              />
            </div>

            <Button
              type="button"
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Download Report</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="p-4 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Selected Reports
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            <div className="max-h-96 overflow-y-auto">
            {pouchReports.map((report) => {
              const Icon = getTypeIcon(report.type);
              const isSelected = selectedReportId === report.id;
              const medicationsText = report.medications
                .map((m) => `${m.name}: ${m.quantity >= 0 ? m.quantity : m.quantity}`)
                .join(", ");

              return (
                <div
                  key={report.id}
                  onClick={() => setSelectedReportId(report.id)}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    isSelected ? "bg-blue-50" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getTypeBadgeColor(
                          report.type
                        )}`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="capitalize">{report.type}</span>
                      </span>
                      <span className="font-medium text-gray-900">
                        {report.pouchNumber}
                      </span>
                    </div>
                    <Eye className="w-4 h-4 text-gray-400" />
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>
                      {report.user} • {report.timestamp}
                    </p>
                    <p className="mt-1">{medicationsText}</p>
                  </div>
                </div>
              );
            })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-4 border-b border-gray-200">
            <CardTitle className="text-lg font-semibold text-gray-900">Report Details</CardTitle>
          </CardHeader>

          <CardContent className="p-4">
            {selectedReport ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Pouch Number
                    </Label>
                    <p className="text-gray-900">{selectedReport.pouchNumber}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Type
                    </Label>
                    <p className="text-gray-900 capitalize">{selectedReport.type}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      User
                    </Label>
                    <p className="text-gray-900">{selectedReport.user}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-500">
                      Timestamp
                    </Label>
                    <p className="text-gray-900">{selectedReport.timestamp}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-500 mb-2 block">
                    Medications
                  </Label>
                  <div className="bg-gray-50 rounded-md p-3">
                    {selectedReport.medications.map((med, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-1"
                      >
                        <span className="text-gray-700">{med.name}</span>
                        <span className="font-medium text-gray-900">
                          {med.quantity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedReport.images && selectedReport.images.length > 0 && (
                  <div>
                    <Label className="text-sm font-medium text-gray-500 mb-2 block">
                      Images
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      {selectedReport.images.map((image, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 rounded-md p-4 flex items-center justify-center"
                        >
                          <Camera className="w-8 h-8 text-gray-400" />
                          <span className="ml-2 text-sm text-gray-600">
                            {image}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <Label className="text-sm font-medium text-gray-500 mb-2 block">
                    Notes
                  </Label>
                  <p className="text-gray-700 bg-gray-50 rounded-md p-3">
                    {selectedReport.notes}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileTextIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a report to view details</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PouchHistoryScene;



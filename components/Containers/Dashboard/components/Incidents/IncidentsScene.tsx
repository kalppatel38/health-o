"use client";

import {
  AlertTriangle,
  CheckCircle,
  Eye,
  Phone,
  Plus,
  Shield,
  X,
} from "lucide-react";
import type { IncidentStatus } from "../../data/incidents";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IncidentsSceneProps {
  showReportIncident: boolean;
  policeNotified: boolean;
  setShowReportIncident: (show: boolean) => void;
  setPoliceNotified: (notified: boolean) => void;
  incidentStats: Record<string, number>;
  incidents: Array<any>;
}

const IncidentsScene = (props: IncidentsSceneProps) => {
  const {
    showReportIncident,
    policeNotified,
    setShowReportIncident,
    setPoliceNotified,
    incidentStats,
    incidents,
  } = props;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Incidents Management</h2>
          <p className="text-gray-600">
            Track and manage controlled substance incidents with regulatory compliance
          </p>
        </div>
        <Button
          type="button"
          className="inline-flex items-center justify-center space-x-2 bg-red-600 hover:bg-red-700"
          onClick={() => setShowReportIncident(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Report Incident</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Open Incidents</p>
                <p className="text-2xl font-bold text-gray-900">{incidentStats.openIncidents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Closed</p>
                <p className="text-2xl font-bold text-gray-900">{incidentStats.closedIncidents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">EHS Reports</p>
                <p className="text-2xl font-bold text-gray-900">{incidentStats.ehsReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-50 rounded-lg">
                <Phone className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Police Reports</p>
                <p className="text-2xl font-bold text-gray-900">{incidentStats.policeReports}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <CardHeader className="p-6 border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-900">Incident Tracking</CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Incident ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reported
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reports
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {incidents.map((incident) => {
                const statusClasses =
                  incident.status === "open"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800";
                const StatusIcon =
                  incident.status === "open" ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : (
                    <CheckCircle className="w-4 h-4" />
                  );

                return (
                  <tr key={incident.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {incident.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {incident.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {incident.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${statusClasses}`}
                      >
                        {StatusIcon}
                        <span className="capitalize">{incident.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>
                        <div className="font-medium">{incident.reportedBy}</div>
                        <div className="text-xs text-gray-400">{incident.reportedDate}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium bg-orange-100 text-orange-800">
                          {incident.reportsCompleted}/{incident.reportsRequired}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 h-auto"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </CardContent>
      </Card>

      {/* Report Incident Modal */}
      {showReportIncident ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-2 py-4 sm:px-4 sm:py-8">
          <div className="w-full max-w-2xl sm:max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Report Lost/Stolen Controlled Substances
                </h3>
                <p className="text-sm text-gray-600">
                  Document lost or stolen controlled substances incident
                </p>
              </div>
              <button
                type="button"
                className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close"
                onClick={() => setShowReportIncident(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-6 space-y-6">
              {/* Incident Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Incident Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Location Where Loss Discovered <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      placeholder="e.g., 5040 Mainway, Burlington"
                      required
                      className="w-full focus-visible:ring-0 focus-visible:border-red-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Discovery Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="date"
                        required
                        className="w-full focus-visible:ring-0 focus-visible:border-red-500"
                      />
                    </div>
                    <div>
                      <Label className="block text-sm font-medium text-gray-700 mb-2">
                        Discovery Time
                      </Label>
                      <Input
                        type="time"
                        className="w-full focus-visible:ring-0 focus-visible:border-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Label className="block text-sm font-medium text-gray-700 mb-2">
                    Circumstances of Discovery <span className="text-red-500">*</span>
                  </Label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:border-red-500"
                    placeholder="Describe how and when the loss was discovered, including any relevant circumstances..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Witness Name (if applicable)
                    </Label>
                    <Input
                      type="text"
                      className="w-full focus-visible:ring-0 focus-visible:border-red-500"
                    />
                  </div>
                  <div>
                    <Label className="block text-sm font-medium text-gray-700 mb-2">
                      Witness Contact Information
                    </Label>
                    <Input
                      type="text"
                      placeholder="Phone number or email"
                      className="w-full focus-visible:ring-0 focus-visible:border-red-500"
                    />
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 mt-4">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="policeNotified"
                      checked={policeNotified}
                      onChange={(e) => setPoliceNotified(e.target.checked)}
                      className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="policeNotified" className="text-sm font-medium text-gray-700">
                      Police have been notified of this incident
                    </Label>
                  </div>
                </div>
              </div>

              {/* Lost Substances */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Lost Substances</h4>
                  <Button
                    type="button"
                    className="flex items-center space-x-2 bg-red-600 hover:bg-red-700"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Substance</span>
                  </Button>
                </div>
                <div className="text-center py-8 border border-gray-200 rounded-lg">
                  <AlertTriangle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No substances added yet. Click "Add Substance" to begin.</p>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes or Comments
                </Label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-0 focus:outline-none focus:border-red-500"
                  placeholder="Any additional information that may be relevant to this incident..."
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-gray-200 bg-white px-6 py-4">
              <Button
                type="button"
                variant="ghost"
                className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                onClick={() => setShowReportIncident(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { IncidentsScene };



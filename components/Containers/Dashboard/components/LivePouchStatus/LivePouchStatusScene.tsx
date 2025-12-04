"use client";

import { Activity, CheckCircle, Clock, Eye, Package, User } from "lucide-react";
import type { Pouch, PouchStats } from "../../data/live-pouch-status";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface LivePouchStatusSceneProps {
  pouchStats: PouchStats;
  pouches: Pouch[];
}

export function LivePouchStatusScene(props: LivePouchStatusSceneProps) {
  const { pouchStats, pouches } = props;
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Live Pouch Status</h2>
        <p className="text-gray-600">
          Real-time monitoring of controlled substance pouches
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Pouches</p>
                <p className="text-2xl font-bold text-gray-900">{pouchStats.totalPouches}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Signed Out</p>
                <p className="text-2xl font-bold text-gray-900">{pouchStats.signedOut}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-gray-50 rounded-lg">
                <Package className="w-6 h-6 text-gray-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Signed In</p>
                <p className="text-2xl font-bold text-gray-900">{pouchStats.signedIn}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Full Pouches</p>
                <p className="text-2xl font-bold text-gray-900">{pouchStats.fullPouches}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {pouches.map((pouch) => {
          const statusBadgeClasses =
            pouch.status === "Signed Out"
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800";
          const fullnessColorClasses =
            pouch.fullness === "Full"
              ? "text-green-600"
              : "text-orange-600";
          const getMedicationAbbreviation = (name: string) => {
            const abbrev: Record<string, string> = {
              Morphine: "Mor",
              Fentanyl: "Fen",
              Midazolam: "Mid",
              Hydromorphone: "Hyd",
              Ketamine: "Ket",
            };
            return abbrev[name] || name.substring(0, 3);
          };

          return (
            <Card
              key={pouch.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Pouch {pouch.pouchNumber}
                  </h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${statusBadgeClasses}`}
                  >
                    {pouch.status}
                  </span>
                </div>

                <div className="mb-4">
                  <div
                    className={`flex items-center text-sm ${
                      pouch.assignedTo ? "text-gray-600" : "text-gray-400"
                    }`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    <span>{pouch.assignedTo || "Unassigned"}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{pouch.timeAgo}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">
                    Inventory ({pouch.medications.length} items)
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {pouch.medications.map((med, index) => (
                      <Button
                        key={index}
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium hover:bg-blue-100 h-auto"
                        title={`${med.name}: ${med.quantity} units`}
                      >
                        {getMedicationAbbreviation(med.name)}: {med.quantity}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className={`flex items-center text-sm ${fullnessColorClasses}`}>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span>{pouch.fullness}</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 h-auto"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    <span>Details</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader className="p-6 border-b border-gray-200">
          <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              type="button"
              variant="outline"
              className="flex items-center justify-center p-4 h-auto"
            >
              <div className="text-center">
                <Package className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  Sign Out Pouch
                </p>
                <p className="text-xs text-gray-500">
                  Assign pouch to paramedic
                </p>
              </div>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex items-center justify-center p-4 h-auto"
            >
              <div className="text-center">
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">
                  Sign In Pouch
                </p>
                <p className="text-xs text-gray-500">Return and verify pouch</p>
              </div>
            </Button>

            <Button
              type="button"
              variant="outline"
              className="flex items-center justify-center p-4 h-auto"
            >
              <div className="text-center">
                <Activity className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Bulk Update</p>
                <p className="text-xs text-gray-500">
                  Update multiple pouches
                </p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}



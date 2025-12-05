import {
  Activity,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  Box,
  TrendingUp,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type {
  ActivityItem,
  DepotSectionData,
  InventoryItem,
  LowStockItem,
} from "../../types";

type InventoryStatus = "ok" | "low";

interface OverviewSceneProps {
  activityItems: ActivityItem[];
  depotSections: DepotSectionData[];
  headquartersInventoryItems: InventoryItem[];
  lowStockItems: LowStockItem[];
}

const OverviewScene = (props: OverviewSceneProps) => {
  const { activityItems, depotSections, headquartersInventoryItems, lowStockItems } = props;

  return (
    <div className="space-y-6">
      {/* Top stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Box className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Total Medications</p>
                <p className="text-2xl font-bold text-gray-900">479</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-50 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Low Stock Alerts</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-50 rounded-lg">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Active Pouches</p>
                <p className="text-2xl font-bold text-gray-900">2/4</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-50 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">Pending Orders</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Inventory Overview */}
        <Card className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <CardHeader className="border-b border-gray-200 p-6">
            <CardTitle className="text-lg font-semibold text-gray-900">
              Inventory Overview
            </CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Real-time inventory levels across all locations
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Headquarters */}
              <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-900">Headquarters</h4>
                  <span className="text-sm text-gray-500">HQ</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {headquartersInventoryItems.map((item) => (
                    <InventoryPillCard
                      key={item.name}
                      name={item.name}
                      current={item.current}
                      min={item.min}
                      max={item.max}
                      lot={item.lot}
                      expiry={item.expiry}
                    />
                  ))}
                </div>
              </div>

              {depotSections.map((section) => (
                <DepotSection
                  key={section.code}
                  title={section.title}
                  code={section.code}
                  items={section.items}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right column: Low Stock + Recent Activity */}
        <div className="space-y-6">
          {/* Low Stock Alerts */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <CardHeader className="border-b border-gray-200 p-6">
              <CardTitle className="text-lg font-semibold text-gray-900 flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                Low Stock Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {lowStockItems.map((item) => (
                  <LowStockRow
                    key={`${item.name}-${item.location}`}
                    name={item.name}
                    location={item.location}
                    current={item.current}
                    min={item.min}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <CardHeader className="border-b border-gray-200 p-6">
              <CardTitle className="text-lg font-semibold text-gray-900">
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                {activityItems.map((item) => (
                  <ActivityRow
                    key={`${item.title}-${item.ago}`}
                    color={item.color}
                    title={item.title}
                    description={item.description}
                    ago={item.ago}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

interface InventoryPillCardProps {
  name: string;
  current: number;
  min: number;
  max: number;
  lot: string;
  expiry: string;
  status?: InventoryStatus;
}

const InventoryPillCard = ({
  name,
  current,
  min,
  max,
  lot,
  expiry,
  status = "ok",
}: InventoryPillCardProps) => {
  const isLow = status === "low" || current < min;
  const borderColor = isLow ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50";
  const valueColor = isLow ? "text-red-600" : "text-green-600";

  return (
    <div className="relative group">
      <div className={`p-3 rounded-lg border-2 ${borderColor}`}>
        <div className="text-center">
          <p className="text-xs font-medium text-gray-600 mb-1">{name}</p>
          <p className={`text-lg font-bold ${valueColor}`}>{current}</p>
          <div className="flex items-center justify-center text-xs text-gray-500">
            <ArrowDown className="w-3 h-3 mr-1" />
            {min}
            <ArrowUp className="w-3 h-3 ml-1 mr-1" />
            {max}
          </div>
        </div>
      </div>

      <div className="absolute z-10 invisible group-hover:visible bg-gray-900 text-white text-xs rounded-lg p-3 bottom-full mb-2 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
        <div className="space-y-1">
          <p>
            <strong>{name}</strong>
          </p>
          <p>Current: {current}</p>
          <p>
            Min: {min} | Max: {max}
          </p>
          <p>Expiry: {expiry}</p>
          <p>Lot: {lot}</p>
        </div>
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900" />
      </div>
    </div>
  );
}

interface DepotItem {
  name: string;
  current: number;
  min: number;
  max: number;
  lot: string;
  expiry: string;
}

interface DepotSectionProps {
  title: string;
  code: string;
  items: DepotItem[];
}

const DepotSection = ({ title, code, items }: DepotSectionProps) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-3">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <span className="text-sm text-gray-500">{code}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {items.map((item) => (
          <InventoryPillCard
            key={item.name}
            name={item.name}
            current={item.current}
            min={item.min}
            max={item.max}
            lot={item.lot}
            expiry={item.expiry}
            status={item.current < item.min ? "low" : "ok"}
          />
        ))}
      </div>
    </div>
  );
}

interface LowStockRowProps {
  name: string;
  location: string;
  current: number;
  min: number;
}

const LowStockRow = ({ name, location, current, min }: LowStockRowProps) => {
  return (
    <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
      <div>
        <p className="text-sm font-medium text-red-800">{name}</p>
        <p className="text-xs text-red-600">{location}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-bold text-red-700">
          {current}/{min}
        </p>
        <p className="text-xs text-red-600">Below min</p>
      </div>
    </div>
  );
}

interface ActivityRowProps {
  color: "blue" | "green" | "yellow";
  title: string;
  description: string;
  ago: string;
}

const ActivityRow = ({ color, title, description, ago }: ActivityRowProps) => {
  const bgColor =
    color === "blue"
      ? "bg-blue-50"
      : color === "green"
      ? "bg-green-50"
      : "bg-yellow-50";
  const dotColor =
    color === "blue"
      ? "bg-blue-500"
      : color === "green"
      ? "bg-green-500"
      : "bg-yellow-500";

  return (
    <div className={`flex items-center space-x-3 p-3 rounded-lg ${bgColor}`}>
      <div className={`w-2 h-2 rounded-full ${dotColor}`} />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-600">{description}</p>
      </div>
      <span className="text-xs text-gray-500">{ago}</span>
    </div>
  );
};

export default OverviewScene;


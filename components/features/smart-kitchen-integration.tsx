"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Thermometer, Scale, Timer, Wifi, Zap, AlertTriangle, CheckCircle, Settings, Home } from "lucide-react"

const connectedDevices = [
  {
    id: 1,
    name: "Smart Refrigerator",
    type: "fridge",
    brand: "Samsung Family Hub",
    status: "connected",
    battery: null,
    lastSync: "2 minutes ago",
    features: ["Temperature Control", "Inventory Tracking", "Energy Monitor"],
    data: {
      temperature: 4,
      humidity: 65,
      energyUsage: 1.2,
      doorOpenCount: 12,
    },
  },
  {
    id: 2,
    name: "Kitchen Scale",
    type: "scale",
    brand: "Xiaomi Mi Smart Scale",
    status: "connected",
    battery: 85,
    lastSync: "5 minutes ago",
    features: ["Precision Weighing", "Nutrition Calculation", "Recipe Integration"],
    data: {
      lastWeight: 250,
      unit: "grams",
      accuracy: 99.8,
    },
  },
  {
    id: 3,
    name: "Smart Oven",
    type: "oven",
    brand: "Bosch Series 8",
    status: "offline",
    battery: null,
    lastSync: "2 hours ago",
    features: ["Auto Cooking", "Temperature Probe", "Remote Control"],
    data: {
      temperature: 0,
      mode: "off",
      remainingTime: 0,
    },
  },
  {
    id: 4,
    name: "Air Quality Monitor",
    type: "sensor",
    brand: "Xiaomi Mi Air",
    status: "connected",
    battery: 92,
    lastSync: "1 minute ago",
    features: ["PM2.5 Detection", "Humidity Monitor", "Temperature Sensor"],
    data: {
      pm25: 15,
      humidity: 58,
      temperature: 24,
      aqi: 42,
    },
  },
]

const automationRules = [
  {
    id: 1,
    name: "Auto Inventory Update",
    description: "Automatically update inventory when items are removed from smart fridge",
    trigger: "Smart Fridge Door Sensor",
    action: "Update Inventory",
    enabled: true,
    lastTriggered: "30 minutes ago",
  },
  {
    id: 2,
    name: "Cooking Timer Sync",
    description: "Sync cooking timers with recipe instructions",
    trigger: "Recipe Started",
    action: "Set Smart Oven Timer",
    enabled: true,
    lastTriggered: "2 hours ago",
  },
  {
    id: 3,
    name: "Energy Optimization",
    description: "Optimize appliance usage during off-peak hours",
    trigger: "Energy Price Alert",
    action: "Delay Non-Critical Operations",
    enabled: false,
    lastTriggered: "Never",
  },
  {
    id: 4,
    name: "Food Safety Alert",
    description: "Alert when temperature goes outside safe range",
    trigger: "Temperature Sensor",
    action: "Send Push Notification",
    enabled: true,
    lastTriggered: "1 week ago",
  },
]

const kitchenInsights = [
  {
    title: "Energy Efficiency",
    value: "87%",
    trend: "+5%",
    description: "Your kitchen is 5% more efficient than last month",
    icon: Zap,
    color: "text-green-600",
  },
  {
    title: "Food Safety Score",
    value: "94/100",
    trend: "+2",
    description: "Excellent temperature and humidity control",
    icon: CheckCircle,
    color: "text-blue-600",
  },
  {
    title: "Device Uptime",
    value: "99.2%",
    trend: "stable",
    description: "All devices functioning optimally",
    icon: Wifi,
    color: "text-purple-600",
  },
  {
    title: "Automation Success",
    value: "96%",
    trend: "+3%",
    description: "Automation rules working perfectly",
    icon: Settings,
    color: "text-orange-600",
  },
]

export function SmartKitchenIntegration() {
  const [selectedDevice, setSelectedDevice] = useState(connectedDevices[0])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "text-green-600"
      case "offline":
        return "text-red-600"
      case "syncing":
        return "text-yellow-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <CheckCircle className="w-4 h-4" />
      case "offline":
        return <AlertTriangle className="w-4 h-4" />
      case "syncing":
        return <Timer className="w-4 h-4 animate-spin" />
      default:
        return <AlertTriangle className="w-4 h-4" />
    }
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "fridge":
        return "🧊"
      case "scale":
        return "⚖️"
      case "oven":
        return "🔥"
      case "sensor":
        return "🌡️"
      default:
        return "📱"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Home className="w-5 h-5" />
          Smart Kitchen Integration
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <Wifi className="w-3 h-3 mr-1" />
            IoT Connected
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="devices" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="devices">Connected Devices</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="insights">Kitchen Insights</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="devices" className="space-y-6">
            {/* Device Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {kitchenInsights.map((insight, index) => {
                const Icon = insight.icon
                return (
                  <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 border">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className={`w-5 h-5 ${insight.color}`} />
                      <span className="font-medium text-sm">{insight.title}</span>
                    </div>
                    <div className="text-2xl font-bold mb-1">{insight.value}</div>
                    <div className="text-xs text-gray-600">{insight.description}</div>
                  </div>
                )
              })}
            </div>

            {/* Device List */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Connected Devices ({connectedDevices.length})</h3>
                {connectedDevices.map((device) => (
                  <Card
                    key={device.id}
                    className={`cursor-pointer transition-all ${
                      selectedDevice.id === device.id ? "ring-2 ring-blue-500 bg-blue-50" : "hover:shadow-md"
                    }`}
                    onClick={() => setSelectedDevice(device)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getDeviceIcon(device.type)}</span>
                          <div>
                            <div className="font-medium">{device.name}</div>
                            <div className="text-sm text-gray-600">{device.brand}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {device.battery && (
                            <Badge variant="outline" className="text-xs">
                              🔋 {device.battery}%
                            </Badge>
                          )}
                          <div className={`flex items-center gap-1 ${getStatusColor(device.status)}`}>
                            {getStatusIcon(device.status)}
                            <span className="text-sm capitalize">{device.status}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500 mb-2">Last sync: {device.lastSync}</div>

                      <div className="flex flex-wrap gap-1">
                        {device.features.slice(0, 2).map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {device.features.length > 2 && (
                          <Badge variant="secondary" className="text-xs">
                            +{device.features.length - 2}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Device Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{getDeviceIcon(selectedDevice.type)}</span>
                    {selectedDevice.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Brand</span>
                      <div className="font-medium">{selectedDevice.brand}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Status</span>
                      <div className={`font-medium capitalize ${getStatusColor(selectedDevice.status)}`}>
                        {selectedDevice.status}
                      </div>
                    </div>
                  </div>

                  {selectedDevice.battery && (
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Battery Level</span>
                        <span>{selectedDevice.battery}%</span>
                      </div>
                      <Progress value={selectedDevice.battery} className="h-2" />
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="font-medium">Real-time Data</h4>
                    {selectedDevice.type === "fridge" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Thermometer className="w-4 h-4 text-blue-600" />
                            <span className="text-sm font-medium">Temperature</span>
                          </div>
                          <div className="text-xl font-bold text-blue-900">{selectedDevice.data.temperature}°C</div>
                        </div>
                        <div className="bg-green-50 rounded p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <Zap className="w-4 h-4 text-green-600" />
                            <span className="text-sm font-medium">Energy</span>
                          </div>
                          <div className="text-xl font-bold text-green-900">{selectedDevice.data.energyUsage} kWh</div>
                        </div>
                      </div>
                    )}

                    {selectedDevice.type === "scale" && (
                      <div className="bg-purple-50 rounded p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Scale className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium">Last Measurement</span>
                        </div>
                        <div className="text-xl font-bold text-purple-900">
                          {selectedDevice.data.lastWeight} {selectedDevice.data.unit}
                        </div>
                        <div className="text-xs text-purple-700">Accuracy: {selectedDevice.data.accuracy}%</div>
                      </div>
                    )}

                    {selectedDevice.type === "sensor" && (
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-orange-50 rounded p-3">
                          <div className="text-sm font-medium">Air Quality</div>
                          <div className="text-lg font-bold text-orange-900">AQI {selectedDevice.data.aqi}</div>
                        </div>
                        <div className="bg-cyan-50 rounded p-3">
                          <div className="text-sm font-medium">PM2.5</div>
                          <div className="text-lg font-bold text-cyan-900">{selectedDevice.data.pm25} μg/m³</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium">Features</h4>
                    {selectedDevice.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{feature}</span>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    ))}
                  </div>

                  <Button className="w-full gap-2">
                    <Settings className="w-4 h-4" />
                    Configure Device
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="automation" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Automation Rules</h3>
              <Button className="gap-2">
                <Settings className="w-4 h-4" />
                Create Rule
              </Button>
            </div>

            <div className="space-y-4">
              {automationRules.map((rule) => (
                <Card key={rule.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium">{rule.name}</h4>
                        <p className="text-sm text-gray-600">{rule.description}</p>
                      </div>
                      <Switch checked={rule.enabled} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Trigger:</span>
                        <div className="font-medium">{rule.trigger}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Action:</span>
                        <div className="font-medium">{rule.action}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Last Triggered:</span>
                        <div className="font-medium">{rule.lastTriggered}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Automation Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-900">156</div>
                    <div className="text-sm text-green-700">Rules Executed</div>
                    <div className="text-xs text-green-600">This month</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-900">2.3h</div>
                    <div className="text-sm text-blue-700">Time Saved</div>
                    <div className="text-xs text-blue-600">Per week</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-900">96%</div>
                    <div className="text-sm text-purple-700">Success Rate</div>
                    <div className="text-xs text-purple-600">All time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Energy Usage Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Smart Refrigerator</span>
                      <div className="text-right">
                        <div className="font-bold">1.2 kWh</div>
                        <div className="text-xs text-green-600">-5% vs last month</div>
                      </div>
                    </div>
                    <Progress value={60} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span>Smart Oven</span>
                      <div className="text-right">
                        <div className="font-bold">0.8 kWh</div>
                        <div className="text-xs text-red-600">+12% vs last month</div>
                      </div>
                    </div>
                    <Progress value={40} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Kitchen Health Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-green-600">94</div>
                    <div className="text-sm text-gray-600">out of 100</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Temperature Control</span>
                      <span className="text-sm font-medium">Excellent</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Air Quality</span>
                      <span className="text-sm font-medium">Good</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Energy Efficiency</span>
                      <span className="text-sm font-medium">Very Good</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Device Connectivity</span>
                      <span className="text-sm font-medium">Excellent</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Smart Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl">💡</div>
                    <div>
                      <div className="font-medium">Optimize Refrigerator Temperature</div>
                      <div className="text-sm text-gray-600">
                        Lower temperature by 1°C to improve food preservation and save energy.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl">⚡</div>
                    <div>
                      <div className="font-medium">Schedule Energy-Intensive Tasks</div>
                      <div className="text-sm text-gray-600">
                        Use smart oven during off-peak hours (10 PM - 6 AM) to save 30% on electricity.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl">🔧</div>
                    <div>
                      <div className="font-medium">Maintenance Reminder</div>
                      <div className="text-sm text-gray-600">
                        Clean refrigerator coils next week to maintain optimal efficiency.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Connection Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Auto-Discovery</div>
                    <div className="text-sm text-gray-600">Automatically detect new smart devices</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Real-time Sync</div>
                    <div className="text-sm text-gray-600">Sync device data in real-time</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Energy Monitoring</div>
                    <div className="text-sm text-gray-600">Track energy usage of connected devices</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Device Offline Alerts</div>
                    <div className="text-sm text-gray-600">Get notified when devices go offline</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Energy Usage Alerts</div>
                    <div className="text-sm text-gray-600">Alert when energy usage exceeds threshold</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Maintenance Reminders</div>
                    <div className="text-sm text-gray-600">Remind about device maintenance</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Add New Device</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: "Smart Fridge", icon: "🧊", available: true },
                    { name: "Kitchen Scale", icon: "⚖️", available: true },
                    { name: "Smart Oven", icon: "🔥", available: true },
                    { name: "Air Fryer", icon: "🍟", available: false },
                    { name: "Coffee Maker", icon: "☕", available: false },
                    { name: "Dishwasher", icon: "🍽️", available: false },
                    { name: "Microwave", icon: "📡", available: false },
                    { name: "Blender", icon: "🥤", available: false },
                  ].map((device, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-20 flex-col gap-2 bg-transparent"
                      disabled={!device.available}
                    >
                      <span className="text-2xl">{device.icon}</span>
                      <span className="text-xs">{device.name}</span>
                      {!device.available && (
                        <Badge variant="secondary" className="text-xs">
                          Coming Soon
                        </Badge>
                      )}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

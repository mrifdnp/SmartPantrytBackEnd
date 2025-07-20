"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Smartphone, Mail, MessageSquare, Clock, Zap, Brain, Settings } from "lucide-react"

const notificationTypes = [
  {
    id: "expiry",
    title: "Expiry Alerts",
    description: "Notifikasi untuk item yang akan expired",
    icon: Clock,
    enabled: true,
    channels: ["push", "email"],
    timing: "1-day-before",
    priority: "high",
    smartEnabled: true,
  },
  {
    id: "stock",
    title: "Low Stock Warnings",
    description: "Peringatan ketika stok menipis",
    icon: Bell,
    enabled: true,
    channels: ["push"],
    timing: "when-low",
    priority: "medium",
    smartEnabled: true,
  },
  {
    id: "recipe",
    title: "Recipe Suggestions",
    description: "Saran resep berdasarkan bahan tersedia",
    icon: Brain,
    enabled: false,
    channels: ["push", "email"],
    timing: "daily",
    priority: "low",
    smartEnabled: true,
  },
  {
    id: "shopping",
    title: "Shopping Reminders",
    description: "Pengingat untuk berbelanja",
    icon: MessageSquare,
    enabled: true,
    channels: ["push", "whatsapp"],
    timing: "weekly",
    priority: "medium",
    smartEnabled: false,
  },
]

const smartFeatures = [
  {
    id: "adaptive-timing",
    title: "Adaptive Timing",
    description: "AI menyesuaikan waktu notifikasi berdasarkan kebiasaan Anda",
    enabled: true,
  },
  {
    id: "context-aware",
    title: "Context Awareness",
    description: "Notifikasi disesuaikan dengan situasi (weekend, holiday, dll)",
    enabled: true,
  },
  {
    id: "batch-grouping",
    title: "Smart Batching",
    description: "Kelompokkan notifikasi serupa untuk mengurangi spam",
    enabled: false,
  },
  {
    id: "priority-learning",
    title: "Priority Learning",
    description: "Belajar dari interaksi untuk memprioritaskan notifikasi",
    enabled: true,
  },
]

export function SmartNotifications() {
  const [notifications, setNotifications] = useState(notificationTypes)
  const [features, setFeatures] = useState(smartFeatures)
  const [globalEnabled, setGlobalEnabled] = useState(true)

  const toggleNotification = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, enabled: !notif.enabled } : notif)))
  }

  const toggleFeature = (id: string) => {
    setFeatures((prev) =>
      prev.map((feature) => (feature.id === id ? { ...feature, enabled: !feature.enabled } : feature)),
    )
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "push":
        return <Smartphone className="w-4 h-4" />
      case "email":
        return <Mail className="w-4 h-4" />
      case "whatsapp":
        return <MessageSquare className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "low":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Smart Notifications
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <Brain className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Master Switch</span>
            <Switch checked={globalEnabled} onCheckedChange={setGlobalEnabled} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notifications">Notification Types</TabsTrigger>
            <TabsTrigger value="smart">Smart Features</TabsTrigger>
            <TabsTrigger value="schedule">Schedule & Timing</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-4">
            {notifications.map((notif) => {
              const Icon = notif.icon
              return (
                <div key={notif.id} className="border rounded-lg p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium">{notif.title}</h3>
                        <p className="text-sm text-gray-600">{notif.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {notif.smartEnabled && (
                        <Badge variant="outline" className="gap-1">
                          <Zap className="w-3 h-3" />
                          Smart
                        </Badge>
                      )}
                      <Badge className={getPriorityColor(notif.priority)}>{notif.priority}</Badge>
                      <Switch
                        checked={notif.enabled && globalEnabled}
                        onCheckedChange={() => toggleNotification(notif.id)}
                        disabled={!globalEnabled}
                      />
                    </div>
                  </div>

                  {notif.enabled && globalEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Channels</label>
                        <div className="flex gap-2 mt-1">
                          {notif.channels.map((channel) => (
                            <Badge key={channel} variant="outline" className="gap-1">
                              {getChannelIcon(channel)}
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700">Timing</label>
                        <Select defaultValue={notif.timing}>
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="immediate">Immediately</SelectItem>
                            <SelectItem value="1-hour-before">1 hour before</SelectItem>
                            <SelectItem value="1-day-before">1 day before</SelectItem>
                            <SelectItem value="3-days-before">3 days before</SelectItem>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="daily">Daily</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-700">Frequency</label>
                        <Select defaultValue="normal">
                          <SelectTrigger className="mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minimal">Minimal</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="frequent">Frequent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </TabsContent>

          <TabsContent value="smart" className="space-y-4">
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">AI-Powered Intelligence</span>
              </div>
              <p className="text-sm text-purple-800">
                Smart features menggunakan machine learning untuk memberikan notifikasi yang lebih personal dan relevan
              </p>
            </div>

            {features.map((feature) => (
              <div key={feature.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
                <Switch checked={feature.enabled} onCheckedChange={() => toggleFeature(feature.id)} />
              </div>
            ))}

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Settings className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900">Learning Period</h4>
                  <p className="text-sm text-yellow-800 mt-1">
                    AI membutuhkan 2-3 minggu untuk mempelajari pola dan preferensi Anda. Semakin sering Anda
                    berinteraksi, semakin akurat prediksinya.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quiet Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Enable Quiet Hours</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">From</label>
                      <Select defaultValue="22:00">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => (
                            <SelectItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                              {`${i.toString().padStart(2, "0")}:00`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">To</label>
                      <Select defaultValue="07:00">
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 24 }, (_, i) => (
                            <SelectItem key={i} value={`${i.toString().padStart(2, "0")}:00`}>
                              {`${i.toString().padStart(2, "0")}:00`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weekend Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Different weekend schedule</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Reduce frequency on weekends</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Holiday mode</span>
                    <Switch />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notification Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-blue-50 border-l-4 border-l-blue-500 p-3 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Expiry Alert</span>
                      <Badge className="bg-red-100 text-red-800 text-xs">High Priority</Badge>
                    </div>
                    <p className="text-sm text-blue-800">🍅 Tomat akan expired besok! Buat sup tomat atau salad?</p>
                    <div className="text-xs text-blue-600 mt-1">Scheduled for: Today, 09:00</div>
                  </div>

                  <div className="bg-green-50 border-l-4 border-l-green-500 p-3 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <Brain className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-900">Smart Recipe</span>
                      <Badge className="bg-green-100 text-green-800 text-xs">AI Suggestion</Badge>
                    </div>
                    <p className="text-sm text-green-800">
                      🍳 Perfect time for Nasi Goreng! You have all ingredients ready.
                    </p>
                    <div className="text-xs text-green-600 mt-1">Scheduled for: Tomorrow, 17:00</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

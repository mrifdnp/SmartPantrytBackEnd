"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, Plus, Minus, AlertCircle } from "lucide-react"

const activities = [
  {
    id: 1,
    type: "add",
    item: "Beras",
    quantity: "5 kg",
    time: "2 jam lalu",
    icon: Plus,
    color: "text-green-600",
  },
  {
    id: 2,
    type: "use",
    item: "Minyak Goreng",
    quantity: "500 ml",
    time: "4 jam lalu",
    icon: Minus,
    color: "text-blue-600",
  },
  {
    id: 3,
    type: "expire",
    item: "Roti Tawar",
    quantity: "1 bungkus",
    time: "1 hari lalu",
    icon: AlertCircle,
    color: "text-red-600",
  },
  {
    id: 4,
    type: "add",
    item: "Telur",
    quantity: "1 kg",
    time: "2 hari lalu",
    icon: Plus,
    color: "text-green-600",
  },
]

const getActivityText = (type: string) => {
  switch (type) {
    case "add":
      return "Ditambahkan"
    case "use":
      return "Digunakan"
    case "expire":
      return "Kedaluwarsa"
    default:
      return "Aktivitas"
  }
}

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5" />
          Aktivitas Terbaru
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon
          return (
            <div key={activity.id} className="flex items-center gap-3">
              <div className={`p-2 rounded-full bg-gray-100 ${activity.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{activity.item}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {getActivityText(activity.type)}
                  </Badge>
                  <span className="text-xs text-gray-500">{activity.quantity}</span>
                </div>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

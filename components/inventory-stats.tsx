"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, AlertTriangle, TrendingUp, DollarSign } from "lucide-react"

const stats = [
  {
    title: "Total Item",
    value: "127",
    change: "+12%",
    changeType: "positive",
    icon: Package,
  },
  {
    title: "Segera Kedaluwarsa",
    value: "8",
    change: "+3 dari kemarin",
    changeType: "negative",
    icon: AlertTriangle,
  },
  {
    title: "Nilai Inventaris",
    value: "Rp 2.4M",
    change: "+8.2%",
    changeType: "positive",
    icon: DollarSign,
  },
  {
    title: "Efisiensi Penggunaan",
    value: "94%",
    change: "+2.1%",
    changeType: "positive",
    icon: TrendingUp,
  },
]

export function InventoryStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <Icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.changeType === "positive" ? "text-green-600" : "text-red-600"}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, AlertTriangle, TrendingUp, DollarSign, Leaf, Clock, ArrowUp, ArrowDown } from "lucide-react"

const stats = [
  {
    title: "Total Item",
    value: "127",
    change: "+12",
    changeType: "positive" as const,
    changeText: "dari minggu lalu",
    icon: Package,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Segera Expired",
    value: "8",
    change: "+3",
    changeType: "negative" as const,
    changeText: "dari kemarin",
    icon: AlertTriangle,
    color: "from-red-500 to-pink-500",
  },
  {
    title: "Nilai Inventaris",
    value: "Rp 2.4M",
    change: "+8.2%",
    changeType: "positive" as const,
    changeText: "bulan ini",
    icon: DollarSign,
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Penghematan",
    value: "Rp 890K",
    change: "+15%",
    changeType: "positive" as const,
    changeText: "vs bulan lalu",
    icon: TrendingUp,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Zero Waste Score",
    value: "94%",
    change: "+2.1%",
    changeType: "positive" as const,
    changeText: "peningkatan",
    icon: Leaf,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Avg. Shelf Life",
    value: "12 hari",
    change: "+1.5",
    changeType: "positive" as const,
    changeText: "hari lebih lama",
    icon: Clock,
    color: "from-orange-500 to-yellow-500",
  },
]

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <Card
            key={stat.title}
            className="hover:shadow-lg transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm group"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <Badge
                  variant={stat.changeType === "positive" ? "default" : "destructive"}
                  className={`gap-1 ${
                    stat.changeType === "positive"
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-red-100 text-red-700 hover:bg-red-200"
                  }`}
                >
                  {stat.changeType === "positive" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                  {stat.change}
                </Badge>
              </div>

              <div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.title}</div>
                <div className="text-xs text-gray-500 mt-1">{stat.changeText}</div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

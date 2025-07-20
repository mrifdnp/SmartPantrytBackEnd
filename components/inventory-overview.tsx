"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, AlertTriangle, CheckCircle, Clock } from "lucide-react"

// Mock data - in real app, this would come from Supabase
const inventoryItems = [
  {
    id: 1,
    name: "Tomat",
    quantity: "2 kg",
    location: "Kulkas",
    expiryDate: "2025-01-14",
    status: "critical",
    daysLeft: 1,
  },
  {
    id: 2,
    name: "Beras",
    quantity: "5 kg",
    location: "Pantry",
    expiryDate: "2025-03-15",
    status: "good",
    daysLeft: 62,
  },
  {
    id: 3,
    name: "Susu",
    quantity: "1 L",
    location: "Kulkas",
    expiryDate: "2025-01-16",
    status: "warning",
    daysLeft: 3,
  },
  {
    id: 4,
    name: "Ayam",
    quantity: "1.5 kg",
    location: "Freezer",
    expiryDate: "2025-01-20",
    status: "warning",
    daysLeft: 7,
  },
  {
    id: 5,
    name: "Wortel",
    quantity: "1 kg",
    location: "Kulkas",
    expiryDate: "2025-01-25",
    status: "good",
    daysLeft: 12,
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "critical":
      return "bg-red-100 text-red-800 border-red-200"
    case "warning":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "good":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "critical":
      return <AlertTriangle className="w-4 h-4" />
    case "warning":
      return <Clock className="w-4 h-4" />
    case "good":
      return <CheckCircle className="w-4 h-4" />
    default:
      return <Package className="w-4 h-4" />
  }
}

export function InventoryOverview() {
  const [selectedLocation, setSelectedLocation] = useState("all")

  const filteredItems =
    selectedLocation === "all"
      ? inventoryItems
      : inventoryItems.filter((item) => item.location.toLowerCase() === selectedLocation)

  const stats = {
    total: inventoryItems.length,
    critical: inventoryItems.filter((item) => item.status === "critical").length,
    warning: inventoryItems.filter((item) => item.status === "warning").length,
    good: inventoryItems.filter((item) => item.status === "good").length,
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Inventaris Bahan Makanan
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className="text-red-600">
              {stats.critical} Kritis
            </Badge>
            <Badge variant="outline" className="text-yellow-600">
              {stats.warning} Peringatan
            </Badge>
            <Badge variant="outline" className="text-green-600">
              {stats.good} Baik
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedLocation} onValueChange={setSelectedLocation}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">Semua</TabsTrigger>
            <TabsTrigger value="kulkas">Kulkas</TabsTrigger>
            <TabsTrigger value="freezer">Freezer</TabsTrigger>
            <TabsTrigger value="pantry">Pantry</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedLocation} className="mt-4">
            <div className="space-y-3">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full ${getStatusColor(item.status)}`}>
                      {getStatusIcon(item.status)}
                    </div>
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-600">
                        {item.quantity} • {item.location}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {item.daysLeft === 1 ? "Besok" : `${item.daysLeft} hari lagi`}
                    </p>
                    <p className="text-xs text-gray-500">
                      Exp: {new Date(item.expiryDate).toLocaleDateString("id-ID")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

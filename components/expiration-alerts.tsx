"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, ChefHat, Trash2 } from "lucide-react"

const expiringItems = [
  {
    id: 1,
    name: "Tomat",
    quantity: "2 kg",
    daysLeft: 1,
    severity: "critical",
    suggestions: ["Buat saus tomat", "Tumis dengan bawang", "Sup tomat"],
  },
  {
    id: 2,
    name: "Susu",
    quantity: "1 L",
    daysLeft: 3,
    severity: "warning",
    suggestions: ["Buat puding", "Smoothie buah", "Pancake"],
  },
  {
    id: 3,
    name: "Ayam",
    quantity: "1.5 kg",
    daysLeft: 7,
    severity: "warning",
    suggestions: ["Ayam goreng", "Sup ayam", "Ayam bakar"],
  },
]

export function ExpirationAlerts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          Peringatan Kedaluwarsa
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {expiringItems.map((item) => (
          <div key={item.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={`p-2 rounded-full ${
                    item.severity === "critical" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {item.severity === "critical" ? <AlertTriangle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>
                <div>
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.quantity}</p>
                </div>
              </div>
              <Badge variant={item.severity === "critical" ? "destructive" : "secondary"}>
                {item.daysLeft === 1 ? "Besok" : `${item.daysLeft} hari`}
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <ChefHat className="w-4 h-4" />
                Saran Resep:
              </div>
              <div className="flex flex-wrap gap-2">
                {item.suggestions.map((suggestion, index) => (
                  <Button key={index} variant="outline" size="sm" className="text-xs bg-transparent">
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button size="sm" className="flex-1">
                Gunakan Sekarang
              </Button>
              <Button size="sm" variant="outline" className="gap-2 bg-transparent">
                <Trash2 className="w-4 h-4" />
                Buang
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

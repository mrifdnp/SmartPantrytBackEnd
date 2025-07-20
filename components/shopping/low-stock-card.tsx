"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"

type InventoryItem = {
  id: number
  name: string
  quantity: number
  unit: string
}

export default function LowStockCard({ addToList }: { addToList: (name: string, qty: number, unit: string) => void }) {
  const [lowStockItems, setLowStockItems] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLowStock = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()

        const accessToken = session?.access_token
        if (!accessToken) {
          throw new Error("Tidak ada access token. Pengguna belum login?")
        }

        const res = await fetch("/api/inventory/low-stock", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })

        const rawItems = await res.json()

        if (!Array.isArray(rawItems)) {
          throw new Error("Data dari /api/inventory/low-stock bukan array")
        }

        setLowStockItems(rawItems)
      } catch (error) {
        console.error("❌ Gagal fetch low stock:", error)
        setLowStockItems([])
      } finally {
        setLoading(false)
      }
    }

    fetchLowStock()
  }, [])

  return (
    <Card className="bg-white/80 backdrop-blur-lg border border-emerald-200 shadow-lg rounded-2xl">
      <CardContent className="py-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <RefreshCw className="w-5 h-5 text-emerald-700" />
          <h2 className="text-xl font-bold text-emerald-800">Bahan Menipis</h2>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Memuat data...</p>
        ) : lowStockItems.length === 0 ? (
          <p className="text-gray-500 text-sm">Tidak ada bahan yang menipis.</p>
        ) : (
          lowStockItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border border-emerald-100 rounded-xl px-4 py-3 bg-gradient-to-r from-emerald-50 to-lime-50 hover:bg-emerald-100 transition"
            >
              <div>
                <span className="font-semibold text-emerald-800">{item.name}</span>{" "}
                tinggal {item.quantity} {item.unit}
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => addToList(item.name, item.quantity, item.unit)}
                >
                  Tambah
                </Button>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}
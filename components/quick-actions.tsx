"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Camera, Plus, Scan, Mic, ShoppingCart } from "lucide-react"
import { AddItemModal } from "@/components/add-item-modal"

export function QuickActions() {
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Aksi Cepat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start gap-3" onClick={() => setShowAddModal(true)}>
            <Plus className="w-4 h-4" />
            Tambah Item Manual
          </Button>

          <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
            <Camera className="w-4 h-4" />
            Foto & Scan OCR
          </Button>

          <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
            <Scan className="w-4 h-4" />
            Scan Barcode
          </Button>

          <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
            <Mic className="w-4 h-4" />
            Input Suara
          </Button>

          <Button variant="outline" className="w-full justify-start gap-3 bg-transparent">
            <ShoppingCart className="w-4 h-4" />
            Daftar Belanja
          </Button>
        </CardContent>
      </Card>

      <AddItemModal open={showAddModal} onOpenChange={setShowAddModal} />
    </>
  )
}

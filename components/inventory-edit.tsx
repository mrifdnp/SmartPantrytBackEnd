"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

interface InventoryItem {
  id: string
  name: string
  category: string | null
  location: string | null
  added_date: string
  expiry_date: string | null
  unit: string | null
  quantity: number | null
  cost: number | null
}

interface Props {
  open: boolean
  item: InventoryItem | null
  onClose: () => void
  onSave: (updatedItem: InventoryItem) => void
}

export  function InventoryEdit({ open, item, onClose, onSave }: Props) {
  const [form, setForm] = useState(item)

  useEffect(() => {
    setForm(item)
  }, [item])

  if (!form) return null

  const handleChange = (field: keyof InventoryItem, value: any) => {
    setForm((prev) => ({ ...prev!, [field]: value }))
  }

  const handleSubmit = () => {
    onSave(form!)
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Input placeholder="Nama Item" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
          <Input placeholder="Kategori" value={form.category ?? ""} onChange={(e) => handleChange("category", e.target.value)} />
          <Input placeholder="Lokasi" value={form.location ?? ""} onChange={(e) => handleChange("location", e.target.value)} />
          <Input type="number" placeholder="Jumlah" value={form.quantity ?? ""} onChange={(e) => handleChange("quantity", Number(e.target.value))} />
          <Input type="date" value={form.expiry_date?.split("T")[0] ?? ""} onChange={(e) => handleChange("expiry_date", e.target.value)} />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Batal</Button>
          <Button onClick={handleSubmit}>Simpan</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

}


"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles, Calendar } from "lucide-react"

interface AddItemModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddItemModal({ open, onOpenChange }: AddItemModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "",
    location: "",
    purchaseDate: "",
    notes: "",
  })
  const [isGeneratingExpiry, setIsGeneratingExpiry] = useState(false)
  const [predictedExpiry, setPredictedExpiry] = useState("")

  const handleGenerateExpiry = async () => {
    if (!formData.name || !formData.location) return

    setIsGeneratingExpiry(true)

    // Simulate AI prediction - in real app, this would call Gemini API
    setTimeout(() => {
      const today = new Date()
      let daysToAdd = 7 // default

      // Simple prediction logic based on item type and location
      const itemName = formData.name.toLowerCase()
      const location = formData.location.toLowerCase()

      if (location === "freezer") {
        daysToAdd = itemName.includes("daging") || itemName.includes("ayam") ? 90 : 30
      } else if (location === "kulkas") {
        if (itemName.includes("susu") || itemName.includes("yogurt")) daysToAdd = 7
        else if (itemName.includes("sayur") || itemName.includes("buah")) daysToAdd = 5
        else daysToAdd = 14
      } else {
        if (itemName.includes("beras") || itemName.includes("tepung")) daysToAdd = 365
        else if (itemName.includes("minyak")) daysToAdd = 180
        else daysToAdd = 30
      }

      const expiryDate = new Date(today.getTime() + daysToAdd * 24 * 60 * 60 * 1000)
      setPredictedExpiry(expiryDate.toISOString().split("T")[0])
      setIsGeneratingExpiry(false)
    }, 2000)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In real app, this would save to Supabase
    console.log("Saving item:", { ...formData, expiryDate: predictedExpiry })
    onOpenChange(false)
    // Reset form
    setFormData({
      name: "",
      quantity: "",
      unit: "",
      location: "",
      purchaseDate: "",
      notes: "",
    })
    setPredictedExpiry("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah Item Baru</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Bahan</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Contoh: Tomat, Beras, Susu"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="quantity">Jumlah</Label>
              <Input
                id="quantity"
                value={formData.quantity}
                onChange={(e) => setFormData((prev) => ({ ...prev, quantity: e.target.value }))}
                placeholder="2"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Satuan</Label>
              <Select
                value={formData.unit}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, unit: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih satuan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kg">Kg</SelectItem>
                  <SelectItem value="gram">Gram</SelectItem>
                  <SelectItem value="liter">Liter</SelectItem>
                  <SelectItem value="ml">ML</SelectItem>
                  <SelectItem value="pcs">Pcs</SelectItem>
                  <SelectItem value="bungkus">Bungkus</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Lokasi Penyimpanan</Label>
            <Select
              value={formData.location}
              onValueChange={(value) => setFormData((prev) => ({ ...prev, location: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih lokasi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kulkas">Kulkas</SelectItem>
                <SelectItem value="freezer">Freezer</SelectItem>
                <SelectItem value="pantry">Pantry</SelectItem>
                <SelectItem value="meja">Meja Dapur</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="purchaseDate">Tanggal Beli</Label>
            <Input
              id="purchaseDate"
              type="date"
              value={formData.purchaseDate}
              onChange={(e) => setFormData((prev) => ({ ...prev, purchaseDate: e.target.value }))}
            />
          </div>

          {/* AI Expiry Prediction */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Prediksi Tanggal Kedaluwarsa</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGenerateExpiry}
                disabled={!formData.name || !formData.location || isGeneratingExpiry}
                className="gap-2 bg-transparent"
              >
                <Sparkles className="w-4 h-4" />
                {isGeneratingExpiry ? "Memprediksi..." : "Prediksi AI"}
              </Button>
            </div>
            {predictedExpiry && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2 text-blue-800">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Prediksi: {new Date(predictedExpiry).toLocaleDateString("id-ID")}</span>
                </div>
                <p className="text-sm text-blue-600 mt-1">Berdasarkan jenis bahan dan lokasi penyimpanan</p>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Catatan (Opsional)</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
              placeholder="Catatan tambahan..."
              rows={2}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Batal
            </Button>
            <Button type="submit" className="flex-1">
              Simpan Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ShoppingCart, Plus, Trash2, Share2, Download, MapPin, Sparkles } from "lucide-react"

const mockShoppingLists = [
  {
    id: 1,
    name: "Belanja Mingguan",
    items: [
      {
        id: 1,
        name: "Beras Premium",
        quantity: "5kg",
        price: 75000,
        checked: false,
        category: "Bahan Pokok",
        priority: "high",
      },
      {
        id: 2,
        name: "Ayam Fillet",
        quantity: "1kg",
        price: 45000,
        checked: false,
        category: "Protein",
        priority: "medium",
      },
      {
        id: 3,
        name: "Sayuran Mix",
        quantity: "1 paket",
        price: 25000,
        checked: true,
        category: "Sayuran",
        priority: "high",
      },
      { id: 4, name: "Susu UHT", quantity: "2L", price: 36000, checked: false, category: "Dairy", priority: "low" },
    ],
    totalBudget: 200000,
    estimatedTotal: 181000,
    stores: ["Superindo", "Ranch Market", "Hypermart"],
    createdAt: "2025-01-13",
  },
]

const categories = ["Bahan Pokok", "Protein", "Sayuran", "Buah", "Dairy", "Bumbu", "Snack", "Lainnya"]
const priorities = ["high", "medium", "low"]

export function ShoppingListGenerator() {
  const [lists, setLists] = useState(mockShoppingLists)
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    category: "",
    priority: "medium",
    estimatedPrice: "",
    notes: "",
  })
  const [showAddItem, setShowAddItem] = useState(false)

  const currentList = lists[0] // For demo, using first list

  const toggleItemCheck = (itemId: number) => {
    setLists((prev) =>
      prev.map((list) => ({
        ...list,
        items: list.items.map((item) => (item.id === itemId ? { ...item, checked: !item.checked } : item)),
      })),
    )
  }

  const addNewItem = () => {
    if (!newItem.name) return

    const item = {
      id: Date.now(),
      name: newItem.name,
      quantity: newItem.quantity,
      price: Number.parseInt(newItem.estimatedPrice) || 0,
      checked: false,
      category: newItem.category,
      priority: newItem.priority as "high" | "medium" | "low",
      notes: newItem.notes,
    }

    setLists((prev) =>
      prev.map((list) => ({
        ...list,
        items: [...list.items, item],
      })),
    )

    setNewItem({
      name: "",
      quantity: "",
      category: "",
      priority: "medium",
      estimatedPrice: "",
      notes: "",
    })
    setShowAddItem(false)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const generateSmartSuggestions = () => {
    // Simulate AI suggestions based on inventory
    const suggestions = [
      { name: "Tomat", reason: "Stok habis dalam 2 hari", category: "Sayuran" },
      { name: "Bawang Merah", reason: "Sering digunakan untuk resep", category: "Bumbu" },
      { name: "Telur", reason: "Protein murah dan serbaguna", category: "Protein" },
    ]
    return suggestions
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Daftar Belanja Cerdas
            </CardTitle>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Share2 className="w-4 h-4" />
                Bagikan
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Budget & Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="text-sm text-blue-600 font-medium">Budget</div>
              <div className="text-2xl font-bold text-blue-900">
                Rp {currentList.totalBudget.toLocaleString("id-ID")}
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-sm text-green-600 font-medium">Estimasi Total</div>
              <div className="text-2xl font-bold text-green-900">
                Rp {currentList.estimatedTotal.toLocaleString("id-ID")}
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-4">
              <div className="text-sm text-purple-600 font-medium">Sisa Budget</div>
              <div className="text-2xl font-bold text-purple-900">
                Rp {(currentList.totalBudget - currentList.estimatedTotal).toLocaleString("id-ID")}
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-purple-900">Saran AI Berdasarkan Inventaris</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {generateSmartSuggestions().map((suggestion, index) => (
                <div key={index} className="bg-white rounded-lg p-3 border border-purple-200">
                  <div className="font-medium text-sm">{suggestion.name}</div>
                  <div className="text-xs text-gray-600 mb-2">{suggestion.reason}</div>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    + Tambah ke List
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Shopping Items */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Items ({currentList.items.length})</h3>
              <Button size="sm" onClick={() => setShowAddItem(!showAddItem)} className="gap-2">
                <Plus className="w-4 h-4" />
                Tambah Item
              </Button>
            </div>

            {/* Add Item Form */}
            {showAddItem && (
              <Card className="border-dashed">
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        placeholder="Nama item"
                        value={newItem.name}
                        onChange={(e) => setNewItem((prev) => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Input
                        placeholder="Quantity (2kg, 1 liter, dll)"
                        value={newItem.quantity}
                        onChange={(e) => setNewItem((prev) => ({ ...prev, quantity: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Select
                        value={newItem.category}
                        onValueChange={(value) => setNewItem((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Input
                        type="number"
                        placeholder="Estimasi harga"
                        value={newItem.estimatedPrice}
                        onChange={(e) => setNewItem((prev) => ({ ...prev, estimatedPrice: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button onClick={addNewItem} className="flex-1">
                      Tambah Item
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddItem(false)}>
                      Batal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Items List */}
            <div className="space-y-2">
              {currentList.items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 p-3 border rounded-lg transition-all ${
                    item.checked ? "bg-gray-50 opacity-75" : "bg-white hover:shadow-sm"
                  }`}
                >
                  <Checkbox checked={item.checked} onCheckedChange={() => toggleItemCheck(item.id)} />

                  <div className="flex-1 min-w-0">
                    <div className={`font-medium ${item.checked ? "line-through text-gray-500" : ""}`}>{item.name}</div>
                    <div className="text-sm text-gray-600">
                      {item.quantity} • Rp {item.price.toLocaleString("id-ID")}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {item.category}
                    </Badge>
                    <Badge className={`text-xs ${getPriorityColor(item.priority)}`}>{item.priority}</Badge>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Store Suggestions */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-4 h-4 text-gray-600" />
              <span className="font-medium">Rekomendasi Toko Terdekat</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentList.stores.map((store, index) => (
                <div key={index} className="border rounded-lg p-3">
                  <div className="font-medium">{store}</div>
                  <div className="text-sm text-gray-600">2.3 km • Buka sampai 22:00</div>
                  <div className="text-xs text-green-600 mt-1">Estimasi hemat 15%</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

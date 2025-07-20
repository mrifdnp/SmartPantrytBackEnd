"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/personal/dashboard-header"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Trash2, Camera } from "lucide-react";

export default function StockPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  const inventory = [
    {
      id: 1,
      name: "Bayam",
      category: "Sayur",
      quantity: "200",
      unit: "g",
      storage: "Kulkas",
      dateIn: "2025-07-05",
      expireDate: "2025-07-09",
      status: "warning",
      imageUrl: "https://source.unsplash.com/100x100?spinach",
    },
    {
      id: 2,
      name: "Daging Ayam",
      category: "Protein",
      quantity: "1",
      unit: "kg",
      storage: "Freezer",
      dateIn: "2025-07-02",
      expireDate: "2025-07-10",
      status: "safe",
      imageUrl: "https://source.unsplash.com/100x100?chicken",
    },
  ];

  const stats = {
    totalItems: 12,
    totalValue: "Rp 1.250.000",
    soonExpired: 3,
    fastMoving: ["Telur", "Tepung"],
  };

  const aiRecommendations = [
    {
      original: "Bayam",
      suggestion: "Kangkung",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-600 mb-2">
          Dashboard / <span className="text-gray-900 font-medium">Inventory</span>
        </div>

        {/* Global Alerts */}
        <Card className="bg-gradient-to-r from-green-100 to-emerald-200 border-green-300">
          <CardContent className="py-4 flex justify-between items-center flex-wrap gap-2">
            <div className="text-gray-800 text-sm">
              ⚠️ <span className="font-bold">{stats.soonExpired} bahan</span> mendekati kadaluarsa
            </div>
            <div className="text-gray-800 text-sm">
              Total nilai stok: <span className="font-bold">{stats.totalValue}</span>
            </div>
            <div className="text-gray-800 text-sm">
              Fast-moving items:{" "}
              {stats.fastMoving.map((item) => (
                <Badge key={item} className="bg-green-200 text-green-700 mx-1">
                  {item}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2">
          <Button
            className="flex gap-2 bg-green-600 text-white hover:bg-green-700"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-4 h-4" /> Tambah Bahan
          </Button>
          <Button variant="outline" className="flex gap-2">
            <Trash2 className="w-4 h-4" /> Stock Out
          </Button>
          <Button variant="outline" className="flex gap-2">
            <Camera className="w-4 h-4" /> Scan Kamera
          </Button>
          <div className="flex-grow max-w-xs">
            <Input placeholder="Cari bahan..." />
          </div>
        </div>

        {/* Stats Widget */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-green-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Total Item</p>
              <p className="text-2xl font-bold text-green-700">{stats.totalItems}</p>
            </CardContent>
          </Card>
          <Card className="border-green-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Total Nilai Stok</p>
              <p className="text-2xl font-bold text-green-700">{stats.totalValue}</p>
            </CardContent>
          </Card>
          <Card className="border-green-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Segera Expired</p>
              <p className="text-2xl font-bold text-green-700">{stats.soonExpired}</p>
            </CardContent>
          </Card>
          <Card className="border-green-300 bg-white/80 backdrop-blur-sm">
            <CardContent className="p-4">
              <p className="text-xs text-gray-500">Fast-moving</p>
              <p className="text-sm text-green-700">
                {stats.fastMoving.join(", ")}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Inventory Table */}
        <div className="overflow-auto bg-white rounded-xl shadow border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Foto</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Nama</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Kategori</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Qty</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Lokasi</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Tgl Masuk</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Kadaluarsa</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Status</th>
                <th className="px-3 py-2 text-left font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id} className="even:bg-gray-50">
                  <td className="px-3 py-2">
                    <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded object-cover" />
                  </td>
                  <td className="px-3 py-2 font-medium text-gray-800">{item.name}</td>
                  <td className="px-3 py-2 text-gray-600">{item.category}</td>
                  <td className="px-3 py-2 text-gray-600">
                    {item.quantity} {item.unit}
                  </td>
                  <td className="px-3 py-2 text-gray-600">{item.storage}</td>
                  <td className="px-3 py-2 text-gray-600">{item.dateIn}</td>
                  <td className="px-3 py-2 text-gray-600">{item.expireDate}</td>
                  <td className="px-3 py-2">
                    {item.status === "safe" && (
                      <Badge className="bg-green-100 text-green-700">Aman</Badge>
                    )}
                    {item.status === "warning" && (
                      <Badge className="bg-yellow-100 text-yellow-700">Segera Digunakan</Badge>
                    )}
                    {item.status === "expired" && (
                      <Badge className="bg-red-100 text-red-700">Kadaluarsa</Badge>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <Button size="sm" variant="outline">Edit</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Recommendations */}
        {aiRecommendations.length > 0 && (
          <Card className="border-green-300">
            <CardContent className="py-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Rekomendasi Pengganti AI</h2>
              <ul className="list-disc list-inside text-gray-700 text-sm">
                {aiRecommendations.map((rec, i) => (
                  <li key={i}>
                    <span className="font-semibold">{rec.original}</span> habis?
                    Ganti dengan <span className="text-green-700 font-semibold">{rec.suggestion}</span>.
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Modal Add Item */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 w-full max-w-md space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Tambah Bahan Baru</h3>
              <Input placeholder="Nama Bahan" />
              <Input placeholder="Kategori" />
              <Input placeholder="Jumlah" />
              <Button className="w-full bg-green-600 text-white hover:bg-green-700">Simpan</Button>
              <Button variant="outline" className="w-full" onClick={() => setShowAddModal(false)}>
                Batal
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

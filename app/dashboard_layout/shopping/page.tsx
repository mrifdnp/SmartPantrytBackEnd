"use client";

import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/personal/dashboard-header"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Trash2,
  Plus,
  Mic,
  AlertCircle,
  ShoppingCart,
  RefreshCw,
  Leaf,
} from "lucide-react";

export default function BelanjaPage() {
  const lowStockItems = [
    { name: "Bayam", qty: "200", unit: "g", substitute: "Kangkung" },
    { name: "Telur", qty: "2", unit: "butir", substitute: "Tahu" },
  ];

  const recommendedFromRecipe = [
    { name: "Tomat", qty: "300", unit: "g" },
    { name: "Bawang Putih", qty: "50", unit: "g" },
  ];

  const [shoppingList, setShoppingList] = useState([
    { name: "Bayam", qty: "200", unit: "g" },
    { name: "Telur", qty: "2", unit: "butir" },
  ]);
  const [newItem, setNewItem] = useState("");

  const addToList = (name: string, qty = "", unit = "") => {
    setShoppingList((prev) => [...prev, { name, qty, unit }]);
  };

  const removeItem = (index: number) => {
    setShoppingList((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-lime-50 to-white">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <div className="text-sm text-green-900 mb-4">
          Dashboard / <span className="font-medium text-emerald-800">Belanja</span>
        </div>

        {/* Notifikasi Khusus */}
        <Card className="bg-gradient-to-r from-yellow-50 to-yellow-100 border border-yellow-200 shadow-md">
          <CardContent className="py-5 flex justify-between items-center flex-wrap gap-3">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">
                Besok hujan. Mungkin Anda tak sempat belanja. Mau cek bahan yang perlu dihabiskan?
              </span>
            </div>
            <Button
              size="sm"
              className="bg-yellow-400 hover:bg-yellow-500 text-white"
            >
              Lihat Bahan Mendesak
            </Button>
          </CardContent>
        </Card>

        {/* Bahan Menipis */}
        <Card className="bg-white/80 backdrop-blur-lg border border-emerald-200 shadow-lg rounded-2xl">
          <CardContent className="py-6 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <RefreshCw className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-emerald-800">
                Bahan Menipis
              </h2>
            </div>
            {lowStockItems.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border border-emerald-100 rounded-xl px-4 py-3 bg-gradient-to-r from-emerald-50 to-lime-50 hover:bg-emerald-100 transition"
              >
                <div>
                  <span className="font-semibold text-emerald-800">
                    {item.name}
                  </span>{" "}
                  tinggal {item.qty} {item.unit}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => addToList(item.substitute)}
                    className="border-emerald-400 text-emerald-700 bg-emerald-100 hover:bg-emerald-50"
                  >
                    Ganti: {item.substitute}
                  </Button>
                  <Button
                    size="sm"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => addToList(item.name, item.qty, item.unit)}
                  >
                    Tambah
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Rekomendasi dari Resep */}
        <Card className="bg-white/80 backdrop-blur-lg border border-emerald-200 shadow-lg rounded-2xl">
          <CardContent className="py-6 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="w-5 h-5 text-emerald-700" />
              <h2 className="text-xl font-bold text-emerald-800">
                Rekomendasi Belanja dari Resep
              </h2>
            </div>
            {recommendedFromRecipe.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border border-emerald-100 rounded-xl px-4 py-3 bg-gradient-to-r from-emerald-50 to-lime-50 hover:bg-emerald-100 transition"
              >
                <span className="text-emerald-800 font-medium">
                  {item.name} - {item.qty} {item.unit}
                </span>
                <Button
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => addToList(item.name, item.qty, item.unit)}
                >
                  Tambah
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Daftar Belanja */}
        <Card className="bg-white/80 backdrop-blur-lg border border-gray-200 shadow-lg rounded-2xl">
          <CardContent className="py-6 space-y-5">
            <div className="flex items-center gap-3 mb-2">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
              <h2 className="text-xl font-bold text-gray-800">
                Daftar Belanja
              </h2>
            </div>
            {shoppingList.map((item, i) => (
              <div
                key={i}
                className="flex justify-between items-center border border-gray-100 rounded-xl px-4 py-3 hover:bg-gray-50 transition"
              >
                <span className="text-gray-700">
                  {item.name} - {item.qty} {item.unit}
                </span>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeItem(i)}
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </Button>
              </div>
            ))}

            <div className="flex gap-2 mt-4">
              <Input
                placeholder="Nama Bahan"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className="flex-grow"
              />
              <Button
                onClick={() => {
                  if (newItem.trim() !== "") {
                    addToList(newItem);
                    setNewItem("");
                  }
                }}
                className="bg-emerald-600 hover:bg-emerald-700 text-white flex gap-1"
              >
                <Plus className="w-4 h-4" /> Tambah
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Eco Saver Widget */}
        <Card className="bg-gradient-to-r from-green-200 via-lime-200 to-green-100 border border-green-300 rounded-2xl shadow-xl">
          <CardContent className="py-5 flex justify-between items-center">
            <div className="flex items-center gap-2 text-green-800">
              <Leaf className="w-5 h-5" />
              <span className="text-sm">
                🌱 Anda menyelamatkan 5 bahan dari kadaluarsa bulan ini!
              </span>
            </div>
            <Badge className="bg-gradient-to-r from-emerald-600 to-lime-500 text-white">
              Eco Saver of the Month
            </Badge>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            variant="outline"
            className="flex gap-2 border-emerald-400 text-emerald-700 hover:bg-emerald-50"
          >
            <Mic className="w-4 h-4" /> Tambah via Suara
          </Button>
        </div>
      </main>
    </div>
  );
}

"use client";
import { DashboardHeader } from "@/components/dashboard/business/dashboard-header"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, ChefHat } from "lucide-react";

const recipes = [
  {
    id: 1,
    title: "Sup Tomat Segar",
    image: "#",
    description: "Sup tomat sederhana untuk menyelamatkan stok tomatmu sebelum kedaluwarsa.",
    availablePercentage: 80,
    ingredients: ["Tomat", "Bawang", "Minyak", "Air"],
  },
  {
    id: 2,
    title: "Tumis Buncis Pedas",
    image: "#",
    description: "Hanya butuh beberapa bahan sederhana dari pantry-mu!",
    availablePercentage: 100,
    ingredients: ["Buncis", "Cabai", "Bawang Putih"],
  },
  {
    id: 3,
    title: "Salad Buah Segar",
    image: "#",
    description: "Alternatif sehat untuk stok buah-buahanmu yang mendekati expired.",
    availablePercentage: 60,
    ingredients: ["Apel", "Jeruk", "Anggur", "Yoghurt"],
  },
];

export default function RecipePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-10 relative">
        {/* Animated blobs background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute top-40 left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-4">
            Saran Resep dari Stokmu
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-xl mx-auto">
            Temukan resep lezat berdasarkan bahan yang kamu punya. Kurangi food waste dan hemat biaya!
          </p>

          {/* Search bar and AI Button */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
            <Input placeholder="Cari resep atau bahan..." className="max-w-md" />
            <Button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white">
              <Lightbulb className="w-4 h-4" />
              Buat Resep dari Stok Saya
            </Button>
          </div>

          {/* Recipe grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-bold text-gray-800">{recipe.title}</h2>
                    <Badge
                      className={
                        recipe.availablePercentage >= 80
                          ? "bg-green-100 text-green-700"
                          : recipe.availablePercentage >= 50
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {recipe.availablePercentage}% bahan tersedia
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recipe.ingredients.map((ing) => (
                      <Badge key={ing} variant="outline" className="text-gray-500 border-gray-300">
                        {ing}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    <ChefHat className="w-4 h-4 mr-2" />
                    Lihat Resep
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

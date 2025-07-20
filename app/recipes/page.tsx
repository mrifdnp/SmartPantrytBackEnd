"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lightbulb, ChefHat } from "lucide-react"
import { supabase } from "@/lib/supabaseClient"
type Recipe = {
  id: string
  title: string
  description?: string
  cara_pembuatan?: string
  created_at?: string
}

export default function RecipePage() {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")

  const handleGenerateFromStock = async () => {
  
    setLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const token = session?.access_token
      if (!token) {
        alert("Kamu belum login.")
        return
      }

      const res = await fetch("/api/inventory", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const result = await res.json()
      const ingredients = result
        .filter((item: any) => item.quantity > 0)
        .map((item: any) => item.name)

      if (ingredients.length === 0) {
        alert("Kamu belum punya stok bahan.")
        return
      }

      const prompt = `Saya punya bahan berikut: ${ingredients.join(", ")}. Tolong buatkan satu resep lengkap dalam format berikut, gausah pake **,:

Nama Resep: ...
Deskripsi: ...
Cara Pembuatan:
1. ...
2. ...
3. ...
`

      // 4. Panggil Gemini API
      const geminiRes = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyD_Le_t0XHVqbswodRLeE98lUsJ1-m8jWU",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      )

      const data = await geminiRes.json()

      const resultText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ??
        "Tidak bisa menghasilkan resep."

      // Regex parsing
      const titleMatch = resultText.match(/Nama Resep:\s*(.+)/i)
      const descriptionMatch = resultText.match(/Deskripsi:\s*(.+?)(?:\n|Cara Pembuatan:)/is)
      const caraPembuatanMatch = resultText.match(/Cara Pembuatan:\s*((.|\n)*)/i)

      const title = titleMatch?.[1]?.trim() ?? "Resep dari AI"
      const description = descriptionMatch?.[1]?.trim() ?? ""

      const rawSteps = caraPembuatanMatch?.[1]?.trim() ?? resultText
      const formattedSteps = rawSteps
        .split(/(?=\d+\.\s)/)
       .map((step: string) => step.trim())
        .join("\n")

      const newRecipe: Recipe = {
        id: crypto.randomUUID(),
        title,
        description,
        cara_pembuatan: formattedSteps,
        created_at: new Date().toISOString(),
      }


      // 5. Simpan ke local state
      setRecipes((prev) => [newRecipe, ...prev])

      // 6. Simpan ke database
      await fetch("/api/resep", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecipe),
      })
    } catch (err) {
      console.error("🚨 Gagal generate resep:", err)
    } finally {
      setLoading(false)
    }
  }




  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/resep")
        const contentType = res.headers.get("content-type")
        if (!res.ok || !contentType?.includes("application/json")) {
          throw new Error("Invalid JSON")
        }
        const data = await res.json()
        setRecipes(data)
      } catch (error) {
        console.error("Failed to fetch recipes:", error)
        setRecipes([])
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])
  const [expandedRecipeIds, setExpandedRecipeIds] = useState<Set<string>>(new Set())
  const toggleRecipe = (id: string) => {
    setExpandedRecipeIds(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }
const filteredRecipes = recipes.filter((recipe) => {
  const query = searchQuery.toLowerCase()
  return (
    recipe.title.toLowerCase().includes(query) ||
    recipe.description?.toLowerCase().includes(query) ||
    recipe.cara_pembuatan?.toLowerCase().includes(query)
  )
})
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-10 relative">
        {/* Animated blobs */}
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

          <div className="flex flex-col md:flex-row gap-4 justify-center mb-10">
            <Input
  placeholder="Cari resep atau bahan..."
  className="max-w-md"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
/>

            <Button
              onClick={handleGenerateFromStock}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
            >
              <Lightbulb className="w-4 h-4" />
              Buat Resep dari Stok Saya
            </Button>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Memuat resep...</p>
          ) : recipes.length === 0 ? (
            <p className="text-center text-gray-500">Belum ada resep.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {filteredRecipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                >
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-bold text-gray-800">{recipe.title}</h2>
                      <Badge className="bg-green-100 text-green-700">Resep</Badge>
                    </div>
                    {recipe.description && (
                      <p className="text-gray-600 text-sm mb-4">{recipe.description}</p>
                    )}
                    {expandedRecipeIds.has(recipe.id) && recipe.cara_pembuatan && (
                      <div className="text-sm text-gray-700 mb-4">
                        <p className="font-semibold">Cara Pembuatan:</p>
                        {recipe.cara_pembuatan.split("\n").map((line, idx) => (
                          <p key={idx} className="mb-2">{line}</p>
                        ))}
                      </div>
                    )}

                    <Button
                      onClick={() => toggleRecipe(recipe.id)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      <ChefHat className="w-4 h-4 mr-2" />
                      {expandedRecipeIds.has(recipe.id) ? "Sembunyikan Resep" : "Lihat Resep"}
                    </Button>

                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
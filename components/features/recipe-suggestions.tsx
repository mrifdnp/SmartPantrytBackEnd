"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChefHat, Clock, Users, Sparkles, Heart, BookOpen } from "lucide-react"

const recipeCategories = [
  { id: "expiring", label: "Bahan Akan Expired", count: 5 },
  { id: "trending", label: "Trending", count: 12 },
  { id: "healthy", label: "Sehat", count: 8 },
  { id: "quick", label: "Cepat (<30 menit)", count: 15 },
]

const mockRecipes = [
  {
    id: 1,
    title: "Sup Tomat Segar",
    description: "Manfaatkan tomat yang akan expired menjadi sup yang lezat",
    cookTime: "25 menit",
    servings: 4,
    difficulty: "Mudah",
    ingredients: ["Tomat (2kg)", "Bawang (1 buah)", "Wortel (200g)"],
    aiScore: 95,
    category: "expiring",
    image: "/placeholder.svg?height=200&width=300",
    nutrition: { calories: 180, protein: "8g", carbs: "25g", fat: "5g" },
    tags: ["Vegetarian", "Rendah Kalori", "Anti Waste"],
  },
  {
    id: 2,
    title: "Nasi Goreng Protein",
    description: "Kombinasi sempurna beras dan ayam dengan sayuran",
    cookTime: "20 menit",
    servings: 2,
    difficulty: "Mudah",
    ingredients: ["Beras (300g)", "Ayam (200g)", "Telur (2 butir)"],
    aiScore: 88,
    category: "trending",
    image: "/placeholder.svg?height=200&width=300",
    nutrition: { calories: 420, protein: "25g", carbs: "45g", fat: "12g" },
    tags: ["High Protein", "Comfort Food"],
  },
  {
    id: 3,
    title: "Smoothie Buah Mixed",
    description: "Minuman sehat dari buah yang akan expired",
    cookTime: "5 menit",
    servings: 1,
    difficulty: "Sangat Mudah",
    ingredients: ["Pisang (2 buah)", "Susu (250ml)", "Madu (1 sdm)"],
    aiScore: 92,
    category: "healthy",
    image: "/placeholder.svg?height=200&width=300",
    nutrition: { calories: 250, protein: "12g", carbs: "35g", fat: "6g" },
    tags: ["Breakfast", "Vitamin C", "Energizing"],
  },
]

export function RecipeSuggestions() {
  const [activeCategory, setActiveCategory] = useState("expiring")
  const [favoriteRecipes, setFavoriteRecipes] = useState<number[]>([])

  const filteredRecipes = mockRecipes.filter((recipe) => recipe.category === activeCategory)

  const toggleFavorite = (recipeId: number) => {
    setFavoriteRecipes((prev) => (prev.includes(recipeId) ? prev.filter((id) => id !== recipeId) : [...prev, recipeId]))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChefHat className="w-5 h-5" />
          Saran Resep AI
          <Badge className="bg-purple-100 text-purple-700">
            <Sparkles className="w-3 h-3 mr-1" />
            Powered by Gemini
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeCategory} onValueChange={setActiveCategory}>
          <TabsList className="grid w-full grid-cols-4">
            {recipeCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id} className="relative">
                {category.label}
                <Badge variant="secondary" className="ml-1 text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeCategory} className="mt-6">
            <div className="grid gap-6">
              {filteredRecipes.map((recipe) => (
                <div key={recipe.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex gap-4">
                    <img
                      src={recipe.image || "/placeholder.svg"}
                      alt={recipe.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{recipe.title}</h3>
                          <p className="text-gray-600 text-sm">{recipe.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className="bg-green-100 text-green-700">AI Score: {recipe.aiScore}%</Badge>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleFavorite(recipe.id)}
                            className={favoriteRecipes.includes(recipe.id) ? "text-red-500" : "text-gray-400"}
                          >
                            <Heart className={`w-4 h-4 ${favoriteRecipes.includes(recipe.id) ? "fill-current" : ""}`} />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {recipe.cookTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {recipe.servings} porsi
                        </span>
                        <Badge variant="outline">{recipe.difficulty}</Badge>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-600 mb-1">Bahan yang digunakan:</p>
                        <div className="flex flex-wrap gap-1">
                          {recipe.ingredients.map((ingredient, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {ingredient}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {recipe.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          {recipe.nutrition.calories} kal • {recipe.nutrition.protein} protein
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="gap-1 bg-transparent">
                            <BookOpen className="w-3 h-3" />
                            Lihat Resep
                          </Button>
                          <Button size="sm" className="gap-1">
                            <ChefHat className="w-3 h-3" />
                            Masak Sekarang
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

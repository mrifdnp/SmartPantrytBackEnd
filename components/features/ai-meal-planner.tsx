"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Brain, Utensils, TrendingUp, Users, Clock, Zap, Target } from "lucide-react"

const mealPlanData = {
  weeklyBudget: 500000,
  currentSpend: 320000,
  calorieTarget: 2000,
  currentCalories: 1850,
  nutritionGoals: {
    protein: { target: 150, current: 120 },
    carbs: { target: 250, current: 200 },
    fat: { target: 65, current: 55 },
    fiber: { target: 25, current: 18 },
  },
}

const weeklyPlan = [
  {
    day: "Senin",
    date: "2025-01-13",
    meals: {
      breakfast: {
        name: "Overnight Oats + Buah",
        calories: 350,
        ingredients: ["Oats", "Susu", "Pisang", "Madu"],
        prepTime: 5,
        cost: 15000,
        nutrition: { protein: 12, carbs: 45, fat: 8 },
      },
      lunch: {
        name: "Nasi Ayam Teriyaki",
        calories: 520,
        ingredients: ["Beras", "Ayam", "Brokoli", "Wortel"],
        prepTime: 25,
        cost: 35000,
        nutrition: { protein: 35, carbs: 55, fat: 12 },
      },
      dinner: {
        name: "Sup Tomat + Roti",
        calories: 380,
        ingredients: ["Tomat", "Bawang", "Roti Gandum"],
        prepTime: 20,
        cost: 20000,
        nutrition: { protein: 15, carbs: 50, fat: 10 },
      },
    },
    totalCalories: 1250,
    totalCost: 70000,
    prepTime: 50,
  },
  // More days...
]

const dietaryPreferences = [
  { id: "vegetarian", label: "Vegetarian", selected: false },
  { id: "vegan", label: "Vegan", selected: false },
  { id: "keto", label: "Keto", selected: false },
  { id: "paleo", label: "Paleo", selected: false },
  { id: "mediterranean", label: "Mediterranean", selected: true },
  { id: "low-carb", label: "Low Carb", selected: false },
]

const healthGoals = [
  { id: "weight-loss", label: "Weight Loss", icon: "⬇️" },
  { id: "muscle-gain", label: "Muscle Gain", icon: "💪" },
  { id: "maintenance", label: "Maintenance", icon: "⚖️" },
  { id: "energy-boost", label: "Energy Boost", icon: "⚡" },
]

export function AIMealPlanner() {
  const [selectedGoal, setSelectedGoal] = useState("maintenance")
  const [familySize, setFamilySize] = useState(2)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateMealPlan = () => {
    setIsGenerating(true)
    setTimeout(() => setIsGenerating(false), 3000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5" />
          AI Meal Planner
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <Zap className="w-3 h-3 mr-1" />
            Smart Planning
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="planner" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="planner">Weekly Planner</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition Goals</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="planner" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-900">Budget</span>
                </div>
                <div className="text-xl font-bold text-green-900">Rp {mealPlanData.currentSpend.toLocaleString()}</div>
                <div className="text-xs text-green-700">of Rp {mealPlanData.weeklyBudget.toLocaleString()}</div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Utensils className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-900">Calories</span>
                </div>
                <div className="text-xl font-bold text-blue-900">{mealPlanData.currentCalories}</div>
                <div className="text-xs text-blue-700">of {mealPlanData.calorieTarget} target</div>
              </div>

              <div className="bg-purple-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-900">Prep Time</span>
                </div>
                <div className="text-xl font-bold text-purple-900">45 min</div>
                <div className="text-xs text-purple-700">avg per day</div>
              </div>

              <div className="bg-orange-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-orange-600" />
                  <span className="text-sm font-medium text-orange-900">Family Size</span>
                </div>
                <div className="text-xl font-bold text-orange-900">{familySize}</div>
                <div className="text-xs text-orange-700">people</div>
              </div>
            </div>

            {/* Generate Controls */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <div>
                <h3 className="font-semibold">Generate New Meal Plan</h3>
                <p className="text-sm text-gray-600">
                  AI akan membuat rencana makan berdasarkan inventaris dan preferensi Anda
                </p>
              </div>
              <Button onClick={generateMealPlan} disabled={isGenerating} className="gap-2">
                <Brain className={`w-4 h-4 ${isGenerating ? "animate-pulse" : ""}`} />
                {isGenerating ? "Generating..." : "Generate Plan"}
              </Button>
            </div>

            {/* Weekly Calendar */}
            <div className="space-y-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                This Week's Plan
              </h3>

              {weeklyPlan.map((day) => (
                <Card key={day.day} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold">{day.day}</h4>
                        <p className="text-sm text-gray-600">{day.date}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{day.totalCalories} cal</div>
                        <div className="text-sm text-gray-600">Rp {day.totalCost.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.entries(day.meals).map(([mealType, meal]) => (
                        <div key={mealType} className="bg-gray-50 rounded-lg p-3">
                          <div className="font-medium capitalize mb-2">{mealType}</div>
                          <div className="text-sm font-semibold mb-1">{meal.name}</div>
                          <div className="text-xs text-gray-600 mb-2">
                            {meal.calories} cal • {meal.prepTime} min • Rp {meal.cost.toLocaleString()}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {meal.ingredients.slice(0, 3).map((ingredient, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {ingredient}
                              </Badge>
                            ))}
                            {meal.ingredients.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{meal.ingredients.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Dietary Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dietaryPreferences.map((pref) => (
                    <div key={pref.id} className="flex items-center justify-between">
                      <span>{pref.label}</span>
                      <Badge className={pref.selected ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                        {pref.selected ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Health Goals</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {healthGoals.map((goal) => (
                    <div
                      key={goal.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedGoal === goal.id ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedGoal(goal.id)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{goal.icon}</span>
                        <span className="font-medium">{goal.label}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Family Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">Family Size</label>
                    <Select value={familySize.toString()} onValueChange={(v) => setFamilySize(Number(v))}>
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size} {size === 1 ? "person" : "people"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">Weekly Budget</label>
                    <Input type="number" defaultValue={500000} className="mt-1" />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Cooking Skill</label>
                    <Select defaultValue="intermediate">
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="expert">Expert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nutrition" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(mealPlanData.nutritionGoals).map(([nutrient, data]) => (
                <Card key={nutrient}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold capitalize">{nutrient}</h3>
                      <Badge variant="outline">
                        {data.current}g / {data.target}g
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((data.current / data.target) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {Math.round((data.current / data.target) * 100)}% of daily goal
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Nutrition Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="font-medium text-green-900">✅ Good Progress</div>
                    <div className="text-sm text-green-800">
                      Your protein intake is on track! Keep including lean meats and legumes.
                    </div>
                  </div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="font-medium text-yellow-900">⚠️ Needs Attention</div>
                    <div className="text-sm text-yellow-800">
                      Consider adding more fiber-rich foods like vegetables and whole grains.
                    </div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="font-medium text-blue-900">💡 Suggestion</div>
                    <div className="text-sm text-blue-800">
                      Try adding avocado or nuts to increase healthy fat intake.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5" />
                  <span className="font-medium">Nutrition Score</span>
                </div>
                <div className="text-3xl font-bold">87%</div>
                <div className="text-sm opacity-90">+5% from last week</div>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5" />
                  <span className="font-medium">Goal Achievement</span>
                </div>
                <div className="text-3xl font-bold">92%</div>
                <div className="text-sm opacity-90">Excellent progress</div>
              </div>

              <div className="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Avg Prep Time</span>
                </div>
                <div className="text-3xl font-bold">32 min</div>
                <div className="text-sm opacity-90">-8 min from target</div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weekly Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl">📊</div>
                    <div>
                      <div className="font-medium">Meal Variety Score: 8.5/10</div>
                      <div className="text-sm text-gray-600">
                        Great job incorporating diverse ingredients! Try adding more international cuisines.
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl">💰</div>
                    <div>
                      <div className="font-medium">Budget Efficiency: 94%</div>
                      <div className="text-sm text-gray-600">
                        You're staying within budget while maintaining nutritional goals. Excellent planning!
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
                    <div className="text-2xl">⏱️</div>
                    <div>
                      <div className="font-medium">Time Optimization: 85%</div>
                      <div className="text-sm text-gray-600">
                        Consider meal prep on Sundays to reduce daily cooking time by 40%.
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

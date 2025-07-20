"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  BarChart,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingDown, Leaf, DollarSign, Target, Award, AlertTriangle, Calendar, Download } from "lucide-react"

// Mock data for analytics
const wasteData = [
  { month: "Jan", waste: 2.5, saved: 15000, target: 2.0 },
  { month: "Feb", waste: 2.2, saved: 18000, target: 2.0 },
  { month: "Mar", waste: 1.8, saved: 22000, target: 2.0 },
  { month: "Apr", waste: 1.5, saved: 28000, target: 2.0 },
  { month: "Mei", waste: 1.2, saved: 32000, target: 2.0 },
  { month: "Jun", waste: 0.8, saved: 38000, target: 2.0 },
]

const categoryWaste = [
  { name: "Sayuran", value: 35, color: "#10b981" },
  { name: "Buah", value: 25, color: "#f59e0b" },
  { name: "Dairy", value: 20, color: "#3b82f6" },
  { name: "Protein", value: 12, color: "#ef4444" },
  { name: "Lainnya", value: 8, color: "#8b5cf6" },
]

const wasteReasons = [
  { reason: "Expired sebelum digunakan", percentage: 45, items: 28 },
  { reason: "Kualitas menurun", percentage: 30, items: 18 },
  { reason: "Porsi berlebih", percentage: 15, items: 9 },
  { reason: "Lupa ada di inventory", percentage: 10, items: 6 },
]

const achievements = [
  { title: "Zero Waste Week", description: "Tidak ada limbah selama 1 minggu", achieved: true, date: "2025-01-05" },
  { title: "50% Reduction", description: "Kurangi limbah 50% dari bulan lalu", achieved: true, date: "2025-01-01" },
  { title: "Green Warrior", description: "Hemat Rp 100K dari mengurangi limbah", achieved: false, progress: 85 },
  { title: "Perfect Planning", description: "Prediksi inventory 95% akurat", achieved: false, progress: 92 },
]

export function WasteAnalytics() {
  const [timeRange, setTimeRange] = useState("6months")

  const currentMonth = wasteData[wasteData.length - 1]
  const previousMonth = wasteData[wasteData.length - 2]
  const wasteReduction = (((previousMonth.waste - currentMonth.waste) / previousMonth.waste) * 100).toFixed(1)
  const totalSavings = wasteData.reduce((sum, month) => sum + month.saved, 0)

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-900">{currentMonth.waste}kg</div>
                <div className="text-sm text-green-700">Limbah Bulan Ini</div>
                <div className="text-xs text-green-600">-{wasteReduction}% vs bulan lalu</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-900">Rp {currentMonth.saved.toLocaleString("id-ID")}</div>
                <div className="text-sm text-blue-700">Penghematan Bulan Ini</div>
                <div className="text-xs text-blue-600">Total: Rp {totalSavings.toLocaleString("id-ID")}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-200 bg-purple-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-900">94%</div>
                <div className="text-sm text-purple-700">Zero Waste Score</div>
                <div className="text-xs text-purple-600">Target: 95%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-900">8/10</div>
                <div className="text-sm text-orange-700">Target Tercapai</div>
                <div className="text-xs text-orange-600">Bulan ini</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <BarChart className="w-5 h-5" />
              Analytics Limbah Makanan
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Download className="w-4 h-4" />
                Export Report
              </Button>
              <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                <Calendar className="w-4 h-4" />
                Custom Range
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="trends" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="trends">Trend Limbah</TabsTrigger>
              <TabsTrigger value="categories">Kategori</TabsTrigger>
              <TabsTrigger value="reasons">Penyebab</TabsTrigger>
              <TabsTrigger value="achievements">Pencapaian</TabsTrigger>
            </TabsList>

            <TabsContent value="trends" className="space-y-6">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={wasteData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        name === "waste" ? `${value}kg` : `Rp ${value.toLocaleString("id-ID")}`,
                        name === "waste" ? "Limbah" : name === "saved" ? "Penghematan" : "Target",
                      ]}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="waste" stroke="#ef4444" strokeWidth={3} name="Limbah (kg)" />
                    <Line type="monotone" dataKey="target" stroke="#f59e0b" strokeDasharray="5 5" name="Target (kg)" />
                    <Line
                      type="monotone"
                      dataKey="saved"
                      stroke="#10b981"
                      strokeWidth={2}
                      name="Penghematan (Rp)"
                      yAxisId="right"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="text-sm text-green-600 font-medium">Trend Reduction</div>
                  <div className="text-2xl font-bold text-green-900">-{wasteReduction}%</div>
                  <div className="text-xs text-green-600">Bulan ini vs sebelumnya</div>
                </div>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="text-sm text-blue-600 font-medium">Avg. Monthly Waste</div>
                  <div className="text-2xl font-bold text-blue-900">1.7kg</div>
                  <div className="text-xs text-blue-600">6 bulan terakhir</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="text-sm text-purple-600 font-medium">Best Month</div>
                  <div className="text-2xl font-bold text-purple-900">Juni</div>
                  <div className="text-xs text-purple-600">0.8kg limbah</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryWaste}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryWaste.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Persentase"]} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Detail per Kategori</h3>
                  {categoryWaste.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }} />
                        <span className="font-medium">{category.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{category.value}%</div>
                        <div className="text-sm text-gray-600">~{((category.value * 0.8) / 10).toFixed(1)}kg</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reasons" className="space-y-6">
              <div className="space-y-4">
                <h3 className="font-semibold">Penyebab Utama Limbah Makanan</h3>
                {wasteReasons.map((reason, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{reason.reason}</span>
                      <div className="text-right">
                        <span className="font-bold">{reason.percentage}%</span>
                        <span className="text-sm text-gray-600 ml-2">({reason.items} items)</span>
                      </div>
                    </div>
                    <Progress value={reason.percentage} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-900">Rekomendasi Perbaikan</h4>
                    <ul className="text-sm text-yellow-800 mt-2 space-y-1">
                      <li>• Aktifkan notifikasi untuk item yang akan expired</li>
                      <li>• Gunakan fitur meal planning untuk menghabiskan stok</li>
                      <li>• Atur reminder untuk cek inventory secara berkala</li>
                      <li>• Pertimbangkan untuk kurangi pembelian sayuran segar</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="achievements" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement, index) => (
                  <Card
                    key={index}
                    className={achievement.achieved ? "border-green-200 bg-green-50" : "border-gray-200"}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            achievement.achieved ? "bg-green-500" : "bg-gray-300"
                          }`}
                        >
                          <Award className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold">{achievement.title}</h3>
                            {achievement.achieved && <Badge className="bg-green-100 text-green-800">Tercapai</Badge>}
                          </div>
                          <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>

                          {achievement.achieved ? (
                            <div className="text-xs text-green-600">
                              Dicapai pada {new Date(achievement.date).toLocaleDateString("id-ID")}
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Progress</span>
                                <span>{achievement.progress}%</span>
                              </div>
                              <Progress value={achievement.progress} className="h-2" />
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

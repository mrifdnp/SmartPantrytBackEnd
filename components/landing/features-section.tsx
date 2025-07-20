"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Scan, Brain, Bell, ChefHat, BarChart3, Smartphone, Shield, Zap, Users, TrendingUp } from "lucide-react"

const features = [
  {
    icon: Scan,
    title: "OCR Scanner Cerdas",
    description: "Scan struk belanja atau foto produk untuk input otomatis ke inventaris",
    color: "from-blue-500 to-cyan-500",
    category: "Core",
  },
  {
    icon: Brain,
    title: "Prediksi AI Gemini",
    description: "AI memprediksi masa simpan berdasarkan jenis bahan dan lokasi penyimpanan",
    color: "from-purple-500 to-pink-500",
    category: "AI",
  },
  {
    icon: Bell,
    title: "Notifikasi Multi-Channel",
    description: "Pengingat via push notification, email, dan WhatsApp sebelum expired",
    color: "from-green-500 to-emerald-500",
    category: "Smart",
  },
  {
    icon: ChefHat,
    title: "Saran Resep AI",
    description: "Rekomendasi resep berdasarkan bahan yang akan kedaluwarsa",
    color: "from-orange-500 to-red-500",
    category: "AI",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description: "Laporan food cost, waste tracking, dan analisis profitabilitas menu",
    color: "from-indigo-500 to-purple-500",
    category: "Business",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description: "Akses dari mana saja dengan interface yang optimal di semua device",
    color: "from-teal-500 to-green-500",
    category: "Core",
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Enkripsi end-to-end dan backup otomatis untuk keamanan data maksimal",
    color: "from-gray-500 to-slate-500",
    category: "Security",
  },
  {
    icon: Zap,
    title: "Real-time Sync",
    description: "Sinkronisasi real-time untuk tim dan keluarga yang berbagi inventaris",
    color: "from-yellow-500 to-orange-500",
    category: "Smart",
  },
  {
    icon: Users,
    title: "Multi-User Collaboration",
    description: "Kelola inventaris bersama tim atau keluarga dengan role management",
    color: "from-pink-500 to-rose-500",
    category: "Collaboration",
  },
]

export function FeaturesSection() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState("All")
  const sectionRef = useRef<HTMLDivElement>(null)

  const categories = ["All", "Core", "AI", "Smart", "Business", "Security", "Collaboration"]

  const filteredFeatures =
    selectedCategory === "All" ? features : features.filter((feature) => feature.category === selectedCategory)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleItems((prev) => [...prev, index])
          }
        })
      },
      { threshold: 0.1 },
    )

    const items = sectionRef.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [filteredFeatures])

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">Fitur Lengkap</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Teknologi Terdepan untuk
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Manajemen Pantry Modern
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dilengkapi dengan AI, OCR, dan analytics canggih untuk mengoptimalkan pengelolaan inventaris makanan Anda
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map((feature, index) => {
            const Icon = feature.icon
            const isVisible = visibleItems.includes(index)

            return (
              <Card
                key={`${feature.title}-${selectedCategory}`}
                data-index={index}
                className={`group hover:shadow-xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                    <Badge variant="outline" className="text-xs">
                      {feature.category}
                    </Badge>
                  </div>

                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 text-green-600 font-medium mb-4">
            <TrendingUp className="w-5 h-5" />
            <span>Dan masih banyak fitur lainnya yang terus berkembang</span>
          </div>
        </div>
      </div>
    </section>
  )
}

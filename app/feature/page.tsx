"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Scan,
  Brain,
  Bell,
  ChefHat,
  BarChart3,
  Smartphone,
  Shield,
  Zap,
  Users,
  TrendingUp,
  Leaf,
  Wallet,
  Dna,
  BotIcon as Robot,
  Cloud,
  Camera,
  Globe,
  CookingPot,
  Thermometer,
  PiggyBank,
} from "lucide-react";
import { LandingHeader } from "@/components/landing/landing-header";
import { Footer } from "@/components/landing/footer";

const features = [
  {
    icon: Scan,
    title: "OCR Scanner Cerdas",
    description:
      "Scan struk belanja atau foto produk untuk input otomatis ke inventaris Anda.",
    color: "from-blue-500 to-cyan-500",
    category: "Core",
  },
  {
    icon: Brain,
    title: "Prediksi AI Gemini",
    description:
      "AI memprediksi masa simpan berdasarkan jenis bahan dan lokasi penyimpanan.",
    color: "from-purple-500 to-pink-500",
    category: "AI",
  },
  {
    icon: Bell,
    title: "Notifikasi Multi-Channel",
    description:
      "Pengingat via push notification, email, dan WhatsApp sebelum expired.",
    color: "from-green-500 to-emerald-500",
    category: "Smart",
  },
  {
    icon: ChefHat,
    title: "Saran Resep AI",
    description:
      "Rekomendasi resep berdasarkan bahan yang akan kedaluwarsa atau tersedia.",
    color: "from-orange-500 to-red-500",
    category: "AI",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reporting",
    description:
      "Laporan food cost, waste tracking, dan analisis profitabilitas menu.",
    color: "from-indigo-500 to-purple-500",
    category: "Business",
  },
  {
    icon: Smartphone,
    title: "Mobile Responsive",
    description:
      "Akses dari mana saja dengan interface yang optimal di semua device.",
    color: "from-teal-500 to-green-500",
    category: "Core",
  },
  {
    icon: Shield,
    title: "Data Security",
    description:
      "Enkripsi end-to-end dan backup otomatis untuk keamanan data maksimal.",
    color: "from-gray-500 to-slate-500",
    category: "Security",
  },
  {
    icon: Zap,
    title: "Real-time Sync",
    description:
      "Sinkronisasi real-time untuk tim dan keluarga yang berbagi inventaris.",
    color: "from-yellow-500 to-orange-500",
    category: "Smart",
  },
  {
    icon: Users,
    title: "Multi-User Collaboration",
    description:
      "Kelola inventaris bersama tim atau keluarga dengan role management.",
    color: "from-pink-500 to-rose-500",
    category: "Collaboration",
  },
  {
    icon: Leaf,
    title: "Carbon Footprint Tracker",
    description:
      "Lacak jejak karbon dari makanan Anda untuk pilihan yang lebih berkelanjutan.",
    color: "from-lime-500 to-green-600",
    category: "Smart",
  },
  {
    icon: Wallet,
    title: "Budget Optimization",
    description:
      "Optimalkan pengeluaran makanan Anda dengan analisis dan saran cerdas.",
    color: "from-amber-500 to-orange-600",
    category: "Business",
  },
  {
    icon: Dna,
    title: "Nutrition DNA Analysis",
    description:
      "Personalisasi rekomendasi makanan berdasarkan profil genetik Anda.",
    color: "from-red-500 to-purple-600",
    category: "AI",
  },
  {
    icon: Robot,
    title: "Kitchen Robot Integration",
    description:
      "Integrasi dengan robot dapur untuk otomatisasi tugas-tugas tertentu.",
    color: "from-gray-700 to-gray-900",
    category: "IoT",
  },
  {
    icon: Cloud,
    title: "Offline Mode",
    description:
      "Akses dan kelola inventaris Anda bahkan tanpa koneksi internet.",
    color: "from-sky-500 to-blue-600",
    category: "Core",
  },
  {
    icon: Camera,
    title: "AR Nutrition Scanner",
    description:
      "Scan produk dengan AR untuk melihat informasi nutrisi real-time.",
    color: "from-fuchsia-500 to-purple-600",
    category: "AI",
  },
  {
    icon: Globe,
    title: "Food DNA Tracking",
    description: "Lacak asal-usul makanan Anda dari pertanian hingga piring.",
    color: "from-emerald-500 to-teal-600",
    category: "Smart",
  },
  {
    icon: CookingPot,
    title: "AI Meal Planner",
    description:
      "Perencanaan makanan mingguan otomatis berdasarkan inventaris dan preferensi.",
    color: "from-rose-500 to-red-600",
    category: "AI",
  },
  {
    icon: Thermometer,
    title: "Climate-Smart Storage",
    description:
      "Saran penyimpanan adaptif cuaca untuk memperpanjang masa simpan.",
    color: "from-cyan-500 to-blue-600",
    category: "Smart",
  },
  {
    icon: PiggyBank,
    title: "Food Investment Platform",
    description:
      "Platform untuk berinvestasi dalam produk makanan berkelanjutan.",
    color: "from-green-700 to-lime-700",
    category: "Business",
  },
];

export default function FeaturesPage() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(
              entry.target.getAttribute("data-index") || "0"
            );
            setVisibleItems((prev) => [...prev, index]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const items = sectionRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-50">
      <LandingHeader />
      <div className="container mx-auto px-4 py-20 md:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 hover:bg-blue-200">
            Fitur Lengkap
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Teknologi Terdepan untuk
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Manajemen Pantry Modern
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dilengkapi dengan AI, OCR, dan analytics canggih untuk
            mengoptimalkan pengelolaan inventaris makanan Anda
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isVisible = visibleItems.includes(index);

            return (
              <Card
                key={feature.title}
                data-index={index}
                className={`group hover:shadow-xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
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
                    <h3 className="text-xl font-bold text-gray-900">
                      {feature.title}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {feature.category}
                    </Badge>
                  </div>

                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
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
      <Footer/>
    </section>
  );
}

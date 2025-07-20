"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, ArrowRight, Star } from "lucide-react"

const plans = [
  {
    name: "Personal",
    price: "Gratis",
    period: "selamanya",
    description: "Untuk rumah tangga dan penggunaan pribadi",
    features: [
      "Hingga 50 item inventaris",
      "Prediksi masa simpan AI",
      "Notifikasi dasar",
      "Saran resep sederhana",
      "Mobile app",
    ],
    cta: "Mulai Gratis",
    popular: false,
    color: "border-gray-200",
  },
  {
    name: "Business",
    price: "Rp 299K",
    period: "/bulan",
    description: "Untuk restoran, kafe, dan bisnis F&B",
    features: [
      "Inventaris unlimited",
      "OCR scanner premium",
      "Analytics & reporting lengkap",
      "Multi-user collaboration",
      "Integrasi WhatsApp & Email",
      "Priority support",
      "Export data",
    ],
    cta: "Coba 14 Hari Gratis",
    popular: true,
    color: "border-green-500",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "Untuk chain restaurant dan enterprise",
    features: [
      "Semua fitur Business",
      "Custom integration",
      "Dedicated account manager",
      "On-premise deployment",
      "Custom training",
      "SLA guarantee",
    ],
    cta: "Hubungi Sales",
    popular: false,
    color: "border-purple-500",
  },
]

export function PricingPreview() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 hover:bg-green-200">Harga Terjangkau</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Pilih Paket yang
            </span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Sesuai Kebutuhan Anda
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mulai gratis untuk penggunaan pribadi, atau pilih paket bisnis untuk fitur lengkap
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <Card
              key={plan.name}
              className={`relative hover:shadow-xl transition-all duration-300 ${plan.color} ${
                plan.popular ? "scale-105 shadow-lg" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-green-500 text-white px-4 py-1 flex items-center gap-1">
                    <Star className="w-4 h-4" />
                    Paling Populer
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-gray-600">{plan.period}</span>}
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${
                    plan.popular ? "bg-green-500 hover:bg-green-600" : "bg-gray-900 hover:bg-gray-800"
                  }`}
                  size="lg"
                >
                  {plan.cta}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Butuh paket khusus? Atau ingin melihat semua detail harga?</p>
          <Link href="/pricing">
            <Button variant="outline" className="gap-2 bg-transparent">
              Lihat Detail Harga
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import Link from "next/link"
import { Footer } from "@/components/landing/footer"
import { LandingHeader } from "@/components/landing/landing-header"

export default function PricingPage() {
  const pricingPlans = [
    {
      name: "Gratis",
      price: "Rp 0",
      period: "/bulan",
      description: "Mulai kelola pantry Anda tanpa biaya.",
      features: [
        "Manajemen 50 item",
        "Peringatan kedaluwarsa dasar",
        "Rekomendasi resep terbatas",
        "Daftar belanja tunggal",
        "Dukungan komunitas",
      ],
      buttonText: "Daftar Gratis",
      buttonVariant: "outline",
      link: "/register",
    },
    {
      name: "Premium",
      price: "Rp 49.000",
      period: "/bulan",
      description: "Fitur lengkap untuk rumah tangga modern.",
      features: [
        "Manajemen item tak terbatas",
        "Peringatan kedaluwarsa lanjutan",
        "Rekomendasi resep AI",
        "Daftar belanja kolaboratif",
        "Analisis pola konsumsi",
        "Dukungan prioritas",
      ],
      buttonText: "Mulai Premium",
      buttonVariant: "default",
      link: "/register",
      highlight: true,
    },
    {
      name: "Bisnis",
      price: "Rp 199.000",
      period: "/bulan",
      description: "Solusi untuk bisnis kecil dan katering.",
      features: [
        "Semua fitur Premium",
        "Integrasi multi-lokasi",
        "Manajemen tim",
        "Laporan kustom",
        "Integrasi API (opsional)",
        "Dukungan 24/7",
      ],
      buttonText: "Hubungi Kami",
      buttonVariant: "outline",
      link: "/kontak",
    },
  ]

  return (
    <section className="bg-gray-50">
      <LandingHeader/>
      <div className="container mx-auto px-4 text-center py-20 md:py-24">
        <Badge variant="secondary" className="mb-4 text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
          Harga Fleksibel
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-in fade-in-up duration-500">
          Pilih Paket yang Tepat untuk Anda
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 animate-in fade-in-up duration-700 delay-100">
          Kami menawarkan berbagai paket yang dirancang untuk memenuhi kebutuhan individu, keluarga, hingga bisnis
          kecil.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`flex flex-col p-6 text-center shadow-lg transition-all duration-300 transform hover:-translate-y-2 ${
                plan.highlight ? "border-2 border-green-500 shadow-green-200" : ""
              } animate-in fade-in-up`}
              style={{ animationDelay: `${index * 100 + 300}ms` }}
            >
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</CardTitle>
                <div className="text-5xl font-extrabold text-gray-900 mb-2">{plan.price}</div>
                <p className="text-gray-500">{plan.period}</p>
                <p className="text-gray-600 mt-4">{plan.description}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3 text-left text-gray-700">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-6">
                <Link href={plan.link} className="w-full">
                  <Button
                    variant={plan.buttonVariant as "default" | "outline"}
                    className={`w-full ${
                      plan.highlight
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
                        : ""
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Footer/>
    </section>
  )
}

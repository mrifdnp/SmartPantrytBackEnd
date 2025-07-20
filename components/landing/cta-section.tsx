"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Shield, Zap } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-8">
            <Sparkles className="w-8 h-8" />
          </div>

          {/* Heading */}
          <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Siap Menghemat Biaya dan
            <br />
            Mengurangi Limbah Makanan?
          </h2>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Bergabung dengan ribuan pengguna yang sudah merasakan manfaat Smart Pantry Manager. Mulai gratis hari ini,
            tidak perlu kartu kredit.
          </p>

          {/* Features */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10 text-lg">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              <span>100% Aman & Terpercaya</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5" />
              <span>Setup dalam 2 Menit</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span>Gratis Selamanya</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Daftar Gratis Sekarang
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 text-lg px-8 py-6 rounded-xl transition-all duration-300 bg-transparent"
              >
                Hubungi Tim Sales
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-white/20">
            <p className="text-white/80 mb-4">Dipercaya oleh:</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {["Restoran ABC", "Kafe XYZ", "Hotel Premium", "Catering Nusantara"].map((company) => (
                <div key={company} className="text-white font-medium">
                  {company}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

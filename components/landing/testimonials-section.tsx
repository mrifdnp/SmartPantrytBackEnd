"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Wijaya",
    role: "Owner Kafe Sehat",
    company: "Jakarta",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Smart Pantry Manager mengubah cara kami mengelola inventaris. Food cost turun 35% dan hampir tidak ada lagi bahan yang terbuang. ROI-nya luar biasa!",
    category: "Business",
  },
  {
    name: "Budi Santoso",
    role: "Head Chef",
    company: "Restoran Nusantara",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Fitur prediksi AI-nya sangat akurat. Kami bisa merencanakan menu berdasarkan bahan yang akan expired. Sangat membantu operasional dapur.",
    category: "Business",
  },
  {
    name: "Rina Kusuma",
    role: "Ibu Rumah Tangga",
    company: "Surabaya",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Sebagai ibu dengan 3 anak, aplikasi ini sangat membantu. Tidak ada lagi sayuran busuk di kulkas dan anak-anak jadi lebih aware soal food waste.",
    category: "Personal",
  },
  {
    name: "Ahmad Fauzi",
    role: "Catering Manager",
    company: "Fauzi Catering",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "OCR scanner-nya luar biasa cepat. Tinggal foto struk belanja, semua data langsung masuk. Menghemat waktu admin hingga 3 jam per hari.",
    category: "Business",
  },
  {
    name: "Lisa Permata",
    role: "Food Blogger",
    company: "Instagram: @lisacooks",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Saran resep AI-nya kreatif banget! Sering dapat ide masakan baru dari bahan yang mau expired. Followers juga suka konten zero waste-nya.",
    category: "Personal",
  },
  {
    name: "Doni Prasetyo",
    role: "Operations Manager",
    company: "Hotel Bintang Lima",
    image: "/placeholder.svg?height=60&width=60",
    rating: 5,
    text: "Untuk hotel dengan volume besar, tracking inventory jadi sangat mudah. Laporan analytics-nya detail dan membantu decision making management.",
    category: "Business",
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.ceil(testimonials.length / 3))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const getVisibleTestimonials = () => {
    const start = currentIndex * 3
    return testimonials.slice(start, start + 3)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <Badge className="mb-4 bg-purple-100 text-purple-800 hover:bg-purple-200">Testimoni Pengguna</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Dipercaya oleh
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              2,500+ Pengguna Aktif
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dari bisnis F&B hingga rumah tangga, Smart Pantry Manager telah membantu menghemat biaya dan mengurangi
            limbah makanan
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {getVisibleTestimonials().map((testimonial, index) => (
            <Card
              key={`${testimonial.name}-${currentIndex}`}
              className={`group hover:shadow-xl transition-all duration-500 border-0 bg-gradient-to-br from-gray-50 to-white animate-in slide-in-from-bottom-4`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                    <p className="text-xs text-gray-500">{testimonial.company}</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={`ml-auto ${
                      testimonial.category === "Business"
                        ? "border-blue-200 text-blue-700"
                        : "border-green-200 text-green-700"
                    }`}
                  >
                    {testimonial.category}
                  </Badge>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <div className="relative">
                  <Quote className="absolute -top-2 -left-2 w-8 h-8 text-gray-200" />
                  <p className="text-gray-700 leading-relaxed pl-6">"{testimonial.text}"</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: Math.ceil(testimonials.length / 3) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? "bg-purple-500 w-8" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-gray-200">
          {[
            { number: "2,500+", label: "Pengguna Aktif" },
            { number: "40%", label: "Rata-rata Penghematan" },
            { number: "80%", label: "Pengurangan Limbah" },
            { number: "4.9/5", label: "Rating Kepuasan" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

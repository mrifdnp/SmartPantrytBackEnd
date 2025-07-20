"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Phone, MapPin, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { LandingHeader } from "@/components/landing/landing-header"
import { Footer } from "@/components/landing/footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // In a real application, you would send formData to your backend here
    console.log("Form submitted:", formData)

    toast({
      title: "Pesan Terkirim!",
      description: "Terima kasih telah menghubungi kami. Kami akan segera merespons.",
      variant: "default",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    })
    setIsSubmitting(false)
  }

  return (
    <section className="bg-gray-50">
      <LandingHeader/>
      <div className="container mx-auto px-4 text-center py-20 md:py-24">
        <Badge variant="secondary" className="mb-4 text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
          Hubungi Kami
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent animate-in fade-in-up duration-500">
          Kami Siap Membantu Anda
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-12 animate-in fade-in-up duration-700 delay-100">
          Apakah Anda memiliki pertanyaan, masukan, atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami melalui
          formulir di bawah ini atau informasi kontak kami.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <Card className="p-6 shadow-lg animate-in fade-in-up duration-700 delay-200">
            <CardHeader className="pb-6 text-left">
              <CardTitle className="text-2xl font-bold text-gray-800">Kirim Pesan kepada Kami</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6 text-left">
                <div>
                  <Label htmlFor="name" className="text-gray-700">
                    Nama Lengkap
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nama Anda"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-700">
                    Email Anda
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-gray-700">
                    Subjek
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="Subjek pesan Anda"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-gray-700">
                    Pesan Anda
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tulis pesan Anda di sini..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8 animate-in fade-in-up duration-700 delay-300">
            <Card className="p-6 shadow-lg text-left">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4">
                  <Mail className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Email Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Untuk pertanyaan umum atau dukungan teknis, kirimkan email ke:</p>
                <p className="text-green-600 font-semibold mt-2">support@smartpantry.com</p>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-lg text-left">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4">
                  <Phone className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Telepon Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Anda juga bisa menghubungi kami melalui telepon pada jam kerja:</p>
                <p className="text-green-600 font-semibold mt-2">+62 812-3456-7890</p>
              </CardContent>
            </Card>

            <Card className="p-6 shadow-lg text-left">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mb-4">
                  <MapPin className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">Kunjungi Kami</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Kantor pusat kami berlokasi di:</p>
                <p className="text-green-600 font-semibold mt-2">
                  Jl. Teknologi Cerdas No. 123, Kota Inovasi, Indonesia
                </p>
                <div className="mt-4 w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  {/* Placeholder for a map */}
                  Peta Lokasi (Integrasi Google Maps/OpenStreetMap)
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer/>
    </section>
  )
}

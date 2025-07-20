"use client"

import { supabase } from "@/lib/supabaseClient"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChefHat, Eye, EyeOff, Mail, Lock, User, Building, ArrowLeft, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",  
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "",
    businessName: "",
    businessType: "",
    agreeTerms: false,
    agreeMarketing: false,
  })

  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (currentStep === 1) {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Error",
          description: "Password tidak cocok",
          variant: "destructive",
        })
        return
      }
      setCurrentStep(2)
      return
    }

    // Final submission with Supabase signup
    setIsLoading(true)
    const full_name = `${formData.firstName} ${formData.lastName}`

    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: {
          full_name,
          account_type: formData.accountType,
          business_name: formData.businessName || null,
          business_type: formData.businessType || null,
        },
      },
    })

    if (error) {
      toast({
        title: "Gagal mendaftar",
        description: error.message,
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    toast({
      title: "Verifikasi email terkirim",
      description: "Silakan cek email Anda untuk mengaktifkan akun.",
    })

    setIsLoading(false)
    router.push("/login")
  }

  const steps = [
    { number: 1, title: "Informasi Dasar", completed: currentStep > 1 },
    { number: 2, title: "Detail Akun", completed: false },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-blue-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
      </div>

      <div className="w-full max-w-md relative">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke beranda
        </Link>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <ChefHat className="w-8 h-8 text-white" />
              </div>
            </div>

            <div>
              <CardTitle className="text-2xl font-bold">Buat Akun Baru</CardTitle>
              <p className="text-gray-600 mt-2">Bergabung dengan Smart Pantry Manager</p>
            </div>

            <div className="flex items-center justify-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step.completed
                      ? "bg-green-500 text-white"
                      : currentStep === step.number
                        ? "bg-green-100 text-green-600 border-2 border-green-500"
                        : "bg-gray-100 text-gray-400"
                      }`}
                  >
                    {step.completed ? <Check className="w-4 h-4" /> : step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-8 h-0.5 mx-2 ${step.completed ? "bg-green-500" : "bg-gray-200"}`} />
                  )}
                </div>
              ))}
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {currentStep === 1 && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nama Depan</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Nama Belakang</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="nama@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Minimal 8 karakter"
                        value={formData.password}
                        onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                        minLength={8}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Ulangi password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                        className="pl-10 pr-10"
                        required
                      />
                      <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="accountType">Tipe Akun</Label>
                    <Select value={formData.accountType} onValueChange={(value) => setFormData((prev) => ({ ...prev, accountType: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih tipe akun" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal - Rumah Tangga</SelectItem>
                        <SelectItem value="business">Business - Restoran/Kafe</SelectItem>
                        <SelectItem value="enterprise">Enterprise - Chain/Hotel</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {(formData.accountType === "business" || formData.accountType === "enterprise") && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="businessName">Nama Bisnis</Label>
                        <div className="relative">
                          <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id="businessName"
                            placeholder="Nama restoran/bisnis"
                            value={formData.businessName}
                            onChange={(e) => setFormData((prev) => ({ ...prev, businessName: e.target.value }))}
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="businessType">Jenis Bisnis</Label>
                        <Select value={formData.businessType} onValueChange={(value) => setFormData((prev) => ({ ...prev, businessType: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis bisnis" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="restaurant">Restoran</SelectItem>
                            <SelectItem value="cafe">Kafe</SelectItem>
                            <SelectItem value="catering">Katering</SelectItem>
                            <SelectItem value="hotel">Hotel</SelectItem>
                            <SelectItem value="bakery">Bakery</SelectItem>
                            <SelectItem value="other">Lainnya</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeTerms"
                        checked={formData.agreeTerms}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeTerms: checked as boolean }))}
                        required
                      />
                      <Label htmlFor="agreeTerms" className="text-sm leading-relaxed">
                        Saya setuju dengan <Link href="/terms" className="text-green-600 hover:text-green-700">Syarat & Ketentuan</Link> dan <Link href="/privacy" className="text-green-600 hover:text-green-700">Kebijakan Privasi</Link>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="agreeMarketing"
                        checked={formData.agreeMarketing}
                        onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, agreeMarketing: checked as boolean }))}
                      />
                      <Label htmlFor="agreeMarketing" className="text-sm leading-relaxed">
                        Saya ingin menerima update produk dan tips pengelolaan pantry via email
                      </Label>
                    </div>
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                {currentStep === 2 && (
                  <Button type="button" variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">Kembali</Button>
                )}
                <Button
                  type="submit"
                  className={`bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 ${currentStep === 1 ? "w-full" : "flex-1"}`}
                  size="lg"
                  disabled={isLoading || (currentStep === 2 && !formData.agreeTerms)}
                >
                  {isLoading ? "Memproses..." : currentStep === 1 ? "Lanjutkan" : "Buat Akun"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Gratis selamanya untuk penggunaan personal</p>
        </div>
      </div>
    </div>
  )
}

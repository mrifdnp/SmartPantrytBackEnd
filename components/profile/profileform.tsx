"use client"
import { easeInOut } from "framer-motion"
import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, User, Bell, Check, Loader2 } from "lucide-react"
import { useUserProfile } from "@/lib/useUserProfile"
import { supabase } from "@/lib/supabaseClient"

const formVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
}
const itemVariants = {
  hidden: {
    opacity: 0,
    x: -50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
      ease: easeInOut, // 
    },
  },
}

const inputVariants = {
  focus: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: easeInOut, // Use the imported easing function
    },
  },
}

export default function ProfileForm() {
  const { profile, loading, refetch } = useUserProfile()
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    penyimpanan: "Suhu Ruang",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (profile) {
      setForm({
        full_name: profile.full_name || "",
        email: profile.email || "",
        phone: profile.phone || "",
        penyimpanan: profile.penyimpanan || "Suhu Ruang",
      })
    }
  }, [profile])

  async function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)

    const token = (await supabase.auth.getSession()).data.session?.access_token

    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setIsSaved(true)
      refetch()
      setTimeout(() => setIsSaved(false), 3000)
    }

    setIsLoading(false)
  }

  if (loading) return <p>Loading...</p>
  if (!profile) return <p>Data tidak ditemukan</p>

  return (
    <motion.div variants={formVariants} initial="hidden" animate="visible" className="space-y-8">
      <motion.div variants={itemVariants}>
        <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-2xl rounded-3xl ring-1 ring-white/20">
          <CardHeader className="pb-6 border-b border-slate-100">
            <CardTitle className="flex items-center gap-3 text-slate-800 text-xl">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
                <User className="w-5 h-5 text-white" />
              </div>
              Informasi Pribadi
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Nama Lengkap</label>
                  <motion.div variants={inputVariants} whileFocus="focus">
                    <Input
                      name="full_name"
                      value={form.full_name}
                      onChange={handleChange}
                      placeholder="Nama Lengkap"
                      className="bg-white/90 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 rounded-xl py-3 text-slate-700"
                    />
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Email</label>
                  <motion.div variants={inputVariants} whileFocus="focus">
                    <Input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="email@example.com"
                      disabled
                      className="bg-gray-100 cursor-not-allowed border-slate-200 rounded-xl py-3 text-slate-700"
                    />
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Nomor Telepon</label>
                  <motion.div variants={inputVariants} whileFocus="focus">
                    <Input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+62xxxxxxx"
                      className="bg-white/90 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 transition-all duration-300 rounded-xl py-3 text-slate-700"
                    />
                  </motion.div>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">Penyimpanan</label>
                  <select
                    name="penyimpanan"
                    value={form.penyimpanan}
                    onChange={handleChange}
                    className="w-full bg-white/90 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300"
                  >
                    <option value="Suhu Ruang">Suhu Ruang</option>
                    <option value="Kulkas">Lemari Es</option>
                    <option value="Freezer">Freezer</option>
                  </select>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="flex justify-end pt-4">
                <AnimatePresence mode="wait">
                  {isSaved ? (
                    <motion.div
                      key="saved"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      className="flex items-center gap-3 text-emerald-600 font-semibold bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-200"
                    >
                      <Check className="w-5 h-5" />
                      Berhasil Tersimpan!
                    </motion.div>
                  ) : (
                    <motion.div
                      key="button"
                      initial={{ opacity: 0, scale: 0.8, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -20 }}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 text-white px-10 py-4 rounded-2xl shadow-xl transition-all duration-300 disabled:opacity-50 font-semibold"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                            Menyimpan...
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5 mr-3" />
                            Simpan Perubahan
                          </>
                        )}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}

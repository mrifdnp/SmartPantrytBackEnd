"use client"

import { motion, easeOut } from "framer-motion"
import ProfileForm from "@/components/profile/profileform"
import { ProfileCard } from "@/components/profile/profilecard"
import { DashboardHeader } from "@/components/dashboard/personal/dashboard-header"

// Container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.2,
    },
  },
}

// Item animation variants (dengan easeOut)
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: easeOut, // ✅ Solusi TypeScript error
    },
  },
}

export default function ProfilePage() {
    
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <DashboardHeader />

      <main className="relative overflow-hidden min-h-screen">
        {/* Animated Background Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-emerald-300 to-teal-300 rounded-full mix-blend-multiply filter blur-xl opacity-60"
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-300 to-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-60"
            animate={{
              x: [0, -30, 0],
              y: [0, 40, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute top-40 left-40 w-80 h-80 bg-gradient-to-r from-purple-300 to-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-60"
            animate={{
              x: [0, 40, 0],
              y: [0, -50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 12,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </div>

        <motion.div
          className="relative z-10 container mx-auto px-4 py-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 bg-clip-text text-transparent mb-4">
              Profil Pengguna
            </h1>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Kelola informasi pribadi dan preferensi akun Anda dengan mudah
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <ProfileCard />
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-2">
              <ProfileForm />
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

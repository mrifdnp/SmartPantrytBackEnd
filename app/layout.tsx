import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ProfileProvider } from "@/context/ProfileContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Smart Pantry Manager",
  description: "Aplikasi manajemen inventaris makanan cerdas dengan AI",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <ProfileProvider> {/* ✅ wrap children */}
            {children}
            <Toaster />
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
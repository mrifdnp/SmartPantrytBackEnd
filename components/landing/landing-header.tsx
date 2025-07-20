"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChefHat } from "lucide-react"

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Smart Pantry
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/feature" className="text-gray-600 hover:text-green-600 transition-colors">
              Fitur
            </Link>
            <Link href="/pricing" className="text-gray-600 hover:text-green-600 transition-colors">
              Harga
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
              Tentang Kami
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
              Kontak
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-green-600">
                Masuk
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                Daftar Gratis
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-4 mt-4">
              <Link href="/features" className="text-gray-600 hover:text-green-600 transition-colors">
                Fitur
              </Link>
              <Link href="/pricing" className="text-gray-600 hover:text-green-600 transition-colors">
                Harga
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-green-600 transition-colors">
                Tentang Kami
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-green-600 transition-colors">
                Kontak
              </Link>
              <div className="flex flex-col space-y-2 pt-4">
                <Link href="/login">
                  <Button variant="outline" className="w-full bg-transparent">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-600">Daftar Gratis</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

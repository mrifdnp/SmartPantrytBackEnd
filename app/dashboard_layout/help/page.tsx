"use client";

import { HelpCircle, Send, PhoneCall, FileText, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DashboardHeader } from "@/components/dashboard/personal/dashboard-header"
export default function HelpPage() {
  const [showForm, setShowForm] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  const handleFaqToggle = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const faqs = [
    {
      title: "Bagaimana cara menambah barang dengan OCR?",
      desc: "Buka halaman Inventaris → klik Tambah → pilih mode Scan. Arahkan kamera ke label produk."
    },
    {
      title: "Bagaimana mengatur notifikasi?",
      desc: "Buka halaman Pengaturan untuk menyalakan atau mematikan notifikasi."
    },
    {
      title: "Bagaimana keluar dari akun?",
      desc: "Klik avatar di pojok kanan atas → pilih 'Keluar' dari menu."
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="relative overflow-hidden min-h-screen bg-white">
        {/* BLOBS */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-2000" />
          <div className="absolute top-40 left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-2xl opacity-60 animate-blob animation-delay-4000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16 max-w-2xl">
          <div className="flex items-center justify-center gap-3 mb-10">
            <span className="bg-green-100 p-2 rounded-full">
              <HelpCircle className="w-6 h-6 text-green-700" />
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 tracking-tight">
              Bantuan
            </h1>
          </div>

          <div className="bg-white/60 backdrop-blur-lg border border-gray-200 rounded-3xl shadow-2xl p-10 space-y-8 transition duration-300 hover:shadow-3xl">
            
            <p className="text-gray-600 text-center text-lg">
              Temukan jawaban atau hubungi kami bila memerlukan bantuan lebih lanjut.
            </p>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {faqs.map((item, i) => (
                <div
                  key={i}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    className="flex w-full justify-between items-center p-4 text-green-700 font-semibold text-left"
                    onClick={() => handleFaqToggle(i)}
                  >
                    <span>{item.title}</span>
                    {faqOpen === i ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  {faqOpen === i && (
                    <div className="px-4 pb-4 text-gray-700 text-sm leading-relaxed">
                      {item.desc}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Contact options */}
            <div className="flex flex-col gap-4">
              <Button
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white w-full"
                asChild
              >
                <Link href="https://wa.me/6281234567890" target="_blank">
                  <PhoneCall className="w-4 h-4" />
                  Hubungi via WhatsApp
                </Link>
              </Button>

              <Button
                variant="outline"
                className="flex items-center gap-2 w-full"
                onClick={() => setShowForm(!showForm)}
              >
                <Send className="w-4 h-4" />
                Kirim Pengaduan / Pesan
              </Button>

              <Button
                variant="outline"
                className="flex items-center gap-2 w-full"
                asChild
              >
                <Link href="/help/docs">
                  <FileText className="w-4 h-4" />
                  Lihat Panduan Lengkap
                </Link>
              </Button>
            </div>

            {/* Complaint Form */}
            {showForm && (
              <div className="mt-6 space-y-4 border-t pt-4 border-gray-200">
                <h2 className="text-green-700 font-bold text-lg">Form Pengaduan</h2>
                <Input placeholder="Nama Anda" />
                <Input placeholder="Email Anda" />
                <Textarea placeholder="Pesan atau keluhan Anda..." rows={4} />
                <Button className="bg-green-600 hover:bg-green-700 text-white w-full">
                  Kirim Pesan
                </Button>
              </div>
            )}

            {/* Email fallback */}
            <div className="text-center text-gray-600 text-sm mt-8">
              Atau kirim email ke{" "}
              <Link
                href="mailto:support@smartpantry.com"
                className="text-green-700 font-semibold hover:underline"
              >
                support@smartpantry.com
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

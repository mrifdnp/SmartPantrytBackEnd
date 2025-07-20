"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  Calendar,
  Shield,
  Package,
  UploadCloud,
} from "lucide-react";
import { useUserProfile } from "@/lib/useUserProfile";
import { supabase } from "@/lib/supabaseClient";
import { useRef, useState } from "react";

export function ProfileCard() {
  const { profile, loading, refetch } = useUserProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (!file || !profile?.id) return;

  setUploading(true);

  try {
    const formData = new FormData();
    formData.append("avatar", file);

    // Tambahkan field lain jika ingin diupdate juga (optional)
    if (profile.full_name) formData.append("full_name", profile.full_name);
    if (profile.phone) formData.append("phone", profile.phone);
    if (profile.penyimpanan) formData.append("penyimpanan", profile.penyimpanan);

    const session = await supabase.auth.getSession();
    const accessToken = session.data.session?.access_token;

    const response = await fetch("/api/profile", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      console.error("Upload failed:", result);
      alert(`Gagal memperbarui profil: ${result.error || "Unknown error"}`);
      return;
    }

    await refetch();
  } catch (error) {
    console.error("Unexpected error:", error);
    alert("Terjadi kesalahan tak terduga.");
  } finally {
    setUploading(false);
  }
}


  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>Data tidak ditemukan</p>;

  return (
    <motion.div initial="hidden" animate="visible" className="sticky top-8">
      <Card className="backdrop-blur-xl bg-white/90 border-0 shadow-2xl rounded-3xl overflow-hidden ring-1 ring-white/20">
        <CardContent className="p-0 relative">
          <div className="h-36 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/20" />
          </div>

          {/* Avatar */}
          <div className="absolute top-[60px] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            {profile.avatar_url ? (
              <img
                src={profile.avatar_url}
                alt="Avatar"
                className="w-40 h-40 rounded-full object-cover border-4 border-white ring-4 ring-white/50 shadow-2xl"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 shadow-2xl flex items-center justify-center text-white text-5xl font-bold border-4 border-white ring-4 ring-white/50">
                {profile.full_name?.[0] || "?"}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="pt-[120px] pb-12 px-8 text-center space-y-8">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                {profile.full_name}
              </h2>

              <div className="space-y-4">
                {profile.email && (
                  <div className="flex items-center justify-center gap-3 text-slate-600 bg-slate-50/80 rounded-xl py-3 px-5">
                    <Mail className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-medium">{profile.email}</span>
                  </div>
                )}
                {profile.phone && (
                  <div className="flex items-center justify-center gap-3 text-slate-600 bg-slate-50/80 rounded-xl py-3 px-5">
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-medium">{profile.phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Extra Info */}
            <div className="grid grid-cols-3 gap-6 py-8 border-y border-slate-200/60">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">24</div>
                <div className="text-xs text-slate-500 font-medium mt-1">
                  Items
                </div>
              </div>
              <div className="text-center border-x border-slate-200/60">
                <div className="text-2xl font-bold text-blue-600">7</div>
                <div className="text-xs text-slate-500 font-medium mt-1">
                  Days
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">98%</div>
                <div className="text-xs text-slate-500 font-medium mt-1">
                  Score
                </div>
              </div>
            </div>

            {/* Badges */}
<div className="flex flex-wrap justify-center gap-3 py-2">
  <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 px-4 py-2">
    <Package className="w-3 h-3 mr-1" />
    {profile.penyimpanan || "Unknown"}
  </Badge>
  <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 px-4 py-2">
    <Shield className="w-3 h-3 mr-1" />
    Verified
  </Badge>
  <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2">
    <Calendar className="w-3 h-3 mr-1" />
    Member 2024
  </Badge>
  <Badge className="bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 px-4 py-2">
    <Shield className="w-3 h-3 mr-1" />
    {profile.account_type === "business" ? "Akun Bisnis" : "Akun Personal"}
  </Badge>
</div>


            {/* Input File (Hidden) */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />

            {/* Ganti Foto (dulu Edit Profil) */}
            <motion.div
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white rounded-xl py-4 font-semibold"
              >
                <UploadCloud className="w-4 h-4 mr-2" />
                {uploading ? "Mengunggah..." : "Ganti Foto"}
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

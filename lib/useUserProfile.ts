// lib/useUserProfile.ts
import { useEffect, useState } from "react"
import { supabase } from "./supabaseClient"

export function useUserProfile() {
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  const fetchProfile = async () => {
    setLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single()

      if (!error) {
        setProfile(data)
      }
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  return {
    profile,
    loading,
    refetch: fetchProfile, // ✅ Tambahkan ini
  }
}

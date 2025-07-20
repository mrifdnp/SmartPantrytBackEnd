"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

interface Profile {
  id: string
  email: string
  full_name?: string
  account_type?: string
}

const ProfileContext = createContext<Profile | null>(null)

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()

      const token = session?.access_token

      if (!token) return

      const res = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!res.ok) {
        console.warn("Gagal fetch profile")
        return
      }

      const data = await res.json()
      setProfile(data)
    }

    fetchProfile()

    // Listen to auth changes to refetch profile
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      fetchProfile()
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  )
}


export const useProfile = () => useContext(ProfileContext)


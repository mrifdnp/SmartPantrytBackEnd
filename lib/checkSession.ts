// lib/checkSession.ts
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export async function checkIfLoggedIn() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getUser()

  return !!data.user // true jika ada session
}

import { NextResponse } from "next/server"
import { cookies as getCookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

export async function POST(req: Request) {
  const cookies = getCookies()
  const supabase = createRouteHandlerClient({ cookies: () => cookies })

  const { email, password, full_name } = await req.json()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/verify`, // ganti jika perlu
      data: { full_name },
    },
  })

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 400 })
  }

  return NextResponse.json(
    { message: "Silakan cek email Anda untuk verifikasi." },
    { status: 200 }
  )
}

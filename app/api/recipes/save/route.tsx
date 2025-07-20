import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies: () => cookies() })

  const { recipe } = await req.json()

  if (!recipe) {
    return NextResponse.json({ error: "Data resep kosong" }, { status: 400 })
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: "Pengguna belum login" }, { status: 401 })
  }

  const { error } = await supabase.from("recipes").insert({
    user_id: user.id,
    content: recipe,
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}

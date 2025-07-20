import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import { NextRequest } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

function createSupabaseClient(token: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
}

export async function GET(req: Request) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) {
    return NextResponse.json({ message: "Missing token" }, { status: 401 })
  }

  const supabase = createSupabaseClient(token)
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { data: inventory, error } = await supabase
    .from("inventory")
    .select("*")
    .eq("user_id", user.id)

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }

  // 💡 FIX: Pastikan hasil `data` berupa array
  return NextResponse.json(inventory || [])

}

// POST tambah inventory baru milik user
export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 })

  const supabase = createSupabaseClient(token)

  const {
    name,
    category,
    location,
    expiry_date,
    quantity,
    unit,
    cost,
  } = await req.json()

  if (!name || typeof name !== "string") {
    return NextResponse.json({ message: "Nama item wajib diisi" }, { status: 400 })
  }

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { data, error } = await supabase
    .from("inventory")
    .insert([
      {
        name,
        category,
        location,
        expiry_date,
        quantity,
        unit,
        cost,
        user_id: user.id,
      },
    ])
    .select()
    .single()

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Data berhasil ditambahkan", data })
}


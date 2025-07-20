import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

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

// GET detail inventory berdasarkan id milik user
export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
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

  const inventoryId = params.id

  const { data, error } = await supabase
    .from("inventory")
    .select("*")
    .eq("inventory_id", inventoryId)
    .eq("user_id", user.id)

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }

  if (!data || data.length === 0) {
    return NextResponse.json({ message: "Inventory not found" }, { status: 404 })
  }

  return NextResponse.json(data[0])
}

// PUT update inventory berdasarkan id dan user
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
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

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  const { error } = await supabase
    .from("inventory")
    .update({
      name,
      category,
      location,
      expiry_date,
      quantity,
      unit,
      cost,
    })
    .eq("id", params.id)
    .eq("user_id", user.id)

  if (error) {
    return NextResponse.json({ message: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Data berhasil diupdate" })
}


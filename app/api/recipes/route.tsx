import { NextResponse } from "next/server"

export async function GET() {
  const supabase = createClient()
  const { data, error } = await supabase.from("resep").select("*").order("created_at", { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json(data)
}

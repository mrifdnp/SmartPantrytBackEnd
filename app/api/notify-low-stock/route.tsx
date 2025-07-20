import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const PUSHER_URL = "https://a76f2bb2-1674-411c-9645-8fc4fd8faf73.pushnotifications.pusher.com/publish_api/v1/instances/a76f2bb2-1674-411c-9645-8fc4fd8faf73/publishes/interests"
const PUSHER_SECRET = process.env.BEAMS_SECRET_KEY! // dari Beams dashboard

function createSupabaseClient(token: string) {
  return createClient(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  })
}

export async function POST(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "")
  if (!token) return NextResponse.json({ message: "Missing token" }, { status: 401 })

  const supabase = createSupabaseClient(token)
  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
  }

  // Fetch low stock items
  const { data, error } = await supabase
    .from("inventory")
    .select("name, quantity")
    .lt("quantity", 5)
    .eq("user_id", user.id)

  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  if (!data || data.length === 0) {
    return NextResponse.json({ message: "No low stock items." })
  }

  // Build item list text
  const itemList = data.map((item) => `• ${item.name} (${item.quantity})`).join("\n")

  // Send Push Notification to Pusher Beams
  const payload = {
    interests: [`user-${user.id}`],
    web: {
      notification: {
        title: "⚠️ Stok Hampir Habis",
        body: `Beberapa bahan menipis:\n${itemList}`,
        deep_link: "https://smart-pantry-back-end.vercel.app/",
        icon: "https://i.pinimg.com/736x/64/b8/31/64b831ee6b35787e8c16d51080b932e1.jpg",
      },
    },
  }

  const response = await fetch(PUSHER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${PUSHER_SECRET}`,
    },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    const errorText = await response.text()
    return NextResponse.json({ message: "Failed to send notification", error: errorText }, { status: 500 })
  }

  return NextResponse.json({ message: "Notification sent." })
}

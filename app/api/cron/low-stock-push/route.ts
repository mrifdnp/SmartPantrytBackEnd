import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Supabase dengan service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Pusher Beams
const PUSHER_URL =
  "https://a76f2bb2-1674-411c-9645-8fc4fd8faf73.pushnotifications.pusher.com/publish_api/v1/instances/a76f2bb2-1674-411c-9645-8fc4fd8faf73/publishes/interests";
const PUSHER_SECRET = process.env.BEAMS_SECRET_KEY!;

export async function GET() {
  // Step 1: Ambil semua user_id unik yang punya inventory
  const { data: rawUserIds, error: userError } = await supabase
    .from("inventory")
    .select("user_id");

  if (userError || !rawUserIds) {
    return NextResponse.json({ message: userError?.message ?? "Unknown error" }, { status: 500 });
  }

  // Ambil user_id yang valid (tidak kosong/null/undefined)
  const userIds = Array.from(
    new Set(
      rawUserIds
        .map((item) => item.user_id)
        .filter((id): id is string => !!id && id.trim() !== "")
    )
  );

  const results: any[] = [];

  // Step 2: Loop tiap user dan cek item dengan stok < 5
  for (const userId of userIds) {
    const { data: items, error } = await supabase
      .from("inventory")
      .select("name, quantity")
      .lt("quantity", 5)
      .eq("user_id", userId);

    if (error || !items || items.length === 0) continue;

    const itemList = items.map((item) => `• ${item.name} (${item.quantity})`).join("\n");

    // Payload notifikasi
    const payload = {
      interests: [`user-${userId}`],
      web: {
        notification: {
          title: "⚠️ Stok Hampir Habis",
          body: `Beberapa bahan menipis:\n${itemList}`,
          deep_link: "https://smart-pantry-back-end.vercel.app/",
          icon: "https://i.pinimg.com/736x/64/b8/31/64b831ee6b35787e8c16d51080b932e1.jpg",
        },
      },
    };

    const response = await fetch(PUSHER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PUSHER_SECRET}`,
      },
      body: JSON.stringify(payload),
    });

    results.push({
      user_id: userId,
      status: response.status,
      success: response.ok,
    });
  }

  return NextResponse.json({ message: "Done sending notifications", results });
}

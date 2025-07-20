// app/api/notifications/low-stock/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const authHeader = req.headers.get('Authorization');
  const secret = process.env.CRON_SECRET;

  if (authHeader !== `Bearer ${secret}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Panggil fungsi kirim notifikasi low stock di sini
  try {
    // Contoh: kirimNotifLowStock() bisa ambil dari Supabase
    await sendLowStockNotifications();
    return NextResponse.json({ success: true });
  } catch (error) {
    return new NextResponse('Error sending notifications', { status: 500 });
  }
}

// Import fungsi utama
async function sendLowStockNotifications() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  const inventoryEndpoint = `${supabaseUrl}/rest/v1/inventory?stock=lt.5&select=name`;

  const res = await fetch(inventoryEndpoint, {
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
    },
  });

  const lowStockItems = await res.json();

  if (!Array.isArray(lowStockItems) || lowStockItems.length === 0) return;

  const notificationRes = await fetch(`${supabaseUrl}/rest/v1/notifications`, {
    method: "POST",
    headers: {
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: "Bahan Hampir Habis",
      body: `Ada ${lowStockItems.length} bahan dengan stok < 5.`,
      created_at: new Date().toISOString(),
    }),
  });

  if (!notificationRes.ok) throw new Error("Failed to create notification");
}

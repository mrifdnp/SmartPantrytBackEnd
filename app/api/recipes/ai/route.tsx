import { NextResponse } from "next/server"

export async function POST() {
  try {
    const prompt = `Saya punya bahan berikut: ayam, kecap. 
Tolong beri 1 resep sederhana dengan bahan tersebut. 
Sertakan nama resep, bahan tambahan minimal, dan langkah-langkah singkat.`

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBPigQpP89fRFs77lPNkF88cq-SVDJXmFw", // ✅ Ganti dengan key kamu
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    )

    const json = await response.json()
    console.log("🔍 Response dari Gemini:", JSON.stringify(json, null, 2))

    const result = json.candidates?.[0]?.content?.parts?.[0]?.text

    if (!result) {
      return NextResponse.json(
        { error: "Respon kosong dari AI", debug: json },
        { status: 500 }
      )
    }

    return NextResponse.json({ result })
  } catch (err) {
    console.error("❌ Error:", err)
    return NextResponse.json(
      { error: "Gagal mengambil resep dari AI", debug: String(err) },
      { status: 500 }
    )
  }
}

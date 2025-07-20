// app/api/notif/send/route.ts
import { NextResponse } from 'next/server';
import { sendNotif } from '@/lib/kirimNotif';
export async function POST() {
  try {
    const result = await sendNotif();
    return NextResponse.json({ success: true, result });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

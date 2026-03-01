import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { name, message } = body;

  await adminDb.collection("thanks_submissions").add({
    name: name ? String(name).trim() : null,
    message: message ? String(message).trim() : null,
    created_at: new Date(),
  });
  return NextResponse.json({ ok: true });
}

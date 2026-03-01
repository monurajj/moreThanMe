import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

const CONTACT_TYPES = ["individual", "ngo", "company", "other"] as const;

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { name, type, email, phone, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
  }
  const contactType = type && CONTACT_TYPES.includes(type as (typeof CONTACT_TYPES)[number]) ? type : "individual";

  await adminDb.collection("contact_submissions").add({
    name: String(name).trim(),
    type: String(contactType).trim(),
    email: String(email).trim(),
    phone: phone ? String(phone).trim() : null,
    message: String(message).trim(),
    read: false,
    created_at: new Date(),
  });
  return NextResponse.json({ ok: true });
}

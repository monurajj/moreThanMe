import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

const DEFAULT_ROLE = "Volunteer";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, email, phone, enrollment, batch, course, why_join, image_url } = body;
    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }
    const emailTrimmed = String(email).trim();
    if (!emailTrimmed.endsWith("@rishihood.edu.in")) {
      return NextResponse.json(
        { error: "Only Rishihood University emails (@rishihood.edu.in) can sign up." },
        { status: 400 }
      );
    }

    const existing = await adminDb
      .collection("team_members")
      .where("email", "==", emailTrimmed)
      .limit(1)
      .get();
    if (!existing.empty) {
      return NextResponse.json({ error: "already_registered" }, { status: 409 });
    }

    const lastByOrder = await adminDb
      .collection("team_members")
      .orderBy("sort_order", "desc")
      .limit(1)
      .get();
    const nextSortOrder = lastByOrder.empty ? 0 : (lastByOrder.docs[0].data().sort_order ?? 0) + 1;

    await adminDb.collection("team_members").add({
      name: String(name).trim(),
      email: emailTrimmed,
      phone: phone ? String(phone).trim() : null,
      enrollment: enrollment ? String(enrollment).trim() : null,
      batch: batch || null,
      course: course || null,
      why_join: why_join ? String(why_join).trim() : null,
      image_url: image_url ? String(image_url).trim() : null,
      role: DEFAULT_ROLE,
      sort_order: nextSortOrder,
      is_founding_member: false,
      is_core_member: false,
      created_at: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Join error:", e);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}

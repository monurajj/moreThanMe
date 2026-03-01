import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { name, universityEmail, enrollment, batch, course, phone, message } = body;
    if (!name || !universityEmail) {
      return NextResponse.json({ error: "Name and university email required" }, { status: 400 });
    }
    if (!universityEmail.endsWith("rishihood.edu.in")) {
      return NextResponse.json({ error: "Only Rishihood University emails (@rishihood.edu.in) can sign up." }, { status: 400 });
    }

    const existing = await adminDb.collection("volunteers").where("university_email", "==", universityEmail.trim()).limit(1).get();
    if (!existing.empty) {
      return NextResponse.json({ error: "already_registered" }, { status: 409 });
    }

    await adminDb.collection("volunteers").add({
      name: String(name).trim(),
      university_email: String(universityEmail).trim(),
      enrollment: enrollment ? String(enrollment).trim() : "",
      batch: batch || "2023",
      course: course || "CSAI",
      phone: phone ? String(phone).trim() : "",
      message: message ? String(message).trim() : "",
      created_at: new Date(),
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Volunteer join error:", e);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}

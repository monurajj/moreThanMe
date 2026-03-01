import { NextResponse } from "next/server";
import { getAdminFromRequest, isSuperAdmin } from "@/lib/adminAuth";
import { adminDb } from "@/lib/firebaseAdmin";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const admin = await getAdminFromRequest(request);
  if (!admin || !isSuperAdmin(admin.email)) {
    return NextResponse.json({ error: "Forbidden. Super admin only." }, { status: 403 });
  }

  const body = await request.json();
  const { email, password } = body;
  if (!email || !password || typeof email !== "string" || typeof password !== "string") {
    return NextResponse.json({ error: "Email and password required" }, { status: 400 });
  }

  const emailLower = email.trim().toLowerCase();
  if (emailLower === "monu2feb2004@gmail.com") {
    return NextResponse.json({ error: "Cannot modify super admin via this API" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  const password_hash = await bcrypt.hash(password, 10);

  const existing = await adminDb.collection("admin_users").where("email", "==", emailLower).limit(1).get();
  if (!existing.empty) {
    return NextResponse.json({ error: "Email already exists" }, { status: 400 });
  }

  const ref = await adminDb.collection("admin_users").add({
    email: emailLower,
    password_hash,
    created_at: new Date(),
  });
  const doc = await ref.get();
  const d = doc.data()!;
  return NextResponse.json({
    ok: true,
    admin: { id: doc.id, email: d.email, created_at: d.created_at?.toDate?.()?.toISOString?.() },
  });
}

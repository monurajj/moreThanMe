import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const superAdminEmail = process.env.SUPER_ADMIN_EMAIL?.trim();
    const superAdminPassword = process.env.SUPER_ADMIN_PASSWORD;
    if (!superAdminEmail || !superAdminPassword) {
      return NextResponse.json({ error: "SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD must be set in env" }, { status: 500 });
    }

    const url = new URL(request.url);
    const key = url.searchParams.get("key");
    const expectedKey = process.env.ADMIN_SEED_KEY;
    // Require a configured secret and matching key so seed cannot be called without credentials
    if (!expectedKey || key !== expectedKey) {
      return NextResponse.json({ error: "Forbidden. Set ADMIN_SEED_KEY and pass ?key=..." }, { status: 403 });
    }

    const password_hash = await bcrypt.hash(superAdminPassword, 10);
    const emailLower = superAdminEmail.toLowerCase();

    const existing = await adminDb.collection("admin_users").where("email", "==", emailLower).limit(1).get();
    if (existing.empty) {
      await adminDb.collection("admin_users").add({ email: emailLower, password_hash, created_at: new Date() });
    } else {
      await existing.docs[0].ref.update({ password_hash });
    }

    return NextResponse.json({
      ok: true,
      message: "Super admin seeded.",
      email: superAdminEmail,
    });
  } catch (e) {
    console.error("Admin seed error:", e);
    return NextResponse.json({ error: "Seed failed. Ensure Firebase Admin is configured (FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY).", details: String(e) }, { status: 500 });
  }
}

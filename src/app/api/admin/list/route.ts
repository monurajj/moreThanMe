import { NextResponse } from "next/server";
import { getAdminFromRequest, isSuperAdmin } from "@/lib/adminAuth";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(request: Request) {
  const admin = await getAdminFromRequest(request);
  if (!admin || !isSuperAdmin(admin.email)) {
    return NextResponse.json({ error: "Forbidden. Super admin only." }, { status: 403 });
  }

  const snap = await adminDb.collection("admin_users").orderBy("created_at", "desc").get();
  const admins = snap.docs.map((d) => ({ id: d.id, email: d.data().email, created_at: d.data().created_at?.toDate?.()?.toISOString?.() || d.data().created_at }));
  return NextResponse.json({ admins });
}

import { NextResponse } from "next/server";
import { getAdminFromRequest, isSuperAdmin } from "@/lib/adminAuth";
import { adminDb } from "@/lib/firebaseAdmin";

export async function DELETE(request: Request) {
  const admin = await getAdminFromRequest(request);
  if (!admin || !isSuperAdmin(admin.email)) {
    return NextResponse.json({ error: "Forbidden. Super admin only." }, { status: 403 });
  }

  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Admin id required" }, { status: 400 });
  }

  const doc = await adminDb.collection("admin_users").doc(id).get();
  if (!doc.exists) return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  if (doc.data()?.email?.toLowerCase() === "monu2feb2004@gmail.com") {
    return NextResponse.json({ error: "Cannot delete super admin" }, { status: 400 });
  }

  await adminDb.collection("admin_users").doc(id).delete();
  return NextResponse.json({ ok: true });
}

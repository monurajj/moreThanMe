import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/adminAuth";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(request: Request) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const snap = await adminDb.collection("contact_submissions").orderBy("created_at", "desc").get();
  const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json(data);
}

export async function PATCH(request: Request) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { id, read } = body;
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  await adminDb.collection("contact_submissions").doc(id).update({ read: !!read });
  const doc = await adminDb.collection("contact_submissions").doc(id).get();
  return NextResponse.json({ id: doc.id, ...doc.data() });
}

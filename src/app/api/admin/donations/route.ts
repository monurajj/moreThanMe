import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/adminAuth";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(request: Request) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const snap = await adminDb.collection("donations").orderBy("created_at", "desc").limit(200).get();
  const donations = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json(donations);
}

export async function PATCH(request: Request) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { id, status } = body;
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });

  const updates: Record<string, unknown> = { status: status || "pending" };
  if (status === "verified") updates.verified_at = new Date();
  else updates.verified_at = null;

  await adminDb.collection("donations").doc(id).update(updates);
  const doc = await adminDb.collection("donations").doc(id).get();
  return NextResponse.json({ id: doc.id, ...doc.data() });
}

import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/adminAuth";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(request: Request) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const snap = await adminDb.collection("site_settings").get();
  const map: Record<string, string> = {};
  snap.docs.forEach((d) => {
    map[d.id] = d.data().value ?? "";
  });
  return NextResponse.json(map);
}

export async function PATCH(request: Request) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const { key, value } = body;
  if (!key) return NextResponse.json({ error: "key required" }, { status: 400 });

  await adminDb.collection("site_settings").doc(String(key)).set({
    value: value != null ? String(value) : null,
    updated_at: new Date(),
  }, { merge: true });
  return NextResponse.json({ ok: true });
}

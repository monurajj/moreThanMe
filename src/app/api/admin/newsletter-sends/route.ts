import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/adminAuth";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(request: Request) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const snap = await adminDb.collection("newsletter_sends").orderBy("sent_at", "desc").limit(50).get();
  const sends = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json({ sends });
}

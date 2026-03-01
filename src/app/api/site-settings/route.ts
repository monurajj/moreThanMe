import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  const snap = await adminDb.collection("site_settings").get();
  const map: Record<string, string> = {};
  snap.docs.forEach((d) => {
    map[d.id] = d.data().value ?? "";
  });
  return NextResponse.json(map);
}

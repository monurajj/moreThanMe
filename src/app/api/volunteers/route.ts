import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  const snap = await adminDb.collection("volunteers").orderBy("created_at", "desc").get();
  const volunteers = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  return NextResponse.json(volunteers);
}

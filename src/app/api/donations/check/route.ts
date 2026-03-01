import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { transaction_id } = body;
  if (!transaction_id) return NextResponse.json({ error: "transaction_id required" }, { status: 400 });

  const snap = await adminDb.collection("donations").where("transaction_id", "==", String(transaction_id)).limit(1).get();
  if (!snap.empty) {
    return NextResponse.json({ exists: true, donation: { id: snap.docs[0].id, ...snap.docs[0].data() } }, { status: 200 });
  }
  return NextResponse.json({ exists: false });
}

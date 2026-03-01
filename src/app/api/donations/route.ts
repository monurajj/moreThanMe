import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { name, amount, transaction_id, phone, message, status, receipt_processing_status, receipt_confidence, receipt_parsed_data } = body;
  if (!name || amount == null || !transaction_id) {
    return NextResponse.json({ error: "name, amount, and transaction_id required" }, { status: 400 });
  }

  const existing = await adminDb.collection("donations").where("transaction_id", "==", String(transaction_id)).limit(1).get();
  if (!existing.empty) {
    return NextResponse.json({ error: "Transaction ID already exists" }, { status: 409 });
  }

  const ref = await adminDb.collection("donations").add({
    name: String(name),
    amount: Number(amount),
    transaction_id: String(transaction_id),
    phone: phone ? String(phone) : null,
    message: message ? String(message) : null,
    status: status || "pending",
    receipt_processing_status: receipt_processing_status || null,
    receipt_confidence: receipt_confidence != null ? Number(receipt_confidence) : null,
    receipt_parsed_data: receipt_parsed_data || null,
    verified_at: null,
    created_at: new Date(),
  });
  const doc = await ref.get();
  return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 201 });
}

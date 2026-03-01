import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

function normalizeReceiptDateTime(raw: string | null | undefined): string | null {
  if (!raw || typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (!trimmed || /invalid\s*date/i.test(trimmed)) return null;
  let d = new Date(trimmed);
  if (Number.isNaN(d.getTime())) {
    const dmY = trimmed.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
    if (dmY) d = new Date(Number(dmY[3]), Number(dmY[2]) - 1, Number(dmY[1]));
    if (Number.isNaN(d.getTime())) return trimmed;
  }
  return d.toISOString();
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { name, amount, transaction_id, phone, message, status, receipt_processing_status, receipt_confidence, receipt_parsed_data, receipt_date_time } = body;
  if (!name || amount == null || !transaction_id) {
    return NextResponse.json({ error: "name, amount, and transaction_id required" }, { status: 400 });
  }

  const existing = await adminDb.collection("donations").where("transaction_id", "==", String(transaction_id)).limit(1).get();
  if (!existing.empty) {
    return NextResponse.json({ error: "Transaction ID already exists" }, { status: 409 });
  }

  const finalStatus = status || "pending";
  const ref = await adminDb.collection("donations").add({
    name: String(name),
    amount: Number(amount),
    transaction_id: String(transaction_id),
    phone: phone ? String(phone) : null,
    message: message ? String(message) : null,
    status: finalStatus,
    receipt_processing_status: receipt_processing_status || null,
    receipt_confidence: receipt_confidence != null ? Number(receipt_confidence) : null,
    receipt_parsed_data: receipt_parsed_data || null,
    receipt_date_time: normalizeReceiptDateTime(receipt_date_time),
    verified_at: finalStatus === "verified" ? new Date() : null,
    created_at: new Date(),
  });
  const doc = await ref.get();
  return NextResponse.json({ id: doc.id, ...doc.data() }, { status: 201 });
}

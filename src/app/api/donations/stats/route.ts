import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  const snap = await adminDb.collection("donations").get();
  let total = 0;
  let verified = 0;
  let pending = 0;
  let totalAmountVerified = 0;
  let totalAmountAll = 0;
  let receiptsProcessed = 0;
  let highConfidence = 0;
  const amounts: number[] = [];
  snap.docs.forEach((d) => {
    const data = d.data();
    total++;
    const amt = Number(data.amount) || 0;
    totalAmountAll += amt;
    if (data.status === "verified") {
      verified++;
      totalAmountVerified += amt;
    } else {
      pending++;
    }
    if (data.receipt_processing_status === "completed") receiptsProcessed++;
    if (data.receipt_confidence >= 0.8) highConfidence++;
    if (amt > 0) amounts.push(amt);
  });
  return NextResponse.json({
    total_donations: total,
    verified_donations: verified,
    pending_donations: pending,
    total_amount_verified: totalAmountVerified,
    total_amount: totalAmountAll,
    average_amount: amounts.length ? totalAmountAll / amounts.length : null,
    max_amount: amounts.length ? Math.max(...amounts) : null,
    receipts_processed: receiptsProcessed,
    high_confidence_receipts: highConfidence,
  });
}

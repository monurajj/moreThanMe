import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/adminAuth";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET(request: Request) {
  const admin = await getAdminFromRequest(request);
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const snap = await adminDb.collection("donations").get();
  let total = 0;
  let verified = 0;
  let pending = 0;
  let totalAmount = 0;
  let receiptsProcessed = 0;
  snap.docs.forEach((d) => {
    const data = d.data();
    total++;
    if (data.status === "verified") {
      verified++;
      totalAmount += Number(data.amount) || 0;
    } else {
      pending++;
    }
    if (data.receipt_processing_status === "completed") receiptsProcessed++;
  });
  return NextResponse.json({
    total_donations: total,
    verified_donations: verified,
    pending_donations: pending,
    total_amount_verified: totalAmount,
    receipts_processed: receiptsProcessed,
  });
}

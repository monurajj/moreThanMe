import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

type DonorDoc = { id: string; created_at?: { toDate?: () => Date } | Date | string | number; [key: string]: unknown };

export async function GET() {
  const snap = await adminDb.collection("donations").where("status", "==", "verified").get();
  const donors: DonorDoc[] = snap.docs.map((d) => ({ id: d.id, ...d.data() } as DonorDoc));
  const toMs = (v: DonorDoc["created_at"]): number => {
    if (v == null) return 0;
    const t = v as { toDate?: () => Date } | Date | string | number;
    return typeof t === "object" && t !== null && "toDate" in t && typeof (t as { toDate: () => Date }).toDate === "function"
      ? (t as { toDate: () => Date }).toDate().getTime()
      : new Date(t as Date | string | number).getTime();
  };
  donors.sort((a, b) => toMs(b.created_at) - toMs(a.created_at));
  return NextResponse.json(donors);
}

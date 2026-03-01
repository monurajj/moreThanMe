import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  const snap = await adminDb.collection("works").orderBy("date", "desc").get();
  const data = snap.docs.map((d) => {
    const doc = d.data();
    const dateVal = doc.date;
    const dateStr =
      dateVal?.toDate ? dateVal.toDate().toISOString().slice(0, 10) : typeof dateVal === "string" ? dateVal.slice(0, 10) : null;
    return { id: d.id, ...doc, date: dateStr ?? dateVal };
  });
  return NextResponse.json(data);
}

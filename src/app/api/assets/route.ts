import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

type MediaAsset = { id: string; show_on_home?: boolean; [key: string]: unknown };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const homeOnly = searchParams.get("home") === "true";

  const snap = await adminDb.collection("media_assets").orderBy("sort_order", "asc").get();
  let data: MediaAsset[] = snap.docs.map((d) => ({ id: d.id, ...d.data() } as MediaAsset));
  if (homeOnly) data = data.filter((a) => a.show_on_home !== false);
  return NextResponse.json(data);
}

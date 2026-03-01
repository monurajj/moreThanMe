import { NextResponse } from "next/server";
import { getAdminFromRequest } from "@/lib/adminAuth";
import { uploadFile } from "@/lib/cloudinary";

export async function POST(request: Request) {
  const admin = await getAdminFromRequest(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const folder = (formData.get("folder") as string) || "morethanme";
  const resourceType = (formData.get("resource_type") as "image" | "video" | "raw" | "auto") || "auto";

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString("base64");
  const mimeType = file.type || "application/octet-stream";
  const dataUri = `data:${mimeType};base64,${base64}`;

  const result = await uploadFile(dataUri, {
    folder,
    resource_type: resourceType,
  });

  if (!result) {
    return NextResponse.json({ error: "Upload failed. Check Cloudinary config." }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    url: result.secure_url,
    public_id: result.public_id,
  });
}

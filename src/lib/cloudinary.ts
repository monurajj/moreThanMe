import { v2 as cloudinary } from "cloudinary";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (cloudName && apiKey && apiSecret) {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
}

export { cloudinary };

export interface UploadResult {
  secure_url: string;
  public_id: string;
  width?: number;
  height?: number;
  format?: string;
  resource_type?: string;
}

export async function uploadImage(
  file: string | Buffer,
  options?: { folder?: string; public_id?: string }
): Promise<UploadResult | null> {
  if (!cloudName || !apiKey || !apiSecret) {
    console.error("Cloudinary not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET");
    return null;
  }
  try {
    const result = await cloudinary.uploader.upload(file as string, {
      folder: options?.folder || "morethanme",
      resource_type: "image",
      ...options,
    });
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
    };
  } catch (e) {
    console.error("Cloudinary upload error:", e);
    return null;
  }
}

export async function uploadFile(
  file: string | Buffer,
  options?: { folder?: string; resource_type?: "image" | "video" | "raw" | "auto" }
): Promise<UploadResult | null> {
  // Accept data URI (data:image/png;base64,...), URL, or file path
  if (!cloudName || !apiKey || !apiSecret) {
    console.error("Cloudinary not configured");
    return null;
  }
  try {
    const result = await cloudinary.uploader.upload(file as string, {
      folder: options?.folder || "morethanme",
      resource_type: options?.resource_type || "auto",
      ...options,
    });
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
    };
  } catch (e) {
    console.error("Cloudinary upload error:", e);
    return null;
  }
}

export function getCloudinaryUrl(publicId: string, options?: { width?: number; height?: number; crop?: string }) {
  if (!cloudName) return "";
  const transforms = options?.width || options?.height
    ? `w_${options.width || "auto"},h_${options.height || "auto"},c_${options.crop || "fill"}`
    : "";
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms ? transforms + "/" : ""}${publicId}`;
}

import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
import type { NewsletterResponse } from "@/types/newsletter";

export async function GET() {
  try {
    const snap = await adminDb.collection("newsletters").orderBy("created_at", "desc").get();
    if (snap.empty) return NextResponse.json({});

    const grouped: NewsletterResponse = {};
    const toCreatedAtString = (v: unknown): string => {
      if (v == null) return "";
      const t = v as { toDate?: () => Date } | Date | string;
      if (typeof t === "object" && t !== null && "toDate" in t && typeof (t as { toDate: () => Date }).toDate === "function")
        return (t as { toDate: () => Date }).toDate().toISOString();
      if (typeof t === "string") return t;
      return (t instanceof Date ? t : new Date(t as number)).toISOString();
    };

    for (const d of snap.docs) {
      const newsletter = { id: d.id, ...d.data() } as { id: string; file_path: string; title: string; description?: string; category: string; created_at: unknown };
      const url =
        newsletter.file_path?.startsWith("http://") || newsletter.file_path?.startsWith("https://")
          ? newsletter.file_path
          : newsletter.file_path || "";
      const newsletterWithUrl = {
        id: newsletter.id,
        title: newsletter.title,
        description: newsletter.description,
        category: newsletter.category,
        file_path: newsletter.file_path,
        created_at: toCreatedAtString(newsletter.created_at),
        url,
      };
      if (!grouped[newsletter.category]) grouped[newsletter.category] = [];
      grouped[newsletter.category].push(newsletterWithUrl);
    }
    return NextResponse.json(grouped);
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}


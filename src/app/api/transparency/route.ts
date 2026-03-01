import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const [donationsSnap, expendituresSnap] = await Promise.all([
      adminDb.collection("donations").get(),
      adminDb.collection("expenditures").orderBy("date", "desc").get(),
    ]);

    let totalFunding = 0;
    donationsSnap.docs.forEach((d) => {
      const data = d.data();
      if (data.status === "verified") totalFunding += Number(data.amount) || 0;
    });

    const byMonth: Record<string, number> = {};
    let totalExpenditure = 0;
    expendituresSnap.docs.forEach((d) => {
      const data = d.data();
      const amt = Number(data.amount) || 0;
      totalExpenditure += amt;
      const date = data.date?.toDate ? data.date.toDate() : new Date(data.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      byMonth[monthKey] = (byMonth[monthKey] || 0) + amt;
    });

    const monthly_expenditure = Object.entries(byMonth)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([month_key, total]) => {
        const [y, m] = month_key.split("-");
        const d = new Date(Number(y), Number(m) - 1, 1);
        const month_label = d.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
        return { month_key, month_label, total };
      });

    return NextResponse.json({
      total_funding: totalFunding,
      total_expenditure: totalExpenditure,
      remaining_balance: totalFunding - totalExpenditure,
      monthly_expenditure,
    });
  } catch (e) {
    console.error("Transparency API error:", e);
    return NextResponse.json(
      { error: "Failed to load transparency data", monthly_expenditure: [], total_funding: 0, total_expenditure: 0, remaining_balance: 0 },
      { status: 500 }
    );
  }
}

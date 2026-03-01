import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import * as jose from "jose";

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "admin_token";
const SUPER_ADMIN_EMAIL = process.env.SUPER_ADMIN_EMAIL ?? "";
const SUPER_ADMIN_PASSWORD = process.env.SUPER_ADMIN_PASSWORD ?? "";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password || typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 });
    }

    const emailLower = email.trim().toLowerCase();
    let user: { id: string; email: string; password_hash: string } | null = null;

    try {
      const { adminDb } = await import("@/lib/firebaseAdmin");
      const snap = await adminDb.collection("admin_users").where("email", "==", emailLower).limit(1).get();
      const doc = snap.docs[0];
      if (doc) {
        const d = doc.data();
        user = { id: doc.id, email: d.email, password_hash: d.password_hash };
      }
    } catch (dbErr) {
      console.error("Admin login DB error:", dbErr);
    }

    if (!user) {
      if (SUPER_ADMIN_EMAIL && emailLower === SUPER_ADMIN_EMAIL.toLowerCase() && password === SUPER_ADMIN_PASSWORD) {
        user = {
          id: "super-admin",
          email: SUPER_ADMIN_EMAIL,
          password_hash: "",
        };
      } else {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }
    } else {
      const match = await bcrypt.compare(password, user.password_hash);
      if (!match) {
        return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
      }
    }

    if (!JWT_SECRET) {
      console.error("JWT_SECRET is not set");
      return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
    }
    const secret = new TextEncoder().encode(JWT_SECRET);
    const token = await new jose.SignJWT({ email: user.email, sub: user.id })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("7d")
      .sign(secret);

    const res = NextResponse.json({ ok: true, token, email: user.email });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
    return res;
  } catch (e) {
    console.error("Admin login error:", e);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}

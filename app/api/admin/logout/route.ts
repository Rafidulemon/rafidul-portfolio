import { NextResponse } from "next/server";
import { SESSION_COOKIE } from "@/app/lib/admin/session";

export const runtime = "nodejs";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return res;
}

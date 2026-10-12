import { NextResponse } from "next/server";
import { credentialsValid } from "@/app/lib/admin/guard";
import {
  SESSION_COOKIE,
  SESSION_TTL_SECONDS,
  createSessionToken,
} from "@/app/lib/admin/session";
import { getClientIp, rateLimit } from "@/app/lib/ai/ratelimit";

export const runtime = "nodejs";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const limited = rateLimit(`admin-login:${ip}`, 5, 15 * 60_000);
  if (!limited.ok) {
    return NextResponse.json(
      { success: false, error: `Too many attempts. Try again in ${Math.ceil(limited.retryAfter / 60)} min.` },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } }
    );
  }

  let username = "";
  let password = "";
  try {
    const body = await req.json();
    username = String(body.username ?? "").slice(0, 200);
    password = String(body.password ?? "").slice(0, 200);
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  if (!credentialsValid(username, password)) {
    await sleep(700); // slows down guessing
    return NextResponse.json(
      { success: false, error: "Invalid username or password" },
      { status: 401 }
    );
  }

  const token = await createSessionToken();
  if (!token) {
    return NextResponse.json(
      { success: false, error: "Admin login is not configured on the server" },
      { status: 500 }
    );
  }

  const res = NextResponse.json({ success: true });
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return res;
}

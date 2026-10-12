import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createHash, timingSafeEqual } from "node:crypto";
import { SESSION_COOKIE, verifySessionToken } from "./session";

const sha = (s: string) => new Uint8Array(createHash("sha256").update(s).digest());

/** Constant-time credential check against ADMIN_USERNAME / ADMIN_PASSWORD. */
export function credentialsValid(username: string, password: string): boolean {
  const u = process.env.ADMIN_USERNAME;
  const p = process.env.ADMIN_PASSWORD;
  if (!u || !p) return false;
  // Compare both fields even when the first fails, so timing doesn't reveal which was wrong.
  const userOk = timingSafeEqual(sha(username), sha(u));
  const passOk = timingSafeEqual(sha(password), sha(p));
  return userOk && passOk;
}

export async function isAdmin(): Promise<boolean> {
  return verifySessionToken(cookies().get(SESSION_COOKIE)?.value);
}

/**
 * Call first in every /api/admin handler. (Middleware also guards these paths, but
 * older Next.js versions had middleware-bypass bugs, so handlers never trust it alone.)
 * Returns a Response to send back when the request must be refused, otherwise null.
 */
export async function requireAdmin(req: Request): Promise<NextResponse | null> {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!["GET", "HEAD", "OPTIONS"].includes(req.method)) {
    // CSRF defence in depth on top of SameSite=Strict: writes must come from this site.
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    let ok = false;
    try {
      ok = !!origin && !!host && new URL(origin).host === host;
    } catch {
      ok = false;
    }
    if (!ok) return NextResponse.json({ error: "Bad origin" }, { status: 403 });
  }
  return null;
}

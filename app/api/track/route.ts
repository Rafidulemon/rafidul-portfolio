import { NextResponse } from "next/server";
import { isAdmin } from "@/app/lib/admin/guard";
import { classifySource, hashIp, isBot, parseUserAgent, recordView } from "@/app/lib/analytics";
import { dbEnabled } from "@/app/lib/db";
import { getClientIp, rateLimit } from "@/app/lib/ai/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ID_RE = /^[A-Za-z0-9-]{8,64}$/;
const str = (v: unknown, max: number) => String(v ?? "").replace(/[\u0000-\u001f]/g, "").trim().slice(0, max);

// Country/city come from the hosting platform's edge headers (Vercel or Cloudflare).
function geo(req: Request) {
  const h = req.headers;
  const dec = (v: string | null) => {
    try {
      return decodeURIComponent(v ?? "");
    } catch {
      return v ?? "";
    }
  };
  return {
    country: (h.get("x-vercel-ip-country") || h.get("cf-ipcountry") || "").toUpperCase().slice(0, 2),
    region: dec(h.get("x-vercel-ip-country-region")).slice(0, 60),
    city: dec(h.get("x-vercel-ip-city")).slice(0, 80),
  };
}

export async function POST(req: Request) {
  const ok = NextResponse.json({ ok: true });
  if (!dbEnabled) return ok;
  try {
    const ua = req.headers.get("user-agent") ?? "";
    // Never count crawlers, the site owner browsing while signed in, or people who sent Do Not Track.
    if (isBot(ua) || req.headers.get("dnt") === "1" || (await isAdmin())) return ok;

    if (!rateLimit(`track:${getClientIp(req)}`, 120, 10 * 60_000).ok) return ok;

    const b = await req.json().catch(() => null);
    if (!b || !ID_RE.test(String(b.visitorId)) || !ID_RE.test(String(b.sessionId))) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }
    const path = str(b.path, 300);
    if (!path.startsWith("/") || path.startsWith("/admin") || path.startsWith("/api")) return ok;

    // Only an entry view carries an external referrer; the rest of the session is "internal".
    let referrer = "";
    let referrerHost = "";
    const isEntry = !!b.entry;
    if (isEntry && b.referrer) {
      try {
        const u = new URL(String(b.referrer));
        const own = (req.headers.get("host") || "").toLowerCase();
        if (/^https?:$/.test(u.protocol) && u.host.toLowerCase() !== own) {
          referrerHost = u.hostname.replace(/^www\./, "").slice(0, 120);
          referrer = `${u.origin}${u.pathname}`.slice(0, 300); // query strings are dropped on purpose
        }
      } catch {
        // not a URL: ignore
      }
    }
    const utmSource = isEntry ? str(b.utm?.source, 60) : "";

    await recordView({
      visitorId: String(b.visitorId),
      sessionId: String(b.sessionId),
      path,
      referrer,
      referrerHost,
      source: classifySource(referrerHost, utmSource, isEntry),
      utmSource,
      utmMedium: isEntry ? str(b.utm?.medium, 60) : "",
      utmCampaign: isEntry ? str(b.utm?.campaign, 100) : "",
      ...geo(req),
      ...parseUserAgent(ua),
      language: str(b.language, 20),
      screen: str(b.screen, 20),
      ipHash: hashIp(getClientIp(req)),
    });
  } catch (error) {
    console.error("[track] failed:", error);
  }
  return ok;
}

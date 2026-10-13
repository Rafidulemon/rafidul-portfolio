import { createHash } from "node:crypto";
import { ensureSchema, sql } from "./db";

/* ---------- user-agent / referrer parsing (no dependencies) ---------- */

const BOT_RE = /bot|crawl|spider|slurp|headless|lighthouse|pagespeed|preview|monitor|uptime|curl|wget|python-requests|axios|go-http|java\/|scrapy|facebookexternalhit|embedly|whatsapp|telegram|discord|vercel-screenshot/i;
export const isBot = (ua: string) => !ua || BOT_RE.test(ua);

export function parseUserAgent(ua: string) {
  const device = /ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(ua)
    ? "Tablet"
    : /mobi|iphone|ipod|android|phone/i.test(ua)
      ? "Mobile"
      : "Desktop";
  const browser = /edg(e|a|ios)?\//i.test(ua)
    ? "Edge"
    : /opr\/|opera/i.test(ua)
      ? "Opera"
      : /samsungbrowser/i.test(ua)
        ? "Samsung Internet"
        : /firefox|fxios/i.test(ua)
          ? "Firefox"
          : /chrome|crios/i.test(ua)
            ? "Chrome"
            : /safari/i.test(ua)
              ? "Safari"
              : "Other";
  const os = /windows/i.test(ua)
    ? "Windows"
    : /iphone|ipad|ipod/i.test(ua)
      ? "iOS"
      : /android/i.test(ua)
        ? "Android"
        : /mac os x|macintosh/i.test(ua)
          ? "macOS"
          : /cros/i.test(ua)
            ? "ChromeOS"
            : /linux/i.test(ua)
              ? "Linux"
              : "Other";
  return { device, browser, os };
}

const SOURCES: [RegExp, string][] = [
  [/(^|\.)google\./i, "Google"],
  [/(^|\.)bing\.com$/i, "Bing"],
  [/duckduckgo\.com$/i, "DuckDuckGo"],
  [/(^|\.)yahoo\./i, "Yahoo"],
  [/ecosia\.org$|brave\.com$|startpage\.com$/i, "Search (other)"],
  [/linkedin\.com$|lnkd\.in$/i, "LinkedIn"],
  [/github\.com$/i, "GitHub"],
  [/(^|\.)(twitter\.com|x\.com|t\.co)$/i, "X / Twitter"],
  [/facebook\.com$|fb\.com$|l\.facebook\.com$/i, "Facebook"],
  [/instagram\.com$/i, "Instagram"],
  [/youtube\.com$|youtu\.be$/i, "YouTube"],
  [/reddit\.com$/i, "Reddit"],
  [/(^|\.)(medium\.com|dev\.to|hashnode\.com)$/i, "Blog platform"],
  [/whatsapp\.com$|wa\.me$/i, "WhatsApp"],
  [/(^|\.)(mail\.google\.com|outlook\.live\.com|outlook\.office\.com)$/i, "Email"],
];

/** Where did this visit come from? UTM beats referrer; no referrer means direct. */
export function classifySource(referrerHost: string, utmSource: string, isEntry: boolean) {
  if (!isEntry) return "internal";
  if (utmSource) return utmSource.slice(0, 60);
  if (!referrerHost) return "Direct";
  for (const [re, name] of SOURCES) if (re.test(referrerHost)) return name;
  return referrerHost;
}

/* ---------- recording ---------- */

// Raw IPs are never stored: only a salted hash that changes every day, enough to spot repeat
// requests within a day but not to follow a person over time.
const dailySalt = () =>
  (process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || "portfolio") + new Date().toISOString().slice(0, 10);
export const hashIp = (ip: string) => createHash("sha256").update(dailySalt() + ip).digest("hex").slice(0, 24);

export type NewView = {
  visitorId: string;
  sessionId: string;
  path: string;
  referrer: string;
  referrerHost: string;
  source: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  country: string;
  region: string;
  city: string;
  device: string;
  browser: string;
  os: string;
  language: string;
  screen: string;
  ipHash: string;
};

export async function recordView(v: NewView) {
  await ensureSchema();
  await sql`insert into page_views
    (visitor_id, session_id, path, referrer, referrer_host, source, utm_source, utm_medium, utm_campaign,
     country, region, city, device, browser, os, language, screen, ip_hash)
    values (${v.visitorId}, ${v.sessionId}, ${v.path}, ${v.referrer}, ${v.referrerHost}, ${v.source}, ${v.utmSource},
     ${v.utmMedium}, ${v.utmCampaign}, ${v.country}, ${v.region}, ${v.city}, ${v.device}, ${v.browser}, ${v.os},
     ${v.language}, ${v.screen}, ${v.ipHash})`;
}

/* ---------- reporting ---------- */

export const RANGES = { "24h": 1, "7d": 7, "30d": 30, "90d": 90 } as const;
export type RangeKey = keyof typeof RANGES;

type Row = Record<string, unknown>;
const rows = (r: Row[]) => r.map((x) => ({ label: String(x.label || "Unknown"), count: Number(x.n) }));

export async function getStats(range: RangeKey) {
  await ensureSchema();
  const days = RANGES[range];
  const hourly = range === "24h";

  const [totals, series, pages, sources, hosts, countries, cities, devices, browsers, systems, recent, live] = await Promise.all([
    sql`select count(*)::int views, count(distinct visitor_id)::int visitors, count(distinct session_id)::int sessions
        from page_views where created_at > now() - (${days}::int * interval '1 day')`,
    hourly
      ? sql`select date_trunc('hour', created_at) t, count(*)::int views, count(distinct visitor_id)::int visitors
            from page_views where created_at > now() - interval '24 hours' group by 1 order by 1`
      : sql`select date_trunc('day', created_at) t, count(*)::int views, count(distinct visitor_id)::int visitors
            from page_views where created_at > now() - (${days}::int * interval '1 day') group by 1 order by 1`,
    sql`select path label, count(*)::int n from page_views where created_at > now() - (${days}::int * interval '1 day')
        group by 1 order by n desc limit 10`,
    sql`select source label, count(*)::int n from page_views where source <> 'internal' and created_at > now() - (${days}::int * interval '1 day')
        group by 1 order by n desc limit 10`,
    sql`select referrer_host label, count(*)::int n from page_views where referrer_host <> '' and created_at > now() - (${days}::int * interval '1 day')
        group by 1 order by n desc limit 10`,
    sql`select country label, count(distinct visitor_id)::int n from page_views where created_at > now() - (${days}::int * interval '1 day')
        group by 1 order by n desc limit 10`,
    sql`select (case when city = '' then '' else city || ', ' || country end) label, count(distinct visitor_id)::int n from page_views
        where city <> '' and created_at > now() - (${days}::int * interval '1 day') group by 1 order by n desc limit 10`,
    sql`select device label, count(distinct visitor_id)::int n from page_views where created_at > now() - (${days}::int * interval '1 day') group by 1 order by n desc`,
    sql`select browser label, count(distinct visitor_id)::int n from page_views where created_at > now() - (${days}::int * interval '1 day') group by 1 order by n desc limit 6`,
    sql`select os label, count(distinct visitor_id)::int n from page_views where created_at > now() - (${days}::int * interval '1 day') group by 1 order by n desc limit 6`,
    sql`select id, created_at, path, source, referrer_host, utm_campaign, country, city, device, browser, os, visitor_id
        from page_views order by created_at desc limit 40`,
    sql`select count(distinct visitor_id)::int n from page_views where created_at > now() - interval '5 minutes'`,
  ]);

  // Fill gaps so quiet days/hours still show up in the chart.
  const step = hourly ? 3_600_000 : 86_400_000;
  const slots = hourly ? 24 : days;
  const end = Math.floor(Date.now() / step) * step;
  const map = new Map(series.map((r) => [new Date(r.t as string).getTime(), r]));
  const chart = Array.from({ length: slots }, (_, i) => {
    const t = end - (slots - 1 - i) * step;
    const r = map.get(t);
    return { t: new Date(t).toISOString(), views: Number(r?.views ?? 0), visitors: Number(r?.visitors ?? 0) };
  });

  const t = totals[0];
  return {
    range,
    totals: {
      views: Number(t.views),
      visitors: Number(t.visitors),
      sessions: Number(t.sessions),
      pagesPerSession: Number(t.sessions) ? Math.round((Number(t.views) / Number(t.sessions)) * 10) / 10 : 0,
      live: Number(live[0].n),
    },
    chart,
    pages: rows(pages),
    sources: rows(sources),
    referrers: rows(hosts),
    countries: rows(countries),
    cities: rows(cities),
    devices: rows(devices),
    browsers: rows(browsers),
    systems: rows(systems),
    recent: recent.map((r) => ({
      id: String(r.id),
      at: new Date(r.created_at as string).toISOString(),
      path: r.path as string,
      source: r.source as string,
      referrerHost: r.referrer_host as string,
      campaign: r.utm_campaign as string,
      country: r.country as string,
      city: r.city as string,
      device: r.device as string,
      browser: r.browser as string,
      os: r.os as string,
      visitor: String(r.visitor_id).slice(0, 6),
    })),
  };
}

export async function clearViews() {
  await ensureSchema();
  await sql`truncate page_views`;
}

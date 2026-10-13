/**
 * Images live in Cloudflare R2. The database and data files store only the object *key*
 * (e.g. "portfolio/uploads/ab12.png"); this turns whatever is stored into a loadable URL.
 *
 * Accepted values: an https URL (used as-is), a site path starting with "/" (a file in /public,
 * or a legacy /api/media/<id> upload) and anything else, which is treated as an R2 key.
 */
const BASE = (process.env.NEXT_PUBLIC_MEDIA_BASE ?? "").replace(/\/+$/, "");

export const isRemoteUrl = (v: string) => /^https?:\/\//i.test(v);

export function mediaUrl(value: string | null | undefined): string {
  const v = (value ?? "").trim();
  if (!v) return "";
  if (isRemoteUrl(v) || v.startsWith("/") || v.startsWith("data:")) return v;
  return BASE ? `${BASE}/${v.replace(/^\/+/, "")}` : `/${v}`;
}

/** True when the URL points at our own R2 bucket (safe to run through next/image). */
export const isMediaHost = (url: string) => !!BASE && url.startsWith(`${BASE}/`);

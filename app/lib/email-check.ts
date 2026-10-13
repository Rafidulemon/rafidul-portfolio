import { lookup, resolveMx, resolve4, resolve6 } from "node:dns/promises";

// Pragmatic RFC-5322-ish check: one @, sane local part, a dotted domain with a 2+ letter TLD.
const EMAIL_RE = /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

export type EmailCheck = { ok: true } | { ok: false; message: string };

const withTimeout = <T,>(p: Promise<T>, ms: number) =>
  Promise.race([p, new Promise<never>((_, rej) => setTimeout(() => rej(new Error("timeout")), ms))]);

/**
 * Validates syntax, then confirms the domain can actually receive mail (MX, or an A/AAAA record
 * as a fallback). A DNS timeout or outage never blocks a real person: only a definitive
 * "this domain does not exist / has no mail server" answer rejects.
 */
export async function checkEmail(raw: string): Promise<EmailCheck> {
  const email = raw.trim();
  if (!email) return { ok: false, message: "Email is required" };
  if (email.length > 200 || email.split("@")[0].length > 64 || !EMAIL_RE.test(email) || email.includes("..")) {
    return { ok: false, message: "Please enter a valid email address" };
  }
  const domain = email.split("@")[1].toLowerCase();
  try {
    const mx = await withTimeout(resolveMx(domain), 3000);
    if (mx.length) return { ok: true };
  } catch (e) {
    const code = (e as NodeJS.ErrnoException).code;
    if (code !== "ENODATA" && code !== "ENOTFOUND") {
      // The DNS-protocol resolver itself failed (some networks block it): ask the OS resolver instead.
      try {
        await withTimeout(lookup(domain), 3000);
        return { ok: true };
      } catch (err) {
        const c = (err as NodeJS.ErrnoException).code;
        return c === "ENOTFOUND" || c === "ENODATA" ? { ok: false, message: `The domain “${domain}” can't receive email. Please check the address.` } : { ok: true };
      }
    }
  }
  try {
    const a = await withTimeout(Promise.any([resolve4(domain), resolve6(domain)]), 3000);
    if (a.length) return { ok: true };
  } catch (e) {
    const errors = e instanceof AggregateError ? e.errors : [e];
    const definitive = errors.every((x) => ["ENODATA", "ENOTFOUND"].includes((x as NodeJS.ErrnoException).code ?? ""));
    if (!definitive) return { ok: true };
  }
  return { ok: false, message: `The domain “${domain}” can't receive email. Please check the address.` };
}

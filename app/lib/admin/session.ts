// Edge-safe (Web Crypto only) so the same code runs in middleware and route handlers.

export const SESSION_COOKIE = "admin_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

const encoder = new TextEncoder();

const secretMaterial = () => {
  if (process.env.ADMIN_SESSION_SECRET) return process.env.ADMIN_SESSION_SECRET;
  // Works out of the box: derived from the admin credentials. Changing the
  // username or password therefore invalidates every existing session.
  if (process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD) {
    return `derived:${process.env.ADMIN_USERNAME}:${process.env.ADMIN_PASSWORD}`;
  }
  return null;
};

const toB64Url = (bytes: ArrayBuffer | Uint8Array) => {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let bin = "";
  arr.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const fromB64Url = (s: string) => {
  const pad = s.length % 4 === 0 ? "" : "=".repeat(4 - (s.length % 4));
  const bin = atob(s.replace(/-/g, "+").replace(/_/g, "/") + pad);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};

const hmacKey = async (usage: "sign" | "verify") => {
  const secret = secretMaterial();
  if (!secret) return null;
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage]
  );
};

export async function createSessionToken(): Promise<string | null> {
  const key = await hmacKey("sign");
  if (!key) return null;
  const now = Math.floor(Date.now() / 1000);
  const payload = toB64Url(
    encoder.encode(JSON.stringify({ sub: "admin", iat: now, exp: now + SESSION_TTL_SECONDS }))
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return `${payload}.${toB64Url(sig)}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  try {
    const key = await hmacKey("verify");
    if (!key) return false;
    // crypto.subtle.verify compares in constant time.
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromB64Url(sig),
      encoder.encode(payload)
    );
    if (!valid) return false;
    const data = JSON.parse(new TextDecoder().decode(fromB64Url(payload)));
    return data.sub === "admin" && typeof data.exp === "number" && data.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

// Best-effort in-memory limiter. On serverless each instance has its own
// memory, so this stops casual abuse but is not a hard global cap; swap in
// Upstash Redis if you ever need strict guarantees.
const hits: Record<string, number[]> = {};
let lastSweep = 0;

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { ok: boolean; retryAfter: number } {
  const now = Date.now();

  if (now - lastSweep > 60_000) {
    lastSweep = now;
    Object.keys(hits).forEach((k) => {
      const fresh = hits[k].filter((t) => now - t < 3_600_000);
      if (fresh.length) hits[k] = fresh;
      else delete hits[k];
    });
  }

  const recent = (hits[key] ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits[key] = recent;
    return {
      ok: false,
      retryAfter: Math.max(1, Math.ceil((windowMs - (now - recent[0])) / 1000)),
    };
  }
  recent.push(now);
  hits[key] = recent;
  return { ok: true, retryAfter: 0 };
}

// Daily ceiling across all visitors, to protect the free-tier quota.
let dayKey = "";
let dayCount = 0;
export function dailyBudgetOk(max: number): boolean {
  const today = new Date().toISOString().slice(0, 10);
  if (today !== dayKey) {
    dayKey = today;
    dayCount = 0;
  }
  dayCount += 1;
  return dayCount <= max;
}

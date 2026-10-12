import { NextResponse } from "next/server";
import { retrieve, DocKind } from "@/app/lib/ai/knowledge";
import { getClientIp, rateLimit } from "@/app/lib/ai/ratelimit";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") ?? "").trim().slice(0, 200);
  if (q.length < 2) return NextResponse.json({ results: [] });

  const limited = rateLimit(`search:${getClientIp(req)}`, 40, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many searches" }, { status: 429 });
  }

  const requested = new URL(req.url).searchParams.get("kind") as DocKind | null;
  const all: DocKind[] = ["project", "blog", "skill", "service"];
  const kinds = requested && all.includes(requested) ? [requested] : all;

  const results = await retrieve(q, 8, kinds, { cutoff: true });
  return NextResponse.json({
    results: results.map((r) => ({
      uid: r.uid,
      kind: r.kind,
      title: r.title,
      snippet: (r.summary ?? r.text).slice(0, 160),
      meta: r.meta ?? "",
      href: r.href,
    })),
  });
}

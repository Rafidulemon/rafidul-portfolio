"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { PageLoader } from "@/app/components/display/Spinner";
import { Button, Card, api, cx, useToasts } from "./ui";

type Item = { label: string; count: number };
type Stats = {
  range: string;
  totals: { views: number; visitors: number; sessions: number; pagesPerSession: number; live: number };
  chart: { t: string; views: number; visitors: number }[];
  pages: Item[];
  sources: Item[];
  referrers: Item[];
  countries: Item[];
  cities: Item[];
  devices: Item[];
  browsers: Item[];
  systems: Item[];
  recent: {
    id: string;
    at: string;
    path: string;
    source: string;
    referrerHost: string;
    campaign: string;
    country: string;
    city: string;
    device: string;
    browser: string;
    os: string;
    visitor: string;
  }[];
};

const RANGES = [
  { id: "24h", label: "24 hours" },
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "90d", label: "90 days" },
];

const flag = (cc: string) =>
  /^[A-Z]{2}$/.test(cc) ? String.fromCodePoint(...Array.from(cc).map((c) => 0x1f1e6 + c.charCodeAt(0) - 65)) : "🌐";

let regionNames: Intl.DisplayNames | null = null;
const countryName = (cc: string) => {
  try {
    regionNames ??= new Intl.DisplayNames(["en"], { type: "region" });
    return regionNames.of(cc) ?? cc;
  } catch {
    return cc;
  }
};

const ago = (iso: string) => {
  const s = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 1000));
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.round(s / 60)}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  return `${Math.round(s / 86400)}d ago`;
};

function Stat({ label, value, hint, accent }: { label: string; value: string | number; hint?: string; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/60">
      <div className="text-xs text-slate-500">{label}</div>
      <div className={cx("mt-1 text-2xl font-bold", accent ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white")}>{value}</div>
      {hint && <div className="text-[11px] text-slate-500">{hint}</div>}
    </div>
  );
}

function Bars({ title, items, format }: { title: string; items: Item[]; format?: (l: string) => string }) {
  const max = Math.max(1, ...items.map((i) => i.count));
  return (
    <Card>
      <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">No data yet.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((i) => (
            <li key={i.label}>
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="truncate text-slate-700 dark:text-slate-200" title={i.label}>
                  {format ? format(i.label) : i.label}
                </span>
                <span className="shrink-0 tabular-nums text-slate-500">{i.count}</span>
              </div>
              <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500" style={{ width: `${(i.count / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

function Chart({ data, hourly }: { data: Stats["chart"]; hourly: boolean }) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(1, ...data.map((d) => d.views));
  const label = (iso: string) =>
    new Date(iso).toLocaleString(undefined, hourly ? { hour: "2-digit", minute: "2-digit" } : { day: "numeric", month: "short" });
  const h = hover != null ? data[hover] : null;
  return (
    <div>
      <div className="mb-2 flex h-5 items-center justify-between text-xs text-slate-500">
        <span>{h ? `${label(h.t)} · ${h.views} view${h.views === 1 ? "" : "s"} · ${h.visitors} visitor${h.visitors === 1 ? "" : "s"}` : "Page views"}</span>
        <span className="flex items-center gap-3">
          <span className="flex items-center gap-1"><i className="inline-block h-2 w-2 rounded-sm bg-cyan-500" /> Views</span>
          <span className="flex items-center gap-1"><i className="inline-block h-2 w-2 rounded-sm bg-emerald-400" /> Visitors</span>
        </span>
      </div>
      <div className="flex h-44 items-end gap-[3px]" onMouseLeave={() => setHover(null)} role="img" aria-label="Views over time">
        {data.map((d, i) => (
          <div key={d.t} className="relative flex h-full flex-1 items-end justify-center gap-px" onMouseEnter={() => setHover(i)} onTouchStart={() => setHover(i)}>
            <div className={cx("w-full rounded-t bg-cyan-500 transition-opacity", hover != null && hover !== i && "opacity-40")} style={{ height: `${(d.views / max) * 100}%`, minHeight: d.views ? 2 : 0 }} />
            <div className={cx("w-full rounded-t bg-emerald-400 transition-opacity", hover != null && hover !== i && "opacity-40")} style={{ height: `${(d.visitors / max) * 100}%`, minHeight: d.visitors ? 2 : 0 }} />
          </div>
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[11px] text-slate-500">
        <span>{label(data[0].t)}</span>
        <span>{label(data[data.length - 1].t)}</span>
      </div>
    </div>
  );
}

export default function VisitorsAdmin() {
  const { push, view: toasts } = useToasts();
  const [range, setRange] = useState("7d");
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    const res = await api<Stats>(`/api/admin/analytics?range=${range}`);
    if (res.ok) {
      setStats(res.data);
      setError("");
    } else setError(res.data.error || "Could not load visitor data");
  }, [range]);

  useEffect(() => {
    load();
    const t = setInterval(load, 30_000);
    return () => clearInterval(t);
  }, [load]);

  const clear = async () => {
    if (!confirm("Delete ALL recorded visits? This cannot be undone.")) return;
    const res = await api("/api/admin/analytics", { method: "DELETE" });
    if (res.ok) {
      push("success", "Visitor data cleared.");
      load();
    } else push("error", res.data.error || "Could not clear data");
  };

  const countries = useMemo(() => stats?.countries.filter((c) => c.label !== "Unknown") ?? [], [stats]);

  return (
    <div className="mx-auto max-w-6xl">
      {toasts}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Visitors</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">Who visits your site, where they come from and what they read.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRange(r.id)}
              className={cx(
                "rounded-full border px-3 py-1 text-sm transition",
                range === r.id
                  ? "border-cyan-600 bg-cyan-600 text-white"
                  : "border-slate-300 text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="mt-4 rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-700 dark:text-red-300">{error}</p>}
      {!stats && !error && <PageLoader label="Loading visitor data…" />}

      {stats && (
        <div className="mt-5 space-y-4">
          <div className="grid grid-cols-2 gap-3 min-[1024px]:grid-cols-5">
            <Stat label="Unique visitors" value={stats.totals.visitors} />
            <Stat label="Page views" value={stats.totals.views} />
            <Stat label="Sessions" value={stats.totals.sessions} />
            <Stat label="Pages / session" value={stats.totals.pagesPerSession} />
            <Stat label="Online now" value={stats.totals.live} hint="last 5 minutes" accent />
          </div>

          <Card>
            {stats.totals.views === 0 ? (
              <p className="py-10 text-center text-sm text-slate-500">
                No visits recorded in this period yet. Your own visits aren&apos;t counted while you&apos;re signed in to the admin panel.
              </p>
            ) : (
              <Chart data={stats.chart} hourly={stats.range === "24h"} />
            )}
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Bars title="Where visitors come from" items={stats.sources} />
            <Bars title="Top referring sites" items={stats.referrers} />
            <Bars title="Top pages" items={stats.pages} />
            <Bars title="Countries" items={countries} format={(l) => `${flag(l)}  ${countryName(l)}`} />
            <Bars title="Cities" items={stats.cities} />
            <Bars title="Devices" items={stats.devices} />
            <Bars title="Browsers" items={stats.browsers} />
            <Bars title="Operating systems" items={stats.systems} />
          </div>

          <Card className="!p-0 overflow-hidden">
            <div className="border-b border-slate-200 px-5 py-3 dark:border-slate-800">
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Recent visits</h3>
              <p className="text-xs text-slate-500">Latest 40 page views. Visitor IDs are anonymous.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead className="text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-5 py-2 font-medium">When</th>
                    <th className="px-3 py-2 font-medium">Page</th>
                    <th className="px-3 py-2 font-medium">From</th>
                    <th className="px-3 py-2 font-medium">Location</th>
                    <th className="px-3 py-2 font-medium">Device</th>
                    <th className="px-5 py-2 font-medium">Visitor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {stats.recent.map((r) => (
                    <tr key={r.id} className="text-slate-700 dark:text-slate-200">
                      <td className="whitespace-nowrap px-5 py-2 text-slate-500" title={new Date(r.at).toLocaleString()}>{ago(r.at)}</td>
                      <td className="max-w-[220px] truncate px-3 py-2 font-mono text-xs" title={r.path}>{r.path}</td>
                      <td className="px-3 py-2">
                        {r.source === "internal" ? <span className="text-slate-400">internal</span> : r.source}
                        {r.campaign && <span className="ml-1 text-xs text-slate-500">({r.campaign})</span>}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2">
                        {r.country ? `${flag(r.country)} ${r.city || countryName(r.country)}` : <span className="text-slate-400">Unknown</span>}
                      </td>
                      <td className="whitespace-nowrap px-3 py-2">{r.device} · {r.browser} · {r.os}</td>
                      <td className="px-5 py-2 font-mono text-xs text-slate-500">{r.visitor}</td>
                    </tr>
                  ))}
                  {stats.recent.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-5 py-8 text-center text-slate-500">No visits yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <p>
              Privacy: raw IP addresses are never stored (only a daily-changing hash). Bots, Do-Not-Track visitors and your own signed-in visits are skipped.
              Country and city come from your host&apos;s edge headers, so they appear once deployed (not on localhost).
            </p>
            <Button size="sm" variant="danger" onClick={clear}>Clear all data</Button>
          </div>
        </div>
      )}
    </div>
  );
}

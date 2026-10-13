"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const uid = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`);

/** Reads (or creates) an id in the given storage; null if storage is blocked. */
function stored(storage: Storage | undefined, key: string): string | null {
  try {
    let v = storage?.getItem(key) ?? null;
    if (!v) {
      v = uid();
      storage?.setItem(key, v);
    }
    return v;
  } catch {
    return null;
  }
}

/** Records one page view per navigation. Renders nothing. */
export default function PageViewTracker() {
  const path = usePathname();
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (!path || last.current === path) return;
    last.current = path;
    if (navigator.doNotTrack === "1") return;

    const visitorId = stored(window.localStorage, "pv-visitor");
    const sessionId = stored(window.sessionStorage, "pv-session");
    if (!visitorId || !sessionId) return;

    let entry = false;
    try {
      entry = !window.sessionStorage.getItem("pv-entered");
      window.sessionStorage.setItem("pv-entered", "1");
    } catch {
      // ignore
    }
    const q = new URLSearchParams(window.location.search);
    const payload = JSON.stringify({
      visitorId,
      sessionId,
      path,
      entry,
      referrer: entry ? document.referrer : "",
      utm: entry ? { source: q.get("utm_source") ?? "", medium: q.get("utm_medium") ?? "", campaign: q.get("utm_campaign") ?? "" } : undefined,
      language: navigator.language,
      screen: `${window.screen.width}x${window.screen.height}`,
    });
    fetch("/api/track", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true }).catch(() => {});
  }, [path]);

  return null;
}

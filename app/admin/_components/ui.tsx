"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Spinner from "@/app/components/display/Spinner";

export const cx = (...parts: (string | false | null | undefined)[]) => parts.filter(Boolean).join(" ");

export const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500";

export function Button({
  variant = "secondary",
  size = "md",
  loading = false,
  className,
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md";
  /** Shows the spinner before the label and disables the button. */
  loading?: boolean;
}) {
  const styles = {
    primary: "bg-cyan-600 text-white hover:bg-cyan-500 disabled:hover:bg-cyan-600",
    secondary:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800",
    danger: "bg-red-600 text-white hover:bg-red-500 disabled:hover:bg-red-600",
    ghost: "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800",
  }[variant];
  return (
    <button
      type="button"
      {...props}
      disabled={props.disabled || loading}
      aria-busy={loading || undefined}
      className={cx(
        "inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-4 py-2 text-sm",
        styles,
        className
      )}
    >
      {loading && <Spinner size="xs" mono label="Working" />}
      {children}
    </button>
  );
}

export function Label({
  children,
  help,
  htmlFor,
  error,
}: {
  children: ReactNode;
  help?: string;
  htmlFor?: string;
  error?: string;
}) {
  return (
    <div className="mb-1">
      <label htmlFor={htmlFor} className="text-sm font-medium text-slate-800 dark:text-slate-200">
        {children}
      </label>
      {help && <p className="text-xs text-slate-500 dark:text-slate-400">{help}</p>}
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </div>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        "rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/60",
        className
      )}
    >
      {children}
    </div>
  );
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cx(
        "relative h-6 w-11 shrink-0 rounded-full transition",
        checked ? "bg-cyan-600" : "bg-slate-300 dark:bg-slate-700"
      )}
    >
      <span
        className={cx(
          "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
          checked ? "left-[22px]" : "left-0.5"
        )}
      />
    </button>
  );
}

export function TagsInput({
  value,
  onChange,
  placeholder,
}: {
  value: string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}) {
  const [draft, setDraft] = useState("");
  const add = (raw: string) => {
    const parts = raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
      .filter((s) => !value.includes(s));
    if (parts.length) onChange([...value, ...parts]);
    setDraft("");
  };
  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-slate-300 bg-white p-1.5 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900">
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 rounded-full bg-cyan-600/10 px-2.5 py-0.5 text-xs text-cyan-800 dark:text-cyan-200"
        >
          {tag}
          <button
            type="button"
            aria-label={`Remove ${tag}`}
            onClick={() => onChange(value.filter((t) => t !== tag))}
            className="text-cyan-700/70 hover:text-red-500 dark:text-cyan-300/70"
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(e) => {
          if (e.target.value.includes(",")) add(e.target.value);
          else setDraft(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add(draft);
          } else if (e.key === "Backspace" && !draft && value.length) {
            onChange(value.slice(0, -1));
          }
        }}
        onBlur={() => draft && add(draft)}
        placeholder={value.length ? "" : placeholder}
        className="min-w-[120px] flex-1 bg-transparent px-1.5 py-1 text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-slate-100"
      />
    </div>
  );
}

export type Toast = { id: number; type: "success" | "error"; message: string };

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);
  const push = (type: Toast["type"], message: string) => {
    const id = ++idRef.current;
    setToasts((t) => [...t, { id, type, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), type === "error" ? 7000 : 3500);
  };
  const view = (
    <div className="pointer-events-none fixed bottom-4 right-4 z-[80] flex w-[min(92vw,360px)] flex-col gap-2" aria-live="polite">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={cx(
            "pointer-events-auto rounded-lg border px-4 py-3 text-sm shadow-lg",
            t.type === "success"
              ? "border-emerald-500/40 bg-emerald-50 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-100"
              : "border-red-500/40 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-100"
          )}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
  return { push, view };
}

/** Warns before leaving the page with unsaved edits. */
export function useUnsavedWarning(dirty: boolean) {
  useEffect(() => {
    if (!dirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [dirty]);
}

/** Authenticated JSON fetch. 401 sends the user back to the login page. */
export async function api<T = unknown>(
  url: string,
  init?: RequestInit
): Promise<{ ok: boolean; status: number; data: T & { error?: string; issues?: { path: (string | number)[]; message: string }[] } }> {
  const res = await fetch(url, {
    ...init,
    headers: {
      ...(init?.body && !(init.body instanceof FormData) ? { "Content-Type": "application/json" } : {}),
      ...init?.headers,
    },
  });
  if (res.status === 401) {
    window.location.href = `/admin/login?next=${encodeURIComponent(window.location.pathname)}`;
  }
  let data = {} as Awaited<ReturnType<typeof api<T>>>["data"];
  try {
    data = await res.json();
  } catch {
    // empty body
  }
  return { ok: res.ok, status: res.status, data };
}

"use client";

import { FormEvent, useState } from "react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        // Only ever redirect to a page inside the admin area.
        const next = new URLSearchParams(window.location.search).get("next") ?? "";
        window.location.href = next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin";
        return;
      }
      setError(data.error || "Sign-in failed");
    } catch {
      setError("Could not reach the server");
    }
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-teal-500 text-xl font-bold text-white">
            R
          </div>
          <h1 className="text-2xl font-bold">Admin sign in</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage your portfolio content</p>
        </div>

        <form
          onSubmit={submit}
          className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-950"
            />
          </div>
          {error && (
            <p role="alert" className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-cyan-600 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
        <p className="mt-6 text-center text-xs text-slate-500">Sessions last 12 hours.</p>
      </div>
    </main>
  );
}

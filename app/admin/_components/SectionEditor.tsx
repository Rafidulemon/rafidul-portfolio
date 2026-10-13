"use client";

/* eslint-disable @next/next/no-img-element */

import { useCallback, useEffect, useMemo, useState } from "react";
import { PageLoader } from "@/app/components/display/Spinner";
import { mediaUrl } from "@/app/lib/media";
import { SECTIONS } from "./specs";
import { FieldGrid, FieldRenderer, isCompact, type Errors } from "./fields";
import { Button, Card, api, cx, inputCls, useToasts, useUnsavedWarning } from "./ui";

type Loaded = { data: any; customized: boolean; updatedAt: string | null };

const issueKey = (path: (string | number)[]) => path.join(".");

export default function SectionEditor({ sectionKey }: { sectionKey: string }) {
  const spec = SECTIONS[sectionKey];
  const { push, view: toasts } = useToasts();

  const [data, setData] = useState<any>(null);
  const [initial, setInitial] = useState("");
  const [meta, setMeta] = useState<{ customized: boolean; updatedAt: string | null }>({ customized: false, updatedAt: null });
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [selected, setSelected] = useState(0);
  const [filter, setFilter] = useState("");

  const apply = useCallback((res: Loaded) => {
    setData(res.data);
    setInitial(JSON.stringify(res.data));
    setMeta({ customized: res.customized, updatedAt: res.updatedAt });
    setErrors({});
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      const res = await api<Loaded>(`/api/admin/content/${spec.key}`);
      if (!alive) return;
      if (res.ok) apply(res.data);
      else setLoadError(res.data.error || "Could not load this section");
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [spec.key, apply]);

  const dirty = data !== null && JSON.stringify(data) !== initial;
  useUnsavedWarning(dirty);

  const save = useCallback(async () => {
    setSaving(true);
    const res = await api<{ data: any; embedded?: number }>(`/api/admin/content/${spec.key}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (res.ok) {
      setData(res.data.data);
      setInitial(JSON.stringify(res.data.data));
      setMeta({ customized: true, updatedAt: new Date().toISOString() });
      setErrors({});
      push("success", "Saved. The change is live on the site.");
    } else if (res.data.issues) {
      const map: Errors = {};
      res.data.issues.forEach((i) => (map[issueKey(i.path)] ||= i.message));
      setErrors(map);
      if (spec.mode === "list") {
        const first = res.data.issues[0]?.path[0];
        if (typeof first === "number") setSelected(first);
      }
      push("error", `Please fix ${res.data.issues.length} field(s): ${res.data.issues[0].path.join(" › ")} - ${res.data.issues[0].message}`);
    } else {
      push("error", res.data.error || "Save failed");
    }
  }, [data, push, spec.key, spec.mode]);

  // Ctrl/Cmd+S
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (dirty && !saving) save();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dirty, saving, save]);

  const revert = async () => {
    if (!confirm("Revert this section to the original content the site shipped with? Your edits to it will be lost.")) return;
    const res = await api<Loaded>(`/api/admin/content/${spec.key}`, { method: "DELETE" });
    if (res.ok) {
      apply(res.data);
      setSelected(0);
      push("success", "Reverted to the original content.");
    } else push("error", res.data.error || "Could not revert");
  };

  const items: any[] = useMemo(() => (spec.mode === "list" && Array.isArray(data) ? data : []), [data, spec.mode]);
  const visible = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return items
      .map((item, index) => ({ item, index }))
      .filter(({ item }) => !q || `${spec.itemTitle?.(item)} ${spec.itemSubtitle?.(item)}`.toLowerCase().includes(q));
  }, [items, filter, spec]);

  if (!spec) return null;
  if (loading) return <PageLoader label="Loading…" />;
  if (loadError) {
    return (
      <Card>
        <p className="text-red-500">{loadError}</p>
        <p className="mt-1 text-sm text-slate-500">Check that DATABASE_URL is set and the database is reachable.</p>
      </Card>
    );
  }

  const updateItem = (index: number, next: any) =>
    setData(items.map((it, i) => (i === index ? next : it)));

  const addItem = () => {
    const blank = spec.blank!(items);
    setData([...items, blank]);
    setSelected(items.length);
    setFilter("");
  };
  const duplicate = (index: number) => {
    const maxId = items.reduce((m, i) => Math.max(m, Number(i.id) || 0), 0);
    const copy = { ...items[index], id: maxId + 1 };
    const key = Object.keys(copy).find((k) => /title|name$/.test(k));
    if (key && typeof copy[key] === "string") copy[key] = `${copy[key]} (copy)`;
    const next = [...items.slice(0, index + 1), copy, ...items.slice(index + 1)];
    setData(next);
    setSelected(index + 1);
  };
  const removeItem = (index: number) => {
    if (!confirm(`Delete this ${spec.noun ?? "item"}? You can still cancel by not saving, or revert the whole section.`)) return;
    setData(items.filter((_, i) => i !== index));
    setSelected(Math.max(0, index - 1));
  };
  const move = (index: number, dir: -1 | 1) => {
    const j = index + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[index], next[j]] = [next[j], next[index]];
    setData(next);
    setSelected(j);
  };

  const current = items[selected];

  return (
    <div>
      {/* Header + save bar */}
      <div className="sticky top-0 z-20 -mx-4 mb-6 border-b border-slate-200 bg-slate-50/90 px-4 py-3 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 md:-mx-8 md:px-8">
        <div className="flex flex-wrap items-center gap-3">
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-xl font-bold text-slate-900 dark:text-white">{spec.title}</h1>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {meta.customized
                ? `Customised${meta.updatedAt ? ` · last saved ${new Date(meta.updatedAt).toLocaleString()}` : ""}`
                : "Showing the original content (not yet edited in the admin)"}
            </p>
          </div>
          {dirty && (
            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-medium text-amber-700 dark:text-amber-300">
              Unsaved changes
            </span>
          )}
          <a href={spec.publicPath} target="_blank" rel="noopener noreferrer" className="text-sm text-cyan-700 hover:underline dark:text-cyan-300">
            View on site ↗
          </a>
          {meta.customized && (
            <Button size="sm" variant="ghost" onClick={revert}>
              Revert to original
            </Button>
          )}
          <Button variant="primary" loading={saving} disabled={!dirty} onClick={save}>
            {saving ? "Saving…" : "Save changes"}
          </Button>
        </div>
      </div>
      <p className="-mt-3 mb-6 text-sm text-slate-600 dark:text-slate-400">{spec.description}</p>

      {/* LIST MODE */}
      {spec.mode === "list" && (
        <div className="grid gap-6 min-[1024px]:grid-cols-[320px_1fr]">
          <div>
            <div className="mb-3 flex gap-2">
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder={`Search ${spec.title.toLowerCase()}…`}
                aria-label="Search"
                className={inputCls}
              />
              <Button variant="primary" onClick={addItem}>
                + Add
              </Button>
            </div>
            <ul className="max-h-[70vh] space-y-1 overflow-y-auto pr-1" aria-label={spec.title}>
              {visible.map(({ item, index }) => {
                const image = spec.itemImage?.(item);
                const hasError = Object.keys(errors).some((k) => k.startsWith(`${index}.`));
                return (
                  <li key={`${item.id}-${index}`}>
                    <button
                      type="button"
                      onClick={() => setSelected(index)}
                      className={cx(
                        "flex w-full items-center gap-3 rounded-lg border px-3 py-2 text-left transition",
                        selected === index
                          ? "border-cyan-500 bg-cyan-500/10"
                          : "border-transparent hover:bg-slate-100 dark:hover:bg-slate-800/60",
                        hasError && "border-red-500"
                      )}
                    >
                      {image !== undefined && (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md bg-slate-100 dark:bg-slate-800">
                          {image ? <img src={mediaUrl(image)} alt="" className="h-full w-full object-cover" /> : null}
                        </span>
                      )}
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium text-slate-900 dark:text-slate-100">
                          {spec.itemTitle?.(item)}
                        </span>
                        <span className="block truncate text-xs text-slate-500">{spec.itemSubtitle?.(item)}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
              {visible.length === 0 && <li className="px-3 py-6 text-center text-sm text-slate-500">Nothing found.</li>}
            </ul>
            <p className="mt-2 text-xs text-slate-500">{items.length} total</p>
          </div>

          <div>
            {current ? (
              <Card>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-semibold text-slate-900 dark:text-white">{spec.itemTitle?.(current)}</h2>
                  <div className="flex gap-1.5">
                    <Button size="sm" onClick={() => move(selected, -1)} disabled={selected === 0}>
                      ↑ Up
                    </Button>
                    <Button size="sm" onClick={() => move(selected, 1)} disabled={selected === items.length - 1}>
                      ↓ Down
                    </Button>
                    <Button size="sm" onClick={() => duplicate(selected)}>
                      Duplicate
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => removeItem(selected)}>
                      Delete
                    </Button>
                  </div>
                </div>
                <FieldGrid
                  fields={spec.fields}
                  value={current}
                  onChange={(next) => updateItem(selected, next)}
                  basePath={String(selected)}
                  errors={errors}
                />
              </Card>
            ) : (
              <Card>
                <p className="text-sm text-slate-500">No {spec.noun}s yet. Click “+ Add” to create one.</p>
              </Card>
            )}
          </div>
        </div>
      )}

      {/* OBJECT MODE */}
      {spec.mode === "object" && data && (
        <div className="grid gap-5 md:grid-cols-2">
          {spec.fields.map((f) => (
            <Card key={f.name} className={cx(!isCompact(f) && "md:col-span-2")}>
              <FieldRenderer
                field={f}
                value={data[f.name]}
                onChange={(v) => setData({ ...data, [f.name]: v })}
                path={f.name}
                errors={errors}
              />
            </Card>
          ))}
        </div>
      )}
      {toasts}
    </div>
  );
}

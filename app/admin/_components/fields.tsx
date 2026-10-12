"use client";

/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from "react";
import { Button, Label, TagsInput, Toggle, api, cx, inputCls } from "./ui";
import type { Field } from "./specs";

export type Errors = Record<string, string>;

type MediaItem = { id: string; name: string; url: string; size: number };

/** Uploads one image to the admin media library and returns its public URL. */
export async function uploadImage(file: File): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await api<{ url: string }>("/api/admin/media", { method: "POST", body: fd });
  if (!res.ok) throw new Error(res.data.error || "Upload failed");
  return res.data.url;
}

export function MediaLibrary({ onPick, onClose }: { onPick: (url: string) => void; onClose: () => void }) {
  const [items, setItems] = useState<MediaItem[] | null>(null);

  const load = async () => {
    const res = await api<{ items: MediaItem[] }>("/api/admin/media");
    setItems(res.ok ? res.data.items : []);
  };
  useEffect(() => {
    load();
  }, []);

  const remove = async (m: MediaItem) => {
    if (!confirm(`Delete "${m.name}"? Any page using this image will show a broken image.`)) return;
    await api(`/api/admin/media/${m.id}`, { method: "DELETE" });
    load();
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Media library"
    >
      <div
        className="max-h-[80vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-5 shadow-2xl dark:bg-slate-900"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 dark:text-white">Media library</h3>
          <Button size="sm" variant="ghost" onClick={onClose}>
            Close
          </Button>
        </div>
        {items === null && <p className="text-sm text-slate-500">Loading…</p>}
        {items?.length === 0 && (
          <p className="text-sm text-slate-500">No uploaded images yet. Use “Upload” on an image field.</p>
        )}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {items?.map((m) => (
            <div key={m.id} className="group relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
              <button type="button" onClick={() => onPick(m.url)} className="block w-full">
                <img src={m.url} alt={m.name} className="aspect-square w-full object-cover" />
              </button>
              <div className="flex items-center justify-between gap-1 p-1.5 text-[11px] text-slate-600 dark:text-slate-300">
                <span className="truncate">{m.name}</span>
                <button type="button" onClick={() => remove(m)} className="text-red-500 hover:underline">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function ImageField({
  value,
  onChange,
  id,
}: {
  value: string;
  onChange: (v: string) => void;
  id?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [library, setLibrary] = useState(false);

  const onFile = async (file?: File) => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploadImage(file));
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div>
      <div className="flex items-start gap-3">
        <div className="flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800">
          {value ? (
            <img src={value} alt="" className="h-full w-full object-contain" />
          ) : (
            <span className="text-[10px] text-slate-400">No image</span>
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/images/… or https://…"
            className={inputCls}
          />
          <div className="flex flex-wrap gap-2">
            <Button size="sm" disabled={busy} onClick={() => fileRef.current?.click()}>
              {busy ? "Uploading…" : "Upload"}
            </Button>
            <Button size="sm" onClick={() => setLibrary(true)}>
              Library
            </Button>
            {value && (
              <Button size="sm" variant="ghost" onClick={() => onChange("")}>
                Clear
              </Button>
            )}
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp,image/avif"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
      </div>
      {library && (
        <MediaLibrary
          onClose={() => setLibrary(false)}
          onPick={(url) => {
            onChange(url);
            setLibrary(false);
          }}
        />
      )}
    </div>
  );
}

const join = (...p: (string | number)[]) => p.filter((x) => x !== "").join(".");

/** Fields that are happy sharing a row in a two-column grid. */
export const isCompact = (f: Field) => ["text", "url", "email", "number", "select"].includes(f.kind);

export function FieldRenderer({
  field,
  value,
  onChange,
  path,
  errors,
}: {
  field: Field;
  value: any;
  onChange: (v: any) => void;
  path: string;
  errors: Errors;
}) {
  const id = `f-${path.replace(/\./g, "-")}`;
  const error = errors[path];

  switch (field.kind) {
    case "text":
    case "url":
    case "email":
      return (
        <div>
          <Label htmlFor={id} help={field.help} error={error}>
            {field.label}
          </Label>
          <input
            id={id}
            type={field.kind === "email" ? "email" : "text"}
            value={value ?? ""}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={cx(inputCls, error && "border-red-500")}
          />
        </div>
      );

    case "textarea":
    case "markdown":
      return (
        <div>
          <Label htmlFor={id} help={field.help} error={error}>
            {field.label}
          </Label>
          <textarea
            id={id}
            value={value ?? ""}
            rows={field.rows ?? 4}
            placeholder={field.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={cx(inputCls, "resize-y", field.kind === "markdown" && "font-mono text-[13px]", error && "border-red-500")}
          />
        </div>
      );

    case "number":
      return (
        <div>
          <Label htmlFor={id} help={field.help} error={error}>
            {field.label}
          </Label>
          <input
            id={id}
            type="number"
            min={field.min}
            max={field.max}
            step={field.step}
            value={Number.isFinite(value) ? value : ""}
            onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
            className={cx(inputCls, error && "border-red-500")}
          />
        </div>
      );

    case "select":
      return (
        <div>
          <Label htmlFor={id} help={field.help} error={error}>
            {field.label}
          </Label>
          <select
            id={id}
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            className={cx(inputCls, error && "border-red-500")}
          >
            {!field.options.some((o) => o.value === value) && <option value={value ?? ""}>{value || "Select…"}</option>}
            {field.options.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      );

    case "boolean":
      return (
        <div className="flex items-start gap-3">
          <Toggle checked={!!value} onChange={onChange} label={field.label} />
          <div>
            <div className="text-sm font-medium text-slate-800 dark:text-slate-200">{field.label}</div>
            {field.help && <p className="text-xs text-slate-500 dark:text-slate-400">{field.help}</p>}
          </div>
        </div>
      );

    case "tags":
      return (
        <div>
          <Label help={field.help} error={error}>
            {field.label}
          </Label>
          <TagsInput value={Array.isArray(value) ? value : []} onChange={onChange} placeholder={field.placeholder} />
        </div>
      );

    case "lines":
      return (
        <div>
          <Label htmlFor={id} help={field.help} error={error}>
            {field.label}
          </Label>
          <textarea
            id={id}
            rows={field.rows ?? 4}
            value={Array.isArray(value) ? value.join("\n") : ""}
            onChange={(e) => onChange(e.target.value.split("\n"))}
            onBlur={() => onChange((Array.isArray(value) ? value : []).map((l: string) => l.trim()).filter(Boolean))}
            className={cx(inputCls, "resize-y", error && "border-red-500")}
          />
        </div>
      );

    case "image":
      return (
        <div>
          <Label help={field.help} error={error}>
            {field.label}
          </Label>
          <ImageField id={id} value={value ?? ""} onChange={onChange} />
        </div>
      );

    case "group":
      return (
        <fieldset className="rounded-lg border border-slate-200 p-4 dark:border-slate-700">
          <legend className="px-2 text-sm font-semibold text-slate-800 dark:text-slate-200">{field.label}</legend>
          <FieldGrid
            fields={field.fields}
            value={value ?? {}}
            onChange={onChange}
            basePath={path}
            errors={errors}
          />
        </fieldset>
      );

    case "list":
      return <ListField field={field} value={value} onChange={onChange} path={path} errors={errors} />;
  }
}

export function FieldGrid({
  fields,
  value,
  onChange,
  basePath,
  errors,
}: {
  fields: Field[];
  value: any;
  onChange: (next: any) => void;
  basePath: string;
  errors: Errors;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {fields.map((f) => (
        <div key={f.name} className={cx(!isCompact(f) && "md:col-span-2")}>
          <FieldRenderer
            field={f}
            value={value?.[f.name]}
            onChange={(v) => onChange({ ...value, [f.name]: v })}
            path={join(basePath, f.name)}
            errors={errors}
          />
        </div>
      ))}
    </div>
  );
}

function ListField({
  field,
  value,
  onChange,
  path,
  errors,
}: {
  field: Extract<Field, { kind: "list" }>;
  value: any;
  onChange: (v: any) => void;
  path: string;
  errors: Errors;
}) {
  const items: any[] = Array.isArray(value) ? value : [];
  const [open, setOpen] = useState<Record<number, boolean>>({});
  const isOpen = (i: number) => open[i] ?? items.length <= 4;
  const hasErrorIn = (i: number) => Object.keys(errors).some((k) => k.startsWith(`${path}.${i}.`));

  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };

  return (
    <div>
      <Label help={field.help}>{field.label}</Label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="rounded-lg border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 px-3 py-2">
              <button
                type="button"
                onClick={() => setOpen({ ...open, [i]: !isOpen(i) })}
                aria-expanded={isOpen(i)}
                className="flex flex-1 items-center gap-2 text-left text-sm font-medium text-slate-800 dark:text-slate-200"
              >
                <span className={cx("transition-transform", isOpen(i) && "rotate-90")}>▸</span>
                <span className="truncate">{field.itemTitle(item, i)}</span>
                {hasErrorIn(i) && <span className="rounded bg-red-500/15 px-1.5 text-[10px] text-red-600">needs attention</span>}
              </button>
              <Button size="sm" variant="ghost" aria-label="Move up" disabled={i === 0} onClick={() => move(i, -1)}>
                ↑
              </Button>
              <Button size="sm" variant="ghost" aria-label="Move down" disabled={i === items.length - 1} onClick={() => move(i, 1)}>
                ↓
              </Button>
              <Button
                size="sm"
                variant="ghost"
                aria-label="Remove"
                className="text-red-500"
                onClick={() => onChange(items.filter((_, k) => k !== i))}
              >
                Remove
              </Button>
            </div>
            {isOpen(i) && (
              <div className="border-t border-slate-200 p-3 dark:border-slate-700">
                <FieldGrid
                  fields={field.fields}
                  value={item}
                  onChange={(next) => onChange(items.map((it, k) => (k === i ? next : it)))}
                  basePath={`${path}.${i}`}
                  errors={errors}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <Button
        size="sm"
        className="mt-2"
        onClick={() => {
          onChange([...items, field.blank()]);
          setOpen({ ...open, [items.length]: true });
        }}
      >
        + Add {field.label.toLowerCase().replace(/s$/, "")}
      </Button>
    </div>
  );
}

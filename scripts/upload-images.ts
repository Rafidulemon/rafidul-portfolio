// Copies everything in public/images to R2 under portfolio/images/...  :  npm run images:upload
import "dotenv/config";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { extname, join, relative } from "node:path";
import { KEY_PREFIX, putObject } from "../app/lib/storage";

const MIME: Record<string, string> = {
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif",
  ".webp": "image/webp", ".avif": "image/avif", ".svg": "image/svg+xml", ".mp4": "video/mp4", ".ico": "image/x-icon",
};

const root = join(process.cwd(), "public", "images");
const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });

(async () => {
  const files = walk(root);
  let done = 0;
  for (const file of files) {
    const key = `${KEY_PREFIX}images/${relative(root, file).split("\\").join("/")}`;
    await putObject(key, readFileSync(file), MIME[extname(file).toLowerCase()] ?? "application/octet-stream");
    console.log(`${++done}/${files.length}  ${key}`);
  }
  console.log("Uploaded", done, "files");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});

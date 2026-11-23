import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const DRY = process.argv.includes("--dry-run");
const MAP = JSON.parse(fs.readFileSync(path.join(ROOT, "tools/images/rename-map.json"), "utf8"));

const IMAGE_EXT = /\.(png|jpe?g|jfif|webp|gif|svg|avif|ico)$/i;
const SCAN_DIRS = ["images", "assets", "pages/service-cards"];
const KEEP = ["images/uploads/"];

const abs = (p) => path.join(ROOT, p);
const useGit = fs.existsSync(abs(".git"));

function move(from, to) {
  if (DRY) return console.log(`  ${from}  →  ${to}`);
  fs.mkdirSync(path.dirname(abs(to)), { recursive: true });

  if (useGit) {
    try {
      execFileSync("git", ["mv", "-f", from, to], { cwd: ROOT, stdio: "ignore" });
      return;
    } catch {
    }
  }

  if (from.toLowerCase() === to.toLowerCase()) {
    const tmp = `${to}.tmp-${Date.now()}`;
    fs.renameSync(abs(from), abs(tmp));
    fs.renameSync(abs(tmp), abs(to));
  } else {
    fs.renameSync(abs(from), abs(to));
  }
}

function exists(p) {
  const dir = path.dirname(abs(p));
  return fs.existsSync(dir) && fs.readdirSync(dir).includes(path.basename(p));
}

let moved = 0;
const missing = [];

console.log(DRY ? "تجربة (لن يُنقل أي ملف):" : "نقل الصور:");
for (const [from, to] of Object.entries(MAP)) {
  if (exists(to) && !exists(from)) continue;
  if (!exists(from)) {
    missing.push(from);
    continue;
  }
  move(from, to);
  moved++;
}

const used = new Set(Object.values(MAP));
const unused = [];
function walk(dir) {
  if (!fs.existsSync(abs(dir))) return;
  for (const entry of fs.readdirSync(abs(dir), { withFileTypes: true })) {
    const rel = `${dir}/${entry.name}`;
    if (KEEP.some((k) => `${rel}/`.startsWith(k))) continue;
    if (rel.startsWith("images/unused")) continue;
    if (entry.isDirectory()) walk(rel);
    else if (IMAGE_EXT.test(entry.name) && !used.has(rel)) unused.push(rel);
  }
}
SCAN_DIRS.forEach(walk);

if (unused.length) {
  console.log(`\nصور غير مستخدمة في الكود (${unused.length}) → images/unused/:`);
  for (const rel of unused) {
    const to = `images/unused/${rel.replace(/^(images|assets|pages)\//, "")}`;
    if (DRY) console.log(`  ${rel}`);
    else move(rel, to);
  }
}

function prune(dir) {
  if (!fs.existsSync(abs(dir)) || !fs.statSync(abs(dir)).isDirectory()) return;
  for (const entry of fs.readdirSync(abs(dir))) prune(`${dir}/${entry}`);
  if (!DRY && !fs.readdirSync(abs(dir)).length) fs.rmdirSync(abs(dir));
}
SCAN_DIRS.forEach(prune);

console.log(`\nتم: ${moved} صورة${DRY ? " ستُنقل" : " نُقلت"}.`);
if (missing.length) {
  console.log(`\nصور مذكورة في الكود لكنها غير موجودة على القرص (${missing.length}):`);
  missing.forEach((m) => console.log(`  ${m}`));
}

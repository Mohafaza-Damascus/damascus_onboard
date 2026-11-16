import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const portal = path.resolve(here, "../..");
const baseCss = path.join(here, "ltr-base.css");
const outFile = path.join(portal, "css/ltr.css");
const files = fs
  .readdirSync(path.join(portal, "css"))
  .filter((f) => f.endsWith(".css") && !/^(ltr|dashboard|dashboards|dashboard-app|dashboard-login)\.css$/.test(f))
  .map((f) => ({ name: f, text: fs.readFileSync(path.join(portal, "css", f), "utf8") }));
for (const rel of ["pages/electronic-service-guide.html", "pages/services_details/guide-details.html"]) {
  const t = fs.readFileSync(path.join(portal, rel), "utf8");
  for (const m of t.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)) files.push({ name: rel, text: m[1] });
}
const strip = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "");
function parse(text) {
  const out = [];
  let i = 0;
  const n = text.length;
  function block(media) {
    while (i < n) {
      const open = text.indexOf("{", i);
      const close = text.indexOf("}", i);
      if (close !== -1 && (open === -1 || close < open)) {
        i = close + 1;
        return;
      }
      if (open === -1) {
        i = n;
        return;
      }
      const prelude = text.slice(i, open).trim();
      i = open + 1;
      if (prelude.startsWith("@media") || prelude.startsWith("@supports")) {
        block([...media, prelude]);
        continue;
      }
      if (prelude.startsWith("@")) {
        let depth = 1;
        while (i < n && depth) {
          if (text[i] === "{") depth++;
          else if (text[i] === "}") depth--;
          i++;
        }
        continue;
      }
      const end = text.indexOf("}", i);
      out.push({ media, selector: prelude, body: text.slice(i, end) });
      i = end + 1;
    }
  }
  block([]);
  return out;
}
const prefix = (sel) =>
  sel
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .map((s) => {
      if (/^:root/.test(s)) return null;
      if (/^html\b/.test(s)) return s.replace(/^html(\[[^\]]*\])?/, 'html[dir="ltr"]');
      return `html[dir="ltr"] ${s}`;
    })
    .filter(Boolean)
    .join(",\n");
let css = "";
let count = 0;
for (const f of files) {
  for (const r of parse(strip(f.text))) {
    const decls = [];
    const m = r.body.match(/text-align\s*:\s*(left|right)\s*(!important)?/i);
    if (m) decls.push(`text-align: ${m[1].toLowerCase() === "right" ? "left" : "right"} !important;`);
    const o = r.body.match(/transform-origin\s*:\s*([^;}]*\b(left|right)\b[^;}]*)/i);
    if (o && /^(era|Investments|services-model-2|global)\.css$/.test(f.name))
      decls.push(
        `transform-origin: ${o[1].trim().replace(/\b(left|right)\b/gi, (w) => (w.toLowerCase() === "left" ? "right" : "left"))} !important;`,
      );
    if (!decls.length) continue;
    const sel = prefix(r.selector);
    if (!sel) continue;
    let rule = `${sel} { ${decls.join(" ")} }`;
    for (const md of [...r.media].reverse()) rule = `${md} {\n${rule}\n}`;
    css += `${rule}\n`;
    count++;
  }
}
fs.writeFileSync(outFile, fs.readFileSync(baseCss, "utf8").trim() + "\n\n" + css);
console.log("text-align overrides:", count);

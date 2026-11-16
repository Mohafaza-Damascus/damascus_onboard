import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(here, "src");
const outDir = path.resolve(here, "../../js/i18n");
const AREAS = [
  "common",
  "home",
  "news",
  "content-news",
  "cultural",
  "services",
  "content-services",
  "investments",
  "content-opportunities",
  "contact",
];
fs.mkdirSync(outDir, { recursive: true });
const norm = (s) => String(s).replace(/ /g, " ").replace(/\s+/g, " ").trim();
const readPairs = (file, list) => {
  const dict = {};
  const missing = [];
  if (fs.existsSync(file)) {
    for (const raw of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const line = raw.replace(/^﻿/, "");
      if (!line.trim()) continue;
      const tab = line.indexOf("\t");
      if (tab < 0) {
        console.log("bad line", path.basename(file), line.slice(0, 60));
        continue;
      }
      const k = line.slice(0, tab),
        v = line.slice(tab + 1);
      if (list) {
        const i = Number(k);
        if (!Number.isInteger(i) || i < 0 || i >= list.length) {
          console.log("bad index", path.basename(file), k);
          continue;
        }
        dict[list[i]] = norm(v);
      } else dict[norm(k)] = norm(v);
    }
  }
  if (list)
    list.forEach((s, i) => {
      if (!(s in dict)) missing.push(i);
    });
  return { dict, missing };
};
const global = {};
const own = {};
for (const area of AREAS) {
  const list = JSON.parse(fs.readFileSync(path.join(srcDir, `${area}.json`), "utf8"));
  const main = readPairs(path.join(srcDir, `${area}.en.txt`), list);
  const extra = readPairs(path.join(srcDir, `${area}.extra.txt`));
  own[area] = { ...main.dict, ...extra.dict };
  Object.assign(global, main.dict);
  if (main.missing.length)
    console.log(`${area}: MISSING ${main.missing.length}: ${main.missing.slice(0, 60).join(",")}`);
}
for (const area of AREAS) Object.assign(global, own[area]);
for (const area of AREAS) {
  const allFile = path.join(srcDir, `${area}.all.json`);
  const all = fs.existsSync(allFile) ? JSON.parse(fs.readFileSync(allFile, "utf8")) : [];
  const dict = { ...own[area] };
  for (const s of all) if (!(s in dict) && s in global) dict[s] = global[s];
  let js = `window.I18N_DICT=Object.assign(window.I18N_DICT||{},${JSON.stringify(dict)});\n`;
  const patterns = path.join(srcDir, `${area}.patterns.js`);
  if (fs.existsSync(patterns)) js += fs.readFileSync(patterns, "utf8").trim() + "\n";
  fs.writeFileSync(path.join(outDir, `${area}.js`), js);
  console.log(`${area}: ${Object.keys(dict).length} entries, ${Math.round(js.length / 1024)} KB`);
}

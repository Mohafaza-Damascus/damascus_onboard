import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const portal = path.resolve(here, "../..");
const outDir = path.join(here, "src");
const SITE_URL =
  process.env.SITE_URL || "https://chipper-capybara-601cee.netlify.app";
const [importFile] = process.argv.slice(2);
const AR = /[؀-ۿ]/;
const norm = (s) => String(s).replace(/ /g, " ").replace(/\s+/g, " ").trim();

const AREAS = {
  common: ["js/global.js", "js/ai-chat.js", "404.html"],
  home: ["index.html", "js/index.js"],
  news: [
    "pages/news.html",
    "js/news.js",
    "pages/news-details.html",
    "js/news-details.js",
  ],
  cultural: [
    "pages/Cultural-model-5.html",
    "js/Cultural-model-5.js",
    "js/slides.js",
    "js/main.js",
    "js/gate.js",
    "js/scenes.js",
    "js/renderer.js",
    "js/quotes-data.js",
    "js/quotes-book.js",
    "js/heritage-data.js",
    "js/calendar.js",
    "js/landmarks-data.js",
    "pages/era.html",
    "js/era.js",
    "js/eras-data.js",
    "pages/landmark.html",
    "js/landmark.js",
    "pages/Damascus-album.html",
    "js/Damascus-album.js",
    "pages/Cultural-Details.html",
    "js/Cultural-Details.js",
    "pages/Events-details.html",
    "js/Events-details.js",
  ],
  services: [
    "pages/services-model-2.html",
    "pages/electronic-services.html",
    "js/electronic-services.js",
    "pages/electronic-service-guide.html",
    "js/electronic-service-guide.js",
    "pages/services_details/transactions-guide.html",
    "pages/services_details/guide-details.html",
    "pages/services_details/guide-details.js",
    "pages/services-form/guide-services.js",
    "js/services.js",
    "pages/services-form/services-data.js",
  ],
  investments: [
    "pages/Investments.html",
    "js/investments.js",
    "pages/Opportunity-details.html",
    "js/opportunity-details.js",
    "js/opportunities-data.js",
  ],
  contact: ["pages/contact.html"],
};

function fromHtml(src) {
  const out = [];
  const body = src
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<!--[\s\S]*?-->/g, " ");
  for (const m of body.matchAll(/>([^<>]+)</g)) out.push(m[1]);
  for (const m of body.matchAll(
    /\s(?:alt|title|placeholder|aria-label|content|data-label)\s*=\s*"([^"]*)"/gi,
  ))
    out.push(m[1]);
  for (const m of src.matchAll(/<title>([\s\S]*?)<\/title>/gi)) out.push(m[1]);
  for (const m of src.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi))
    out.push(...fromJs(m[1]));
  return out.map((s) =>
    s
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'"),
  );
}

function fromJs(src) {
  const out = [];
  let i = 0;
  const n = src.length;
  while (i < n) {
    const ch = src[i];
    if (ch === "/" && src[i + 1] === "/") {
      while (i < n && src[i] !== "\n") i++;
      continue;
    }
    if (ch === "/" && src[i + 1] === "*") {
      i = src.indexOf("*/", i + 2);
      if (i < 0) break;
      i += 2;
      continue;
    }
    if (ch === '"' || ch === "'") {
      let j = i + 1,
        s = "";
      while (j < n && src[j] !== ch) {
        if (src[j] === "\\") {
          s += src[j] + src[j + 1];
          j += 2;
        } else {
          s += src[j++];
        }
      }
      try {
        out.push(
          JSON.parse(
            '"' +
              s
                .replace(/\\'/g, "'")
                .replace(/"/g, '\\"')
                .replace(/\\\\"/g, '\\"') +
              '"',
          ),
        );
      } catch {
        out.push(s);
      }
      i = j + 1;
      continue;
    }
    if (ch === "`") {
      let j = i + 1,
        s = "",
        depth = 0;
      while (j < n) {
        if (depth === 0 && src[j] === "`") break;
        if (depth === 0 && src[j] === "$" && src[j + 1] === "{") {
          out.push(s);
          s = "";
          depth = 1;
          j += 2;
          continue;
        }
        if (depth > 0) {
          if (src[j] === "{") depth++;
          else if (src[j] === "}") {
            depth--;
            if (depth === 0) {
              j++;
              continue;
            }
          }
          j++;
          continue;
        }
        if (src[j] === "\\") {
          s += src[j + 1] === "n" ? "\n" : src[j + 1];
          j += 2;
          continue;
        }
        s += src[j++];
      }
      out.push(s);
      i = j + 1;
      continue;
    }
    i++;
  }
  const more = [];
  for (const s of out)
    if (/<[a-z]/i.test(s)) more.push(...fromHtml("<x>" + s + "</x>"));
    else more.push(s);
  return more;
}

function pieces(raw) {
  const res = [];
  for (const line of String(raw).split(/\r?\n/)) {
    let t = norm(line.replace(/^#{1,6}\s+/, "").replace(/^[-*•]\s+/, ""));
    if (!t || !AR.test(t)) continue;
    res.push(t);
  }
  return res;
}

const seen = new Map();
const result = {};
for (const [area, files] of Object.entries(AREAS)) {
  const set = new Set();
  for (const rel of files) {
    const file = path.join(portal, rel);
    if (!fs.existsSync(file)) continue;
    const src = fs.readFileSync(file, "utf8");
    const raw = rel.endsWith(".html") ? fromHtml(src) : fromJs(src);
    for (const r of raw) for (const p of pieces(r)) set.add(p);
  }
  result[area] = set;
}

function dataStrings(value, set) {
  if (typeof value === "string") {
    for (const p of pieces(value)) set.add(p);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((v) => dataStrings(v, set));
    return;
  }
  if (value && typeof value === "object")
    for (const [k, v] of Object.entries(value)) {
      if (
        !/^(id|image|images|url|link|pdf|createdAt|updatedAt|serviceUrl)$/i.test(
          k,
        )
      )
        dataStrings(v, set);
    }
}
const load = (rel, name) => {
  const ctx = { window: {} };
  vm.runInNewContext(fs.readFileSync(path.join(portal, rel), "utf8"), ctx);
  return ctx.window[name];
};
const contentNews = new Set();
dataStrings(load("js/news-data.js", "NEWS_DATA"), contentNews);
const contentOpp = new Set();
dataStrings(load("js/opportunities-seed.js", "OPPORTUNITIES_DATA"), contentOpp);
const contentSvc = new Set();
const live = (await (await fetch(`${SITE_URL}/api/data/services`)).json())
  .items;
dataStrings(live, contentSvc);
if (importFile)
  dataStrings(
    JSON.parse(fs.readFileSync(importFile, "utf8")).services,
    contentSvc,
  );
result["content-news"] = contentNews;
result["content-opportunities"] = contentOpp;
result["content-services"] = contentSvc;

const order = [
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
const existing = {};
for (const area of order) {
  const file = path.join(outDir, `${area}.json`);
  existing[area] = fs.existsSync(file)
    ? JSON.parse(fs.readFileSync(file, "utf8"))
    : [];
  existing[area].forEach((s) => seen.set(s, area));
}
let total = 0,
  added = 0;
for (const area of order) {
  fs.writeFileSync(
    path.join(outDir, `${area}.all.json`),
    JSON.stringify([...result[area]], null, 1),
  );
  const fresh = [...result[area]].filter((s) => {
    if (seen.has(s)) return false;
    seen.set(s, area);
    return true;
  });
  const list = existing[area].concat(fresh);
  fs.writeFileSync(
    path.join(outDir, `${area}.json`),
    JSON.stringify(list, null, 1),
  );
  total += list.length;
  added += fresh.length;
  console.log(
    area.padEnd(22),
    String(list.length).padStart(5),
    "strings",
    fresh.length
      ? `(+${fresh.length} new from index ${existing[area].length})`
      : "",
  );
}
console.log(
  "total".padEnd(22),
  String(total).padStart(5),
  "strings",
  `(+${added} new)`,
);

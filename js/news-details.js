document.addEventListener("DOMContentLoaded", () => {
  const NEWS_TYPES = { news: "خبر", activity: "أنشطة المحافظة", decision: "قرار" };
  const SIDEBAR_COUNT = 5;
  const RELATED_COUNT = 4;
  const FONT_KEY = "news-article-font-size";

  const escapeHtml = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch],
    );

  const parseDate = (value) => {
    const [y, m, d] = String(value || "")
      .split("-")
      .map(Number);
    return y && m && d ? new Date(y, m - 1, d) : null;
  };

  const formatDate = (date) => {
    const gregorian = date.toLocaleDateString("ar-SY-u-nu-latn", { day: "numeric", month: "long", year: "numeric" });
    let hijri = "";
    try {
      hijri = new Intl.DateTimeFormat("ar-SA-u-ca-islamic-umalqura-nu-latn", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    } catch {}
    return hijri ? `${gregorian} م ـ ${hijri}` : `${gregorian} م`;
  };

  const detailsUrl = (item) => `news-details.html?id=${encodeURIComponent(item.id)}`;
  const typeLabel = (item) => NEWS_TYPES[item.type] || item.type || "";
  const typeBadge = (item) =>
    `<span class="news-type" data-kind="${escapeHtml(item.type)}">${escapeHtml(typeLabel(item))}</span>`;

  const news = (Array.isArray(window.NEWS_DATA) ? window.NEWS_DATA : [])
    .slice()
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));

  const articleEl = document.getElementById("newsArticle");
  const id = new URLSearchParams(window.location.search).get("id");
  const item = news.find((n) => n.id === id);

  if (!item) {
    document.title = "الخبر غير موجود - محافظة دمشق";
    articleEl.innerHTML = `
      <div class="article-missing">
        <h1>الخبر غير موجود</h1>
        <p>ربما حُذف الخبر أو أن الرابط غير صحيح.</p>
        <a href="news-enas.html">العودة/a>
      </div>`;
    document.getElementById("relatedNews").hidden = true;
  }

  if (item) {
    const title = item.fullTitle || item.title;
    const date = parseDate(item.date);
    const pageUrl = window.location.href;

    document.title = `${title} - محافظة دمشق`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", item.desc || title);

    const bodyHtml = String(item.body || "")
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) =>
        line.startsWith("##") ? `<h2>${escapeHtml(line.replace(/^#+\s*/, ""))}</h2>` : `<p>${escapeHtml(line)}</p>`,
      )
      .join("");

    const share = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(`${title} ${pageUrl}`)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
      x: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(pageUrl)}`,
      telegram: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(title)}`,
    };

    articleEl.innerHTML = `

<div style="margin-bottom: 20px;">
  <a href="news-enas.html" class="article-back-btn" style="display: inline-flex; align-items: center; justify-content: center; gap: 8px; height: 40px; padding-inline: 20px; background-color: var(--green-900, #064239); color: #fff; border-radius: 14px; text-decoration: none; font-weight: 700; font-size: 0.9rem; box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 10px 18px -10px rgba(120, 90, 30, 0.6); transition: background-color 200ms ease;">
    <i class="fas fa-arrow-right" aria-hidden="true"></i> العودة
  </a>
</div>
      <h1 class="article-title">${escapeHtml(title)}</h1>
      ${item.desc ? `<p class="article-lead">${escapeHtml(item.desc)}</p>` : ""}

      <figure class="article-hero">
        <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.caption || title)}" width="1280" height="720" decoding="async">
        ${item.caption ? `<figcaption>${escapeHtml(item.caption)}</figcaption>` : ""}
      </figure>

      <div class="article-meta">
        ${typeBadge(item)}
        ${date ? `<time datetime="${escapeHtml(item.date)}">نُشر: ${escapeHtml(formatDate(date))}</time>` : ""}
      </div>

      <div class="article-tools">
        <div class="share-buttons" role="group" aria-label="مشاركة الخبر">
          <a class="share-btn" href="${share.whatsapp}" target="_blank" rel="noopener" aria-label="مشاركة عبر واتساب"><i class="fab fa-whatsapp" aria-hidden="true"></i></a>
          <a class="share-btn" href="${share.facebook}" target="_blank" rel="noopener" aria-label="مشاركة عبر فيسبوك"><i class="fab fa-facebook-f" aria-hidden="true"></i></a>
          <a class="share-btn" href="${share.x}" target="_blank" rel="noopener" aria-label="مشاركة عبر X">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
          <a class="share-btn" href="${share.telegram}" target="_blank" rel="noopener" aria-label="مشاركة عبر تيليغرام"><i class="fab fa-telegram-plane" aria-hidden="true"></i></a>
          <button type="button" class="share-btn" id="copyLinkBtn" aria-label="نسخ رابط الخبر"><i class="fas fa-link" aria-hidden="true"></i></button>
          <button type="button" class="share-btn" id="printBtn" aria-label="طباعة الخبر"><i class="fas fa-print" aria-hidden="true"></i></button>
          <span class="share-copied" id="copyStatus" role="status"></span>
        </div>

        <div class="font-size-control">
          <span class="font-size-small" aria-hidden="true">أ</span>
          <input type="range" id="fontSizeRange" min="15" max="28" step="1" aria-label="حجم خط الخبر">
          <span class="font-size-large" aria-hidden="true">أ</span>
          <output id="fontSizeValue" for="fontSizeRange"></output>
        </div>
      </div>

      <div class="article-body" id="articleBody">${bodyHtml}</div>`;

    const jsonLd = document.createElement("script");
    jsonLd.type = "application/ld+json";
    jsonLd.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: title,
      description: item.desc || "",
      datePublished: item.date,
      image: item.image ? [new URL(item.image, window.location.href).href] : [],
      articleSection: typeLabel(item),
      publisher: { "@type": "Organization", name: "محافظة دمشق" },
    });
    document.head.appendChild(jsonLd);

    const copyStatus = document.getElementById("copyStatus");
    document.getElementById("copyLinkBtn").addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(pageUrl);
        copyStatus.textContent = "تم نسخ الرابط";
      } catch {
        copyStatus.textContent = "تعذّر نسخ الرابط";
      }
      setTimeout(() => {
        copyStatus.textContent = "";
      }, 2500);
    });
    document.getElementById("printBtn").addEventListener("click", () => window.print());

    const body = document.getElementById("articleBody");
    const range = document.getElementById("fontSizeRange");
    const output = document.getElementById("fontSizeValue");
    let savedSize = null;
    try {
      savedSize = Number(localStorage.getItem(FONT_KEY)) || null;
    } catch {}

    const applySize = (size, remember) => {
      body.style.setProperty("--article-font-size", `${size}px`);
      range.value = size;
      output.textContent = size;
      if (remember) {
        try {
          localStorage.setItem(FONT_KEY, String(size));
        } catch {}
      }
    };

    if (savedSize) applySize(savedSize, false);
    else {
      const defaultSize = Math.round(parseFloat(getComputedStyle(body).fontSize));
      range.value = defaultSize;
      output.textContent = defaultSize;
    }
    range.addEventListener("input", () => applySize(Number(range.value), true));
  }

  const latest = news.filter((n) => n !== item).slice(0, SIDEBAR_COUNT);
  const latestList = document.getElementById("latestList");
  latestList.innerHTML = latest
    .map(
      (n, i) => `
    <li class="latest-item">
      <a class="latest-link" href="${detailsUrl(n)}">
        ${i === 0 ? `<img class="latest-img" src="${escapeHtml(n.image)}" alt="" loading="lazy" decoding="async">` : ""}
        <span class="latest-num" aria-hidden="true">${i + 1}</span>
        <span class="latest-title">${escapeHtml(n.title)}</span>
      </a>
    </li>`,
    )
    .join("");
  if (!latest.length) document.getElementById("articleSidebar").hidden = true;

  if (item) {
    const others = news.filter((n) => n !== item);
    const related = [
      ...others.filter((n) => n.type === item.type),
      ...others.filter((n) => n.type !== item.type),
    ].slice(0, RELATED_COUNT);

    document.getElementById("relatedGrid").innerHTML = related
      .map(
        (n) => `
      <article class="news-card">
        <a class="news-card-link" href="${detailsUrl(n)}">
          <img class="news-card-img" src="${escapeHtml(n.image)}" alt="" width="640" height="800" loading="lazy" decoding="async">
          <span class="news-card-fade" aria-hidden="true"></span>
          <span class="news-card-meta">${typeBadge(n)}</span>
          <span class="news-card-content">
            <span class="news-card-title">${escapeHtml(n.title)}</span>
            <span class="news-card-desc">${escapeHtml(n.desc)}</span>
            <span class="news-card-cta">اقرأ المزيد</span>
          </span>
        </a>
      </article>`,
      )
      .join("");
    if (!related.length) document.getElementById("relatedNews").hidden = true;
  }
});

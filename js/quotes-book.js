(function () {
  const root = document.getElementById("quotesBook");
  const holder = document.getElementById("quotesBookFlip");
  const quotes = window.DM_QUOTES || [];
  if (!root || !holder || !quotes.length || !window.St) return;

  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
    );

  const star = `
    <svg class="qb-star" viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 4 61 27 86 18 77 43 98 50 77 57 86 82 61 73 50 96 39 73 14 82 23 57 2 50 23 43 14 18 39 27Z" />
      <circle cx="50" cy="50" r="13" />
    </svg>`;

  const cover = (logo) => `
    <div class="qb-cover qb-cover--front">
      <div class="qb-cover__frame">
        <span class="qb-cover__kicker">ديوان دمشق</span>
        <img class="qb-cover__emblem" src="${logo}" alt="شعار محافظة دمشق" />
        <strong class="qb-cover__title">قالوا عنها</strong>
        <span class="qb-cover__sub">ما كتبه الرحّالة والأدباء والشعراء في دمشق</span>
        <span class="qb-cover__foot">محافظة دمشق</span>
      </div>
    </div>`;

  const endpaper = () => `<div class="qb-endpaper"></div>`;

  const quotePage = (q) => `
    <div class="qb-paper">
      <header class="qb-paper__head">
        ${q.tag ? `<span class="qb-tag">${esc(q.tag)}</span>` : "<span></span>"}
        <span class="qb-paper__title">${esc(q.cover || "")}</span>
      </header>
      <div class="qb-paper__body">
        <blockquote class="qb-quote${q.paraphrase ? " qb-quote--paraphrase" : ""}">${esc(q.quote)}</blockquote>
        <span class="qb-rule" aria-hidden="true"></span>
        <strong class="qb-author">${esc(q.author)}</strong>
        ${q.source ? `<span class="qb-source">${esc(q.source)}</span>` : ""}
      </div>
    </div>`;

  const ornament = () => `
    <div class="qb-paper qb-paper--closing">
      ${star}
      <span class="qb-closing__line">قالوا عنها </span>
    </div>`;

  const backCover = (logo) => `
    <div class="qb-cover qb-cover--back">
      <div class="qb-cover__frame">
        <img class="qb-cover__logo" src="${logo}" alt="" />
        <span class="qb-cover__foot">محافظة دمشق</span>
      </div>
    </div>`;

  const logo = root.dataset.logo || "../images/brand/logo.png";
  const cycle = quotes.map((q) => ({ html: quotePage(q) }));
  if (cycle.length % 2) cycle.push({ html: ornament() });

  const CYCLE = cycle.length;
  const A_START = 2;
  const B_START = A_START + CYCLE;
  const B_END = B_START + CYCLE - 1;

  const reading = [
    { hard: true, html: cover(logo) },
    { hard: true, html: endpaper() },
    ...cycle,
    ...cycle,
    { hard: true, html: endpaper() },
    { hard: true, html: backCover(logo) },
  ];

  const pages = [...reading].reverse();
  holder.innerHTML = pages
    .map(
      (p, i) =>
        `<div class="qb-page ${i % 2 ? "qb-page--left" : "qb-page--right"}" data-density="${p.hard ? "hard" : "soft"}">${p.html}</div>`,
    )
    .join("");

  const last = pages.length - 1;
  const book = new St.PageFlip(holder, {
    width: 380,
    height: 520,
    size: "stretch",
    minWidth: 240,
    maxWidth: 420,
    minHeight: 330,
    maxHeight: 576,
    showCover: true,
    usePortrait: true,
    drawShadow: true,
    maxShadowOpacity: 0.55,
    flippingTime: 1000,
    mobileScrollSupport: true,
    startPage: last,
  });
  book.loadFromHTML(holder.querySelectorAll(".qb-page"));

  const btnNext = root.querySelector("[data-book-next]");
  const btnPrev = root.querySelector("[data-book-prev]");

  function visible(index) {
    if (book.getOrientation() === "portrait" || index === last || index === 0) return [last - index];
    return [last - index - 1, last - index];
  }

  const atStart = (index) => Math.min(...visible(index)) <= A_START;

  function update(index) {
    if (btnPrev) btnPrev.disabled = atStart(index);
  }

  function centre(index) {
    const closed = book.getOrientation() === "landscape" && (index === last || index === 0);
    const half = closed ? book.getBoundsRect().pageWidth / 2 : 0;
    holder.style.setProperty("--qb-shift", `${index === last ? half : -half}px`);
  }

  function loop(index) {
    const shown = visible(index);
    if (shown.every((r) => r >= B_START && r <= B_END)) {
      book.turnToPage(index + CYCLE);
      return index + CYCLE;
    }
    return index;
  }

  let state = "read";
  let opened = false;

  book.on("changeState", (e) => {
    state = e.data;
    if (state === "flipping") holder.style.setProperty("--qb-shift", "0px");
  });
  book.on("flip", (e) => {
    const index = loop(e.data);
    if (index !== last) opened = true;
    update(index);
    centre(index);
  });
  book.on("changeOrientation", () => {
    update(book.getCurrentPageIndex());
    centre(book.getCurrentPageIndex());
  });
  update(last);
  centre(last);
  window.addEventListener("resize", () => centre(book.getCurrentPageIndex()));

  const TICK = 2000;
  let timer = 0,
    inView = false,
    held = false;

  function advance() {
    if (state !== "read") return;
    book.flipPrev("bottom");
  }

  function back() {
    if (!atStart(book.getCurrentPageIndex())) book.flipNext("bottom");
  }

  function schedule() {
    clearInterval(timer);
    timer = inView && !held && !document.hidden ? setInterval(advance, TICK) : 0;
    if (timer && opened && book.getCurrentPageIndex() === last) advance();
  }

  new IntersectionObserver(
    ([entry]) => {
      inView = entry.isIntersecting;
      schedule();
    },
    { threshold: 0.35 },
  ).observe(root);
  document.addEventListener("visibilitychange", schedule);
  root.addEventListener("pointerdown", () => {
    held = true;
    schedule();
  });
  window.addEventListener("pointerup", () => {
    if (held) {
      held = false;
      schedule();
    }
  });

  btnNext?.addEventListener("click", () => {
    book.flipPrev("bottom");
    schedule();
  });
  btnPrev?.addEventListener("click", () => {
    back();
    schedule();
  });

  root.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      book.flipPrev("bottom");
      schedule();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      back();
      schedule();
    }
  });
})();

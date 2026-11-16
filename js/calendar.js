(() => {
  const when = (ev) => `${ev.date} ${ev.time || ""}`;
  const EVENTS = (Array.isArray(window.EVENTS_DATA) ? window.EVENTS_DATA : [])
    .filter((ev) => ev && ev.title && /^\d{4}-\d{2}-\d{2}$/.test(ev.date || ""))
    .sort((a, b) => when(a).localeCompare(when(b)));
  const TYPES = {
    music: "موسيقى وطرب",
    religious: "فعالية دينية",
    arts: "معارض وفنون",
    heritage: "تراث وثقافة",
    occasions: "مناسبات عامة",
  };

  const MONTHS = [
    "كانون الثاني",
    "شباط",
    "آذار",
    "نيسان",
    "أيار",
    "حزيران",
    "تموز",
    "آب",
    "أيلول",
    "تشرين الأول",
    "تشرين الثاني",
    "كانون الأول",
  ];
  const DAYS = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

  const pad = (n) => String(n).padStart(2, "0");
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
    );
  const cssUrl = (u) => `url("${String(u).replace(/"/g, "%22")}")`;
  const parseKey = (k) => {
    const [y, m, d] = k.split("-").map(Number);
    return { y, m: m - 1, d, wd: new Date(y, m - 1, d).getDay() };
  };
  const fmtTime = (t) => {
    const match = /^(\d{1,2}):(\d{2})/.exec(String(t || ""));
    if (!match) return "";
    const h = Number(match[1]);
    return `${h % 12 || 12}:${match[2]} ${h < 12 ? "صباحاً" : "مساءً"}`;
  };

  const COUNT = Math.max(1, EVENTS.length);

  const now = new Date();
  const todayKey = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  const START = (() => {
    const wanted = new URLSearchParams(location.search).get("event");
    const chosen = wanted ? EVENTS.findIndex((ev) => String(ev.id) === wanted) : -1;
    if (chosen >= 0) return chosen;
    const i = EVENTS.findIndex((ev) => ev.date >= todayKey);
    return i < 0 ? Math.max(0, EVENTS.length - 1) : i;
  })();

  const ICON_PREV = '<svg viewBox="0 0 24 24"><path d="M9 6l6 6-6 6"/></svg>';
  const ICON_NEXT = '<svg viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6"/></svg>';
  const ICON_PIN =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  const ICON_CLOCK =
    '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';

  const $desk = document.getElementById("desk");
  const $pages = document.getElementById("pages");
  const $card = document.getElementById("eventCard");
  const $coils = document.getElementById("coils");
  const $section = document.getElementById("damascus-calendar");
  const $tent3d = document.getElementById("tent3d");
  const $front = document.getElementById("tentFront");

  const LOGO = document.querySelector(".board-logo img")?.src || "";
  const markHTML = () => (LOGO ? `<img class="ev-mark" src="${esc(LOGO)}" alt="">` : "");

  let holes = [];
  let book = null;

  function computeHoles() {
    const n = Math.max(10, Math.round($pages.clientWidth / 34));
    return Array.from({ length: n }, (_, i) => ((i + 0.5) / n) * 100);
  }
  function renderCoils() {
    $coils.innerHTML = holes.map((x) => `<i class="coil" style="left:${x.toFixed(3)}%"></i>`).join("");
  }
  const holesHTML = () =>
    `<div class="holes">${holes.map((x) => `<i class="hole" style="left:${x.toFixed(3)}%"></i>`).join("")}</div>`;

  function applyImages(root) {
    root.querySelectorAll("[data-img]").forEach((el) => {
      if (el.dataset.img) el.style.backgroundImage = cssUrl(el.dataset.img);
      el.removeAttribute("data-img");
    });
  }

  function frontHTML(i) {
    const ev = EVENTS[i];
    if (!ev) {
      return `
        <div class="ev ev-empty">
          <div class="ev-shade"></div>
          <div class="ev-body">
            <h3 class="ev-title">لا توجد فعاليات حالياً</h3>
            <div class="ev-place">تابعونا لمعرفة الفعاليات القادمة</div>
          </div>
        </div>`;
    }
    const { y, m, d, wd } = parseKey(ev.date);
    const img = (ev.images || [])[0] || "";
    const time = fmtTime(ev.time);
    return `
      <div class="ev${img ? "" : " ev--plain"}">
        ${img ? `<div class="ev-img" data-img="${esc(img)}"></div>` : markHTML()}
        <div class="ev-shade"></div>

        <div class="ev-top">
          <div class="ev-date">
            <b class="ev-day">${pad(d)}</b>
            <span class="ev-month">
              <strong>${MONTHS[m]}</strong>
              <small>${DAYS[wd]} · ${y}</small>
            </span>
          </div>
          <div class="ev-nav">
            <button type="button" class="nav-btn" data-act="prev" aria-label="الفعالية السابقة" title="الفعالية السابقة" ${i === 0 ? "disabled" : ""}>${ICON_PREV}</button>
            <button type="button" class="nav-btn" data-act="next" aria-label="الفعالية التالية" title="الفعالية التالية" ${i === COUNT - 1 ? "disabled" : ""}>${ICON_NEXT}</button>
          </div>
        </div>

        <div class="ev-body">
          <h3 class="ev-title">${esc(ev.title)}</h3>
          ${
            ev.location || time
              ? `<div class="ev-place">
            ${ev.location ? `<span class="ev-meta">${ICON_PIN}<span>${esc(ev.location)}</span></span>` : ""}
            ${time ? `<span class="ev-meta">${ICON_CLOCK}<span>${esc(time)}</span></span>` : ""}
          </div>`
              : ""
          }
        </div>

        <div class="ev-foot" data-grab></div>
      </div>
      <button type="button" class="curl" data-act="next" data-grab aria-label="الفعالية التالية" title="الفعالية التالية" ${i === COUNT - 1 ? "hidden" : ""}></button>`;
  }

  function buildPage(i) {
    const ev = EVENTS[i];
    const page = document.createElement("div");
    page.className = "page";
    page.dataset.index = i;
    page.innerHTML = `
      <div class="face front">
        ${holesHTML()}
        ${frontHTML(i)}
      </div>
      <div class="face back">
        ${holesHTML()}
        <div class="back-print">
          <h4>ملاحظات</h4>
          <div class="lines"></div>
          <div class="foot">${ev ? esc(ev.title) : ""}</div>
        </div>
      </div>`;
    applyImages(page);
    return page;
  }

  const photosOf = (ev) => (ev.images || []).filter(Boolean);

  function postmarkSVG(key) {
    const { y, m, d } = parseKey(key);
    const waves = [44, 58, 72, 86]
      .map((yy) => `<path d="M128 ${yy} q 11 -7 22 0 t 22 0 t 22 0 t 22 0 t 22 0"/>`)
      .join("");
    return `
      <svg class="postmark" viewBox="0 0 240 130" aria-hidden="true">
        <defs>
          <filter id="pmInk" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3" result="n"/>
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.4"/>
            <feComponentTransfer><feFuncA type="discrete" tableValues="0 .85 1 1 .9 1"/></feComponentTransfer>
          </filter>
          <path id="pmArc" d="M 65 65 m -47 0 a 47 47 0 1 1 94 0"/>
        </defs>
        <g filter="url(#pmInk)">
          <g fill="none" stroke="currentColor">
            <circle cx="65" cy="65" r="56" stroke-width="3.2"/>
            <circle cx="65" cy="65" r="38" stroke-width="1.6"/>
            <g stroke-width="3" stroke-linecap="round">${waves}</g>
          </g>
          <text font-size="11.5" font-weight="900" fill="currentColor">
            <textPath href="#pmArc" startOffset="50%" text-anchor="middle">بريد دمشق · محافظة دمشق</textPath>
          </text>
          <text x="65" y="63" text-anchor="middle" font-size="17" font-weight="900" fill="currentColor">${pad(d)}.${pad(m + 1)}</text>
          <text x="65" y="82" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">${y}</text>
        </g>
      </svg>`;
  }

  function perforate(el) {
    const w = el.offsetWidth,
      h = el.offsetHeight;
    if (!w || !h) return;
    const r = 5.5,
      gap = 17;
    const nx = Math.max(2, Math.round(w / gap)),
      ny = Math.max(2, Math.round(h / gap));
    let holes = "";
    for (let i = 0; i <= nx; i++) {
      const x = ((i * w) / nx).toFixed(2);
      holes += `<circle cx="${x}" cy="0" r="${r}"/><circle cx="${x}" cy="${h}" r="${r}"/>`;
    }
    for (let j = 1; j < ny; j++) {
      const yy = ((j * h) / ny).toFixed(2);
      holes += `<circle cx="0" cy="${yy}" r="${r}"/><circle cx="${w}" cy="${yy}" r="${r}"/>`;
    }
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><mask id="m"><rect width="100%" height="100%" fill="#fff"/><g fill="#000">${holes}</g></mask></defs><rect width="100%" height="100%" fill="#fff" mask="url(#m)"/></svg>`;
    const url = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
    el.style.webkitMaskImage = url;
    el.style.maskImage = url;
    el.style.webkitMaskSize = "100% 100%";
    el.style.maskSize = "100% 100%";
  }
  const perforateAll = () => $card.querySelectorAll(".stamp-paper").forEach(perforate);
  if ("ResizeObserver" in window) new ResizeObserver(perforateAll).observe($card);

  function backStampsHTML(photos, n) {
    const next = photos.length > 2 ? [1, 2] : [1];
    return next
      .map(
        (off, k) => `
      <div class="stamp stamp--back stamp--b${k + 1}" aria-hidden="true">
        <div class="stamp-paper"><div class="stamp-frame">
          <div class="stamp-photos"><div class="cd-photo show" data-img="${esc(photos[(n + off) % photos.length])}"></div></div>
        </div></div>
      </div>`,
      )
      .join("");
  }

  function renderCard() {
    const ev = EVENTS[book.index] || null;
    const key = ev ? ev.date : null;
    const photos = ev ? photosOf(ev) : [];
    const note = ev ? ev.note || TYPES[ev.category] || "" : "";
    const many = photos.length > 1;
    const { y } = key ? parseKey(key) : { y: "" };

    const inner = document.createElement("div");
    inner.className = "card-in";
    inner.innerHTML = `
      <div class="st">
        <div class="st-stack${many ? " has-many" : ""}">
          ${many ? backStampsHTML(photos, 0) : ""}
          <div class="stamp stamp--front${photos.length ? "" : " stamp--plain"}">
            <div class="stamp-paper">
              <div class="stamp-frame">
                <div class="stamp-photos">
                  ${photos.length ? `<div class="cd-photo show" data-img="${esc(photos[0])}"></div>` : markHTML()}
                </div>
                <div class="stamp-country">الجمهورية العربية السورية</div>
                ${ev ? `<div class="stamp-caption"><span>${esc(ev.title)}</span><small>${y}</small></div>` : ""}
              </div>
            </div>
          </div>
          ${key ? postmarkSVG(key) : ""}
        </div>

        ${
          many
            ? `
          <div class="st-nav">
            <button type="button" class="st-btn" data-photo-step="-1" aria-label="الصورة السابقة">${ICON_PREV}</button>
            <span class="st-count"><b>1</b> من ${photos.length}</span>
            <button type="button" class="st-btn" data-photo-step="1" aria-label="الصورة التالية">${ICON_NEXT}</button>
          </div>`
            : ""
        }

        <div class="st-text">
          ${ev ? "" : `<p class="st-desc">لا توجد فعاليات حالياً</p>`}
          ${ev && ev.description ? `<p class="st-about">${esc(ev.description)}</p>` : ""}
          ${note ? `<div class="st-tag">${esc(note)}</div>` : ""}
        </div>
      </div>`;
    inner.dataset.photos = JSON.stringify(photos);
    inner.dataset.current = "0";
    applyImages(inner);
    $card.replaceChildren(inner);
    perforateAll();
  }

  function showPhoto(n) {
    const inner = $card.querySelector(".card-in");
    const photos = JSON.parse(inner?.dataset.photos || "[]");
    const front = $card.querySelector(".stamp--front");
    const holder = front?.querySelector(".stamp-photos");
    if (!holder || photos.length < 2) return;
    n = (n + photos.length) % photos.length;
    if (String(n) === inner.dataset.current) return;
    inner.dataset.current = String(n);

    const counter = $card.querySelector(".st-count b");
    if (counter) counter.textContent = n + 1;

    const old = [...holder.querySelectorAll(".cd-photo")];
    const layer = document.createElement("div");
    layer.className = "cd-photo";
    layer.style.backgroundImage = cssUrl(photos[n]);
    holder.appendChild(layer);
    requestAnimationFrame(() => requestAnimationFrame(() => layer.classList.add("show")));
    setTimeout(() => old.forEach((el) => el.remove()), 600);

    $card.querySelectorAll(".stamp--back").forEach((s, k) => {
      const p = s.querySelector(".cd-photo");
      if (p) p.style.backgroundImage = cssUrl(photos[(n + k + 1) % photos.length]);
    });
    front.classList.remove("shuffle");
    void front.offsetWidth;
    front.classList.add("shuffle");
  }

  $pages.addEventListener("click", (e) => {
    if (!book.canAct()) return;
    const t = e.target.closest("[data-act]");
    if (!t || t.closest(".page") !== book.page) return;
    if (t.dataset.act === "next") book.next();
    else if (t.dataset.act === "prev") book.prev();
  });

  const currentPhoto = () => Number($card.querySelector(".card-in")?.dataset.current || 0);

  $card.addEventListener("click", (e) => {
    if (cardSwiped) return;
    const step = e.target.closest("[data-photo-step]");
    if (step) showPhoto(currentPhoto() + Number(step.dataset.photoStep));
  });

  let cardSwipe = null,
    cardSwiped = false;
  $card.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".st-stack.has-many") && !e.target.closest("button")) {
      cardSwipe = { id: e.pointerId, x: e.clientX, y: e.clientY };
    }
  });
  window.addEventListener("pointerup", (e) => {
    if (!cardSwipe || e.pointerId !== cardSwipe.id) return;
    const dx = e.clientX - cardSwipe.x,
      dy = e.clientY - cardSwipe.y;
    cardSwipe = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      showPhoto(currentPhoto() + (dx < 0 ? 1 : -1));
      cardSwiped = true;
      setTimeout(() => {
        cardSwiped = false;
      }, 60);
    }
  });
  window.addEventListener("pointercancel", () => {
    cardSwipe = null;
  });

  $desk.addEventListener("keydown", (e) => {
    if (!book.canAct() || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      book.next();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      book.prev();
    }
  });

  const FRONT_LEAN = 12,
    BACK_LEAN = 24;
  const rad = (a) => (a * Math.PI) / 180;

  function layoutTent() {
    const H = $front.offsetHeight;
    const a = rad(FRONT_LEAN),
      b = rad(BACK_LEAN);
    const depth = H * (Math.sin(a) + Math.cos(a) * Math.tan(b));
    $tent3d.style.setProperty("--hb", `${((H * Math.cos(a)) / Math.cos(b)).toFixed(1)}px`);
    $tent3d.style.setProperty("--depth", `${depth.toFixed(1)}px`);

    const sr = $section.getBoundingClientRect();
    const t = $tent3d.getBoundingClientRect();
    $section.style.setProperty("--tent-left", `${Math.round(t.left - sr.left)}px`);
    $section.style.setProperty("--tent-width", `${Math.round(t.width)}px`);
    $section.style.setProperty("--tent-top", `${Math.round(t.top - sr.top)}px`);

    const xs = computeHoles();
    if (xs.length !== holes.length) {
      holes = xs;
      renderCoils();
      $pages.querySelectorAll(".page .holes").forEach((el) => {
        el.outerHTML = holesHTML();
      });
    }
  }
  if ("ResizeObserver" in window) new ResizeObserver(layoutTent).observe($section);
  window.addEventListener("load", layoutTent);

  function updatePad(index) {
    const left = COUNT - 1 - index;
    $front.style.setProperty("--pad", `${Math.min(14, 3 + left * 1.6).toFixed(1)}px`);
  }

  holes = computeHoles();
  renderCoils();

  book = PaperFlip.create({
    container: $pages,
    stack: document.getElementById("stack"),
    count: COUNT,
    index: START,
    buildPage,
    onFlip(index) {
      renderCard();
      updatePad(index);
    },
  });
  updatePad(book.index);
  renderCard();
  layoutTent();

  const stick = () => {
    $section.style.top = `${Math.min(0, window.innerHeight - $section.offsetHeight)}px`;
  };
  if ("ResizeObserver" in window) new ResizeObserver(stick).observe($section);
  window.addEventListener("resize", stick);
})();

document.addEventListener("DOMContentLoaded", async () => {
  const Auth = window.DashAuth;
  const Opp = window.InvOpportunities;
  const app = document.getElementById("app");
  const toastEl = document.getElementById("toast");
  const confirmEl = document.getElementById("confirm");

  const NEWS_TYPES = { news: "خبر", activity: "أنشطة المحافظة", decision: "قرار" };
  const OPP_TAGS = { tourism: "tag-activity", commerce: "tag-decision", parking: "tag-news" };
  const EVENT_TYPES = {
    music: "موسيقى وطرب",
    religious: "فعالية دينية",
    arts: "معارض وفنون",
    heritage: "تراث وثقافة",
    occasions: "مناسبات عامة",
  };
  const EVENT_TAGS = {
    music: "tag-activity",
    religious: "tag-decision",
    arts: "tag-news",
    heritage: "tag-heritage",
    occasions: "tag-occasions",
  };
  const OPP_ICONS = [
    ["fa-hotel", "فندق"],
    ["fa-bed", "شقق فندقية"],
    ["fa-hospital", "مركز طبي"],
    ["fa-building", "مبنى ومكاتب"],
    ["fa-store", "سوق تجاري"],
    ["fa-bag-shopping", "مول"],
    ["fa-tree", "حديقة"],
    ["fa-square-parking", "مرآب"],
    ["fa-hot-tub-person", "حمام"],
    ["fa-landmark", "معلم تراثي"],
    ["fa-utensils", "مطاعم"],
    ["fa-futbol", "رياضة وترفيه"],
    ["fa-industry", "صناعة"],
    ["fa-solar-panel", "طاقة"],
    ["fa-graduation-cap", "تعليم"],
    ["fa-city", "تطوير عمراني"],
  ];
  const PAGE_SIZE = 10;
  const DAY = 24 * 60 * 60 * 1000;

  const ICONS = {
    plus: '<path d="M12 5v14M5 12h14"/>',
    edit: '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v6M14 11v6"/>',
    eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    building:
      '<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1M10 21v-3h4v3"/>',
    doc: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
    image:
      '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
  };
  const svg = (name) => `<svg class="i" viewBox="0 0 24 24">${ICONS[name]}</svg>`;

  const esc = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch],
    );

  const pad = (n) => String(n).padStart(2, "0");
  const todayISO = () => {
    const d = new Date();
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  };
  const parseDay = (value) => {
    const [y, m, d] = String(value || "")
      .slice(0, 10)
      .split("-")
      .map(Number);
    return y && m && d ? new Date(y, m - 1, d) : null;
  };
  const formatDay = (value) => {
    const date = parseDay(value);
    return date
      ? date.toLocaleDateString("ar-SY-u-nu-latn", { day: "numeric", month: "long", year: "numeric" })
      : "بدون تاريخ";
  };
  const formatEventDay = (value) => {
    const date = parseDay(value);
    return date
      ? date.toLocaleDateString("ar-SY-u-nu-latn", { weekday: "long", day: "numeric", month: "long", year: "numeric" })
      : "بدون تاريخ";
  };
  const formatTime = (value) => {
    const match = /^(\d{1,2}):(\d{2})/.exec(String(value || ""));
    if (!match) return "";
    const hour = Number(match[1]);
    return `${pad(hour % 12 || 12)}:${match[2]} ${hour < 12 ? "صباحاً" : "مساءً"}`;
  };
  const photoCount = (n) => (n === 1 ? "صورة واحدة" : n === 2 ? "صورتان" : n <= 10 ? `${n} صور` : `${n} صورة`);
  const formatStamp = (value) => {
    const date = value ? new Date(value) : null;
    return date && !Number.isNaN(date.getTime())
      ? date.toLocaleString("ar-SY-u-nu-latn", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      : "—";
  };

  const siteUrl = (src) => {
    if (!src) return "";
    if (/^(https?:|data:|blob:)/.test(src)) return src;
    return "../../" + src.replace(/^(\.\.\/|\/)+/, "");
  };
  const oppImage = (src) => (/^(https?:|data:|blob:|\/|\.\.\/)/.test(src || "") ? siteUrl(src) : `../../images/investments/${src}`);

  const data = { news: null, opportunities: null, events: null };

  async function load(name) {
    if (!data[name]) data[name] = (await Auth.api(`data/${name}`)).items;
    return data[name];
  }

  let toastTimer = null;
  function toast(message, isError = false) {
    toastEl.textContent = message;
    toastEl.classList.toggle("is-error", isError);
    toastEl.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-visible"), isError ? 6000 : 3200);
  }

  function confirmDelete(title, text, yesLabel = "حذف", danger = true) {
    const yes = confirmEl.querySelector('[data-confirm="yes"]');
    yes.textContent = yesLabel;
    yes.classList.toggle("btn-danger", danger);
    yes.classList.toggle("btn-primary", !danger);
    confirmEl.querySelector("#confirmTitle").textContent = title;
    confirmEl.querySelector("#confirmText").textContent = text;
    confirmEl.classList.add("is-open");
    confirmEl.querySelector('[data-confirm="no"]').focus();
    return new Promise((resolve) => {
      const done = (answer) => {
        confirmEl.classList.remove("is-open");
        confirmEl.removeEventListener("click", onClick);
        document.removeEventListener("keydown", onKey);
        resolve(answer);
      };
      const onClick = (event) => {
        const button = event.target.closest("[data-confirm]");
        if (button) done(button.dataset.confirm === "yes");
        else if (event.target === confirmEl) done(false);
      };
      const onKey = (event) => {
        if (event.key === "Escape") done(false);
      };
      confirmEl.addEventListener("click", onClick);
      document.addEventListener("keydown", onKey);
    });
  }

  async function removeItem(name, id, title, text, back) {
    if (!(await confirmDelete(title, text))) return;
    try {
      await Auth.api(`data/${name}/${encodeURIComponent(id)}`, { method: "DELETE" });
      data[name] = data[name].filter((item) => String(item.id) !== String(id));
      toast("تم الحذف.");
      if (back && location.hash !== back) location.hash = back;
      else route();
    } catch (error) {
      toast(error.message, true);
    }
  }

  const listState = {};

  function renderList(cfg) {
    const st =
      listState[cfg.key] || (listState[cfg.key] = { chip: "all", select: "all", from: "", to: "", query: "", page: 1 });

    app.innerHTML = `
      <header class="page-head">
        <h1>${cfg.title}</h1>
        <div class="head-actions">${cfg.headActions || ""}<a href="${cfg.addHref}" class="btn btn-primary">${svg("plus")} ${cfg.addLabel}</a></div>
      </header>
      <section class="stats">${cfg.stats.map(([value, label]) => `<div class="stat"><strong>${value}</strong><span>${label}</span></div>`).join("")}</section>
      <div class="filters">
        <nav class="chips" data-chips>${cfg.chips.map(([value, label]) => `<a href="#" class="chip${st.chip === value ? " active" : ""}" data-chip="${esc(value)}">${label}</a>`).join("")}</nav>
        <div class="filters-end">
          ${
            cfg.select
              ? `
          <div class="date-filter">
            <label class="select">${svg("calendar")}<select data-select aria-label="${cfg.select.label}">${cfg.select.options.map(([value, label]) => `<option value="${value}">${label}</option>`).join("")}</select></label>
            ${
              cfg.select.custom
                ? `<div class="date-range" data-custom hidden>
              <label class="date-input"><span>من</span><input type="date" data-from></label>
              <label class="date-input"><span>إلى</span><input type="date" data-to></label>
            </div>`
                : ""
            }
          </div>`
              : ""
          }
          <label class="search">${svg("search")}<input type="text" data-search placeholder="${cfg.searchPlaceholder}"></label>
        </div>
      </div>
      <section class="${cfg.feedClass || "feed"}" data-feed></section>
      <div class="pager" data-pager></div>`;

    const feed = app.querySelector("[data-feed]");
    const pager = app.querySelector("[data-pager]");
    const select = app.querySelector("[data-select]");
    const custom = app.querySelector("[data-custom]");
    const from = app.querySelector("[data-from]");
    const to = app.querySelector("[data-to]");
    const search = app.querySelector("[data-search]");

    if (select) select.value = st.select;
    if (from) from.value = st.from;
    if (to) to.value = st.to;
    search.value = st.query;

    function pagerHtml(page, pages) {
      const numbers = [];
      for (let n = 1; n <= pages; n++) {
        if (n === 1 || n === pages || Math.abs(n - page) <= 1) numbers.push(n);
        else if (numbers[numbers.length - 1] !== "…") numbers.push("…");
      }
      return `<nav class="pages">
        ${page > 1 ? `<a href="#" data-page="${page - 1}">السابق</a>` : ""}
        ${numbers.map((n) => (n === "…" ? "<a>…</a>" : `<a href="#" data-page="${n}"${n === page ? ' class="active"' : ""}>${n}</a>`)).join("")}
        ${page < pages ? `<a href="#" data-page="${page + 1}">التالي</a>` : ""}
      </nav>`;
    }

    function draw() {
      if (custom) custom.hidden = st.select !== "custom";
      const shown = cfg.items.filter((item) => cfg.match(item, st));
      const pages = Math.max(1, Math.ceil(shown.length / PAGE_SIZE));
      st.page = Math.min(Math.max(1, st.page), pages);
      const slice = shown.slice((st.page - 1) * PAGE_SIZE, st.page * PAGE_SIZE);
      feed.innerHTML = slice.length
        ? slice.map(cfg.itemHtml).join("")
        : `<p class="feed-empty">${cfg.items.length ? "لا توجد نتائج مطابقة." : cfg.emptyText}</p>`;
      pager.innerHTML = pages > 1 ? pagerHtml(st.page, pages) : "";
    }

    app.querySelector("[data-chips]").addEventListener("click", (event) => {
      const chip = event.target.closest("[data-chip]");
      if (!chip) return;
      event.preventDefault();
      st.chip = chip.dataset.chip;
      st.page = 1;
      app.querySelectorAll("[data-chip]").forEach((el) => el.classList.toggle("active", el === chip));
      draw();
    });
    if (select)
      select.addEventListener("change", () => {
        st.select = select.value;
        st.page = 1;
        draw();
      });
    if (from)
      from.addEventListener("change", () => {
        st.from = from.value;
        to.min = from.value;
        st.page = 1;
        draw();
      });
    if (to)
      to.addEventListener("change", () => {
        st.to = to.value;
        from.max = to.value;
        st.page = 1;
        draw();
      });
    search.addEventListener("input", () => {
      st.query = search.value.trim();
      st.page = 1;
      draw();
    });
    pager.addEventListener("click", (event) => {
      const link = event.target.closest("[data-page]");
      if (!link) return;
      event.preventDefault();
      st.page = Number(link.dataset.page);
      draw();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    feed.addEventListener("click", (event) => {
      const button = event.target.closest("[data-delete]");
      if (button) cfg.onDelete(button.dataset.delete);
    });

    draw();
  }

  function inRange(date, st, future) {
    if (st.select === "all") return true;
    if (!date) return false;
    let min = null;
    let max = null;
    if (st.select === "custom") {
      min = parseDay(st.from);
      max = parseDay(st.to);
    } else {
      const today = parseDay(todayISO());
      const span = Number(st.select);
      if (future) {
        min = today;
        max = new Date(today.getTime() + span * DAY);
      } else {
        max = today;
        min = new Date(today.getTime() - (span - 1) * DAY);
      }
    }
    return (!min || date >= min) && (!max || date <= max);
  }

  const matches = (st, text) => !st.query || text.toLowerCase().includes(st.query.toLowerCase());

  function newsList() {
    const items = [...data.news].sort((a, b) => String(b.date).localeCompare(String(a.date)));
    const count = (type) => items.filter((item) => item.type === type).length;

    renderList({
      key: "news",
      title: "الأخبار",
      addHref: "#/news/new",
      addLabel: "خبر جديد",
      stats: [
        [items.length, "إجمالي الأخبار"],
        [count("activity"), "أنشطة المحافظة"],
        [count("decision"), "قرارات"],
        [count("news"), "أخبار"],
      ],
      chips: [["all", "الكل"], ...Object.entries(NEWS_TYPES)],
      select: {
        label: "فلترة حسب التاريخ",
        custom: true,
        options: [
          ["all", "كل التواريخ"],
          ["1", "اليوم"],
          ["7", "آخر 7 أيام"],
          ["30", "آخر 30 يوماً"],
          ["90", "آخر 3 أشهر"],
          ["365", "آخر سنة"],
          ["custom", "فترة مخصصة…"],
        ],
      },
      searchPlaceholder: "ابحث في الأخبار...",
      emptyText: "لا توجد أخبار بعد. أضف أول خبر.",
      items,
      match: (item, st) =>
        (st.chip === "all" || item.type === st.chip) &&
        inRange(parseDay(item.date), st, false) &&
        matches(st, `${item.title} ${item.fullTitle || ""} ${item.desc || ""} ${item.body || ""}`),
      itemHtml: (item) => `
        <article class="item">
          <a href="#/news/edit/${encodeURIComponent(item.id)}" class="item-img"><img src="${esc(siteUrl(item.image))}" alt="" loading="lazy"></a>
          <div class="item-body">
            <div class="item-meta">
              <span class="tag tag-${esc(item.type)}">${esc(NEWS_TYPES[item.type] || item.type)}</span>
              <span class="date">${svg("calendar")} ${esc(formatDay(item.date))}</span>
            </div>
            <h3><a href="#/news/edit/${encodeURIComponent(item.id)}">${esc(item.title)}</a></h3>
            <p>${esc(item.desc)}</p>
          </div>
          <div class="item-actions">
            <a class="icon-btn" href="../news-details.html?id=${encodeURIComponent(item.id)}" target="_blank" rel="noopener" title="عرض على الموقع">${svg("eye")}</a>
            <a class="icon-btn" href="#/news/edit/${encodeURIComponent(item.id)}" title="تعديل">${svg("edit")}</a>
            <button type="button" class="icon-btn danger" data-delete="${esc(item.id)}" title="حذف">${svg("trash")}</button>
          </div>
        </article>`,
      onDelete: (id) => {
        const item = data.news.find((entry) => String(entry.id) === String(id));
        removeItem("news", id, "حذف هذا الخبر؟", item ? item.title : "", "#/news");
      },
    });
  }

  function sortEvents(items) {
    const today = todayISO();
    const when = (item) => `${item.date || ""} ${item.time || ""}`;
    const upcoming = items
      .filter((item) => String(item.date || "") >= today)
      .sort((a, b) => when(a).localeCompare(when(b)));
    const past = items.filter((item) => String(item.date || "") < today).sort((a, b) => when(b).localeCompare(when(a)));
    return [...upcoming, ...past];
  }

  function eventsList() {
    const items = sortEvents(data.events);
    const today = todayISO();
    const month = parseDay(today).getTime() + 30 * DAY;
    const upcoming = items.filter((item) => String(item.date || "") >= today);

    renderList({
      key: "events",
      title: "الفعاليات",
      addHref: "#/events/new",
      addLabel: "فعالية جديدة",
      stats: [
        [items.length, "إجمالي الفعاليات"],
        [upcoming.length, "قادمة"],
        [upcoming.filter((item) => parseDay(item.date).getTime() <= month).length, "خلال 30 يوماً"],
        [items.length - upcoming.length, "منتهية"],
      ],
      chips: [["all", "الكل"], ...Object.entries(EVENT_TYPES)],
      select: {
        label: "فلترة حسب تاريخ الفعالية",
        custom: true,
        options: [
          ["all", "كل المواعيد"],
          ["7", "خلال 7 أيام"],
          ["30", "خلال 30 يوماً"],
          ["90", "خلال 3 أشهر"],
          ["custom", "فترة مخصصة…"],
        ],
      },
      searchPlaceholder: "ابحث في الفعاليات...",
      emptyText: "لا توجد فعاليات بعد. أضف أول فعالية.",
      items,
      match: (item, st) =>
        (st.chip === "all" || item.category === st.chip) &&
        inRange(parseDay(item.date), st, true) &&
        matches(st, `${item.title} ${item.location || ""} ${item.description || ""} ${item.note || ""}`),
      itemHtml: (item) => {
        const href = `#/events/edit/${encodeURIComponent(item.id)}`;
        const image = item.images && item.images[0];
        const time = formatTime(item.time);
        const count = (item.images || []).length;
        const details = [
          item.location ? `<span class="date">${svg("pin")} ${esc(item.location)}</span>` : "",
          time ? `<span class="date">${svg("clock")} ${esc(time)}</span>` : "",
          count ? `<span class="date">${svg("image")} ${photoCount(count)}</span>` : "",
        ].join("");
        return `
        <article class="item">
          ${
            image
              ? `<a href="${href}" class="item-img"><img src="${esc(siteUrl(image))}" alt="" loading="lazy"></a>`
              : `<a href="${href}" class="item-img item-img--icon">${svg("calendar")}</a>`
          }
          <div class="item-body">
            <div class="item-meta">
              <span class="tag ${EVENT_TAGS[item.category] || "tag-news"}">${esc(EVENT_TYPES[item.category] || "—")}</span>
              ${String(item.date || "") < today ? '<span class="status status--closed">انتهت</span>' : ""}
              <span class="date">${svg("calendar")} ${esc(formatEventDay(item.date))}</span>
            </div>
            <h3><a href="${href}">${esc(item.title)}</a></h3>
            ${details ? `<div class="item-meta">${details}</div>` : ""}
            ${item.description ? `<p>${esc(item.description)}</p>` : ""}
          </div>
          <div class="item-actions">
            <a class="icon-btn" href="../Cultural-model-5.html?event=${encodeURIComponent(item.id)}#damascus-calendar" target="_blank" rel="noopener" title="عرض على الموقع">${svg("eye")}</a>
            <a class="icon-btn" href="${href}" title="تعديل">${svg("edit")}</a>
            <button type="button" class="icon-btn danger" data-delete="${esc(item.id)}" title="حذف">${svg("trash")}</button>
          </div>
        </article>`;
      },
      onDelete: (id) => {
        const item = data.events.find((entry) => String(entry.id) === String(id));
        removeItem("events", id, "حذف هذه الفعالية؟", item ? item.title : "", "#/events");
      },
    });
  }

  const statusRank = { open: 0, upcoming: 1, closed: 2 };

  function sortOpportunities(items) {
    return [...items].sort((a, b) => {
      const sa = Opp.getStatus(a);
      const sb = Opp.getStatus(b);
      if (sa !== sb) return statusRank[sa] - statusRank[sb];
      const da = Opp.toDate(a.deadline);
      const db = Opp.toDate(b.deadline);
      if (da && db) return sa === "closed" ? db - da : da - db;
      if (da || db) return da ? -1 : 1;
      return Number(a.id) - Number(b.id);
    });
  }

  function investmentsList() {
    const items = sortOpportunities(data.opportunities);
    const counts = { open: 0, upcoming: 0, closed: 0 };
    items.forEach((item) => counts[Opp.getStatus(item)]++);

    renderList({
      key: "investments",
      title: "الاستثمارات",
      addHref: "#/investments/new",
      addLabel: "حقيبة جديدة",
      stats: [
        [items.length, "إجمالي الحقائب"],
        [counts.open, "متاحة الآن"],
        [counts.upcoming, "قريباً"],
        [counts.closed, "مغلقة"],
      ],
      chips: [["all", "الكل"], ...Object.entries(Opp.categories).map(([key, value]) => [key, value.label])],
      select: {
        label: "الحالة",
        options: [
          ["all", "كل الحالات"],
          ["open", "متاحة"],
          ["upcoming", "قريباً"],
          ["closed", "مغلقة"],
          ["nodeadline", "بدون موعد إغلاق"],
        ],
      },
      searchPlaceholder: "ابحث باسم الحقيبة أو موقعها...",
      emptyText: "لا توجد حقائب بعد. أضف أول حقيبة.",
      feedClass: "feed feed--full",
      items,
      match: (item, st) =>
        (st.chip === "all" || item.category === st.chip) &&
        (st.select === "all" || (st.select === "nodeadline" ? !item.deadline : Opp.getStatus(item) === st.select)) &&
        matches(st, `${item.title} ${item.location || ""}`),
      itemHtml: (item) => {
        const status = Opp.getStatus(item);
        const image = item.images && item.images[0];
        const href = `#/investments/edit/${encodeURIComponent(item.id)}`;
        return `
        <article class="item">
          ${
            image
              ? `<a href="${href}" class="item-img"><img src="${esc(oppImage(image))}" alt="" loading="lazy"></a>`
              : `<a href="${href}" class="item-img item-img--icon">${svg("building")}</a>`
          }
          <div class="item-body">
            <div class="item-meta">
              <span class="tag ${OPP_TAGS[item.category] || "tag-news"}">${esc(Opp.categories[item.category]?.label || "—")}</span>
              <span class="status status--${status}">${Opp.statusLabels[status]}</span>
              ${
                item.deadline
                  ? `<span class="date">${svg("calendar")} آخر موعد للتقديم: ${esc(Opp.formatDate(item.deadline, true))}</span>`
                  : `<span class="warn">لم يُحدد موعد إغلاق</span>`
              }
            </div>
            <h3><a href="${href}">${esc(item.title)}</a></h3>
            <div class="item-meta">
              <span class="date">${svg("pin")} ${esc(item.location)}</span>
              <span class="date">${svg("clock")} ${esc(Opp.yearsText(item.years))}</span>
            </div>
            <p>${esc(item.description)}</p>
          </div>
          <div class="item-actions">
            <a class="icon-btn" href="../Opportunity-details.html?id=${encodeURIComponent(item.id)}" target="_blank" rel="noopener" title="عرض على الموقع">${svg("eye")}</a>
            <a class="icon-btn" href="${href}" title="تعديل">${svg("edit")}</a>
            <button type="button" class="icon-btn danger" data-delete="${esc(item.id)}" title="حذف">${svg("trash")}</button>
          </div>
        </article>`;
      },
      onDelete: (id) => {
        const item = data.opportunities.find((entry) => String(entry.id) === String(id));
        removeItem("opportunities", id, "حذف هذه الحقيبة؟", item ? item.title : "", "#/investments");
      },
    });
  }

  function editorShell({ title, back, item, panels, info }) {
    app.innerHTML = `
      <header class="heading">
        <h1>${title}</h1>
        <div class="heading-actions">
          <button type="submit" form="editForm" class="btn btn-primary" data-save>${svg("check")} ${item ? "حفظ التغييرات" : "إضافة"}</button>
          ${item ? `<button type="button" class="btn btn-danger" data-remove>${svg("trash")} حذف</button>` : ""}
          <a href="${back}" class="btn btn-outline">${svg("x")} إلغاء</a>
        </div>
      </header>
      <form id="editForm" class="editor" novalidate>
        <p class="form-error" data-error hidden></p>
        ${panels}
        ${
          item
            ? `<section class="panel">
          <div class="panel-head"><h2>معلومات</h2></div>
          <div class="panel-body">
            <ul class="facts">
              ${info.map(([label, value]) => `<li><span>${label}</span><strong>${esc(value)}</strong></li>`).join("")}
              <li><span>أُنشئ في</span><strong>${esc(formatStamp(item.createdAt))}</strong></li>
              <li><span>آخر تعديل</span><strong>${esc(formatStamp(item.updatedAt))}</strong></li>
            </ul>
          </div>
        </section>`
            : ""
        }
      </form>`;

    const form = app.querySelector("#editForm");
    const errorEl = app.querySelector("[data-error]");
    const saveBtn = app.querySelector("[data-save]");
    const saveLabel = saveBtn.innerHTML;
    form.addEventListener("input", () => {
      errorEl.hidden = true;
    });

    return {
      form,
      fail(message, field) {
        errorEl.textContent = message;
        errorEl.hidden = false;
        errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
        if (field) field.focus({ preventScroll: true });
      },
      busy(on) {
        saveBtn.disabled = on;
        saveBtn.innerHTML = on ? "جارٍ الحفظ..." : saveLabel;
        if (on) errorEl.hidden = true;
      },
      onRemove(handler) {
        const button = app.querySelector("[data-remove]");
        if (button) button.addEventListener("click", handler);
      },
    };
  }

  const panel = (title, body, extra = "") => `
    <section class="panel">
      <div class="panel-head"><h2>${title}</h2></div>
      <div class="panel-body${extra}">${body}</div>
    </section>`;

  const field = (label, control, hint = "") =>
    `<div class="field"><label>${label}${hint ? ` <span class="hint">${hint}</span>` : ""}</label>${control}</div>`;

  const radios = (name, options, checked) =>
    `<div class="types">${options
      .map(
        ([value, label]) => `
    <label><input type="radio" name="${name}" value="${esc(value)}"${value === checked ? " checked" : ""}><span class="type">${label}</span></label>`,
      )
      .join("")}</div>`;

  const EN_DICT = window.I18N_DICT || {};
  const normText = (s) =>
    String(s || "")
      .replace(/ /g, " ")
      .replace(/\s+/g, " ")
      .trim();
  const NEWS_EN = [
    ["title", "العنوان"],
    ["fullTitle", "العنوان الكامل"],
    ["desc", "الملخص", true],
    ["body", "نص الخبر", true],
    ["caption", "تعليق الصورة", true],
  ];
  const OPP_EN = [
    ["title", "اسم الحقيبة"],
    ["location", "الموقع"],
    ["description", "وصف المشروع", true],
    ["summary", "موضوع المقترح", true],
    ["note", "ملاحظة"],
  ];
  const EVENT_EN = [
    ["title", "العنوان"],
    ["location", "الموقع"],
    ["description", "الوصف", true],
    ["note", "ملاحظة"],
  ];

  function englishOf(value) {
    if (!value) return "";
    const whole = EN_DICT[normText(value)];
    if (whole) return whole;
    const parts = String(value).split(/\r?\n/);
    if (parts.length < 2) return "";
    const out = parts.map((line) => {
      const mark = (line.match(/^\s*#{1,6}\s+/) || [""])[0];
      const key = normText(line.slice(mark.length));
      if (!key) return "";
      return key in EN_DICT ? mark.trim() + (mark ? " " : "") + EN_DICT[key] : null;
    });
    return out.includes(null) ? "" : out.join("\n");
  }

  const englishPanel = (v, fields) =>
    panel(
      "النسخة الإنكليزية (اختياري)",
      `<p class="hint hint--block">تظهر لزوار الموقع باللغة الإنكليزية. الحقل الفارغ يظهر مكانه النص العربي.</p>` +
        fields
          .map(([key, label, long]) => {
            const value = esc(v[`${key}_en`] || englishOf(v[key]));
            return field(
              label,
              long
                ? `<textarea class="textarea" name="${key}_en" dir="ltr">${value}</textarea>`
                : `<input class="input" type="text" name="${key}_en" dir="ltr" value="${value}">`,
            );
          })
          .join(""),
    );

  const englishValues = (f, fields) =>
    Object.fromEntries(fields.map(([key]) => [`${key}_en`, f[`${key}_en`].value.trim()]));

  const imagesPanel = (title, label) =>
    panel(
      title,
      `
    <div class="thumbs" data-thumbs></div>
    <div class="field">
      <label class="drop drop--small">
        <input type="file" accept="image/*" multiple data-images-input>
        <span class="drop-btn">${label}</span>
      </label>
    </div>`,
    );

  function imagePicker(form, sources, toUrl) {
    const images = sources.map((src) => ({ src, url: toUrl(src) }));
    const thumbs = form.querySelector("[data-thumbs]");

    function draw() {
      thumbs.innerHTML = images
        .map(
          (image, index) => `
        <figure class="thumb">
          <img src="${esc(image.url)}" alt="">
          ${index === 0 ? '<span class="thumb-badge">رئيسية</span>' : `<button type="button" class="thumb-btn" data-main="${index}">اجعلها رئيسية</button>`}
          <button type="button" class="thumb-remove" data-remove-image="${index}" title="حذف الصورة">${svg("x")}</button>
        </figure>`,
        )
        .join("");
    }
    draw();

    thumbs.addEventListener("click", (event) => {
      const remove = event.target.closest("[data-remove-image]");
      const main = event.target.closest("[data-main]");
      if (remove) images.splice(Number(remove.dataset.removeImage), 1);
      if (main) images.unshift(...images.splice(Number(main.dataset.main), 1));
      if (remove || main) draw();
    });

    form.querySelector("[data-images-input]").addEventListener("change", async (event) => {
      const files = [...event.target.files];
      event.target.value = "";
      for (const file of files) {
        if (!file.type.startsWith("image/")) continue;
        try {
          const blob = await Auth.compressImage(file);
          images.push({ blob, url: URL.createObjectURL(blob) });
        } catch (error) {
          toast(error.message, true);
        }
      }
      draw();
    });

    return async () => {
      const uploaded = [];
      for (const image of images) uploaded.push(image.blob ? await Auth.upload(image.blob) : image.src);
      return uploaded;
    };
  }

  async function save(name, item, values) {
    if (item) {
      const { item: saved } = await Auth.api(`data/${name}/${encodeURIComponent(item.id)}`, {
        method: "PUT",
        body: { ...item, ...values },
      });
      data[name] = data[name].map((entry) => (String(entry.id) === String(item.id) ? saved : entry));
      return saved;
    }
    const { item: saved } = await Auth.api(`data/${name}`, { method: "POST", body: values });
    data[name] = [...data[name], saved];
    return saved;
  }

  function newsEditor(id) {
    const item = id ? data.news.find((entry) => String(entry.id) === String(id)) : null;
    if (id && !item) return missing("#/news");
    const v = item || { type: "news", date: todayISO() };
    let pendingImage = null;

    const ui = editorShell({
      title: item ? "تعديل الخبر" : "خبر جديد",
      back: "#/news",
      item,
      info: [["رقم الخبر", item?.id]],
      panels: [
        panel(
          "محتوى الخبر",
          [
            field(
              "العنوان",
              `<input class="input-title" type="text" name="title" maxlength="80" value="${esc(v.title)}">`,
              "يظهر على بطاقة الخبر",
            ),
            field(
              "العنوان الكامل",
              `<input class="input" type="text" name="fullTitle" maxlength="160" value="${esc(v.fullTitle)}">`,
              "اختياري، يظهر في صفحة الخبر",
            ),
            field(
              "الملخص",
              `<textarea class="textarea" name="desc">${esc(v.desc)}</textarea>`,
              "يظهر على البطاقة وتحت عنوان الخبر",
            ),
            field(
              "نص الخبر",
              `<textarea class="textarea long" name="body">${esc(v.body)}</textarea>`,
              "اختياري. كل سطر فقرة، والسطر الذي يبدأ بـ ## يصبح عنواناً فرعياً",
            ),
          ].join(""),
        ),
        panel(
          "النشر",
          [
            field("نوع الخبر", radios("type", Object.entries(NEWS_TYPES), v.type in NEWS_TYPES ? v.type : "news")),
            field("تاريخ النشر", `<input class="input" type="date" name="date" value="${esc(v.date)}">`),
          ].join(""),
        ),
        panel(
          "الصورة",
          [
            `<div class="field"><label>صورة الخبر</label>
            <label class="drop${v.image ? " has-image" : ""}" data-drop>
              <input type="file" accept="image/*" data-image-input>
              <img class="drop-preview" src="${esc(siteUrl(v.image))}" alt=""${v.image ? "" : " hidden"}>
              <span class="drop-btn">${v.image ? "استبدال الصورة" : "+ اختر صورة"}</span>
            </label>
          </div>`,
            field(
              "تعليق الصورة",
              `<textarea class="textarea" name="caption" maxlength="200">${esc(v.caption)}</textarea>`,
              "اختياري، يظهر تحت الصورة في صفحة الخبر",
            ),
          ].join(""),
          " images-body",
        ),
        englishPanel(v, NEWS_EN),
      ].join(""),
    });

    const { form } = ui;
    const drop = form.querySelector("[data-drop]");
    const preview = drop.querySelector(".drop-preview");

    form.querySelector("[data-image-input]").addEventListener("change", async (event) => {
      const file = event.target.files[0];
      event.target.value = "";
      if (!file) return;
      if (!file.type.startsWith("image/")) return ui.fail("الملف المختار ليس صورة.");
      try {
        pendingImage = await Auth.compressImage(file);
        preview.src = URL.createObjectURL(pendingImage);
        preview.hidden = false;
        drop.classList.add("has-image");
        drop.querySelector(".drop-btn").textContent = "استبدال الصورة";
      } catch (error) {
        ui.fail(error.message);
      }
    });

    ui.onRemove(() => removeItem("news", item.id, "حذف هذا الخبر؟", item.title, "#/news"));

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const f = form.elements;
      const values = {
        title: f.title.value.trim(),
        fullTitle: f.fullTitle.value.trim(),
        desc: f.desc.value.trim(),
        body: f.body.value.trim(),
        type: f.type.value || "news",
        date: f.date.value,
        caption: f.caption.value.trim(),
        ...englishValues(f, NEWS_EN),
      };
      if (!values.title) return ui.fail("يرجى كتابة العنوان.", f.title);
      if (!values.desc) return ui.fail("يرجى كتابة الملخص.", f.desc);
      if (!values.date) return ui.fail("يرجى تحديد تاريخ النشر.", f.date);
      if (!pendingImage && !v.image) return ui.fail("يرجى اختيار صورة للخبر.");

      ui.busy(true);
      try {
        values.image = pendingImage ? await Auth.upload(pendingImage) : v.image;
        await save("news", item, values);
        toast(item ? "حُفظت التعديلات." : "أُضيف الخبر.");
        location.hash = "#/news";
      } catch (error) {
        ui.busy(false);
        ui.fail(error.message);
      }
    });
  }

  function eventEditor(id) {
    const item = id ? data.events.find((entry) => String(entry.id) === String(id)) : null;
    if (id && !item) return missing("#/events");
    const v = item || { category: "music" };

    const ui = editorShell({
      title: item ? "تعديل الفعالية" : "إضافة فعالية جديدة",
      back: "#/events",
      item,
      info: [["رقم الفعالية", item ? `#${item.id}` : ""]],
      panels: [
        panel(
          "بيانات الفعالية",
          [
            field(
              "العنوان",
              `<input class="input-title" type="text" name="title" maxlength="120" value="${esc(v.title)}">`,
            ),
            field(
              "التصنيف",
              radios("category", Object.entries(EVENT_TYPES), v.category in EVENT_TYPES ? v.category : "music"),
            ),
            field("الوصف", `<textarea class="textarea" name="description">${esc(v.description)}</textarea>`),
            field(
              "ملاحظة",
              `<input class="input" type="text" name="note" maxlength="120" value="${esc(v.note)}" placeholder="مثال: موعد تقديري">`,
              "اختياري، تظهر تحت الطابع في الروزنامة بدل اسم التصنيف",
            ),
          ].join(""),
        ),
        panel(
          "الموعد والمكان",
          [
            field("تاريخ الفعالية", `<input class="input" type="date" name="date" value="${esc(v.date)}">`),
            field("موعد الفعالية", `<input class="input" type="time" name="time" value="${esc(v.time)}">`, "اختياري"),
            field(
              "الموقع",
              `<input class="input" type="text" name="location" maxlength="140" value="${esc(v.location)}" placeholder="مثال: سوق البزورية — خان أسعد باشا">`,
              "اختياري",
            ),
          ].join(""),
        ),
        imagesPanel("صور الفعالية", "+ اختيار صور (الأولى هي الصورة الرئيسية)"),
        englishPanel(v, EVENT_EN),
      ].join(""),
    });

    const { form } = ui;
    const uploadImages = imagePicker(form, v.images || [], siteUrl);

    ui.onRemove(() => removeItem("events", item.id, "حذف هذه الفعالية؟", item.title, "#/events"));

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const f = form.elements;
      const values = {
        title: f.title.value.trim(),
        category: f.category.value || "music",
        description: f.description.value.trim(),
        note: f.note.value.trim(),
        date: f.date.value,
        time: f.time.value,
        location: f.location.value.trim(),
        ...englishValues(f, EVENT_EN),
      };
      if (!values.title) return ui.fail("يرجى كتابة عنوان الفعالية.", f.title);
      if (!values.date) return ui.fail("يرجى تحديد تاريخ الفعالية.", f.date);

      ui.busy(true);
      try {
        values.images = await uploadImages();
        await save("events", item, values);
        toast(item ? "حُفظت التعديلات." : "أُضيفت الفعالية.");
        location.hash = "#/events";
      } catch (error) {
        ui.busy(false);
        ui.fail(error.message);
      }
    });
  }

  const lines = (text) =>
    String(text || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  const splitPair = (line) => {
    const index = line.indexOf("|");
    return index < 0 ? ["", line] : [line.slice(0, index).trim(), line.slice(index + 1).trim()];
  };
  const pairsToText = (pairs) =>
    (pairs || []).map(([label, value]) => (label ? `${label} | ${value}` : value)).join("\n");
  const textToPairs = (text) =>
    lines(text)
      .map(splitPair)
      .filter(([, value]) => value);
  const programToText = (program) =>
    (program || [])
      .map((group) => {
        const rows = (group.items || []).map(([level, use]) => (level ? `${level} | ${use}` : `| ${use}`));
        return group.title ? [`# ${group.title}`, ...rows].join("\n") : rows.join("\n");
      })
      .join("\n");
  function textToProgram(text) {
    const groups = [];
    let current = null;
    lines(text).forEach((line) => {
      if (line.startsWith("#")) {
        current = { title: line.replace(/^#+/, "").trim(), items: [] };
        groups.push(current);
        return;
      }
      if (!current) {
        current = { title: "", items: [] };
        groups.push(current);
      }
      const [level, use] = splitPair(line);
      if (use) current.items.push([level, use]);
    });
    return groups.filter((group) => group.items.length);
  }

  function investmentEditor(id) {
    const item = id ? data.opportunities.find((entry) => String(entry.id) === String(id)) : null;
    if (id && !item) return missing("#/investments");
    const v = item || { category: Object.keys(Opp.categories)[0], years: 40, facts: [] };
    const factRow = ([label, value] = ["", ""]) => `
      <div class="pair">
        <input class="input" type="text" placeholder="البند (مثال: مساحة البناء)" value="${esc(label)}" data-fact-label>
        <input class="input" type="text" placeholder="القيمة (مثال: 1,600 م²)" value="${esc(value)}" data-fact-value>
        <button type="button" class="icon-btn danger" data-remove-fact title="حذف البند">${svg("x")}</button>
      </div>`;

    const ui = editorShell({
      title: item ? "تعديل الحقيبة" : "حقيبة جديدة",
      back: "#/investments",
      item,
      info: [["رقم الحقيبة", item?.id]],
      panels: [
        panel(
          "المعلومات الأساسية",
          [
            field(
              "اسم الحقيبة",
              `<input class="input-title" type="text" name="title" maxlength="120" value="${esc(v.title)}">`,
            ),
            field(
              "القطاع",
              radios(
                "category",
                Object.entries(Opp.categories).map(([key, value]) => [key, value.label]),
                v.category,
              ),
            ),
            `<div class="row-2">
            ${field("الموقع", `<input class="input" type="text" name="location" maxlength="140" value="${esc(v.location)}" placeholder="مثال: دمشق — المزة">`)}
            ${field("الأيقونة", `<select class="input" name="icon">${OPP_ICONS.map(([value, label]) => `<option value="${value}"${value === (v.icon || Opp.categories[v.category]?.icon) ? " selected" : ""}>${label}</option>`).join("")}</select>`, "تظهر عندما لا توجد صورة")}
          </div>`,
            field("وصف المشروع", `<textarea class="textarea" name="description">${esc(v.description)}</textarea>`),
            `<div class="row-2">
            ${field("مدة الاستثمار (سنة)", `<input class="input" type="number" name="years" min="1" max="99" step="1" value="${esc(v.years || "")}" placeholder="تُحدد لاحقاً">`)}
            ${field("شارة", `<input class="input" type="text" name="tag" maxlength="20" value="${esc(v.tag)}" placeholder="مثال: مقترح">`, "اختياري")}
          </div>`,
            field(
              "ملاحظة",
              `<input class="input" type="text" name="note" maxlength="120" value="${esc(v.note)}" placeholder="مثال: المقسمان قابلان للدمج">`,
              "اختياري",
            ),
          ].join(""),
        ),
        panel(
          "مواعيد الحقيبة",
          `<div class="row-2">
          ${field("تاريخ الطرح", `<input class="input" type="datetime-local" name="startDate" value="${esc(v.startDate || "")}"><span class="hint">قبل هذا التاريخ تظهر الحقيبة بشارة «قريباً». اختياري.</span>`)}
          ${field("آخر موعد للتقديم", `<input class="input" type="datetime-local" name="deadline" value="${esc(v.deadline || "")}"><span class="hint">بعده تُغلق الحقيبة تلقائياً.</span>`)}
        </div>`,
        ),
        panel(
          "من موجز المقترح",
          [
            `<p class="hint hint--block">كل بند في سطر، وافصل بين الاسم والقيمة بخط عمودي |</p>`,
            field("موضوع المقترح", `<textarea class="textarea" name="summary">${esc(v.summary)}</textarea>`),
            field(
              "البيانات التنظيمية",
              `<textarea class="textarea" name="planning" placeholder="المنطقة العقارية | المزة&#10;رقم العقار | 5576">${esc(pairsToText(v.planning))}</textarea>`,
            ),
            `<div class="row-2">
            ${field("المعالم القريبة والمسافة", `<textarea class="textarea" name="landmarks" placeholder="ساحة الأمويين | 1.5 كم">${esc(pairsToText(v.landmarks))}</textarea>`)}
            ${field("الطرق الرئيسية", `<textarea class="textarea" name="roads" placeholder="شارع بيروت">${esc((v.roads || []).join("\n"))}</textarea>`)}
          </div>`,
            field(
              "البرنامج الوظيفي (استخدام كل طابق)",
              `<textarea class="textarea" name="program" placeholder="# المقسم 63 (سطر يبدأ بـ # لعنوان مجموعة، اختياري)&#10;الطابق الأرضي | بهو وكافيه">${esc(programToText(v.program))}</textarea>`,
            ),
            field(
              "ملاحظات إضافية",
              `<textarea class="textarea" name="features" placeholder="يمر تحت المبنى نفق مروري">${esc((v.features || []).join("\n"))}</textarea>`,
            ),
          ].join(""),
        ),
        panel(
          "المساحات والبيانات",
          `
          <div class="pairs" data-facts>${(v.facts && v.facts.length ? v.facts : [["", ""]]).map(factRow).join("")}</div>
          <button type="button" class="btn btn-ghost btn-small" data-add-fact>${svg("plus")} إضافة بند</button>`,
        ),
        imagesPanel("الصور", "+ أضف صوراً (الأولى هي الصورة الرئيسية)"),
        panel(
          "موجز المقترح (PDF)",
          field(
            "اسم الملف أو رابطه",
            `
          <div class="file-row">
            <input class="input" type="text" name="brief" dir="auto" value="${esc(v.brief)}" placeholder="مثال: موجز مقترح استثمار مقسم 106.pdf">
            <label class="btn btn-ghost file-pick">${svg("doc")} رفع ملف PDF<input type="file" accept="application/pdf" data-brief-input></label>
          </div>
          <span class="hint">اسم ملف موجود في مجلد ملفات الاستثمارات، أو رابط كامل، أو ارفع الملف (حتى 5 ميغابايت).</span>`,
            "اختياري",
          ),
        ),
        englishPanel(v, OPP_EN),
      ].join(""),
    });

    const { form } = ui;
    const facts = form.querySelector("[data-facts]");
    const uploadImages = imagePicker(form, v.images || [], oppImage);

    form.querySelector("[data-add-fact]").addEventListener("click", () => {
      facts.insertAdjacentHTML("beforeend", factRow());
      facts.lastElementChild.querySelector("input").focus();
    });
    facts.addEventListener("click", (event) => {
      const button = event.target.closest("[data-remove-fact]");
      if (button) button.closest(".pair").remove();
    });

    form.querySelector("[data-brief-input]").addEventListener("change", async (event) => {
      const file = event.target.files[0];
      event.target.value = "";
      if (!file) return;
      if (file.type !== "application/pdf") return ui.fail("الملف المختار ليس PDF.");
      if (file.size > 5 * 1024 * 1024) return ui.fail("حجم الملف أكبر من 5 ميغابايت. ضع رابطه بدلاً من رفعه.");
      try {
        toast("جارٍ رفع الملف...");
        form.elements.brief.value = await Auth.upload(file);
        toast("رُفع الملف.");
      } catch (error) {
        ui.fail(error.message);
      }
    });

    ui.onRemove(() => removeItem("opportunities", item.id, "حذف هذه الحقيبة؟", item.title, "#/investments"));

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const f = form.elements;
      const values = {
        title: f.title.value.trim(),
        category: f.category.value,
        icon: f.icon.value,
        location: f.location.value.trim(),
        description: f.description.value.trim(),
        years: Number(f.years.value) || null,
        startDate: f.startDate.value || null,
        deadline: f.deadline.value || null,
      };

      const missingFields = [];
      if (!values.title) missingFields.push("اسم الحقيبة");
      if (!values.location) missingFields.push("الموقع");
      if (!values.description) missingFields.push("وصف المشروع");
      if (!values.deadline) missingFields.push("آخر موعد للتقديم");
      if (missingFields.length) return ui.fail(`يرجى تعبئة: ${missingFields.join("، ")}.`);
      const start = Opp.toDate(values.startDate);
      const deadline = Opp.toDate(values.deadline);
      if (values.startDate && !start) return ui.fail("تاريخ الطرح غير صحيح.", f.startDate);
      if (!deadline) return ui.fail("آخر موعد للتقديم غير صحيح.", f.deadline);
      if (start && deadline <= start) return ui.fail("يجب أن يكون آخر موعد للتقديم بعد تاريخ الطرح.", f.deadline);

      const next = { ...values };
      const optional = {
        ...englishValues(f, OPP_EN),
        tag: f.tag.value.trim(),
        note: f.note.value.trim(),
        brief: f.brief.value.trim(),
        summary: f.summary.value.trim(),
        planning: textToPairs(f.planning.value),
        landmarks: textToPairs(f.landmarks.value),
        roads: lines(f.roads.value),
        features: lines(f.features.value),
        program: textToProgram(f.program.value),
        facts: [...facts.querySelectorAll(".pair")]
          .map((row) => [
            row.querySelector("[data-fact-label]").value.trim(),
            row.querySelector("[data-fact-value]").value.trim(),
          ])
          .filter(([label, value]) => label && value),
      };

      ui.busy(true);
      try {
        optional.images = await uploadImages();

        const base = item ? { ...item } : {};
        Object.entries(optional).forEach(([key, value]) => {
          const empty = Array.isArray(value) ? !value.length : !value;
          if (empty) delete base[key];
          else next[key] = value;
        });
        if (!next.facts) next.facts = [];

        if (item) {
          const { item: saved } = await Auth.api(`data/opportunities/${encodeURIComponent(item.id)}`, {
            method: "PUT",
            body: { ...base, ...next },
          });
          data.opportunities = data.opportunities.map((entry) =>
            String(entry.id) === String(item.id) ? saved : entry,
          );
        } else {
          await save("opportunities", null, next);
        }
        toast(item ? "حُفظت التعديلات." : "أُضيفت الحقيبة.");
        location.hash = "#/investments";
      } catch (error) {
        ui.busy(false);
        ui.fail(error.message);
      }
    });
  }

  function missing(back) {
    app.innerHTML = `<p class="dash-loading">هذا العنصر غير موجود، ربما حُذف. <a href="${back}">رجوع إلى القائمة</a></p>`;
  }

  const SECTIONS = {
    news: { data: "news", list: newsList, editor: newsEditor },
    events: { data: "events", list: eventsList, editor: eventEditor },
    investments: { data: "opportunities", list: investmentsList, editor: investmentEditor },
  };

  let routeToken = 0;

  async function route() {
    const [section, action, id] = location.hash
      .replace(/^#\/?/, "")
      .split("/")
      .map((part) => decodeURIComponent(part || ""));
    const view = SECTIONS[section];
    if (!view) {
      location.replace("#/news");
      return;
    }

    document
      .querySelectorAll(".dash-tabs [data-tab]")
      .forEach((tab) => tab.classList.toggle("active", tab.dataset.tab === section));
    const token = ++routeToken;

    if (!data[view.data]) app.innerHTML = '<p class="dash-loading">جارٍ التحميل...</p>';
    try {
      await load(view.data);
    } catch (error) {
      if (token !== routeToken) return;
      app.innerHTML = `<p class="dash-loading is-error">${esc(error.message)}</p>`;
      return;
    }
    if (token !== routeToken) return;

    window.scrollTo(0, 0);
    if (action === "new") view.editor(null);
    else if (action === "edit") view.editor(id);
    else view.list();
  }

  document.querySelector("[data-backup]").addEventListener("click", async (event) => {
    const button = event.currentTarget;
    button.disabled = true;
    try {
      const backup = await Auth.api("backup");
      const url = URL.createObjectURL(new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = `damascus-data-${todayISO()}.json`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      toast(error.message, true);
    } finally {
      button.disabled = false;
    }
  });

  try {
    await Auth.ready();
  } catch (error) {
    app.innerHTML = `<p class="dash-loading is-error">${esc(error.message)}</p>`;
    return;
  }

  window.addEventListener("hashchange", route);
  route();
});

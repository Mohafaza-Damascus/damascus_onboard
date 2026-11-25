const NEWS_DETAILS_PAGE = new URL("../pages/news-details.html", document.currentScript.src);

document.addEventListener("DOMContentLoaded", () => {
  const NEWS_TYPES = { news: "خبر", activity: "أنشطة المحافظة", decision: "قرار" };
  const LATEST_COUNT = 10;

  const detailsUrl = (item) => {
    const url = new URL(NEWS_DETAILS_PAGE);
    url.searchParams.set("id", item.id);
    return url.href;
  };

  const escapeHtml = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[ch],
    );

  const newsData = (Array.isArray(window.NEWS_DATA) ? window.NEWS_DATA : [])
    .slice()
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));

  const typeBadge = (item) =>
    `<span class="news-type" data-kind="${escapeHtml(item.type)}">${escapeHtml(NEWS_TYPES[item.type] || item.type)}</span>`;

  const latestList = document.querySelector(".accordion");
  if (latestList) {
    latestList.innerHTML = newsData
      .slice(0, LATEST_COUNT)
      .map(
        (item) => `
      <article class="accordion-item">
        <a class="accordion-link" href="${escapeHtml(detailsUrl(item))}">
          ${typeBadge(item)}
          <span class="accordion-title">${escapeHtml(item.title)}</span>
        </a>
        <img class="accordion-img" src="${escapeHtml(item.image)}" alt="" width="960" height="480" decoding="async">
      </article>`,
      )
      .join("");

    if (!newsData.length) {
      latestList.closest(".news-section").hidden = true;
      document.querySelector(".section-divider")?.setAttribute("hidden", "");
    }
  }

  const formatRelativeTime = (value) => {
    const [y, m, d] = (value || "").split("-").map(Number);
    if (!y || !m || !d) return "";

    const date = new Date(y, m - 1, d);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);

    const diffDays = Math.round((today - date) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "اليوم";
    if (diffDays === 1) return "قبل يوم";
    if (diffDays === 2) return "قبل يومين";
    if (diffDays > 2 && diffDays <= 7) return `قبل ${diffDays} أيام`;

    return date.toLocaleDateString("ar-SY-u-nu-latn", { day: "numeric", month: "long", year: "numeric" });
  };

  const allNewsGrid = document.querySelector(".news-grid");
  if (allNewsGrid) {
    allNewsGrid.innerHTML = newsData
      .map(
        (item) => `
      <article class="news-card" data-date="${escapeHtml(item.date)}">
        <a class="news-card-link" href="${escapeHtml(detailsUrl(item))}">
          <img class="news-card-img" src="${escapeHtml(item.image)}" alt="" width="640" height="800" loading="lazy" decoding="async">
          <span class="news-card-fade" aria-hidden="true"></span>
          <span class="news-card-meta">${typeBadge(item)}</span>
          <span class="news-card-content">
            <span class="news-card-date">${escapeHtml(formatRelativeTime(item.date))}</span>
            <span class="news-card-title">${escapeHtml(item.title)}</span>
            <span class="news-card-desc">${escapeHtml(item.desc)}</span>
            <span class="news-card-cta">اقرأ المزيد</span>
          </span>
        </a>
      </article>`,
      )
      .join("");
  }

  let wasActiveOnPress = true;

  document.querySelectorAll(".accordion").forEach((accordion) => {
    const items = Array.from(accordion.querySelectorAll(".accordion-item"));
    if (!items.length) return;

    const setActive = (active) => {
      items.forEach((item) => item.classList.toggle("is-active", item === active));
    };

    const reset = () => setActive(items[0]);
    reset();

    items.forEach((item) => {
      item.addEventListener("mouseenter", () => setActive(item));
      item.addEventListener("focusin", () => setActive(item));
      item.addEventListener("pointerdown", (e) => {
        wasActiveOnPress = e.pointerType !== "touch" || item.classList.contains("is-active");
      });
    });

    accordion.addEventListener("mouseleave", reset);
    accordion.addEventListener("focusout", (e) => {
      if (!accordion.contains(e.relatedTarget) && !accordion.matches(":hover")) reset();
    });
  });

  const PAGE_SIZE = 15;
  const DAY = 24 * 60 * 60 * 1000;
  const grid = document.querySelector(".news-grid");
  const moreBtn = document.getElementById("newsMore");
  const moreWrap = document.getElementById("newsMoreWrap");
  const emptyMsg = document.getElementById("newsEmpty");
  const filterButtons = document.querySelectorAll(".news-filter");

  const parseDate = (value) => {
    const [y, m, d] = (value || "").split("-").map(Number);
    return y && m && d ? new Date(y, m - 1, d) : null;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cards = grid
    ? Array.from(grid.querySelectorAll(".news-card")).map((el) => {
        const date = parseDate(el.dataset.date);
        return {
          el,
          time: date ? date.getTime() : 0,
          daysAgo: date ? Math.round((today - date) / DAY) : Infinity,
          kind: el.querySelector(".news-type")?.dataset.kind || "",
        };
      })
    : [];

  cards.sort((a, b) => b.time - a.time);

  const FILTERS = {
    all: () => true,
    day: (card) => card.daysAgo <= 1,
    week: (card) => card.daysAgo <= 7,
    month: (card) => card.daysAgo <= 30,
    news: (card) => card.kind === "news",
    activity: (card) => card.kind === "activity",
    decision: (card) => card.kind === "decision",
  };

  let activeFilter = "all";
  let visibleCount = PAGE_SIZE;

  const setColumns = () => {
    if (!grid) return;
    const columns = getComputedStyle(grid).gridTemplateColumns.split(" ").length;
    Array.from(grid.children).forEach((el, i) => {
      el.style.setProperty("--col", i % columns);
    });
  };

  const renderGrid = (focusFrom = -1) => {
    if (!grid) return;
    const matching = cards.filter(FILTERS[activeFilter]);
    const visibleCards = matching.slice(0, visibleCount);

    grid.replaceChildren(
      ...visibleCards.map((card) => {
        card.el.hidden = false;
        card.el.style.display = "";
        return card.el;
      }),
    );

    setColumns();

    if (moreWrap) {
      moreWrap.hidden = matching.length <= visibleCount;
    } else if (moreBtn) {
      moreBtn.hidden = matching.length <= visibleCount;
    }

    if (emptyMsg) emptyMsg.hidden = matching.length > 0;

    if (focusFrom >= 0 && visibleCards[focusFrom]) {
      visibleCards[focusFrom].el.querySelector(".news-card-link")?.focus({ preventScroll: true });
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFilter = FILTERS[button.dataset.filter] ? button.dataset.filter : "all";
      visibleCount = PAGE_SIZE;
      filterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
      renderGrid();
    });
  });

  moreBtn?.addEventListener("click", () => {
    const firstNew = visibleCount;
    visibleCount += PAGE_SIZE;
    renderGrid(firstNew);
  });

  if (grid) {
    renderGrid();
    window.addEventListener("resize", setColumns);
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollDriven = window.CSS?.supports?.("animation-timeline: view()");

  if (grid && "IntersectionObserver" in window && !reduceMotion && !scrollDriven) {
    grid.classList.add("will-animate");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );

    grid.querySelectorAll(".news-card").forEach((card) => observer.observe(card));
  }

  document.querySelectorAll(".accordion-link").forEach((link) => {
    link.addEventListener("click", (event) => {
      if (!wasActiveOnPress) {
        event.preventDefault();
        wasActiveOnPress = true;
      }
    });
  });
});

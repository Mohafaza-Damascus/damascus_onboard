document.addEventListener("DOMContentLoaded", () => {
  const page = document.querySelector(".inv-page");
  if (!page) return;

  page.classList.add("inv-js");

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

  function splitWords(root) {
    let index = 0;

    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          if (!child.textContent.trim()) return;

          const fragment = document.createDocumentFragment();
          child.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (!part.trim()) {
              fragment.appendChild(document.createTextNode(part));
              return;
            }
            const word = document.createElement("span");
            const inner = document.createElement("span");
            word.className = "w";
            word.style.setProperty("--i", index++);
            inner.textContent = part;
            word.appendChild(inner);
            fragment.appendChild(word);
          });
          child.replaceWith(fragment);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          walk(child);
        }
      });
    };

    walk(root);
    return Array.from(root.querySelectorAll(".w"));
  }

  page.querySelectorAll("[data-split]").forEach(splitWords);

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
  );

  page.querySelectorAll("[data-reveal], [data-split]").forEach((el) => {
    revealObserver.observe(el);
  });

  const statement = page.querySelector("[data-scroll-words]");
  const statementWords = statement ? splitWords(statement) : [];

  function updateStatement() {
    if (!statement) return;

    const rect = statement.getBoundingClientRect();
    const viewport = window.innerHeight;
    const progress = reduceMotion ? 1 : clamp((viewport * 0.85 - rect.top) / (rect.height + viewport * 0.35), 0, 1);
    const lit = Math.round(progress * statementWords.length);

    statementWords.forEach((word, index) => word.classList.toggle("is-lit", index < lit));
  }

  const store = window.InvOpportunities;
  const statusOrder = { open: 0, upcoming: 1 };
  const opportunities = store
    ? store
        .getAll()
        .filter((item) => store.getStatus(item) !== "closed")
        .sort((a, b) => statusOrder[store.getStatus(a)] - statusOrder[store.getStatus(b)])
    : [];
  const oppCategories = store ? store.categories : {};
  const escapeHtml = store ? store.escapeHtml : (text) => String(text);

  const oppFilters = page.querySelector("[data-opps-filters]");
  const mapTrack = page.querySelector("[data-map-track]");
  const mapEmpty = page.querySelector("[data-map-empty]");
  const pad = (n) => String(n).padStart(2, "0");

  if (mapTrack) {
    mapTrack.innerHTML = opportunities
      .map((item, index) => {
        const status = store.getStatus(item);
        const left = store.timeLeft(item);
        const soon = status === "open" && left && left.days < 7;
        const href = `Opportunity-details.html?id=${encodeURIComponent(item.id)}`;
        const image = item.images && item.images[0];
        const media = image
          ? `<a class="inv-mcard__media" href="${href}" tabindex="-1"><img src="${store.imageUrl(image)}" alt="${escapeHtml(item.title)}" loading="lazy">`
          : `<a class="inv-mcard__media inv-mcard__media--icon inv-mcard__media--${item.category}" href="${href}" tabindex="-1"><i class="fa-solid ${item.icon || oppCategories[item.category]?.icon || "fa-building"}" aria-hidden="true"></i>`;

        return `
          <article class="inv-mcard${status === "upcoming" ? " is-upcoming" : ""}" data-category="${item.category}">
            ${media}
              <span class="inv-mcard__num">${pad(index + 1)}</span>
              <span class="inv-mcard__cat">${oppCategories[item.category]?.label || ""}</span>
              ${status === "upcoming" ? `<span class="inv-mcard__badge">قريباً</span>` : ""}
            </a>
            <div class="inv-mcard__body">
              <h3 class="inv-mcard__title inv-display"><a href="${href}">${escapeHtml(item.title)}</a></h3>
              <span class="inv-mcard__loc"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(item.location)}</span>
              <span class="inv-mcard__deadline${soon ? " is-soon" : ""}">
                <i class="fa-regular ${status === "upcoming" ? "fa-calendar" : "fa-hourglass-half"}"></i> ${store.deadlineLabel(item)}
              </span>
              <div class="inv-mcard__foot">
                <span class="inv-mcard__years"><i class="fa-regular fa-clock"></i> ${store.yearsText(item.years)}</span>
                <a class="inv-link" href="${href}">التفاصيل <i class="fa-solid fa-arrow-left"></i></a>
              </div>
            </div>
          </article>`;
      })
      .join("");
  }

  if (mapEmpty) mapEmpty.hidden = opportunities.length > 0;

  const cards = mapTrack ? Array.from(mapTrack.querySelectorAll(".inv-mcard")) : [];
  const mapPrev = page.querySelector("[data-map-prev]");
  const mapNext = page.querySelector("[data-map-next]");
  const mapCurrent = page.querySelector("[data-map-current]");
  const mapTotal = page.querySelector("[data-map-total]");
  const mapBar = page.querySelector("[data-map-bar]");
  const mapIsRtl = mapTrack && getComputedStyle(mapTrack).direction === "rtl";
//
let activeCategory = "all";

  const getFilteredCards = () =>
    cards.filter((card) => activeCategory === "all" || card.dataset.category === activeCategory);

  function updateMap() {
    if (!mapTrack) return;

    const filtered = getFilteredCards();
    const total = filtered.length;

    cards.forEach((card) => {
      card.hidden = true;
    });
    filtered.forEach((card) => {
      card.hidden = false;
    });

    if (mapCurrent) mapCurrent.textContent = pad(total);
    if (mapTotal) mapTotal.textContent = pad(cards.length);
    if (mapEmpty) mapEmpty.hidden = total > 0;
  }

  if (mapTrack) {
    updateMap();
  }

  function applyFilter(key) {
    activeCategory = key;

    if (oppFilters) {
      oppFilters.querySelectorAll(".inv-filter").forEach((button) => {
        const active = button.dataset.filter === key;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
    }

    updateMap();
  }

  if (oppFilters) {
    const filters = [["all", "الكل"], ...Object.entries(oppCategories).map(([key, value]) => [key, value.label])];

    oppFilters.innerHTML = filters
      .map(([key, label], index) => {
        const count = key === "all" ? cards.length : cards.filter((card) => card.dataset.category === key).length;
        if (key !== "all" && !count) return "";
        return `<button type="button" class="inv-filter${index === 0 ? " is-active" : ""}" data-filter="${key}" aria-pressed="${index === 0}">
                  ${label} <span class="inv-filter__count">${count}</span>
                </button>`;
      })
      .join("");

    oppFilters.addEventListener("click", (event) => {
      const button = event.target.closest(".inv-filter");
      if (button) applyFilter(button.dataset.filter);
    });
  }
//


  let ticking = false;

  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateStatement();
      ticking = false;
    });
  }

  let resizeTimer = null;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      updateMap();
      onScroll();
    }, 120);
  }

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  window.addEventListener("load", onResize);
});

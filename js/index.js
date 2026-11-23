(function () {
  const statsGrid = document.querySelector(".stats__grid");
  if (!statsGrid) return;

  const stats = statsGrid.querySelectorAll(".stat");
  const STAGGER = 400;

  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const duration = 1400;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const value = (target * eased).toFixed(decimals);
      const english = window.I18N && window.I18N.lang === "en";
      el.textContent =
        Number(value).toLocaleString(english ? "en-GB" : "ar-SY") + (english ? window.I18N.t(suffix) : suffix);
      if (p < 1) requestAnimationFrame(tick);
    };
    el.textContent = "0";
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        statsGrid.classList.add("is-visible");
        stats.forEach((stat, i) => {
          setTimeout(
            () => {
              stat.classList.add("is-visible");
              const counter = stat.querySelector(".stat__value");
              if (counter) animateCounter(counter);
            },
            STAGGER * (i + 1),
          );
        });
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.2 },
  );

  observer.observe(statsGrid);
})();

(function () {
  const svgMap = document.getElementById("svgMap");
  const inner = document.querySelector(".map-explorer__inner");
  const card = document.getElementById("explorerCard");
  if (!svgMap || !inner || !card) return;

  const sectors = Array.from(svgMap.querySelectorAll(".dm-sector"));
  const sectorLabels = Array.from(svgMap.querySelectorAll(".dm-sector-lbl"));

  const cardImg = document.getElementById("cardImg");
  const cardName = document.getElementById("cardName");
  const cardHoods = document.getElementById("cardHoods");
  const cardPop = document.getElementById("cardPop");
  const cardArea = document.getElementById("cardArea");
  const cardType = document.getElementById("cardType");
  const cardDesc = document.getElementById("cardDesc");
  const cardCredit = document.getElementById("cardCredit");

  const SECTORS = {
    "sector-1": {
      name: "قطاع 1",
      areas: "برزة، القابون، جوبر",
      pop: "390,000",
      area: "30 كم²",
      type: "سكني / صناعي وتاريخي",
      desc: "يضم المناطق الشمالية الشرقية لدمشق، ويشمل برزة والقابون وجوبر.",
      img: "images/home/areas/berze.jpg",
    },
    "sector-2": {
      name: "قطاع 2",
      areas: "ركن الدين، الصالحية، المهاجرين، ساروجة",
      pop: "620,000",
      area: "32 كم²",
      type: "سكني / ثقافي وتجاري",
      desc: "يمتد على سفح جبل قاسيون ويضم أحياء عريقة ومعالم ثقافية ودبلوماسية.",
      img: "images/home/areas/salihiye.jpg",
    },
    "sector-3": {
      name: "قطاع 3",
      areas: "دمشق القديمة، الشاغور، القنوات",
      pop: "360,000",
      area: "16 كم²",
      type: "تاريخي / تراثي ومركزي",
      desc: "قلب دمشق التاريخي والتراثي، ويضم المدينة القديمة والشاغور والقنوات.",
      img: "images/home/areas/olddam.jpg",
    },
    "sector-4": {
      name: "قطاع 4",
      areas: "الميدان، القدم، اليرموك",
      pop: "520,000",
      area: "25 كم²",
      type: "سكني / تجاري وصناعي",
      desc: "يمتد في جنوب دمشق ويجمع بين الأسواق العريقة والمناطق السكنية والصناعية.",
      img: "images/home/areas/midan.jpg",
    },
    "sector-5": {
      name: "قطاع 5",
      areas: "المزّة، كفرسوسة",
      pop: "530,000",
      area: "34 كم²",
      type: "سكني / إداري وحديث",
      desc: "يغطي الجهة الجنوبية الغربية ويضم مؤسسات حكومية ومجمعات سكنية وتجارية حديثة.",
      img: "images/home/areas/mazza.jpg",
    },
    "sector-6": {
      name: "قطاع 6",
      areas: "دُمَّر، الشام الجديدة",
      pop: "120,000",
      area: "18 كم²",
      type: "سكني / ضواحٍ حديثة",
      desc: "يمثل التوسع الغربي لدمشق ويشتهر بالمساحات الخضراء والطبيعة الجبلية.",
      img: "images/home/areas/dummar.jpg",
    },
  };

  let preloaded = null;
  const preloadPhotos = () => {
    if (preloaded) return;
    preloaded = Object.values(SECTORS).map((info) => {
      const img = new Image();
      img.src = info.img;
      img.decode().catch(() => {});
      return img;
    });
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        observer.disconnect();
        preloadPhotos();
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(inner);
  } else {
    preloadPhotos();
  }

  let pinnedSector = null;

  function updateCard(sectorId) {
    const info = SECTORS[sectorId];
    if (!info) return;

    inner.classList.add("has-selection");
    card.dataset.sector = sectorId;
    cardImg.src = info.img;
    cardImg.alt = info.name;
    cardName.textContent = info.name;
    if (cardHoods) cardHoods.textContent = info.areas;
    cardPop.textContent = info.pop;
    cardArea.textContent = info.area;
    cardType.textContent = info.type;
    cardDesc.textContent = info.desc;
    if (cardCredit) cardCredit.hidden = true;
  }

  function highlightSector(sectorId) {
    sectors.forEach((sec) => sec.classList.toggle("is-active", sec.dataset.sector === sectorId));
    sectorLabels.forEach((lbl) => lbl.classList.toggle("is-hidden", lbl.dataset.sector === sectorId));
  }

  sectors.forEach((sec) => {
    const sectorId = sec.dataset.sector;
    if (!SECTORS[sectorId]) return;

    sec.setAttribute("tabindex", "0");
    sec.setAttribute("role", "button");
    sec.setAttribute("aria-label", SECTORS[sectorId].name);

    sec.addEventListener("mouseenter", () => {
      highlightSector(sectorId);
      updateCard(sectorId);
    });

    sec.addEventListener("mouseleave", () => {
      highlightSector(pinnedSector);
      if (pinnedSector) updateCard(pinnedSector);
    });

    // دعم النقر للموبايل أو لتثبيت القطاع
    sec.addEventListener("click", () => {
      pinnedSector = pinnedSector === sectorId ? null : sectorId;
      highlightSector(pinnedSector || sectorId);
      updateCard(sectorId);
    });

    sec.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        pinnedSector = sectorId;
        highlightSector(sectorId);
        updateCard(sectorId);
      }
    });
  });
})();

(function () {
  const newsGrid = document.getElementById("latestNewsGrid") || document.querySelector(".news-grid");
  if (!newsGrid || !Array.isArray(window.NEWS_DATA)) return;

  const syrianMonths = [
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

  function formatArabicDate(dateStr) {
    if (!dateStr) return "";
    const [y, m, d] = dateStr.split("-").map(Number);
    if (!y || !m || !d) return dateStr;
    return `${d} ${syrianMonths[m - 1]} ${y}`;
  }

  const typeConfig = {
    activity: { label: "نشاط", className: "news-card__tag" },
    decision: { label: "قرار", className: "news-card__tag news-card__tag--decision" },
    circular: { label: "تعميم", className: "news-card__tag news-card__tag--circular" },
    news: { label: "خبر", className: "news-card__tag" },
  };

  const latestSix = [...window.NEWS_DATA].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  newsGrid.innerHTML = latestSix
    .map((item) => {
      const tag = typeConfig[item.type] || typeConfig.news;
      const imgSrc = (item.image || "images/news/placeholder.png").replace(/^\.\.\//, "");
      const excerpt = item.desc || item.body || "";

      return `
        <a href="pages/news-details.html?id=${encodeURIComponent(item.id)}" class="news-card">
          <figure class="news-card__img">
            <img src="${imgSrc}" alt="${item.title}" loading="lazy" onerror="this.src='images/news/placeholder.png'" />
          </figure>
          <div class="news-card__body">
            <div class="news-card__top">
              <span class="${tag.className}">${tag.label}</span>
              <span class="news-card__date">${formatArabicDate(item.date)}</span>
            </div>
            <h3 class="news-card__title">${item.title}</h3>
            <p class="news-card__excerpt">${excerpt}</p>
          </div>
        </a>
      `;
    })
    .join("");
})();

(function () {
  const serviceCounters = document.querySelectorAll("[data-service-count]");
  if (!serviceCounters.length) return;

  const animateServiceCounter = (el) => {
    const target = parseInt(el.dataset.serviceCount, 10);
    const suffix = el.dataset.suffix || "";
    const duration = 1500;
    const start = performance.now();

    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.round(target * eased);
      el.textContent =
        window.I18N && window.I18N.lang === "en"
          ? val.toLocaleString("en-US") + suffix
          : suffix + val.toLocaleString("en-US");
      if (p < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateServiceCounter(entry.target);
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.35 },
  );

  serviceCounters.forEach((el) => io.observe(el));
})();

(function () {
  const video = document.getElementById("bottomVideo");
  if (!video) return;

  const sources = ["assets/video/new_mohafez.mp4", "assets/video/damtva.mp4"];
  let current = 0;

  video.addEventListener("ended", () => {
    current = (current + 1) % sources.length;
    video.src = sources[current];
    video.play();
  });
})();

(function () {
  const video = document.getElementById("heroVideo");
  if (!video) return;

  const sourceElement = video.querySelector("source");
  const sources = ["assets/video/queue1.mp4", "assets/video/queue2.mp4", "assets/video/queue3.mp4"];

  let current = 0;
  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;

  video.addEventListener("ended", () => {
    current = (current + 1) % sources.length;
    sourceElement.src = sources[current];
    video.load();
    video.play().catch(() => {});
  });

  video.play().catch(() => {});
})();

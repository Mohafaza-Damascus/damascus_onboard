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
  const hoods = document.querySelectorAll(".dm-hood");
  const inner = document.querySelector(".map-explorer__inner");
  const card = document.getElementById("explorerCard");
  if (!hoods.length || !card || !inner) return;

  function roundSvgPolygonPath(d, radius = 10) {
    const matches = [...d.matchAll(/([0-9.]+)\s*,\s*([0-9.]+)/g)];
    if (matches.length < 3) return d;
    const pts = matches.map((m) => ({ x: parseFloat(m[1]), y: parseFloat(m[2]) }));
    const n = pts.length;
    let out = "";

    for (let i = 0; i < n; i++) {
      const prev = pts[(i - 1 + n) % n];
      const curr = pts[i];
      const next = pts[(i + 1) % n];

      const v1x = prev.x - curr.x;
      const v1y = prev.y - curr.y;
      const v2x = next.x - curr.x;
      const v2y = next.y - curr.y;

      const len1 = Math.hypot(v1x, v1y);
      const len2 = Math.hypot(v2x, v2y);
      const r = Math.min(radius, len1 * 0.35, len2 * 0.35);

      const p1x = curr.x + (v1x / len1) * r;
      const p1y = curr.y + (v1y / len1) * r;
      const p2x = curr.x + (v2x / len2) * r;
      const p2y = curr.y + (v2y / len2) * r;

      out += i === 0 ? `M ${p1x.toFixed(1)},${p1y.toFixed(1)} ` : `L ${p1x.toFixed(1)},${p1y.toFixed(1)} `;
      out += `Q ${curr.x.toFixed(1)},${curr.y.toFixed(1)} ${p2x.toFixed(1)},${p2y.toFixed(1)} `;
    }
    return out + "Z";
  }

  hoods.forEach((hood) => {
    const path = hood.querySelector("path");
    if (path) {
      path.setAttribute("d", roundSvgPolygonPath(path.getAttribute("d"), 11));
    }
  });

  const cardImg = document.getElementById("cardImg");
  const cardName = document.getElementById("cardName");
  const cardPop = document.getElementById("cardPop");
  const cardArea = document.getElementById("cardArea");
  const cardType = document.getElementById("cardType");
  const cardDesc = document.getElementById("cardDesc");
  const cardCredit = document.getElementById("cardCredit");

  const data = {
    dummar: {
      name: "دُمَّر",
      pop: "120,000",
      area: "18 كم²",
      type: "سكني / ضاحية",
      desc: "ضاحية غرب دمشق تشتهر بالمساحات الخضراء والطبيعة الجبلية الخلابة.",
      img: "images/areas/dummar.jpg",
    },
    mazza: {
      name: "المزّة",
      pop: "350,000",
      area: "22 كم²",
      type: "سكني / إداري",
      desc: "من أكبر أحياء دمشق، تضم مؤسسات حكومية ومجمعات سكنية حديثة.",
      img: "images/areas/mazza.jpg",
    },
    kafarsuseh: {
      name: "كفرسوسة",
      pop: "180,000",
      area: "12 كم²",
      type: "سكني / تجاري",
      desc: "حي حيوي يمتد جنوب غرب دمشق ويضم أسواقاً ومراكز تجارية.",
      img: "images/areas/kafarsuseh.jpg",
    },
    berze: {
      name: "برزة",
      pop: "200,000",
      area: "15 كم²",
      type: "سكني",
      desc: "حي شمالي عريق يتميز بطابعه الشعبي وقربه من جبل قاسيون.",
      img: "images/areas/berze.jpg",
    },
    qaboun: {
      name: "القابون",
      pop: "100,000",
      area: "8 كم²",
      type: "صناعي / سكني",
      desc: "منطقة صناعية وسكنية شمال شرق دمشق.",
      img: "images/neighborhoods/skyline.jpg",
      credit: {
        text: "Samosyr at English Wikipedia · Public domain",
        url: "https://commons.wikimedia.org/wiki/File:DamascusSkyline.jpg",
      },
    },
    jobar: {
      name: "جوبر",
      pop: "90,000",
      area: "7 كم²",
      type: "سكني",
      desc: "حي شرقي تاريخي كان يشتهر بزراعة المشمش والفواكه.",
      img: "images/areas/jobar.jpg",
    },
    shaghour: {
      name: "الشاغور",
      pop: "250,000",
      area: "10 كم²",
      type: "سكني / تجاري",
      desc: "من أعرق أحياء دمشق القديمة، يتميز بأسواقه الشعبية.",
      img: "images/areas/shaghour.jpg",
    },
    rukn: {
      name: "ركن الدين",
      pop: "280,000",
      area: "14 كم²",
      type: "سكني",
      desc: "حي سكني على سفح جبل قاسيون يتميز بإطلالته البانورامية.",
      img: "images/areas/rukn.jpg",
    },
    salihiye: {
      name: "الصالحية",
      pop: "150,000",
      area: "6 كم²",
      type: "سكني / ثقافي",
      desc: "حي تاريخي يضم معالم أثرية ومؤسسات تعليمية عريقة.",
      img: "images/areas/salihiye.jpg",
    },
    muhajireen: {
      name: "المهاجرين",
      pop: "130,000",
      area: "9 كم²",
      type: "سكني",
      desc: "حي راقٍ على سفح قاسيون يضم سفارات ومقرات دبلوماسية.",
      img: "images/areas/muhajireen.jpg",
    },
    sarouja: {
      name: "ساروجة",
      pop: "60,000",
      area: "3 كم²",
      type: "تاريخي / تجاري",
      desc: "من أقدم أحياء دمشق، يتميز بعمارته العثمانية الفريدة.",
      img: "images/areas/sarouja.jpg",
    },
    qanawat: {
      name: "القنوات",
      pop: "70,000",
      area: "4 كم²",
      type: "سكني / تاريخي",
      desc: "حي وسطي يربط بين دمشق القديمة والأحياء الحديثة.",
      img: "images/areas/qanawat.jpg",
    },
    olddam: {
      name: "دمشق القديمة",
      pop: "40,000",
      area: "2 كم²",
      type: "تاريخي / سياحي",
      desc: "المدينة القديمة المسورة، أحد أقدم المدن المأهولة في العالم.",
      img: "images/areas/olddam.jpg",
    },
    midan: {
      name: "الميدان",
      pop: "220,000",
      area: "11 كم²",
      type: "سكني / تجاري",
      desc: "حي تجاري تاريخي يشتهر بأسواقه ومساجده العريقة.",
      img: "images/areas/midan.jpg",
    },
    qadam: {
      name: "القدم",
      pop: "160,000",
      area: "9 كم²",
      type: "سكني / صناعي",
      desc: "حي جنوبي يضم ورشاً صناعية ومناطق سكنية.",
      img: "images/areas/qadam.jpg",
    },
    yarmouk: {
      name: "اليرموك",
      pop: "140,000",
      area: "5 كم²",
      type: "سكني",
      desc: "حي جنوبي كان يُعرف بكثافته السكانية العالية.",
      img: "images/areas/yarmouk.jpg",
    },
  };

  let activeHood = null;
  let preloaded = null;

  const preloadPhotos = () => {
    if (preloaded) return;
    preloaded = Object.values(data).map((info) => {
      const img = new Image();
      img.src = info.img;
      img.decode().catch(() => {});
      return img;
    });
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer.disconnect();
        preloadPhotos();
      },
      { rootMargin: "800px 0px" },
    );
    observer.observe(inner || cardImg);
  } else {
    preloadPhotos();
  }

  hoods.forEach((hood) => {
    hood.addEventListener("mouseenter", () => {
      const id = hood.dataset.id;
      const info = data[id];
      if (!info) return;

      if (activeHood) activeHood.classList.remove("is-active");
      hood.classList.add("is-active");
      activeHood = hood;
      inner.classList.add("has-selection");

      cardImg.src = info.img;
      cardImg.alt = info.name;
      if (cardCredit) {
        cardCredit.hidden = !info.credit;
        cardCredit.textContent = info.credit ? `الصورة: ${info.credit.text}` : "";
        cardCredit.href = info.credit ? info.credit.url : "#";
      }
      cardName.textContent = info.name;
      cardPop.textContent = info.pop;
      cardArea.textContent = info.area;
      cardType.textContent = info.type;
      cardDesc.textContent = info.desc;
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
      const imgSrc = (item.image || "images/Damascus.png").replace(/^\.\.\//, "");
      const excerpt = item.desc || item.body || "";

      return `
        <a href="pages/news-details.html?id=${encodeURIComponent(item.id)}" class="news-card">
          <figure class="news-card__img">
            <img src="${imgSrc}" alt="${item.title}" loading="lazy" onerror="this.src='images/Damascus.png'" />
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

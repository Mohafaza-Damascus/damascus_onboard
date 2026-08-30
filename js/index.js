(function () {
  const statsGrid = document.querySelector(".stats__grid");
  if (!statsGrid) return;

  const stats = statsGrid.querySelectorAll(".stat");
  const STAGGER = 1000;

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
      el.textContent = Number(value).toLocaleString("ar-SY") + suffix;
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
  const section = document.querySelector(".governor");
  if (!section) return;

  const outerBox = section.querySelector(":scope > .governor__card");
  const photo = section.querySelector(".governor__photo");
  const textCard = section.querySelector(".governor__inner > .governor__card");

  const steps = [outerBox, photo, textCard].filter(Boolean);
  const DELAY = 600;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        steps.forEach((el, i) => {
          setTimeout(() => el.classList.add("is-visible"), DELAY * i);
        });
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.2 },
  );

  observer.observe(section);
})();

(function () {
  const hoods = document.querySelectorAll(".dm-hood");
  const inner = document.querySelector(".map-explorer__inner");
  const card = document.getElementById("explorerCard");
  if (!hoods.length || !card || !inner) return;

  const cardImg = document.getElementById("cardImg");
  const cardName = document.getElementById("cardName");
  const cardPop = document.getElementById("cardPop");
  const cardArea = document.getElementById("cardArea");
  const cardType = document.getElementById("cardType");
  const cardDesc = document.getElementById("cardDesc");
  const data = {
    dummar:      { name: "دُمَّر",         pop: "120,000", area: "18 كم²", type: "سكني / ضاحية",    desc: "ضاحية غرب دمشق تشتهر بالمساحات الخضراء والطبيعة الجبلية الخلابة.", img: "images/Damascus.png" },
    mazza:       { name: "المزّة",         pop: "350,000", area: "22 كم²", type: "سكني / إداري",    desc: "من أكبر أحياء دمشق، تضم مؤسسات حكومية ومجمعات سكنية حديثة.", img: "images/Damascus.png" },
    kafarsuseh:  { name: "كفرسوسة",       pop: "180,000", area: "12 كم²", type: "سكني / تجاري",    desc: "حي حيوي يمتد جنوب غرب دمشق ويضم أسواقاً ومراكز تجارية.", img: "images/Damascus.png" },
    berze:       { name: "برزة",          pop: "200,000", area: "15 كم²", type: "سكني",            desc: "حي شمالي عريق يتميز بطابعه الشعبي وقربه من جبل قاسيون.", img: "images/Damascus.png" },
    qaboun:      { name: "القابون",       pop: "100,000", area: "8 كم²",  type: "صناعي / سكني",    desc: "منطقة صناعية وسكنية شمال شرق دمشق.", img: "images/Damascus.png" },
    jobar:       { name: "جوبر",          pop: "90,000",  area: "7 كم²",  type: "سكني",            desc: "حي شرقي تاريخي كان يشتهر بزراعة المشمش والفواكه.", img: "images/Damascus.png" },
    shaghour:    { name: "الشاغور",       pop: "250,000", area: "10 كم²", type: "سكني / تجاري",    desc: "من أعرق أحياء دمشق القديمة، يتميز بأسواقه الشعبية.", img: "images/Damascus.png" },
    rukn:        { name: "ركن الدين",     pop: "280,000", area: "14 كم²", type: "سكني",            desc: "حي سكني على سفح جبل قاسيون يتميز بإطلالته البانورامية.", img: "images/Damascus.png" },
    salihiye:    { name: "الصالحية",      pop: "150,000", area: "6 كم²",  type: "سكني / ثقافي",    desc: "حي تاريخي يضم معالم أثرية ومؤسسات تعليمية عريقة.", img: "images/Damascus.png" },
    muhajireen:  { name: "المهاجرين",     pop: "130,000", area: "9 كم²",  type: "سكني",            desc: "حي راقٍ على سفح قاسيون يضم سفارات ومقرات دبلوماسية.", img: "images/Damascus.png" },
    sarouja:     { name: "ساروجة",        pop: "60,000",  area: "3 كم²",  type: "تاريخي / تجاري",  desc: "من أقدم أحياء دمشق، يتميز بعمارته العثمانية الفريدة.", img: "images/Damascus.png" },
    qanawat:     { name: "القنوات",       pop: "70,000",  area: "4 كم²",  type: "سكني / تاريخي",   desc: "حي وسطي يربط بين دمشق القديمة والأحياء الحديثة.", img: "images/Damascus.png" },
    olddam:      { name: "دمشق القديمة",  pop: "40,000",  area: "2 كم²",  type: "تاريخي / سياحي",  desc: "المدينة القديمة المسورة، أحد أقدم المدن المأهولة في العالم.", img: "images/Damascus.png" },
    midan:       { name: "الميدان",       pop: "220,000", area: "11 كم²", type: "سكني / تجاري",    desc: "حي تجاري تاريخي يشتهر بأسواقه ومساجده العريقة.", img: "images/Damascus.png" },
    qadam:       { name: "القدم",         pop: "160,000", area: "9 كم²",  type: "سكني / صناعي",    desc: "حي جنوبي يضم ورشاً صناعية ومناطق سكنية.", img: "images/Damascus.png" },
    yarmouk:     { name: "اليرموك",       pop: "140,000", area: "5 كم²",  type: "سكني",            desc: "حي جنوبي كان يُعرف بكثافته السكانية العالية.", img: "images/Damascus.png" },
  };

  let activeHood = null;

  hoods.forEach((hood) => {
    hood.addEventListener("click", () => {
      const id = hood.dataset.id;
      const info = data[id];
      if (!info) return;

      if (activeHood) activeHood.classList.remove("is-active");
      hood.classList.add("is-active");
      activeHood = hood;
      inner.classList.add("has-selection");
      card.classList.add("is-updating");

      setTimeout(() => {
        cardImg.src = info.img;
        cardName.textContent = info.name;
        cardPop.textContent = info.pop;
        cardArea.textContent = info.area;
        cardType.textContent = info.type;
        cardDesc.textContent = info.desc;
        card.classList.remove("is-updating");
      }, 250);
    });
  });
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

  const sources = [
    "assets/video/queue1.mp4",
    "assets/video/queue2.mp4",
    "assets/video/queue3.mp4",
    "assets/video/new_mohafez.mp4",
  ];

  let current = 0;

  video.addEventListener("ended", () => {
    current = (current + 1) % sources.length;
    video.src = sources[current];
    video.play();
  });
})();

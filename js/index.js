
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
          setTimeout(() => {
            stat.classList.add("is-visible");
            const counter = stat.querySelector(".stat__value");
            if (counter) animateCounter(counter);
          }, STAGGER * (i + 1));
        });
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(statsGrid);
})();

(function () {
  const section = document.querySelector(".governor");
  if (!section) return;

  const outerBox = section.querySelector(":scope > .governor__card");
  const photo    = section.querySelector(".governor__photo");
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
    { threshold: 0.2 }
  );

  observer.observe(section);
})();

(function () {
  const districtData = {
    dummar:     { name:"دمر",         pop:"120,000", area:"18 كم²", type:"سكني / ضاحية",   desc:"ضاحية غرب دمشق تشتهر بالمساحات الخضراء والطبيعة الجبلية الخلابة، وتضم مناطق سكنية حديثة ومرافق خدمية متنوعة." },
    salihiye:   { name:"الصالحية",    pop:"90,000",  area:"3 كم²",  type:"تجاري / ثقافي",  desc:"من أرقى أحياء دمشق، تضم جامعة دمشق والمتحف الوطني ومراكز ثقافية وتجارية راقية." },
    rukn:       { name:"ركن الدين",   pop:"130,000", area:"5 كم²",  type:"سكني / تجاري",  desc:"حي شمالي يقع على سفح جبل قاسيون، يتميز بإطلالته البانورامية على دمشق وحيويته التجارية." },
    berze:      { name:"برزة",        pop:"110,000", area:"15 كم²", type:"سكني",           desc:"حي شمالي كبير يتميز بتنوعه العمراني بين القديم والحديث، ويضم مرافق تعليمية وصحية مهمة." },
    qaboun:     { name:"القابون",     pop:"80,000",  area:"9 كم²",  type:"صناعي / سكني",  desc:"منطقة شمالية شرقية تضم مناطق صناعية ومستودعات تجارية إلى جانب أحياء سكنية." },
    jobar:      { name:"جوبر",        pop:"60,000",  area:"7 كم²",  type:"سكني",           desc:"حي شرقي يشهد جهود إعادة إعمار واسعة، ويتميز بموقعه الاستراتيجي على أطراف دمشق الشرقية." },
    muhajireen: { name:"المهاجرين",   pop:"75,000",  area:"4 كم²",  type:"سكني / حكومي",  desc:"حي راقٍ على سفح قاسيون، يضم قصر الشعب والعديد من المؤسسات الحكومية." },
    sarouja:    { name:"ساروجة",      pop:"55,000",  area:"2 كم²",  type:"تراثي / تجاري", desc:"حي تراثي عريق يضم بيوتات دمشقية قديمة وخانات تاريخية، من أقدم أحياء دمشق خارج السور." },
    olddam:     { name:"دمشق القديمة", pop:"45,000", area:"1.5 كم²",type:"تراثي / سياحي", desc:"قلب دمشق النابض وأقدم مدينة مأهولة في العالم، تضم الجامع الأموي وسوق الحميدية وقلعة دمشق." },
    qanawat:    { name:"القنوات",     pop:"70,000",  area:"2.5 كم²",type:"تراثي / تجاري", desc:"حي تاريخي سُمّي نسبة لقنوات المياه الرومانية القديمة، يجمع بين التراث والنشاط التجاري." },
    shaghour:   { name:"الشاغور",     pop:"85,000",  area:"3 كم²",  type:"تراثي / سكني",  desc:"حي عريق يتميز بطابعه التراثي والمعماري القديم، يضم العديد من الحارات الدمشقية الأصيلة." },
    mazza:      { name:"المزة",       pop:"250,000", area:"12 كم²", type:"سكني / حكومي",  desc:"من أكبر أحياء دمشق، تضم المؤسسات الحكومية والسفارات ومناطق سكنية حديثة." },
    kafarsuseh: { name:"كفرسوسة",     pop:"180,000", area:"8 كم²",  type:"سكني / تجاري",  desc:"حي حيوي يجمع بين الطابع السكني والتجاري، يشهد نمواً عمرانياً متسارعاً." },
    midan:      { name:"الميدان",     pop:"200,000", area:"6 كم²",  type:"تجاري / سكني",  desc:"من أعرق أحياء دمشق وأكثرها حيوية، يشتهر بأسواقه الشعبية ومساجده التاريخية." },
    qadam:      { name:"القدم",       pop:"95,000",  area:"5 كم²",  type:"صناعي / سكني",  desc:"حي جنوبي يجمع بين المناطق السكنية والصناعية، ويُعد من المناطق ذات الكثافة العالية." },
    yarmouk:    { name:"اليرموك",     pop:"150,000", area:"4 كم²",  type:"سكني",           desc:"حي سكني في جنوب دمشق، يشهد حالياً جهود إعادة إعمار وتأهيل واسعة." },
  };

  const svgMap       = document.getElementById("svgMap");
  const explorerCard = document.getElementById("explorerCard");
  const cardImg  = document.getElementById("cardImg");
  const cardName = document.getElementById("cardName");
  const cardPop  = document.getElementById("cardPop");
  const cardArea = document.getElementById("cardArea");
  const cardType = document.getElementById("cardType");
  const cardDesc = document.getElementById("cardDesc");

  if (!svgMap || !explorerCard) return;

  let activeId = null;

  function updateCard(id) {
    if (id === activeId) return;
    activeId = id;
    const d = districtData[id];
    if (!d) return;

    explorerCard.classList.add("is-updating");
    setTimeout(() => {
      cardImg.src  = "images/Damascus.png";
      cardImg.alt  = d.name;
      cardName.textContent = d.name;
      cardPop.textContent  = d.pop;
      cardArea.textContent = d.area;
      cardType.textContent = d.type;
      cardDesc.textContent = d.desc;
      explorerCard.classList.remove("is-updating");
    }, 200);

    svgMap.querySelectorAll(".dm-hood").forEach((g) => {
      g.classList.toggle("is-active", g.dataset.id === id);
    });
  }

  svgMap.addEventListener("click", (e) => {
    const hood = e.target.closest(".dm-hood");
    if (!hood) return;
    updateCard(hood.dataset.id);
  });

  updateCard("dummar");
})();

(function () {
  const video = document.getElementById("bottomVideo");
  if (!video) return;

  const sources = [
    // "assets/video/new_mohafez.mp4",

  ];

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

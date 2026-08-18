/* ═══════════════════════════════════════════
   INDEX.JS — Interactive SVG Map + Explorer
   ═══════════════════════════════════════════ */
(function () {
  /* ─── District Data ─── */
  const districts = [
    { name:"دمر",         pop:"120,000", area:"18 كم²", type:"سكني / ضاحية",   desc:"ضاحية غرب دمشق تشتهر بالمساحات الخضراء والطبيعة الجبلية الخلابة، وتضم مناطق سكنية حديثة ومرافق خدمية متنوعة.", points:"55,340 110,215 200,155 320,125 400,205 490,390 445,510 140,555 80,445 60,380", cx:230, cy:335 },
    { name:"الصالحية",    pop:"90,000",  area:"3 كم²",  type:"تجاري / ثقافي",  desc:"من أرقى أحياء دمشق، تضم جامعة دمشق والمتحف الوطني ومراكز ثقافية وتجارية راقية.", points:"320,125 440,75 510,175 465,285 400,205", cx:427, cy:173 },
    { name:"ركن الدين",   pop:"130,000", area:"5 كم²",  type:"سكني / تجاري",  desc:"حي شمالي يقع على سفح جبل قاسيون، يتميز بإطلالته البانورامية على دمشق وحيويته التجارية.", points:"440,75 580,38 700,30 625,190 510,175", cx:571, cy:102 },
    { name:"برزة",        pop:"110,000", area:"15 كم²", type:"سكني",           desc:"حي شمالي كبير يتميز بتنوعه العمراني بين القديم والحديث، ويضم مرافق تعليمية وصحية مهمة.", points:"700,30 830,50 800,205 720,195 625,190", cx:735, cy:134 },
    { name:"القابون",     pop:"80,000",  area:"9 كم²",  type:"صناعي / سكني",  desc:"منطقة شمالية شرقية تضم مناطق صناعية ومستودعات تجارية إلى جانب أحياء سكنية.", points:"830,50 930,100 968,225 955,370 830,300 800,205", cx:886, cy:208 },
    { name:"جوبر",        pop:"60,000",  area:"7 كم²",  type:"سكني",           desc:"حي شرقي يشهد جهود إعادة إعمار واسعة، ويتميز بموقعه الاستراتيجي على أطراف دمشق الشرقية.", points:"720,195 800,205 830,300 955,370 935,510 870,625 760,445 700,340 625,190", cx:830, cy:380 },
    { name:"المهاجرين",   pop:"75,000",  area:"4 كم²",  type:"سكني / حكومي",  desc:"حي راقٍ على سفح قاسيون، يضم قصر الشعب والعديد من المؤسسات الحكومية.", points:"400,205 465,285 540,270 570,365 490,390", cx:493, cy:303 },
    { name:"ساروجا",      pop:"55,000",  area:"2 كم²",  type:"تراثي / تجاري", desc:"حي تراثي عريق يضم بيوتات دمشقية قديمة وخانات تاريخية، من أقدم أحياء دمشق خارج السور.", points:"465,285 510,175 625,190 625,305 570,365 540,270", cx:556, cy:265 },
    { name:"دمشق القديمة", pop:"45,000", area:"1.5 كم²",type:"تراثي / سياحي", desc:"قلب دمشق النابض وأقدم مدينة مأهولة في العالم، تضم الجامع الأموي وسوق الحميدية وقلعة دمشق.", points:"625,190 700,340 650,440 570,365 625,305", cx:634, cy:328 },
    { name:"القنوات",     pop:"70,000",  area:"2.5 كم²",type:"تراثي / تجاري", desc:"حي تاريخي سُمّي نسبة لقنوات المياه الرومانية القديمة، يجمع بين التراث والنشاط التجاري.", points:"490,390 570,365 650,440 555,520 445,510", cx:542, cy:445 },
    { name:"الشاغور",     pop:"85,000",  area:"3 كم²",  type:"تراثي / سكني",  desc:"حي عريق يتميز بطابعه التراثي والمعماري القديم، يضم العديد من الحارات الدمشقية الأصيلة.", points:"650,440 760,445 870,625 730,730 660,575 555,520", cx:704, cy:556 },
    { name:"المزة",       pop:"250,000", area:"12 كم²", type:"سكني / حكومي",  desc:"من أكبر أحياء دمشق، تضم المؤسسات الحكومية والسفارات ومناطق سكنية حديثة.", points:"140,555 445,510 555,520 480,650 400,805 310,725 210,645", cx:363, cy:630 },
    { name:"كفرسوسة",     pop:"180,000", area:"8 كم²",  type:"سكني / تجاري",  desc:"حي حيوي يجمع بين الطابع السكني والتجاري، يشهد نمواً عمرانياً متسارعاً.", points:"555,520 660,575 590,675 490,880 400,805 480,650", cx:529, cy:684 },
    { name:"الميدان",     pop:"200,000", area:"6 كم²",  type:"تجاري / سكني",  desc:"من أعرق أحياء دمشق وأكثرها حيوية، يشتهر بأسواقه الشعبية ومساجده التاريخية.", points:"660,575 730,730 740,830 640,820 490,880 590,675", cx:642, cy:752 },
    { name:"القدم",       pop:"95,000",  area:"5 كم²",  type:"صناعي / سكني",  desc:"حي جنوبي يجمع بين المناطق السكنية والصناعية، ويُعد من المناطق ذات الكثافة العالية.", points:"730,730 870,625 810,740 740,830", cx:788, cy:731 },
    { name:"اليرموك",     pop:"150,000", area:"4 كم²",  type:"سكني",           desc:"حي سكني في جنوب دمشق، يشهد حالياً جهود إعادة إعمار وتأهيل واسعة.", points:"640,820 740,830 660,890 570,920 490,880", cx:620, cy:868 },
  ];

  /* ─── DOM refs ─── */
  const discoverSection = document.getElementById("discoverSection");
  const openExplorerBtn = document.getElementById("openExplorer");
  const mapExplorer     = document.getElementById("mapExplorer");
  const explorerBack    = document.getElementById("explorerBack");
  const svgMap          = document.getElementById("svgMap");
  const explorerCard    = document.getElementById("explorerCard");
  const cardImg  = document.getElementById("cardImg");
  const cardName = document.getElementById("cardName");
  const cardPop  = document.getElementById("cardPop");
  const cardArea = document.getElementById("cardArea");
  const cardType = document.getElementById("cardType");
  const cardDesc = document.getElementById("cardDesc");

  if (!openExplorerBtn || !mapExplorer || !svgMap) return;

  /* ─── Build SVG districts ─── */
  const svgNS = "http://www.w3.org/2000/svg";

  districts.forEach((d, i) => {
    const g = document.createElementNS(svgNS, "g");
    g.classList.add("district");
    g.dataset.index = i;
    g.style.setProperty("--cx", d.cx + "px");
    g.style.setProperty("--cy", d.cy + "px");

    const poly = document.createElementNS(svgNS, "polygon");
    poly.setAttribute("points", d.points);
    poly.classList.add("district__shape");

    const label = document.createElementNS(svgNS, "text");
    label.setAttribute("x", d.cx);
    label.setAttribute("y", d.cy);
    label.classList.add("district__label");
    label.textContent = d.name;

    g.appendChild(poly);
    g.appendChild(label);
    svgMap.appendChild(g);
  });

  /* ─── Update card ─── */
  let activeIndex = 0;

  function updateCard(index) {
    if (index === activeIndex && explorerCard.dataset.loaded) return;
    activeIndex = index;
    explorerCard.dataset.loaded = "1";
    const d = districts[index];

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

    svgMap.querySelectorAll(".district").forEach((g, i) => {
      g.classList.toggle("is-active", i === index);
    });
  }

  /* ─── Click districts ─── */
  svgMap.addEventListener("click", (e) => {
    const g = e.target.closest(".district");
    if (!g) return;
    updateCard(Number(g.dataset.index));
  });

  /* ─── Open explorer ─── */
  openExplorerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    discoverSection.classList.add("is-hidden");
    mapExplorer.style.display = "";
    mapExplorer.scrollIntoView({ behavior:"smooth", block:"start" });
    updateCard(0);
  });

  /* ─── Back button ─── */
  explorerBack.addEventListener("click", () => {
    mapExplorer.style.display = "none";
    discoverSection.classList.remove("is-hidden");
    discoverSection.scrollIntoView({ behavior:"smooth", block:"center" });
  });
})();

/* ═══════════════════════════════════════════
   NEWS TABS
   ═══════════════════════════════════════════ */
(function () {
  const tabs   = document.querySelectorAll(".news-tab");
  const panels = document.querySelectorAll(".news-panel");
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => t.classList.toggle("is-active", t === tab));
      panels.forEach((p) => p.classList.toggle("is-active", p.dataset.panel === target));
    });
  });
})();

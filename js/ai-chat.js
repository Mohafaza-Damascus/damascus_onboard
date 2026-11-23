(function () {
  if (document.getElementById("ai-chat-btn")) return;

  const ROOT = new URL("../", document.currentScript.src).href;
  const english = Boolean(window.I18N && window.I18N.lang === "en");
  const tr = (text) => (english && window.I18N ? window.I18N.t(text) : text);

  document.body.insertAdjacentHTML(
    "beforeend",
    `
<button id="ai-chat-btn" aria-label="مساعد ذكي">
  <span class="notif">1</span>
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 10H6V10h12v2zm0-3H6V7h12v2z"/>
  </svg>
</button>

<div id="ai-chat-panel" role="dialog" aria-modal="true" aria-label="المساعد الذكي">
  <div id="chat-header">
    <div class="avatar">
      <svg viewBox="0 0 24 24"><path d="M12 2a5 5 0 1 1 0 10A5 5 0 0 1 12 2zm0 12c5.33 0 8 2.67 8 4v2H4v-2c0-1.33 2.67-4 8-4z"/></svg>
    </div>
    <div class="info">
      <div class="name">مساعد البوابة الذكي</div>
      <div class="status">متاح الآن</div>
    </div>
    <button id="chat-close-btn" aria-label="إغلاق">✕</button>
  </div>

  <div id="chat-chips">
    <span class="chip" data-q="ما هي خدماتكم؟">خدماتنا</span>
    <span class="chip" data-q="طلب ترخيص مهنة جديدة">ترخيص مهنة</span>
    <span class="chip" data-q="تصريح حفر">تصريح حفر</span>
    <span class="chip" data-q="براءة ذمة">براءة ذمة</span>
    <span class="chip" data-q="قيد عقاري">قيد عقاري</span>
    <span class="chip" data-q="تقديم شكوى">الشكاوى</span>
  </div>

  <div id="chat-messages"></div>

  <div id="chat-input-area">
    <button id="chat-send-btn" aria-label="إرسال">
      <svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
    </button>
    <textarea id="chat-input" placeholder="اكتب سؤالك هنا..." rows="1"></textarea>
  </div>
</div>`,
  );

  /* ---------- قاعدة بيانات الخدمات ---------- */

  let servicesReady = null;

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = resolve;
      script.onerror = resolve;
      document.head.appendChild(script);
    });
  }

  // بيانات الخدمات نفسها التي تديرها لوحة التحكم (تُحمّل عند الحاجة فقط)
  function ensureServices() {
    if (!servicesReady) {
      servicesReady = (async () => {
        if (!Array.isArray(window.DAMASCUS_SERVICES)) await loadScript(`${ROOT}pages/services-form/services-list.js`);
        buildIndex(window.DAMASCUS_SERVICES || []);
      })();
    }
    return servicesReady;
  }

  const STOP = new Set(
    (
      "بدي بدنا ابي ابغي اريد نريد اود بدك كيف شلون شو ايش ماذا ما ماهي هي هو هل متي وين اين عن حول بخصوص من في " +
      "علي الي لي انا نحن لو سمحت ممكن رجاء اعرف عرفني اشرح شرح معلومات تفاصيل عندي عنا خدمه خدمات خدماتكم الخدمه " +
      "اطلع طلع احصل الحصول اعمل اسوي كيفيه طريقه اقدم تقديم مع او و يا مرحبا اهلا السلام عليكم الو اللي التي الذي " +
      "دمشق محافظه المحافظه بوابه البوابه"
    ).split(" "),
  );

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[ً-ٰٟـ]/g, "")
      .replace(/[أإآٱ]/g, "ا")
      .replace(/ة/g, "ه")
      .replace(/ى/g, "ي")
      .replace(/ؤ/g, "و")
      .replace(/ئ/g, "ي")
      .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d))
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim();
  }

  // توحيد صيغ الكلمات الشائعة (مفرد/جمع/عامية) لجذر واحد
  const ROOTS = [
    [/^(ت?رخيص|تراخيص|رخص(ه|تي|ات)?)$/, "رخص"],
    [/^([باني]?جدد|تجديد)$/, "تجديد"],
    [/^(تصاريح|تصريح(ات)?)$/, "تصريح"],
    [/^(شكو(ي|اي)|شكاوي)$/, "شكوي"],
    [/^(مهن(ه|ي|تي)?)$/, "مهنه"],
    [/^(الغاء|[با]?لغي)$/, "الغاء"],
  ];

  function stem(word) {
    const m = word.match(/^(وال|بال|فال|كال|لل|ال)(.{3,})$/);
    const base = m ? m[2] : word;
    const root = ROOTS.find(([re]) => re.test(base));
    return root ? root[1] : base;
  }

  function tokenize(text, keepStop = false) {
    return normalize(text)
      .split(" ")
      .filter(Boolean)
      .map(stem)
      .filter((w) => w.length > 1 && (keepStop || !STOP.has(w)));
  }

  const same = (a, b) =>
    a === b || (Math.min(a.length, b.length) >= 3 && Math.abs(a.length - b.length) <= 2 && (a.startsWith(b) || b.startsWith(a)));

  const has = (tokens, word) => tokens.some((t) => same(t, word));

  let INDEX = [];
  let CATEGORIES = [];

  function field(service, key) {
    return (english && service[`${key}_en`]) || service[key] || "";
  }

  function categoryOf(service) {
    return String(
      service.requestPlace === "إلكتروني" ? service.electronicDirectorate : service.address || service.directorate,
    ).trim();
  }

  function buildIndex(services) {
    INDEX = services.map((service) => ({
      service,
      name: tokenize(service.name),
      body: tokenize(`${service.description} ${categoryOf(service)}`),
      fullName: normalize(service.name),
    }));

    const groups = new Map();
    INDEX.forEach((entry) => {
      const key = categoryOf(entry.service);
      if (!key) return;
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push(entry.service);
    });
    CATEGORIES = Array.from(groups, ([name, items]) => ({
      name,
      tokens: tokenize(name).filter((t) => t !== "مديريه"),
      items,
    }));
  }

  function idf(word) {
    const df = INDEX.filter((e) => has(e.name, word) || has(e.body, word)).length;
    return df ? Math.log(1 + INDEX.length / df) : 0;
  }

  function rankServices(tokens, rawQuery) {
    const weights = tokens.map(idf);
    const query = normalize(rawQuery);

    return INDEX.map((entry) => {
      let score = 0;
      let nameHits = 0;
      tokens.forEach((t, i) => {
        if (has(entry.name, t)) {
          score += 3 * weights[i];
          nameHits++;
        } else if (has(entry.body, t)) {
          score += weights[i];
        }
      });
      if (entry.fullName.length > 4 && query.includes(entry.fullName)) score += 6;
      // تفضيل الخدمة التي تغطي أسماؤها كلمات السؤال بأكبر نسبة
      score *= 0.6 + 0.4 * (nameHits / Math.max(entry.name.length, 1));
      return { service: entry.service, score, nameHits };
    })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score);
  }

  /* ---------- صياغة الإجابات ---------- */

  const countAr = (n) => (n === 1 ? "خدمة واحدة" : n === 2 ? "خدمتان" : n <= 10 ? `${n} خدمات` : `${n} خدمة`);

  const L = english
    ? {
        how: "How to apply",
        online: "Online, through the governorate portal",
        inPerson: "In person",
        papers: "Required documents",
        fees: "Fees",
        steps: "Steps",
        more: "and more steps in the full guide",
        start: "Start the service now",
        guide: "Full service guide",
        soon: "The online link for this service is coming soon.",
        related: "Related services",
        pick: "I found several services that match your request. Which one do you mean?",
        explain: "Explain",
        open: "Open",
        catIntro: (name, n) => `**${name}**: ${n} services. Here are some of them:`,
        all: "All e-services",
        allPhysical: "Transactions guide",
        overview: (n) => `The portal offers **${n} services**, grouped as follows:`,
        overviewEnd: "Write the name of the service you need and I will explain it and send you its link.",
      }
    : {
        how: "طريقة التقديم",
        online: "إلكترونياً عبر بوابة المحافظة",
        inPerson: "حضورياً",
        papers: "الأوراق المطلوبة",
        fees: "الرسوم",
        steps: "الخطوات",
        more: "وخطوات أخرى في الدليل الكامل",
        start: "ابدأ الخدمة الآن",
        guide: "دليل الخدمة الكامل",
        soon: "رابط التقديم الإلكتروني لهذه الخدمة سيتوفر قريباً.",
        related: "خدمات قريبة",
        pick: "وجدت أكثر من خدمة تناسب طلبك، أيها تقصد؟",
        explain: "اشرح",
        open: "فتح",
        catIntro: (name, n) => `**${name}**: ${countAr(n)}، منها:`,
        all: "جميع الخدمات الإلكترونية",
        allPhysical: "دليل المعاملات",
        overview: (n) => `تقدّم البوابة **${countAr(n)}** موزعة على الأقسام التالية:`,
        overviewEnd: "اكتب اسم الخدمة التي تحتاجها وسأشرحها لك وأرسل لك رابطها.",
      };

  const esc = (text) =>
    String(text ?? "").replace(
      /[&<>"']/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c],
    );

  const lines = (text) =>
    String(text || "")
      .split("\n")
      .map((l) => l.replace(/^\s*[\d٠-٩]+\s*[-.)]\s*/, "").trim())
      .filter((l) => l && l !== "لا يوجد");

  const isOnline = (service) => service.requestPlace === "إلكتروني";

  function guideUrl(service) {
    const id = encodeURIComponent(service.id);
    return isOnline(service)
      ? `${ROOT}pages/electronic-service-guide.html?id=${id}`
      : `${ROOT}pages/services_details/guide-details.html?id=${id}`;
  }

  const link = (href, label, external) =>
    `<a class="chat-link${external ? " chat-link--primary" : ""}" href="${esc(href)}"${
      external ? ' target="_blank" rel="noopener"' : ""
    }>${esc(label)}</a>`;

  const askButton = (service) =>
    `<button type="button" class="chat-ask" data-q="${esc(service.name)}">${esc(field(service, "name"))}</button>`;

  function serviceAnswer(service, related) {
    const papers = lines(field(service, "papers"));
    const steps = lines(field(service, "stages"));
    const place = isOnline(service)
      ? L.online
      : `${L.inPerson}${service.physicalPlace || service.address ? `: ${esc(field(service, "physicalPlace") || field(service, "address"))}` : ""}`;

    let html = `<strong class="chat-title">${esc(field(service, "name"))}</strong>`;
    if (field(service, "description")) html += `<p>${esc(field(service, "description"))}</p>`;
    html += `<p><strong>${L.how}:</strong> ${place}</p>`;
    if (papers.length) html += `<p><strong>${L.papers}:</strong></p><ul>${papers.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>`;
    if (field(service, "fees")) html += `<p><strong>${L.fees}:</strong> ${esc(field(service, "fees"))}</p>`;
    if (steps.length) {
      html += `<p><strong>${L.steps}:</strong></p><ol>${steps
        .slice(0, 5)
        .map((s) => `<li>${esc(s)}</li>`)
        .join("")}</ol>`;
      if (steps.length > 5) html += `<p class="chat-muted">${L.more}</p>`;
    }

    html += `<div class="chat-actions">`;
    if (isOnline(service) && service.serviceUrl) html += link(service.serviceUrl, L.start, true);
    html += link(guideUrl(service), L.guide);
    html += `</div>`;
    if (isOnline(service) && !service.serviceUrl) html += `<p class="chat-muted">${L.soon}</p>`;

    if (related.length)
      html += `<p class="chat-muted">${L.related}:</p><div class="chat-options">${related.map(askButton).join("")}</div>`;
    return html;
  }

  function optionsAnswer(intro, services, footer = "") {
    return `<p>${intro}</p><div class="chat-options">${services.map(askButton).join("")}</div>${footer}`;
  }

  function categoryAnswer(category) {
    const online = category.items.some(isOnline);
    const footer = `<div class="chat-actions">${link(
      `${ROOT}pages/${online ? "electronic-services.html" : "services_details/transactions-guide.html"}`,
      online ? L.all : L.allPhysical,
    )}</div>`;
    return optionsAnswer(
      formatText(esc(L.catIntro(tr(category.name), category.items.length))),
      category.items.slice(0, 6),
      footer,
    );
  }

  function overviewAnswer() {
    const list = CATEGORIES.slice()
      .sort((a, b) => b.items.length - a.items.length)
      .map((c) => `<li>${esc(tr(c.name))} (${c.items.length})</li>`)
      .join("");
    return `<p>${formatText(esc(L.overview(INDEX.length)))}</p><ul>${list}</ul><p>${L.overviewEnd}</p><div class="chat-actions">${link(
      `${ROOT}pages/electronic-services.html`,
      L.all,
    )}${link(`${ROOT}pages/services_details/transactions-guide.html`, L.allPhysical)}</div>`;
  }

  /* ---------- أسئلة عامة ---------- */

  const KB = [
    {
      keywords: ["ساعات", "دوام", "اوقات", "hour", "time", "open"],
      answer: `🕐 **أوقات الخدمة**\n\nالبوابة الإلكترونية متاحة **24 ساعة / 7 أيام** طوال الأسبوع.\n\nأما الدعم البشري فيعمل خلال:\n• الأحد – الخميس: 8 صباحاً – 3 مساءً`,
    },
    {
      keywords: ["حساب", "كلمه مرور", "كلمه السر", "تسجيل دخول", "تسجيل الدخول", "login", "account", "password"],
      answer: `🔐 **تسجيل الدخول والحساب**\n\n1. اضغط "تسجيل الدخول" في أعلى الصفحة\n2. أدخل اسم المستخدم وكلمة المرور\n3. أو سجّل حساباً جديداً إن كنت تزور البوابة لأول مرة`,
    },
    {
      keywords: ["شكرا", "ممتاز", "رائع", "يعطيك العافيه", "thank", "great"],
      answer: `😊 على الرحب والسعة! يسعدنا خدمتك دائماً.\nإذا كان لديك أي استفسار آخر فلا تتردد في السؤال. 🌟`,
    },
    {
      keywords: ["مرحبا", "السلام", "اهلا", "هلا", "مساء الخير", "صباح الخير", "hi", "hello", "hey"],
      answer: `أهلاً وسهلاً! 👋 أنا مساعد البوابة الذكي.\nاكتب اسم الخدمة التي تحتاجها، وسأشرح لك أوراقها ورسومها وخطواتها وأرسل لك رابط التقديم.`,
    },
  ];

  const FALLBACK = `لم أجد خدمة تطابق سؤالك تماماً 🙏\nجرّب كتابة اسم الخدمة أو كلمة مفتاحية منها، مثل: **ترخيص مهنة**، **تصريح حفر**، **قيد عقاري**، **براءة ذمة**.`;

  function matchKB(query) {
    const q = ` ${normalize(query)} `;
    const entry = KB.find((e) => e.keywords.some((kw) => q.includes(` ${normalize(kw)}`)));
    return entry ? formatText(translateLines(entry.answer)) : null;
  }

  async function getBotAnswer(query) {
    await ensureServices();
    const tokens = tokenize(query);

    if (!tokens.length) {
      if (/خدم|service/i.test(normalize(query)) && INDEX.length) return overviewAnswer();
      return matchKB(query) || formatText(translateLines(FALLBACK));
    }

    const ranked = rankServices(tokens, query);
    const [best, second] = ranked;

    // سؤال عن قسم كامل (مثل: المالية، السجل المؤقت، الطاقة الشمسية) ما لم يطابق اسم خدمة بعينها
    const category = CATEGORIES.find((c) => tokens.every((t) => has(c.tokens, t)));
    const serviceCovers = best && best.nameHits === tokens.length;
    if (category && !serviceCovers)
      return category.items.length === 1 ? serviceAnswer(category.items[0], []) : categoryAnswer(category);

    if (best && best.score >= 2.5) {
      if (!second || best.score >= 1.3 * second.score) {
        const related = ranked
          .slice(1, 4)
          .filter((r) => r.score >= best.score * 0.45)
          .map((r) => r.service);
        return serviceAnswer(best.service, related);
      }
      const close = ranked.filter((r) => r.score >= best.score * 0.6).slice(0, 6);
      return optionsAnswer(L.pick, close.map((r) => r.service));
    }

    return matchKB(query) || formatText(translateLines(FALLBACK));
  }

  /* ---------- واجهة المحادثة ---------- */

  const btn = document.getElementById("ai-chat-btn");
  const panel = document.getElementById("ai-chat-panel");
  const closeBtn = document.getElementById("chat-close-btn");
  const messagesEl = document.getElementById("chat-messages");
  const inputEl = document.getElementById("chat-input");
  const sendBtn = document.getElementById("chat-send-btn");
  const chipsEl = document.getElementById("chat-chips");
  const notifDot = btn.querySelector(".notif");

  let isOpen = false;
  let isTyping = false;

  function translateLines(text) {
    if (!english) return text;
    return text
      .split("\n")
      .map((line) => {
        const m = line.match(/^(\s*(?:•|\d+\.)\s+)?(.*)$/);
        return (m[1] || "") + window.I18N.t(m[2]);
      })
      .join("\n");
  }

  function getTime() {
    return new Date().toLocaleTimeString(english ? "en-GB" : "ar-SY-u-nu-latn", { hour: "2-digit", minute: "2-digit" });
  }

  function scrollToBottom() {
    setTimeout(() => {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }, 50);
  }

  function formatText(text) {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\n/g, "<br>");
  }

  // html: نص منسّق جاهز (إجابات البوت)، أما رسائل المستخدم فتُعرض كنص عادي
  function addMessage(content, sender) {
    const row = document.createElement("div");
    row.className = `msg-row ${sender}`;

    const av = document.createElement("div");
    av.className = `msg-avatar ${sender === "bot" ? "bot-av" : "user-av"}`;
    av.textContent = sender === "bot" ? "🤖" : "أنت";

    const bubble = document.createElement("div");
    bubble.className = `bubble ${sender}`;
    bubble.innerHTML = sender === "bot" ? content : formatText(esc(content));

    row.append(av, bubble);
    messagesEl.appendChild(row);

    const time = document.createElement("div");
    time.className = "msg-time";
    time.textContent = getTime();
    messagesEl.appendChild(time);
    scrollToBottom();
  }

  function showTyping() {
    const row = document.createElement("div");
    row.className = "msg-row bot";
    row.id = "typing-indicator";
    row.innerHTML = `<div class="msg-avatar bot-av">🤖</div><div class="typing-bubble"><span></span><span></span><span></span></div>`;
    messagesEl.appendChild(row);
    scrollToBottom();
  }

  function hideTyping() {
    const el = document.getElementById("typing-indicator");
    if (el) el.remove();
  }

  async function botRespond(userText) {
    isTyping = true;
    showTyping();

    const delay = new Promise((resolve) => setTimeout(resolve, 700 + Math.random() * 500));
    let answer;
    try {
      [answer] = await Promise.all([getBotAnswer(userText), delay]);
    } catch (error) {
      console.warn("AI chat:", error);
      answer = formatText(translateLines(FALLBACK));
    }

    hideTyping();
    addMessage(answer, "bot");
    isTyping = false;
  }

  function ask(text) {
    text = text.trim();
    if (!text || isTyping) return;
    addMessage(text, "user");
    botRespond(text);
  }

  function sendMessage() {
    const text = inputEl.value;
    if (!text.trim() || isTyping) return;
    inputEl.value = "";
    inputEl.style.height = "auto";
    ask(text);
  }

  function openPanel() {
    panel.classList.add("open");
    isOpen = true;
    if (notifDot) notifDot.style.display = "none";
    ensureServices();
    setTimeout(() => inputEl.focus(), 300);
  }

  function closePanel() {
    panel.classList.remove("open");
    isOpen = false;
  }

  btn.addEventListener("click", () => (isOpen ? closePanel() : openPanel()));
  closeBtn.addEventListener("click", closePanel);
  sendBtn.addEventListener("click", sendMessage);

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  inputEl.addEventListener("input", () => {
    inputEl.style.height = "auto";
    inputEl.style.height = Math.min(inputEl.scrollHeight, 90) + "px";
  });

  chipsEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (chip) ask(chip.dataset.q);
  });

  messagesEl.addEventListener("click", (e) => {
    const option = e.target.closest(".chat-ask");
    if (option) ask(option.dataset.q);
  });

  document.addEventListener("click", (e) => {
    const target = e.target;

    // زر «تواصل معنا» داخل الصفحة
    if (target.closest?.("#open-ai-chat")) {
      e.preventDefault();
      openPanel();
      return;
    }

    // إغلاق المساعد عند الضغط خارج النافذة
    if (isOpen && target.isConnected && !panel.contains(target) && !btn.contains(target)) closePanel();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closePanel();
  });

  setTimeout(() => {
    addMessage(
      formatText(
        translateLines(
          "أهلاً بك في البوابة الإلكترونية! 👋\nأنا مساعدك الذكي وخبير بخدمات المحافظة.\nاكتب اسم الخدمة التي تحتاجها، وسأشرحها لك وأرسل لك رابطها.",
        ),
      ),
      "bot",
    );
  }, 400);
})();

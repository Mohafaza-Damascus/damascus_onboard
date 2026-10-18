/*
 * المتحكم: الخط الزمني للانتقال، البوابات، النصوص، النقاط، لوحة المفاتيح والسحب.
 *
 * عند الضغط على البوابة (t = 0):
 *   0 → 1200ms  البوابة الحالية: scale 1→6، opacity 1→0، blur 0→10px   (power4.in)
 *   0 → 1500ms  الخلفية: دائرة متموّجة تتوسع من مركز البوابة           (power2.inOut)
 * 600 → 1500ms  البوابة الجديدة: scale 0→1، opacity 0→1، blur 10→0px   (power4.out)
 */
(function () {
  'use strict';
  const DG = window.DG;
  const slides = DG.slides;
  const cfg = DG.config || {};
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const T = Object.assign({
    bg: 1500, gateOut: 1200, gateInDelay: 600, gateIn: 900,
    textOut: 350, textInDelay: 650, textIn: 650, stagger: 70
  }, cfg.timing);
  if (reduce) Object.assign(T, { bg: 700, gateOut: 350, gateInDelay: 250, gateIn: 450, textOut: 200, textInDelay: 300, textIn: 350, stagger: 0 });

  const EASE = {
    in5: 'cubic-bezier(0.64, 0, 0.78, 0)',   // power4.in
    out5: 'cubic-bezier(0.22, 1, 0.36, 1)',  // power4.out
    in3: 'cubic-bezier(0.32, 0, 0.67, 0)',
    out3: 'cubic-bezier(0.33, 1, 0.68, 1)'   // power3.out
  };
  const inOutCubic = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2); // power2.inOut
  const lerp = (a, b, t) => a + (b - a) * t;
  const pad = n => String(n).padStart(2, '0');

  const hero = document.getElementById('hero');
  const $ = sel => hero.querySelector(sel);
  const gateBtn = $('.gate');
  let [gateCur, gateNext] = hero.querySelectorAll('.gate__img');
  const animEls = Array.from(hero.querySelectorAll('[data-anim]'));
  const ui = {
    kicker: $('[data-field="kicker"]'),
    name: $('[data-field="name"]'),
    text: $('[data-field="text"]'),
    link: $('[data-field="link"]'),
    cur: $('.counter__cur'),
    total: $('.counter__total'),
    bullets: $('.bullets'),
    arrow: $('.hint__arrow'),
    live: $('#live')
  };
  let bullets = [];

  // ---------- العارض ----------
  // عند الفتح من file:// يرفض WebGL الصور، فيتحول العارض تلقائياً إلى Canvas 2D عند أول صورة
  const renderer = DG.createRenderer($('.hero__bg'), { onSwitch: () => measure() });

  // ---------- مصادر الخلفيات ----------
  const sources = [];

  function source(i) {
    if (!sources[i]) sources[i] = makeSource(slides[i], i);
    return sources[i];
  }

  function makeSource(s, i) {
    // لا تستخدم requestIdleCallback هنا: حلقة الرسم المستمرة تمنع فترات الخمول فيتأخر لثوانٍ
    const scene = () => new Promise(resolve => setTimeout(() => {
      const c = DG.scenes.make(s.scene, i + 1);
      resolve({ el: c, w: c.width, h: c.height, isVideo: false, phase: i * 1.37 });
    }));
    if (s.media === false) return scene();
    const list = s.media ? [s.media] : s.id ? MEDIA_EXT.map(([type, ext]) => ({ type, src: `${ASSETS}/${s.id}.${ext}` })) : [];
    return firstLoaded(list, i).catch(() => {
      if (s.media) console.warn('[أبواب دمشق] تعذّر تحميل', s.media.src, '— استُخدم مشهد بديل.');
      else if (s.id) console.info(`[أبواب دمشق] لا توجد صورة ${ASSETS}/${s.id}.jpg — استُخدم مشهد بديل.`);
      return scene();
    });
  }

  // الاكتشاف التلقائي: assets/<id>.jpg ثم jpeg/png/webp ثم فيديو
  const ASSETS = cfg.assets || 'assets';
  const MEDIA_EXT = [['image', 'jpg'], ['image', 'jpeg'], ['image', 'png'], ['image', 'webp'], ['video', 'mp4'], ['video', 'webm']];

  async function firstLoaded(list, i) {
    for (const m of list) {
      try { return await loadMedia(m, i); } catch (e) { /* جرّب التالي */ }
    }
    throw new Error('no media');
  }

  function loadMedia(m, i) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error('timeout')), 12000);
      const done = v => { clearTimeout(timer); resolve(v); };
      const fail = e => { clearTimeout(timer); reject(e); };
      if (m.type === 'video') {
        const v = document.createElement('video');
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.preload = 'auto';
        v.setAttribute('muted', '');
        v.setAttribute('playsinline', '');
        v.addEventListener('loadeddata', () => done({
          el: v, isVideo: true, phase: 0,
          get w() { return v.videoWidth; },
          get h() { return v.videoHeight; }
        }), { once: true });
        v.addEventListener('error', () => fail(new Error('video error')), { once: true });
        v.src = m.src;
        v.load();
      } else {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => done({ el: img, w: img.naturalWidth, h: img.naturalHeight, isVideo: false, phase: i * 1.37 });
        img.onerror = () => fail(new Error('image error'));
        img.src = m.src;
      }
    });
  }

  // ---------- البوابة ----------
  // صورة بوابة حقيقية: assets/<id>-gate.png (أو webp) تُكتشف تلقائياً، وإلا تُرسم البوابة بالكود
  const GATE_EXT = ['png', 'webp'];
  const DEFAULT_ANCHOR = { x: 0.5, y: 0.6 };
  const gates = [];

  function gateFor(i) {
    if (!gates[i]) gates[i] = resolveGate(slides[i]);
    return gates[i];
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('image error'));
      img.src = src;
    });
  }

  async function resolveGate(s) {
    const list = s.gate ? [s.gate] : s.id ? GATE_EXT.map(ext => `${ASSETS}/${s.id}-gate.${ext}`) : [];
    for (const src of list) {
      try {
        const img = await loadImage(src);
        return { src, aspect: img.naturalWidth / img.naturalHeight, anchor: s.gateAnchor || findDoor(img) || DEFAULT_ANCHOR };
      } catch (e) { /* جرّب التالي */ }
    }
    if (s.gate) console.warn('[أبواب دمشق] تعذّر تحميل صورة البوابة', s.gate, '— استُخدمت البوابة المرسومة.');
    return { src: DG.gate.url(s.arch), aspect: DG.gate.aspect, anchor: DG.gate.anchor(s.arch) };
  }

  // يجد فتحة الباب الشفافة (أكبر منطقة شفافة يحيط بها الحجر) ويعيد مركزها كنسبة من الصورة.
  // لا يعمل عند فتح الصفحة من file:// لأن المتصفح يمنع قراءة البكسلات — عندها يُستخدم gateAnchor.
  function findDoor(img) {
    try {
      const w = 200, h = Math.max(1, Math.round(w * img.naturalHeight / img.naturalWidth)), n = w * h;
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, w, h);
      const px = ctx.getImageData(0, 0, w, h).data;
      const clear = new Uint8Array(n), mark = new Uint8Array(n);
      for (let i = 0; i < n; i++) clear[i] = px[i * 4 + 3] < 40 ? 1 : 0;

      const flood = (seeds, visit) => {
        const st = seeds.filter(i => clear[i] && !mark[i]);
        st.forEach(i => { mark[i] = 1; });
        while (st.length) {
          const i = st.pop(), x = i % w;
          if (visit) visit(i);
          for (const j of [x > 0 ? i - 1 : -1, x < w - 1 ? i + 1 : -1, i - w, i + w]) {
            if (j >= 0 && j < n && clear[j] && !mark[j]) { mark[j] = 1; st.push(j); }
          }
        }
      };

      // الخارج = الشفاف المتصل بالأعلى أو الجانبين (ليس الأسفل، فالباب قد يلامس الأرض)
      const border = [];
      for (let x = 0; x < w; x++) border.push(x);
      for (let y = 0; y < h; y++) border.push(y * w, y * w + w - 1);
      flood(border);

      let best = null;
      for (let i = 0; i < n; i++) {
        if (!clear[i] || mark[i]) continue;
        const hole = { n: 0, sx: 0, sy: 0 };
        flood([i], j => { hole.n++; hole.sx += j % w; hole.sy += Math.floor(j / w); });
        if (!best || hole.n > best.n) best = hole;
      }
      if (!best || best.n < 30) return null;
      return { x: (best.sx / best.n + 0.5) / w, y: (best.sy / best.n + 0.5) / h };
    } catch (e) {
      return null;
    }
  }

  async function setGate(img, i) {
    const g = await gateFor(i);
    img._gate = g;
    img.src = g.src;
    img.style.transformOrigin = `${g.anchor.x * 100}% ${g.anchor.y * 100}%`;
    try { await img.decode(); } catch (e) { /* يُعرض عند التحميل */ }
    return g;
  }

  function stop(el) {
    el.getAnimations().forEach(a => a.cancel());
  }

  function gateOut(img) {
    stop(img);
    img.animate([
      { transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' },
      { transform: `scale(${reduce ? 1 : cfg.gateScaleOut || 6})`, opacity: 0, filter: `blur(${cfg.gateBlur || 10}px)` }
    ], { duration: T.gateOut, easing: EASE.in5, fill: 'forwards' });
  }

  function gateIn(img, delay) {
    stop(img);
    img.animate([
      { transform: `scale(${reduce ? 1 : 0})`, opacity: 0, filter: `blur(${cfg.gateBlur || 10}px)` },
      { transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' }
    ], { duration: T.gateIn, delay, easing: EASE.out5, fill: 'both' });
  }

  // ---------- النصوص ----------
  function fill(i) {
    const s = slides[i];
    ui.kicker.textContent = s.kicker || '';
    ui.name.textContent = s.name;
    ui.text.textContent = s.text || '';
    ui.link.href = s.link || '#';
    ui.cur.textContent = pad(i + 1);
    ui.live.textContent = s.name;
  }

  function updateNav(i) {
    bullets.forEach((b, j) => b.setAttribute('aria-current', j === i ? 'true' : 'false'));
    gateBtn.setAttribute('aria-label', 'انتقل إلى ' + slides[(i + 1) % slides.length].name);
  }

  function textIn(delay) {
    animEls.forEach((el, k) => {
      stop(el);
      el.animate([
        { opacity: 0, transform: 'translateY(18px)' },
        { opacity: 1, transform: 'translateY(0)' }
      ], { duration: T.textIn, delay: delay + k * T.stagger, easing: EASE.out3, fill: 'both' });
    });
  }

  function swapText(i) {
    animEls.forEach((el, k) => {
      stop(el);
      el.animate([
        { opacity: 1, transform: 'translateY(0)' },
        { opacity: 0, transform: 'translateY(-14px)' }
      ], { duration: T.textOut, delay: k * T.stagger * 0.5, easing: EASE.in3, fill: 'forwards' });
    });
    setTimeout(() => { fill(i); textIn(0); }, T.textInDelay);
  }

  // ---------- القياسات ----------
  let center = [0.5, 0.5];
  let maxR = 1;
  let canvasKey = '';

  // كل بوابة بنسبتها الحقيقية: نفس الارتفاع، والعرض محدود حتى لا تغطي النصوص، ومحاذاة للأسفل
  function gateSize(g, boxH) {
    const vw = window.innerWidth;
    const maxW = Math.max(boxH * DG.gate.aspect, vw <= 820 ? vw * 0.92 : Math.min(vw * 0.52, 820));
    let h = boxH, w = h * g.aspect;
    if (w > maxW) { w = maxW; h = w / g.aspect; }
    return { w, h };
  }

  // imgs: صور البوابات الظاهرة الآن، active: التي يبدأ منها الانتقال (الأخيرة)
  function measure(imgs = transition ? [gateCur, gateNext] : [gateCur], active = imgs[imgs.length - 1]) {
    const hr = hero.getBoundingClientRect();
    if (!hr.width || !hr.height) return;

    gateBtn.style.width = '';
    const boxH = gateBtn.offsetHeight;
    const sizes = new Map();
    imgs.forEach(img => { if (img._gate) sizes.set(img, gateSize(img._gate, boxH)); });
    const boxW = Math.max(boxH * DG.gate.aspect, ...Array.from(sizes.values(), s => s.w));
    gateBtn.style.width = `${boxW}px`;
    sizes.forEach((s, img) => Object.assign(img.style, {
      left: `${(boxW - s.w) / 2}px`, top: `${boxH - s.h}px`, width: `${s.w}px`, height: `${s.h}px`
    }));

    const gr = gateBtn.getBoundingClientRect();
    const g = active._gate || { anchor: DEFAULT_ANCHOR };
    const s = sizes.get(active) || { w: gr.width, h: gr.height };
    const cx = (gr.left + (gr.width - s.w) / 2 + s.w * g.anchor.x - hr.left) / hr.width;
    const cy = (gr.top + (gr.height - s.h) + s.h * g.anchor.y - hr.top) / hr.height;
    const asp = hr.width / hr.height;
    center = [cx, cy];
    maxR = Math.max(...[[0, 0], [1, 0], [0, 1], [1, 1]].map(([x, y]) => Math.hypot((x - cx) * asp, y - cy)));

    const dpr = renderer.kind === 'webgl' ? Math.min(window.devicePixelRatio || 1, 2) : 1;
    let w = Math.round(hr.width * dpr), h = Math.round(hr.height * dpr);
    const MAX_PIXELS = 3.6e6;
    if (w * h > MAX_PIXELS) {
      const k = Math.sqrt(MAX_PIXELS / (w * h));
      w = Math.round(w * k);
      h = Math.round(h * k);
    }
    // تغيير حجم الـ canvas يمسحه، فلا نغيّره إلا إذا تغيّر فعلاً
    const key = `${renderer.kind}:${w}x${h}`;
    if (key !== canvasKey) {
      canvasKey = key;
      renderer.resize(w, h);
    }
  }

  // ---------- الحلقة ----------
  let index = 0;
  let current = null;
  let transition = null;
  let busy = false;
  let visible = true;

  // حركة "كين بيرنز" بطيئة للصور الثابتة (الفيديو يتحرك وحده)
  const kb = (src, t) => (src.isVideo ? 1 : 1.05 + 0.035 * Math.sin(t * 0.16 + (src.phase || 0)));

  function frame(now) {
    requestAnimationFrame(frame);
    let p = 0;
    if (transition) {
      const raw = Math.min(1, (now - transition.start) / T.bg);
      if (raw >= 1) finish();
      else p = inOutCubic(raw);
    }
    if (!visible || !current) return;
    const t = now / 1000, to = transition ? transition.src : null;
    renderer.render({
      from: current,
      to,
      progress: p,
      time: t,
      center,
      maxR,
      fromMag: kb(current, t) * lerp(1, 1.18, p),
      toMag: to ? kb(to, t) * lerp(1.4, 1, p) : 1,
      lens: reduce ? 0 : 0.6,
      edge: 0.22,
      wobble: 0.08,
      glow: cfg.glow || 0
    });
  }

  function finish() {
    const old = current;
    current = transition.src;
    transition = null;
    if (old && old !== current && old.isVideo) old.el.pause();
    const tmp = gateCur;
    gateCur = gateNext;
    gateNext = tmp;
    measure();
    busy = false;
    hero.classList.remove('is-busy');
  }

  async function goTo(i) {
    i = (i + slides.length) % slides.length;
    if (busy || i === index || !current) return;
    busy = true;
    hero.classList.add('is-busy');

    const [src] = await Promise.all([source(i), setGate(gateNext, i)]);
    if (src.isVideo) src.el.play().catch(() => {});
    measure([gateCur, gateNext]);

    index = i;
    updateNav(i);
    transition = { src, start: performance.now() };
    gateOut(gateCur);
    gateIn(gateNext, T.gateInDelay);
    swapText(i);
    source((i + 1) % slides.length); // تحميل مسبق للتالي
  }

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  // ---------- التفاعل ----------
  let suppressClick = false;
  gateBtn.addEventListener('click', () => {
    if (suppressClick) return;
    next();
  });

  const isRTL = () => getComputedStyle(hero).direction === 'rtl';

  document.addEventListener('keydown', e => {
    if (!visible || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.target.closest && e.target.closest('input, textarea, select, [contenteditable]')) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); isRTL() ? next() : prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); isRTL() ? prev() : next(); }
  });

  let start = null;
  hero.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse') return;
    start = { x: e.clientX, y: e.clientY };
  });
  hero.addEventListener('pointerup', e => {
    if (!start) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    start = null;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    suppressClick = true;
    setTimeout(() => { suppressClick = false; }, 350);
    // في RTL: السحب نحو اليمين = التالي
    (dx > 0) === isRTL() ? next() : prev();
  });
  hero.addEventListener('pointercancel', () => { start = null; });

  function buildBullets() {
    ui.bullets.innerHTML = '';
    bullets = slides.map((s, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'bullet';
      b.setAttribute('aria-label', s.name);
      b.addEventListener('click', () => goTo(i));
      ui.bullets.appendChild(b);
      return b;
    });
    ui.total.textContent = '/' + pad(slides.length);
  }

  let measureQueued = false;
  new ResizeObserver(() => {
    if (measureQueued) return;
    measureQueued = true;
    requestAnimationFrame(() => { measureQueued = false; measure(); });
  }).observe(hero);

  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (current && current.isVideo) visible ? current.el.play().catch(() => {}) : current.el.pause();
  }).observe(hero);

  // ---------- البداية ----------
  async function init() {
    buildBullets();
    fill(0);
    updateNav(0);
    const [src] = await Promise.all([source(0), setGate(gateCur, 0)]);
    current = src;
    if (src.isVideo) src.el.play().catch(() => {});
    measure();
    hero.classList.add('is-ready');

    gateIn(gateCur, reduce ? 0 : 600);
    textIn(300);
    ui.arrow.animate([
      { transform: `scale(${reduce ? 1 : 0})`, opacity: 0, filter: 'blur(10px)' },
      { transform: 'scale(1)', opacity: 1, filter: 'blur(0px)' }
    ], { duration: 1000, delay: 500, easing: EASE.out3, fill: 'both' });

    source(1);
    requestAnimationFrame(frame);
  }

  DG.slider = { goTo, next, prev, get index() { return index; } };
  init();
})();

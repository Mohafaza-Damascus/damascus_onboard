(function () {
  const inPages =
    location.pathname.includes("/pages/") ||
    document.currentScript?.src?.includes("/pages/");

  const base = inPages ? "../" : "";
  const pagesPrefix = inPages ? "" : "pages/";

  /* ═══════════════════════════════════════
     1. RENDER HEADER
     ═══════════════════════════════════════ */
  function renderHeader() {
    const el = document.getElementById("site-header");
    if (!el) return;

    const activePage = el.dataset.active || "";

    const navItems = [
      { label: "الرئيسية", href: `${base}index.html` },
      { label: "الأخبار", href: `${pagesPrefix}news.html` },
      { label: "النظرة الثقافية", href: `${pagesPrefix}Cultural.html` },
      { label: "خدمات", href: `${pagesPrefix}services.html` },
      { label: "دليل دمشق", href: `${pagesPrefix}Directorates.html` },
      { label: "الاستثمارات", href: `${pagesPrefix}Investments.html` },
      { label: "المشاريع", href: `${pagesPrefix}projects.html` },
    ];

    const navLinks = navItems
      .map(
        (item) =>
          `<li><a class="nav__link${item.label === activePage ? " is-active" : ""}" href="${item.href}">${item.label}</a></li>`,
      )
      .join("");

    el.outerHTML = `
    <header class="header">
      <div class="container">
        <div class="topbar"><span class="topbar__date" id="today"></span></div>
        <div class="header__bar">
          <a href="${base}index.html" class="logo" aria-label="محافظة دمشق">
            <img src="${base}images/logo.png" alt="شعار محافظة دمشق" />
          </a>
          <button class="burger" id="burger" aria-label="القائمة" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
          <nav class="nav" id="nav">
            <ul class="nav__list">${navLinks}</ul>
            <div class="nav__actions">
              <a href="#" class="btn-login" id="openAuth">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                </svg>
                <span>تسجيل الدخول</span>
              </a>
              <a href="${pagesPrefix}contact.html" class="btn-contact" aria-label="تواصل معنا">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.25a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68a2 2 0 0 1 1.72 2.04z"/>
                </svg>
              </a>
              <button class="btn-lang" id="langBtn" aria-label="تغيير اللغة">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <ellipse cx="12" cy="12" rx="4" ry="10"/>
                  <path d="M2 12h20"/>
                  <path d="M4.5 7h15"/>
                  <path d="M4.5 17h15"/>
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>`;
  }

  /* ═══════════════════════════════════════
     2. RENDER FOOTER
     ═══════════════════════════════════════ */
  function renderFooter() {
    const el = document.getElementById("site-footer");
    if (!el) return;

    el.outerHTML = `
    <footer class="footer pattern">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <img class="footer__logo" src="${base}images/footer_logo.png" alt="محافظة دمشق" />
            <p class="footer__about">تسعى محافظة دمشق إلى الارتقاء بجودة الخدمات المقدمة للمواطنين وتلبية تطلعاتهم، مستندة إلى معايير السرعة، والكفاءة، والمصداقية في الإنجاز.</p>
          </div>
          <nav class="footer__col">
            <h3 class="footer__title">روابط مهمة</h3>
            <ul class="footer__list">
              <li><a href="${pagesPrefix}news.html">الأخبار</a></li>
              <li><a href="${pagesPrefix}projects.html">المشاريع</a></li>
              <li><a href="${pagesPrefix}services.html">خدمات</a></li>
              <li><a href="${pagesPrefix}Directorates.html">دليل دمشق</a></li>
              <li><a href="#">دليل مواقع الجهات الحكومية</a></li>
            </ul>
          </nav>
          <nav class="footer__col">
            <h3 class="footer__title">خدمات المواطنين</h3>
            <ul class="footer__list">
              <li><a href="${pagesPrefix}services.html">الخدمات</a></li>
              <li><a href="${pagesPrefix}contact.html">تواصل معنا</a></li>
            </ul>
          </nav>
          <div class="footer__col">
            <h3 class="footer__title">تابعنا:</h3>
            <ul class="socials">
              <li><a href="#" class="social" aria-label="انستغرام"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg></a></li>
              <li><a href="#" class="social" aria-label="فيسبوك"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z"/></svg></a></li>
              <li><a href="#" class="social" aria-label="تويتر"><svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.9c-.7.3-1.5.5-2.4.6.9-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4.1 4.1 0 0 0-7 3.7A11.6 11.6 0 0 1 3.4 4.6a4.1 4.1 0 0 0 1.3 5.5c-.7 0-1.3-.2-1.9-.5a4.1 4.1 0 0 0 3.3 4c-.6.2-1.2.2-1.8.1a4.1 4.1 0 0 0 3.8 2.9A8.2 8.2 0 0 1 2 18.3a11.6 11.6 0 0 0 6.3 1.8c7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2z"/></svg></a></li>
            </ul>
          </div>
        </div>
        <div class="footer__bottom">
          <p class="footer__copy">جميع الحقوق محفوظة - محافظة دمشق © 2026</p>
          <ul class="footer__legal">
            <li><a href="#">الشروط والأحكام</a></li>
            <li><a href="#">سياسة الخصوصية</a></li>
          </ul>
        </div>
      </div>
    </footer>
    <button class="a11y-btn" aria-label="إمكانية الوصول">
      <img src="${base}images/Standing Man.png" alt="" />
    </button>`;
  }

  /* ═══════════════════════════════════════
     3. RENDER AUTH MODALS
     ═══════════════════════════════════════ */
  function renderModals() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = `

    <!-- ── Welcome / Login / Register overlay ── -->
    <div class="auth-overlay" id="authOverlay">

      <!-- WELCOME VIEW -->
      <div class="auth-modal" id="authWelcome">
        <button class="auth-modal__close" data-close>&times;</button>
        <div class="auth-modal__content">
          <h2 class="auth-modal__title">مرحباً بك في<br>بوابة محافظة دمشق</h2>
          <div class="auth-modal__actions">
            <button class="auth-btn auth-btn--primary" id="goLogin">تسجيل الدخول</button>
            <button class="auth-btn auth-btn--outline" id="goRegister">إنشاء حساب جديد</button>
          </div>
        </div>
        <div class="auth-modal__brand">
          <img src="${base}images/logo.png" alt="محافظة دمشق" />
          <span>محافظة دمشق</span>
        </div>
      </div>

      <!-- LOGIN FORM VIEW -->
      <div class="auth-modal" id="authLogin" style="display:none">
        <button class="auth-modal__close" data-close>&times;</button>
        <div class="auth-modal__content">
          <h2 class="auth-modal__title">تسجيل الدخول</h2>
          <form class="auth-form" onsubmit="return false">
            <div class="auth-field">
              <label>البريد الإلكتروني</label>
              <input type="email" placeholder="أدخل بريدك الإلكتروني" required />
            </div>
            <div class="auth-field">
              <label>كلمة المرور</label>
              <input type="password" placeholder="أدخل كلمة المرور" required />
            </div>
            <a href="#" class="auth-forgot">نسيت كلمة المرور؟</a>
            <button type="submit" class="auth-btn auth-btn--primary">دخول</button>
          </form>
          <p style="text-align:center;margin-top:16px;font-size:13px;color:var(--muted)">
            ليس لديك حساب؟
            <a href="#" id="goRegister2" style="color:var(--teal-600);font-weight:600">إنشاء حساب</a>
          </p>
        </div>
        <div class="auth-modal__brand">
          <img src="${base}images/logo.png" alt="محافظة دمشق" />
          <span>محافظة دمشق</span>
        </div>
      </div>

      <!-- REGISTER FORM VIEW -->
      <div class="auth-modal auth-modal--register" id="authRegister" style="display:none">
        <button class="auth-modal__close" data-close>&times;</button>
        <div class="auth-modal__content">
          <h2 class="auth-modal__title">إنشاء حساب جديد</h2>
          <p class="auth-modal__subtitle">أدخل بياناتك لإنشاء حساب في بوابة محافظة دمشق</p>
          <form class="auth-form auth-form--grid" onsubmit="return false">
            <div class="auth-field">
              <label>الاسم الأول <span class="req">*</span></label>
              <input type="text" required />
            </div>
            <div class="auth-field">
              <label>الاسم الأخير <span class="req">*</span></label>
              <input type="text" required />
            </div>
            <div class="auth-field">
              <label>البريد الإلكتروني <span class="req">*</span></label>
              <input type="email" required />
            </div>
            <div class="auth-field">
              <label>رقم الهاتف <span class="req">*</span></label>
              <input type="tel" required />
            </div>
            <div class="auth-field auth-field-full">
              <label>الصفة <span class="req">*</span></label>
              <div class="role-selector">
                <button type="button" class="role-pill">مواطن</button>
                <button type="button" class="role-pill">موظف حكومي</button>
                <button type="button" class="role-pill">مستثمر</button>
                <button type="button" class="role-pill">إعلامي</button>
              </div>
            </div>
            <div class="auth-field">
              <label>كلمة المرور <span class="req">*</span></label>
              <input type="password" required />
            </div>
            <div class="auth-field">
              <label>تأكيد كلمة المرور <span class="req">*</span></label>
              <input type="password" required />
            </div>
            <div class="auth-field auth-field-full">
              <label>المنطقة</label>
              <button type="button" class="auth-btn--location">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                تحديد الموقع تلقائياً
              </button>
            </div>
            <button type="submit" class="auth-btn auth-btn--primary auth-btn--submit">إنشاء الحساب</button>
          </form>
          <p style="text-align:center;margin-top:16px;font-size:13px;color:var(--muted)">
            لديك حساب؟
            <a href="#" id="goLogin2" style="color:var(--teal-600);font-weight:600">تسجيل الدخول</a>
          </p>
        </div>
        <div class="auth-modal__brand">
          <img src="${base}images/logo.png" alt="محافظة دمشق" />
          <span>محافظة دمشق</span>
        </div>
      </div>

    </div>`;

    document.body.appendChild(wrapper.firstElementChild);
  }

  /* ═══════════════════════════════════════
     4. RENDER ALL, THEN INIT
     ═══════════════════════════════════════ */
  renderHeader();
  renderFooter();
  renderModals();

  /* ─── Today's date ─── */
  const todayEl = document.getElementById("today");
  if (todayEl) {
    todayEl.textContent = new Date().toLocaleDateString("ar-SY", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  /* ─── Burger menu ─── */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", String(open));
    });

    document.addEventListener("click", (e) => {
      if (!nav.contains(e.target) && !burger.contains(e.target)) {
        nav.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ─── Sticky header + height var ─── */
  const header = document.querySelector(".header");

  const setHeaderHeight = () => {
    if (!header) return;
    document.documentElement.style.setProperty(
      "--header-h",
      header.offsetHeight + "px"
    );
  };

  setHeaderHeight();
  window.addEventListener("resize", setHeaderHeight);
  window.addEventListener("load", setHeaderHeight);

  if (header) {
    let lastY = window.scrollY;
    const SCROLL_THRESHOLD = 60;

    const onScroll = () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", y > 20);

      if (y > SCROLL_THRESHOLD) {
        header.classList.toggle("is-hidden", y > lastY);
      } else {
        header.classList.remove("is-hidden");
      }

      lastY = y;
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ─── Stat counters ─── */
  const counters = document.querySelectorAll(".stat__value");

  const animate = (el) => {
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

    requestAnimationFrame(tick);
  };

  if (counters.length) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    counters.forEach((el) => io.observe(el));
  }

  /* ═══════════════════════════════════════
     5. AUTH MODAL LOGIC
     ═══════════════════════════════════════ */
  const authOverlay = document.getElementById("authOverlay");
  const authWelcome = document.getElementById("authWelcome");
  const authLogin = document.getElementById("authLogin");
  const authRegister = document.getElementById("authRegister");

  function showView(view) {
    [authWelcome, authLogin, authRegister].forEach((v) => {
      if (v) v.style.display = "none";
    });
    if (view) view.style.display = "";
  }

  function openAuth(view) {
    showView(view || authWelcome);
    if (authOverlay) authOverlay.classList.add("is-visible");
  }

  function closeAuth() {
    if (authOverlay) authOverlay.classList.remove("is-visible");
    setTimeout(() => showView(authWelcome), 300);
  }

  /* Open from navbar */
  const openAuthBtn = document.getElementById("openAuth");
  if (openAuthBtn) {
    openAuthBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openAuth();
    });
  }

  /* Switch views */
  const goLogin = document.getElementById("goLogin");
  const goLogin2 = document.getElementById("goLogin2");
  const goRegister = document.getElementById("goRegister");
  const goRegister2 = document.getElementById("goRegister2");

  if (goLogin) goLogin.addEventListener("click", () => showView(authLogin));
  if (goLogin2) goLogin2.addEventListener("click", (e) => { e.preventDefault(); showView(authLogin); });
  if (goRegister) goRegister.addEventListener("click", () => showView(authRegister));
  if (goRegister2) goRegister2.addEventListener("click", (e) => { e.preventDefault(); showView(authRegister); });

  /* Close buttons */
  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", closeAuth);
  });

  /* Click backdrop */
  if (authOverlay) {
    authOverlay.addEventListener("click", (e) => {
      if (e.target === authOverlay) closeAuth();
    });
  }

  /* ESC key */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeAuth();
  });

  /* Role pills toggle */
  document.querySelectorAll(".role-selector").forEach((selector) => {
    selector.addEventListener("click", (e) => {
      const pill = e.target.closest(".role-pill");
      if (!pill) return;
      selector.querySelectorAll(".role-pill").forEach((p) => p.classList.remove("is-active"));
      pill.classList.add("is-active");
    });
  });
})();

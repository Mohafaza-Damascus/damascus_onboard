const todayEl = document.getElementById('today');
if (todayEl) {
  todayEl.textContent = new Date().toLocaleDateString('ar-SY', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
  });

  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove('is-open');
      burger.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
}

const header = document.querySelector('.header');
const setHeaderHeight = () => {
  if (!header) return;
  document.documentElement.style.setProperty(
    '--header-h',
    `${header.offsetHeight}px`
  );
};

setHeaderHeight();
window.addEventListener('resize', setHeaderHeight);
window.addEventListener('load', setHeaderHeight);  
if (header) {
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 20);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

const counters = document.querySelectorAll('.stat__value');

const animate = (el) => {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const duration = 1400;
  const start = performance.now();

  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const value = (target * eased).toFixed(decimals);

    el.textContent = Number(value).toLocaleString('ar-SY') + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const io = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animate(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

counters.forEach((el) => io.observe(el));
/* ==================================================
   index.js - الصفحة الرئيسية
================================================== */

// ── تدوير الفيديوهات ──
(function () {
  const video = document.getElementById("heroVideo");
  if (!video) return;

  // ضيف مسارات الفيديوهات هون
  const sources = [
    "assets/new_mohafez.mp4",
    // "assets/video2.mp4",
    // "assets/video3.mp4",
  ];

  let current = 0;

  // لمن ينتهي فيديو، حمّل التالي
  video.addEventListener("ended", () => {
    current = (current + 1) % sources.length;
    video.src = sources[current];
    video.play();
  });

  // إذا فيه أكتر من فيديو، شيل الـ loop
  if (sources.length > 1) {
    video.removeAttribute("loop");
  }
})();

// ── عدادات الإحصائيات ──
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

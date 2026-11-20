(() => {
  const list = window.DM_LANDMARKS || [];
  if (!list.length) return;

  const $ = (id) => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  let index = list.findIndex((item) => item.id === params.get("id"));
  if (index < 0) index = 0;
  const item = list[index];

if (item.group === "damascus-gates") {
    const backLink = document.querySelector(".lm__back");

    if (backLink) {
        backLink.href = "Cultural-model-5.html#damascus-gates";

        const labelNode = Array.from(backLink.childNodes).find(
            (node) =>
                node.nodeType === Node.TEXT_NODE &&
                node.textContent.trim()
        );

        if (labelNode) {
            labelNode.textContent = "\n      العودة \n    ";
        }
    }
}
  const svg = (d) =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const ICONS = {
    date: svg('<rect x="3" y="4" width="18" height="17" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>'),
    kind: svg('<path d="M3 21h18M5 21v-9M9.5 21v-9M14.5 21v-9M19 21v-9M2 10l10-7 10 7z"/>'),
    star: svg('<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5-4.8-4.6 6.6-.9z"/>'),
    visit: svg('<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>'),
  };
  const iconFor = (label) =>
    /الحقبة|تاريخ|افتتاح/.test(label)
      ? ICONS.date
      : /الطابع/.test(label)
        ? ICONS.kind
        : /أبرز/.test(label)
          ? ICONS.star
          : ICONS.visit;

  document.title = `${item.name} | ذاكرة المكان`;
  $("lmImage").src = item.image;
  $("lmImage").alt = item.alt || item.name;
  $("lmType").textContent = item.type;
  $("lmName").textContent = item.name;
  $("lmIntro").textContent = item.intro;
  $("lmDesc").textContent = item.description;

  $("lmFacts").innerHTML = item.facts
    .map(
      (fact) => `
        <div>
            <dt>${iconFor(fact.label)}<span>${fact.label}</span></dt>
            <dd>${fact.value}</dd>
        </div>`,
    )
    .join("");

  $("lmStory").innerHTML = (item.story || []).map((p) => `<p>${p}</p>`).join("");

  const photos = item.gallery || [];
  const main = $("lmMain");
  const track = $("lmTrack");
  const thumbs = $("lmThumbs");
  const THUMB = 35,
    THUMB_FULL = 120,
    GAP = 2,
    MARGIN = 2;
  const rtl = getComputedStyle(main).direction === "rtl";
  const dir = rtl ? 1 : -1;
  let current = 0;

  if (!photos.length) $("lmCarousel").closest("section").hidden = true;

  track.innerHTML = photos
    .map(
      (photo, i) => `
        <div class="lm-carousel__slide"><img src="${photo.src}" alt="${item.name} — صورة ${i + 1}" draggable="false"></div>`,
    )
    .join("");
  thumbs.innerHTML = `<div class="lm-carousel__strip">${photos
    .map(
      (photo, i) => `
        <button class="lm-carousel__thumb" type="button" data-photo="${i}" aria-label="الصورة ${i + 1} من ${photos.length}">
            <img src="${photo.src}" alt="" draggable="false">
        </button>`,
    )
    .join("")}</div>`;
  const thumbButtons = Array.from(thumbs.querySelectorAll("[data-photo]"));

  function place(offset = 0) {
    track.style.transform = `translateX(${dir * current * main.offsetWidth + offset}px)`;
  }

  function setPhoto(i) {
    if (!photos.length) return;
    current = Math.max(0, Math.min(photos.length - 1, i));
    place();
    $("lmCount").textContent = `${current + 1} / ${photos.length}`;
    $("lmPrevPhoto").disabled = current === 0;
    $("lmNextPhoto").disabled = current === photos.length - 1;
    thumbButtons.forEach((btn, k) => {
      btn.classList.toggle("is-active", k === current);
      btn.setAttribute("aria-current", String(k === current));
    });
    $("lmCredit").textContent = photos[current].credit
    ? `مصدر الصورة: ${photos[current].credit}`
    : "";
    const left = current * (THUMB + GAP) + MARGIN - (thumbs.offsetWidth / 2 - THUMB_FULL / 2);
    thumbs.scrollTo({ left: rtl ? -left : left, behavior: "smooth" });
  }

  let dragging = false,
    startX = 0,
    lastX = 0,
    lastT = 0,
    velocity = 0;
  main.addEventListener("pointerdown", (e) => {
    if (e.target.closest("button")) return;
    dragging = true;
    startX = lastX = e.clientX;
    lastT = performance.now();
    velocity = 0;
    track.classList.add("is-dragging");
    main.setPointerCapture(e.pointerId);
  });
  main.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const now = performance.now();
    velocity = ((e.clientX - lastX) / Math.max(1, now - lastT)) * 1000;
    lastX = e.clientX;
    lastT = now;
    let dx = e.clientX - startX;
    const forward = dx * dir;
    if ((current === 0 && forward < 0) || (current === photos.length - 1 && forward > 0)) dx *= 0.2;
    place(dx);
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    track.classList.remove("is-dragging");
    if (performance.now() - lastT > 120) velocity = 0;
    const forward = (lastX - startX) * dir;
    const v = velocity * dir;
    let next = current;
    if (Math.abs(v) > 500) next += v > 0 ? 1 : -1;
    else if (Math.abs(forward) > main.offsetWidth * 0.3) next += forward > 0 ? 1 : -1;
    setPhoto(next);
  };
  main.addEventListener("pointerup", endDrag);
  main.addEventListener("pointercancel", endDrag);

  const AUTO = 2000;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let autoTimer = 0,
    onScreen = true;

  function autoplay() {
    clearInterval(autoTimer);
    autoTimer = 0;
    if (reduceMotion || photos.length < 2 || dragging || !onScreen || document.hidden) return;
    autoTimer = setInterval(() => setPhoto(current === photos.length - 1 ? 0 : current + 1), AUTO);
  }

  main.addEventListener("pointerdown", () => clearInterval(autoTimer));
  main.addEventListener("pointerup", autoplay);
  document.addEventListener("visibilitychange", autoplay);
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      autoplay();
    }).observe(main);
  }

  $("lmPrevPhoto").addEventListener("click", () => {
    setPhoto(current - 1);
    autoplay();
  });
  $("lmNextPhoto").addEventListener("click", () => {
    setPhoto(current + 1);
    autoplay();
  });
  thumbs.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-photo]");
    if (btn) {
      setPhoto(Number(btn.dataset.photo));
      autoplay();
    }
  });
  window.addEventListener("resize", () => place());
  setPhoto(0);
  autoplay();

const navigationList =
    item.group === "damascus-gates"
        ? list.filter((entry) => entry.group === "damascus-gates")
        : list;

const navigationIndex = navigationList.findIndex(
    (entry) => entry.id === item.id
);

const prev =
    navigationList[
        (navigationIndex - 1 + navigationList.length) %
        navigationList.length
    ];

const next =
    navigationList[
        (navigationIndex + 1) % navigationList.length
    ];

$("lmPrev").href = `landmark.html?id=${prev.id}`;
$("lmPrevName").textContent = prev.name;

$("lmNext").href = `landmark.html?id=${next.id}`;
$("lmNextName").textContent = next.name;
})();

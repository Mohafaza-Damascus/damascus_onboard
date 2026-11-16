document.addEventListener("DOMContentLoaded", () => {
  (() => {
    const section = document.querySelector("#damascus-names.dm-tunnel");
    if (!section) return;

    const title = section.querySelector(".dm-tunnel__title");
    const cards = Array.from(section.querySelectorAll(".dm-tunnel__card"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = cards.length;

    const layout = cards.map((_, i) => {
      const a = i * 137.5 * (Math.PI / 180);
      return {
        cos: Math.cos(a),
        sin: Math.sin(a),
        rx: 0.4 + (i % 3) * 0.08,
        ry: 0.36 + (i % 2) * 0.08,
        rot: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
      };
    });

    const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
    const lerp = (a, b, t) => a + (b - a) * t;

    const map = (v, xs, ys) => {
      if (v <= xs[0]) return ys[0];
      for (let k = 1; k < xs.length; k++) {
        if (v <= xs[k]) return lerp(ys[k - 1], ys[k], (v - xs[k - 1]) / (xs[k] - xs[k - 1]));
      }
      return ys[ys.length - 1];
    };

    const DURATION = 5500;
    const NUDGE = 0.22;
    let shown = 0,
      elapsed = 0,
      last = 0;
    let px = 0,
      py = 0,
      pxT = 0,
      pyT = 0;
    let visible = false,
      raf = 0,
      playing = false,
      nudged = false;

    function draw() {
      const w = window.innerWidth,
        h = window.innerHeight;
      const mobile = w < 768;
      const farZ = mobile ? -1200 : -1700,
        nearZ = mobile ? 350 : 500;
      const pan = mobile ? 20 : 45;
      const span = 0.55;

      cards.forEach((card, i) => {
        const L = layout[i];
        const start = (i / total) * (1 - span);
        const local = clamp((shown - start) / span);
        const z = lerp(farZ, nearZ, local);
        const x = L.cos * w * L.rx - px * pan;
        const y = L.sin * h * L.ry - py * pan;
        card.style.opacity = map(local, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]).toFixed(3);
        card.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), ${z}px) rotateZ(${L.rot}deg)`;
      });

      title.style.transform = `scale(${map(shown, [0, 0.4], [0.7, 1])})`;
      title.style.opacity = map(shown, [0, 0.12], [0.25, 1]);
    }

    function nudge() {
      if (nudged) return;
      nudged = true;
      if (window.scrollY > 40 || !visible) return;
      window.scrollBy({ top: Math.round(window.innerHeight * NUDGE), behavior: "smooth" });
    }

    function frame(now) {
      raf = 0;
      if (last) elapsed += Math.min(now - last, 100);
      last = now;
      shown = clamp(elapsed / DURATION);
      px = lerp(px, pxT, 0.08);
      py = lerp(py, pyT, 0.08);
      draw();
      if (shown >= 1) {
        playing = false;
        nudge();
        return;
      }
      if (visible && !document.hidden) raf = requestAnimationFrame(frame);
    }

    function play() {
      if (raf || !visible || document.hidden) return;
      if (!playing) {
        playing = true;
        elapsed = 0;
      }
      last = 0;
      raf = requestAnimationFrame(frame);
    }

    if (!reduce) {
      window.addEventListener(
        "pointermove",
        (e) => {
          pxT = (e.clientX / window.innerWidth - 0.5) * 2;
          pyT = (e.clientY / window.innerHeight - 0.5) * 2;
        },
        { passive: true },
      );
      window.addEventListener("resize", draw);
      document.addEventListener("visibilitychange", () => {
        if (playing) play();
      });

      if ("IntersectionObserver" in window) {
        new IntersectionObserver(
          (entries) => {
            visible = entries.some((en) => en.isIntersecting);
            if (visible) play();
          },
          { threshold: 0.6 },
        ).observe(section);
      } else {
        visible = true;
        play();
      }
      draw();
    } else {
      shown = 0.45;
      draw();
    }
  })();

  const timelineRoot = document.querySelector("[data-timeline]");
  if (timelineRoot) {
    const data = [
      {
        id: "aramean",
        date: "الألف الأول ق.م",
        period: "الألف الأول ق.م",
        title: "دمشق الآرامية",
        description: "في الألف الأول قبل الميلاد صارت دمشق عاصمة لمملكة آرامية قوية.",
        image: "../assets/era-aramean.jpg",
        link: "era.html?id=aramean",
      },
      {
        id: "hellenistic",
        date: "333 – 64 ق.م",
        period: "333 – 64 ق.م",
        title: "الحقبة الهلنستية",
        description: "بعد فتوحات الإسكندر المقدوني دخلت دمشق العالم الإغريقي.",
        image: "../assets/era-hellenistic.jpg",
        link: "era.html?id=hellenistic",
      },
      {
        id: "roman",
        date: "64 ق.م – 395م",
        period: "64 ق.م – 395م",
        title: "العهد الروماني",
        description: "في العهد الروماني ازدهرت دمشق وشُقّ الشارع المستقيم.",
        image: "../assets/era-roman.jpg",
        link: "era.html?id=roman",
      },
      {
        id: "byzantine",
        date: "395 – 634م",
        period: "395 – 634م",
        title: "العهد البيزنطي",
        description: "صارت دمشق مركزاً مسيحياً مهماً وتحوّل معبدها إلى كنيسة.",
        image: "../assets/era-byzantine.jpg",
        link: "era.html?id=byzantine",
      },
      {
        id: "umayyad",
        date: "661 – 750م",
        period: "661 – 750م",
        title: "الدولة الأموية",
        description: "صارت دمشق عاصمة لأكبر دولة وبُني الجامع الأموي.",
        image: "../assets/era-umayyad.jpg",
        link: "era.html?id=umayyad",
      },
      {
        id: "abbasid-fatimid",
        date: "750 – 1154م",
        period: "750 – 1154م",
        title: "العباسيون والفاطميون",
        description: "صارت دمشق ولاية تتنازعها الدول العباسية والفاطمية والسلاجقة.",
        image: "../assets/era-abbasid-fatimid.jpg",
        link: "era.html?id=abbasid-fatimid",
      },
      {
        id: "ayyubid",
        date: "1154 – 1260م",
        period: "1154 – 1260م",
        title: "الزنكيون والأيوبيون",
        description: "عادت دمشق مركزاً للحكم مع نور الدين زنكي وصلاح الدين.",
        image: "../assets/era-ayyubid.jpg",
        link: "era.html?id=ayyubid",
      },
      {
        id: "mamluk",
        date: "1260 – 1516م",
        period: "1260 – 1516م",
        title: "السلطنة المملوكية",
        description: "ازدهرت المدارس والحمّامات والأسواق في عهد المماليك.",
        image: "../assets/era-mamluk.jpg",
        link: "era.html?id=mamluk",
      },
      {
        id: "ottoman",
        date: "1516 – 1918م",
        period: "1516 – 1918م",
        title: "العهد العثماني",
        description: "محطة كبرى لقوافل الحج وبُنيت فيها التكايا والخانات.",
        image: "../assets/era-ottoman.jpg",
        link: "era.html?id=ottoman",
      },
      {
        id: "independence",
        date: "1918 – 1970م",
        period: "1918 – 1970م",
        title: "الحكومة العربية والاستقلال",
        description: "أول حكومة عربية في دمشق، ثم الانتداب الفرنسي وميسلون والثورة الكبرى، حتى الجلاء عام 1946.",
        image: "../assets/damascus-independence.jfif",
        link: "era.html?id=independence",
      },
      {
        id: "assad-regime",
        date: "1970 – 2011م",
        period: "1970 – 2011م",
        title: "انقلاب الأسد على الحكم",
        description: "انقلاب حافظ الأسد عام 1970 وعقود من القمع والمجازر وتوريث الحكم لابنه.",
        image: "../assets/damascus-today.jfif",
        link: "era.html?id=assad-regime",
      },
      {
        id: "revolution",
        date: "2011 – 2024م",
        period: "2011 – 2024م",
        title: "الثورة السورية وانتصارها",
        description: "من مظاهرة سوق الحميدية عام 2011 إلى تحرير دمشق وسقوط النظام في الثامن من كانون الأول 2024.",
        image: "../assets/place-hamidiyah-souk.jpg",
        link: "era.html?id=revolution",
      },
      {
        id: "modern",
        date: "2024م – اليوم",
        period: "2024م – اليوم",
        title: "دمشق الحديثة",
        description: "دمشق الحرة بعد التحرير، ومرحلة جديدة من التعافي وإعادة البناء.",
        image: "../assets/era-modern.jpg",
        link: "era.html?id=modern",
      },
    ];

    timelineRoot.style.setProperty("--timeline-count", data.length);
    const yearsTrack = timelineRoot.querySelector("[data-years-track]");
    const cardsTrack = timelineRoot.querySelector("[data-cards-track]");
    const scene = timelineRoot.querySelector(".damascus-timeline__scene");
    const period = timelineRoot.querySelector("[data-period]");
    const title = timelineRoot.querySelector("[data-title]");
    const description = timelineRoot.querySelector("[data-description]");
    const content = timelineRoot.querySelector(".damascus-timeline__content");
    const more = timelineRoot.querySelector("[data-more]");
    const current = timelineRoot.querySelector("[data-current]");
    const total = timelineRoot.querySelector("[data-total]");
    const previous = timelineRoot.querySelector("[data-prev]");
    const next = timelineRoot.querySelector("[data-next]");

    let active = 0;
    let autoplayTimer = null;
    let dragStartX = 0;
    let isDragging = false;
    let lastDragAt = 0;

    if (total) total.textContent = String(data.length).padStart(2, "0");

    yearsTrack.innerHTML = "";
    data.forEach((item, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "damascus-timeline__year";
      button.innerHTML = `<span>${item.date}</span>`;
      button.addEventListener("click", () => {
        goTo(index);
        resetAutoplay();
      });
      if (yearsTrack) yearsTrack.appendChild(button);
    });

    const buttons = yearsTrack ? [...yearsTrack.children] : [];

    function getCircularOffset(index, activeIdx, length) {
      let diff = activeIdx - index;
      const half = length / 2;
      if (diff > half) diff -= length;
      if (diff <= -half) diff += length;
      return diff;
    }

    function updateCardWidth() {
      if (!scene || !cardsTrack) return;
      const visibleCards = window.innerWidth <= 800 ? 3 : 4;
      const cardWidth = scene.clientWidth / visibleCards;
      cardsTrack.style.setProperty("--timeline-card-width", `${cardWidth}px`);
    }

    function renderCards() {
      if (!scene || !cardsTrack) return;
      updateCardWidth();

      cardsTrack.innerHTML = data
        .map(
          (item, itemIndex) => `
                <article class="damascus-timeline__card" data-card-index="${itemIndex}">
                    <div class="damascus-timeline__card-image">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <div class="damascus-timeline__card-hover-info">
                            <span>${item.period}</span>
                            <strong>${item.title}</strong>
                        </div>
                    </div>
                </article>
            `,
        )
        .join("");

      cardsTrack.querySelectorAll(".damascus-timeline__card").forEach((card) => {
        card.addEventListener("click", () => {
          const index = Number(card.dataset.cardIndex);
          if (Number.isNaN(index) || Date.now() - lastDragAt < 400) return;
          if (index === active) {
            window.location.href = data[index].link || `era.html?id=${data[index].id}`;
            return;
          }
          goTo(index);
          resetAutoplay();
        });
      });
    }

    const yearsLine = timelineRoot.querySelector(".damascus-timeline__years-line");
    function moveYears() {
      const line = yearsLine ? yearsLine.getBoundingClientRect() : null;
      buttons.forEach((button) => {
        let curveOffset = 0;
        if (line && line.width) {
          const rx = line.width / 2,
            ry = line.height / 2;
          const b = button.getBoundingClientRect();
          const dx = b.left + b.width / 2 - (line.left + rx);
          const k = Math.min(1, Math.abs(dx) / rx);
          curveOffset = Math.round(ry * (1 - Math.sqrt(1 - k * k)) + 2);
        }
        button.style.setProperty("--curve-offset", `${curveOffset}px`);
      });
      if (yearsTrack) yearsTrack.style.transform = "translate3d(0, 0, 0)";
    }

    function updateCardSlots() {
      if (!cardsTrack) return;
      updateCardWidth();

      cardsTrack.querySelectorAll(".damascus-timeline__card").forEach((card, index) => {
        card.className = "damascus-timeline__card";
        const offset = getCircularOffset(index, active, data.length);

        const prevOffset = card.dataset.offset === undefined ? offset : Number(card.dataset.offset);
        card.dataset.offset = offset;
        if (Math.abs(offset - prevOffset) > 1) {
          card.style.transition = "none";
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              card.style.transition = "";
            }),
          );
        }

        if (offset === 0) {
          card.classList.add("is-active", "card-slot-2");
        } else if (offset === -2) {
          card.classList.add("card-slot-0");
        } else if (offset === -1) {
          card.classList.add("card-slot-1");
        } else if (offset === 1) {
          card.classList.add("card-slot-3");
        } else if (offset === 2) {
          card.classList.add("card-slot-4");
        } else if (offset < -2) {
          card.classList.add("card-slot-hidden-left");
        } else {
          card.classList.add("card-slot-hidden-right");
        }
      });
    }

    function update(index) {
      active = (index + data.length) % data.length;
      const item = data[active];

      buttons.forEach((button, i) => button.classList.toggle("is-active", i === active));
      if (period) period.textContent = item.period;
      if (title) title.textContent = item.title;
      if (description) description.textContent = item.description;
      if (content) {
        content.classList.remove("is-revealing");
        void content.offsetWidth;
        content.classList.add("is-revealing");
      }
      if (more) more.href = item.link || `era.html?id=${item.id}`;
      if (current) current.textContent = String(active + 1).padStart(2, "0");

      if (previous) previous.disabled = false;
      if (next) next.disabled = false;

      updateCardSlots();
      moveYears();
    }

    function goTo(index) {
      update(index);
    }

    function startAutoplay() {
      if (autoplayTimer) clearInterval(autoplayTimer);
      autoplayTimer = setInterval(() => {
        goTo(active + 1);
      }, 2500);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    if (previous)
      previous.addEventListener("click", () => {
        goTo(active + 1);
        resetAutoplay();
      });
    if (next)
      next.addEventListener("click", () => {
        goTo(active - 1);
        resetAutoplay();
      });

    if (scene) {
      scene.addEventListener("mouseenter", stopAutoplay);
      scene.addEventListener("mouseleave", startAutoplay);

      scene.addEventListener("pointerdown", (event) => {
        stopAutoplay();
        dragStartX = event.clientX;
        isDragging = true;
      });

      scene.addEventListener("pointerup", (event) => {
        if (!isDragging) return;
        const distance = event.clientX - dragStartX;
        isDragging = false;
        if (Math.abs(distance) > 45) {
          lastDragAt = Date.now();
          goTo(active + (distance > 0 ? 1 : -1));
        }
        startAutoplay();
      });

      scene.addEventListener("pointercancel", () => {
        isDragging = false;
        startAutoplay();
      });
    }

    window.addEventListener("resize", () => {
      updateCardSlots();
      moveYears();
    });

    renderCards();
    update(active);
    startAutoplay();
  }

  (() => {
    const section = document.querySelector("#damascus-numbers");
    if (!section) return;

    const cards = section.querySelectorAll(".damascus-number-card");
    const counters = section.querySelectorAll("[data-count]");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const formatNumber = (value) => Math.floor(value).toLocaleString("en-US");

    if (!reducedMotion) {
      cards.forEach((card) => {
        card.addEventListener("pointermove", (event) => {
          const rect = card.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          card.style.setProperty("--mx", `${x}px`);
          card.style.setProperty("--my", `${y}px`);
          card.style.setProperty("--rx", `${((0.5 - y / rect.height) * 7).toFixed(2)}deg`);
          card.style.setProperty("--ry", `${((x / rect.width - 0.5) * 7).toFixed(2)}deg`);
        });
        card.addEventListener("pointerleave", () => {
          card.style.setProperty("--rx", "0deg");
          card.style.setProperty("--ry", "0deg");
        });
      });
    }

    const counterFrames = new WeakMap();

    const animateCounter = (counter, index, replay = false) => {
      if (!replay && counter.dataset.animated === "true") return;

      const previousFrame = counterFrames.get(counter);
      if (previousFrame) {
        cancelAnimationFrame(previousFrame);
      }

      counter.dataset.animated = "true";
      counter.dataset.hovering = "false";

      const target = Number(counter.dataset.count);
      const suffix = counter.dataset.suffix || "";

      const duration = replay ? 1100 : 2400 + index * 200;
      const startTime = performance.now();

      counter.textContent = "0" + suffix;

      const tick = (now) => {
        if (counter.dataset.hovering === "true") {
          counterFrames.delete(counter);
          return;
        }

        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);

        const value = Math.round(target * eased);
        counter.textContent = formatNumber(value) + suffix;

        if (progress < 1) {
          counterFrames.set(counter, requestAnimationFrame(tick));
        } else {
          counter.textContent = formatNumber(target) + suffix;
          counterFrames.delete(counter);
        }
      };

      counterFrames.set(counter, requestAnimationFrame(tick));
    };

    cards.forEach((card, index) => {
      const counter = card.querySelector(".damascus-number-card__count");
      if (!counter) return;

      card.addEventListener("mouseenter", () => {
        counter.dataset.hovering = "true";

        const frame = counterFrames.get(counter);

        if (frame) {
          cancelAnimationFrame(frame);
          counterFrames.delete(counter);
        }
      });

      card.addEventListener("mouseleave", () => {
        counter.dataset.hovering = "false";

        if (counter.dataset.animated === "true") {
          animateCounter(counter, index, true);
        }
      });
    });

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          cards.forEach((card, idx) => setTimeout(() => card.classList.add("is-visible"), idx * 130));
          counters.forEach((cnt, idx) => animateCounter(cnt, idx));
          observer.disconnect();
        },
        { threshold: 0.2 },
      );
      observer.observe(section);
    }
  })();

  (() => {
    const fan = document.querySelector("#placesFan");
    if (!fan) return;

    const section = fan.closest("#damascus-landmarks");
    const dotsWrap = section.querySelector("#placesDots");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const data = window.DM_LANDMARKS || [];
    if (data.length) {
      fan.innerHTML = data
        .map(
          (item, i) => `
                <a class="dm-fan__card" data-index="${i}" href="landmark.html?id=${item.id}" aria-label="${item.name}">
                    <img src="${item.image}" alt="${item.alt || item.name}" loading="lazy" draggable="false">
                    <span class="dm-fan__name">${item.name}</span>
                </a>`,
        )
        .join("");
    }
    const cards = Array.from(fan.querySelectorAll(".dm-fan__card"));
    if (!cards.length) return;

    const total = cards.length;
    const pairCount = Math.ceil(total / 2);

    const HALF = Math.min(3.5, (total - 1) / 2);

    const wrapPair = (p) => ((p % pairCount) + pairCount) % pairCount;

    let current = 0;
    let hovered = null;
    let entered = false;

    const offsetOf = (i) => {
      const pairIdx = Math.floor(i / 2);
      const side = i % 2 === 0 ? -1 : 1;
      const rank = wrapPair(pairIdx - current);
      return side * (rank + 0.5);
    };

    function slotConfig(offset) {
      const distance = Math.abs(offset);

      const d = HALF ? offset / HALF : 0;
      const a = Math.abs(d);

      const maxShift = Math.max(120, fan.clientWidth / 2 - cards[0].offsetWidth * 0.55);

      const centerSpread = Math.min(0.48, (cards[0].offsetWidth * 0.55) / maxShift);

      const progress = Math.max(0, (distance - 0.5) / Math.max(0.001, HALF - 0.5));

      const spread = centerSpread + (1 - centerSpread) * progress;

      return {
        rot: 0,
        scale: 1 - 0.2244 * a * a,
        x: Math.sign(offset) * spread * 30,
        y: 0,
        z: 10 - Math.round(distance),
      };
    }

    function units() {
      const w = fan.clientWidth,
        cw = cards[0].offsetWidth,
        ch = cards[0].offsetHeight;
      return { x: Math.max(4, (w / 2 - cw * 0.55) / 30), y: ch / 30 };
    }

    function place(card, offset, u) {
      if (Math.abs(offset) > HALF) {
        const side = Math.sign(offset);
        card.style.opacity = "0";
        card.style.pointerEvents = "none";
        card.style.transform = `translate(-50%, -50%) translate(${side * 40 * u.x}px, ${7.3 * u.y}px) rotate(0deg) scale(0.5)`;
        card.style.zIndex = "0";
        return;
      }

      const base = slotConfig(offset);
      let { x, y, rot, scale } = base;

      const isHoveredPair =
        hovered !== null && (Math.abs(offset - hovered) < 0.001 || Math.abs(offset + hovered) < 0.001);

      if (hovered !== null && !reducedMotion) {
        if (isHoveredPair) {
          scale *= 1.08;
        } else {
          const target = Math.abs(offset - hovered) <= Math.abs(offset + hovered) ? hovered : -hovered;

          const dist = Math.abs(offset - target);
          const n = HALF ? offset / HALF : 0;

          const push = 8 * (1 - Math.abs(n)) * (1 + 0.2 * Math.max(0, 3 - dist));

          x += offset < target ? -push : push;
        }
      }

      card.style.opacity = "1";
      card.style.pointerEvents = "";
      card.style.transform = `translate(-50%, -50%) translate(${x * u.x}px, ${y * u.y}px) rotate(${rot}deg) scale(${scale})`;
      card.style.zIndex = String(isHoveredPair ? 20 : base.z);
    }

    function render() {
      const u = units();

      cards.forEach((card, i) => {
        const offset = offsetOf(i);
        const pairIdx = Math.floor(i / 2);

        const isActive =
          hovered !== null
            ? Math.abs(offset - hovered) < 0.001 || Math.abs(offset + hovered) < 0.001
            : pairIdx === current;

        card.classList.toggle("is-active", isActive);
        card.tabIndex = isActive ? 0 : -1;

        if (entered) {
          place(card, offset, u);
        }
      });

      dots.forEach((dot, pIdx) => {
        dot.setAttribute("aria-selected", String(pIdx === current));
      });
    }

    function goTo(nextPairIndex) {
      const next = wrapPair(nextPairIndex);
      if (next === current) return;
      if (!entered) enter();
      current = next;
      hovered = null;
      render();
    }

    dotsWrap.innerHTML = "";
    const dots = Array.from({ length: pairCount }, (_, pIdx) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "dm-places__dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `الزوج ${pIdx + 1} من ${pairCount}`);
      dot.addEventListener("click", () => goTo(pIdx));
      dotsWrap.appendChild(dot);
      return dot;
    });

    cards.forEach((card, i) => {
      card.addEventListener("mouseenter", () => {
        if (!entered) return;
        hovered = offsetOf(i);
        render();
      });

      card.addEventListener("click", (e) => {
        const pairIdx = Math.floor(i / 2);
        if (pairIdx !== current) {
          e.preventDefault();
          goTo(pairIdx);
        }
      });
    });

    fan.addEventListener("mouseleave", () => {
      hovered = null;
      render();
    });

    section.querySelector("[data-fan-prev]")?.addEventListener("click", () => goTo(current - 1));
    section.querySelector("[data-fan-next]")?.addEventListener("click", () => goTo(current + 1));

    fan.addEventListener("keydown", (e) => {
      const keys = { ArrowRight: -1, ArrowLeft: 1 };
      if (e.key in keys) {
        e.preventDefault();
        goTo(current + keys[e.key]);
      }
    });

    let touchX = 0;
    fan.addEventListener(
      "touchstart",
      (e) => {
        touchX = e.touches[0].clientX;
      },
      { passive: true },
    );
    fan.addEventListener("touchend", (e) => {
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) goTo(current + (dx < 0 ? 1 : -1));
    });

    window.addEventListener("resize", () => {
      if (entered) render();
    });

    function enter() {
      if (entered) return;
      entered = true;
      const u = units();
      cards.forEach((card, i) => {
        const offset = offsetOf(i);
        card.style.transitionDelay = reducedMotion ? "0s" : `${0.15 + (offset + HALF) * 0.06}s`;
        place(card, offset, u);
      });
      setTimeout(
        () =>
          cards.forEach((card) => {
            card.style.transitionDelay = "";
          }),
        1400,
      );
    }

    render();
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((en) => en.isIntersecting)) {
            enter();
            io.disconnect();
          }
        },
        { threshold: 0.25 },
      );
      io.observe(fan);
    } else {
      enter();
    }
  })();

  (() => {
    const root = document.querySelector("#heritageList");
    const details = document.querySelector("#heritageDetails");
    const list = document.querySelector("#heritageItems");
    const listPanel = root ? root.querySelector(".dmi-list-panel") : null;

    const data = Array.isArray(window.DM_HERITAGE) ? window.DM_HERITAGE : [];
    if (!root || !details || !list || !data.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pad = (number) => String(number).padStart(2, "0");

    const escapeHtml = (value) =>
      String(value ?? "").replace(
        /[&<>"']/g,
        (ch) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[ch],
      );

    let activeIndex = 0;
    let isPaused = false;
    let topPauseTimer = null;
    let bottomPauseTimer = null;
    let scrollRaf = null;

    const TOP_HOLD_MS = 900;
    const BOTTOM_HOLD_MS = 1400;
    const SCROLL_SPEED_PX_PER_SEC = 55;

    const arrowSvg = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6"/>
        </svg>
    `;

    list.innerHTML = data
      .map((item, index) => {
        const items = Array.isArray(item.items) ? item.items : [];
        const unesco = Array.isArray(item.unesco) ? item.unesco : [];
        const meta = [`${items.length} ${items.length === 1 ? "عنصر" : "عناصر"}`, unesco.length ? "اليونسكو" : ""]
          .filter(Boolean)
          .join(" · ");

        return `
            <button
                type="button"
                class="dmi-item"
                id="heritage-item-${index}"
                data-heritage-index="${index}"
                aria-controls="heritageDetails"
                aria-pressed="false"
            >
                <span class="dmi-item__text">
                    <span class="dmi-item__title">${escapeHtml(item.title || "تراث دمشقي")}</span>
                    <span class="dmi-item__meta">${escapeHtml(meta)}</span>
                </span>
                <span class="dmi-item__arrow">${arrowSvg}</span>
            </button>
        `;
      })
      .join("");

    const buttons = Array.from(list.querySelectorAll(".dmi-item"));

    function syncCardHeight() {
      if (!listPanel || window.innerWidth <= 800) {
        root.style.removeProperty("--dmi-matched-height");
        return;
      }
      const h = listPanel.offsetHeight;
      if (h > 0) {
        root.style.setProperty("--dmi-matched-height", `${h}px`);
      }
    }

    function clearCycleTimers() {
      if (topPauseTimer) {
        clearTimeout(topPauseTimer);
        topPauseTimer = null;
      }
      if (bottomPauseTimer) {
        clearTimeout(bottomPauseTimer);
        bottomPauseTimer = null;
      }
      if (scrollRaf) {
        cancelAnimationFrame(scrollRaf);
        scrollRaf = null;
      }
    }

    function renderDetails(index) {
      const item = data[index];
      const items = Array.isArray(item.items) ? item.items : [];
      const professions = Array.isArray(item.professions) ? item.professions : [];
      const unesco = Array.isArray(item.unesco) ? item.unesco : [];
      const image = item.image || "";

      details.innerHTML = `
            <article class="dmi-card" aria-labelledby="heritage-detail-title">
                <div class="dmi-card__visual">
                    ${image ? `<img class="dmi-card__image" src="${escapeHtml(image)}" alt="${escapeHtml(item.title || "")}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}>` : ""}
                    <span class="dmi-card__visual-label">من ذاكرة دمشق وتراثها الحي</span>
                </div>

                <div class="dmi-card__content" data-heritage-viewport>
                    <div class="dmi-card__scroll-inner" data-heritage-inner>
                        <span class="dmi-card__number">${pad(index + 1)} / ${pad(data.length)}</span>
                        <h3 class="dmi-card__title" id="heritage-detail-title">${escapeHtml(item.title || "تراث دمشقي")}</h3>
                        <p class="dmi-card__summary">${escapeHtml(item.summary || "")}</p>

                        ${
                          items.length
                            ? `
                            <div class="dmi-card__section">
                                <h4 class="dmi-card__section-title">أبرز المظاهر</h4>
                                <ul class="dmi-card__chips">
                                    ${items.map((val) => `<li class="dmi-card__chip">${escapeHtml(val)}</li>`).join("")}
                                </ul>
                            </div>
                        `
                            : ""
                        }

                        ${
                          professions.length
                            ? `
                            <div class="dmi-card__professions">
                                <strong>المهن المرتبطة:</strong>
                                ${professions.map(escapeHtml).join("، ")}
                            </div>
                        `
                            : ""
                        }

                        ${
                          unesco.length
                            ? `
                            <div class="dmi-card__unesco">
                                ${unesco.map((val) => `<div class="dmi-card__unesco-item">${escapeHtml(val)}</div>`).join("")}
                            </div>
                        `
                            : ""
                        }
                    </div>
                </div>
            </article>
        `;

      syncCardHeight();
    }

    function startContentCycle() {
      clearCycleTimers();
      if (reducedMotion || isPaused || data.length < 2) return;

      const viewport = details.querySelector("[data-heritage-viewport]");
      const inner = details.querySelector("[data-heritage-inner]");
      if (!viewport || !inner) return;

      inner.style.transform = "translate3d(0, 0, 0)";

      topPauseTimer = setTimeout(() => {
        if (isPaused) return;

        const style = getComputedStyle(viewport);
        const padTop = parseFloat(style.paddingTop) || 0;
        const padBottom = parseFloat(style.paddingBottom) || 0;
        const availableHeight = viewport.clientHeight - padTop - padBottom;
        const totalHeight = inner.scrollHeight;
        const maxShift = Math.max(0, totalHeight - availableHeight);

        if (maxShift <= 4) {
          bottomPauseTimer = setTimeout(() => {
            if (!isPaused) setActive(activeIndex + 1);
          }, BOTTOM_HOLD_MS + 1100);
          return;
        }

        const durationMs = (maxShift / SCROLL_SPEED_PX_PER_SEC) * 1000;
        const startTime = performance.now();

        function stepScroll(now) {
          if (isPaused) return;
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / durationMs, 1);

          const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

          inner.style.transform = `translate3d(0, -${(maxShift * eased).toFixed(1)}px, 0)`;

          if (progress < 1) {
            scrollRaf = requestAnimationFrame(stepScroll);
          } else {
            bottomPauseTimer = setTimeout(() => {
              if (!isPaused) setActive(activeIndex + 1);
            }, BOTTOM_HOLD_MS);
          }
        }

        scrollRaf = requestAnimationFrame(stepScroll);
      }, TOP_HOLD_MS);
    }

    function setActive(index) {
      activeIndex = ((index % data.length) + data.length) % data.length;
      buttons.forEach((button, idx) => {
        const active = idx === activeIndex;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });

      renderDetails(activeIndex);
      startContentCycle();
    }

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => setActive(index));
      button.addEventListener("mouseenter", () => setActive(index));
    });

    root.addEventListener("mouseenter", () => {
      isPaused = true;
      clearCycleTimers();
    });
    root.addEventListener("mouseleave", () => {
      isPaused = false;
      startContentCycle();
    });

    window.addEventListener("resize", () => {
      syncCardHeight();
    });

    setActive(0);
  })();

  (() => {
    const main = document.querySelector(".cultural-model-5");
    if (!main) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(main.children).filter((el) => el.tagName === "SECTION");

    sections.forEach((section, i) => {
      section.classList.add("dm-stack-card");
      section.style.removeProperty("--stack-top");
      section.style.removeProperty("--stack-origin");
      section.style.removeProperty("--stack-z");
      section.style.transform = "";

      if (i === 0 || reduceMotion) {
        section.classList.add("is-in-view");
      }
    });

    if (!reduceMotion && "IntersectionObserver" in window) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.target.id === "damascus-names") return;

            if (entry.isIntersecting) {
              entry.target.classList.add("is-in-view");
            } else {
              entry.target.classList.remove("is-in-view");
            }
          });
        },
        {
          threshold: 0.14,
          rootMargin: "0px 0px -6% 0px",
        },
      );

      sections.forEach((section) => {
        if (section.id !== "damascus-names") {
          sectionObserver.observe(section);
        }
      });
    } else {
      sections.forEach((section) => section.classList.add("is-in-view"));
    }

    const supportsCrossDocVT = CSS.supports("view-transition-name: root");
    if (!reduceMotion && !supportsCrossDocVT) {
      document.body.classList.add("dm-page-entering");

      document.addEventListener("click", (e) => {
        const link = e.target.closest("a[href]");
        if (!link) return;

        const href = link.getAttribute("href");
        if (
          !href ||
          href.startsWith("#") ||
          href.startsWith("javascript:") ||
          link.target === "_blank" ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey
        ) {
          return;
        }

        e.preventDefault();
        document.body.classList.remove("dm-page-entering");
        document.body.classList.add("dm-page-leaving");

        setTimeout(() => {
          window.location.href = link.href;
        }, 360);
      });

      window.addEventListener("pageshow", (e) => {
        if (e.persisted) {
          document.body.classList.remove("dm-page-leaving");
          document.body.classList.add("dm-page-entering");
        }
      });
    }
  })();
});

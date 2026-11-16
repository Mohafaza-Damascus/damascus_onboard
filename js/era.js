(() => {
  const list = window.DM_ERAS || [];
  if (!list.length) return;

  const $ = (id) => document.getElementById(id);
  const params = new URLSearchParams(location.search);
  let index = list.findIndex((era) => era.id === params.get("id"));
  if (index < 0) index = 0;
  const era = list[index];
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.title = `${era.name} | دمشق عبر العصور`;
  $("eraName").textContent = era.name;
  $("eraPeriod").textContent = era.period;
  $("eraImage").src = era.image;
  $("eraImage").alt = era.name;

  const board = $("eraBoard");

  board.insertAdjacentHTML(
    "beforeend",
    era.events
      .map(
        (ev, i) => `
        <article class="era-stop era-stop--${i % 2 === 0 ? "top" : "bottom"}" style="--k: ${i}">
            <span class="era-stop__stem" aria-hidden="true"></span>
            <span class="era-stop__dot" aria-hidden="true"></span>
            <div class="era-stop__text">
                <h3 class="era-stop__year"><span>${ev.year}</span></h3>
                <p class="era-stop__title"><span>${ev.title}</span></p>
                <p class="era-stop__desc"><span>${ev.text}</span></p>
            </div>
        </article>`,
      )
      .join(""),
  );
  board.style.setProperty("--count", era.events.length);

  const prev = list[(index - 1 + list.length) % list.length];
  const next = list[(index + 1) % list.length];
  $("eraPrev").href = `era.html?id=${prev.id}`;
  $("eraPrevName").textContent = prev.name;
  $("eraNext").href = `era.html?id=${next.id}`;
  $("eraNextName").textContent = next.name;

  const section = $("eraJourney");
  const track = $("eraTrack");
  const line = $("eraLine");
  const stops = Array.from(board.querySelectorAll(".era-stop"));
  const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

  let travel = 0;

  function measure() {
    travel = Math.max(0, track.scrollWidth - window.innerWidth);
    section.style.height = `${window.innerHeight + travel * 1.15}px`;
    update();
  }

  function update() {
    const r = section.getBoundingClientRect();
    const span = r.height - window.innerHeight;
    const p = reduce ? 1 : span > 0 ? clamp(-r.top / span) : 1;

    track.style.transform = `translateX(${(getComputedStyle(track).direction === "rtl" ? 1 : -1) * p * travel}px)`;
    line.style.transform = `scaleX(${clamp(p / 0.92)})`;

    const n = stops.length;
    stops.forEach((stop, i) => {
      const start = 0.04 + (i / n) * 0.78;
      const local = clamp((p - start) / 0.16);
      const text = clamp((local - 0.35) / 0.65);
      stop.style.setProperty("--grow", local.toFixed(3));
      stop.style.setProperty("--reveal", text.toFixed(3));
    });
  }

  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", measure);
  window.addEventListener("load", measure);
  if (document.fonts) document.fonts.ready.then(measure);
  $("eraImage").addEventListener("load", measure);
  measure();
})();

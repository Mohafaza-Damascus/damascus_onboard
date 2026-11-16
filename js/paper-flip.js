(function () {
  const MAX = 262;
  const REDUCED = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PHYS = { kT: 520, cT: 38, kB: 260, cB: 11 };

  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const easeInOut = (k) => -(Math.cos(Math.PI * k) - 1) / 2;
  const easeOut = (k) => 1 - Math.pow(1 - k, 3);

  const Sound = (() => {
    const AC = window.AudioContext || window.webkitAudioContext;
    let ctx = null,
      master = null,
      noise = null,
      file = "";
    let on = true;
    try {
      on = localStorage.getItem("calendar-sound") !== "off";
    } catch (_) {}

    function ready() {
      if (!on || !AC) return null;
      if (!ctx) {
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.85;
        master.connect(ctx.destination);
        noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
        const d = noise.getChannelData(0);
        for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
      }
      if (ctx.state === "suspended") ctx.resume();
      return ctx;
    }

    function noiseSrc(c, dur) {
      const src = c.createBufferSource();
      src.buffer = noise;
      return { src, offset: Math.random() * Math.max(0, 1.9 - dur) };
    }

    function burst({ at = 0, dur, type = "bandpass", f, f2, q = 1, gain, attack = 0.004 }) {
      const c = ready();
      if (!c) return;
      const t0 = c.currentTime + at;
      const { src, offset } = noiseSrc(c, dur);
      const flt = c.createBiquadFilter();
      flt.type = type;
      flt.Q.value = q;
      flt.frequency.setValueAtTime(f, t0);
      if (f2) flt.frequency.exponentialRampToValueAtTime(f2, t0 + dur);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(Math.max(0.0002, gain), t0 + attack);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      src.connect(flt).connect(g).connect(master);
      src.start(t0, offset);
      src.stop(t0 + dur + 0.05);
    }

    function lift(k = 1) {
      for (let i = 0; i < 6; i++) {
        burst({
          at: i * 0.022 + Math.random() * 0.012,
          dur: 0.018 + Math.random() * 0.03,
          f: 2200 + Math.random() * 4000,
          q: 1.4,
          gain: (0.04 + Math.random() * 0.06) * k,
        });
      }
      burst({ dur: 0.2, f: 1500, f2: 3500, q: 0.7, gain: 0.05 * k, attack: 0.03 });
    }

    function whoosh(k = 1, dur = 0.6, at = 0) {
      const c = ready();
      if (!c) return;
      const t0 = c.currentTime + at;
      const { src, offset } = noiseSrc(c, dur);

      const flt = c.createBiquadFilter();
      flt.type = "lowpass";
      flt.Q.value = 0.9;
      flt.frequency.setValueAtTime(380, t0);
      flt.frequency.exponentialRampToValueAtTime(2600, t0 + dur * 0.45);
      flt.frequency.exponentialRampToValueAtTime(520, t0 + dur);

      const flutter = c.createGain();
      flutter.gain.value = 1;
      const lfo = c.createOscillator();
      lfo.frequency.setValueAtTime(9, t0);
      lfo.frequency.linearRampToValueAtTime(22, t0 + dur * 0.5);
      lfo.frequency.linearRampToValueAtTime(7, t0 + dur);
      const depth = c.createGain();
      depth.gain.value = 0.35;
      lfo.connect(depth).connect(flutter.gain);

      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(Math.max(0.0002, 0.22 * k), t0 + dur * 0.4);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);

      src.connect(flt).connect(flutter).connect(g).connect(master);
      src.start(t0, offset);
      lfo.start(t0);
      src.stop(t0 + dur + 0.05);
      lfo.stop(t0 + dur + 0.05);

      for (let i = 0; i < 5; i++) {
        burst({
          at: at + dur * (0.15 + Math.random() * 0.6),
          dur: 0.02 + Math.random() * 0.035,
          f: 3000 + Math.random() * 3500,
          q: 1.6,
          gain: (0.025 + Math.random() * 0.04) * k,
        });
      }
    }

    function flap(k = 1) {
      k = clamp(k, 0.08, 1);
      burst({ dur: 0.11, type: "lowpass", f: 2600, f2: 380, q: 0.8, gain: 0.4 * k, attack: 0.002 });
      burst({ dur: 0.025, type: "highpass", f: 3500, q: 0.7, gain: 0.08 * k, attack: 0.001 });
      const c = ready();
      if (!c) return;
      const t0 = c.currentTime;
      const o = c.createOscillator();
      o.frequency.setValueAtTime(150, t0);
      o.frequency.exponentialRampToValueAtTime(55, t0 + 0.12);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(0.22 * k, t0 + 0.004);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.14);
      o.connect(g).connect(master);
      o.start(t0);
      o.stop(t0 + 0.16);
    }

    function playFile() {
      if (!file) return false;
      const a = new Audio(file);
      a.volume = 0.9;
      a.play().catch(() => {});
      return true;
    }

    ["pointerdown", "keydown"].forEach((ev) => document.addEventListener(ev, () => ready(), { capture: true }));

    return {
      setFile(url) {
        file = url || "";
      },
      lift: (k) => {
        if (on && !file) lift(k);
      },
      whoosh: (k, dur) => {
        if (on && !playFile()) whoosh(k, dur);
      },
      flip: (k, dur) => {
        if (on && !playFile()) {
          lift(k * 0.8);
          whoosh(k, dur, 0.05);
        }
      },
      flap: (k) => {
        if (on) flap(k);
      },
      toggle() {
        on = !on;
        try {
          localStorage.setItem("calendar-sound", on ? "on" : "off");
        } catch (_) {}
        if (on) {
          ready();
          flap(0.3);
        }
        return on;
      },
      get on() {
        return on;
      },
    };
  })();

  const rad = (a) => (a * Math.PI) / 180;
  const frontLight = (a) => 0.6 * Math.sin(rad(a)) + 0.8 * Math.cos(rad(a)) - 0.8;
  const backLight = (a) => -0.6 * Math.sin(rad(a)) - 0.8 * Math.cos(rad(a)) - 0.8;
  const litColor = (v) =>
    v >= 0 ? `rgba(255,255,255,${(v * 0.8).toFixed(3)})` : `rgba(0,0,0,${Math.min(0.42, -v * 0.38).toFixed(3)})`;

  function create(options) {
    const o = Object.assign({ strips: 20, count: 1, index: 0, duration: 1.05 }, options);
    const $c = o.container,
      $stack = o.stack;
    const N = o.strips;
    Sound.setFile(o.soundFile);

    const api = { index: clamp(o.index, 0, o.count - 1), page: null, busy: false };
    let jumping = false,
      suppressClick = false;

    function makePage(i) {
      const p = o.buildPage(i);
      p.style.isolation = "isolate";
      return p;
    }

    function updateStack(idx) {
      if (!$stack) return;
      const n = Math.min(o.count - 1 - idx, 9);
      const parts = [];
      for (let i = 1; i <= n; i++) parts.push(`0 ${2 * i - 1}px 0 #f7f4ed`, `0 ${2 * i}px 0 #d9d2c4`);
      parts.push(`0 ${2 * n + 6}px 14px -6px rgba(0,0,0,.35)`);
      $stack.style.boxShadow = parts.join(",");
    }

    function stripFace(src, cls, offset, W, H, i) {
      const face = document.createElement("div");
      face.className = `pf-face ${cls}`;
      if (i === 0) face.classList.add("pf-first");
      if (i === N - 1) face.classList.add("pf-last");
      const clone = src.cloneNode(true);
      clone.classList.add("pf-clone");
      clone.style.width = `${W}px`;
      clone.style.height = `${H}px`;
      clone.style.top = `${offset}px`;
      const lit = document.createElement("div");
      lit.className = "pf-lit";
      face.append(clone, lit);
      return { face, lit };
    }

    function buildFlipper(page) {
      const W = $c.clientWidth,
        H = $c.clientHeight,
        h = H / N;
      const front = page.querySelector(".face.front");
      const back = page.querySelector(".face.back");
      const root = document.createElement("div");
      root.className = "pf-flipper";
      root.setAttribute("aria-hidden", "true");

      const strips = [];
      let parent = root;
      for (let i = 0; i < N; i++) {
        const el = document.createElement("div");
        el.className = "pf-strip";
        el.style.height = `${h}px`;
        el.style.top = i ? `${h}px` : "0";
        const f = stripFace(front, "pf-front", -i * h, W, H, i);
        const b = stripFace(back, "pf-back", -i * h, W, H, i);
        el.append(f.face, b.face);
        parent.appendChild(el);
        parent = el;
        strips.push({ el, f: f.face, b: b.face, fLit: f.lit, bLit: b.lit });
      }
      return { root, strips };
    }

    function render(s) {
      const { T, B } = s;
      const angles = [];
      for (let i = 0; i <= N; i++) {
        const t = Math.min(1, i / (N - 1));
        angles.push(B + (T - B) * Math.pow(t, 1.15));
      }

      let prev = 0;
      for (let i = 0; i < N; i++) {
        const a0 = angles[i],
          a1 = angles[i + 1];
        const st = s.fl.strips[i];
        st.el.style.transform = `rotateX(${(a0 - prev).toFixed(2)}deg)`;
        prev = a0;

        const op = (1 - clamp((a0 - 228) / 28, 0, 1)).toFixed(3);
        st.f.style.opacity = op;
        st.b.style.opacity = op;
        st.fLit.style.background = `linear-gradient(180deg,${litColor(frontLight(a0))},${litColor(frontLight(a1))})`;
        st.bLit.style.background = `linear-gradient(180deg,${litColor(backLight(a0))},${litColor(backLight(a1))})`;
      }

      const lift = clamp(T / 180, 0, 1),
        base = clamp(B / 170, 0, 1);
      const alpha = 0.5 * Math.min(1, lift * 5) * (1 - base);
      const ext = (1 - lift) * 100;
      s.shade.style.background =
        `linear-gradient(180deg, rgba(0,0,0,${alpha.toFixed(3)}) 0%, ` +
        `rgba(0,0,0,${(alpha * 0.55).toFixed(3)}) ${(ext * 0.75).toFixed(1)}%, ` +
        `rgba(0,0,0,0) ${Math.min(100, ext + 22).toFixed(1)}%)`;
    }

    function createSession(dir) {
      const target = api.index + dir;
      const s = { dir, target, goal: null, tw: {}, flags: {}, T: 0, vT: 0, B: 0, vB: 0, lt: 0, lb: 0 };

      if (dir > 0) {
        s.moving = api.page;
        s.under = makePage(target);
        $c.insertBefore(s.under, s.moving);
      } else {
        s.moving = makePage(target);
        s.under = api.page;
        s.T = s.B = s.lt = s.lb = MAX;
      }

      s.fl = buildFlipper(s.moving);
      $c.appendChild(s.fl.root);
      if (dir > 0) s.moving.style.visibility = "hidden";

      s.shade = document.createElement("div");
      s.shade.className = "pf-shade";
      s.under.querySelector(".face.front").appendChild(s.shade);
      updateStack(target);

      api.busy = true;
      s.done = new Promise((r) => {
        s.resolve = r;
      });
      render(s);
      s.last = performance.now();
      s.raf = requestAnimationFrame((t) => tick(s, t));
      return s;
    }

    function tween(s, key, to, dur, delay = 0, ease = easeInOut) {
      s.tw[key] = { from: s[key], to, t0: performance.now() + delay * 1000, dur: Math.max(60, dur * 1000), ease };
    }

    function aim(s, goal) {
      s.goal = goal;
      s.goalAt = performance.now();
    }

    function tick(s, t) {
      const dt = Math.min(0.034, Math.max(0, (t - s.last) / 1000));
      s.last = t;

      for (const key of ["lt", "lb"]) {
        const w = s.tw[key];
        if (!w) continue;
        const k = clamp((t - w.t0) / w.dur, 0, 1);
        s[key] = w.from + (w.to - w.from) * w.ease(k);
        if (k >= 1) s.tw[key] = null;
      }

      const steps = 4,
        h = dt / steps;
      for (let i = 0; i < steps; i++) {
        s.vT += (PHYS.kT * (s.lt - s.T) - PHYS.cT * s.vT) * h;
        s.T += s.vT * h;
        s.vB += (PHYS.kB * (s.lb - s.B) - PHYS.cB * s.vB) * h;
        s.B += s.vB * h;

        if (s.T < 0) {
          if (s.vT < -90 && !s.flags.land) {
            s.flags.land = true;
            Sound.flap(-s.vT / 700);
          }
          s.T = 0;
          s.vT *= -0.2;
        }
        if (s.B < 0) {
          if (s.vB < -90 && !s.flags.landB) {
            s.flags.landB = true;
            Sound.flap(-s.vB / 1400);
          }
          s.B = 0;
          s.vB *= -0.2;
        }
        if (s.T > MAX + 6) {
          s.T = MAX + 6;
          s.vT *= -0.2;
        }
        if (s.B > MAX + 6) {
          s.B = MAX + 6;
          s.vB *= -0.2;
        }
      }

      render(s);

      const moving = s.tw.lt || s.tw.lb;
      const late = s.goal !== null && t - s.goalAt > 4000;
      if (s.goal === MAX) {
        if (Math.min(s.T, s.B) > 225 && !s.flags.tap) {
          s.flags.tap = true;
          Sound.flap(0.25);
        }
        if ((!moving && Math.min(s.T, s.B) > 246) || late) return finish(s);
      } else if (s.goal === 0) {
        const still = Math.max(s.T, s.B) < 0.6 && Math.abs(s.vT) + Math.abs(s.vB) < 12;
        if ((!moving && still) || late) return finish(s);
      }
      s.raf = requestAnimationFrame((nt) => tick(s, nt));
    }

    function finish(s) {
      cancelAnimationFrame(s.raf);
      const committed = s.goal === (s.dir > 0 ? MAX : 0);
      s.fl.root.remove();
      s.shade.remove();

      if (s.dir > 0) {
        if (committed) {
          s.moving.remove();
          api.page = s.under;
          api.index = s.target;
        } else {
          s.under.remove();
          s.moving.style.visibility = "";
        }
      } else if (committed) {
        s.under.remove();
        $c.appendChild(s.moving);
        api.page = s.moving;
        api.index = s.target;
      }
      updateStack(api.index);
      api.busy = false;
      if (committed && o.onFlip) o.onFlip(api.index, api.page);
      s.resolve(committed);
    }

    function nudge(dir) {
      const p = api.page;
      const cls = dir > 0 ? "pf-nudge-next" : "pf-nudge-prev";
      p.classList.remove("pf-nudge-next", "pf-nudge-prev");
      void p.offsetWidth;
      p.classList.add(cls);
      setTimeout(() => p.classList.remove(cls), 500);
    }

    function flip(dir, fast = false) {
      if (api.busy) return Promise.resolve(false);
      const target = api.index + dir;
      if (target < 0 || target >= o.count) {
        nudge(dir);
        return Promise.resolve(false);
      }

      if (REDUCED) {
        const page = makePage(target);
        api.page.replaceWith(page);
        api.page = page;
        api.index = target;
        updateStack(target);
        Sound.flap(0.4);
        if (o.onFlip) o.onFlip(api.index, api.page);
        return Promise.resolve(true);
      }

      const s = createSession(dir);
      const D = fast ? 0.55 : o.duration;
      const goal = dir > 0 ? MAX : 0;
      aim(s, goal);

      tween(s, "lt", goal, D * 0.72);
      tween(s, "lb", goal, D * 0.72, D * 0.28);
      Sound.flip(fast ? 0.55 : 1, D * 0.8);
      return s.done;
    }

    async function goTo(target) {
      target = clamp(target, 0, o.count - 1);
      if (api.busy || jumping || target === api.index) return;
      jumping = true;
      const fast = Math.abs(target - api.index) > 1;
      while (api.index !== target) {
        if (!(await flip(Math.sign(target - api.index), fast))) break;
      }
      jumping = false;
    }

    let drag = null;

    $c.addEventListener(
      "click",
      (e) => {
        if (suppressClick) {
          e.stopPropagation();
          e.preventDefault();
        }
      },
      true,
    );

    $c.addEventListener("pointerdown", (e) => {
      if (!api.canAct() || e.button > 0) return;
      if (e.pointerType === "touch" && !e.target.closest("[data-grab]")) return;
      const r = $c.getBoundingClientRect();
      drag = {
        id: e.pointerId,
        x: e.clientX,
        y: e.clientY,
        d0: clamp(e.clientY - r.top, 60, r.height),
        H: r.height,
        dir: 0,
        s: null,
        blocked: false,
        samples: [],
      };
    });

    window.addEventListener("pointermove", (e) => {
      if (!drag || e.pointerId !== drag.id || drag.blocked) return;
      const dx = e.clientX - drag.x,
        dy = e.clientY - drag.y;

      if (!drag.s) {
        if (Math.abs(dy) < 7 || Math.abs(dy) < Math.abs(dx)) return;
        const dir = dy < 0 ? 1 : -1;
        const target = api.index + dir;
        drag.dir = dir;
        if (target < 0 || target >= o.count || !api.canAct()) {
          drag.blocked = true;
          return;
        }
        drag.s = createSession(dir);
        Sound.lift(0.8);
        try {
          $c.setPointerCapture(e.pointerId);
        } catch (_) {}
      }

      drag.samples.push({ t: performance.now(), y: e.clientY });
      if (drag.samples.length > 6) drag.samples.shift();

      const s = drag.s;
      if (drag.dir > 0) {
        const r = clamp((drag.d0 + dy) / drag.d0, -1, 1);
        const th = (Math.acos(r) * 180) / Math.PI;
        s.lt = th;
        s.lb = clamp((th - 95) * 1.1, 0, MAX);
      } else {
        const q = clamp(dy / (drag.H * 0.9), 0, 1);
        s.lt = MAX * (1 - clamp(q * 1.4, 0, 1));
        s.lb = MAX * (1 - clamp((q - 0.3) / 0.7, 0, 1));
      }
    });

    function endDrag(e) {
      if (!drag || e.pointerId !== drag.id) return;
      const d = drag;
      drag = null;
      if (d.blocked) {
        if (d.dir) nudge(d.dir);
        return;
      }
      if (!d.s) return;

      suppressClick = true;
      setTimeout(() => {
        suppressClick = false;
      }, 60);

      const a = d.samples[0],
        b = d.samples[d.samples.length - 1];
      const vy = a && b && b.t > a.t ? (b.y - a.y) / (b.t - a.t) : 0;
      const s = d.s;
      const cancelled = e.type === "pointercancel";

      if (d.dir > 0) {
        if (!cancelled && (s.lt > 60 || (vy < -0.45 && s.lt > 8))) {
          aim(s, MAX);
          tween(s, "lt", MAX, 0.28 + 0.4 * (1 - s.lt / MAX), 0, easeOut);
          tween(s, "lb", MAX, 0.6, 0.08);
          Sound.whoosh(clamp(-vy, 0.5, 1.2), 0.55);
        } else {
          aim(s, 0);
          tween(s, "lb", 0, 0.3, 0, easeOut);
          tween(s, "lt", 0, 0.42);
        }
      } else if (!cancelled && (s.lt < MAX * 0.55 || (vy > 0.45 && s.lt < MAX - 15))) {
        aim(s, 0);
        tween(s, "lt", 0, 0.25 + 0.35 * (s.lt / MAX), 0, easeOut);
        tween(s, "lb", 0, 0.55, 0.05);
        Sound.whoosh(clamp(vy, 0.5, 1.2), 0.5);
      } else {
        aim(s, MAX);
        tween(s, "lt", MAX, 0.4);
        tween(s, "lb", MAX, 0.3, 0, easeOut);
      }
    }
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);

    Object.assign(api, {
      next: () => flip(1),
      prev: () => flip(-1),
      flip,
      goTo,
      canAct: () => !api.busy && !jumping,
    });

    api.page = makePage(api.index);
    $c.appendChild(api.page);
    updateStack(api.index);
    return api;
  }

  window.PaperFlip = { create, Sound };
})();

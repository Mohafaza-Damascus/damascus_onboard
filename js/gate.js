(function () {
  'use strict';
  const DG = window.DG = window.DG || {};

  DG.rng = function (seed) {
    let s = seed >>> 0;
    return function () {
      s = (s + 0x6D2B79F5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  const W = 640, H = 700;
  const MID = 320, LEFT = 80, RIGHT = 560, TOP = 112, GROUND = 640;
  const HALF = 140;
  const DEPTH = 58;
  const COURSE = 34;

  const LIGHT = [38, 26, 80];
  const DARK = [24, 8, 23];
  const f = n => +n.toFixed(2);

  function stone(base, rand, spread) {
    const h = base[0] + (rand() - 0.5) * 6;
    const l = base[2] + (rand() - 0.5) * spread;
    return `hsl(${f(h)},${base[1]}%,${f(l)}%)`;
  }

  function geometry(style) {
    const pointed = style !== 'round';
    const d = pointed ? HALF * 0.32 : 0;
    const R = HALF + d;
    const ys = pointed ? 380 : 340;
    const apex = ys - Math.sqrt(R * R - d * d);
    return { d, R, Ro: R + DEPTH, ys, apex };
  }

  function openingPath(g, bottom) {
    const l = MID - HALF, r = MID + HALF;
    return `M${l} ${bottom}L${l} ${g.ys}A${f(g.R)} ${f(g.R)} 0 0 1 ${MID} ${f(g.apex)}` +
      `A${f(g.R)} ${f(g.R)} 0 0 1 ${r} ${g.ys}L${r} ${bottom}Z`;
  }

  function masonry(rand) {
    const out = [];
    for (let y = GROUND, k = 0; y > TOP; y -= COURSE, k++) {
      const top = Math.max(TOP, y - COURSE);
      const dark = k % 3 === 2;
      let x = LEFT - rand() * 60;
      while (x < RIGHT) {
        const w = 48 + rand() * 52;
        out.push(`<rect x="${f(x)}" y="${f(top)}" width="${f(w)}" height="${f(y - top)}" fill="${stone(dark ? DARK : LIGHT, rand, dark ? 5 : 8)}"/>`);
        x += w;
      }
    }
    return out.join('');
  }

  function voussoirs(g, rand) {
    const N = 9, out = [];
    const cx = MID + g.d;
    const aIn = Math.acos(-g.d / g.R), aOut = Math.acos(-g.d / g.Ro);
    const pt = (r, a, mirror) => {
      let x = cx + r * Math.cos(a);
      if (mirror) x = 2 * MID - x;
      return `${f(x)} ${f(g.ys - r * Math.sin(a))}`;
    };
    for (const mirror of [false, true]) {
      const sOut = mirror ? 0 : 1, sIn = mirror ? 1 : 0;
      for (let i = 0; i < N; i++) {
        const t0 = Math.PI - i * (Math.PI - aIn) / N, t1 = Math.PI - (i + 1) * (Math.PI - aIn) / N;
        const o0 = Math.PI - i * (Math.PI - aOut) / N, o1 = Math.PI - (i + 1) * (Math.PI - aOut) / N;
        const d = `M${pt(g.R, t0, mirror)}L${pt(g.Ro, o0, mirror)}` +
          `A${f(g.Ro)} ${f(g.Ro)} 0 0 ${sOut} ${pt(g.Ro, o1, mirror)}` +
          `L${pt(g.R, t1, mirror)}A${f(g.R)} ${f(g.R)} 0 0 ${sIn} ${pt(g.R, t0, mirror)}Z`;
        out.push(`<path d="${d}" fill="${stone(i % 2 === 0 ? DARK : LIGHT, rand, 6)}"/>`);
      }
    }
    return out.join('');
  }

  function merlons() {
    const base = TOP - 14, step = (RIGHT - LEFT + 16) / 6, out = [];
    for (let i = 0; i < 6; i++) {
      const x = LEFT - 8 + i * step + (step - 58) / 2;
      out.push(`M${f(x)} ${base}V${base - 20}H${f(x + 10)}V${base - 36}H${f(x + 20)}V${base - 48}` +
        `L${f(x + 29)} ${base - 55}L${f(x + 38)} ${base - 48}V${base - 36}H${f(x + 48)}V${base - 20}H${f(x + 58)}V${base}Z`);
    }
    return out;
  }

  function rosette(x, y) {
    const dark = `hsl(${DARK[0]},${DARK[1]}%,${DARK[2]}%)`, light = `hsl(${LIGHT[0]},${LIGHT[1]}%,${LIGHT[2] + 4}%)`;
    return `<g transform="translate(${x} ${y})"><circle r="23" fill="${dark}"/>` +
      `<rect x="-11" y="-11" width="22" height="22" fill="${light}"/>` +
      `<rect x="-11" y="-11" width="22" height="22" fill="${light}" transform="rotate(45)"/>` +
      `<circle r="5.5" fill="${dark}"/></g>`;
  }

  function build(style, seed) {
    const g = geometry(style);
    const rand = DG.rng(seed);
    const wall = `M${LEFT} ${GROUND}L${LEFT} ${TOP}L${RIGHT} ${TOP}L${RIGHT} ${GROUND}Z` + openingPath(g, GROUND);
    const mer = merlons();
    const cornice = `<rect x="${LEFT - 8}" y="${TOP - 14}" width="${RIGHT - LEFT + 16}" height="14"/>`;
    const impostY = g.ys;

    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<defs>
  <filter id="stone" filterUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="4" result="fine"/>
    <feColorMatrix in="fine" type="matrix" values="0.25 0 0 0 0.82  0.25 0 0 0 0.82  0.25 0 0 0 0.82  0 0 0 0 1" result="fineG"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="9" result="big"/>
    <feColorMatrix in="big" type="matrix" values="0.4 0 0 0 0.78  0.4 0 0 0 0.78  0.4 0 0 0 0.78  0 0 0 0 1" result="bigG"/>
    <feBlend in="fineG" in2="bigG" mode="multiply" result="tex"/>
    <feBlend in="SourceGraphic" in2="tex" mode="multiply" result="mul"/>
    <feComposite in="mul" in2="SourceGraphic" operator="in"/>
  </filter>
  <filter id="soft" x="-10%" y="-300%" width="120%" height="700%"><feGaussianBlur stdDeviation="5"/></filter>
  <linearGradient id="lightX" x1="0" x2="1" y1="0" y2="0">
    <stop offset="0" stop-color="#fff3dc" stop-opacity="0.14"/>
    <stop offset="0.45" stop-color="#000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity="0.34"/>
  </linearGradient>
  <linearGradient id="ao" x1="0" x2="0" y1="0" y2="1">
    <stop offset="0" stop-color="#fff" stop-opacity="0.06"/>
    <stop offset="0.7" stop-color="#000" stop-opacity="0"/>
    <stop offset="1" stop-color="#000" stop-opacity="0.4"/>
  </linearGradient>
  <linearGradient id="soffit" gradientUnits="userSpaceOnUse" x1="${MID - HALF}" x2="${MID + HALF}" y1="0" y2="0">
    <stop offset="0" stop-color="#3a3027"/>
    <stop offset="0.5" stop-color="#241d17"/>
    <stop offset="1" stop-color="#6e604c"/>
  </linearGradient>
  <radialGradient id="shadow">
    <stop offset="0" stop-color="#000" stop-opacity="0.6"/>
    <stop offset="0.6" stop-color="#000" stop-opacity="0.25"/>
    <stop offset="1" stop-color="#000" stop-opacity="0"/>
  </radialGradient>
  <clipPath id="wall"><path d="${wall}" clip-rule="evenodd"/></clipPath>
  <clipPath id="solid"><path d="${wall}" clip-rule="evenodd"/>${cornice}${mer.map(d => `<path d="${d}"/>`).join('')}</clipPath>
  <clipPath id="open"><path d="${openingPath(g, GROUND)}"/></clipPath>
</defs>
<ellipse cx="${MID}" cy="${GROUND + 6}" rx="300" ry="30" fill="url(#shadow)"/>
<rect x="${LEFT}" y="${GROUND - 6}" width="${RIGHT - LEFT}" height="12" fill="#000" opacity="0.55" filter="url(#soft)"/>
<g filter="url(#stone)">
  <g clip-path="url(#wall)">
    <g stroke="rgba(58,42,28,.5)" stroke-width="1.2">${masonry(rand)}</g>
    <g stroke="rgba(26,18,12,.6)" stroke-width="1.4">${voussoirs(g, rand)}</g>
    ${rosette(120, 176)}${rosette(2 * MID - 120, 176)}
    <rect x="${LEFT}" y="${TOP}" width="${RIGHT - LEFT}" height="5" fill="#000" opacity="0.3"/>
  </g>
  <g fill="hsl(38,24%,84%)" stroke="rgba(58,42,28,.45)" stroke-width="1">
    <rect x="${LEFT - 6}" y="${impostY}" width="${MID - HALF - LEFT + 6}" height="12"/>
    <rect x="${MID + HALF}" y="${impostY}" width="${RIGHT + 6 - MID - HALF}" height="12"/>
  </g>
  <rect x="${LEFT - 6}" y="${impostY + 12}" width="${MID - HALF - LEFT + 6}" height="3" fill="#000" opacity="0.25"/>
  <rect x="${MID + HALF}" y="${impostY + 12}" width="${RIGHT + 6 - MID - HALF}" height="3" fill="#000" opacity="0.25"/>
  <g fill="hsl(38,24%,82%)" stroke="rgba(58,42,28,.45)" stroke-width="1">${cornice}</g>
  <g fill="hsl(38,24%,78%)" stroke="rgba(58,42,28,.45)" stroke-width="1">${mer.map(d => `<path d="${d}"/>`).join('')}</g>
</g>
<g clip-path="url(#solid)">
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#lightX)"/>
  <rect x="0" y="0" width="${W}" height="${H}" fill="url(#ao)"/>
</g>
<g clip-path="url(#open)">
  <path d="${openingPath(g, GROUND + 80)}" fill="none" stroke="url(#soffit)" stroke-width="30"/>
</g>
</svg>`;
  }

  const cache = {};
  DG.gate = {
    aspect: W / H,
    url(style) {
      const key = style === 'round' ? 'round' : 'pointed';
      if (!cache[key]) {
        const svg = build(key, key === 'round' ? 11 : 7);
        cache[key] = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
      }
      return cache[key];
    },
    anchor(style) {
      const g = geometry(style === 'round' ? 'round' : 'pointed');
      return { x: 0.5, y: ((g.apex + GROUND) / 2) / H };
    }
  };
})();
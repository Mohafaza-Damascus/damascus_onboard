/*
 * مشاهد خلفية بديلة تُرسم بالكود (سماء، قاسيون، أفق دمشق القديمة، ساحة حجرية)
 * تُستخدم إلى أن تضع صوراً أو فيديوهات حقيقية في slides.js.
 */
(function () {
  'use strict';
  const DG = window.DG = window.DG || {};
  const W = 1920, H = 1080, HORIZON = 0.6;

  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a === undefined ? c[3] : a})`;

  const PRESETS = {
    dawn: {
      sky: ['#1b2348', '#4a3a6e', '#b45f82', '#f08d6e', '#ffd39a'],
      sun: { x: 0.5, y: 0.5, r: 0.042, core: [255, 244, 214], glow: [255, 186, 112, 0.85], glowR: 0.5 },
      clouds: { count: 9, y: [0.12, 0.42], color: [255, 170, 160], alpha: 0.32 },
      mountain: '#5d4767', city: '#281d33', haze: [255, 168, 138, 0.6], ground: ['#7d5650', '#24191c'],
      lights: 0.05, lightColor: [255, 210, 140], vignette: 0.5
    },
    morning: {
      sky: ['#3b78b4', '#6fa6d3', '#b7d5e6', '#efe4cd'],
      sun: { x: 0.8, y: 0.2, r: 0.032, core: [255, 252, 236], glow: [255, 246, 214, 0.6], glowR: 0.4 },
      clouds: { count: 12, y: [0.08, 0.45], color: [255, 255, 255], alpha: 0.5 },
      mountain: '#7c8fa0', city: '#3b4350', haze: [236, 228, 210, 0.65], ground: ['#a8906f', '#3e3124'],
      vignette: 0.45
    },
    noon: {
      sky: ['#1f5fae', '#4e8fd6', '#9cc8ec', '#e6eef0'],
      sun: { x: 0.22, y: 0.1, r: 0.028, core: [255, 255, 246], glow: [255, 255, 236, 0.55], glowR: 0.35 },
      clouds: { count: 8, y: [0.1, 0.38], color: [255, 255, 255], alpha: 0.42 },
      mountain: '#8b8b84', city: '#564c43', haze: [242, 236, 222, 0.55], ground: ['#c2a47c', '#54402b'],
      vignette: 0.45
    },
    golden: {
      sky: ['#262546', '#7c4458', '#d47b47', '#f3bd66', '#ffe3a2'],
      sun: { x: 0.66, y: 0.565, r: 0.055, core: [255, 238, 190], glow: [255, 164, 64, 0.9], glowR: 0.55 },
      clouds: { count: 10, y: [0.1, 0.42], color: [244, 152, 92], alpha: 0.42 },
      mountain: '#6a4639', city: '#271813', haze: [255, 156, 74, 0.6], ground: ['#946541', '#24160d'],
      lights: 0.04, lightColor: [255, 214, 140], vignette: 0.5
    },
    dusk: {
      sky: ['#17143a', '#382863', '#7f4677', '#cf7276', '#eea585'],
      sun: { x: 0.34, y: 0.64, r: 0, glow: [255, 136, 118, 0.6], glowR: 0.5 },
      stars: 60,
      clouds: { count: 9, y: [0.1, 0.4], color: [176, 104, 138], alpha: 0.38 },
      mountain: '#463254', city: '#1a1226', haze: [214, 118, 128, 0.5], ground: ['#5a3d55', '#120d16'],
      lights: 0.3, lightColor: [255, 206, 122], vignette: 0.55
    },
    night: {
      sky: ['#040918', '#0b1634', '#1a305a', '#36507e'],
      moon: { x: 0.5, y: 0.43, r: 0.036, color: [246, 241, 220], glow: [196, 212, 255, 0.35], crescent: true },
      stars: 320,
      clouds: { count: 7, y: [0.08, 0.4], color: [64, 88, 136], alpha: 0.3 },
      mountain: '#172139', city: '#070b17', haze: [88, 118, 168, 0.4], ground: ['#283045', '#05070d'],
      lights: 0.45, lightColor: [255, 198, 104], vignette: 0.6
    },
    bluehour: {
      sky: ['#0c1836', '#213c69', '#4b739f', '#9cb5c7', '#e3cfb0'],
      sun: { x: 0.8, y: 0.64, r: 0, glow: [255, 200, 150, 0.4], glowR: 0.4 },
      stars: 140,
      clouds: { count: 8, y: [0.1, 0.42], color: [110, 134, 168], alpha: 0.32 },
      mountain: '#2c3b5a', city: '#121a2d', haze: [176, 188, 208, 0.45], ground: ['#474c5b', '#0d0f16'],
      lights: 0.32, lightColor: [255, 210, 130], vignette: 0.55
    }
  };

  function glow(ctx, x, y, r, c, alpha) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(c, alpha === undefined ? c[3] : alpha));
    g.addColorStop(1, rgba(c, 0));
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
  }

  function noise1(rand, n) {
    const v = Array.from({ length: n + 1 }, rand);
    return x => {
      const i = Math.floor(x), t = x - i, u = t * t * (3 - 2 * t);
      return v[i % n] * (1 - u) + v[(i + 1) % n] * u;
    };
  }

  function sky(ctx, p, hy) {
    const g = ctx.createLinearGradient(0, 0, 0, hy);
    p.sky.forEach((c, i, a) => g.addColorStop(i / (a.length - 1), c));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, hy + 2);
  }

  function stars(ctx, p, hy, rand) {
    ctx.fillStyle = '#fff';
    for (let i = 0; i < p.stars; i++) {
      const x = rand() * W, y = rand() * hy * 0.75;
      ctx.globalAlpha = (0.25 + rand() * 0.75) * Math.max(0, 1 - y / (hy * 0.8));
      ctx.beginPath();
      ctx.arc(x, y, 0.4 + rand() * rand() * 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  function sun(ctx, s) {
    const x = s.x * W, y = s.y * H;
    glow(ctx, x, y, s.glowR * H, s.glow);
    glow(ctx, x, y, s.glowR * H * 0.35, s.glow);
    if (!s.r) return;
    const r = s.r * H, g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, rgba(s.core, 1));
    g.addColorStop(0.82, rgba(s.core, 1));
    g.addColorStop(1, rgba(s.core, 0));
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  }

  function moon(ctx, m) {
    const x = m.x * W, y = m.y * H, r = m.r * H;
    glow(ctx, x, y, r * 7, m.glow);
    const c = document.createElement('canvas');
    c.width = c.height = Math.ceil(r * 2 + 4);
    const g = c.getContext('2d'), o = c.width / 2;
    g.fillStyle = rgba(m.color, 1);
    g.beginPath(); g.arc(o, o, r, 0, Math.PI * 2); g.fill();
    if (m.crescent) {
      g.globalCompositeOperation = 'destination-out';
      g.beginPath(); g.arc(o + r * 0.42, o - r * 0.18, r * 0.92, 0, Math.PI * 2); g.fill();
    }
    ctx.drawImage(c, x - o, y - o);
  }

  function clouds(ctx, p, rand) {
    const c = p.clouds;
    if (!c) return;
    for (let i = 0; i < c.count; i++) {
      const cx = rand() * W, cy = (c.y[0] + rand() * (c.y[1] - c.y[0])) * H;
      const span = (0.12 + rand() * 0.22) * W, puffs = 7 + Math.floor(rand() * 8);
      for (let j = 0; j < puffs; j++) {
        const pr = span * (0.12 + rand() * 0.16);
        ctx.save();
        ctx.translate(cx + (rand() - 0.5) * span, cy + (rand() - 0.5) * span * 0.12);
        ctx.scale(1, 0.38);
        glow(ctx, 0, 0, pr, c.color, c.alpha);
        ctx.restore();
      }
    }
  }

  // جبل قاسيون في الخلفية + أضواء سفوحه ليلاً
  function mountain(ctx, p, hy, rand) {
    const nA = noise1(rand, 64), nB = noise1(rand, 64), ridge = [];
    ctx.beginPath();
    ctx.moveTo(0, hy + 2);
    for (let x = 0; x <= W; x += 8) {
      const t = x / W;
      const h = 0.05 + 0.13 * Math.exp(-Math.pow((t - 0.24) / 0.2, 2)) + 0.05 * Math.exp(-Math.pow((t - 0.78) / 0.25, 2));
      const y = hy - H * (h + 0.02 * nA(t * 18) + 0.008 * nB(t * 70));
      ridge.push(y);
      ctx.lineTo(x, y);
    }
    ctx.lineTo(W, hy + 2);
    ctx.closePath();
    ctx.fillStyle = p.mountain;
    ctx.fill();

    if (p.lights) {
      ctx.fillStyle = rgba(p.lightColor, 0.8);
      const n = Math.floor(1400 * p.lights);
      for (let i = 0; i < n; i++) {
        const x = rand() * W, top = ridge[Math.min(ridge.length - 1, Math.round(x / 8))] + 6;
        const y = top + (hy - top) * Math.sqrt(rand());
        ctx.globalAlpha = 0.35 + rand() * 0.6;
        ctx.fillRect(x, y, 1.2 + rand() * 1.4, 1.2 + rand() * 1.2);
      }
      ctx.globalAlpha = 1;
    }
  }

  function haze(ctx, p, hy) {
    const top = hy - H * 0.22, g = ctx.createLinearGradient(0, top, 0, hy);
    g.addColorStop(0, rgba(p.haze, 0));
    g.addColorStop(1, rgba(p.haze));
    ctx.fillStyle = g;
    ctx.fillRect(0, top, W, H * 0.22 + 2);
  }

  function dome(ctx, cx, base, r) {
    ctx.fillRect(cx - r * 0.9, base - r * 0.35, r * 1.8, r * 0.36);
    ctx.beginPath();
    ctx.moveTo(cx - r, base - r * 0.33);
    ctx.quadraticCurveTo(cx - r, base - r * 1.3, cx, base - r * 1.45);
    ctx.quadraticCurveTo(cx + r, base - r * 1.3, cx + r, base - r * 0.33);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(cx - 1, base - r * 1.75, 2, r * 0.32);
  }

  function minaret(ctx, x, hy, h) {
    const w = W * 0.0075;
    ctx.fillRect(x - w / 2, hy - h, w, h + 2);
    ctx.fillRect(x - w, hy - h * 0.72, w * 2, Math.max(3, h * 0.025));
    ctx.fillRect(x - w * 0.8, hy - h * 0.98, w * 1.6, Math.max(3, h * 0.02));
    ctx.beginPath();
    ctx.moveTo(x - w * 0.55, hy - h);
    ctx.lineTo(x, hy - h * 1.16);
    ctx.lineTo(x + w * 0.55, hy - h);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(x - 0.75, hy - h * 1.22, 1.5, h * 0.07);
  }

  // ظل تقريبي للجامع الأموي في المنتصف (يظهر من خلال فتحة البوابة)
  function umayyad(ctx, x, hy) {
    const hw = W * 0.11, hh = H * 0.032;
    ctx.fillRect(x - hw, hy - hh, hw * 2, hh + 2);
    ctx.beginPath();
    ctx.moveTo(x - hw, hy - hh);
    ctx.lineTo(x, hy - hh - H * 0.014);
    ctx.lineTo(x + hw, hy - hh);
    ctx.closePath();
    ctx.fill();
    const tw = W * 0.022, th = H * 0.058;
    ctx.fillRect(x - tw, hy - th, tw * 2, th);
    ctx.fillRect(x - W * 0.017, hy - th - H * 0.012, W * 0.034, H * 0.013);
    const top = hy - th - H * 0.011, dr = W * 0.02;
    ctx.beginPath();
    ctx.moveTo(x - dr, top);
    ctx.quadraticCurveTo(x - dr, top - H * 0.04, x, top - H * 0.052);
    ctx.quadraticCurveTo(x + dr, top - H * 0.04, x + dr, top);
    ctx.closePath();
    ctx.fill();
    ctx.fillRect(x - 1, top - H * 0.068, 2, H * 0.018);
    minaret(ctx, x + hw * 1.04, hy, H * 0.125);
    minaret(ctx, x - hw * 1.04, hy, H * 0.11);
  }

  function city(ctx, p, hy, rand) {
    let x = -20;
    while (x < W + 20) {
      const w = (0.012 + rand() * 0.035) * W, h = (0.01 + rand() * 0.032) * H;
      ctx.fillStyle = p.city;
      ctx.fillRect(x, hy - h, w + 1, h + 4);
      if (rand() < 0.16) dome(ctx, x + w / 2, hy - h, w * (0.3 + rand() * 0.15));
      if (p.lights) {
        ctx.fillStyle = rgba(p.lightColor, 0.85);
        const n = Math.floor((w * h) / 700 * p.lights);
        for (let k = 0; k < n; k++) ctx.fillRect(x + 2 + rand() * (w - 6), hy - h + 3 + rand() * (h - 6), 2.2, 3);
      }
      x += w;
    }
    ctx.fillStyle = p.city;
    umayyad(ctx, W * 0.5, hy);
    [[0.08, 0.095], [0.22, 0.08], [0.33, 0.1], [0.7, 0.09], [0.82, 0.105], [0.94, 0.085]]
      .forEach(([mx, mh]) => minaret(ctx, mx * W + (rand() - 0.5) * 40, hy, mh * H));
  }

  function ground(ctx, p, hy, rand) {
    const g = ctx.createLinearGradient(0, hy, 0, H);
    g.addColorStop(0, p.ground[0]);
    g.addColorStop(1, p.ground[1]);
    ctx.fillStyle = g;
    ctx.fillRect(0, hy, W, H - hy);

    // بلاط بمنظور نحو نقطة الهروب في المنتصف
    ctx.save();
    ctx.strokeStyle = 'rgba(0,0,0,0.16)';
    ctx.lineWidth = 1.2;
    for (let i = -40; i <= 40; i++) {
      ctx.beginPath(); ctx.moveTo(W / 2 + i * 6, hy); ctx.lineTo(W / 2 + i * 150, H); ctx.stroke();
    }
    for (let k = 1; k < 22; k++) {
      const t = k / 22, y = hy + (H - hy) * t * t;
      ctx.globalAlpha = 0.3 + t * 0.7;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    ctx.restore();

    for (let i = 0; i < 2500; i++) {
      const t = Math.sqrt(rand()), y = hy + (H - hy) * t, r = (0.4 + rand() * 1.8) * (0.3 + t * 1.4);
      ctx.fillStyle = rand() < 0.5 ? 'rgba(0,0,0,0.18)' : 'rgba(255,255,255,0.07)';
      ctx.beginPath(); ctx.ellipse(rand() * W, y, r * 1.6, r * 0.7, 0, 0, Math.PI * 2); ctx.fill();
    }

    const r = ctx.createLinearGradient(0, hy, 0, hy + H * 0.12);
    r.addColorStop(0, rgba(p.haze, p.haze[3] * 0.8));
    r.addColorStop(1, rgba(p.haze, 0));
    ctx.fillStyle = r;
    ctx.fillRect(0, hy, W, H * 0.12);
  }

  function horizonGlow(ctx, p, hy) {
    const s = p.sun;
    if (!s || s.y < 0.45) return;
    const r = H * 0.3;
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    ctx.translate(s.x * W, hy);
    ctx.scale(2.2, 1);
    glow(ctx, 0, 0, r, s.glow, s.glow[3] * 0.55);
    ctx.restore();
  }

  function vignette(ctx, p) {
    const g = ctx.createRadialGradient(W / 2, H * 0.55, H * 0.35, W / 2, H * 0.55, H * 1.05);
    g.addColorStop(0, 'rgba(0,0,0,0)');
    g.addColorStop(1, `rgba(0,0,0,${p.vignette || 0.5})`);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  let grainTile = null;
  function grain(ctx) {
    if (!grainTile) {
      grainTile = document.createElement('canvas');
      grainTile.width = grainTile.height = 160;
      const g = grainTile.getContext('2d'), d = g.createImageData(160, 160);
      for (let i = 0; i < d.data.length; i += 4) {
        const v = Math.random() * 255;
        d.data[i] = d.data[i + 1] = d.data[i + 2] = v;
        d.data[i + 3] = 255;
      }
      g.putImageData(d, 0, 0);
    }
    ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.globalCompositeOperation = 'overlay';
    ctx.fillStyle = ctx.createPattern(grainTile, 'repeat');
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  DG.scenes = {
    presets: PRESETS,
    make(name, seed) {
      const p = PRESETS[name] || PRESETS.dawn;
      const rand = DG.rng(seed * 9973 + 17);
      const c = document.createElement('canvas');
      c.width = W;
      c.height = H;
      const ctx = c.getContext('2d');
      const hy = Math.round(H * HORIZON);
      sky(ctx, p, hy);
      if (p.stars) stars(ctx, p, hy, rand);
      if (p.sun) sun(ctx, p.sun);
      if (p.moon) moon(ctx, p.moon);
      clouds(ctx, p, rand);
      mountain(ctx, p, hy, rand);
      haze(ctx, p, hy);
      city(ctx, p, hy, rand);
      ground(ctx, p, hy, rand);
      horizonGlow(ctx, p, hy);
      vignette(ctx, p);
      grain(ctx);
      return c;
    }
  };
})();

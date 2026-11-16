(function () {
  "use strict";
  const DG = (window.DG = window.DG || {});

  const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

  const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
varying vec2 vUv;
uniform sampler2D uFrom;
uniform sampler2D uTo;
uniform sampler2D uFromFill;
uniform sampler2D uToFill;
uniform vec2 uRes;
uniform vec2 uFromSize;
uniform vec2 uToSize;
uniform vec4 uFromRect;
uniform vec4 uToRect;
uniform vec2 uFeather;
uniform vec2 uCenter;
uniform float uProgress;
uniform float uTime;
uniform float uFromMag;
uniform float uToMag;
uniform float uLens;
uniform float uEdge;
uniform float uWobble;
uniform float uMaxR;
uniform float uGlow;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

// object-fit: cover
vec2 cover(vec2 uv, vec2 size) {
  float sa = uRes.x / uRes.y;
  float ma = size.x / size.y;
  vec2 s = sa > ma ? vec2(1.0, ma / sa) : vec2(sa / ma, 1.0);
  return (uv - 0.5) * s + 0.5;
}

// magnify around the gate opening
vec2 zoom(vec2 uv, float mag) {
  return uCenter + (uv - uCenter) / mag;
}

vec2 place(vec2 uv, vec4 r) {
  return vec2((uv.x - r.x) / r.z, 1.0 - (1.0 - uv.y - r.y) / r.w);
}

vec3 layer(sampler2D img, sampler2D fill, vec2 size, vec4 rect, float feather, vec2 uv) {
  vec2 p = place(uv, rect);
  vec3 c = texture2D(img, p).rgb;
  if (feather <= 0.0) return c;
  vec3 f = texture2D(fill, cover(uv, size)).rgb * 0.5;
  vec2 e = min(p, 1.0 - p) * rect.zw * vec2(uRes.x / uRes.y, 1.0) / feather;
  float a = clamp(min(e.x, e.y), 0.0, 1.0);
  return mix(f, c, a * a * (3.0 - 2.0 * a));
}

void main() {
  // distance from the gate centre, aspect corrected (1.0 = screen height)
  vec2 d = (vUv - uCenter) * vec2(uRes.x / uRes.y, 1.0);
  float r = length(d);
  vec2 dir = d / max(r, 1e-4);

  // wavy front: noise sampled on the unit circle so it has no seam
  float n = vnoise(dir * 2.3 + uTime * 0.35) * 0.65 + vnoise(dir * 6.0 - uTime * 0.55) * 0.35;
  float rr = r + (n - 0.5) * uWobble;
  float front = mix(-0.5 * uWobble, uMaxR + 0.5 * uWobble + uEdge, uProgress);
  float m = 1.0 - smoothstep(front - uEdge, front, rr);   // 1 inside the portal
  float k = smoothstep(0.0, 1.0, m);

  vec3 a = layer(uFrom, uFromFill, uFromSize, uFromRect, uFeather.x, zoom(vUv, uFromMag * (1.0 + uLens * k)));
  vec3 b = layer(uTo, uToFill, uToSize, uToRect, uFeather.y, zoom(vUv, uToMag * (1.0 + 2.0 * uLens * (1.0 - k))));

  vec3 col = mix(a, b, m);
  col += uGlow * 4.0 * m * (1.0 - m) * vec3(1.0, 0.86, 0.6);
  gl_FragColor = vec4(col, 1.0);
}`;

  function compile(gl, type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.warn(gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }

  function createGL(canvas) {
    let gl = null;
    try {
      gl = canvas.getContext("webgl", {
        alpha: false,
        antialias: false,
        depth: false,
        stencil: false,
        premultipliedAlpha: false,
      });
    } catch (e) {
      gl = null;
    }
    if (!gl) return null;

    const v = compile(gl, gl.VERTEX_SHADER, VERT),
      fr = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!v || !fr) return null;
    const prog = gl.createProgram();
    gl.attachShader(prog, v);
    gl.attachShader(prog, fr);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.warn(gl.getProgramInfoLog(prog));
      return null;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = {};
    [
      "uFrom",
      "uTo",
      "uFromFill",
      "uToFill",
      "uRes",
      "uFromSize",
      "uToSize",
      "uFromRect",
      "uToRect",
      "uFeather",
      "uCenter",
      "uProgress",
      "uTime",
      "uFromMag",
      "uToMag",
      "uLens",
      "uEdge",
      "uWobble",
      "uMaxR",
      "uGlow",
    ].forEach((name) => {
      U[name] = gl.getUniformLocation(prog, name);
    });
    gl.uniform1i(U.uFrom, 0);
    gl.uniform1i(U.uTo, 1);
    gl.uniform1i(U.uFromFill, 2);
    gl.uniform1i(U.uToFill, 3);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);

    let lost = false;
    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      lost = true;
    });

    const BLACK = new Uint8Array([0, 0, 0, 255]);
    const textures = new Map();

    function bind(src, unit, upload) {
      gl.activeTexture(gl.TEXTURE0 + unit);
      let t = textures.get(src);
      if (!t) {
        t = { tex: gl.createTexture(), ready: false };
        textures.set(src, t);
        gl.bindTexture(gl.TEXTURE_2D, t.tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, BLACK);
      } else {
        gl.bindTexture(gl.TEXTURE_2D, t.tex);
      }
      const hasFrame = !src.isVideo || src.el.readyState >= 2;
      if (upload && hasFrame && (!t.ready || src.isVideo)) {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, src.el);
        t.ready = true;
      }
    }

    return {
      kind: "webgl",
      resize(w, h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      },
      render(s) {
        if (lost) throw new Error("WebGL context lost");
        const to = s.to || s.from;
        const toRect = s.to ? s.toRect : s.fromRect;
        bind(s.from, 0, true);
        bind(to, 1, to !== s.from);
        bind(s.from.fill || s.from, 2, !!s.from.fill);
        bind(to.fill || to, 3, !!to.fill && to !== s.from);
        gl.uniform2f(U.uRes, canvas.width, canvas.height);
        gl.uniform2f(U.uFromSize, s.from.w || 1, s.from.h || 1);
        gl.uniform2f(U.uToSize, to.w || 1, to.h || 1);
        gl.uniform4f(U.uFromRect, s.fromRect[0], s.fromRect[1], s.fromRect[2], s.fromRect[3]);
        gl.uniform4f(U.uToRect, toRect[0], toRect[1], toRect[2], toRect[3]);
        gl.uniform2f(U.uFeather, s.fromFeather || 0, s.to ? s.toFeather || 0 : s.fromFeather || 0);
        gl.uniform2f(U.uCenter, s.center[0], 1 - s.center[1]);
        gl.uniform1f(U.uProgress, s.to ? s.progress : 0);
        gl.uniform1f(U.uTime, s.time);
        gl.uniform1f(U.uFromMag, s.fromMag);
        gl.uniform1f(U.uToMag, s.toMag);
        gl.uniform1f(U.uLens, s.lens);
        gl.uniform1f(U.uEdge, s.edge);
        gl.uniform1f(U.uWobble, s.wobble);
        gl.uniform1f(U.uMaxR, s.maxR);
        gl.uniform1f(U.uGlow, s.glow);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      },
    };
  }

  function hash2(x, y) {
    const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return s - Math.floor(s);
  }
  function vnoise(x, y) {
    const ix = Math.floor(x),
      iy = Math.floor(y),
      fx = x - ix,
      fy = y - iy;
    const ux = fx * fx * (3 - 2 * fx),
      uy = fy * fy * (3 - 2 * fy);
    const a = hash2(ix, iy),
      b = hash2(ix + 1, iy),
      c = hash2(ix, iy + 1),
      d = hash2(ix + 1, iy + 1);
    return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
  }

  function create2D(canvas) {
    const ctx = canvas.getContext("2d", { alpha: false });
    const layer = document.createElement("canvas"),
      lctx = layer.getContext("2d");
    const mask = document.createElement("canvas"),
      mctx = mask.getContext("2d");
    const MASK_SCALE = 0.25;

    function drawCover(c, src, mag, cx, cy, W, H) {
      const sw = src.w,
        sh = src.h;
      if (!sw || !sh) return;
      const base = Math.max(W / sw, H / sh);
      const bx = (W - sw * base) / 2,
        by = (H - sh * base) / 2;
      c.drawImage(src.el, cx + (bx - cx) * mag, cy + (by - cy) * mag, sw * base * mag, sh * base * mag);
    }

    function drawLayer(c, src, rect, mag, cx, cy, W, H) {
      if (!src.w || !src.h) return;
      if (src.fill) {
        drawCover(c, src.fill, mag, cx, cy, W, H);
        c.fillStyle = "rgba(0, 0, 0, 0.5)";
        c.fillRect(0, 0, W, H);
      }
      const x = rect[0] * W,
        y = rect[1] * H;
      c.drawImage(src.el, cx + (x - cx) * mag, cy + (y - cy) * mag, rect[2] * W * mag, rect[3] * H * mag);
    }

    return {
      kind: "2d",
      resize(w, h) {
        canvas.width = layer.width = w;
        canvas.height = layer.height = h;
        mask.width = Math.max(1, Math.round(w * MASK_SCALE));
        mask.height = Math.max(1, Math.round(h * MASK_SCALE));
      },
      render(s) {
        const W = canvas.width,
          H = canvas.height;
        const cx = s.center[0] * W,
          cy = s.center[1] * H;
        drawLayer(ctx, s.from, s.fromRect, s.fromMag, cx, cy, W, H);
        if (!s.to || s.progress <= 0) return;

        const edge = s.edge * H,
          wob = s.wobble * H;
        const front = -wob / 2 + (s.maxR * H + wob + edge) * s.progress - edge / 2;
        if (front <= 0) return;

        lctx.globalCompositeOperation = "source-over";
        drawLayer(lctx, s.to, s.toRect, s.toMag, cx, cy, W, H);

        const k = MASK_SCALE;
        mctx.clearRect(0, 0, mask.width, mask.height);
        mctx.filter = `blur(${Math.max(1, edge * 0.3 * k)}px)`;
        mctx.fillStyle = "#fff";
        mctx.beginPath();
        for (let i = 0; i <= 96; i++) {
          const a = (i / 96) * Math.PI * 2,
            ca = Math.cos(a),
            sa = Math.sin(a);
          const n =
            vnoise(ca * 2.3 + s.time * 0.35, sa * 2.3 + s.time * 0.35) * 0.65 +
            vnoise(ca * 6 - s.time * 0.55, sa * 6 - s.time * 0.55) * 0.35;
          const r = Math.max(0, front - (n - 0.5) * wob);
          const x = (cx + ca * r) * k,
            y = (cy + sa * r) * k;
          if (i) mctx.lineTo(x, y);
          else mctx.moveTo(x, y);
        }
        mctx.closePath();
        mctx.fill();
        mctx.filter = "none";

        lctx.globalCompositeOperation = "destination-in";
        lctx.drawImage(mask, 0, 0, W, H);
        lctx.globalCompositeOperation = "source-over";
        ctx.drawImage(layer, 0, 0);
      },
    };
  }

  DG.createRenderer = function (canvas, opts) {
    opts = opts || {};
    let cv = canvas,
      impl = null,
      size = [1, 1];

    function fallback(reason) {
      if (reason) console.warn("[أبواب دمشق] التحويل إلى Canvas 2D:", reason);
      const fresh = cv.cloneNode(false);
      cv.replaceWith(fresh);
      cv = fresh;
      impl = create2D(cv);
      impl.resize(size[0], size[1]);
    }

    if (!opts.force2D) impl = createGL(cv);
    if (!impl) fallback(opts.force2D ? null : "WebGL غير متاح");

    return {
      get kind() {
        return impl.kind;
      },
      resize(w, h) {
        size = [w, h];
        impl.resize(w, h);
      },
      render(s) {
        try {
          impl.render(s);
        } catch (err) {
          if (impl.kind !== "webgl") throw err;
          fallback(err && err.name === "SecurityError" ? "الصور محمّلة من file:// — شغّل serve.js لتفعيل WebGL" : err);
          if (opts.onSwitch) opts.onSwitch();
          impl.render(s);
        }
      },
    };
  };
})();

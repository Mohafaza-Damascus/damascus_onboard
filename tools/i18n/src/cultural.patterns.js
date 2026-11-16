window.I18N_PATTERNS.push([/^الصورة (\d+) من (\d+)$/, function (m) { return "Photo " + m[1] + " of " + m[2]; }]);
window.I18N_PATTERNS.push([/^الزوج (\d+) من (\d+)$/, function (m) { return "Spread " + m[1] + " of " + m[2]; }]);
window.I18N_PATTERNS.push([/^من (\d+)$/, function (m) { return "of " + m[1]; }]);
window.I18N_PATTERNS.push([/^(\d+) (عناصر|عنصر)$/, function (m) { return m[1] + (m[1] === "1" ? " item" : " items"); }]);
window.I18N_PATTERNS.push([/^(\d+) (فعاليات|فعالية)$/, function (m) { return m[1] + (m[1] === "1" ? " event" : " events"); }]);
window.I18N_PATTERNS.push([/^انتقل إلى (.+)$/, function (m, t) { return "Go to " + t(m[1]); }]);
window.I18N_PATTERNS.push([/^(.+) — صورة (\d+)$/, function (m, t) { return t(m[1]) + " — photo " + m[2]; }]);
window.I18N_PATTERNS.push([/^.+ · .+$/, function (m, t) { var parts = m[0].split(" · "); var out = parts.map(function (p) { return /^\d+$/.test(p) ? p : t(p); }); return out.join(" · ") === m[0] ? null : out.join(" · "); }]);
window.I18N_PATTERNS.push([/^(\d{1,2}):(\d{2}) (صباحاً|مساءً)$/, function (m) { return m[1] + ":" + m[2] + (m[3] === "صباحاً" ? " AM" : " PM"); }]);

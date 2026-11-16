(function () {
  var KEY = "damascus-lang";
  var AR = /[؀-ۿ]/;
  var lang = "ar";
  try {
    if (localStorage.getItem(KEY) === "en") lang = "en";
  } catch (e) {}

  var script = document.currentScript;
  var root = script ? script.src.replace(/js\/i18n\.js(\?.*)?$/, "") : "/";

  var I18N = (window.I18N = {
    lang: lang,
    locale: lang === "en" ? "en-GB" : "ar-SY-u-nu-latn",
    missing: new Set(),
    set: function (next) {
      try {
        localStorage.setItem(KEY, next);
      } catch (e) {}
      location.reload();
    },
    toggle: function () {
      I18N.set(lang === "en" ? "ar" : "en");
    },
    t: function (text) {
      return text;
    },
  });

  if (lang !== "en") return;

  var path = location.pathname;
  var files = ["common"];
  if (/\/(index\.html)?$/.test(path) && !/\/pages\//.test(path)) files.push("home", "content-news");
  else if (/news-(enas|details)/.test(path)) files.push("news", "content-news");
  else if (/(Cultural-model-5|era|landmark|Damascus-album|Cultural-Details|Events-details)(\.html)?$/i.test(path))
    files.push("cultural");
  else if (/(services-model-2|electronic-service|services_details)/.test(path))
    files.push("services", "content-services");
  else if (/(Investments|Opportunity-details)(\.html)?$/i.test(path))
    files.push("investments", "content-opportunities");
  else if (/contact(\.html)?$/.test(path)) files.push("contact");

  var html = document.documentElement;
  html.lang = "en";
  html.dir = "ltr";
  html.classList.add("i18n-en", "i18n-pending");
  document.write('<style id="i18n-hide">html.i18n-pending body{visibility:hidden!important}</style>');
  document.write('<link rel="stylesheet" href="' + root + 'css/ltr.css">');
  window.I18N_DICT = window.I18N_DICT || {};
  window.I18N_PATTERNS = window.I18N_PATTERNS || [];
  files.forEach(function (name) {
    document.write('<script src="' + root + "js/i18n/" + name + '.js"></script>');
  });

  var norm = function (s) {
    return String(s).replace(/ /g, " ").replace(/\s+/g, " ").trim();
  };

  var lookup = function (key) {
    var dict = window.I18N_DICT;
    if (Object.prototype.hasOwnProperty.call(dict, key)) return dict[key];
    var bare = key.replace(/[.:،؛!؟?]+$/, "");
    if (bare !== key && Object.prototype.hasOwnProperty.call(dict, bare))
      return dict[bare] + key.slice(bare.length).replace(/،/g, ",").replace(/؛/g, ";").replace(/؟/g, "?");
    var patterns = window.I18N_PATTERNS;
    for (var i = 0; i < patterns.length; i++) {
      var m = key.match(patterns[i][0]);
      if (m) {
        var out = patterns[i][1](m, translate);
        if (out != null) return out;
      }
    }
    return null;
  };

  function translate(text) {
    if (!text || !AR.test(text)) return text;
    var key = norm(text);
    var found = lookup(key);
    if (found == null && /\n/.test(text.trim())) {
      var lines = text.split(/\r?\n/);
      var ok = true;
      var parts = lines.map(function (line) {
        var k = norm(line);
        if (!k || !AR.test(k)) return k;
        var v = lookup(k);
        if (v == null) ok = false;
        return v == null ? k : v;
      });
      if (ok) found = parts.filter(Boolean).join(" ");
    }
    if (found == null) {
      I18N.missing.add(key);
      return text;
    }
    var lead = text.match(/^\s*/)[0];
    var trail = text.match(/\s*$/)[0];
    return lead + found + trail;
  }
  I18N.t = translate;

  function addPairs(ar, en) {
    if (typeof ar !== "string" || typeof en !== "string" || !en.trim()) return;
    var dict = window.I18N_DICT;
    dict[norm(ar)] = norm(en);
    var al = ar.split(/\r?\n/).map(norm).filter(Boolean);
    var el = en.split(/\r?\n/).map(norm).filter(Boolean);
    if (al.length > 1 && al.length === el.length) {
      for (var i = 0; i < al.length; i++)
        dict[al[i].replace(/^#{1,6}\s+/, "").replace(/^[-*•]\s+/, "")] = el[i]
          .replace(/^#{1,6}\s+/, "")
          .replace(/^[-*•]\s+/, "");
    }
  }

  function learnContent() {
    ["NEWS_DATA", "OPPORTUNITIES_DATA", "DAMASCUS_SERVICES", "EVENTS_DATA"].forEach(function (name) {
      var list = window[name];
      if (!Array.isArray(list)) return;
      list.forEach(function (item) {
        if (!item || typeof item !== "object") return;
        Object.keys(item).forEach(function (k) {
          if (/_en$/.test(k)) addPairs(item[k.slice(0, -3)], item[k]);
        });
      });
    });
  }

  var ATTRS = ["alt", "title", "placeholder", "aria-label"];
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, TEXTAREA: 1, CODE: 1 };
  var last = new WeakMap();

  function skipped(el) {
    return el && el.closest && el.closest("[data-i18n-skip],[contenteditable='true']");
  }

  function doText(node) {
    var value = node.nodeValue;
    if (last.get(node) === value || !AR.test(value)) return;
    var parent = node.parentNode;
    if (!parent || SKIP[parent.nodeName] || skipped(parent)) return;
    var out = translate(value);
    if (out !== value) node.nodeValue = out;
    last.set(node, node.nodeValue);
  }

  function doElement(el) {
    if (el.nodeName === "SCRIPT" || el.nodeName === "STYLE" || skipped(el)) return;
    if (el.getAttribute("dir") === "rtl") el.setAttribute("dir", "ltr");
    for (var i = 0; i < ATTRS.length; i++) {
      var v = el.getAttribute(ATTRS[i]);
      if (v && AR.test(v)) {
        var tv = translate(v);
        if (tv !== v) el.setAttribute(ATTRS[i], tv);
      }
    }
    if (el.nodeName === "INPUT" && /^(button|submit|reset)$/i.test(el.type) && AR.test(el.value)) {
      var iv = translate(el.value);
      if (iv !== el.value) el.value = iv;
    }
  }

  function walk(root) {
    if (root.nodeType === 3) return doText(root);
    if (root.nodeType !== 1) return;
    doElement(root);
    var tw = document.createTreeWalker(root, 5);
    var n;
    while ((n = tw.nextNode())) {
      if (n.nodeType === 3) doText(n);
      else doElement(n);
    }
  }

  var origAlert = window.alert,
    origConfirm = window.confirm;
  window.alert = function (m) {
    return origAlert.call(window, translate(String(m)));
  };
  window.confirm = function (m) {
    return origConfirm.call(window, translate(String(m)));
  };

  function start() {
    learnContent();
    walk(document.documentElement);
    if (document.title && AR.test(document.title)) document.title = translate(document.title);
    new MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var r = records[i];
        if (r.type === "childList") r.addedNodes.forEach(walk);
        else if (r.type === "characterData") doText(r.target);
        else if (r.type === "attributes") doElement(r.target);
      }
    }).observe(html, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ATTRS.concat(["dir"]),
    });
    html.classList.remove("i18n-pending");
  }

  setTimeout(function () {
    html.classList.remove("i18n-pending");
  }, 3000);
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();

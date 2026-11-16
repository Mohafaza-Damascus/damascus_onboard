window.InvOpportunities = (function () {
  "use strict";

  const BRIEFS_DIR = "../assets/docs/investments/";
  const IMAGES_DIR = "../images/";

  const categories = {
    tourism: { label: "سياحة وفنادق", icon: "fa-hotel" },
    commerce: { label: "أسواق وحدائق", icon: "fa-store" },
    parking: { label: "مرائب", icon: "fa-square-parking" },
  };

  const defaultOpportunities = Array.isArray(window.OPPORTUNITIES_DATA) ? window.OPPORTUNITIES_DATA : [];

  const clone = (value) => JSON.parse(JSON.stringify(value));

  function getAll() {
    return clone(defaultOpportunities);
  }

  function getById(id) {
    return getAll().find((item) => String(item.id) === String(id)) || null;
  }

  function generateId(list) {
    return list.length ? Math.max(...list.map((item) => Number(item.id) || 0)) + 1 : 1;
  }

  function toDate(value) {
    if (!value) return null;

    const date = new Date(/T\d/.test(value) ? value : `${value}T23:59`);
    return Number.isNaN(date.getTime()) ? null : date;
  }

  function getStatus(item, now = new Date()) {
    const start = toDate(item.startDate);
    const deadline = toDate(item.deadline);
    if (deadline && now > deadline) return "closed";
    if (start && now < start) return "upcoming";
    return "open";
  }

  const statusLabels = {
    open: "متاحة",
    upcoming: "قريباً",
    closed: "مغلقة",
  };

  function timeLeft(item, now = new Date()) {
    const deadline = toDate(item.deadline);
    if (!deadline) return null;
    const ms = Math.max(0, deadline - now);
    return {
      ms,
      days: Math.floor(ms / 86400000),
      hours: Math.floor((ms % 86400000) / 3600000),
      minutes: Math.floor((ms % 3600000) / 60000),
      seconds: Math.floor((ms % 60000) / 1000),
    };
  }

  const EN = Boolean(window.I18N && window.I18N.lang === "en");

  function daysWord(n) {
    if (EN) return n === 1 ? "1 day" : `${n} days`;
    if (n === 1) return "يوم واحد";
    if (n === 2) return "يومان";
    if (n >= 3 && n <= 10) return `${n} أيام`;
    return `${n} يوماً`;
  }

  function hoursWord(n) {
    if (EN) return n === 1 ? "1 hour" : `${n} hours`;
    if (n === 1) return "ساعة";
    if (n === 2) return "ساعتين";
    if (n >= 3 && n <= 10) return `${n} ساعات`;
    return `${n} ساعة`;
  }

  function deadlineLabel(item, now = new Date()) {
    const status = getStatus(item, now);
    if (status === "closed") return EN ? "Applications closed" : "انتهى موعد التقديم";
    if (status === "upcoming")
      return EN ? `Opens on ${formatDate(item.startDate)}` : `تُطرح في ${formatDate(item.startDate)}`;

    const left = timeLeft(item, now);
    if (!left) return EN ? "Applications open" : "باب التقديم مفتوح";
    if (left.days === 0) {
      if (EN) return left.hours > 0 ? `Closes in ${hoursWord(left.hours)}` : "Closes in under an hour";
      return left.hours > 0 ? `تُغلق خلال ${hoursWord(left.hours)}` : "تُغلق خلال أقل من ساعة";
    }
    return EN ? `${daysWord(left.days)} left` : `متبقٍ ${daysWord(left.days)}`;
  }

  function formatDate(value, withTime = false) {
    const date = toDate(value);
    if (!date) return "—";
    const options = { day: "numeric", month: "long", year: "numeric" };
    if (withTime && /T\d/.test(value)) Object.assign(options, { hour: "2-digit", minute: "2-digit" });
    return date.toLocaleDateString(EN ? "en-GB" : "ar-SY", options);
  }

  function imageUrl(src) {
    if (!src) return "";
    if (/^(data:|https?:|\/|\.\.\/)/.test(src)) return src;
    return encodeURI(IMAGES_DIR + src);
  }

  function briefUrl(src) {
    if (!src) return "";
    if (/^(data:|https?:|\/|\.\.\/)/.test(src)) return src;
    return encodeURI(BRIEFS_DIR + src);
  }

  function escapeHtml(text) {
    return String(text ?? "").replace(
      /[&<>"]/g,
      (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch],
    );
  }

  function yearsLabel(years) {
    if (EN) return Number(years) === 1 ? "year" : "years";
    return years >= 3 && years <= 10 ? "سنوات" : "سنة";
  }

  function yearsText(years) {
    if (EN) return Number(years) > 0 ? `${years} ${yearsLabel(Number(years))}` : "To be set later";
    return Number(years) > 0 ? `${years} ${yearsLabel(Number(years))}` : "تُحدد لاحقاً";
  }

  return {
    categories,
    statusLabels,
    defaults: defaultOpportunities,
    getAll,
    getById,
    generateId,
    getStatus,
    timeLeft,
    deadlineLabel,
    formatDate,
    toDate,
    imageUrl,
    briefUrl,
    escapeHtml,
    yearsLabel,
    yearsText,
  };
})();

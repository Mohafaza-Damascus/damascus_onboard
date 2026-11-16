(function () {
  var months = { "كانون الثاني": "January", "شباط": "February", "آذار": "March", "نيسان": "April", "أيار": "May", "حزيران": "June", "تموز": "July", "آب": "August", "أيلول": "September", "تشرين الأول": "October", "تشرين الثاني": "November", "كانون الأول": "December", "يناير": "January", "فبراير": "February", "مارس": "March", "أبريل": "April", "إبريل": "April", "مايو": "May", "يونيو": "June", "يوليو": "July", "أغسطس": "August", "سبتمبر": "September", "أكتوبر": "October", "نوفمبر": "November", "ديسمبر": "December" };
  var names = Object.keys(months).sort(function (a, b) { return b.length - a.length; }).join("|");
  var P = window.I18N_PATTERNS;
  P.push([new RegExp("^(\\d{1,2}) (" + names + ") (\\d{4})$"), function (m) { return m[1] + " " + months[m[2]] + " " + m[3]; }]);
  P.push([new RegExp("^(" + names + ") (\\d{4})$"), function (m) { return months[m[1]] + " " + m[2]; }]);
  P.push([new RegExp("^(" + names + ")$"), function (m) { return months[m[1]]; }]);
  P.push([/^([\d.,]+) كم²$/, function (m) { return m[1] + " km²"; }]);
  P.push([/^([\d.,]+) م²$/, function (m) { return m[1] + " m²"; }]);
  P.push([/^([\d.,]+) م$/, function (m) { return m[1] + " m"; }]);
  P.push([/^(\d+) (خدمات|خدمة)$/, function (m) { return m[1] + (m[1] === "1" ? " service" : " services"); }]);
  P.push([/^المديرية: (.+)$/, function (m, t) { return "Directorate: " + t(m[1]); }]);
  P.push([/^(.+) - محافظة دمشق$/, function (m, t) { var x = t(m[1]); return x === m[1] ? null : x + " - Damascus Governorate"; }]);
  P.push([/^(.+) \| (.+)$/, function (m, t) { var a = t(m[1]), b = t(m[2]); return a === m[1] && b === m[2] ? null : a + " | " + b; }]);
  P.push([/^دليل (.+)$/, function (m, t) { var x = t(m[1]); return x === m[1] ? null : "Guide: " + x; }]);
})();
window.I18N_PATTERNS.push([/^الصورة (\d+)$/, function (m) { return "Photo " + m[1]; }]);

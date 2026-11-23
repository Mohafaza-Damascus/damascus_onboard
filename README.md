# بوابة محافظة دمشق

الموقع الرسمي لمحافظة دمشق: الرئيسية، الأخبار، النظرة الثقافية، الخدمات، دليل دمشق، الاستثمارات، مع لوحة تحكم لإدارة المحتوى ونسخة إنكليزية كاملة.

## التقنيات

- HTML وCSS وJavaScript بدون مرحلة بناء؛ الملفات تُنشر كما هي.
- Netlify للاستضافة، وNetlify Functions (v2) للواجهة البرمجية، وNetlify Blobs لتخزين البيانات والملفات المرفوعة.
- Node.js 18 أو أحدث للسيرفر المحلي وأدوات المشروع.
- Prettier لتنسيق الكود (`npm run format`).

## التشغيل محلياً

```bash
npm install
npm start
```

يفتح الموقع على `http://localhost:5577` (أو عبر `تشغيل.bat`). السيرفر المحلي (`server.js`):

- يقدّم الملفات الثابتة ويعيد `404.html` للمسارات غير الموجودة.
- يمرّر طلبات `/api/*` إلى الموقع المنشور (`SITE_URL`)، فتعرض النسخة المحلية البيانات الحية نفسها.
- يمرّر طلبات `/dalil/api/*` إلى خادم دليل دمشق (`DALIL_API`).

| المتغير     | الافتراضي                                     |
| ----------- | --------------------------------------------- |
| `PORT`      | `5577`                                        |
| `SITE_URL`  | `https://chipper-capybara-601cee.netlify.app` |
| `DALIL_API` | `https://landmarx.dev/developer/dalil/api`    |

## هيكلية المشروع

```
index.html, 404.html     الرئيسية وصفحة الخطأ
pages/                   صفحات الموقع
  dashboard/             لوحة التحكم
  services_details/      صفحات تفاصيل الخدمات الورقية
  services-form/         بيانات الخدمات (services-list.js) ونموذج الإضافة القديم
css/                     الأنماط (global.css مشترك)
js/                      السكربتات (global.js مشترك) وملفات البيانات الأولية
  i18n/                  قواميس الترجمة (ملفات مولّدة، لا تُعدّل يدوياً)
  vendor/                مكتبات خارجية
images/, assets/         الصور والخطوط والفيديو وملفات PDF
dalil/                   دليل دمشق (تطبيق Next.js مبني مسبقاً)
netlify/functions/       الواجهة البرمجية (api.mjs)
tools/                   أدوات سحب البيانات والترجمة
_redirects               توجيهات Netlify
```

## قالب الصفحة

كل صفحة عامة (عدا دليل دمشق) تتبع القالب التالي، و`global.js` يرسم الهيدر والفوتر ونوافذ الدخول والمساعد الذكي ويحسب المسارات حسب عمق الصفحة:

```html
<head>
  <link rel="stylesheet" href="../css/global.css" />
  <script src="../js/i18n.js"></script>
</head>
<body>
  <div id="site-header" data-active="اسم الرابط في شريط التنقل"></div>
  ...
  <div id="site-footer"></div>
  <script src="../js/global.js"></script>
</body>
```

صفحات النظرة الثقافية بُنيت أصلاً دون `global.css`، لذا تحمل `class="legacy-page"` وتحمّل `css/legacy-pages.css` لعزل أنماطها عن الأنماط العامة.

## البيانات ولوحة التحكم

لوحة التحكم على `/pages/dashboard/` وتدير أربعة أقسام. الدخول بكلمة سر واحدة تُضبط في متغير البيئة `DASHBOARD_PASSWORD` على Netlify، ويلزم نشر جديد بعد تغييرها.

| القسم           | المتغير العام        | البيانات الأولية                       | صفحات العرض                                    |
| --------------- | -------------------- | -------------------------------------- | ---------------------------------------------- |
| `news`          | `NEWS_DATA`          | `js/news-data.js`                      | الرئيسية، `news.html`، `news-details.html`     |
| `events`        | `EVENTS_DATA`        | `js/events-data.js`                    | الروزنامة في `Cultural-model-5.html`           |
| `opportunities` | `OPPORTUNITIES_DATA` | `js/opportunities-seed.js`             | `Investments.html`، `Opportunity-details.html` |
| `services`      | `DAMASCUS_SERVICES`  | `pages/services-form/services-list.js` | صفحات الخدمات وأدلتها                          |

**آلية التحميل:** تحمّل الصفحة ملف البيانات الأولية ثم `/api/data/<القسم>.js`، والثاني يستبدل المتغير العام إذا كانت هناك بيانات محفوظة. بدون اتصال بالخادم تبقى البيانات الأولية.

**الواجهة البرمجية** (`netlify/functions/api.mjs`):

| الطلب                        | الوصف                                                       | يتطلب كلمة السر |
| ---------------------------- | ----------------------------------------------------------- | --------------- |
| `GET /api/data/:name`        | `{ items, stored }`                                         | لا              |
| `GET /api/data/:name.js`     | `window.<GLOBAL> = [...]`، فارغ إن لم تُحفظ بيانات بعد      | لا              |
| `POST /api/data/:name`       | إضافة عنصر، أو مصفوفة عناصر دفعة واحدة                      | نعم             |
| `PUT /api/data/:name/:id`    | تعديل عنصر                                                  | نعم             |
| `DELETE /api/data/:name/:id` | حذف عنصر                                                    | نعم             |
| `POST /api/files`            | رفع صورة (JPG/PNG/WEBP/GIF) أو PDF حتى 5MB، ويعيد `{ url }` | نعم             |
| `GET /api/files/:key`        | الملف المرفوع                                               | لا              |
| `GET /api/backup`            | نسخة كاملة من البيانات                                      | نعم             |
| `POST /api/login`            | التحقق من كلمة السر                                         | نعم             |

- التخزين في Blobs store باسم `portal-data` (وفي بيئات المعاينة `portal-data-<context>`).
- الكتابة تستخدم ETag مع إعادة المحاولة لتجنّب تضارب التعديلات المتزامنة.
- قبل أول حفظ يقرأ الخادم البيانات الأولية من ملفات المشروع.
- معرّفات الحقائب والفعاليات أرقام متسلسلة، والأخبار والخدمات معرّفات نصية.
- الخدمات بلا صورة تأخذ صورة افتراضية من `images/services/` حسب اسمها أو مجموعتها (`SERVICE_IMAGES` و`SERVICE_GROUP_IMAGES`).
- `npm run pull-data` يكتب البيانات الحية في ملفات البيانات الأولية، ويُشغَّل تلقائياً قبل كل نشر.

## النسخة الإنكليزية

- زر اللغة في شريط التنقل (`#langBtn`) يحفظ الاختيار في `localStorage` (`damascus-lang`).
- `js/i18n.js` لا يفعل شيئاً في العربية. في الإنكليزية يضبط `lang="en" dir="ltr"`، ويحمّل `css/ltr.css` وقاموس القسم من `js/i18n/`، ثم يترجم نصوص الصفحة والنصوص المضافة لاحقاً عبر `MutationObserver`.
- مفتاح القاموس هو النص العربي حرفياً بعد توحيد المسافات. أي تعديل على نص عربي يحتاج ترجمة جديدة، وإلا يظهر بالعربية.
- النصوص المركّبة (تواريخ، أعداد، أوقات) تُترجم بأنماط في `tools/i18n/src/*.patterns.js`.
- محتوى لوحة التحكم يُترجم من حقول `<field>_en` التي تُدخل في لوحة «النسخة الإنكليزية» داخل كل محرر.
- لوحة التحكم ودليل دمشق بالعربية فقط.

مصادر الترجمة في `tools/i18n/src`:

- `<area>.json`: النصوص المستخرجة، ويُضاف الجديد في آخر الملف.
- `<area>.en.txt`: الترجمات بصيغة `رقم السطر<TAB>النص الإنكليزي`.
- `<area>.extra.txt`: ترجمات إضافية بصيغة `النص العربي<TAB>النص الإنكليزي`.
- `ltr-base.css`: قواعد الاتجاه اليدوية.

```bash
npm run i18n:extract   # استخراج النصوص الجديدة (يقرأ الخدمات من الموقع الحي)
npm run i18n:build     # بناء js/i18n/*.js و css/ltr.css
```

`css/ltr.css` يُولّد من `ltr-base.css` مع عكس `text-align` و`transform-origin` تلقائياً من ملفات الأنماط.

## النشر

النشر عبر `رفع.bat`، ويتطلب `netlify-cli` مسجّل الدخول (`npm i -g netlify-cli` ثم `netlify login`). يقوم السكربت بما يلي:

1. `npm install` عند الحاجة.
2. `npm run pull-data`.
3. نسخ الموقع إلى `..\damascus-portal-online` بدون ملفات التطوير (`tools`، `netlify`، `node_modules`، `server.js`، ملفات الإعداد).
4. `netlify deploy --prod --no-build --dir ..\damascus-portal-online --functions netlify\functions --site chipper-capybara-601cee`.

لا يُستخدم النشر بالسحب والإفلات لأنه لا ينشر الـ Functions، فتتوقف لوحة التحكم.

خوادم Netlify حساسة لحالة الأحرف في أسماء الملفات (`Investments.html` ليست `investments.html`).

## نقاط الإعداد

| الموضوع                              | الموقع                                                                                                                                                                |
| ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| روابط شريط التنقل                    | `js/global.js` ← `navItems`                                                                                                                                           |
| رابط دليل دمشق                       | `js/global.js` ← `guideHref`                                                                                                                                          |
| الفوتر وروابط التواصل الاجتماعي      | `js/global.js` ← `renderFooter`؛ الروابط مكررة في `news.html` (`follow-link`) و`contact.html` (`contact-social-btn`)                                                  |
| لون الخلفية وشفافية النقش            | `css/global.css` ← `--page-bg` و`body::before`؛ ولوحة التحكم في `css/dashboards.css`                                                                                  |
| أسئلة المساعد الذكي                  | `js/ai-chat.js` ← `KB`                                                                                                                                                |
| خادم دليل دمشق                       | `_redirects` و`server.js` ← `DALIL_API`                                                                                                                               |
| قطاعات الاستثمار وحالات الحقائب      | `js/opportunities-data.js` ← `categories` و`statusLabels`                                                                                                             |
| مديريات المحافظة (حقل إلزامي للخدمة) | `js/dashboard.js` ← `GOVERNORATE_DIRECTORATES`                                                                                                                        |
| تصنيفات الخدمات الإلكترونية          | ثلاثة مواضع يجب أن تتطابق: `js/dashboard.js` ← `DIRECTORATES`، و`js/electronic-services.js` ← `getCategory`، وأزرار `data-filter` في `pages/electronic-services.html` |
| تصنيفات الفعاليات                    | `js/dashboard.js` ← `EVENT_TYPES` و`js/calendar.js` ← `TYPES`                                                                                                         |
| الصور الافتراضية للخدمات             | `netlify/functions/api.mjs` ← `SERVICE_IMAGES` و`SERVICE_GROUP_IMAGES`                                                                                                |
| صور «استكشف أحياء دمشق»              | `js/index.js` ← `data[].img`، والملفات في `images/areas/` (840×880)                                                                                                   |
| أسماء «كانوا ينادونها»               | `pages/Cultural-model-5.html` ← `dm-tunnel__card`؛ التوقيت في `js/Cultural-model-5.js` ← `DURATION` و`NUDGE`                                                          |
| حقب «دمشق عبر العصور»                | `js/Cultural-model-5.js` ← `data`، وتفاصيل الحقبة في `js/eras-data.js` (نفس `id`)                                                                                     |
| أبواب دمشق                           | الصور في `assets/gates/` والنصوص و`gateBox` في `js/slides.js`                                                                                                         |
| كتاب «قالوا عنها»                    | `js/quotes-data.js`، والتقليب في `js/quotes-book.js` ← `TICK`                                                                                                         |
| معرض صور المعلم                      | `js/landmark.js` ← `AUTO`                                                                                                                                             |

### ملاحظات على بعض الأقسام

- **الخدمات الإلكترونية:** الخدمة بلا رابط بدء تُعرض بزر «قريباً». الخدمة التي لا ينتمي تصنيفها لقائمة التصنيفات لا تظهر في الصفحة. صفحات عرض الخدمات تحمّل `services-list.js` ثم `/api/data/services.js` ثم `services-data.js` قبل سكربتها.
- **استيراد الخدمات:** لوحة التحكم ← الخدمات ← «استيراد من ملف» يقبل مصفوفة خدمات أو `{ "services": [...] }`، ويتجاهل المكرر بالمعرّف أو بالاسم ونوع التقديم.
- **الروزنامة:** كل فعالية صفحة مستقلة مرتبة بالتاريخ والوقت، وتفتح الروزنامة على أقرب فعالية قادمة أو على `?event=<id>`. الحقول الإلزامية `title` و`date`، والوصف والملاحظة يظهران تحت الطابع. التقليب في `js/paper-flip.js`.

## دليل دمشق (`dalil/`)

تطبيق Next.js مصدَّر كملفات ثابتة من مستودع `dleel_damascus` (ليس جزءاً من هذا المجلد)، ولا يُعدّل هنا. أي تغيير يتم في المصدر ثم يُعاد البناء:

```bash
npm ci
set NEXT_PUBLIC_BASE_PATH=/dalil
set NEXT_PUBLIC_API_URL=/dalil/api
npx next build
```

ثم يُستبدل محتوى `dalil/` بمجلد `out`. البناء الحالي يتضمن تعديلات على المصدر (`output: "export"`، طبقة `static-api.ts`، إظهار الحدود الإدارية حتى zoom 12.8، زر العودة للرئيسية، تسميات دوائر الخدمات)، ويجب إعادة تطبيقها عند البناء من مصدر جديد.

يتحقق التطبيق عند التشغيل من `/dalil/api/health/` (مهلة 4 ثوانٍ). إن لم يستجب الخادم يعمل من البيانات الثابتة في `dalil/api-static/` بوظائف محدودة: الحدود الإدارية والشوارع وخطوط النقل والمعالم الثابتة، دون قاعدة الأماكن الكاملة الموجودة على الخادم فقط.

## ملاحظات

- `assets/video/damtva.mp4` بحجم ~50MB ويُفضّل ضغطه أو استضافته خارجياً.
- الصفحات التالية غير مرتبطة من شريط التنقل وتعمل بالرابط المباشر فقط: `Damascus-album.html`، `Cultural-Details.html`، `Events-details.html` (ببيانات تجريبية ثابتة)، `services-form/add-service.html` (نموذج إضافة خدمة سابق للوحة التحكم).
- روابط الصفحات القديمة محوّلة في `_redirects`.

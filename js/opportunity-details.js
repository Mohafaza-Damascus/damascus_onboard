document.addEventListener("DOMContentLoaded", () => {
  const root = document.querySelector("[data-opd-root]");
  const store = window.InvOpportunities;
  if (!root || !store) return;

  const { escapeHtml } = store;
  const id = new URLSearchParams(window.location.search).get("id");
  const item = id ? store.getById(id) : null;

  const breadcrumb = (current) => `
    <nav class="opd-crumbs" aria-label="مسار الصفحة">
      <a href="Investments.html">الاستثمارات</a>
      <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
      <a href="Investments.html#investment-opportunities">الحقائب الاستثمارية</a>
      ${current ? `<i class="fa-solid fa-chevron-left" aria-hidden="true"></i><span aria-current="page">${escapeHtml(current)}</span>` : ""}
    </nav>`;

  if (!item) {
    root.innerHTML = `
      <div class="inv-wrap opd-missing">
        ${breadcrumb("")}
        <div class="opd-missing__box">
          <i class="fa-regular fa-folder-open"></i>
          <h1 class="inv-display">لم نجد هذه الحقيبة</h1>
          <p>قد تكون الحقيبة حُذفت أو أن الرابط غير صحيح.</p>
          <a class="inv-btn" href="Investments.html#investment-opportunities">
            <span class="inv-btn__icon"><i class="fa-solid fa-arrow-left"></i></span>
            <span>العودة/span>
          </a>
        </div>
      </div>`;
    return;
  }

  document.title = `${item.title} - الحقائب الاستثمارية - محافظة دمشق`;

  const category = store.categories[item.category] || { label: "", icon: "fa-building" };
  const icon = item.icon || category.icon;
  const images = (item.images || []).filter(Boolean);
  const facts = [
    ...(item.facts || []),
    ["نوع التعاقد", "BOT (بناء – تشغيل – نقل ملكية)"],
    ["مدة الاستثمار", store.yearsText(item.years)],
  ];

  const list = (value) => (Array.isArray(value) ? value.filter(Boolean) : []);
  const planning = list(item.planning);
  const landmarks = list(item.landmarks);
  const roads = list(item.roads);
  const features = list(item.features);
  const program = list(item.program).filter((group) => list(group.items).length);

  function render() {
    const status = store.getStatus(item);

    const gallery = images.length
      ? `<figure class="opd-gallery__main"><img src="${store.imageUrl(images[0])}" alt="${escapeHtml(item.title)}" data-opd-main></figure>
         ${
           images.length > 1
             ? `<div class="opd-gallery__thumbs">${images
                 .map(
                   (src, index) => `
                     <button type="button" class="opd-gallery__thumb${index === 0 ? " is-active" : ""}" data-opd-thumb="${index}" aria-label="الصورة ${index + 1}">
                       <img src="${store.imageUrl(src)}" alt="">
                     </button>`,
                 )
                 .join("")}</div>`
             : ""
         }`
      : `<div class="opd-gallery__main opd-gallery__main--icon opd-gallery__main--${item.category}">
           <i class="fa-solid ${icon}" aria-hidden="true"></i>
         </div>`;

    const actions =
      status === "closed"
        ? `<p class="opd-closed-note"><i class="fa-solid fa-lock"></i> انتهى موعد التقديم على هذه الحقيبة.</p>`
        : `<a class="opd-btn opd-btn--primary" href="contact.html">
             <span>${status === "upcoming" ? "سجّل اهتمامك بالحقيبة" : "تقدّم بطلب"}</span>
             <i class="fa-solid fa-arrow-left"></i>
           </a>`;

    const brief = item.brief
      ? `<a class="opd-btn opd-btn--ghost" href="${store.briefUrl(item.brief)}" download target="_blank" rel="noopener">
           <i class="fa-solid fa-file-arrow-down"></i>
           <span>تحميل الحقيبة PDF</span>
         </a>`
      : "";

    const [mainTitle, ...restTitle] = item.title.split(/\s+—\s+/);
    const subTitle = restTitle.join(" — ");

    const firstFact = (item.facts || [])[0];
    const keys = [
      ["fa-regular fa-clock", "مدة الاستثمار", store.yearsText(item.years)],
      ["fa-solid fa-file-signature", "نوع التعاقد", "BOT"],
      ["fa-regular fa-calendar", "آخر موعد للتقديم", item.deadline ? store.formatDate(item.deadline) : "مفتوح"],
      ...(firstFact ? [["fa-solid fa-ruler-combined", firstFact[0], firstFact[1]]] : []),
    ];

    root.innerHTML = `
      <section class="opd-head">
        <div class="inv-wrap">
          ${breadcrumb(item.title)}

          <article class="opd-card">
            <div class="opd-card__text">
              <div class="opd-chips">
                <span class="opd-chip"><i class="fa-solid ${category.icon}"></i> ${escapeHtml(category.label)}</span>
                <span class="opd-chip opd-chip--${status}">${store.statusLabels[status]}</span>
                ${item.tag ? `<span class="opd-chip opd-chip--tag">${escapeHtml(item.tag)}</span>` : ""}
              </div>

              <h1 class="opd-title inv-display">
                ${escapeHtml(mainTitle)}
                ${subTitle ? `<span class="opd-title__sub">${escapeHtml(subTitle)}</span>` : ""}
              </h1>
              <p class="opd-loc"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(item.location)}</p>
              <p class="opd-desc">${escapeHtml(item.description)}</p>
              ${item.note ? `<p class="opd-note"><i class="fa-solid fa-circle-info"></i> ${escapeHtml(item.note)}</p>` : ""}

              <dl class="opd-keys">
                ${keys
                  .map(
                    ([iconClass, label, value]) => `
                      <div>
                        <dt><i class="${iconClass}"></i> ${escapeHtml(label)}</dt>
                        <dd>${escapeHtml(value)}</dd>
                      </div>`,
                  )
                  .join("")}
              </dl>

              <div class="opd-actions">${actions}${brief}</div>
            </div>

            <div class="opd-gallery">${gallery}</div>
          </article>
        </div>
      </section>

      <section class="opd-deadline">
        <div class="inv-wrap">
          <div class="opd-deadline__panel opd-deadline__panel--${status}" data-opd-deadline></div>
        </div>
      </section>

      ${overviewSection()}

      <section class="opd-specs">
        <div class="inv-wrap">
          <div class="opd-specs__grid${program.length ? " has-program" : ""}">
            <div class="opd-block opd-facts">
              <span class="inv-eyebrow">المنهاج العمراني</span>
              <h2 class="opd-section-title inv-display">المساحات <em>والتفاصيل</em></h2>
              <dl class="opd-facts__grid">
                ${facts
                  .map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`)
                  .join("")}
              </dl>
              ${
                features.length
                  ? `<ul class="opd-features">${features
                      .map((text) => `<li><i class="fa-solid fa-check"></i> ${escapeHtml(text)}</li>`)
                      .join("")}</ul>`
                  : ""
              }
            </div>

            ${programBlock()}
          </div>
        </div>
      </section>

      ${relatedSection()}
    `;

    renderDeadline();
    bindGallery();
  }

  function renderDeadline() {
    const panel = root.querySelector("[data-opd-deadline]");
    if (!panel) return;

    const status = store.getStatus(item);
    let html;

    if (status === "closed") {
      html = `
        <div class="opd-deadline__text">
          <span class="opd-deadline__label">أُغلق باب التقديم</span>
          <strong class="inv-display">${store.formatDate(item.deadline, true)}</strong>
          <p>هذه الحقيبة لم تعد متاحة. تصفّح الحقائب المتاحة حالياً.</p>
        </div>
        <a class="inv-btn" href="Investments.html#investment-opportunities">
          <span class="inv-btn__icon"><i class="fa-solid fa-arrow-left"></i></span>
          <span>الحقائب المتاحة</span>
        </a>`;
    } else if (status === "upcoming") {
      const left = store.timeLeft({ deadline: item.startDate });
      html = `
        <div class="opd-deadline__text">
          <span class="opd-deadline__label">تُطرح الحقيبة في</span>
          <strong class="inv-display">${store.formatDate(item.startDate, true)}</strong>
          ${item.deadline ? `<p>ويستمر التقديم حتى ${store.formatDate(item.deadline, true)}</p>` : ""}
        </div>
        ${countdown(left)}`;
    } else if (item.deadline) {
      html = `
        <div class="opd-deadline__text">
          <span class="opd-deadline__label">آخر موعد للتقديم</span>
          <strong class="inv-display">${store.formatDate(item.deadline, true)}</strong>
          <p>تُغلق الحقيبة تلقائياً عند انتهاء الموعد.</p>
        </div>
        ${countdown(store.timeLeft(item))}`;
    } else {
      html = `
        <div class="opd-deadline__text">
          <span class="opd-deadline__label">باب التقديم مفتوح</span>
          <strong class="inv-display">حتى إشعار آخر</strong>
          <p>لم يُحدَّد موعد نهائي لهذه الحقيبة بعد.</p>
        </div>`;
    }

    panel.className = `opd-deadline__panel opd-deadline__panel--${status}`;
    panel.innerHTML = html;
  }

  function countdown(left) {
    if (!left) return "";
    const units = [
      [left.days, "يوم"],
      [left.hours, "ساعة"],
      [left.minutes, "دقيقة"],
      [left.seconds, "ثانية"],
    ];
    return `
      <div class="opd-countdown" role="timer" aria-live="off">
        ${units
          .map(
            ([value, label]) => `
              <div class="opd-countdown__unit">
                <span class="opd-countdown__value inv-display">${String(value).padStart(2, "0")}</span>
                <span class="opd-countdown__label">${label}</span>
              </div>`,
          )
          .join("")}
      </div>`;
  }

  function overviewSection() {
    if (!item.summary && !planning.length && !landmarks.length && !roads.length) return "";

    const planningHtml = planning.length
      ? `<div class="opd-panel">
           <h3 class="opd-panel__title"><i class="fa-regular fa-map"></i> البيانات التنظيمية</h3>
           <dl class="opd-kv">
             ${planning.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join("")}
           </dl>
         </div>`
      : "";

    const locationHtml =
      landmarks.length || roads.length
        ? `<div class="opd-panel">
             <h3 class="opd-panel__title"><i class="fa-solid fa-location-crosshairs"></i> الموقع</h3>
             ${
               landmarks.length
                 ? `<p class="opd-panel__label">يبعد عن المعالم الهامة</p>
                    <ul class="opd-landmarks">
                      ${landmarks.map(([name, distance]) => `<li><span>${escapeHtml(name)}</span><b>${escapeHtml(distance)}</b></li>`).join("")}
                    </ul>`
                 : ""
             }
             ${
               roads.length
                 ? `<p class="opd-panel__label">الطرق الرئيسية للدخول والخروج</p>
                    <ul class="opd-roads">${roads.map((road) => `<li><i class="fa-solid fa-road"></i> ${escapeHtml(road)}</li>`).join("")}</ul>`
                 : ""
             }
           </div>`
        : "";

    return `
      <section class="opd-overview">
        <div class="inv-wrap">
          ${
            item.summary
              ? `<div class="opd-summary">
                   <span class="inv-eyebrow">موضوع المقترح</span>
                   <p class="opd-summary__text inv-display">${escapeHtml(item.summary)}</p>
                 </div>`
              : ""
          }
          ${planningHtml || locationHtml ? `<div class="opd-overview__grid">${planningHtml}${locationHtml}</div>` : ""}
        </div>
      </section>`;
  }

  function programBlock() {
    if (!program.length) return "";

    const groups = program
      .map(
        (group) => `
          <div class="opd-program__group">
            ${group.title ? `<h3 class="opd-program__title inv-display">${escapeHtml(group.title)}</h3>` : ""}
            <ol class="opd-program__list">
              ${list(group.items)
                .map(
                  ([level, use]) => `
                    <li>
                      <span class="opd-program__level">${escapeHtml(level || "")}</span>
                      <span class="opd-program__use">${escapeHtml(use)}</span>
                    </li>`,
                )
                .join("")}
            </ol>
          </div>`,
      )
      .join("");

    return `
      <div class="opd-block opd-program">
        <span class="inv-eyebrow">البرنامج الوظيفي المقترح</span>
        <h2 class="opd-section-title inv-display">استخدامات <em>المبنى</em></h2>
        <div class="opd-program__grid">${groups}</div>
      </div>`;
  }

  function bindGallery() {
    const main = root.querySelector("[data-opd-main]");
    const thumbs = root.querySelectorAll("[data-opd-thumb]");
    thumbs.forEach((thumb) => {
      thumb.addEventListener("click", () => {
        const index = Number(thumb.dataset.opdThumb);
        main.src = store.imageUrl(images[index]);
        thumbs.forEach((other) => other.classList.toggle("is-active", other === thumb));
      });
    });
  }

  function relatedSection() {
    const others = store
      .getAll()
      .filter((other) => String(other.id) !== String(item.id) && store.getStatus(other) !== "closed")
      .sort((a, b) => (b.category === item.category) - (a.category === item.category))
      .slice(0, 3);

    if (!others.length) return "";

    const cards = others
      .map((other) => {
        const otherCategory = store.categories[other.category] || { label: "", icon: "fa-building" };
        const href = `Opportunity-details.html?id=${encodeURIComponent(other.id)}`;
        const image = other.images && other.images[0];
        const media = image
          ? `<a class="inv-mcard__media" href="${href}" tabindex="-1"><img src="${store.imageUrl(image)}" alt="${escapeHtml(other.title)}" loading="lazy">`
          : `<a class="inv-mcard__media inv-mcard__media--icon inv-mcard__media--${other.category}" href="${href}" tabindex="-1"><i class="fa-solid ${other.icon || otherCategory.icon}" aria-hidden="true"></i>`;
        return `
          <article class="inv-mcard">
            ${media}<span class="inv-mcard__cat">${escapeHtml(otherCategory.label)}</span></a>
            <div class="inv-mcard__body">
              <h3 class="inv-mcard__title inv-display"><a href="${href}">${escapeHtml(other.title)}</a></h3>
              <span class="inv-mcard__loc"><i class="fa-solid fa-location-dot"></i> ${escapeHtml(other.location)}</span>
              <div class="inv-mcard__foot">
                <span class="inv-mcard__years"><i class="fa-regular fa-hourglass-half"></i> ${store.deadlineLabel(other)}</span>
                <a class="inv-link" href="${href}">التفاصيل <i class="fa-solid fa-arrow-left"></i></a>
              </div>
            </div>
          </article>`;
      })
      .join("");

    return `
      <section class="opd-related">
        <div class="inv-wrap">
          <div class="opd-related__head">
            <h2 class="opd-section-title inv-display">حقائب <em>أخرى</em></h2>
            <a class="inv-link" href="Investments.html#investment-opportunities">كل الحقائب <i class="fa-solid fa-arrow-left"></i></a>
          </div>
          <div class="opd-related__grid">${cards}</div>
        </div>
      </section>`;
  }

  render();

  let lastStatus = store.getStatus(item);
  if (item.deadline || item.startDate) {
    setInterval(() => {
      const status = store.getStatus(item);
      if (status !== lastStatus) {
        lastStatus = status;
        render();
      } else if (status !== "closed") {
        renderDeadline();
      }
    }, 1000);
  }
});

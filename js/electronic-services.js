document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("electronicServicesGrid");
  const searchInput = document.getElementById("electronicServiceSearch");
  const filters = document.getElementById("serviceFilters");
  const emptyMessage = document.getElementById("noServicesMessage");

  let selectedCategory = "all";

  function cardHtml(service) {
    const guideUrl = `electronic-service-guide.html?id=${encodeURIComponent(service.id)}`;
    const hasLink = Boolean(service.serviceUrl);

    const startButton = hasLink
      ? `<a class="svc-card__btn" href="${escapeHtml(service.serviceUrl)}" target="_blank" rel="noopener">
           ابدأ الخدمة <i class="fa-solid fa-arrow-left"></i>
         </a>`
      : `<span class="svc-card__btn svc-card__btn--soon">قريباً</span>`;

    return `
      <article class="svc-card">
        <span class="svc-card__img" style="background-image: url('${serviceImage(service)}')"></span>
        <div class="svc-card__link" aria-label="عرض دليل الخدمة: ${escapeHtml(service.name)}"></div>
        <div class="svc-card__body">
          <span class="svc-card__tag">${escapeHtml(service.electronicDirectorate)}</span>
          <h3 class="svc-card__title">${escapeHtml(service.name)}</h3>
        </div>
        <div class="svc-card__actions">
          <a class="svc-card__btn svc-card__btn--ghost" href="${guideUrl}">عرض الدليل</a>
          ${startButton}
        </div>
      </article>`;
  }

  function render() {
    const query = searchInput.value.trim();

    const services = getServices()
      .filter(isElectronic)
      .filter((service) => selectedCategory === "all" || service.electronicDirectorate === selectedCategory)
      .filter((service) => `${service.name} ${service.description}`.includes(query));

    grid.innerHTML = services.map(cardHtml).join("");
    emptyMessage.hidden = services.length > 0;
  }

  filters.addEventListener("click", (event) => {
    const button = event.target.closest(".service-filter");
    if (!button) return;

    selectedCategory = button.dataset.filter;

    filters.querySelectorAll(".service-filter").forEach((item) => {
      item.classList.toggle("active", item === button);
    });

    render();
  });

  searchInput.addEventListener("input", render);

  render();
});

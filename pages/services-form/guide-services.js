document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("guideServicesGrid");
  const searchInput = document.getElementById("searchInput");

  function cardHtml(service) {
    const detailsUrl = `guide-details.html?id=${encodeURIComponent(service.id)}`;

    return `
      <article class="svc-card">
        <span class="svc-card__img" style="background-image: url('${serviceImage(service)}')"></span>
        <a class="svc-card__link" href="${detailsUrl}" aria-label="عرض دليل الخدمة: ${escapeHtml(service.name)}"></a>
        <span class="svc-card__arrow"><i class="fa-solid fa-arrow-left"></i></span>
        <div class="svc-card__body">
          <span class="svc-card__tag">${escapeHtml(service.address || service.directorate || "")}</span>
          <h3 class="svc-card__title">${escapeHtml(service.name)}</h3>
          <p class="svc-card__desc">${escapeHtml(service.description)}</p>
        </div>
      </article>`;
  }

  function render() {
    const query = searchInput.value.trim();

    const services = getServices()
      .filter((service) => !isElectronic(service))
      .filter((service) => `${service.name} ${service.address || ""} ${service.description}`.includes(query));

    grid.innerHTML = services.map(cardHtml).join("");
  }

  searchInput.addEventListener("input", render);

  render();
});

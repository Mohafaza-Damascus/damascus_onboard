document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.querySelector(".dir-search__btn");
  const cards = document.querySelectorAll(".dir-card");

  const performSearch = () => {
    const query = searchInput.value.trim().toLowerCase();
    cards.forEach((card) => {
      const title = card.querySelector(".dir-card__badge span");
      const text = title ? title.textContent.toLowerCase() : "";
      card.style.display = text.includes(query) ? "" : "none";
    });
  };

  if (searchInput) {
    searchInput.addEventListener("input", performSearch);
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") { e.preventDefault(); performSearch(); }
    });
  }
  if (searchBtn) searchBtn.addEventListener("click", performSearch);

  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      const name = card.querySelector(".dir-card__badge span")?.textContent.trim();
      window.location.href = `directorate-details.html?id=${i + 1}&name=${encodeURIComponent(name)}`;
    });
  });
});

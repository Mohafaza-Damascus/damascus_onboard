document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".detail-card");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase().trim();

      cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(value) ? "" : "none";
      });
    });
  }

  cards.forEach((card) => {
    const href = card.dataset.href;
    if (!href) return;

    card.style.cursor = "pointer";

    card.addEventListener("click", (e) => {
      window.location.href = href;
    });
  });
});

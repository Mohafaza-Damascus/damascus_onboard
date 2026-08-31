document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll(".ministry-card");

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase().trim();

      cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(value) ? "" : "none";
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const projectsGrid = document.querySelector(".projects-grid");
  const sectorButtons = document.querySelectorAll(".sector-btn");
  const projectsCountDisplay = document.querySelector(".projects-count");

  sectorButtons.forEach((button) => {
    button.addEventListener("click", function () {
      sectorButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      const selected = this.textContent.trim();
      filterProjects(selected);
    });
  });

  const filterProjects = (category) => {
    const cards = document.querySelectorAll(".project-card");
    let count = 0;
    cards.forEach((card) => {
      const badge = card.querySelector(".category-badge");
      const cardCategory = badge ? badge.textContent.trim() : "";
      if (category === "الكل" || cardCategory === category) {
        card.style.display = "";
        count++;
      } else {
        card.style.display = "none";
      }
    });

    if (projectsCountDisplay) {
      projectsCountDisplay.textContent = `عدد المشاريع (${count})`;
    }
  };

  document.querySelectorAll(".project-card").forEach((card, index) => {
    card.addEventListener("click", () => {
      const id = card.dataset.id || index + 1;
      window.location.href = `project-details.html?id=${id}`;
    });
  });
});

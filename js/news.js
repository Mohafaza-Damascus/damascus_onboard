document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const newsGroups = document.querySelectorAll(".news-group");
  const sectionTitles = document.querySelectorAll(".section-divider-title");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.filter;

      if (filter === "all") {
        newsGroups.forEach((g) => (g.style.display = ""));
        sectionTitles.forEach((t) => (t.style.display = ""));
        return;
      }

      newsGroups.forEach((g) => (g.style.display = "none"));
      sectionTitles.forEach((t) => (t.style.display = "none"));

      const target = document.querySelector(
        `.news-group[data-category="${filter}"]`
      );
      if (target) {
        target.style.display = "";
        const prev = target.previousElementSibling;
        if (prev && prev.classList.contains("section-divider-title")) {
          prev.style.display = "";
        }
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const newsGroups = document.querySelectorAll(".news-group");
  const sectionTitles = document.querySelectorAll(".section-divider-title");

  function applyFilter(filter) {
    if (filter === "all") {
      newsGroups.forEach((group) => (group.style.display = ""));
      sectionTitles.forEach((title) => (title.style.display = ""));
      return;
    }

    newsGroups.forEach((group) => (group.style.display = "none"));
    sectionTitles.forEach((title) => (title.style.display = "none"));

    const target = document.querySelector(
      `.news-group[data-category="${filter}"]`,
    );

    if (!target) return;

    target.style.display = "";
    const previousElement = target.previousElementSibling;

    if (
      previousElement &&
      previousElement.classList.contains("section-divider-title")
    ) {
      previousElement.style.display = "";
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      applyFilter(tab.dataset.filter);
    });
  });

  const page = document.querySelector(".news-page");
  if (!page) return;

  const model = page.classList.contains("news-page--model-2")
    ? 2
    : page.classList.contains("news-page--model-3")
      ? 3
      : page.classList.contains("news-page--model-4")
        ? 4
        : 0;

  if (!model) return;

  function mod(value, length) {
    return ((value % length) + length) % length;
  }

  function createControlButton(direction) {
    const button = document.createElement("button");
    const isPrevious = direction === "previous";

    button.type = "button";
    button.className = "news-carousel__btn";
    button.dataset.direction = direction;
    button.setAttribute("aria-label", isPrevious ? "الخبر السابق" : "الخبر التالي");
    button.innerHTML = `<span aria-hidden="true">${isPrevious ? "→" : "←"}</span>`;

    return button;
  }

  function createCarousel(group, groupIndex) {
    const grid = group.querySelector(".news-grid");
    const cards = Array.from(grid?.querySelectorAll(".news-card") || []);

    if (!grid || cards.length < 2) return;

    const carouselId = `news-carousel-${model}-${groupIndex + 1}`;
    grid.id = carouselId;

    const carousel = document.createElement("div");
    carousel.className = "news-carousel";
    carousel.setAttribute("role", "region");
    carousel.setAttribute("aria-roledescription", "دوّار أخبار");
    carousel.setAttribute("aria-label", "التنقل بين الأخبار");

    const viewport = document.createElement("div");
    viewport.className = "news-carousel__viewport";

    const controls = document.createElement("div");
    controls.className = "news-carousel__controls";

    const previousButton = createControlButton("previous");
    const count = document.createElement("span");
    count.className = "news-carousel__count";
    count.setAttribute("aria-live", "polite");
    const nextButton = createControlButton("next");

    previousButton.setAttribute("aria-controls", carouselId);
    nextButton.setAttribute("aria-controls", carouselId);

    grid.parentNode.insertBefore(carousel, grid);
    carousel.appendChild(viewport);
    viewport.appendChild(grid);
    controls.append(previousButton, count, nextButton);
    carousel.appendChild(controls);

    let activeIndex = 0;

    function resetCardClasses() {
      cards.forEach((card) => {
        card.classList.remove(
          "news-card--featured",
          "news-card--secondary",
          "news-card--secondary-1",
          "news-card--secondary-2",
          "news-card--center",
          "news-card--side",
          "news-card--side-left",
          "news-card--side-right",
          "news-card--stacked",
          "news-card--stacked-0",
          "news-card--stacked-1",
          "news-card--stacked-2",
        );
        card.setAttribute("aria-hidden", "true");
      });
    }

    function showModelTwo() {
      resetCardClasses();

      const featuredCard = cards[activeIndex];
      const firstSecondaryCard = cards[mod(activeIndex + 1, cards.length)];
      const secondSecondaryCard = cards[mod(activeIndex + 2, cards.length)];

      featuredCard.classList.add("news-card--featured");
      featuredCard.setAttribute("aria-hidden", "false");

      if (firstSecondaryCard !== featuredCard) {
        firstSecondaryCard.classList.add(
          "news-card--secondary",
          "news-card--secondary-1",
        );
        firstSecondaryCard.setAttribute("aria-hidden", "false");
      }

      if (
        secondSecondaryCard !== featuredCard &&
        secondSecondaryCard !== firstSecondaryCard
      ) {
        secondSecondaryCard.classList.add(
          "news-card--secondary",
          "news-card--secondary-2",
        );
        secondSecondaryCard.setAttribute("aria-hidden", "false");
      }

      count.textContent = `${activeIndex + 1} / ${cards.length}`;
    }

    function showModelThree() {
      resetCardClasses();

      const centerCard = cards[activeIndex];
      const rightCard = cards[mod(activeIndex + 1, cards.length)];
      const leftCard = cards[mod(activeIndex - 1, cards.length)];

      centerCard.classList.add("news-card--center");
      centerCard.setAttribute("aria-hidden", "false");

      if (rightCard !== centerCard) {
        rightCard.classList.add("news-card--side", "news-card--side-right");
        rightCard.setAttribute("aria-hidden", "false");
      }

      if (leftCard !== centerCard && leftCard !== rightCard) {
        leftCard.classList.add("news-card--side", "news-card--side-left");
        leftCard.setAttribute("aria-hidden", "false");
      }

      count.textContent = `${activeIndex + 1} / ${cards.length}`;
    }

    function showModelFour() {
      resetCardClasses();

      const featuredCard = cards[activeIndex];
      const firstStackedCard = cards[mod(activeIndex + 1, cards.length)];
      const secondStackedCard = cards[mod(activeIndex + 2, cards.length)];
      const thirdStackedCard = cards[mod(activeIndex + 3, cards.length)];

      featuredCard.classList.add("news-card--featured");
      featuredCard.setAttribute("aria-hidden", "false");

      if (firstStackedCard !== featuredCard) {
        firstStackedCard.classList.add(
          "news-card--stacked",
          "news-card--stacked-0",
        );
      }

      if (
        secondStackedCard !== featuredCard &&
        secondStackedCard !== firstStackedCard
      ) {
        secondStackedCard.classList.add(
          "news-card--stacked",
          "news-card--stacked-1",
        );
      }

      if (
        thirdStackedCard !== featuredCard &&
        thirdStackedCard !== firstStackedCard &&
        thirdStackedCard !== secondStackedCard
      ) {
        thirdStackedCard.classList.add(
          "news-card--stacked",
          "news-card--stacked-2",
        );
      }

      count.textContent = `${activeIndex + 1} / ${cards.length}`;
    }

    function render() {
      if (model === 2) showModelTwo();
      if (model === 3) showModelThree();
      if (model === 4) showModelFour();
    }

    function move(direction) {
      activeIndex = mod(
        activeIndex + (direction === "next" ? 1 : -1),
        cards.length,
      );
      render();
    }

    previousButton.addEventListener("click", () => move("previous"));
    nextButton.addEventListener("click", () => move("next"));

    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        move("previous");
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        move("next");
      }
    });

    render();
  }

  newsGroups.forEach(createCarousel);
});

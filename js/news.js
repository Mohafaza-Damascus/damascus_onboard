document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab-btn");
  const newsGroups = document.querySelectorAll(".news-group");
  const sectionTitles = document.querySelectorAll(".section-divider-title");

function applyFilter(filter) {
  const allGroup = document.querySelector(
    '.news-group[data-category="all"]'
  );

  if (!allGroup) return;

  const cards = allGroup.querySelectorAll(".news-card--model-5");

  cards.forEach((card) => {
    if (filter === "all") {
      card.style.display = "";
      return;
    }

    const categories = (card.dataset.categories || "")
      .split(/\s+/)
      .filter(Boolean);

    card.style.display = categories.includes(filter)
      ? ""
      : "none";
  });

  newsGroups.forEach((group) => {
    if (group.dataset.category === "all") {
      group.style.display = "";
    } else {
      group.style.display = "none";
    }
  });
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

const pageTabs = page.querySelectorAll(".tab-btn");
const pageNewsGroups = page.querySelectorAll(".news-group");
const pageSectionTitles = page.querySelectorAll(".section-divider-title");

function applyPageFilter(filter) {
  pageNewsGroups.forEach((group) => {
    if (filter === "all") {
      group.style.display = "";
    } else {
      group.style.display =
        group.dataset.category === filter ? "" : "none";
    }
  });

  pageSectionTitles.forEach((title) => {
    const group = title.nextElementSibling;

    if (
      group &&
      group.classList.contains("news-group")
    ) {
      if (filter === "all") {
        title.style.display = "";
      } else {
        title.style.display =
          group.dataset.category === filter ? "" : "none";
      }
    }
  });
}

pageTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    pageTabs.forEach((item) => {
      item.classList.remove("active");
    });

    tab.classList.add("active");

    applyPageFilter(tab.dataset.filter);
  });
});

const pageActiveTab = page.querySelector(".tab-btn.active");

if (pageActiveTab) {
  applyPageFilter(pageActiveTab.dataset.filter);
}

  const model = page.classList.contains("news-page--model-2")
    ? 2
    : page.classList.contains("news-page--model-3")
      ? 3
      : page.classList.contains("news-page--model-4")
        ? 4
         : page.classList.contains("news-page--model-5")
          ? 5
        : 0;

  if (!model) return;

if (model === 2) {
    function applyModelTwoFilter(filter) {
        newsGroups.forEach((group) => {
            if (filter === "all") {
                group.style.display = "";
            } else {
                group.style.display =
                    group.dataset.category === filter ? "" : "none";
            }
        });

        sectionTitles.forEach((title) => {
            const group = title.nextElementSibling;

            if (
                group &&
                group.classList.contains("news-group")
            ) {
                if (filter === "all") {
                    title.style.display = "";
                } else {
                    title.style.display =
                        group.dataset.category === filter ? "" : "none";
                }
            }
        });
    }

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            tabs.forEach((item) => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            applyModelTwoFilter(tab.dataset.filter);
        });
    });

    const activeTab = document.querySelector(
        ".news-page--model-2 .tab-btn.active"
    );

    if (activeTab) {
        applyModelTwoFilter(activeTab.dataset.filter);
    }
}

if (model === 3) {
  function applyModelThreeFilter(filter) {
    newsGroups.forEach((group) => {
      if (filter === "all") {
        group.style.display = "";
      } else {
        group.style.display =
          group.dataset.category === filter ? "" : "none";
      }
    });

    sectionTitles.forEach((title) => {
      const group = title.nextElementSibling;

      if (
        group &&
        group.classList.contains("news-group")
      ) {
        if (filter === "all") {
          title.style.display = "";
        } else {
          title.style.display =
            group.dataset.category === filter ? "" : "none";
        }
      }
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => {
        item.classList.remove("active");
      });

      tab.classList.add("active");

      applyModelThreeFilter(tab.dataset.filter);
    });
  });

  const activeTab = document.querySelector(
    ".news-page--model-3 .tab-btn.active"
  );

  if (activeTab) {
    applyModelThreeFilter(activeTab.dataset.filter);
  }
}

if (model === 4) {
  function applyModelFourFilter(filter) {
    newsGroups.forEach((group) => {
      if (filter === "all") {
        group.style.display = "";
      } else {
        group.style.display =
          group.dataset.category === filter ? "" : "none";
      }
    });

    sectionTitles.forEach((title) => {
      const group = title.nextElementSibling;

      if (
        group &&
        group.classList.contains("news-group")
      ) {
        if (filter === "all") {
          title.style.display = "";
        } else {
          title.style.display =
            group.dataset.category === filter ? "" : "none";
        }
      }
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => {
        item.classList.remove("active");
      });

      tab.classList.add("active");

      applyModelFourFilter(tab.dataset.filter);
    });
  });

  const activeTab = document.querySelector(
    ".news-page--model-4 .tab-btn.active"
  );

  if (activeTab) {
    applyModelFourFilter(activeTab.dataset.filter);
  }
}

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

  if (model === 5) {

  const cardsPerPage = 6;
  let currentPage = 1;

  const pagination = document.querySelector("#newsPagination");

  const allGroup = document.querySelector(
  '.news-page--model-5 .news-group[data-category="all"]'
  );

  const allCards = allGroup
    ? Array.from(
        allGroup.querySelectorAll(".news-card--model-5")
      )
    : [];
    allCards.forEach((card) => {
  card.addEventListener("click", (event) => {

    if (event.target.closest("a")) {
      return;
    }

    const link = card.querySelector(".news-card__btn--model-5");

    if (link) {
      window.location.href = link.href;
    }

  });
});
  function getActiveCards() {
    const activeTab = document.querySelector(
      ".news-page--model-5 .tab-btn.active"
    );

    if (!activeTab) {
      return [];
    }

    const filter = activeTab.dataset.filter;

    if (filter === "all") {
      return allCards;
    }

    return allCards.filter((card) => {
      const categories = (card.dataset.categories || "")
        .split(/\s+/)
        .filter(Boolean);

      return categories.includes(filter);
    });
  }


  function renderPagination() {

    if (!pagination) {
      return;
    }

    const cards = getActiveCards();

    const totalPages = Math.ceil(
      cards.length / cardsPerPage
    );


    /*
     * إخفاء كل الكروت
     */
    document
      .querySelectorAll(
        ".news-page--model-5 .news-card--model-5"
      )
      .forEach((card) => {
        card.style.display = "none";
      });


    /*
     * عرض 6 كروت فقط
     */
    const start = (currentPage - 1) * cardsPerPage;
    const end = start + cardsPerPage;

    cards.slice(start, end).forEach((card) => {
      card.style.display = "";
    });


    /*
     * Pagination
     */
    pagination.innerHTML = "";


    if (totalPages <= 1) {
      pagination.style.display = "none";
      return;
    }


    pagination.style.display = "flex";


    function addPage(number) {

      const button = document.createElement("button");

      button.type = "button";
      button.className = "news-pagination__number";

      if (number === currentPage) {
        button.classList.add("is-active");
      }

      button.textContent = number;

      button.addEventListener("click", () => {

        currentPage = number;

        renderPagination();

      });

      pagination.appendChild(button);
    }


    function addDots() {

      const dots = document.createElement("span");

      dots.className = "news-pagination__dots";
      dots.textContent = "…";

      pagination.appendChild(dots);
    }


    /*
     * الصفحات
     */

    if (totalPages <= 10) {

      for (let i = 1; i <= totalPages; i++) {
        addPage(i);
      }

      return;
    }


    /*
     * البداية:
     *
     * 1 2 3 4 5 6 7 8 9 ... 100
     */
    if (currentPage <= 5) {

      for (let i = 1; i <= 9; i++) {
        addPage(i);
      }

      addDots();

      addPage(totalPages);

      return;
    }


    /*
     * النهاية:
     *
     * 1 ... 92 93 94 95 96 97 98 99 100
     */
    if (currentPage >= totalPages - 4) {

      addPage(1);

      addDots();

      for (
        let i = totalPages - 8;
        i <= totalPages;
        i++
      ) {
        addPage(i);
      }

      return;
    }


    /*
     * المنتصف:
     *
     * 1 ... 46 47 48 49 50 51 52 53 54 ... 100
     */
    addPage(1);

    addDots();

    for (
      let i = currentPage - 4;
      i <= currentPage + 4;
      i++
    ) {
      addPage(i);
    }

    addDots();

    addPage(totalPages);
  }


  /*
   * عند تغيير التاب
   */
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      currentPage = 1;
      renderPagination();
    });
  });


  /*
   * التشغيل أول مرة
   */
  const activeTab = document.querySelector(
    ".news-page--model-5 .tab-btn.active"
  );

  if (activeTab) {

    applyFilter(activeTab.dataset.filter);

  }

  renderPagination();
}
if (model !== 5) {
  newsGroups.forEach(createCarousel);
}
});

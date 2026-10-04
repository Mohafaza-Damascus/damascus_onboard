document.addEventListener("DOMContentLoaded", () => {
    const tabs = document.querySelectorAll(".news-v2-tab");
    const groups = document.querySelectorAll(".news-v2-group");
    const pagination = document.getElementById("newsV2Pagination");

    const ITEMS_PER_PAGE = 6;

    let currentFilter = "all";
    let currentPage = 1;

    /*
    |--------------------------------------------------------------------------
    | Get all cards
    |--------------------------------------------------------------------------
    */

    const getAllCards = () => {
        return Array.from(
            document.querySelectorAll(".news-v2-card")
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Get filtered cards
    |--------------------------------------------------------------------------
    */

    const getFilteredCards = () => {
        const cards = getAllCards();

        if (currentFilter === "all") {
            return cards;
        }

        return cards.filter((card) => {
            return card.dataset.category === currentFilter;
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Hide all groups
    |--------------------------------------------------------------------------
    */

    const hideAllGroups = () => {
        groups.forEach((group) => {
            group.classList.add("is-hidden");
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Show selected groups
    |--------------------------------------------------------------------------
    */

    const updateGroups = () => {
        hideAllGroups();

        if (currentFilter === "all") {
            groups.forEach((group) => {
                group.classList.remove("is-hidden");
            });

            return;
        }

        const selectedGroup = document.querySelector(
            `.news-v2-group[data-category="${currentFilter}"]`
        );

        if (selectedGroup) {
            selectedGroup.classList.remove("is-hidden");
        }
    };

    /*
    |--------------------------------------------------------------------------
    | Render pagination
    |--------------------------------------------------------------------------
    */

    const renderPagination = (totalItems) => {
        pagination.innerHTML = "";

        const totalPages = Math.ceil(
            totalItems / ITEMS_PER_PAGE
        );

        /*
        |--------------------------------------------------------------------------
        | No pagination required
        |--------------------------------------------------------------------------
        */

        if (totalPages <= 1) {
            return;
        }

        /*
        |--------------------------------------------------------------------------
        | Previous
        |--------------------------------------------------------------------------
        */

        const previousButton = document.createElement("button");

        previousButton.type = "button";

        previousButton.className =
            "news-v2-pagination__arrow";

        previousButton.innerHTML = "‹";

        previousButton.setAttribute(
            "aria-label",
            "الصفحة السابقة"
        );

        previousButton.disabled = currentPage === 1;

        previousButton.addEventListener("click", () => {
            if (currentPage > 1) {
                currentPage--;

                render();

                scrollToNews();
            }
        });

        pagination.appendChild(previousButton);

        /*
        |--------------------------------------------------------------------------
        | Page numbers
        |--------------------------------------------------------------------------
        */

        const pages = getPaginationPages(
            currentPage,
            totalPages
        );

        pages.forEach((page) => {
            if (page === "...") {
                const dots = document.createElement("span");

                dots.className =
                    "news-v2-pagination__dots";

                dots.textContent = "...";

                pagination.appendChild(dots);

                return;
            }

            const pageButton =
                document.createElement("button");

            pageButton.type = "button";

            pageButton.textContent = page;

            if (page === currentPage) {
                pageButton.classList.add("is-active");

                pageButton.setAttribute(
                    "aria-current",
                    "page"
                );
            }

            pageButton.addEventListener("click", () => {
                currentPage = page;

                render();

                scrollToNews();
            });

            pagination.appendChild(pageButton);
        });

        /*
        |--------------------------------------------------------------------------
        | Next
        |--------------------------------------------------------------------------
        */

        const nextButton = document.createElement("button");

        nextButton.type = "button";

        nextButton.className =
            "news-v2-pagination__arrow";

        nextButton.innerHTML = "›";

        nextButton.setAttribute(
            "aria-label",
            "الصفحة التالية"
        );

        nextButton.disabled =
            currentPage === totalPages;

        nextButton.addEventListener("click", () => {
            if (currentPage < totalPages) {
                currentPage++;

                render();

                scrollToNews();
            }
        });

        pagination.appendChild(nextButton);
    };

    /*
    |--------------------------------------------------------------------------
    | Pagination page calculation
    |--------------------------------------------------------------------------
    */

    const getPaginationPages = (
        current,
        total
    ) => {
        /*
        |--------------------------------------------------------------------------
        | Small number of pages
        |--------------------------------------------------------------------------
        */

        if (total <= 7) {
            return Array.from(
                { length: total },
                (_, index) => index + 1
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Beginning
        |--------------------------------------------------------------------------
        */

        if (current <= 4) {
            return [
                1,
                2,
                3,
                4,
                5,
                "...",
                total,
            ];
        }

        /*
        |--------------------------------------------------------------------------
        | End
        |--------------------------------------------------------------------------
        */

        if (current >= total - 3) {
            return [
                1,
                "...",
                total - 4,
                total - 3,
                total - 2,
                total - 1,
                total,
            ];
        }

        /*
        |--------------------------------------------------------------------------
        | Middle
        |--------------------------------------------------------------------------
        */

        return [
            1,
            "...",
            current - 1,
            current,
            current + 1,
            "...",
            total,
        ];
    };

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    const render = () => {
        const cards = getAllCards();

        const filteredCards =
            getFilteredCards();

        /*
        |--------------------------------------------------------------------------
        | Hide every card
        |--------------------------------------------------------------------------
        */

        cards.forEach((card) => {
            card.style.display = "none";
        });

        /*
        |--------------------------------------------------------------------------
        | Pagination
        |--------------------------------------------------------------------------
        */

        const totalPages = Math.ceil(
            filteredCards.length / ITEMS_PER_PAGE
        );

        /*
        |--------------------------------------------------------------------------
        | Protect current page
        |--------------------------------------------------------------------------
        */

        if (currentPage > totalPages && totalPages > 0) {
            currentPage = totalPages;
        }

        /*
        |--------------------------------------------------------------------------
        | Current page slice
        |--------------------------------------------------------------------------
        */

        const start =
            (currentPage - 1) * ITEMS_PER_PAGE;

        const end =
            start + ITEMS_PER_PAGE;

        const visibleCards =
            filteredCards.slice(start, end);

        /*
        |--------------------------------------------------------------------------
        | Show cards
        |--------------------------------------------------------------------------
        */

        visibleCards.forEach((card) => {
            card.style.display = "flex";
        });

        /*
        |--------------------------------------------------------------------------
        | Update groups
        |--------------------------------------------------------------------------
        */

        updateGroups();

        /*
        |--------------------------------------------------------------------------
        | Render pagination
        |--------------------------------------------------------------------------
        */

        renderPagination(
            filteredCards.length
        );
    };

    /*
    |--------------------------------------------------------------------------
    | Scroll to news
    |--------------------------------------------------------------------------
    */

    const scrollToNews = () => {
        const container =
            document.querySelector(
                ".news-v2-container"
            );

        if (!container) {
            return;
        }

        const top =
            container.getBoundingClientRect().top +
            window.scrollY -
            30;

        window.scrollTo({
            top,
            behavior: "smooth",
        });
    };

    /*
    |--------------------------------------------------------------------------
    | Tabs
    |--------------------------------------------------------------------------
    */

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const filter =
                tab.dataset.filter;

            if (!filter) {
                return;
            }

            /*
            |--------------------------------------------------------------------------
            | Active tab
            |--------------------------------------------------------------------------
            */

            tabs.forEach((item) => {
                item.classList.remove("is-active");

                item.removeAttribute(
                    "aria-selected"
                );
            });

            tab.classList.add("is-active");

            tab.setAttribute(
                "aria-selected",
                "true"
            );

            /*
            |--------------------------------------------------------------------------
            | Update filter
            |--------------------------------------------------------------------------
            */

            currentFilter = filter;

            /*
            |--------------------------------------------------------------------------
            | Reset page
            |--------------------------------------------------------------------------
            */

            currentPage = 1;

            /*
            |--------------------------------------------------------------------------
            | Render
            |--------------------------------------------------------------------------
            */

            render();
        });
    });

    /*
    |--------------------------------------------------------------------------
    | Initial state
    |--------------------------------------------------------------------------
    */

    const activeTab =
        document.querySelector(
            ".news-v2-tab.is-active"
        );

    if (activeTab) {
        activeTab.setAttribute(
            "aria-selected",
            "true"
        );
    }

    render();
});
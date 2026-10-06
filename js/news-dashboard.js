(function () {
    "use strict";

    const STORAGE_KEY = "damascus_news";

    const defaultNews = [
        {
            id: 1,
            title: "نشاطات مديرية البيئة في محافظة دمشق",
            category: "governorate",
            date: "2025-10-10",
            status: "published",
            image: "../images/newdata/1.jpeg",
            summary:
                "تعلن مديرية البيئة في محافظة دمشق عن فتح باب التسجيل في النادي الصيفي البيئي المجاني لعام 2026.",
            content:
                "تعلن مديرية البيئة في محافظة دمشق عن مجموعة من النشاطات والفعاليات البيئية التي تهدف إلى تعزيز الوعي البيئي لدى المجتمع.",
        },
        {
            id: 2,
            title: "إطلاق مبادرة جديدة لخدمة المواطنين",
            category: "general",
            date: "2025-09-25",
            status: "published",
            image: "../images/newdata/2.jpeg",
            summary:
                "مبادرة جديدة تهدف إلى تحسين مستوى الخدمات المقدمة للمواطنين.",
            content:
                "تم إطلاق مبادرة جديدة تهدف إلى تحسين مستوى الخدمات وتسهيل وصول المواطنين إليها.",
        },
        {
            id: 3,
            title: "حملة توعوية في مدينة دمشق",
            category: "general",
            date: "2025-09-18",
            status: "published",
            image: "../images/newdata/3.jpeg",
            summary:
                "حملة توعوية تهدف إلى تعزيز المشاركة المجتمعية.",
            content:
                "تتضمن الحملة مجموعة من الأنشطة التوعوية والمجتمعية.",
        },
        {
            id: 4,
            title: "اجتماع عمل في محافظة دمشق",
            category: "governorate",
            date: "2025-09-12",
            status: "published",
            image: "../images/newdata/4.jpeg",
            summary:
                "اجتماع لمناقشة عدد من الملفات الخدمية والتنموية.",
            content:
                "ناقش الاجتماع مجموعة من الملفات المتعلقة بالخدمات والتنمية في محافظة دمشق.",
        },
        {
            id: 5,
            title: "مشاريع خدمية جديدة في المحافظة",
            category: "governorate",
            date: "2025-09-05",
            status: "published",
            image: "../images/newdata/5.jpeg",
            summary:
                "البدء بتنفيذ عدد من المشاريع الخدمية الجديدة.",
            content:
                "بدأت محافظة دمشق بتنفيذ مجموعة من المشاريع الخدمية بهدف تحسين الواقع الخدمي.",
        },
        {
            id: 6,
            title: "فعالية مجتمعية في دمشق",
            category: "general",
            date: "2025-08-28",
            status: "published",
            image: "../images/newdata/6.jpeg",
            summary:
                "فعالية مجتمعية بمشاركة عدد من الجهات والمؤسسات.",
            content:
                "شهدت دمشق فعالية مجتمعية شاركت فيها مجموعة من الجهات والمؤسسات.",
        },
        {
            id: 7,
            title: "برنامج جديد لدعم المبادرات",
            category: "general",
            date: "2025-08-20",
            status: "published",
            image: "../images/newdata/7.jpeg",
            summary:
                "برنامج جديد لدعم المبادرات المجتمعية.",
            content:
                "تم الإعلان عن برنامج جديد يهدف إلى دعم المبادرات والمشاريع المجتمعية.",
        },
        {
            id: 8,
            title: "نشاط خدمي جديد في محافظة دمشق",
            category: "governorate",
            date: "2025-08-15",
            status: "published",
            image: "../images/newdata/8.jpeg",
            summary:
                "نشاط خدمي جديد لتحسين الخدمات المقدمة للمواطنين.",
            content:
                "تم تنفيذ نشاط خدمي جديد ضمن خطة محافظة دمشق لتحسين جودة الخدمات.",
        },
    ];


    function getNews() {
        const stored = localStorage.getItem(STORAGE_KEY);

        if (!stored) {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(defaultNews)
            );

            return [...defaultNews];
        }

        try {
            return JSON.parse(stored);
        } catch (error) {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(defaultNews)
            );

            return [...defaultNews];
        }
    }


    function saveNews(news) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(news)
        );
    }


    function escapeHtml(value) {
        const div = document.createElement("div");
        div.textContent = value ?? "";
        return div.innerHTML;
    }


    function formatDate(date) {
        if (!date) {
            return "-";
        }

        const parsed = new Date(`${date}T00:00:00`);

        if (Number.isNaN(parsed.getTime())) {
            return date;
        }

        return parsed.toLocaleDateString("ar-SY", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }


    function categoryLabel(category) {
        return category === "governorate"
            ? "أخبار المحافظة"
            : "أخبار عامة";
    }


    function statusLabel(status) {
        return status === "published"
            ? "منشور"
            : "مسودة";
    }


    const tableBody = document.getElementById("newsTableBody");
    const emptyState = document.getElementById("emptyNewsState");

    const searchInput = document.getElementById("newsSearch");
    const categoryFilter = document.getElementById("categoryFilter");
    const statusFilter = document.getElementById("statusFilter");

    const deleteModal = document.getElementById("deleteNewsModal");
    const deleteNewsTitle = document.getElementById("deleteNewsTitle");
    const confirmDeleteButton =
        document.getElementById("confirmDeleteNews");

    let deleteTargetId = null;


    function updateStatistics(news) {
        const total = news.length;

        const governorate = news.filter(
            (item) => item.category === "governorate"
        ).length;

        const general = news.filter(
            (item) => item.category === "general"
        ).length;

        const published = news.filter(
            (item) => item.status === "published"
        ).length;

        document.getElementById("totalNewsCount").textContent = total;
        document.getElementById("governorateNewsCount").textContent =
            governorate;
        document.getElementById("generalNewsCount").textContent =
            general;
        document.getElementById("publishedNewsCount").textContent =
            published;
    }


    function getFilteredNews(news) {
        const search = searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

        const category = categoryFilter
            ? categoryFilter.value
            : "all";

        const status = statusFilter
            ? statusFilter.value
            : "all";


        return news.filter((item) => {
            const matchesSearch =
                !search ||
                item.title.toLowerCase().includes(search) ||
                item.summary.toLowerCase().includes(search);

            const matchesCategory =
                category === "all" ||
                item.category === category;

            const matchesStatus =
                status === "all" ||
                item.status === status;

            return (
                matchesSearch &&
                matchesCategory &&
                matchesStatus
            );
        });
    }


    function renderNews() {
        const news = getNews();

        updateStatistics(news);

        const filteredNews = getFilteredNews(news);

        tableBody.innerHTML = "";

        if (!filteredNews.length) {
            emptyState.hidden = false;
            return;
        }

        emptyState.hidden = true;


        filteredNews.forEach((item) => {
            const row = document.createElement("tr");

            const image =
                item.image ||
                "../images/logo.png";

            row.innerHTML = `
                <td>
                    <div class="dashboard-news-cell">

                        <div class="dashboard-news-image">
                            <img
                                src="${escapeHtml(image)}"
                                alt="${escapeHtml(item.title)}"
                                onerror="this.src='../images/logo.png'"
                            >
                        </div>

                        <div class="dashboard-news-info">
                            <span class="dashboard-news-title">
                                ${escapeHtml(item.title)}
                            </span>

                            <span class="dashboard-news-summary">
                                ${escapeHtml(item.summary)}
                            </span>
                        </div>

                    </div>
                </td>

                <td>
                    <span class="news-category-badge news-category-badge--${item.category}">
                        ${categoryLabel(item.category)}
                    </span>
                </td>

                <td>
                    ${formatDate(item.date)}
                </td>

                <td>
                    <span class="news-status-badge news-status-badge--${item.status}">
                        ${statusLabel(item.status)}
                    </span>
                </td>

                <td>
                    <div class="news-actions">

                        <button
                            type="button"
                            class="news-action-button"
                            data-edit-news="${item.id}"
                            title="تعديل"
                            aria-label="تعديل الخبر"
                        >
                            ✎
                        </button>

                        <button
                            type="button"
                            class="news-action-button news-action-button--delete"
                            data-delete-news="${item.id}"
                            title="حذف"
                            aria-label="حذف الخبر"
                        >
                            🗑
                        </button>

                    </div>
                </td>
            `;

            tableBody.appendChild(row);
        });
    }


    function openDeleteModal(id) {
        const news = getNews();

        const item = news.find(
            (newsItem) => Number(newsItem.id) === Number(id)
        );

        if (!item) {
            return;
        }

        deleteTargetId = Number(id);

        deleteNewsTitle.textContent = item.title;

        deleteModal.hidden = false;

        document.body.style.overflow = "hidden";
    }


    function closeDeleteModal() {
        deleteTargetId = null;

        deleteModal.hidden = true;

        document.body.style.overflow = "";
    }


    function deleteNews() {
        if (deleteTargetId === null) {
            return;
        }

        const news = getNews();

        const updatedNews = news.filter(
            (item) =>
                Number(item.id) !== Number(deleteTargetId)
        );

        saveNews(updatedNews);

        closeDeleteModal();

        renderNews();
    }


    tableBody.addEventListener("click", (event) => {
        const editButton =
            event.target.closest("[data-edit-news]");

        if (editButton) {
            const id = editButton.dataset.editNews;

            window.location.href =
                `news-edit.html?id=${encodeURIComponent(id)}`;

            return;
        }


        const deleteButton =
            event.target.closest("[data-delete-news]");

        if (deleteButton) {
            openDeleteModal(
                deleteButton.dataset.deleteNews
            );
        }
    });


    if (confirmDeleteButton) {
        confirmDeleteButton.addEventListener(
            "click",
            deleteNews
        );
    }


    document
        .querySelectorAll("[data-close-delete-modal]")
        .forEach((button) => {
            button.addEventListener(
                "click",
                closeDeleteModal
            );
        });


    if (searchInput) {
        searchInput.addEventListener(
            "input",
            renderNews
        );
    }


    if (categoryFilter) {
        categoryFilter.addEventListener(
            "change",
            renderNews
        );
    }


    if (statusFilter) {
        statusFilter.addEventListener(
            "change",
            renderNews
        );
    }


    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            !deleteModal.hidden
        ) {
            closeDeleteModal();
        }
    });


    renderNews();

})();
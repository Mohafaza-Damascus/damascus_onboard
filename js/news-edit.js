(function () {
    "use strict";

    const STORAGE_KEY = "damascus_news";

    const form = document.getElementById("editNewsForm");

    const params = new URLSearchParams(
        window.location.search
    );

    const newsId = Number(params.get("id"));


    function getNews() {
        try {
            return JSON.parse(
                localStorage.getItem(STORAGE_KEY)
            ) || [];
        } catch (error) {
            return [];
        }
    }


    function saveNews(news) {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(news)
        );
    }


    function fileToDataUrl(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;

            reader.readAsDataURL(file);
        });
    }


    const news = getNews();

    const item = news.find(
        (newsItem) =>
            Number(newsItem.id) === Number(newsId)
    );


    if (!item) {
        window.location.href =
            "news-dashboard.html";

        return;
    }


    const titleInput =
        document.getElementById("editNewsTitle");

    const categoryInput =
        document.getElementById("editNewsCategory");

    const dateInput =
        document.getElementById("editNewsDate");

    const summaryInput =
        document.getElementById("editNewsSummary");

    const contentInput =
        document.getElementById("editNewsContent");

    const imageInput =
        document.getElementById("editNewsImage");

    const imagePreview =
        document.getElementById("editImagePreview");

    const imagePreviewImage =
        document.getElementById(
            "editImagePreviewImage"
        );

    const removeImageButton =
        document.getElementById(
            "removeEditImage"
        );


    let imageData = item.image || "";


    titleInput.value = item.title || "";

    categoryInput.value =
        item.category || "governorate";

    dateInput.value = item.date || "";

    summaryInput.value =
        item.summary || "";

    contentInput.value =
        item.content || "";


    const statusRadio =
        document.querySelector(
            `input[name="editStatus"][value="${item.status}"]`
        );

    if (statusRadio) {
        statusRadio.checked = true;
    }


    if (imageData) {
        imagePreviewImage.src = imageData;
        imagePreview.hidden = false;
    } else {
        imagePreview.hidden = true;
    }


    imageInput.addEventListener(
        "change",
        async () => {
            const file = imageInput.files[0];

            if (!file) {
                return;
            }

            try {
                imageData =
                    await fileToDataUrl(file);

                imagePreviewImage.src =
                    imageData;

                imagePreview.hidden = false;
            } catch (error) {
                console.error(
                    "Failed to load image:",
                    error
                );
            }
        }
    );


    removeImageButton.addEventListener(
        "click",
        () => {
            imageData = "";

            imageInput.value = "";

            imagePreviewImage.src = "";

            imagePreview.hidden = true;
        }
    );


    form.addEventListener(
        "submit",
        (event) => {
            event.preventDefault();


            const title =
                titleInput.value.trim();

            const category =
                categoryInput.value;

            const date =
                dateInput.value;

            const summary =
                summaryInput.value.trim();

            const content =
                contentInput.value.trim();

            const status =
                document.querySelector(
                    'input[name="editStatus"]:checked'
                )?.value || "published";


            if (
                !title ||
                !category ||
                !date ||
                !summary ||
                !content
            ) {
                return;
            }


            const index =
                news.findIndex(
                    (newsItem) =>
                        Number(newsItem.id) ===
                        Number(newsId)
                );


            if (index === -1) {
                return;
            }


            news[index] = {
                ...news[index],

                title,
                category,
                date,
                status,
                image: imageData,
                summary,
                content,
            };


            saveNews(news);


            window.location.href =
                "news-dashboard.html";
        }
    );

})();
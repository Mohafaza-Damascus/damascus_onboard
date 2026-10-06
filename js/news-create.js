(function () {
    "use strict";

    const STORAGE_KEY = "damascus_news";

    const form = document.getElementById("createNewsForm");

    const imageInput = document.getElementById("newsImage");
    const imagePreview = document.getElementById("imagePreview");
    const imagePreviewImage =
        document.getElementById("imagePreviewImage");
    const removeImageButton =
        document.getElementById("removeImage");

    let imageData = "";


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


    function generateId(news) {
        if (!news.length) {
            return 1;
        }

        return (
            Math.max(
                ...news.map((item) => Number(item.id) || 0)
            ) + 1
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


    imageInput.addEventListener("change", async () => {
        const file = imageInput.files[0];

        if (!file) {
            return;
        }

        try {
            imageData = await fileToDataUrl(file);

            imagePreviewImage.src = imageData;
            imagePreview.hidden = false;
        } catch (error) {
            console.error(
                "Failed to load image:",
                error
            );
        }
    });


    removeImageButton.addEventListener(
        "click",
        () => {
            imageData = "";

            imageInput.value = "";

            imagePreviewImage.src = "";

            imagePreview.hidden = true;
        }
    );


    form.addEventListener("submit", (event) => {
        event.preventDefault();


        const title =
            document.getElementById("newsTitle").value.trim();

        const category =
            document.getElementById("newsCategory").value;

        const date =
            document.getElementById("newsDate").value;

        const summary =
            document.getElementById("newsSummary").value.trim();

        const content =
            document.getElementById("newsContent").value.trim();

        const status =
            document.querySelector(
                'input[name="status"]:checked'
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


        const news = getNews();


        const newNews = {
            id: generateId(news),

            title,
            category,
            date,
            status,

            image: imageData,

            summary,
            content,
        };


        news.unshift(newNews);

        saveNews(news);


        window.location.href =
            "news-dashboard.html";
    });

})();
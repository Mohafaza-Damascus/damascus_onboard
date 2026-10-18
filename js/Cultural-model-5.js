/* =========================================================
   CULTURAL MODEL 5 — UNIFIED & CLEAN JAVASCRIPT FILE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
    |--------------------------------------------------------------------------
    | 1. Traditional Calendar (إن وجدت في الصفحة)
    |--------------------------------------------------------------------------
    */
    const calendarGrid = document.getElementById("calendarGrid");
    const calendarMonth = document.getElementById("calendarMonth");
    const calendarYear = document.getElementById("calendarYear");
    const calendarPrev = document.getElementById("calendarPrev");
    const calendarNext = document.getElementById("calendarNext");

    const culturalEvents = {
        "2026-10-12": { id: "music-night-01", category: "موسيقى", title: "أمسية موسيقية", description: "أمسية موسيقية تجمع عدداً من الفنانين والموسيقيين في دمشق." },
        "2026-10-18": { id: "art-exhibition-01", category: "فنون", title: "معرض فني", description: "معرض فني يضم مجموعة من الأعمال الفنية المعاصرة." },
        "2026-10-24": { id: "heritage-event-01", category: "تراث", title: "فعالية تراثية", description: "فعالية ثقافية تستعرض جانباً من التراث الدمشقي." },
        "2026-10-27": { id: "theatre-night-01", category: "مسرح", title: "عرض مسرحي", description: "عرض مسرحي ضمن البرنامج الثقافي للمدينة." }
    };

    let calendarDate = new Date(2026, 9, 1);
    const monthNames = [
        "كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران",
        "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"
    ];

    function formatEventDate(year, month, day) {
        return [year, String(month + 1).padStart(2, "0"), String(day).padStart(2, "0")].join("-");
    }

    function renderCalendar() {
        if (!calendarGrid || !calendarMonth) return;
        const year = calendarDate.getFullYear();
        const month = calendarDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        calendarMonth.textContent = monthNames[month];
        if (calendarYear) calendarYear.textContent = year;
        calendarGrid.innerHTML = "";

        for (let i = 0; i < firstDay; i++) {
            const emptyDay = document.createElement("div");
            emptyDay.className = "calendar-day is-empty";
            calendarGrid.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = formatEventDate(year, month, day);
            const event = culturalEvents[dateKey];
            const dayElement = document.createElement(event ? "a" : "div");
            dayElement.className = "calendar-day";

            if (event) {
                dayElement.classList.add("has-event");
                dayElement.href = `Events-details.html?event=${encodeURIComponent(event.id)}`;
            }

            const today = new Date();
            if (today.getFullYear() === year && today.getMonth() === month && today.getDate() === day) {
                dayElement.classList.add("is-today");
            }

            const dayNumber = document.createElement("span");
            dayNumber.className = "calendar-day-number";
            dayNumber.textContent = String(day);
            dayElement.appendChild(dayNumber);

            if (event) {
                const marker = document.createElement("div");
                marker.className = "calendar-event-marker";
                const dot = document.createElement("span");
                dot.className = "calendar-event-dot";
                const category = document.createElement("span");
                category.className = "calendar-event-category";
                category.textContent = event.category;

                marker.appendChild(dot);
                marker.appendChild(category);
                dayElement.appendChild(marker);
            }
            calendarGrid.appendChild(dayElement);
        }
    }

    if (calendarPrev) calendarPrev.addEventListener("click", () => { calendarDate.setMonth(calendarDate.getMonth() - 1); renderCalendar(); });
    if (calendarNext) calendarNext.addEventListener("click", () => { calendarDate.setMonth(calendarDate.getMonth() + 1); renderCalendar(); });
    renderCalendar();


    /*
    |--------------------------------------------------------------------------
    | 2. Damascus Through the Ages (Circular Infinite Loop & 2s Autoplay)
    |--------------------------------------------------------------------------
    */
    const timelineRoot = document.querySelector("[data-timeline]");
    if (timelineRoot) {
        const data = [
            { id: "aramean", date: "الألف الأول ق.م", period: "الألف الأول ق.م", title: "دمشق الآرامية", description: "في الألف الأول قبل الميلاد صارت دمشق عاصمة لمملكة آرامية قوية.", image: "../assets/damascus-aram.jfif", link: "era.html?id=aramean" },
            { id: "hellenistic", date: "333 – 64 ق.م", period: "333 – 64 ق.م", title: "العصر الهلنستي", description: "بعد فتوحات الإسكندر المقدوني دخلت دمشق العالم الإغريقي.", image: "../assets/damascus-hellenistic.jfif", link: "era.html?id=hellenistic" },
            { id: "roman", date: "64 ق.م – 395م", period: "64 ق.م – 395م", title: "العصر الروماني", description: "في العهد الروماني ازدهرت دمشق وشُقّ الشارع المستقيم.", image: "../assets/damascus-roman.jfif", link: "era.html?id=roman" },
            { id: "byzantine", date: "395 – 634م", period: "395 – 634م", title: "العصر البيزنطي", description: "صارت دمشق مركزاً مسيحياً مهماً وتحوّل معبدها إلى كنيسة.", image: "../assets/damascus-byzantine.jfif", link: "era.html?id=byzantine" },
            { id: "umayyad", date: "661 – 750م", period: "661 – 750م", title: "العصر الأموي", description: "صارت دمشق عاصمة لأكبر دولة وبُني الجامع الأموي.", image: "../assets/damascus-umayyad.jfif", link: "era.html?id=umayyad" },
            { id: "abbasid-fatimid", date: "750 – 1154م", period: "750 – 1154م", title: "العباسيون والفاطميون", description: "صارت دمشق ولاية تتنازعها الدول العباسية والفاطمية والسلاجقة.", image: "../assets/damascus-islamic.jfif", link: "era.html?id=abbasid-fatimid" },
            { id: "ayyubid", date: "1154 – 1260م", period: "1154 – 1260م", title: "الزنكيون والأيوبيون", description: "عادت دمشق مركزاً للحكم مع نور الدين زنكي وصلاح الدين.", image: "../assets/damascus-ayyubid.jfif", link: "era.html?id=ayyubid" },
            { id: "mamluk", date: "1260 – 1516م", period: "1260 – 1516م", title: "العصر المملوكي", description: "ازدهرت المدارس والحمّامات والأسواق في عهد المماليك.", image: "../assets/damascus-mamluk.jfif", link: "era.html?id=mamluk" },
            { id: "ottoman", date: "1516 – 1918م", period: "1516 – 1918م", title: "العصر العثماني", description: "محطة كبرى لقوافل الحج وبُنيت فيها التكايا والخانات.", image: "../assets/damascus-ottoman.jfif", link: "era.html?id=ottoman" },
            { id: "modern", date: "1918 – اليوم", period: "1918 – اليوم", title: "دمشق الحديثة", description: "من الاستقلال وحتى اليوم، بقيت دمشق القديمة مدينة حيّة.", image: "../assets/damascus-today.jfif", link: "era.html?id=modern" }
        ];

        timelineRoot.style.setProperty("--timeline-count", data.length);
        const yearsTrack = timelineRoot.querySelector("[data-years-track]");
        const cardsTrack = timelineRoot.querySelector("[data-cards-track]");
        const scene = timelineRoot.querySelector(".damascus-timeline__scene");
        const period = timelineRoot.querySelector("[data-period]");
        const title = timelineRoot.querySelector("[data-title]");
        const description = timelineRoot.querySelector("[data-description]");
        const content = timelineRoot.querySelector(".damascus-timeline__content");
        const more = timelineRoot.querySelector("[data-more]");
        const current = timelineRoot.querySelector("[data-current]");
        const total = timelineRoot.querySelector("[data-total]");
        const previous = timelineRoot.querySelector("[data-prev]");
        const next = timelineRoot.querySelector("[data-next]");

        let active = 0;
        let autoplayTimer = null;
        let dragStartX = 0;
        let isDragging = false;

        if (total) total.textContent = String(data.length).padStart(2, "0");

        yearsTrack.innerHTML = "";
        data.forEach((item, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.className = "damascus-timeline__year";
            button.innerHTML = `<span>${item.date}</span>`;
            button.addEventListener("click", () => {
                goTo(index);
                resetAutoplay();
            });
            if (yearsTrack) yearsTrack.appendChild(button);
        });

        const buttons = yearsTrack ? [...yearsTrack.children] : [];

        // حساب المسافة الدائرية بحيث تأتي الصورة الأولى مباشرة بعد الأخيرة كحلقة متصلة
        function getCircularOffset(index, activeIdx, length) {
            let diff = index - activeIdx;
            const half = length / 2;
            if (diff > half) diff -= length;
            if (diff <= -half) diff += length;
            return diff;
        }

        function updateCardWidth() {
            if (!scene || !cardsTrack) return;
            const visibleCards = window.innerWidth <= 800 ? 3 : 5;
            const cardWidth = scene.clientWidth / visibleCards;
            cardsTrack.style.setProperty("--timeline-card-width", `${cardWidth}px`);
        }

        function renderCards() {
            if (!scene || !cardsTrack) return;
            updateCardWidth();

            cardsTrack.innerHTML = data.map((item, itemIndex) => `
                <article class="damascus-timeline__card" data-card-index="${itemIndex}">
                    <div class="damascus-timeline__card-image">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <div class="damascus-timeline__card-hover-info">
                            <span>${item.period}</span>
                            <strong>${item.title}</strong>
                        </div>
                    </div>
                </article>
            `).join("");

            cardsTrack.querySelectorAll(".damascus-timeline__card").forEach((card) => {
                card.addEventListener("click", () => {
                    const index = Number(card.dataset.cardIndex);
                    if (!Number.isNaN(index)) {
                        goTo(index);
                        resetAutoplay();
                    }
                });
            });
        }

        function moveYears() {
            buttons.forEach((button, index) => {
                const distance = Math.abs(index - ((data.length - 1) / 2));
                const curveOffset = Math.round(Math.pow(distance / ((data.length - 1) / 2), 2) * 100);
                button.style.setProperty("--curve-offset", `${curveOffset}px`);
            });
            if (yearsTrack) yearsTrack.style.transform = "translate3d(0, 0, 0)";
        }

        function updateCardSlots() {
            if (!cardsTrack) return;
            updateCardWidth();

            cardsTrack.querySelectorAll(".damascus-timeline__card").forEach((card, index) => {
                card.className = "damascus-timeline__card";
                const offset = getCircularOffset(index, active, data.length);

                if (offset === 0) {
                    card.classList.add("is-active", "card-slot-2");
                } else if (offset === -2) {
                    card.classList.add("card-slot-0");
                } else if (offset === -1) {
                    card.classList.add("card-slot-1");
                } else if (offset === 1) {
                    card.classList.add("card-slot-3");
                } else if (offset === 2) {
                    card.classList.add("card-slot-4");
                } else if (offset < -2) {
                    card.classList.add("card-slot-hidden-left");
                } else {
                    card.classList.add("card-slot-hidden-right");
                }
            });
        }

        function update(index) {
            // التفاف دائري مستمر (بعد الأخيرة تأتي الأولى، وقبل الأولى تأتي الأخيرة)
            active = (index + data.length) % data.length;
            const item = data[active];

            buttons.forEach((button, i) => button.classList.toggle("is-active", i === active));
            if (period) period.textContent = item.period;
            if (title) title.textContent = item.title;
            if (description) description.textContent = item.description;
            if (content) {
                content.classList.remove("is-revealing");
                void content.offsetWidth;
                content.classList.add("is-revealing");
            }
            if (more) more.href = item.link || `Cultural-Details.html?period=${item.id}`;
            if (current) current.textContent = String(active + 1).padStart(2, "0");

            // الأزرار تبقى مفعّلة دائماً لأن الحلقة دائرية لا تنتهي
            if (previous) previous.disabled = false;
            if (next) next.disabled = false;

            updateCardSlots();
            moveYears();
        }

        function goTo(index) {
            update(index);
        }

        // دوران تلقائي كل ثانيتين (2000ms)
        function startAutoplay() {
            if (autoplayTimer) clearInterval(autoplayTimer);
            autoplayTimer = setInterval(() => {
                goTo(active + 1);
            }, 2000);
        }

        function stopAutoplay() {
            if (autoplayTimer) {
                clearInterval(autoplayTimer);
                autoplayTimer = null;
            }
        }

        function resetAutoplay() {
            stopAutoplay();
            startAutoplay();
        }

        if (previous) previous.addEventListener("click", () => { goTo(active - 1); resetAutoplay(); });
        if (next) next.addEventListener("click", () => { goTo(active + 1); resetAutoplay(); });

        if (scene) {
            scene.addEventListener("mouseenter", stopAutoplay);
            scene.addEventListener("mouseleave", startAutoplay);

            scene.addEventListener("pointerdown", (event) => {
                stopAutoplay();
                dragStartX = event.clientX;
                isDragging = true;
            });

            scene.addEventListener("pointerup", (event) => {
                if (!isDragging) return;
                const distance = event.clientX - dragStartX;
                isDragging = false;
                if (Math.abs(distance) > 45) {
                    goTo(active + (distance < 0 ? 1 : -1));
                }
                startAutoplay();
            });

            scene.addEventListener("pointercancel", () => {
                isDragging = false;
                startAutoplay();
            });
        }

        window.addEventListener("resize", () => {
            updateCardSlots();
            moveYears();
        });

        renderCards();
        update(active);
        startAutoplay();
    }
    /*
    |--------------------------------------------------------------------------
    | 3. Damascus in Numbers (Counters & Mouse Tilt)
    |--------------------------------------------------------------------------
    */
    (() => {
        const section = document.querySelector("#damascus-numbers");
        if (!section) return;

        const cards = section.querySelectorAll(".damascus-number-card");
        const counters = section.querySelectorAll("[data-count]");
        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const formatNumber = (value) => Math.floor(value).toLocaleString("en-US");

        if (!reducedMotion) {
            cards.forEach((card) => {
                card.addEventListener("pointermove", (event) => {
                    const rect = card.getBoundingClientRect();
                    const x = event.clientX - rect.left;
                    const y = event.clientY - rect.top;
                    card.style.setProperty("--mx", `${x}px`);
                    card.style.setProperty("--my", `${y}px`);
                    card.style.setProperty("--rx", `${((0.5 - (y / rect.height)) * 7).toFixed(2)}deg`);
                    card.style.setProperty("--ry", `${(((x / rect.width) - 0.5) * 7).toFixed(2)}deg`);
                });
                card.addEventListener("pointerleave", () => {
                    card.style.setProperty("--rx", "0deg");
                    card.style.setProperty("--ry", "0deg");
                });
            });
        }

        const animateCounter = (counter, index) => {
            if (counter.dataset.animated === "true") return;
            counter.dataset.animated = "true";
            const target = Number(counter.dataset.count);
            const suffix = counter.dataset.suffix || "";
            const duration = 2400 + index * 200;
            const startTime = performance.now();

            const tick = (now) => {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 4);
                counter.textContent = formatNumber(Math.round(target * eased)) + suffix;
                if (progress < 1) requestAnimationFrame(tick);
                else counter.textContent = formatNumber(target) + suffix;
            };
            requestAnimationFrame(tick);
        };

        if ("IntersectionObserver" in window) {
            const observer = new IntersectionObserver((entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) return;
                cards.forEach((card, idx) => setTimeout(() => card.classList.add("is-visible"), idx * 130));
                counters.forEach((cnt, idx) => animateCounter(cnt, idx));
                observer.disconnect();
            }, { threshold: 0.2 });
            observer.observe(section);
        }
    })();


    /*
    |--------------------------------------------------------------------------
    | 4. Damascus Landmarks (3D Cylinder Carousel)
    |--------------------------------------------------------------------------
    */
    (() => {
        const stage = document.querySelector("#landmarksStage");
        const cylinder = document.querySelector("#landmarksCylinder");
        const previousButton = document.querySelector("#landmarksPrev");
        const nextButton = document.querySelector("#landmarksNext");
        const pagination = document.querySelector("#landmarksPagination");
        const status = document.querySelector("#landmarksStatus");

        const activeBox = document.querySelector("#landmarkActiveBox");
        const activeType = document.querySelector("#landmarkActiveType");
        const activeLocation = document.querySelector("#landmarkActiveLocation");
        const activeNumber = document.querySelector("#landmarkActiveNumber");
        const activeTitle = document.querySelector("#landmarkActiveTitle");
        const activeIntro = document.querySelector("#landmarkActiveIntro");
        const activeDesc = document.querySelector("#landmarkActiveDesc");
        const activeFacts = document.querySelector("#landmarkActiveFacts");
        const activeLink = document.querySelector("#landmarkActiveLink");

        if (!stage || !cylinder || !previousButton || !nextButton || !pagination || !status) return;

        const cards = Array.from(cylinder.querySelectorAll(".landmark-card"));
        if (cards.length < 2) return;

        const cardsData = cards.map((card, idx) => ({
            title: card.querySelector("h3")?.textContent.trim() || "معلم دمشقي",
            type: card.querySelector(".landmark-card__type")?.textContent.trim() || "",
            number: card.querySelector(".landmark-card__number")?.textContent.trim() || `0${idx + 1} / 0${cards.length}`,
            location: card.querySelector(".landmark-card__location")?.textContent.trim() || "",
            intro: card.querySelector(".landmark-card__intro")?.textContent.trim() || "",
            description: card.querySelector(".landmark-card__description")?.textContent.trim() || "",
            factsHTML: card.querySelector(".landmark-card__facts")?.innerHTML || "",
            linkHref: card.querySelector(".landmark-card__link")?.getAttribute("href") || "#"
        }));

        let currentIndex = 0;
        let timer = null;
        let isPaused = false;

        function getCircularOffset(index, activeIdx, total) {
            let diff = index - activeIdx;
            const half = total / 2;
            if (diff > half) diff -= total;
            if (diff < -half) diff += total;
            return diff;
        }

        function updateActiveInfo(index) {
            const item = cardsData[index];
            if (!item) return;
            if (activeBox) {
                activeBox.classList.remove("is-changing");
                void activeBox.offsetWidth;
                activeBox.classList.add("is-changing");
            }
            if (activeType) activeType.textContent = item.type;
            if (activeLocation) activeLocation.textContent = item.location;
            if (activeNumber) activeNumber.textContent = item.number;
            if (activeTitle) activeTitle.textContent = item.title;
            if (activeIntro) activeIntro.textContent = item.intro;
            if (activeDesc) activeDesc.textContent = item.description;
            if (activeFacts) activeFacts.innerHTML = item.factsHTML;
            if (activeLink) activeLink.href = item.linkHref;
            status.textContent = item.title;
        }

        function updateCarousel() {
            const isMobile = window.innerWidth <= 760;
            const sideShiftX = isMobile ? 135 : 210;
            const farShiftX = isMobile ? 220 : 340;
            cylinder.style.transform = "none";

            cards.forEach((card, index) => {
                const offset = getCircularOffset(index, currentIndex, cards.length);
                card.classList.remove("is-active", "is-side", "is-far", "is-hidden");

                if (offset === 0) {
                    card.classList.add("is-active");
                    card.style.transform = "translate3d(-50%, -50%, 60px) rotateY(0deg) scale(1)";
                    card.style.zIndex = "5";
                    card.style.opacity = "1";
                    card.style.pointerEvents = "auto";
                } else if (Math.abs(offset) === 1) {
                    const dir = offset > 0 ? 1 : -1;
                    card.style.transform = `translate3d(calc(-50% + ${dir * sideShiftX}px), -50%, -35px) rotateY(${-dir * 16}deg) scale(0.88)`;
                    card.style.zIndex = "3";
                    card.style.opacity = "0.88";
                    card.style.pointerEvents = "auto";
                } else if (Math.abs(offset) === 2) {
                    const dir = offset > 0 ? 1 : -1;
                    card.style.transform = `translate3d(calc(-50% + ${dir * farShiftX}px), -50%, -130px) rotateY(${-dir * 26}deg) scale(0.74)`;
                    card.style.zIndex = "1";
                    card.style.opacity = "0.35";
                    card.style.pointerEvents = "none";
                } else {
                    card.style.transform = "translate3d(-50%, -50%, -220px) rotateY(0deg) scale(0.6)";
                    card.style.zIndex = "0";
                    card.style.opacity = "0";
                    card.style.pointerEvents = "none";
                }
            });

            pagination.querySelectorAll("button").forEach((button, index) => {
                button.classList.toggle("is-active", index === currentIndex);
            });
            updateActiveInfo(currentIndex);
        }

        function goTo(index) { currentIndex = (index + cards.length) % cards.length; updateCarousel(); }
        function next() { goTo(currentIndex + 1); }
        function previous() { goTo(currentIndex - 1); }

        function startAutoRotation() {
            if (timer) clearInterval(timer);
            if (!isPaused) timer = setInterval(next, 4300);
        }

        pagination.innerHTML = "";
        cards.forEach((card, index) => {
            const button = document.createElement("button");
            button.type = "button";
            button.addEventListener("click", () => { goTo(index); startAutoRotation(); });
            pagination.appendChild(button);
            card.addEventListener("click", () => { if (index !== currentIndex) { goTo(index); startAutoRotation(); } });
        });

        previousButton.addEventListener("click", () => { previous(); startAutoRotation(); });
        nextButton.addEventListener("click", () => { next(); startAutoRotation(); });

        stage.addEventListener("mouseenter", () => { isPaused = true; clearInterval(timer); });
        stage.addEventListener("mouseleave", () => { isPaused = false; startAutoRotation(); });

        window.addEventListener("resize", updateCarousel);
        updateCarousel();
        startAutoRotation();
    })();


    /*
    |--------------------------------------------------------------------------
    | 5. Damascus Agenda V2 (Model 2 — Tilted Calendar & 3D Carousel)
    |--------------------------------------------------------------------------
    */
    (() => {
        const root = document.querySelector("#damascus-agenda-v2");
        if (!root) return;

        const enTitle = root.querySelector("#agendaV2EnTitle");
        const arSub = root.querySelector("#agendaV2ArSub");
        const monthNum = root.querySelector("#agendaV2MonthNum");
        const monthNameEl = root.querySelector("#agendaV2MonthName");
        const countEl = root.querySelector("#agendaV2Count");
        const sheet = root.querySelector("#agendaV2Sheet");
        const daysGrid = root.querySelector("#agendaV2DaysGrid");

        const cylinder = root.querySelector("#agendaV2Cylinder");
        const pagination = root.querySelector("#agendaV2Pagination");
        const cardCounter = root.querySelector("#agendaV2EventCounter");

        const prevMonthBtn = root.querySelector("#agendaV2PrevMonth");
        const nextMonthBtn = root.querySelector("#agendaV2NextMonth");
        const prevEventBtn = root.querySelector("#agendaV2PrevEvent");
        const nextEventBtn = root.querySelector("#agendaV2NextEvent");

        const arMonths = ["كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران", "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"];
        const enMonths = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];
        const weekdays = ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];

        const v2Data = [
            { date: "2026-09-08", category: "موسيقى", location: "دمشق القديمة — قصر العظم", time: "07:30 مساءً", title: "ليلة الموشحات الشامية", intro: "أمسية طربية في رحاب البيوت الدمشقية تستعيد أصالة الموشحات.", image: "../assets/azem-palace.jfif" },
            { date: "2026-09-14", category: "فنون ومعارض", location: "وسط دمشق — المتحف الوطني", time: "05:00 مساءً", title: "معرض الخط والزخرفة", intro: "لوحات حروفية ومخطوطات تبرز جماليات المدرسة الدمشقية.", image: "../assets/damascus-national-museum.jfif" },
            { date: "2026-09-21", category: "تراث", location: "المدينة القديمة — باب توما", time: "04:00 مساءً", title: "مسار الأبواب السبعة", intro: "جولة معمارية تفاعلية للتعرف إلى تاريخ سور دمشق.", image: "../assets/توما2.jfif" },
            { date: "2026-09-27", category: "أسواق وحرف", location: "قلب دمشق القديمة", time: "11:30 صباحاً", title: "حكايات سوق الحميدية", intro: "جولة توثيقية في أقدم الأسواق المسقوفة والمهن التراثية.", image: "../assets/hamidiyah-souk.jfif" },
            { date: "2026-10-11", category: "موسيقى", location: "سوق البزورية — خان أسعد باشا", time: "06:00 مساءً", title: "أمسية موسيقية شامية", intro: "أمسية تحتفي بالمقامات والألحان التي ارتبطت بذاكرة دمشق.", image: "../assets/khan-asad-pasha.jfif" },
            { date: "2026-10-14", category: "تراث معماري", location: "قرب الجامع الأموي — قصر العظم", time: "05:30 مساءً", title: "لقاء التراث المعماري", intro: "قراءة بصرية في فلسفة الفناء الداخلي والأبلق الدمشقي.", image: "../assets/azem-palace.jfif" },
            { date: "2026-10-17", category: "فنون وحرف", location: "قلب دمشق القديمة", time: "11:00 صباحاً", title: "معرض الحرف الدمشقية", intro: "استكشاف حيّ لصناعة البروكار والموزاييك والصدف العريق.", image: "../assets/hamidiyah-souk.jfif" },
            { date: "2026-10-23", category: "ندوات ولقاءات", location: "دمشق القديمة", time: "07:00 مساءً", title: "دمشق في عيون الرحالة", intro: "جلسة تستعرض ما كتبه المؤرخون والرحالة عن أسواق دمشق وبساتينها.", image: "../assets/umayyad-mosque.jfif" },
            { date: "2026-10-27", category: "معرض بصري", location: "الجهة الشمالية الغربية", time: "04:30 مساءً", title: "معرض الذاكرة البصرية", intro: "توثيق فوتوغرافي نادر لملامح الحياة اليومية والأسواق التاريخية.", image: "../assets/damascus-citadel.jfif" },
            { date: "2026-11-06", category: "تراث شعبي", location: "سوق البزورية", time: "01:00 ظهراً", title: "مهرجان الحكايات والحرف", intro: "احتفالية تجمع بين الحكواتي الشامي ومعروضات التراث الأصيل.", image: "../assets/khan-asad-pasha.jfif" },
            { date: "2026-11-15", category: "موسيقى", location: "غرب المدينة القديمة", time: "06:30 مساءً", title: "أمسية أوتار الياسمين", intro: "مقطوعات كلاسيكية وشرقية مستوحاة من روح مدينة دمشق.", image: "../assets/damascus-national-museum.jfif" },
            { date: "2026-11-24", category: "عمارة", location: "دمشق القديمة", time: "05:00 مساءً", title: "جماليات الجامع الأموي", intro: "ندوة مصوّرة حول تاريخ الفسيفساء الدمشقية وترميمها عبر القرون.", image: "../assets/umayyad-mosque.jfif" }
        ];

        let curMonth = new Date(2026, 9, 1);
        let actIdx = 0;
        const pad = (n) => String(n).padStart(2, "0");
        const parseDt = (str) => { const [y, m, d] = str.split("-").map(Number); return new Date(y, m - 1, d); };

        const getMExs = () => v2Data.filter(i => { const d = parseDt(i.date); return d.getFullYear() === curMonth.getFullYear() && d.getMonth() === curMonth.getMonth(); });

        function circOffset(i, act, tot) {
            let diff = i - act, half = tot / 2;
            if (diff > half) diff -= tot;
            if (diff < -half) diff += tot;
            return diff;
        }

        function buildV2Cards(mExs) {
            if (!cylinder || !pagination) return;
            cylinder.innerHTML = "";
            pagination.innerHTML = "";

            mExs.forEach((item, idx) => {
                const d = parseDt(item.date);
                const card = document.createElement("article");
                card.className = "landmark-card";
                card.innerHTML = `
                    <div class="landmark-card__image">
                        <img src="${item.image}" alt="${item.title}" loading="lazy">
                        <span class="landmark-card__number">${pad(d.getDate())} / ${pad(d.getMonth() + 1)}</span>
                        <span class="landmark-card__type">${item.category}</span>
                    </div>
                    <div class="landmark-card__body">
                        <span class="landmark-card__location">${item.location} — ${item.time}</span>
                        <h3>${item.title}</h3>
                        <p class="landmark-card__intro">${item.intro}</p>
                    </div>
                `;
                card.addEventListener("click", () => { if (idx !== actIdx) { actIdx = idx; syncV2(mExs); } });
                cylinder.appendChild(card);

                const dot = document.createElement("button");
                dot.type = "button";
                dot.addEventListener("click", () => { actIdx = idx; syncV2(mExs); });
                pagination.appendChild(dot);
            });
        }

        function syncV2(mExs) {
            if (!mExs.length) return;
            const isMob = window.innerWidth <= 760;
            const sX = isMob ? 125 : 195;
            const fX = isMob ? 200 : 310;
            const cards = Array.from(cylinder.querySelectorAll(".landmark-card"));

            cards.forEach((card, index) => {
                const offset = circOffset(index, actIdx, cards.length);
                card.classList.remove("is-active");

                if (offset === 0) {
                    card.classList.add("is-active");
                    card.style.transform = "translate3d(-50%, -50%, 60px) rotateY(0deg) scale(1)";
                    card.style.zIndex = "5";
                    card.style.opacity = "1";
                    card.style.pointerEvents = "auto";
                } else if (Math.abs(offset) === 1) {
                    const dir = offset > 0 ? 1 : -1;
                    card.style.transform = `translate3d(calc(-50% + ${dir * sX}px), -50%, -30px) rotateY(${-dir * 14}deg) scale(0.88)`;
                    card.style.zIndex = "3";
                    card.style.opacity = "0.9";
                    card.style.pointerEvents = "auto";
                } else if (Math.abs(offset) === 2) {
                    const dir = offset > 0 ? 1 : -1;
                    card.style.transform = `translate3d(calc(-50% + ${dir * fX}px), -50%, -120px) rotateY(${-dir * 22}deg) scale(0.75)`;
                    card.style.zIndex = "1";
                    card.style.opacity = "0.35";
                    card.style.pointerEvents = "none";
                } else {
                    card.style.transform = "translate3d(-50%, -50%, -200px) rotateY(0deg) scale(0.6)";
                    card.style.zIndex = "0";
                    card.style.opacity = "0";
                    card.style.pointerEvents = "none";
                }
            });

            pagination.querySelectorAll("button").forEach((dot, i) => dot.classList.toggle("is-active", i === actIdx));
            daysGrid.querySelectorAll(".agenda-v2__day-cell").forEach((cell, i) => cell.classList.toggle("is-selected", i === actIdx));
            if (cardCounter) cardCounter.textContent = `${pad(actIdx + 1)} / ${pad(mExs.length)}`;
        }

        function renderV2Month() {
            const m = curMonth.getMonth();
            const y = curMonth.getFullYear();
            const mExs = getMExs();

            if (enTitle) enTitle.textContent = `${y}. / ${enMonths[m]}`;
            if (arSub) arSub.textContent = arMonths[m];
            if (monthNum) monthNum.textContent = m + 1;
            if (monthNameEl) monthNameEl.textContent = arMonths[m];
            if (countEl) countEl.textContent = mExs.length;

            daysGrid.innerHTML = "";
            mExs.forEach((item, idx) => {
                const d = parseDt(item.date);
                const btn = document.createElement("button");
                btn.type = "button";
                btn.className = `agenda-v2__day-cell${idx === actIdx ? " is-selected" : ""}`;
                btn.innerHTML = `
                    <span class="agenda-v2__day-weekday">${weekdays[d.getDay()]}</span>
                    <strong class="agenda-v2__day-num">${pad(d.getDate())}</strong>
                    <span class="agenda-v2__day-tag">${item.category}</span>
                `;
                btn.addEventListener("click", () => { actIdx = idx; syncV2(mExs); });
                daysGrid.appendChild(btn);
            });

            buildV2Cards(mExs);
            syncV2(mExs);
        }

        function flipV2(dir) {
            const arr = [8, 9, 10];
            const nextM = arr[(arr.indexOf(curMonth.getMonth()) + dir + arr.length) % arr.length];
            if (sheet) {
                sheet.classList.remove("is-flipping");
                void sheet.offsetWidth;
                sheet.classList.add("is-flipping");
            }
            setTimeout(() => {
                curMonth = new Date(2026, nextM, 1);
                actIdx = 0;
                renderV2Month();
            }, 300);
        }

        if (prevMonthBtn) prevMonthBtn.addEventListener("click", () => flipV2(-1));
        if (nextMonthBtn) nextMonthBtn.addEventListener("click", () => flipV2(1));
        if (prevEventBtn) prevEventBtn.addEventListener("click", () => {
            const mExs = getMExs();
            if (!mExs.length) return;
            actIdx = (actIdx - 1 + mExs.length) % mExs.length;
            syncV2(mExs);
        });
        if (nextEventBtn) nextEventBtn.addEventListener("click", () => {
            const mExs = getMExs();
            if (!mExs.length) return;
            actIdx = (actIdx + 1) % mExs.length;
            syncV2(mExs);
        });

        renderV2Month();
    })();

    /*
    |--------------------------------------------------------------------------
    | 6. Damascus Agenda (Model 1 — Desk Notebook Calendar Data & Logic)
    |--------------------------------------------------------------------------
    */
    (() => {
        const root = document.querySelector("#damascus-agenda");
        if (!root) return;

        const $ = (sel) => root.querySelector(sel);

        const monthName = $("#agendaMonthName");
        const yearLabel = $("#agendaYear");
        const enMonthLabel = $("#agendaNotebookEnMonth");
        const monthNumberLabel = $("#agendaMonthNumber");
        const selectedMonthLabel = $("#agendaSelectedMonth");
        const eventCount = $("#agendaEventCount");

        const notebookSheet = $("#agendaNotebookSheet");
        const daysTrack = $("#agendaDaysTrack");

        const featured = $("#agendaFeatured");
        const featuredImage = $("#agendaFeaturedImage");
        const featuredCategory = $("#agendaFeaturedCategory");
        const featuredDate = $("#agendaFeaturedDate");
        const ticketMonthName = $("#agendaTicketMonthName");
        const featuredTitle = $("#agendaFeaturedTitle");
        const featuredDescription = $("#agendaFeaturedDescription");
        const featuredLocation = $("#agendaFeaturedLocation");
        const featuredTime = $("#agendaFeaturedTime");
        const featuredLink = $("#agendaFeaturedLink");

        const daySwitcher = $("#agendaDaySwitcher");
        const eventList = $("#agendaEventList");
        const dayCount = $("#agendaDayCount");
        const emptyState = $("#agendaEmpty");

        const categoryLabels = {
            music: "موسيقى",
            art: "فنون ومعارض",
            heritage: "تراث",
            talk: "ندوات ولقاءات"
        };

        const arMonths = [
            "كانون الثاني", "شباط", "آذار", "نيسان", "أيار", "حزيران",
            "تموز", "آب", "أيلول", "تشرين الأول", "تشرين الثاني", "كانون الأول"
        ];

        const englishMonths = [
            "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
            "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
        ];

        const weekdayNames = [
            "الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"
        ];

        const events = [
            // أيلول 2026
            {
                id: 101,
                date: "2026-09-08",
                title: "ليلة الموشحات الأندلسية والشامية",
                category: "music",
                description: "أمسية طربية في رحاب البيوت الدمشقية القديمة تستعيد أصالة الموشحات والقدود.",
                location: "قصر العظم — دمشق القديمة",
                time: "19:30",
                image: "../assets/azem-palace.jfif",
                url: "#"
            },
            {
                id: 102,
                date: "2026-09-16",
                title: "معرض الخط العربي والزخرفة",
                category: "art",
                description: "لوحات حروفية ومخطوطات نادرة تبرز جماليات المدرسة الدمشقية في الخط العربي.",
                location: "المتحف الوطني — دمشق",
                time: "17:00",
                image: "../assets/damascus-national-museum.jfif",
                url: "#"
            },
            {
                id: 103,
                date: "2026-09-25",
                title: "جولة معمارية في حارات الشام",
                category: "heritage",
                description: "مسار ثقافي تفاعلي للتعرف إلى تاريخ الأبواب السبعة والبيوت التراثية.",
                location: "باب توما — دمشق القديمة",
                time: "16:00",
                image: "../assets/توما2.jfif",
                url: "#"
            },

            // تشرين الأول 2026
            {
                id: 1,
                date: "2026-10-11",
                title: "أمسية موسيقية شامية",
                category: "music",
                description: "أمسية تحتفي بالمقامات والألحان التي ارتبطت بالذاكرة الموسيقية لدمشق.",
                location: "خان أسعد باشا — سوق البزورية",
                time: "18:00",
                image: "../assets/khan-asad-pasha.jfif",
                url: "#"
            },
            {
                id: 2,
                date: "2026-10-11",
                title: "معرض حكايات من المدينة",
                category: "art",
                description: "معرض بصري يستكشف تفاصيل العمارة الدمشقية وأحياء المدينة القديمة.",
                location: "قصر العظم — دمشق القديمة",
                time: "16:00",
                image: "../assets/azem-palace.jfif",
                url: "#"
            },
            {
                id: 3,
                date: "2026-10-14",
                title: "لقاء حول التراث المعماري",
                category: "heritage",
                description: "لقاء يناقش ملامح العمارة التقليدية وطرق الحفاظ على ذاكرة المكان الدمشقي.",
                location: "محيط الجامع الأموي",
                time: "17:30",
                image: "../assets/umayyad-mosque.jfif",
                url: "#"
            },
            {
                id: 4,
                date: "2026-10-17",
                title: "ورشة فنون القيشاني والعجمي",
                category: "art",
                description: "ورشة فنية حيّة تستلهم الألوان والزخارف النباتية والهندسية من القصور الدمشقية.",
                location: "سوق الحميدية — دمشق القديمة",
                time: "11:00",
                image: "../assets/hamidiyah-souk.jfif",
                url: "#"
            },
            {
                id: 5,
                date: "2026-10-20",
                title: "حوار ثقافي: دمشق في عيون الرحالة",
                category: "talk",
                description: "جلسة حوارية تستعرض ما كتبه المؤرخون والرحالة عن أسواق دمشق وبساتينها.",
                location: "المتحف الوطني بدمشق",
                time: "18:00",
                image: "../assets/damascus-national-museum.jfif",
                url: "#"
            },
            {
                id: 6,
                date: "2026-10-23",
                title: "أمسية العود والتراث الشامي",
                category: "music",
                description: "معزوفات شرقية على آلة العود الدمشقي العريق في أجواء تراثية مفتوحة.",
                location: "قصر العظم — دمشق القديمة",
                time: "19:00",
                image: "../assets/azem-palace.jfif",
                url: "#"
            },
            {
                id: 7,
                date: "2026-10-27",
                title: "معرض الذاكرة البصرية لدمشق",
                category: "art",
                description: "توثيق فوتوغرافي نادر لملامح الحياة اليومية والأسواق التاريخية في المدينة.",
                location: "قلعة دمشق التاريخية",
                time: "15:00",
                image: "../assets/damascus-citadel.jfif",
                url: "#"
            },

            // تشرين الثاني 2026
            {
                id: 201,
                date: "2026-11-05",
                title: "مهرجان الحرف الدمشقية العريقة",
                category: "heritage",
                description: "عرض حيّ لحرف البروكار والموزاييك والصدف الدمشقي بمشاركة شيوخ الكار.",
                location: "خان أسعد باشا",
                time: "12:00",
                image: "../assets/khan-asad-pasha.jfif",
                url: "#"
            },
            {
                id: 202,
                date: "2026-11-14",
                title: "ندوة: تاريخ المكتبات والمدارس في دمشق",
                category: "talk",
                description: "قراءة تاريخية في إرث المكتبة الظاهرية والمدارس العادلية والنورية.",
                location: "دمشق القديمة",
                time: "17:00",
                image: "../assets/umayyad-mosque.jfif",
                url: "#"
            },
            {
                id: 203,
                date: "2026-11-22",
                title: "حفل أوركسترا الياسمين",
                category: "music",
                description: "مقطوعات كلاسيكية وموسيقى تصويرية مستوحاة من حكايات الشام.",
                location: "ساحة الأمويين — دمشق",
                time: "20:00",
                image: "../assets/damascus-national-museum.jfif",
                url: "#"
            }
        ];

        let visibleMonth = new Date(2026, 9, 1);
        let selectedDate = "2026-10-11";
        let activeCategory = "all";
        let selectedEventId = null;
        let isFlipping = false;

        const pad = (v) => String(v).padStart(2, "0");
        const parseDate = (k) => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d); };
        const sameMonth = (d, m) => d.getFullYear() === m.getFullYear() && d.getMonth() === m.getMonth();
        const formatArabicDate = (k) => { const d = parseDate(k); return `${weekdayNames[d.getDay()]}، ${d.getDate()} ${arMonths[d.getMonth()]}`; };
        const formatTime = (t) => {
            if (!t) return "يحدد لاحقاً";
            const [h, m] = t.split(":").map(Number);
            return `${h % 12 || 12}:${pad(m)} ${h >= 12 ? "مساءً" : "صباحاً"}`;
        };

        const getFilteredMonthEvents = () => events.filter(ev =>
            sameMonth(parseDate(ev.date), visibleMonth) &&
            (activeCategory === "all" || ev.category === activeCategory)
        );

        const getActiveEventDays = () => {
            const grouped = new Map();
            getFilteredMonthEvents().forEach(ev => {
                if (!grouped.has(ev.date)) grouped.set(ev.date, []);
                grouped.get(ev.date).push(ev);
            });
            return Array.from(grouped.entries())
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([date, dayEvents]) => ({ date, events: dayEvents }));
        };

        const renderMonthHeader = () => {
            const m = visibleMonth.getMonth();
            const y = visibleMonth.getFullYear();
            const activeDays = getActiveEventDays();
            if (monthName) monthName.textContent = arMonths[m];
            if (yearLabel) yearLabel.textContent = y;
            if (enMonthLabel) enMonthLabel.textContent = `${y} / ${englishMonths[m]}`;
            if (monthNumberLabel) monthNumberLabel.textContent = m + 1;
            if (selectedMonthLabel) selectedMonthLabel.textContent = arMonths[m];
            if (eventCount) eventCount.textContent = activeDays.length;
        };

        const renderFeaturedEvent = (ev) => {
            if (!ev) {
                if (featuredCategory) featuredCategory.textContent = "لا توجد فعالية";
                if (featuredDate) featuredDate.textContent = "—";
                if (featuredTitle) featuredTitle.textContent = "لا توجد فعاليات في هذا التصنيف";
                if (featuredDescription) featuredDescription.textContent = "جرّب تصنيفاً آخر أو اقلب الورقة إلى شهر آخر.";
                if (daySwitcher) daySwitcher.hidden = true;
                return;
            }
            const d = parseDate(ev.date);
            if (featuredImage && ev.image) featuredImage.src = ev.image;
            if (featuredCategory) featuredCategory.textContent = categoryLabels[ev.category] || "فعالية ثقافية";
            if (featuredDate) featuredDate.textContent = formatArabicDate(ev.date);
            if (ticketMonthName) ticketMonthName.textContent = arMonths[d.getMonth()];
            if (featuredTitle) featuredTitle.textContent = ev.title;
            if (featuredDescription) featuredDescription.textContent = ev.description;
            if (featuredLocation) featuredLocation.textContent = ev.location;
            if (featuredTime) featuredTime.textContent = formatTime(ev.time);
            if (featuredLink && ev.url) featuredLink.href = ev.url;
        };

        const renderSelectedDayTicket = () => {
            const activeDays = getActiveEventDays();
            const group = activeDays.find(g => g.date === selectedDate);
            if (!group || !group.events.length) {
                renderFeaturedEvent(null);
                return;
            }
            const dayEvents = group.events;
            if (!dayEvents.some(e => e.id === selectedEventId)) selectedEventId = dayEvents[0].id;
            renderFeaturedEvent(dayEvents.find(e => e.id === selectedEventId));

            if (daySwitcher && eventList) {
                if (dayCount) dayCount.textContent = dayEvents.length;
                eventList.innerHTML = "";
                if (dayEvents.length > 1) {
                    daySwitcher.hidden = false;
                    dayEvents.forEach(ev => {
                        const btn = document.createElement("button");
                        btn.type = "button";
                        btn.className = `agenda-event-pill${ev.id === selectedEventId ? " is-active" : ""}`;
                        btn.textContent = `${ev.title} (${formatTime(ev.time)})`;
                        btn.addEventListener("click", () => { selectedEventId = ev.id; renderSelectedDayTicket(); });
                        eventList.appendChild(btn);
                    });
                } else {
                    daySwitcher.hidden = true;
                }
            }
            if (featured) {
                featured.classList.remove("agenda-is-changing");
                void featured.offsetWidth;
                featured.classList.add("agenda-is-changing");
            }
        };

        const renderNotebookEventDays = () => {
            const activeDays = getActiveEventDays();
            if (!daysTrack) return;
            daysTrack.innerHTML = "";

            if (activeDays.length === 0) {
                if (emptyState) emptyState.hidden = false;
                daysTrack.hidden = true;
                renderFeaturedEvent(null);
                return;
            }
            if (emptyState) emptyState.hidden = true;
            daysTrack.hidden = false;

            if (!activeDays.some(i => i.date === selectedDate)) {
                selectedDate = activeDays[0].date;
                selectedEventId = null;
            }

            activeDays.forEach((dayGroup, idx) => {
                const d = parseDate(dayGroup.date);
                const firstEvent = dayGroup.events[0];
                const isSelected = dayGroup.date === selectedDate;

                const cardBtn = document.createElement("button");
                cardBtn.type = "button";
                cardBtn.className = `agenda-day-stamp${isSelected ? " is-selected" : ""}`;
                cardBtn.dataset.date = dayGroup.date;
                cardBtn.style.animationDelay = `${idx * 55}ms`;

                const extraCount = dayGroup.events.length > 1
                    ? `<span class="agenda-day-stamp__multi">+${dayGroup.events.length} فعاليات</span>`
                    : `<span class="agenda-day-stamp__cat">${categoryLabels[firstEvent.category] || "فعالية"}</span>`;

                cardBtn.innerHTML = `
                    <div class="agenda-day-stamp__top">
                        <span class="agenda-day-stamp__weekday">${weekdayNames[d.getDay()]}</span>
                        ${extraCount}
                    </div>
                    <div class="agenda-day-stamp__number">${pad(d.getDate())}</div>
                    <div class="agenda-day-stamp__title">${firstEvent.title}</div>
                    <div class="agenda-day-stamp__time">◷ ${formatTime(firstEvent.time)}</div>
                `;

                cardBtn.addEventListener("click", () => {
                    selectedDate = dayGroup.date;
                    selectedEventId = null;
                    daysTrack.querySelectorAll(".agenda-day-stamp").forEach(b =>
                        b.classList.toggle("is-selected", b.dataset.date === selectedDate)
                    );
                    renderSelectedDayTicket();
                });

                daysTrack.appendChild(cardBtn);
            });
        };

        const changeMonthWithPageFlip = (offset) => {
            if (isFlipping) return;
            const availableMonths = [8, 9, 10];
            const pos = availableMonths.indexOf(visibleMonth.getMonth());
            const nextPos = (pos + offset + availableMonths.length) % availableMonths.length;

            isFlipping = true;
            const flipClass = offset > 0 ? "is-flipping-next" : "is-flipping-prev";
            if (notebookSheet) {
                notebookSheet.classList.remove("is-flipping-next", "is-flipping-prev");
                void notebookSheet.offsetWidth;
                notebookSheet.classList.add(flipClass);
            }

            setTimeout(() => {
                visibleMonth = new Date(2026, availableMonths[nextPos], 1);
                selectedEventId = null;
                renderMonthHeader();
                renderNotebookEventDays();
                renderSelectedDayTicket();
            }, 320);

            setTimeout(() => {
                if (notebookSheet) notebookSheet.classList.remove(flipClass);
                isFlipping = false;
            }, 780);
        };

        $("#agendaPrevMonth")?.addEventListener("click", () => changeMonthWithPageFlip(-1));
        $("#agendaNextMonth")?.addEventListener("click", () => changeMonthWithPageFlip(1));

        root.querySelectorAll("[data-agenda-filter]").forEach(btn => {
            btn.addEventListener("click", () => {
                activeCategory = btn.dataset.agendaFilter;
                root.querySelectorAll("[data-agenda-filter]").forEach(f =>
                    f.classList.toggle("is-active", f === btn)
                );
                selectedEventId = null;
                renderMonthHeader();
                renderNotebookEventDays();
                renderSelectedDayTicket();
            });
        });

        $("#agendaShowAll")?.addEventListener("click", () => {
            activeCategory = "all";
            root.querySelectorAll("[data-agenda-filter]").forEach(f =>
                f.classList.toggle("is-active", f.dataset.agendaFilter === "all")
            );
            selectedEventId = null;
            renderMonthHeader();
            renderNotebookEventDays();
            renderSelectedDayTicket();
        });

        renderMonthHeader();
        renderNotebookEventDays();
        renderSelectedDayTicket();
    })();


    /*
    |--------------------------------------------------------------------------
    | 7. Intangible Heritage — الصنعات والحرف الدمشقية الكبرى (#damascus-intangible)
    |--------------------------------------------------------------------------
    */
    (() => {
        const root = document.querySelector("#damascus-intangible");
        if (!root) return;

        const listEl = root.querySelector("#intangibleCraftsList");
        const showcaseEl = root.querySelector("#intangibleShowcase");
        const imgEl = root.querySelector("#intangibleImage");
        const numEl = root.querySelector("#intangibleNumber");
        const badgeEl = root.querySelector("#intangibleBadge");
        const quoteEl = root.querySelector("#intangibleQuote");
        const eraEl = root.querySelector("#intangibleEra");
        const titleEl = root.querySelector("#intangibleTitle");
        const descEl = root.querySelector("#intangibleDesc");
        const matEl = root.querySelector("#intangibleMaterial");
        const locEl = root.querySelector("#intangibleLocation");
        const secEl = root.querySelector("#intangibleSecret");
        const progressEl = root.querySelector("#intangibleProgressBar");
        const prevBtn = root.querySelector("#intangiblePrev");
        const nextBtn = root.querySelector("#intangibleNext");

        const craftsData = [
            {
                title: "الخزف والقيشاني الدمشقي",
                subtitle: "سحر الفيروز واللازورد على جدران الشام",
                badge: "صناعة الخزف والفخار",
                era: "ازدهرت منذ العهدين المملوكي والعثماني",
                description: "اشتهرت دمشق بصناعة الفخار والخزف المصقول وبلاط القيشاني ذي الألوان الزرقاء والفيروزية، الذي يزيّن جدران الجوامع والقصور والبيوت الدمشقية برسومٍ نباتية وهندسية بالغة الدقة.",
                material: "الطين النقي والأكاسيد المعدنية",
                location: "التكية السليمانية وباب شرقي",
                secret: "الرسم اليدوي والحرق المزدوج في الأفران",
                quote: "«طينٌ وماءٌ ونار.. تخرجُ منها جنانٌ زرقاءُ لا تذبل»",
                image: "../assets/azem-palace.jfif",
                icon: `<svg viewBox="0 0 24 24"><path d="M8 3h8l-1 5c2 2 3 4.5 3 7.5A5.5 5.5 0 0 1 12.5 21h-1A5.5 5.5 0 0 1 6 15.5C6 12.5 7 10 9 8L8 3Z"/><path d="M6.5 14h11"/></svg>`
            },
            {
                title: "الزجاج الدمشقي المنفوخ",
                subtitle: "أنفاس الحرفي التي تُشكّل الضوء واللون",
                badge: "صناعة الزجاج اليدوي",
                era: "حرفة عريقة ممتدة منذ العصور القديمة",
                description: "يُصهر الزجاج في أفرانٍ طينية تقليدية على درجات حرارة عالية، ثم ينفخه شيخ الكار عبر أنبوب معدني طويل ليصنع القناديل والأباريق والكؤوس الدمشقية الملوّنة دون أي قالب آلي.",
                material: "الرمل البلوري والزجاج المعاد صهره",
                location: "سوق المهن اليدوية وباب شرقي",
                secret: "التشكيل الحر بالنفخ والزخرفة بالمينا",
                quote: "«من لهيبِ النارِ ونَفَسِ الصانعِ يولدُ البلّورُ الدمشقي»",
                image: "../assets/khan-asad-pasha.jfif",
                icon: `<svg viewBox="0 0 24 24"><path d="M12 2v5m-4 4a4 4 0 1 0 8 0c0-2-2-3.5-2-6h-4c0 2.5-2 4-2 6Zm-2 10h12"/><path d="M12 15v6"/></svg>`
            },
            {
                title: "الأثاث العربي والموزاييك والصدف",
                subtitle: "هندسة الخشب المعشّق وبريق عرق اللؤلؤ",
                badge: "صناعة الأثاث الدمشقي",
                era: "تراث البيوت والقصور الشامية",
                description: "تُجمع آلاف القطع الصغيرة من أخشاب الجوز والليمون والزيتون والورد مع رقائق الصدف الطبيعي لتشكيل صناديق العرائس والكراسي والطاولات الدمشقية بتناظر هندسي مذهل.",
                material: "خشب الجوز والليمون وعرق اللؤلؤ",
                location: "حارات دمشق القديمة وسوق الخجا",
                secret: "التعشيق الهندسي الدقيق وتنزيل الصدف",
                quote: "«آلافُ القطعِ الخشبيةِ تتعانقُ لتروي صبرَ الحرفي الدمشقي»",
                image: "../assets/damascus-ottoman.jfif",
                icon: `<svg viewBox="0 0 24 24"><polygon points="12 2 22 12 12 22 2 12 12 2"/><circle cx="12" cy="12" r="3"/></svg>`
            },
            {
                title: "النسيج والبروكار الدمشقي",
                subtitle: "حرير الشام المنسوج بخيوط الذهب والفضة",
                badge: "صناعة النسيج والحرير",
                era: "منها اشتُق اسم قماش (Damask) عالمياً",
                description: "ارتبط اسم دمشق عالمياً بأفخر أنواع الأقمشة الحريرية (الداماسك والبروكار والدامسكو)، حيث تُنسج خيوط الحرير الطبيعي مع خيوط القصب الذهبية والفضية على أنوالٍ تقليدية.",
                material: "الحرير الطبيعي وخيوط الذهب والفضة",
                location: "سوق الحرير وسوق الحميدية",
                secret: "حياكة الجاكار والأنوال اليدوية المتوارثة",
                quote: "«قماشٌ دمشقيٌّ ارتدتهُ ملوكُ الشرقِ والغرب»",
                image: "../assets/hamidiyah-souk.jfif",
                icon: `<svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/><path d="M8 3v18M16 3v18"/></svg>`
            },
            {
                title: "الخط العربي والنسخ والتذهيب",
                subtitle: "جماليات الحرف الدمشقي وزخرفة المخطوطات",
                badge: "فن النسخ والخط",
                era: "مدرسة دمشق في الخط والوراقة",
                description: "كانت دمشق مركزاً للنسّاخين والورّاقين والمذهّبين الذين حفظوا العلوم والآداب في مخطوطاتٍ نادرة، واشتهر خطاطوها بإتقان خطوط الثلث والنسخ والديواني والرقعة وتذهيب الحواشي.",
                material: "القلم القصبي والحبر الدمشقي وماء الذهب",
                location: "محيط الجامع الأموي والمكتبة الظاهرية",
                secret: "ميزان الحروف بالنقاط والتذهيب النباتي",
                quote: "«في دمشقَ صارَ الحرفُ لوحةً، وصارت الكلمةُ عمارةً»",
                image: "../assets/umayyad-mosque.jfif",
                icon: `<svg viewBox="0 0 24 24"><path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>`
            },
            {
                title: "النحاسيات والتكفيت الدمشقي",
                subtitle: "نقش المعادن وتطعيمها بالفضة والذهب",
                badge: "صناعة النحاسيات",
                era: "من أقدم أسواق الحرف حول الأموي",
                description: "فن طرق النحاس وحفره بالأزاميل الدقيقة ثم تطعيمه بأسلاك الفضة والذهب (التكفيت) لصناعة الصواني والثريات الدمشقية والأواني التراثية المزدانة بالخطوط العربية.",
                material: "النحاس الأحمر والأصفر وخيوط الفضة",
                location: "سوق النحاسين في دمشق القديمة",
                secret: "الحفر الغائر وتثبيت الفضة بالطرق",
                quote: "«رنينُ المطارقِ في سوقِ النحاسين موسيقى دمشقَ اليومية»",
                image: "../assets/damascus-national-museum.jfif",
                icon: `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/><path d="M12 3v2m0 14v2M3 12h2m14 0h2"/></svg>`
            }
        ];

        let activeIdx = 0;
        let timer = null;
        const pad = (n) => String(n).padStart(2, "0");

        // بناء أزرار الحرف على اليمين
        listEl.innerHTML = craftsData.map((craft, idx) => `
            <button
                type="button"
                class="intangible-craft-tab${idx === 0 ? " is-active" : ""}"
                role="tab"
                aria-selected="${idx === 0}"
                data-craft-idx="${idx}"
            >
                <span class="intangible-craft-tab__icon">${craft.icon}</span>
                <span class="intangible-craft-tab__info">
                    <strong>${craft.title}</strong>
                    <span>${craft.subtitle}</span>
                </span>
                <span class="intangible-craft-tab__arrow" aria-hidden="true">←</span>
            </button>
        `).join("");

        const tabs = Array.from(listEl.querySelectorAll(".intangible-craft-tab"));

        function selectCraft(index) {
            activeIdx = (index + craftsData.length) % craftsData.length;
            const item = craftsData[activeIdx];

            tabs.forEach((t, i) => {
                const isAct = i === activeIdx;
                t.classList.toggle("is-active", isAct);
                t.setAttribute("aria-selected", String(isAct));
            });

            showcaseEl.classList.remove("is-switching");
            void showcaseEl.offsetWidth;
            showcaseEl.classList.add("is-switching");

            imgEl.src = item.image;
            imgEl.alt = item.title;
            numEl.textContent = `${pad(activeIdx + 1)} / ${pad(craftsData.length)}`;
            badgeEl.textContent = item.badge;
            quoteEl.textContent = item.quote;
            eraEl.textContent = item.era;
            titleEl.textContent = item.title;
            descEl.textContent = item.description;
            matEl.textContent = item.material;
            locEl.textContent = item.location;
            secEl.textContent = item.secret;

            if (progressEl) {
                progressEl.style.width = `${((activeIdx + 1) / craftsData.length) * 100}%`;
            }
        }

        function startAuto() {
            if (timer) clearInterval(timer);
            timer = setInterval(() => selectCraft(activeIdx + 1), 4800);
        }

        tabs.forEach((tab, idx) => {
            tab.addEventListener("click", () => {
                selectCraft(idx);
                startAuto();
            });
        });

        prevBtn?.addEventListener("click", () => { selectCraft(activeIdx - 1); startAuto(); });
        nextBtn?.addEventListener("click", () => { selectCraft(activeIdx + 1); startAuto(); });

        root.addEventListener("mouseenter", () => clearInterval(timer));
        root.addEventListener("mouseleave", startAuto);

        selectCraft(0);
        startAuto();
    })();

});
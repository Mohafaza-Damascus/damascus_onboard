/* Cultural Model 5 — calendar + new timeline */

document.addEventListener("DOMContentLoaded", () => {
    /*
    |--------------------------------------------------------------------------
    | Cultural Events Calendar
    |--------------------------------------------------------------------------
    */

    const calendarGrid =
        document.getElementById("calendarGrid");

    const calendarMonth =
        document.getElementById("calendarMonth");

    const calendarYear =
        document.getElementById("calendarYear");

    const calendarPrev =
        document.getElementById("calendarPrev");

    const calendarNext =
        document.getElementById("calendarNext");


    /*
    |--------------------------------------------------------------------------
    | Events Data
    |--------------------------------------------------------------------------
    */

    const culturalEvents = {
        "2026-10-12": {
            id: "music-night-01",
            category: "موسيقى",
            title: "أمسية موسيقية",
            description:
                "أمسية موسيقية تجمع عدداً من الفنانين والموسيقيين في دمشق.",
        },

        "2026-10-18": {
            id: "art-exhibition-01",
            category: "فنون",
            title: "معرض فني",
            description:
                "معرض فني يضم مجموعة من الأعمال الفنية المعاصرة.",
        },

        "2026-10-24": {
            id: "heritage-event-01",
            category: "تراث",
            title: "فعالية تراثية",
            description:
                "فعالية ثقافية تستعرض جانباً من التراث الدمشقي.",
        },

        "2026-10-27": {
            id: "theatre-night-01",
            category: "مسرح",
            title: "عرض مسرحي",
            description:
                "عرض مسرحي ضمن البرنامج الثقافي للمدينة.",
        }
    };


    /*
    |--------------------------------------------------------------------------
    | Calendar State
    |--------------------------------------------------------------------------
    */

    let calendarDate = new Date(2026, 9, 1);


    const monthNames = [
        "كانون الثاني",
        "شباط",
        "آذار",
        "نيسان",
        "أيار",
        "حزيران",
        "تموز",
        "آب",
        "أيلول",
        "تشرين الأول",
        "تشرين الثاني",
        "كانون الأول"
    ];

const gatesData = [
    {
        number: "01",
        period: "أحد أبواب دمشق القديمة",
        title: "باب توما",
        description:
            "حافظ الباب على حضوره ضمن النسيج التاريخي للمدينة، وأصبح من أبرز المعالم المرتبطة بأحياء دمشق.",
        image: "../assets/توما2.jfif",
        id: "bab-touma"
    },

    {
        number: "02",
        period: "أحد أبواب دمشق القديمة",
        title: "باب شرقي",
        description:
            " يتميز بأهميته العمرانية وموقعه المرتبط بالطرق التي كانت تصل دمشق بمحيطها الشرقي عبر العصور.",
        image: "../assets/شرقي.jfif",
        id: "bab-sharqi"
    },

    {
        number: "03",
        period: "أحد أبواب دمشق القديمة",
        title: "باب الجابية",
        description:
            " شكّل الباب عبر العصور جزءاً من المداخل التي نظمت حركة الدخول والخروج من المدينة القديمة.",
        image: "../assets/الجابية.jfif",
        id: "bab-al-jabiya"
    },

    {
        number: "04",
        period: "أحد أبواب دمشق القديمة",
        title: "باب كيسان",
        description:
            " من الأبواب ذات الحضور التاريخي المميز. ارتبط الباب بتاريخ المدينة ومداخلها القديمة،.",
        image: "../assets/كيسان.jfif",
        id: "bab-kaysan"
    },

    {
        number: "05",
        period: "أحد أبواب دمشق القديمة",
        title: "باب الصغير",
        description:
            " ويرتبط بتاريخ المدينة ومقابرها التاريخية ومعالمها العمرانية.",
        image: "../assets/الصغير2.jfif",
        id: "bab-al-saghir"
    },

    {
        number: "06",
        period: "أحد أبواب دمشق القديمة",
        title: "باب الفراديس",
        description:
            " ويُعد من الأبواب التاريخية التي حملت أسماء مرتبطة بجغرافية المدينة وبساتينها.",
        image: "../assets/الفراديس2.jfif",
        id: "bab-al-faradis"
    },

    {
        number: "07",
        period: "أحد أبواب دمشق القديمة",
        title: "باب السلام",
        description:
            " كان جزءاً من الأبواب التي شكلت مداخل دمشق وحافظت على اتصال المدينة القديمة بمحيطها الخارجي.",
        image: "../assets/السلام.jfif",
        id: "bab-al-salam"
    }
];


    /*
    |--------------------------------------------------------------------------
    | Seven Gates Timeline
    |--------------------------------------------------------------------------
    */

    const gatesRoot = document.querySelector("[data-gates-timeline]");

    if (gatesRoot) {
        const gatesCardsTrack =
            gatesRoot.querySelector("[data-gates-cards-track]");

        const gatesPointsTrack =
            gatesRoot.querySelector("[data-gates-points-track]");

        const gatesScene =
            gatesRoot.querySelector(".damascus-timeline__scene");

        const gatesPeriod =
            gatesRoot.querySelector("[data-gates-period]");

        const gatesTitle =
            gatesRoot.querySelector("[data-gates-title]");

        const gatesDescription =
            gatesRoot.querySelector("[data-gates-description]");

        const gatesMore =
            gatesRoot.querySelector("[data-gates-more]");

        const gatesCurrent =
            gatesRoot.querySelector("[data-gates-current]");

        const gatesTotal =
            gatesRoot.querySelector("[data-gates-total]");

        const gatesPrevious =
            gatesRoot.querySelector("[data-gates-prev]");

        const gatesNext =
            gatesRoot.querySelector("[data-gates-next]");

        const gatesCount = gatesData.length;

        let gatesActive = Math.floor((gatesCount - 1) / 2);
        let gatesDragStartX = 0;
        let gatesIsDragging = false;

        // Prevent errors if the HTML structure is incomplete.
        if (
            gatesCardsTrack &&
            gatesPointsTrack &&
            gatesScene &&
            gatesPeriod &&
            gatesTitle &&
            gatesDescription &&
            gatesMore &&
            gatesCurrent &&
            gatesTotal &&
            gatesPrevious &&
            gatesNext
        ) {
            gatesRoot.style.setProperty("--timeline-count", gatesCount);
            gatesRoot.style.setProperty("--points-count", gatesCount);

            gatesTotal.textContent =
                String(gatesCount).padStart(2, "0");

            // Create navigation points.
            gatesData.forEach((gate, index) => {
                const point = document.createElement("button");

                point.type = "button";
                point.className = "damascus-timeline__year";
                point.innerHTML = `<span>${gate.number}</span>`;

                point.addEventListener("click", () => {
                    goToGate(index);
                });

                gatesPointsTrack.appendChild(point);
            });

            const gatesPoints = [...gatesPointsTrack.children];

            // Render all gate cards and their images.
            function renderGatesCards() {
                const cardWidth = gatesScene.clientWidth / 3;

                gatesCardsTrack.style.setProperty(
                    "--timeline-card-width",
                    `${cardWidth}px`
                );

                gatesCardsTrack.innerHTML = gatesData.map((gate, index) => {
                    const activeClass =
                        index === gatesActive ? " is-active" : "";

                    return `
                        <article
                            class="damascus-timeline__card${activeClass}"
                            data-gate-index="${index}"
                        >
                            <div class="damascus-timeline__card-label">
                                <strong>${gate.title}</strong>
                                <span>${gate.number}</span>
                            </div>

                            <div class="damascus-timeline__card-image">
                                <img
                                    src="${gate.image}"
                                    alt="${gate.title}"
                                    loading="lazy"
                                >
                            </div>
                        </article>
                    `;
                }).join("");
            }

            // Position the navigation points.
            function moveGatesPoints() {
                gatesPoints.forEach((point, index) => {
                    const middle = (gatesCount - 1) / 2;
                    const distance = Math.abs(index - middle);
                    const normalizedDistance =
                        middle === 0 ? 0 : distance / middle;

                    const curveOffset = Math.round(
                        Math.pow(normalizedDistance, 2) * 100
                    );

                    point.style.setProperty(
                        "--curve-offset",
                        `${curveOffset}px`
                    );

                    point.classList.toggle(
                        "is-active",
                        index === gatesActive
                    );
                });

                gatesPointsTrack.style.transform =
                    "translate3d(0, 0, 0)";
            }

            // Keep three cards visible and move them with the active gate.
            function moveGatesCards(animate = true, offset = 0) {
                const start = Math.max(
                    0,
                    Math.min(gatesActive - 1, gatesCount - 3)
                );

                const cardWidth = gatesScene.clientWidth / 3;

                gatesCardsTrack.style.setProperty(
                    "--timeline-card-width",
                    `${cardWidth}px`
                );

                const translateX = -(start * cardWidth) + offset;

                gatesCardsTrack.style.transition = animate
                    ? "transform .72s cubic-bezier(.22,.61,.36,1)"
                    : "none";

                gatesCardsTrack.style.transform =
                    `translate3d(${translateX}px, 0, 0)`;
            }

            // Apply the active and visible card classes.
            function updateGatesCardSlots() {
                const start = Math.max(
                    0,
                    Math.min(gatesActive - 1, gatesCount - 3)
                );

                gatesCardsTrack
                    .querySelectorAll(".damascus-timeline__card")
                    .forEach((card, index) => {
                        card.className = "damascus-timeline__card";

                        if (index === gatesActive) {
                            card.classList.add("is-active");
                        }

                        if (index >= start && index < start + 3) {
                            card.classList.add(`card-slot-${index - start}`);
                        }
                    });
            }

            // Update the active gate details.
function updateGates(index) {
    const gate = gatesData[index];

    gatesActive = index;

    gatesPoints.forEach((point, pointIndex) => {
        point.classList.toggle(
            "is-active",
            pointIndex === index
        );
    });

    gatesPeriod.textContent = gate.period;
    gatesTitle.textContent = gate.title;
    gatesDescription.textContent = gate.description;

    // Replay the text animation whenever the active gate changes.
    const content = gatesRoot.querySelector(
        ".damascus-timeline__content"
    );

    if (content) {
        content.classList.remove("is-revealing");

        // Force reflow so the animation can restart.
        void content.offsetWidth;

        content.classList.add("is-revealing");
    }

    gatesMore.href =
        `Gates-details.html?gate=${encodeURIComponent(gate.id)}`;

    gatesCurrent.textContent =
        String(index + 1).padStart(2, "0");

    gatesPrevious.disabled = index === 0;
    gatesNext.disabled = index === gatesCount - 1;

    updateGatesCardSlots();
    moveGatesPoints();
    moveGatesCards(true);
}


            function goToGate(index) {
                const safeIndex = Math.max(
                    0,
                    Math.min(index, gatesCount - 1)
                );

                updateGates(safeIndex);
            }

            // Previous and next buttons.
            gatesPrevious.addEventListener("click", () => {
                goToGate(gatesActive - 1);
            });

            gatesNext.addEventListener("click", () => {
                goToGate(gatesActive + 1);
            });

            // Drag interaction.
            gatesScene.addEventListener("pointerdown", (event) => {
                gatesDragStartX = event.clientX;
                gatesIsDragging = true;

                gatesCardsTrack.style.transition = "none";
                gatesScene.setPointerCapture(event.pointerId);
            });

            gatesScene.addEventListener("pointermove", (event) => {
                if (!gatesIsDragging) return;

                moveGatesCards(
                    false,
                    event.clientX - gatesDragStartX
                );
            });

            gatesScene.addEventListener("pointerup", (event) => {
                if (!gatesIsDragging) return;

                const distance = event.clientX - gatesDragStartX;
                gatesIsDragging = false;

                if (Math.abs(distance) > 55) {
                    goToGate(gatesActive + (distance < 0 ? 1 : -1));
                } else {
                    moveGatesCards(true);
                }
            });

            gatesScene.addEventListener("pointercancel", () => {
                gatesIsDragging = false;
                moveGatesCards(true);
            });

            // Recalculate card widths on resize.
            window.addEventListener("resize", () => {
                renderGatesCards();
                updateGatesCardSlots();
                moveGatesPoints();
                moveGatesCards(false);
            });

            // Initial render.
            renderGatesCards();
            updateGatesCardSlots();
            updateGates(gatesActive);
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Format Event Date
    |--------------------------------------------------------------------------
    */

    function formatEventDate(year, month, day) {

        return [
            year,
            String(month + 1).padStart(2, "0"),
            String(day).padStart(2, "0")
        ].join("-");
    }


    /*
    |--------------------------------------------------------------------------
    | Render Calendar
    |--------------------------------------------------------------------------
    */

    function renderCalendar() {

        if (!calendarGrid) {
            return;
        }

        const year =
            calendarDate.getFullYear();

        const month =
            calendarDate.getMonth();

        const firstDay =
            new Date(year, month, 1).getDay();

        const daysInMonth =
            new Date(year, month + 1, 0).getDate();


        calendarMonth.textContent =
            monthNames[month];

        calendarYear.textContent =
            year;


        calendarGrid.innerHTML = "";


        /*
        |----------------------------------------------------------------------
        | Empty cells before first day
        |----------------------------------------------------------------------
        */

        for (let i = 0; i < firstDay; i++) {

            const emptyDay =
                document.createElement("div");

            emptyDay.className =
                "calendar-day is-empty";

            calendarGrid.appendChild(emptyDay);
        }


        /*
        |----------------------------------------------------------------------
        | Days
        |----------------------------------------------------------------------
        */

        for (let day = 1; day <= daysInMonth; day++) {

            const dateKey =
                formatEventDate(
                    year,
                    month,
                    day
                );

            const event =
                culturalEvents[dateKey];


            const dayElement =
                document.createElement(
                    event ? "a" : "div"
                );


            dayElement.className =
                "calendar-day";


            if (event) {

                dayElement.classList.add(
                    "has-event"
                );

                dayElement.href =
                    `Events-details.html?event=${encodeURIComponent(event.id)}`;
            }


            /*
            |------------------------------------------------------------------
            | Today
            |------------------------------------------------------------------
            */

            const today =
                new Date();

            const isToday =
                today.getFullYear() === year &&
                today.getMonth() === month &&
                today.getDate() === day;

            if (isToday) {

                dayElement.classList.add(
                    "is-today"
                );
            }


            /*
            |------------------------------------------------------------------
            | Day Number
            |------------------------------------------------------------------
            */

            const dayNumber =
                document.createElement("span");

            dayNumber.className =
                "calendar-day-number";

            dayNumber.textContent =
                String(day);


            dayElement.appendChild(
                dayNumber
            );


            /*
            |------------------------------------------------------------------
            | Event
            |------------------------------------------------------------------
            */

            if (event) {

                const marker =
                    document.createElement("div");

                marker.className =
                    "calendar-event-marker";


                const dot =
                    document.createElement("span");

                dot.className =
                    "calendar-event-dot";


                const category =
                    document.createElement("span");

                category.className =
                    "calendar-event-category";

                category.textContent =
                    event.category;


                marker.appendChild(dot);

                marker.appendChild(category);

                dayElement.appendChild(marker);


                /*
                |----------------------------------------------------------------
                | Hover Preview
                |----------------------------------------------------------------
                */

                const preview =
                    document.createElement("div");

                preview.className =
                    "calendar-event-preview";


                preview.innerHTML = `
                    <span class="calendar-event-preview-category">
                        ${event.category}
                    </span>

                    <strong class="calendar-event-preview-title">
                        ${event.title}
                    </strong>

                    <span class="calendar-event-preview-description">
                        ${event.description}
                    </span>
                `;


                dayElement.appendChild(
                    preview
                );
            }


            calendarGrid.appendChild(
                dayElement
            );
        }
    }


    /*
    |--------------------------------------------------------------------------
    | Previous Month
    |--------------------------------------------------------------------------
    */

    if (calendarPrev) {

        calendarPrev.addEventListener(
            "click",
            () => {

                calendarDate.setMonth(
                    calendarDate.getMonth() - 1
                );

                renderCalendar();
            }
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Next Month
    |--------------------------------------------------------------------------
    */

    if (calendarNext) {

        calendarNext.addEventListener(
            "click",
            () => {

                calendarDate.setMonth(
                    calendarDate.getMonth() + 1
                );

                renderCalendar();
            }
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Initial Calendar
    |--------------------------------------------------------------------------
    */

    renderCalendar();
});



document.addEventListener("DOMContentLoaded", () => {
    const root = document.querySelector("[data-timeline]");
    if (!root) return;

const data = [
    {
        date: "3000 ق.م",
        period: "العصور القديمة",
        title: "بدايات دمشق",
        description: "نشأة دمشق وتطورها كمدينة ومركز حضري في منطقة بلاد الشام.",
        id: "damascus-ancient",
        image: "../assets/damascus-ancient.jfif"
    },

    {
        date: "1100 ق.م",
        period: "العصر الآرامي",
        title: "دمشق عاصمة للمملكة الآرامية",
        description: "برزت دمشق كمركز سياسي وحضاري مهم في المنطقة خلال العصر الآرامي.",
        id: "damascus-aram",
        image: "../assets/damascus-aram.jfif"
    },

    {
        date: "732 ق.م",
        period: "العصر الآشوري",
        title: "مرحلة التحولات السياسية",
        description: "دخلت دمشق ضمن التحولات السياسية الكبرى التي شهدتها المنطقة.",
        id: "damascus-assyrian",
        image: "../assets/damascus-assyrian.jfif"
    },

    {
        date: "333 ق.م",
        period: "العصر الهلنستي",
        title: "تأثير الحضارة الهلنستية",
        description: "شهدت المدينة تفاعلاً مع الحضارات والثقافات الهلنستية في المنطقة.",
        id: "damascus-hellenistic",
        image: "../assets/damascus-hellenistic.jfif"
    },

    {
        date: "64 ق.م",
        period: "العصر الروماني",
        title: "دمشق ضمن العالم الروماني",
        description: "تطورت دمشق عمرانياً واقتصادياً ضمن شبكة المدن الرومانية في بلاد الشام.",
        id: "damascus-roman",
        image: "../assets/damascus-roman.jfif"
    },

    {
        date: "395 م",
        period: "العصر البيزنطي",
        title: "تحولات المدينة في العصر البيزنطي",
        description: "استمرت دمشق كمركز حضري وتجاري مهم خلال المرحلة البيزنطية.",
        id: "damascus-byzantine",
        image: "../assets/damascus-byzantine.jfif"
    },

    {
        date: "635 م",
        period: "الفتح الإسلامي",
        title: "انتقال دمشق إلى العصر الإسلامي",
        description: "دخلت دمشق مرحلة تاريخية جديدة مع الفتح الإسلامي للمدينة.",
        id: "damascus-islamic",
        image: "../assets/damascus-islamic.jfif"
    },

    {
        date: "661 م",
        period: "العصر الأموي",
        title: "العصر الذهبي لدمشق",
        description: "أصبحت دمشق عاصمة الدولة الأموية ومركزاً سياسياً وثقافياً واسع التأثير.",
        id: "damascus-umayyad",
        image: "../assets/damascus-umayyad.jfif"
    },

    {
        date: "1174 م",
        period: "العصر الأيوبي",
        title: "دمشق ومركزها السياسي والعسكري",
        description: "احتلت دمشق موقعاً محورياً في الدولة الأيوبية وشهدت تطورات عمرانية مهمة.",
        id: "damascus-ayyubid",
        image: "../assets/damascus-ayyubid.jfif"
    },

    {
        date: "1260 م",
        period: "العصر المملوكي",
        title: "المدارس والأسواق والمنشآت",
        description: "ازدهرت العمارة الدينية والتعليمية والأسواق والمنشآت العامة في المدينة.",
        id: "damascus-mamluk",
        image: "../assets/damascus-mamluk.jfif"
    },

    {
        date: "1516 م",
        period: "العصر العثماني",
        title: "دمشق ضمن الدولة العثمانية",
        description: "استمرت دمشق مركزاً تجارياً ودينياً وحضرياً مهماً في المنطقة.",
        id: "damascus-ottoman",
        image: "../assets/damascus-ottoman.jfif"
    },

    {
        date: "1800 م",
        period: "العثماني المتأخر",
        title: "دمشق والتحولات الحديثة المبكرة",
        description: "شهدت دمشق في أواخر العهد العثماني تغيرات إدارية وعمرانية واجتماعية.",
        id: "damascus-late-ottoman",
        image: "../assets/damascus-governorate.jfif"
    },

    {
        date: "1860 م",
        period: "التحولات الحديثة",
        title: "بدايات التحول إلى المدينة الحديثة",
        description: "بدأت تظهر تحولات إدارية وعمرانية واجتماعية جديدة في دمشق.",
        id: "damascus-modern",
        image: "../assets/damascus-modern.jfif"
    },

    {
        date: "1946 م",
        period: "الاستقلال",
        title: "دمشق عاصمة الدولة السورية",
        description: "أصبحت دمشق مركز الدولة السورية الحديثة ومؤسساتها السياسية والإدارية.",
        id: "damascus-independence",
        image: "../assets/damascus-independence.jfif"
    },

    {
        date: "1979 م",
        period: "التراث العالمي",
        title: "دمشق القديمة والتراث العالمي",
        description: "أُدرجت المدينة القديمة ضمن قائمة التراث العالمي لما تتمتع به من قيمة تاريخية وثقافية استثنائية.",
        id: "damascus-heritage",
        image: "../assets/damascus-heritage.jfif"
    },

    {
        date: "2026 م",
        period: "دمشق المعاصرة",
        title: "مدينة تجمع طبقات التاريخ",
        description: "تستمر دمشق كمدينة تجمع بين إرثها التاريخي والتحولات العمرانية والثقافية المعاصرة.",
        id: "damascus-today",
        image: "../assets/damascus-today.jfif"
    }
];
const timelineCount = data.length;

root.style.setProperty(
    "--timeline-count",
    timelineCount
);

    const yearsTrack = root.querySelector("[data-years-track]");
    const cardsTrack = root.querySelector("[data-cards-track]");
    const scene = root.querySelector(".damascus-timeline__scene");
    const period = root.querySelector("[data-period]");
    const title = root.querySelector("[data-title]");
    const description = root.querySelector("[data-description]");
    const content = root.querySelector(".damascus-timeline__content");

    const more = root.querySelector("[data-more]");
    const current = root.querySelector("[data-current]");
    const total = root.querySelector("[data-total]");
    const previous = root.querySelector("[data-prev]");
    const next = root.querySelector("[data-next]");

    // let active = 7;
    let active = Math.floor((data.length - 1) / 2);
    let dragStartX = 0;
    let isDragging = false;
    total.textContent = String(data.length).padStart(2, "0");

    data.forEach((item, index) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "damascus-timeline__year";
        button.innerHTML = `<span>${item.date}</span>`;
        button.addEventListener("click", () => goTo(index));
        yearsTrack.appendChild(button);
    });

    const buttons = [...yearsTrack.children];

function renderCards() {
    const cardWidth = scene.clientWidth / 3;

    cardsTrack.style.setProperty(
        "--timeline-card-width",
        `${cardWidth}px`
    );

    cardsTrack.innerHTML = data.map((item, itemIndex) => {
        const activeClass =
            itemIndex === active
                ? " is-active"
                : "";

        return `
            <article
                class="damascus-timeline__card${activeClass}"
                data-card-index="${itemIndex}"
            >
                <div class="damascus-timeline__card-label">
                    <strong>${item.title}</strong>
                    <span>${item.date}</span>
                </div>

                <div class="damascus-timeline__card-image">
                    <img
                        src="${item.image}"
                        alt="${item.title}"
                        loading="lazy"
                    >
                </div>
            </article>
        `;
    }).join("");
}

    function moveYears() {
        buttons.forEach((button, index) => {
            button.className = button.className
                .replace(/ curve-slot-\d/g, "")
                .replace(/ curve-hidden/g, "");
            const distance = Math.abs(index - ((data.length - 1) / 2));
            const curveOffset = Math.round(Math.pow(distance / ((data.length - 1) / 2), 2) * 100);
            button.style.setProperty("--curve-offset", `${curveOffset}px`);
        });
        yearsTrack.style.transform = "translate3d(0, 0, 0)";
    }

    function moveCards(animate = true, offset = 0) {
    const start = Math.max(
        0,
        Math.min(active - 1, data.length - 3)
    );

    const cardWidth = scene.clientWidth / 3;

    cardsTrack.style.setProperty(
        "--timeline-card-width",
        `${cardWidth}px`
    );

    const translateX =
        -(start * cardWidth) + offset;

    cardsTrack.style.transition = animate
        ? "transform .72s cubic-bezier(.22,.61,.36,1)"
        : "none";

    cardsTrack.style.transform =
        `translate3d(${translateX}px, 0, 0)`;
}



function updateCardSlots() {
    const start = Math.max(
        0,
        Math.min(active - 1, data.length - 3)
    );

    cardsTrack
        .querySelectorAll(".damascus-timeline__card")
        .forEach((card, index) => {
            card.className = "damascus-timeline__card";

            if (index === active) {
                card.classList.add("is-active");
            }

            if (index >= start && index < start + 3) {
                card.classList.add(
                    `card-slot-${index - start}`
                );
            }
        });
}


    function update(index) {
        const item = data[index];
        active = index;
        buttons.forEach((button, i) => button.classList.toggle("is-active", i === index));
        period.textContent = item.period;
        title.textContent = item.title;
        description.textContent = item.description;
        content.classList.remove("is-revealing");
void content.offsetWidth;
content.classList.add("is-revealing");

        more.href = `Cultural-Details.html?period=${item.id}`;
        current.textContent = String(index + 1).padStart(2, "0");
        updateCardSlots();
        previous.disabled = index === 0;
        next.disabled = index === data.length - 1;
        moveYears();
        moveCards(true);
    }

    function goTo(index) {
        update(Math.max(0, Math.min(index, data.length - 1)));
    }

    previous.addEventListener("click", () => goTo(active - 1));
    next.addEventListener("click", () => goTo(active + 1));
    root.querySelector(".damascus-timeline__scene").addEventListener("pointerdown", (event) => {
        dragStartX = event.clientX;
        isDragging = true;
        cardsTrack.style.transition = "none";
        event.currentTarget.setPointerCapture(event.pointerId);
    });
    root.querySelector(".damascus-timeline__scene").addEventListener("pointermove", (event) => {
        if (!isDragging) return;
        moveCards(false, event.clientX - dragStartX);
    });
    root.querySelector(".damascus-timeline__scene").addEventListener("pointerup", (event) => {
        if (!isDragging) return;
        const distance = event.clientX - dragStartX;
        isDragging = false;
        if (Math.abs(distance) > 55) goTo(active + (distance < 0 ? 1 : -1));
        else moveCards(true);
    });
    root.querySelector(".damascus-timeline__scene").addEventListener("pointercancel", () => {
        isDragging = false;
        moveCards(true);
    });
    window.addEventListener("resize", () => {
    renderCards();
    updateCardSlots();
    moveYears();
    moveCards(false);
    });
    renderCards();
    updateCardSlots();
    update(active);
    
});

/* =========================================
   DAMASCUS NUMBERS — ROLLING COUNTERS
========================================= */

(() => {
    const section = document.querySelector("#damascus-numbers");

    if (!section) return;

    const counters = section.querySelectorAll("[data-count]");

    if (!counters.length) return;

    const formatNumber = (value) =>
        Math.floor(value).toLocaleString("en-US");

    const animateCounter = (counter, index) => {
        if (counter.dataset.animated === "true") return;

        counter.dataset.animated = "true";

        const target = Number(counter.dataset.count);
        const suffix = counter.dataset.suffix || "";
        const duration = 2800 + index * 220;
        const startTime = performance.now();

        if (!Number.isFinite(target) || target < 0) {
            counter.textContent = "0";
            return;
        }

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (reducedMotion) {
            counter.textContent = formatNumber(target) + suffix;
            return;
        }

        const tick = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // سرعة عالية أولاً ثم تباطؤ واضح قرب النهاية.
            const eased = 1 - Math.pow(1 - progress, 5);

            // مدى الأرقام العشوائية يتناقص مع اقتراب النهاية.
            const noiseRange = Math.max(
                0,
                Math.round((1 - eased) * Math.min(target * 0.7, 999))
            );

            let displayedValue;

            if (progress >= 1) {
                displayedValue = target;
            } else {
                const approximateValue = target * eased;

                const randomOffset = Math.round(
                    (Math.random() * 2 - 1) * noiseRange
                );

                displayedValue = Math.max(
                    0,
                    Math.min(
                        target,
                        Math.round(approximateValue + randomOffset)
                    )
                );
            }

            counter.textContent =
                formatNumber(displayedValue) + suffix;

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                // ضمان تثبيت الرقم النهائي الصحيح.
                counter.textContent = formatNumber(target) + suffix;
            }
        };

        requestAnimationFrame(tick);
    };

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries.some((entry) => entry.isIntersecting)) {
                    return;
                }

                counters.forEach((counter, index) => {
                    animateCounter(counter, index);
                });

                observer.disconnect();
            },
            { threshold: 0.25 }
        );

        observer.observe(section);
    } else {
        counters.forEach((counter, index) => {
            animateCounter(counter, index);
        });
    }
})();

/* =========================================
   DAMASCUS AGENDA — INTERACTIVE CALENDAR
========================================= */

(() => {
    const root = document.querySelector("#damascus-agenda");

    if (!root || root.dataset.initialized === "true") return;

    root.dataset.initialized = "true";

    const $ = (selector) => root.querySelector(selector);

    const monthName = $("#agendaMonthName");
    const yearLabel = $("#agendaYear");
    const selectedMonthLabel = $("#agendaSelectedMonth");
    const eventCount = $("#agendaEventCount");

    const daysTrack = $("#agendaDaysTrack");
    const daysViewport = $("#agendaDaysViewport");

    const featured = $("#agendaFeatured");
    const featuredCategory = $("#agendaFeaturedCategory");
    const featuredDate = $("#agendaFeaturedDate");
    const featuredTitle = $("#agendaFeaturedTitle");
    const featuredDescription = $("#agendaFeaturedDescription");
    const featuredLocation = $("#agendaFeaturedLocation");
    const featuredTime = $("#agendaFeaturedTime");
    const featuredLink = $("#agendaFeaturedLink");

    const eventList = $("#agendaEventList");
    const dayCount = $("#agendaDayCount");
    const emptyState = $("#agendaEmpty");

    const categoryLabels = {
        music: "موسيقى",
        art: "فنون ومعارض",
        heritage: "تراث",
        talk: "ندوات ولقاءات"
    };

    const monthNames = [
        "كانون الثاني",
        "شباط",
        "آذار",
        "نيسان",
        "أيار",
        "حزيران",
        "تموز",
        "آب",
        "أيلول",
        "تشرين الأول",
        "تشرين الثاني",
        "كانون الأول"
    ];

    const weekdayNames = [
        "الأحد",
        "الاثنين",
        "الثلاثاء",
        "الأربعاء",
        "الخميس",
        "الجمعة",
        "السبت"
    ];

    /*
     * DEMO DATA:
     * Replace these example events with the platform's real data.
     *
     * date: YYYY-MM-DD
     * category: music | art | heritage | talk
     * url: optional event details page
     */

    const events = [
        {
            id: 1,
            date: "2026-10-11",
            title: "أمسية موسيقية شامية",
            category: "music",
            description: "تصوّر تجريبي لأمسية تحتفي بالمقامات والألحان التي ارتبطت بالذاكرة الموسيقية لدمشق.",
            location: "دمشق — الموقع يحدد لاحقاً",
            time: "18:00",
            url: ""
        },
        {
            id: 2,
            date: "2026-10-11",
            title: "معرض حكايات من المدينة",
            category: "art",
            description: "تصوّر تجريبي لمعرض بصري يستكشف تفاصيل العمارة الدمشقية وأحياء المدينة القديمة.",
            location: "دمشق — الموقع يحدد لاحقاً",
            time: "16:00",
            url: ""
        },
        {
            id: 3,
            date: "2026-10-14",
            title: "لقاء حول التراث المعماري",
            category: "heritage",
            description: "تصوّر تجريبي للقاء يناقش ملامح العمارة التقليدية وطرق الحفاظ على ذاكرة المكان.",
            location: "دمشق — الموقع يحدد لاحقاً",
            time: "17:30",
            url: ""
        },
        {
            id: 4,
            date: "2026-10-17",
            title: "ورشة فنون بصرية",
            category: "art",
            description: "تصوّر تجريبي لورشة فنية تستلهم الألوان والزخارف والتفاصيل البصرية من دمشق.",
            location: "دمشق — الموقع يحدد لاحقاً",
            time: "11:00",
            url: ""
        },
        {
            id: 5,
            date: "2026-10-20",
            title: "حوار ثقافي مفتوح",
            category: "talk",
            description: "تصوّر تجريبي لجلسة حوارية حول الثقافة المحلية ودور المبادرات المجتمعية.",
            location: "دمشق — الموقع يحدد لاحقاً",
            time: "18:00",
            url: ""
        },
        {
            id: 6,
            date: "2026-10-23",
            title: "أمسية موسيقى وتراث",
            category: "music",
            description: "تصوّر تجريبي لأمسية تجمع بين الموسيقى والتراث الشامي في تجربة ثقافية واحدة.",
            location: "دمشق — الموقع يحدد لاحقاً",
            time: "19:00",
            url: ""
        },
        {
            id: 7,
            date: "2026-10-27",
            title: "معرض الذاكرة الدمشقية",
            category: "art",
            description: "تصوّر تجريبي لمعرض يوثق ملامح الحياة اليومية والذاكرة البصرية للمدينة.",
            location: "دمشق — الموقع يحدد لاحقاً",
            time: "15:00",
            url: ""
        }
    ];

    let visibleMonth = new Date(2026, 9, 1);
    let selectedDate = "2026-10-11";
    let activeCategory = "all";
    let selectedEventId = null;

    const pad = (value) => String(value).padStart(2, "0");

    const dateKey = (date) => {
        return [
            date.getFullYear(),
            pad(date.getMonth() + 1),
            pad(date.getDate())
        ].join("-");
    };

    const parseDate = (key) => {
        const [year, month, day] = key.split("-").map(Number);

        return new Date(year, month - 1, day);
    };

    const sameMonth = (date, month) => {
        return (
            date.getFullYear() === month.getFullYear() &&
            date.getMonth() === month.getMonth()
        );
    };

    const formatArabicDate = (key) => {
        const date = parseDate(key);

        return `${weekdayNames[date.getDay()]}، ${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
    };

    const formatTime = (time) => {
        if (!time) return "يحدد لاحقاً";

        const [hours, minutes] = time.split(":").map(Number);
        const suffix = hours >= 12 ? "مساءً" : "صباحاً";
        const hour12 = hours % 12 || 12;

        return `${hour12}:${pad(minutes)} ${suffix}`;
    };

    const getMonthEvents = () => {
        return events.filter((event) => {
            return sameMonth(parseDate(event.date), visibleMonth);
        });
    };

    const getDayEvents = () => {
        return events
            .filter((event) => {
                return (
                    event.date === selectedDate &&
                    (
                        activeCategory === "all" ||
                        event.category === activeCategory
                    )
                );
            })
            .sort((a, b) => a.time.localeCompare(b.time));
    };

    const animateFeatured = () => {
        featured.classList.remove("agenda-is-changing");

        // Restart the CSS animation after changing the featured event.
        void featured.offsetWidth;

        featured.classList.add("agenda-is-changing");
    };

    const renderMonthHeader = () => {
        monthName.textContent = monthNames[visibleMonth.getMonth()];
        yearLabel.textContent = visibleMonth.getFullYear();

        selectedMonthLabel.textContent =
            `فعاليات ${monthNames[visibleMonth.getMonth()]}`;

        eventCount.textContent = getMonthEvents().length;
    };

    const renderDays = () => {
        const numberOfDays = new Date(
            visibleMonth.getFullYear(),
            visibleMonth.getMonth() + 1,
            0
        ).getDate();

        const monthEvents = getMonthEvents();

        daysTrack.innerHTML = "";

        for (let day = 1; day <= numberOfDays; day++) {
            const date = new Date(
                visibleMonth.getFullYear(),
                visibleMonth.getMonth(),
                day
            );

            const key = dateKey(date);

            const hasEvents = monthEvents.some((event) => {
                return event.date === key;
            });

            const button = document.createElement("button");

            button.type = "button";
            button.className = "agenda-day";
            button.dataset.date = key;
            button.setAttribute("aria-pressed", "false");

            button.innerHTML = `
                <span class="agenda-day__name">
                    ${weekdayNames[date.getDay()]}
                </span>

                <span class="agenda-day__number">
                    ${day}
                </span>

                <span class="agenda-day__month">
                    ${monthNames[visibleMonth.getMonth()]}
                </span>

                ${hasEvents
                    ? '<span class="agenda-day__dot" aria-label="توجد فعاليات"></span>'
                    : ""
                }
            `;

            button.addEventListener("click", () => {
                selectDate(key);
            });

            daysTrack.appendChild(button);
        }

        updateSelectedDay();

        requestAnimationFrame(() => {
            scrollSelectedDayIntoView("auto");
        });
    };

    const updateSelectedDay = () => {
        daysTrack.querySelectorAll(".agenda-day").forEach((button) => {
            const isSelected = button.dataset.date === selectedDate;

            button.classList.toggle("is-selected", isSelected);
            button.setAttribute("aria-pressed", String(isSelected));
        });
    };

    const scrollSelectedDayIntoView = (behavior = "smooth") => {
        const selectedButton = daysTrack.querySelector(
            `[data-date="${selectedDate}"]`
        );

        if (!selectedButton) return;

        const viewportRect = daysViewport.getBoundingClientRect();
        const buttonRect = selectedButton.getBoundingClientRect();

        const offset =
            buttonRect.left -
            viewportRect.left -
            (viewportRect.width - buttonRect.width) / 2;

        daysViewport.scrollBy({
            left: offset,
            behavior
        });
    };

    const renderEventList = (dayEvents) => {
        eventList.innerHTML = "";

        dayCount.textContent = dayEvents.length;

        dayEvents.forEach((event, index) => {
            const date = parseDate(event.date);
            const button = document.createElement("button");

            button.type = "button";
            button.className = "agenda-event";
            button.dataset.eventId = event.id;
            button.style.animationDelay = `${index * 55}ms`;

            if (event.id === selectedEventId) {
                button.classList.add("is-active");
            }

            button.setAttribute(
                "aria-pressed",
                String(event.id === selectedEventId)
            );

            button.innerHTML = `
                <span class="agenda-event__date">
                    <strong>${date.getDate()}</strong>
                    <span>${monthNames[date.getMonth()]}</span>
                </span>

                <span class="agenda-event__body">
                    <span class="agenda-event__category">
                        ${categoryLabels[event.category] || "فعالية ثقافية"}
                    </span>

                    <span class="agenda-event__title"></span>

                    <span class="agenda-event__time">
                        ${formatTime(event.time)}
                    </span>
                </span>

                <span class="agenda-event__arrow" aria-hidden="true">←</span>
            `;

            // Insert user-managed text safely.
            button.querySelector(".agenda-event__title").textContent =
                event.title;

            button.addEventListener("click", () => {
                selectedEventId = event.id;
                renderDay();
            });

            eventList.appendChild(button);
        });
    };

    const renderFeaturedEvent = (event) => {
        if (!event) {
            featuredCategory.textContent = "لا توجد فعالية";
            featuredDate.textContent = formatArabicDate(selectedDate);
            featuredTitle.textContent = "هذا اليوم ينتظر حكاية جديدة";
            featuredDescription.textContent =
                "اختر يوماً آخر من الشريط لاستكشاف الفعاليات المتاحة.";

            featuredLocation.textContent = "—";
            featuredTime.textContent = "—";

            featuredLink.hidden = true;
            featuredLink.removeAttribute("href");

            return;
        }

        featuredCategory.textContent =
            categoryLabels[event.category] || "فعالية ثقافية";

        featuredDate.textContent = formatArabicDate(event.date);
        featuredTitle.textContent = event.title;
        featuredDescription.textContent = event.description;
        featuredLocation.textContent = event.location;
        featuredTime.textContent = formatTime(event.time);

        if (event.url) {
            featuredLink.href = event.url;
            featuredLink.hidden = false;
        } else {
            featuredLink.hidden = true;
            featuredLink.removeAttribute("href");
        }
    };

    const renderDay = () => {
        const dayEvents = getDayEvents();

        if (!dayEvents.some((event) => event.id === selectedEventId)) {
            selectedEventId = dayEvents.length ? dayEvents[0].id : null;
        }

        const activeEvent = dayEvents.find((event) => {
            return event.id === selectedEventId;
        });

        renderFeaturedEvent(activeEvent);
        renderEventList(dayEvents);

        emptyState.hidden = dayEvents.length > 0;
        featured.hidden = dayEvents.length === 0;

        animateFeatured();
    };

    const selectDate = (key) => {
        const date = parseDate(key);

        if (!sameMonth(date, visibleMonth)) return;

        selectedDate = key;
        selectedEventId = null;

        updateSelectedDay();
        renderDay();
        scrollSelectedDayIntoView();
    };

    const changeMonth = (offset) => {
        visibleMonth = new Date(
            visibleMonth.getFullYear(),
            visibleMonth.getMonth() + offset,
            1
        );

        const dayCountInMonth = new Date(
            visibleMonth.getFullYear(),
            visibleMonth.getMonth() + 1,
            0
        ).getDate();

        const oldDay = parseDate(selectedDate).getDate();
        const newDay = Math.min(oldDay, dayCountInMonth);

        selectedDate = dateKey(
            new Date(
                visibleMonth.getFullYear(),
                visibleMonth.getMonth(),
                newDay
            )
        );

        selectedEventId = null;

        renderMonthHeader();
        renderDays();
        renderDay();
    };

    $("#agendaPrevMonth").addEventListener("click", () => {
        changeMonth(-1);
    });

    $("#agendaNextMonth").addEventListener("click", () => {
        changeMonth(1);
    });

    $("#agendaDaysPrev").addEventListener("click", () => {
        daysViewport.scrollBy({
            left: -Math.max(240, daysViewport.clientWidth * 0.7),
            behavior: "smooth"
        });
    });

    $("#agendaDaysNext").addEventListener("click", () => {
        daysViewport.scrollBy({
            left: Math.max(240, daysViewport.clientWidth * 0.7),
            behavior: "smooth"
        });
    });

    root.querySelectorAll("[data-agenda-filter]").forEach((button) => {
        button.addEventListener("click", () => {
            activeCategory = button.dataset.agendaFilter;

            root.querySelectorAll("[data-agenda-filter]").forEach((filter) => {
                const active = filter === button;

                filter.classList.toggle("is-active", active);
                filter.setAttribute("aria-pressed", String(active));
            });

            selectedEventId = null;
            renderDay();
        });
    });

    $("#agendaShowAll").addEventListener("click", () => {
        activeCategory = "all";

        root.querySelectorAll("[data-agenda-filter]").forEach((button) => {
            const active = button.dataset.agendaFilter === "all";

            button.classList.toggle("is-active", active);
            button.setAttribute("aria-pressed", String(active));
        });

        selectedEventId = null;
        renderDay();
    });

    renderMonthHeader();
    renderDays();
    renderDay();
})();

/* =========================================
   DAMASCUS LANDMARKS — ROTATING CARDS
========================================= */
(() => {
    const stage = document.querySelector("#landmarksStage");
    const cylinder = document.querySelector("#landmarksCylinder");
    const previousButton = document.querySelector("#landmarksPrev");
    const nextButton = document.querySelector("#landmarksNext");
    const pagination = document.querySelector("#landmarksPagination");
    const status = document.querySelector("#landmarksStatus");

    if (
        !stage ||
        !cylinder ||
        !previousButton ||
        !nextButton ||
        !pagination ||
        !status
    ) {
        return;
    }

    const cards = Array.from(
        cylinder.querySelectorAll(".landmark-card")
    );

    if (cards.length < 2) {
        return;
    }

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    const names = cards.map((card) => {
        return card.querySelector("h3")?.textContent.trim() || "معلم دمشقي";
    });

    let currentIndex = 0;
    let timer = null;
    let radius = 430;
    let isPaused = false;
    let touchStartX = 0;

    const angle = 360 / cards.length;

    function calculateRadius() {
        const cardWidth = cards[0].getBoundingClientRect().width;

        /*
         * المسافة محسوبة لتظهر الكارتات كحلقة ثلاثية الأبعاد.
         * لا حاجة لتغييرها عند إضافة معلم أو حذفه.
         */
        radius = Math.round(
            Math.max(cardWidth * 0.95, cardWidth / (2 * Math.tan(Math.PI / cards.length)) + 80)
        );
    }

    function renderCards() {
        calculateRadius();

        cards.forEach((card, index) => {
            const cardAngle = angle * index;

            card.style.transform =
                `translate(-50%, -50%) rotateY(${cardAngle}deg) translateZ(${radius}px)`;

            card.setAttribute(
                "aria-label",
                `${names[index]} — ${index + 1} من ${cards.length}`
            );
        });

        updateCarousel();
    }

    function updateCarousel() {
        cylinder.style.transform =
            `rotateY(${-currentIndex * angle}deg)`;

        pagination.querySelectorAll("button").forEach((button, index) => {
            const active = index === currentIndex;

            button.classList.toggle("is-active", active);
            button.setAttribute("aria-current", active ? "true" : "false");
        });

        status.textContent = names[currentIndex];
    }

    function goTo(index) {
        currentIndex = (index + cards.length) % cards.length;
        updateCarousel();
    }

    function next() {
        goTo(currentIndex + 1);
    }

    function previous() {
        goTo(currentIndex - 1);
    }

    function stopAutoRotation() {
        if (timer !== null) {
            window.clearInterval(timer);
            timer = null;
        }
    }

    function startAutoRotation() {
        stopAutoRotation();

        if (reducedMotion.matches || isPaused) {
            return;
        }

        timer = window.setInterval(next, 5000);
    }

    function resetAutoRotation() {
        startAutoRotation();
    }

    cards.forEach((card, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.setAttribute(
            "aria-label",
            `عرض ${names[index]}`
        );

        button.addEventListener("click", () => {
            goTo(index);
            resetAutoRotation();
        });

        pagination.appendChild(button);
    });

    previousButton.addEventListener("click", () => {
        previous();
        resetAutoRotation();
    });

    nextButton.addEventListener("click", () => {
        next();
        resetAutoRotation();
    });

    stage.addEventListener("mouseenter", () => {
        isPaused = true;
        stopAutoRotation();
    });

    stage.addEventListener("mouseleave", () => {
        isPaused = false;
        startAutoRotation();
    });

    stage.addEventListener("focusin", () => {
        isPaused = true;
        stopAutoRotation();
    });

    stage.addEventListener("focusout", (event) => {
        if (!stage.contains(event.relatedTarget)) {
            isPaused = false;
            startAutoRotation();
        }
    });

    stage.addEventListener(
        "touchstart",
        (event) => {
            touchStartX = event.changedTouches[0].clientX;
        },
        { passive: true }
    );

    stage.addEventListener(
        "touchend",
        (event) => {
            const touchEndX = event.changedTouches[0].clientX;
            const difference = touchStartX - touchEndX;

            if (Math.abs(difference) < 45) {
                return;
            }

            if (difference > 0) {
                next();
            } else {
                previous();
            }

            resetAutoRotation();
        },
        { passive: true }
    );

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopAutoRotation();
        } else {
            startAutoRotation();
        }
    });

    reducedMotion.addEventListener("change", startAutoRotation);

    window.addEventListener("resize", renderCards);

    renderCards();
    startAutoRotation();
})();


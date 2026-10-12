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

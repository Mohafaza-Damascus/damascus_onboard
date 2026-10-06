document.addEventListener("DOMContentLoaded", () => {

    const timelineViewport =
        document.querySelector(".timeline-viewport");

    const timelineTrack =
        document.querySelector(".timeline-track");

    const timelineLabel =
        document.getElementById("timelineLabel");

    const timelineTitle =
        document.getElementById("timelineTitle");

    const timelineDescription =
        document.getElementById("timelineDescription");

    const timelineMore =
        document.getElementById("timelineMore");

    const timelineInformation =
        document.querySelector(".timeline-information");

    const timelineCurrent =
        document.getElementById("timelineCurrent");

    const timelineTotal =
        document.getElementById("timelineTotal");

    const prevButton =
        document.querySelector(".timeline-prev");

    const nextButton =
        document.querySelector(".timeline-next");


    /*
    |--------------------------------------------------------------------------
    | Timeline Data
    |--------------------------------------------------------------------------
    */

const timelineData = [
    {
        id: "damascus-ancient",
        date: "3000 ق.م",
        period: "العصور القديمة",
        label: "دمشق في الألف الثالث قبل الميلاد",
        title: "بدايات دمشق",
        description: "نشأة دمشق وتطورها كمدينة ومركز حضري في منطقة بلاد الشام.",
        link: "Cultural-Details.html?period=damascus-ancient"
    },

    {
        id: "damascus-aram",
        date: "1100 ق.م",
        period: "العصر الآرامي",
        label: "دمشق الآرامية",
        title: "دمشق عاصمة للمملكة الآرامية",
        description: "برزت دمشق كمركز سياسي وحضاري مهم في المنطقة خلال العصر الآرامي.",
        link: "Cultural-Details.html?period=damascus-aram"
    },

    {
        id: "damascus-assyrian",
        date: "732 ق.م",
        period: "العصر الآشوري",
        label: "دمشق تحت النفوذ الآشوري",
        title: "مرحلة التحولات السياسية",
        description: "دخلت دمشق ضمن التحولات السياسية الكبرى التي شهدتها المنطقة.",
        link: "Cultural-Details.html?period=damascus-assyrian"
    },

    {
        id: "damascus-hellenistic",
        date: "333 ق.م",
        period: "العصر الهلنستي",
        label: "دمشق في العصر الهلنستي",
        title: "تأثير الحضارة الهلنستية",
        description: "شهدت المدينة تفاعلاً مع الحضارات والثقافات الهلنستية في المنطقة.",
        link: "Cultural-Details.html?period=damascus-hellenistic"
    },

    {
        id: "damascus-roman",
        date: "64 ق.م",
        period: "العصر الروماني",
        label: "دمشق الرومانية",
        title: "دمشق ضمن العالم الروماني",
        description: "تطورت دمشق عمرانياً واقتصادياً ضمن شبكة المدن الرومانية في بلاد الشام.",
        link: "Cultural-Details.html?period=damascus-roman"
    },

    {
        id: "damascus-byzantine",
        date: "395 م",
        period: "العصر البيزنطي",
        label: "دمشق في العصر البيزنطي",
        title: "تحولات المدينة في العصر البيزنطي",
        description: "استمرت دمشق كمركز حضري وتجاري مهم خلال المرحلة البيزنطية.",
        link: "Cultural-Details.html?period=damascus-byzantine"
    },

    {
        id: "damascus-islamic",
        date: "635 م",
        period: "الفتح الإسلامي",
        label: "دمشق في بدايات العصر الإسلامي",
        title: "انتقال دمشق إلى العصر الإسلامي",
        description: "دخلت دمشق مرحلة تاريخية جديدة مع الفتح الإسلامي للمدينة.",
        link: "Cultural-Details.html?period=damascus-islamic"
    },

    {
        id: "damascus-umayyad",
        date: "661 م",
        period: "العصر الأموي",
        label: "دمشق عاصمة الدولة الأموية",
        title: "العصر الذهبي لدمشق",
        description: "أصبحت دمشق عاصمة الدولة الأموية ومركزاً سياسياً وثقافياً واسع التأثير.",
        link: "Cultural-Details.html?period=damascus-umayyad"
    },

    {
        id: "damascus-ayyubid",
        date: "1174 م",
        period: "العصر الأيوبي",
        label: "دمشق في العصر الأيوبي",
        title: "دمشق ومركزها السياسي والعسكري",
        description: "احتلت دمشق موقعاً محورياً في الدولة الأيوبية وشهدت تطورات عمرانية مهمة.",
        link: "Cultural-Details.html?period=damascus-ayyubid"
    },

    {
        id: "damascus-mamluk",
        date: "1260 م",
        period: "العصر المملوكي",
        label: "دمشق المملوكية",
        title: "المدارس والأسواق والمنشآت",
        description: "ازدهرت العمارة الدينية والتعليمية والأسواق والمنشآت العامة في المدينة.",
        link: "Cultural-Details.html?period=damascus-mamluk"
    },

    {
        id: "damascus-ottoman",
        date: "1516 م",
        period: "العصر العثماني",
        label: "دمشق في العهد العثماني",
        title: "دمشق ضمن الدولة العثمانية",
        description: "استمرت دمشق مركزاً تجارياً ودينياً وحضرياً مهماً في المنطقة.",
        link: "Cultural-Details.html?period=damascus-ottoman"
    },

    {
        id: "damascus-modern",
        date: "1860 م",
        period: "التحولات الحديثة",
        label: "دمشق في القرن التاسع عشر",
        title: "بدايات التحول إلى المدينة الحديثة",
        description: "بدأت تظهر تحولات إدارية وعمرانية واجتماعية جديدة في دمشق.",
        link: "Cultural-Details.html?period=damascus-modern"
    },

    {
        id: "damascus-independence",
        date: "1946 م",
        period: "الاستقلال",
        label: "دمشق بعد الاستقلال",
        title: "دمشق عاصمة الدولة السورية",
        description: "أصبحت دمشق مركز الدولة السورية الحديثة ومؤسساتها السياسية والإدارية.",
        link: "Cultural-Details.html?period=damascus-independence"
    },

    {
        id: "damascus-heritage",
        date: "1979 م",
        period: "التراث العالمي",
        label: "المدينة القديمة",
        title: "دمشق القديمة والتراث العالمي",
        description: "أُدرجت المدينة القديمة ضمن قائمة التراث العالمي لما تتمتع به من قيمة تاريخية وثقافية استثنائية.",
        link: "Cultural-Details.html?period=damascus-heritage"
    },

    {
        id: "damascus-today",
        date: "2026 م",
        period: "دمشق المعاصرة",
        label: "دمشق اليوم",
        title: "مدينة تجمع طبقات التاريخ",
        description: "تستمر دمشق كمدينة تجمع بين إرثها التاريخي والتحولات العمرانية والثقافية المعاصرة.",
        link: "Cultural-Details.html?period=damascus-today"
    }
];
timelineData.forEach((item, index) => {
    const point = document.createElement("button");

    point.type = "button";
    point.className = "timeline-point";
    point.dataset.index = index;

    point.innerHTML = `
        <span class="timeline-point-date">
            ${item.date}
        </span>

        <span class="timeline-point-dot"></span>

        <span class="timeline-point-label">
            ${item.period}
        </span>
    `;

    timelineTrack.appendChild(point);
});
const timelinePoints = document.querySelectorAll(".timeline-point");
        const pointsCount = timelineData.length;

        timelineTrack.style.setProperty(
            "--points-count",
            pointsCount
        );

    /*
    |--------------------------------------------------------------------------
    | Configuration
    |--------------------------------------------------------------------------
    */

    const visiblePoints = 3;
    let activeIndex = Math.floor(timelineData.length / 2);
    let windowStart = Math.max(
        0,
        Math.min(
            activeIndex - 1,
            timelineData.length - visiblePoints
        )
    );

    /*
    |--------------------------------------------------------------------------
    | Total
    |--------------------------------------------------------------------------
    */

    timelineTotal.textContent =
        String(timelineData.length).padStart(2, "0");


    /*
    |--------------------------------------------------------------------------
    | Set Point Dates
    |--------------------------------------------------------------------------
    */

    timelinePoints.forEach((point, index) => {

        const dateElement =
            point.querySelector(".timeline-point-date");

        if (dateElement && timelineData[index]) {

            dateElement.textContent =
                timelineData[index].date;
        }

    });


    /*
    |--------------------------------------------------------------------------
    | Update Information
    |--------------------------------------------------------------------------
    */

function updateInformation(index) {

    const data =
        timelineData[index];

    if (!data) {
        return;
    }

    timelineInformation.classList.remove("is-visible");

    timelineLabel.textContent =
        data.label;

    timelineTitle.textContent =
        data.title;

    timelineDescription.textContent =
        data.description;

    timelineMore.href =
        data.link;

    timelineCurrent.textContent =
        String(index + 1).padStart(2, "0");

    /*
     * إعادة تشغيل الأنيميشن من البداية
     */
    void timelineInformation.offsetWidth;

    timelineInformation.classList.add("is-visible");
}


function updateActivePoint(index) {

    timelinePoints.forEach((point, pointIndex) => {

        point.classList.toggle(
            "active",
            pointIndex === index
        );

    });
}

    /*
    |--------------------------------------------------------------------------
    | Calculate Maximum Window
    |--------------------------------------------------------------------------
    */

    function getMaxWindowStart() {

        return Math.max(
            0,
            timelineData.length - visiblePoints
        );
    }


    /*
    |--------------------------------------------------------------------------
    | Move Timeline
    |--------------------------------------------------------------------------
    |
    | بدلاً من استخدام %
    | نحسب المسافة الفعلية بناءً على عرض الـviewport.
    |
    | 3 نقاط ظاهرة
    | لذلك كل نقطة = 1/3 من الـviewport.
    |
    */
function moveTimeline(startIndex, animate = true) {
    const step =
        timelineViewport.clientWidth / visiblePoints;

    if (!animate) {
        timelineTrack.style.transition = "none";
    }

    timelineTrack.style.transform =
        `translate3d(-${startIndex * step}px, 0, 0)`;

    if (!animate) {
        requestAnimationFrame(() => {
            timelineTrack.style.transition =
                "transform 0.55s cubic-bezier(0.22, 0.61, 0.36, 1)";
        });
    }
}
    /*
    |--------------------------------------------------------------------------
    | Navigation State
    |--------------------------------------------------------------------------
    */
function updateNavigation() {

    prevButton.disabled =
        activeIndex <= 0;

    nextButton.disabled =
        activeIndex >=
        timelineData.length - 1;
}


    /*
    |--------------------------------------------------------------------------
    | Go To Point
    |--------------------------------------------------------------------------
    */
   function goTo(index) {

    index = Math.max(
        0,
        Math.min(
            index,
            timelineData.length - 1
        )
    );

    activeIndex = index;

    /*
     * خلي العنصر المفعّل دائماً في المنتصف
     *
     * مثال:
     * 1 2 3
     *   ↑
     *
     * Next:
     * 2 3 4
     *   ↑
     */

    let newWindowStart =
        activeIndex - 1;

    const maxWindowStart =
        getMaxWindowStart();

    newWindowStart =
        Math.max(
            0,
            Math.min(
                newWindowStart,
                maxWindowStart
            )
        );

    windowStart = newWindowStart;

    updateInformation(activeIndex);

    updateActivePoint(activeIndex);

    moveTimeline(windowStart);

    updateNavigation();
}

    /*
    |--------------------------------------------------------------------------
    | Point Click
    |--------------------------------------------------------------------------
    */

    timelinePoints.forEach((point, index) => {

        point.addEventListener("click", () => {

            goTo(index);

        });

    });


    /*
    |--------------------------------------------------------------------------
    | Previous
    |--------------------------------------------------------------------------
    */

    prevButton.addEventListener("click", () => {

        if (activeIndex <= 0) {
            return;
        }

        goTo(activeIndex - 1);

    });


    /*
    |--------------------------------------------------------------------------
    | Next
    |--------------------------------------------------------------------------
    */

    nextButton.addEventListener("click", () => {

        if (
            activeIndex >=
            timelineData.length - 1
        ) {
            return;
        }

        goTo(activeIndex + 1);

    });


    /*
    |--------------------------------------------------------------------------
    | Resize
    |--------------------------------------------------------------------------
    */

    window.addEventListener("resize", () => {

        moveTimeline(windowStart);

    });


    /*
    |--------------------------------------------------------------------------
    | Initial State
    |--------------------------------------------------------------------------
    */

    goTo(Math.floor((timelineData.length - 1) / 2));


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
/* =========================================================
   CULTURAL EVENTS
========================================================= */


/* =========================================================
   MONTHS
========================================================= */

const arabicMonths = [
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


/* =========================================================
   EVENTS DATA
========================================================= */

const eventsData = {

    "2026-10-3": [
        {
            id: 1,
            title: "أمسية موسيقية دمشقية",
            type: "موسيقى",
            time: "18:00",
            location: "دار الأسد للثقافة والفنون",
            description:
                "أمسية موسيقية تجمع بين الموسيقى الشرقية والآلات التقليدية في أجواء ثقافية دمشقية."
        }
    ],

    "2026-10-8": [
        {
            id: 2,
            title: "معرض ذاكرة دمشق",
            type: "معرض",
            time: "17:00",
            location: "المركز الثقافي العربي",
            description:
                "معرض يوثق جوانب من الحياة الدمشقية القديمة من خلال الصور والوثائق والمقتنيات."
        }
    ],

    "2026-10-12": [
        {
            id: 3,
            title: "ندوة حول التراث الدمشقي",
            type: "ندوة",
            time: "16:30",
            location: "مكتبة الأسد الوطنية",
            description:
                "ندوة ثقافية تناقش العمارة والأسواق والحرف التقليدية ودورها في الحفاظ على هوية دمشق."
        }
    ],

    "2026-10-17": [
        {
            id: 4,
            title: "ليلة الشعر العربي",
            type: "أدب",
            time: "19:00",
            location: "المركز الثقافي العربي - أبو رمانة",
            description:
                "أمسية أدبية يشارك فيها عدد من الشعراء والمهتمين بالشعر العربي."
        }
    ],

    "2026-10-21": [
        {
            id: 5,
            title: "ورشة الخط العربي",
            type: "ورشة",
            time: "15:00",
            location: "بيت الخط العربي",
            description:
                "ورشة تعريفية بأساسيات الخط العربي وأساليبه وتطبيقاته الفنية."
        }
    ],

    "2026-10-25": [
        {
            id: 6,
            title: "عرض مسرحي",
            type: "مسرح",
            time: "20:00",
            location: "المسرح القومي",
            description:
                "عرض مسرحي ضمن البرنامج الثقافي للموسم، بمشاركة مجموعة من الفنانين السوريين."
        }
    ],

    "2026-10-29": [
        {
            id: 7,
            title: "معرض الحرف الدمشقية",
            type: "حرف وتراث",
            time: "17:30",
            location: "المدينة القديمة",
            description:
                "فعالية تستعرض الحرف التقليدية الدمشقية وأعمالاً يدوية مستوحاة من التراث المحلي."
        }
    ],

    "2026-11-4": [
        {
            id: 8,
            title: "أسبوع الفيلم السوري",
            type: "سينما",
            time: "19:00",
            location: "دار الأسد للثقافة والفنون",
            description:
                "برنامج سينمائي يعرض مجموعة من الأفلام السورية ويناقش تجاربها الفنية."
        }
    ],

    "2026-11-10": [
        {
            id: 9,
            title: "معرض الفن التشكيلي",
            type: "فن",
            time: "17:00",
            location: "غاليري دمشق",
            description:
                "مجموعة من الأعمال الفنية التي تقدم تجارب معاصرة في الفن التشكيلي."
        }
    ],

    "2026-11-18": [
        {
            id: 10,
            title: "أمسية أدبية",
            type: "أدب",
            time: "18:30",
            location: "المركز الثقافي العربي",
            description:
                "لقاء أدبي يضم قراءات ونقاشات حول الأدب السوري المعاصر."
        }
    ]

};


/* =========================================================
   DOM
========================================================= */

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

const selectedDayTitle =
    document.getElementById("selectedDayTitle");

const selectedDayCount =
    document.getElementById("selectedDayCount");

const eventsList =
    document.getElementById("eventsList");

const featuredEvents =
    document.getElementById("featuredEvents");


/* =========================================================
   STATE
========================================================= */

let currentDate = new Date(2026, 9, 1);

let selectedDate = null;


/* =========================================================
   HELPERS
========================================================= */

function getEventKey(year, month, day) {

    return `${year}-${month + 1}-${day}`;
}


function getEventsForDate(year, month, day) {

    const key = getEventKey(
        year,
        month,
        day
    );

    return eventsData[key] || [];
}


function formatArabicDate(year, month, day) {

    return `${day} ${arabicMonths[month]} ${year}`;
}


/* =========================================================
   RENDER CALENDAR
========================================================= */

function renderCalendar() {

    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();


    calendarMonth.textContent =
        arabicMonths[month];

    calendarYear.textContent =
        year;


    calendarGrid.innerHTML = "";


    /*
        JS getDay():
        Sunday = 0
        Monday = 1
        ...
        Saturday = 6

        This matches our Arabic calendar
        starting from Sunday.
    */

    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    const previousMonthDays =
        new Date(
            year,
            month,
            0
        ).getDate();


    /*
        Previous month days
    */

    for (
        let i = firstDay - 1;
        i >= 0;
        i--
    ) {

        const day =
            previousMonthDays - i;

        createCalendarDay(
            day,
            "previous"
        );
    }


    /*
        Current month
    */

    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        createCalendarDay(
            day,
            "current"
        );
    }


    /*
        Next month days
    */

    const totalCells =
        calendarGrid.children.length;

    const remaining =
        (7 - (totalCells % 7)) % 7;


    for (
        let day = 1;
        day <= remaining;
        day++
    ) {

        createCalendarDay(
            day,
            "next"
        );
    }
}


/* =========================================================
   CREATE CALENDAR DAY
========================================================= */

function createCalendarDay(
    day,
    type
) {

    const element =
        document.createElement("button");


    element.type = "button";

    element.className =
        "calendar-day";


    /*
        Previous / next month
    */

    if (type !== "current") {

        element.classList.add(
            "other-month"
        );

        element.disabled = true;

        const number =
            document.createElement("span");

        number.className =
            "calendar-day-number";

        number.textContent =
            day;

        element.appendChild(number);

        calendarGrid.appendChild(
            element
        );

        return;
    }


    const year =
        currentDate.getFullYear();

    const month =
        currentDate.getMonth();


    const events =
        getEventsForDate(
            year,
            month,
            day
        );


    /*
        Number
    */

    const number =
        document.createElement("span");

    number.className =
        "calendar-day-number";

    number.textContent =
        day;

    element.appendChild(number);


    /*
        Events
    */

    if (events.length > 0) {

        element.classList.add(
            "has-events"
        );


        events
            .slice(0, 2)
            .forEach(event => {

                const eventTitle =
                    document.createElement("span");

                eventTitle.className =
                    "calendar-day-event";

                eventTitle.textContent =
                    event.title;

                element.appendChild(
                    eventTitle
                );
            });
    }


    /*
        Today
    */

    const today =
        new Date();

    if (
        today.getFullYear() === year &&
        today.getMonth() === month &&
        today.getDate() === day
    ) {

        element.classList.add(
            "today"
        );
    }


    /*
        Selected
    */

    if (
        selectedDate &&
        selectedDate.year === year &&
        selectedDate.month === month &&
        selectedDate.day === day
    ) {

        element.classList.add(
            "active"
        );
    }


    /*
        Click
    */

    element.addEventListener(
        "click",
        () => {

            selectDate(
                year,
                month,
                day
            );
        }
    );


    calendarGrid.appendChild(
        element
    );
}


/* =========================================================
   SELECT DATE
========================================================= */

function selectDate(
    year,
    month,
    day
) {

    selectedDate = {
        year,
        month,
        day
    };


    const events =
        getEventsForDate(
            year,
            month,
            day
        );


    selectedDayTitle.textContent =
        formatArabicDate(
            year,
            month,
            day
        );


    selectedDayCount.textContent =
        `${events.length} فعاليات`;


    renderEvents(
        events
    );


    renderCalendar();


    document
        .getElementById(
            "selectedDaySection"
        )
        .scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
}


/* =========================================================
   RENDER EVENTS
========================================================= */

function renderEvents(events) {

    eventsList.innerHTML = "";


    if (!events.length) {

        eventsList.innerHTML = `
            <div class="events-empty">
                لا توجد فعاليات مسجلة لهذا اليوم.
            </div>
        `;

        return;
    }


    events.forEach(event => {

        const card =
            document.createElement("article");

        card.className =
            "event-card";


        card.innerHTML = `

            <div class="event-time">
                ${event.time}
            </div>

            <div class="event-info">

                <span>
                    ${event.type}
                </span>

                <h4>
                    ${event.title}
                </h4>

                <p>
                    ${event.description}
                </p>

            </div>

            <div class="event-location">
                ${event.location}
            </div>

        `;


        eventsList.appendChild(
            card
        );
    });
}


/* =========================================================
   MONTH NAVIGATION
========================================================= */

calendarPrev.addEventListener(
    "click",
    () => {

        currentDate.setMonth(
            currentDate.getMonth() - 1
        );

        selectedDate = null;

        resetSelectedDay();

        renderCalendar();
    }
);


calendarNext.addEventListener(
    "click",
    () => {

        currentDate.setMonth(
            currentDate.getMonth() + 1
        );

        selectedDate = null;

        resetSelectedDay();

        renderCalendar();
    }
);


/* =========================================================
   RESET SELECTED DAY
========================================================= */

function resetSelectedDay() {

    selectedDayTitle.textContent =
        "اختر يوماً من التقويم";

    selectedDayCount.textContent =
        "0 فعاليات";

    eventsList.innerHTML = `
        <div class="events-empty">
            اختر يوماً من التقويم لاستعراض الفعاليات.
        </div>
    `;
}


/* =========================================================
   FEATURED EVENTS
========================================================= */

function renderFeaturedEvents() {

    const allEvents = [];


    Object.entries(eventsData)
        .forEach(([date, events]) => {

            events.forEach(event => {

                allEvents.push({
                    ...event,
                    date
                });

            });
        });


    allEvents
        .slice(0, 3)
        .forEach(event => {

            const card =
                document.createElement("article");

            card.className =
                "featured-event-card";


            const [
                year,
                month,
                day
            ] = event.date
                .split("-")
                .map(Number);


            card.innerHTML = `

                <div>

                    <div class="featured-event-top">

                        <span class="featured-event-date">
                            ${day} ${arabicMonths[month - 1]} ${year}
                        </span>

                        <span class="featured-event-type">
                            ${event.type}
                        </span>

                    </div>


                    <h3>
                        ${event.title}
                    </h3>


                    <p>
                        ${event.description}
                    </p>

                </div>


                <div class="featured-event-location">
                    ${event.location}
                </div>

            `;


            featuredEvents.appendChild(
                card
            );
        });
}


/* =========================================================
   INITIALIZE
========================================================= */

renderCalendar();

resetSelectedDay();

renderFeaturedEvents();
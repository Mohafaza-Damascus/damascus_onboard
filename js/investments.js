document.addEventListener("DOMContentLoaded", () => {


const projectsCatalog = {
    // 1. المجمعات والأسواق التجارية
    "business-city": {
      overview: {
        title: "المجمعات والأسواق التجارية",
        desc: "مشاريع تجارية كبرى تعتمد نظام (BOT) لمدد تتراوح بين 10 إلى 40 عاماً، تهدف لتوفير مساحات تسوق حديثة ومكاتب أعمال متكاملة مع مرائب تحت الأرض لخدمة زوار العاصمة.",
        features: [
          { icon: "fa-store", title: "مولات متخصصة", desc: "مراكز تسوق ضخمة تضم مئات المحلات التجارية." },
          { icon: "fa-briefcase", title: "مكاتب أعمال", desc: "مساحات مكتبية إدارية حديثة مجهزة بأفضل الخدمات." },
          { icon: "fa-square-parking", title: "مرائب خدمية", desc: "مواقف سيارات تحت الأرض لتخديم رواد الأسواق." }
        ]
      },
      featured: {
        title: "مول عمر بيك التجاري",
        date: "عقد BOT - 40 سنة",
        desc: "مول تجاري متخصص ومرائب في منطقة الزاهرة الجديدة (جانب الفرن الآلي)، بمساحات تجارية استثمارية في القبو الأول تبلغ 12,000 م2.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      },
      mini1: {
        title: "سوق تجاري ومكاتب - المزة",
        date: "عقد BOT - 10 سنوات",
        desc: "سوق تجاري ومكاتب أعمال مع مرائب تحت الأرض في منطقة المزة (مقابل مشفى المواساة الخيري) بمساحة طابقية 12,735 م2.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      },
      mini2: {
        title: "مساحات تجارية - القبو الأول",
        date: "عقد BOT - 40 سنة",
        desc: "استثمار مساحات تجارية استثمارية في الأقبية الأولى للحدائق والمشاريع تصل مساحاتها لآلاف الأمتار المربعة.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      }
    },

    // 2. الفنادق السياحية
    "financial-center": {
      overview: {
        title: "منظومة الفنادق السياحية",
        desc: "استثمارات سياحية استراتيجية لبناء فنادق من سوية 4 و 5 نجوم في أهم المواقع الحيوية في دمشق، لتعزيز البنية التحتية لقطاع السياحة والضيافة.",
        features: [
          { icon: "fa-hotel", title: "فنادق 5 نجوم", desc: "مشاريع فندقية ضخمة في مناطق دمر وساحة عرنوس." },
          { icon: "fa-star", title: "فنادق 4 نجوم", desc: "منشآت سياحية حديثة تتوسط العاصمة لخدمة الزوار." },
          { icon: "fa-handshake", title: "عقود استثمارية", desc: "فرص بنظام BOT تمتد إلى 40 سنة." }
        ]
      },
      featured: {
        title: "فندق وسوق تجاري - ساحة عرنوس",
        date: "عقد BOT - 40 سنة",
        desc: "مشروع متكامل يضم فندقاً وسوقاً تجارياً ومرائب في منطقة ساحة عرنوس (الصالحية)، بمساحة طابقية فوق الأرض 18,700 م2.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      },
      mini1: {
        title: "فندق 5 نجوم - دمر",
        date: "عقد BOT - 40 سنة",
        desc: "فندق سياحي من سوية 5 نجوم مع أنشطة تجارية وترفيهية متممة على المقاسم (1-2-3) في دمر.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      },
      mini2: {
        title: "فندق 4 نجوم - مدخل الفردوس",
        date: "عقد BOT - 40 سنة",
        desc: "فندق سياحي من سوية 4 نجوم مع أنشطة تجارية وترفيهية عند مدخل مرآب الفردوس.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      }
    },

    // 3. السياحة العلاجية والتراثية
    "qasioun-journey": {
      overview: {
        title: "السياحة العلاجية والتراثية",
        desc: "مشاريع تجمع بين الحداثة في الاستشفاء الطبي المتقدم، وبين عبق التراث الدمشقي الأصيل للحفاظ على الهوية الثقافية وتطوير الخدمات.",
        features: [
          { icon: "fa-hospital", title: "مراكز استشفاء", desc: "فنادق ومراكز طبية متطورة من سوية 5 نجوم." },
          { icon: "fa-landmark", title: "إحياء التراث", desc: "استثمار المعالم التاريخية كالحمامات التراثية." },
          { icon: "fa-leaf", title: "أنشطة متممة", desc: "خدمات تجارية مرافقة للمراكز الطبية والسياحية." }
        ]
      },
      featured: {
        title: "فندق استشفاء ومركز طبي",
        date: "عقد BOT - 40 سنة",
        desc: "فندق استشفاء ومركز طبي من سوية 5 نجوم مع أنشطة تجارية متممة في دمر (جنوب مول الاب تاون) بمساحات طابقية تتجاوز 26,000 م2.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      },
      mini1: {
        title: "استثمار حمام الجورة التراثي",
        date: "عقد BOT - 15 سنة",
        desc: "مشروع تنفيذ واستثمار حمام الجورة التراثي في منطقة ساروجة بدمشق بمساحة 2,450 م2 للحفاظ على الإرث الثقافي.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      },
      mini2: {
        title: "خدمات طبية وتجارية متكاملة",
        date: "عقد BOT - 40 سنة",
        desc: "استثمار الأقبية والمساحات تحت المراكز الطبية لتوفير مرائب تتسع لمئات السيارات وخدمات تجارية داعمة.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      }
    },

    // 4. الحدائق والمساحات التحت أرضية
    "clean-energy": {
      overview: {
        title: "الحدائق والأسواق التحت أرضية",
        desc: "رؤية بيئية واستثمارية حديثة تعتمد على إبقاء المساحات الخضراء فوق الأرض، واستثمار الأعماق لإنشاء أسواق ومرائب متطورة.",
        features: [
          { icon: "fa-tree", title: "حدائق عامة", desc: "تطوير مساحات خضراء صديقة للبيئة للمواطنين." },
          { icon: "fa-arrow-down", title: "أسواق تحت الأرض", desc: "أسواق تجارية متخصصة تحت الحدائق مباشرة." },
          { icon: "fa-car", title: "مرائب طابقية", desc: "مواقف سيارات واسعة لحل أزمة الازدحام المحيطة." }
        ]
      },
      featured: {
        title: "حديقة البرامكة والسوق التجاري",
        date: "عقد BOT - 40 سنة",
        desc: "دراسة وتنفيذ واستثمار حديقة البرامكة وسوق تجاري متخصص تحتها مع مرائب تتجاوز مساحتها 19,000 م2.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      },
      mini1: {
        title: "حديقة المدفع - أبو رمانة",
        date: "عقد BOT - 40 سنة",
        desc: "دراسة وتنفيذ واستثمار حديقة المدفع وما تحتها من مرائب ومساحات تجارية تخدم أرقى مناطق العاصمة.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      },
      mini2: {
        title: "استثمارات الأقبية المتعددة",
        date: "عقد BOT - 40 سنة",
        desc: "استغلال المراتب والأقبية تحت الحدائق بمساحات تتجاوز 13,000 م2 لتوفير أقصى قدرة استيعابية للسيارات.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      }
    },

    // 5. المرائب الروبوتية الذكية
    "transit-network": {
      overview: {
        title: "المرائب الروبوتية الذكية",
        desc: "حلول مرورية وتكنولوجية متقدمة لإنشاء مرائب تعتمد على الذكاء الاصطناعي والروبوتات لحل مشاكل الازدحام في مركز المدينة.",
        features: [
          { icon: "fa-robot", title: "أنظمة روبوتية", desc: "اصطفاف آلي للسيارات لزيادة القدرة الاستيعابية." },
          { icon: "fa-location-dot", title: "مواقع مركزية", desc: "تتوزع في البرامكة، باب توما، وشارع الثورة." },
          { icon: "fa-clock", title: "عقود تشغيل", desc: "عقود استثمار وتطوير لمدة 15 عاماً." }
        ]
      },
      featured: {
        title: "مرآب الجهاد الروبوتي - البرامكة",
        date: "عقد BOT - 15 سنة",
        desc: "إنشاء مرآب روبوتي ذكي يتسع لـ 200 موقف لخدمة منطقة البرامكة ذات الكثافة المرورية العالية.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      },
      mini1: {
        title: "مرآب الصوفانية - باب توما",
        date: "عقد BOT - 15 سنة",
        desc: "مرآب روبوتي ذكي يتسع لـ 200 موقف في باب توما لتسهيل حركة السياح والزوار في دمشق القديمة.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      },
      mini2: {
        title: "مرائب شارع الثورة والبحصة",
        date: "عقد BOT - 15 سنة",
        desc: "مرائب روبوتية وطابقية تحت الأرض خلف المصالح العقارية وفندق كريستال (البحصة) لخدمة مركز الأعمال.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      }
    },

    // 6. الشقق الفندقية
    "tourist-resort": {
      overview: {
        title: "مشروع الشقق الفندقية",
        desc: "مشاريع مخصصة لإنشاء شقق فندقية راقية تلبي احتياجات الإقامة الفاخرة والطويلة لرجال الأعمال والسياح في دمشق.",
        features: [
          { icon: "fa-building", title: "شقق فندقية", desc: "وحدات سكنية بخدمات فندقية كاملة." },
          { icon: "fa-city", title: "إطلالات مميزة", desc: "مواقع استراتيجية في مشروع دمر الحديث." },
          { icon: "fa-key", title: "إقامة متكاملة", desc: "خصوصية الشقق مع رفاهية الفنادق المعتمدة." }
        ]
      },
      featured: {
        title: "مشروع شقق فندقية - دمر",
        date: "عقد BOT - 40 سنة",
        desc: "مشروع ضخم لإنشاء شقق فندقية على العقارين (55-56) في دمر الشرقية (جزيرة 14)، لتقديم أرقى خدمات الضيافة.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      },
      mini1: {
        title: "مساحات بناء استثمارية",
        date: "عقد BOT - 40 سنة",
        desc: "توفير مساحات بناء ضخمة تصل إلى 116,755 م2 و 198,556 م2 لتطوير مجمعات إقامة فندقية شاملة.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      },
      mini2: {
        title: "مرافق وخدمات داعمة",
        date: "عقد BOT - 40 سنة",
        desc: "تزويد الشقق الفندقية بمرائب متطورة، أندية رياضية، ومراكز تسوق لتأمين راحة المقيمين.",
        image: "ضع_مسار_الصورة_هنا.jpg",
        link: "#"
      }
    }
  };
  /* ==============================================================
     دالة تعبئة السكشن الثاني ببيانات المشروع والنزول إليه
     ============================================================== */
  function showProjectInSecondSection(projectId) {
    const projectData = projectsCatalog[projectId];
    const showcaseGrid = document.querySelector(".showcase-grid");
    const targetSection = document.getElementById("project-business-city") || document.querySelector(".projects-showcase-section");

    if (!projectData || !showcaseGrid) return;

  
    showcaseGrid.style.opacity = "0.2";
    showcaseGrid.style.transition = "opacity 0.25s ease";

    setTimeout(() => {
    
      const featuredCard = showcaseGrid.querySelector(".featured-card, .featured-slot .showcase-item");
      if (featuredCard) {
        featuredCard.querySelector(".featured-thumb img, .card-thumb img").src = projectData.featured.image;
        featuredCard.querySelector(".card-meta-date").innerHTML = `<i class="fa-regular fa-calendar"></i> ${projectData.featured.date}`;
        featuredCard.querySelector(".featured-title, .card-title").textContent = projectData.featured.title;
        featuredCard.querySelector(".featured-desc, .card-desc").textContent = projectData.featured.desc;
        const btn = featuredCard.querySelector(".btn-card-action");
        if (btn) btn.href = projectData.featured.link;
      }

     
      const miniCards = showcaseGrid.querySelectorAll(".showcase-mini-card, .side-cards-col .showcase-item");
      if (miniCards.length >= 2) {
      
        miniCards[0].querySelector(".mini-card-thumb img, .card-thumb img").src = projectData.mini1.image;
        miniCards[0].querySelector(".card-meta-date").innerHTML = `<i class="fa-regular fa-calendar"></i> ${projectData.mini1.date}`;
        miniCards[0].querySelector(".mini-card-title, .card-title").textContent = projectData.mini1.title;
        miniCards[0].querySelector(".mini-card-desc, .card-desc").textContent = projectData.mini1.desc;
        const btn1 = miniCards[0].querySelector(".btn-card-action");
        if (btn1) btn1.href = projectData.mini1.link;

       
        miniCards[1].querySelector(".mini-card-thumb img, .card-thumb img").src = projectData.mini2.image;
        miniCards[1].querySelector(".card-meta-date").innerHTML = `<i class="fa-regular fa-calendar"></i> ${projectData.mini2.date}`;
        miniCards[1].querySelector(".mini-card-title, .card-title").textContent = projectData.mini2.title;
        miniCards[1].querySelector(".mini-card-desc, .card-desc").textContent = projectData.mini2.desc;
        const btn2 = miniCards[1].querySelector(".btn-card-action");
        if (btn2) btn2.href = projectData.mini2.link;
      }

      showcaseGrid.style.opacity = "1";

   
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    }, 200);
  }

  /* ==============================================================
     1. سلايدر السكشن الأول وربط الضغط على الصور
     ============================================================== */

/* ==============================================================
   دالة لتحديث النص الجانبي بناءً على المشروع المعروض في السلايدر
   ============================================================== */
function updateMainContent(projectId) {
  const data = projectsCatalog[projectId]?.overview;
  if (!data) return;

  const contentDiv = document.querySelector('.qasioun-content');
  const titleEl = contentDiv.querySelector('.qasioun-title');
  const descEl = contentDiv.querySelector('.qasioun-desc');
  const featuresList = contentDiv.querySelector('.qasioun-features');

  // إخفاء النص لعمل تأثير التبديل
  contentDiv.style.opacity = '0';

  setTimeout(() => {
    // تحديث العنوان والوصف
    titleEl.textContent = data.title;
    descEl.textContent = data.desc;

    // بناء وتحديث قائمة الميزات
    let featuresHTML = '';
    data.features.forEach(item => {
      featuresHTML += `
        <li>
          <i class="fa-solid ${item.icon}"></i>
          <div>
            <strong>${item.title}:</strong>
            <span>${item.desc}</span>
          </div>
        </li>
      `;
    });
    featuresList.innerHTML = featuresHTML;

    // إظهار النص من جديد
    contentDiv.style.opacity = '1';
  }, 300); // 300ms تتوافق مع الـ transition في الـ CSS
}

  const carousels = document.querySelectorAll(".journey-carousel");

  carousels.forEach((carousel) => {
    const visual = carousel.closest(".qasioun-visual");
    if (!visual) return;

    const slider = carousel.querySelector(".journey-slider");
    if (!slider) return;

    const cards = Array.from(slider.querySelectorAll(".journey-card"));
    if (!cards.length) return;

    const prevBtn = carousel.querySelector(".journey-arrow--prev");
    const nextBtn = carousel.querySelector(".journey-arrow--next");
    const dotsContainer = visual.querySelector(".journey-dots");

    let currentIndex = 0;
    let autoPlay = null;
    const AUTO_PLAY_DELAY = 3500;
    let isHovered = false;
    let dots = [];

    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      cards.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "journey-dot";
        dot.setAttribute("aria-label", `الصورة ${index + 1}`);

        dot.addEventListener("click", () => {
          currentIndex = index;
          updateCarousel();
          restartAutoPlay();
        });

        dotsContainer.appendChild(dot);
      });

      dots = Array.from(dotsContainer.querySelectorAll(".journey-dot"));
    }

    function getIndex(offset) {
      return (currentIndex + offset + cards.length) % cards.length;
    }

    function updateCarousel() {
      cards.forEach((card) => {
        card.className = "journey-card hidden";
        card.setAttribute("aria-hidden", "true");
      });

      cards[currentIndex].className = "journey-card active";
      cards[currentIndex].setAttribute("aria-hidden", "false");

      if (cards.length > 1) {
        cards[getIndex(1)].className = "journey-card next";
        cards[getIndex(-1)].className = "journey-card prev";
      }

      if (cards.length > 3) {
        cards[getIndex(2)].className = "journey-card next2";
        cards[getIndex(-2)].className = "journey-card prev2";
      }

      dots.forEach((dot, index) => {
        const isActive = index === currentIndex;
        dot.classList.toggle("active", isActive);
        dot.setAttribute("aria-current", String(isActive));

        const activeProjectId = cards[currentIndex].getAttribute("data-project-id");
      if(activeProjectId) {
         updateMainContent(activeProjectId);
      }
      });
    }

    function goToPrevious() {
      currentIndex = getIndex(-1);
      updateCarousel();
    }

    function goToNext() {
      currentIndex = getIndex(1);
      updateCarousel();
    }

    function stopAutoPlay() {
      if (autoPlay !== null) {
        clearInterval(autoPlay);
        autoPlay = null;
      }
    }

    function startAutoPlay() {
      stopAutoPlay();
      if (cards.length < 2 || isHovered) return;
      autoPlay = setInterval(goToNext, AUTO_PLAY_DELAY);
    }

    function restartAutoPlay() {
      startAutoPlay();
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        goToPrevious();
        restartAutoPlay();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goToNext();
        restartAutoPlay();
      });
    }
    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        const projectId = card.getAttribute("data-project-id");
        
        if (index === currentIndex) {
          if (projectId) showProjectInSecondSection(projectId);
        } else {
      
          currentIndex = index;
          updateCarousel();
          restartAutoPlay();
          if (projectId) showProjectInSecondSection(projectId);
        }
      });
    });

    carousel.addEventListener("mouseenter", () => {
      isHovered = true;
      stopAutoPlay();
    });

    carousel.addEventListener("mouseleave", () => {
      isHovered = false;
      startAutoPlay();
    });

    updateCarousel();
    startAutoPlay();
  });


  /* ==============================================================
     2. تدوير الكروت والأسهم السفلية داخل السكشن الثاني (3 / 1)
     ============================================================== */
  const featuredSlot = document.getElementById("featuredSlot");
  const miniSlots = document.getElementById("miniSlots");
  const showcaseCounter = document.getElementById("showcaseCounter");
  const showcasePrevBtn = document.querySelector(".showcase-prev-btn");
  const showcaseNextBtn = document.querySelector(".showcase-next-btn");
  const showcaseGrid = document.querySelector(".showcase-grid");

  if (featuredSlot && miniSlots) {
    let showcaseCards = [
      featuredSlot.querySelector(".showcase-item"),
      ...miniSlots.querySelectorAll(".showcase-item")
    ].filter(Boolean);

    const totalCards = 3;

    function updateSlots() {
      if (showcaseGrid) showcaseGrid.style.opacity = "0.3";

      setTimeout(() => {
        featuredSlot.innerHTML = "";
        miniSlots.innerHTML = "";

        featuredSlot.appendChild(showcaseCards[0]);
        if (showcaseCards[1]) miniSlots.appendChild(showcaseCards[1]);
        if (showcaseCards[2]) miniSlots.appendChild(showcaseCards[2]);

        const currentActiveIndex = showcaseCards[0].getAttribute("data-index") || "1";
        if (showcaseCounter) {
          showcaseCounter.textContent = `${currentActiveIndex} / ${totalCards}`;
        }

        if (showcaseGrid) showcaseGrid.style.opacity = "1";
      }, 150);
    }

    if (showcaseNextBtn) {
      showcaseNextBtn.addEventListener("click", () => {
        const first = showcaseCards.shift();
        showcaseCards.push(first);
        updateSlots();
      });
    }

    if (showcasePrevBtn) {
      showcasePrevBtn.addEventListener("click", () => {
        const last = showcaseCards.pop();
        showcaseCards.unshift(last);
        updateSlots();
      });
    }
  }











  
  const flipCards = document.querySelectorAll(".flip-card");

  flipCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      if (event.target.closest(".btn-card-details")) return;

      if (window.innerWidth <= 1024) {
        flipCards.forEach((otherCard) => {
          if (otherCard !== card) {
            otherCard.classList.remove("is-flipped");
          }
        });
        card.classList.toggle("is-flipped");
      }
    });
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      flipCards.forEach((card) => {
        card.classList.remove("is-flipped");
      });
    }
  });

});
document.addEventListener("DOMContentLoaded", () => {


  const projectsCatalog = {
    "business-city": {
      featured: {
        title: "مدينة الأعمال والخدمات المتكاملة",
        date: "8-9-2026",
        desc: "مشروع حضري واستثماري رائد لتأسيس منصة بنية تحتية وإدارية حديثة توفر كافة المرافق الحيوية لقطاع الشركات والأعمال مع عوائد تنموية طويلة الأجل في قلب العاصمة دمشق.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
        link: "#"
      },
      mini1: {
        title: "مركز المؤتمرات والمعارض",
        date: "10-9-2026",
        desc: "مساحات عرض متطورة لاستضافة الملتقيات الاقتصادية وفعاليات رجال الأعمال.",
        image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80",
        link: "#"
      },
      mini2: {
        title: "الأبراج المكتبية الذكية",
        date: "12-9-2026",
        desc: "مقار إدارية مجهزة بأحدث تقنيات الاتصال وإدارة الطاقة المستدامة.",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
        link: "#"
      }
    },

    "financial-center": {
      featured: {
        title: "مركز دمشق المالي الحديث",
        date: "14-9-2026",
        desc: "وجهة متكاملة للبنوك، شركات التأمين، والخدمات المالية والمهنية ضمن بيئة تشغيلية آمنة وعصرية تدعم تدفق الاستثمارات الإقليمية.",
        image: "../images/WhatsApp Image 2026-10-12 at 9.15.13 AM (1).jpeg",
        link: "#"
      },
      mini1: {
        title: "المجمع المصرفي الموحد",
        date: "15-9-2026",
        desc: "مقرات للمصارف والمؤسسات الاستثمارية المالية بتجهيزات أمنية متقدمة.",
        image: "../images/WhatsApp Image 2026-10-12 at 9.15.14 AM (1).jpeg",
        link: "#"
      },
      mini2: {
        title: "حاضنة التقنيات المالية (FinTech)",
        date: "16-9-2026",
        desc: "مساحات عمل مخصصة لشركات الدفع الإلكتروني والابتكار التقني المالي.",
        image: "../images/WhatsApp Image 2026-10-12 at 9.15.14 AM (2).jpeg",
        link: "#"
      }
    },

    "qasioun-journey": {
      featured: {
        title: "مشروع رحلة قاسيون السياحي",
        date: "18-9-2026",
        desc: "أيقونة سياحية وترفيهية متكاملة على سفوح جبل قاسيون تجمع بين المطاعم الفاخرة، المرافق الترفيهية، والمطلات البانورامية الساحرة لدمشق.",
        image: "../images/لقطة الشاشة 2026-10-04 120835.png",
        link: "#"
      },
      mini1: {
        title: "الممشى البانورامي والمطلات",
        date: "19-9-2026",
        desc: "مسارات مشاة بإطلالات مفتوحة على كافة معالم دمشق القديمة والحديثة.",
        image: "../images/لقطة الشاشة 2026-10-04 121035.png",
        link: "#"
      },
      mini2: {
        title: "مجمع المطاعم والضيافة الجبلية",
        date: "20-9-2026",
        desc: "جلسات عائلية وخدمات ضيافة سياحية بمعايير خدمية راقية.",
        image: "../images/لقطة الشاشة 2026-10-04 120732.png",
        link: "#"
      }
    },

    "clean-energy": {
      featured: {
        title: "محطة توليد الطاقة البديلة والنظيفة",
        date: "22-9-2026",
        desc: "مشروع ريادي لإنشاء حقول طاقة شمسية وتوليد مركب في ريف دمشق لدعم شبكة الطاقة الكهربائية وتغذية المنشآت الصناعية بحلول مستدامة.",
        image: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80",
        link: "#"
      },
      mini1: {
        title: "مزارع الألواح الكهروضوئية",
        date: "23-9-2026",
        desc: "استغلال المساحات المفتوحة بأحدث تقنيات تتبع الشمس وتخزين الطاقة.",
        image: "https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80",
        link: "#"
      },
      mini2: {
        title: "محطات التحويل والربط الذكي",
        date: "24-9-2026",
        desc: "بنية تحتية لتوزيع الطاقة وخفض الفاقد التشغيلي عبر شبكات ذكية.",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=600&q=80",
        link: "#"
      }
    },

    "transit-network": {
      featured: {
        title: "شبكة النقل السريع والقطار الخفيف (LRT)",
        date: "25-9-2026",
        desc: "خطوط ترام ونقل عام حديثة تربط أطراف المدينة والضواحي بقلب العاصمة لتأمين تنقل يومي انسيابي وتقليل الازدحام المروري.",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
        link: "#"
      },
      mini1: {
        title: "المحطات التبادلية واللوجستية",
        date: "26-9-2026",
        desc: "مراكز انطلاق وتكامل بين خطوط الحافلات السريعة والقطار الخفيف.",
        image: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=600&q=80",
        link: "#"
      },
      mini2: {
        title: "أنظمة التذاكر الذكية الموحدة",
        date: "27-9-2026",
        desc: "بوابات عبور آلية وتطبيقات حجز إلكترونية لتسهيل حركة الركاب.",
        image: "https://images.unsplash.com/photo-1555353540-64580b51c258?auto=format&fit=crop&w=600&q=80",
        link: "#"
      }
    },

    "tourist-resort": {
      featured: {
        title: "منتجع الربوة الترفيهي والسياحي",
        date: "28-9-2026",
        desc: "منتجع سياحي بيئي وثقافي على ضفاف بردى في منطقة الربوة يشتمل على حدائق مفتوحة، مسابح، وفنادق بوتيك تستقطب العائلات والزوار.",
        image: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=80",
        link: "#"
      },
      mini1: {
        title: "الحدائق المائية والمسطحات الخضراء",
        date: "29-9-2026",
        desc: "بيئة طبيعية خلابة مجهزة بمرافق ألعاب ومسارات رياضية عائلية.",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80",
        link: "#"
      },
      mini2: {
        title: "أجنحة الإقامة الفندقية",
        date: "30-9-2026",
        desc: "شاليهات وأجنحة إقامة بطابع دمشقي تراثي وخدمات فندقية متكاملة.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80",
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
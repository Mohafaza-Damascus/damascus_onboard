document.addEventListener("DOMContentLoaded", () => {
  /* ==============================================================
     قاعدة البيانات الحقيقية للمشاريع الـ 15 (من ملف مديرية المعلوماتية 2026)
     ============================================================== */
  const projectsCatalog = {
    // 1. حمام الجورة
    "hammam-aljoura": {
      badge: "عقد BOT - 15 سنة",
      title: "حمام الجورة التراثي",
      desc: "مشروع تنفيذ واستثمار حمام الجورة التراثي في منطقة ساروجة بدمشق، يهدف إلى إحياء وتوظيف المعالم التراثية الدمشقية الأصيلة ضمن استثمار سياحي وخدمي مميز.",
      features: [
        {
          icon: "fa-location-dot",
          title: "الموقع التفصيلي والعقار",
          desc: "دمشق - ساروجة | رقم العقار: 1339"
        },
        {
          icon: "fa-ruler-combined",
          title: "المساحات المعتمدة",
          desc: "المساحة الإجمالية: 2,450 م² | مساحة البناء: 2,400 م²"
        },
        {
          icon: "fa-file-contract",
          title: "نظام التعاقد والجهة المالكة",
          desc: "عقد استثمار (BOT) لمدة 15 سنة - محافظة دمشق"
        }
      ]
    },

    // 2. حديقة المدفع
    "hadikat-almidfaa": {
      badge: "عقد BOT - 40 سنة",
      title: "حديقة المدفع وما تحتها",
      desc: "دراسة وتنفيذ واستثمار حديقة المدفع وما تحتها من مساحات تجارية استثمارية ومرائب طابقية في منطقة أبو رمانة الراقية.",
      features: [
        {
          icon: "fa-location-dot",
          title: "الموقع التفصيلي والعقار",
          desc: "دمشق - أبو رمانة | رقم العقار: 4465"
        },
        {
          icon: "fa-layer-group",
          title: "تفاصيل المساحات الاستثمارية",
          desc: "القبو الأول (تجاري استثماري): 2,200 م² | باقي الأقبية (مرائب بالكامل): 13,200 م² | مساحة البناء: 2,200 م²"
        },
        {
          icon: "fa-file-contract",
          title: "نظام التعاقد والجهة المالكة",
          desc: "عقد استثمار (BOT) لمدة 40 سنة - محافظة دمشق"
        }
      ]
    },

    // 3. حديقة البرامكة
    "hadikat-albaramkeh": {
      badge: "عقد BOT - 40 سنة",
      title: "حديقة البرامكة والسوق التخصصي",
      desc: "دراسة وتنفيذ واستثمار حديقة البرامكة مع إنشاء سوق تجاري متخصص تحت الحديقة ومرائب واسعة لخدمة المنطقة الحيوية.",
      features: [
        {
          icon: "fa-location-dot",
          title: "الموقع التفصيلي والعقار",
          desc: "دمشق - الفحامة - البرامكة | رقم العقار: 2285"
        },
        {
          icon: "fa-layer-group",
          title: "تفاصيل المساحات الاستثمارية",
          desc: "القبو الأول (تجاري استثماري): 6,470 م² | باقي الأقبية (مرائب بالكامل): 19,410 م² | مساحة البناء: 5,300 م²"
        },
        {
          icon: "fa-file-contract",
          title: "نظام التعاقد والجهة المالكة",
          desc: "عقد استثمار (BOT) لمدة 40 سنة - محافظة دمشق"
        }
      ]
    },

    // 4. العقارين / 2156-2157 / مدخل الفردوس
    "hotel-fardous": {
      badge: "عقد BOT - 40 سنة",
      title: "فندق سياحي 4 نجوم - مدخل الفردوس",
      desc: "مشروع إقامة واستثمار فندق سياحي من سوية 4 نجوم مع أنشطة تجارية وترفيهية متممة ومرائب على العقارين (2156-2157) في قلب العاصمة.",
      features: [
        {
          icon: "fa-location-dot",
          title: "الموقع التفصيلي والعقارات",
          desc: "دمشق - مدخل مرآب الفردوس | العقار 2156 (585 م²) والعقار 2157 (357 م²)"
        },
        {
          icon: "fa-building",
          title: "المساحات الطابقية والتجارية",
          desc: "طابقية فوق الأرض: 11,500 م² | القبو الأول (تجاري): 1,215 م² | باقي الأقبية (مرائب): 3,645 م²"
        },
        {
          icon: "fa-file-contract",
          title: "نظام التعاقد والجهة المالكة",
          desc: "عقد استثمار (BOT) لمدة 40 سنة - محافظة دمشق"
        }
      ]
    },

    // 5. فندق على المقاسم / 1-2-3 / دمر
    "hotel-dummar": {
      badge: "عقد BOT - 40 سنة",
      title: "فندق سياحي 5 نجوم - المقاسم (1-2-3) دمر",
      desc: "مشروع فندق سياحي فاخر من سوية 5 نجوم مع أنشطة تجارية وترفيهية متممة ومرائب متكاملة في منطقة مشروع دمر.",
      features: [
        {
          icon: "fa-location-dot",
          title: "الموقع التفصيلي والعقارات",
          desc: "دمشق - مشروع دمر | أرقام العقارات: B1 - B2 - B3"
        },
        {
          icon: "fa-hotel",
          title: "المساحات الطابقية والتجارية",
          desc: "طابقية فوق الأرض: 24,000 م² | القبو الأول (تجاري): 3,000 م² | باقي الأقبية (مرائب): 9,000 م² | مساحة البناء: 1,600 م²"
        },
        {
          icon: "fa-file-contract",
          title: "نظام التعاقد والجهة المالكة",
          desc: "عقد استثمار (BOT) لمدة 40 سنة - محافظة دمشق"
        }
      ]
    },

    // 6. فندق استشفاء ومركز طبي المقسمين / 63-64 / دمر
    "medical-hotel-dummar": {
      badge: "عقد BOT - 40 سنة",
      title: "فندق استشفاء ومركز طبي 5 نجوم - دمر",
      desc: "فندق استشفاء ومركز طبي متطور من سوية 5 نجوم مع أنشطة تجارية متممة على المقسمين (63-64) في دمر لتعزيز قطاع السياحة العلاجية.",
      features: [
        {
          icon: "fa-location-dot",
          title: "الموقع التفصيلي والعقارات",
          desc: "دمشق - دمر (جنوب مول الاب تاون) | العقارات: 982 - 985 - 986"
        },
        {
          icon: "fa-hospital",
          title: "مساحات المقسمين (63 و 64)",
          desc: "المقسم 63: طابقية 6,376 م²، تجاري 1,566 م²، مرائب 4,698 م² | المقسم 64: طابقية 6,320 م²، تجاري 1,255 م²، مرائب 3,765 م²"
        },
        {
          icon: "fa-file-contract",
          title: "نظام التعاقد والجهة المالكة",
          desc: "عقد استثمار (BOT) لمدة 40 سنة - محافظة دمشق"
        }
      ]
    },

    // 7. سوق تجاري ومكاتب المقسم / 106 / المزة
    "souk-mazzeh-106": {
      badge: "عقد BOT - 10 سنوات",
      title: "سوق تجاري ومكاتب - المقسم (106) المزة",
      desc: "مشروع سوق تجاري عصري ومكاتب أعمال إدارية مع مرائب تحت الأرض في موقع حيوي واستراتيجي بمنطقة المزة.",
      features: [
        {
          icon: "fa-location-dot",
          title: "الموقع التفصيلي والعقار",
          desc: "دمشق - المزة (مقابل مشفى المواساة الخيري) | رقم العقار: 5576"
        },
        {
          icon: "fa-briefcase",
          title: "المساحات الطابقية والتجارية",
          desc: "طابقية فوق الأرض: 12,735 م² | القبو الأول (تجاري): 933 م² | باقي الأقبية (مرائب): 1,866 م² | مساحة البناء: 383 م²"
        },
        {
          icon: "fa-file-contract",
          title: "نظام التعاقد والجهة المالكة",
          desc: "عقد استثمار (BOT) لمدة 10 سنوات - محافظة دمشق"
        }
      ]
    },

    // 8. فندق وسوق تجاري ومرائب المقسم / 14 / ساحة عرنوس
    "hotel-arnous-14": {
      badge: "عقد BOT - 40 سنة",
      title: "فندق وسوق تجاري ومرائب - ساحة عرنوس",
      desc: "مشروع استثماري متكامل يضم فندقاً وسوقاً تجارياً ومرائب للسيارات على المقسم (14) في منطقة الصالحية - ساحة عرنوس الحيوية.",
      features: [
        {
          icon: "fa-location-dot",
          title: "الموقع التفصيلي",
          desc: "دمشق - الصالحية - ساحة عرنوس (المقسم 14 - مقترح)"
        },
        {
          icon: "fa-building-columns",
          title: "المساحات الطابقية والتجارية",
          desc: "طابقية فوق الأرض: 18,700 م² | القبو الأول (تجاري): 2,825 م² | باقي الأقبية (مرائب بالكامل): 8,473 م²"
        },
        {
          icon: "fa-file-contract",
          title: "نظام التعاقد والجهة المالكة",
          desc: "عقد استثمار (BOT) لمدة 40 سنة - محافظة دمشق"
        }
      ]
    },

    // 9. مول عمر بيك
    "omar-bek-mall": {
      badge: "عقد BOT - 40 سنة",
      title: "مول عمر بيك التجاري",
      desc: "مول تجاري متخصص ومرائب ومخازن بمساحات ضخمة في منطقة الزاهرة الجديدة لتخديم الحركة التسويقية والتجارية في جنوب العاصمة.",
      features: [
        {
          icon: "fa-location-dot",
          title: "الموقع التفصيلي",
          desc: "دمشق - الزاهرة الجديدة (جانب الفرن الآلي)"
        },
        {
          icon: "fa-store",
          title: "توزيع المساحات الطابقية والأقبية",
          desc: "مساحة البناء: 12,000 م² | القبو الأول (تجاري): 12,000 م² | القبو الثاني والثالث (مرائب): 24,000 م² | القبو الرابع (مخازن): 12,000 م²"
        },
        {
          icon: "fa-file-contract",
          title: "نظام التعاقد والجهة المالكة",
          desc: "عقد استثمار (BOT) لمدة 40 سنة - محافظة دمشق"
        }
      ]
    },

    // 10. العقارين / 55-56 / دمر الشرقية
    "hotel-apartments-dummar": {
      badge: "عقد BOT - 40 سنة",
      title: "مشروع شقق فندقية - دمر الشرقية",
      desc: "مشروع عمراني وسياحي ضخم لإنشاء واستثمار شقق فندقية متكاملة الخدمات على العقارين (55-56) في مشروع دمر.",
      features: [
        {
          icon: "fa-location-dot",
          title: "الموقع التفصيلي",
          desc: "دمشق - مشروع دمر (جزيرة 14) - العقارين 55 و 56 دمر الشرقية"
        },
        {
          icon: "fa-city",
          title: "المساحات المعتمدة",
          desc: "المساحة الإجمالية للمشروع: 16,000 م² | مساحات العقارات: 116,755 م² و 198,556 م²"
        },
        {
          icon: "fa-file-contract",
          title: "نظام التعاقد والجهة المالكة",
          desc: "عقد استثمار (BOT) لمدة 40 سنة - محافظة دمشق"
        }
      ]
    },

    // 11. مرآب الجهاد
    "garage-aljihaad": {
      badge: "عقد BOT - 15 سنة",
      title: "مرآب الجهاد الروبوتي الذكي",
      desc: "مشروع إنشاء واستثمار مرآب روبوتي ذكي متعدد الطوابق يعمل بالأنظمة الآلية الحديثة لتأمين مواقف السيارات في منطقة البرامكة.",
      features: [
        {
          icon: "fa-location-dot",
          title: "الموقع التفصيلي والعقار",
          desc: "دمشق - البرامكة | رقم العقار: 781"
        },
        {
          icon: "fa-robot",
          title: "الطاقة الاستيعابية والتقنية",
          desc: "نظام اصطفاف روبوتي ذكي بسعة إجمالية تبلغ (200) موقف سيارة"
        },
        {
          icon: "fa-file-contract",
          title: "نظام التعاقد والجهة المالكة",
          desc: "عقد استثمار (BOT) لمدة 15 سنة - محافظة دمشق"
        }
      ]
    },

    // 12. مرآب الصوفانية
    "garage-alsoufaniya": {
      badge: "عقد BOT - 15 سنة",
      title: "مرآب الصوفانية الروبوتي الذكي",
      desc: "مشروع إنشاء واستثمار مرآب روبوتي ذكي في منطقة باب توما لتخديم الزوار والسياح وتخفيف الازدحام المروري في محيط دمشق القديمة.",
      features: [
        {
          icon: "fa-location-dot",
          title: "الموقع التفصيلي والعقارات",
          desc: "دمشق - باب توما | أرقام العقارات: 943 - 944"
        },
        {
          icon: "fa-robot",
          title: "الطاقة الاستيعابية والتقنية",
          desc: "نظام اصطفاف روبوتي ذكي بسعة إجمالية تبلغ (200) موقف سيارة"
        },
        {
          icon: "fa-file-contract",
          title: "نظام التعاقد والجهة المالكة",
          desc: "عقد استثمار (BOT) لمدة 15 سنة - محافظة دمشق"
        }
      ]
    },

    // 13. مرآب المقسم / 10 / شارع الثورة
    "garage-thawra-10": {
      badge: "عقد BOT - 15 سنة",
      title: "مرآب المقسم (10) الروبوتي - شارع الثورة",
      desc: "مشروع مرآب روبوتي ذكي في قلب المركز التجاري والإداري للعاصمة بشارع الثورة لتأمين حلول اصطفاف عصرية وسريعة.",
      features: [
        {
          icon: "fa-location-dot",
          title: "الموقع التفصيلي",
          desc: "دمشق - شارع الثورة (جنوب المصالح العقارية) - المقسم 10"
        },
        {
          icon: "fa-robot",
          title: "طبيعة المشروع",
          desc: "مرآب روبوتي ذكي يعتمد الأنظمة الآلية الحديثة لتخديم مركز المدينة"
        },
        {
          icon: "fa-file-contract",
          title: "نظام التعاقد والجهة المالكة",
          desc: "عقد استثمار (BOT) لمدة 15 سنة - محافظة دمشق"
        }
      ]
    },

    // 14. مرآب المقسم / 12 / شارع الثورة
    "garage-thawra-12": {
      badge: "عقد BOT - 15 سنة",
      title: "مرآب المقسم (12) الروبوتي - شارع الثورة",
      desc: "مشروع مرآب روبوتي ذكي شمال مبنى المصالح العقارية في شارع الثورة لرفد المنطقة التجارية والإدارية بمواقف سيارات حديثة.",
      features: [
        {
          icon: "fa-location-dot",
          title: "الموقع التفصيلي",
          desc: "دمشق - شارع الثورة (شمال المصالح العقارية) - المقسم 12"
        },
        {
          icon: "fa-robot",
          title: "طبيعة المشروع",
          desc: "مرآب روبوتي ذكي متطور يدعم البنية التحتية المرورية في وسط دمشق"
        },
        {
          icon: "fa-file-contract",
          title: "نظام التعاقد والجهة المالكة",
          desc: "عقد استثمار (BOT) لمدة 15 سنة - محافظة دمشق"
        }
      ]
    },

    // 15. مرآب البحصة
    "garage-bahsa": {
      badge: "عقد BOT - 15 سنة",
      title: "مرآب البحصة الطابقي تحت الأرض",
      desc: "مشروع إنشاء واستثمار مرآب طابقي تحت الأرض في منطقة البحصة الحيوية لتخديم الفنادق والأسواق التجارية المجاورة.",
      features: [
        {
          icon: "fa-location-dot",
          title: "الموقع التفصيلي",
          desc: "دمشق - البحصة (خلف فندق كريستال)"
        },
        {
          icon: "fa-square-parking",
          title: "المساحة المعتمدة",
          desc: "مرآب طابقي تحت الأرض بمساحة إجمالية تبلغ 1,200 م²"
        },
        {
          icon: "fa-file-contract",
          title: "نظام التعاقد والجهة المالكة",
          desc: "عقد استثمار (BOT) لمدة 15 سنة - محافظة دمشق"
        }
      ]
    }
  };

  /* ==============================================================
     دالة تحديث الوصف الجانبي ليتطابق مع الكرت الموجود في المنتصف
     ============================================================== */
  let fadeTimeout = null;
  let lastRenderedProjectId = null;

  function updateMainContent(projectId) {
    const data = projectsCatalog[projectId];
    if (!data || projectId === lastRenderedProjectId) return;
    lastRenderedProjectId = projectId;

    const contentDiv = document.getElementById("dynamic-project-content") || document.querySelector(".qasioun-content");
    if (!contentDiv) return;

    const badgeEl = contentDiv.querySelector(".qasioun-badge");
    const titleEl = contentDiv.querySelector(".qasioun-title");
    const descEl = contentDiv.querySelector(".qasioun-desc");
    const featuresList = contentDiv.querySelector(".qasioun-features");

    if (fadeTimeout) {
      clearTimeout(fadeTimeout);
    }

    contentDiv.style.opacity = "0";

    fadeTimeout = setTimeout(() => {
      if (badgeEl && data.badge) badgeEl.textContent = data.badge;
      if (titleEl) titleEl.textContent = data.title;
      if (descEl) descEl.textContent = data.desc;

      if (featuresList && Array.isArray(data.features)) {
        featuresList.innerHTML = data.features
          .map(
            (item) => `
            <li>
              <i class="fa-solid ${item.icon}"></i>
              <div>
                <strong>${item.title}:</strong>
                <span>${item.desc}</span>
              </div>
            </li>
          `
          )
          .join("");
      }

      contentDiv.style.opacity = "1";
    }, 220);
  }

  /* ==============================================================
     إدارة السلايدر وربط الكرت الفعّال (Active) بالوصف الجانبي
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
    const AUTO_PLAY_DELAY = 4000;
    let isHovered = false;
    let dots = [];

    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      cards.forEach((_, index) => {
        const dot = document.createElement("button");
        dot.type = "button";
        dot.className = "journey-dot";
        dot.setAttribute("aria-label", `المشروع ${index + 1}`);

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

      // تحديث الوصف الجانبي مرة واحدة فقط للمشروع الموجود في المنتصف (active)
      const activeProjectId = cards[currentIndex].getAttribute("data-project-id");
      if (activeProjectId) {
        updateMainContent(activeProjectId);
      }
    }

    // مراقب إضافي في حال قام global.js بتغيير الكرت الفعّال
    const observer = new MutationObserver(() => {
      const activeCard = slider.querySelector(".journey-card.active");
      if (activeCard) {
        const activeId = activeCard.getAttribute("data-project-id");
        if (activeId) updateMainContent(activeId);
      }
    });
    observer.observe(slider, { attributes: true, subtree: true, attributeFilter: ["class"] });

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
        if (index !== currentIndex) {
          currentIndex = index;
          updateCarousel();
          restartAutoPlay();
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
});
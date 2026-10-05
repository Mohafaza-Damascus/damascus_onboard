document.addEventListener("DOMContentLoaded", () => {
  const cards = Array.from(document.querySelectorAll(".journey-card"));
  const carousel = document.querySelector(".journey-carousel");

  
  const prevBtn =
    document.querySelector(".journey-arrow--prev") ||
    document.getElementById("journeyPrev");

  const nextBtn =
    document.querySelector(".journey-arrow--next") ||
    document.getElementById("journeyNext");

  const dotsContainer =
    document.querySelector(".journey-dots") ||
    document.getElementById("journeyDots");

  
  if (!cards.length) return;

  let currentIndex = 0;
  let dots = [];

  if (dotsContainer) {
    dotsContainer.innerHTML = ""; 
    cards.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "journey-dot";
      dot.type = "button";
      dot.setAttribute("aria-label", `الانتقال إلى الصورة ${index + 1}`);

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
    });

    const total = cards.length;

    cards[currentIndex].className = "journey-card active";

    if (total > 1) {
      cards[getIndex(1)].className = "journey-card next";
      cards[getIndex(-1)].className = "journey-card prev";
    }

    if (total > 3) {
      cards[getIndex(2)].className = "journey-card next2";
      cards[getIndex(-2)].className = "journey-card prev2";
    }

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToPrevious() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
  }

  // التبديل للتالي
  function goToNext() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
  }

  // ربط أحداث الأسهم
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
  const AUTO_PLAY_DELAY = 3000; 
  let autoPlay = setInterval(goToNext, AUTO_PLAY_DELAY);

  function restartAutoPlay() {
    clearInterval(autoPlay);
    autoPlay = setInterval(goToNext, AUTO_PLAY_DELAY);
  }

  if (carousel) {
    carousel.addEventListener("mouseenter", () => clearInterval(autoPlay));
    carousel.addEventListener("mouseleave", () => restartAutoPlay());
  }

  // تشغيل المعرض في البداية
  updateCarousel();

  document.addEventListener("DOMContentLoaded", () => {
  const flipCards = document.querySelectorAll(".flip-card");

  flipCards.forEach((card) => {
    // دعم النقر للقلب على أجهزة الموبايل واللمس
    card.addEventListener("click", function (e) {
      // إذا نقر المستخدم على رابط التفاصيل المباشر نتركه يفتح الرابط
      if (e.target.closest(".btn-card-details")) return;

      // للأجهزة اللمسية والشاشات الصغيرة
      if (window.innerWidth <= 1024) {
        // إغلاق الكروت الأخرى المفتوحة
        flipCards.forEach((otherCard) => {
          if (otherCard !== card) {
            otherCard.classList.remove("is-flipped");
          }
        });
        // قلب الكرت الحالي
        this.classList.toggle("is-flipped");
      }
    });
  });

  // إعادة ضبط الكروت عند تغيير حجم الشاشة للأكبر
  window.addEventListener("resize", () => {
    if (window.innerWidth > 1024) {
      flipCards.forEach((c) => c.classList.remove("is-flipped"));
    }
  });
});
});
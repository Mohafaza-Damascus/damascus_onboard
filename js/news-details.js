document.addEventListener("DOMContentLoaded", () => {
  const newsData = {
    1: {
      title: "نشاطات مديرية البيئة في محافظة دمشق",

      date: "10-10-2025",

      images: [
        "../images/newdata/1.jpeg",
        "../images/newdata/download (1).jfif",
        "../images/newdata/download.jfif",
      ],

      content:
        "تعلن مديرية البيئة في محافظة دمشق عن فتح باب التسجيل في النادي الصيفي البيئي المجاني لعام 2026، وذلك ضمن مجموعة الأنشطة والبرامج التي تهدف إلى تعزيز الوعي البيئي لدى أبناء المجتمع وتشجيع المشاركة في المبادرات التي تسهم في الحفاظ على البيئة وتحسين جودة الحياة. ويتضمن البرنامج مجموعة من الأنشطة التوعوية والتعليمية والترفيهية، إلى جانب فعاليات ميدانية تهدف إلى تعريف المشاركين بأهمية المحافظة على النظافة العامة والمساحات الخضراء وترشيد استخدام الموارد. وتأتي هذه المبادرة في إطار اهتمام محافظة دمشق بتعزيز الأنشطة المجتمعية والبيئية وإتاحة فرص المشاركة أمام مختلف الفئات العمرية، بما يسهم في بناء سلوك بيئي مسؤول وتعزيز التعاون بين المؤسسات والمجتمع.",
    },

    2: {
      title: "مجموعة أنشطة محافظة دمشق",

      date: "7-9-2025",

      images: [
        "../images/newdata/dj0002.jpeg",
        "../images/newdata/dj0004.jpeg",
        "../images/newdata/dj0006.jpeg",
        "../images/newdata/dj0008.jpeg",
        "../images/newdata/dj00011.jpeg",
      ],

      content:
        "انضموا إلينا في مسابقة ثقافية عن مدينة دمشق، حيث يمكنكم اختبار معلوماتكم عن تاريخ وثقافة دمشق والتعرف على جوانب جديدة من مدينتنا العريقة. استكشفوا الحرف التقليدية والفنون اليدوية التي تعكس تراثنا الثقافي الغني، وشاركوا في ورش العمل التي تعزز من مهاراتكم. لا تفوتوا الفرصة لزيارة جناحنا في مدينة المعارض، حيث نقدم لكم أحدث الابتكارات والمنتجات المحلية. كما نعمل على تحسين بيئتنا من خلال الإعلان عن مشاريع إزالة المولدات الكهربائية، مما يسهم في توفير الطاقة والحفاظ على البيئة.",
    },

    3: {
      title: "مجموعة قرارات محافظة دمشق",

      date: "5-9-2025",

      images: [
        "../images/newdata/1-1-1.jpeg",
        "../images/newdata/1-1.jpeg",
        "../images/newdata/1-22.jpeg",
        "../images/newdata/1-33.jpeg",
        "../images/newdata/1-2.jpeg",
        "../images/newdata/dj0003.jpeg",
        "../images/newdata/dj00013.jpeg",
        "../images/newdata/dj0005.jpeg",
      ],

      content:
        "تتضمن هذه المجموعة سلسلة إعلانات وتنويهات رسمية صادرة عن محافظة دمشق ووزارة الإدارة المحلية، تغطي جوانب خدمية وتنظيمية وإدارية متنوعة؛ حيث تشمل إعلانات لمزاد علني لبيع أرض تجارية بدمر، واستكمال أعمال صيانة الطرق بالقابون، وتكريم مهندسي النظافة بالقدم، إلى جانب مواعيد مراجعة المتقدمين لوظائف عمال وسائقي نظافة بكفرسوسة، وبيان توزيع بدلات الإيجار لمستحقي السكن البديل بماروتا سيتي. كما تضم التحديث التنظيمي لغربي البرامكة، ودعوة العاملين المفصولين لمراجعة الإدارة لاستكمال المقابلات، بالإضافة إلى توجيهات أمنية وتنظيمية بمنع بيع المفرقعات والألعاب النارية، وتمديد ساعات إغلاق الكافيهات والمنشآت السياحية حتى 3 صباحاً لمتابعة مباريات كأس العالم 2026.",
    },

    4: {
      title: "مديرية التنمية المحلية",

      date: "6-9-2025",

      images: [
        "../images/newdata/2.jpeg",
        "../images/newdata/3.jpeg",
        "../images/newdata/4.jpeg",
        "../images/newdata/5.jpeg",
        "../images/newdata/6.jpeg",
      ],

      content:
        "تقديراً لجهودهم المخلصة في الحفاظ على نظافة أحياء المدينة، كرّمت مديرية التنمية المحلية الأخوة مهندسي النظافة في مركز نظافة أمانة القدم. تأتي هذه المبادرة في إطار دعم وتعزيز كوادر النظافة وتشجيع الدور الحيوي الذي يقدمونه يومياً لخدمة المجتمع.",
    },

    5: {
      title: "الكهرباء في دمشق",

      date: "8-9-2025",

      images: [
        "../images/newdata/dj004.jpeg",
        "../images/newdata/dj006.jpeg",
        "../images/newdata/dj008.jpeg",
        "../images/newdata/dj009.jpeg",
        "../images/newdata/dj555.jpeg",
      ],

      content:
        "دعماً لواقع الكهرباء في حي القدم.. كهرباء دمشق قامت بمد خطوط توتر منخفض ووضع المركز بالخدمة، بما يعود بالنفع المثمر على الأهالي وتقديم الخدمات الأساسية في المنطقة.",
    },

    6: {
      title: "أعمال مديرية الإشراف في محافظة دمشق",

      date: "10-9-2025",

      images: [
        "../images/newdata/2-2.jpeg",
        "../images/newdata/3-2.jpeg",
        "../images/newdata/4-2.jpeg",
        "../images/newdata/5-2.jpeg",
        "../images/newdata/6-2.jpeg",
        "../images/newdata/7.jpeg",
      ],

      content:
        "في منطقة كفرسوسة.. قامت مديرية الصيانة بمحافظة دمشق بالتجهيز لأعمال تعبيد الطريق وتركيب المطريات، من أجل تقديم الخدمات الأساسية للسكان والأهالي.",
    },

    7: {
      title: "أعمال مديرية الصيانة في محافظة دمشق",

      date: "11-9-2025",

      images: [
        "../images/newdata/2-3.jpeg",
        "../images/newdata/3-3.jpeg",
        "../images/newdata/4-3.jpeg",
        "../images/newdata/5-3.jpeg",
        "../images/newdata/6-3.jpeg",
        "../images/newdata/7-2.jpeg",
      ],

      content:
        "خدمتكم مستمرة.. ومديرية الإشراف بمحافظة دمشق تواصل إشرافها على الأعمال والمشاريع الخدمية وهذه المرة من منطقة القابون، حيث يتم استكمال عمليات الصيانة الطرقية لخدمتكم.",
    },

    8: {
      title: "ثانوية اليرموك",

      date: "12-9-2025",

      images: [
        "../images/newdata/dj225.jpeg",
        "../images/newdata/dj262.jpeg",
        "../images/newdata/dj371.jpeg",
        "../images/newdata/dj173.jpeg",
        "../images/newdata/dj167.jpeg",
      ],

      content:
        "افتتح معاون وزير التربية والتعليم للشؤون التربوية السيد يوسف عنان برفقة معاون محافظ دمشق السيد ضياء الدين محمد ثانوية اليرموك في دمشق، بعد الانتهاء من إعادة تأهيلها وترميمها لتستقبل طلابنا مع بداية العام الدراسي الجديد، وذلك بحضور عدد من الفعاليات التربوية والمجتمعية. وتصل الطاقة الاستيعابية للمدرسة إلى نحو 600 طالب في الدوام الواحد، على أن تُستَثمَر بنظام الفوجين الصباحي والمسائي، بما يُلبي احتياجات الطلاب في المنطقة ويخفف الضغط عن المدارس المجاورة.",
    },
  };

  const params = new URLSearchParams(window.location.search);

  const newsId = params.get("id") || "1";

  const news = newsData[newsId];

  if (!news) {
    console.error(`الخبر رقم ${newsId} غير موجود`);

    return;
  }
  const title = document.getElementById("newsTitle");

  const breadcrumbTitle = document.getElementById("newsBreadcrumbTitle");

  const date = document.getElementById("newsDate");

  const content = document.getElementById("newsContent");

  const activeImage = document.getElementById("activeImage");

  const dotsContainer = document.getElementById("dotsContainer");

  const prevButton = document.getElementById("prevSlide");

  const nextButton = document.getElementById("nextSlide");

  const zoomButton = document.getElementById("zoomImage");

  if (title) {
    title.textContent = news.title;
  }

  if (breadcrumbTitle) {
    breadcrumbTitle.textContent = news.title;
  }

  if (date) {
    date.textContent = news.date;
  }

  if (content) {
    content.textContent = news.content;
  }
  let currentImageIndex = 0;

  function showImage(index) {
    if (!news.images || news.images.length === 0) {
      return;
    }

    currentImageIndex = (index + news.images.length) % news.images.length;

    if (activeImage) {
      activeImage.src = news.images[currentImageIndex];
    }

    updateDots();
  }
  function createDots() {
    if (!dotsContainer) {
      return;
    }

    dotsContainer.innerHTML = "";

    news.images.forEach((image, index) => {
      const dot = document.createElement("button");

      dot.type = "button";

      dot.className = "news-details-indicator";

      dot.setAttribute("aria-label", `الصورة ${index + 1}`);

      dot.addEventListener("click", () => showImage(index));

      dotsContainer.appendChild(dot);
    });

    updateDots();
  }
  function updateDots() {
    if (!dotsContainer) {
      return;
    }

    const dots = dotsContainer.querySelectorAll(".news-details-indicator");

    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentImageIndex);
    });
  }

  if (prevButton) {
    prevButton.addEventListener("click", () => {
      showImage(currentImageIndex - 1);
    });
  }
  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showImage(currentImageIndex + 1);
    });
  }
  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      showImage(currentImageIndex + 1);
    }

    if (event.key === "ArrowRight") {
      showImage(currentImageIndex - 1);
    }
  });

  if (zoomButton) {
    zoomButton.addEventListener("click", () => {
      if (!activeImage) {
        return;
      }

      if (document.fullscreenElement) {
        document.exitFullscreen();

        return;
      }

      if (activeImage.requestFullscreen) {
        activeImage.requestFullscreen();
      }
    });
  }
  const relatedNewsTrack = document.getElementById("relatedNewsTrack");

  const relatedPrev = document.getElementById("relatedPrev");

  const relatedNext = document.getElementById("relatedNext");

  let relatedCurrentIndex = 0;
  let relatedCardsPerView = 3;
  function getRelatedCardsPerView() {
    const width = window.innerWidth;

    if (width <= 650) {
      return 1;
    }

    if (width <= 900) {
      return 2;
    }

    return 3;
  }

  function updateRelatedSlider() {
    if (!relatedNewsTrack) {
      return;
    }

    const viewport = relatedNewsTrack.parentElement;

    if (!viewport) {
      return;
    }

    const cards = relatedNewsTrack.querySelectorAll(".news-card");

    if (!cards.length) {
      if (relatedPrev) {
        relatedPrev.disabled = true;
      }

      if (relatedNext) {
        relatedNext.disabled = true;
      }

      return;
    }
    relatedCardsPerView = getRelatedCardsPerView();
    const viewportWidth = viewport.clientWidth;
    const trackStyle = window.getComputedStyle(relatedNewsTrack);

    const gap =
      parseFloat(trackStyle.columnGap) || parseFloat(trackStyle.gap) || 0;
    const totalGap = gap * (relatedCardsPerView - 1);

    const cardWidth = (viewportWidth - totalGap) / relatedCardsPerView;
    cards.forEach((card) => {
      card.style.width = `${cardWidth}px`;

      card.style.minWidth = `${cardWidth}px`;

      card.style.maxWidth = `${cardWidth}px`;

      card.style.flex = `0 0 ${cardWidth}px`;
    });

    const maxIndex = Math.max(0, cards.length - relatedCardsPerView);

    if (relatedCurrentIndex > maxIndex) {
      relatedCurrentIndex = maxIndex;
    }
    const translateX = relatedCurrentIndex * (cardWidth + gap);

    relatedNewsTrack.style.transform = `translate3d(${translateX}px, 0, 0)`;
    if (relatedPrev) {
      relatedPrev.disabled = relatedCurrentIndex <= 0;
    }

    if (relatedNext) {
      relatedNext.disabled = relatedCurrentIndex >= maxIndex;
    }
  }

  function renderRelatedNews() {
    if (!relatedNewsTrack) {
      return;
    }

    relatedNewsTrack.innerHTML = "";

    const relatedNews = Object.entries(newsData).filter(
      ([id]) => id !== String(newsId),
    );

    relatedNews.forEach(([id, item]) => {
      const card = document.createElement("article");

      card.className = "news-card news-card--model-5";

      const coverImage =
        item.images && item.images.length
          ? item.images[0]
          : "../images/Rectangle 40.png";

      card.innerHTML = `

                <div class="news-card__img-wrap">

                    <img
                        src="${coverImage}"
                        alt="${item.title}"
                        class="news-card__img"
                    />

                </div>


                <div class="news-card__body">

                    <div class="news-card__date-wrap">

                        <img
                            src="../images/Calendar (1).png"
                            alt=""
                            class="calendar-icon"
                        />

                        <span class="news-card__date">
                            ${item.date}
                        </span>

                    </div>


                    <h3 class="news-card__title">
                        ${item.title}
                    </h3>


                    <p class="news-card__text">
                        ${item.content}
                    </p>

                </div>


                <a
                    href="news-details.html?id=${id}"
                    class="news-card__btn news-card__btn--model-5"
                >

                    <span>
                        اقرأ المزيد
                    </span>

                    <img
                        src="../images/Advance.png"
                        alt=""
                        class="news-card__arrow"
                    />

                </a>

            `;

      relatedNewsTrack.appendChild(card);
    });

    relatedCurrentIndex = 0;

    requestAnimationFrame(() => {
      updateRelatedSlider();
    });
  }

  if (relatedPrev) {
    relatedPrev.addEventListener("click", () => {
      if (relatedCurrentIndex > 0) {
        relatedCurrentIndex--;

        updateRelatedSlider();
      }
    });
  }

  if (relatedNext) {
    relatedNext.addEventListener("click", () => {
      if (!relatedNewsTrack) {
        return;
      }

      const cards = relatedNewsTrack.querySelectorAll(".news-card");

      const maxIndex = Math.max(0, cards.length - relatedCardsPerView);

      if (relatedCurrentIndex < maxIndex) {
        relatedCurrentIndex++;

        updateRelatedSlider();
      }
    });
  }

  window.addEventListener("resize", () => {
    requestAnimationFrame(() => {
      updateRelatedSlider();
    });
  });

  createDots();

  showImage(0);

  renderRelatedNews();
});

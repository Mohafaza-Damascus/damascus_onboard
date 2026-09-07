const images = [
  "../images/Rectangle 40.png",
  "../images/Rectangle 40.png",
  "../images/Rectangle 40.png",
  "../images/Rectangle 40.png"
];

let currentIndex = 0;

const activeImage = document.getElementById("activeImage");
const prevBtn = document.getElementById("prevSlide");
const nextBtn = document.getElementById("nextSlide");
const dotsContainer = document.getElementById("dotsContainer");
const zoomBtn = document.getElementById("zoomImage");


function updateCarousel() {

  activeImage.src = images[currentIndex];

  const dots =
    dotsContainer.querySelectorAll(".news-details-indicator");


  dots.forEach((dot, index) => {

    dot.classList.toggle(
      "active",
      index === currentIndex
    );

  });

}


function goToSlide(index) {

  currentIndex = index;

  updateCarousel();

}


function initCarousel() {

  dotsContainer.innerHTML = "";


  images.forEach((_, index) => {

    const dot =
      document.createElement("button");


    dot.type = "button";

    dot.className =
      "news-details-indicator";


    if (index === currentIndex) {

      dot.classList.add("active");

    }


    dot.setAttribute(
      "aria-label",
      `الانتقال إلى الصورة ${index + 1}`
    );


    dot.addEventListener(
      "click",
      () => goToSlide(index)
    );


    dotsContainer.appendChild(dot);

  });


  updateCarousel();

}


prevBtn.addEventListener(
  "click",
  () => {

    currentIndex =
      (currentIndex - 1 + images.length)
      % images.length;

    updateCarousel();

  }
);


nextBtn.addEventListener(
  "click",
  () => {

    currentIndex =
      (currentIndex + 1)
      % images.length;

    updateCarousel();

  }
);


/* تكبير الصورة */

zoomBtn.addEventListener(
  "click",
  () => {

    if (
      document.fullscreenElement
    ) {

      document.exitFullscreen();

      return;

    }


    const wrapper =
      document.querySelector(
        ".news-details-image-wrapper"
      );


    if (wrapper.requestFullscreen) {

      wrapper.requestFullscreen();

    }

  }
);


initCarousel();

const carousel = () => {
  let carouselMap = [];

  let carousels = Array.from(document.getElementsByClassName("carousel"));
  carousels.forEach((carousel, carouselIndex) => {
    let carouselInstance = {
      instanceId: carouselIndex,
      elementRef: carousel,
      currentSlide: 0,
      previousButton: null,
      nextButton: null,
      carouselContent: null,
      slideMap: []
    };
    let carouselComponents = Array.from(carousel.children);
    carouselComponents.forEach(component => {
      cList = Array.from(component.classList);
      if (cList.find(c => c === "previous-button")) {
        carouselInstance.previousButton = component;
        const popSlide = () => {
          carouselInstance.currentSlide =
          carouselInstance.currentSlide > 0
            ? (carouselInstance.currentSlide -= 1)
            : carouselInstance.slideMap.length - 1;
          updateSlide(carouselInstance.currentSlide, carouselInstance.slideMap);
        }
        carouselInstance.previousButton.addEventListener("click", () => {
          popSlide();
        });
      } else if (cList.find(c => c === "next-button")) {
        carouselInstance.nextButton = component;
        const addSlide = () => {
          carouselInstance.currentSlide =
          carouselInstance.currentSlide < carouselInstance.slideMap.length - 1
            ? (carouselInstance.currentSlide += 1)
            : 0;
          updateSlide(carouselInstance.currentSlide, carouselInstance.slideMap);
        }
        setInterval(addSlide, 5000);
        carouselInstance.nextButton.addEventListener("click", () => {
          addSlide();
        });
      } else {
        carouselInstance.carouselContent = component;
      }
      let slideList = Array.from(carouselInstance.carouselContent.children);
      slideList.forEach((slide, index) => {
          slide.id = "slide-" + carouselIndex + "-" + index;
          slide.style.display = index === carouselInstance.currentSlide ? "flex" : "none";
        }
      );
      carouselInstance.slideMap = slideList.map((slide, index) => {
        return {
          id: index,
          idLabel: slide.id
        };
      });
      carouselMap.push(carouselInstance);
    });
  });

  let updateSlide = (currentSlide, slideMap) => {
    slideMap.forEach(slide => {
      let slideRef = document.getElementById(slide.idLabel);
      slideRef.style.display = slide.id === currentSlide ? "flex" : "none";
    });
  };
};

carousel();

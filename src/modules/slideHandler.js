const slideHandler = () => {

    const slideCollection = document.querySelectorAll(".portfolio-item"),
        slideButtons = document.querySelectorAll("portfolio-btn"),
        slideParent = document.querySelector(".portfolio-content");

    let slidePoints = document.querySelectorAll(".dot");

    let currentSlide = 0;
    let slideInterval;
    // auto-play
    const toggleActiveElement = (element, strClass) => element.classList.toggle(strClass);
    const autoPlaySlide = () => {
        // Отключаем текущий слайд
        toggleActiveElement(slideCollection[currentSlide], "portfolio-item-active");
        toggleActiveElement(slidePoints[currentSlide], "dot-active");

        currentSlide++;
        if (currentSlide >= slideCollection.length) {
            currentSlide = 0;
        }
        // Переключаем на новый слайд
        toggleActiveElement(slideCollection[currentSlide], "portfolio-item-active");
        toggleActiveElement(slidePoints[currentSlide], "dot-active");
    };
    const startSlider = (time = 1500) => slideInterval = setInterval(autoPlaySlide, 1500);
    const stopSlider = () => clearInterval(slideInterval);

    slideParent.addEventListener("click", event => {
        event.preventDefault();
        const target = event.target;

        if (!target.matches(".portfolio-btn, .dot")) {
            return;
        }

        // Отключаем текущий слайд
        toggleActiveElement(slideCollection[currentSlide], "portfolio-item-active");
        toggleActiveElement(slidePoints[currentSlide], "dot-active");

        if (target.matches("#arrow-right")) {
            currentSlide++;
        } else if (target.matches("#arrow-left")) {
            currentSlide--;
        } else if (target.matches(".dot")) {
            currentSlide = [...target.parentNode.children].indexOf(target);
        }

        if (currentSlide >= slideCollection.length) {
            currentSlide = 0;
        } else if (currentSlide < 0) {
            currentSlide = slideCollection.length - 1;
        }
        // Переключаем на новый слайд
        toggleActiveElement(slideCollection[currentSlide], "portfolio-item-active");
        toggleActiveElement(slidePoints[currentSlide], "dot-active");
    });
    slideParent.addEventListener("mouseover", event => {
        if (event.target.matches(".portfolio-btn, .dot")) {
            stopSlider();
        }


    });
    slideParent.addEventListener("mouseout", event => {
        if (event.target.matches(".portfolio-btn, .dot")) {
            startSlider();
        }
    });

    const addSlidePoints = () => {
        slideCollection.forEach((item, index) => {
            const li = document.createElement("li");
            li.classList.add("dot");
            if (index === 0) {
                li.classList.add("dot-active");
            }
            document.querySelector(".portfolio-dots").append(li);
        });
        slidePoints = document.querySelectorAll(".dot");
    };

    addSlidePoints();
    startSlider(1500);

};
export default slideHandler;
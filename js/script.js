"use strict";
window.addEventListener("DOMContentLoaded", () => {
    const hoursTimer = document.querySelector("#timer-hours");
    const minutesTimer = document.querySelector("#timer-minutes");
    const secondsTimer = document.querySelector("#timer-seconds");

    const getTimeLeft = deadline => {
        const
            dateStop = new Date(deadline).getTime(),
            dateNow = new Date().getTime(),
            dateDifference = (dateStop - dateNow) / 1000, // в секундах
            hours = Math.floor(dateDifference / 3600),
            minutes = Math.floor((dateDifference / 60) % 60),
            seconds = Math.floor(dateDifference % 60);

        return {
            dateDifference,
            hours,
            minutes,
            seconds
        };
    };

    const updateLeftTime = deadline => { // main
        const dateLeft = getTimeLeft(deadline);
        if (dateLeft.dateDifference > 0) { // чтобы не было отрицательных значений
            hoursTimer.textContent = dateLeft.hours > 9 ? `${dateLeft.hours}` : `0${dateLeft.hours}`;
            minutesTimer.textContent = dateLeft.minutes > 9 ? `${dateLeft.minutes}` : `0${dateLeft.minutes}`;
            secondsTimer.textContent = dateLeft.seconds > 9 ? `${dateLeft.seconds}` : `0${dateLeft.seconds}`;
        } else {
            hoursTimer.textContent = "00";
            minutesTimer.textContent = "00";
            secondsTimer.textContent = "00";
        }
    };
    setInterval(updateLeftTime, 1000, "30 jun 2020"); // рандомные цифры
    // setInterval(updateLeftTime, 1000, "28 jun 2020"); // отрицательное значение

    const smoothScroll = scrollToElement => scrollToElement.scrollIntoView({
        block: "center",
        behavior: "smooth"
    });
    const applyCountUpAnimation = (target, number) => {
        const anim = {
            id: -1,
            progress: +target.textContent,
            duration: 2000, // продолжительность анимации
            direction: true // направление (увеличение/уменьшение)
        };

        if (target.textContent > number) {
            /* если текущее значение total больше рассчитанного в калькуляторе 
                (т.е пользователь уменьшил общую оплату) */
            anim.direction = false;
        }

        const startTick = performance.now();
        anim.id = requestAnimationFrame(function animate(currentTick) {
            if (currentTick - startTick > anim.duration) {
                return cancelAnimationFrame(anim.id);
            }
            let timeCount = Math.ceil((currentTick - startTick) % anim.duration);

            let newProgressValue = anim.progress + (anim.direction ? timeCount : -timeCount);

            if ((anim.direction && newProgressValue > number) || (!anim.direction && newProgressValue <= number)) {
                anim.progress = number;
                cancelAnimationFrame(anim.id);
            } else {
                anim.progress = newProgressValue;
                anim.id = requestAnimationFrame(animate);
            }
            target.textContent = anim.progress;
        });
    };
    // Меню
    const toggleMenu = () => {
        const menu = document.querySelector("menu");

        const menuAction = () => menu.classList.toggle('active-menu');

        document.body.addEventListener("click", event => {
            let target = event.target;

            if (target.classList.contains("close-btn") || target.closest(".menu")) { // закрытие/открытие меню
                return menuAction();
            }

            if (!target.closest(".active-menu") && menu.classList.contains("active-menu")) {
                // закрытие меню (когда нажимаешь вне окна)
                return menuAction();
            } else {
                target = target.closest("menu>ul>li>a");
                if (target) { // Если это элемент из списка навигации

                    event.preventDefault(); // отменяем событие якоря
                    smoothScroll(document.querySelector(target.hash));
                    menuAction();
                    // делаем плавный скролл
                }
            }

        });
    };
    toggleMenu();

    // mouse (переход на другой слайд)
    const mouseAction = () => {
        const mouseScroll = document.querySelector("a[href='#service-block']");
        mouseScroll.addEventListener("click", () => {
            event.preventDefault(); // отменяем событие якоря
            smoothScroll(document.querySelector(mouseScroll.hash));
        });
    };
    mouseAction();
    // popup

    const togglePopUp = () => {
        const
            popUp = document.querySelector(".popup"),
            popUpButtonsOpen = document.querySelectorAll(".popup-btn");

        let
            popUpAnimID = -1,
            popUpOpacityValue = 0;

        const applyPopUpAnimation = () => {
            if (popUpOpacityValue >= 1.5) {
                popUpOpacityValue = 0;
                return cancelAnimationFrame(popUpAnimID);
            }
            popUpOpacityValue += 0.014;
            popUp.style.opacity = popUpOpacityValue;

            popUpAnimID = requestAnimationFrame(applyPopUpAnimation);
        };
        popUpButtonsOpen.forEach(button => button.addEventListener("click", () => {
            popUp.style.display = "block";
            if (document.body.clientWidth >= 768) { // ограничение, (от 768 px)
                applyPopUpAnimation();
            }
        }));
        popUp.addEventListener("click", event => {
            let target = event.target;
            if (target.classList.contains("popup-close")) {
                popUp.style.display = "none";
            } else {
                target = target.closest(".popup-content");
                if (!target) { // если нажали за пределами нашего окна, то закрываем окно
                    popUp.style.display = "none";
                }
            }
        });
    };

    togglePopUp();

    // табы
    const tabsHandler = () => {
        const
            serviceHeader = document.querySelector(".service-header"),
            serviceHeaderList = serviceHeader.querySelectorAll(".service-header-tab"),
            serviceTabContent = document.querySelectorAll(".service-tab");

        const changeTabContent = (targetIndex) => {
            serviceTabContent.forEach((content, i) => {
                if (targetIndex === i) {
                    content.classList.remove("d-none");
                    serviceHeaderList[i].classList.add("active"); // делаем выделение
                } else {
                    content.classList.add("d-none");
                    serviceHeaderList[i].classList.remove("active"); // убираем выделение
                }
            });
        };

        serviceHeader.addEventListener("click", event => {
            let target = event.target.closest(".service-header-tab");

            if (target) {
                changeTabContent([...serviceHeaderList].indexOf(target));
            }

        });
    };

    tabsHandler();

    // слайдер

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
    slideHandler();
    // Блок команда (переключение изображений)
    const teamPhotoHandler = () => {
        const teamBlock = document.querySelector(".command>.container>.row");

        const changeTeamPhoto = event => {
            const target = event.target;

            if (target.classList.contains("command__photo")) {
                let copySrc = target.src;
                target.src = target.dataset.img;
                target.dataset.img = copySrc;
            }

        };
        teamBlock.addEventListener("mouseover", changeTeamPhoto);
        teamBlock.addEventListener("mouseout", changeTeamPhoto);
    };
    teamPhotoHandler();
    // Блок калькулятор
    const calculaterHandler = (price = 100) => {
        const calculaterBlock = document.querySelector(".calc-block"),
            calculateType = document.querySelector(".calc-type"), // тип объекта
            calculateSquare = document.querySelector(".calc-square"), // площадь объекта
            calculateDay = document.querySelector(".calc-day"), // срок исполнения
            calculateCount = document.querySelector(".calc-count"), // срок исполнения
            totalValue = document.getElementById("total"); // срок исполнения


        const calculateSum = () => {
            let totalSum = 0;
            const typeValue = +calculateType.value,
                squareValue = +calculateSquare.value;

            let countValue = 1,
                dayValue = 1;

            if (calculateCount.value > 1) {
                countValue += (calculateCount.value - 1) / 10;
            }

            if (calculateDay.value && calculateDay.value < 5) {
                dayValue *= 2;
            } else if (calculateDay.value && calculateDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                totalSum = Math.ceil(price * typeValue * squareValue * countValue * dayValue);
                applyCountUpAnimation(totalValue, totalSum);
            }
        };
        calculaterBlock.addEventListener("change", event => {
            const target = event.target;

            if (target.tagName === "INPUT" || target.tagName === "SELECT") {
                calculateSum();
            }

        });
    };
    calculaterHandler(100);

    // send-ajax-form

    const formHandler = () => {
        // messages
        const errorMessage = "Что-то пошло не так",
            successMessage = "Спасибо! Ваша заявка отправлена на обработку";

        const allForms = document.querySelectorAll("form");

        const statusMessage = document.createElement("div");
        statusMessage.style.cssText = "font-size: 2rem;";


        const applyAnimPreloader = form => {
            form.insertAdjacentHTML("beforeend",`   
                <div class="spinner">
                    <div class="cube1"></div>
                    <div class="cube2"></div>
                </div>`);
        };
        const postData = body => {
            return new Promise( (resolve, reject) => {
                const request = new XMLHttpRequest();

                request.addEventListener("readystatechange", () => {

                    if (request.readyState !== 4) {
                        return;
                    }
                    if (request.status === 200) {
                        resolve();
                    } else {
                        reject(request.status);
                    }
                });

                request.open("POST", "../server.php");
                request.setRequestHeader("Content-Type", "application/json");
                request.send(JSON.stringify(body));
            });
        };

        document.body.addEventListener("submit", event => {
            if(event.target.tagName.toLowerCase() !== "form") {
                return;
            }
            event.preventDefault();

            const form = event.target;

            // Удаляем старое сообщение состояние запроса, перед созданием нового сообщения
            if(statusMessage === form.lastElementChild) {
                form.lastElementChild.remove();
                statusMessage.textContent = "";
            }
            
            form.append(statusMessage);
            applyAnimPreloader(form);
            const formData = new FormData(form);
            let body = {};

            formData.forEach((val, key) => {
                body[key] = val;
            });

            postData(body)
            .then(() => {
                statusMessage.textContent = successMessage;
                form.lastElementChild.remove();
                [...form.querySelectorAll("input")].forEach( item => {
                    if(item.tagName.toLowerCase() === "input") {
                        item.value = "";
                    }
                });
            })
            .catch(error => {
                statusMessage.textContent = errorMessage;
                console.error(error);
                [...form.querySelectorAll("input")].forEach( item => {
                    if(item.tagName.toLowerCase() === "input") {
                        item.value = "";
                    }
                });
            });
        });

    };

    formHandler();
});
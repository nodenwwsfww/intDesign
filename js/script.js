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

    const smoothScroll = (scrollToElement) => scrollToElement.scrollIntoView({block: "center", behavior: "smooth"});
    // Меню
    const toggleMenu = () => {
        const menu = document.querySelector("menu");
        
        const menuAction = () => menu.classList.toggle('active-menu');

        document.body.addEventListener("click", event => {
            let target = event.target;

            if(target.classList.contains("close-btn") || target.closest(".menu")) { // закрытие/открытие меню
                return menuAction();
            }

            target = target.closest("menu>ul>li>a");
            if(target) { // Если это элемент из списка навигации

                event.preventDefault(); // отменяем событие якоря
                smoothScroll(document.querySelector(target.hash));
                menuAction();
                // делаем плавный скролл
            } else if(menu.classList.contains("active-menu")) { // закрытие меню (когда нажимаешь вне окна)
                     menuAction();
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
            if(popUpOpacityValue >= 1.5) {
                popUpOpacityValue = 0;
                return cancelAnimationFrame(popUpAnimID);
            }
            popUpOpacityValue += 0.014;
            popUp.style.opacity = popUpOpacityValue;

            popUpAnimID = requestAnimationFrame(applyPopUpAnimation);
        };
        popUpButtonsOpen.forEach(button => button.addEventListener("click", () => {
            popUp.style.display = "block"; 
            if(document.body.clientWidth >= 768) { // ограничение, (от 768 px)
                applyPopUpAnimation();
            }
        }));
        popUp.addEventListener("click", event => {
            let target = event.target;
            if(target.classList.contains("popup-close")) {
                popUp.style.display = "none";
            } else {
                target = target.closest(".popup-content");
                if(!target) { // если нажали за пределами нашего окна, то закрываем окно
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
            serviceTabContent.forEach( (content, i) => {
                if(targetIndex === i) {
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

            if(target) {
                changeTabContent( [...serviceHeaderList].indexOf(target) );
            }

        });
    };
        
    tabsHandler();
});



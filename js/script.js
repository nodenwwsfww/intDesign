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

    // Меню
    const toggleMenu = () => {
        const buttonMenuOpen = document.querySelector(".menu"),
            menu = document.querySelector("menu"),
            buttonMenuClose = document.querySelector(".close-btn"),
            menuItems = menu.querySelectorAll("ul>li"),

            mouseScroll = document.querySelector("a[href='#service-block']");

        const menuAction = () => menu.classList.toggle('active-menu');
        const smoothScroll = (scrollToElement) => scrollToElement.scrollIntoView({block: "center", behavior: "smooth"});
        buttonMenuOpen.addEventListener("click", menuAction);
        buttonMenuClose.addEventListener("click", menuAction);
        menuItems.forEach(
            item => item.addEventListener("click", (event) => {
                event.preventDefault(); // отменяем событие якоря
                smoothScroll(document.querySelector(item.firstChild.hash));
                menuAction();
                // делаем плавный скролл
            }
        ));
        mouseScroll.addEventListener("click", () => {
            event.preventDefault(); // отменяем событие якоря
            smoothScroll(document.querySelector(mouseScroll.hash));
        });
    };

    toggleMenu();

    // popup

    const togglePopUp = () => {
        const 
            popUp = document.querySelector(".popup"),
            popUpButtonsOpen = document.querySelectorAll(".popup-btn"),
            popUpButtonClose = document.querySelector(".popup-close");

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
        popUpButtonClose.addEventListener("click", () => popUp.style.display = "none");
    };

    togglePopUp();
});



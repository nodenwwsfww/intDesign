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
export default togglePopUp;
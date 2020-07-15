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
export default tabsHandler;
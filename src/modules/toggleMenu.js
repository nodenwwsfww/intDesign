// Меню
import scrollIntoView from "scroll-into-view";
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

                const scrollElement = document.querySelector(target.hash);
                scrollIntoView(scrollElement, {
                    block: "center",
                    behavior: "smooth"
                });
                menuAction();
                // делаем плавный скролл
            }
        }

    });
};
export default toggleMenu;
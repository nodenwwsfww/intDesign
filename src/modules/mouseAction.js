// Мышка скролл
import scrollIntoView from "scroll-into-view";
const mouseAction = () => {
    const mouseScroll = document.querySelector("a[href='#service-block']");
    mouseScroll.addEventListener("click", () => {
        event.preventDefault(); // отменяем событие якоря
        
        const scrollElement = document.querySelector(mouseScroll.hash);
        scrollIntoView(
            scrollElement,
            {
            block: "center",
            behavior: "smooth"
        });
    });
};
export default mouseAction;
const calculaterHandler = (price = 100) => {
    const calculaterBlock = document.querySelector(".calc-block"),
        calculateType = document.querySelector(".calc-type"), // тип объекта
        calculateSquare = document.querySelector(".calc-square"), // площадь объекта
        calculateDay = document.querySelector(".calc-day"), // срок исполнения
        calculateCount = document.querySelector(".calc-count"), // срок исполнения
        totalValue = document.getElementById("total"); // срок исполнения


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
export default calculaterHandler;
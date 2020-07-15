// Таймер до конца распродажи/акции
const countTimer = () => {
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
    setInterval(updateLeftTime, 1000, "17 july 2020"); // рандомные цифры
};
export default countTimer;

"use strict";
const dayTypeText = document.querySelector('#day-type');
const weekDayText = document.querySelector('#weekday');
const currentTimeText = document.querySelector('#now-time');
const newYearLeftText = document.querySelector('#newyear-left');

const updateDateInfo = () => {
    const updateDayType = date => {
        let dayType;
        let endCharacters;

        const h = date.getHours();

        if (h >= 0 && h <= 5) {
            dayType = 'ночь';
            endCharacters = 'ой';
        } else if (h >= 6 && h <= 10) {
            dayType = 'утро';
            endCharacters = 'ое';
        } else if (h >= 11 && h <= 15) {
            dayType = 'день';
            endCharacters = 'ый';
        } else {
            dayType = 'вечер';
            endCharacters = 'ый';
        }
        dayTypeText.innerHTML = `Добр${endCharacters} ${dayType}<br>`;
    };
    const updateWeekDay = date => {
        const day = date.getDay();
		let dayName;
        switch (day) {
            case 1: {
                dayName = 'Понедельник';
                break;
            }
            case 2: {
                dayName = 'Вторник';
                break;
            }
            case 3: {
                dayName = 'Среда';
                break;
            }
            case 4: {
                dayName = 'Четверг';
                break;
            }
            case 5: {
                dayName = 'Пятница';
                break;
            }
            case 6: {
                dayName = 'Суббота';
                break;
            }
            default: {
                dayName = 'Воскресенье';
                break;
            }
        }
		weekDayText.innerHTML = `Сегодня: ${dayName}<br>`;
    };

    const updateCurrentTime = date => {
        let h = date.getHours();
        let m = date.getMinutes();
        let s = date.getSeconds();
        currentTimeText.innerHTML = null; // обнуляем перед использованием
        currentTimeText.innerHTML += "Текущее время:";
        currentTimeText.innerHTML += h > 9 ? `${h}:` : `0${h}:`;
        currentTimeText.innerHTML += m > 9 ? `${m}:` : `0${m}:`;
        currentTimeText.innerHTML += s > 9 ? `${s}` : `0${s}`;
        currentTimeText.innerHTML += h >= 12 ? ' PM' : ' AM';
        currentTimeText.innerHTML += "<br>";
    };

    const updateNewYearLeftDays = date => { // проверка високосный год
        const isLeapYear = year => new Date(year, 1, 29).getMonth() === 1;

        newYearLeftText.innerHTML = `До нового года осталось: 
        ${ 365 + (isLeapYear(date.getFullYear()) ? 1 : 0) - (date.getMonth(0 + 1)) * 30 - date.getDate()} дней`;
    };

    const now = new Date();
    updateDayType(now);
    updateWeekDay(now);
    updateCurrentTime(now);
    updateNewYearLeftDays(now);
};
setInterval(updateDateInfo, 1000);

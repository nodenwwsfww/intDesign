
"use strict";
import "@babel/polyfill";

import "element-remove-polyfill";
import "mdn-polyfills/Node.prototype.append";

import "es6-promise";
import "fetch-polyfill";
import "formdata-polyfill";
import elementClosest from "element-closest";
elementClosest(window);
import "nodelist-foreach-polyfill";

import countTimer from "./modules/countTimer.js";
import mouseAction from "./modules/mouseAction.js";
import toggleMenu from "./modules/toggleMenu.js";
import togglePopUp from "./modules/togglePopUp.js";
import tabsHandler from "./modules/tabsHandler.js";
import slideHandler from "./modules/slideHandler.js";

import teamPhotoHandler from "./modules/teamPhotoHandler.js";
import calculaterHandler from "./modules/calculaterHandler.js";
import formHandler from "./modules/formHandler.js";

// Таймер до конца распродажи/акции
countTimer();

// mouse (scrolling)
mouseAction();

// Меню
toggleMenu();

// popup
togglePopUp();

// табы
tabsHandler();

// слайдер
slideHandler();

// Блок команда (переключение изображений)
teamPhotoHandler();

// Блок калькулятор
calculaterHandler(100);

// send-ajax-form
formHandler();
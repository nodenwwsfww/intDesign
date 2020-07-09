"use strict";
class Validator {
    constructor({
        selector,
        pattern = {},
        method
    }) {
        this.form = document.querySelector(selector);

        this._formElements = [...this.form].filter
        (elem => elem.tagName.toLowerCase() !== "button" && elem.type !== "button");

        this._pattern = pattern;
        this._method = method;
        this._errors = new Set();
    }

    init() {
        this.applyStyle();
        this.setPattern();
        this._formElements.forEach(elem => elem.addEventListener("change", this.checkIt.bind(this)));
        this.form.addEventListener("submit", event => {
            if(this._errors.size) {
                event.preventDefault();
            }
            this._formElements.forEach(elem => this.checkIt({target: elem, submitEvent: event}));
        });
    }

    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                return elem.value.trim();
            },
            pattern(elem, pattern) {
                return pattern.test(elem.value);
            }
        };
        if(this._method) {
            const method = this._method[elem.id];
            if(method) {
                return method.every(item => validatorMethod[item[0]](elem, this._pattern[item[1]]));
            }
        } else {
            console.warn("Не передан method [validator.js]");
        }
        return true;
    }
    checkIt(event) {
        const target = event.target;
        if (this.isValid(target)) {
            this.showSuccess(target);
            this._errors.delete(target);
        } else {
            if(event.submitEvent) {
                event.submitEvent.preventDefault();
            }
            this.showError(target);
            this._errors.add(target);
        }
    }
    showError(elem) {
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains("validator-error")) {
            return;
        }
        elem.classList.remove("success");
        elem.classList.add("error");
        const errorDiv = document.createElement("div");
        errorDiv.textContent = "В данном поле допущена ошибка";
        errorDiv.classList.add("validator-error");
        elem.insertAdjacentElement("afterend", errorDiv);
    }

    showSuccess(elem) {
        elem.classList.remove("error");
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains("validator-error")) {
            elem.nextElementSibling.remove();
        }
        elem.classList.add("success");
    }

    applyStyle() {
        const style = document.createElement("style");
        document.head.appendChild(style);
        style.textContent = `
            input.success {
                border: 2px solid green;
            }
            input.error {
                border: 2px solid red;
            }
            .validator-error {
                font-size: 12px;
                font-family: sans-serif;
                color: red;

            }`;
    }

    setPattern() {
        this._pattern.phone = this._pattern.phone ? this._pattern.phone : /^(\+)?[783]([-()]*\d){10}$/;
        this._pattern.email = this._pattern.email ? this._pattern.email : /^\w+@+\w+\.\w{1,3}$/;
    }

}
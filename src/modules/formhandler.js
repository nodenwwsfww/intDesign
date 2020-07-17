const formHandler = () => {
    // messages
    const errorMessage = "Что-то пошло не так",
        successMessage = "Спасибо! Ваша заявка отправлена на обработку";

    const allForms = document.querySelectorAll("form");

    const statusMessage = document.createElement("div");
    statusMessage.style.cssText = "font-size: 2rem;";


    const applyAnimPreloader = form => {
        form.insertAdjacentHTML("beforeend", `   
            <div class="spinner">
                <div class="cube1"></div>
                <div class="cube2"></div>
            </div>`);
    };
    const postData = body => {
        return fetch("../server.php", {
            method: "POST",
            mode: "same-origin",
            cache: "default",
            headers: {
                "Form-Data": "multipart/form-data"
            },
            credentials: "include",
            body: body, // formData
        });
    };

    const isEmptyFields = form => {
        /* Проверка данных формы на пустоту */
        let emptyStatus = false;
        [...form.querySelectorAll("input")].forEach(item => {
            if (item.tagName.toLowerCase() !== "input") return;

            if (!item.value.trim()) {
                item.style.border = "2px solid red";
                emptyStatus = true;
            } else {
                item.style.border = "";
            }
        });

        return emptyStatus;
    };

    document.body.addEventListener("submit", event => {
        if (event.target.tagName.toLowerCase() !== "form") {
            return;
        }
        event.preventDefault();

        const form = event.target;

        if (isEmptyFields(form)) {
            return;
        }

        // Удаляем старое сообщение состояние запроса, перед созданием нового сообщения
        if (statusMessage === form.lastElementChild) {
            form.lastElementChild.remove();
            statusMessage.textContent = "";
        }

        form.append(statusMessage);
        applyAnimPreloader(form);

        postData(new FormData(form))
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("invalid server response status");
                }
                statusMessage.textContent = successMessage;
                form.lastElementChild.remove();
            })
            .catch(error => {
                statusMessage.textContent = errorMessage;
                console.error(error);
            })
            .finally(() => {
                [...form.querySelectorAll("input")].forEach(item => {
                    if (item.tagName.toLowerCase() === "input") {
                        item.value = "";
                    }
                });
            });
    });

};
export default formHandler;
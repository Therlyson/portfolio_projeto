var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class FormSubmit {
    constructor(settings) {
        this.settings = settings;
        this.form = document.querySelector(this.settings.form);
        this.formButton = document.querySelector(this.settings.button);
        // Adiciona contêiner de mensagens
        if (this.form) {
            this.url = this.form.getAttribute("action");
            this.messageContainer = document.createElement("div");
            this.messageContainer.className = "form-message";
            this.form.appendChild(this.messageContainer);
        }
        else {
            this.url = null;
            this.messageContainer = null;
        }
        this.sendForm = this.sendForm.bind(this);
    }
    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }
    displayMessage(message) {
        if (this.messageContainer) {
            this.messageContainer.innerHTML = message;
        }
    }
    displaySuccess() {
        this.displayMessage(this.settings.success);
    }
    displayError() {
        this.displayMessage(this.settings.error);
    }
    clearFormFields() {
        if (this.form) {
            const inputs = this.form.querySelectorAll("[name]");
            inputs.forEach(input => {
                if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
                    input.value = ''; // Limpa o valor do campo
                }
            });
        }
    }
    sendForm(event) {
        return __awaiter(this, void 0, void 0, function* () {
            event.preventDefault();
            const target = event.target;
            target.disabled = true;
            target.innerText = "Enviando...";
            try {
                yield fetch(this.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(this.getFormObject()),
                });
                this.displaySuccess();
                this.clearFormFields();
            }
            catch (_a) {
                this.displayError();
            }
            finally {
                target.disabled = false;
                target.innerText = "Enviar Mensagem";
            }
        });
    }
    init() {
        if (this.form && this.formButton) {
            this.formButton.addEventListener("click", (event) => this.sendForm(event));
        }
        return this;
    }
}

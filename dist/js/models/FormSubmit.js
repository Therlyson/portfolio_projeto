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
        if (this.form) {
            this.url = this.form.getAttribute("action");
        }
        else {
            this.url = null;
        }
        this.sendForm = this.sendForm.bind(this);
    }
    displaySuccess() {
        if (this.form) {
            this.form.innerHTML = this.settings.success;
            const contactTitle = document.querySelector('.contact-titulo');
            if (contactTitle) {
                contactTitle.style.display = 'none';
            }
        }
    }
    displayError() {
        if (this.form) {
            this.form.innerHTML = this.settings.error;
            const contactTitle = document.querySelector('.contact-titulo');
            if (contactTitle) {
                contactTitle.style.display = 'none';
            }
        }
    }
    getFormObject() {
        const formObject = {};
        const fields = this.form.querySelectorAll("[name]");
        fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
        });
        return formObject;
    }
    onSubmission(event) {
        event.preventDefault();
        const target = event.target;
        target.disabled = true;
        target.innerText = "Enviando...";
    }
    sendForm(event) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.onSubmission(event);
                yield fetch(this.url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                    body: JSON.stringify(this.getFormObject()),
                });
                this.displaySuccess();
            }
            catch (_a) {
                this.displayError();
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

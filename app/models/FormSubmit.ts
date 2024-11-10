export class FormSubmit {
    private settings: { [key: string]: string };
    private form: HTMLFormElement | null;
    private formButton: HTMLElement | null;
    private url: string | null;
    private messageContainer: HTMLElement | null;

    constructor(settings: { [key: string]: string }) {
        this.settings = settings;
        this.form = document.querySelector(this.settings.form);
        this.formButton = document.querySelector(this.settings.button);

        // Adiciona contêiner de mensagens
        if (this.form) {
            this.url = this.form.getAttribute("action");
            this.messageContainer = document.createElement("div");
            this.messageContainer.className = "form-message";
            this.form.appendChild(this.messageContainer);
        } else {
            this.url = null;
            this.messageContainer = null;
        }

        this.sendForm = this.sendForm.bind(this);
    }

    getFormObject(): { [key: string]: string } {
        const formObject: { [key: string]: string } = {};
        const fields: NodeListOf<HTMLInputElement> = this.form.querySelectorAll("[name]");
        fields.forEach((field: HTMLInputElement) => {
            formObject[field.getAttribute("name")!] = field.value;
        });
        return formObject;
    }

    displayMessage(message: string): void {
        if (this.messageContainer) {
            this.messageContainer.innerHTML = message;
        }
    }

    displaySuccess(): void {
        this.displayMessage(this.settings.success);
    }

    displayError(): void {
        this.displayMessage(this.settings.error);
    }

    clearFormFields(): void {
        if (this.form) {
            const inputs = this.form.querySelectorAll("[name]");
            inputs.forEach(input => {
                if (input instanceof HTMLInputElement || input instanceof HTMLTextAreaElement) {
                    input.value = ''; // Limpa o valor do campo
                }
            });
        }
    }

    async sendForm(event: Event) {
        event.preventDefault();
        const target = event.target as HTMLButtonElement;
        target.disabled = true;
        target.innerText = "Enviando...";

        try {
            await fetch(this.url!, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displaySuccess();
            this.clearFormFields();
        } catch {
            this.displayError();
        } finally {
            target.disabled = false;
            target.innerText = "Enviar Mensagem";
        }
    }

    init() {
        if (this.form && this.formButton) {
            this.formButton.addEventListener("click", (event) => this.sendForm(event));
        }
        return this;
    }
}

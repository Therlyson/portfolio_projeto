export class FormSubmit {
    private settings: { [key: string]: string };
    private form: HTMLFormElement | null;
    private formButton: HTMLElement | null;
    private url: string | null;

    constructor(settings: { [key: string]: string }) {
        this.settings = settings;
        this.form = document.querySelector(this.settings.form);
        this.formButton = document.querySelector(this.settings.button);

        if (this.form) {
            this.url = this.form.getAttribute("action");
        } else {
            this.url = null;
        }

        this.sendForm = this.sendForm.bind(this);
    }

    displaySuccess(): void {
        if (this.form) {
            this.form.innerHTML = this.settings.success;
            const contactTitle = document.querySelector('.contact-titulo') as HTMLElement;
            if (contactTitle) {
                contactTitle.style.display = 'none';
            }
        }
    }

    displayError(): void{
        if (this.form) {
            this.form.innerHTML = this.settings.error;
            const contactTitle = document.querySelector('.contact-titulo') as HTMLElement;
            if (contactTitle) {
                contactTitle.style.display = 'none';
            }
        }
    }

    getFormObject(): { [key: string]: string } {
        const formObject: { [key: string]: string } = {};
        const fields: NodeListOf<HTMLInputElement> = this.form.querySelectorAll("[name]");
        fields.forEach((field: HTMLInputElement) => {
            formObject[field.getAttribute("name")!] = field.value;
        });
        return formObject;
    }

    onSubmission(event: Event){
        event.preventDefault();
        const target = event.target as HTMLButtonElement;
        target.disabled = true;   
        target.innerText = "Enviando..."; 
    }

    async sendForm(event: Event){
        try{
            this.onSubmission(event);
            await fetch(this.url!, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(this.getFormObject()),
            });
            this.displaySuccess();
        }catch{
            this.displayError();
        }
    }
    
    init(){
        if (this.form && this.formButton) {
            this.formButton.addEventListener("click", (event) => this.sendForm(event));
        }
        return this;
    }
}
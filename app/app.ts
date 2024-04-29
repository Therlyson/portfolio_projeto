// import Typed from 'typed.js';

import { error } from "console";

class MobileNavbar{ //classe para ajeitar a navegação responsiva da página
    private mobileMenu: HTMLElement;
    private navList: HTMLElement;
    private navLinks: NodeListOf<HTMLAnchorElement>;
    private activeClass: string;
    constructor(mobileMenu: string, navList: string, navLinks: string){
        this.mobileMenu = document.querySelector(mobileMenu) as HTMLElement;
        this.navList = document.querySelector(navList) as HTMLElement;
        this.navLinks = document.querySelectorAll(navLinks) as NodeListOf<HTMLAnchorElement>;
        this.activeClass = "active";

        this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
        this.navLinks.forEach((link, index) => {
            link.style.animation
            ? (link.style.animation = "")
            : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`)
        });
    }

    handleClick(){
        this.animateLinks();
        this.navList.classList.toggle(this.activeClass);
    }

    addClickEvent(): void{
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

    init(): void{
        if(this.mobileMenu){
            this.addClickEvent();
        }
    }
}


class DestaqueHeader{ //classe para fixar enquanto o usuário está sobre uma página
    private sections: NodeListOf<HTMLElement>;
    private navList: HTMLElement;
    private navLinks: NodeListOf<HTMLAnchorElement>;
    
    constructor(navList: string, sections: string, navLinks: string){
        this.navList = document.querySelector(navList) as HTMLElement;
        this.sections = document.querySelectorAll(sections) as NodeListOf<HTMLElement>;
        this.navLinks = document.querySelectorAll(navLinks) as NodeListOf<HTMLAnchorElement>;
    }

    mudar(): void{
        window.onscroll = () => {
            this.sections.forEach(sec => {
                let top = window.scrollY;
                let offset = sec.offsetTop - 150;
                let height = sec.offsetHeight;
                let id = sec.getAttribute('id');

                if(top >= offset && top < offset + height){
                    this.navLinks.forEach(links => {
                        links.classList.remove('active');
                        if(links.getAttribute('href') === '#' + id) {
                            links.classList.add('active');
                        }
                    })
                }
            })
        }
    }

    ativar(): void{
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navLinks.forEach(lnk => lnk.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }
}


class FormSubmit {
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

const formSubmit = new FormSubmit({
    form: "[data-form]",
    button: "[data-button]",
    success: "<div class='form-submit'><h1 class='success'>Mensagem enviada com sucesso!</h1><h3 class='success2'>Em breve entrarei em contato.</h3></div>",
    error: "<h1 class='error'>Não foi possivel enviar sua mensagem!</h1>"
});
formSubmit.init();

const mobileNavBar = new MobileNavbar("#btn-menu", ".cabecalho_menu_paginas", ".cabecalho_menu_paginas a");
mobileNavBar.init();

const destaqueHeader = new DestaqueHeader(".cabecalho_menu_paginas", "section", ".cabecalho_menu_paginas a");
destaqueHeader.ativar(); 
destaqueHeader.mudar();


//deixar animação
// const typed = new Typed(".home-generator", {
//     strings: ["FullStack Development", "Software Engineer", "Scientific Researcher"],
//     typeSpeed: 70,
//     backSpeed: 70,
//     backDelay: 1000,
//     loop: true
// });
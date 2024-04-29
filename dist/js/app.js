// import Typed from 'typed.js';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class MobileNavbar {
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";
        this.handleClick = this.handleClick.bind(this);
    }
    animateLinks() {
        this.navLinks.forEach((link, index) => {
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`);
        });
    }
    handleClick() {
        this.animateLinks();
        this.navList.classList.toggle(this.activeClass);
    }
    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }
    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
    }
}
class DestaqueHeader {
    constructor(navList, sections, navLinks) {
        this.navList = document.querySelector(navList);
        this.sections = document.querySelectorAll(sections);
        this.navLinks = document.querySelectorAll(navLinks);
    }
    mudar() {
        window.onscroll = () => {
            this.sections.forEach(sec => {
                let top = window.scrollY;
                let offset = sec.offsetTop - 150;
                let height = sec.offsetHeight;
                let id = sec.getAttribute('id');
                if (top >= offset && top < offset + height) {
                    this.navLinks.forEach(links => {
                        links.classList.remove('active');
                        if (links.getAttribute('href') === '#' + id) {
                            links.classList.add('active');
                        }
                    });
                }
            });
        };
    }
    ativar() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navLinks.forEach(lnk => lnk.classList.remove('active'));
                link.classList.add('active');
            });
        });
    }
}
class FormSubmit {
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
export {};
//deixar animação
// const typed = new Typed(".home-generator", {
//     strings: ["FullStack Development", "Software Engineer", "Scientific Researcher"],
//     typeSpeed: 70,
//     backSpeed: 70,
//     backDelay: 1000,
//     loop: true
// });

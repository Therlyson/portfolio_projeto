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
//animação
let textos = [
    "computer science student",
    'FullStack Development',
    'scientific researcher',
];
// Índice do texto atual
let indiceTextoAtual = 0;
// Tempo de espera entre cada caractere (em milissegundos)
let tempoEspera = 90; // Tempo de espera entre os caracteres
// Elemento onde o texto será exibido
let elementoNome = document.getElementById('home-generator');
// Função para exibir o texto com efeito de digitação
function digitarTexto() {
    let textoAtual = "";
    let texto = textos[indiceTextoAtual];
    let i = 0;
    let intervalo = setInterval(function () {
        textoAtual += texto[i];
        if (elementoNome) {
            elementoNome.textContent = textoAtual;
            elementoNome.style.color = '#d80000e7';
        }
        i++;
        if (i >= texto.length) {
            clearInterval(intervalo);
            setTimeout(reescreverTexto, 100);
        }
    }, tempoEspera);
}
// Função para reescrever o texto
function reescreverTexto() {
    let texto = textos[indiceTextoAtual];
    let i = texto.length - 1;
    let intervalo = setInterval(function () {
        let textoAtual = texto.substring(0, i + 1);
        if (elementoNome) {
            elementoNome.textContent = textoAtual;
            elementoNome.style.color = '#d80000e7';
        }
        i--;
        if (i < 0) {
            clearInterval(intervalo);
            indiceTextoAtual = (indiceTextoAtual + 1) % textos.length;
            digitarTexto();
        }
    }, tempoEspera / 2);
}
// Inicia o efeito de digitação com o primeiro texto do array
digitarTexto();
function toggleOptions(id) {
    let buttons = document.getElementsByClassName('selecao_botao');
    for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].id === id) {
            buttons[i].classList.add('selected');
        }
        else {
            buttons[i].classList.remove('selected');
        }
    }
    let options = document.getElementsByClassName('opcoes');
    for (let i = 0; i < options.length; i++) {
        if (options[i].id === id) {
            options[i].style.display = 'block';
        }
        else {
            options[i].style.display = 'none';
        }
    }
}
export {};

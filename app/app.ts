import { MobileNavbar } from "./models/MobileNavbar.js";
import { DestaqueHeader } from "./models/DestaqueHeader.js";
import { FormSubmit } from "./models/FormSubmit.js";
import { GeraTexto } from "./models/GeraTexto.js";


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


const textoComEfeito = new GeraTexto(
    [
        "computer science student",
        'FullStack Development',
        'scientific researcher',
    ],
    90,
    'home-generator'
);

const textoComEfeito2 = new GeraTexto(
    [
        "computer science student",
        'FullStack Development',
        'scientific researcher',
    ],
    90,
    'about-generator'
);


// tema dark
let btn = document.getElementById("btn") as HTMLElement;
let btnText = document.getElementById("btnText") as HTMLSpanElement;
let btnIcon = document.getElementById("btnIcon") as HTMLImageElement;

btn.onclick = function(){
    let isLightTheme = document.body.classList.toggle("light-theme");

    if(isLightTheme){
        btnIcon.src = "imagens/moon.png";
        btnText.textContent = "Dark";
    }else{
        btnIcon.src = "imagens/sun.png";
        btnText.textContent = "Light";
    }
}
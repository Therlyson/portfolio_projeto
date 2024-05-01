export class MobileNavbar{ //classe para ajeitar a navegação responsiva da página
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
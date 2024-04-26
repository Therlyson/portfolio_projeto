class MobileNavbar{
    private mobileMenu: HTMLElement;
    private navList: HTMLElement;
    private navLinks: NodeListOf<HTMLAnchorElement>;
    private activeClass: string;
    constructor(mobileMenu: string, navList: string, navLinks: string){
        this.mobileMenu = document.querySelector(mobileMenu) as HTMLElement;
        this.navList = document.querySelector(navList) as HTMLElement;
        this.navLinks = document.querySelectorAll(navLinks) as NodeListOf<HTMLAnchorElement>;
        this.activeClass = "active";
    }

    addClickEvent(): void{
        this.mobileMenu.addEventListener("click", () => console.log("Oi"));
    }

    init(): MobileNavbar{
        if(this.mobileMenu){
            this.addClickEvent();
        }
        return this;
    }
}
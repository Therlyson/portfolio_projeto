export class DestaqueHeader{ //classe para fixar enquanto o usuário está sobre uma página
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

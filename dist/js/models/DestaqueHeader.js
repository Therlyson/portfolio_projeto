export class DestaqueHeader {
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

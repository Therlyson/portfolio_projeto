export class Carrosel {
    private nextDom: HTMLElement;
    private prevDom: HTMLElement;
    private carouselDom: HTMLElement;
    private SliderDom: HTMLElement;
    private thumbnailBorderDom: HTMLElement;
    private timeDom: HTMLElement;
    private timeRunning: number;
    private runTimeOut: number | NodeJS.Timeout;

    constructor() {
        this.nextDom = document.getElementById('next')!;
        this.prevDom = document.getElementById('prev')!;
        this.carouselDom = document.querySelector('.projects') as HTMLElement;
        this.SliderDom = this.carouselDom.querySelector('.projects .list') as HTMLElement;
        this.thumbnailBorderDom = document.querySelector('.projects .thumbnail') as HTMLElement;
        this.timeDom = document.querySelector('.projects .time') as HTMLElement;
        this.timeRunning = 3000;

        this.init();
    }

    private init(): void {
        this.thumbnailBorderDom.appendChild(this.thumbnailBorderDom.querySelectorAll('.item')[0]);
        this.nextDom.onclick = () => this.showSlider('next');
        this.prevDom.onclick = () => this.showSlider('prev');
    }

    private showSlider(type: string): void {
        const SliderItemsDom = this.SliderDom.querySelectorAll('.projects .list .item');
        const thumbnailItemsDom = document.querySelectorAll('.projects .thumbnail .item');

        if (type === 'next') {
            this.SliderDom.appendChild(SliderItemsDom[0]);
            this.thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            this.carouselDom.classList.add('next');
        } else {
            this.SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            this.thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            this.carouselDom.classList.add('prev');
        }
        clearTimeout(this.runTimeOut);
        this.runTimeOut = setTimeout(() => {
            this.carouselDom.classList.remove('next');
            this.carouselDom.classList.remove('prev');
        }, this.timeRunning);
    }
}

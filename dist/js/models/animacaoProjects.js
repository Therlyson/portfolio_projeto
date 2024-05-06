export class AnimacaoProjects {
    constructor() {
        this.nextDom = document.getElementById('next');
        this.prevDom = document.getElementById('prev');
        this.carouselDom = document.querySelector('.projects');
        this.SliderDom = this.carouselDom.querySelector('.projects .list');
        this.thumbnailBorderDom = document.querySelector('.projects .thumbnail');
        this.timeDom = document.querySelector('.projects .time');
        this.timeRunning = 3000;
        this.timeAutoNext = 7000;
        this.init();
    }
    init() {
        this.thumbnailBorderDom.appendChild(this.thumbnailBorderDom.querySelectorAll('.item')[0]);
        this.nextDom.onclick = () => this.showSlider('next');
        this.prevDom.onclick = () => this.showSlider('prev');
        this.runNextAuto = setTimeout(() => {
            this.nextDom.click();
        }, this.timeAutoNext);
    }
    showSlider(type) {
        const SliderItemsDom = this.SliderDom.querySelectorAll('.projects .list .item');
        const thumbnailItemsDom = document.querySelectorAll('.projects .thumbnail .item');
        if (type === 'next') {
            this.SliderDom.appendChild(SliderItemsDom[0]);
            this.thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
            this.carouselDom.classList.add('next');
        }
        else {
            this.SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
            this.thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
            this.carouselDom.classList.add('prev');
        }
        clearTimeout(this.runTimeOut);
        this.runTimeOut = setTimeout(() => {
            this.carouselDom.classList.remove('next');
            this.carouselDom.classList.remove('prev');
        }, this.timeRunning);
        clearTimeout(this.runNextAuto);
        this.runNextAuto = setTimeout(() => {
            this.nextDom.click();
        }, this.timeAutoNext);
    }
}

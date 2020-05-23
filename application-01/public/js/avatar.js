import Animate from './animate.js';

export default class Avatar extends Animate {
    constructor({elem, position = 0, width=2000, step=250, interval = 200, picture='egg-sprite', active}) {
        super({elem, position, step , width, interval, picture, active});
        this.elem.style.backgroundImage = `url('/images/${picture}.png')`;
        this.active && this.initActive();
    }

    addEvents(){
        this.elem.addEventListener('mouseover', () => {
            this.startAnimation();
        });

        this.elem.addEventListener('mouseout', () => {
            this.stopAnimation();
        });

        this.elem.addEventListener('click', () => {
            this.setActive();
        });
    }

    initActive(){
        const max = this.width / this.step;
        const min = 0;
        this.position = Math.floor(Math.random() * ( max - min + 1) + min) * this.step;
        this.setActive();
        this.startAnimation();
    }

    setActive(){
        this.active = true;
        this.elem.style.filter = 'grayscale(0)';
    }
}

import Animate from './animate.js';

export default class Coin extends Animate {
    constructor({elem, position = 0, step = 84, width = 504, interval = 150, active}) {
        super({elem, position, step , width, interval, active});
        this.addEvents();
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
        console.log(this.position);
        this.setActive();
        this.startAnimation();
    }

    setActive(){
        this.active = true;
        this.elem.style.filter = 'grayscale(0)';
    }
}

export default class Animate {
    constructor({elem, position, width, step, interval, active=false} = {}) {
        this.elem = elem;
        this.position = position;
        this.step = step;
        this.width = width;
        this.interval = interval;
        this.active = active;
        this.timer = null;
    }

    startAnimation() {
        this.timer = !this.timer ? setInterval(()=> this.animate(), this.interval) : this.timer;
    }

    stopAnimation() {
        if(!this.active){
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    animate() {
        this.position = this.position < this.width ? this.position + this.step : 0;
        this.elem.style.backgroundPosition = `${this.position}px 0px`;
    }
}

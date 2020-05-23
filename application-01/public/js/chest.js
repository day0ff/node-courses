import Avatar from './avatar.js';

export default class Chest {
    constructor({elem, position, width, step, interval, active, picture}) {
        this.chest = elem;
        this.reward = this.chest.querySelector('.reward');
        this.question = this.chest.querySelector('.question');
        this.avatar = new Avatar({elem: document.querySelector('.avatar'), position, step, width, interval, active, picture});
        this.addEvents();
    }

    addEvents() {
        this.chest.addEventListener('click', ()=>{
            console.log('click');
            this.setChestStyles();
            this.setQuestionStyles();
            this.setRewardSyles();
            this.initAvatar();
        },{once:true});
    }

    setChestStyles() {
        this.chest.style.width = '0';
    }

    setQuestionStyles() {
        this.question.style.fontSize = '100px';
        this.question.style.top = 'calc(50% - 50px)';
        this.question.style.left = 'calc(50% - 25px)';
    }

    setRewardSyles() {
        this.reward.style.left = 'calc(-50vw + 100px)';
        this.reward.style.top = '-50px';
        this.reward.style.width = '250px';
        this.reward.style.height = '250px';
    }

    addRemoveQuestionEvent() {
        this.chest.addEventListener('click', ()=>{
            this.removeQuestion();
        },{once:true});
    }

    removeQuestion() {
        this.question.style.display = 'none';
    }

    initAvatar() {
        setTimeout(() => {
            this.addRemoveQuestionEvent();
            this.avatar.addEvents();
        }, 1000);
    }
}

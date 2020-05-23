import Coin from './coin.js';
import Chest from './chest.js';

const state = {
    income:5
};

window.onload = () => {
    const coins = document.querySelectorAll('.coin');
    coins.forEach(elem=>new Coin({elem}));

    const chestElem = document.querySelector('.chest');
    window.chest = new Chest({elem:chestElem});
    // const reward = document.querySelector('.reward');
    // const avatarElem = document.querySelector('.avatar');
    // const avatar = new Avatar({elem:avatarElem, picture:'cat-sprite'});
    //
    // chest.addEventListener('click',()=>{
    //     chest.style.width="0";
    //     // chest.style.position="absolute";
    //     reward.style.left="calc(-50vw + 100px)";
    //     reward.style.top="-50px";
    //     reward.style.width="250px";
    //     reward.style.height="250px";
    //     avatar.addEvents();
    // });
};

console.log('in main');

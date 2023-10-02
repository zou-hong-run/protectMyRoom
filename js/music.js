let paidaAudio = function(){
    let audio = new Audio("../assets/music/paida.mp3");
    return audio;
};

const noise1 = function(){
    let audio = new Audio("../assets/music/noises/noise1.mp3");
    audio.volume = 0.3;
    return audio;
};
const noise2 = function(){
    let audio = new Audio("../assets/music/noises/noise2.mp3");
    audio.volume = 0.3;
    return audio;
};
const noise3 = function(){
    let audio = new Audio("../assets/music/noises/noise3.mp3");
    audio.volume = 0.3;
    return audio;
};
const fire1 = function(){
    let audio = new Audio("../assets/music/fire/fire1.mp3");
    audio.volume = .2;
    return audio;
};
const fire2 = function(){
    let audio = new Audio("../assets/music/fire/fire2.mp3");
    audio.volume = .2;
    return audio;
};
const fire3 = function(){
    let audio = new Audio("../assets/music/fire/fire2.mp3");
    audio.volume = .2;
    return audio;
};

const dieAudio = function(){
    let audio = new Audio("../assets/music/die/die4.mp3");
    audio.volume = 1;
    return audio;
}

export {
    paidaAudio,
    noise1,
    noise2,
    noise3,
    fire1,
    fire2,
    fire3,
    dieAudio
}
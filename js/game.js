let canvas;
let keyboard = new Keyboard();
let intervalIds = [];
let endOfGame = false;
let world; 
let youLost = true;
let endboss;
let alreadyPlayed = false;
let playedAlready = false;
let AUDIO_GAMESTART = new Audio('./audio/gameStart.mp3');
let AUDIO_LOOSE = new Audio('./audio/loose.mp3');
let AUDIO_WIN = new Audio('./audio/win.mp3');
let AUDIO_BACKGROUND = new Audio('./audio/background.mp3');
let volumeOn = true;


function mute() {
    volumeOn = false;
    AUDIO_BACKGROUND.pause();
    document.getElementById('muteDiv').classList.add('dNone');
    document.getElementById('volumeDiv').classList.remove('dNone');
}

function volume() {
    volumeOn = true;
    playBackgroundmusic();
    document.getElementById('muteDiv').classList.remove('dNone');
    document.getElementById('volumeDiv').classList.add('dNone');
}

function playBackgroundmusic() {
    if (volumeOn) {
        setTimeout(playAudioOnRepeat(AUDIO_BACKGROUND), 1000);
    }
}


function playAudioOnRepeat(audio) {
    audio.play();
    audio.loop = true;
}


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My character is ', world.character);
    endboss = world.level.enemies[world.level.enemies.length - 1];
    // enboss = endboss; //.this
    bindBtnsPressEventsMouse(); //.this
    bindBtnsPressEventsTouch(); //.this
}


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


function startGame() {
    topBtnsDissapear();
    if (volumeOn){
        AUDIO_GAMESTART.play();
    }
    startScreenDisappears();
    init();
}


function topBtnsDissapear() {
    document.getElementById('mobileActionBtnTopImgDiv').classList.add('dNone');
}


function startScreenDisappears() {
    document.getElementById('startScreen').classList.add('dNone');
}


function stopGame() {
    endOfGame = true;
    endAllIntervals();
    showEndscreen();
}


function endAllIntervals() {
    for (let i = 0; i < intervalIds.length; i++) {
        const id = intervalIds[i];
        clearInterval(id);            
    } 
}


function showEndscreen() {
    if (characterIsDead()) {
        if (volumeOn) {
            AUDIO_LOOSE.play();
        }
        showYouLostScreen();
    } else {
        if (volumeOn) {
            AUDIO_WIN.play();
        }
        showGameOverScreen();
    }
}


function characterIsDead() {
    return world.endboss.energy
}


function showYouLostScreen() {
    document.getElementById('endscreenYouLost').classList.remove('dNone');
}


function showGameOverScreen() {
    document.getElementById('endscreenGameOver').classList.remove('dNone');
}


function minimizeComplete() {
    exitFullscreen();
    document.getElementById('fullsize').classList.remove('dNone');
    document.getElementById('minimize').classList.add('dNone');
}


function fullsizeComplete() {
    fullscreen();
    document.getElementById('fullsize').classList.add('dNone');
    document.getElementById('minimize').classList.remove('dNone');
}


function fullscreen() {
    let fullscreen = document.getElementById('canvasDiv');
    enterFullscreen(fullscreen);
}


function enterFullscreen(element) {
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.msRequestFullscreen) {      // for IE11 (remove June 15, 2022)
      element.msRequestFullscreen();
    } else if(element.webkitRequestFullscreen) {  // iOS Safari
      element.webkitRequestFullscreen();
    }
}


function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
}
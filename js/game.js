// --------------- VARIABLES --------------- //
let canvas;
let keyboard = new Keyboard();
let intervalIds = [];
let endOfGame = false;
let world; 
let endboss;
let alreadyPlayed = false;
let playedAlready = false;
let AUDIO_GAMESTART = new Audio('./audio/gameStart.mp3');
let AUDIO_LOOSE = new Audio('./audio/loose.mp3');
let AUDIO_WIN = new Audio('./audio/win.mp3');
let AUDIO_BACKGROUND = new Audio('./audio/background.mp3');
let volumeOn = false;
let imagesToLoad = 0;
let imagesLoaded = 0;
let percent = 0;
let niveau = 1;

// --------------- START GAME --------------- //
/**
 * This function starts the game.
 */
function startGame() {
    playBtnDissapear();
    playGamestart();
    startScreenDisappears();
    init();
    enableBtmBtns();
}

function playGamestart() {
    if (volumeOn){
        AUDIO_GAMESTART.play();
    }
}

function playBtnDissapear() {
    document.getElementById('mobileActionBtnTopImgDiv').parentElement.classList.add('dNone');
}

function startScreenDisappears() {
    document.getElementById('startScreen').classList.add('dNone');
}

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    endboss = world.level.enemies[world.level.enemies.length - 1];
    bindBtnsPressEventsMouse();
    bindBtnsPressEventsTouch();
}

function enableBtmBtns() {
    document.getElementById('btnLeft').style.pointerEvents = 'auto';
    document.getElementById('btnRight').style.pointerEvents = 'auto';
    document.getElementById('btnJump').style.pointerEvents = 'auto';
    document.getElementById('btnThrow').style.pointerEvents = 'auto';
}

function enableTopBtns() {
    document.getElementById('mobileActionBtnTopImgDiv').style.pointerEvents = 'auto';
    document.getElementById('mobileActionBtnTopImgDiv2Volume').style.pointerEvents = 'auto';
    document.getElementById('mobileActionBtnTopImgDiv2Mute').style.pointerEvents = 'auto';
    document.getElementById('fullsize').style.pointerEvents = 'auto';
}

function disableBtns() {
    document.getElementById('mobileActionBtnTopImgDiv').style.pointerEvents = 'none';
    document.getElementById('mobileActionBtnTopImgDiv2Volume').style.pointerEvents = 'none';
    document.getElementById('mobileActionBtnTopImgDiv2Mute').style.pointerEvents = 'none';
    document.getElementById('fullsize').style.pointerEvents = 'none';
    document.getElementById('btnLeft').style.pointerEvents = 'none';
    document.getElementById('btnRight').style.pointerEvents = 'none';
    document.getElementById('btnJump').style.pointerEvents = 'none';
    document.getElementById('btnThrow').style.pointerEvents = 'none';
}

/**
 * This function initializes level 1 
 * */
function initLevel1() {
    initLevel1DisappearScreens();
    initLevel1SetVariables();
    initVariableLevel1();
    init();
}

function initLevel1DisappearScreens() {
    document.getElementById('endscreenGameOver').classList.add('dNone');
    document.getElementById('endscreenYouLost').classList.add('dNone');
    document.getElementById('level2Div').classList.add('dNone');
    document.getElementById('level1Div').classList.add('dNone');
}

function initLevel1SetVariables() {
    endboss = undefined;
    endOfGame = false;
    alreadyPlayed = false;
    playedAlready = false;
    niveau = 1;
    percent = 0;
}

/**
 * This function initializes level 2
 * */
function initLevel2() {
    initLevel2DisappearScreens();
    initLevel2SetVariables();
    initVariableLevel2();
    init();
}

function initLevel2DisappearScreens() {
    document.getElementById('endscreenGameOver').classList.add('dNone');
    document.getElementById('endscreenYouLost').classList.add('dNone');
    document.getElementById('level2Div').classList.add('dNone');
    document.getElementById('level1Div').classList.add('dNone');
}

function initLevel2SetVariables() {
    alreadyPlayed = false;
    playedAlready = false;
    niveau = 2;
    percent = 0;
    endOfGame = false;
    endboss = undefined;
}

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
    return id;
}

function disappearLoadingScreen() {
    document.getElementById('loadingDiv').classList.add('dNone');
}

// --------------- AUDIO --------------- //
/**
 * This function is used to play background music.
 */
function playBackgroundmusic() {
    if (volumeOn) {
        playAudioOnRepeat();
    }
}

function playAudioOnRepeat() {
    AUDIO_BACKGROUND.play();
    AUDIO_BACKGROUND.loop = true;
}

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

//  --------------- MINIMIZE SCREEN --------------- //
/**
 * This funciton is used to minimze the screen.
 */
function minimizeComplete() {
    exitFullscreen();
    minimizeCompleteSetScreens();
    minimizeCompleteMediaQuery();
}

function exitFullscreen() {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
}

function minimizeCompleteSetScreens() {
    document.getElementById('fullsize').classList.remove('dNone');
    document.getElementById('minimize').classList.add('dNone');
    document.getElementById('description').classList.remove('dNone');
    document.getElementById('startScreen').style="height: unset";
    document.getElementById('canvas').style="height: unset";
    document.getElementById('canvasDiv').style="display: block; position: relative;"; //wenn aus, dann kein Fehler beim Zurücksetzen
    document.getElementById('mobileActionBtn').style="height: 405px;";
}

function minimizeCompleteMediaQuery() {
    if (window.innerWidth < 720) {
        document.getElementById('mobileActionBtn').style="height: calc(100% - 104px);"; 
    }
    if (window.innerWidth < 600) {
        document.getElementById('mobileActionBtn').style="height: calc(100% - 64.8px);";
    }
    if (window.innerWidth < 350) {
        document.getElementById('mobileActionBtn').style="height: calc(100% - 42.4px);";
    }
}

// --------------- FULLSCREEN --------------- //
/**
 * This funciton is used to maximize the screen.
 */
function fullsizeComplete() {
    fullscreen();
    fullsizeCompleteSetScreens();
}

function fullscreen() {
    let fullscreen = document.getElementById('canvasDiv');
    enterFullscreen(fullscreen);
}

function fullsizeCompleteSetScreens() {
    document.getElementById('fullsize').classList.add('dNone');
    document.getElementById('minimize').classList.remove('dNone');
    document.getElementById('description').classList.add('dNone');
    document.getElementById('startScreen').style="height: 100vh; width: 100%; object-fit: contain;";
    document.getElementById('canvas').style="height: 100vh; width: 100%; object-fit: contain;";
    document.getElementById('canvasDiv').style="display: flex;align-items: center;";
    // document.getElementById('mobileActionBtn').style="height: 100vh;";
    document.getElementById('mobileActionBtn').style="height: 100vh !important;"
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

// --------------- STOPGAME --------------- //
/**
 * This function is used to stop the game.
 */
function stopGame() {
    endOfGame = true;
    endAllIntervals();
    showEndscreen();
    setTimeout(showNiveau, 1200);
}

/**
 * This function is used to end all intervals.
 */
function endAllIntervals() {
    for (let i = 0; i < intervalIds.length; i++) {
        const id = intervalIds[i];
        clearInterval(id);            
    } 
}

function showEndscreen() {
    if (endbossIsDead()) {
        if (volumeOn) {
            AUDIO_WIN.play();
        }
        showGameOverScreen();
    } else {
        if (volumeOn) {
            AUDIO_LOOSE.play();
        }
        showYouLostScreen();
    }
}

function endbossIsDead() {
    return endboss.energy == 0;
}

function showGameOverScreen() {
    document.getElementById('endscreenGameOver').classList.remove('dNone');
}

function showYouLostScreen() {
    document.getElementById('endscreenYouLost').classList.remove('dNone');
}

function showNiveau() {
    if(endbossIsDead()) {
        document.getElementById('level2Div').classList.remove('dNone');
    } else {
        document.getElementById('level1Div').classList.remove('dNone');
    }
}

function visibleBtns() {
    if(innerWidth < 600) {
        // document.getElementById('mobileActionBtnBottom').classList.remove('dNone');
        document.getElementById('rotatePhone').classList.remove('dNone');
    } else {
        // document.getElementById('mobileActionBtnBottom').classList.add('dNone');
        document.getElementById('rotatePhone').classList.add('dNone');
    }
}

function loadPercentage() {
    document.getElementById('progressBarPercentage').style.width = `${percent}%`;
    let percentRounded = Math.round(percent);
    document.getElementById('loading').innerHTML= `${percentRounded}%`;
    if (percent == 100) {
        setTimeout(disappearLoadingScreen, 2000);
        setTimeout(enableTopBtns, 2000);
    }
}
let canvas;
let keyboard = new Keyboard();
let intervalIds = [];
let endOfGame = false;
let world; 
let youLost = false; //davor true
let endboss;
let alreadyPlayed = false;
let playedAlready = false;
let AUDIO_GAMESTART = new Audio('./audio/gameStart.mp3');
let AUDIO_LOOSE = new Audio('./audio/loose.mp3');
let AUDIO_WIN = new Audio('./audio/win.mp3');
let AUDIO_BACKGROUND = new Audio('./audio/background.mp3');
let volumeOn = true;
let imagesToLoad = 0;
let imagesLoaded = 0;
let percent = 0;
let niveau = 1;

// //loadImage('img/test.png');
// //loadImage kann dauern eine Sekunde; drawmethode schon bevor image geladen ist.
// loadImage(path) {
//     this.img = new Image(); //Image-Objekt existiert bereits; <img id="image">; image-tag / document.getElementById('image')
//     this.img.src = path;
//     // if (x) {
//     // this.img.x = x;
//     // this.img.y = y;
//     // this.img.height = height;
//     // this.img.width = width;
//     // }
// }
function disappearLoadingScreen() {
    document.getElementById('loadingDiv').classList.add('dNone');
}


function mute() {
    volumeOn = false;
    AUDIO_BACKGROUND.pause();
    document.getElementById('muteDiv').classList.add('dNone');
    document.getElementById('volumeDiv').classList.remove('dNone');
}

function volume() {
    volumeOn = true;
    AUDIO_BACKGROUND.play();
    document.getElementById('muteDiv').classList.remove('dNone');
    document.getElementById('volumeDiv').classList.add('dNone');
}

function playBackgroundmusic() {
    if (volumeOn) {
        setTimeout(playAudioOnRepeat, 3000); //erst an, wenn Bilder geladen, nach Ladebalken
    }
}


function playAudioOnRepeat() {
    AUDIO_BACKGROUND.play();
    AUDIO_BACKGROUND.loop = true;
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
    // topBtnsDissapear();
    if (volumeOn){
        AUDIO_GAMESTART.play();
    }
    startScreenDisappears();
    init();
}


// function topBtnsDissapear() {
//     document.getElementById('mobileActionBtnTopImgDiv').classList.add('dNone');
// }


function startScreenDisappears() {
    document.getElementById('startScreen').classList.add('dNone');
}


function stopGame() {
    endOfGame = true;
    endAllIntervals();
    showEndscreen();
    if(!characterIsDead()) {
        setTimeout(showNiveau, 2000);
    }
}

function showNiveau() {
    debugger;
    niveau+=1;
    if (niveau == 2) {
        document.getElementById('level2Div').classList.remove('dNone');
    } else if (niveau == 3) {
        document.getElementById('level3Div').classList.remove('dNone');
    } else {
        
    }
}

function initLevel2() {
    document.getElementById('endscreenGameOver').classList.add('dNone');
    document.getElementById('endscreenYouLost').classList.add('dNone');
    document.getElementById('level2Div').classList.add('dNone');
    debugger;
    document.getElementById('level3Div').classList.add('dNone');
    debugger;
    endOfGame = false;
    alreadyPlayed = false;
    niveau = 2;
    init();
    // startAllIntervals();
}

// function startAllIntervals() {
    // for (let i = 0; i < intervalIds.length; i++) {
    //     const id = intervalIds[i];
    //     setInterval(id);            
    // }  
// }

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
    document.getElementById('description').classList.remove('dNone');
    document.getElementById('startScreen').style="height: unset";
    document.getElementById('canvas').style="height: unset";
    document.getElementById('canvasDiv').style="display: block; position: relative;"; //wenn aus, dann kein Fehler beim Zurücksetzen
    document.getElementById('mobileActionBtn').style="height: 405px;";
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


function fullsizeComplete() {
    fullscreen();
    document.getElementById('fullsize').classList.add('dNone');
    document.getElementById('minimize').classList.remove('dNone');
    document.getElementById('description').classList.add('dNone');
    document.getElementById('startScreen').style="height: 100vh; width: 100%; object-fit: contain;";
    document.getElementById('canvas').style="height: 100vh; width: 100%; object-fit: contain;";
    document.getElementById('canvasDiv').style="display: flex;align-items: center;"; //wenn aus, dann kein Fehler beim Zurücksetzen
    document.getElementById('mobileActionBtn').style="height: 100vh;";
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
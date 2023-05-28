let canvas;
let keyboard = new Keyboard();
let intervalIds = [];
let endOfGame = false;
let world; 
let youLost = true;
let endboss;
let alreadyPlayed = false;
let playedAlready = false;


function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    console.log('My character is ', world.character);
    endboss = world.level.enemies[world.level.enemies.length - 1];
    this.enboss = endboss;
    this.bindBtnsPressEventsMouse();
    this.bindBtnsPressEventsTouch();
}

function bindBtnsPressEventsMouse() {
    document.getElementById('btnLeft').addEventListener('mousedown' , (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    }); 


    document.getElementById('btnLeft').addEventListener('mouseup' , (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    }); 


    document.getElementById('btnRight').addEventListener('mousedown' , (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    }); 


    document.getElementById('btnRight').addEventListener('mouseup' , (event) => {
        event.preventDefault();
        keyboard.RIGHT = false;
    }); 


    document.getElementById('btnJump').addEventListener('mousedown' , (event) => {
        event.preventDefault();
        keyboard.UP = true;
    }); 


    document.getElementById('btnJump').addEventListener('mouseup' , (event) => {
        event.preventDefault();
        keyboard.UP = false;
    }); 


    document.getElementById('btnThrow').addEventListener('mousedown' , (event) => {
        event.preventDefault();
        keyboard.D = true;
    }); 


    document.getElementById('btnThrow').addEventListener('mouseup' , (event) => {
        event.preventDefault();
        keyboard.D = false;
    }); 
}


function bindBtnsPressEventsTouch() {
    document.getElementById('btnLeft').addEventListener('touchstart' , (event) => {
        event.preventDefault();
        keyboard.LEFT = true;
    }); 


    document.getElementById('btnLeft').addEventListener('touchend' , (event) => {
        event.preventDefault();
        keyboard.LEFT = false;
    }); 


    document.getElementById('btnRight').addEventListener('touchstart' , (event) => {
        event.preventDefault();
        keyboard.RIGHT = true;
    }); 


    document.getElementById('btnRight').addEventListener('touchend' , (event) => {
        event.preventDefault();
        keyboard.RIGHT = false; 
    }); 

    document.getElementById('btnJump').addEventListener('touchstart' , (event) => {
        event.preventDefault();
        keyboard.UP = true;
    }); 


    document.getElementById('btnJump').addEventListener('touchend' , (event) => {
        event.preventDefault();
        keyboard.UP = false;
    }); 


    document.getElementById('btnThrow').addEventListener('touchstart' , (event) => {
        event.preventDefault();
        keyboard.D = true;
    }); 


    document.getElementById('btnThrow').addEventListener('touchend' , (event) => {
        event.preventDefault();
        keyboard.D = false;
    });
}


// window.addEventListener('touchstart' , (event) => {
//     if (document.getElementById('btnLeft'))
//     event.preventDefault();
//     keyboard.LEFT = true;
// }); 


// window.document.getElementById('btnLeft').addEventListener('touchend' , (event) => {
//     event.preventDefault();
//     keyboard.LEFT = true;
// }); 


window.addEventListener("keydown", (event) => {
    if(event.keyCode == 68) {
        keyboard.D = true;
    }
    if(event.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if(event.keyCode == 38) {
        keyboard.UP = true;
    }
    if(event.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if(event.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if(event.keyCode == 32) {
        keyboard.SPACE = true;
    }
});


window.addEventListener("keyup", (event) => {
    if(event.keyCode == 68) {
        keyboard.D = false;
    }
    if(event.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if(event.keyCode == 38) {
        keyboard.UP = false;
    }
    if(event.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if(event.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if(event.keyCode == 32) {
        keyboard.SPACE = false;
    }
});


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


function startGame() {
    topBtnsDissapear();
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
        showYouLostScreen();
    } else {
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
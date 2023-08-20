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

window.matchMedia("(orientation:portrait)").addEventListener("change", e => {
    let portrait = e.matches;

    if (!portrait) {
        
        // debugger;
        // fullsizeComplete();
        document.getElementById('confirmFullscreen').classList.remove('dNone'); //in promise fehlermeldung

    } else {
        // alert("You are in portrait");
        // minimizeComplete();
        document.getElementById('mobileActionBtnBottom').classList.add('dNone');
    }
})

function confirmFullscreen() {
    fullsizeComplete();
    document.getElementById('confirmFullscreen').classList.add('dNone');
    document.getElementById('mobileActionBtnBottom').classList.remove('dNone');
    document.getElementById('mobileActionBtn').style="height: 100vh !important;"
}
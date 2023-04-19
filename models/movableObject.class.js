// && !dead && !(this.currentImage > images.length)

class MovableObject extends DrawableObject{
    speed = 0.12;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    // bottleAmount = 100;
    lastHit = 0;
    dead = false;
    // amountCoins = 0;

    applyGravity() {
        setInterval(() => { // this.y vor this.speedY-Abzug hat Wert 182.5 (nicht 280?)
            if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY; 
            console.log('speedY ist ', this.speedY);
            console.log('y ist ', this.y);
            this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { // ThrowableObject should always fall
            return true;
        } else {
            return this.y < 160;
        }
    }

    moveRight () {
        console.log('moving right');
    }
    
    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
            }, 1000 / 60);
    }

    playAnimation(images) {
        // this.currentImage = 0;
        let i = this.currentImage % images.length; // let i = 6 % 6; 1, Rest 0 (Modulu hebt nur den Rest auf)
        // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, ... % = "modulo"
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
            // if (this instanceof Character && dead) {
            //     this.currentImage == 3;
            // } else {
            //     this.currentImage++;
            // }
    }

    jump() {
        this.speedY = 20;
    }

    //Character.isColliding(chicken)
    isColliding(obj) {
        return  this.x + this.width > obj.x &&
                this.y + this.height > obj.y &&
                this.x < obj.x &&
                this.y < obj.y + obj.height;

        // zweite (genauere) Formel funktioniert nicht!
        // return  (this.x + this.width) >= obj.x &&
        //         this.x <= (obj.x + obj.width) &&
        //         (this.y + this.offsetY + this.height) >= obj.y &&
        //         (this.y + this.offsetY) <= (obj.y + obj.height) &&
        //         obj.onCollisionCourse;
        
    }
    
    hit() {
        this.energy -= 5;
        // this.character.scale(2, 2);
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); // Zeitraum in ms ab 1.1.1970
        }
        
    }

    collectingAnimation(x) {
        setInterval(collectAnimation(x), 1000 / 60);
    }

    // collectAnimation(y) { --> COLLECTINGANIMATION!
    //     if (y >= 200 && y < 100) {
    //         y + 1;
    //     } else if (y = 100) {

    //     }
    // }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; // difference in seconds
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    collectCoin() {
        if (this.amountCoins >= 100) {
            this.amountCoins = 100;
            console.log('amountCoins is ' + this.amountCoins);
        } else {
            this.amountCoins += 10;
            console.log('amountCoins is ' + this.amountCoins);
        }
    }
}
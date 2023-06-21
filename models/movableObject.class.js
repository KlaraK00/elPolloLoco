class MovableObject extends DrawableObject{
    speed = 0.12;
    otherDirection = false;
    speedY = 0;
    acceleration = 5;
    energy = 100;
    lastHit = 0;
    deadCharacter = false;
    imageCurrent = 0;
    meetFirstTime = true;
    jumpsHigher = false;
    ready = true;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }

    applyGravity() {
        setStoppableInterval(() => {             
            if (this.isAboveGround() || this.speedY > 2.5) {
                    this.y -= this.speedY; 
                    this.speedY -= this.acceleration;       
                }
        }, 1000 / 25)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 80;
        }
    }

    moveRight () {
        console.log('moving right');
    }
    
    moveLeft() {
        setStoppableInterval(() => {
            this.x -= this.speed;
            }, 1000 / 60);
    }

    playAnimation(images) {
        if (this instanceof Endboss && this.isDead() || this instanceof Character && this.isDead()) {
            setStoppableInterval(() => {
                let i = this.imageCurrent;
                if (i < images.length) {
                    let path = images[i];
                    this.img = this.imageCache[path];
                    this.imageCurrent++;
                }
            }, 500);
        } else {
            let i = this.currentImage % images.length;
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    jump() {
        this.speedY = 30;
    }

    jumpsOnChicken() {
        this.speedY = 25;
    }

    //Character.isColliding(chicken)
    isColliding(obj) {
        if (this instanceof Character) {
            return this.offsetColliding(obj);
        } else {
            return this.nonOffsetColliding(obj);
        } 

        // zweite (genauere) Formel funktioniert nicht!
        // return  (this.x + this.width) >= obj.x &&
        //         this.x <= (obj.x + obj.width) &&
        //         (this.y + this.offsetY + this.height) >= obj.y &&
        //         (this.y + this.offsetY) <= (obj.y + obj.height) &&
        //         obj.onCollisionCourse;
        
    }

    offsetColliding(obj) {
        return  this.x + this.width - this.offset.right > obj.x + obj.offset.left && // R -> L
                this.y + this.height - this.offset.bottom > obj.y + obj.offset.top && // T -> B
                this.x + this.offset.left < obj.x + obj.width - obj.offset.right && // L -> R
                this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom; // B -> T
    }

    nonOffsetColliding(obj) {
        return  this.x + this.width > obj.x &&
                this.y + this.height > obj.y &&
                this.x < obj.x &&
                this.y < obj.y + obj.height;
    }

    
    hit() {
        this.energy -= 10; 
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); // ms since 1.1.1970
        }
        
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; // difference in seconds
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }
}
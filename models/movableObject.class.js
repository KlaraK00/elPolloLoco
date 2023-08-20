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

    /**
     * This Function is used to apply the Gravity
     */
    applyGravity() {
        setStoppableInterval(() => {             
            if (this.isAboveGround() || this.speedY > 2.5) {
                    this.y -= this.speedY; 
                    this.speedY -= this.acceleration;       
                }
        }, 1000 / 25)
    }

    /**
     * This function is used to check if someone or something is above ground
     * 
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 80;
        }
    }
    
    /**
     * This function is used to move an object to the left
     */
    moveLeft() {
        setStoppableInterval(() => {
            this.x -= this.speed;
            }, 1000 / 60);
    }

    /**
     * This function is used to play all animations
     * 
     * @param {array} images 
     */
    playAnimation(images) {
        if (this instanceof Endboss && this.isDead() || this instanceof Character && this.isDead()) {
            this.playDeadAnimations(images);
        } else {
            this.playDefaultAnimations(images);
        }
    }

    playDeadAnimations(images) {
        setStoppableInterval(() => {
            let i = this.imageCurrent;
            if (i < images.length) {
                let path = images[i];
                this.img = this.imageCache[path];
                this.imageCurrent++;
            }
        }, 500);
    }

    playDefaultAnimations(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * This function is used to let the character jump
     */
    jump() {
        this.speedY = 30;
    }

    /**
     * This function is used to let the character jump on a chicken and than jumps even higher
     */
    jumpsOnChicken() {
        this.speedY = 25;
    }

    /**
     * This function is used to check if two Objects are colliding
     * 
     * @param {object} obj - this is the object you want to check the dates with, for example a chicken or the endboss
     * @returns {boolean} 
     */
    isColliding(obj) {
        if (this instanceof Character) {
            return this.offsetColliding(obj);
        } else {
            return this.nonOffsetColliding(obj);
        }         
    }

    /**
     * This function is used to check if "this" and "obj" are colliding with offset data
     * 
     * @param {object} obj - this is the object you want to check the dates with, for example a chicken or the endboss
     * @returns {boolean}
     */

    offsetColliding(obj) {
        return  this.x + this.width - this.offset.right > obj.x + obj.offset.left && // R -> L
                this.y + this.height - this.offset.bottom > obj.y + obj.offset.top && // T -> B
                this.x + this.offset.left < obj.x + obj.width - obj.offset.right && // L -> R
                this.y + this.offset.top < obj.y + obj.height - obj.offset.bottom; // B -> T
    }

    /**
     * This function is used to check if "this" and "obj" are colliding
     * 
     * @param {object} obj - this is the object you want to check the dates with, for example a chicken or the endboss
     * @returns {boolean}
     */
    nonOffsetColliding(obj) {
        return  this.x + this.width > obj.x &&
                this.y + this.height > obj.y &&
                this.x < obj.x &&
                this.y < obj.y + obj.height;
    }

    /**
     * This function is used to minimize the energy of someone by every hit
     */
    hit() {
        this.energy -= 10; 
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime(); // ms since 1.1.1970
        }
        
    }

    /**
     * This function is used to track the time that passed since the last hit
     * 
     * @returns {boolean}
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000; // difference in seconds
        return timepassed < 1;
    }

    /**
     * This function is used to identify if someone is dead or not
     * 
     * @returns {number} the energy-level of 0
     */
    isDead() {
        return this.energy == 0;
    }
}
class World {
    level = level1;
    canvas;
    ctx;
    cameraX = 0;
    statusbarCoin = new StatusbarCoin();
    statusbarHealth = new StatusbarHealth(30, 10);
    statusbarBottle = new StatusbarBottle();
    throwedBottles = [];
    throwedBottlesForPercentage = [];
    character = new Character(this);
    keyboard;
    myTimeout;
    AUDIO_THROW = new Audio('./audio/throw.mp3');

    constructor(canvas, keyboard) {
        this.isThisLevel2();
        this.worldSetVariables(canvas, keyboard)
        this.draw();
        this.run();
    }

    isThisLevel2() {
        if (this.thisIsLevel2()) {
            this.level = level2;
        }
    }

    thisIsLevel2() {
        return niveau == 2
    }

    worldSetVariables(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
    }

    /**
     * This function is drawing the canvas.
     */
    draw() {
        this.emptyMap();
        this.shiftCameraPosition();
        this.addUnfixedObjectsToMap();
        this.addFixedObjectsToMap();
        this.addBottlesAndCharacterToMap();
        this.shiftCameraPositionBack();
        this.loopDrawFunction();
    }

    emptyMap() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    shiftCameraPosition() {
        this.ctx.translate(this.cameraX, 0);
    }

    addUnfixedObjectsToMap() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        })
    }

    addToMap(mo) {
        if(mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0); //shifts x to the left as wide as the image, y stays the same
        this.ctx.scale(-1, 1); //mirror x-center
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore(); //to save()
    }

    addFixedObjectsToMap() {
        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoin);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.level.enemies[this.level.enemies.length - 1].statusbarHealthEndboss);
        this.ctx.translate(this.cameraX, 0);
    }

    addBottlesAndCharacterToMap() {
        this.addObjectsToMap(this.throwedBottles);
        if (!this.character.deadCharacter) {
            this.addToMap(this.character);
        }
    }

    shiftCameraPositionBack() {
        this.ctx.translate(-this.cameraX, 0);
    }

    loopDrawFunction() {
        let self = this;
        requestAnimationFrame(function() {
            if (!endOfGame) {
                self.draw()
            }
        });
    }

    run() {
        setStoppableInterval(this.checkCollisions.bind(this), 10);
        setStoppableInterval(this.checkThrowObject.bind(this), 200);
        setStoppableInterval(this.checkEndbossAnimation.bind(this), 200);
    }

    checkCollisions() {
        this.checkCollisionEnemies();
        this.checkCollisionCoins();
        this.checkCollisionBottles();
        this.checkCollisionThrowableObject();
    }

    /**
     * This function is checking collisions with enemies.
     */
    checkCollisionEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if(this.characterCanJumpOnChicken(enemy, index)) {
                this.characterJumpsOnChicken(index);
            } else if(this.characterCanCollideWithEnemies(enemy)) {
                this.characterCollidesWithEnemies();
            }
        });
    }

    characterCanJumpOnChicken(enemy, index) {
        return this.character.isColliding(enemy) && this.character.isAboveGround() && this.isNotEndboss(index);
    }

    isNotEndboss(index) {
        return !(index == this.level.enemies.length - 1);
    }

    characterJumpsOnChicken(index) {
        this.level.enemies.splice(index, 1);
        this.character.jumpsOnChicken();
    }

    characterCanCollideWithEnemies(enemy) {
        return this.character.isColliding(enemy);
    }
    
    characterCollidesWithEnemies() {
        this.character.hit();
        this.statusbarHealth.setPercentage(this.character.energy);
    }

    /**
     * This function is checking collisions with coins.
     */
    checkCollisionCoins() {
        this.level.coins.forEach((coin, index) => {
            if(this.characterCanCollectCoin(coin)) {
                this.characterCollectsCoin(index);
            }
        });
    }

    characterCanCollectCoin(coin) {
        return this.character.isColliding(coin) && this.character.isAboveGround()
    }

    characterCollectsCoin(index) {
        this.character.collectCoin();
        this.statusbarCoin.setPercentage(this.character.amountCoins);
        this.level.coins.splice(index, 1);
    }

    /**
     * This function is checking collisions with bottles.
     */
    checkCollisionBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if(this.characterCanCollectBottle(bottle)) {
                this.characterCollectsBottle(bottle, index);
            }
        });
    }

    characterCanCollectBottle(bottle) {
        return this.character.isColliding(bottle) && this.character.isAboveGround()
    }

    characterCollectsBottle(bottle, index) {
        this.level.bottles.splice(bottle, 1);
        this.throwedBottles.splice(index, 1);
        this.throwedBottlesForPercentage.splice(0, 1);
        this.character.amountBottlesInPercentage = (20 - this.throwedBottlesForPercentage.length) * 5;
        this.statusbarBottle.setPercentage(this.character.amountBottlesInPercentage);
    
    }

    /**
     * This function is checking collisions with thowable Objects.
     */
    checkCollisionThrowableObject() {
        this.throwedBottles.forEach((bottle) => {
            if (endboss.isColliding(bottle)) {
                this.bottleDisappears(bottle);
                if (this.endbossIsNotDead()) {
                    endboss.hit();
                } 
                if (endboss.isDead()) {
                    this.gameWillBeStopped();
                }
            endboss.statusbarHealthEndboss.setPercentage(endboss.energy);
            }
        })
    }

    bottleDisappears(bottle) {
        this.throwedBottles.splice(bottle, 1);
    }

    endbossIsNotDead() {
        return !endboss.isDead();
    }

    gameWillBeStopped() {
        if (!endOfGame) {
            this.preventEndbossMoveLeft();
            this.soonGameWillStop();
        }
    }

    preventEndbossMoveLeft() {
        clearInterval(endboss.bossMoveLeftAnimationInterval);
    }

    soonGameWillStop() {
        this.myTimeout = setTimeout(stopGame, 1500);
    }

    checkThrowObject() {
        if (this.characterCanThrowBottle()) {
            if (this.characterIsNotDead()) {
                if (this.characterHasNotBottles()) {
                    return false;
                } else {
                    this.playThrowAudio();
                    this.characterThrowsBottle();
                }
            } 
        }
    }

    characterCanThrowBottle() {
        return this.keyboard.D;
    }

    characterIsNotDead() {
        return !this.character.deadCharacter;
    }

    characterHasNotBottles() {
        return this.character.amountBottlesInPercentage == 0;
    }

    playThrowAudio() {
        if (volumeOn) {
            this.AUDIO_THROW.play();
        }
    }

    characterThrowsBottle() {
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwedBottlesForPercentage.push(bottle);
        this.throwedBottles.push(bottle);
        this.character.amountBottlesInPercentage = (20 - this.throwedBottlesForPercentage.length) * 5;
        this.statusbarBottle.setPercentage(this.character.amountBottlesInPercentage);
    }

    checkEndbossAnimation() {
        if (this.meetEndbossFirstTime()) {
            endboss.fullAnimation();
            alreadyPlayed = true
        }
    }

    meetEndbossFirstTime() {
        return !alreadyPlayed && this.character.x > 2500;
    }
}

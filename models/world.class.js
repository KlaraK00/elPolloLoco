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
    // endboss = this.level.enemies[this.level.enemies.length - 1]; //endboss weggegeben
    AUDIO_THROW = new Audio('./audio/throw.mp3');


    constructor(canvas, keyboard) {
        if (niveau == 2) {
            this.level = level2;
        }
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.run();

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


    checkEndbossAnimation() {
        if (!alreadyPlayed && this.character.x > 2500) {
            endboss.fullAnimation();
            alreadyPlayed = true
        }
    }

    checkCollisionEnemies() {
        this.level.enemies.forEach((enemy, index) => {
            if(this.character.isColliding(enemy) && this.character.isAboveGround() && this.isNotEndboss(index)) {
                this.level.enemies.splice(index, 1);
                this.character.jumpsOnChicken();
            } else if(this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        });
    }

    isNotEndboss(index) {
        return !(index == this.level.enemies.length - 1);
    }

    checkCollisionCoins() {
        this.level.coins.forEach((coin, index) => {
            if(this.character.isColliding(coin) && this.character.isAboveGround()) {
                this.character.collectCoin();
                this.statusbarCoin.setPercentage(this.character.amountCoins);
                this.level.coins.splice(index, 1);
            }
        });
    }

    checkCollisionBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if(this.character.isColliding(bottle) && this.character.isAboveGround()) {
                this.level.bottles.splice(bottle, 1);
                this.throwedBottles.splice(index, 1);
                this.throwedBottlesForPercentage.splice(0, 1); //NEU
                this.character.amountBottlesInPercentage = (20 - this.throwedBottlesForPercentage.length) * 5;
                // this.character.amountBottlesInPercentage = (20 - this.throwedBottles.length) * 5;
                this.statusbarBottle.setPercentage(this.character.amountBottlesInPercentage);
            }
        });
    }


    checkCollisionThrowableObject() {
        this.throwedBottles.forEach((bottle) => {
            if (endboss.isColliding(bottle)) { //this weg
                this.throwedBottles.splice(bottle, 1); //bottle verschwindet
                if (!endboss.isDead()) { //this weg
                    endboss.hit(); //this weg
                    console.log('endboss.index ist ' + endboss.index);
                } 
                if (endboss.isDead()) { //this weg
                    console.log('isdead() endboss.index ist ' + endboss.index);
                    // this.youLost = true;
                    if (!endOfGame) { //damit nur einmal ausgeführt wird
                        clearInterval(27); //clear moveLeft() from endboss
                        // clearInterval(104); everyTime another ID
                        // clearInterval(121);
                        // clearInterval(229);
                        // clearInterval(271);
                        // clearInterval(381);  
                        this.myTimeout = setTimeout(stopGame, 1500);
                    }
                }
            endboss.statusbarHealthEndboss.setPercentage(endboss.energy); //this weg 2x
            }
        })
    }

    checkThrowObject() {
        if (this.keyboard.D) {
            if (!this.character.deadCharacter) {
                if (this.character.amountBottlesInPercentage == 0) {
                    return false;
                } else {
                    if (volumeOn) {
                        this.AUDIO_THROW.play();
                    }
                    let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                    this.throwedBottlesForPercentage.push(bottle); //NEU
                    this.throwedBottles.push(bottle);
                    this.character.amountBottlesInPercentage = (20 - this.throwedBottlesForPercentage.length) * 5;
                    // this.character.amountBottlesInPercentage = (20 - this.throwedBottles.length) * 5;
                    this.statusbarBottle.setPercentage(this.character.amountBottlesInPercentage);                }
            } 
        }
    }

    //Wieso draw() nicht setInterval?, requestAnimationFrame = so schnell wies geht?
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.ctx.translate(this.cameraX, 0);

        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);

        // --------- space for fixed objects -----------
        this.ctx.translate(-this.cameraX, 0);
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarCoin);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.level.enemies[this.level.enemies.length - 1].statusbarHealthEndboss);
        this.ctx.translate(this.cameraX, 0);
        // --------- space for fixed objects -----------

        this.addObjectsToMap(this.throwedBottles);
        if (!this.character.deadCharacter) {
            this.addToMap(this.character);

        }

        // this.addObjectsToMap(this.level.enemies);

        this.ctx.translate(-this.cameraX, 0);

        // draw() wird immer wieder aufgerufen
        // schlechte Grafikkarte 25 x pro Sekunde
        // gute Grafikkarte 60 x pro Sekunde
        let self = this;
        requestAnimationFrame(function() {
            if (!endOfGame) {
                self.draw()
            }
        });
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
        // mo.drawFrame(this.ctx);

        if(mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0); //verschiebt x-Achse Breite des Bildes nach links, y bleibt
        this.ctx.scale(-1, 1); //spiegelt die x-Achse
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore(); //to save()
    }
}

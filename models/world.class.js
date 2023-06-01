class World {
    level = level1;
    canvas;
    ctx;
    cameraX = 0;
    statusbarCoin = new StatusbarCoin();
    statusbarHealth = new StatusbarHealth(30, 10);
    statusbarBottle = new StatusbarBottle();
    throwedBottles = [];
    character = new Character(this);
    keyboard;
    myTimeout;
    endboss = this.level.enemies[this.level.enemies.length - 1];
    AUDIO_THROW = new Audio('./audio/throw.mp3');


    // enemiesLength() {
    //     // debugger;
    //     if (this.level.enemies.length < 1) {
    //         return 0 
    //     } else {
    //         return this.level.enemies.length - 1
    //     };
    // }


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.run();
    }


    run() {
        setStoppableInterval(this.checkCollisions.bind(this), 200);
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
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy) && this.character.isAboveGround()) {
                this.level.enemies.splice(enemy, 1);
                debugger;
                this.character.jumpsOnChicken();
            } else if(this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        });
    }

    checkCollisionCoins() {
        this.level.coins.forEach((coin) => {
            if(this.character.isColliding(coin) && this.keyboard.UP) {
                this.character.collectCoin();
                this.statusbarCoin.setPercentage(this.character.amountCoins);
                this.level.coins.splice(coin, 1);
            }
        });
    }

    checkCollisionBottles() {
        this.level.bottles.forEach((bottle) => {
            if(this.character.isColliding(bottle) && this.keyboard.UP) {
                this.level.bottles.splice(bottle, 1);
                this.throwedBottles.splice(0, 1);
                this.character.amountBottlesInPercentage = (20 - this.throwedBottles.length) * 5;
                this.statusbarBottle.setPercentage(this.character.amountBottlesInPercentage);
            }
        });
    }

    checkCollisionThrowableObject() {
        this.throwedBottles.forEach((bottle) => {
            if (this.endboss.isColliding(bottle)) {
                if (this.endboss.isDead()) {
                    this.endboss.energy = false;
                    this.youLost = true;
                    this.myTimeout = setTimeout(stopGame, 2000);
                } else {
                    this.endboss.hit();                }
            }
            this.endboss.statusbarHealthEndboss.setPercentage(this.endboss.energy);
        })
    }

    checkThrowObject() {
        if (this.keyboard.D) {
            if (!this.character.deadCharacter) {
                if (this.character.amountBottlesInPercentage == 0) {
                    return false;
                } else {
                    this.AUDIO_THROW.play();
                    let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                    this.throwedBottles.push(bottle);
                    this.character.amountBottlesInPercentage = (20 - this.throwedBottles.length) * 5;
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

        this.addObjectsToMap(this.level.enemies);

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

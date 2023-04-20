class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    cameraX = 0;
    statusbarCoin = new StatusbarCoin();
    statusbarHealth = new StatusbarHealth();
    statusbarBottle = new StatusbarBottle();
    throwedBottles = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.checkCollision();
    }
    keyboard;
    setWorld() {
        this.character.world = this; //auf alle Variablen in der Klasse World Zugang
    }

    run() {
        setInterval(() => {
            this.checkCollision();
            this.checkThrowObject();
        }, 200);
    }

    checkCollision() {
            this.level.enemies.forEach((enemy) => {
                if(this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.statusbarHealth.setPercentage(this.character.energy);
                }
            });
            this.level.coins.forEach((coin) => {
                if(this.character.isColliding(coin) && this.keyboard.UP) {
                    this.character.collectCoin();
                    this.statusbarCoin.setPercentage(this.character.amountCoins);
                    this.level.coins.splice(coin, 1);
                    this.character.collectingAnimationCharacter();
                }
            });
            this.level.bottles.forEach((bottle) => {
                if(this.character.isColliding(bottle) && this.keyboard.UP) {
                    debugger;
                    this.level.bottles.splice(bottle, 1);
                    this.throwedBottles.splice(0, 1);
                    this.character.amountBottlesInPercentage = (20 - this.throwedBottles.length) * 5;
                    this.statusbarBottle.setPercentage(this.character.amountBottlesInPercentage);
                }
            });
    }

    checkThrowObject() {
        if (this.keyboard.D) {
            if (!this.character.dead) {
                if (this.character.amountBottlesInPercentage == 0) {
                    return false;
                } else {
                    // this.character;
                    // this.ctx.scale(2, 2);
                    let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
                    this.throwedBottles.push(bottle);
                    // this.character.throwBottle();
                    this.character.amountBottlesInPercentage = (20 - this.throwedBottles.length) * 5;
                    this.statusbarBottle.setPercentage(this.character.amountBottlesInPercentage);
                    // this.statusbarBottle.setPercentage(this.character.bottleAmount);
                }
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
        this.ctx.translate(this.cameraX, 0);
        // --------- space for fixed objects -----------

        this.addObjectsToMap(this.throwedBottles);
        if (!this.character.dead) {
            this.addToMap(this.character);
        }
        this.addObjectsToMap(this.level.enemies);


        this.ctx.translate(-this.cameraX, 0);

        // draw() wird immer wieder aufgerufen
        // schlechte Grafikkarte 25 x pro Sekunde
        // gute Grafikkarte 60 x pro Sekunde
        let self = this;
        requestAnimationFrame(function() {
            self.draw()
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
        mo.drawFrame(this.ctx);

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
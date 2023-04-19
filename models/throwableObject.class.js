class ThrowableObject extends MovableObject {
    // speedY = 10;
    // speedX = 10;

    constructor(x, y) {
        super().loadImage('./img/img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 50;
        this.width = 50;
        this.throw(x, y);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        setInterval( () => {
            this.x += 10;
        }, 25)
    }
}
class Bottles extends MovableObject {
    IMAGE_BOTTLE = './img/img/6_salsa_bottle/salsa_bottle.png';
    
    y = 100;
    x = 1000;
    height = 50;
    width = 50;

    constructor(x, y) {
        super().loadImage(this.IMAGE_BOTTLE);
        this.x = x;
        this.y = y;
        // this.collectingAnimation(this.x);
    }
}
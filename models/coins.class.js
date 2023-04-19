class Coins extends MovableObject {
    IMAGE_COINS = `./img/img/8_coin/coin_1.png`;
    y = 175;
    x = 1000;
    height = 100;
    width = 100;
    // otherDirection = false;

    constructor(x, i) {
        super().loadImage(this.IMAGE_COINS);
        this.x = x;
        this.i = i;
        // this.level.setCoins(i);
    }
}
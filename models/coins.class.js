class Coins extends MovableObject {
    IMAGE_COINS = `./img/img/8_coin/coin_1.png`;
    y = 100;
    x = 1000;
    height = 100;
    width = 100;

    constructor(x) {
        super().loadImage(this.IMAGE_COINS);
        this.x = x;
    }
}
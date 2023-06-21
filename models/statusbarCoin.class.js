class StatusbarCoin extends DrawableObject {
    percentage = 100;
    IMAGES_COIN = [
        `./img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png`,
        `./img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png`,
        `./img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png`,
        `./img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png`,
        `./img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png`,
        `./img/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png`
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_COIN);
        this.x = 30;
        this.y = 50;
        this.height = 50;
        this.width = 170;
        this.setPercentage(0);
    }

    //setPercentage(50);
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES_COIN[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 70) {
            return 4;
        } else if (this.percentage > 50) {
            return 3;
        } else if (this.percentage > 30) {
            return 2;
        } else if (this.percentage > 10) {
            return 1;
        } else {
            return 0;
        }
    }
}
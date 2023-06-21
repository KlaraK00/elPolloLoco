class StatusbarBottle extends DrawableObject {
    percentage = 100;
    IMAGES_BOTTLE = [
        `./img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png`,
        `./img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png`,
        `./img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png`,
        `./img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png`,
        `./img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png`,
        `./img/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png`
    ]

    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLE);
        this.x = 30;
        this.y = 90;
        this.height = 50;
        this.width = 170;
        this.setPercentage(this.percentage);
    }

    //setPercentage(50);
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES_BOTTLE[this.resolveImageIndex()];
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
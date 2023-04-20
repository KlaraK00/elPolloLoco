class StatusbarHealth extends DrawableObject {
    IMAGES_HEALTH = [
        `./img/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png`,
        `./img/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png`,
        `./img/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png`,
        `./img/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png`,        
        `./img/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png`,
        `./img/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png`
    ]

    percentage = 100;
    
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 30;
        this.y = 10;
        this.height = 50;
        this.width = 170;
        this.setPercentage(100);
    }

    //setPercentage(50);
    setPercentage(percentage) {
        this.percentage = percentage; // => 0 ... 5
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
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
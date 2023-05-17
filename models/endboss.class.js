class Endboss extends MovableObject {
    x = 2000;
    y = 65;
    height = 400;
    width = 280;
    energy = 100;
    statusbarHealthEndboss = new StatusbarHealth(510, 10);
    // world;

    IMAGES_WALKING = [
        './img/img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    IMAGES_HURT = [
        './img/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]

    constructor() {
        super().loadImage('./img/img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.animate();
    }

    fullAnimation() {
        setStoppableInterval( () => {
            this.animate();
        }, 500);
        this.moveLeft();
    }


    animate() {
        // setStoppableInterval(this.playAnimation(this.IMAGES_WALKING).bind(this), 500);
        debugger;
        if (this.isHurt()) {
            debugger;
            this.playAnimation(this.IMAGES_HURT);
        } else {
        // setStoppableInterval( () => {
            this.playAnimation(this.IMAGES_WALKING);
        // }, 500);
        }

        this.moveLeft();
    }
}
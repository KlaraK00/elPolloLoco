class Endboss extends MovableObject {
    x = 1200;
    y = 65;
    height = 400;
    width = 280;

    IMAGES_WALKING = [
        './img/img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/img/4_enemie_boss_chicken/1_walk/G4.png'
    ]

    constructor() {
        super().loadImage('./img/img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    animate() {
        setInterval( () => {
            this.playAnimation(this.IMAGES_WALKING);
        }
            , 500);

        this.moveLeft();
    }
}
class Chicken extends MovableObject {
    y = 300;
    height = 60;
    width = 70;
    IMAGES_WALKING = [
        './img/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ]

    constructor() {
        super().loadImage('./img/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 1000 + Math.random() * 2500; // Zahl zwischen 600 und 3100
        this.speed = 0.15 + Math.random() * 0.25;

        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    animate() {
        setStoppableInterval( () => {
            this.playAnimation(this.IMAGES_WALKING);
        }
            , 100);

        this.moveLeft();
    }
}
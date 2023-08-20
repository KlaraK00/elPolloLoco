class Endboss extends MovableObject {
    x = 3000;
    y = 0;
    height = 400;
    width = 280;
    energy = 100;
    statusbarHealthEndboss = new StatusbarHealth(520, 90);
    speed = 0.2;
    deadEndboss = false;
    firstTime = true;
    meetFirstTime = true;
    index;
    i = 0;
    bossMoveLeftAnimationInterval;
    IMAGES_WALKING = [
        './img/img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/img/4_enemie_boss_chicken/1_walk/G4.png'
    ]
    IMAGES_ALERTING = [
        'img/img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/img/4_enemie_boss_chicken/2_alert/G12.png',
    ]
    IMAGES_HURT = [
        './img/img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ]
    IMAGES_DEAD = [
        './img/img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    constructor(index) {
        super().loadImage('./img/img/4_enemie_boss_chicken/1_walk/G1.png');
        this.index = index;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERTING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    }

    /**
     * This function is used to animate the endboss.
     */
    fullAnimation() {
        this.bossAnimate()
        this.bossMoveLeft();
    }

    bossAnimate() {
        setStoppableInterval( () => {
            this.animate();
        }, 330);
    }

    bossMoveLeft() {
        this.bossMoveLeftAnimationInterval = setStoppableInterval(() => {
            this.x -= this.speed;
            }, 1000 / 60);
    }

    animate() {
        if (this.i < 8) {
            this.playAnimation(this.IMAGES_ALERTING);
            this.i++;
        } else {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if (niveau == 2) {
                    this.speed=+1.5;
                }
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }
    }
}
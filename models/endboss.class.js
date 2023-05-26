class Endboss extends MovableObject {
    x = 3000;
    y = 65;
    height = 400;
    width = 280;
    energy = 100;
    statusbarHealthEndboss = new StatusbarHealth(510, 10);
    speed = 0.2;
    deadEndboss = false;
    firstTime = true;
    meetFirstTime = true;
    i = 0;
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


    constructor() {
        debugger;
        super().loadImage('./img/img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERTING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        // this.fullAnimation();
        // setTimeout(this.fullAnimation, 2000);
        // setStoppableInterval(this.checkCollisions.bind(this), 200);
    }


    fullAnimation() {
        setStoppableInterval( () => {
            this.animate();
            // this.animate().bind(this);
        }, 330);
        this.moveLeft();
        // this.moveLeft().bind(this);
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
            } else {
                this.playAnimation(this.IMAGES_WALKING);
                console.log(world.character.x + " this ist characterX");
            }
        }
    }
}
class Endboss extends MovableObject {
    x = 2000;
    y = 65;
    height = 400;
    width = 280;
    energy = 100;
    statusbarHealthEndboss = new StatusbarHealth(510, 10);
    speed = 0.2;
    deadEndboss = false;
    firstTime = true;
    // moveLeft = this.moveLeft();
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

    IMAGES_DEAD = [
        './img/img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/img/4_enemie_boss_chicken/5_dead/G26.png'
    ]

    constructor() {
        super().loadImage('./img/img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.fullAnimation();
    }

    fullAnimation() {
        setStoppableInterval( () => {
            this.animate();
        }, 330);
        this.moveLeft();
    }


    animate() {
        if (this.isDead()) {
            debugger;
            // clearInterval(animateNameInterval);
            // this.playAnimationsright();
            this.playAnimation(this.IMAGES_DEAD);
            // this.endbossIsDead();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    playAnimationsright() {


        // debugger;
        // setStoppableInterval( () => {
        //     this.myDeadAnimations();
        // }, 500);

        // this.currentImage % images.length; // let i = 6 % 6; 1, Rest 0 (Modulu hebt nur den Rest auf)
        // // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, ... % = "modulo"
        // let path = images[i];
        // this.img = this.imageCache[path];
        // this.currentImage++;

        // for (let i = 0; i < images.length; i++) {
        //     let path = images[i];
        //     this.img = this.imageCache[path];
        // }

    }

    myDeadAnimations() {
        let i = 0;
        let images = this.IMAGES_DEAD;
        if (i > 2) {
            let path = images[i];
            this.img = this.imageCache[path];
            i++;
        }
    }


    playDeadAnimation(images) {
        this.currentImage = 0;
        setStoppableInterval( () => {
            this.animatingDead(images);
        }, 200);
    }


    animatingDead(images) {
        if (firstTime) {
            let i = this.currentImage % images.length; // let i = 6 % 6; 1, Rest 0 (Modulu hebt nur den Rest auf)
            // i = 0, 1, 2, 3, 4, 5, 0, 1, 2, 3, 4, 5, 0, 1, ... % = "modulo"
            let path = images[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
        if (this.currentImage > 6) {
            firstTime = false;
            // this.deadEndboss = true;
            // clearInterval(this.finalDeadAnimation);
            // clearInterval(this.animation);
        }
}


    endbossIsDead() {
        // debugger;
        // clearInterval(this.moveLeft);
        // debugger;
        this.playDeadAnimation(this.IMAGES_DEAD);
        // this.myTimeout = setTimeout(stopGame, 2000);

        // this.playAnimation(this.IMAGES_DEAD);
        // this.myTimeout = setTimeout(stopGame, 2000);
    }
}
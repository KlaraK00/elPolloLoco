class Character extends MovableObject {

    height = 280;
    width = 120;
    y = 10;
    x = 200;
    world;
    speed = 2.5;
    timeInterval = 100;
    amountCoins = 0;
    amountBottlesInPercentage = 100;
    myTimeout;
    characterDead = false;
    offset = {
        top: 120,
        left: 30,
        right: 40,
        bottom: 30
    }

    IMAGES_WALKING = [
        './img/img/2_character_pepe/2_walk/W-21.png',
        './img/img/2_character_pepe/2_walk/W-22.png',
        './img/img/2_character_pepe/2_walk/W-23.png',
        './img/img/2_character_pepe/2_walk/W-24.png',
        './img/img/2_character_pepe/2_walk/W-25.png',
        './img/img/2_character_pepe/2_walk/W-26.png'
    ]

    IMAGES_JUMPING = [
        './img/img/2_character_pepe/3_jump/J-31.png',
        './img/img/2_character_pepe/3_jump/J-32.png',
        './img/img/2_character_pepe/3_jump/J-33.png',
        './img/img/2_character_pepe/3_jump/J-34.png',
        './img/img/2_character_pepe/3_jump/J-35.png',
        './img/img/2_character_pepe/3_jump/J-36.png',
        './img/img/2_character_pepe/3_jump/J-37.png',
        './img/img/2_character_pepe/3_jump/J-38.png',
        './img/img/2_character_pepe/3_jump/J-39.png',
    ]

    IMAGES_STANDING = [
        './img/img/2_character_pepe/1_idle/idle/I-1.png',
        './img/img/2_character_pepe/1_idle/idle/I-2.png',
        './img/img/2_character_pepe/1_idle/idle/I-3.png',
        './img/img/2_character_pepe/1_idle/idle/I-4.png',
        './img/img/2_character_pepe/1_idle/idle/I-5.png',
        './img/img/2_character_pepe/1_idle/idle/I-6.png',
        './img/img/2_character_pepe/1_idle/idle/I-7.png',
        './img/img/2_character_pepe/1_idle/idle/I-8.png',
        './img/img/2_character_pepe/1_idle/idle/I-9.png',
        './img/img/2_character_pepe/1_idle/idle/I-10.png'
    ]

    IMAGES_DEAD = [
        './img/img/2_character_pepe/5_dead/D-51.png',
        './img/img/2_character_pepe/5_dead/D-52.png',
        './img/img/2_character_pepe/5_dead/D-53.png',
        './img/img/2_character_pepe/5_dead/D-54.png',
        './img/img/2_character_pepe/5_dead/D-55.png',
        './img/img/2_character_pepe/5_dead/D-56.png',
        './img/img/2_character_pepe/5_dead/D-57.png'
    ]

    IMAGES_HURT = [
        'img/img/2_character_pepe/4_hurt/H-41.png',
        'img/img/2_character_pepe/4_hurt/H-42.png',
        'img/img/2_character_pepe/4_hurt/H-43.png'
    ]

    AUDIO_WALKING = new Audio('./audio/walking.mp3');
    AUDIO_JUMP = new Audio('./audio/jump.mp3');
    AUDIO_HURT = new Audio('./audio/hurt.mp3');

    constructor(world) {
        super().loadImage('./img/img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.world = world;
        setStoppableInterval( () => {
            this.animating();
        }, 150);
        setStoppableInterval( () => {
            this.moving();
        }, 1000 / 60);
        // this.finalDeadAnimation = 
        //     setInterval( () => {
        //         this.animatingDead(this.IMAGES_DEAD);
        //     }, 200);
    }


    moving() {
        if(this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) {
            this.moveRightDirection();
        }
        if(this.world.keyboard.LEFT && this.x > 0) {
            this.moveWrongDirection();
        } //wieso 172.5 genau??
        if(this.world.keyboard.UP && this.y == 85) { // davor 145 CHARACTER Y
            this.jump();
        }
        this.world.cameraX = -this.x + 200;
    }


    animating() {
        console.log('character y = ' + this.y);
        this.AUDIO_WALKING.pause();
        console.log('this.y = '+ this.y);
        if (this.isDead()) {
            this.characterIsDead();
        } else if (this.isHurt()) {
            this.AUDIO_HURT.play();
            console.log("is Hurt Character", this.isHurt());
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAboveGround()) {
            this.AUDIO_JUMP.play();
            this.playAnimation(this.IMAGES_JUMPING);
        } else if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
            this.AUDIO_WALKING.play();
            this.timeInterval = 100;
            this.playAnimation(this.IMAGES_WALKING);
        } 
        else {
            this.timeInterval = 1; //nimmt 1 nicht??
            this.playAnimation(this.IMAGES_STANDING);
        }
    }


    moveRightDirection() {
        this.x += this.speed;
        this.otherDirection = false;
    }
    

    moveWrongDirection() {
        this.x -= this.speed;
        this.otherDirection = true;
    }


    collectCoin() {
        if (this.amountCoins >= 100) {
            this.amountCoins = 100;
            console.log('amountCoins is ' + this.amountCoins);
        } else {
            this.amountCoins += 10;
            console.log('amountCoins is ' + this.amountCoins);
        }
    }


    // collectingAnimationCharacter() {
    //     console.log('collected Item');
    // }


    characterIsDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.myTimeout = setTimeout(stopGame, 2000);
    }
}
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
        this.animateCharacter();
    }

    animateCharacter() {
        setStoppableInterval(() => {
            this.animating();
        }, 150);
        setStoppableInterval(() => {
            this.moving();
        }, 1000 / 60);
    }

    animating() {
        this.pauseAudioWalking();
        if (this.isDead()) {
            this.characterIsReallyDead();
        } else if (this.isHurt()) {
            this.characterHurt();
        } else if (this.isAboveGround()) {
            this.characterJumps();
        } else if (this.characterCanWalk()) {
            this.characterWalks();
        } else {
            this.playAnimation(this.IMAGES_STANDING);
        }
    }

    characterHurt() {
        this.playAudioHurt();
        this.playAnimation(this.IMAGES_HURT);
    }

    characterJumps() {
        this.playAudioJump();
        this.playAnimation(this.IMAGES_JUMPING);
    }

    characterCanWalk() {
        return this.world.keyboard.RIGHT || this.world.keyboard.LEFT
    }

    characterWalks() {
        this.playAudioWalking();
        this.timeInterval = 100;
        this.playAnimation(this.IMAGES_WALKING);
    }

    pauseAudioWalking() {
        if (volumeOn) 
            this.AUDIO_WALKING.pause();
    }

    playAudioHurt() {
        if (volumeOn) 
            this.AUDIO_HURT.play();
    }

    playAudioJump() {
        if (volumeOn) 
            this.AUDIO_JUMP.play();
    }

    playAudioWalking() {
        if (volumeOn) {
            this.AUDIO_WALKING.play();
        }
    }

    moving() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.levelEndX) 
            this.moveRightDirection();
        if (this.world.keyboard.LEFT && this.x > 0)
            this.moveWrongDirection();
        if (this.world.keyboard.UP && this.y == 85) {
            this.jump();
        }
        this.world.cameraX = -this.x + 200; //wieso?
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


    characterIsReallyDead() {
        this.playAnimation(this.IMAGES_DEAD);
        this.myTimeout = setTimeout(stopGame, 2000);
    }
}
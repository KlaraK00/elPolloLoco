class Level {
    enemies;
    clouds;
    backgroundObjects;
    levelEndX = 2200;
    coins;
    bottles;
    // coinArray = [];

    constructor(enemies, clouds, backgroundObjects, coins, bottles) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
        this.setLevel();
        // this.functionForTheCoins();
    }
    setLevel() {
        this.coins.coins.level = this;
    }

    setCoins(i) {
        console.log('hello' + i);
    }


    // functionForTheCoins() {
    //     this.coins.level = this;
        // this.character.world = this;  
    // }
}
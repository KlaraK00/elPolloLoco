let level2; 

function initVariableLevel2() {
    level2 = new Level(
        [
            // new Chicken(),
            // new Chicken(),
            // new Chicken(),
            // new Chicken(),
            // new Chicken(),
            // new Chicken(),
            // new Chicken(),
            // new Chicken(),
            new Endboss(2),
        ],
        [
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud(),
            new Cloud()
        ],
        [
            new BackgroundObject('./img/img/5_background/layers/air.png', -719),  
            new BackgroundObject('./img/img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('./img/img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('./img/img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('./img/img/5_background/layers/air.png', 0),  
            new BackgroundObject('./img/img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./img/img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./img/img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('./img/img/5_background/layers/air.png', 719),  
            new BackgroundObject('./img/img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('./img/img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('./img/img/5_background/layers/1_first_layer/2.png', 719),
            
            new BackgroundObject('./img/img/5_background/layers/air.png', 719*2),  
            new BackgroundObject('./img/img/5_background/layers/3_third_layer/1.png', 719*2),
            new BackgroundObject('./img/img/5_background/layers/2_second_layer/1.png', 719*2),
            new BackgroundObject('./img/img/5_background/layers/1_first_layer/1.png', 719*2),
            new BackgroundObject('./img/img/5_background/layers/air.png', 719*3),  
            new BackgroundObject('./img/img/5_background/layers/3_third_layer/2.png', 719*3),
            new BackgroundObject('./img/img/5_background/layers/2_second_layer/2.png', 719*3),
            new BackgroundObject('./img/img/5_background/layers/1_first_layer/2.png', 719*3),

            new BackgroundObject('./img/img/5_background/layers/air.png', 719*4),  
            new BackgroundObject('./img/img/5_background/layers/3_third_layer/1.png', 719*4),
            new BackgroundObject('./img/img/5_background/layers/2_second_layer/1.png', 719*4),
            new BackgroundObject('./img/img/5_background/layers/1_first_layer/1.png', 719*4),
            new BackgroundObject('./img/img/5_background/layers/air.png', 719*5),  
            new BackgroundObject('./img/img/5_background/layers/3_third_layer/2.png', 719*5),
            new BackgroundObject('./img/img/5_background/layers/2_second_layer/2.png', 719*5),
            new BackgroundObject('./img/img/5_background/layers/1_first_layer/2.png', 719*5),

            new BackgroundObject('./img/img/5_background/layers/air.png', 719*6),  
            new BackgroundObject('./img/img/5_background/layers/3_third_layer/1.png', 719*6),
            new BackgroundObject('./img/img/5_background/layers/2_second_layer/1.png', 719*6),
            new BackgroundObject('./img/img/5_background/layers/1_first_layer/1.png', 719*6),
            new BackgroundObject('./img/img/5_background/layers/air.png', 719*7),  
            new BackgroundObject('./img/img/5_background/layers/3_third_layer/2.png', 719*7),
            new BackgroundObject('./img/img/5_background/layers/2_second_layer/2.png', 719*7),
            new BackgroundObject('./img/img/5_background/layers/1_first_layer/2.png', 719*7),
        ],
        [
            new Coins(800),
            new Coins(900),
            new Coins(1000),
            new Coins(1100),
            new Coins(1400),
            new Coins(1600),
            new Coins(2000),
            new Coins(2200),
            new Coins(2600),
            new Coins(2800)
        ],
        [   
            new Bottles(2100),
            new Bottles(2300),
            new Bottles(3400),
            new Bottles(3500),
            new Bottles(3700)
        ]
    );
}
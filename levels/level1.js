let level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(1),
    ],
    [
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
        new Coins(1100),
        new Coins(1200),
        new Coins(1300),
        new Coins(1400),
        new Coins(1600),
        new Coins(1700),
        new Coins(1800),
        new Coins(1900),
        new Coins(2700),
        new Coins(2800)
    ],
    [   
        new Bottles(2500, 100),
        new Bottles(2500, 60),
        new Bottles(2900, 100),
        new Bottles(3350, 60),
        new Bottles(3350, 100)
    ]
);

function initVariableLevel1() {

    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss(1),
        ],
        [
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
            new Coins(1100),
            new Coins(1200),
            new Coins(1300),
            new Coins(1400),
            new Coins(1600),
            new Coins(1700),
            new Coins(1800),
            new Coins(1900),
            new Coins(2700),
            new Coins(2800)
        ],
        [   
            new Bottles(2500, 100),
            new Bottles(2500, 60),
            new Bottles(2900, 100),
            new Bottles(3350, 60),
            new Bottles(3350, 100)
        ]
    );
}
const level2 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss(),
    ],
    [
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
        new Coins(1600),
        new Coins(1800),
        new Coins(2500),
        new Coins(2600),
        new Coins(3000),
        new Coins(3020),
    ],
    [   
        new Bottles(2000),
        new Bottles(2200),
        new Bottles(3500),
        new Bottles(3400)
    ]
);
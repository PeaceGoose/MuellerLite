var mainState = {
    preload: function () {
        // Here we preload the assets

        //name image on the left, give path to image on the right 
        game.load.image('player', 'media/doggo.png');
        game.load.image('wall', 'media/wall.png');
        game.load.image('coin', 'media/coke.png');
        game.load.image('enemy', 'media/enemy.png');
<<<<<<< HEAD
        game.load.image('chef', 'media/chef.png');
        game.load.audio('audio', 'media/bird.m4a');
        game.load.tilemap('map', 'media/Doggo.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.image('tileset', 'media/strawberry_cake_tileset_small.png')
=======
        game.load.image('egg','media/egg.png');
        game.load.audio('audio','media/bird.m4a');
>>>>>>> d4682726c82fa52730c12f0c0f300d63c6e5bfee
    },

    create: function () {
        // Here we create the game

        //change the game's background color
        game.stage.backgroundColor = '#3598db';

        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the physics engine to all game objects
        game.world.enableBody = true;

        this.cursor = game.input.keyboard.createCursorKeys();

        // Create the player in the middle of the game
        this.player = game.add.sprite(70, 100, 'player');
        this.score = 0;
        // Add gravity to make it fall
        this.player.body.gravity.y = 600;

        // Create 3 groups that will contain our objects
        this.walls = game.add.group();
        this.coins = game.add.group();
        this.enemies = game.add.group();
        this.chefs = game.add.group();
        
        this.danger = game.add.sprite(200, 95, 'chef')
        this.enemies.add(this.danger);
        this.tween = game.add.tween(this.danger).to( { x:400, y:95 }, 1000, "Linear", true, 0, -1);
        
        this.tween.yoyo(true, 0);

        // Design the level. x = wall, o = coin, ! = lava.
<<<<<<< HEAD
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('strawberry_cake_tileset_small', 'tileset');
        
        
        this.objectLayer = this.map.createLayer('Obstacles');
        this.wallsLayer = this.map.createLayer('Walls');
        
        this.map.setCollision([239, 320, 519, 202,], true, this.wallsLayer);
        this.world.enableBody = true;
        this.world.setBounds = (0, 0, 1280, 640);

        // Create the level by going through the array
//        for (var i = 0; i < level.length; i++) {
//            for (var j = 0; j < level[i].length; j++) {
//
//                if (level[i][j] === 'x') {
//                    var wall = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'wall');
//                    this.walls.add(wall);
//                    wall.body.immovable = true;
//
//                } else if (level[i][j] === '!') {
//                    var enemy = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'enemy');
//                    this.enemies.add(enemy);
//                } else if (level[i][j] === 'o') {
//                    var coin = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'coin');
//                    this.coins.add(coin);
//                }
//
//
//
//
//            }
//        }
=======
        var level = [
            'xxxxxxxxxxxxxxxxxxxxxx               x',
            '!         !          x               x',
            '!                 o  x               x',
            '!         o                          x',
            '!                                    x',
            '!     o   !    x     x               x',
            'xxxxxxxxxxxxxxxx!!!!!x',
        ];

        // Create the level by going through the array
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {

                if (level[i][j] === 'x') {
                    var wall = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'wall');
                    this.walls.add(wall);
                    wall.body.immovable = true;

                } else if (level[i][j] === '!') {
                    var enemy = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'enemy');
                    this.enemies.add(enemy);
                } else if (level[i][j] === 'o') {
                    var coin = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'coin');
                    this.coins.add(coin);
                }




            }
            
        }
>>>>>>> d4682726c82fa52730c12f0c0f300d63c6e5bfee

    },

    update: function () {
        //Check for players and walls colliding
        game.physics.arcade.collide(this.player, this.wallsLayer);

        //check for player and coins overlapping
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

        //check for player and enemy overlapping
        game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);

        if (this.score >= 3) {
            var text = game.add.text(game.world.centerX, game.world.centerY, "You Won",
                {
                    fill: 'white'
                });
            text.anchor.setTo(0.5, 0.5);
        }

        if (this.cursor.left.isDown) {
            this.player.body.velocity.x = -200;
        } else if (this.cursor.right.isDown) {
            this.player.body.velocity.x = 200;
        } else {
            this.player.body.velocity.x = 0;
        }
        if (this.cursor.up.isDown && this.player.body.touching.down) {
            this.player.body.velocity.y = -200;
        }
        if(this.cursor.down.isDown){
            game.state.restart()
        }
    },

    takeCoin: function (player, coin) {
        this.score++;
        coin.kill();
         game.sound.play('audio')
    },
    restart: function () {
        game.state.start('main');
    }

};

// Initialize the game and start our state
var game = new Phaser.Game(1280, 640);
game.state.add('main', mainState);
game.state.start('main');
var mainState = {
    preload: function () {
        // Here we preload the assets

        //name image on the left, give path to image on the right 
        game.load.image('player', 'media/doggo.png');
        game.load.image('wall', 'media/wall.png');
        game.load.image('coin', 'media/coke.png');
        game.load.image('enemy', 'media/enemy.png');
        game.load.audio('audio','media/bird.m4a');
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

        // Design the level. x = wall, o = coin, ! = lava.
        var level = [
            'xxxxxxxxxxxxxxxxxxxxxx',
            '!         !          x',
            '!                 o  x',
            '!         o          x',
            '!                    x',
            '!     o   !    x     x',
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


    },

    update: function () {
        //Check for players and walls colliding
        game.physics.arcade.collide(this.player, this.walls);

        //check for player and coins overlapping
        game.physics.arcade.overlap(this.player, this.coins, this.takeCoin, null, this);

        //check for player and enemy overlapping
        game.physics.arcade.overlap(this.player, this.enemies, this.restart, null, this);

        if (this.score >= 3) {
            var text = game.add.text(game.world.centerX, game.world.centerY, "You won",
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
var game = new Phaser.Game(800, 600);
game.state.add('main', mainState);
game.state.start('main');
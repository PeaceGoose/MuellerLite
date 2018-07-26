var mainState = {
    preload: function () {
        // Here we preload the assets

        //name image on the left, give path to image on the right 
        game.load.image('player', 'media/doggo.png');
        game.load.image('wall', 'media/wall.png');
        game.load.image('coke', 'media/coke.png');
        game.load.image('enemy', 'media/depression.png');
        game.load.image('chef', 'media/chef.png');
        game.load.image('egg','media/egg.png');
        game.load.image('background', 'media/openconceptkitchen.png')
        game.load.audio('audio', 'media/bird.m4a');

    },

    create: function () {
        // Here we create the game

        //change the game's background color
        background = game.add.tileSprite(0, 0, 1400, 700, 'background');

        // Start the Arcade physics system (for movements and collisions)
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the physics engine to all game objects
        game.world.enableBody = true;

        this.cursor = game.input.keyboard.createCursorKeys();

        // Create the player in the middle of the game
        this.player = game.add.sprite(70, 100, 'player');
        this.score = 0;
        
        // Add gravity to make it fall
        this.player.body.gravity.y = 1000;

        // Create 3 groups that will contain our objects
        this.walls = game.add.group();
        this.cokes = game.add.group();
        this.enemies = game.add.group();
        this.chefs = game.add.group();
        
        this.danger = game.add.sprite(200, 200, 'chef')
        this.enemies.add(this.danger);
        this.tween = game.add.tween(this.danger).to( { x:400, y:200 }, 1000, "Linear", true, 0, -1);
        this.tween.yoyo(true, 0);
        
        this.danger = game.add.sprite(600, 400, 'chef')
        this.enemies.add(this.danger);
        this.tween = game.add.tween(this.danger).to( { x:800, y:400 }, 1000, "Linear", true, 0, -1);
        this.tween.yoyo(true, 0);
        
        // Design the level. x = wall, o = coke, ! = depression.
        var level = [
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            'x                                                                                x',
            'x                                                                                x',
            'x                                    o                                           x',
            'x                    o               x                                           x',
            'x                   xxx            !   !                                         x',
            'xxxxxxxxxxxxx     xx   xx    xxxx!!!!!!!!!xxxx    x !x !x !x !x !x !x            x', 
            'x             !!!                                                                x',
            'x                         !!                                                     x',
            'x                                                                                x',
            'x                                                                                x',
            'x                                                                                x',
            'x                                                                                x',
            'x                                                                                x',
            'x                                                                                x',
            'x                                                                                x',
            'x                                                                                x',
            'x                                                                                x',
            'x                                                                                x',
            'x                                                                                x',
            'x                                                                                x',
            'x                                                                                x',
            'x                                                                                x',
            'x                                                                                x',
            'x                                                                                x',
            'x                                                                                x',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            
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
                    var coke = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'coke');
                    this.cokes.add(coke);
                } else if (level[i][j] === 'c') {
                    var chef = game.add.sprite(30 + 20 * j, 30 + 20 * i, 'chef');
                    this.chefs.add(chef);
                }




            }
            
        }

    },

    update: function () {
        //Check for players and walls colliding
        game.physics.arcade.collide(this.player, this.walls);

        //check for player and coins overlapping
        game.physics.arcade.overlap(this.player, this.cokes, this.takeCoke, null, this);

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
            this.player.body.velocity.y = -300;
        }
        if(this.cursor.down.isDown){
            game.state.restart()
        }
    },

    takeCoke: function (player, coke) {
        this.score++;
        coke.kill();
         game.sound.play('audio')
    },
    restart: function () {
        game.state.start('main');
    }

};

// Initialize the game and start our state
var game = new Phaser.Game(1400, 700);
game.state.add('main', mainState);
game.state.start('main');
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Wallaby;
(function (Wallaby) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            //this.load.image('preloadBar', 'assets/loader.png');
        };

        Boot.prototype.create = function () {
            this.input.maxPointers = 1;
            this.stage.disableVisibilityChange = true;

            if (this.game.device.desktop) {
                this.scale.pageAlignHorizontally = true;
            } else {
                //Mobile specific settings
            }

            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    Wallaby.Boot = Boot;
})(Wallaby || (Wallaby = {}));
var Wallaby;
(function (Wallaby) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            _super.call(this, 800, 600, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Wallaby.Boot, false);
            this.state.add('Preloader', Wallaby.Preloader, false);
            this.state.add('MainMenu', Wallaby.MainMenu, false);
            this.state.add('Level', Wallaby.Level, false);
            this.state.add('Victory', Wallaby.Victory, false);
            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    Wallaby.Game = Game;
})(Wallaby || (Wallaby = {}));
var Wallaby;
(function (Wallaby) {
    var killed;
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            _super.apply(this, arguments);
        }
        Level.prototype.create = function () {
            killed = false;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.gameBackground = this.game.add.sprite(0, 0, 'background');
            this.zoneSprite = this.game.add.sprite(5, 5, 'nudeTurtle');
            this.gameBackground.visible = true;
            this.zoneSprite.visible = true;
            this.game.physics.enable(this.zoneSprite, Phaser.Physics.ARCADE);
            this.zoneSprite.body.immovable = true;

            this.turtles = this.game.add.group();
            this.txt = this.game.add.group();

            for (var i = 0; i < 30; i++) {
                this.turtle = this.turtles.create(this.game.rnd.integerInRange(100, 700), this.game.rnd.integerInRange(100, 400), 'turtle');
                this.game.physics.enable(this.turtle, Phaser.Physics.ARCADE);
                this.turtle.body.velocity.x = this.game.rnd.integerInRange(-200, 200);
                this.turtle.body.velocity.y = this.game.rnd.integerInRange(-200, 200);
                this.turtle.inputEnabled = true;
                this.turtle.input.enableDrag();
            }

            this.turtles.setAll('body.collideWorldBounds', true);
            this.turtles.setAll('body.bounce.x', 1);
            this.turtles.setAll('body.bounce.y', 1);
            this.turtles.setAll('body.minBounceVelocity', 0);

            this.turtles.callAll('events.onInputDown.add', 'events.onInputDown', this.endDrag);
            this.turtles.callAll('events.onInputUp.add', 'events.onInputUp', this.removeCheck);
            this.shellsCollected = 0;

            this.txt.fixedToCamera = true;
            this.initialTime = this.game.time.now;
            this.timeText = this.game.add.text(this.game.world.x + 775, 0, 'Time: ' + this.initialTime, { fontSize: '32px', fill: 'white', stroke: 'black', strokeThickness: 5 }, this.txt);
            this.shellText = this.game.add.text(this.game.world.x, 550, 'Shells: ', { fontSize: '32px', fill: 'white', stroke: 'black', strokeThickness: 5 }, this.txt);
            this.txt.bringToTop(true);
            this.levelOver = false;
        };

        Level.prototype.update = function () {
            this.timeText.setText(Math.floor(this.game.time.elapsedSince(this.initialTime) / 1000).toString());
            this.game.physics.arcade.collide(this.turtles);
            this.game.physics.arcade.collide(this.turtles, this.zoneSprite);
            this.shellText.setText("Shells: " + this.shellsCollected);

            if (this.game.time.elapsedSince(this.initialTime) / 1000 >= 30)
                this.game.state.start('Victory', true, false, this.shellsCollected, this.game);

            if (killed) {
                killed = false;
                this.shellsCollected++;
                console.log(this.shellsCollected);
            }
        };
        Level.prototype.startDrag = function () {
            this.turtle.body.moves = false;
        };

        Level.prototype.endDrag = function (temp) {
            temp.body.moves = false;
        };

        Level.prototype.removeCheck = function (temp) {
            temp.body.moves = true;
            if (temp.x < 240 && temp.y < 120) {
                killed = true;
                temp.kill();
            }
        };
        return Level;
    })(Phaser.State);
    Wallaby.Level = Level;
})(Wallaby || (Wallaby = {}));
var Wallaby;
(function (Wallaby) {
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.menuBackground = new Phaser.Sprite(this.game, 225, 0, 'menuBackground');
            this.menuBackground.visible = true;
            this.menuBackground.fixedToCamera = true;
            this.game.add.existing(this.menuBackground);

            this.play = new Phaser.Button(this.game, 300, 300, 'play');
            this.play.visible = true;
            this.play.fixedToCamera = true;
            this.play.inputEnabled = true;
            console.log("pls");
            this.game.add.existing(this.play);
            this.play.events.onInputDown.add(function () {
                this.menuBackground.visible = false;
                this.play.visible = false;
                this.game.state.start('Level', true, false);
            }, this);
        };

        MainMenu.prototype.update = function () {
        };
        return MainMenu;
    })(Phaser.State);
    Wallaby.MainMenu = MainMenu;
})(Wallaby || (Wallaby = {}));
var Wallaby;
(function (Wallaby) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            this.game.load.image('turtle', 'assets/turtle.png');
            this.game.load.image('nudeTurtle', 'assets/turtle_nude.png');
            this.game.load.image('quit', 'assets/quit.png');
            this.game.load.image('playAgain', 'assets/play_again.png');
            this.game.load.image('victoryBackground', 'assets/victory_background.png');
            this.game.load.image('menuBackground', 'assets/menu_background.png');
            this.game.load.image('play', 'assets/play.png');
            this.game.load.image('background', 'assets/background.png');
        };

        Preloader.prototype.create = function () {
            this.startMainMenu();
        };

        Preloader.prototype.startMainMenu = function () {
            this.game.state.start('MainMenu', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Wallaby.Preloader = Preloader;
})(Wallaby || (Wallaby = {}));
var Wallaby;
(function (Wallaby) {
    var Victory = (function (_super) {
        __extends(Victory, _super);
        function Victory() {
            _super.apply(this, arguments);
            this.finalScore = 0;
            this.highScore = 0;
        }
        Victory.prototype.init = function (score, game) {
            this.finalScore = score;
            this.game = game;
        };

        Victory.prototype.create = function () {
            this.victoryBackground = new Phaser.Sprite(this.game, 225, 0, 'victoryBackground');
            this.victoryBackground.visible = true;
            this.victoryBackground.fixedToCamera = true;
            this.game.add.existing(this.victoryBackground);

            this.playAgain = new Phaser.Button(this.game, 300, 300, 'playAgain');
            this.playAgain.visible = true;
            this.playAgain.fixedToCamera = true;
            this.playAgain.inputEnabled = true;
            this.game.add.existing(this.playAgain);
            this.playAgain.events.onInputDown.add(function () {
                this.victoryBackground.visible = false;
                this.playAgain.visible = false;
                this.quitButton.visible = false;
                this.game.state.start('Level', true, false);
            }, this);

            if (this.finalScore > this.highScore) {
                this.highScore = this.finalScore;
            }

            this.quitButton = new Phaser.Button(this.game, 300, 400, 'quit');
            this.quitButton.visible = true;
            this.quitButton.fixedToCamera = true;
            this.quitButton.inputEnabled = true;
            this.quitButton.events.onInputDown.add(function () {
                this.victoryBackground.visible = false;
                this.playAgain.visible = false;
                this.quitButton.visible = false;
                this.game.state.start('MainMenu', true, false);
            }, this);
            this.game.add.existing(this.quitButton);
            this.scoreText = this.game.add.text(this.game.world.x + 350, 85, 'Shells: ' + this.finalScore, { fontSize: '32px', fill: 'white', stroke: 'black', strokeThickness: 5 });
            this.highScoreText = this.game.add.text(this.game.world.x + 350, 115, 'High Score: ' + this.highScore, { fontSize: '32px', fill: 'white', stroke: 'black', strokeThickness: 5 });
        };

        Victory.prototype.update = function () {
        };
        Victory.prototype.displayFinal = function () {
        };

        Victory.prototype.startGame = function () {
            console.log("HI");
            this.victoryBackground.visible = false;
            this.playAgain.visible = false;
            this.game.state.start('Level', true, false);
        };
        return Victory;
    })(Phaser.State);
    Wallaby.Victory = Victory;
})(Wallaby || (Wallaby = {}));
window.onload = function () {
    var game = new Wallaby.Game();
};
//# sourceMappingURL=game.js.map

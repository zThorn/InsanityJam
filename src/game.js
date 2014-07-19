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

            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    Wallaby.Game = Game;
})(Wallaby || (Wallaby = {}));
var Wallaby;
(function (Wallaby) {
    var Level = (function (_super) {
        __extends(Level, _super);
        function Level() {
            _super.apply(this, arguments);
        }
        Level.prototype.create = function () {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.zoneSprite = this.game.add.sprite(0, 0, 'zone');
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

            this.txt.fixedToCamera = true;
            this.initialTime = this.game.time.now;
            this.timeText = this.game.add.text(this.game.world.x, 0, 'Time: ' + this.initialTime, { fontSize: '32px', fill: 'white', stroke: 'black', strokeThickness: 5 }, this.txt);
            this.txt.bringToTop(true);
        };

        Level.prototype.update = function () {
            this.timeText.setText(Math.floor(this.game.time.elapsedSince(this.initialTime) / 1000).toString() + ":");
            this.game.physics.arcade.collide(this.turtles);
            this.game.physics.arcade.collide(this.turtles, this.zoneSprite);
        };
        Level.prototype.startDrag = function () {
            this.turtle.body.moves = false;
        };

        Level.prototype.endDrag = function (temp) {
            temp.body.moves = false;
        };

        Level.prototype.removeCheck = function (temp) {
            temp.body.moves = true;
            if (temp.x < 120 && temp.y < 120)
                temp.kill();
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
            this.startGame();
        };

        MainMenu.prototype.fadeOut = function () {
        };

        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level', true, false);
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
            this.game.load.image('zone', 'assets/zone.png');
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
window.onload = function () {
    var game = new Wallaby.Game();
};
//# sourceMappingURL=game.js.map

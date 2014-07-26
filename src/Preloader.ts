module Wallaby {

    export class Preloader extends Phaser.State {


        preload() {


            this.game.load.image('turtle', 'assets/turtle.png');
            this.game.load.image('nudeTurtle', 'assets/turtle_nude.png');
            this.game.load.image('quit', 'assets/quit.png');
            this.game.load.image('playAgain','assets/play_again.png');
            this.game.load.image('victoryBackground','assets/victory_background.png');
            this.game.load.image('menuBackground','assets/menu_background.png');
            this.game.load.image('play','assets/play.png');
            this.game.load.image('background', 'assets/background.png');
        }

        create() {

            this.startMainMenu();
        }

        startMainMenu() {

            this.game.state.start('MainMenu', true, false);

        }

    }

}
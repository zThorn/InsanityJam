module Wallaby {

    export class Preloader extends Phaser.State {


        preload() {


            this.game.load.image('turtle', 'assets/turtle.png');
            this.game.load.image('zone', 'assets/zone.png');
        }

        create() {

            this.startMainMenu();
        }

        startMainMenu() {

            this.game.state.start('MainMenu', true, false);

        }

    }

}
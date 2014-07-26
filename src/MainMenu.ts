module Wallaby {
    export class MainMenu extends Phaser.State {
        menuBackground: Phaser.Sprite;
        quit: Phaser.Button;
        play: Phaser.Button;

        create() {
            this.menuBackground = new Phaser.Sprite(this.game, 225, 0, 'menuBackground');
            this.menuBackground.visible = true;
            this.menuBackground.fixedToCamera = true;
            this.game.add.existing(this.menuBackground);

            this.play = new Phaser.Button(this.game, 300,300, 'play');
            this.play.visible = true;
            this.play.fixedToCamera = true;
            this.play.inputEnabled = true;
            console.log("pls");
            this.game.add.existing(this.play);
            this.play.events.onInputDown.add(function(){
                this.menuBackground.visible = false;
                this.play.visible = false;
                this.game.state.start('Level', true, false);}, this);
        }

        update(){

        }
    }
} 
            //this.game.state.start('Level', true, false);


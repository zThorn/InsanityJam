module Wallaby {
    export class Victory extends Phaser.State {
        victoryBackground: Phaser.Sprite;
        quitButton: Phaser.Button;
        playAgain: Phaser.Button;
        finalScore: number  = 0;
        game: Phaser.Game;
        scoreText: Phaser.Text;
        highScore: number = 0;
        highScoreText: Phaser.Text;

        init(score, game: Phaser.Game){
            this.finalScore = score;
            this.game = game;
        }

        create() {
            this.victoryBackground = new Phaser.Sprite(this.game, 225, 0, 'victoryBackground');
            this.victoryBackground.visible = true;
            this.victoryBackground.fixedToCamera = true;
            this.game.add.existing(this.victoryBackground);

            this.playAgain = new Phaser.Button(this.game, 300,300, 'playAgain');
            this.playAgain.visible = true;
            this.playAgain.fixedToCamera = true;
            this.playAgain.inputEnabled = true;
            this.game.add.existing(this.playAgain);
            this.playAgain.events.onInputDown.add(function(){
                this.victoryBackground.visible = false;
                this.playAgain.visible = false;
                this.quitButton.visible = false;
                this.game.state.start('Level', true, false);}, this);
            
              if(this.finalScore>this.highScore){
                this.highScore = this.finalScore;
            }
            
            this.quitButton = new Phaser.Button(this.game,300,400,'quit');
            this.quitButton.visible = true;
            this.quitButton.fixedToCamera = true;
            this.quitButton.inputEnabled = true;
            this.quitButton.events.onInputDown.add(function(){
                this.victoryBackground.visible = false;
                this.playAgain.visible = false;
                this.quitButton.visible = false;
                this.game.state.start('MainMenu', true, false);}, this);
            this.game.add.existing(this.quitButton);
            this.scoreText =  this.game.add.text(this.game.world.x+350, 85,'Shells: '+this.finalScore, {fontSize: '32px', fill:'white', stroke: 'black',strokeThickness: 5});
            this.highScoreText =  this.game.add.text(this.game.world.x+350, 115,'High Score: '+this.highScore, {fontSize: '32px', fill:'white', stroke: 'black',strokeThickness: 5});
          


            

        }

        update(){

        }
        displayFinal() {

        }

        startGame() {
            console.log("HI");
            this.victoryBackground.visible = false;
            this.playAgain.visible = false;
            this.game.state.start('Level', true, false);


        }




    }
} 
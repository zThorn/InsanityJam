module Wallaby {
    export class Level extends Phaser.State {
        turtles: Phaser.Group;
        turtle: Phaser.Sprite;

        txt: Phaser.Group;
        timeText:Phaser.Text;
        shellsCollected: Phaser.Text;
        initialTime: number;
      

        create() {
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            this.turtles = this.game.add.group();
            this.txt = this.game.add.group();

            for (var i = 0; i < 30; i++) {
                this.turtle = this.turtles.create(this.game.rnd.integerInRange(100, 700), this.game.rnd.integerInRange(100, 400), 'turtle');
                this.game.physics.enable(this.turtle, Phaser.Physics.ARCADE);
                this.turtle.body.velocity.x = this.game.rnd.integerInRange(-200, 200);
                this.turtle.body.velocity.y = this.game.rnd.integerInRange(-200, 200);
            }

            this.turtles.setAll('body.collideWorldBounds', true);
            this.turtles.setAll('body.bounce.x', 1);
            this.turtles.setAll('body.bounce.y', 1);
            this.turtles.setAll('body.minBounceVelocity', 0);

            
            this.txt.fixedToCamera = true;
            this.initialTime = this.game.time.now;
            this.timeText = this.game.add.text(this.game.world.x,0,'Time: '+this.initialTime,
                        {fontSize: '32px', fill: 'white', stroke: 'black',strokeThickness: 5}, this.txt);
            this.txt.bringToTop(true);

        }

        update() {
            this.timeText.setText(Math.floor(this.game.time.elapsedSince(this.initialTime)/1000).toString());
            this.game.physics.arcade.collide(this.turtles);
        }

     
    }
}
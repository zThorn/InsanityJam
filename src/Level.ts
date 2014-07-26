module Wallaby {
    var killed;
    export class Level extends Phaser.State {
        turtles: Phaser.Group;
        turtle: Phaser.Sprite;
        zoneSprite: Phaser.Sprite;
        gameBackground: Phaser.Sprite;
        txt: Phaser.Group;
        timeText:Phaser.Text;
        shellsCollected: number;
        shellText: Phaser.Text;

        initialTime: number;
        levelOver: boolean;
        killed: boolean;

        create() {
            killed = false;
            this.game.physics.startSystem(Phaser.Physics.ARCADE);
           
            this.gameBackground = this.game.add.sprite(0,0,'background');
            this.zoneSprite = this.game.add.sprite(5,5,'nudeTurtle');
            this.gameBackground.visible = true;
            this.zoneSprite.visible = true;
            this.game.physics.enable(this.zoneSprite,Phaser.Physics.ARCADE);
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

            this.turtles.callAll('events.onInputDown.add', 'events.onInputDown',this.endDrag );
            this.turtles.callAll('events.onInputUp.add', 'events.onInputUp', this.removeCheck)
            this.shellsCollected = 0;

            
            this.txt.fixedToCamera = true;
            this.initialTime = this.game.time.now;
            this.timeText = this.game.add.text(this.game.world.x+775, 0,'Time: '+this.initialTime, {fontSize: '32px', fill:'white', stroke: 'black',strokeThickness: 5}, this.txt);
            this.shellText = this.game.add.text(this.game.world.x, 550,'Shells: ', {fontSize: '32px', fill:'white', stroke: 'black',strokeThickness: 5}, this.txt);
            this.txt.bringToTop(true);
            this.levelOver = false;

        }

        update() {

            this.timeText.setText(Math.floor(this.game.time.elapsedSince(this.initialTime)/1000).toString());
            this.game.physics.arcade.collide(this.turtles);
            this.game.physics.arcade.collide(this.turtles,this.zoneSprite);
            this.shellText.setText("Shells: "+this.shellsCollected);

            if(this.game.time.elapsedSince(this.initialTime)/1000 >= 30)
                this.game.state.start('Victory',true,false,this.shellsCollected, this.game);

            if(killed){
                killed = false;
                this.shellsCollected++;
                console.log(this.shellsCollected);
            }
          
        }
        startDrag(){
                this.turtle.body.moves = false;

        }

        endDrag(temp){
               temp.body.moves = false;          
        }

        removeCheck(temp){
            temp.body.moves = true;
             if(temp.x < 240 && temp.y <120){
                    killed = true;          
                    temp.kill();

             }
        }


     
    }
}
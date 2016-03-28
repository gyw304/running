MyGame.MainMenu = function(game) {};
MyGame.MainMenu.prototype = {
    create: function() {
        this.add.image(0,0,'MainMenu-bg');



        this.title = this.add.image(this.world.width/2-800,200,'title');
        this.title.anchor.set(0.5,0);

        this.add.tween(this.title).to({x:this.world.width/2,y:50},200,Phaser.Easing.Cubic.Out,true,500);

        this.rule = this.add.image(this.world.width/2,320,'rule');
        this.rule.anchor.set(0.5,0);
        this.rule.alpha = 0;


        this.buttonStart = this.add.button(this.world.width/2,this.world.height-300,'button-start',function(){
            this.startGame()
        },this);
        this.buttonStart.anchor.set(0.5);
        this.add.tween(this.buttonStart).from({x:this.world.width/2+800,y:this.world.height-380},200,Phaser.Easing.Cubic.Out,true,500);

        this.buttonRanking = this.add.button(this.world.width/2,this.world.height-150,'button-ranking',function(){
            this.state.start('rank');
        },this);
        this.add.tween(this.buttonRanking).from({x:this.world.width/2+800,y:this.world.height-270},200,Phaser.Easing.Cubic.Out,true,550);
        this.buttonRanking.anchor.set(0.5);


        this.buttonRule = this.add.button(this.world.width/2+100,this.world.height-80,'button-rule',function(){
            this.add.tween(this.rule).to({y:300,alpha:1},500,Phaser.Easing.Cubic.Out,true);
            this.rule.inputEnabled = true;
            this.rule.events.onInputDown.add(function(){
                this.add.tween(this.rule).to({y:320,alpha:0},500,Phaser.Easing.Cubic.Out,true);
            },this);
        },this);
        this.buttonRule.anchor.set(0.5);
        this.add.tween(this.buttonRule).from({alpha:0},200,Phaser.Easing.Cubic.Out,true,800);

    },
    startGame: function() {
        this.state.start('Game');
    }
};
MyGame.score = function(game) {

};


MyGame.score.prototype = {
    create: function() {

        this.add.image(0,0,'score-bg');

        this.scoretext = this.add.text(this.world.width/2, 510, ''+score.toFixed(2)+' 米', { font: "80px Microsoft YaHei", fill: "#000000", align: "center" });
        this.scoretext.anchor.set(0.5,0);

        this.ranktext = this.add.text(this.world.width/2, 600, '排名在 '+rank+' 名', { font: "30px Microsoft YaHei", fill: "#000000", align: "center" });
        this.ranktext.anchor.set(0.5,0);




        this.buttonReplay = this.add.button(this.world.width/2,this.world.height-450,'button-replay',function(){
            score = 0;
            gameConfig.speed = 1000;
            music.pause();
            this.state.start('Game');
        },this);
        this.buttonReplay.anchor.set(0.5);

        this.buttonRank2 = this.add.button(this.world.width/2,this.world.height-300,'button-ranking2',function(){
            this.state.start('rank');
        },this);
        this.buttonRank2.anchor.set(0.5);

        this.buttonShare = this.add.button(this.world.width/2,this.world.height-150,'button-share',function(){

            this.shareImg = this.add.sprite(0, 0, 'shareImg');
            this.shareImg.inputEnabled = true;
            this.shareImg.events.onInputDown.add(function(){
                this.shareImg.destroy()
            }, this);

        },this);
        this.buttonShare.anchor.set(0.5);



        this.graphics = this.add.graphics(0, 0);
        this.graphics.beginFill(0x000000);
        this.graphics.drawRect(0, 0, this.world.width,this.world.height);
        this.graphics.endFill();
        this.add.tween(this.graphics).to({alpha:0},1000,Phaser.Easing.Cubic.Out,true)

    },
    update: function() {



    }
};


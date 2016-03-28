MyGame.rank = function(game) {

};



MyGame.rank.prototype = {
    create: function() {

        this.bg = this.add.image(0,0,'rank-bg');


        this.ranktext = this.add.text(this.world.width/2, 440, 'ÄãµÄÅÅÃû '+rank+' Ãû', { font: "50px Microsoft YaHei", fill: "#000000", align: "center" });
        this.ranktext.anchor.set(0.5,0);

        this.style = { font: "30px microsoft yahei", fill: "#000000", align: "left" }
        for(var i=0;i<5;i++)
        {
            this.add.text(70, 580+i*85, j_rankInfo[i].j_Ranking,this.style);

            this.add.text(190, 580+i*85, j_rankInfo[i].j_NickName,this.style);
            this.add.text(500, 580+i*85, j_rankInfo[i].j_score,this.style);
        }

        //console.log(this.header)

        this.buttonClose = this.add.button(this.world.width - 50,50,'button-close',function(){
            this.state.start('score');
        },this);
        this.buttonClose.anchor.set(1,0);

        this.graphics = this.add.graphics(0, 0);
        this.graphics.beginFill(0x000000);
        this.graphics.drawRect(0, 0, this.world.width,this.world.height);
        this.graphics.endFill();
        this.add.tween(this.graphics).to({alpha:0},1000,Phaser.Easing.Cubic.Out,true)

    }
};


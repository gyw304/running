MyGame.Preloader = function(game){
};
MyGame.Preloader.prototype = {

    create:function(){
        this.load.onFileComplete.add(this.fileComplete, this);
        this.load.onLoadComplete.add(this.loadComplete, this);
        this.text = this.add.text(this.world.width/2, this.world.height/2-50, '', { fill: '#fff' });
        this.text.anchor.set(0.5);
        this.start();
    },
    start:function(){

        this.load.image('MainMenu-bg','assets/MainMenu-bg.jpg');
        this.load.image('title','assets/title.png');
        this.load.image('button-start','assets/button-start.png');
        this.load.image('button-ranking','assets/button-ranking.png');
        this.load.image('button-rule','assets/button-rule.png');
        this.load.image('rule','assets/rule.png');

        this.load.image('block_0','assets/block_0.png');
        this.load.image('block_1','assets/block_1.png');

        this.load.image('game-bg','assets/game-bg.jpg?1');
        this.load.atlasJSONHash('running', 'assets/running_json.png', 'assets/running_json.json');
        this.load.atlasJSONHash('effect', 'assets/effect_json.png?222223', 'assets/effect_json.json?222223');

        this.load.image('life','assets/life.png');

        this.load.image('miss','assets/miss.png');
        this.load.image('good','assets/good.png');
        this.load.image('perfect','assets/perfect.png');

        this.load.image('bar_0','assets/left_bar.png?1');
        this.load.image('bar_1','assets/right_bar.png?1');

        this.load.image('light_left','assets/light_left.png');
        this.load.image('light_right','assets/light_right.png');

        this.load.audio('music', 'assets/music.mp3');
        this.load.audio('dang', 'assets/dang.mp3');

        this.load.image('score-bg','assets/score-bg.jpg?2');
        this.load.image('button-replay','assets/button-replay.png');
        this.load.image('button-ranking2','assets/button-ranking2.png');
        this.load.image('button-share','assets/button-share.png');

        this.load.image('rank-bg','assets/rank-bg.jpg');
        this.load.image('button-close','assets/button-close.png');

        this.load.image('shareImg','assets/shareImg.png');

        for(var i=0;i<=9;i++)
        {
            this.load.image('userHeaderImg'+i+'',j_rankInfo[i].j_UserHeader);
        }

        this.load.start();
    },
    fileComplete:function(progress){
        this.text.setText( + progress + "%");
    },
    loadComplete:function(){
        this.state.start('MainMenu');
    }


    /*preload: function() {

        this.loadBar = this.add.group();
        this.loadBar.create(0,0,'loadingBar_0');
        this.preloadBar = this.loadBar.create(0,0,'loadingBar_1');
        console.log(this.load)
        this.load.setPreloadSprite(this.preloadBar);
        this.loadBar.y = MyGame.GAME_HEIGHT/2;


        /!*this.load.image('game_bg','assets/bg.jpg');
        this.load.image('bird','assets/bird.png');
        this.load.image('wall_left','assets/wall.jpg');
        this.load.image('wall_right','assets/wall.jpg');
        this.load.image('nail_top','assets/nail_top.png?1');
        this.load.image('nail_bottom','assets/nail_bottom.png?1');
        this.load.image('nail_left','assets/nail_left.png?1');
        this.load.image('nail_right','assets/nail_right.png?1');
        this.load.image('button-rest','assets/restBtn.png');*!/

    },
    create: function() {
        //this.state.start('MainMenu');
    }*/
};
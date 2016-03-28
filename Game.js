MyGame.Game = function(game) {

};
var Enemy1,Enemy2;
var self;
var leftClick = false;
var rightClick = false;

var score=0;
var music;

var gameConfig = {
    'speed' : 1000,
    'step' :-500,
    'life' : 3
};

MyGame.Game.prototype = {
    create: function() {
        self = this;

        this.gameisover = false;
        this.add.image(0,0,'game-bg');

        this.lifeGroup = this.add.group();

        for(var i=0;i<=gameConfig.life-1;i++)
        {
            this.lifeGroup.create(30+70*i,30,'life');
        };

        this.scoretext = this.add.text(this.world.width-50, 320, '已奔跑 '+score+' 米', { font: "30px Microsoft YaHei", fill: "#fbd9b7", align: "center" });
        this.scoretext.anchor.set(1,0);

        this.running = this.add.sprite(this.world.width/2,30, 'running');
        this.running.anchor.set(0.5,0);
        this.running.animations.add('running');
        this.running.animations.play('running',10,true);

        this.light_left = this.add.image(22,500,'light_left');
        this.light_left.alpha = 0;
        this.light_right = this.add.image(384,500,'light_right');
        this.light_right.alpha = 0;

        this.barGroup = this.add.group();

        this.bar_left = this.barGroup.create(22,1080,'bar_0');
        this.bar_right = this.barGroup.create(384,1080,'bar_1');

        this.barGroup.setAll('inputEnabled', true);


        this.barGroup.callAll('events.onInputDown.add', 'events.onInputDown', this.checkClick);
        this.barGroup.callAll('events.onInputDown.add', 'events.onInputUp', this.checkClickUp);

        this.EnemyGroup = this.add.physicsGroup(Phaser.Physics.ARCADE);
        this.EnemyGroup.enableBody = true;

        this.Time = this.time.events.loop(Phaser.Timer.SECOND * 1, this.createEnemy, this);

        this.judge = this.add.image(this.world.width/2,this.world.height/2);
        this.judge.alpha = 0;
        this.judge.anchor.set(0.5);



        this.effect = this.add.sprite(this.world.width/2-180,this.world.height - 200, 'effect');
        this.effect.anchor.set(0.5,0);
        this.effect.scale.x = 1.5;
        this.effect.scale.y = 1.5;
        this.effect.animations.add('effect');

        this.effect2 = this.add.sprite(this.world.width/2+180,this.world.height - 200, 'effect');
        this.effect2.anchor.set(0.5,0);
        this.effect2.scale.x = 1.5;
        this.effect2.scale.y = 1.5;
        this.effect2.animations.add('effect');

        music = this.add.audio('music');


        this.graphics = this.add.graphics(0, 0);
        this.graphics.beginFill(0x000000);
        this.graphics.drawRect(0, 0, this.world.width,this.world.height);
        this.graphics.endFill();
        this.add.tween(this.graphics).to({alpha:0},50,Phaser.Easing.Cubic.Out,true).onComplete.add(function(){

            music.play("",0,1,true);

        },this);


        this.missLight = this.add.graphics(0, 0);
        this.missLight.beginFill(0xff0000);
        this.missLight.drawRect(0, 0, this.world.width,this.world.height);
        this.missLight.endFill();
        this.missLight.alpha = 0;




    },
    update: function() {

        if(this.gameisover) return;

        score+=0.02;

        this.scoretext.setText('已奔跑 '+score.toFixed(2)+' 米')
        this.EnemyGroup.forEachAlive(this.checkEnemy, this);

    },
    createEnemy : function(){

        gameConfig.step-=1;

        Enemy1 = this.EnemyGroup.create(7,this.rnd.integerInRange(0, gameConfig.step-150),'block_0');

        Enemy2 = this.EnemyGroup.create(360,this.rnd.integerInRange(0, gameConfig.step),'block_1');

        Enemy1.body.velocity.y = gameConfig.speed+=1;
        Enemy2.body.velocity.y = gameConfig.speed+=1;

    },
    checkEnemy : function(item){


        if(item.y>this.world.height)
        {
            self.showJudge('miss');

            this.add.tween(this.missLight).to({alpha:.1},200,Phaser.Easing.Cubic.Out,true).onComplete.add(function(){
                this.missLight.alpha = 0;
            },this)

            var lifeAlive = this.lifeGroup.getFirstAlive();
            if (lifeAlive)
            {
                lifeAlive.kill();
                if(this.lifeGroup.countLiving()<=0)
                {
                    this.gameover()
                }
            }
            item.kill();
        }

        if(item.key == 'block_0' && leftClick && item.y>=980 && item.y<=1206)
        {
            self.showJudge('good');
            this.effect.animations.stop(null, true);
            this.effect.animations.play('effect',15,false);
            item.kill();
        }

        if(item.key == 'block_1' && rightClick && item.y>=980 && item.y<=1206)
        {
            self.showJudge('good');
            this.effect2.animations.stop(null, true)
            this.effect2.animations.play('effect',15,false);
            item.kill();
        }


        if(item.y>=1080 && item.y<=1206 && item.key == 'block_0' && leftClick)
        {
            self.showJudge('perfect');
            this.effect.animations.stop(null, true);
            this.effect.animations.play('effect',15,false);
            item.kill();
        }

        if(item.y>=1080 && item.y<=1206 && item.key == 'block_1' && rightClick)
        {
            self.showJudge('perfect');
            this.effect2.animations.stop(null, true)
            this.effect2.animations.play('effect',15,false);
            item.kill();
        }

    },

    checkClick : function(item){
        if(item.key == 'bar_0')
        {
            self.light_left.alpha = 1;
            leftClick = true;
            self.time.events.add(Phaser.Timer.SECOND * 0.5,function(){
                leftClick = false;
            }, this);
        }
        else
        {
            self.light_right.alpha = 1;
            rightClick = true;
            self.time.events.add(Phaser.Timer.SECOND * 0.5,function(){
                rightClick = false;
            }, this);
        }
    },
    checkClickUp : function(item){
        if(item.key == 'bar_0')
        {
            leftClick = false;
            self.light_left.alpha = 0
        }
        else
        {
            rightClick = false;
            self.light_right.alpha = 0;
        }
    },
    gameover : function(){
        this.gameisover = true;
        Enemy1.body.velocity.y = 0;
        Enemy2.body.velocity.y = 0;
        this.time.events.remove(this.Time);
        this.running.animations.stop(null, true);

        this.time.events.add(Phaser.Timer.SECOND * 1, function(){
            this.state.start('score');
        }, this);

    },

    showJudge : function(judge){

        this.add.tween(this.judge).to({alpha:1}, 500, Phaser.Easing.Cubic.Out, true,0)
        this.judge.scale.x = 1;
        this.judge.scale.y = 1;
        this.add.tween(this.judge.scale).from({x:.7,y:.7}, 50, Phaser.Easing.Cubic.Out, true,0).onComplete.add(function(){
            this.add.tween(this.judge).to({alpha:0}, 500, Phaser.Easing.Cubic.Out, true,500)
        },this);

        if(judge == 'miss')
        {
            this.judge.loadTexture('miss', 0, false);
            this.judge.x = this.world.width/2 + 40
        }
        else if(judge == 'perfect')
        {
            this.judge.loadTexture('perfect', 0, false);
            this.judge.x = this.world.width/2 + 40
        }
        else if(judge == 'good')
        {
            this.judge.loadTexture('good', 0, false);
            this.judge.x = this.world.width/2 - 40
        }
    }
};


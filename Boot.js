var MyGame = {};
MyGame.Boot = function(game) {};
MyGame.Boot.prototype = {
    preload: function() {
        /*this.load.image('loadingBar_1', 'assets/loadingBar_1.png?2');
        this.load.image('loadingBar_0', 'assets/loadingBar_0.png?2');*/
    },
    create: function() {
        this.stage.backgroundColor = '#2d2d2d';
        this.input.maxPointers = 2;
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.state.start('Preloader');
    }
};
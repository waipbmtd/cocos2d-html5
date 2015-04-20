var TAG_GROSSINI = 5561;

var MyLayer = cc.Layer.extend({
    helloLabel:null,
    sprite:null,
    _paddles:[],
    _goldEggs:[],
    _basket:null,
    lbScore:null,
    _tmpScore:0,

    init:function () {

        //////////////////////////////
        // 1. super init first
        this._super();
        this._eggStartingVelocity = cc.p(0, -20.0);

        /////////////////////////////
        // 2. add a menu item with "X" image, which is clicked to quit the program
        //    you may modify it.
        // ask director the window size
        this.winSize = cc.director.getWinSize();

        // add a "close" icon to exit the progress. it's an autorelease object
        var closeItem = new cc.MenuItemImage(
            s_CloseNormal,
            s_CloseSelected,
            function () {
                cc.log("close");
            },this);
        closeItem.setAnchorPoint(0.5, 0.5);

        var menu = new cc.Menu(closeItem);
        menu.setPosition(0, 0);
        this.addChild(menu, 1);
        closeItem.setPosition(this.winSize.width - 20, 20);

        // add "Helloworld" splash screen"
        this.sprite = new cc.Sprite(s_HelloWorld);
        this.sprite.setAnchorPoint(0.5, 0.5);
        this.sprite.setPosition(this.winSize.width / 2, this.winSize.height / 2);
        this.sprite.setScale(this.winSize.height / this.sprite.getContentSize().height);
        this.addChild(this.sprite, 0);


        // score
        this.lbScore = new cc.LabelBMFont("Score: 0", arial_14_fnt);
        this.lbScore.attr({
            anchorX: 1,
            anchorY: 0,
            x: this.winSize.width - 5,
            y: this.winSize.height - 30,
            scale: 1.5, 
        });
        this.lbScore.textAlign = cc.TEXT_ALIGNMENT_RIGHT;
        this.addChild(this.lbScore, 1000);

        //egg
        this._goldEggs=[];
        var n_egg = 5;
        for (var i=0; i<n_egg; i++){
            var goldEgg = GoldEgg.eggWithTexture(cc.textureCache.addImage(s_GlodEgg ));
            var per_gap = (this.winSize.width - goldEgg.width*n_egg)/(n_egg+1);
            goldEgg.setInitPosition(cc.p((goldEgg.width + per_gap) * (i+0.5), this.winSize.height-5 - goldEgg.height/2));
            goldEgg.setVelocity(this._eggStartingVelocity);
            this._goldEggs.push(goldEgg);
            this.addChild(goldEgg,1);           
        }

        //basket
        this._basket = Basket.basketWithTexture(cc.textureCache.addImage(s_Basket));
        this._basket.x = 20;
        this._basket.y = 40;
        this.addChild(this._basket);

        //paddle
        this._newScheduler = new cc.Scheduler();
        this._newActionManager = new cc.ActionManager();
        var jump1 = new cc.JumpBy(2, cc.p(-120,0), 0, 4);
        var jump2 = jump1.reverse();
        var seq = new cc.Sequence(jump2, jump1);
        var action = new cc.RepeatForever(seq);
        var paddleTexture = cc.textureCache.addImage(s_Paddle);

        this._paddles = [];
        var n_paddle = 4
        for (var i=0; i<n_paddle;i++){
            var paddle = Paddle.paddleWithTexture(paddleTexture);
            var per_gap = (this.winSize.width - paddle.width*n_paddle)/n_paddle;
            paddle.x = (paddle.width + per_gap) * i ;
            paddle.y = this.winSize.height-200;

            paddle.setActionManager(this._newActionManager);
            paddle.setScheduler(this._newScheduler);

            this._paddles.push(paddle);    
            this.addChild(paddle);
            paddle.runAction(new cc.Speed(action.clone(), 1.5));
        }

        cc.director.getScheduler().scheduleUpdateForTarget(this._newScheduler, 0, false);
        this._newScheduler.scheduleUpdateForTarget(this._newActionManager, 0, false);

        this.schedule(this.doStep, 0.05);
    },

    onEnter:function() {
        this._super();
    },

    doStep:function (delta) {
        for(var j =0; j< this._goldEggs.length; j++){
            var t_goldEgg = this._goldEggs[j];
            if(!t_goldEgg || !t_goldEgg.isMoving()){
                continue;
            }
            for (var i = 0; i < this._paddles.length; i++) {
                if (!this._paddles[i]){
                    break;
                }
                if(t_goldEgg.collideWithPaddle(this._paddles[i])==false){
                   t_goldEgg.checkFallInBasket(this._basket);    
                }
            }
        }         
    },

    reNewEgg: function(child, cached){
        goldEgg = GoldEgg.eggWithTexture(cc.textureCache.addImage(s_GlodEgg ));
        goldEgg.setInitPosition(child.getInitPosition());
        goldEgg.setVelocity(this._eggStartingVelocity);
        this.removeChild(child);
        var index = this._goldEggs.indexOf(child);
        if (index > -1){
            this._goldEggs.splice(index,1);
        }
        
        this.addChild(goldEgg,1);       
        this._goldEggs.push(goldEgg);


        },

    updateScore:function(cached){
        if (cached==true){
            this._tmpScore +=1;
            this.lbScore.setString("Score: " + this._tmpScore);
        }        
    }
});

var MyScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MyLayer();
        this.addChild(layer);
        layer.init();
    }
});

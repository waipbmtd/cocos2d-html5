/****************************************************************************
GoldEgg


 ****************************************************************************/

var TAG_NODE = 5560;
var TAG_GROSSINI = 5561;
var TAG_SEQUENCE = 5562;
var GOLDEGG_STATE_STOP = 5;
var GOLDEGG_STATE_MOVED = 6;
var GOLDEGG_STATE_COLLIDED = 7;
var GOLDEGG_STATE_INBOX= 7;

var GoldEgg = cc.Sprite.extend({
    _status:GOLDEGG_STATE_STOP,
    _velocity:cc.p(0,0),
    _radius:0,

    ctor:function(){
        this._super();
        var size = cc.director.getWinSize();
        var move = cc.moveBy(2, cc.p(0, 60-size.height));
        var rotate = cc.rotateBy(0.2,-90);
        var callback = cc.callFunc(this.stopAction, this);
        var sequence = cc.sequence(move, rotate,callback);

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function ( touch,event) {
            // 获取当前触摸点相对于按钮所在的坐标
                var target = event.getCurrentTarget();
                var locationInNode = target.convertToNodeSpace(touch.getLocation());    
                var s = target.getContentSize();
                var rect = cc.rect(0, 0, s.width, s.height);

                if (cc.rectContainsPoint(rect, locationInNode)) {       // 判断触摸点是否在按钮范围内
                    target.runAction(sequence);
                    target._status = GOLDEGG_STATE_MOVED;
                    return true;
                }
                return false;
            }          
          }, this);
       },

    collideWithPaddle:function (paddle) {
        var paddleRect = paddle.rect();

        paddleRect.x += paddle.x;
        paddleRect.y += paddle.y;

        var lowY = cc.rectGetMinY(paddleRect);
        var midY = cc.rectGetMidY(paddleRect);
        var highY = cc.rectGetMaxY(paddleRect);

        var leftX = cc.rectGetMinX(paddleRect);
        var rightX = cc.rectGetMaxX(paddleRect);

        // window.console.log("lowY:"+lowY+"midY:"+midY+"highY:"+highY+"leftX:"+leftX+"rightX:"+rightX);
        // window.console.log("thisx:" + this.x + "thisy:"+this.y);

        var hit = false;
        if ((this.x > leftX) && (this.x < rightX)) {
            var angleOffset = 0.0;
            if ((this.y > midY) && (this.y <= (highY + this.radius()))) {
                this.y = highY + this.radius();
                hit = true;
            } 
            // else if (this.y < midY && this.y >= lowY - this.radius()) {
            //     this.y = lowY - this.radius();
            //     hit = true;
            //     angleOffset = -Math.PI / 2;
            // }           

            if (hit) {
                //got an collide(碰撞)
                this.playCollide();
            }
        }
        return hit;
    },

    //掉入篮子里
    checkFallInBasket:function(box){
       var boxRect = box.rect();

        boxRect.x += box.x;
        boxRect.y += box.y;

        var lowY = cc.rectGetMinY(boxRect);
        var midY = cc.rectGetMidY(boxRect);
        var highY = cc.rectGetMaxY(boxRect);

        var leftX = cc.rectGetMinX(boxRect);
        var rightX = cc.rectGetMaxX(boxRect);

        // window.console.log("lowY:"+lowY+"midY:"+midY+"highY:"+highY+"leftX:"+leftX+"rightX:"+rightX);
        // window.console.log("box ### thisx:" + this.x + "thisy:"+this.y);

        var inBox = false;

        if(this.y<highY+this.radius()){
             if ((this.x > leftX+this.radius()) && (this.x < rightX-this.radius())) {
                inBox = true;            
                ///掉入篮子里
                this.fallInBox();
            }else if( Math.abs(leftX - this.x)<this.radius()  || Math.abs(this.x -rightX) < this.radius()   ){
                //(碰撞)
                this.playBoxCollide();   
            }           
        }

        return inBox;
    },

    //掉入篮子里
    fallInBox:function(){
        window.console.log("fallInBox");
        if(this.parent && this.isMoving()){
            this._status == GOLDEGG_STATE_INBOX;
            this.parent.updateScore(true);
            this.parent.reNewEgg(this);    
        }
         
    },

    //got an collide(碰撞,floor and paddle)
    playCollide:function(){
        window.console.log("playCollide");
        if(this.parent && this.isMoving()){
            this._status == GOLDEGG_STATE_COLLIDED;
            this.getActionManager().removeAllActionsFromTarget(this);

            this.runAction(cc.sequence(cc.rotateBy(0.2,-90), cc.callFunc(this.stopAction, this)));
            window.console.log("cc.rotateTo")
        }
    },

    //collide box
    playBoxCollide:function(){
        this.stopAllActions();
        window.console.log("playBoxCollide === ")
        if (this.parent && this.isMoving()){
            this._status == GOLDEGG_STATE_COLLIDED; 
            this.parent.reNewEgg(this);
        }
               
    },

   stopAction:function () {
        this.stopAllActions();
        window.console.log("stopAction === ")
        this.parent.reNewEgg(this);
    },

    radius:function () {
        return this._radius;
    },
    setRadius:function (rad) {
        this._radius = rad;
    },


    setVelocity:function (velocity) {
        this._velocity = velocity;
    },
    getVelocity:function () {
        return this._velocity;
    },
    setInitPosition:function(p){
        this.setPosition(p)
        this.initP = p;
    },
    getInitPosition:function(){
        return this.initP;
    },
    isMoving:function(){
        return this._status == GOLDEGG_STATE_MOVED;
    }
});

GoldEgg.eggWithTexture = function (texture) {
    var egg = new GoldEgg();
    egg.initWithTexture(texture);
    if (texture instanceof cc.Texture2D)
        egg.setRadius(texture.width / 2);
    else if ((texture instanceof HTMLImageElement) || (texture instanceof HTMLCanvasElement))
        egg.setRadius(texture.width / 2);
    return egg;
};

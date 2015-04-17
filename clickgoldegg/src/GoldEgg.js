/****************************************************************************
GoldEgg


 ****************************************************************************/

var TAG_NODE = 5560;
var TAG_GROSSINI = 5561;
var TAG_SEQUENCE = 5562;

var GoldEgg = cc.Sprite.extend({
    _velocity:cc.p(0,0),
    _radius:0,

    ctor:function(){
        this._super();

        var size = cc.director.getWinSize();
        var move = cc.moveBy(2, cc.p(0, 60-size.height));
        var callback = cc.callFunc(this.stopAction, this);
        var sequence = cc.sequence(move, callback);
        sequence.tag = TAG_SEQUENCE;

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
                    return true;
                }
                return false;
            }          
          }, this);
       },

   stopAction:function () {
        this.stopAllActions();
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

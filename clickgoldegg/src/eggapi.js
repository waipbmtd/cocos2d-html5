;(function(_, $, undefined){
    _.console = _.console || { log: $.noop },
    _.path = {
    // Base Root
//    root: _.location.protocol + '//' + _.location.host,
   root: "http://192.168.1.212:8081",
    // root: "http://192.168.1.180:8082",

    // Base webSocket
    // ws: 'ws://127.0.0.1:8082/' ,
    ws: 'ws://' + _.location.host,

    // Base Domain: (No Port)
    domain: _.location.protocol + '//' + _.location.hostname,
    },

    /* !!
     * 数据接口
     * ** *** **** ***** **** *** ** *
     */
    _.api = {
        all_light_app :  '/webgame-server/webgame/actdefs',    //其他轻应用
        other_active_show: '/api/1/active/show', //在玩这个活动的所有秀场

        //接金蛋
        goldegg_getPostion: "/server-006-jjd/webgame/jjd/getposition?callback=?", //获取位置
        goldegg_postPostion:"/server-006-jjd/webgame/jjd/submitposition?callback=?",//提交位置
        goldegg_postClickEgg: "/server-006-jjd/webgame/jjd/submitclickegg?callback=?", //获取位置
        goldegg_getClickEgg:"/server-006-jjd/webgame/jjd/getclickegg?callback=?",//提交位置

    },

    /* !!
     * Extend jQuery
     * ** *** **** ***** **** *** ** *
     */
    $.extend({
        render_data:function(options){
            options = options || {}
            , options.async = options.async || true
            , options.method = options.method || 'get'
            , options.url = options.url || ''
            , options.dataType = options.dataType || 'json'
            , options.data = options.data || {}
            , options.success = options.success || $.noop
            , options.error = options.error || $.noop
            , options.complete = options.complete || $.noop;
            $.ajax({
                type:options.method,
                url: options.url,
                dataType: options.dataType,
                data:options.data,
                success:options.success,
                error:options.error,
                complete:options.complete
                })
            },
        new_io_websocket:function(options){
            options=options || {}
            ,options.url = options.url || ''
            ,options.connOptions = options.connOptions || {};
            _.console.log(options.url  + ((options.data != undefined) ?  "?" + $.param(options.data) : ""));
            return  io.connect( options.url  + ((options.data != undefined) ?  "?" + $.param(options.data) : "") , options.connOptions);
        },
           new_websocket:function(options){
            options=options || {}
            ,options.url = options.url || ''
            ,options.protocols = options.protocols || null
            ,options.reoptions = options.reoptions || {} 
            _.console.log(options.url  + ((options.data != undefined) ?  "?" + $.param(options.data) : ""));
            return  new ReconnectingWebSocket( options.url  + ((options.data != undefined) ?  "?" + $.param(options.data) : "") ,
                options.protocols,
                options.reoptions);
        }
    });

    $.light_app = function(){};
    $.extend($.light_app,{
            //其他轻应用
        get_all_light_app:function(options){
            options = options || {}
            ,options.url = _.path.root +_.api.all_light_app;
           $. render_data(options)
        },

        //在玩这个的轻应用所有秀场
        get_other_active_show:function(options){
            options = options || {}
            ,options.url = _.path.root +_.api.other_active_show;
           $. render_data(options)
        }

    });

    $.light_app.catch_egg = function () {};

    $.extend($.light_app.catch_egg,{
        get_postion:function(options){
            $.render_data({
                url:_.path.root + _.api.goldegg_getPostion,
                data:options.data,
                success:options.success
                })
        },

        post_postion:function(options){
            $.render_data({
                url:_.path.root + _.api.goldegg_postPostion,
                data:options.data,
                success:options.success,
                error:options.error
                })
        },

        post_click_egg:function(options){
            $.render_data({
                url:_.path.root + _.api.goldegg_postClickEgg,
                data:options.data,
                success:options.success,
                error:options.error
                })
        },

        get_click_egg:function(options){
            $.render_data({
                url:_.path.root + _.api.goldegg_getClickEgg,
                data:options.data,
                success:options.success,
                error:options.error
                })
        } ,  

    })

})
(window, jQuery);
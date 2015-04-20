;(function(_, $, undefined){
    _.console = _.console || { log: $.noop },
    _.path = {
    // Base Root
    root: _.location.protocol + '//' + _.location.host,

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

        //我画你猜
        guess_subject : '/server-001-whnc/guess/subjects',    //获取所有题目的主题类型
        guess_subject_questions : '/server-001-whnc/guess/questions',    //获取某个主题下面的题目
        guess_commit_subject_question: '/server-001-whnc/guess/submit_question ' ,    //提交所选主题题目
        guess_submit_drawing : '/server-001-whnc/submit_drawing ',    //秀主结束画图
        guess_question_image: '/server-001-whnc/guess/image' ,    //获取图片数据
        guess_subject_count: '/server-001-whnc/guess/show_join_count' ,    //秀主已完成该活动次数
        guess_draw_status: '/server-001-whnc/guess/draw_status' ,    //秀主是否画完
        guess_first_successer: '/server-001-whnc/guess/first_successer' , //第一个猜正确的用户
        guess_player_count: '/server-001-whnc/guess/player_count', //参与用户数 
        guessed_player_list : ' /server-001-whnc/guess/player_list', //最近参与猜的人
        guess_draw_detail : '/server-001-whnc/guess/draw_detail ', //该你画我猜详细
        guess_history_list : '/api/1/guess/history', //获取秀主历史你画我猜
        guess_player_answer: '/server-001-whnc/guess/player_answer', //用户提交猜的答案
        guess_act_draw_id:'/server-001-whnc/guess/show_ids', //根据发起人ID获取我画你猜流水ID和总活动ID
        guess_ws : '/server-001-whnc/webGameServlet' //画图同步websocket

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

    $.light_app.cache_egg = function () {};

    $.extend($.light_app.cache_egg,{
 

    })

})
(window, jQuery);
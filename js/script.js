$.fn.extend({
    checkBox: function (options) {
        var defaults = {
            itemTag: 'label',
            checkAllTag: false,
            template: '<label class="chkAll"><input type="checkbox" value="999" /><span>全选</span></label>'
        };
        options = $.extend({}, defaults, options);
        this.each(function () {
            var _this = $(this);
            //var oChkAll = chkAll? _this.find(chkAll):_this.find('label.chkAll');
            var chkCell = options.itemTag;
            if (options.checkAllTag) {
                var temp = $(options.template);
                _this.append(temp);
            }
            var checkAll = options.checkAllTag ? _this.find('.chkAll') : null;
            $(chkCell, this).each(function () {
                $(this).addClass('checkbox');
                if ($(this).children().is(':disabled') == false) {
                    if ($(this).children().is(':checked')) $(this).addClass("checked");
                } else {
                    $(this).addClass('disabled');
                }

            }).click(function (event) {
                if (!$(this).children().is(':checked')&&!$(this).children().is(':disabled')) {
                    $(this).addClass("checked").children()[0].checked = true;
                    if (options.checkAllTag) {
                        var aLabel = _this.find('.checkbox').not('.chkAll');
                        aLabel.each(function (index) {
                            if (!$(this).children().is(':checked')) return false;
                            if (index >= aLabel.length - 1) {
                                checkAll.addClass('checked').children()[0].checked = true;
                            }
                        });
                    }
                } else {
                    $(this).removeClass('checked').children()[0].checked = false;
                    if (options.checkAllTag) {
                        if (checkAll.hasClass('checked')) checkAll.removeClass('checked').children()[0].checked = false;
                    }

                }
                event.stopPropagation();
                return false;
            });
            if (options.checkAllTag) {
                checkAll.click(function () { //增加全选
                    var Flag = $(this).children().is(':checked');
                    if (chkCell.indexOf('label') == 0) chkCell = chkCell + '.checkbox';
                    _this.find(chkCell).each(function () {
                        if (Flag) {
                            $(this).addClass("checked").children()[0].checked = true;
                        } else {
                            $(this).removeClass('checked').children()[0].checked = false;
                        }
                    });
                });
            }

        });
    },
    radios: function (options) {
        var defaults = {
            clickAfter:function (obj) {

            }
        };
        options = $.extend({}, defaults, options);
        var box;
        var currentChecked;
        this.each(function () {
            var _this = $(this);
            box = $(this);
            $('label', this).each(function () {
                $(this).addClass('Radio');
                if ($(this).is(".RadioChecked")) {
                    $(this).children()[0].checked = true;
                    $(this).siblings().removeClass("RadioChecked");
                }
                $(this).click(function (event) {
                    var that=$(this);
                    if (!$(this).is('.RadioChecked')) {
                        $(this).addClass("RadioChecked");
                        $(this).siblings().removeClass("RadioChecked");
                        $(this).children()[0].checked = true;
                        currentChecked=$(this).text();
                    }
                    $(this).siblings().map(function (ele,index) {
                        $(index).children()[0].checked = false;
                    });
                    options.clickAfter(that);
                    return false;
                });
            });
        });
        return {
            reload:function () {
                box.find('label').each(function () {
                    $(this).removeClass('RadioChecked');
                    $(this).children()[0].checked = false;
                });
            },
            checked:function () {
                return currentChecked;
            }
        }
    },
    checkBox: function (options) {
        var defaults = {
            itemTag: 'label',
            checkAllTag: false,
            template: '<label class="chkAll"><input type="checkbox" value="999" /><span>全选</span></label>'
        };
        options = $.extend({}, defaults, options);
        this.each(function () {
            var _this = $(this);
            //var oChkAll = chkAll? _this.find(chkAll):_this.find('label.chkAll');
            var chkCell = options.itemTag;
            if (options.checkAllTag) {
                var temp = $(options.template);
                _this.append(temp);
            }
            var checkAll = options.checkAllTag ? _this.find('.chkAll') : null;
            $(chkCell, this).each(function () {
                $(this).addClass('checkbox');
                if ($(this).children().is(':disabled') == false) {
                    if ($(this).children().is(':checked')) $(this).addClass("checked");
                } else {
                    $(this).addClass('disabled');
                }

            }).click(function (event) {
                if (!$(this).children().is(':checked')&&!$(this).children().is(':disabled')) {
                    $(this).addClass("checked").children()[0].checked = true;
                    if (options.checkAllTag) {
                        var aLabel = _this.find('.checkbox').not('.chkAll');
                        aLabel.each(function (index) {
                            if (!$(this).children().is(':checked')) return false;
                            if (index >= aLabel.length - 1) {
                                checkAll.addClass('checked').children()[0].checked = true;
                            }
                        });
                    }
                } else {
                    $(this).removeClass('checked').children()[0].checked = false;
                    if (options.checkAllTag) {
                        if (checkAll.hasClass('checked')) checkAll.removeClass('checked').children()[0].checked = false;
                    }

                }
                event.stopPropagation();
                return false;
            });
            if (options.checkAllTag) {
                checkAll.click(function () { //增加全选
                    var Flag = $(this).children().is(':checked');
                    if (chkCell.indexOf('label') == 0) chkCell = chkCell + '.checkbox';
                    _this.find(chkCell).each(function () {
                        if (Flag) {
                            $(this).addClass("checked").children()[0].checked = true;
                        } else {
                            $(this).removeClass('checked').children()[0].checked = false;
                        }
                    });
                });
            }

        });
    },
    tabControl: function (options) {
        var defaults={
            tab:'*[name="tabTit"] a',
            con:'*[name="tabCon"]',
            clickAfter:function () {}
        };
        options=$.extend({},defaults,options);
        return this.each(function () {
            var _this = this;
            $(this).find(options.tab).each(function (i) {
                $(this).click(function () {
                    $(this).addClass('on').siblings().removeClass('on');
                    $(_this).find(options.con).addClass('dis_none');
                    $(_this).find(options.con).eq(i).removeClass('dis_none');
                    options.clickAfter();
                    return false;
                });
            });
        });
    },
    Selector: function (options) {
        var defaults={
            callback:function () {
            }
        };
        options=$.extend({},defaults,options);
        $(this).each(function () {
            $(".selecterValue").hover(
                function () {
                    $(this).addClass("bluebor")
                },
                function () {
                    $(this).removeClass("bluebor")
                }
            );
            var Myobj = $(this);
            var oInp = Myobj.find('input.selRes');
            Myobj.find(".selecterDrop a").each(function () {
                if ($(this).hasClass('active')) {
                    Myobj.find(".selecterValue p").html($(this).html());
                    if (oInp[0]) oInp.val($(this).attr('value'));
                    return false;
                }
            });
            Myobj.unbind().on('click', function (ev) {
                var Ocur = $(this).find(".selecterValue");
                var Odrop = $(this).find(".selecterDrop");
                var Owidth = $(this).width();
                Odrop.toggle(0, function () {
                    $(this).css({
                        'z-index': 9999,
                        "width": parseInt(Odrop.css('width')) > Owidth ? Odrop.css('width') : Owidth
                    });
                });


                $(".selecterBox").not($(this)).find(".selecterDrop").hide();
                ev.stopPropagation();
                $(document).click(function () {
                    $(".selecterDrop").hide();
                });
                Odrop.find("a").unbind().on('click', function () {
                    Ocur.find("p").html($(this).html());
                    Odrop.hide();
                    $(this).addClass('active').siblings().removeClass('active');
                    if (oInp[0]) oInp.val($(this).attr('value'));
                    options.callback();
                    return false;
                });
            });
        });
    },
    BootstrapSelector: function (options) {
        var defaults={
            callback:function () {
            }
        };
        options=$.extend({},defaults,options);
        $(this).each(function () {
            var Myobj = $(this);
            var oInp = Myobj.find('input.selRes');
            Myobj.find(".selectDrop a").each(function () {
                if ($(this).hasClass('active')) {
                    Myobj.find(".selectVal i").html($(this).html());
                    if (oInp[0]) oInp.val($(this).attr('value'));
                    return false;
                }
            });
            Myobj.find('.dropdown-toggle').unbind().on('click', function (ev) {
                var Ocur = Myobj.find(".selectVal");
                var Odrop = Myobj.find(".selectDrop");
                var Owidth = Myobj.width();
                Odrop.toggle(0, function () {
                    $(this).css({
                        'z-index': 9999,
                        "width": parseInt(Odrop.css('width')) > Owidth ? Odrop.css('width') : Owidth
                    });
                });

                ev.stopPropagation();
                $(document).click(function () {
                    $(".selectDrop").hide();
                });
                Odrop.find("a").unbind().on('click', function () {
                    Ocur.find("i").html($(this).html());
                    Odrop.hide();
                    $(this).addClass('active').siblings().removeClass('active');
                    if (oInp[0]) oInp.val($(this).attr('value'));
                    options.callback();
                    return false;
                });
            });
        });
    },
    fullPage:function (options) {
        var defaults={
            ele:['.ease_header','.control']
        };
        options=$.extend({},defaults,options);
        return this.each(function () {
            var H=0;
            $.each(options.ele,function (index,ele) {
                H+=$(ele).outerHeight(true)
            });
            var full=$(window).height()-H;
            $(this).height(full);
        });
    },
    floorTree:function (options) {
        var defaults={

        };
        options=$.extend({},defaults,options);
        return this.each(function () {
            var _this=$(this);
            $(this).find('.switch').on('click',function () {
                if($(this).is('.on')){
                    $(this).removeClass('on').addClass('off');
                }else{
                    $(this).removeClass('off').addClass('on');
                }
                if($(this).parents(".ni_box_style").size() >= 1)
                {
                    $(this).parent().siblings('ul').slideToggle();
                }
                else{
                    $(this).siblings('ul').slideToggle();
                }
                
            });

        });
    },
    leftSlide:function (options) {
        var defaults={
            value:'-218px'
        };
        options=$.extend({},defaults,options);
        return this.each(function () {
            $(this).on('click',function () {
                var _this=$(this);
                if(_this.is('.off')){
                    _this.removeClass('off').addClass('on');
                    _this.parent().animate({right:0});
                }else{
                    _this.removeClass('on').addClass('off');
                    _this.parent().animate({right:options.value});
                }
            });
        });
    },
    tableColor: function (options) {
        var defaults = {
            color: '#fafafa'
        };
        options = $.extend({}, defaults, options);
        return this.each(function () {
            $(this).find("tbody tr:even").css("background-color", options.color);//行号为奇数的是背景白色
        });

    },
    drag:function (options) {
        var defaults={
            container:'.fullPhotoRect'
        };
        options=$.extend({},defaults,options);
        return this.each(function () {
            var _this=$(this);
            var starX=0,starY=0;
            var left=0,top=0;
            _this.on('mousedown',function (event) {
                left=parseInt(_this.css('left'));
                top=parseInt(_this.css('top'));
                starX=event.pageX;
                starY=event.pageY;
                $(document).on('mousemove',move);
            });
            _this.on('mouseup',function (event) {
                $(document).off('mousemove',move);
            });
            $(document).on('mouseup',function () {
                $(document).off('mousemove',move);
            });
            function move(event) {
                window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
                var handleWidth=_this.outerWidth(true),containerWidth=$(options.container).width();
                var handleHeight=_this.outerHeight(true),containerHeight=$(options.container).height();
                var moveX=event.pageX,moveY=event.pageY;
                var offsetLeft=moveX-starX+left,offsetTop=moveY-starY+top;
                if(offsetLeft<0){
                    offsetLeft=0
                }else if((offsetLeft+handleWidth)>containerWidth){
                    offsetLeft=containerWidth-handleWidth;
                }else{
                    offsetLeft=offsetLeft;
                }
                if(offsetTop<0){
                    offsetTop=0
                }else if((offsetTop+handleHeight)>containerHeight){
                    offsetTop=containerHeight-handleHeight;
                }else{
                    offsetTop=offsetTop;
                }
                _this.css({left:offsetLeft,top:offsetTop});
            }

        });
    },
    boxResize:function (options) {
        var defaults={
            container:'.photoRect',
            initW:144,
            initH:210,
            startLeft:266,
            startTop:88
        };
        options=$.extend({},defaults,options);
        return this.each(function () {
            var _this=$(this);
            var top=$(this).children('.handle-top'),bottom=$(this).children('.handle-bottom');
            var right=$(this).children('.handle-right'),left=$(this).children('.handle-left');
            var starX=0,starY=0;
            var boxW=$(options.container).width();//父容器宽
            var boxH=$(options.container).height();//父容器高
            var initW=options.initW;//初始宽度
            var initH=options.initH;//初始高度
            var startLeft=options.startLeft;//初始left值
            var startTop=options.startTop;//初始top值
            init(boxW,boxH,initW,initH,startLeft,startTop);
            function init(boxW,boxH,initW,initH,startLeft,startTop) {
                _this.css({
                    left:startLeft,
                    right:boxW-initW-startLeft,
                    top:startTop,
                    bottom:boxH-initH-startTop
                });
            }
            top.on('mousedown',function (event) {
                var event=event||window.event
                initVertical('top',event);
            });
            bottom.on('mousedown',function (event) {
                var event=event||window.event
                initVertical('bottom',event);
            });
            right.on('mousedown',function (event) {
                var event=event||window.event
                initHorizontal('right',event);
            });
            left.on('mousedown',function (event) {
                var event=event||window.event
                initHorizontal('left',event);
            });
            $(document).on('mouseup',function () {
                $(document).off('mousemove',moveHorizontal);
                $(document).off('mousemove',moveVertical);
            });
            var right=0,left=0,flag;
            var top=0,bottom=0,flag2;
            function initHorizontal(dir,e) {
                starX=e.pageX;
                if(dir=='left'){
                    flag='left';
                    left=parseInt(_this.css('left'));
                }else if(dir=='right'){
                    flag='right';
                    right=parseInt(_this.css('right'));
                }
                $(document).on('mousemove',moveHorizontal);
            }
            function moveHorizontal(event) {
                window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
                var moveX=event.pageX;
                var diffX=moveX-starX;
                if(flag=='left'){
                    _this.css({
                        left:left+diffX<0?0:left+diffX
                    });
                }else if(flag=='right'){
                    _this.css({
                        right:right-diffX<0?0:right-diffX
                    });
                }
            }
            function initVertical(dir,e) {
                starY=e.pageY;
                if(dir=='top'){
                    flag2='top';
                    top=parseInt(_this.css('top'));
                }else if(dir=='bottom'){
                    flag2='bottom';
                    bottom=parseInt(_this.css('bottom'));
                }
                $(document).on('mousemove',moveVertical);
            }
            function moveVertical(event) {
                window.getSelection?window.getSelection().removeAllRanges():document.selection.empty();
                var moveY=event.pageY;
                var diffY=moveY-starY;
                if(flag2=='top'){
                    _this.css({
                        top:top+diffY<0?0:top+diffY
                    });
                }else if(flag2=='bottom'){
                    _this.css({
                        bottom:bottom-diffY<0?0:bottom-diffY
                    });
                }
            }
        });
    }
    
});

var artDialogs = function (obj) {
    var dialog=art.dialog({
        lock: obj.lock ? obj.lock : true,
        drag: obj.drag ? obj.drag : false,
        time: obj.time ? obj.time : null,
        width:obj.width? obj.width:'auto',
        background: obj.background ? obj.background : '#fff',
        opacity: obj.opacity ? obj.opacity : 0.6,
        padding: obj.padding ? obj.padding : '18px',
        title: obj.title?obj.title:false,
        content: obj.content?obj.content:'内容不能为空',
        ok: obj.ok ? obj.ok : null,
        okVal:obj.okVal ? obj.okVal : '确定',
        cancel: obj.cancel ? obj.cancel : null,
        cancelVal:obj.cancelVal ? obj.cancelVal : '取消',
        init: obj.init ? obj.init : null,
        button:obj.button ? obj.button : null
    });
    return dialog;
}
$('.uerbox').hover(function () {
    $(this).find('.drop_wrap').stop(false,true).fadeIn();
    return false;
},function () {
    $(this).find('.drop_wrap').stop(false,true).fadeOut();
    return false;
});
$.fn.extend({
    //复选
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
    //单选
    radios: function (options) {
        var self = this;
        return this.each(function () {
            var _this = $(this);
            $('label', this).each(function () {
                $(this).addClass('Radio');
                if ($(this).children().is(":checked")) {
                    $(this).addClass('RadioChecked');
                    _this.find('label').not($(this)).removeClass("RadioChecked");
                }
            }).click(function (event) {
                _this.find('label').not($(this)).removeClass("RadioChecked");
                if (!$(this).children().is(':checked')) {
                    $(this).addClass("RadioChecked");
                    $(this).children()[0].checked = true;
                }
                event.stopPropagation();
            }).children().hide();
        });
    },
    tabControl: function (tab, con, mor) {
        $(this).each(function () {
            var _this = this;
            $(this).find(tab).each(function (i) {
                $(this).click(function () {
                    $(this).addClass('on').siblings().removeClass('on');
                    $(_this).find(con).addClass('dis_none');
                    $(_this).find(con).eq(i).removeClass('dis_none');
                    return false;
                });
            });
        });
    },
    tabControl2: function (options) {
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
    SpecialSelector: function (options) {
        var defaults={
            beforeClick:function(){},
            callback:function () {}
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
                var Odrop = $(this).find(".selectwrapper");
                var Oarrow = $(this).find(".droparrow");
                var Owidth = $(this).width();
                Odrop.toggle(0, function () {
                    $(this).css({
                        'z-index': 100
                    });
                    Oarrow.fadeToggle(0);
                    options.beforeClick();
                });

                $(this).not($(this)).find(".selectwrapper").hide();
                $(this).not($(this)).find(".droparrow").hide();
                ev.stopPropagation();
                $(document).click(function () {
                    $(".selectwrapper").hide();
                    $(".droparrow").hide();

                });
                Odrop.find("a").unbind().on('click', function () {
                    Ocur.find("p").html($(this).html());
                    Odrop.hide();
                    Oarrow.hide();
                    $(this).addClass('active').siblings().removeClass('active');
                    options.callback();
                    return false;
                });
            });
        });
    },
    //分页
    inputPageFocus: function (opts) {
        var set = $.extend({
            btnClass: ''
        }, opts || {});
        var btnClass = set.btnClass;
        var This = $(this);
        This.on('click', function (ev) {
            $(this).next(btnClass).stop(true).animate({'left': 36});
            ev.stopPropagation();
        });
        $(document).on('click', function () {
            This.next(btnClass).stop(true).animate({'left': 0});
        });
    },
    //搜索框
    changeColor: function (options) {
        var defaults = {
            obj: '.inputSearch',
            focusBg: '#f1f8ff',
            blurBg: 'transparent',
            bordercolor: '#2692de'
        };
        options = $.extend({}, defaults, options);
        return this.each(function () {
            //搜索框变色
            $(options.obj).focus(function () {
                $(this).css({background: options.focusBg});
                $(this).parent().css({background: options.focusBg, borderColor: options.bordercolor});
            });
            //搜索框变色
            $(options.obj).blur(function () {
                $(this).css({background: options.blurBg});
                $(this).parent().css({background: options.blurBg});
            });
        });
    },
    //表格隔行变色
    tableColor: function (options) {
        var defaults = {
            color: '#f6f6f6'
        };
        options = $.extend({}, defaults, options);
        return this.each(function () {
            $(this).find("tbody tr:odd").css("background-color", options.color);//行号为奇数的是背景白色
        });

    },
    //下拉
    drop: function (options) {
        var defaults = {
            afterClick: function(_this){}
        };
        options = $.extend({}, defaults, options);
        return this.each(function () {
            var value = $(this).find('.dropValue');
            var List = $(this).find('.dropList');
            $(this).on('click', '.dropValue', function (event) {
                $(this).next().fadeToggle(200);
                event.stopPropagation();
            });
            var tit = [];
            List.find('dl').each(function () {
                var _this = $(this);
                tit.push($(this).find('dt').text());
                $(this).on('click', 'dd p i', function (event) {
                    value.find('span').text(tit[_this.index()] + $(this).text());
                    $(this).addClass('on').siblings().removeClass('on');
                    _this.siblings().find('dd p i').removeClass('on');
                    options.afterClick($(this),_this.find('dt'));//点击事件的回调函数参数分别代表当前点击的DOM对象，当前点击dom对象的所属分类
                    List.hide();
                    event.stopPropagation();
                });
            });
            List.on('click', function (event) {
                event.stopPropagation();
            });
            $(document).click(function () {
                List.hide();
            });
        });
    },
    hoverDrop: function () {
        return this.each(function () {
            var _this = $(this);
            var btn = $(this).find('.bubbletBtn');
            var drop = $(this).find('.groupdeta_list');
            var bubble = $(this).find('.bubblet');
            var table = drop.find('table');
            var tr = table.find('tbody tr');
            var totle = 0;

            function Summation() {
                tr.each(function () {
                    totle += parseInt($(this).find("td").eq(1).text());
                    $(this).on('click', '.icon_delet', function () {
                        var td = $(this).parent().prev();
                        bubble.text(totle - td.text());
                        totle = totle - parseInt(td.text());
                        $(this).parent().prev().text(0);
                        if (totle == 0) return false;
                    });
                });
                bubble.text(totle);
            }

            Summation();
            //清空试题
            $(this).on('click', 'a', function () {
                tr.each(function () {
                    $(this).find("td").eq(1).text(0);
                });
                bubble.text(0);
                totle = 0;
            });
            //滑动显示
            $(this).hover(function () {
                drop.stop().fadeIn();
                btn.stop().css('background', '#ffbc4d');
            }, function () {
                drop.stop().fadeOut();
                btn.stop().css('background', '#ff9f01');
            });
        });
    },
    accordion: function () {
        return this.each(function () {
            var _this = $(this);
            $(this).find('li').each(function () {
                var _this = $(this);
                    $(this).click(function (event) {
                        if($(this).children('ul').length){
                            $(this).toggleClass('active').siblings().removeClass('active');
                            $(this).children('ul').stop().slideToggle();
                            $(this).siblings().children('ul').slideUp();
                            event.stopPropagation();
                        }else{
                            $(this).addClass('on').siblings().removeClass('on');
                            $(this).parent().parent().siblings().find('li').removeClass('on');
                        }
                        event.stopPropagation();
                    });
/*                    $(this).on('click', '.sonBlock li', function (event) {
                        $(this).addClass('on').siblings().removeClass('on');
                        _this.siblings().find('.sonBlock li').removeClass('on');
                        event.stopPropagation();
                    });*/


            });
        });
    },
    menuRight: function () {
        return this.each(function () {
            $(this).find('dl').each(function () {
                $(this).hover(function () {
                    $(this).addClass('hover');
                    $(this).find('dd ul').show();
                    $(this).find('dd').stop().animate({'left': '100%'}, function () {
                        $(this).css('zIndex', 100);
                    })
                }, function () {
                    $(this).removeClass('hover');
                    $(this).find('dd').stop().animate({'left': '0'}).css('zIndex', -1);
                    //$(this).find('dd ul').hide();
                });
            });
        });
    }
});
//计算高度
$.countH = function (options) {
    var defaults = {
        head: '.headerT',
        left: '[data-height="left"]',
        right: '[data-height="right"]',
        set:[]
    };
    options = $.extend({}, defaults, options);
    var _head = $(options.head);
    var _left = $(options.left);
    var _right = $(options.right);
    var residue=0;
    if(options.set.length){
        options.set.map(function (ele,index) {
            residue+=$(ele).outerHeight(true);
        });
    }else{
        residue=0;
    }
    var _compareH = $(window).height() - _head.height() - residue;
    var max = Math.max(_compareH, _left.height(), _right.height());
    if (_left.height() > _right.height() && _left.height() > _compareH) {
        //return false;
    } else {
        _left.height(max);
        _right.height(max);
    }
    $(window).resize(function () {
        var _newH = $(window).height() - _head.height();
        var max = Math.max(_newH, _left.height(), _right.height());
        if (_left.height() > _right.height() && _left.height() > _newH) {
            //return false;
        } else {
            _left.height(max);
            _right.height(max);
        }
    });

}
//树
$.fn.setPoint = function (obj, jsons) {
    var str = '';
    $.map(jsons, function (ele, index) {
        var num = index + 1;
        str += '<li class="level0" id="point' + (index + 1) + '"><a id="point' + (index + 1) + '_a" href="javacript:;">';
        if (ele.checked) {
            str += '<span><label class="checkPoint"><input type="checkbox" value="4" class="dis_none">' + ele.name + '</label></span>';
        } else {
            str += '<span>' + ele.name + '</span>';
        }
        str += '</a>';
        if (ele.children) {//2
            str += '<span class="line"></span>';
            str += '<ul id="point' + num + '_ul" class="level0">';
            $.map(ele.children, function (ele, index) {
                var index1 = index + 2;
                str += '<li class="level1" id="point' + num + '_' + index1 + '"><a id="point' + num + '_' + index1 + '_a" href="javacript:;"><i class="dot"></i>';
                if (ele.checked) {
                    str += '<span><label class="checkPoint"><input type="checkbox" value="' + ele.value + '" class="dis_none">' + ele.name + '</label></span>';
                } else {
                    str += '<span>' + ele.name + '</span>';
                }
                str += '</a>';
                if (ele.children) {//3
                    str += '<span class="line"></span>';
                    str += '<ul id="point' + num + '_' + index1 + '_ul">';
                    $.map(ele.children, function (ele, index) {
                        var index2 = index + 2;
                        str += '<li class="level2" id="point' + num + '_' + index1 + '_' + index2 + '"><a href="javacript:;"><i class="dot"></i>';
                        if (ele.checked) {
                            str += '<span><label class="checkPoint"><input type="checkbox" value="' + ele.value + '" class="dis_none">' + ele.name + '</label></span>';
                        } else {
                            str += '<span>' + ele.name + '</span>';
                        }
                        str += '</a></li>';
                    });
                    str += '</ul>';
                }
                str += '</li>';
            });
            str += '</ul>';
        }
        str += '</li>';
    });
    obj.append($(str));
    var txt = [];
    obj.children('li').each(function () {
        $(this).on('click', '.checkPoint', function () {
            $(this).toggleClass('checked');
            var value = $(this).children('input').val();
            //var txt=$(this).text();
            if ($(this).is('.checked')) {
                $(this).children('input')[0].checked = true;
                txt.push($(this).text());
                $('#poinTxt').val(txt.join('、'));
                console.log(txt.join('、'));
            } else {
                $(this).children('input')[0].checked = false;
                function indexof(obj, ele) {
                    for (var i = 0; i < txt.length; i++) {
                        if (txt[i] == ele) {
                            return i;
                        }
                    }
                }

                var index = indexof(txt, $(this).text());
                txt.splice(index, 1);
                $('#poinTxt').val(txt.join('、'));
            }
            return false;
        });
        var check = $(this).find('.checkPoint');
        if (check.is('.checked')) {
            check.children('input')[0].checked = true;
            txt.push($(this).text());
            $('#poinTxt').val(txt.join('、'));
        }
    });
}
var artDialogs = function (obj) {
    var dialog=art.dialog({
        lock: obj.lock ? obj.lock : true,
        drag: obj.drag ? obj.drag : false,
        time: obj.time ? obj.time : null,
        background: obj.background ? obj.background : '#fff',
        opacity: obj.opacity ? obj.opacity : 0.6,
        padding: obj.padding ? obj.padding : '18px',
        title: obj.title?obj.title:false,
        content: obj.content?obj.content:'内容不能为空',
        ok: obj.ok ? obj.ok : false,
        okVal:obj.okVal ? obj.okVal : '确定',
        cancel: obj.cancel ? obj.cancel : false,
        cancelVal:obj.cancelVal ? obj.cancelVal : '取消',
        init: obj.init ? obj.init : null,
        button:obj.button ? obj.button : null
    });
    return dialog;
}
//正反选
	function clickBtn(obj,objAll){
		$(obj).click(function(evt){
			var evt = evt || window.event;
			if (evt.preventDefault) {
				evt.preventDefault();
				evt.stopPropagation();
			} else {
				evt.returnValue = false;
				evt.cancelBubble = true;
			}
			$(this).toggleClass("checked");
			$(obj).each(function(){
				if($(this).hasClass("checked")==false){
					$(objAll).removeClass("checked");
				}
				if($(obj).length==$("tbody .checkbox.checked").length){
					$(".checkAll label").addClass("checked");
				}
			})
		})
		$(objAll).click(function(evt){
			var evt = evt || window.event;
			if (evt.preventDefault) {
				evt.preventDefault();
				evt.stopPropagation();
			} else {
				evt.returnValue = false;
				evt.cancelBubble = true;
			}
			$(this).toggleClass("checked");
			if($(this).hasClass("checked")){
				$(".checkbox").addClass("checked");
			}else{
				$(".checkbox").removeClass("checked");
			}
		})
	}
// function clickBtn(obj, objAll) {
//     $(obj).click(function (evt) {
//         var evt = evt || window.event;
//         if (evt.preventDefault) {
//             evt.preventDefault();
//             evt.stopPropagation();
//         } else {
//             evt.returnValue = false;
//             evt.cancelBubble = true;
//         }
//         $(this).toggleClass("checked");
//         $(obj).each(function () {
//             if ($(this).hasClass("checked") == true) {
//                 $(objAll).removeClass("checked");
//             }
//             if ($(obj).length == $("tbody .checkbox.checked").length) {
//                 $(".checkAll label").addClass("checked");
//             }
//         })
//     })
//     $(objAll).click(function (evt) {
//         var evt = evt || window.event;
//         if (evt.preventDefault) {
//             evt.preventDefault();
//             evt.stopPropagation();
//         } else {
//             evt.returnValue = false;
//             evt.cancelBubble = true;
//         }
//         $(this).toggleClass("checked");
//         if ($(this).hasClass("checked")) {
//             $(".checkbox").addClass("checked");
//         } else {
//             $(".checkbox").removeClass("checked");
//         }
//     })
// }
/*滚动条兼容插件*/
(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else if(typeof exports==='object'){module.exports=factory}else{factory(jQuery)}}(function($){var toFix=['wheel','mousewheel','DOMMouseScroll','MozMousePixelScroll'],toBind=('onwheel'in document||document.documentMode>=9)?['wheel']:['mousewheel','DomMouseScroll','MozMousePixelScroll'],slice=Array.prototype.slice,nullLowestDeltaTimeout,lowestDelta;if($.event.fixHooks){for(var i=toFix.length;i;){$.event.fixHooks[toFix[--i]]=$.event.mouseHooks}}var special=$.event.special.mousewheel={version:'3.1.9',setup:function(){if(this.addEventListener){for(var i=toBind.length;i;){this.addEventListener(toBind[--i],handler,false)}}else{this.onmousewheel=handler}$.data(this,'mousewheel-line-height',special.getLineHeight(this));$.data(this,'mousewheel-page-height',special.getPageHeight(this))},teardown:function(){if(this.removeEventListener){for(var i=toBind.length;i;){this.removeEventListener(toBind[--i],handler,false)}}else{this.onmousewheel=null}},getLineHeight:function(elem){return parseInt($(elem)['offsetParent'in $.fn?'offsetParent':'parent']().css('fontSize'),10)},getPageHeight:function(elem){return $(elem).height()},settings:{adjustOldDeltas:true}};$.fn.extend({mousewheel:function(fn){return fn?this.bind('mousewheel',fn):this.trigger('mousewheel')},unmousewheel:function(fn){return this.unbind('mousewheel',fn)}});function handler(event){var orgEvent=event||window.event,args=slice.call(arguments,1),delta=0,deltaX=0,deltaY=0,absDelta=0;event=$.event.fix(orgEvent);event.type='mousewheel';if('detail'in orgEvent){deltaY=orgEvent.detail*-1}if('wheelDelta'in orgEvent){deltaY=orgEvent.wheelDelta}if('wheelDeltaY'in orgEvent){deltaY=orgEvent.wheelDeltaY}if('wheelDeltaX'in orgEvent){deltaX=orgEvent.wheelDeltaX*-1}if('axis'in orgEvent&&orgEvent.axis===orgEvent.HORIZONTAL_AXIS){deltaX=deltaY*-1;deltaY=0}delta=deltaY===0?deltaX:deltaY;if('deltaY'in orgEvent){deltaY=orgEvent.deltaY*-1;delta=deltaY}if('deltaX'in orgEvent){deltaX=orgEvent.deltaX;if(deltaY===0){delta=deltaX*-1}}if(deltaY===0&&deltaX===0){return}if(orgEvent.deltaMode===1){var lineHeight=$.data(this,'mousewheel-line-height');delta*=lineHeight;deltaY*=lineHeight;deltaX*=lineHeight}else if(orgEvent.deltaMode===2){var pageHeight=$.data(this,'mousewheel-page-height');delta*=pageHeight;deltaY*=pageHeight;deltaX*=pageHeight}absDelta=Math.max(Math.abs(deltaY),Math.abs(deltaX));if(!lowestDelta||absDelta<lowestDelta){lowestDelta=absDelta;if(shouldAdjustOldDeltas(orgEvent,absDelta)){lowestDelta/=40}}if(shouldAdjustOldDeltas(orgEvent,absDelta)){delta/=40;deltaX/=40;deltaY/=40}delta=Math[delta>=1?'floor':'ceil'](delta/lowestDelta);deltaX=Math[deltaX>=1?'floor':'ceil'](deltaX/lowestDelta);deltaY=Math[deltaY>=1?'floor':'ceil'](deltaY/lowestDelta);event.deltaX=deltaX;event.deltaY=deltaY;event.deltaFactor=lowestDelta;event.deltaMode=0;args.unshift(event,delta,deltaX,deltaY);if(nullLowestDeltaTimeout){clearTimeout(nullLowestDeltaTimeout)}nullLowestDeltaTimeout=setTimeout(nullLowestDelta,200);return($.event.dispatch||$.event.handle).apply(this,args)}function nullLowestDelta(){lowestDelta=null}function shouldAdjustOldDeltas(orgEvent,absDelta){return special.settings.adjustOldDeltas&&orgEvent.type==='mousewheel'&&absDelta%120===0}}));
/*滚动条插件*/
(function(factory){'use strict';if(typeof define==='function'&&define.amd){define(['jquery'],factory)}else if(typeof exports==='object'){factory(require('jquery'))}else{factory(jQuery)}}(function($){'use strict';var defaultSettings={wheelSpeed:10,wheelPropagation:false,minScrollbarLength:null,useBothWheelAxes:false,useKeyboard:true,suppressScrollX:false,suppressScrollY:false,scrollXMarginOffset:0,scrollYMarginOffset:0,includePadding:false};var getEventClassName=(function(){var incrementingId=0;return function(){var id=incrementingId;incrementingId+=1;return'.perfect-scrollbar-'+id}}());$.fn.perfectScrollbar=function(suppliedSettings,option){return this.each(function(){var settings=$.extend(true,{},defaultSettings),$this=$(this);if(typeof suppliedSettings==="object"){$.extend(true,settings,suppliedSettings)}else{option=suppliedSettings}if(option==='update'){if($this.data('perfect-scrollbar-update')){$this.data('perfect-scrollbar-update')()}return $this}else if(option==='destroy'){if($this.data('perfect-scrollbar-destroy')){$this.data('perfect-scrollbar-destroy')()}return $this}if($this.data('perfect-scrollbar')){return $this.data('perfect-scrollbar')}$this.addClass('ps-container');var $scrollbarXRail=$("<div class='ps-scrollbar-x-rail'></div>").appendTo($this),$scrollbarYRail=$("<div class='ps-scrollbar-y-rail'></div>").appendTo($this),$scrollbarX=$("<div class='ps-scrollbar-x'></div>").appendTo($scrollbarXRail),$scrollbarY=$("<div class='ps-scrollbar-y'></div>").appendTo($scrollbarYRail),scrollbarXActive,scrollbarYActive,containerWidth,containerHeight,contentWidth,contentHeight,scrollbarXWidth,scrollbarXLeft,scrollbarXBottom=parseInt($scrollbarXRail.css('bottom'),10),isScrollbarXUsingBottom=scrollbarXBottom===scrollbarXBottom,scrollbarXTop=isScrollbarXUsingBottom?null:parseInt($scrollbarXRail.css('top'),10),scrollbarYHeight,scrollbarYTop,scrollbarYRight=parseInt($scrollbarYRail.css('right'),10),isScrollbarYUsingRight=scrollbarYRight===scrollbarYRight,scrollbarYLeft=isScrollbarYUsingRight?null:parseInt($scrollbarYRail.css('left'),10),isRtl=$this.css('direction')==="rtl",eventClassName=getEventClassName();var updateContentScrollTop=function(currentTop,deltaY){var newTop=currentTop+deltaY,maxTop=containerHeight-scrollbarYHeight;if(newTop<0){scrollbarYTop=0}else if(newTop>maxTop){scrollbarYTop=maxTop}else{scrollbarYTop=newTop}var scrollTop=parseInt(scrollbarYTop*(contentHeight-containerHeight)/(containerHeight-scrollbarYHeight),10);$this.scrollTop(scrollTop);if(isScrollbarXUsingBottom){$scrollbarXRail.css({bottom:scrollbarXBottom-scrollTop})}else{$scrollbarXRail.css({top:scrollbarXTop+scrollTop})}};var updateContentScrollLeft=function(currentLeft,deltaX){var newLeft=currentLeft+deltaX,maxLeft=containerWidth-scrollbarXWidth;if(newLeft<0){scrollbarXLeft=0}else if(newLeft>maxLeft){scrollbarXLeft=maxLeft}else{scrollbarXLeft=newLeft}var scrollLeft=parseInt(scrollbarXLeft*(contentWidth-containerWidth)/(containerWidth-scrollbarXWidth),10);$this.scrollLeft(scrollLeft);if(isScrollbarYUsingRight){$scrollbarYRail.css({right:scrollbarYRight-scrollLeft})}else{$scrollbarYRail.css({left:scrollbarYLeft+scrollLeft})}};var getSettingsAdjustedThumbSize=function(thumbSize){if(settings.minScrollbarLength){thumbSize=Math.max(thumbSize,settings.minScrollbarLength)}return thumbSize};var updateScrollbarCss=function(){var scrollbarXStyles={width:containerWidth,display:scrollbarXActive?"inherit":"none"};if(isRtl){scrollbarXStyles.left=$this.scrollLeft()+containerWidth-contentWidth}else{scrollbarXStyles.left=$this.scrollLeft()}if(isScrollbarXUsingBottom){scrollbarXStyles.bottom=scrollbarXBottom-$this.scrollTop()}else{scrollbarXStyles.top=scrollbarXTop+$this.scrollTop()}$scrollbarXRail.css(scrollbarXStyles);var scrollbarYStyles={top:$this.scrollTop(),height:containerHeight,display:scrollbarYActive?"inherit":"none"};if(isScrollbarYUsingRight){if(isRtl){scrollbarYStyles.right=contentWidth-$this.scrollLeft()-scrollbarYRight-$scrollbarY.outerWidth()}else{scrollbarYStyles.right=scrollbarYRight-$this.scrollLeft()}}else{if(isRtl){scrollbarYStyles.left=$this.scrollLeft()+containerWidth*2-contentWidth-scrollbarYLeft-$scrollbarY.outerWidth()}else{scrollbarYStyles.left=scrollbarYLeft+$this.scrollLeft()}}$scrollbarYRail.css(scrollbarYStyles);$scrollbarX.css({left:scrollbarXLeft,width:scrollbarXWidth});$scrollbarY.css({top:scrollbarYTop,height:scrollbarYHeight})};var updateBarSizeAndPosition=function(){containerWidth=settings.includePadding?$this.innerWidth():$this.width();containerHeight=settings.includePadding?$this.innerHeight():$this.height();contentWidth=$this.prop('scrollWidth');contentHeight=$this.prop('scrollHeight');if(!settings.suppressScrollX&&containerWidth+settings.scrollXMarginOffset<contentWidth){scrollbarXActive=true;scrollbarXWidth=getSettingsAdjustedThumbSize(parseInt(containerWidth*containerWidth/contentWidth,10));scrollbarXLeft=parseInt($this.scrollLeft()*(containerWidth-scrollbarXWidth)/(contentWidth-containerWidth),10)}else{scrollbarXActive=false;scrollbarXWidth=0;scrollbarXLeft=0;$this.scrollLeft(0)}if(!settings.suppressScrollY&&containerHeight+settings.scrollYMarginOffset<contentHeight){scrollbarYActive=true;scrollbarYHeight=getSettingsAdjustedThumbSize(parseInt(containerHeight*containerHeight/contentHeight,10));scrollbarYTop=parseInt($this.scrollTop()*(containerHeight-scrollbarYHeight)/(contentHeight-containerHeight),10)}else{scrollbarYActive=false;scrollbarYHeight=0;scrollbarYTop=0;$this.scrollTop(0)}if(scrollbarYTop>=containerHeight-scrollbarYHeight){scrollbarYTop=containerHeight-scrollbarYHeight}if(scrollbarXLeft>=containerWidth-scrollbarXWidth){scrollbarXLeft=containerWidth-scrollbarXWidth}updateScrollbarCss()};var bindMouseScrollXHandler=function(){var currentLeft,currentPageX;$scrollbarX.bind('mousedown'+eventClassName,function(e){currentPageX=e.pageX;currentLeft=$scrollbarX.position().left;$scrollbarXRail.addClass('in-scrolling');e.stopPropagation();e.preventDefault()});$(document).bind('mousemove'+eventClassName,function(e){if($scrollbarXRail.hasClass('in-scrolling')){updateContentScrollLeft(currentLeft,e.pageX-currentPageX);e.stopPropagation();e.preventDefault()}});$(document).bind('mouseup'+eventClassName,function(e){if($scrollbarXRail.hasClass('in-scrolling')){$scrollbarXRail.removeClass('in-scrolling')}});currentLeft=currentPageX=null};var bindMouseScrollYHandler=function(){var currentTop,currentPageY;$scrollbarY.bind('mousedown'+eventClassName,function(e){currentPageY=e.pageY;currentTop=$scrollbarY.position().top;$scrollbarYRail.addClass('in-scrolling');e.stopPropagation();e.preventDefault()});$(document).bind('mousemove'+eventClassName,function(e){if($scrollbarYRail.hasClass('in-scrolling')){updateContentScrollTop(currentTop,e.pageY-currentPageY);e.stopPropagation();e.preventDefault()}});$(document).bind('mouseup'+eventClassName,function(e){if($scrollbarYRail.hasClass('in-scrolling')){$scrollbarYRail.removeClass('in-scrolling')}});currentTop=currentPageY=null};var shouldPreventDefault=function(deltaX,deltaY){var scrollTop=$this.scrollTop();if(deltaX===0){if(!scrollbarYActive){return false}if((scrollTop===0&&deltaY>0)||(scrollTop>=contentHeight-containerHeight&&deltaY<0)){return!settings.wheelPropagation}}var scrollLeft=$this.scrollLeft();if(deltaY===0){if(!scrollbarXActive){return false}if((scrollLeft===0&&deltaX<0)||(scrollLeft>=contentWidth-containerWidth&&deltaX>0)){return!settings.wheelPropagation}}return true};var bindMouseWheelHandler=function(){settings.wheelSpeed/=10;var shouldPrevent=false;$this.bind('mousewheel'+eventClassName,function(e,deprecatedDelta,deprecatedDeltaX,deprecatedDeltaY){var deltaX=e.deltaX*e.deltaFactor||deprecatedDeltaX,deltaY=e.deltaY*e.deltaFactor||deprecatedDeltaY;shouldPrevent=false;if(!settings.useBothWheelAxes){$this.scrollTop($this.scrollTop()-(deltaY*settings.wheelSpeed));$this.scrollLeft($this.scrollLeft()+(deltaX*settings.wheelSpeed))}else if(scrollbarYActive&&!scrollbarXActive){if(deltaY){$this.scrollTop($this.scrollTop()-(deltaY*settings.wheelSpeed))}else{$this.scrollTop($this.scrollTop()+(deltaX*settings.wheelSpeed))}shouldPrevent=true}else if(scrollbarXActive&&!scrollbarYActive){if(deltaX){$this.scrollLeft($this.scrollLeft()+(deltaX*settings.wheelSpeed))}else{$this.scrollLeft($this.scrollLeft()-(deltaY*settings.wheelSpeed))}shouldPrevent=true}updateBarSizeAndPosition();shouldPrevent=(shouldPrevent||shouldPreventDefault(deltaX,deltaY));if(shouldPrevent){e.stopPropagation();e.preventDefault()}});$this.bind('MozMousePixelScroll'+eventClassName,function(e){if(shouldPrevent){e.preventDefault()}})};var bindKeyboardHandler=function(){var hovered=false;$this.bind('mouseenter'+eventClassName,function(e){hovered=true});$this.bind('mouseleave'+eventClassName,function(e){hovered=false});var shouldPrevent=false;$(document).bind('keydown'+eventClassName,function(e){if(!hovered||$(document.activeElement).is(":input,[contenteditable]")){return}var deltaX=0,deltaY=0;switch(e.which){case 37:deltaX=-30;break;case 38:deltaY=30;break;case 39:deltaX=30;break;case 40:deltaY=-30;break;case 33:deltaY=90;break;case 32:case 34:deltaY=-90;break;case 35:deltaY=-containerHeight;break;case 36:deltaY=containerHeight;break;default:return}$this.scrollTop($this.scrollTop()-deltaY);$this.scrollLeft($this.scrollLeft()+deltaX);shouldPrevent=shouldPreventDefault(deltaX,deltaY);if(shouldPrevent){e.preventDefault()}})};var bindRailClickHandler=function(){var stopPropagation=function(e){e.stopPropagation()};$scrollbarY.bind('click'+eventClassName,stopPropagation);$scrollbarYRail.bind('click'+eventClassName,function(e){var halfOfScrollbarLength=parseInt(scrollbarYHeight/2,10),positionTop=e.pageY-$scrollbarYRail.offset().top-halfOfScrollbarLength,maxPositionTop=containerHeight-scrollbarYHeight,positionRatio=positionTop/maxPositionTop;if(positionRatio<0){positionRatio=0}else if(positionRatio>1){positionRatio=1}$this.scrollTop((contentHeight-containerHeight)*positionRatio)});$scrollbarX.bind('click'+eventClassName,stopPropagation);$scrollbarXRail.bind('click'+eventClassName,function(e){var halfOfScrollbarLength=parseInt(scrollbarXWidth/2,10),positionLeft=e.pageX-$scrollbarXRail.offset().left-halfOfScrollbarLength,maxPositionLeft=containerWidth-scrollbarXWidth,positionRatio=positionLeft/maxPositionLeft;if(positionRatio<0){positionRatio=0}else if(positionRatio>1){positionRatio=1}$this.scrollLeft((contentWidth-containerWidth)*positionRatio)})};var bindMobileTouchHandler=function(){var applyTouchMove=function(differenceX,differenceY){$this.scrollTop($this.scrollTop()-differenceY);$this.scrollLeft($this.scrollLeft()-differenceX);updateBarSizeAndPosition()};var startCoords={},startTime=0,speed={},breakingProcess=null,inGlobalTouch=false;$(window).bind("touchstart"+eventClassName,function(e){inGlobalTouch=true});$(window).bind("touchend"+eventClassName,function(e){inGlobalTouch=false});$this.bind("touchstart"+eventClassName,function(e){var touch=e.originalEvent.targetTouches[0];startCoords.pageX=touch.pageX;startCoords.pageY=touch.pageY;startTime=(new Date()).getTime();if(breakingProcess!==null){clearInterval(breakingProcess)}e.stopPropagation()});$this.bind("touchmove"+eventClassName,function(e){if(!inGlobalTouch&&e.originalEvent.targetTouches.length===1){var touch=e.originalEvent.targetTouches[0];var currentCoords={};currentCoords.pageX=touch.pageX;currentCoords.pageY=touch.pageY;var differenceX=currentCoords.pageX-startCoords.pageX,differenceY=currentCoords.pageY-startCoords.pageY;applyTouchMove(differenceX,differenceY);startCoords=currentCoords;var currentTime=(new Date()).getTime();var timeGap=currentTime-startTime;if(timeGap>0){speed.x=differenceX/timeGap;speed.y=differenceY/timeGap;startTime=currentTime}e.preventDefault()}});$this.bind("touchend"+eventClassName,function(e){clearInterval(breakingProcess);breakingProcess=setInterval(function(){if(Math.abs(speed.x)<0.01&&Math.abs(speed.y)<0.01){clearInterval(breakingProcess);return}applyTouchMove(speed.x*30,speed.y*30);speed.x*=0.8;speed.y*=0.8},10)})};var bindScrollHandler=function(){$this.bind('scroll'+eventClassName,function(e){updateBarSizeAndPosition()})};var destroy=function(){$this.unbind(eventClassName);$(window).unbind(eventClassName);$(document).unbind(eventClassName);$this.data('perfect-scrollbar',null);$this.data('perfect-scrollbar-update',null);$this.data('perfect-scrollbar-destroy',null);$scrollbarX.remove();$scrollbarY.remove();$scrollbarXRail.remove();$scrollbarYRail.remove();$scrollbarXRail=$scrollbarYRail=$scrollbarX=$scrollbarY=scrollbarXActive=scrollbarYActive=containerWidth=containerHeight=contentWidth=contentHeight=scrollbarXWidth=scrollbarXLeft=scrollbarXBottom=isScrollbarXUsingBottom=scrollbarXTop=scrollbarYHeight=scrollbarYTop=scrollbarYRight=isScrollbarYUsingRight=scrollbarYLeft=isRtl=eventClassName=null};var ieSupport=function(version){$this.addClass('ie').addClass('ie'+version);var bindHoverHandlers=function(){var mouseenter=function(){$(this).addClass('hover')};var mouseleave=function(){$(this).removeClass('hover')};$this.bind('mouseenter'+eventClassName,mouseenter).bind('mouseleave'+eventClassName,mouseleave);$scrollbarXRail.bind('mouseenter'+eventClassName,mouseenter).bind('mouseleave'+eventClassName,mouseleave);$scrollbarYRail.bind('mouseenter'+eventClassName,mouseenter).bind('mouseleave'+eventClassName,mouseleave);$scrollbarX.bind('mouseenter'+eventClassName,mouseenter).bind('mouseleave'+eventClassName,mouseleave);$scrollbarY.bind('mouseenter'+eventClassName,mouseenter).bind('mouseleave'+eventClassName,mouseleave)};var fixIe6ScrollbarPosition=function(){updateScrollbarCss=function(){var scrollbarXStyles={left:scrollbarXLeft+$this.scrollLeft(),width:scrollbarXWidth};if(isScrollbarXUsingBottom){scrollbarXStyles.bottom=scrollbarXBottom}else{scrollbarXStyles.top=scrollbarXTop}$scrollbarX.css(scrollbarXStyles);var scrollbarYStyles={top:scrollbarYTop+$this.scrollTop(),height:scrollbarYHeight};if(isScrollbarYUsingRight){scrollbarYStyles.right=scrollbarYRight}else{scrollbarYStyles.left=scrollbarYLeft}$scrollbarY.css(scrollbarYStyles);$scrollbarX.hide().show();$scrollbarY.hide().show()}};if(version===6){bindHoverHandlers();fixIe6ScrollbarPosition()}};var supportsTouch=(('ontouchstart'in window)||window.DocumentTouch&&document instanceof window.DocumentTouch);var initialize=function(){var ieMatch=navigator.userAgent.toLowerCase().match(/(msie) ([\w.]+)/);if(ieMatch&&ieMatch[1]==='msie'){ieSupport(parseInt(ieMatch[2],10))}updateBarSizeAndPosition();bindScrollHandler();bindMouseScrollXHandler();bindMouseScrollYHandler();bindRailClickHandler();if(supportsTouch){bindMobileTouchHandler()}if($this.mousewheel){bindMouseWheelHandler()}if(settings.useKeyboard){bindKeyboardHandler()}$this.data('perfect-scrollbar',$this);$this.data('perfect-scrollbar-update',updateBarSizeAndPosition);$this.data('perfect-scrollbar-destroy',destroy)};initialize();return $this})}}));
$(function () {
    $(".selecterBox_special ").SpecialSelector({
        beforeClick:function () {
            $('.selecterdown').perfectScrollbar({
                suppressScrollX:true
            });
        }
    });
    $('.uerbox').hover(function () {
        $(this).find('.drop_wrap').stop(false,true).fadeIn();
        return false;
    },function () {
        $(this).find('.drop_wrap').stop(false,true).fadeOut();
        return false;
    });
});


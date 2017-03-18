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
        var self = this;
        return this.each(function () {
            var _this = $(this);
            $('label', this).each(function () {
                $(this).addClass('Radio');
                if ($(this).is(".RadioChecked")) {
                    $(this).children()[0].checked = true;
                    $(this).siblings().removeClass("RadioChecked");
                }
                $(this).click(function (event) {
                    if (!$(this).is('.RadioChecked')) {
                        $(this).addClass("RadioChecked");
                        $(this).siblings().removeClass("RadioChecked");
                        $(this).children()[0].checked = true;
                    }
                    $(this).siblings().map(function (ele,index) {
                        $(index).children()[0].checked = false;
                    });
                    event.stopPropagation();
                });
            });
        });
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
    }
});

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
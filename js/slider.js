(function ($) {
    $.fn.slider = function (options) {
        var defaults = {};
        options = $.extend(true, {}, defaults, options);
        return this.each(function () {
            var _this = $(this);
            var imgBox = _this.children('.scan-img'),
                listbBox = _this.find('.img-viewlist');
            var next = _this.children('.next-btn'),
                prev = _this.children('.prev-btn');
            var list = listbBox.find('li'),
                listWidth = list.outerWidth(true);
            var flag = false;
            var afterLength = 0;

            init(list, listbBox);
            next.on('click', function (event) {
                if (flag) return false;
                move(-listWidth);
                event.stopPropagation();
            });
            prev.on('click', function (event) {
                if (flag) return false;
                move(listWidth);
                console.log($.fn.slider.person);
                event.stopPropagation();
            });

            function init(list, listbBox) {
                var first = list.eq(0).clone(),
                    last = list.eq(list.length - 1).clone();
                listbBox.append(first).prepend(last);
                listbBox.css({
                    left: -listWidth
                });
                afterLength = listbBox.find('li').length;
                listbBox.width(afterLength * listWidth);
            }

            function move(offset) {
                flag = true;
                var offsetLeft = parseInt(listbBox.css('left')) + offset;
                listbBox.animate({
                    left: offsetLeft
                }, function () {
                    if (offsetLeft < -(afterLength - 2) * listWidth) {
                        listbBox.css({
                            left: -listWidth
                        });
                    } else if (offsetLeft > -listWidth) {
                        listbBox.css({
                            left: -(afterLength - 2) * listWidth
                        });
                    }
                    flag = false;
                });
            }
        });
    }
})(jQuery);
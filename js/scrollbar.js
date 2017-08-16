$.fn.customScrollbar = function(options){
		var defaults = {
			con: ".dropcont",
			area: ".dropbox",
			dragger: ".drop",
			pace:30
		};
		$.extend(defaults,options);
		return this.each(function(){
			var self = $(this);
			var S = {
				init:function(){
					this.content = self.find(defaults.con);
					this.area = self.find(defaults.area);
					this.dragger = self.find(defaults.dragger);
					this.visible = self.is(':visible');

					if(!this.visible){self.show();};

					this.content.css('top',0);
					this.dragger.css('top',0);
					
					this.H = self.height();
					this.conH = this.content.outerHeight();
					this.areaH = this.area.height();
					this.radio = this.H/this.conH;
					this.conTop = parseInt(this.dragger.css('top')) || 0;
					this.draggerTop = parseInt(this.dragger.css('top')) || 0;
					this.conTopMin = this.H-this.conH;
					this.draggable = false;
					this.draggerFirstY = 0;
					this.draggerLastY = 0;
					this.pace = defaults.pace;
					this.timer = null;

					if(!this.visible){self.hide();};
					
					this.dragger.height(S.areaH*S.radio);
					this.draggerH = S.dragger.height();
					this.draggerTopMax = S.areaH-S.draggerH;

					self.unbind('mousewheel',S.mousewheelHandle);
					self.unbind('DOMMouseScroll',S.mousewheelHandle);
					// self.unbind('mouseenter',S.mouseenterHandle);
					// self.unbind('mouseleave',S.mouseleaveHandle);
					// this.area.unbind('click',S.clickHandle);
					// this.dragger.unbind('mousedown',S.mousedownHandle);

					if(this.conH > this.H){
						self.bind('mousewheel DOMMouseScroll',S.mousewheelHandle);
						// self.bind('mouseenter',S.mouseenterHandle);
						// self.bind('mouseleave',S.mouseleaveHandle);
						// this.area.bind('click',S.clickHandle);
						// this.dragger.bind('mousedown',S.mousedownHandle);
					};
				},
				mouseenterHandle:function(){
					S.area.show(100);
				},
				mouseleaveHandle:function(){
					S.area.hide(100);
				},
				mousewheelHandle:function(e){
					e.preventDefault();
					var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
					var draggerpace = S.pace/(-S.conTopMin)*S.draggerTopMax;
					if(delta>0){
						if(S.conTop != 0) e.preventDefault();
						if(S.conTop >= -S.pace){
							S.conTop = 0;
							S.draggerTop = 0;
						}else{
							S.conTop+=S.pace;
							S.draggerTop-=draggerpace;
						};
					}else if(delta<0){
						if(S.conTop != S.conTopMin) e.preventDefault();
						if(S.conTop <= S.conTopMin+S.pace){
							S.conTop = S.conTopMin;
							S.draggerTop = S.draggerTopMax;
						}else{
							S.conTop-=S.pace;
							S.draggerTop+=draggerpace;
						};
					};
					S.area.fadeIn(200);
					S.content.css('top',S.conTop);
					S.dragger.css('top',S.draggerTop);
					clearTimeout(S.timer);
					S.timer = setTimeout(function(){
						S.area.fadeOut(200);
					},500);
				},
				clickHandle:function (e){
					if(e.target == S.area[0]){
						var conpace = S.draggerH/S.draggerTopMax*S.conTopMin;
						if(e.offsetY <= S.draggerTop){
							if(S.draggerTop <= S.draggerH){
								S.draggerTop = 0;
								S.conTop = 0;
							}else{
								S.draggerTop -= S.draggerH;
								S.conTop -= conpace;
							};
						}else if(e.offsetY >= S.draggerTop+S.draggerH){
							if(S.draggerTop+S.draggerH >= S.areaH-S.draggerH){
								S.draggerTop = S.areaH-S.draggerH
								S.conTop = S.conTopMin;
							}else{
								S.draggerTop += S.draggerH;
								S.conTop += conpace;
							};
						};
						S.dragger.css('top',S.draggerTop);
						S.content.css('top',S.conTop);
					}
				},
				mousedownHandle:function(e){
					S.draggable = true;
					S.draggerLastY  = e.pageY;
					S.draggerFirstY = e.pageY-S.draggerTop;

					$(document).bind({
						mousemove:S.domMousemoveHandle,
						mouseup:S.domMouseupHandle
					});
					return false;
				},
				domMousemoveHandle:function(e){
					if(S.draggable){

						var draggerY = e.pageY;
						var dis = draggerY-S.draggerLastY;

						if(dis < 0 && S.draggerTop <= -dis){
							S.draggerTop = 0;
							S.conTop = 0;
						}else if(dis > 0 && S.draggerTop >= S.draggerTopMax-dis){
							S.draggerTop = S.draggerTopMax;
							S.conTop = S.conTopMin;
						}else if(draggerY >= S.draggerFirstY && draggerY <= S.draggerFirstY+S.draggerTopMax){
							//保持鼠标处于滚动条固定的点(鼠标快速移动时)
							if(S.draggerLastY < S.draggerFirstY){
								dis = draggerY-S.draggerFirstY;
							}else if(S.draggerLastY > S.draggerFirstY+S.draggerTopMax){
								dis = draggerY-(S.draggerFirstY+S.draggerTopMax);
							}
							S.draggerTop += dis;
							S.conTop += dis/S.draggerTopMax*S.conTopMin;
						};

						S.dragger.css('top',S.draggerTop);
						S.content.css('top',S.conTop);

						S.draggerLastY = draggerY;
					};
				},
				domMouseupHandle:function(e){
					S.draggable = false;
					$(document).unbind('mousemove',S.domMousemoveHandle);
					$(document).unbind('mouseup',S.domMouseupHandle);
					return true;
				}
			};
			S.init();
			this.S = S;
		});
	}
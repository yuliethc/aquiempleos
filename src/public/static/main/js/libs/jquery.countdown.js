!function($){return $.countdown=function(el,options){var getDateData;return this.el=el,this.$el=$(el),this.$el.data("countdown",this),this.init=function(_this){return function(){return _this.options=$.extend({},$.countdown.defaultOptions,options),_this.options.refresh&&(_this.interval=setInterval(function(){return _this.render()},_this.options.refresh)),_this.render(),_this}}(this),getDateData=function(_this){return function(endDate){var dateData,diff;return endDate=Date.parse($.isPlainObject(_this.options.date)?_this.options.date:new Date(_this.options.date)),diff=(endDate-Date.parse(new Date))/1e3,0>=diff&&(diff=0,_this.interval&&_this.stop(),_this.options.onEnd.apply(_this)),dateData={years:0,days:0,hours:0,min:0,sec:0,millisec:0},diff>=31557600&&(dateData.years=Math.floor(diff/31557600),diff-=365.25*dateData.years*86400),diff>=86400&&(dateData.days=Math.floor(diff/86400),diff-=86400*dateData.days),diff>=3600&&(dateData.hours=Math.floor(diff/3600),diff-=3600*dateData.hours),diff>=60&&(dateData.min=Math.floor(diff/60),diff-=60*dateData.min),dateData.sec=diff,dateData}}(this),this.leadingZeros=function(_this){return function(num,length){for(null==length&&(length=2),num=String(num);num.length<length;)num="0"+num;return num}}(this),this.update=function(_this){return function(newDate){return _this.options.date=newDate,_this}}(this),this.render=function(_this){return function(){return _this.options.render.apply(_this,[getDateData(_this.options.date)]),_this}}(this),this.stop=function(_this){return function(){return _this.interval&&clearInterval(_this.interval),_this.interval=null,_this}}(this),this.start=function(_this){return function(refresh){return null==refresh&&(refresh=_this.options.refresh||$.countdown.defaultOptions.refresh),_this.interval&&clearInterval(_this.interval),_this.render(),_this.options.refresh=refresh,_this.interval=setInterval(function(){return _this.render()},_this.options.refresh),_this}}(this),this.init()},$.countdown.defaultOptions={date:"June 7, 2087 15:03:25",refresh:1e3,onEnd:$.noop,render:function(date){return $(this.el).html(date.years+" years, "+date.days+" days, "+this.leadingZeros(date.hours)+" hours, "+this.leadingZeros(date.min)+" min and "+this.leadingZeros(date.sec)+" sec")}},void($.fn.countdown=function(options){return $.each(this,function(i,el){var $el;return $el=$(el),$el.data("countdown")?void 0:$el.data("countdown",new $.countdown(el,options))})})}(jQuery);
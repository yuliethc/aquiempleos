yOSON.AppCore.addModule("accordion_effect",function(Sb){var factory,initialize;return factory=function(){this.st={context:".accordion_affiliated_office",divAction:".accordion",classOpenWrap:"open",classCloseWrap:"close",divIcon:"span",classOpen:"up",classClose:"down",contentOpen:"+",contentClose:"-",oneAtATime:!0},this.dom={}},factory.prototype={catchDom:function(){this.dom.divAction=$(this.st.divAction,this.st.context)},suscribeEvents:function(){this.dom.divAction.on("click",{inst:this},this.eShowHideWrap)},eShowHideWrap:function(event){var _this,dom,row,st,that,wrap;event.stopPropagation(),that=event.data.inst,st=that.st,dom=that.dom,_this=$(this),wrap=_this.next(),row=_this.find(st.divIcon),wrap.is(":visible")?wrap.slideUp("fast",function(){wrap.hide(),row.text(st.contentOpen).addClass(st.classOpen).removeClass(st.classClose)}):(st.oneAtATime&&(_this.siblings(st.divAction).next().slideUp(),_this.siblings(st.divAction).find(st.divIcon).text(st.contentOpen).addClass(st.classOpen).removeClass(st.classClose)),wrap.slideDown("fast",function(){wrap.show(),row.text(st.contentClose).addClass(st.classClose).removeClass(st.classOpen)}))},execute:function(){this.st=$.extend({},this.st,this.op),this.catchDom(),this.suscribeEvents()}},initialize=function(oP){var instance;instance=new factory,instance.execute()},{init:initialize}},[]);
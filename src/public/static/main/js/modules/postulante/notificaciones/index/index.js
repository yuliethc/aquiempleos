yOSON.AppCore.addModule("add_answer",function(Sb){var afterCatchdom,catchDom,dom,events,functions,initialize,st,suscribeEvents;return dom={},st={containerGlobal:".body_postulant_notification_messages",bodyMessages:".body_messages",btnSendMessage:"#sendMessage",mensaje:"#mensaje",idMensaje:"#id_mensaje",tokenCuestion:"#hidAuthTokenCuestion",formPrincipal:".header_messages form",tplConversation:"#tplConversation",showLoading:!0,hideLoading:!1,document:document},catchDom=function(){dom.containerGlobal=$(st.containerGlobal),dom.formPrincipal=$(st.formPrincipal,dom.containerGlobal),dom.bodyMessages=$(st.bodyMessages,dom.containerGlobal),dom.btnSendMessage=$(st.btnSendMessage,dom.containerGlobal),dom.mensaje=$(st.mensaje,dom.containerGlobal),dom.idMensaje=$(st.idMensaje,dom.containerGlobal),dom.tokenCuestion=$(st.tokenCuestion,dom.containerGlobal),dom.document=$(st.document)},afterCatchdom=function(){st.factoryConversation=_.template($(st.tplConversation).html())},suscribeEvents=function(){dom.btnSendMessage.on("click",events.eAddResponseFlux)},events={eAddResponseFlux:function(e){var url,values;e.preventDefault(),""!==$.trim(dom.mensaje.val())&&(url=dom.formPrincipal.attr("action"),values={},values.mensaje=$.trim(dom.mensaje.val()),values.id_mensaje=dom.idMensaje.val(),values.hidAuthTokenCuestion=dom.tokenCuestion.val(),functions.fnSendResponse(url,values))}},functions={fnSendResponse:function(url,values){$.ajax({type:"POST",url:url,data:values,dataType:"json",beforeSend:function(){functions.fnLoading(st.showLoading)}}).done(function(response){var data;data=response.conversation,functions.fnUpdateToken(data),response.status===!0&&(functions.fnAddHTML(data),dom.mensaje.trigger("keyup"))}).always(function(response){functions.fnLoading(st.hideLoading)})},fnLoading:function(accion){accion===st.showLoading?(dom.mensaje.val(""),dom.mensaje.attr("disabled","disabled"),dom.btnSendMessage.attr("disabled","disabled"),dom.btnSendMessage.attr("loading","loading")):(dom.mensaje.removeAttr("disabled"),dom.btnSendMessage.removeAttr("disabled"),dom.btnSendMessage.removeAttr("loading"))},fnAddHTML:function(data){var html;html=st.factoryConversation(data),dom.bodyMessages.html(html),dom.bodyMessages.animate({scrollTop:dom.document.height()},0)},fnUpdateToken:function(data){dom.tokenCuestion.val(data.token)}},initialize=function(oP){$.extend(st,oP),catchDom(),afterCatchdom(),suscribeEvents()},{init:initialize}},["js/libs/jquery.device.js"]),yOSON.AppCore.addModule("mobile_view",function(Sb){var afterCatchdom,catchDom,dom,events,functions,initialize,st,suscribeEvents;return dom={},st={firstView:".body_postulant_notification_list",secondView:".body_postulant_notification_messages",header:".header_mobile"},catchDom=function(){dom.firstView=$(st.firstView),dom.secondView=$(st.secondView),dom.header=$(st.header),dom.bodyMessages=$(st.bodyMessages,dom.secondView),dom.document=$(document)},afterCatchdom=function(){functions.fnUpdateView()},suscribeEvents=function(){dom.firstView.on("click","li",events.eChangeView),dom.header.on("click",".left a",events.eDoRedirection),$(window).on("resize",events.eResetView)},events={eDoRedirection:function(e){var redirect;return redirect=!1,$(window).width()>yOSON.utils.getBreakPointMobile()?redirect=!0:dom.secondView.hasClass("hide")?redirect=!0:dom.firstView.hasClass("hide")&&(dom.firstView.removeClass("hide"),dom.secondView.addClass("hide")),redirect},eChangeView:function(e){$(window).width()<=yOSON.utils.getBreakPointMobile()&&(dom.firstView.addClass("hide"),dom.secondView.removeClass("hide"),window.scrollTo(dom.document.height(),0))},eResetView:function(e){functions.fnUpdateView()}},functions={fnUpdateView:function(){$(window).width()>yOSON.utils.getBreakPointMobile()?(dom.firstView.removeClass("hide"),dom.secondView.removeClass("hide")):dom.firstView.hasClass("hide")||dom.secondView.hasClass("hide")||dom.secondView.addClass("hide")}},initialize=function(oP){$.extend(st,oP),catchDom(),afterCatchdom(),suscribeEvents()},{init:initialize}},["js/libs/jquery.device.js"]),yOSON.AppCore.addModule("show_conversation",function(Sb){var afterCatchdom,catchDom,dom,events,functions,initialize,st,suscribeEvents,xhrAjax;return dom={},xhrAjax=null,st={companies:".body_postulant_notification_list",containerGlobal:".body_postulant_notification_messages",bodyMessages:".body_messages",btnSendMessage:"#sendMessage",txtMessage:"#mensaje",tplConversation:"#tplConversation",tokenCuestion:"#hidAuthTokenCuestion",idMensaje:"#id_mensaje",loadingError:".loading_error",loadingBox:".loading_box",companyName:".company_name",jobTitle:".job_title",notificationCounter:"#notificationCounter",url:"/notificaciones/listar-notificaciones",factoryConversation:null,startLoading:!0,finishLoading:!1,document:document},catchDom=function(){dom.companies=$(st.companies),dom.containerGlobal=$(st.containerGlobal),dom.bodyMessages=$(st.bodyMessages,dom.containerGlobal),dom.txtMessage=$(st.txtMessage,dom.containerGlobal),dom.btnSendMessage=$(st.btnSendMessage,dom.containerGlobal),dom.tokenCuestion=$(st.tokenCuestion,dom.containerGlobal),dom.idMensaje=$(st.idMensaje,dom.containerGlobal),dom.notificationCounter=$(st.notificationCounter),dom.loadingError=$(st.loadingError,dom.containerGlobal),dom.loadingBox=$(st.loadingBox,dom.containerGlobal),dom.document=$(st.document),dom.companyName=$(st.companyName,dom.containerGlobal),dom.jobTitle=$(st.jobTitle,dom.containerGlobal)},afterCatchdom=function(){functions.fnScrollToBottom(),st.factoryConversation=_.template($(st.tplConversation).html())},suscribeEvents=function(){dom.companies.on("click","li",events.eShowConversation)},events={eShowConversation:function(e){var context,idaviso,postulacion;return context=$(this),$(context).hasClass("is_selected")?!1:(null!==xhrAjax&&xhrAjax.abort(),functions.fnLoading(st.startLoading,context),functions.fnDisabledForm(),postulacion=$(this).data("postulacion"),idaviso=$(this).data("idaviso"),void(xhrAjax=$.ajax({type:"POST",url:st.url,data:{postulacion:postulacion,idaviso:idaviso}}).done(function(data){data=JSON.parse(data),"0"===data.status?(functions.fnBuilNewdBodyConversation(data),functions.fnUpdateForm(data),functions.fnUpdateListSelection(context),functions.fnMarkConversationAsRead(context)):(dom.loadingError.show(),setTimeout(function(){dom.loadingError.fadeOut(1500)},9e3))}).fail(function(error,status){"abort"!==status&&(dom.loadingError.show(),setTimeout(function(){dom.loadingError.fadeOut(1500)},9e3))}).always(function(){functions.fnEnabledForm(),functions.fnLoading(st.finishLoading,context),xhrAjax=null})))}},functions={fnUpdateListSelection:function(context){dom.companies.find("li").removeClass("is_selected"),$(context).addClass("is_selected")},fnMarkConversationAsRead:function(context){var counter;$(context).hasClass("is_read")||(counter=parseInt(dom.notificationCounter.html()),dom.notificationCounter.html(--counter),$(context).addClass("is_read"))},fnBuilNewdBodyConversation:function(data){var html;html=st.factoryConversation(data),dom.bodyMessages.html(html),functions.fnScrollToBottom()},fnScrollToBottom:function(){dom.bodyMessages.animate({scrollTop:dom.document.height()},0)},fnUpdateForm:function(data){dom.companyName.html(""+data.Company),dom.jobTitle.html(""+data.title),dom.txtMessage.val(""),dom.tokenCuestion.val(data.token),dom.idMensaje.val(data.id_mensaje)},fnLoading:function(accion,element){accion===st.startLoading?(dom.loadingBox.show(),dom.loadingError.hide(),element.addClass("is_loading")):(dom.loadingBox.hide(),element.removeClass("is_loading"))},fnEnabledForm:function(){dom.txtMessage.removeAttr("disabled"),dom.btnSendMessage.removeAttr("disabled")},fnDisabledForm:function(){dom.txtMessage.attr("disabled",""),dom.btnSendMessage.attr("disabled","")}},initialize=function(oP){$.extend(st,oP),catchDom(),afterCatchdom(),suscribeEvents()},{init:initialize}},["js/libs/jquery.device.js","js/libs/underscore/underscore-min.js"]);
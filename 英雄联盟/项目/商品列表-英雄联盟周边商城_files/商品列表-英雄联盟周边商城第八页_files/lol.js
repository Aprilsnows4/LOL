


/*
 * jQuery Impromptu
 * By: Trent Richardson [http://trentrichardson.com]
 * Version 3.1
 * Last Modified: 3/30/2010
 *
 * Copyright 2010 Trent Richardson
 * Dual licensed under the MIT and GPL licenses.
 *
 */
(function($) {
    $.prompt = function(message, options) {
        options = $.extend({},$.prompt.defaults,options);
        $.prompt.currentPrefix = options.prefix;

        var ie6		= ($.browser.msie && $.browser.version < 7);
        var $body	= $(document.body);
        var $window	= $(window);

        options.classes = $.trim(options.classes);
        if(options.classes != '')
            options.classes = ' '+ options.classes;

        //build the box and fade
        var msgbox = '<div class="'+ options.prefix +'box'+ options.classes +'" id="'+ options.prefix +'box">';
        if(options.useiframe && (($('object, applet').length > 0) || ie6)) {
            msgbox += '<iframe src="javascript:false;" style="display:block;position:absolute;z-index:-1;" class="'+ options.prefix +'fade" id="'+ options.prefix +'fade"></iframe>';
        } else {
            if(ie6) {
                $('select').css('visibility','hidden');
            }
            msgbox +='<div class="'+ options.prefix +'fade" id="'+ options.prefix +'fade"></div>';
        }
        msgbox += '<div class="'+ options.prefix +'" id="'+ options.prefix +'"><div class="'+ options.prefix +'container"><div class="';
        msgbox += options.prefix +'close">X</div><div id="'+ options.prefix +'states"></div>';
        msgbox += '</div></div></div>';

        var $jqib	= $(msgbox).appendTo($body);
        var $jqi	= $jqib.children('#'+ options.prefix);
        var $jqif	= $jqib.children('#'+ options.prefix +'fade');

        //if a string was passed, convert to a single state
        if(message.constructor == String){
            message = {
                state0: {
                    html: message,
                    buttons: options.buttons,
                    focus: options.focus,
                    submit: options.submit
                }
            };
        }

        //build the states
        var states = "";

        $.each(message,function(statename,stateobj){
            stateobj = $.extend({},$.prompt.defaults.state,stateobj);
            message[statename] = stateobj;

            states += '<div id="'+ options.prefix +'_state_'+ statename +'" class="'+ options.prefix + '_state" style="display:none;"><div class="'+ options.prefix +'banner"></div><div class="'+ options.prefix +'message">' + stateobj.html +'</div><div class="'+ options.prefix +'buttons">';
            $.each(stateobj.buttons, function(k, v){
                if(typeof v == 'object')
                    states += '<button name="' + options.prefix + '_' + statename + '_button' + v.title.replace(/[^a-z0-9]+/gi,'') + '" id="' + options.prefix + '_' + statename + '_button' + v.title.replace(/[^a-z0-9]+/gi,'') + '" value="' + v.value + '">' + v.title + '</button>';
                else states += '<button name="' + options.prefix + '_' + statename + '_button' + k + '" id="' + options.prefix +	'_' + statename + '_button' + k + '" value="' + v + '">' + k + '</button>';
            });
            states += '</div></div>';
        });

        //insert the states...
        $jqi.find('#'+ options.prefix +'states').html(states).children('.'+ options.prefix +'_state:first').css('display','block');
        $jqi.find('.'+ options.prefix +'buttons:empty').css('display','none');

        //Events
        $.each(message,function(statename,stateobj){
            var $state = $jqi.find('#'+ options.prefix +'_state_'+ statename);

            $state.children('.'+ options.prefix +'buttons').children('button').click(function(){
                var msg = $state.children('.'+ options.prefix +'message');
                var clicked = stateobj.buttons[$(this).text()];
                if(clicked == undefined){
                    for(var i in stateobj.buttons)
                        if(stateobj.buttons[i].title == $(this).text())
                            clicked = stateobj.buttons[i].value;
                }

                if(typeof clicked == 'object')
                    clicked = clicked.value;
                var forminputs = {};

                //collect all form element values from all states
                $.each($jqi.find('#'+ options.prefix +'states :input').serializeArray(),function(i,obj){
                    if (forminputs[obj.name] === undefined) {
                        forminputs[obj.name] = obj.value;
                    } else if (typeof forminputs[obj.name] == Array || typeof forminputs[obj.name] == 'object') {
                        forminputs[obj.name].push(obj.value);
                    } else {
                        forminputs[obj.name] = [forminputs[obj.name],obj.value];
                    }
                });

                var close = stateobj.submit(clicked,msg,forminputs);
                if(close === undefined || close) {
                    removePrompt(true,clicked,msg,forminputs);
                }
            });
            $state.find('.'+ options.prefix +'buttons button:eq('+ stateobj.focus +')').addClass(options.prefix +'defaultbutton');

        });

        var ie6scroll = function(){
            $jqib.css({ top: $window.scrollTop() });
        };

        var fadeClicked = function(){
            if(options.persistent){
                var i = 0;
                $jqib.addClass(options.prefix +'warning');
                var intervalid = setInterval(function(){
                    $jqib.toggleClass(options.prefix +'warning');
                    if(i++ > 1){
                        clearInterval(intervalid);
                        $jqib.removeClass(options.prefix +'warning');
                    }
                }, 100);
            }
            else {
                removePrompt();
            }
        };

        var keyPressEventHandler = function(e){
            var key = (window.event) ? event.keyCode : e.keyCode; // MSIE or Firefox?

            //escape key closes
            if(key==27) {
                fadeClicked();
            }

            //constrain tabs
            if (key == 9){
                var $inputels = $(':input:enabled:visible',$jqib);
                var fwd = !e.shiftKey && e.target == $inputels[$inputels.length-1];
                var back = e.shiftKey && e.target == $inputels[0];
                if (fwd || back) {
                    setTimeout(function(){
                        if (!$inputels)
                            return;
                        var el = $inputels[back===true ? $inputels.length-1 : 0];

                        if (el)
                            el.focus();
                    },10);
                    return false;
                }
            }
        };

        var positionPrompt = function(){
            $jqib.css({
                position: (ie6) ? "absolute" : "fixed",
                height: $window.height(),
                width: "100%",
                top: (ie6)? $window.scrollTop() : 0,
                left: 0,
                right: 0,
                bottom: 0
            });
            $jqif.css({
                position: "absolute",
                height: $window.height(),
                width: "100%",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0
            });
            $jqi.css({
                position: "absolute",
                top: options.top,
                left: "50%",
                marginLeft: (($jqi.outerWidth()/2)*-1)
            });
        };

        var stylePrompt = function(){
            $jqif.css({
                zIndex: options.zIndex,
                display: "none",
                opacity: options.opacity
            });
            $jqi.css({
                zIndex: options.zIndex+1,
                display: "none"
            });
            $jqib.css({
                zIndex: options.zIndex
            });
        };

        var removePrompt = function(callCallback, clicked, msg, formvals){
            $jqi.remove();
            //ie6, remove the scroll event
            if(ie6) {
                $body.unbind('scroll',ie6scroll);
            }
            $window.unbind('resize',positionPrompt);
            $jqif.fadeOut(options.overlayspeed,function(){
                $jqif.unbind('click',fadeClicked);
                $jqif.remove();
                if(callCallback) {
                    options.callback(clicked,msg,formvals);
                }
                $jqib.unbind('keypress',keyPressEventHandler);
                $jqib.remove();
                if(ie6 && !options.useiframe) {
                    $('select').css('visibility','visible');
                }
            });
        };

        positionPrompt();
        stylePrompt();

        //ie6, add a scroll event to fix position:fixed
        if(ie6) {
            $window.scroll(ie6scroll);
        }
        $jqif.click(fadeClicked);
        $window.resize(positionPrompt);
        $jqib.bind("keydown keypress",keyPressEventHandler);
        $jqi.find('.'+ options.prefix +'close').click(removePrompt);

        //Show it
        $jqif.fadeIn(options.overlayspeed);
        $jqi[options.show](options.promptspeed,options.loaded);
        $jqi.find('#'+ options.prefix +'states .'+ options.prefix +'_state:first .'+ options.prefix +'defaultbutton').focus();

        if(options.timeout > 0)
            setTimeout($.prompt.close,options.timeout);

        return $jqib;
    };

    $.prompt.defaults = {
        prefix:'jqi',
        classes: '',
        buttons: {
            Ok: true
        },
        loaded: function(){

        },
        submit: function(){
            return true;
        },
        callback: function(){

        },
        opacity: 0.6,
        zIndex: 999,
        overlayspeed: 'slow',
        promptspeed: 'fast',
        show: 'fadeIn',
        focus: 0,
        useiframe: false,
        top: "35%",
        persistent: true,
        timeout: 0,
        state: {
            html: '',
            buttons: {
                Ok: true
            },
            focus: 0,
            submit: function(){
                return true;
            }
        }
    };

    $.prompt.currentPrefix = $.prompt.defaults.prefix;

    $.prompt.setDefaults = function(o) {
        $.prompt.defaults = $.extend({}, $.prompt.defaults, o);
    };

    $.prompt.setStateDefaults = function(o) {
        $.prompt.defaults.state = $.extend({}, $.prompt.defaults.state, o);
    };

    $.prompt.getStateContent = function(state) {
        return $('#'+ $.prompt.currentPrefix +'_state_'+ state);
    };

    $.prompt.getCurrentState = function() {
        return $('.'+ $.prompt.currentPrefix +'_state:visible');
    };

    $.prompt.getCurrentStateName = function() {
        var stateid = $.prompt.getCurrentState().attr('id');

        return stateid.replace($.prompt.currentPrefix +'_state_','');
    };

    $.prompt.goToState = function(state, callback) {
        $('.'+ $.prompt.currentPrefix +'_state').slideUp('slow');
        $('#'+ $.prompt.currentPrefix +'_state_'+ state).slideDown('slow',function(){
            $(this).find('.'+ $.prompt.currentPrefix +'defaultbutton').focus();
            if (typeof callback == 'function')
                callback();
        });
    };

    $.prompt.nextState = function(callback) {
        var $next = $('.'+ $.prompt.currentPrefix +'_state:visible').next();

        $('.'+ $.prompt.currentPrefix +'_state').slideUp('slow');

        $next.slideDown('slow',function(){
            $next.find('.'+ $.prompt.currentPrefix +'defaultbutton').focus();
            if (typeof callback == 'function')
                callback();
        });
    };

    $.prompt.prevState = function(callback) {
        var $next = $('.'+ $.prompt.currentPrefix +'_state:visible').prev();

        $('.'+ $.prompt.currentPrefix +'_state').slideUp('slow');

        $next.slideDown('slow',function(){
            $next.find('.'+ $.prompt.currentPrefix +'defaultbutton').focus();
            if (typeof callback == 'function')
                callback();
        });
    };

    $.prompt.close = function() {
        $('#'+ $.prompt.currentPrefix +'box').fadeOut('fast',function(){
            $(this).remove();
        });
    };

    $.fn.prompt = function(options){
        if(options == undefined)
            options = {};
        if(options.withDataAndEvents == undefined)
            options.withDataAndEvents = false;

        $.prompt($(this).clone(options.withDataAndEvents).html(),options);
    }

})(jQuery);

function warning(content,callback){
    if(content!=null && content!=undefined && content!=''){
        if($.prompt){
            $.prompt(content,{submit:callback});
        }else{
            alert(content);
        }

    }
}


var Util = {version:"1.0", show:function (elementId) {
    document.getElementById(elementId).style.display = "block";
}, hidden:function (elementId) {
    document.getElementById(elementId).style.display = "none";
}, openWindow:function (url, width, height) {
    // new Date().getTime().toString()
    var newWindow = window.open(url, "", "scrollbars=yes,resizable=yes,titlebar=yes,toolbar=no,menubar=no,status=no,location=no,top=0,left=0,left=" + ((screen.availWidth) / 2 - (width / 2)) + ",top=" + ((screen.availHeight) / 2 - (height / 2)) + ",width=" + width + ",height=" + height);
    newWindow.focus();
}};

function drawImage(ImgD) {
    var image = new Image();
    image.src = ImgD.src;
    var width = ImgD.width;
    var height = ImgD.height;
    if (image.width > 0 && image.height > 0) {
        if (image.width / image.height >= width / height) {
            if (image.width > width) {
                ImgD.width = width;
                ImgD.height = (image.height * width) / image.width;
            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
        } else {
            if (image.height > height) {
                ImgD.height = height;
                ImgD.width = (image.width * height) / image.height;
            } else {
                ImgD.width = image.width;
                ImgD.height = image.height;
            }
        }
    }
}

function imgCenter(_event){
    var tagdiv=_event.parentNode;
    if (tagdiv.nodeName=="A"){
        tagdiv=tagdiv.parentNode;
    }
    divh=parseInt(tagdiv.style.height);
    //alert(divh);
    imgh=_event.height;
    imgmtop=(divh-imgh)/2;
    _event.style.display='block';
    _event.style.margin=imgmtop+'px auto';
}

//全选
function checkedAllBox(name) {
    var el = document.getElementsByTagName("input");
    var len = el.length;
    for (var i = 0; i < len; i++) {
        if ((el[i].type == "checkbox") && (el[i].name == name)) {
            el[i].checked = true;
        }
    }
}

//至少选择一个
function checkedLestOne(name) {
    var el = document.getElementsByTagName("input");
    var len = el.length;
    for (var i = 0; i < len; i++) {
        if ((el[i].type == "checkbox") && (el[i].name == name)) {
            if(el[i].checked == true)
                return true;
        }
    }
    return false;
}

//全不选
function unCheckedAllBox(name) {
    var el = document.getElementsByTagName("input");
    var len = el.length;
    for (var i = 0; i < len; i++) {
        if ((el[i].type == "checkbox") && (el[i].name == name)) {
            el[i].checked = false;
        }
    }
}

//反选
function switchCheckedBox(name) {
    var el = document.getElementsByTagName("input");
    var len = el.length;
    for (var i = 0; i < len; i++) {
        if ((el[i].type == "checkbox") && (el[i].name == name)) {
            el[i].checked = !el[i].checked;
        }
    }
}

function checkedNum(name) {
    var el = document.getElementsByTagName("input");
    var len = el.length;
    var num=0;
    for (var i = 0; i < len; i++) {
        if ((el[i].type == "checkbox") && (el[i].name == name)) {
            if(el[i].checked == true)
                num++;
        }
    }
    return num;
}

//删除字符串前后多余的空格
String.prototype.Trim = function (m){
    return this.replace(m ? /^\s*|\s*$/mg : /^\s*|\s*$/g, "");
}

//判断整数
function isInteger(val) {
    for (var i=0; i < val.length; i++) {
        if (!isDigit(val.charAt(i))) { return false; }
    }
    return true;
}
//判断数字
function isDigit(num) {
    var string="1234567890";
    if (string.indexOf(num) != -1) {
        return true;
    }
    return false;
}

// 获取radio的值
function getRadioValue(name){
    var Obj=document.getElementsByName(name);
    for(var i=0;i<Obj.length;i++){
        if(Obj[i].checked){
            return Obj[i].value;
        }
    }
}
// 获取页面参数
function request(paras){
    var url = location.href;
    var paraString = url.substring(url.indexOf("?")+1,url.length).split("&");
    var paraObj = {}
    for (i=0; j=paraString[i]; i++){
        paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);
    }
    var returnValue = paraObj[paras.toLowerCase()];
    if(typeof(returnValue)=="undefined"){
        return "";
    }else{
        return returnValue;
    }
}


//根据name获取cookie
function getCookie(name){
    var arr = document.cookie.split("; ");
    for(var i=0,len=arr.length;i<len;i++){
        var item = arr[i].split("=");
        if(item[0]==name){
            return item[1];
        }
    }
    return "";
}

//替换< > &lt;  &gt;
String.prototype.replaceAll  = function(s1,s2){
    return this.replace(new RegExp(s1,"gm"),s2);
}
String.prototype.removeXSS = function(){
    return this.replaceAll(">", "").replaceAll("<", "").replaceAll("&gt;", "").replaceAll("&lt", "")
}




$(document).ready(function(){
		
		
	$(".sosoinp").attr("maxlength","20");
		

	$('.buyjia_bot').click(function(){
		$('.jiatit').fadeIn(200);
	});

	
	$('.tip_weixin_close').click(function(){
		$('.tip_weixin').hide();
	});
	
	
	//搜索按钮
	$(".navlistbar dl").each(function(){
		$('.navlist dt').toggle(function(){	
			$(this).siblings().slideUp();
			$(this).addClass("navhover")
			}
		,function(){
				$(this).siblings().slideDown();
				$(this).removeClass("navhover");
		});
	});
	
	
	
	
	
	//$(".keai li").each(function(){
//	$(this).toggle(
//		function(){
//			$(this).addClass("bfen")
//			},
//		function(){
//			$(this).removeClass("bfen")
//			}
//		);
//		});
	
	
	//搜索按钮
	$('.sosobot').hover(function(){	
		$(this).addClass("sosobothover");
		}
	,function(){
			$(this).removeClass('sosobothover');
	});
	
	//子英雄
	$('.navlist dd.yingx').hover(function(){	
		$(this).children('.yxnav').show();
		$(this).children('a').addClass("clickcur");
		}
	,function(){
		    $(this).children('.yxnav').hide();
			$(this).children('a').removeClass('clickcur');
	});
	
	
	
	//列表页
	 $(".neishop li").hover(function() {
			$(this).addClass("hover");
            }, function() {
				$(this).removeClass('hover');
            });
	
	//下拉选项变色		
	$('.tiaoj').hover(function(){	
		$(this).children('.tiaolist').show();
		$(this).addClass('tiaojhover');
		}
	,function(){
		$(this).children('.tiaolist').hide();
		$(this).removeClass('tiaojhover');
	});	
	
	//晒单		
	$('.sd_ding').hover(function(){
		$('.sd_ding').addClass('.sd_dinghover');
		}
	,function(){
		$('.sd_ding').removeClass('.sd_dinghover');
	});	
	
	
	//下拉选项
	$('.tiaolist li').hover(function(){	
		 $(this).addClass('tiaohover').siblings().removeClass('tiaohover')	
		 
	});
	$('.tiaolist li').click(function(){	
			var tit = $(this).attr('title');//获取属性title值
			
			var name = $(this).text();//获取文本
			$('.tiaoj span').text(name);
			$('#sortinp').val(tit);
			$('.tiaolist').hide();
			$(this).addClass('hide').siblings().removeClass('hide');
			
	});
	
	
	
	
	//正反排序
	$(".paix").each(function(){
		$(this).toggle(
		function(){
			$(this).addClass("paix_desc")
			},
		function(){
			$(this).removeClass("paix_desc")
			}
		);
		});
	
	
	//打开关闭尺码层
	$(".chim_biao").click(function(){
        $(".cimabiaobar").fadeIn(300);
    });
	$(".barclose").click(function(){
        $(".cimabiaobar").hide();
    });
	
	
	//订单弹出层
	$(".buy_bot").click(function(){
        $(".buy_ddbar").fadeIn(300);
    });
	
	//详情导航	
	 
	$(".shownav li").first().addClass("hedhover"); 
    $(".shownav li").click(function(){
        $(this).addClass("hedhover").siblings().removeClass("hedhover");
		
    });
	
	$(".shownav li.shownav1").click(function(){
		$(".shownavbar1").show();
		$(".shownavbar2").show();
		$(".shownavbar2").children('.hed_bj').show();
		$(".shownavbar3").hide();
		$(".shownavbar4").hide();
		
	 });
	 
	 $(".shownav li.shownav2").click(function(){
		$(".shownavbar1").hide();
		$(".shownavbar2").show();
		$(".shownavbar2").children('.hed_bj').hide();
		$(".shownavbar3").hide();
		$(".shownavbar4").hide();
		
	 });
	 
	  
	 
	 
	 
	 $(".shownav li.shownav3").click(function(){
		$(".shownavbar1").hide();
		$(".shownavbar2").hide();
		$(".shownavbar3").show();
		$(".shownavbar3").children('.hed_bj').hide();
		$(".shownavbar4").hide();
		
	 });
	 
	  $(".shownav li.shownav4").click(function(){
		$(".shownavbar1").hide();
		$(".shownavbar2").hide();
		$(".shownavbar3").hide();
		$(".shownavbar4").show();
		$(".shownavbar4").children('.hed_bj').hide();
		
	 });
	 
	 $(".yhq_btn").click(function(){
        $(".yhq_tip").fadeIn(300);
    });
	
	
	//星星变化
	$('.xingxing li').hover(function(){	
			$rating = $(this).text();
			$(this).parent().css('background-position', ratpos($rating));
			$(this).parent().siblings("div.xingtext").text(ratetext($rating));
			$(this).parent().siblings("div.xingtext").css('color', '#ed302a');
			//$('.xingtext').css('font-weight', 'normal');
			}
	,function(){
		if($(this).parent().siblings("input").val()==0){
			$(this).parent().siblings("div.xingtext").css('color', '#ed302a');
			$(this).parent().siblings("div.xingtext").text("请评分-点击即可评分");
			$(this).parent().css('background-position',"-116px -48px");
			  }else{
				  $(this).parent().css('background-position', ratpos($(this).parent().siblings("input").val()));
				  $(this).parent().siblings("div.xingtext").text($(this).parent().siblings("input").val()+"分");
			  }
			//$('.xingtext').css('font-weight', 'bolder');   
	});	
	//click
	$('.xingxing li').click(function(){
		$rating = $(this).text();
		$score = $(this).parent().siblings("input").attr("count");
		$(this).parent().css('background-position', ratpos($rating));
		if($rating>=$score){
		 $(this).parent().siblings("input").val($rating);//给input传值	
		}else{
			$(this).parent().parent().find("div").show();
		}
		
		$(this).parent().siblings("div.xingtext").text(ratetext($rating));
		$(this).parent().siblings("div.xingtext").css('color', '#ed302a');
		$(this).parent().siblings("div.xingtext").css('font-weight', 'bolder');

	});
	// 星星变化
	function ratpos($rating){	
		$rating = parseFloat($rating);
		switch ($rating){
			case 5: $position = "-6px -48px"; break;
			case 4: $position = "-28px -48px"; break;
			case 3: $position = "-50px -48px"; break;
			case 2: $position = "-72px -48px"; break;
			case 1: $position = "-94px -48px"; break;
			default:  $position =  "-116px -48px";
		}
		return $position;
	}
	
	
	$(".barclose").click(function(){
			$(".cimabiaobar").hide();
		});
	
	//文字变化
	function ratetext($rating){
		$rating = parseFloat($rating);
		switch ($rating){
			case 1: $text = "1分 愤怒"; break;
			case 2: $text = "2分 难受"; break;
			case 3: $text = "3分 一般"; break;
			case 4: $text = "4分 不错"; break;
			case 5: $text = "5分 惊喜"; break;
			default: $text ="5分";
		}
		return $text;
	}
	
	
	
});

function chima(val)
	{
		$(".cimabiaobar").fadeIn(300);
	}

//锚跳转,dix 偏移值，处理fixed的情况
function toMao(val, dix)
	{
		var myY = $("#"+val).offset().top;
        dix  = typeof dix == 'number' ? dix : 0;
        myY -= dix;
		$("html,body").stop().animate({ scrollTop:myY},500);
	}
	
function shownav(val)
	{
		var myY = $("#"+val).offset().top;
		$("html,body").stop().animate({ scrollTop:myY},0);
	}	






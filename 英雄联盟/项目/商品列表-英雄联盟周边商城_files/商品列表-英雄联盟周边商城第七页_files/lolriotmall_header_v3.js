/**
 * lolriotmall头部js
 * 在需要引入的html中引入该js
 * 需jquery和milo支持 在该js前后引入均可
 * localhost需为lolriotmall.qq.com
 * html主体部分需要留出120px的padding-top/margin-top来放置lolriotmall头部
 * @example
 * <script type="text/javascript" src="//js01.daoju.qq.com/zb/lolriotmall/pc/js/lolriotmall_header_v3.js" charset='utf-8'></script>
 * <script type="text/javascript" src="//js01.daoju.qq.com/zb/lolriotmall/pc/js/jquery1.8-min.js"></script>
 * <script type="text/javascript" src="//js02.daoju.qq.com/zb/lolriotmall/pc/js/milo.js"></script>
 * 
 */
// 日志组件加载
(function () {
    var dj_report_script = document.createElement('script');
    dj_report_script.src = '//game.gtimg.cn/images/js/milo/daoju/hx/report.js';
    dj_report_script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(dj_report_script);
  })();
  
  document.write('<style type="text/css">'+
  'body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td, button {'+
  '	padding: 0px;'+
  '	margin: 0px;'+
  '}'+
  'fieldset, img, button {'+
  '	border: 0px;'+
  '}'+
  '.lor_topbar img {'+
  '	background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/logo.gif) center center #fff no-repeat;'+
  '}'+
  '.lor_topbar ul {'+
  '	list-style-image: none;'+
  '	list-style-position: outside;'+
  '	list-style-type: none;'+
  '}'+
  '* {'+
  '	margin: 0;'+
  '	padding: 0;'+
  '}'+
  '.lor_topbar .clearfloat {'+
  '	clear: both;'+
  '	height: 0px;'+
  '	font-size: 0px;'+
  '	line-height: 0px;'+
  '	overflow: hidden;'+
  '}'+
  '.lor_topbar .clearf {'+
  '	zoom: 1;'+
  '	overflow: auto;'+
  '}'+
  '.lor_topbar .clear {'+
  '	clear: both;'+
  '}'+
  '.lor_topbar .clearfix:after {'+
  '	content: ".";'+
  '	display: block;'+
  '	height: 0;'+
  '	visibility: hidden;'+
  '	clear: both;'+
  '}'+
  '.lor_topbar .clearfix {'+
  '	*zoom: 1;'+
  '}'+
  '.chromeframe {'+
  '	position: fixed;'+
  '	top: 0;'+
  '	left: 0;'+
  '	z-index: 10000;'+
  '	background: #ffc225;'+
  '	color: #000;'+
  '	padding: 10px 0;'+
  '	text-align: center;'+
  '	width: 100%;'+
  '	border-bottom: 1px solid #000;'+
  '}'+
  '.chromeframe a {'+
  '	color: #F13C35;'+
  '}/*链接文字*/.lor_topbar a {'+
  '	text-decoration: none;'+
  '	cursor: pointer;'+
  '	color: #000;'+
  '}'+
  '.lor_topbar a:link, .lor_topbar a:visited {'+
  '	cursor: pointer;'+
  '}'+
  '.lor_topbar a:hover, .lor_topbar a:active {'+
  '	text-decoration: underline;'+
  ' /*font-family: Arial, Helvetica, sans-serif,"宋体";*/'+
  '}/*谷歌下字体小于12号*/.ggFf {'+
  '	-webkit-text-size-adjust: none;'+
  '}'+
  '.song {'+
  '	font-family: "宋体";'+
  '}'+
  '.yahei {'+
  '	font-family: "微软雅黑","宋体";'+
  '}/*定位*/.lor_wfull {'+
  '	min-width: 1280px;'+
  '	width: 100%;'+
  '	margin: 0 auto;'+
  '	height: auto;'+
  '}'+
  '.lor_topbar .m_auto {'+
  '	margin-left: auto;'+
  '	margin-right: auto;'+
  '}'+
  '.lor_topbar .fl {'+
  '	float: left;'+
  '	display: inline;'+
  '}'+
  '.lor_topbar .fr {'+
  '	float: right;'+
  '	display: inline;'+
  '}'+
  '.lor_topbar .cb {'+
  '	clear: both;'+
  '	height: 0px;'+
  '	font-size: 0px;'+
  '	line-height: 0px;'+
  '}'+
  '.lor_topbar .cl {'+
  '	clear: left;'+
  '}'+
  '.lor_topbar .cr {'+
  '	clear: right;'+
  '}'+
  '.lor_topbar .pl {'+
  '	text-indent: 8px;'+
  '}'+
  '.lor_topbar .clearfix {'+
  '	zoom: 1'+
  '}'+
  '.lor_topbar .clearfix:after {'+
  '	content: ".";'+
  '	display: block;'+
  '	height: 0;'+
  '	clear: both;'+
  '	visibility: hidden'+
  '}'+
  '.lor_topbar .ul li {'+
  '	float: left;'+
  '}'+
  '.lor_topbar .db {'+
  '	display: block;'+
  '}'+
  '.lor_topbar .dib {'+
  '	display: inline-block;'+
  '}'+
  '* html .clearfix {'+
  '	zoom: 1;'+
  '} /* IE6 */*:first-child+html .clearfix {'+
  '	zoom: 1;'+
  '} /* IE7 */.lor_topbar .vm {'+
  '	vertical-align: middle;'+
  '}'+
  '.lor_topbar .pr {'+
  '	position: relative;'+
  '}'+
  '.lor_topbar .pa {'+
  '	position: absolute;'+
  '}'+
  '.lor_topbar .zoom {'+
  '	zoom: 1'+
  '}'+
  '.lor_topbar .hidden {'+
  '	visibility: hidden;'+
  '}'+
  '.lor_topbar .none {'+
  '	display: none;'+
  '}'+
  '.lor_topbar .hide {'+
  '	display: none;'+
  '}'+
  '.lor_topbar .ovh {'+
  '	overflow: hidden;'+
  '}'+
  '.lor_top_mem .ico-menu {'+
  '	background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/ico-menu.png) no-repeat;'+
  '}'+
  '.lor_sosobar .ico-menu {'+
  '	background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/ico-menu.png) no-repeat;'+
  '}'+
  '.lor_topbar {'+
  '	height: 120px;'+
  '	position: fixed;'+
  '	top: 0;'+
  '	left: 0;'+
  '	z-index: 9999;'+
  '	overflow: hidden;'+
  '	zoom: 1;'+
  '}'+
  '.lor_top a.topriot {'+
  '	display: block;'+
  '	width: 46px;'+
  '	height: 36px;'+
  '	margin-right: 12px;'+
  '	margin-top: 6px;'+
  '	background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/base/base.png) -9px -9px no-repeat;'+
  '	cursor: default;'+
  '}'+
  '.lor_top a.topgame {'+
  '	display: block;'+
  '	width: 160px;'+
  '	height: 36px;'+
  '	margin-top: 6px;'+
  '	background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/base/base.png) -65px -9px no-repeat;'+
  '}'+
  '.lor_top {'+
  '	position: fixed;'+
  '	top: 0;'+
  '	left: 0;'+
  '	z-index: 1;'+
  '	min-width: 1240px;'+
  '	width: 100%;'+
  '	height: 75px;'+
  '	overflow: 9999;'+
  '	background: #090909;'+
  '}/*-信息条-*/.lor_topbar .top_meml {'+
  '	height: 38px;'+
  '	width: 23px;'+
  '}'+
  '.lor_topbar .top_memr {'+
  '	height: 38px;'+
  '	width: 4px;'+
  '	background: #f0f0f0;'+
  '	display: none;'+
  '}'+
  '.lor_top_mem {'+
  '	margin: 22px 25px 0 0;'+
  '	height: 38px;'+
  '	line-height: 30px;'+
  '	color: #a1a1a1;'+
  '	position: relative;'+
  '	font-size: 14px;'+
  '	z-index: 1;'+
  '}'+
  '.lor_top_mem a {'+
  '	color: #a1a1a1;'+
  '	float: left;'+
  '	padding-right: 20px;'+
  '	display: block;'+
  '	position: relative;'+
  '	z-index: 2;'+
  '}'+
  '.lor_top_mem .login-user {'+
  '	padding-right: 34px;'+
  '	height: auto;'+
  '	position: relative;'+
  '	cursor: pointer;'+
  '}'+
  '.lor_top_mem .menu-ser,.lor_top_mem .lolweixin {'+
  '	padding-right: 28px;'+
  '	height: auto;'+
  '	position: relative;'+
  '	cursor: pointer;'+
  '}'+
  '.lor_top_mem span {'+
  '	display: block;'+
  '	float: left;'+
  '	padding-right: 6px;'+
  '}'+
  '.lor_top_mem a.tophelp {'+
  '	display: block;'+
  '	width: 60px;'+
  '	height: 22px;'+
  '	line-height: 22px;'+
  '	margin-top: 8px;'+
  '	text-indent: 12px;'+
  '/* background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/base/base.png) -180px -99px no-repeat #000;*/'+
  '	background: #000;'+
  '	color: #fff;'+
  '}'+
  '.lor_top_mem a.tophelp:hover {'+
  '	text-decoration: none;'+
  '	background: #1c1c1c;'+
  ' /*background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/base/base.png) -180px -99px no-repeat #1c1c1c;*/'+
  '}'+
  '.lor_top_mem a.weibo {'+
  '/*background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/base/base.png) -192px -71px no-repeat;*/'+
  '	width: 50px;'+
  '}'+
  '.lor_top_mem a.qqlogin .mqq {'+
  '	margin: 4px 4px 0 0;'+
  '	display: block;'+
  '	width: 22px;'+
  '	height: 22px;'+
  '	background-position: -2px -311px;'+
  '}'+
  '.lor_top_mem a.menu-cart .mcart {'+
  '	margin: 3px 4px 0 0;'+
  '	display: block;'+
  '	width: 28px;'+
  '	height: 25px;'+
  '	background-position: -2px -13px;'+
  '}'+
  '.lor_top_mem a.menu-cart .mpoint {'+
  '	margin: 7px 0 0 0;'+
  '	display: block;'+
  '	width: 20px;'+
  '	height: 20px;'+
  '	line-height: 20px;'+
  '	background-position: -2px -287px;'+
  '	text-align: center;'+
  '	font-size: 14px;'+
  '	color: #fff;'+
  '}'+
  '.lor_top_mem .menu-ser .mser {'+
  '	margin: 3px 4px 0 0;'+
  '	display: block;'+
  '	width: 24px;'+
  '	height: 26px;'+
  '	background-position: -2px -383px;'+
  '}'+
  '.lor_top_mem .lolweixin .mwxin {'+
  '	margin: 5px 4px 0 0;'+
  '	display: block;'+
  '	width: 20px;'+
  '	height: 20px;'+
  '	background-position: -2px -42px;'+
  '}'+
  '.top_qqtip {'+
  '	width: 160px;'+
  '	height: 38px;'+
  '	line-height: 38px;'+
  '	background: #00bb99;'+
  '	position: absolute;'+
  '	left: -32px;'+
  '	top: -3px;'+
  '	color: #FFF;'+
  '	text-align: center;'+
  '	display: none;'+
  '}'+
  '.lor_top_mem .login-bar .marrl {'+
  '	position: absolute;'+
  '	top: 12px;'+
  '	right: 25px;'+
  '	z-index: 1;'+
  '	display: block;'+
  '	width: 6px;'+
  '	height: 6px;'+
  '	background-position: -32px 0;'+
  '}'+
  '.logined-box {'+
  '	width: auto;'+
  '	height: 30px;'+
  '	position: relative;'+
  '	z-index: 2;'+
  '}'+
  '.lor_top_mem .login-bar a:hover .marrl, .lor_top_mem .login-bar .login-user:hover .marrl, .lor_top_mem .login-bar .menu-ser:hover .marrl, .lor_top_mem .login-bar .lolweixin:hover .marrl {'+
  '	background-position: -24px 0;'+
  '}'+
  '.lor_top_mem .menu-downbox {'+
  '	position: absolute;'+
  '	top: 53px;'+
  '	left: -30px;'+
  '	z-index: 100;'+
  '	width: 99px;'+
  '	height: 101px;'+
  '	overflow: hidden;'+
  '	display: none;'+
  '}'+
  '.lor_top_mem .menu-downbox .downbox-bg {'+
  '	width: 99px;'+
  '	height: 100%;'+
  '	background: #000;'+
  '	opacity: 0.65;'+
  '	filter: alpha(opacity=65)'+
  '}'+
  '.lor_top_mem .menu-downbox .menu-downlist {'+
  '	width: 99px;'+
  '	height: 100%;'+
  '	position: absolute;'+
  '	top: 0;'+
  '	left: 0;'+
  '	z-index: 101;'+
  '}'+
  '.lor_top_mem .menu-downbox .menu-downlist li {'+
  '	width: 99px;'+
  '	height: 32px;'+
  '	line-height: 32px;'+
  '	text-align: center;'+
  '	float: left;'+
  '	border-top: 1px solid #666;'+
  '}'+
  '.lor_top_mem .menu-downbox .menu-downlist li.first {'+
  '	border-color: #f94915;'+
  '}'+
  '.lor_top_mem .menu-downbox .menu-downlist li a {'+
  '	display: block;'+
  '	width: 99px;'+
  '	height: 32px;'+
  '	line-height: 32px;'+
  '	color: #a1a1a1;'+
  '}'+
  '.lor_top_mem .menu-downbox .menu-downlist li a:hover {'+
  '	text-decoration: none;'+
  '	color: #fff;'+
  '}'+
  '.lor_top_mem .menu-ser .menu-downbox {'+
  '	height: 69px;'+
  '	left: -20px;'+
  '}'+
  '.lor_top_mem .login-user:hover {'+
  '	height: 150px;'+
  '}'+
  '.lor_top_mem .menu-ser:hover {'+
  '	height: 100px;'+
  '}'+
  '.lor_top_mem .lolweixin:hover {'+
  '	height: 165px;'+
  '}'+
  '.lor_top_mem .login-user:hover .menu-downbox, .lor_top_mem .menu-ser:hover .menu-downbox {'+
  '	display: block;'+
  '}'+
  '.lor_topbar .mwx-code {'+
  '	width: 90px;'+
  '	height: 110px;'+
  '	position: absolute;'+
  '	top: 53px;'+
  '	left: 0;'+
  '	z-index: 999;'+
  '	border-top: 1px solid #f94915;'+
  '	display: none;'+
  '}'+
  '.lor_topbar .mwx-code .mwx-codebg {'+
  '	width: 90px;'+
  '	height: 110px;'+
  '	background: #000;'+
  '	opacity: 0.65;'+
  '	filter: alpha(opacity=65)'+
  '}'+
  '.lor_topbar .mwx-code .mwx-codeimg {'+
  '	position: absolute;'+
  '	top: 4px;'+
  '	left: 4px;'+
  '	width: 82px;'+
  '	height: 82px;'+
  '	overflow: hidden;'+
  '	text-indent: 0;'+
  '}'+
  '.lor_topbar .mwx-code .mwx-codeimg img {'+
  '	margin: 0 auto;'+
  '	width: 82px;'+
  '	height: 82px;'+
  '}'+
  '.lor_topbar .mwx-code .mwx-txt {'+
  '	position: absolute;'+
  '	bottom: 5px;'+
  '	left: 0;'+
  '	width: 100%;'+
  '	line-height: 14px;'+
  '	text-align: center;'+
  '	font-size: 14px;'+
  '	color: #e7e7e7;'+
  '}'+
  '.lor_top_mem .lolweixin:hover .mwx-code {'+
  '	display: block;'+
  '}/*-搜索栏-*/.lor_sosobar {'+
  '	margin: 8px 34px 0 0;'+
  '	height: 30px;'+
  '	position: relative;'+
  '}'+
  '.lor_sosobar .soso {'+
  '	width: 285px;'+
  '	height: 38px;'+
  '	overflow: hidden;'+
  '	position: relative;'+
  '}'+
  '.lor_sosobar .sosoinp {'+
  '	position: absolute;'+
  '	left: 0;'+
  '	top: 0;'+
  '	z-index: 10;'+
  '	padding: 2px 6px 2px 6px;'+
  '	border: 1px solid #777;'+
  '	border-right: 0px;'+
  '	font-size: 14px;'+
  '	width: 226px;'+
  '	height: 24px;'+
  '	line-height: 32px;'+
  '	color: #fff;'+
  '	background: none;'+
  '	vertical-align: middle;'+
  '}'+
  '.lor_sosobar .sosoinp:focus {'+
  '	outline: none'+
  '}'+
  '.lor_sosobar .soso input.click {'+
  '	color: #000;'+
  '	border: 2px solid #d9d9d9;'+
  '	border-right: 0px;'+
  '	vertical-align: middle;'+
  '}'+
  '.lor_sosobar .sosobot {'+
  '	position: absolute;'+
  '	right: 0;'+
  '	top: 0;'+
  '	width: 45px;'+
  '	height: 30px;'+
  '	cursor: pointer;'+
  '	background: #fa4f17;'+
  '	padding: 0px;'+
  '	border: 0px;'+
  '}'+
  '.lor_sosobar .sosobot .mseach {'+
  '	margin: 5px 0 0 12px;'+
  '	display: block;'+
  '	width: 21px;'+
  '	height: 21px;'+
  '	background-position: -2px -358px;'+
  '}'+
  '.lor_sosobar .sosobot:hover {'+
  '	background: #e53b04;'+
  '}'+
  '.lor_sosobar .sosobothover {'+
  '	background-position: -61px -49px;'+
  '}'+
  '.lor_sosobar .soso .keyword-list {'+
  '	position: absolute;'+
  '	left: 0;'+
  '	top: 8px;'+
  '	z-index: 20;'+
  '}'+
  '.lor_sosobar .soso .keyword-list a {'+
  '	padding: 0 6px;'+
  '	height: 14px;'+
  '	line-height: 14px;'+
  '	cursor: pointer;'+
  '	font-size: 14px;'+
  '	color: #979797;'+
  '}/*-导航栏-*/.lor_menubar {'+
  '	position: fixed;'+
  '	top: 75px;'+
  '	left: 0;'+
  '	z-index: -1;'+
  '	margin: 0 auto;'+
  '	min-width: 1240px;'+
  '	width: 100%;'+
  '	height: 45px;'+
  '	background: #202020;'+
  '}'+
  '.lor_logobar {'+
  '	margin: 19px 0 0 50px;'+
  '	width: 297px;'+
  '	height: 39px;'+
  '	position: relative;'+
  '}'+
  '.lor_logobar a.logo {'+
  '	display: block;'+
  '	width: 297px;'+
  '	height: 39px;'+
  '	z-index: 1;'+
  '	background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/ico-menu.png) no-repeat;'+
  '	background-position: -2px -147px;'+
  '}'+
  '.lor_noticebar {'+
  '	margin: 25px 0 0 6px;'+
  '	min-width: 330px;'+
  '	width: auto;'+
  '	width: 330px//9;'+
  '	*width: 330px;'+
  '	max-width: 440px;'+
  '	height: 28px;'+
  '	line-height: 28px;'+
  '	font-size: 14px;'+
  '	color: #ffc000;'+
  '	background: #363636;'+
  '	overflow: hidden;'+
  '	white-space: nowrap;'+
  '}'+
  '.lor_noticebar div {'+
  '	display: inline;'+
  '}'+
  '@media only screen and (max-width:1500px) {'+
  '	.lor_noticebar {'+
  '		width: 330px;'+
  '	}'+
  '}'+
  '.lor_topbar .sosobar a.sologo {'+
  '	position: absolute;'+
  '	width: 395px;'+
  '	height: 76px;'+
  '	z-index: 1;'+
  '	top: 12px;'+
  '	left: 0px;'+
  '	background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/base/logo_1219.png) no-repeat;'+
  '}'+
  '.lor_topbar .menu_zhong {'+
  '	margin: 0 20px;'+
  '	line-height: 45px;'+
  '	height: 45px;'+
  '	color: #fff;'+
  '	font-size: 14px;'+
  '}'+
  '.lor_topbar .menu_zhong .menu_zhongli {'+
  '	float: left;'+
  '	padding: 0;'+
  '	position: relative;'+
  '	width: 122px;'+
  '	text-align: center;'+
  '}'+
  '.lor_topbar .menu_zhong .menu_zhongli a {'+
  '	display: block;'+
  '	width: 100%;'+
  '	height: 45px;'+
  '	padding: 0;'+
  '	color: #fff;'+
  '	font-size: 18px;'+
  '}'+
  '.lor_topbar .menu_zhong .menu_zhongli a:hover {'+
  '	text-decoration: none;'+
  '	color: #f94915;'+
  '	font-weight: bold;'+
  '}'+
  '.lor_topbar .menu_zhong .menu_zhongli a.click {'+
  '	text-decoration: none;'+
  '	color: #f94915;'+
  '	font-weight: bold;'+
  '}'+
  '.lor_topbar .menu_zhong .menu_zhongli .menu-ico {'+
  '	position: absolute;'+
  '	top: 16px;'+
  '	right: 5px;'+
  '	z-index: 2;'+
  '	width: 14px;'+
  '	height: 14px;'+
  '	display: block;'+
  '}'+
  '.lor_topbar .menu_zhong .menu_zhongli .ico-hot {'+
  '	background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/h.png) no-repeat;'+
  '}'+
  '.lor_topbar .menu_zhong .menu_zhongli .ico-new {'+
  '	background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/n.png) no-repeat;'+
  '}'+
  '.lor_topbar ul.menu_zhong li a#nav_sai {'+
  '/*display:none;*/'+
  '}'+
  '.lor_topbar ul.menu_zhong li a#nav_morong {'+
  '/*display:none;*/'+
  '}'+
  '.lor_topbar ul.menu_zhong li a#nav_morong sup {'+
  '	display: none;'+
  '}'+
  '.lor_topbar ul.menu_zhong li a#nav_shouban {'+
  '/*display:none;*/'+
  '}'+
  '.lor_topbar .menu_zhong .submenu {'+
  '	position: absolute;'+
  '	top: 45px;'+
  '	left: -23px;'+
  '	z-index: 100;'+
  '	width: 188px;'+
  '	min-height: 120px;'+
  '	height: auto;'+
  '	background: #181a20;'+
  '	border-top: 3px solid #f94915;'+
  '	overflow: hidden;'+
  '	display: none;'+
  '}'+
  '.lor_topbar .menu_zhongli:hover .submenu {'+
  '	display: block;'+
  '}'+
  '.lor_topbar .menu_zhong .submenu .submenu-list {'+
  '	padding: 12px 0 10px 15px;'+
  '	width: 85px;'+
  '	height: auto;'+
  '	overflow: hidden;'+
  '}'+
  '.lor_topbar .menu_zhong .submenu .submenu-list li {'+
  '	padding: 0;'+
  '	width: 100%;'+
  '	height: 24px;'+
  '	line-height: 24px;'+
  '	text-align: left;'+
  '}'+
  '.lor_topbar .menu_zhong .submenu .submenu-list li a {'+
  '	width: 100%;'+
  '	height: 24px;'+
  '	line-height: 24px;'+
  '	padding: 0;'+
  '	font-size: 14px;'+
  '	color: #fff;'+
  '}'+
  '.lor_topbar .menu_zhong .submenu .submenu-list li a:hover {'+
  '	color: #f94915;'+
  '	font-weight: normal;'+
  '}'+
  '.lor_topbar .menu_zhong .submenu .subm-img {'+
  '	position: absolute;'+
  '	top: 50%;'+
  '	right: 16px;'+
  '	margin-top: -40.5px;'+
  '	width: 81px;'+
  '	height: 81px;'+
  '	overflow: hidden;'+
  '	display: block;'+
  '}'+
  '.lor_topbar .menu_zhong .submenu .subm-img img {'+
  '	width: 81px;'+
  '	height: 81px;'+
  '	background: none;'+
  '}'+
  '.lor_topbar .gobuy {'+
  '	background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/che.png) no-repeat  14px center #000;'+
  '	width: 170px;'+
  '	text-indent: 42px;'+
  '	color: #FFF;'+
  '	font-weight: bolder;'+
  '	font-size: 16px;'+
  '	line-height: 58px;'+
  '	height: 60px;'+
  '	display: block;'+
  '	position: relative;'+
  '}'+
  '.lor_topbar .gobuy span {'+
  '	background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/base/base.png) no-repeat -224px -206px;'+
  '	width: 25px;'+
  '	height: 25px;'+
  '	display: block;'+
  '	position: absolute;'+
  '	right: 16px;'+
  '	top: 16px;'+
  '	text-align: center;'+
  '	line-height: 25px;'+
  '	text-indent: 0px;'+
  '}'+
  '.lor_topbar .gobuy:hover {'+
  '	background: url(//js01.daoju.qq.com/zb/lolriotmall/pc/images/che.png) no-repeat  14px center #1c1c1c;'+
  '	text-decoration: none;'+
  '}'+
  '</style>'+
  '<div class="lor_topbar lor_wfull"> '+
  '   <div class="lor_top clearfix"> '+
  '    <div class="lor_logobar fl"> '+
  '     <a class="logo" href="//lolriotmall.qq.com/index.shtml?CLICKTAG=lolriotmall.pc.index.logo" title="英雄联盟周边商城"></a> '+
  '    </div> '+
  '    <!-- 公告栏 --> '+
  '    <div class="fl lor_noticebar clearfix" id="scroll_div" style="display:none;"> '+
  '     <div id="scroll_begin"> '+
  '     </div> '+
  '     <div id="scroll_end"></div> '+
  '    </div> '+
  '    <div class="lor_top_mem fr" id="topHead"> '+
  '     <!-- 登录状态 --> '+
  '     <div class="login-bar"> '+
  '      <div id="logined" class="fl logined-box clearfix lor_loginbox" style="display: none;"> '+
  '       <span>欢迎您 ,</span> '+
  '       <div class="fl login-user clearfix"> '+
  '        <span style="display:none" id="login_userFace_span"></span> '+
  '        <span id="login_userName_span"></span> '+
  '        <b id="login_nickname_span"></b> '+
  '        <i class="fl ico-menu marrl"></i> '+
  '        <div class="menu-downbox"> '+
  '         <div class="downbox-bg"></div> '+
  '         <ul class="menu-downlist clearfix"> '+
  '          <li class="first"> <a href="//lolriotmall.qq.com/user/orderlist.shtml" class="downlist-link" title="我的订单">我的订单</a> </li> '+
  '          <li> <a href="//lolriotmall.qq.com/user/favorlist.shtml" class="downlist-link" title="我的收藏">我的收藏</a> </li> '+
  '          <li> <a href="//lolriotmall.qq.com/user/userinfo.shtml" class="downlist-link" title="个人信息">个人信息</a> </li> '+
  '         </ul> '+
  '        </div> '+
  '       </div> '+
  '       <a href="javascript:;" class="lor_logout">退出</a> '+
  '      </div> '+
  '      <!-- 未登录状态 --> '+
  '      <a id="unlogin" href="javascript:;" class="qqlogin lor_unlogin"> <span class="mtxt">你好，请登录</span> </a> '+
  '      <a href="//lolriotmall.qq.com/cart.shtml?CLICKTAG=lolriotmall.pc.index.cart" class="menu-cart clearfix"> <i class="fl ico-menu mcart"></i> <span class="mtxt">购物车</span> <span id="headerCartNum" class="ico-menu mpoint">0</span> </a> '+
  '      <div href="javascript:;" class="fl menu-ser clearfix"> '+
  '       <i class="fl ico-menu mser"></i> '+
  '       <span class="mtxt">客服咨询</span> '+
  '       <i class="fl ico-menu marrl"></i> '+
  '       <div class="menu-downbox"> '+
  '        <div class="downbox-bg"></div> '+
  '        <ul class="menu-downlist"> '+
  '         <li class="first"> <a href="javascript:;" class="downlist-link qq_qian" title="售前咨询">售前咨询</a> </li> '+
  '         <li> <a href="javascript:;" class="downlist-link qq_hou" title="售后咨询">售后咨询</a> </li> '+
  '        </ul> '+
  '       </div> '+
  '      </div> '+
  '      <div class="fl lolweixin clearfix"> '+
  '       <i class="fl ico-menu mwxin"></i> '+
  '       <span class="mtxt">微信商城</span> '+
  '       <i class="fl ico-menu marrl"></i> '+
  '       <div class="mwx-code"> '+
  '        <div class="mwx-codebg"></div> '+
  '        <div class="mwx-codeimg"> '+
  '         <img src="//js01.daoju.qq.com/zb/lolriotmall/pc/images/wxcode.png" width="83" height="82" alt="微信二维码" /> '+
  '        </div> '+
  '        <p class="mwx-txt">扫码手机购买</p> '+
  '       </div> '+
  '      </div> '+
  '     </div> '+
  '     <div class="top_qqtip">'+
  '       QQ登录中 '+
  '      <font>...</font> '+
  '     </div> '+
  '    </div> '+
  '   </div> '+
  '   <!--[if !IE]>导航栏<![endif]--> '+
  '   <div class="lor_menubar clearfix"> '+
  '    <!--主导航栏--> '+
  '    <ul id="blk_nav" class="menu_zhong fl"> '+
  '     <li class="menu_zhongli"> <a id="menu_45" href="//lolriotmall.qq.com/index.shtml?CLICKTAG=lolriotmall.pc.index.nav45">商城首页</a> </li> '+
  '     <li class="menu_zhongli"> <a id="menu_46" href="//lolriotmall.qq.com/list.shtml?catid=101&amp;CLICKTAG=lolriotmall.pc.index.nav46">雕塑手办</a> '+
  '      <div class="submenu clearfix"> '+
  '       <ul class="fl submenu-list"> '+
  '        <li> <a href="//lolriotmall.qq.com/list.shtml?catid=121&amp;CLICKTAG=lolriotmall.pc.index.nav46_subNav51" class="submenu-link" parentid="menu_46">大型雕塑</a> </li> '+
  '        <li> <a href="//lolriotmall.qq.com/list.shtml?catid=122&amp;CLICKTAG=lolriotmall.pc.index.nav46_subNav52" class="submenu-link" parentid="menu_46">中型雕塑</a> </li> '+
  '        <li> <a href="//lolriotmall.qq.com/list.shtml?catid=208&amp;CLICKTAG=lolriotmall.pc.index.nav46_subNav66" class="submenu-link" parentid="menu_46">限定款手办</a> </li> '+
  '        <li> <a href="//lolriotmall.qq.com/list.shtml?catid=209&amp;CLICKTAG=lolriotmall.pc.index.nav46_subNav67" class="submenu-link" parentid="menu_46">手办</a> </li> '+
  '       </ul> '+
  '       <a class="fr subm-img" href="//lolriotmall.qq.com/list.shtml?catid=101&amp;CLICKTAG=lolriotmall.pc.index.nav46_navIcon46"> <img src="//game.gtimg.cn/images/daojushop/zb/navigation/201706/20170622170047_844267.jpg" width="81" height="81" alt="雕塑手办" /> </a> '+
  '      </div> </li> '+
  '     <li class="menu_zhongli"> <a id="menu_47" href="//lolriotmall.qq.com/list.shtml?catid=119&amp;CLICKTAG=lolriotmall.pc.index.nav47">毛绒玩偶</a> '+
  '      <div class="submenu clearfix"> '+
  '       <ul class="fl submenu-list"> '+
  '        <li> <a href="//lolriotmall.qq.com/list.shtml?catid=125&amp;CLICKTAG=lolriotmall.pc.index.nav47_subNav54" class="submenu-link" parentid="menu_47">玩偶</a> </li> '+
  '        <li> <a href="//lolriotmall.qq.com/list.shtml?catid=126&amp;CLICKTAG=lolriotmall.pc.index.nav47_subNav55" class="submenu-link" parentid="menu_47">帽子</a> </li> '+
  '       </ul> '+
  '       <a class="fr subm-img" href="/list.shtml?catid=119&amp;CLICKTAG=lolriotmall.pc.index.nav47_navIcon47"> <img src="//game.gtimg.cn/images/daojushop/zb/navigation/201706/20170622162123_179921.png" width="81" height="81" alt="毛绒玩偶" /> </a> '+
  '      </div> </li> '+
  '     <li class="menu_zhongli"> <a id="menu_48" href="//lolriotmall.qq.com/list.shtml?catid=120&amp;CLICKTAG=lolriotmall.pc.index.nav48">男女服饰</a> '+
  '      <div class="submenu clearfix"> '+
  '       <ul class="fl submenu-list"> '+
  '        <li> <a href="//lolriotmall.qq.com/list.shtml?catid=127&amp;CLICKTAG=lolriotmall.pc.index.nav48_subNav59" class="submenu-link" parentid="menu_48">卫衣&amp;夹克</a> </li> '+
  '        <li> <a href="//lolriotmall.qq.com/list.shtml?catid=128&amp;CLICKTAG=lolriotmall.pc.index.nav48_subNav60" class="submenu-link" parentid="menu_48">T恤</a> </li> '+
  '       </ul> '+
  '       <a class="fr subm-img" href="//lolriotmall.qq.com/list.shtml?catid=120&amp;CLICKTAG=lolriotmall.pc.index.nav48_navIcon48"> <img src="//game.gtimg.cn/images/daojushop/zb/navigation/201706/20170622165956_696740.jpg" width="81" height="81" alt="男女服饰" /> </a> '+
  '      </div> </li> '+
  '     <li class="menu_zhongli"> <a id="menu_49" href="//lolriotmall.qq.com/list.shtml?catid=117&amp;CLICKTAG=lolriotmall.pc.index.nav49">海报艺术</a> '+
  '      <div class="submenu clearfix"> '+
  '       <ul class="fl submenu-list"> '+
  '        <li> <a href="//lolriotmall.qq.com/list.shtml?catid=129&amp;CLICKTAG=lolriotmall.pc.index.nav49_subNav70" class="submenu-link" parentid="menu_49">英雄海报</a> </li> '+
  '        <li> <a href="//lolriotmall.qq.com/list.shtml?catid=214&amp;CLICKTAG=lolriotmall.pc.index.nav49_subNav72" class="submenu-link" parentid="menu_49">画册</a> </li> '+
  '       </ul> '+
  '       <a class="fr subm-img" href="//lolriotmall.qq.com/list.shtml?catid=117&amp;CLICKTAG=lolriotmall.pc.index.nav49_navIcon49"> <img src="//game.gtimg.cn/images/daojushop/zb/navigation/201706/20170622170007_999128.jpg" width="81" height="81" alt="海报艺术" /> </a> '+
  '      </div> </li> '+
  '     <li class="menu_zhongli"> <a id="menu_74" href="//lolriotmall.qq.com/list.shtml?catid=215&amp;CLICKTAG=lolriotmall.pc.index.nav74">LPL队服</a> '+
  '      <div class="submenu clearfix"> '+
  '       <ul class="fl submenu-list"> '+
  '        <li> <a href="//lolriotmall.qq.com/list.shtml?catid=218&amp;CLICKTAG=lolriotmall.pc.index.nav74_subNav76" class="submenu-link" parentid="menu_74">队服T恤</a> </li> '+
  '        <li> <a href="//lolriotmall.qq.com/list.shtml?catid=219&amp;CLICKTAG=lolriotmall.pc.index.nav74_subNav77" class="submenu-link" parentid="menu_74">队服裤子</a> </li> '+
  '       </ul> '+
  '       <a class="fr subm-img" href="/list.shtml?catid=215&amp;CLICKTAG=lolriotmall.pc.index.nav74_navIcon74"> <img src="//game.gtimg.cn/images/daojushop/zb/navigation/201706/20170628162725_524866.jpg" width="81" height="81" alt="LPL队服" /> </a> '+
  '      </div> </li> '+
  '     <li class="menu_zhongli"> <a id="menu_57" href="//lolriotmall.qq.com/list.shtml?catid=116&amp;CLICKTAG=lolriotmall.pc.index.nav57">其他</a> '+
  '      <div class="submenu clearfix"> '+
  '       <ul class="fl submenu-list"> '+
  '        <li> <a href="//lolriotmall.qq.com/list.shtml?catid=131&amp;CLICKTAG=lolriotmall.pc.index.nav57_subNav68" class="submenu-link" parentid="menu_57">鼠标垫</a> </li> '+
  '        <li> <a href="//lolriotmall.qq.com/list.shtml?catid=210&amp;CLICKTAG=lolriotmall.pc.index.nav57_subNav69" class="submenu-link" parentid="menu_57">其他</a> </li> '+
  '       </ul> '+
  '       <a class="fr subm-img" href="//lolriotmall.qq.com/list.shtml?catid=116&amp;CLICKTAG=lolriotmall.pc.index.nav57_navIcon57"> <img src="//game.gtimg.cn/images/daojushop/zb/navigation/201706/20170626164713_396902.jpg" width="81" height="81" alt="更多" /> </a> '+
  '      </div> </li> '+
  '    </ul> '+
  '    <script id="tmpl_nav" type="text/html">'+
  '        {if list && list.length} {for item in list}'+
  '        <li class="menu_zhongli">'+
  '            <a id="menu_${item.iSeqId}" href="${item.sUrl}{if item.sUrl.indexOf(\'?\') == -1 }?{else}&{/if}CLICKTAG=lolriotmall.pc.index.nav${item.iSeqId}">${item.sName}</a>'+
  '            <i class="menu-ico{if item.iTag == 1} ico-hot{elseif item.iTag == 2} ico-new{/if}"></i>'+
  '            {if item.subs && item.subs.length}'+
  '            <div class="submenu clearfix">'+
  '                <ul class="fl submenu-list">'+
  '                    {for subItem in item.subs}'+
  '                    <li>'+
  '                        <a href="${subItem.sUrl}{if subItem.sUrl.indexOf(\'?\') > -1 }&{/if}CLICKTAG=lolriotmall.pc.index.nav${item.iSeqId}_subNav${subItem.iSeqId}"'+
  '                            class="submenu-link" parentid="menu_${item.iSeqId}">${subItem.sName}</a>'+
  '                    </li>'+
  '                    {/for}'+
  '                </ul>'+
  '                <a class="fr subm-img" href="${item.sUrl}{if item.sUrl.indexOf(\'?\') > -1 }&{/if}CLICKTAG=lolriotmall.pc.index.nav${item.iSeqId}_navIcon${item.iSeqId}">'+
  '                    <img src="${item.sIcon.replace(\'http://ossweb-img.qq.com\',\'https://game.gtimg.cn\')}" width="81" height="81" alt="${item.sName}">'+
  '                </a>'+
  '            </div>'+
  '            {/if}'+
  '        </li>'+
  '        {/for} '+
  '        {/if}'+
  '    </script>'+
  '    <!--[if !IE]>搜索栏<![endif]--> '+
  '    <div class="fr lor_sosobar"> '+
  '     <div class="soso"> '+
  '      <input name="textfield" type="" class="sosoinp yahei" id="soinp" value="" onfocus="if(this.value==\/\/\'\/\/\'){this.value=\/\/\'\/\/\';}" onblur="if(this.value==\/\/\'\/\/\'){this.value=\/\/\'\/\/\';}" /> '+
  '      <div class="keyword-list"> '+
  '       <a href="javascript:;" title="" id="lor_solikey"></a> '+
  '      </div> '+
  '      <a href="javascript:;" class="sosobot lor_searchword"> <i class="ico-menu mseach"></i> </a> '+
  '     </div> '+
  '    </div> '+
  '    <form id="keyWordSearchForm"> '+
  '     <input type="hidden" name="keyWord" id="keyWord" value="" /> '+
  '     <input type="hidden" name="keyType" id="keyType" value="" /> '+
  '     <input name="start" type="hidden" value="0" id="keyWordStart" /> '+
  '    </form> '+
  '   </div>'+
  '  </div>');
  
  (function(window,undefined){
    var lolriotmall_header = {
        //关键字推荐
        RecommendWorld: function(recommendWorld) {
            var lor_solidword = recommendWorld,
            lor_src = "//lolriotmall.qq.com/list.shtml?keyword=" + encodeURI(lor_solidword) + "&CLICKTAG=lolriotmall.pc.index.search";
            $("#lor_solikey").attr({
                href: lor_src,
                title: lor_solidword
            }),
            $("#lor_solikey").text(lor_solidword);
        },
        //公告文字滚动功能
        scrollLeft: function() {
            function Marquee() {
                scroll_end.offsetWidth - scroll_div.scrollLeft <= 0 ? scroll_div.scrollLeft -= scroll_begin.offsetWidth: scroll_div.scrollLeft++;
            }
            var speed = 50,
            scroll_begin = document.getElementById("scroll_begin"),
            scroll_end = document.getElementById("scroll_end"),
            scroll_div = document.getElementById("scroll_div");
            scroll_end.innerHTML = scroll_begin.innerHTML;
            var MyMar = setInterval(Marquee, speed);
            scroll_div.onmouseover = function() {
                clearInterval(MyMar);
            },
            scroll_div.onmouseout = function() {
                MyMar = setInterval(Marquee, speed);
            };
        },
        //获取公告
        ajaxNoticeRecord: function() {
            var url = "//mall.qq.com/lolriotmall/time/js/actual_notice_list.js?",
            params = {
                pn: 1,
                ps: 10,
                _ts: new Date().getTime()
            };
            $.getScript(url + $.param(params),
            function() {
                var rsp = window.actual_notice_list;
                if (console.log(">::>>>:>noticeList", rsp), rsp && rsp.length) {
                    for (var i = 0; i < rsp.length; i++) {
                        var rspContent = rsp[i].sContent,
                        noticeContent = rspContent.replace(/<\/?.+?>/g, "").replace(/ /g, "");
                        $("#scroll_begin").append(noticeContent + '<span class="toSpace"></span>');
                    }
                    setTimeout(function() {
                        $(".toSpace").css("display", "inline-block"),
                        $(".toSpace").width($("#scroll_div").width()),
                        $("#scroll_div").show(),
                        lolriotmall_header.scrollLeft();
                    },
                    500);
                }
            });
        },
        // 渲染导航条
        renderNav:function() {
          var data = window.actual_index_nav,
              navs = [], idxs = {};
  
          // 因为父节点不一定不在子节点前面，所以分了2次for循环处理
          for(var i in data){
              if(data[i].iParentId == 0){
                  idxs[data[i].iSeqId] = navs.length;
                  data[i].subs = [];
                  navs.push(data[i]);
              }
          }
          for(var i in data){
              if(data[i].iParentId != 0){
                  try {
                      navs[idxs[data[i].iParentId]].subs.push(data[i]);
                  } catch(e){}
              }
          }
          need(['util.template'], function (template) {
              $('#blk_nav').html(template.parseDOMTemplate('tmpl_nav').process(navs, 'list')).fadeIn();
  
              try {
                  $curNavMenu = $('#blk_nav a[href="' + location.pathname + location.search + '"]');
  
                  // 如果二级菜单单独设置为一级菜单的问题
                  $curNavMenu.each(function () {
                  if(!$(this).hasClass('submenu-link')){
                      $curNavMenu = $(this);
                      return false;
                  }
                  });
  
                  if ($curNavMenu.attr('parentid')) {
                      $curNavMenu = $('#' + $curNavMenu.attr('parentid'));
                  }
  
                  $curNavMenu.addClass('click');
              } catch(e){}
          });
        },
        // 绑定事件
        bindEvents: function() {
            $(".lor_top_mem a.lolweixin").hover(function() {
                $(this).children().show();
            },
            function() {
                $(this).children().hide();
            }),
            $("#soinp").bind("keypress",
            function(event) {
                "13" == event.keyCode && lolriotmall_header.searchKeyWord();
            }),
            $(".sosoinp").focus(function() {
                $(".keyword-list").hide();
            }),
            $(".sosoinp").blur(function() {
                "" == $(this).val() && $(".keyword-list").show();
            }),
            $(".lor_searchword").on("click",function() {
                lolriotmall_header.searchKeyWord();
            }),
            $(".lor_unlogin").on("click",function() {
                lolriotmall_header.login();
            }),
            $(".lor_logout").on("click",function() {
                lolriotmall_header.logout();
            });
        },
        //登出
        logout: function() {
            need(["biz.login"],function(loginManager) {
                loginManager.logout(function() {
                    window.location.reload();
                });
            });
        },
        //登录
        login: function() {
            need(["biz.login"],function(loginManager) {
              loginManager.init({
                  needReloadPage: true
              });
              LoginManager.loginByWXAndQQ({
                  appId: "wxdff7a47a9401b818",
                  gameDomain: "mall.qq.com"
              });
            });
        },
  
        
        //渲染用户信息
        renderUserInfo: function(loginedCallback, unlonginCallback) {
            need(["biz.login"],function(loginManager) {    
                loginManager.checkLogin(function(info) {
                  if (info.logtype === "wx") {
                    $("#login_userName_span").html(info.nickname);
                    milo.cookie.set("target_appid", 'wxd0b839ab562335a5', 1200, "qq.com", "/");
                    // $(".login-info img").attr("src",info.headimgurl+"/64");
                    $.isFunction(loginedCallback) && loginedCallback(info);
                  } else {
                    $("#login_userName_span").html(info.nickname);
                      LoginManager.getUserFace(function(user){
                          $(".login-info img").attr("src", user.userFace);
                      });
                      $.isFunction(loginedCallback) && loginedCallback(info);
                  }
                  $(".lor_loginbox").show();
                  $(".lor_unlogin").hide();
                },
                function() {
                  $(".lor_loginbox").hide();
                  $(".lor_unlogin").show();
                  $.isFunction(unlonginCallback) && unlonginCallback(null);
                });
            });
        },
        //查询购物车信息
        renderCartNum: function() {
            if (0 == $("#headerCartNum").length) return ! 1;
            var url = "//apps.game.qq.com/daoju/v3/api/hs/plug_sw/cart/cart.php?",
            params = {
                Act: "list",
                _biz_code: "lolriotmall",
                supplier_id: "",
                _output_var: "CartGoodsList"
            };
            //alert(pars)
            $.getScript(url + $.param(params),
            function() {
                var rsp = window.CartGoodsList;
                if (rsp.result == 0 && rsp.data && rsp.data.list) {
                    var item, total = 0;
                    for (var i in rsp.data.list) {
                        if (rsp.data.list.hasOwnProperty(i) === true) {
                            item = rsp.data.list[i];
                            if (item.sales) {
                                for (var j in item.sales) {
                                    if (item.sales.hasOwnProperty(j) === true) {
                                        if (item.sales[j].iTotal) {
                                            total += parseInt(item.sales[j].iTotal);
                                        }
                                    }
                                }
  
                            } else {
                                total += parseInt(item.iTotal);
                            }
                        }
                    }
                    $('#headerCartNum').html(total);
                }
  
            });
        },
        //关键字搜索
        searchKeyWord: function() {
            var keyWord = $("#soinp").val();
            if ("" != keyWord && "搜索你喜欢的英雄周边" != keyWord) {
                var searchUrl = "//lolriotmall.qq.com/list.shtml?keyword=" + encodeURI(keyWord) + "&CLICKTAG=lolriotmall.pc.index.search";
                window.location.href = searchUrl;
            }
        }
    }
  
    //主入口
    var main_load = function(){
        lolriotmall_header.RecommendWorld("阿狸");
        lolriotmall_header.bindEvents();
        lolriotmall_header.renderNav();
        lolriotmall_header.renderUserInfo(function () {
            lolriotmall_header.renderCartNum();
        }, function () {
            // 个人中心，未登录，直接弹出登录框
            if(/\/user\//.test(location.href)){
                lolriotmall_header.login();
            }
        });
        lolriotmall_header.ajaxNoticeRecord();
    } 
    var header_nav_script = document.createElement('script');
      header_nav_script.src = '//mall.qq.com/lolriotmall/time/js/actual_index_nav.js';
      header_nav_script.type = 'text/javascript';
      document.body.appendChild(header_nav_script);
      var header_nav_script_evnet = typeof(header_nav_script.onload) != 'undefined'? 'onload' : 'onreadystatechange';
      header_nav_script[header_nav_script_evnet] = function(){
          if ((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
    
              var header_jq = false,
                  header_milo = false;
              
              var intval = setInterval(function () {
                  if (typeof jQuery != 'undefined') { 
                      header_jq = true;
                  }
                  if(typeof milo == 'object' && typeof need == 'function' && typeof define == 'function'){
                      header_milo = true;
                  }
                  if(header_jq && header_milo){
                      clearInterval(intval);
                      main_load();
                  }
              }, 100);
          }
      }
      window.lolriotmall_header = lolriotmall_header;
  })(window);
  
  
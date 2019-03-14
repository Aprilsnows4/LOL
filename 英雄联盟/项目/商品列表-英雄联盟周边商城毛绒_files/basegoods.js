var CommTool = {
	biz: window.bizCode || 'lolriotmall',
	extend: function(Child, Parent){

		var tmpChildPrototype = Child.prototype;
		Child.prototype = new Parent();
		for(var i in tmpChildPrototype){
			Child.prototype[i] = tmpChildPrototype[i];
		}
		Child.parent = Parent.prototype;

		return Child;
	},
	request: function (key) {
		if (!CommTool._request_data) {
			CommTool._request_data = {};
			var search = window.location.search ? window.location.search.slice(1).split('&') : [];
			for (i in search) {
				var item = typeof search[i] === 'string' ? search[i].split('=') : [];
				CommTool._request_data[item[0]] = item[1] ? CommTool.htmlEntitiesCode(item[1]) : '';
			}
		}
		return CommTool._request_data[key] || '';

	},
	htmlEntitiesCode: function (str) {
		str.replace(/[<>&'""']/g, function (c) {
			return '&#' + c.charCodeAt() + ';';
		});
		return str;
	},
	getACSRFToken: function () {
		var str = milo.cookie.get('skey');
		if (str) {
			var hash = 5381;
			for (var i = 0, len = str.length; i < len; ++i) {
				hash += (hash << 5) + str.charAt(i).charCodeAt();
			}
			return hash & 0x7fffffff;
		}
	},

	getScriptForPromise: function(url, variable, result, successFunc, force){
		var defer = $.Deferred();
		$.getScript(url, function(){
			var json = window[variable] || window.oGoodsApp;
			if(json && (!result || json[result] == 0)){
				var resJson = successFunc ? successFunc(json) : json;
				resJson && (json = resJson);
				defer.resolve(json);
			}else{
				defer.reject(json);
			}
		}).fail(function(){
			defer.reject();
		});
		return defer.promise();
	},
	gScript:function(url, func){
		var dj_header_ping_script = document.createElement('script');
		dj_header_ping_script.src = url;
		dj_header_ping_script.type = 'text/javascript';
		var dj_header_ping_script_event = typeof(dj_header_img_script.onload) != 'undefined'? 'onload' : 'onreadystatechange';
		dj_header_ping_script[dj_header_ping_script_event] = function(){
			if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
				dj_header_ping_script[dj_header_ping_script_event] = null;
				func && func();
			}
		};
		document.getElementsByTagName('head')[0].appendChild(dj_header_ping_script);
	},
	alert: function (msg, success) {
		milo.loader.set({charset: "gbk"});
		milo.loader.loadCSS(window.location.protocol+'//ossweb-img.qq.com/images/js/milo/daoju/hx/style/order.css');
		need(["daoju.hx.html.order.alertPanelTpl"], function (alertTpl) {
			if ($("#alertPanelTpl").size() == 0) {
				$("body").append(alertTpl.html);
			}
			alertTpl.callback(msg, 'alert', success);
		});
	},
	confirm: function (msg, success, failure) {
		milo.loader.set({charset: "gbk"});
		milo.loader.loadCSS(window.location.protocol+'//ossweb-img.qq.com/images/js/milo/daoju/hx/style/order.css');
		need(["daoju.hx.html.order.alertPanelTpl"], function (alertTpl) {
			if ($("#confirmPanelTpl").size() == 0) {
				$("body").append(alertTpl.html);
			}
			alertTpl.callback(msg, 'confirm', success, failure);
		});
	},
	fen2yuan: function(fen, decimal){
		return parseFloat(fen/100).toFixed(decimal||2);
	},
	storage: function(k, v){
		window.localStorage || (window.localStorage = {});
		console.log('window', k, v);
		if(v === undefined){
			return window.localStorage[k];
		}else{
			return window.localStorage[k] = v;
		}
	},
	setLocalCollectGoods: function(goodsid, v){
		return CommTool.storage('collect_goods_'+goodsid, v ? 1 : 0);
	},
	getLocalCollectGoods: function(goodsid){
		return CommTool.storage('collect_goods_'+goodsid);
	}
};

var callbacksModel = function(){
	var thisObj = this;
	this.callbacks = {};
	this.lastFireData;
	this.add = function(funcName, func){
		if(funcName && typeof func === 'function' && !thisObj.existFuncName(funcName)){//防止重复添加
			thisObj.callbacks[funcName] = func;
			thisObj.lastFireData !== undefined && func(thisObj.lastFireData);
		}
	};
	this.upd = function(funcName, func){
		if(funcName && typeof func === 'function'){
			thisObj.callbacks[funcName] = func;
			thisObj.lastFireData !== undefined && func(thisObj.lastFireData);
		}
	};
	this.del = function(funcName){
		delete thisObj.callbacks[funcName];
	};
	this.fire = function(data){
		thisObj.lastFireData = data;
		for(funcName in thisObj.callbacks){
			thisObj.callbacks[funcName](data);
		}
	};
	this.existFuncName = function(funcName){
		return thisObj.callbacks[funcName] ? true : false;
	};
};

var loginModel = function(){
	var that = this;
	this.info = {
		uin: ''
	};
	this.isChecked = false;
	this.funcQueue = new callbacksModel;
	//this.funcQueue = $.Callbacks('unique memory');
	this.register = function(callbackName, callbackFunc){
		that.funcQueue.upd(callbackName, callbackFunc);
	};
	this.login = function(callback, force){//force是否强制登录
		var defer = $.Deferred();

		if(force){
			need(['biz.login-min'], function(login){
				login.login(function(){
					that.info.uin = login.getUserUin();
					callback&&callback();
					defer.resolve(that.info);
					that.funcQueue.fire(that.info);
				});
			});

		}else{
			that.check(function(){
				if(!that.info.uin){
					need(['biz.login-min'], function(login){
						login.login(function(){
							that.info.uin = login.getUserUin();
							callback&&callback();
							defer.resolve(that.info);
							that.funcQueue.fire(that.info);
						});
					});
				}else{
					callback&&callback();
					defer.resolve(that.info);
				}
			});
		}

		return defer.promise();
	};
	this.logout = function(callback){
		var defer = $.Deferred();
		login.logout(function(){
			that.info.uin = '';
			callback&&callback();
			defer.resolve(that.info);
			that.funcQueue.fire(that.info);
		});
		return defer.promise();
	};
	this.check = function(callback){
		var defer = $.Deferred();
		if(this.isChecked){
			defer.resolve();
		}else{
			this.isChecked = true;
			need(['biz.login-min'], function(login){
				login.checkLogin(function(){
					that.info.uin = login.getUserUin();
					defer.resolve();
				}, function(){
					that.info.uin = '';
					defer.resolve();
				});
			});
		}
		defer.done(function(){
			callback&&callback(that.info);
		});
	};
	this.init = function(){
		need(['biz.login-min'], function(login){
			login.init({
				//needReloadPage:false//登录后不重载页面
				needReloadPage:true
			});
		});
		that.check(function(){
			that.funcQueue.fire(that.info);
		});
	};
	this.init();
};
//LoginModel = new loginModel;



var ClassSelector = function(){};
ClassSelector.prototype._deferCategory = null;
ClassSelector.prototype.getCategory = function(){
	var thisObj = this;
	var option = {
		output_format: 'jsonp',
		opt_type: 'category_list',
		biz: CommTool.biz
	};
	var url = '//apps.game.qq.com/daoju/v3/zb/client/category/CategoryApp.php?' + $.param(option);
	thisObj._deferCategory || (thisObj._deferCategory = CommTool.getScriptForPromise(url, 'ocategory_app', 'ret'));
	return thisObj._deferCategory;
};
ClassSelector.prototype._deferTagNames = null;
ClassSelector.prototype.getTagNames = function(tag_ids){
	var option = {
		output_format: 'jsonp',
		opt_type: 'tag_list',
		biz: CommTool.biz,
		tag_ids: ''
	};
	var url = '//apps.game.qq.com/daoju/v3/zb/client/category/CategoryApp.php?' + $.param(option);
	thisObj._deferTagNames || (thisObj._deferTagNames = CommTool.getScriptForPromise(url, 'ocategory_app', 'ret'));
	return thisObj._deferTagNames;
};

ClassSelector.prototype.crumsData = function(option){
	var thisObj = this;
	var option = $.extend({
		cat_tag_type: '',
		cat_tag_id: ''
	},option);
	var deferCrums = $.Deferred();
	var dataCrums = [];
	switch(option.cat_tag_type){
		case 'cat':
			thisObj.getCategory().always(function(catJson){
				var category = {};
				catJson.ret == 0 && catJson.data && $.each(catJson.data, function(){
					category[this.iCatId] = this;
				});
				var recursion = function(catid, isLoop){
					if(!category[catid]){
						return false;
					}
					var cat = category[catid];
					//json.data.list.category.push(cat);
					dataCrums.push({
						href: cat.iParentId == '0' && isLoop ? 'list.shtml?catid='+cat.iCatId : '',
						name: cat.sCatName
					});
					if(cat.iParentId != 0){
						recursion(cat.iParentId, true);
					}
					isLoop || dataCrums.reverse();
				};
				recursion(option.cat_tag_id);
				deferCrums.resolve(dataCrums);
			});
		break;
		case 'tag':
			thisObj.getTagNames(option.cat_tag_id).always(function(tagJson){
				tagJson.tag = {};
				tagJson.ret == 0 && tagJson.data && $.each(tagJson.data, function () {
					tagJson.tag[this.iCatId] = this;
				});
				if(tagJson.tag[option.cat_tag_id]){
					dataCrums.push({
						href: '',
						name: tagJson.tag[option.cat_tag_id].sTagName
					});
				}
				deferCrums.resolve(dataCrums);
			});
		break;
		case 'wmark':
			var mapMark = {
				1: '包邮',
				2: '特价',
				3: '新品',
				4: '热卖',
				5: '同款',
				6: '折扣',
				7: '预售'
			};
			dataCrums.push({
				href: '',
				name: mapMark[option.cat_tag_id] || ''
			});
			deferCrums.resolve(dataCrums);
		break;
		case 'all':
			dataCrums.push({
				href: 'list.shtml',
				name: '所有商品'
			});
			deferCrums.resolve(dataCrums);
		break;//搜索
		default:
			dataCrums.push({
				href: 'list.shtml',
				name: '所有商品'
			});
			deferCrums.resolve(dataCrums);
	};
	return deferCrums;
};
ClassSelector.prototype.categoryData = function(option){
	var thisObj = this;
	var option = $.extend({
		cat_tag_type: '',
		cat_tag_id: ''
	},option);
	if(option.cat_tag_type == 'cat'){
		catid = parseInt(option.cat_tag_id) || 0;
	}else{
		catid = 0;
	}
	var deferCategory = $.Deferred();
	thisObj.getCategory().always(function(catJson){
		var category = {};
		catJson.ret == 0 && catJson.data && $.each(catJson.data, function(){
			category[this.iCatId] = this;
		});
		/**
		 *
		 * @param {[{isort:1},{isort:2}]} array like [{isort:1},{isort:2}]
		 * @param {key} key  like isort
		 * @param {iSort} iSort  like iSort> 0 从小到大 iSort<0 从大到小
		 */
		var sortObj = function (array, key,iSort) {
			iSort = typeof iSort == "undefined" ? 1 : iSort;
			return array.sort(function(a, b) {
				var x = a[key];
				var y = b[key];
				if(iSort>0){
					return x - y;
				}else{
					return y-x;
				}
			})
		}

		var getData = function(catid){
			var data = {};
			catid || (catid=0);
			data.id = catid;
			data.name = category[catid] ? category[catid].sCatName : '';
			data.img = category[catid] ? (category[catid].sCatIcon2 || category[catid].sCatIcon) : '';
			data.children = {};
			data.childrenAry = [];
			data.childrenLength = 0;

			if(catJson.ret == 0 && catJson.data){
				catJson.data = sortObj(catJson.data,'iSortOrder',1);
				var aryTemp = {};
				$.each(catJson.data, function(){
					if(this.iParentId == data.id){
						aryTemp = {
							id: this.iCatId,
							name: this.sCatName,
							img: this.sCatIcon2 || this.sCatIcon,
							iSortOrder:this.iSortOrder || 1
						}
						data.children[this.iCatId] = aryTemp;
						data.childrenAry.push(aryTemp);
						data.childrenLength++;
					}
				});
			}


			return data;
		}

		var data = getData(catid, catJson);
		if(catid != 0 && data.childrenLength == 0){
			data = getData(category[catid].iParentId);
		}
		deferCategory.reject(data);

	});

	return deferCategory;
};

var ClassCollect = function(){};
ClassCollect.prototype.getCollectList = function(option){
	option = $.extend({
		_biz_code: CommTool.biz,
		Act: 'list',
		goodid: ''
	}, option);

	var url = '//apps.game.qq.com/daoju/v3/zb/client/notice/AttendGoods.php?'+$.param(option);
	return CommTool.getScriptForPromise(url, 'AttendGoods', 'result');
};
ClassCollect.prototype.addCollect = function(option){
	var option = $.extend({
		_biz_code: CommTool.biz,
		Act: 'active',
		goodid: '',
		goodname:'',
		price:'',
		goodpic:''
	},option);

	var url = '//apps.game.qq.com/daoju/v3/zb/client/notice/AttendGoods.php?'+$.param(option);
	return CommTool.getScriptForPromise(url, 'AttendGoods', 'result');
};
ClassCollect.prototype.cancelCollect = function(goodsId){
	var option = {
		_biz_code: CommTool.biz,
		Act: 'disable',
		goodid: goodsId
	};

	var url = '//apps.game.qq.com/daoju/v3/zb/client/notice/AttendGoods.php?'+$.param(option);
	return CommTool.getScriptForPromise(url, 'AttendGoods', 'result');
};

var isInstock = false;//标识-检测是否只显示有货-不检测为false,检测为true
var ClassGoods = function(){};
ClassGoods.prototype.goodsListOption = {
	output_format: 'jsonp',
	biz: CommTool.biz,
	page_no: 1,
	page_size: 9,
	//cs:'gbk',
	order_by: 'dtLastUpdate',//iPrice,iSoldNum,iSellBegin,dtShowBegin,dtLastUpdate,iHitNum
	sort: 'asc',
	jsonpName: 'goodsListApi',

	saleid:'',
	min_price: '',
	max_price: '',
	opt_type: '',//goods_list_search,goods_list
	keyword: '',
	cat_tag_id: '',
	cat_tag_type: '',//tag/cat/wmark/all
    instock:1 //是否只显示有货，有货为1
};
ClassGoods.prototype.setGoodsListOption = function(option){
	if(!isInstock){
        delete this.goodsListOption.instock;
	}else {
        this.goodsListOption.instock = 1;
	}
	var option = $.extend(this.goodsListOption, option);
	if(option.keyword){
		delete option.cat_tag_id;
		delete option.cat_tag_type;
		option.opt_type = 'goods_list_search';
	}else{
		delete option.keyword;
		option.opt_type = 'goods_list';
	}
	if(!option.min_price){
		delete option.min_price;
	}
	if(!option.max_price){
		delete option.max_price;
	}
	if(!option.saleid){
		delete option.saleid;
	}
	this.goodsListOption = option;
};
ClassGoods.prototype._deferMapGoodsList = {};
ClassGoods.prototype._setDeferMapGoodsList = function(url, defer){
	return this._deferMapGoodsList[url] = defer;
};
ClassGoods.prototype._getDeferMapGoodsList = function(url){
	return this._deferMapGoodsList[url];
};
ClassGoods.prototype.getGoodsList = function(option){
	this.setGoodsListOption(option);
	var url = '//apps.game.qq.com/daoju/v3/zb/client/goods/GoodsApp.php?'+$.param(this.goodsListOption);

	var defer = this._getDeferMapGoodsList(url);
	defer = defer ? defer : CommTool.getScriptForPromise(url, 'o'+this.goodsListOption.jsonpName, 'ret');
	this._setDeferMapGoodsList(url, defer);

	return defer;
};
ClassGoods.prototype.getWaterMarkName = function (goodsId) {
	var mark = '';
	switch (goodsId) {
		/*
		case '1':
			mark = '包邮';
			break;
		case '2':
			mark = '特价';
			break;
		*/
		case '3':
			mark = '新品';
			break;
		case '4':
			mark = '热卖';
			break;
		/*
		case '5':
			mark = '同款';
			break;
		case '6':
			mark = '折扣';
			break;
		case '7':
			mark = '预售';
			break;
		*/
		default:
			mark = '';
	}
	return mark;
};
ClassGoods.prototype.getJudouRate = function(option){
	option = $.extend({
		Act: 'list',
		_biz_code: CommTool.biz
	},option);
	var url = '//apps.game.qq.com/daoju/v3/zb/client/judou/JudouList.php?' + $.param(option);
	return CommTool.getScriptForPromise(url, 'JudouList', 'result');
};
ClassGoods.prototype._deferMapGoodsInfo = {};
ClassGoods.prototype._setDeferMapGoodsInfo = function(biz, goodsId, defer){
	return this._deferMapGoodsInfo[biz+'_'+goodsId] = defer;
};
ClassGoods.prototype._getDeferMapGoodsInfo = function(biz, goodsId){
	return this._deferMapGoodsInfo[biz+'_'+goodsId];
};
ClassGoods.prototype.getGoodsInfo = function(option, isForce){
	var thisObj = this;
	option = $.extend({
		output_format: 'jsonp',
		opt_type: 'goods_detail',
		biz: CommTool.biz,
		mall_id: '',
		jsonpName: '',
		channel:2
	}, option);
	option.jsonpName = 'goodsDetailApi_'+option.mall_id;
	var deferGoods = thisObj._getDeferMapGoodsInfo(option.biz, option.mall_id);
	if(!deferGoods || isForce){
		var url = '//apps.game.qq.com/daoju/v3/zb/client/goods/GoodsApp.php?'+$.param(option);
		deferGoods = CommTool.getScriptForPromise(url, 'o'+option.jsonpName, 'ret').always(function(jsonGoods){
			jsonGoods.data || (jsonGoods.data = {});
			jsonGoods.data.related || (jsonGoods.data.related = {});
			jsonGoods.data.relation || (jsonGoods.data.relation = {});

			if (jsonGoods.ret == 0 && jsonGoods.data && jsonGoods.data.list) {
				jsonGoods.data.list._imgData = typeof jsonGoods.data.list.sDetailImg == 'string' ? $.parseJSON(jsonGoods.data.list.sDetailImg) : jsonGoods.data.list.sDetailImg;
				jsonGoods.data.list._imgData.unshift(jsonGoods.data.list.sProfileImg);
				jsonGoods.data.list.iPriceYuan = parseFloat(jsonGoods.data.list.iPrice / 100).toFixed(2);
				jsonGoods.data.list.iOriPriceYuan = parseFloat(jsonGoods.data.list.iOriPrice / 100).toFixed(2);
				jsonGoods.data.list.iVipPriceYuan = parseFloat(jsonGoods.data.list.iVipPrice / 100).toFixed(2);
				jsonGoods.data.list.iPromotePriceYuan = parseFloat(jsonGoods.data.list.iPromotePrice / 100).toFixed(2);
				jsonGoods.data.list.iVipPromotePriceYuan = parseFloat(jsonGoods.data.list.iVipPromotePrice / 100).toFixed(2);
				//jsonGoods.data.list.stockNum = parseInt(jsonGoods.data.list.iMallQty) - parseInt(jsonGoods.data.list.iSoldNum);

				//聚豆处理
				/*
				if (jsonGoods.data.list.iJDDeduct > 0) {
					thisObj.getJudouRate({}, function (rateObj) {
						jsonGoods.data.list.sJDDeductInfo = Math.floor(jsonGoods.data.list.sJDDeductInfo / (rateObj.iPayPrice)) * (rateObj.iPayPrice);//计算最多能消耗多少q分
						jsonGoods.data.list.sJDDeductInfoNum = Math.floor(jsonGoods.data.list.sJDDeductInfo / (rateObj.iPayPrice)) * (rateObj.iJudouNum);//计算最多能消耗多少聚豆
						jsonGoods.data.list.sJDDeductInfo = parseFloat(jsonGoods.data.list.sJDDeductInfo / 100).toFixed(2); //换成元
						deferGoods.resolve(jsonGoods);
					});
				}
				else {
					deferGoods.resolve(jsonGoods);
				}
				*/
			}
		});
		thisObj._setDeferMapGoodsInfo(option.biz, option.mall_id, deferGoods);
	}

	return deferGoods;
};
ClassGoods.prototype.getLimitInfo = function (option) {
	option = $.extend({
		appid: '1005',
		iActionId: '0',
		biz: 'lol',
		propid: '',
		type: '0'
	}, option);

	var url = '//apps.game.qq.com/cgi-bin/daoju/api/hx/limit/v2/limit_goods_search.cgi?' + $.param(option);
	return deferGoods = CommTool.getScriptForPromise(url, 'limitinfo', 'ret');
/*
	var defer = $.Deferred();
	$.ajax({
		url: '//apps.game.qq.com/cgi-bin/daoju/api/hx/limit/limit_goods_search.cgi?' + $.param(option),
		dataType: 'script',
		scriptCharset: 'utf-8',
		success: function () {
			var json = window.limitinfo;
			if(json && json.ret == 0){
				defer.resolve(json);
			}else{
				defer.reject(json);
			}
		},
		error: function(){
			defer.reject();
		}
	});
	return defer;
*/
};
ClassGoods.prototype.supplierInfo = function (option) {
	option = $.extend({
		biz: CommTool.biz
	},option);
	var url = '//mall.qq.com/' + option.biz + '/time/js/supplier_info.js';
	return CommTool.getScriptForPromise(url, 'supplier_info', '');
}

ClassGoods.prototype.commentListOption={
	Act: 'list_by_goods',
	_biz_code: 'lolriotmall',
	iGoodsId: '',
	p: '1',
	ps: '10'
};
ClassGoods.prototype.getCommentList = function (option) {
	option = $.extend(this.commentListOption, option);
	var url = '//apps.game.qq.com/daoju/v3/zb/client/comment/CommentApp.php?' + $.param(option);
	return CommTool.getScriptForPromise(url, 'CommentApp', 'result');
};

/**
 * 列表页数据的下架和取货判断
 * @param {*} list
 */
ClassGoods.prototype.inteListData = function(list){
	if(list&&list.length>0){
		$.each(list,function(k,v){
			if(v.iTagId=='66'){
				v.outing = true;
			}else{
				v.outing = false;
			}

			if((parseInt(v.iTotalMallQty)<=parseInt(v.iTotalSoldNum)) && (v.iTagId=='0' || v.iTagId != '66')){
				v.pending = true;
			}else{
				v.pending = false;
			}

		});
	}

	return list;
}
/**
 * 详情页数据的下架和取货判断
 * @param {*} item
 */
ClassGoods.prototype.inteDetailData = function (item){
	if(item.iTagId == '66'){
		item.outing = true;
	}else{
		item.outing = false;
	}
	if((parseInt(item.iTotalMallQty)<=parseInt(item.iTotalSoldNum)) && (item.iTagId=='0' || item.iTagId !='66')){
		item.pending = true;
	}else{
		item.pending = false;
	}

	return item;
}
var ClassSpec = function (related) {//related是商品详情接口返回的related字段,格式为数组
/*
	if(!instanceOfGoods instanceof ClassGoods){
		throw 'ClassSpec.constructor.arguments.instanceOfGoods is not instance of ClassGoods';
		return ;
	}
*/
	var that = this;
	//this.related = {};
	this.specification = {};//规格：例如 颜色/尺寸, 目前只支持两级
	this.attribute = {};//属性： 例如 白色/黑色
	this.sku = {};
	this.skuLen = 0;
	this.goods = {};
	this.tree = {};//目前只支持两级, 树高度为3(树根+2级规格)
	this.init = function () {
		var skuTmp = {};
		related && $.each(related, function () {
			this.attr && $.each(this.attr, function () {
				var attr = this;
				that.goods[this.iMallId] || (that.goods[this.iMallId] = []);
				that.goods[this.iMallId].push(attr.sAttrValue);
				that.tree[attr.sAttrValue] || (that.tree[attr.sAttrValue] = {});


				if (!that.specification[this.sAttrName]) {
					that.specification[this.sAttrName] = {
						name: this.sAttrName,
						list: {},
						listLen: 0
					};
				}

				if (!that.specification[this.sAttrName].list[this.sAttrValue]) {
					that.specification[this.sAttrName].listLen++;
					that.specification[this.sAttrName].list[this.sAttrValue] = this;
					that.specification[this.sAttrName].list[this.sAttrValue].selected = false;//选中
					that.specification[this.sAttrName].list[this.sAttrValue].disable = false;//禁用
				}
			});
		});
		$.each(that.goods, function (goodId) {
			var attrValueArr = this;
			attrValueArr = that.sortAttr(attrValueArr);
			//attrValueArr.sort();//按编码顺序排序
			var skuCode = that.attrArr2skuCode(attrValueArr);
			that.sku[skuCode] = goodId;
			that.skuLen++;
			$.each(that.tree, function (sAttrValue) {//目前只支持两级规格，树高度为3(树根和2级规格)
				var node = this;
				if ($.inArray(sAttrValue, attrValueArr) != -1) {
					$.each(attrValueArr, function () {
						node[this] = {};
					});
				}
			});
		});
	};

	this.getSpec = function (param) {//selectedAttr为从0开始的数组, 元素为商品属性, 按排序先后权重由大到小, 在属性组合匹配不到商品时优先选中权重大的剔除权重小的, 使用时请注意排序
		var selectedAttr = [];
		if (typeof param == 'number' || typeof param == 'string') {//参数为商品id
			if (param in this.goods) {
				selectedAttr = this.goods[param];
			}
		} else {//输入参数为商品属性名称
			selectedAttr = param ? param : [];
		}
		//剔除不合理选中项
		var unionTree = selectedAttr.length ? that.tree[selectedAttr[0]] : that.tree;
		for (var i = 1; i < selectedAttr.length; i++) {
			if(that.tree[selectedAttr[i]]){
				unionTree = that.union(unionTree, that.tree[selectedAttr[i]]);
			}

		}
		if (!unionTree || $.isEmptyObject(unionTree)) {//如果selectedAttr多个选中项不能组合出商品, 则剔除权重低的选中项
			selectedAttr = [selectedAttr[0]];//目前只支持两级规格
			unionTree = that.tree[selectedAttr[0]] || {};
		}
		var spec = {};//spec是specification的副本, 保持specification的清洁
		$.each(this.specification, function (specName) {
			var tmpThis = this;
			spec[specName] = {
				name: specName,
				selected: false,
				list: {}
			};
			//spec[specName].list = $.extend({}, this.list);
			$.each(this.list, function (sAttrValue) {
				spec[specName].list[sAttrValue] = $.extend({}, this);
				if (unionTree[sAttrValue]) {
					spec[specName].list[sAttrValue].disable = false;
					if ($.inArray(sAttrValue, selectedAttr) != -1 || tmpThis.listLen == 1) {
						spec[specName].list[sAttrValue].selected = true;
						spec[specName].selected = true;
					}
				} else {
					spec[specName].list[sAttrValue].disable = true;
					spec[specName].list[sAttrValue].selected = false;
				}
			});
		});
		return spec;
	};
	this.sortAttr = function (attrValueArr) {
		var arr = [];
		$.each(attrValueArr, function (k) {//复制attrValueArr，避免sort时引用传址干扰
			arr.push(attrValueArr[k]);
		});
		arr.sort();
		return arr;
	};
	this.getGoodByAttr = function (selectedAttr) {
		selectedAttr = selectedAttr ? selectedAttr : [];
		selectedAttr = that.sortAttr(selectedAttr);
		return that.sku[this.attrArr2skuCode(selectedAttr)];
	};
	this.attrArr2skuCode = function (attrArr) {
		attrArr = that.sortAttr(attrArr);
		return attrArr.join('_');
	};
	this.skuCode2attrArr = function (skuCode) {
		return skuCode.split('_');
	};
	this.union = function (set1, set2) {
		var set_union = {};
		$.each(set1, function (i) {
			$.each(set2, function (j) {
				if (i == j) {
					set_union[i] = set2[j];
				}
			});
		});
		return set_union;
	};

	this.init();
};



/**
 * 前端日志监控组件
 * @author springswang
 * @date 2017-10-16
 */

!function (window) {
    'use strict';

    var oconsole = window.console; // 缓存原生console
    var console = {};

    // console 兼容性处理
    try {
        oconsole.log('DJR test console');

        // 控制台信息控制
        (function () {
            var names = ['log', 'info', 'warn', 'debug', 'error'];

            for (var i = 0; i < names.length; i++) {
                console[names[i]] = (function (name) {
                    return function () {
                        if (debug) {
                            oconsole[name].apply(oconsole, Array.prototype.slice.call(arguments));
                        }
                    }
                })(names[i])
            }
        })();
    } catch (e) {
        console.log = function () {};
    }

    var debug = location.href.indexOf('debug=1') > -1 ? true : document.cookie.indexOf('DJR_DEBUG=1;') > -1 ? true : false; // 调试模式，通过参数debug=1控制

    // 日志类型，错误和耗时
    var LOG_TYPE = {
        ERROR: 'err',
        COST: 'cost'
    }

    // 上报错误码
    var ERROR_CODE = {
        JS_ERROR: -103101,
        RES_ERROR: -103102,
        XHR_ERROR: -103103
    }

    var isOnLoad = true;// 刚加载的时候，默认延迟3s再上报，此就用于这个判断

    var comboTimer = null; // 合并上报定时器

    // 上报地址
    var logApi = location.protocol + "//logs.game.qq.com/daoju/go/frontreport/web";

    // 默认配置
    var config = {
        // level: 4, // 错误级别 1-debug 2-info 4-error
        ignore: [], // 忽略某个错误, 支持 Regexp 和 Function
        location: false, // 是否带上当前页面的url,单页应用需要设置为true，后台取不到hash值
        random: 1, // 抽样 (0-1] 1-全量
        delay1: 3000, // 首次上报延迟，默认3s
        delay: 1000, // 从第二次上报的延时，默认延迟1s上报, 主要是可以合并上报请求
        repeat: 5, // 重复上报次数(对于同一个错误超过多少次不上报),
        ext: '', // 扩展参数 用于自定义上报
        silent: {
            ALL: false,     // 停止所有上报
            ERR: false,     // 停止错误上报
            COST: false,    // 停止接口耗时上报
            JS_ERR: false,  // 停止JS错误上报
            RES_ERR: false, // 停止资源错误上报
            XHR_ERR: false  // 停止接口错误上报
        },
        onReport: function () {
        } // 上报回调
    };

    // 工具类库
    var util = {
        /**
         * 设置cookie
         * @param {string} sName cookie名
         * @param {string} sValue cookie值
         * @param {int} iExpireSec 失效时间（秒）
         * @param {string} sDomain 作用域
         * @param {string} sPath 作用路径
         * @param {bool} bSecure 是否加密
         * @return {void}
         */
        setCookie: function (sName, sValue, iExpireSec, sDomain, sPath, bSecure) {
            if (typeof sName == 'undefined') {
                return;
            }
            if (typeof sValue == 'undefined') {
                sValue = "";
            }

            var oCookieArray = [sName + "=" + encodeURIComponent(sValue)];
            if (!isNaN(iExpireSec)) {
                var oDate = new Date();
                oDate.setTime(oDate.getTime() + iExpireSec * 1000);
                iExpireSec == 0 ? '' : oCookieArray.push("expires=" + oDate.toGMTString());
            }
            if (sDomain != undefined) {
                oCookieArray.push("domain=" + sDomain);
            }
            if (sPath != undefined) {
                oCookieArray.push("path=" + sPath);
            }
            if (bSecure) {
                oCookieArray.push("secure");
            }
            document.cookie = oCookieArray.join("; ");
        },

        /**
         * 获取cookie
         * @param {string} sName cookie名
         * @param {string} sValue 默认值
         * @return {string} cookie值
         */
        getCookie: function (sName, sDefaultValue) {
            var sRE = "(?:; |^)" + sName + "=([^;]*);?";
            var oRE = new RegExp(sRE);

            if (oRE.test(document.cookie)) {
                return decodeURIComponent(RegExp["$1"]);
            } else {
                return sDefaultValue || null;
            }
        },

        /**
         * 读取url后面的参数
         */
        getQuery: function (pa) {
            var url = window.location.href.replace(/#+.*$/, ''),
                params = url.substring(url.indexOf("?") + 1, url.length).split("&"),
                param = {};
            for (var i = 0; i < params.length; i++) {
                var pos = params[i].indexOf('='),//查找name=value
                    key = params[i].substring(0, pos),
                    val = params[i].substring(pos + 1);//提取value
                param[key] = val;
            }
            return (typeof(param[pa]) == "undefined") ? "" : param[pa];
        },

        /**
         * 生成用户唯一id,时间戳+10位随机数
         */
        makeDeviceId: function () {
            return new Date().getTime() + '' + Math.random().toString().substr(2, 5) + '' + Math.random().toString().substr(2, 5);
        },

        /**
         * 对象合并
         * @param target 目标对象，后面需要合并的对象，支持多个，同key的情况，后面的覆盖前面的
         * @returns {*}
         */
        extend: function (target) { // .length of function is 2

            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },

        isType: function (o, type) {
            return Object.prototype.toString.call(o) === "[object " + (type || "Object") + "]";
        },

        isObj: function (obj) {
            var type = typeof obj;
            return type === "object" && !!obj;
        },

        isEmpty: function (obj) {
            if (obj === null) return true;
            if (util.isType(obj, "Number")) {
                return false;
            }
            return !obj;
        },

        /**
         * json对象转换为string
         * @param obj json数据对象
         * @returns {string}
         */
        stringify: function (obj) {
            if ("undefined" != typeof JSON) {
                return JSON.stringify(obj);
            }

            // 兼容处理JSON转换string

            // 数组转string
            if (obj instanceof Array) {
                for (var t = [], i = 0; i < obj.length; i++) {
                    t.push(stringify(obj[i]));
                }

                return "[" + t.join(",") + "]";
            }

            var n = [];
            // 对象转string
            for (var a in obj) {
                if (obj.hasOwnProperty(a)) {
                    var str = '"' + a + '":', o = obj[a];

                    if (o) {
                        "object" == typeof o ? str += stringify(o) : "number" == typeof o ? str += o : str = str + '"' + o.replace(/\n/g, "\\n") + '"';
                        n.push(str)
                    }
                }
            }

            return "{" + n.join(",") + "}";
        },

        /**
         * 解析json字符串
         * @param str json字符串
         * @returns {*} json对象或者null
         */
        parseJSON: function (str) {
            try {
                if ("undefined" != typeof JSON) {
                    return JSON.parse(obj);
                }

                return eval('(' + jsonStr + ')');
            } catch (e) {
                return null;
            }
        },

        /**
         * 加载JS文件，这边基本都是跨域的请求，很多接口都设置支持var xxx这种形式，
         * 前端基本都是用script标签方式处理的，所以为了监控这部分接口访问情况，必须要单独处理这个逻辑
         * @param url 接口地址
         * @param callback 回调函数
         * @returns {boolean}
         */
        loadScript: function (url, callback, charset) {
            var head = document.getElementsByTagName("head")[0];
            var script = document.createElement("script");
            script.type = "text/javascript";
            script.charset = typeof charset == 'undefined' ? "gb2312" : charset;
            script.src = url;

            var isImpOnLoad = ('onload' in script) ? true :
                (function(){
                    script.setAttribute('onload','');
                    return typeof script.onload == 'function' ;
                })();

            if (document.addEventListener) {
                // script 标签加载js，如果解析错误的话，只能通过window.addEventListener("error")监听到
                script.addEventListener('load', function (e) {
                    console.log('DJR load script onload', arguments);
                    // try {
                    // window.eval(e.target.innerText);
                    // Remove the script
                    if (head && script.parentNode) {
                        head.removeChild(script);
                    }
                    script = null;
                    callback && callback.call(this, e, 'success');
                    // } catch (ex) { // 这里只能监听到js本身逻辑错误，无法监听js脚本解析错误
                    //     callback && callback.call(this, ex, ex.message || 'loadScript callback error');
                    // }
                }, false);

                // 只能只能监听40X,或者50X,这个直接通过window.addEventListener捕获
                // script.addEventListener('error', function (e) {
                //     console.log('DJR load script onerror', arguments);
                //     // Remove the script
                //     if (head && script.parentNode) {
                //         head.removeChild(script);
                //     }
                //     script = null;
                //     // callback && callback(e, '40X,50X');
                // }, false);

            } else if (!isImpOnLoad){
                script.attachEvent ('onreadystatechange', function(){
                    var rs = script.readyState.toLowerCase();
                    if (rs === 'loaded' || rs === 'complete') {
                        console.log('DJR load script onload', arguments);
                        // try {
                        // window.eval(e.target.innerText);
                        // Remove the script
                        if (head && script.parentNode) {
                            head.removeChild(script);
                        }
                        script = null;
                        callback && callback.call(this, script, 'success');
                    }
                });
            } else {
                console.log('DJR 请更新浏览器');
            }

            head.appendChild(script);
            return script;
        },

        /**
         * 获取dom元素的xpath
         * @param e
         * @returns {string}
         */
        getXPath: function (e) {
            for (var t = []; e && e.nodeType == Node.ELEMENT_NODE; e = e.parentNode) {
                var r, n = 0, a = !1;
                for (r = e.previousSibling; r; r = r.previousSibling)r.nodeType != Node.DOCUMENT_TYPE_NODE && r.nodeName == e.nodeName && ++n;
                for (r = e.nextSibling; r && !a; r = r.nextSibling)r.nodeName == e.nodeName && (a = !0);
                var i = (e.prefix ? e.prefix + ":" : "") + e.localName, o = n || a ? "[" + (n + 1) + "]" : "";
                t.splice(0, 0, i + o)
            }
            return t.length ? "/" + t.join("/") : ''
        },

        /**
         * 获取dom元素的selector
         * @param e
         * @returns {string}
         */
        getSeletor: function (e) {
            for (var t = []; e.parentNode;) {
                if (e.id) {
                    t.unshift("#" + e.id);
                    break
                }
                if (e == e.ownerDocument.documentElement) t.unshift(e.tagName); else {
                    for (var r = 1, n = e; n.previousElementSibling; n = n.previousElementSibling, r++);
                    t.unshift(e.tagName + ":nth-child(" + r + ")")
                }
                e = e.parentNode
            }
            return t.join(" > ")
        },

        /**
         * 序列化JSON对象
         * 对object转化为url参数字符串，各属性间以&分隔，如a=1&b=2&c=3
         * 对象属性为string 则进行encodeURIComponent编码
         * 对象属性为bool 则以0代表false 1代表true
         * 对象属性为对象，则会继续进行递归序列化
         * 对象属性为function 则返回function.toString
         * @param {object} jsonObj json对象
         * @return {string}
         */
        serialize: function (jsonObj) {
            var newJsonObj = null;
            if (typeof(jsonObj) == 'undefined' || typeof(jsonObj) == 'function')
                newJsonObj = '';
            if (typeof(jsonObj) == 'number')
                newJsonObj = jsonObj.toString();
            if (typeof(jsonObj) == 'boolean')
                newJsonObj = (jsonObj) ? '1' : '0';
            if (typeof(jsonObj) == 'object') {
                if (!jsonObj) newJsonObj = '';
                if (jsonObj instanceof RegExp) newJsonObj = jsonObj.toString();
            }
            if (typeof(jsonObj) == 'string')
                newJsonObj = jsonObj;
            if (typeof(newJsonObj) == 'string')
                return encodeURIComponent(newJsonObj);

            var ret = [];
            if (jsonObj instanceof Array) {
                for (var i = 0; i < jsonObj.length; i++) {
                    if (typeof(jsonObj[i]) == 'undefined')    continue;
                    ret.push(typeof(jsonObj[i]) == 'object' ? '' : util.serialize(jsonObj[i]))
                }
                return ret.join('|')
            }
            else {
                for (var i in jsonObj) {
                    if (typeof(jsonObj[i]) == 'undefined')    continue;
                    newJsonObj = null;
                    if (typeof(jsonObj[i]) == 'object') {
                        if (jsonObj[i] instanceof Array) {
                            newJsonObj = jsonObj[i];
                            ret.push(i + '=' + util.serialize(newJsonObj));
                        } else {
                            ret.push(i + '=')
                        }
                    } else {
                        newJsonObj = jsonObj[i];
                        ret.push(i + '=' + util.serialize(newJsonObj));
                    }
                }
                return ret.join('&')
            }
        },
        /**
         * 反序列化为JSON对象
         * 对url参形形式的对象反序列化成为JSON对象
         * 与serialize相对应
         * @param {object} jsonObj json对象
         * @return {string}
         */
        unSerialize: function (jsonStr, de) {
            de = de || 0;
            jsonStr = jsonStr.toString();
            if (!jsonStr) return {};
            var retObj = {},
                obj1Ret = jsonStr.split('&');
            if (obj1Ret.length == 0) return retObj
            for (var i = 0; i < obj1Ret.length; i++) {
                if (!obj1Ret[i]) continue;
                var ret2 = obj1Ret[i].split('=');
                if (ret2.length >= 2) {
                    var ret0 = obj1Ret[i].substr(0, obj1Ret[i].indexOf('=')),
                        ret1 = obj1Ret[i].substr(obj1Ret[i].indexOf('=') + 1);
                    if (!ret1) ret1 = '';
                    if (ret0) retObj[ret0] = de == 0 ? decodeURIComponent(ret1) : ret1;
                }
            }
            return retObj;
        }
    }

    /**
     * 日志队列，只作为延时发送的日志的缓存，直接使用内存变量方式
     */
    var queue = {

        logs: [],

        /**
         * 增加一条日志到待发送队列
         * @param log
         */
        push: function (log) {
            return this.logs.push(log);
        },

        // 先进先出
        shift: function () {
            return this.logs.shift();
        },

        list: function () {
            return this.logs;
        },

        /**
         * 清空日志缓存
         */
        clear: function () {
            this.logs = [];
        }
    }

    /**
     * 日志上报主体方法
     */
    var logger = {

        map: {}, // 消息缓存


        init: function () {
            var that = this, onerror = window.onerror;

            // rewrite window.oerror
            window.onerror = function (msg, url, line, col, error) {
                console.log('DJR window.onerror', arguments);
                try {
                    var log = that.formatJsError(msg, url, line, col, error);

                    that.process(log);

                    onerror && onerror.apply(window, arguments);
                } catch (e) {
                }
            };

            // 监控资源错误
            window.addEventListener && window.addEventListener("error", function (e) {
                try {
                    if (e && !e.message) { // 非错误消息,一般是资源加载404这里处理，JS 错误都在onerror里处理
                        console.log('DJR window.addEventListener error', arguments);
                        that.formatResourceError(e, function (log) {
                            that.process(log);
                        });
                    }
                } catch (e) {}

            }, true)
        },


        /**
         * 提供给外部手动调用,手动配置
         * @param params
         */
        config: function (userConfig) {
            util.extend(config, userConfig);
        },

        /**
         * 读取业务代码
         */
        getBizCode: function () {
            return '';
        },

        /**
         * 读取渠道id
         * @returns {string}
         */
        getAppId: function () {
            return '';
        },

        /**
         * 获取设备唯一id
         * @returns {*|string}
         */
        getDeviceId: function () {
            var name = 'DJC_LOG_DEVICEID',
                id = util.getCookie(name);

            if (!id) {
                id = util.makeDeviceId();
                util.setCookie(name, id);
            }

            return id;
        },

        /**
         * 格式化错误对象
         * @param errObj
         * @returns {*}
         */
        formatJsError: function (msg, url, line, col, error) {
            var stack = '';

            if (error && error.stack) {
                console.log('DJR error.stack\n', error.stack);
                stack = logger.formatJsStack(error);
            }

            if (util.isType(stack, "Event")) {
                stack += stack.type ?
                    ("--" + stack.type + "--" + (stack.target ?
                        (stack.target.tagName + "::" + stack.target.src) : "")) : "";
            }

            return {
                ec: ERROR_CODE.JS_ERROR,
                msg: msg,
                target: url,
                rnum: line,
                cnum: col,
                stack: stack
            };
        },

        /**
         * 格式化堆栈信息
         * @param error
         * @returns {string}
         */
        formatJsStack: function (error) {
            var stack = error.stack
                .replace(/\n/gi, "")
                .split(/\bat\b/)
                .slice(0, 9)
                .join("@")
                .replace(/\?[^:]+/gi, "");
            var msg = error.toString();
            if (stack.indexOf(msg) < 0) {
                stack = msg + "@" + stack;
            }
            return stack;
        },

        /**
         * 格式化资源加载错误
         * @param e 错误事件
         */
        formatResourceError: function (e, callback) {
            var target = e.target ? e.target : e.srcElement,
                ohtml = target && target.outerHTML;
            ohtml && ohtml.length > 200 && (ohtml = ohtml.slice(0, 200));

            var report_log = {
                ec: ERROR_CODE.RES_ERROR,
                target: target && target.src,
                msg: '404 Not Found',
                stack: '',
                ext: {
                    outerHTML: ohtml,
                    tagName: target && target.tagName,
                    id: target && target.id,
                    className: target && target.className,
                    name: target && target.name,
                    type: target && target.type,
                    XPath: util.getXPath(target),
                    selector: util.getSeletor(target),
                    timeStamp: e.timeStamp
                }
            };
            // if (target.src !== window.location.href && (!target.src || !target.src.match(/.*\/(.*)$/) || target.src.match(/.*\/(.*)$/)[1]) && target.src && window.XMLHttpRequest) {
            //     try { // 处理自身的异常情况
            //         var xhr = new XMLHttpRequest;
            //
            //         xhr.DJ_REPORT = true;
            //         xhr.open("HEAD", target.src);
            //         xhr.send();
            //         xhr.onload = function (rsp) {
            //             if (rsp.target && 200 !== rsp.target.status) {
            //                 report_log.msg = rsp.target.status + ' ' + rsp.target.statusText;
            //                 callback && callback(report_log);
            //             }
            //         }
            //     } catch(e){ // 默认都按404处理
            callback && callback(report_log);
            // }
            // }
        },

        /**
         * 格式化上报日志数据为query参数的形式
         * @param params 参数
         */
        formatParams: function (params) {
            var tmp = [];

            params = util.extend({
                pf: 'web',
                md: LOG_TYPE.ERROR, //err or cost
                ts: new Date().getTime(),
                device: this.getDeviceId(),
                rf: encodeURIComponent(document.referrer),
                ch: encodeURIComponent(util.getQuery('ADTAG') || util.getQuery('CLICKTAG') || util.getQuery('ECODE')),
                biz: this.getBizCode(),
                app: this.getAppId(),
                ext: config.ext
            }, params);

            if (config.location) {
                params.url = location.href;
            }

            for (var name in params) {
                if (params.hasOwnProperty(name)) {
                    if (params[name]) {
                        tmp.push(name + '=' + (util.isObj(params[name], 'object') ? encodeURIComponent(util.stringify(params[name])) : params[name]));
                    }
                }
            }
            console.log('DJR report data:', params, tmp);
            return tmp.join('&');
        },

        /**
         * 错误消息是否重复了
         * @param error
         * @returns {boolean}
         */
        isRepeat: function (error) {
            var msg = error.msg,
                times = this.map[msg] = (parseInt(this.map[msg], 10) || 0) + 1;

            return config.repeat > 0 ? times > config.repeat : false; // config.repeat为0的时候不限制
        },

        /**
         * 上报主逻辑，处理日志上报
         * @param log 新增错误日志
         */
        process: function (report_log) {
            // 避免自生逻辑报错影响正常业务逻辑
            try {
                var userReport = true, data = report_log;

                // 注意后面对cost的判断，使用了end，因为本身cost数据里面也有cost字段，用来标识耗时的，冲突了，所以这里改为end结束时间来判断
                report_log = report_log.err ? report_log.err : (!report_log.ec && !report_log.end ? report_log.cost : (userReport = false, data = {}, report_log));

                // 抽样使用随机数处理
                var isCost = report_log.ec ? false : true, // 耗时统计
                    randomIgnore = Math.random() >= config.random;

                // 有效保证字符不要过长
                if (!isCost) { // 耗时日志不走下逻辑，只有错误日志才处理
                    // 重复上报
                    if (this.isRepeat(report_log)) {
                        return false;
                    }
                    // 消息超长截断
                    report_log.msg = (report_log.msg + "" || "").substr(0, 500);

                    var log_str = util.stringify(report_log);

                    console.log('DJR log_str:' ,log_str);

                    // 错误日志忽略匹配
                    if (util.isType(config.ignore, "Array")) {
                        for (var i = 0, l = config.ignore.length; i < l; i++) {
                            var rule = config.ignore[i];
                            if ((util.isType(rule, "RegExp") && rule.test(log_str)) ||
                                (util.isType(rule, "Function") && rule(log_str))) {
                                return false;
                            }
                        }
                    }
                }

                if (!randomIgnore) {

                    if (!userReport && (isOnLoad || config.delay > 0)) {

                        if (isOnLoad) {
                            // 首次上报延时标识处理
                            setTimeout(function () {
                                isOnLoad = false;
                            }, config.delay1);
                        }

                        queue.push(report_log);

                        if (!comboTimer) {
                            comboTimer = setTimeout(function () {
                                comboTimer = 0;
                                logger.batch();
                            }, isOnLoad ? config.delay1 : config.delay);
                        }
                    } else {

                        if (report_log.ec) {
                            this.submit(util.extend(data, {
                                md: LOG_TYPE.ERROR,
                                err: [report_log]
                            }));
                        } else {
                            this.submit(util.extend(data, {
                                md: LOG_TYPE.COST,
                                cost: [report_log]
                            }));
                        }
                    }

                    config.onReport && (config.onReport(report_log));
                }
            } catch (e) {
            }
        },

        /**
         * 提供给外部手动调用
         * @param params
         */
        report: function (params) {
            logger.process.call(logger, params);
        },

        /**
         * 批量上报，主要用于延时上报
         */
        batch: function () {
            var log, errs = [], tcs = [];

            while (log = queue.shift()) {
                if (log.ec) { // 错误日志
                    errs.push(log);
                } else { // 接口耗时
                    tcs.push(log);
                }
            }

            if (errs.length > 0) {
                this.submit({
                    md: LOG_TYPE.ERROR,
                    err: errs
                });
            }

            if (tcs.length > 0) {
                this.submit({
                    md: LOG_TYPE.COST,
                    cost: tcs
                });
            }
        },

        /**
         * 发送日志
         * @param t
         */
        submit: function (log) {
            var data = this.formatParams(log);

            // this.buildFrom(this.buildIFrame(), data).submit();
            // return false;
            if (data) {
                try {
                    // 存在XMLHttpRequest 直接使用它POST日志,有跨域的问题
                    if (data.length < 1000) { // 不存在就直接img标签发送请求
                        var img = new Image;

                        img.onload = img.onerror = function () {
                            img = null;
                        }

                        img.src = logApi + "?" + data;
                        console.log('DJR submit way: IMG');
                    } else {
                        if (window.XMLHttpRequest) {
                            var xhr = new XMLHttpRequest;

                            if ('withCredentials' in xhr) {
                                xhr.open("POST", logApi);

                                xhr.withCredentials = true;
                                xhr.DJ_REPORT = true;

                                xhr.send(data);
                                console.log('DJR submit way: XHR');
                            } else if (window.XDomainRequest) {
                                xhr = new XDomainRequest;
                                xhr.DJ_REPORT = true;

                                xhr.open("POST", logApi);
                                xhr.send(data);
                                console.log('DJR submit way: XDR');
                            } else {
                                this.buildFrom(this.buildIFrame(), data).submit();
                                console.log('DJR submit way: IFR');
                            }
                        }
                    }
                } catch (e) {
                }
            }
        },

        /**
         * 构建iframe
         * @returns {*}
         */
        buildIFrame: function () {
            var ifr = document.getElementsByName("djreport_iframe");

            if (ifr.length == 0) {
                var iframe = document.createElement("iframe");
                iframe.name = "djreport_iframe";
                iframe.frameborder = 0;
                iframe.height = 0;
                iframe.width = 0;
                iframe.src = "about:blank";

                document.body.appendChild(iframe);
                return iframe;
            }

            return ifr[0]
        },

        /**
         * 构建一个form表单
         * @param ifr
         * @param data
         * @returns {NodeList}
         */
        buildFrom: function (ifr, data) {
            var params = data.split('&'),
                form = document.getElementsByName("djreport_form");

            if (form.length == 0) {
                var form = document.createElement("form");
                form.name = "djreport_form";
                form.style.display = "none";
                form.target = ifr.name;
                form.method = "POST";
                form.action = logApi;
                form.enctype = 'multipart/form-data';
            } else {
                form = form[0];
            }

            for (var i = 0, len = params.length; i < len; i++) {
                var kv = params[i].split('='), input;
                console.log('DJR input', kv[0]);
                if (!form[kv[0]]) {
                    input = document.createElement("input")
                    input.type = "hidden";
                    form.appendChild(input);
                } else {
                    input = form[kv[0]];
                }
                input.name = kv[0];
                input.value = kv[1];
            }

            document.body.appendChild(form);

            return form;
        }

    }


    /**
     * 接口监控主要逻辑
     * @type {{}}
     */
    var monitor = {

        init: function () {
            this.wrapXHR();
            // this.wrapFetch();
            this.wrapScript();
        },

        /**
         * xhr封装，监控请求接口
         */
        wrapXHR: function () {
            if (window.XMLHttpRequest) {
                var XHR = XMLHttpRequest.prototype;

                if (!XHR) return false;

                var startTime, _open = XHR.open, _send = XHR.send;

                // 封装XHR的open方法，以便记录时间
                XHR.open = function (mthd, uri) {
                    this.DJR_URL = uri; // 临时存储，便于日志上报获取当前xhr的url
                    this.DJR_METHOD = mthd; // 临时存储，便于日志上报获取当前xhr的METHOD
                    this.DJR_STARTTIME = (new Date).getTime();

                    try {
                        _open.apply(this, arguments)
                    } catch (e) {
                        var logData = {
                            ec: ERROR_CODE.XHR_ERROR,
                            msg: 'XHROpenError:' + e.message,
                            target: uri,
                            method: method.toUpperCase() || 'GET '
                            // rnum: '',
                            // cnum: '',
                            // stack: ''
                        }

                        logger.process(logData);
                    }
                };

                // 封装XHR的send方法，以便记录耗时
                XHR.send = function (query) {
                    var that = this,
                        method = this.DJR_METHOD,
                        url = !!this.DJR_URL ? that.DJR_URL : !!that.responseURL ? that.responseURL : '',
                        _onreadystatechange = that.onreadystatechange;

                    // jquery的ajax请求是后设置onreadystatechange的，会覆盖这里的定义
                    // 这里用setTimeout把执行放到下一个执行切片里，已达到在jQuery设置了onreadystatechange之后再设置它
                    setTimeout(function () {
                        that.onreadystatechange = function () {
                            // 避免自生逻辑报错影响正常业务逻辑
                            try {
                                if (4 === that.readyState && !that.DJ_REPORT && url.indexOf(logApi) < 0) {
                                    var endTime = (new Date).getTime(), diffTime = endTime - that.DJR_STARTTIME;

                                    if (that.status == 200) { // 非200，走错误日志
                                        var logData = {
                                            url: url, //  detail: {method: X, url: t.responseURL || C, status: t.status, statusText: t.statusText},
                                            param: query ? query : '',
                                            start: startTime,
                                            end: endTime,
                                            cost: diffTime,
                                            method: method.toUpperCase() || 'GET'
                                        }
                                    } else {
                                        var logData = {
                                            ec: ERROR_CODE.XHR_ERROR,
                                            msg: 'XHRSendError:' + that.status,
                                            target: url + util.isType(query, 'Object') ? '?' + util.serialize(query) : util.isType(query, 'String') ? '?' + query : '',
                                            method: method.toUpperCase() || 'GET'
                                            // rnum: '',
                                            // cnum: '',
                                            // stack: ''
                                        }
                                    }
                                    // 针对浏览器abort的情况，就不上报了
                                    if(that.status != 0 ){
                                        logger.process(logData);
                                    }

                                    // f(a)
                                }
                            } catch (e) {
                            }

                            _onreadystatechange && _onreadystatechange.apply(this, arguments);
                        };
                    }, 0);

                    _send.apply(this, arguments);
                }
            }
        },

        // /**
        //  * 封装Fetch方法
        //  */
        // wrapFetch: function () {
        //     if (window.fetch) {
        //         var _fetch = window.fetch;
        //         window.fetch = function (request, params) {
        //             var startTime = (new Date).getTime();
        //
        //             return _fetch.apply(this, arguments).then(function (rsp) {
        //                 var endTime = (new Date).getTime(), diffTime =  endTime - startTime;
        //
        //                 if(rsp.status == 200){ // 非200，走错误日志
        //                     var logData = {
        //                         url: rsp.url, //  detail: {method: X, url: t.responseURL || C, status: t.status, statusText: t.statusText},
        //                         param: params.body,
        //                         start: startTime,
        //                         end: endTime,
        //                         cost: diffTime,
        //                         method: rsp.headers.method ? rsp.headers.method.toUpperCase() : 'GET'
        //                     }
        //                 } else {
        //                     var logData = {
        //                         ec: ERROR_CODE.XHR_ERROR,
        //                         msg: 'FetchError:' + rsp.status,
        //                         target: rsp.url + '?' + params.body,
        //                         method: rsp.headers.method ? rsp.headers.method.toUpperCase() : 'GET'
        //                         // rnum: '',
        //                         // cnum: '',
        //                         // stack: ''
        //                     }
        //                 }
        //
        //                 logger.process(logData);
        //             })
        //         }
        //     }
        // },

        /**
         * 封装script方式请求数据
         */
        wrapScript: function () {
            var _ajax,          // 缓存jQuery.ajax方法
                _getScript,     // 缓存jQuery.getScript方法
                _loadScript;    // 缓存milo.loader.getScript和window.getScript

            // 实现封装
            var ajaxScript = function (host, url, _callback, options) {
                var startTime = (new Date).getTime();

                try {
                    url = new URL(url, location.href).href;
                } catch (e) {

                }

                var callback = function (jqxhr, statusText) {
                    var endTime = (new Date).getTime(), diffTime = endTime - startTime;

                    if (statusText == 'success') {
                        var logData = {
                            url: url + (options && options.data ? '?'+util.serialize(options.data) : ''),
                            param: '',
                            start: startTime,
                            end: endTime,
                            cost: diffTime,
                            method: 'GET'
                        }
                        _callback && _callback(true, jqxhr, statusText);
                    } else {
                        var logData = {
                            ec: ERROR_CODE.XHR_ERROR,
                            msg: 'LoadScriptError:' + statusText,
                            target: url + (options && options.data ? '?'+util.serialize(options.data) : ''),
                            method: 'GET'
                            // rnum: '',
                            // cnum: '',
                            // stack: ''
                        }
                        _callback && _callback(false, jqxhr, statusText);
                    }
                    logger.process(logData);
                };

                if (host == 'jQuery') {

                    if (options && options.dataType && /(JSONP|SCRIPT)/gi.test(options.dataType)) { // 处理SCRIPT和JSONP

                        // jsonp的成功返回值不一样，是data，而失败返回的jqxhr，这里需要注意
                        options.success = function (data) {
                            callback(data, 'success');
                        };

                        // options.complete = function (jqxhr, statusText) {
                        //     if (statusText != 'success') {
                        //         callback(jqxhr, statusText);
                        //     }
                        // };
                    } else {
                        if(!!_callback) {
                            options= {
                                success: function (jxhr) {
                                    callback(jxhr, 'success');
                                }
                            };
                        }
                    }

                    var xhr = _getScript(util.extend({
                        type: 'get',
                        url: url,
                        dataType: 'script',
                        crossDomain: true
                    }, options || {}));

                    console.log('DJR _getScript options', options);

                    if (xhr && typeof xhr['complete'] == 'function') {  // promise样式调用兼容处理
                        var funcs = ['then', 'done', 'success', 'fail', 'error', 'complete'],
                            funcWraps = {};

                        // 封装$.getScript的promise样式的接口
                        for (var i = 0, len = funcs.length; i < len; i++) {
                            var func = funcs[i];

                            if (typeof xhr[func] == 'function') {
                                funcWraps[func] = xhr[func];

                                xhr[func] = function (xhr, func) { // 闭包保存xhr func变量
                                    return function (cb) {
                                        console.log('DJR xhr promise wrap', func, url, funcWraps[func], cb);
                                        return funcWraps[func].call(xhr, cb);
                                    }
                                }(xhr, func);
                            }
                        }
                        !_callback && funcWraps['complete'](callback);
                    }

                    return xhr;

                } else if (host == 'milo') {
                    return _loadScript(url, callback);
                }
            }

            var checkWrapTimer;

            // 定时器，检测script方法
            var checkWrap = function () {

                if (window.jQuery) {
                    // jQuery的ajax方法包壳
                    if (typeof $.ajax == 'function' && !$.__ajaxWrap__) {
                        _ajax = $.ajax;

                        $.ajax = function (url, options) {

                            options = options || {};

                            if(typeof url === "string" ){
                                options.url = url;
                            } else if ( typeof url === "object" ) {
                                options = url;
                            }

                            // Force options to be an object


                            // 处理$.ajax中dataType = SCRIPT|JSONP 的请求
                            if (options && options.dataType && /(JSONP|SCRIPT)/gi.test(options.dataType)) {
                                var _success = options.success,
                                    _error = options.error,
                                    _complete = options.complete;

                                delete options.success;
                                delete options.error;
                                delete options.complete;

                                return ajaxScript('jQuery', options.url, function (isSuccess, jqxhr, statusText) {
                                    //  ajax 总共有 error、success、complete 三个结束回调方法，都要处理
                                    if (isSuccess) {
                                        if (typeof _success == 'function') {
                                            _success(jqxhr, statusText);
                                        }
                                    } else {
                                        if (typeof _error == 'function') {
                                            _error(jqxhr, statusText);
                                        }
                                    }

                                    if (typeof _complete == 'function') {
                                        _complete(jqxhr, statusText);
                                    }
                                }, options);
                            } else {
                                return _ajax(options);
                            }
                        }

                        $.__ajaxWrap__ = true;
                    }

                    // jQuery的getScript方法包壳
                    if (typeof $.getScript == 'function' && !$.__getScriptWrap__) {
                        _getScript = _ajax;

                        $.getScript = function (url, callback) {

                            if(typeof callback == 'function'){
                                return ajaxScript('jQuery', url, callback);
                            } else { // callback 不存在的时候，调用方式是promise方式
                                return ajaxScript('jQuery', url, null);
                            }
                        }

                        $.__getScriptWrap__ = true;
                    }
                }
                // milo已经自定义的loadScript方法包壳
                if (typeof loadScript == 'function' && !window.__loadScriptWrap__) {
                    _loadScript = util.loadScript;

                    window.loadScript = function (url, callback) {
                        return ajaxScript('milo', url, callback);
                    }

                    window.__loadScriptWrap__ = true;
                }

                if ((window.$ && $.__getScriptWrap__) && window.__loadScriptWrap__) {
                    return false;
                }
                // 轮询检测
                checkWrapTimer = setTimeout(checkWrap, 100);
            }
            // 轮询15s后，取消，防止jquery是后load的，一般15s jquery 90%以上的几率都会加载完成了
            setTimeout(function () {
                clearTimeout(checkWrapTimer);
            }, 15000);

            checkWrap();
        }
    }

    logger.init();
    monitor.init();

    window.DJ_REPORT = {
        config: logger.config,
        report: logger.report
    }
    https://app.daoju.qq.com/act/a20170809lucky/index.htm?plat_support=mqq&debug=1
    DJ_REPORT.config({
        ignore: [/(src=\\"\\"|about:blank|tajs\.qq\.com|pingjs\.qq\.com|pingfore\.qq\.com|logs\.game\.qq\.com|jqmt\.qq\.com|sCloudApiName=atm)/i] // 头部的用户icon是后设置的，这个不处理
    });

    // 测试输出内部对象
    if (debug) {
        window.DJ_REPORT = util.extend(window.DJ_REPORT, {
            conf: config,
            util: util,
            logger: logger,
            monitor: monitor
        });
    }

}(window);

if ("undefined" != typeof milo) { // milo 兼容
    //TODO 后续补充milo的模块化
    // var define = typeof defineconflict == 'function' ? defineconflict : (typeof define == 'function' ? define : function () {});
    //
    // define('daoju.hx.report', [], function () {
    //     return DJ_REPORT;
    // });
} else if ("function" == typeof define) { // AMD兼容
    define(DJ_REPORT);
} else if ("undefined" != typeof module && module.exports) { // commonJS 模块兼容
    module.exports = DJ_REPORT;
}
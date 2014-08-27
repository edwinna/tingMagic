/* 
 * @Author: 12072542
 * @Date:   2014-05-04 11:56:38
 * @Last Modified by:   luoyuting
 * @Last Modified time: 2014-08-27 11:52:53
 */

(function($,window) {
    function pageShare(options) {
        var o = options;
        this.linkUrl = window.location.href;
        this.imgUrl = o.imgUrl||"";
        this.shareTitle = o.shareTitle || "";
        this.souhuTitle = o.souhuTitle || "";
        this.descContent = o.descContent || "";
        this.pict = "";
        this.appid = "";
        this._initShare();
        return this;
    }
    pageShare.prototype = {
        constructor: pageShare,
        _initShare: function() {
        	var that=this;
            // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                // 发送给好友
                WeixinJSBridge.on('menu:share:appmessage', function(argv) {
                   that._shareFriend();
                });
                // 分享到朋友圈
                WeixinJSBridge.on('menu:share:timeline', function(argv) {
                    that._shareTimeline();
                });
                // 分享到微博
                WeixinJSBridge.on('menu:share:weibo', function(argv) {
                    that._shareWeibo();
                });
            }, false);

            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                WeixinJSBridge.call('hideToolbar');
            });

           that._shareWb();
        },

        //微信分享
        _shareFriend: function() {
            var that = this;
            WeixinJSBridge.invoke('sendAppMessage', {
                "appid": that.appid,
                "img_url": that.imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": that.linkUrl,
                "desc": that.descContent,
                "title": that.shareTitle
            }, function(res) {
                //_report('send_msg', res.err_msg);
            });
        },

        _shareWeibo: function() {
            var that = this;
            WeixinJSBridge.invoke('shareWeibo', {
                "content": that.descContent,
                "url": that.linkUrl,
            }, function(res) {
                //_report('weibo', res.err_msg);
            });
        },

        _shareTimeline: function() {
            var that = this;
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": that.imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": that.linkUrl,
                "desc": that.descContent,
                "title": that.shareTitle
            }, function(res) {
                //_report('timeline', res.err_msg);
            });
        },
        _shareWb: function() {
        	var that=this;
        	 var appkey = encodeURI('65e3731f449e42a484c25c668160b355');
            var pic = ""; //encodeURI($("#picUrl").val());
            var site = encodeURI('http://www.suning.com');
            var u = 'http://v.t.qq.com/share/share.php?title=' + that.shareTitle + '&url=' + that.linkUrl + '&appkey=' + appkey + '&site=' + site + '&pic=' + that.imgUrl;

            $(".share_weibo").attr("href",'http://v.t.sina.com.cn/share/share.php?url='+that.linkUrl+'&appkey=400813291&title='+that.shareTitle+'&pic='+that.imgUrl);
            $(".share_kaixin").attr("href", 'http://www.kaixin001.com/rest/records.php?url=' + that.linkUrl + '&style=11&content=' + that.shareTitle + '&pic=' + that.imgUrl + '&stime=&sig=');
            $(".share_douban").attr("href", 'http://www.douban.com/recommend/?url=' + that.linkUrl + '&title=' + that.shareTitle + '&comment=' + encodeURI(that.shareTitle));
            $(".share_renren").attr("href", 'http://widget.renren.com/dialog/share?resourceUrl=' + that.linkUrl + '&title=' + encodeURI(that.linkUrl) + '&description=' + encodeURI(that.shareTitle));
            //$(".share_renren").attr("href", 'http://share.renren.com/share/buttonshare.do?link='+that.linkUrl+'&title='+that.shareTitle);
           
            $(".share_qqweibo").attr("href", u);
            $(".share_sohu").attr("href", 'http://t.sohu.com/third/post.jsp?&url=' + that.linkUrl + '&title=' + that.souhuTitle + '&content=utf-8&pic=' + that.imgUrl);
            var p = {
                url: that.linkUrl,
                desc: '',
                summary: '',
                title: that.shareTitle,
                site: '苏宁易购',
                pics: that.imgUrl
            };
            var s = [];
            for (var i in p) {
                s.push(i + '=' + encodeURIComponent(p[i] || ''));
            }
            $(".share_qzone").attr("href", 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + s.join('&'));
       }
   }
   window.pageShare=pageShare;
})(Zepto,window)


$(function(){
    $(".share-box").on("click",".share_weibo", function(){
            var shareThis = new pageShare({
                //分享的标题
            shareTitle:"【话筒】喊你免费领手机啦！说实话，早就想换4G手机了，体验咻咻的上网速度~~~酷派双棒T1手机苏宁易购首发，我刚去免费申请了试用资格，你也别落下！申请戳这里+链接...  ",
            imgUrl:"images/share-img.jpg"
        });   
    });
    //微信分享操作
    var shareThis = new pageShare({
        //分享的标题
        shareTitle:"4G手机免费试用，我刚申请了千元双待王——酷派双棒T1，你还不来？",
        //微信分享的内容概要
        descContent:"5.5英寸IPS全贴合高清屏、极速四核、双卡双通的千元4G手机来袭，现在申请就有机会免费获得它",
        //微信分享的缩略图的地址
        imgUrl:"images/share-img.jpg"
    });
});




/* 
* @Author: luoyuting
* @Date:   2014-08-28 09:32:33
* @Last Modified by:   luoyutin
* @Last Modified time: 2014-08-28 23:37:55
*/
define('gallery',['jquery'], function(b){
	var Ga = {
		_init: function(t){
		   this.opts = t || {};
		   this.gbox = this.opts.gallery || b(".gallery-box");  //预先定义好的图片容器
		   this.El = this.opts.El || b(".gallery-list"); //动态生成的图片列表
		   this.navEl = this.opts.navEl || b(".carousel-box");  //图片轮播的导航
		   this.capacity = this.capcity || 6;  //每一页容纳的图片张数
		   this.rotations = ['flipped-vertical-bottom','flipped-vertical-top','flipped-horizontal-left','flipped-horizontal-right'];   //动画效果列表
       this._layout();
		},
		_layout: function(){
			var t = this,
			    El = t.El,
			    gbox = t.gbox;
              for(var i = 0;i < t.capcity; i++){
      	    	var itemImg = gbox.children('li:eq('+i+')').children("img"),
      	    	itemSrc = itemImg.attr("src"),
      	    	itemAlt = itemImg.attr("alt");
      	    	var item = '<div style="background:url('+itemSrc+')"><span>'+itemAlt+'</span></div>';
      	    	El.append(item);
      	    }
            t._initCarousel();
		},
		_initCarousel: function(){
      	    var t = this,
      	        El = t.El,
      	        nav = t.navEl.find("a");
      	        nav.on("click", function(e){
                    e.preventDefault();
                    nav.removeClass("selected");
                    b(this).addClass("selected");
                    var page = b(this).index();
                    for(var i = 0;i< t.capacity ; i++){
                    	var item = El.children("div:eq(" + i + ")");
                    	var random = Math.floor(Math.random()*4);
                    	var animation = t.rotations[random];
                    	item.addClass('animated' + animation);
                    	setTimeout(function(index){
                    		var curNum = (page == 1)? index : ((page - 1)* t.capacity + index);
                    		var curImg = El.children('li:eq('+ curNum + ')').children("img");
                        var curSrc = curImg.attr('src');
                        var curAlt = curImg.attr('alt');
                        item.css({'background':'url(' + curSrc + ')'});
                        item.find('span').text(curAlt);
                    	}(i),200);
                      item.on('transitionend webkitTransitionEnd MSTransitionEnd oTransitionEnd', function(){
                         b(this).removeClass();
                      })
                    }
      	        });
		}    
	}
	return Ga;
})
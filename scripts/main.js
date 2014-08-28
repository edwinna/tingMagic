/* 
* @Author: luoyuting
* @Date:   2014-08-28 09:33:56
* @Last Modified by:   luoyutin
* @Last Modified time: 2014-08-28 23:37:41
*/
require.config({
	baseUrl: './scripts',
	paths: {
		require: 'lib/require',
		jquery: 'lib/jquery-min',
		gallery: 'gallery'
	}
}),
require(["gallery","jquery"], function(g,b){
	    var T = T || {};
        T.init = function(){
                var sHeight = b("body").height();
                var pageContent= b(".page-content");
                var content = b(".page-content .content")
                pageContent.css({"min-height":sHeight});
                b(".deploy-icon").on("click",function(){
                   pageContent.toggleClass("active");
                });
                
        },
        T.handleEvents = function(url){
            var pageContent= b(".page-content");
            var content = b(".page-content .content")
            b(".gallery").on('click', function (){
                pageContent.toggleClass("active");
                b.ajax({
                    url: url,
                    type: 'get',
                    success: function(data){
                       content.append(data);
                    }
                });
            })
        }
        g._init();
        T.init();   
        T.handleEvents('gallery.html');
       
       
       
           
})
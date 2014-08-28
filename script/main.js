/* 
* @Author: luoyuting
* @Date:   2014-08-28 09:33:56
* @Last Modified by:   luoyuting
* @Last Modified time: 2014-08-28 09:35:19
*/
require.config({
	baseUrl: './script',
	paths: {
		require: 'lib/require',
		gallery: 'gallery'
	}
}),
define("main",["gallery"],function(g){
	g.init();
})
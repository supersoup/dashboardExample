
/**
 * Created by supersoup on 16/7/29.
 */
define('core/core/a',[],function () {
    console.log('core/core/a');
});
/**
 * Created by supersoup on 16/7/29.
 */
define('core/a1',['./core/a'], function () {
});
/**
 * Created by supersoup on 16/7/29.
 */
require.config({
    baseUrl: '../script'
});

require(['core/a1'], function () {

});
define("core/main", function(){});

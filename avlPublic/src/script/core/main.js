/**
 * Created by supersoup on 16/7/29.
 */
require.config({
    baseUrl: 'script',
    paths: {
        text: "avalon.oniui/combo/text", //由于分居两个目录，因此路径都需要处理一下
        css: "avalon.oniui/combo/css",
        "css-builder": "avalon.oniui/combo/css-builder",
        "normalize": "avalon.oniui/combo/normalize",
        domReady: "avalon.oniui/combo/domReady",

        avalon: "avalon.oniui/avalon.shim",
        jquery: "other_lib/jquery"
    }
});


require([
    //'avalon',
    'main/product_list',
    'core/root',
    'avalon.oniui/dropdown/avalon.dropdown',
    'avalon.oniui/fileuploader/avalon.fileuploader',
    'avalon.oniui/checkboxlist/avalon.checkboxlist',
    'avalon.oniui/datepicker/avalon.datepicker',
    'avalon.oniui/spinner/avalon.spinner',
    'core/a1',
    'domReady!'], function () {
    var vmBase = avalon.define({
        $id: 'vmBase'
    });

    avalon.log('hello, my dashboard!');
    avalon.scan();
});
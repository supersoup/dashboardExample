/**
 * Created by supersoup on 16/8/2.
 */
define(['../function/list', '../core/root'], function (List) {
    //定义模块模块
    var pl = {};

    //定义数据模型, 所有纯属性的板块可以定义在里面.
    var model = {
        $id: 'pl',
        $skipArray: ['validation'],

        //条件
        condition: {
            c1: '123',
            c2: [1,2,3],
            c3: true,
            c4: 6,
            c5: '2016-08-05'
        },

        //验证对象1, 某操作
        validation: {
            c1: {
                name:'c1',
                required: true
            },
            c2: {
                name: 'c2',
                minSize: 2
            },
            c4: {
                name: 'c4',
                required: true,
                minValue: 5
            }
        }
    };

    model.getResult = function () {
        List.validateCondition(pl, 'validation',
            //成功执行:
            function () {
                var content = List.createReqContent(pl);
                console.log('success!');
                console.log(content);
            },
            //失败执行
            function (failObj) {
                console.log(failObj);
            })
    };


    //传入数据模型, 生成视图模型
    pl.vm = avalon.define(model);
    pl.model = model;

    //暴露模块
    return pl;
});
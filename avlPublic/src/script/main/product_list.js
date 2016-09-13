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

        //改变条件
        c6LIst: [{
            value: '',
            label: '请选择'
        }, {
            value: '2016-08-05早晨',
            label: '2016-08-05早晨'
        }, {
            value: '2016-08-05中午',
            label: '2016-08-05中午'
        }, {
            value: '2016-08-05晚上',
            label: '2016-08-05晚上'
        }],

        //选择条件
        condition: {
            c1: '123',
            c2: [],
            c3: true,
            c4: 6,
            c5: '2016-08-05',
            c6: ''
        },

        $uploader: {
            maxFileSize: 20485760,
            filePoolSize: 204857600,
            addButtonText: "添加文件",
            uploadButtonText: "上传文件",
            previewWidth: 360,
            previewHeight: 50,
            acceptFileTypes: "*",
            showProgress: true,
            enableDragDrop: true,
            serverConfig: {
                url: "/fileuploader"
            },
            onFileOverSize: function (fileObj) {
                alert(fileObj.name+"超出了文件尺寸限制")
            },
            onFilePoolOverSize: function (fileObj, poolSize) {
                alert("文件缓存池达已满，不能继续添加文件。")
            },
            onSameFileAdded: function () {
                alert("不能添加相同的文件");
            },
            onFileRequestResponsed: function(fileObj, status, res) {
                var newDetail;
                var data;
                if (status == 'OK') {
                    data = JSON.parse(res);
                    newDetail = {
                        id: data.content.id,
                        biaoti: data.content.file_name,
                        reports_type: '0',
                        reports_pro_type: '0',
                        key_words: '',
                        reports_date: '',
                        receive_user_id: '',
                        bank_name: ''
                    };

                    console.log(newDetail);
                }
            }
        }
    };

    model.getResult1 = function () {
        List.validateCondition(pl, 'validation1',
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

    model.getResult2 = function () {
        List.validateCondition(pl, 'validation2',
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

    //验证对象1, 某操作
    pl.validation1 = {
        c1: {
            name:'在操作1时c1(输入框)',
            required: true
        },
        c2: {
            name: '在操作1时c2(多选框列表)',
            minSize: 2
        },
        c4: {
            name: '在操作1时c4(数字选择器)',
            required: true,
            minValue: 5
        }
    };

    //验证对象2, 某操作
    pl.validation2 = {
        c1: {
            name:'在操作2时c1(输入框)',
            required: true,
            phone: true
        },
        c5: {
            name: '在操作2时c5(时间)',
            required: true,
            date: true
        },
        c6: {
            name: '在操作2时c6(下拉框)',
            required: true
        }
    };

    //监控属性
    pl.vm.condition.$watch('c5', function (o, n) {
        var newArr = [{
            value: '',
            label: '请选择'
        }];
        avalon.log(o);
        avalon.log(n);
        newArr.push({
            value: n + '上午',
            label: n + '上午'
        });
        newArr.push({
            value: n + '中午',
            label: n + '中午'
        });
        newArr.push({
            value: n + '晚上',
            label: n + '晚上'
        });

        pl.vm.c6LIst.clear();
        pl.vm.c6LIst = newArr;
    });

    //暴露模块
    return pl;
});
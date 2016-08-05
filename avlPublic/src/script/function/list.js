/**
 * Created by supersoup on 16/8/2.
 */
define(['jquery', 'avalon'], function ($, avalon) {

    /*
    * 验证条件对象, 每个属性都是一个函数
    * @param1: vm上的值
    * @param2: 验证值
    * @return: obj.flag是否通过验证, obj.message提示
    * */
    var validFuncMap = {
        //必填
        required: function (val, demand) {
            return {
                flag: val !== '',
                message: '不能为空'
            };
        },

        //合格的电话号码
        phone: function (val, demand) {
            var rxp = /1[\d]{10}/;
            return {
                flag: rxp.test(val),
                message: '需要为11位数字'
            };
        },

        //日期格式
        date: function (val, demand) {
            var rxp = /[\d]{4}-[\d]{2}-[\d]{2}]/;
            return {
                flag: rxp.test(val),
                message: '格式需要为"XXXX-XX-XX"的形式'
            }
        },

        //最小值
        minValue: function (val, demand) {
            return {
                flag: val >= demand,
                message: '不能小于' + demand
            }
        },

        //最大值
        maxValue: function (val, demand) {
            return {
                flag: val <= demand,
                message: '不能大于' + demand
            }
        },

        //数组最小长度
        minSize: function (val, demand) {
            return {
                flag: val.size() >= demand,
                message: '长度不能小于' + demand
            }
        },

        //数组最大长度
        maxSize: function (val, demand) {
            return {
                flag: val.size() <= demand,
                message: '长度不能大于' + demand
            }
        }
    };

    /*
    * 验证某个属性是否它的一系列要求
    * @param1: str验证对象的其中一个属性的键名
    * @param2: obj验证对象的其中一个属性的值
    * @param3: str/number/arr该属性的值
    * @return: obj该属性的验证结果 obj.flag验证是否合格 obj.message不合格的提示
    * */
    function validateConditionItem(key, validItem, val) {

        //验证情况对象, 将记录该属性是否验证成功back.flag以及失败提示back.message
        var back;

        for (var key in validItem) {
            if (key !== 'name') {

                //validFuncMap上的属性 和 validate上的属性要对应.
                if (!validFuncMap[key]) {
                    avalon.log('supersoup: 注意, 没有定义该项验证方法!');
                } else {
                    back = validFuncMap[key](val, validItem[key]);
                }

                //如果该属性的该验证项目范围值为false, 则返回该项目的验证情况对象
                if (!back.flag) {
                    return back;
                }
            }
        }

        return {flag: true};
    }

    /*
    * 验证条件
    * @param1: obj模块对象
    * @param2: str验证对象的键名,
    * @param2: func成功后的回调函数
    * @param3: func失败后的回调函数, 该方法将被传入一个参数failObj: failObj.name名称, failObj.message验证提示信息
    * */
    function validateCondition(main, validObjName, successCallback, failCallback) {
        var vm = main.vm;
        var condition = vm.condition;
        var back;
        var validObj = vm[validObjName];
        for (var key in validObj) {
            back = validateConditionItem(key, validObj[key], condition[key]);

            //如果该属性的返回值的flag为false, 则执行验证失败回调, 并提前终止验证
            if (!back.flag) {
                failCallback({
                    name: validObj[key].name,
                    message: back.message
                });
                return;
            }
        }

        //所有属性遍历完成后没有一个的返回值flag为false, 则执行验证成功后的回调.
        successCallback();
    }

    /*
     * 生成全部转化为字符串的ajax条件
     * @param: obj模块对象
     * @return: obj条件对象
     * */
    function createReqContent(main) {
        var vm = main.vm;
        var content = {};
        $.each(main.model.condition, function (key, val) {
            if (key) {
                content[key] = vm.condition[key].toString();
            }
        });
        return content;
    }

    return {
        validateCondition: validateCondition,
        createReqContent: createReqContent
    }
});
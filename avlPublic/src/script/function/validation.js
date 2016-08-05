/**
 * Created by supersoup on 16/8/2.
 */
define(['jquery'], function ($) {
    function getValidation(condition, validationKey, validationVal) {
        if (validationVal === 'required') {
            if (condition[validationKey] !== '') {

                //不符合条件, 则返回相应的

                return {
                    flag: '0',
                    message: '条件不能为空, 并且'
                }
            }
        }
    }


    return {

    }
});
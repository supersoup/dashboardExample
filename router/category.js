/**
 * Created by supersoup on 16/7/31.
 */
//获取查询数据库的方法
var query = require('../db/connect').query;

//获取列表
var getList = function (req, res) {
    var sql = 'select * from category';
    query(sql, function (rows) {
        res.json(rows);
    })
};

module.exports = {
    getList: getList
};
/**
 * Created by supersoup on 16/7/31.
 */
var mysql = require('mysql');
//建立连接池
var pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'avalondb'
});


function query(sql, fn, res) {
    //获取连接
    pool.getConnection(function (err, connection) {
        //获取连接后, 调用该连接进行查询
        connection.query(sql, function (err, rows) {
            if (err) {
                console.log(err);
                res.type('text/plain');
                res.json(404, {error: 1, message: '数据库查询错误'});
            } else {
                fn(rows);
            }
            //查询并对结果处理完成之后, 释放掉查询
            connection.release();
        })
    });
}

module.exports = {
    query: query
};
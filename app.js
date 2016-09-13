
var express = require('express');
var category = require('./router/category');
var entrepot = require('./router/entrepot');
var sku = require('./router/sku');

//实例化app
var app = express();

//端口
app.set('port', 3000);


app.post('/fileuploader', function (req, res) {
   res.json({

   });
});

//默认返回首页
app.get('/', function (req, res) {
    res.render('index.jade');
});

app.get('/style', function (req, res) {
    res.render('styleExample.jade');
});

app.get('/category/list', category.getList);

//静态文件服务
app.use(express.static(__dirname + '/avlPublic/dest'));

//500
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - 服务器错误');
});

//404
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - 请求未找到');
});

//启动服务器, 监听制定端口
app.listen(app.get('port'), function () {
    console.log('Hello, welcome to use my dashboard. Customers can visit us on http://localhost:' + app.get('port'));
});

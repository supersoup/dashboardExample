
var express = require('express');

var app = express();

//端口
app.set('port', 3000);

//静态文件服务
app.use(express.static(__dirname + '/public'));

//404
app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

//500
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function () {
    console.log('Hello, welcome to use my dashboard. Customers can visit us on http://localhost:' + app.get('port'));
});

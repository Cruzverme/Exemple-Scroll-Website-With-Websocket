
var express = require("express");
var app = express();
var server = require('http').createServer(app)
var io = require('socket.io').listen(server);


app.set('view engine', 'jade');

app.set('view options', {
    layout:false
});

app.get('/panel/:key', function (req, res) {
    console.log("entrei no mobile")
    var key = req.params.key;
    console.log(key);
    res.render('mobile.jade', {key:key});
});

app.get('/action/:key/:y/:action', function (req, res) {
    console.log("Posso girar =D")
    var key = req.params.key;
    var y = req.params.y;
    var action = req.params.action;
    sockets[key].emit('scrollTo', {y:y, action:action});
    res.send('OK');
});

server.listen(3000,function(){
    console.log("SocketIO e Express Fufnando =D");
});

var sockets = {};
io.sockets.on('connection', function (socket) {
    console.log("Conectei");
    socket.on('setKey', function (key) {
        sockets[key] = socket;
    });
});
var app = require('koa')();
var serve = require('koa-static');
const IO = require('koa-socket');

const io = new IO();

const PORT = 8000;
const IP = '127.0.0.1';

app.use(serve('./'));

var server = require('http').Server(app.callback());
io = require('socket.io')(server);


// оброботка события подключения, или отключения от сокета
io.on('connection', function(socket){
  console.log('a user connected');
   socket.on('disconnect', function(){
    console.log('user disconnected');
  });

});

// вывод входящих сообщений на консоль
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

// отправка методом emit входящих сообщений назад
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});


server.listen(PORT, IP);

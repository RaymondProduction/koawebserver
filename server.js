// модуль для цвета
var colors = require('colors');
// модуль для роботы с ip адресами
var ip = require('ip');
// web framework for node.js
var app = require('koa')();
// определим номер порта, чере ключ в командной строке
var port = parametr('--port');

//  если порта нет то используем по умолчянию 8080
if (port) {
  server = app.listen(Number(port));
} else {
  server = app.listen(8080);
}

// это важно! подключаем сокет к серверу
// сокет - розетка, модуль для мгновенной
// передачи данных
var io = require('socket.io').listen(server);

// модуль для роботы с файловой системной
// так как сервер будет использовать файлы
var fs = require('fs');
// используем модуль path для роботы
// с путями к файлам
var path = require('path');

var buf; // буфер байт из файла
var str; // строка из файла
var rootDir = parametr('--directory'); // определим корневую папку
// контекстный массив для определения основных
// типов файлов
var staticContent = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/plain',
  '.jpg': 'image/jpg',
  '.png': 'image/png'
};

// Вывод в консоль уведомления о запуске сервера и ip веб сервера
console.log('Start Web Server'.green.bold,' Local ip address is '.cyan,ip.address().cyan);

app.use(function*(next) {
  yield next;
  var url = this.url;
  console.log('GET => '.magenta, url, '\tContent type: '.yellow, staticContent[path.extname(url)]);
  if (url == '/') {
    url = '/index.html';
  }
  this.type = staticContent[path.extname(url)];
  if (fs.existsSync(rootDir + url)) {
    buf = fs.readFileSync(rootDir + url);
    // str = buf.toString();
    str = buf;
  } else {
    console.log('Not found'.red);
    str='Not found :(';
  }

  this.body = str;
});



io.on('join', function*() {
  console.log('join event fired', this.data)
})

// оброботка события подключения, или отключения от сокета
io.on('connection', function(socket) {
  console.log('Socket=>'.blue, ' a user connected');
  socket.on('disconnect', function() {
    console.log('Socket=>'.blue, ' user disconnected');
  });

});

// вывод входящих сообщений на консоль
io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    console.log('Socket=>'.blue, ' message: ' + msg);
  });
});

// отправка методом emit входящих сообщений назад
io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
});



function parametr(par) {
  var res;
  process.argv.forEach(function(item, i, arr) {
    if (par == item) {
      res = process.argv[i + 1];
    }
  });
  return res;
}

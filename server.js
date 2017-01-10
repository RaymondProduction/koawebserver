var koa = require('koa');
var app = koa();
var fs = require('fs');
var path = require('path');
var port = process.argv[2];
var buf;
var str;
var rootDir="/home/raymond/Документы/Raymond/My Work/Project/public";
var staticContent = {'.html' : 'text/html; charset=utf-8',
                     '.css'  : 'text/css; charset=utf-8',
                     '.js'   : 'text/plain',
                     '.jpg'  : 'image/jpg',
                     '.png'  : 'image/png'
                    };

console.log('Start Web Server');

app.use(function *(next){
  yield next;
  var url = this.url;
  console.log('GET => ',url);
  if (url=='/') {url='/index.html';}
  this.type = staticContent[path.extname(url)];
  buf = fs.readFileSync(rootDir+url);
  str = buf.toString();
  this.body = str;
});

if (port) {app.listen(Number(port));}
else      {app.listen(8080);}

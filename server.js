var koa = require('koa');
var app = koa();
var fs = require('fs');
var path = require('path');
var port = parametr('--port');
var buf;
var str;
var rootDir= parametr('--directory');
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
  console.log('GET => ',url,'\tContent type: ',staticContent[path.extname(url)]);
  if (url=='/') {url='/index.html';}
  this.type = staticContent[path.extname(url)];
  buf = fs.readFileSync(rootDir+url);
 // str = buf.toString();
  str = buf;
  this.body = str;
});

if (port) {app.listen(Number(port));}
else      {app.listen(8080);}


function parametr(par){
  var res;
  process.argv.forEach(function(item, i, arr) {
     if (par==item) {
           res =  process.argv[i+1];
     }
  }); 
  return res;
}

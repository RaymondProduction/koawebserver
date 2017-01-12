function parametr(par){
  var res;
  process.argv.forEach(function(item, i, arr) {
     if (par==item) {
           res =  process.argv[i+1];
     }
  }); 
  return res;
}

console.log(parametr("t"));


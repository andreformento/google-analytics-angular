var express = require('express');
var app = express();
console.log("aaaaaaaaaaaaaaaaaaaaaa");
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.redirect('/index.html');
});

app.listen(80);

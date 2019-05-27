// import express
var express = require('express'),
    app = express();
    mysql = require('mysql');



app.use(express.static('public'));
app.set('view engine', 'ejs');

// debug here
app.get('/', function(req, res){
  res.render('ContactPage');
});

app.get('/product', function(req, res){
  res.render('productPage')
});

app.get('/login', function(req, res){
  res.render('login');
});

app.get('/test', function(req, res){
  res.render('test');
});

// start server here
app.listen(3000, 'localhost', function(){
  console.log('Server start!');
});

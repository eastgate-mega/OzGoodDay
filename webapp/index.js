// import express
var express = require('express');
var app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

// contactpage
app.get('/', function(req, res){
  res.render('ContactPage.ejs');
});

// start server here
app.listen(3000, 'localhost', function(){
  console.log('Server start!');
});
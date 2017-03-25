var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');

//var uuid=require('node-uuid');
var port=2200;
var connection = require('./database/a').connection;
var router=express.Router();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
router.get('/',function(req,res){
 res.render('index');
 
});
router.post('/entry',function(req,res){
  var c1=req.body.n1;
  var  c2=req.body.n2;
  var  c3=req.body.n3;
  var x={
    billid:c1,
    name:c2,
    amount:c3
  }
connection.query('insert into vendor set ?',x,function(err,data){
              if(err){
                res.send(err);
              }else{
                res.send('Bill  added');
              }
              
});

});
app.use('/', router);
console.log("server running on"+port);
app.listen(port);
module.exports=app;
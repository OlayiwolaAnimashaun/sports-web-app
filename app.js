var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



// catch 404 and forward to error handler
// Login
app.post('/login',function(req,res){

	var username=req.body.usernameLogin; //get the username
  var password=req.body.passwordLogin; // get the password

	console.log("Username = "+username);
  console.log("Password = "+password);
      // connect to the db
     var mysql = require('mysql')

    var connection = mysql.createConnection({

      host     : 'localhost',
      port     :3308,
      user     : 'root',
      password : '',
      database : 'justeat',

    });

    connection.connect()
    var sql = "SELECT * from users where username = '"+username+"' and password = '"+password+"' LIMIT 1;";

    console.log(sql);
    connection.query(sql, function (err, rows, fields) {

      if (err) throw err
      for(var i=0; i< rows.length; i++){
           res.send(rows[i].acctype) // send it back to the caller
      }
    })
connection.end()

  });

// Regester
app.post('/registeration',function(req,res){

	var us=req.body.username; //get the username
  var pass=req.body.password; // get the password
  var em = req.body.email; 
  var acc = req.body.acctype; 
  var add = req.body.address; 
	console.log("Username ="+us);
  console.log("Password ="+pass);
  console.log("Email ="+em);
  console.log("Acctype ="+acc);
  console.log("Address="+add);
   
  res.send("new account"); 
  var mysql = require('mysql')
  var connection = mysql.createConnection({

    host     : 'localhost',
    port     :3308,
    user     : 'root',
    password : '',
    database : 'justeat',
});
connection.connect()

connection.query("INSERT INTO users (username,password,email,acctype,address) VALUES ('"+us+"','"+pass+"','"+em+"','"+acc+"','"+add+"')");

connection.end()
});
// error handler
app.post('/cook',function(req,res){


   var productn=req.body.productname;
   var qty =req.body.quantity;

  console.log("Product ="+productn);
  console.log("Qty ="+qty);
   
  res.send("new account"); 
  var mysql = require('mysql')
  var connection = mysql.createConnection({

    host     : 'localhost',
    port     :3308,
    user     : 'root',
    password : '',
    database : 'justeat',
});
connection.connect()

connection.query("INSERT INTO product (productname, quantity) VALUES ('"+productn+"','"+qty+"')");


connection.end()
});
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
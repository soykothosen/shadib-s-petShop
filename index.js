var express = require('express');
var bodyParser = require('body-parser');
var mysql = require("mysql");


var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine','ejs');
app.use(express.static('public'));


var db = mysql.createConnection({
    host    : 'localhost',
    user     : 'root',
    password : '',
    database : 'petshop'
  });
  
  db.connect(function(err){
      if(err){
          throw err;
      }
      console.log("Database is connected");
  });


app.get('/', function(req,res){


    res.render('Home.ejs',{loged: 0});

});

app.get('/login', function(req,res){


    res.render('login.ejs',{});

});


app.get('/registration', function(req,res){


    res.render('Reg.ejs',{});

});

app.post('/registration', function(req,res){

    let username = req.body.username;
    let email = req.body.emailaddress;
    let password = req.body.userpass;

    console.log(username);
    console.log(email);
    console.log(password);




    db.query("SELECT * FROM `user_information` WHERE username = ? ;",[username],function(error,results){

        if(error){
            throw error
        } else{
            console.log(results.length);

            if(results.length == 0){

                db.query("INSERT INTO `user_information`(`username`, `email`, `password`) VALUES (?,?,?)",[username,email,password],function(err, result){

                    if(err){
                        throw err;
                    } else{
                        res.render('Home.ejs',{loged: 1, username: username});
                    }



                });

            } else{
                res.send("Username already Exist");
            }

        }

    });


    //res.render('login.ejs',{});


});


app.post('/login', function(req,res){

    let username = req.body.username;
    let email = req.body.emailaddress;
    let password = req.body.userpass;

    console.log(username);
    console.log(email);
    console.log(password);

    db.query("SELECT * FROM `user_information` WHERE username = ? ;",[username],function(err, results, fields){
        if(err){
          throw err;
        } else{
            console.log(results);

            if(email == results[0].email){

                if(password == results[0].password){
                    res.render('Home.ejs',{loged: 1, username: results[0].username});
                } else{
                    res.send("Wrong Password");
                }

            } else{
                res.send("Wrong Email Address");
            }

        }

    });

        


   //res.send("Log In Successful");


});



app.listen('8081', function(err){
	if(err){
		throw err;
	} else{
	console.log("Server run on port 8081");
    }
});
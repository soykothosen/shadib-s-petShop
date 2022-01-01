var express = require('express');
var bodyParser = require('body-parser');


var app = express();

app.use(bodyParser.urlencoded({ extended: true}));
app.set('view engine','ejs');
app.use(express.static('public'))


app.get('/', function(req,res){


    res.render('Home',{});

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


    res.render('login.ejs',{});


});


app.post('/login', function(req,res){

    let username = req.body.username;
    let email = req.body.emailaddress;
    let password = req.body.userpass;

    console.log(username);
    console.log(email);
    console.log(password);


   res.send("Log In Successful");


});



app.listen('8081', function(err){
	if(err){
		throw err;
	} else{
	console.log("Server run on port 8081");
    }
});
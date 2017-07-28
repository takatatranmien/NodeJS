var express = require("express");
var app = express();
app.listen(3000);

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

//cau hinh ejs
app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/khoapham", function(req, res){
  res.render("khoapham");
})

app.get("/chitiet", function (req, res) {
  res.render("chitiet", {name : "TRAN HUU MIEN"});
});
app.get("/namsinh", function (req, res) {
  res.render("namsinh", {namsinh : [1987, 1988, 1989, 1990]});
});


app.get("/hello", function (req, res) {
    res.send("<font color=red> GETTING Hello Mien </font>");
});

//usernam password
app.post("/hello", urlencodedParser, function (req, res) {
  var u = req.body.username;
  var p = req.body.password;
  res.send("Username: "+u+" Password: "+p);
});


app.get("/tintuc/:id", function(req, res){
  var i= req.params.id;
  res.send("Server have id = "+i);
})

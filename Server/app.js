var express= require("express");
var app = express();
var server = require("http").createServer(app);
server.listen(3000);

app.get("/", function(req, res){
	//res.send("<font color=red>HELLO WORLD</font>");

	res.sendFile(__dirname+"/index.html");
})

app.get("/gioithieu.aspx", function(req, res){

	res.send("<font color=blue>I'm gioithieu.aspx page</font>");
})

app.get("/total/:no1/:no2", function(req, res){
	var n = req.params.no1;
	var m = req.params.no2;
	n= parseInt(n); m=parseInt(m);
	
	var tong = n+m;
	res.send("<h1>"+ tong +"</h1>");
});
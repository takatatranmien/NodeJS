var http=require("http");
var fs = require("fs");

http.createServer(function(req, res){
	res.writeHead(200, {"Content-Type":"text/html"});
	
	//var data=fs.readFileSync(__dirname + "/index.html", "utf-8");
	//data= data.replace("NAME", "Khoa Pham");
	//res.end(data);

	//fs.createReadStream(__dirname+"/index.html").pipe(res);

	res.writeHead(200, {"Content-Type":"application/json"});

	var obj ={
		ho:"Tran",
		ten:"Mien",
		namsinh:1987
	};
	res.end(JSON.stringify(obj));

}).listen(7777);
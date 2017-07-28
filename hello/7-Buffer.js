var fs = require("fs");
var noidung = fs.readFileSync(__dirname+"/danhsach.txt");
console.log(noidung);
console.log(noidung.toString());

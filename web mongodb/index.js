var express = require('express');
var app = express();
app.listen(3000);

app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.sendFile(__dirname+"/Index.html");
})

app.set('view engine','ejs');
app.set('views', './views');
var bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

var multer= require("multer");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cookies');
var dbMongo = mongoose.connection;
dbMongo.on('err', console.error.bind(console,'connect err'))
dbMongo.once('open',function(){
  console.log('Mongodb connect Successfull')
})

var Schema = new mongoose.Schema({
  type : String,
  banh: [{
    name:String,
    image:String,
    mota:String
  }]
});
var product = mongoose.model('sanpham', Schema);
var storage = multer.diskStorage({
  destination : function(req, file, cb){
    cb(null, './public/upload')
  },
  filename: function (req, file, cb) {
    cb(false, file.originalname)
  }
});
var upload = multer({
  storage: storage
}).single('file')

app.post('/product_type',urlencodedParser, function (req, res) {
  upload(req,res, function (err) {
    if(err){
      console.log(err);
      res.send('upload filed !!!')
    }else {
      console.log(req.file);
      var sp = {"name": req.body.ten, "image":req.file.originalname, "mota":req.body.mota};
      product.findOneAndUpdate({type:req.body.loai},{$push:{banh:sp}},function(err,result){
        console.log(result)
      });
      res.render('types')
    }
  })
});
app.get('/upload', function (req,res) {
  res.render('form')
})


app.get('/cupcakes', function (req, res) {
  var array=[];
  product.find({type:"cupcakes"}, function (err, result) {
    result.forEach(function(sp){
      array = sp.banh;
    })
    console.log(array)
    res.render('sp', {array})
  })
})

app.get('/cakes', function (req, res) {
  var array=[];
  product.find({type:"cakes"}, function (err, result) {
    result.forEach(function(sp){
      array = sp.banh;
    })
    console.log(array)
    res.render('sp',{array})
  })
})
app.get('/macarons', function (req, res) {
  var array=[];
  product.find({type:"macarons"}, function (err, result) {
    result.forEach(function(sp){
      array = sp.banh;
    })
    console.log(array)
    res.render('sp',{array})
  })
})
app.get('/cookies', function (req, res) {
  var array=[];
  product.find({type:"cookies"}, function (err, result) {
    result.forEach(function(sp){
      array = sp.banh;
    })
    console.log(array)
    res.render('sp',{array})
  })
})
app.get('/product_type', function (req, res) {
  res.render('types')
})

app.use(express.static("public"));

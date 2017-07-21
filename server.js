var express = require('express');
var app = express();
app.listen(3000);



app.get("/blog", function (req, res) {
  res.sendFile(__dirname+"/Blog.html");
});
app.get("/login", function (req, res) {
  res.sendFile(__dirname+"/LoginForm.html");
});
app.get("/signup", function (req, res) {  
  res.sendFile(__dirname+"/SignUpForm.html");
});

app.set('view engine','ejs');
app.set('views', './views');

var bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended:false});

var multer= require("multer");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/hana');
var dbMongo = mongoose.connection;
dbMongo.on('err', console.error.bind(console,'connect err'))
dbMongo.once('open',function(){
  console.log('Mongodb connect Successfull')
})

var Schema = new mongoose.Schema({
  title : String,
  Order: [{
    prd_id: String,
    name: String,
    image: String,
    description: String,
    price: Number,
    stock: Number
  }]
});
var product = mongoose.model('flower', Schema);
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
      //console.log(req.file);
      console.log("title", req.body.title);
      var sp = {"prd_id":req.body.id, "name": req.body.name, "image":req.file.originalname, "description":req.body.description, "price": req.body.price, "stock": req.body.stock};
      product.findOneAndUpdate({title:req.body.title},{$push:{"Order":sp}},function(err,result){
      });
      res.render('types')
    }
  })
});

app.get('/index', function (req, res) {
  res.render('index');
})

app.get('/index2', function (req, res) {
  var array=[];
  product.find({}, function (err, result) {

    result.forEach(function(sp){
      sp.Order.forEach(function(order){
        array.push(order);
      })
    })
    res.render('index2',{array})
  })
})

app.get('/upload', function (req,res) {
  res.render('form')
})

app.get('/rose', function (req, res) {
  var array=[];
  product.find({title:"rose"}, function (err, result) {
    result.forEach(function(sp){
      array = sp.Order;
    })
    res.render('sp', {array})
  })
})

app.get('/rose2', function (req, res) {
  var array=[];
  product.find({title:"rose2"}, function (err, result) {
    result.forEach(function(sp){
      array = sp.Order;
    })
    res.render('sp', {array})
  })
})

app.get('/carnation', function (req, res) {
  var array=[];
  product.find({title:"carnation"}, function (err, result) {
    result.forEach(function(sp){
      array = sp.Order;
    })
    res.render('sp',{array})
  })
})
app.get('/gerbera', function (req, res) {
  var array=[];
  product.find({title:"gerbera"}, function (err, result) {
    result.forEach(function(sp){
      array = sp.Order;
    })
    res.render('sp',{array})
  })
})
app.get('/lily', function (req, res) {
  var array=[];
  product.find({title:"lily"}, function (err, result) {
    result.forEach(function(sp){
      array = sp.Order;
    })
    res.render('sp',{array})
  })
})

app.get('/', function (req, res) {
  var array=[];
  product.find({}, function (err, result) {

    result.forEach(function(sp){
      sp.Order.forEach(function(order){
        array.push(order);
      })
    })
    res.render('index',{array})
  })
})

app.get('/cart', function (req, res) {
  var array=[];
  product.find({}, function (err, result) {
    result.forEach(function(sp){
      sp.Order.forEach(function(order){
        array.push(order);
      })
    })
    res.render('cart',{array})
  })
})


app.get('/product_type', function (req, res) {
  res.render('types')
})

app.get('/delDocument/:id', function(req, res) {
  var id = req.params['id']; 
  res.send(' Remove Successfull '); 
  product.remove({"Order.price" :id}, function(err, result){
    if (!err) {
     console.log('Remove Successfull!');
   }else{
    console.log("error");
  }
})
});

app.use(express.static(__dirname));
app.use(express.static("public"));
app.use(express.static("プレゼン"));



//DELETE document with id !
/*app.get('/delDocument/:id', function(req, res){
  var id = req.params['id'];
  res.send('The id is ' + id); 
  product.remove({"Order.prd_id" :id}, function(err, result){
    if (!err) {
     console.log('Remove Successfull!');
   }else{
    console.log("error");
  }
})
})*/

//DELETE document with title !
/*app.get('/delDocument/:title', function(req, res){
  var title = req.params['title'];
  res.send('The title is ' + title); 
  res.send(' Remove Successfull! '); 
  product.remove({"title" :title}, function(err, result){
    if (!err) {
     console.log('Remove Successfull!');
   }else{
    console.log("error");
  }
})
})
*/


//Create document
/*var todo = new product({title: 'rose2', Order:[{prd_id:'RR01', name:'ddddd', image:'613_thumbnail.jpg', description:'fff', price: '10000', stock:'100'}]})
//Save it to database
todo.save(function(err){
  if(err)
    console.log(err);
  else{
    console.log(todo);
    console.log("Create document Successfull")
  }
});*/


//Todo.findOneAndUpdate({name: /JS$/ }, {completed: false}, callback);
/*app.get('/updateDocument/:name', function(req, res){
  var name = req.params['name'];
  
  product.findOneAndUpdate({name: name }, function(err){
    if(err)
      console.log(err);
    else
      console.log('Update Successfull');
    res.send('Update Successfull with name' + name); 
  });
})*/


/*app.get('/delDocument/:id', function(req, res){
  var id = req.params['id'];
  res.send('The id is ' + id); 
  product.find({"Order.prd_id" :id}).remove(function(err, result){
    if (!err) {
     console.log('notification!');
    }else{
      console.log("error");
    }
  })
})*/

/*app.get('/delDocument/:id', function(req, res){
  console.log("delDocument");
  var id = req.params['id'];
  var array=[];
  product.findOne({ "Order.prd_id" : id }, function (err, result) {
    console.log(result.Order);
  });

  product.findOneAndUpdate({ "Order.prd_id" : id }, { $pull : { "Order" : { "prd_id" : id } } }, function (err, result) {
 
    result.forEach(function(sp){
      result.Order.forEach(function(order){
        array.push(order);
      })
    })
    res.render('sp', array);
  });

  res.send("ok");

    // product.find({}, function(err, result){
    //   result.forEach(function(sp){
    //     sp.Order.forEach(function(order){
    //       array.push(order);
    //     })
    //   })
    // });
    // res.render('sp', array);
})
*/
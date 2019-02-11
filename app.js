var express=require("express");
var app=express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//const index=require("./model/index");
app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


mongoose.connect("mongodb://localhost:27017/node-blog", { useNewUrlParser: true } );
var postSchema = new mongoose.Schema({
    body: String,
});
var Post = mongoose.model('Post', postSchema);



app.get("/", (req, res) => {
    Post.find({}, (err, posts) => {
        res.render('index', { posts: posts});
    });
});

app.post("/addpost",(req,res)=>{
    var postData = new Post(req.body);
    postData.save().then(()=>{
        console.log("data saving....")
    });
    //res.send(postData);
    res.redirect("/");
});


app.listen(3000, () => {
    console.log('Server listing on 3000');
});
var express = require('express');
var path = require("path");
var bodyParser = require("body-parser");
var mongo = require("mongoose");

//Connect with mongoDB server
var db = mongo.connect("mongodb://localhost:27017/Node-CURD",function(err, response){
    if(err) {
        console.log(err);
    }
    else {
        console.log('connected to ' + db, ' + ', response);
    }
})


var app = express();
//Use middleware
app.use(bodyParser());
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({extended:true}));
//Set HPPT Header
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-with, content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
//Use MongoDB schema
var Schema = mongo.Schema;
var UsersSchema = new Schema({
    firstname: {type: String},
    lastname: {type: String},
    designation: {type: String},
    salary: {type:String}
},{
    versionKey:false
});
//Use user model
var model = mongo.model('users', UsersSchema, 'users');
//Define api/SaveUser router
app.post("/api/SaveUser", function(req,res){
    var mod = new model(req.body);
    mod.save(function(err,data){
        if(err){
            res.send(err);
        }
        else {
            res.send({data: "Record has been Inserted .."});
        }
    })
})
//Define /api/UpdateUser router
app.post("/api/UpdateUser", function(req,res){
    var mod = new model(req.body);
    model.findByIdAndUpdate(req.body._id, {firstname: req.body.firstname, name: req.body.name, designation: req.body.designation, salary: req.body.salary },
        function(err){
            if(err){
                res.send(err);
            }
            else {
                res.send({data: "Record has been Updated"});
            }
        });
})

app.post("/api/deleteUser", function(req,res){
    model.remove({ _id:req.body.id }, function(err){
        if(err){
            res.send(err);
        }
        else {
            res.send({data:"Record has been Deleted"})
        }
    })
})

app.get("/api/getUser", function(req,res){
    model.find({}, function(err,data){
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
})

app.listen(8080,function (){
    console.log('Example app listening on port 8080');
})
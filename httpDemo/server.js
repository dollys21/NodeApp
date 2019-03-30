var express = require('express');
var bp = require('body-parser');
var _ = require('underscore');
var MongoClient = require('mongodb').MongoClient;
var middleware = require('./inspector.js');


var db
var app = express();
app.use(bp.json());

app.use(middleware.logger);


MongoClient.connect('mongodb://admin:admin123@ds127646.mlab.com:27646/jdpunenew',(err,database)=>{
    if(err)
    return console.log(err)
    db= database;
})





var myid = 1
var mydata=[
    {
        id:1,
        name: 'admin',
        email: 'admin@email.com'
    },
    {
        id:2,
        name: 'manager',
        email: 'manager@email.com'
    } 
]

// app.post('/postmydata',(req,res)=>{
//     var mydata1 = req.body;
//     mydata1.id = myid++;
//     mydata.push(mydata1);
//     console.log(mydata1);
//     res.send('user is added');
//     })


app.post('/postmydata',(req,res)=>{
    db.collection('users').save(req.body,(err,result)=>{
        if(err)
        return console.log(err)
        console.log('saved to database',result);
    })
})


app.put('/putmydata',(req,res)=>{
    db.collection('users').findOneAndUpdate({name: req.body.name},
        {$set:{
            name:req.body.name,
            email: req.body.email
            }
        },{
            sort: {_id: -1},
            upsert: true
        },(err,result)=>{
        if(err)
        return res.send(err)
        res.send(result)
    })
})

// app.get('/loadmydata',middleware.requireAuthentication,function(req,res){
//     res.json(mydata);
// })


 app.get('/loadmydata',middleware.requireAuthentication,function(req,res){
     db.collection('users').find().toArray((err,result)=>{
        if(err)
        return console.log(err)
        res.json(result);
     })
 })

app.get('/loadmydata/:id',(req,res)=>{
    var id = parseInt(req.params.id);
    var matchedTodo = _.findWhere(mydata,{id:id});
    console.log(matchedTodo);
    if(matchedTodo){
        res.json(matchedTodo);
    }else{
        res.status(404).send();
    }
    
})

app.delete('/loadmydata/:id',middleware.requireAuthentication,function(req,res){
    var id = parseInt(req.params.id);
    var matchedTodo = _.findWhere(mydata,{id:id});
    console.log(matchedTodo);
    if(matchedTodo){
      //  mydata=matchedTodo;
        res.json(mydata);
    }else{
        res.status(404).send();
    }
    
})







//app.use(express.static('public'));

app.listen(4200,()=>{
    console.log('server is ready')
})
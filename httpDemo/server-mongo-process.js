var cluster = require('cluster');
var bp = require('body-parser')
var _ = require('underscore')
var middleware = require('./inspector.js')
var mongoClient = require('mongodb').MongoClient



if (cluster.isMaster) {
    var numWorkers = require('os').cpus().length;

    console.log('Master cluster setting up ' + numWorkers + ' workers...');

    for (var i = 0; i < numWorkers; i++) {
        cluster.fork();
    }

    cluster.on('online', function (worker) {
        console.log('Worker ' + worker.process.pid + ' is online');
    });

    cluster.on('exit', function (worker, code, signal) {
        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
        console.log('Starting a new worker');
        cluster.fork();
    });
} else {
    var app = require('express')();
    app.use(middleware.logger)
    app.use(bp.json())
    // app.all('/*', function (req, res) { res.send('process ' + process.pid + ' says hello!').end(); })
    var db;
    mongoClient.connect('mongodb://admin:admin123@ds127646.mlab.com:27646/jdpunenew', (err, database) => {
        if (err) {
            return console.log(err)
        }
        db = database
        console.log('successfully connected to db');
    })


    app.post('/data', middleware.reqAuth, (req, res) => {
        db.collection('users').save(req.body, (err, result) => {
            if (err) {
                console.log(err)
                res.status(404).send()

            }

            console.log('saved user successfully');
            res.send('Added user ');
        })

    })

    app.get('/data', (req, res) => {
        db.collection('users').find().toArray((err, result) => {
            if (err) {
                console.log(err);
                res.status(404).send()
            }
            res.json(result)
        })
    })

    app.put('/data', (req, res) => {
        db.collection('users').findOneAndUpdate({ name: req.body.name }, {
            $set: {
                name: req.body.name,
                email: req.body.email
            }
        },
            {
                sort: { _id: -1 },
                upsert: true
            },
            (err, result) => {
                if (err)
                    return res.send(err)
                res.send(result)
            }
        )
    })



    var server = app.listen(8000, function () {
        console.log('Process ' + process.pid + ' is listening to all incoming requests');
    });
}
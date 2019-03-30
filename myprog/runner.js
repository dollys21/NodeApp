var weather = require('./weather.js');
var location = require('./location.js');

var argv = require('yargs')
    .option('location',{
        alias: 'l',
        demand: false,
        describe: 'Location to fetch the weather for',
        type: 'string'
    })
    .help('help')
    .argv;


if(typeof argv.l === 'string' && argv.l.length > 0 ){
    weather(argv.l, function(currentWeather){
        console.log(currentWeather);
    });
}else{
    location(function(location){
        if(location){
            weather(location.city, function(currentWeather){
                console.log(currentWeather);
            });
        }else{
            console.log("something went wrong");
        }
    })
   
}


weather(argv.l,function(callback){
    console.log(callback);
})
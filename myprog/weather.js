var request = require('request');

module.exports=function(location,callback){
    var encodedLocated = encodeURIComponent(location);
    var url = 'https://api.openweathermap.org/data/2.5/weather?q='+encodedLocated+
              '&appid=b395c638945b094a54fd6ea79989416d&units=metric';

              if(!encodedLocated){
               return callback("no location is provided");
            }

request({
    url:url,
    json: true
},function(error, response,body){
    if(error){
        callback("something was missing");
    }else{
        console.log(body);
      callback("its " + body + ' in ' + body.name + '!');
    }

});
}

console.log("after request!");
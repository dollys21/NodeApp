var EventEmitter = require('events').EventEmitter;
var emitter = new EventEmitter();


var listenersCalled = 0;
emitter.setMaxListeners(110);

function someCallback(){
    emitter.on('foo',function(){
        listenersCalled++;
    });
}

emitter.on('onswipe',function(){
    console.log("door is opened");
});

emitter.on('onswipe',function(){
    console.log("fan is on");
});

emitter.on('onswipe',function(){
    console.log("AC is on");
});

for(i=0;i<90;i++){
    someCallback();
}

//Emit
emitter.emit('foo');
console.log('listener called: ', listenersCalled);

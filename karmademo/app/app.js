//var helloworld = require('./appmain.js');
var helloworld = function(){   
    return 'Hello World'; 
 };
describe("Hello World", function(){ 
    //beforeEach(module("helloworld"));

   it("should Return Hello world",function(){ 
      expect(helloworld()).toEqual('Hello World'); 
   }); 

});
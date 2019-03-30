//addition
var addition = function(a,b){
    return a+b;
};

describe("addition",function(){
    it("should return addition of 2 number",function(){
        expect(addition(2,3)).toEqual(5);
    });
})



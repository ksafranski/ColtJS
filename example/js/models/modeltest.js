define(function(){

    var modelTest = Colt.model({
        name: 'test_model', 
        data: { 
            id: 1, 
            foo: "bar"
        }, 
        url: window.location.origin+'/api/{id}', 
        onchange: function (data) {
            // This is the onchange callback
            console.log('CHANGED: ', data);
        },
        onsync: function (response) {
            // This is the onsync callback
            console.log("SYNC RESPONSE: ", response);
        }
    });
    
    return modelTest;

});
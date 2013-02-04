require.config({
    urlArgs: "bust=v"+(new Date().getTime()), // Comment out/remove to enable caching
    baseUrl: "js/",
    paths: {
        colt:  'libs/colt.0.3.1'
    }
});

define(['colt'], function (Colt) {
    
    // Define all of the modules
    Colt.modules = [
        'modules/static',
        'modules/modone',
        'modules/modtwo',
        'modules/modthree'
    ];
    
    // Initialize application 
    Colt.init(); 

});
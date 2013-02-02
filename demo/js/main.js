require.config({
    urlArgs: "bust=v"+(new Date().getTime()), // Comment out/remove to enable caching
    baseUrl: "js/",
    paths: {
        colt:  'libs/colt.0.2.5'
    }
});

define(['colt'], function (colt) {
    
    // Define all of the modules
    colt.modules = [
        'modules/static',
        'modules/modone',
        'modules/modtwo',
        'modules/modthree'
    ];
    
    // Initialize application 
    colt.init(); 

});
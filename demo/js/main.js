require.config({
    urlArgs: "bust=v"+(new Date().getTime()), // Comment out/remove to enable caching
    baseUrl: "js/",
    paths: {
        colt:  "libs/colt.0.4.1"
    }
});

define(["colt"], function (Colt) {

    // Define all of the modules
    Colt.modules = [
        "modules/header",
        "modules/navigation",
        "modules/modone",
        "modules/modtwo",
        "modules/modthree",
        "modules/modform"
    ];

    // Initialize application
    Colt.init();

});

require.config({
    baseUrl: "js/",
    paths: {
        colt:  "libs/colt.0.5.1"
    }
});

define(["colt"], function (Colt) {

    // Define all of the modules as array
    Colt.modules = [
        "modules/helloworld"
    ];

    // Initialize application
    Colt.init();

});

require.config({
    urlArgs: "bust=v"+(new Date().getTime()), // Comment out/remove to enable caching
    baseUrl: "js/",
    paths: {
        colt:  "libs/colt.0.5.1"
    }
});

define(["colt"], function (Colt) {

    // Define all of the modules
    Colt.modules = [
        "views/header",
        "views/navigation",
        "views/home",
        "views/form",
        "views/models",
        "views/modalutil",
        "views/notificationutil"
    ];

    // Initialize application
    Colt.init();

});

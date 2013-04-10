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
        "modules/header",
        "modules/navigation",
        "modules/home",
        "modules/form",
        "modules/models",
        "modules/modalutil",
        "modules/notificationutil"
    ];

    // Initialize application
    Colt.init();

});

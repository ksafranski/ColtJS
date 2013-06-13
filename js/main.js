require.config({
    baseUrl: "js/",
    paths: {
        colt:  "libs/colt.0.7.2.min",
        jquery: "libs/jquery.1.10.1",
        rainbow: "libs/rainbow.min"
    },
    shim: {
        rainbow: {
            exports: 'Rainbow'
        }
    }
});

define(["colt", "jquery", "rainbow"], function (Colt, $, Rainbow) {

    // Define all of the modules as array
    Colt.modules = [
        "views/header",
        "views/main_nav",
        "views/page_content",
        "views/footer"
    ];
    
    // Initialize application
    Colt.init();

});

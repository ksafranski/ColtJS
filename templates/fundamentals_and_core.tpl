<h2>Fundamentals &amp; Core</h2>

<p>The framework is designed to be simple to implement, utilizing the modules to define how the application functions. The modules tell the system when they should be loaded into 
DOM via routes, what events to bind to, and any other scripts/utils to load as dependencies. </p>

<p>Modules should be named the same as their object, and likewise if a template is going to be used the name of that file (in the <code>/templates</code> directory) should also match the module 
name. You can also specify the template by specifying the <code>template</code> property and providing code directly in the module.</p>

<p>An example of the structure for a simple module is below:</p>

<pre><code data-language="javascript">// Wrap the module in define() + anon function for RequireJS
define(function(){    

    var module_name = {

        // Specify path to dependencies using RequireJS convention, base path
        dependencies: {
            'some_utility': 'utils/some_utility'
        },

        // Bind events
        events: {
            'click .something': 'doSomething'
        },

        // Sets the routes in which this module should load
        routes: {
            '' : 'renderModuleName',
            'route_to_module': 'renderModuleName'
        },

        // Handles rendering of the module
        renderModuleName: function(){

            // Setup data for template
            var data = {
                title: "Module Name",
                content: "Lorem Ipsum Dolor Sit Amet...",
            };

            // Render template
            Colt.render(this,data);
        },

        // Example of a method of the module object
        doSomething: function(){
            // Console logs the current module scope
            console.log(this);
        }

    };

    // Return the module object
    return module_name;

});
</code></pre>

<p>Modules should be given elements on the <code>index.html</code> (or default page) with the `data-view` attribute set to the <code>module_name</code>.</p>

<p>Loading up the framework using RequireJS can be done by simply including the RequireJS source in the <code>index.html</code> file:</p>

<pre><code data-language="html">&lt;script src="js/libs/require.js" data-main="js/main"&gt;
</code></pre>

<p>Then setting up <code>main.js</code> similar to the following, specifying the path to <code>Colt</code> and any other libraries utilized, then defining 
the modules as an array and finally calling <code>Colt.init()</code>:</p>

<pre><code data-language="javascript">require.config({
    baseUrl: "js/",
    paths: {
        colt:       'libs/colt'
        ...additional libraries...
    }
});

define(['colt'], function (Colt) {

    // Define all of the modules
    Colt.modules = [
        'views/module_name',
        ...additional modules...
    ];

    // Initialize application 
    Colt.init(); 

});
</code></pre>

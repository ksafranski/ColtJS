# ColtJS Module Framework

---

ColtJS is a simple framework allowing for easy deployment of JavaScript Application using asynchronous module definition. It's only dependency is [RequireJS](http://www.requirejs.org) 
and it builds off simple principles of a centralized router loading modules only when requested to produce an efficient, easy-to-manage application structure.

The current version supports all modern browsers (including IE8 and above) but can easily be adapted to work with older browsers if needed.

---

## Usage

The framework is designed to be simple to implement, utilizing the modules to define how the application functions. The modules tell the system when they should be loaded into 
DOM via routes, what events to bind to, and any other scripts/utils to load as dependencies. 

Modules should be named the same as their object, and likewise if a template is going to be used the name of that file (in the `/templates` directory) should also match the module 
name. You can also specify the template by specifying the `template` property and providing code directly in the module.

An example of the structure for a simple module is below:

```
// Wrap the module in define() + anon function for RequireJS
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
        renderModuleName: function(Colt, scope, url_data){
            
            // Setup data for template
            var data = {
                title: "Module Name",
                content: "Lorem Ipsum Dolor Sit Amet...",
            };
            
            // Render template
            Colt.render(scope,data);
        },
        
        // Example of a method of the module object
        doSomething: function(event, Colt, scope){
            // Console logs the current module scope
            console.log(scope);
        }
        
    };
    
    // Return the module object
    return module_name;
    
});
```

Modules should be given elements on the `index.html` (or default page) with the id set to the `module_name`.

Loading up the framework using RequireJS can be done by simply including the RequireJS source in the `index.html` file:

```
<script src="js/libs/require.js" data-main="js/main">
```

Then setting up `main.js` similar to the following, specifying the path to `Colt` and any other libraries utilized, then defining 
the modules as an array and finally calling `Colt.init()`:

```
require.config({
    baseUrl: "js/",
    paths: {
        colt:       'libs/colt'
        ...additional libraries...
    }
});

define(['colt'], function (Colt) {
    
    // Define all of the modules
    Colt.modules = [
        'modules/module_name',
        ...additional modules...
    ];
    
    // Initialize application 
    Colt.init(); 

});
```

---

## Dependencies / Utils

Dependencies or utilities passed into the modules are coded similar to the modules themselves. When the modules route is matched and its template is
loaded and rendered any dependencies are as well. If, for example, you wanted to create a simple object with messages to be utilized for output you could do the 
following:

```
define(function(){

    // Define the util as an object
    var messages = {
            
        'message_one': 'This is message one.',
        'message_two': 'This is message two.',
        'message_three': 'This is message three.'
        
    };
    
    // Return the object
    return messages;

});
```

The above will attach the `messages` object to the scope of the module for access.

---

## URI's, Hashes And Query String Data

The framework adheres to Google's recommended `#!` convention. Using Colt's `navigate` method or specifying routes only the name needs to be specified, for example:

```
routes: {
    'route_to_module': 'renderModule'
}
```

Will load to `http://www.website.com/#!/route_to_module`

Likewise, using the `navigate` function:

```
Colt.navigate('route_to_module');
```

Will point the route to the URL above.

Static (or globally utilized) modules can use the `*` character to denote usage throughout the application.

### Passing Data

The router will split out any query string data and pass an object to the matched route(s). For example:

```
http://www.website.com/#!/route_to_module?one=apple&two=orange
```

Will pass the following object back to the routes function:

```
{ one: "apple", two: "orange" }
```

So, if the route calls `renderModule` you can access this data using the following:

```
renderModule: function(Colt, scope, url_data){
    // url_data contains the query string as an object...
}
```

---

## Templates

Templates should be placed in the `/templates` directory and given the same file name as the module and use the `.tpl` extension.

ColtJS includes basic data replacement using Mustache-style tags, for example:

```
<h1>{{title}}</h1>
<p>{{content}}</p>
```

If another templating engine is required, simply pass it into the `main.js` file, then replace the render function. For example, using [MustacheJS](https://github.com/janl/mustache.js):

```
require.config({
    baseUrl: "js/",
    paths: {
        colt:       'libs/colt',
        mustache:   'libs/mustache'
    }
});

define(['colt','mustache'], function (Colt,Mustache) {
    
    // Define all of the modules
    Colt.modules = [
        'modules/module_name',
        ...additional modules...
    ];
    
    // Define custom render to use Mustache
    Colt.render = function (scope, data) {
        var template = scope.template,
            rendered = Mustache.render(template,data);
        
        // Render to DOM
        document.getElementById(scope.mid).innerHTML = rendered;
        
        // Build Event Listeners
        this.delegateEvents(scope.events, scope);
    };
    
    // Initialize application 
    Colt.init(); 

});
```
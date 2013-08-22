<h2>Templates &amp; Rendering</h2>

<p>Templates should be placed in the <code>/templates</code> directory and given the same file name as the module and use the <code>.tpl</code> extension.</p>

<p>ColtJS includes basic data replacement using Mustache-style tags, for example:</p>

<pre><code data-language="html">&lt;h1&gt;&#123;{title}}&lt;/h1&gt;
&lt;p&gt;&#123;{content}}&lt;/p&gt;
</code></pre>

<p>If another templating engine is required, simply pass it into the <code>main.js</code> file, then replace the render function. For example, using <a href="https://github.com/janl/mustache.js">MustacheJS</a>:</p>

<pre><code data-language="javascript">require.config({
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
    Colt.render = function (scope,data) {
        var template = scope.template,
            rendered = Mustache.render(template,data);

        // Render to DOM
        document.getElementById(scope.mid).innerHTML = rendered;
        document.getElementById(scope.mid).style.display = "block";

        // Build Event Listeners
        this.delegateEvents(scope.events, scope);
    };

    // Initialize application 
    Colt.init(); 

});
</code></pre>

<p>Colt also has an <code>unrender</code> method which is used to remove unused modules. If, for instance, custom transitions were being used this could be modified similar to the above Mustache example to 
    act on the module during this process:
</p>

<pre><code data-language="javascript">require.config({
    baseUrl: "js/",
    paths: {
        colt:       'libs/colt',
        jquery:     'libs/jquery'
    }
});

define(['colt','jquery'], function (Colt,$) {

    // Define all of the modules
    Colt.modules = [
        'modules/module_name',
        ...additional modules...
    ];
    
    // Define custom render to use transition in...
    Colt.render = function (scope, data) {
        var template = scope.template,
        // Replace any mustache-style &#123;{VAR}}'s
        rendered = template.replace(/\{\{([^}]+)\}\}/g, function (i, match) {
            return data[match];
        });

        // Render to DOM & Show Element
        $('#'+scope.mid).fadeIn(300);

        // Build Event Listeners
        this.delegateEvents(scope.events, scope);
    }

    // Define custom unrender to use transition out...
    Colt.unrender = function (module_name) {
        $('data-view="'+module_name+'"]').fadeOut(300);
    };

    // Initialize application 
    Colt.init(); 

});
</code></pre>
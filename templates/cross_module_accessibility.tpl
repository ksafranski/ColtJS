<h2>Cross-Module Accessibility</h2>

<p>Colt includes the <code>access</code> method which allows access to other modules from within a parent module. The method is called by specifying the external module which then loads any dependencies/utilities and executes a callback with the return of the foreign module's <code>scope</code>. An example of usage is:</p>

<pre><code data-language="javascript">Colt.access('module_name', function(scope) {
    console.log(scope.property);
});
</code></pre>

<p>The above would simply log out a property of the specified module's scope.</p>
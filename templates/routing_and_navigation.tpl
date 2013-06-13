<h2>Routing &amp; Navigation</h2>

<p>The framework adheres to Google's recommended <code>#!</code> convention. Using Colt's <code>navigate</code> method or specifying routes only the name needs to be specified, for example:</p>

<pre><code data-language="javascript">routes: {
    'route_to_module': 'renderModule'
}
</code></pre>

<p>Will load to <code>http://www.website.com/#!/route_to_module</code></p>

<p>Likewise, using the <code>navigate</code> function:</p>

<pre><code data-language="javascript">Colt.navigate('route_to_module');
</code></pre>

<p>Will point the route to the URL above.</p>

<p>Static (or globally utilized) modules can use the <code>*</code> character to denote usage throughout the application.</p>
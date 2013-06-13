<h2>URL Data Parsing</h2>

<p>The router will split off any data passed as slash-delimited strings after the initial fragment, For example:</p>

<pre><code data-language="html">http://www.website.com/#!/route_to_module/foo/bar</code></pre>

<p>Will populate the <code>url_data</code> object with:</p>

<pre><code data-language="javascript">{ 0: "foo", 1: "bar" }
</code></pre>

<p>The router will also split out any query string data. For example:</p>

<pre><code data-language="html">http://www.website.com/#!/route_to_module?foo=bar&amp;qux=baz
</code></pre>

<p>Will populate the <code>url_data</code> object with:</p>

<pre><code data-language="javascript">{ foo: "bar", qux: "baz" }
</code></pre>

<p>This data is available globally in the <code>Colt.url_data</code> object and is also passed back 
to the function called by the route, for instance if a route calls <code>renderModule</code>:</p>

<pre><code data-language="javascript">renderModule: function(url_data){
    // url_data is a proxy of 'Colt.url_data'...
}
</code></pre>

<p>Additionally data in both the path and querysting can be applied and accessed together, For instance:</p>

<pre><code data-language="html">http://www.website.com/#!/route_to_module/foo/bar?baz=quz&dolor=sit
</code></pre>

<p>Will populate the <code>url_data</code> object with:</p>

<pre><code data-language="javascript">{ 0: "foo", 1: "bar", baz: "quz", dolor: "sit" }
</code></pre>
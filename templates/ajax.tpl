<h2>AJAX</h2>

<p>Colt includes a function to handle AJAX calls which is used by the core but can also be called manually:</p>

<pre><code data-language="javascript">Colt.ajax({
    url: 'path/to/resource',
    type: 'GET',
    async: true,
    cache: true,
    data: { foo: 'bar', baz: 'qux' },
    success: function(data, request){
        ...actions on success...
    },
    error: function(request){
        ...actions on error...
    }
});    
</code></pre>

<p>The only required property is <code>url</code>, which can also be submitted singularily in a similar method to jQuery's <code>$.ajax()</code> method. So, for instance both of the following would work:</p>

<pre><code data-language="javascript">Colt.ajax('path/to/resource');</code></pre>

<pre><code data-language="javascript">Colt.ajax({ url: 'path/to/resource' });</code></pre>

<h3>Pre-Defined Requests</h3>

<p>To assist in code reusability and maintainability, Colt includes a method for storing and calling ajax request:</p>

<pre><code data-language="javascript">Colt.request("request_name", { ...ajax params... });</code></pre>

<p>The above would create a pre-defined request with the ajax params specified, this could then be called with:</p>

<pre><code data-language="javascript">Colt.request("request_name").call({ ...data... });</code></pre>

<p>The above would call the request and pass in the supplied data. The <code>call()</code> method also (optionally) accepts custom <code>success</code> and <code>error</code> paramters:</p>

<pre><code data-language="javascript">Colt.request("request_name").call(
    { ...data... }, 
    function(returnData) {
        ...custom success handler...
    },
    function(errorData) {
        ...custom error handler...
    }
);</code></pre>

<p>Requests which are no longer used can be removed via:</p>

<pre><code data-language="javascript">Colt.request("request_name", null);</pre></code>

<strong>Helpful Tip</strong>
<br>
<p>During development you can access the full list of available requests via the <code>Colt.requests</code> object.</p>
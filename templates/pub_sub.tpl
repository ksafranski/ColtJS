<h2>Pub / Sub</h2>

<p>Colt includes publish + subscribe functions to allow decoupling of events and facilitate interation between modules. The methods for pub/sub implementation are as follows:</p>

<p><strong>Subscribe:</strong></p>

<pre><code data-language="javascript">var token = Colt.subscribe('topic', function(args){
    ...function actions...
});
</code></pre>

<p><strong>Publish:</strong></p>

<pre><code data-language="javascript">Colt.publish('topic',args);
</code></pre>

<p><strong>Unsubscribe:</strong></p>

<pre><code data-language="javascript">Colt.unsubscribe(token);
</code></pre>
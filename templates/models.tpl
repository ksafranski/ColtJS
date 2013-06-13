<h2>Models</h2>

<p>Colt utilizes a simple structure for working with models:</p>

<pre><code data-language="javascript">var model = Colt.model({
    name: "model_name",
    data: { ...data... },
    url: "/path/to/api",
    onchange: function(data) { 
        // Gets fired whenever model data changes
        ...change event handler... 
    },
    onsync: function(response) {
        // Gets fired whenever a sync event occurs, returns:
        // { status: "success", data: { ...response data... } }
        // or
        // { status: "error", data: { ...xhr information... } }
        ...sync event handler...
    }
});</code></pre>

<p>The above would create a model and return it for variable assignment. Then to access the model you can use the variable assignment, or the following:</p>

<pre><code data-language="javascript">Colt.model("model_name");</code></pre>

<p>With only the name specified, the model is returned. It's data can be accessed by appending <code>.data</code> to the variable assignment, or via:

<pre><code data-language="javascript">// Returns the full model
Colt.model("model_name");
// Returns model data
Colt.model("model_name").data();
</code></pre>

<p>The model's data can be changed via:</p>

<pre><code data-language="javascript">Colt.model("model_name", { ...data-obj... });</code></pre>

<p>The model can then be removed by providing <code>null</code> for the <code>data</code> parameter:</p>

<pre><code data-language="javascript">Colt.model("model_name", null);</code></pre>

<h3>RESTful API Connectivity</h3>

<p>Models automatically are given four methods to connect with the url or endpoint supplied in definition:</p>

<pre><code data-language="javascript">// GET request, will then set the data of the model on success
Colt.model("model_name").get();
// POST request
Colt.model("model_name").post();
// PUT request
Colt.model("model_name").put();
// DELETE request, will then pass back `null` data on success, deleting the local model as well
Colt.model("model_name").delete();
</code></pre>

<p>The <code>url</code> parameter will be parsed for data matches before the request is called, so for example <code>/path/to/api/{foo}</code> would replace the <code>{foo}</code> 
    with it's corresponding data attribute.
</p>

<p>The framework defaults to the core <code>Colt.ajax()</code> method through the <code>Colt.sync()</code> handler. This can be overwritten globally, or 
a model can be set to perform specific actions by overwriting the defaults. For example, to overwrite post on the aforementioned model:
</p>

<pre><code data-language="javascript">var model = Colt.model("model_name");
model.post = function() {
    ...custom hanlder...
});</code></pre>


<h3>Subscribe to Change and Sync Events</h3>

<p>In addition to setting default <code>onchange</code> and <code>onsync</code> callbacks, the framework automatically fires a <code>publish()</code> call on these events.</p>

<p>This means you can create subscriptions to handle these events in lieu of (or in addition to) the model's defaults. For example, <code>change</code> publishes can be accessed via:</p>

<pre><code data-language="javascript">Colt.subscribe("model_{MODEL-NAME}_change", function(data){
    ...handle data...
});
</code></pre>

<p>Sync uses a similar publisher:</p>

<pre><code data-language="javascript">Colt.subscribe("model_{MODEL-NAME}_sync", function(response){
    ...handle response...
});
</code></pre>

<p>Both handlers return the same data as the default <code>onchange</code> and <code>onsync</code>. For more information on the Colt pub/sub system, see <a href="#pub-sub">the Pub/Sub section.</a></p>

<strong>Helpful Tip</strong>
<br>
<p>During development you can access the full list of available models via the <code>Colt.models</code> object.</p>
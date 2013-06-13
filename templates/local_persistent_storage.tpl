<h2>Local, Persistent Storage</h2>

<p>Colt includes support for persistent storage using <code>localStorage</code>, with a fallback to cookies for older browsers. The methods to utilize this are as follows: </p>

<p><strong>Create Storage Instance:</strong></p>

<pre><code data-language="javascript">Colt.store('some_key','some_value');
</code></pre>

<p><strong>Retrieve Storage Instance:</strong></p>

<pre><code data-language="javascript">Colt.store('some_key');
</code></pre>

<p><strong>Remove Storage Instance:</strong></p>

<pre><code data-language="javascript">Colt.store('some_key',null);
</code></pre>
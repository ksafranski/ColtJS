<h2>Event Binding</h2>

<p>Events listeners are created using a simple structur similar to other frameworks:</p>

<pre><code data-language="javascript">events: {
    '{event} {object}': '{fn}'
}
</code></pre>

<p>So, for a click event you could specify <code>'click .something': 'doSomething'</code> which would fire the <code>doSomething</code> method and would return 
the event.</p>

<h3>Manual Binding</h3>

<p>Colt also includes a method for manually binding events:</p>

<pre><code data-language="javascript">Colt.bindEvent({dom_object}, {event}, function () {
    ... Code to Execute ...
});
</code></pre>
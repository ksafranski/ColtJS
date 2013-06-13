<h2>Utils &amp; Dependencies</h2>

<p>Dependencies or utilities passed into the modules are coded similar to the modules themselves. When the modules route is matched and its template is
loaded and rendered any dependencies are as well. If, for example, you wanted to create a simple object with messages to be utilized for output you could do the 
following:</p>

<pre><code data-language="javascript">define(function(){

    // Define the util as an object
    var messages = {

        'message_one': 'This is message one.',
        'message_two': 'This is message two.',
        'message_three': 'This is message three.'

    };

    // Return the object
    return messages;

});
</code></pre>

<p>The above will attach the <code>messages</code> object to the scope of the module for access. In the above instance the reference would be <code>this.messages</code> inside any methods of 
the module, for example:</p>

<pre><code data-language="javascript">
    ...
    
    // Define key:path object for dependencies
    dependencies: {
        'messages': 'utils/messages'
    },
    
    renderMyModule: function() {
        
        // Render this view/module and pass in messages for templating
        Colt.render(this,this.messages);
        
    }
    
    ...

</code></pre>
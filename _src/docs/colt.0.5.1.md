init()
------
Adds module to Colt object, sets up core properties and initializes router


router()
--------
Sets up Routing Table, binds and loads Routes


loadUrl(fragment)
-----------------
Checks to verify that current route matches a module's route, passes it to the processor() and hides all modules that don't need to be rendered


**Parameters**

**fragment**:  *String*,  The current hash

processor(module, route_fn, url_data)
-------------------------------------
Handles processing of the module, loads template, fires dependency loader then the route event


**Parameters**

**module**:  *Object*,  The module object to be used.

**route_fn**:  *Function*,  The return function from the route.

**url_data**:  *Object*,  The data from any url query strings

loadDependencies(scope, callback)
---------------------------------
Checks for & loads any dependencies before calling the route's function


**Parameters**

**scope**:  *Object*,  The module object to be used.

**callback**:  *Function*,  Function to execute when all deps are loaded

render(scope, \[data\])
-----------------------
Renders a module's template onto the screen


**Parameters**

**scope**:  *Object*,  The module object to be used.

**[data]**:  *Object*,  Any data to be rendered onto the template.

unrender(module_name)
---------------------
Removes unused modules' content from DOM and sets display to none


**Parameters**

**module_name**:  *String*,  The name of the module to unrender

access(module, callback)
------------------------
Proxy function for accessing other modules and their dependencies


**Parameters**

**module**:  *Object*,  Name of the module to access

**callback**:  *Function*,  The function to fire once access is complete

navigate(fragment)
------------------
Responsible for updating the history hash, and changing the URL


**Parameters**

**fragment**:  *String*,  The location to be loaded

delegateEvents(events, scope)
-----------------------------
Binds callbacks for a module's events object



**Parameters**

**events**:  *Object*,  Events to be watched for

**scope**:  *Object*,  The current module

bindEvent(el, evt, fn, \[pdef\])
--------------------------------
Used to bind events to DOM objects


**Parameters**

**el**:  *Object*,  Element on which to attach event

**evt**:  *String*,  Event name

**fn**:  *Function*,  Function to be called

**[pdef]**:  *Boolean*,  Boolean to preventDefault

ajax(url, \[config\])
---------------------
Used to make AJAX calls


**Configuration Object:**

`url`: URL of request if not specified as first argument

`type`: Request method, defaults to `GET`

`async`: Run request asynchronously, defaults to `TRUE`

`cache`: Cache the request, defaults to `TRUE`

`data`: Object or JSON data passed through request

`success`: Function called on successful request

`error`: Function called on failure of request


**Parameters**

**url**:  *String*,  URL of the resource

**[config]**:  *Object*,  Configuration object passed into request

store(key, \[value\])
---------------------
LocalStorage with polyfill support via cookies

Specify a string/object value to `set`, none to `get`, and 'null' to `clear`


**Parameters**

**key**:  *String*,  The key or identifier for the store

**[value]**:  *String|Object*,  Contents of the store, blank to return, 'null' to clear

createCookie(key, value, exp)
-----------------------------
Creates new cookie or removes cookie with negative expiration


**Parameters**

**key**:  *String*,  The key or identifier for the store

**value**:  *String*,  Contents of the store

**exp**:  *Number*,  Expiration in days

readCookie(key)
---------------
Returns contents of cookie


**Parameters**

**key**:  *String*,  The key or identifier for the store

**Returns**

*String*,  the value of the cookie

publish(topic, args)
--------------------
Publish to a topic


**Parameters**

**topic**:  *String*,  Topic of the subscription

**args**:  *Object*,  Array of arguments passed

subscribe(topic, fn)
--------------------
Subscribes to a topic


**Parameters**

**topic**:  *String*,  Topic of the subscription

**fn**:  *Function*,  Function to be called

unsubscribe(token)
------------------
Unsubscribes from a topic


**Parameters**

**token**:  *String*,  Token of the subscription

polyfill_bind()
---------------
Polyfill for .bind()



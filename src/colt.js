/**
 * ColtJS Framework
 *
 * @version 1.0.3
 * @license MIT-License <http://opensource.org/licenses/MIT>
 *
 * Copyright (c) 2013 ColtJS
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
 * of the Software, and to permit persons to whom the Software is furnished to do
 * so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE
 */


/**
 * ColtJS Framework
 */
define(function () {
    "use strict";

    /**
     * The main Colt object
     * @type {Object}
     */
    var Colt = {

        /**
         * Container for all routes
         * @type {Object}
         */
        routes: {},

        /**
         * Container for all module objects
         * @type {Object}
         */
        scope: {},

        /**
         * Conatiner for all dependencies
         * @type {Object}
         */
        dependencies: {},
        
        /**
         * Container for all models
         * @type {Object}
         */
        models: {},
        
        /**
         * Container for all defined xhr requests
         * @type {Object}
         */
        requests: {},

        /**
         * @method init
         *
         * Adds module to Colt object, sets up core properties and initializes router
         */
        init: function () {

            var module,
                _this = this,
                i,
                max;

            // Make available in global scope
            window.Colt = this;

            require(this.modules, function () {

                // Load modules into application scope
                for (i = 0, max = arguments.length; i < max; i++) {
                    module = _this.modules[i].split("/").pop();
                    _this.scope[module] = arguments[i];
                    // Add module-id to scope
                    _this.scope[module].mid = module;
                    // Create element reference
                    _this.scope[module].el = document.querySelectorAll("[data-view='" + module + "']");
                    // If jQuery is available create jQuery accessible DOM reference
                    if (typeof jQuery !== "undefined") {
                        _this.scope[module].$el = jQuery("[data-view='" + module + "']");
                    }
                    // Create module.forEachEl
                    _this.scope[module].forEachEl = _this.forEachEl;
                }

                // Call the router
                _this.router();

            });

            // Polyfill for bind()
            if (!Function.prototype.bind) {
                this.polyfill_bind();
            }

        },

        /**
         * @method router
         *
         * Sets up Routing Table, binds and loads Routes
         */
        router: function () {

            var cur_route = window.location.hash,
                _this = this,
                module,
                route;

            for (module in this.scope) {
                if (this.scope.hasOwnProperty(module)) {
                    for (route in this.scope[module].routes) {
                        if (!this.routes.hasOwnProperty(route)) {
                            this.routes[route] = [[module, this.scope[module].routes[route]]];
                        } else {
                            this.routes[route].push([module,this.scope[module].routes[route]]);
                        }
                    }
                }
            }

            // Initial route
            this.loadUrl(cur_route);

            // Bind change
            window.onhashchange = function () {
                _this.loadUrl(window.location.hash);
            };

        },

        /**
         * @method loadUrl
         *
         * Checks to verify that current route matches a module's route, passes it to the processor() and hides all modules that don't need to be rendered
         *
         * @param {String} fragment The current hash
         */
        loadUrl: function (fragment) {
            var _this = this,
                querystring = false,
                url_data = {},
                qs_data,
                el_lock,
                module_name,
                route,
                i,
                max,
                _i,
                _max,
                bits;

            // Break apart fragment
            fragment = fragment.replace("#!/", "");

            // Check for and remove trailing slash
            if(fragment.substr(-1) === "/") {
                fragment = fragment.substr(0, fragment.length - 1);
            }

            // Split off any querystrings
            fragment = fragment.split("?");
            if (fragment[1]) {
                querystring = fragment[1];
            }

            // Check for URL Data - Slash delimited
            fragment = fragment[0].split("/");
            if(fragment.length > 0) {
                for (i = 1, max = fragment.length; i < max; i++) {
                    url_data[i-1] = fragment[i];
                }
            }

            // Add Querystring data to URL Data object
            if (querystring) {
                qs_data = querystring.split("&");
                for (i = 0, max = qs_data.length; i < max; i++) {
                    bits = qs_data[i].split("=");
                    url_data[bits[0]] = bits[1];
                }
            }

            // Store current route
            _this.current_route = fragment[0];

            // Store url data
            _this.url_data = url_data;

            // Check route for match(es)
            for (route in _this.routes) {
                if (_this.routes.hasOwnProperty(route)) {
                    for (_i = 0, _max = _this.routes[route].length; _i < _max; _i++) {
                        // Get Name
                        module_name = _this.routes[route][_i][0];

                        // Check route for match
                        if (fragment[0] === route || route === "*") {

                            if (el_lock !== module_name) {
                                // Prevents other routes in the same module from hiding this
                                el_lock = module_name;
                                // Send module to processor
                                _this.processor(module_name, _this.routes[route][_i][1], url_data);
                            }

                        } else {
                            // Clear & Hide sections that don't exist in current route
                            _this.unrender(module_name);
                        }
                    }
                }
            }

        },

        /**
         * @method processor
         *
         * Handles processing of the module, loads template, fires dependency loader then the route event
         *
         * @param {Object} module The module object to be used.
         * @param {Function} route_fn The return function from the route.
         * @param {Object} url_data The data from any url query strings
         */
        processor: function (module, route_fn, url_data) {

            var scope = this.scope[module],
                _this = this;

            // Set module to loaded
            scope.loaded = true;

            // Check to see if we are using inline template or if template has already been loaded/defined
            if (!scope.hasOwnProperty("template")) {

                // Get the template
                _this.ajax({
                    url: "templates/" + scope.mid + ".tpl",
                    type: "GET",
                    success: function (data) {
                        scope.template = data;
                        _this.loadDependencies(scope, function () {
                            // Run route after deps are loaded
                            scope[route_fn](url_data);
                        });
                    },
                    error: function () {
                        console.log("Could not load template for "+scope.mid);
                    }
                });

            } else {
                _this.loadDependencies(scope, function () {
                    // Run route after deps are loaded
                    scope[route_fn](url_data);
                });
            }

        },

        /**
         * @method loadDependencies
         * 
         * Checks for & loads any dependencies before calling the route's function
         * 
         * @param {Object} scope The module object to be used.
         * @param {Function} callback Function to execute when all deps are loaded
         */
        loadDependencies: function (scope, callback) {
            var _this = this,
                i,
                max,
                dep,
                dep_name,
                dep_src,
                arr_dep_name = [],
                arr_dep_src = [];

            // Load module's dependencies
            if (scope.hasOwnProperty("dependencies")) {

                // Build Dependency Arrays
                for (dep in scope.dependencies) {
                    if (scope.dependencies.hasOwnProperty(dep)) {
                        dep_name = dep;
                        dep_src = scope.dependencies[dep];

                        // Check if already loaded into global
                        if (_this.dependencies.hasOwnProperty(dep_src)) {
                            scope[dep_name] = _this.dependencies[dep_src];

                        // Add to array to be pulled via Require
                        } else {
                            arr_dep_name.push(dep_name);
                            arr_dep_src.push(dep_src);
                        }
                    }
                }

                // Load deps and add to object
                require(arr_dep_src, function () {
                    for (i = 0, max = arguments.length; i < max; i++) {
                        scope[arr_dep_name[i]] = arguments[i];

                        // Store in globally accessible dependencies object
                        _this.dependencies[arr_dep_src[i]] = arguments[i];
                    }
                    // Fire callback
                    if ( callback && typeof callback === "function" ){
                        callback(scope);
                    }
                });

            // Module has no dependencies
            } else {
                // Fire callback
                if ( callback && typeof callback === "function" ){
                    callback(scope);
                }
            }
        },

        /**
         * @method render
         * 
         * Renders a module's template onto the screen
         * 
         * @param {Object} scope The module object to be used.
         * @param {Object} [data] Any data to be rendered onto the template.
         */
        render: function (scope, data) {
            var _this = this,
                template = scope.template,
                templateRender,
                rendered,
                max,
                el,
                i;

            // filter function for the template
            templateRender = function (i, match) {
                return data[match];
            };

            for (max = scope.el.length, i = 0; i < max; i++) {
                // Get element
                el = scope.el[i];
                // Replace any mustache-style {{VAR}}'s
                rendered = template.replace(/\{\{([^}]+)\}\}/g, templateRender);

                // Render to DOM & Show Element
                el.innerHTML = rendered;
                el.style.display = "block";
            }

            // Build Event Listeners
            _this.delegateEvents(scope.events, scope);
        },

        /**
         * @method unrender
         * 
         * Removes unused modules' content from DOM and sets display to none
         * 
         * @param {String} module_name The name of the module to unrender
         */
        unrender: function (module_name) {
            var index,
                el,
                max;
            el = document.querySelectorAll("[data-view='" + module_name + "']");
            for (index = 0, max = el.length; index < max; index++) {
                el[index].innerHTML = "";
                el[index].style.display = "none";
            }
        },

        /**
         * @method access
         * 
         * Proxy function for accessing other modules and their dependencies
         * 
         * @param {Object} module Name of the module to access
         * @param {Function} callback The function to fire once access is complete
         */
        access: function (module, callback) {
            var _this = this,
                scope = this.scope[module];
            if (!scope.hasOwnProperty("loaded")) {
                // Not previously loaded, check for dependencies
                _this.loadDependencies(scope, function (scope) {
                    scope.loaded = true;
                    if (callback && typeof callback === "function") {
                        callback(scope);
                    }
                });
            } else {
                // Module previously loaded, fire callback
                if (callback && typeof callback === "function") {
                    callback(scope);
                }
            }
        },

        /**
         * @method navigate
         * 
         * Responsible for updating the history hash, and changing the URL
         * 
         * @param  {String} fragment The location to be loaded
         * @return {Boolean}
         */
        navigate: function (fragment) {

            var location = window.location,
                root = location.pathname.replace(/[^\/]$/, "$&"),
                _this = this,
                url;

            // Handle url composition
            if (fragment.length) {
                // Fragment exists
                url = root + location.search + "#!/" + fragment;
            } else {
                // Null/Blank fragment, nav to root
                url = root + location.search;
            }

            if (history.pushState) {
                // Browser supports pushState()
                history.pushState(null, document.title, url);
                _this.loadUrl(fragment);
            } else {
                // Older browser fallback
                location.replace(root + url);
            }

            return true;
        },

        /**
         * @method delegateEvents
         * 
         * Binds callbacks for a module's events object
         * 
         * @param {Object} events Events to be watched for
         * @param {Object} scope The current module
         */
        delegateEvents: function (events, scope) {

            var delegateEventSplitter = /^(\S+)\s*(.*)$/,
                _this = this,
                method,
                match,
                event_name,
                selector,
                nodes,
                key,
                max,
                i;

            // if there are no events on this sectional then we move on
            if (!events) {
                return;
            }

            for (key in events) {
                if (events.hasOwnProperty(key)) {
                    method = events[key];
                    match = key.match(delegateEventSplitter);
                    event_name = match[1];
                    selector = match[2];
                    /*
                     * bind method on event for selector on scope.mid
                     * the caller function has access to event, Colt, scope
                     */
                    nodes = document.querySelectorAll("[data-view='" + scope.mid + "'] " + selector);

                    for (i = 0, max = nodes.length; i < max; i++) {
                        _this.bindEvent(nodes[i], event_name, scope[method].bind(scope), true);
                    }
                }
            }
        },

        /**
         * @method bindEvent
         * 
         * Used to bind events to DOM objects
         * 
         * @param {Object} el Element on which to attach event
         * @param {String} evt Event name
         * @param {Function} fn Function to be called
         * @param {Boolean} [pdef] Boolean to preventDefault
         */
        bindEvent: function (el, evt, fn, pdef) {
            pdef = pdef || false;
            if (el.addEventListener) { // Modern browsers
                el.addEventListener(evt, function (event) {
                    if (pdef) { event.preventDefault ? event.preventDefault() : event.returnValue = false; }
                    fn(event);
                }, false);
            } else { // IE <= 8
                el.attachEvent("on" + evt, function (event) {
                    if (pdef) { event.preventDefault ? event.preventDefault() : event.returnValue = false; }
                    fn(event);
                });
            }
        },

        /**
         * @method model
         * 
         * Allows for local API model create, read, and delete
         * 
         * @param {String} name The name of the model
         * @param {Object} [data] Contents of the model, blank to return, 'null' to clear
         * 
         * Specify a object value to `set`, none to `get`, and 'null' to `clear`
         */
        model: function () {

            var _this = this,
                name,
                model,
                params;

            // If first argument is an object, create model
            if (typeof arguments[0] === "object") {

                params = arguments[0];

                // Check optional parameters
                params.url = params.url || false;
                params.onchange = params.onchange || false;

                // Core properties
                if(typeof params.name === "string" && params.name !== "") {
                    _this.models[params.name] = {
                        data: params.data,
                        // Define save method, ex: Colt.model('some_model').get();
                        "get": _this.sync.bind(_this, params.name, "GET"),
                        // Define get method, ex: Colt.model('some_model').put();
                        "put": _this.sync.bind(_this, params.name, "PUT"),
                        // Define post method, ex: Colt.model('some_model').post();
                        "post": _this.sync.bind(_this, params.name, "POST"),
                        // Define delete method, ex: Colt.model('some_model').delete;
                        "delete": _this.sync.bind(_this, params.name, "DELETE")
                    };

                    // If URL of endpoint supplied, set property
                    if (params.url) {
                        _this.models[params.name].url = params.url;
                    }

                    // If onchange fn is specified, set as property
                    if (params.onchange) {
                        _this.models[params.name].onchange = params.onchange;
                    }

                    // If onsync fn is specified, set as property
                    if (params.onsync) {
                        _this.models[params.name].onsync = params.onsync;
                    }

                    // Return the model
                    return _this.models[params.name];

                } else {
                    throw new Error("Cannot create a null model");
                }

            // Modify existing object
            } else if (arguments.length === 2) {

                name = arguments[0];
                model = _this.models[name];

                // Modify data
                if (typeof arguments[1] === "object" && arguments[1] !== null) {
                    model.data = arguments[1];

                    // Fire onchange
                    if (model.hasOwnProperty("onchange")) {
                        model.onchange(model.data);
                    }

                    // Publish for any subscriptions
                    _this.publish("model_"+name+"_change", model.data);

                // Delete model
                } else {
                    delete _this.models[name];
                }


            // Return model
            } else {
                name = arguments[0];
                model = _this.models[name];
                return model;
            }

        },

        /**
         * @method sync
         * 
         * Gets bound to models, used to access API
         * 
         * @param {String} name Name of the model
         * @param {String} method RESTful request method
         */

        sync: function (name, method) {

            var model = this.models[name],
                sendback = {},
                // Define call
                _this = this,
                url = this.parseURL(model.url, model.data),
                data = model.data,
                syncParams = {
                    url: url,
                    type: method,
                    data: data,
                    qsData: false,
                    success: function (returnData ){

                        // Set sendback
                        sendback.status = "success";
                        sendback.data = returnData;

                        // On GET success, Update model data
                        if (method === "GET") {
                            _this.model(name,JSON.parse(returnData));
                        }

                        // On DELETE success, Remove model
                        if (method === "DELETE") {
                            _this.model(name,null);
                        }

                        // Fire onsync if present
                        if (model.hasOwnProperty("onsync")) {
                            model.onsync(sendback);
                        }

                        // Publish for any subscriptions
                        _this.publish("model_"+name+"_sync", sendback);
                    },
                    error: function (req) {

                        // Set sendback
                        sendback.status = "error";
                        sendback.data = req;

                        // Fire onsync if present
                        if (model.hasOwnProperty("onsync")) {
                            model.onsync(sendback);
                        }

                        // Publish for any subscriptions
                        _this.publish("model_"+name+"_sync", sendback);

                        // Drop error bomb
                        throw new Error("Model Sync Error: [req] : " + req);
                    }
                };

            // Call the ajax function
            _this.ajax(syncParams);
        },

        /**
         * @method request
         * 
         * Allows for storing pre-set xhr requests for re-use
         * 
         * @param {String} name The name of the xhr-request
         * @param {Object} params Paramaters of the request to define (see @method ajax)
         */
        request: function (name, params) {

            var _this = this;

            // If value is detected, set new or modify request
            if (typeof params === "object" && params !== null) {
                // Stringify objects
                _this.requests[name] = {
                    // Connection parameters
                    params: params,
                    // Define call method, ex: Colt.request("some_request").call(data);
                    call: _this.callRequest.bind(_this, name)
                };

                // Return the request for variable assignment
                return _this.requests[name];

            }

            // No params supplied, return request
            if (typeof data === "undefined") {
                return _this.requests[name];
            }

            // Null specified, remove request
            if (params === null) {
                if (_this.requests.hasOwnProperty(name)) {
                    delete _this.requests[name];
                }
            }

        },

        /**
         * @method callRequest
         * 
         * Fires a stored request via ajax() method
         * 
         * @param {String} name The name passed from the bind, or manually supplied
         * @param {Object} data The data to be sent with the request
         * @param {Function} [success] Optional success callback, can also be specified in request params
         * @param {Function} [error] Optional error callback, can also be specified in request params
         */
        callRequest: function (name, data, success, error) {

            var _this = this,
                request = {},
                param;

            // Check for optional success and error callbacks
            success = success || false;
            error = error || false;

            if (_this.requests.hasOwnProperty(name)) {

                // We have to loop the request's params into the new request object
                // so we don't override the requests settings
                for (param in _this.requests[name].params) {
                    if (_this.requests[name].params.hasOwnProperty(param)) {
                        request[param] = _this.requests[name].params[param];
                    }
                }

                // Parse any URL data
                request.url = _this.parseURL(request.url, data);

                // Set the data param
                request.data = data;

                // Check for success callback
                if (success && typeof success === "function") {
                    request.success = success;
                }

                // Check for error callback
                if (error && typeof error === "function") {
                    request.error = error;
                }

                // Call the ajax request
                _this.ajax(request);

            }
        },

        /**
         * @method parseURL
         * 
         * Parses model's url property against data object
         * 
         * @param {String} url The url of the model
         * @param {Object} data Contents of the model
         */
        parseURL: function (url, data) {
            return url.replace(/\{([^}]+)\}/g, function (i, match) {
                return data[match];
            });
        },

        /**
         * @method ajax
         * 
         * Used to make AJAX calls
         *
         * @param {String} url URL of the resource
         * @param {Object} [config] Configuration object passed into request
         * 
         * **Configuration Object:**
         * 
         * `url`: URL of request if not specified as first argument
         * 
         * `type`: Request method, defaults to `GET`
         * 
         * `async`: Run request asynchronously, defaults to `TRUE`
         * 
         * `cache`: Cache the request, defaults to `TRUE`
         * 
         * `data`: Object or JSON data passed through request
         * 
         * `success`: Function called on successful request
         * 
         * `error`: Function called on failure of request
         * 
         * `qsData`: Allows blocking (set `false`) of `data` add to URL for RESTful requests
         */
        ajax: function() {

            // Parent object for all parameters
            var xhr = {};

            // Determine call structure: ajax(url, { params }); or ajax({ params });
            if (arguments.length === 1) {
                // All params passed as object
                xhr = arguments[0];
            } else {
                // Populate xhr obj with second argument
                xhr = arguments[1];
                // Add first argument to xhr object as url
                xhr.url = arguments[0];
            }

            // Parameters & Defaults
            xhr.request = false;
            xhr.type = xhr.type || "GET";
            xhr.data = xhr.data || null;
            if (xhr.qsData || !xhr.hasOwnProperty("qsData")) { xhr.qsData = true; } else { xhr.qsData = false; }
            if (xhr.cache || !xhr.hasOwnProperty("cache")) { xhr.cache = true; } else { xhr.cache = false; }
            if (xhr.async || !xhr.hasOwnProperty("async")) { xhr.async = true; } else { xhr.async = false; }
            if (xhr.success && typeof xhr.success === "function") { xhr.success = xhr.success; } else { xhr.success = false; }
            if (xhr.error && typeof xhr.error === "function") { xhr.error = xhr.error; } else { xhr.error = false; }

            // Format xhr.data & encode values
            if (xhr.data) {
                var param_count = 0,
                    name,
                    value,
                    tmp_data = xhr.data;
                for (var param in tmp_data) {
                    if(tmp_data.hasOwnProperty(param)){
                        name = encodeURIComponent(param);
                        value = encodeURIComponent(tmp_data[param]);
                        if (param_count === 0) {
                            xhr.data = name + "=" + value;
                        } else {
                            xhr.data += "&" + name + "=" + value;
                        }
                        param_count++;
                    }
                }
                xhr.data = xhr.data;
            }

            // Appends data to URL
            function formatURL(data) {
                var url_split = xhr.url.split("?");
                if (url_split.length !== 1) {
                    xhr.url += "&" + data;
                } else {
                    xhr.url += "?" + data;
                }
            }

            // Handle xhr.data on GET request type
            if (xhr.data && xhr.type.toUpperCase() === "GET" && xhr.qsData) {
                formatURL(xhr.data);
            }

            // Check cache parameter, set URL param
            if (!xhr.cache) {
                formatURL(new Date().getTime());
            }

            // Establish request
            if (window.XMLHttpRequest) {
                // Modern non-IE
                xhr.request = new XMLHttpRequest();
            } else if (window.ActiveXObject) {
                // Internet Explorer
                xhr.request = new ActiveXObject("Microsoft.XMLHTTP");
            } else {
                // No request object, break
                return false;
            }

            // Monitor ReadyState
            xhr.request.onreadystatechange = function () {
                var responseText;
                if (xhr.request.readyState === 4) {
                    if (xhr.request.status === 200) {
                        if (xhr.success) {
                            // Check for JSON responseText, return object
                            try {
                               responseText = JSON.parse(xhr.request.responseText);
                            }
                            catch(e) {
                               responseText = xhr.request.responseText;
                            }
                            // Returns responseText and request object
                            xhr.success(responseText, xhr.request);
                        }
                    } else {
                        if (xhr.error) {
                            // Returns request object
                            xhr.error(xhr.request);
                        }
                    }
                }
            };

            // Open Http Request connection
            xhr.request.open(xhr.type, xhr.url, xhr.async);

            // Set request header for POST
            if (xhr.type.toUpperCase() === "POST" || xhr.type.toUpperCase() === "PUT") {
                xhr.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }

            // Send data
            xhr.request.send(xhr.data);

        },

        /**
         * @method store
         * 
         * LocalStorage with polyfill support via cookies
         * 
         * @param {String} key The key or identifier for the store
         * @param {String|Object} [value] Contents of the store, blank to return, 'null' to clear
         * 
         * Specify a string/object value to `set`, none to `get`, and 'null' to `clear`
         */
        store: function (key, value) {

            var _this = this,
                lsSupport = false,
                data;

            // Check for native support
            if (localStorage) {
                lsSupport = true;
            }

            // If value is detected, set new or modify store
            if (typeof value !== "undefined" && value !== null) {
                // Stringify objects
                if(typeof value === "object") {
                    value = JSON.stringify(value);
                }
                // Add to / modify storage
                if (lsSupport) { // Native support
                    localStorage.setItem(key, value);
                } else { // Use Cookie
                    _this.createCookie(key, value, 30);
                }
            }

            // No value supplied, return value
            if (typeof value === "undefined") {
                // Get value
                if (lsSupport) { // Native support
                    data = localStorage.getItem(key);
                } else { // Use cookie 
                    data = _this.readCookie(key);
                }
                
                // Try to parse JSON...
                try {
                   data = JSON.parse(data);
                }
                catch (e) {
                   data = data;
                }
                
                return data;
                
            }

            // Null specified, remove store
            if (value === null) {
                if (lsSupport) { // Native support
                    localStorage.removeItem(key);
                } else { // Use cookie
                    _this.createCookie(key, "", -1);
                }
            }

        },

        /**
         * @method createCookie
         * 
         * Creates new cookie or removes cookie with negative expiration
         * 
         * @param {String} key The key or identifier for the store
         * @param {String} value Contents of the store
         * @param {Number} exp Expiration in days
         */
        createCookie: function(key, value, exp) {
            var date = new Date(),
                expires;
            date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
            document.cookie = key + "=" + value + expires + "; path=/";
        },

        /**
         * Returns contents of cookie
         * 
         * @param {String} key The key or identifier for the store
         * @return {String} the value of the cookie
         */
        readCookie: function(key) {
            var nameEQ = key + "=",
                ca = document.cookie.split(";"),
                i,
                max,
                c;
            for (i = 0, max = ca.length; i < max; i++) {
                c = ca[i];
                while (c.charAt(0) === " ") { c = c.substring(1, c.length); }
                if (c.indexOf(nameEQ) === 0) { return c.substring(nameEQ.length, c.length); }
            }
            return null;
        },

        /**
         * Placeholder object for pub/sub
         */
        topics: {},

        /**
         * ID for incrementing
         */
        topic_id: 0,

        /**
         * @method publish
         * 
         * Publish to a topic
         * 
         * @param {String} topic Topic of the subscription
         * @param {Object} args Array of arguments passed
         */
        publish: function (topic, args) {
            var _this = this;
            if (!_this.topics.hasOwnProperty(topic)) {
                return false;
            }
            setTimeout(function () {
                var subscribers = _this.topics[topic],
                    len;

                if (subscribers.length) {
                    len = subscribers.length;
                } else {
                    return false;
                }

                while (len--) {
                    subscribers[len].fn(args);
                }
            }, 0);
            return true;
        },

        /**
         * @method subscribe
         * 
         * Subscribes to a topic
         * 
         * @param {String} topic Topic of the subscription
         * @param {Function} fn Function to be called
         */
        subscribe: function (topic, fn) {
            var _this = this,
                id = ++this.topic_id,
                max,
                i;

            // Create new topic
            if (!_this.topics[topic]) {
                _this.topics[topic] = [];
            }

            // Prevent re-subscribe issues (common on route-reload)
            for (i = 0, max = _this.topics[topic].length; i < max; i++) {
                if (_this.topics[topic][i].fn.toString() === fn.toString()) {
                    return _this.topics[topic][i].id;
                }
            }

            _this.topics[topic].push({
                id: id,
                fn: fn
            });

            return id;
        },

        /**
         * @method unsubscribe
         * 
         * Unsubscribes from a topic
         * 
         * @param {String} token Token of the subscription
         */
        unsubscribe: function (token) {
            var _this = this,
                topic,
                i,
                max;
            for (topic in _this.topics) {
                if (_this.topics.hasOwnProperty(topic)) {
                    for (i = 0, max = _this.topics[topic].length; i < max; i++) {
                        if (_this.topics[topic][i].id === token) {
                            _this.topics[topic].splice(i, 1);
                            return token;
                        }
                    }
                }
            }
            return false;
        },

        /**
         * @method polyfill_bind
         * 
         * Polyfill for .bind()
         */
        polyfill_bind: function () {
            Function.prototype.bind = function (obj) {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                if (typeof this !== "function") {
                    throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                }

                var slice = [].slice,
                    args = slice.call(arguments, 1),
                    self = this,
                    nop = function () { },
                    bound = function () {
                        return self.apply(this instanceof nop ? this : (obj || {}),
                                          args.concat(slice.call(arguments)));
                    };

                bound.prototype = this.prototype;

                return bound;
            };
        },

        /**
         * Helper function that executes a callback function on each module.el
         * @method foreEachEl
         * @param {function} callback
         */
        forEachEl: function (callback) {
            if (typeof callback === "function") {
                var index = -1,
                    max = this.el.length;
                while (++index < max) {
                    if (callback(index, this.el[index], this.el) === false) {
                        break;
                    }
                }
            } else {
                throw new Error("Callback must be a function");
            }
        }


    };


    // Return the framework
    return Colt;

});

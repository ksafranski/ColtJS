/**
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
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
define(function () {

    /**
     * The main file in the framework.
     * This is where the router, dependencies and event delegation happens.
     * @type {Object}
     */

    var colt = {

        // Will auto-populate all routes
        routes: {},

        // Will auto-populate all module objects
        scope: {},

        /**
         * Adds module to object and then initiates routes
         */
        init: function () {

            var _this = this,
                module;

            require(_this.modules, function () {

                // Load modules into application scope
                for (var i = 0, max = arguments.length; i < max; i++) {
                    module = _this.modules[i].split('/').pop();
                    _this.scope[module] = arguments[i];
                    // Add module-id to scope
                    _this.scope[module].mid = module;
                    // Create element reference
                    _this.scope[module].el = document.getElementById(module);
                    // If jQuery is available create jQuery accessible reference
                    if (typeof jQuery !== 'undefined') {
                        _this.scope[module].$el = jQuery('#' + module);
                    }
                }

                // Call the router
                _this.router();

            });
        },

        /**
         * Setup Routing Table, Bind and Load Routes
         */
        router: function () {

            var _this = this,
                cur_route = window.location.hash,
                el_lock = null;

            for (var module in _this.scope) {
                for (var route in _this.scope[module].routes) {
                    _this.routes[route] = [module, _this.scope[module].routes[route]];
                }
            }
            // Initial route
            _this.loadUrl(cur_route);

            // Bind change    
            window.onhashchange = function () {
                _this.loadUrl(window.location.hash);
            };

        },

        /**
         * Checks to see that a current route matches a modules's route and hides all of those that don't need to be rendered
         * @param  {string} fragment the current hash
         */
        loadUrl: function (fragment) {
            var _this = this,
                el_lock,
                module_name,
                url_data = {};

            // Break apart fragment
            fragment = fragment.replace('#!/', '');

            // Check for URL Data (Query String)
            fragment = fragment.split('?');
            if (fragment[1]) {
                var qs = fragment[1].split('&');
                for (var i = 0; i < qs.length; i++) {
                    var bits = qs[i].split('=');
                    url_data[bits[0]] = bits[1];
                }
            }

            // Check route for match(es)
            for (var route in _this.routes) {
                if (_this.routes.hasOwnProperty(route)) {
                    // Get Name
                    module_name = _this.routes[route][0];

                    // Check route for match
                    if (fragment[0] === route || route === '*') {

                        if (el_lock !== module_name) {

                            // Prevents other routes in the same module from hiding this
                            el_lock = module_name;
                            // Send module to processor
                            _this.processor(module_name, _this.routes[route][1], url_data);
                        }

                    } else {
                        // Hide sections that don't match
                        document.getElementById(module_name).innerHTML = '';
                    }
                }
            }

        },

        /**
         * Handles compilation of the module, loads template, fires dependency loader and event handler
         * @param  module         The module object to be used.
         * @param  route_fn       The return function from the route.
         */
        processor: function (module, route_fn, url_data) {

            var _this = this,
                scope = _this.scope[module];

            // Check to see if we are using inline template or if template has already been loaded/defined
            if (!scope.hasOwnProperty('template')) {

                _this.AJAX('templates/' + scope.mid + '.tpl', function (data) {
                    if (data) {
                        scope.template = data;
                        loadDependencies(_this, scope, route_fn);
                    } else {
                        console.error('Error Loading ' + scope.mid + '.tpl');
                    }
                });

            } else {
                loadDependencies(_this, scope, route_fn);
            }

            /**
             * Checks for & loads any dependencies before calling the route's function
             * @param  _this          The colt object
             * @param  scope          The module object to be used.
             * @param  route_fn       The return function from the route.
             */

            function loadDependencies(_this, scope, route_fn) {
                var arr_dep_name = [],
                    arr_dep_src = [];
                // Load module's dependencies
                if (scope.hasOwnProperty('dependencies')) {

                    // Build Dependency Arrays
                    for (var dep in scope.dependencies) {
                        arr_dep_name.push(dep);
                        arr_dep_src.push(scope.dependencies[dep]);
                    }

                    // Load deps and add to object
                    require(arr_dep_src, function () {
                        for (var i = 0, max = arguments.length; i < max; i++) {
                            scope[arr_dep_name[i]] = arguments[i];
                        }
                        // Fire function of route that called the processor
                        scope[route_fn](_this, scope, url_data);
                    });

                    // Module has no dependencies
                } else {
                    // Fire route's function
                    scope[route_fn](_this, scope, url_data);
                }
            }
        },

        /**
         * Renders a module's template onto the screen
         * @param  scope    the module object to be used.
         * @param  data     any data to be rendered onto the template.
         */
        render: function (scope, data) {
            var template = scope.template,
                // Replace any mustache-style {{VAR}}'s
                rendered = template.replace(/\{\{([^}]+)\}\}/g, function (i, match) {
                    return data[match];
                });

            // Render to DOM
            document.getElementById(scope.mid).innerHTML = rendered;

            // Build Event Listeners
            this.delegateEvents(scope.events, scope);
        },

        /**
         * Responsible for updating the history hash, and changing the URL
         * @param  {string} fragment the location to be loaded
         * @return {bool} 
         */
        navigate: function (fragment) {

            var location = window.location;
            var root = location.pathname.replace(/[^\/]$/, '$&');

            // Change the URL
            location.replace(root + location.search + '#!/' + fragment);

        },

        /**
         * Set callback for a module's event list.
         * Using jQuery's on method, we can listen to the event_name on the 
         * selector and call a specified method, passing in scope as event.data.scope
         *
         * @param  {Object} events has of events to be watched for
         * @param  {Object} scope the current module
         */
        delegateEvents: function (events, scope) {

            var _this = this,
                method,
                match,
                event_name,
                selector,
                nodes;

            // Prevent multiple binding of events
            if (!scope.hasOwnProperty('events_bound')) {
                // if there are no events on this sectional then we move on 
                if (!events) {
                    return;
                }

                var delegateEventSplitter = /^(\S+)\s*(.*)$/;
                for (key in events) {
                    if (events.hasOwnProperty(key)) {
                        method = events[key];
                        match = key.match(delegateEventSplitter);
                        event_name = match[1];
                        selector = match[2];
                        /*
                         * bind method on event for selector on scope.mid
                         * the caller function has access to event, colt, scope
                         */
                        nodes = document.querySelectorAll('#' + scope.mid + ' ' + selector);

                        (function (nodes, method) {
                            for (var i = 0, max = nodes.length; i < max; i++) {                               
                                if (nodes[i].addEventListener) { // DOM Level 2 browsers
                                    nodes[i].addEventListener(event_name, function (event) {
                                        (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
                                        scope[method](event, _this, scope);
                                    }, false);
                                } else { // IE <= 8
                                    nodes[i].attachEvent('on' + event_name, function (event) {
                                        (event.preventDefault) ? event.preventDefault() : event.returnValue = false;
                                        scope[method](event, _this, scope);
                                    });
                                }
                            }
                        })(nodes, method);
                    }
                }
            }
        },

        /**
         * Used to make AJAX calls
         * @param  url       The URL of the request
         * @param  callback  Callback function
         * @param  method    The method to be used
         * @param  async     Fire request asynchronously
         * @param  data      Data to be passed to request
         */

        AJAX: function (url, callback, method, async, data) {
            // Set variables
            var request = false;
            url = url || "";
            method = method || "GET";
            async = async || true;
            data = data || null;

            // Mozilla/Safari/Non-IE
            if (window.XMLHttpRequest) {
                request = new XMLHttpRequest();
            }
            // IE
            else if (window.ActiveXObject) {
                request = new ActiveXObject("Microsoft.XMLHTTP");
            }
            // If AJAX supported
            if (request !== false) {
                // Open Http Request connection
                if (method == "GET") {
                    url = url;
                    data = null;
                }
                request.open(method, url, async);
                // Set request header (optional if GET method is used)
                if (method === "POST") {
                    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                }
                // Assign (or define) response-handler/callback when ReadyState is changed.
                request.onreadystatechange = function () {
                    if (request.readyState === 4) {
                        if (typeof callback === 'function') {
                            callback(request.responseText);
                        }
                    }
                };
                // Send data
                request.send(data);

            } else {
                alert("Please use a browser with AJAX support!");
            }
        }


    };


    // Return the framework
    return colt;

});
/**
 * Validation utility for ColtJS
 */

define(function () {

    /**
     * Handle all form validation and messaging
     * 
     * HTML Output of error messages:
     *    <div class="validation_error" id="validation_error_{field_name}">
     *         <ul>
     *             <li>Validation Error Message</li>
     *             ....
     *         </ul>
     *    </div>
     */

    var validation = {

        /**
         * Check function to validate values
         * @param  module   Passes in the scope of the module
         */

        bind: function (module) {
            if (module.validation_config.events.length) {
                var field,
                _this = this,
                    fn;
                for (var name in module.validation_config.rules) {
                    field = module.el.querySelectorAll('[name=' + name + ']');
                    // Loop through validation_events
                    for (var i = 0, max = module.validation_config.events.length; i < max; i++) {
                        // Bind to event
                        (function (module, name, event) {
                            Colt.bindEvent(field[0], event, function () {
                                _this.check(module, name);
                            });
                        })(module, name, module.validation_config.events[i]);
                    }
                }
            }
        },

        /**
         * Loops through all fields and fires check method
         * @param  module    Scope of the module
         */

        check_all: function (module) {
            var pass_all = true,
                result;
            for (var name in module.validation_config.rules) {
                result = this.check(module, name, true);
                if (!result) {
                    pass_all = false;
                }
            }
            return pass_all;
        },

        /**
         * Process validation rules
         * @param  module   Scope of the module
         * @param  name     Name of the field to check
         */

        check: function (module, name, check_all) {
            var result,
            pass = true,
                errors = [],
                check_all = check_all || false,
                field = module.el.querySelectorAll('[name=' + name + ']'),
                value = field[0].value;
            for (var rule in module.validation_config.rules[name]) {
                result = this.test(rule, value, module.validation_config.rules[name][rule], module);
                if (!result) {
                    pass = false;
                    errors.push(rule);
                }
            }

            if (!check_all) {
                this.show_errors(module, name, errors);
            }

            // Return result (used by check_all)
            return pass;
        },

        /**
         * Outputs DOM to show errors in validation
         * @param  module    Scope of the module
         * @param  name      Name of the field;
         * @param  rules     Array of rules that failed
         */

        show_errors: function (module, name, rules) {
            var errors = '',
                err_id = 'validation_error_' + name,
                message,
                field = module.el.querySelectorAll('[name=' + name + ']')[0];

            if (!rules.length) {
                if (document.getElementById(err_id)) {
                    return (elem = document.getElementById(err_id)).parentNode.removeChild(elem);
                }
            } else {
                // Create error element
                var err_node = document.createElement('div');
                // Set error msg ID
                err_node.id = err_id;
                err_node.className = 'validation_error';
                // Create error list
                for (var i = 0, max = rules.length; i < max; i++) {
                    message = module.validation_config.messages[rules[i]];
                    message = message.replace(/\{\{([^}]+)\}\}/g, function (i, match) {
                        return module.validation_config.rules[name][match];
                    });
                    errors += '<li>' + message + '</li>';
                }
                if (!document.getElementById(err_id)) {
                    // Append element
                    field.parentElement.insertBefore(err_node, field);
                }
                document.getElementById(err_id).innerHTML = '<ul>' + errors + '</ul>';
            }
        },

        /**
         * Function to run tests
         * @param  rule       Rule to check against
         * @param  value      Value to test
         * @param  condition  Condition of the test
         * @param  module     Scope of the module
         */

        test: function (rule, value, condition, module) {

            switch (rule.toLowerCase()) {

                case 'required':
                    return !!value.length;

                case 'containsletter':
                    return /[a-zA-Z]/.test(value);

                case 'containsnumber':
                    return /\d/.test(value);

                case 'alphanumeric':
                    return /^[a-zA-Z0-9 ]*$/.test(value);

                case 'lowercase':
                    return /^([a-z])*$/.test(value);

                case 'phone':
                    return /^((([0-9]{1})*[- .(]*([0-9]{3})[- .)]*[0-9]{3}[- .]*[0-9]{4})+)*$/.test(value);

                case 'email':
                    return /^\w[\w.-]*@[\w-][\w.-]*\.\w+$/.test(value);

                case 'url':
                    return /^(((http|https|ftp):\/\/)?([[a-zA-Z0-9]\-\.])+(\.)([[a-zA-Z0-9]]){2,4}([[a-zA-Z0-9]\/+=%&_\.~?\-]*))*$/.test(value);

                case 'minlength':
                    return value.length >= condition;

                case 'maxlength':
                    return value.length <= condition;

                case 'matches':
                    return (module.el.querySelectorAll('[name=' + condition + ']')[0].value === value);

                case 'uszip':
                    return /^([0-9]{5}(-[0-9]{4})?)$/.test(value);

                default:
                    return 'Invalid Test';

            }

        }

    };

    return validation;

});
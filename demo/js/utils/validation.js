define(function(){

    var validation = {
        
        /**
         * Check function to validate values
         * @param  module   Passes in the scope of the module
         */
        
        bind: function(module){
            var field,
                _this = this,
                fn;
            for (var name in module.validation_rules){
                field = module.el.querySelectorAll('[name='+name+']');
                // Loop through validation_events
                for (var i=0, max=module.validation_events.length; i<max; i++){
                    // Bind to event
                    (function(module,name,event){
                        Colt.bindEvent(field[0], event, function(){
                            _this.check(module,name);
                        });
                    })(module,name,module.validation_events[i]);
                }
            }
        },
        
        /**
         * Loops through all fields and fires check method
         * @param  module    Scope of the module
         */ 
        
        check_all: function(module){
            var pass_all = true,
                result;
            for (var name in module.validation_rules){
                result = this.check(module,name);
                if(!result){
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
         
        check: function(module,name){
            var field, 
                value,
                result,
                pass = true,
                errors = [];
            field = module.el.querySelectorAll('[name='+name+']');
            value = field[0].value;
            for (var rule in module.validation_rules[name]){
                result = this.test(rule,value,module.validation_rules[name][rule],module);
                if(!result){
                    pass = false;
                    errors.push(rule);
                }
            }
            // Errors present, show errors to user
            if(!pass){
                this.show_errors(module,name,errors);
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
         
        show_errors: function(module, name, rules){
            var errors;
            for (var i=0, max=rules.length; i<max; i++){
                console.log(name + ' failed ' + rules[i]);
            }  
        },
        
        /**
         * Function to run tests
         * @param  rule       Rule to check against
         * @param  value      Value to test
         * @param  condition  Condition of the test
         * @param  module     Scope of the module
         */
        
        test: function(rule,value,condition,module){
            
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
                    return (module.el.querySelectorAll('[name='+condition+']')[0].value === value);

                case 'uszip':
                    return /^([0-9]{5}(-[0-9]{4})?)$/.test(value);
    
                default:
                    return 'Invalid Test';
    
            }
            
        }
        
    };
    
    return validation;

});
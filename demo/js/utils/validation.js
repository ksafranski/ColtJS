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
                (function(module,name){
                    Colt.bindEvent(field[0], 'blur', function(){
                        _this.check(module,name);
                    });
                })(module,name);
            }
        },
        
        /**
         * Loops through all fields and fires check method
         * @param  module    Scope of the module
         */ 
        
        check_all: function(module){
            for (var name in module.validation_rules){
                this.check(module,name);
            }
        },
        
        /**
         * Process validation rules
         * @param  module   Scope of the module
         * @param  name     Name of the field to check
         */
         
        check: function(module,name){
            var field, 
                value,
                result;
            field = module.el.querySelectorAll('[name='+name+']');
            value = field[0].value;
            for (var rule in module.validation_rules[name]){
                result = this.test(rule,value,module.validation_rules[name][rule],module);
                
                alert('Rule:'+name+' - '+rule+' - '+module.validation_rules[name][rule]+' = '+result);
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
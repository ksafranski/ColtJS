define(function(){

    var validation = {
        
        /**
         * Check function to validate values
         * @param  test_all   Run an immediate test of all fields
         */
        
        bind: function(module){
            var field,
                _this = this,
                fn;
            for (var name in module.validation_rules){
                console.log('BIND: '+name);
                field = module.el.querySelectorAll('[name='+name+']');
                (function(name){
                    Colt.bindEvent(field[0], 'blur', function(){
                        _this.check(name);
                    });
                })(name);
            }
        },
        
        /**
         * Process validation rules
         */
         
        check: function(name){
            console.log('Check '+name);
        },
        
        /**
         * Function to run tests
         * @param  rule    Rule to check against
         * @param  value   Value to test
         */
        
        test: function(rule,value){
            
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
    
                case 'matches':
                    return (value === $($scope.el).find('[name="' + condition + '"]').val());
    
                case 'minlength':
                    return value.length >= condition;
    
                case 'maxlength':
                    return value.length <= condition;
    
                case 'uszip':
                    return /^([0-9]{5}(-[0-9]{4})?)$/.test(value);
    
                default:
                    return 'Invalid Test';
    
            }
            
        }
        
    };
    
    return validation;

});
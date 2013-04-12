define(function(){    
    
    var form = {
           
        dependencies: {
            'validation': 'utils/validation'
        },
        
        /**
         * Configuration for form validation
         */
         
        validation_config: {
            // Events to bind auto-validation
            events: ['keyup','blur'],
            
            // Rules for fields based on input's name param
            rules: {
                fname: {
                    required: true,
                    minlength: 2,
                    maxlength: 32
                },
                lname: {
                    required: true,
                    minlength: 2,
                    maxlength: 32
                },
                email: {
                    //required: true,
                    email: true
                },
                password: {
                    required: true,
                    minlength: 6
                },
                password_confirm: {
                    required: true,
                    matches: 'password'
                }
            },
            
            // Messages displayed on validation error
            messages: {
                required: "This field is required",
                minlength: "This field must contain at least {{minlength}} characters",
                maxlength: "This field must not contain more than {{maxlength}} characters",
                email: "This field must contain a valid email address",
                matches: "This field must match {{matches}}"
            }
        },
        
        events: {
            'submit form': 'processForm'
        },
    
        routes: {
            'form': 'renderForm'
        },
    
        /**
         * Loads up this modules main view
         */
        renderForm: function(){            
            // Render template
            Colt.render(this);
            this.validation.bind(this);
        },
        
        processForm: function(event){
            var check_all = this.validation.check_all(this);
            if(!check_all){
                alert('Please fill out all required fields');
            }
        }
        
    };
    
    return form;
    
});
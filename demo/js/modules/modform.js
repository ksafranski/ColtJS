define(function(){    
    
    var modform = {
           
        dependencies: {
            'validation': 'utils/validation',
            'messages': 'utils/messages'
        },
        
        validation_rules: {
            'fname': {
                'required': true,
                'minlength': 2,
                'maxlength': 32
            },
            'lname': {
                'required': true,
                'minlength': 2,
                'maxlength': 32
            }
        },
        
        events: {
            'submit form': 'processForm'
        },
    
        routes: {
            '' : 'renderModuleForm',
            'modone': 'renderModuleForm'
        },
    
        /**
         * Loads up this modules main view
         */
        renderModuleForm: function(){            
            // Render template
            Colt.render(this);
            this.validation.bind(this);
        },
        
        processForm: function(event){
            this.validation.check_all(this);
        }
        
    };
    
    return modform;
    
});
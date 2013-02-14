define(function(){    
    
    var modform = {
           
        dependencies: {
            'validation': 'utils/validation',
            'messages': 'utils/messages'
        },
        
        validation_events: ['keypress','blur'],
        
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
        
        validation_messages: {
            'required': "This field is required",
            'minlength': "This field must contain at least {{minlength}} characters",
            'maxlength': "This field must not contain more than {{maxlength}} characters"
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
            var check_all = this.validation.check_all(this);
            if(!check_all){
                alert('Please fill out all required fields');
            }
        }
        
    };
    
    return modform;
    
});
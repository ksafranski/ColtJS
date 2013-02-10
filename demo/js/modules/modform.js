define(function(){    
    
    var modform = {
           
        dependencies: {
            'validation': 'utils/validation'
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
        },
        
        processForm: function(event){
            alert('Submitted!');
        }
        
    };
    
    return modform;
    
});
define(function(){    
    
    var models = {
        
        events: {
            'click #create-model': 'createModel',
            'click #change-model': 'changeModel',
            'click #read-model': 'readModel',
            'click #delete-model': 'deleteModel'
        },
    
        routes: {
            'models': 'renderModels'
        },
    
        /**
         * Loads up this modules main view
         */
        renderModels: function(url_data){
            
            // Render template
            Colt.render(this);
            
        },
        
        createModel: function() {
            
            var idVal = this.el.querySelectorAll('[name="id"]')[0].value,
                fooVal = this.el.querySelectorAll('[name="foo"]')[0].value,
                modelData = { 
                    id: idVal, 
                    foo: fooVal
                };
                
            if (!idVal.length || !fooVal.length) {
                alert('Please enter values for the model');
            } else { 
                
                // Create the model with a name, data, url, and onchange function bind
                Colt.model('test_model', modelData, window.location.origin+'/api/{id}', function () {
                    // This is the onchange callback
                    console.log('TRIGGERED: Model has changed!');
                });
                
                console.log('Model Created!');
            
            }
            
        },
        
        changeModel: function () {
            
            var idVal = this.el.querySelectorAll('[name="id"]')[0].value,
                fooVal = this.el.querySelectorAll('[name="foo"]')[0].value,
                modelData = { 
                    id: idVal, 
                    foo: fooVal
                };
                
            if (!idVal.length || !fooVal.length) {
                alert('Please enter values for the model');
            } else { 
            
                Colt.model('test_model', modelData);
            
            }
            
        },
        
        readModel: function () {
            
            var model = Colt.model('test_model');
            
            console.log('MODEL: ', model);
            
        },
        
        deleteModel: function() {
            
            Colt.model('test_model', null);
            
            console.log('Model Deleted.');
            
        }
        
    };
    
    return models;
    
});
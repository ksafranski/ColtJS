define(function(){    
    
    var modfour = {
        
        events: {
            'click #create-model': 'createModel',
            'click #change-model': 'changeModel',
            'click #read-model': 'readModel',
            'click #delete-model': 'deleteModel'
        },
    
        routes: {
            'modfour': 'renderModuleFour'
        },
    
        /**
         * Loads up this modules main view
         */
        renderModuleFour: function(url_data){
            
            // Render template
            Colt.render(this);
            
        },
        
        createModel: function() {
            
            var testVal = this.el.querySelectorAll('[name="foo"]')[0].value,
                modelData = { foo: testVal };
                
            if (!testVal.length) {
                alert('Please enter a value for Foo...');
            } else { 
                
                // Create the model with a name, data, url, and onchange function bind
                Colt.model('test_model', modelData, '/api/{foo}', function () {
                    
                    // This is the onchange callback
                    console.log('TRIGGERED: Model has changed!');
                
                });
                
                console.log('Model Created!');
            
            }
            
        },
        
        changeModel: function () {
            
            var testVal = this.el.querySelectorAll('[name="foo"]')[0].value,
                modelData = { foo: testVal };
                
            if (!testVal.length) {
                
                alert('Please enter a value for Foo...');
               
            } else{ 
            
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
    
    return modfour;
    
});
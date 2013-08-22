define(function(){    
    
    var models = {
        
        dependencies: {
            modelTest: 'models/modeltest'
        },
        
        events: {
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
        renderModels: function () {
            
            // Render template
            Colt.render(this);
            
        },
        
        changeModel: function () {
            this.forEachEl(function (i, el) {
                var idVal = el.querySelectorAll('[name="id"]')[0].value,
                    fooVal = el.querySelectorAll('[name="foo"]')[0].value;
                if (!idVal.length || !fooVal.length) {
                    alert('Please enter values for the model');
                } else {
                
                    Colt.model('test_model', {
                        id: idVal,
                        foo: fooVal
                    });
                
                }
            });
            
        },
        
        readModel: function () {
            
            console.log('MODEL: ', Colt.model('test_model'));
            
        },
        
        deleteModel: function() {
            
            Colt.model('test_model', null);
            
            console.log('Model Deleted.');
            
        }
        
    };
    
    return models;
    
});

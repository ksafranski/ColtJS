define(function(){    
    
    var static = {
          
    
        routes: {
            '*' : 'renderStatic'
        },
    
        /**
         * Loads up this modules main view
         * @param {object} app
         * @param {object} scope
         * @return {object} 
         */
        renderStatic: function(Colt, scope, url_data){            
            // Render template
            Colt.render(scope);
        }
        
    };
    
    return static;
    
});
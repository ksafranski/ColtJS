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
        renderStatic: function(app, scope){            
            // Render template
            app.render(scope);
        }
        
    };
    
    return static;
    
});
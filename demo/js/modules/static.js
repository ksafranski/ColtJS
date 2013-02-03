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
        renderStatic: function(){            
            // Render template
            Colt.render(this);
        }
        
    };
    
    return static;
    
});
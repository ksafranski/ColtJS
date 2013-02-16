define(function(){    
    
    var header = {
          
    
        routes: {
            '*' : 'renderHeader'
        },
    
        /**
         * Loads up this modules main view
         */
        renderHeader: function(){            
            // Render template
            Colt.render(this);
        }
        
    };
    
    return header;
    
});
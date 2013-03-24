define(function(){    
    
    var navigation = {
          
        events: {
            'click a': 'gotoPage'
        },
        
        routes: {
            '*' : 'renderNavigation'
        },
    
        /**
         * Loads up this modules main view
         */
        renderNavigation: function(){            
            // Render template
            Colt.render(this);
        },
        
        gotoPage: function(event){
            var href = event.target.href.split('/').pop();
            Colt.navigate(href);
        }
        
    };
    
    return navigation;
    
});
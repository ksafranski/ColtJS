define(function(){    
    
    var header = {
        
        events: {
        },
    
        routes: {
            '*' : 'renderHeader', // Renders in default route
        },
    
        // Loads up this modules main view
        renderHeader: function(url_data){
            
            var _this = this;
                tplData = {};
            
            // Get version number
            Colt.ajax({
                url: "https://api.github.com/repos/fluidbyte/ColtJS/tags",
                success: function(tags) {
                    tplData['version'] = JSON.parse(tags)[0].name;
                    // Render template
                    Colt.render(_this,tplData);
                },
                error: function(){
                    // Render template
                    Colt.render(_this);
                }
            });
             
        }
        
    };
    
    return header;
    
});
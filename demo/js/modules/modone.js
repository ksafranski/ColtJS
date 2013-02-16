define(function(){    
    
    var modone = {
        
        events: {
            'click .modone-event': 'testEvent'
        },
    
        routes: {
            '' : 'renderModuleOne',
            'modone': 'renderModuleOne'
        },
    
        /**
         * Loads up this modules main view
         */
        renderModuleOne: function(url_data){
            
            // Show any url data (query string)
            //console.log(url_data);
            
            // Render time to show dynamic templates...
            var d = new Date(), hour, ampm = 'am';
            hour = d.getHours();
            if(hour>=12){
                if(hour>12){
                    hour = hour-12;
                }
                ampm = 'pm';
            }
            var min = d.getMinutes(), sec = d.getSeconds();
            if(min<=9){
                min = '0'+min;
            }
            if(sec<=9){
                sec = '0'+sec;
            }
            var cur_time = hour + ':' + min + ':' + sec + ' ' + ampm;
            
            // Setup data for template
            var data = {
                title: "Module One!",
                content: "This is module one, rendered at "+cur_time,
            };
            
            // Render template
            Colt.render(this,data);
            
        },
        
        testEvent: function(){
            alert('Event Triggered!');
        }
        
    };
    
    return modone;
    
});
define(function(){    
    
    var home = {
        
        events: {
            'click .home-event': 'testEvent'
        },
    
        routes: {
            '' : 'renderHome',
            'home': 'renderHome'
        },
    
        /**
         * Loads up this modules main view
         */
        renderHome: function(url_data){
            
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
            
            // Access other modules
            Colt.access('notificationutil', function(scope){ 
                console.log(scope.tester);
            });
            
        },
        
        testEvent: function(){
            alert('Event Triggered!');
        }
        
    };
    
    return home;
    
});
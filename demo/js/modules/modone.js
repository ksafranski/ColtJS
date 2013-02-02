define(function(){    
    
    var modone = {
           
        dependencies: {
            'messages': 'utils/messages'
        },
        
        events: {
            'click .two': 'goNext',
            'click .three': 'goThree',
            'click .modone-event': 'testEvent'
        },
    
        routes: {
            '' : 'renderModuleOne',
            'modone': 'renderModuleOne'
        },
    
        /**
         * Loads up this modules main view
         * @param {object} app
         * @param {object} scope
         * @return {object} 
         */
        renderModuleOne: function(Colt, scope, url_data){
            
            // Show any url data (query string)
            console.log(url_data);
            
            // Render time to show dynamic templates...
            var d = new Date(), hour, ampm = 'am';
            hour = d.getHours();
            if(hour>=12){
                if(hour>12){
                    hour = hour-12;
                }
                ampm = 'pm';
            }
            var cur_time = hour + ':' + d.getMinutes() + ':' + d.getSeconds() + ' ' + ampm;
            
            // Setup data for template
            var data = {
                title: "Module One!",
                content: "This is module one, rendered at "+cur_time,
            };
            
            // Render template
            Colt.render(scope,data);
            
            // Get something from one of the utilities
            console.log(scope.messages.message_one);
        },
    
        /**
         * Takes end-user to next module
         * @param  {object} event 
         * @return {bool}
         */
        goNext: function(event, Colt, scope) {
            Colt.navigate('modtwo');
        },
    
        /**
         * Go to modthree
         * @param  {object} event
         * @return {bool}
         */
        goThree: function(event, Colt, scope) {
            Colt.navigate('modthree');
        },
        
        testEvent: function(event, Colt, scope){
            alert('TEST EVENT FIRED');
        }
        
    };
    
    return modone;
    
});
define(function(){

    var modthree = {
        
        events: {
            'click .one': 'goOne',
            'click .two': 'goBack'
        },
        
        routes: {
            'modthree' : 'renderModuleThree'
        },
        
        /**
         * Loads up this module's main view
         * @param  {object} app   
         * @param  {object} scope
         * @return {object}
         */
        renderModuleThree: function(colt, scope){
            /** calling render for this module */
            colt.render(scope);
        },
        
        /**
         * Return to modtwo
         * @param  {object} event
         * @return {bool}
         */
        goBack: function (event, colt, scope) {
            colt.navigate('modtwo');
        },

        /**
         * Return to modone
         * @param  {object} event 
         * @return {bool}
         */
        goOne: function (event, colt, scope) {
            colt.navigate('modone');
        }
    };
    
    return modthree;
    
});
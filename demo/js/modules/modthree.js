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
        renderModuleThree: function(Colt, scope){
            /** calling render for this module */
            Colt.render(scope);
        },
        
        /**
         * Return to modtwo
         * @param  {object} event
         * @return {bool}
         */
        goBack: function (event, Colt, scope) {
            Colt.navigate('modtwo');
        },

        /**
         * Return to modone
         * @param  {object} event 
         * @return {bool}
         */
        goOne: function (event, Colt, scope) {
            Colt.navigate('modone');
        }
    };
    
    return modthree;
    
});
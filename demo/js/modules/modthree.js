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
         */
        renderModuleThree: function(){
            /** calling render for this module */
            Colt.render(this);
        },
        
        /**
         * Return to modtwo
         */
        goBack: function () {
            Colt.navigate('modtwo');
        },

        /**
         * Return to modone
         */
        goOne: function () {
            Colt.navigate('modone');
        }
    };
    
    return modthree;
    
});
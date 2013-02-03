define(function(){

    var modtwo = {
        
        events: {
            'click .one': 'goBack',
            'click .three': 'goNext'
        },
       
        routes: {
            'modtwo' : 'renderModuleTwo'
        },
        
        /**
         * Loads up this module's main view
         */
        renderModuleTwo: function(){
            /** calling render for this module */
            Colt.render(this);
        },
        
        /**
         * Go back to modone   
         */
        goBack: function () {
            Colt.navigate('modone');
        },

        /**
         * Go to modthree  
         */
        goNext: function () {
            Colt.navigate('modthree');
        }
           
    };
    
    return modtwo;
    
});
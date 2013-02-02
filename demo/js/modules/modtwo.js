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
         * @param {object} app 
         * @param {object} scope
         * @return {object}  
         */
        renderModuleTwo: function(Colt, scope){
            /** calling render for this module */
            Colt.render(scope);
        },
        
        /**
         * Go back to modone
         * @param  {object} event 
         * @return {bool}       
         */
        goBack: function (event, Colt, scope) {
            Colt.navigate('modone');
        },

        /**
         * Go to sectionthree
         * @param  {object} event 
         * @return {bool}       
         */
        goNext: function (event, Colt, scope) {
            Colt.navigate('modthree');
        }
           
    };
    
    return modtwo;
    
});
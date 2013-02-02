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
        renderModuleTwo: function(colt, scope){
            /** calling render for this module */
            colt.render(scope);
        },
        
        /**
         * Go back to modone
         * @param  {object} event 
         * @return {bool}       
         */
        goBack: function (event, colt, scope) {
            colt.navigate('modone');
        },

        /**
         * Go to sectionthree
         * @param  {object} event 
         * @return {bool}       
         */
        goNext: function (event, colt, scope) {
            colt.navigate('modthree');
        }
           
    };
    
    return modtwo;
    
});
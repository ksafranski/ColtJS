define(function(){

    var modtwo = {
        
        dependencies: {
            'modal': 'utils/modal'
        },
        
        events: {
            'click .one': 'goBack',
            'click .three': 'goNext',
            'click .open-modal': 'openModal'
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
        },
        
        /**
         * Open Modal
         */
         
        openModal: function() {
            var modal_content = '<h1>This is a Modal</h1>'
                                + '<p>Lorem ipsum dolor sit amet...</p>'
                                + '<hr><button class="modal-close">Close</button>';
            this.modal.open(500,modal_content);
        }
           
    };
    
    return modtwo;
    
});
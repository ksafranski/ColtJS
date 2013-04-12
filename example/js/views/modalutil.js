define(function(){

    var modalutil = {
        
        dependencies: {
            'modal': 'utils/modal'
        },
        
        events: {
            'click .open-modal': 'openModal'
        },
       
        routes: {
            'modalutil' : 'renderModalUtil'
        },
        
        /**
         * Loads up this module's main view
         */
        renderModalUtil: function(){
            /** calling render for this module */
            Colt.render(this);
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
    
    return modalutil;
    
});
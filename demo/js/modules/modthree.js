define(function(){

    var modthree = {
        
        dependencies: {
            'notification': 'utils/notification'
        },
        
        events: {
            // Demonstrate notifications
            'click .show-success': 'showSuccess',
            'click .show-warning': 'showWarning',
            'click .show-error': 'showError',
            'click .hide-notification': 'hideNotification'
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
        
        showSuccess: function(){
            this.notification.show('success','This is a success message.');
        },
        
        showWarning: function(){
            this.notification.show('warning','This is a warning message.');
        },
        
        showError: function(){
            this.notification.show('error','This is an error message.');
        },
        
        hideNotification: function(){
            this.notification.hide();
        }
        
    };
    
    return modthree;
    
});
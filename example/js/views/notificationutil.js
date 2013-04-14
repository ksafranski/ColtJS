define(function(){

    var notificationutil = {
        
        dependencies: {
            'notification': 'utils/notification',
            'tester': 'utils/tester'
        },
        
        events: {
            // Demonstrate notifications
            'click .show-success': 'showSuccess',
            'click .show-warning': 'showWarning',
            'click .show-error': 'showError',
            'click .hide-notification': 'hideNotification'
        },
        
        routes: {
            'notificationutil' : 'renderNotificationUtil'
        },
        
        /**
         * Loads up this module's main view
         */
        renderNotificationUtil: function(){
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
    
    return notificationutil;
    
});
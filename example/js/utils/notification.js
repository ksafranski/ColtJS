/**
 * Notification utility for ColtJS
 */
define(function () {

    var notification = {

        notification_id: 'notification', // ID of the notification area
        timeout: true, // Should the notification auto-timeout?
        lifespan: 5000, // If timeout = true, how long?
        show_close_button: true, // Show a button to allow user to close?
        close_button_class: 'notification-close',

        timer: null, // Used to store timeout

        show: function (type, message) {

            var _this = this,
                notification = document.createElement('div');

            // Remove any existing
            this.hide();

            // Cancel existing timeouts
            clearTimeout(this.timer);

            if (this.show_close_button) {
                message += '<a class="notification-close">X</a>';
            }

            notification.id = this.notification_id;
            notification.className = type;
            notification.innerHTML = message;
            document.body.appendChild(notification);

            // If close button, bind click event
            if (this.show_close_button) {
                var close = notification.querySelectorAll('#' + this.notification_id + ' .' + this.close_button_class);
                for (var i = 0, max = close.length; i < max; i++) {
                    Colt.bindEvent(close[i], 'click', function () {
                        _this.hide();
                    });
                }
            }

            // If timed, start timeout
            if (this.timeout) {
                this.timer = setTimeout(function () {
                    _this.hide();
                }, this.lifespan);
            }
        },

        hide: function () {
            var notification = document.getElementById(this.notification_id);
            if (notification) {
                document.body.removeChild(notification);
            }
        }


    };

    return notification;

});
/**
 * Modal window utility for ColtJS
 */

define(function () {

    var modal = {

        modal_overlay_id: 'modal-overlay', // ID of modal overlay
        modal_id: 'modal', // ID of modal object
        modal_content_id: 'modal-content', // ID of modal content region
        modal_close_class: 'modal-close', // Class of objects to close modal

        open: function (width, content) {
            var _this = this,
                modal_overlay = document.createElement('div'),
                modal = document.createElement('div'),
                body = document.body,
                html = document.documentElement;

            // Modal overlay
            modal_overlay.id = this.modal_overlay_id;
            document.body.appendChild(modal_overlay);

            // Modal
            modal.id = _this.modal_id;
            // Set content
            modal.innerHTML = '<div id="' + this.modal_content_id + '">' + content + '</div>';
            // Show modal
            document.body.appendChild(modal);

            // Set positioning
            modal.style.marginLeft = '-' + (Math.round(width / 2)) + 'px';
            
            // Set width
            modal.style.width = width+'px';

            // Get max height value (cross-browser crap...)
            var height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            modal.style.marginTop = Math.round(height / 8) + 'px';

            // Bind close button(s)/link(s)
            var close = modal.querySelectorAll('#' + this.modal_content_id + ' .' + this.modal_close_class);
            for (var i = 0, max = close.length; i < max; i++) {
                Colt.bindEvent(close[i], 'click', function () {
                    _this.close();
                });
            }

            // Bind escape key
            Colt.bindEvent(document, 'keydown', function (event) {
                var code = event.keyCode ? event.keyCode : event.which;
                if (code == 27) {
                    _this.close();
                }
            });
        },

        close: function () {
            var modal_overlay = document.getElementById('modal-overlay'),
                modal = document.getElementById('modal');
            if (modal_overlay && modal) {
                document.body.removeChild(modal_overlay);
                document.body.removeChild(modal);
            }
        }

    };

    return modal;

});
# Colt Modal Utility

The modal utility allows for simple implementation of a modal window.

## Usage

The utility must be added as a dependency to the module, for example:

```
dependencies: {
    'modal' : '/path/to/modal'
    ...
}
```

To open a modal call the following:

```
// Specify content
var modal_content = '<h1>This is a Modal</h1>'
                    + '<p>Lorem ipsum dolor sit amet...</p>'
                    + '<hr><button class="modal-close">Close</button>';
// Calls the method to open modal window
this.modal.open(500,modal_content);
```

The `modal.open()` method accepts 2 paramaters, the first is the width of the modal, the second is the content to display.

Attaching the class `.modal-close` to a button/link/etc will bind that event to close the modal on click.

### Additional Configuration

The following configuration parameters can be set:

```
modal.modal_overlay_id: 'modal-overlay', // ID of modal overlay
modal.modal_id: 'modal', // ID of modal object
modal.modal_content_id: 'modal-content', // ID of modal content region
modal.modal_close_class: 'modal-close', // Class of objects to close modal
```

## Styling

The modal uses two main components, a `div#modal_overlay` which is the transluscent layer that covers the page, and the `div#modal` which is the modal itself. Inside of `div#modal` is `div#modal-content` which is used as a container for the content loaded.
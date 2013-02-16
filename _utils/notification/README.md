# Colt Notification Utility

The notification utility allows for simple implementation of user notifications.

## Usage

The utility must be added as a dependency to the module, for example:

```
dependencies: {
    'notification' : '/path/to/notification'
    ...
}
```

Notifications can be called with the following:

```
this.notification.show('error','This is an error message.');
```

The first parameter is the `type`, which is also the class of the notification, the second argument is the content of the notification.

### Additional Configration

The following configuration parameters can be set:

```
this.notification.notification_id: 'notification', // ID of the notification area
this.notification.timeout: true, // Should the notification auto-timeout?
this.notification.lifespan: 5000, // If timeout = true, how long?
this.notification.show_close_button: true, // Show a button to allow user to close?
this.notification.close_button_class: 'notification-close',
```

## Styling

Notifications are contained in a `div#notification` which gets the `type` class applied to it for styling individual types of notifications.

The notifications also have a close button (optional) which gets the class `.notification-close`
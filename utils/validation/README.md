# Colt Validation Utility

The validation utility allows for simple implementation of form validation.

## Usage

The utility must be added as a dependency to the module, for example:

```
dependencies: {
    'validation' : '/path/to/validation'
    ...
}
```

In the module file specify the `validation_config` object:

```
validation_config: {
    // Events to bind auto-validation
    events: ['keyup','blur'],
    
    // Rules for fields based on input's name param
    rules: {
        fname: {
            required: true,
            minlength: 2,
            maxlength: 32
        },
        lname: {
            required: true,
            minlength: 2,
            maxlength: 32
        },
        email: {
            required: true,
            email: true
        },
        password: {
            required: true,
            minlength: 6
        },
        password_confirm: {
            required: true,
            matches: 'password'
        }
    },
    
    // Messages displayed on validation error
    messages: {
        required: "This field is required",
        minlength: "This field must contain at least {{minlength}} characters",
        maxlength: "This field must not contain more than {{maxlength}} characters",
        email: "This field must contain a valid email address",
        matches: "This field must match {{matches}}"
    }
}
```

### Initializing

To initialize validation on form fields based on `events` use the following:

```
this.validation.bind(this);
```

### Check All

To check all fields (for example; on submission of the form) use the following:

```
var check_all = this.validation.check_all(this);
// Check the returned boolean
if(!check_all){
    alert('Please fill out all required fields');
}
```

## Styling

Validation errors are displayed via a `div.validation_error` appended before the field when an error is thrown. This container then gets a `ul > li` structure inserted to list individual failures.
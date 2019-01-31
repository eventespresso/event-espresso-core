These are some helper functions for working with the status model.

## `eejs.model.statusModel.prettyStatus( statusCode, singular = true, schema = 'sentence' )`

This returns the pretty localized status label string for the given arguments.

### Arguments

| Argument     | Type    | Description                                                                                |
| ------------ | ------- | -------------------------------------------------------------------------------------------|
| `statusCode` | string  | The code to return the pretty label for.  You can use one of the status constants for this.|
| `singular`   | boolean | Whether to return the singular or plural version of the code.                              |
| `schema`     | string  | What schema to use for the label ( 'sentence', 'lower', 'upper' )                          |

### Example

```js
// CANCELLED
console.log(
  eejs.model.statusModel.prettyStatus(
    eejs.model.statusModel.DATETIME_STATUS_ID.CANCELLED,
    true,
    'upper'
  )
);
```

## `eejs.model.statusModel.prettyStatuses( statusCodes, singular = true, schema = 'sentence' )`

This is the same as `prettyStatus` except it accepts an array of status codes and returns an object indexed by the codes with values being the formatted pretty labels for each code according to the provided arguments.

### Arguments

| Argument      | Type   | Description                                                                       |
| ------------- | -------| ----------------------------------------------------------------------------------|
| `statusCodes` | Array  | The codes to return the pretty labels for.  You can use status constants for this.|
| `singular`    | boolean| Whether to return the singular or plural version of the code.                     |
| `schema`      | string | What schema to use for the label ( 'sentence', 'lower', 'upper' )                 |

### Example

```js
// { RPN: 'Pending Payment', RAP: 'Approved' }
eejs.model.statusModel.prettyStatuses(
    [ 
      eejs.model.statusModel.REGISTRATION_STATUS_ID.PENDING_PAYMENT,
      eejs.model.statusModel.REGISTRATION_STATUS_ID.APPROVED
    ],
)
```
These are actions that are used internally by other actions and should be used with care because if used incorrectly it could lead to some unexpected results for persist actions.  Generally speaking, client code should avoid dispatching these actions directly.

These are non-persisting actions.

## `receiveLatestCheckin( checkinEntity, registrationid, dateTimeId )`

Action for receiving the latest check-in record for the given datetime id and registration id.

This does not return a value.

### Arguments

| Argument       | Type                                     | Description                                                  |
| -------------- | -----------------------------------------| -------------------------------------------------------------|
| checkInEntity  | `BaseEntity    `                         | An instance of BaseEntity for the checkin record.            |
| registrationId | `number                `                 | The id of the registration this checkin entity  is related to|
| dateTimeId     | `number`                                `| The id of the datetime this checkin entity is related to     |

### Example

```js
wp.data.dispatch( 'eventespresso/core' ).receiveLatestCheckin( CheckinEntity, 10, 20 );
```

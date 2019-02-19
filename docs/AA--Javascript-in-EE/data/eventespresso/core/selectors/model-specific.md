The following selectors for model specific queries that are available on the object returned by `wp.data.select( 'eventespresso/core' )`.

## `getLatestCheckin( registrationId, dateTimeId )`

This retrieves the latest checkin entity from the state for the given value.  There is a corresponding resolver so if this selector has not been resolved yet for the given arguments, the resolver will retrieve the latest checkin record from the server and assign it to the state as an instance of `BaseEntity`.

### Arguments

| Argument       | Type                 | Description                                          |
| -------------- | -------------------- | ---------------------------------------------------- |
| registrationId | `number    `         | The registration to retrieve the checkin record for. |
| dateTimeId     | `number            ` | The datetime to retrieve the checkin record for.     |
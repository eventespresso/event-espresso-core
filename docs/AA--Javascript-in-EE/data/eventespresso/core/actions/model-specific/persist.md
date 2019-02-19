These are actions that result in persisting things to the server.

## `toggleCheckin( registrationId, dateTimeId, force = false )`

This dispatches an action which toggles the check-in state for the given registration id and datetime id.  In Event Espresso, every checkin action creates a new record and check-ins are also potentially restricted by how many times they can be checked in for a given datetime.  To make this easier for clients, Event Espresso exposes a [special RPC like endpoint](https://github.com/eventespresso/event-espresso-core/blob/master/docs/C--REST-API/ee4-rest-api-rpc-checkin.md) for handling toggling the checkin.

This action makes use of that endpoint and returns the new instance of `BaseEntity` for the new checkin record if the checkin is successfully "toggled" or null if not.

## Arguments

| Argument       | Type                  | Description                                                                                                                                                            |
| -------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| registrationId | `number    `          | The registration id for the registration having its checkin state changed.                                                                                             |
| datetimeId     | `number`              | The datetime id for the datetime the registration is having the checkin state changed for.                                                                             |
| force          | `boolean`             | This is used to flag whether consideration should be given to whether the registration can be checked-in for the given datetime.  If true, then no restrictions apply. |

## Example

```js
const newCheckin = await wp.data.dispatch( 'eventespresso/core' ).toggleCheckin( 10, 20 );
```
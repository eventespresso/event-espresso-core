Various properties on `eejs.model.attendeeModel` that are interfaces for query related functionality.

## `eejs.model.attendeeModel.queryDataTypes`

This is an object describing the properties in the `queryData` object and types for those properties using the `prop-types` library. It's a handy reference for re-usability anywhere `queryData` for the attendeeModel queries are used.

## `eejs.model.attendeeModel.defaultQueryData`

An object describing the default values for properties on the `queryData` object.  It's a handy reference for re-usability anywhere `queryData` for the attendeeModel queries are used.

## `eejs.model.attendeeModel.mapOrderBy( orderBy )`

A function used to map an orderBy string to the actual value used in a `REST` query from the context of an event.  Currently this maps `id`, `lastNameOnly`, `firstNameOnly`, `firstThenLastName` and `lastThenFirstName` to the equivalent attendee model fields for the order_by parameter on a REST request.  Any other values passed in are returned as is.

This returns a string or an array.

### Arguments

| Argument  | Type   | Description                               |
| --------- | ------ | ------------------------------------------|
| `orderBy` | string | The value for `orderBy` that needs mapped.|

### Example

```js
// [ 'ATT_fname', 'ATT_lname' ]
console.log( eejs.model.attendeeModel.mapOrderBy( 'firstThenLastName' ) );
```

## `eejs.model.attendeeModel.whereConditions( queryData )`

This builds where conditions for an attendee REST endpoint request using provided data.  

This returns a string which is the assembled where conditions for the query.

### Arguments

| Argument    | Type   | Description                                                              |
| ----------- | ------ | -------------------------------------------------------------------------|
| `queryData` | Object | Only certain properties are handled for the incoming object (*see below*)|

The following are properties that are used from the incoming `queryData` object:

> Note: `forEventId`, `forDatetimeId`, `forTicketId`, and `forRegistrationId` are hierarchical values.   This means that only one of them is used from the following order: registration, ticket, datetime, event.  If registration id is in the `queryData` then any other `for*` value is ignored etc.

| Property            | Type    | Description                                                                                                              |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ |
| `forEventId`        | number  | Used to restrict the attendee returned to those from a specific event.                                                   |
| `forDatetimeId`     | number  | Used to restrict the attendee returned to those from a specific datetime.                                                |
| `forTicketId`       | number  | Used to restrict the attendee returned to those from a specific ticket.                                                  |
| `forRegistrationId` | number  | Used to restrict the attendee returned to those from a specific registration.                                            |
| `forStatusId`       | string  | Used to restrict the attendee returned to those belonging to any registration with the given registration status code.   |
| `showGravatar`      | boolean | True means to include the gravatar for this attendee (if available) in the response.                                     |

### Example

```js
// where[Registration.Status.STS_ID]=RPN&calculate=user_avatar
console.log( eejs.model.attendeeModel.whereConditions( { showGravatar: true, forStatusId: 'RPN' } ) );
```

## `eejs.model.attendeeModel.getQueryString( queryData = {} )`

Returns a query string for use by a REST request against the attendee endpoint given a set of queryData.

## Arguments

| Argument    | Type   | Description                                                                                                                                                                                                    |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `queryData` | Object | This is a collection of key/value pairs that are used to assemble the query string for the request.  The properties that can be used for this object are described by `eejs.model.attendeeModel.queryDataTypes`|

### Example

```js
// limit=10&where[Registration.Status.STS_ID]=RPN&calculate=user_avatar
console.log( eejs.model.attendeeModel.getQueryString( { limit: 10, showGravatar: true, forStatusId: 'RPN' } ) );
```
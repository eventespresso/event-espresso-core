Various properties on `eejs.model.registrationModel` that are interfaces for query related functionality.

## `eejs.model.registrationModel.queryDataTypes`

This is an object describing the properties in the `queryData` object and types for those properties using the `prop-types` library. It's a handy reference for re-usability anywhere `queryData` for the registrationModel queries are used.

## `eejs.model.registrationModel.defaultQueryData`

An object describing the default values for properties on the `queryData` object.  It's a handy reference for re-usability anywhere `queryData` for the registrationModel queries are used.

## `eejs.model.registrationModel.mapOrderBy( orderBy )`

A function used to map an orderBy string to the actual value used in a `REST` query from the context of a registration.  Currently this maps `reg_id`,  and `reg_date` to the equivalent attendee model fields for the order_by parameter on a REST request.  Any other values passed in are returned as is.

This returns a string.

### Arguments

| Argument  | Type   | Description                               |
| --------- | ------ | ------------------------------------------|
| `orderBy` | string | The value for `orderBy` that needs mapped.|

### Example

```js
// REG_ID
console.log( eejs.model.registrationModel.mapOrderBy( 'reg_id' ) );
```

## `eejs.model.registrationModel.whereConditions( queryData )`

This builds where conditions for an registration REST endpoint request using provided data.  

This returns a string which is the assembled where conditions for the query.

### Arguments

| Argument    | Type   | Description                                                              |
| ----------- | ------ | -------------------------------------------------------------------------|
| `queryData` | Object | Only certain properties are handled for the incoming object (*see below*)|

The following are properties that are used from the incoming `queryData` object:

| Property          | Type    | Description                                                                                     |
| ------------------| ------- | ------------------------------------------------------------------------------------------------|
| `forEventId`      | number  | Used to restrict the registration records returned to those from a specific event.              |
| `forAttendeeId`   | number  | Used to restrict the registration records returned to those from a specific attendee.           |
| `forTicketId`     | number  | Used to restrict the registration records returned to those from a specific ticket.             |
| `forTransactionId`| number  | Used to restrict the registration records returned to those from a specific transaction.        |
| `forStatusId`     | string  | Used to restrict the registration records returned to those from a specific registration status.|

### Example

```js
// where[ATT_ID]=10
console.log( eejs.model.registrationModel.whereConditions( { forAttendeeId: 10 } ) );
```

## `eejs.model.registrationModel.getQueryString( queryData = {} )`

Returns a query string for use by a REST request against the registration endpoint given a set of queryData.

## Arguments

| Argument    | Type   | Description                                                                                                                                                                                                    |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `queryData` | Object | This is a collection of key/value pairs that are used to assemble the query string for the request.  The properties that can be used for this object are described by `eejs.model.registrationModel.queryDataTypes`|

### Example

```js
// limit=10&where[ATT_ID]=10
console.log( eejs.model.registrationModel.getQueryString( { limit: 10, forAttendeeId: 10 } ) );
```
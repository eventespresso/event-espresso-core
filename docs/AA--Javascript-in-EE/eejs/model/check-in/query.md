Various properties on `eejs.model.checkInModel` that are interfaces for query related functionality.

## `eejs.model.checkInModel.queryDataTypes`

This is an object describing the properties in the `queryData` object and types for those properties using the `prop-types` library. It's a handy reference for re-usability anywhere `queryData` for the checkInModel queries are used.

## `eejs.model.checkInModel.defaultQueryData`

An object describing the default values for properties on the `queryData` object.  It's a handy reference for re-usability anywhere `queryData` for the checkInModel queries are used.

## `eejs.model.checkInModel.mapOrderBy( orderBy )`

A function used to map an orderBy string to the actual value used in a `REST` query from the context of a check-in.  Currently this maps `timestamp`,  and `id` to the equivalent attendee model fields for the order_by parameter on a REST request.  Any other values passed in are returned as is.

This returns a string.

### Arguments

| Argument  | Type   | Description                               |
| --------- | ------ | ------------------------------------------|
| `orderBy` | string | The value for `orderBy` that needs mapped.|

### Example

```js
// CHK_timestamp
console.log( eejs.model.checkInModel.mapOrderBy( 'timestamp' ) );
```

## `eejs.model.checkInModel.whereConditions( queryData )`

This builds where conditions for an check-in REST endpoint request using provided data.  

This returns a string which is the assembled where conditions for the query.

### Arguments

| Argument    | Type   | Description                                                              |
| ----------- | ------ | -------------------------------------------------------------------------|
| `queryData` | Object | Only certain properties are handled for the incoming object (*see below*)|

The following are properties that are used from the incoming `queryData` object:

| Property            | Type    | Description                                                                             |
| ------------------- | ------- | ----------------------------------------------------------------------------------------|
| `forEventId`        | number  | Used to restrict the check-in records returned to those from a specific event.          |
| `forDatetimeId`     | number  | Used to restrict the check-in records returned to those from a specific datetime.       |
| `forTicketId`       | number  | Used to restrict the check-in records returned to those from a specific ticket.         |
| `forRegistrationId` | number  | Used to restrict the check-in records returned to those from a specific registration.   |
| `forStatusId`       | string  | Used to restrict the check-in records returned to those from a specific check-in status.|

### Example

```js
// where[Registration.EVT_ID]=10
console.log( eejs.model.checkInModel.whereConditions( { forEventId: 10 } ) );
```

## `eejs.model.checkInModel.getQueryString( queryData = {} )`

Returns a query string for use by a REST request against the check-in endpoint given a set of queryData.

## Arguments

| Argument    | Type   | Description                                                                                                                                                                                                    |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `queryData` | Object | This is a collection of key/value pairs that are used to assemble the query string for the request.  The properties that can be used for this object are described by `eejs.model.checkInModel.queryDataTypes`|

### Example

```js
// limit=10&where[Registration.EVT_ID]=10
console.log( eejs.model.checkInModel.getQueryString( { limit: 10, forEventId: 10 } ) );
```
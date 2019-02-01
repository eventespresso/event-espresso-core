Various properties on `eejs.model.ticketModel` that are interfaces for query related functionality.

## `eejs.model.ticketModel.queryDataTypes`

This is an object describing the properties in the `queryData` object and types for those properties using the `prop-types` library. It's a handy reference for re-usability anywhere `queryData` for the ticketModel queries are used.

## `eejs.model.ticketModel.defaultQueryData`

An object describing the default values for properties on the `queryData` object.  It's a handy reference for re-usability anywhere `queryData` for the ticketModel queries are used.

## `eejs.model.ticketModel.mapOrderBy( orderBy )`

A function used to map an orderBy string to the actual value used in a `REST` query from the context of a ticket.  Currently this maps `start_date`, and `end_date`  to the equivalent ticket model fields for the order_by parameter on a REST request.  Any other values passed in are returned as is.

This returns a string.

### Arguments

| Argument  | Type   | Description                               |
| --------- | ------ | ------------------------------------------|
| `orderBy` | string | The value for `orderBy` that needs mapped.|

### Example

```js
// TKT_start_date
console.log( eejs.model.ticketModel.mapOrderBy( 'start_date' ) );
```

## `eejs.model.ticketModel.whereConditions( queryData )`

This builds where conditions for a ticket REST endpoint request using provided data.  

This returns a string which is the assembled where conditions for the query.

### Arguments

| Argument    | Type   | Description                                                              |
| ----------- | ------ | -------------------------------------------------------------------------|
| `queryData` | Object | Only certain properties are handled for the incoming object (*see below*)|

The following are properties that are used from the incoming `queryData` object:

| Property         | Type    | Description                                                                                                                                          |
| ---------------- | ------- | -----------------------------------------------------------------------------------------------------------------------------------------------------|
| `month`          | string  | Expected to be in a month format recognized by `moment`                                                                                              |
| `showExpired`    | boolean | Used to indicate whether or not "expired" tickets should be retrieved.  If `false` then any tickets with end dates prior to now will not be returned.|
| `forEventId`     | number  | Used to restrict the ticket records returned to those from a specific event.                                                                         |
| `forDatetimeId`  | number  | Used to restrict the ticket records returned to those from a specific datetime.                                                                      |

### Example

```js
// where[Datetime.Event.EVT_ID]=10
console.log( eejs.model.ticketModel.whereConditions( { forEventId: 10 } ) );
```

## `eejs.model.ticketModel.getQueryString( queryData = {} )`

Returns a query string for use by a REST request against the ticket endpoint given a set of queryData.

## Arguments

| Argument    | Type   | Description                                                                                                                                                                                                    |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `queryData` | Object | This is a collection of key/value pairs that are used to assemble the query string for the request.  The properties that can be used for this object are described by `eejs.model.ticketModel.queryDataTypes`|

### Example

```js
// limit=20&where[Datetime.Event.EVT_ID]=209
console.log( eejs.model.ticketModel.getQueryString( { limit: 20, forEventId: 209 } ) );
```
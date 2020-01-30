Various properties on `eejs.model.statusModel` that are interfaces for query related functionality.

## `eejs.model.statusModel.queryDataTypes`

This is an object describing the properties in the `queryData` object and types for those properties using the `prop-types` library. It's a handy reference for re-usability anywhere `queryData` for the statusModel queries are used.

## `eejs.model.statusModel.defaultQueryData`

An object describing the default values for properties on the `queryData` object.  It's a handy reference for re-usability anywhere `queryData` for the statusModel queries are used.

## `eejs.model.statusModel.mapOrderBy( orderBy )`

A function used to map an orderBy string to the actual value used in a `REST` query from the context of a status.  Currently this maps `statusCode` to the equivalent status model fields for the order_by parameter on a REST request.  Any other values passed in are returned as is.

This returns a string.

### Arguments

| Argument  | Type   | Description                               |
| --------- | ------ | ------------------------------------------|
| `orderBy` | string | The value for `orderBy` that needs mapped.|

### Example

```js
// STS_code
console.log( eejs.model.statusModel.mapOrderBy( 'statusCode' ) );
```

## `eejs.model.statusModel.whereConditions( queryData )`

This builds where conditions for an status REST endpoint request using provided data.  

This returns a string which is the assembled where conditions for the query.

### Arguments

| Argument    | Type   | Description                                                              |
| ----------- | ------ | -------------------------------------------------------------------------|
| `queryData` | Object | Only certain properties are handled for the incoming object (*see below*)|

The following are properties that are used from the incoming `queryData` object:

| Property      | Type  | Description                                   |
| ------------- | ------| ----------------------------------------------|
| `statusType`  | string| The _type_ of status to retrieve statuses for.|

### Example

```js
// where[STS_type]=registration
console.log( eejs.model.statusModel.whereConditions( { statusType: eejs.model.statusModel.STATUS_TYPE_REGISTRATION } ) );
```

## `eejs.model.statusModel.getQueryString( queryData = {} )`

Returns a query string for use by a REST request against the status endpoint given a set of queryData.

## Arguments

| Argument    | Type   | Description                                                                                                                                                                                                    |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `queryData` | Object | This is a collection of key/value pairs that are used to assemble the query string for the request.  The properties that can be used for this object are described by `eejs.model.statusModel.queryDataTypes`|

### Example

```js
// limit=30&where[STS_type]=registration
console.log( eejs.model.statusModel.getQueryString( { limit: 30, statusType: eejs.model.statusModel.STATUS_TYPE_REGISTRATION } ) );
```
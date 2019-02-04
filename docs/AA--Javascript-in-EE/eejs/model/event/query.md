Various properties on `eejs.model.eventModel` that are interfaces for query related functionality.

## `eejs.model.eventModel.queryDataTypes`

This is an object describing the properties in the `queryData` object and types for those properties using the `prop-types` library. It's a handy reference for re-usability anywhere `queryData` for the eventModel queries are used.

## `eejs.model.eventModel.defaultQueryData`

An object describing the default values for properties on the `queryData` object.  It's a handy reference for re-usability anywhere `queryData` for the eventModel queries are used.

## `eejs.model.eventModel.mapOrderBy( orderBy )`

A function used to map an orderBy string to the actual value used in a `REST` query from the context of an event.  Currently this maps `start_date`, `end_date`, `ticket_start` and `ticket_end` to the equivalent event model fields for the order_by parameter on a REST request.  Any other values passed in are returned as is.

This returns a string.

### Arguments

| Argument  | Type   | Description                               |
| --------- | ------ | ------------------------------------------|
| `orderBy` | string | The value for `orderBy` that needs mapped.|

### Example

```js
// Datetime.DTT_EVT_start
console.log( eejs.model.eventModel.mapOrderBy( 'start_date' ) );
```

## `eejs.model.eventModel.whereConditions( queryData )`

This builds where conditions for an event REST endpoint request using provided data.  

This returns a string which is the assembled where conditions for the query.

### Arguments

| Argument    | Type   | Description                                                              |
| ----------- | ------ | -------------------------------------------------------------------------|
| `queryData` | Object | Only certain properties are handled for the incoming object (*see below*)|

The following are properties that are used from the incoming `queryData` object:

| Property       | Type    | Description                                                                                                                                                   |
| -------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `month`        | string  | Expected to be in a month format recognized by `moment`                                                                                                       |
| `showExpired`  | boolean | Used to indicate whether or not "expired" events should be retrieved.  If `false` then any events with all related dates prior to _now_ will not be retrieved.|
| `categorySlug` | string  | Used to restrict the events returned to those from a specific event category.                                                                                 |

### Example

```js
// where[Term_Relationship.Term_Taxonomy.Term.slug]=parties
console.log( eejs.model.eventModel.whereConditions( { categorySlug: 'parties' } ) );
```

## `eejs.model.eventModel.getQueryString( queryData = {} )`

Returns a query string for use by a REST request against the event endpoint given a set of queryData.

## Arguments

| Argument    | Type   | Description                                                                                                                                                                                                    |
| ----------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `queryData` | Object | This is a collection of key/value pairs that are used to assemble the query string for the request.  The properties that can be used for this object are described by `eejs.model.eventModel.queryDataTypes`|

### Example

```js
// limit=10&where[Term_Relationship.Term_Taxonomy.Term.slug]=parties
console.log( eejs.model.eventModel.getQueryString( { limit: 10, categorySlug: 'parties' } ) );
```
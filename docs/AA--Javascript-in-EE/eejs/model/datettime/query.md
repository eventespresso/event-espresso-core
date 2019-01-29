Various properties on `eejs.model.dateTimeModel` that are interfaces for query related functionality.

## `eejs.model.dateTimeModel.nowDateAndTime()`

This is a handy helper for getting the nowDateAndTime represented as a `moment` instance. It's recommended instead of using this that you use the [`DateTime`](../../../value-objects/datetime.md) value object instead.

This returns an instance of `moment`

### Arguments

There are no arguments for this function

## `eejs.model.dateTimeModel.queryDataTypes`

This is an object describing the properties in the `queryData` object and types for those properties using the `prop-types` library. It's a handy reference for re-usability anywhere `queryData` for the dateTimeModel queries is used.

## `eejs.model.dateTimeModel.defaultQueryData`

An object describing the default values for properties on the `queryData` object.  It's a handy reference for re-usability anywhere `queryData` for the dateTimeModel queries are used.

## `eejs.model.dateTimeModel.mapOrderBy( orderBy )`

A function used to map an orderBy string to the actual value used in a `REST` query from the context of an event.  Currently this maps `start_date` and `end_date` to the equivalent datetime model fields for the order_by parameter on a REST request.  Any other values passed in are returned as is.

This returns a string.

### Arguments

| Argument  | Type   | Description                               |
| --------- | ------ | ------------------------------------------|
| `orderBy` | string | The value for `orderBy` that needs mapped.|

### Example

```js
// DTT_EVT_start
console.log( eejs.model.dateTimeModel.mapOrderBy( 'start_date' ) );
```

## `eejs.model.dateTimeModel.whereConditions( queryData )`

This builds where conditions for a datetime REST endpoint request using provided data.  

In the object passed in to this function, only the following properties are handled:

* **month**:  Expected to be in a month format recognized by `moment`
* **showExpired**: Expected to be a `boolean` that indicates whether or not "expired" dates should be retrieved.  If `false` then any dates prior to "now" will not  be retrieved.
* **forEventId**: Used to restrict the dates returned to those for the given Event id.  Expects `number` type.

This returns a string which is the assembled where conditions for the query.

### Arguments

| Argument    | Type   | Description                                                              |
| ----------- | ------ | -------------------------------------------------------------------------|
| `queryData` | Object | Only certain properties are handled for the incoming object (*see below*)|

The following are properties that are used from the incoming `queryData` object:

| Property      | Type    | Description                                                                                                                          |
| ------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------|
| `month`       | string  | Expected to be in a month format recognized by `moment`                                                                              |
| `showExpired` | boolean | Used to indicate whether or not "expired" dates should be retrieved.  If `false` then any dates prior to _now_ will not be retrieved.|
| `forEventId`  | number  | Used to restrict the dates returned to those for the given Event id.                                                                 |

### Example

```js
// where[Event.EVT_ID]=10
console.log( eejs.model.dateTimeModel.whereConditions( { forEventId: 10 } ) );
```
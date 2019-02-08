## `eejs.model.dateTimeModel.prettyDateFromDateTime( DateTimeEntity )`

This function returns a prettified label for the provided Datetime object.  The object provided can be either a `BaseEntity` instance for the datetime model, or a plain object that has the expected field names for the datetime model as properties.

If there is a non-empty `DTT_name`, the format will be: `DTT_name (DTT_EVT_start - DTT_EVT_end)`

If there is an empty `DTT_name`, then the format will be `DTT_EVT_start - DTT_EVT_end`.

This will account for if both start and end time are in the same day and simply use time for the end part.

The format of the date and time will be in whatever is set as the _site_ formats.

### Arguments

| Argument         | Type        | Description |
| ---------------- | ----------- | ----------- |
| `DateTimeEntity` | BaseEntity\|Object | Either an instance of BaseEntity or a plain object having the expected field names for the datetime model as properties.   `DTT_EVT_start` and `DTT_EVT_end` properties are expected to have `eejs.valueObjects.DateTime` value objects as the values.          |

### Example

```js
// DateTimeA and DateTimeB are `eejs.valueObjects.DateTime` value objects.
const entity = { DTT_name: 'My Date', DTT_EVT_start:  DateTimeA, DTT_EVT_end: DateTimeB };
// My Date (01/12/19 10:00 am - 2:00pm)
console.log( eejs.model.dateTimeModel.prettyDateFromDateTime( entity ) );
```
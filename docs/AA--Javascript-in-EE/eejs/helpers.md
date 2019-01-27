## `eejs.helpers`

This property is a set of various "helper" or utility functions with various purposes.  Currently the following helpers are exposed on this property. This is made available on the `eejs` global when the `CoreAssetManager::JS_HANDLE_HELPERS` script handle is registered as a dependency for wp scripts.

| Helper | Description |
| ------- | ----------- |
| `DATE_TIME_FORMAT_MYSQL` | A format string used to represent the mysql date-time format |
| `DATE_TIME_FORMAT_ISO8601` | A format string used to represent the ISO8601 date-time format.
| `DATE_TIME_FORMAT_SITE` | A format string used to represent whatever is the current set date and time format for the current WordPress site.
| `DATE_FORMAT_SITE` | Just the date format string for the site.
| `TIME_FORMAT_SITE` | Just the time format string for the site.
| [`formatDateString`](./helpers.md#eejshelpersformatDateString-datestring-format-local-) | A function that receives `dateString`, `format` and `local` arguments and returns a string in the provided format. |
| formatMysqlDateString | A function that receives `dateString` and `local` arguments and returns a string in the MySql date and time format. |
| formatSiteDateString | A function that returns the provided dateString in the format currently set site date and time format.
| stringToMoment | A function that receives a `moment` library parseable date string and returns a `moment` object.
| allDateTimesAsString | Receives an indefinite number of dateStrings as arguments and concatenates them together with the provided separator.
| dateFormats | All object containing all available site formats exposed via the eejs.data global from the server |
| FORMAT_SITE_DATE | The date format used by the site (or mysql date format if not set |
| FORMAT_SITE_TIME | The time format used by the site (or mysql date format if not set |
| SEPARATOR_SPACE_DASH_SPACE | A constant used to represent this string: ` - ` |
| SEPARATOR_COMMA_SPACE | A constant used to represent this string: `, ` |

### Other helpers:
### `eejs.helpers.convertToObjectFromMap( mapObject )`
Given a map object, this returns its contents as  plain object.

**Example:**
```js
const map = new Map( [ [ 10, 'foo' ], [ 20, 'bar' ] ] );
const object = eejs.helpers.convertToObjectFromMap( map );
// { 10: foo, 20: bar } 
console.log( object );
```
### `eejs.helpers.mapReducer( map, reducerCallback, defaultValue )`
This is a reducer for map objects.

**Example:**
```js
const map = new Map( [ [ 10, 'foo' ], [ 20, 'bar' ] ] );
const reducerCallback = ( accumulator, value, key ) => accumulator[ value ] = key;
const object = eejs.helpers.mapReducer( map, reducerCallback, {} );
// { foo: 10, bar: 20 }
console.log( object );
```
### `eejs.helpers.mergeAndDeDuplicateArrays( ...arrays )`
This utility function will merge and de-duplicate all incoming arrays so there is only one of each value in the returned array.

**Example:**
```js
const merged = eejs.helpers.mergeAndDeDuplicateArrays(
  [ 1, 2, 3 ],
  [ 2, 3, 4 ],
  [ 4, 5, 6, 7 ]
);
// [ 1, 2, 3, 4, 5, 6, 7 ]
console.log( merged )
```
### `eejs.helpers.mergeAndDeDuplicateObjects( property, ...arrays )`
This utility function will merge and de-duplicate arrays of objects into one array with no duplicate values for objects with the provided property.

**Example:**
```js
const merged = eejs.helpers.mergeAndDeDuplicateObjects(
  'id',
  [
    { id: 10, name: 'ten' },
    { id: 30, name: 'thirty' },
    { id: 25, name: 'twenty-five' },
  ],
  [
    { id: 10, name: 'ten' },
    { id: 50, name: 'fifty' },
  ],
  [
    { id: 30, name: 'thirty' },
    { id: 15, name: 'fifteen' },
  ],
);
// [
// 	  { id: 10, name: 'ten' },
// 	  { id: 30, name: 'thirty' },
// 	  { id: 25, name: 'twenty-five' },
// 	  { id: 50, name: 'fifty' },
// 	  { id: 15, name: 'fifteen' },
// ],
console.log( merged );
```
## `eejs.helpers`

This property is a set of various "helper" or utility functions with various purposes.  Currently the following helpers are exposed on this property. This is made available on the `eejs` global when the `CoreAssetManager::JS_HANDLE_HELPERS` script handle is registered as a dependency for wp scripts.

| Helper | Description |
| ------- | ----------- |
| `DATE_TIME_FORMAT_MYSQL` | A format string used to represent the mysql date-time format |
| `DATE_TIME_FORMAT_ISO8601` | A format string used to represent the ISO8601 date-time format.
| `DATE_TIME_FORMAT_SITE` | A format string used to represent whatever is the current set date and time format for the current WordPress site.
| `DATE_FORMAT_SITE` | Just the date format string for the site.
| `TIME_FORMAT_SITE` | Just the time format string for the site.
| [`formatDateString`](./helpers.md#eejshelpersformatdatestring-datestring---format--date_time_format_is8601-local--true-) | A function that receives `dateString`, `format` and `local` arguments and returns a string in the provided format. |
|[`formatMysqlDateString`](./helpers.md#eejshelpersformatmysqldatestring-datestring---local--true-) | A function that receives `dateString` and `local` arguments and returns a string in the MySql date and time format. |
| [`formatSiteDateString`](./helpers.md#eejshelpersformatsitedatestring-datestring---local--true-) | A function that returns the provided dateString in the format currently set site date and time format.
| [`stringToMoment`](./helpers.md#eejshelpersstringtomoment-datestring---) | A function that receives a `moment` library parseable date string and returns a `moment` object.
| [`allDateTimesAsString`](./helpers.md#eejshelpersalldatetimesasstring-separator------datestrings-) | Receives an indefinite number of dateStrings as arguments and concatenates them together with the provided separator.
| `dateFormats` | All object containing all available site formats exposed via the eejs.data global from the server |
| `FORMAT_SITE_DATE` | The date format used by the site (or mysql date format if not set |
| `FORMAT_SITE_TIME` | The time format used by the site (or mysql date format if not set |
| `SEPARATOR_SPACE_DASH_SPACE` | A constant used to represent this string: ` - ` |
| `SEPARATOR_COMMA_SPACE` | A constant used to represent this string: `, ` |
| [`convertToObjectFromMap`](./helpers.md#eejshelpersconverttoobjectfrommap-mapobject-)        |            Given a javascript [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), this returns it converted to a plain object. |
| [`convertToMapFromObject`](./helpers.md#eejshelpersconverttomapfromobject-entities-)        | Given a plain object of `BaseEntity` entities, this converts them to a javascript [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)             |
| [`getIdsFromBaseEntityArray`](./helpers.md#eejshelpersgetidsfrombaseentityarray-entities-)        | Given an array of `BaseEntity` instances, this returns an array of ids for those entities.             |
| [`mapReducer`](./helpers.md#eejshelpersmapreducer-map-reducercallback-defaultvalue-)        | A reducer for javascript [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) objects.             |
| [`mergeAndDeDuplicateArrays`](./helpers.md#eejshelpersmergeanddeduplicatearrays-arrays-)        | Given any number of arrays as arguments, this function will merge and de-duplicate entries in the arrays so there are is only one of each value in the returned (new) array.             |
| [`mergeAndDeDuplicateObjects`](./helpers.md#eejshelpersmergeanddeduplicateobjects-property-arrays-)        |  Given any number of arrays of objects, this function will merge and de-duplicate into one array with no duplicates, values for those objects with the provided property.            |
| [`normalizeEntityId`](./helpers.md#eejshelpersnormalizeentityid-id-)        | Given a value representing an id, this will _normalize_ it.  Normalizing means that if the incoming value is a `cuid`, then it is left as a string.  Otherwise it is cast to an integer.  The purpose being that something like, `'20'` (string) would become `20` (integer)            |
| [`removeEmptyFromState`](./helpers.md#eejshelpersremoveemptyfromstate-state-path-lengthremaining--1-withmutations--true-)        | Utility function for recursively removing empty `List`/`Map` from the `Map` on the given path ([`Immutable.Map`](https://facebook.github.io/immutable-js/docs/#/Map) or [`Immutable.List`](https://facebook.github.io/immutable-js/docs/#/List))             |


## `eejs.helpers.formatDateString( dateString = '', format = DATE_TIME_FORMAT_ISO8601, local = true )`

Receives a moment parseable date string and returns a string in given format.

### Arguments

| Argument     | Type    | Description                                                                                                                                                                                                                                                |
| ------------ | ------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dateString` | string  | An incoming date string that should be parseable by `moment`.                                                                                                                                                                                              |
| `format`     | string  | Should be a format useable by `moment`.  Defaults to the `DATE_TIME_FORMAT_ISO8610` constant value.                                                                                                                                                        |
| `local`      | boolean | Whether or not to convert the date to the local time on output (_local_ meaning the browser set timezone).  If this is set to true, it is recommended that the passed in date string is in UTC _or_ the format of the incoming string includes offset info.|

### Example:

```js
// "19-01-27"
console.log( eejs.helpers.formatDateString( '2019-01-27T23:57:49', 'YY-MM-DD' ) );
```
## `eejs.helpers.formatMysqlDateString( dateString = '', local = true )`

Receives a moment parseable date string and returns a string in the Mysql date and time format.

### Arguments

| Argument     | Type    | Description                                                                                                                                                                                                                                         |
| ------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dateString` | string  | Should be parseable by moment.                                                                                                                                                                                                                      |
| `local`      | boolean | Whether or not to convert the date to the local time on output (local being the browser set timezone).  If this is set to true, it is recommended that the incoming date string is in UTC or the format of the incoming string includes offset info.|

### Example

```js
// "2019-01-27 23:57:49"
console.log( eejs.helpers.formatMysqlDateString( '2019-01-27T23:57:49' ) );
```

## `eejs.helpers.formatSiteDateString( dateString = '', local = true )`

Receives a moment parseable date string and returns a string in the format currently set on the host site.

### Arguments

| Argument     | Type    | Description                                                                                                                                                                                                                                         |
| ------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `dateString` | string  | Should be parseable by moment.                                                                                                                                                                                                                      |
| `local`      | boolean | Whether or not to convert the date to the local time on output (local being the browser set timezone).  If this is set to true, it is recommended that the incoming date string is in UTC or the format of the incoming string includes offset info.|

### Example:

```js
// assuming the site format is DD/MM/YYYY h:mm a
// "27/01/2019 11:57 pm"
console.log( eejs.helpers.formatSiteDateString( '2019-01-27T23:57:49' ) );
```

## `eejs.helpers.stringToMoment( dateString = '' )`

A wrapper for returning a moment object.  If `dateString` is provided, a moment object is returned for that date string.  Otherwise, the moment object will represent "now" (the time the object was created).

### Arguments

| Argument     | Type   | Description                   |
| ------------ | ------ | ----------------------------- |
| `dateString` | string | Should be parseable by moment |

### Example

```js
// Moment{}
console.log( eejs.helpers.stringToMoment( '2019-01-27T23:57:49' ) );
```

## `eejs.helpers.allDateTimesAsString( separator = ' - ', ...dateStrings )`

Receives an indefinite number of date strings as arguments and concatenates them together with the given separator.

### Arguments

| Argument        | Type   | Description                                             |
| ----------------| ------ | ------------------------------------------------------- |
| `separator`     | string | What is used in between each string                     |
| `...dateStrings`| string | Each additional argument are the strings to concatenate |

### Example

```js
// July 12, 2019 - February 15, 2000 10:00am - 12-28-2020
console.log( eejs.helpers.allDateTimesAsString(
   ' - ',
  'July 12, 2019',
  'February 15, 2000 10::00am',
  '12-28-2020'
 ) );
```

## `eejs.helpers.convertToObjectFromMap( mapObject )`

Given a map object, this returns its contents as  plain object.

### Arguments

| Argument    | Type | Description                                                                                                                          |
| ----------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------|
| `mapObject` | Map  | A javascript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) to convert to a plain object|

### Example:
```js
const map = new Map( [ [ 10, 'foo' ], [ 20, 'bar' ] ] );
const object = eejs.helpers.convertToObjectFromMap( map );
// { 10: foo, 20: bar } 
console.log( object );
```

## `eejs.helpers.convertToMapFromObject( entities )`

Converts an incoming plain object of `BaseEntity` instances into a javascript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) object.

### Arguments:

| Argument   | Type  | Description                       |
| ---------- | ----- | ----------------------------------|
| `entities` | Array | An array of `BaseEntity` instances|

### Example:

```js
const entities = { EventA, EventB, EventC };
const entitiesAsMap = eejs.helpers.convertToMapFromObject( entities );
// Map{ [ [ 10, EventA ], [ 20, EventB ], [ 30, EventC ] ] }
console.log( entitiesAsMap );
```

## `eejs.helpers.getIdsFromBaseEntityArray( entities )`

Extract the ids from an array of `BaseEntity` instances.  **Note:** This could return a smaller count of array items if anything in the incoming array is not a `BaseEntity` instance.

### Arguments

| Argument   | Type  | Description                       |
| ---------- | ----- | ----------------------------------|
| `entities` | Array | An array of `BaseEntity` instances|

### Example:

```js
const entities = [ EventA, 20, EventC ];
// [ 10, 30 ]
console.log( eejs.helpers.getIdsFromBaseEntityArray( entities ) );
```

##  `eejs.helpers.mapReducer( map, reducerCallback, defaultValue )`

This is a reducer for map objects.

### Arguments

| Argument          | Type     | Description                                                                                                                                                                             |
| ----------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `map`             | Map      | A javascript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map) being reduced.                                                                 |
| `reducerCallback` | function | Same shape as callback used for regular reducers. So the callback will receive the `accumulator` object, the `value` for the current iteration, and the `key` for the current iteration |
| `defaultValue`    | mixed    | The default value for the accumulator in the reducer.                                                                                                                                   |

### Example:
```js
const map = new Map( [ [ 10, 'foo' ], [ 20, 'bar' ] ] );
const reducerCallback = ( accumulator, value, key ) => accumulator[ value ] = key;
const object = eejs.helpers.mapReducer( map, reducerCallback, {} );
// { foo: 10, bar: 20 }
console.log( object );
```

## `eejs.helpers.mergeAndDeDuplicateArrays( ...arrays )`

This utility function will merge and de-duplicate all incoming arrays so there is only one of each value in the returned array.

### Arguments

| Argument    | Type  | Description                                              |
| ----------- | ----- | -------------------------------------------------------- |
| `...arrays` | Array | An indefinite number of arrays to merge and de-duplicate |

### Example:
```js
const merged = eejs.helpers.mergeAndDeDuplicateArrays(
  [ 1, 2, 3 ],
  [ 2, 3, 4 ],
  [ 4, 5, 6, 7 ]
);
// [ 1, 2, 3, 4, 5, 6, 7 ]
console.log( merged )
```

##  `eejs.helpers.mergeAndDeDuplicateObjects( property, ...arrays )`

This utility function will merge and de-duplicate arrays of objects into one array with no duplicate values for objects with the provided property.  This is used for something like entities where you want to remove from an array multiple entities with the same `id` property.

### Arguments

| Argument    | Type   | Description                                                                                                                                                                                                      |
| ----------- | ------ | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `property`  | string | The property that is used to compare "equality" with.  This means that if objects being compared have the same property and the value is the same, then they are considered "equal" for the purpose of de-duping.|
| `...arrays` | Array  | Accepts multiple arrays of objects                                                                                                                                                                               |

### Example: 
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

## `eejs.helpers.normalizeEntityId( id )`

Given a value representing an id, this will normalize it. Normalizing means that if the incoming value is a `cuid`, then it is left as a string. Otherwise it is cast to an integer. The purpose being that something like, `'20'` (string) would become `20` (integer)

### Arguments

| Argument | Type    | Description |
| -------- | ------- | ----------- |
| `id`     | string\|number | The id value to be normalized             |

### Example

```js
const stringId = 'cjrfn5avg00003g8r743xsgl5';
const integerId = '20';
// 'cjrfn5avg00003g8r743xsgl5'
console.log( eejs.helpers.normalizeEntityId ( stringId ) );
// 20
console.log( eejs.helpers.normalizeEntityId( integerId ) );
```

## `eejs.helpers.removeEmptyFromState( state, path, lengthRemaining = 1, withMutations = true )`

Utility function for recursively removing empty `List`/`Map` from the `Map` on the given path ([`Immutable.Map`](https://facebook.github.io/immutable-js/docs/#/Map) or [`Immutable.List`](https://facebook.github.io/immutable-js/docs/#/List)).

This will stop deleting paths from the state either when there are no more empty values, or when the count of items in the path matches the `lengthRemaining` value.

**Note:** It's important to remember that `Immutable.List.deleteIn` and `Immutable.List.delete` **cannot** be safely used within `withMutations`.  So this function should not be used when deleting paths within an `Immutable.List`.

### Arguments

| Argument         | Type          | Description                                                                                                                             |
| -----------------| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------|
| `state`          | Immutable.Map | Incoming state to recursively clear empty values from.                                                                                  |
| `path`           | Array         | The path to recursively clear empty values from in the state map                                                                        |
| `lengthRemaining`| number        | What number of path items to leave remaining on recursion (defaults to 1)                                                               |
| `withMutations`  | boolean       | Whether to call the recursion via the `Immutable.withMutations` function (true) or assume the incoming state is already mutable (false).|

### Example

```js
const state = Immutable.fromJS( 
  {
    a: {
      foo: {
      }
    },
    b: { bar: 10 }
  }
);
const clearedState = eejs.helpers.removeEmptyFromState( state, [ 'a' ], 0 );
// { b: { bar: 10 } }
console.log( clearedState.toJS() );
```
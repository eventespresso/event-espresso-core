This file contains "base" functions that are utility helpers exposed on `eejs.model`;

## `eejs.model.pluralModelName( modelName )`

This is a memoized function used to normalize the incoming string to the plural form. It uses [`pluralize`](https://www.npmjs.com/package/pluralize) under the hood.

### Arguments

| Argument    | Type   | Description                        |
| ----------- | ------ | ---------------------------------- |
| `modelName` | string | The name of the model to pluralize |

### Example

```js
// events
console.log(  eejs.model.pluralModelName( 'event' ) );
// people
console.log( eejs.model.pluralModelName( 'person' ) );
```

## `eejs.model.singularModelName( modelName )`

A memoized function used to normalize the incoming string to its singular form.  It uses [`pluralize`](https://www.npmjs.com/package/pluralize) under the hood.

### Arguments

| Argument    | Type   | Description                          |
| ----------- | ------ | ------------------------------------ |
| `modelName` | string | The name of the model to singularize |

### Example

```js
// event
console.log( eejs.model.singularModelName( 'events' ) );
// person
console.log( eejs.model.singularModelName( 'people' ) );
```

## `eejs.model.getQueryString( queryData = {}, whereConditions = () => null, mapOrderBy = ( orderBy ) => orderBy )`

This returns a query string for use by a REST request given a collection of queryData. This is mostly used by the `eejs.model` objects (`eejs.model.eventModel`, `eejs.model.datetimeModel` etc) for prepping the query string for a query.

This returns a string.

### Arguments

| Argument         | Type     |   Description                                                                                                                                                                                                                                                                      |
| -----------------| -------- | -----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `queryData`      | Object   |   Collection of key/value pairs used to generate the query.  Typically this would have `limit`, `order`, `orderBy`, and `defaultWhereConditions` properties with all being optional.                                                                                               |
| `whereConditions`| function |   A function for prepping the where conditions from the queryData.  This function is fed the `queryData` object so it allows for custom setting of where conditions via any properties found in the queryData object. This function should return a string for the where conditions|
| `mapOrderBy`     | function |   This is a function for mapping incoming orderby strings to the value needed for the query string.  The function can return an array of fields to order by or a string and both are handled.                                                                                      |

### Example

```js
const queryData = { limit: 100, orderBy: 'start_date', order: 'DESC', showExpired: true };
const whereConditions = ( { showExpired } ) => {
  const where = [];
  if ( showExpired ) {
    where.push( 'where[DateExpired]=true' )
  }
  return where.join( '&' );
}
const mapOrderBy = ( orderBy ) => {
  const orderByMap = { 'start_date' => 'DateStartDate' };
  return typeof orderByMap[ orderBy ] === 'undefined' ? orderBy : orderByMap[ orderBy ];
}
// limit=100&order_by&orderBy[DateStartDate]=DESC&where[DateExpired=true]
console.log( eejs.model.getQueryString( queryData, whereConditions, mapOrderBy ) );
```
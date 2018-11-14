# The `eejs` Module

This module is exposed via the [`eejs-core` dependency](eejs-core-dependency.md).  Any javascript loaded with that as a dependency has access to anything on the eejs global.

You can use any of the properties of `eejs` in your webpack builds by making the `eejs-core` script handle a dependency for your loaded javascript and then doing something like this in your own js:

```js
import { data, routes } from '@eventespresso/eejs'
```

Then in your webpack configuration you'd just need to define `@eventespresso/eejs` as an external that points to the `eejs` global.  So something like:

```js
const config = {
   externals: {
       '@eventespresso/eejs': 'eejs'
   }
}
```

Currently the following things are exposed:

## `eejs.data`

This is intended for holding arbitrary data that can be passed from the server to the client for use in other javascript.  You can [read more about exposing custom data here](eejs-data-api.md).

By default, `eejs.data` will always have the following exposed on it:

| Property | Description | Usage Example |
| ---------|-------------|---------------|
| `eejs_api_nonce` | This is the value of `wp_create_nonce('wp_rest')` in case you need to set the nonce headers for WP Rest requests in a WordPress context. | `eejs.data.eejs_api_nonce` |
| `paths` |  This is an object containing various references to paths on the site.  Currently it exposes `rest_url`, `site_url`, and `admin_url`. | `eejs.paths.rest_url`, `eejs.paths.site_url`, `eejs.paths.admin_url` |


## `eejs.routes`

This property holds various route information and accessors.  Currently the following is exposed on it:

| Property | Description | Usage Example |
| --------|-------------|--------------|
| `SITE_URL` | Equivalent to `eejs.data.paths.site_url` | `eejs.routes.SITE_URL` |
| `ADMIN_URL` | Equivalent to `eejs.data.paths.admin_url` | `eejs.routes.ADMIN_URL` |
| `ADMIN_ROUTES` | An object containing all the slugs for each route in the EE core admin pages. | `eejs.routes.ADMIN_ROUTE.EVENT` would return `'espresso_events'` |
| `ADMIN_ROUTE_ACTION_DEFAULT` | This returns the 'default' string that is used for all default actions on EE admin page routes |  `eejs.routes.ADMIN_ROUTE_ACTION_DEFAULT` |
| `ADMIN_ROUTE_ACTIONS` | This is a map of available admin page actions for each admin page slug in Event Espresso admin routes. | `eejs.routes.ADMIN_ROUTE_ACTIONS.EVENT.CATEGORY_LIST` would return `'category_list'`
| `getAdminUrl` | This is a function that receives `page` and `action` arguments and will return a url to that admin page and action. | `eejs.routes.getAdminUrl()` with no arguments will return something like `https://eetest.test/wp-admin/admin.php?page=espresso_events&action=default`.  `eejs.routes.getAdminUrl( eejs.ADMIN_ROUTES.REGISTRATION, eejs.ADMIN_ROUTES.REGISTRATION.REPORTS )` would return something like `https://eetest.test/wp-admin/admin.php?page=espresso_registrations&action=reports` |

## `eejs.vendor`

This property contains references to various third party libraries used as dependencies in EE code.  This allows us to have one file containing all the various vendors we use so that it's cached in user's browsers longer.  EE specific js will then  be much smaller built files and can change more often without breaking the vendor caches.  Currently this vendor file contains a lot of third party code and at some point it will be broken out into smaller individual vendor files.

The following third party libraries are built into this file and exposed on the `eejs.vendor` global.

- `eejs.vendor.react`
- `eejs.vendor.reactDom`
- `eejs.vendor.moment`
- `eejs.vendor.classname`
- `eejs.vendor.lodash`
- `eejs.vendor.reactRedux`
- `eejs.vendor.redux`

## `eejs.i18n`

While WordPress has a `wpi18n` package, its stability is in question being that nothing has been worked out yet for its inclusion in core.  As a result (and to avoid potential conflicts when its introduced), we've decided to wrap it and expose it on our own `eejs.i18n` global. You can read more about our implementation in [this document](javascript-i18n.md)

## `eejs.exception`

This is a very basic custom Error exception class that our javascript uses whenever there is need to throw an exception.

## `eejs.helpers`

This property is a set of various "helper" or utility functions with various purposes.  Currently the following helpers are exposed on this property. This is made available on the `eejs` global when the `CoreAssetManager::JS_HANDLE_HELPERS` script handle is registered as a dependency for wp scripts.

| Helper | Description |
| ------- | ----------- |
| DATE_TIME_FORMAT_MYSQL | A format string used to represent the mysql date-time format |
| DATE_TIME_FORMAT_ISO8601 | A format string used to represent the ISO8601 date-time format.
| DATE_TIME_FORMAT_SITE | A format string used to represent whatever is the current set date and time format for the current WordPress site.
| DATE_FORMAT_SITE | Just the date format string for the site.
| TIME_FORMAT_SITE | Just the time format string for the site.
| formatDateString | A function that recieves `dateString`, `format` and `local` arguments and returns a string in the provided format. |
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
## `eejs.model`

This property exposes all the model javascript interfaces for EE models. This becomes available on the `eejs` global when the `CoreAssetManager::JS_HANDLE_MODEL` script handle is registered as a dependency for wp scripts.

| Property | Description |
| -------- | ----------- |
| DEFAULT_LISTS_STATE | An object representing the default state to be used by stores containing lists.
| DEFAULT_CORE_STATE | An object representing the default state to be used by the core store. |
| endpoints | An object containing all the exposed endpoints for rest requests (indexed by model name) |
| getEndpoint | A function for retrieving the endpoint for the given Model name. |
| applyQueryString | A function for applying a provided query string to the endpoint for a given model name and returning the entire string for use in a request.
| primaryKeys | An object containing a map of modelName to primary key for that model. |
| valuesForCombinedPrimaryKeys | A function that returns a string representation for the given keys from the provided entity.  This function would be used for models that have combined primary keys (delivered as an array)
| valueForPrimaryKey | A function that returns the value for the given key from the provided entity. This function would be used for models that have only one primary key.
| getPrimaryKey | A function that returns the primary key (or combined primary keys) from the available data for a given model name.
| getEntityPrimaryKeyValues | A memoized function that returns the values for the primary keys from the provided entity.
| keyEntitiesByPrimaryKeyValue | A function that receives an array of entities and returns a collection of those same entities indexed by the primary key value for each entity.
| assertEntityHasKey | A function that validates (throws an exception when not valid) whether the given key exists in the provided entity object. This is used when calling code wants an exception to be thrown.
| assertIsArray | A function that validates (throws an exception when not valid) whether the given value is an array
| assertIsNotEmpty | A function that validates (throws an exception when not valid) whether the given value is empty or not.  Call this validator when you want to make sure the provided value is NOT empty.
| MODEL_NAMES | An array of model names currently exposed by the site for REST API requests.
| QUERY_ORDER_ASC | A string, `ASC`
| QUERY_ORDER_DESC | A string, `DESC`
| ALLOWED_ORDER_VALUES | An array of allowed order values: `[ 'asc', 'desc', 'ASC', 'DESC' ]`
| GREATER_THAN | A string that represents the URI encoded greater than symbol.
| LESS_THAN | A string that represents the URI encoded less than symbol.
| GREATER_THAN_AND_EQUAL | A string that represents the URI encoded greater than and equal to symbol.
| LESS_THAN_AND_EQUAL | A string that represents the URI encoded less than and equal to symbol.
| getQueryString | A function that returns a query string for use by a REST request given a set of queryData.
| dateTimeModel | A module containing all model related interfaces for the DateTime model.
| eventModel | A module containing all model related interfaces for the Event model.
| registrationModel | A module containing all model related interfaces for the Registration model.
| statusModel | A module containing all model related interfaces for the Status model.
| ticketModel | A module containing all model related interfaces for the Ticket model.
| checkInModel | A module containing all model related interfaces for the Checkin model.

Note: The list of exposed models will be added to over time so the above list may be out of date. You can find all the models and their exposed interfaces [here](../../../assets/src/data/model/)
## `eejs.validators`
The following are various utility functions exposed directly on the `eejs` global.

### `isModelEntityFactory( factory )`
This is used for validating whether the given value represents a model entity factory object.
### `isModelEntityFactoryOfModel( factory, modelName )`
This is used for validating whether the given value represents a model entity factory for the given modelName.  **Note:** `modelName` is expected to be the lowercase, snakecase string for the model (eg. `'message_template'`).
### `isGenerator( object )`
This is used to validate whether the provided value is a generator or not.

**Example:**
```js
const generator = function* () { yield 1; yield 2; return 3 };
// returns false because this is the function not the 
// invoked generator instance
console.log( eejs.validators.isGenerator( generator ) );
// returns true because this is the invoked generator instance.
console.log( eejs.validators.isGenerator( generator() );
```
### `isModelEntity( value )`
This is used to validate whether the given value is a model entity.
### `isModelEntityOfModel( value, modelName )`
This is used to validate whether the given value is a model entity for the given model name.
### `isSchemaResponse( response )`
Returns whether the given value represents a schema response object from a schema REST API request.
### `isSchema( schema )`
Returns whether the given value is a the schema object property value from the schema response (so `schemaResponse.schema`).
### `isSchemaResponseOfModel( response, modelName )`
Returns whether the given value is a schema response object for the given model name.
### `isSchemaOfModel( schema , modelName )`
Returns whether the given value represents a schema object property value from the schema response for a specific model name.

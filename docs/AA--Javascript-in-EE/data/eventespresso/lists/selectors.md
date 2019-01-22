The following selectors are available on the object returned by `wp.data.select('eventespresso/lists')`.

## `getItems( identifier, queryString )`
Selector for retrieving an arbitrary array of items that have been added to the store for a given identifier and query string.

**Note:**  This selector has an accompanying resolver that is used to request the items from the server when the selector has not been resolved yet.

This returns an array of items.

### Arguments

|  Argument      | Type   | Description                                                                                                                |
| -------------- | ------ | -------------------------------------------------------------------------------------------------------------------------- |
|  `identifier`  | string | An arbitrary identifier for these items that was used in concert with the query string for caching the items on the store. |
|  `queryString` | string | The queryString that is used in the request for retrieving the items from the server.                                      |
### Example:
```js
const shoes = wp.data.select( 'eventespresso/lists' ).getItems( 'shoes', 'shoes/?size=xl' );
```

## `getEntities( modelName, queryString )`

Selector for retrieving an array of model entity instances for a given model name and query string.

**Note:**  This selector has an accompanying resolver that is used to request the items from the server when the selector has not been resolved yet.

This selector has automatically generated model specific equivalents that can be used: `getEvents`, `getDatetimes` etc.  When using a model specific equivalent you only need to pass along the `queryString` argument.

### Arguments:

| Argument      | Type   | Description                                                  |
| ------------- | ------ | ------------------------------------------------------------ |
| `modelName`   | string | The name of the model the entities you want belong to.       |
| `queryString` | string | The query string used in the request retrieving the entities |

### Example:
```js
const events = wp.data.select( 'eventespresso/lists' )
  .getEntities( 'event', '?where[TermRelationship.Term_Taxonomy.Term.slug]=minus-the-bear' );
```
### `isRequestingItems( identifier, queryString )`
Returns whether the items (true/false) for the given identifier and query string are being requested.  This is applicable when the initial selection has been made and it's result is being resolved via an api request.
#### Example:
```js
const itemsAreLoading = wp.data.select( 'eventespresso/lists' ).isRequestingItems( 'shoes', 'shoes/?size=xl' );
```
### `isRequestingEntities( modelName, queryString )`
Returns whether the model entities for the given model and query string are being requested.  This is applicable when this is the initial selection has been made and it's result is being resolved via an api request.
#### Example:
```js
const eventsAreLoading = wp.data.select( 'eventespresso/lists' ).isRequestingEntities( '?where[TermRelationship.Term_Taxonomy.Term.slug]=minus-the-bear' );
```
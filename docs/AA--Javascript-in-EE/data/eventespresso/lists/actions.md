The following set of dispatching action creators are available on the object returned by `wp.data.dispatch( 'eventespresso/lists' )`.

> **Note:** Typically, consuming code will not need to use these actions as they are mostly used internally by the registered resolvers for `eventespresso/lists`

## `receiveResponse( identifier, queryString, items = [] )`

Action creator for receiving an arbitrary array of objects for the given identifier and query string.

### Arguments

| Argument      | Type   | Description                                                                                              |
| ------------- | ------ | ---------------------------------------------------------------------------------------------------------|
| `identifier`  | string | An identifier for this collection.  Results (items) are stored in the state by identifier and queryString|
| `queryString` | string | The query string used to make the request resulting in the given set of items                            |
| `items`       | Array  | An array of items in the collection.                                                                     |

### Example

```js
wp.data.dispatch( 'eventespresso/lists' )
  .receiveResponse( 'shoes', 'shoes/?size=xl', shoesFromResponse );
```

## `receiveEntityResponse( modelName, queryString, entities = [] )`

Action creator for receiving an array of model entity instances for the given model and query string.  This action creator is thus more specific than the `receiveResponse` creator.  Note, the query string does not need to have the model portion of the endpoint in it.  That will automatically be handled by the store resolvers.

### Arguments:

| Argument      | Type   | Description                                                            |
| ------------- | ------ | ---------------------------------------------------------------------- |
| `modelName`   | string | The name of the model the provided entities belong to.                 |
| `queryString` | string | The query string used in the rest request for retrieving the entities. |
| `entities`    | Array  | An array of `BaseEntity` instances for storage in the state.           |


#### Example
```js
wp.data.dispatch( 'eventespresso/lists' ).receiveEntityResponse( 'event', '?where[TermRelationship.Term_Taxonomy.Term.slug]=minus-the-bear', eventsFromResponse );
```

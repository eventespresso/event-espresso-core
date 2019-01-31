The following set of dispatching action creators are available on the object returned by `wp.data.dispatch( 'eventespresso/schema' )`.

## `receiveSchemaForModel( modelName, schema = {} )`

Receives a schema for the given model and adds to state.

### Arguments:

| Argument    | Type   | Description                              |
| ----------- | ------ | ---------------------------------------- |
| `modelName` | string | The name of the model the schema is for. |
| `schema`    | Object | The schema for the model                 |

### Example
```js
wp.data.dispatch( 'eventespresso/schema' ).receiveSchemaForModel( 'event', eventSchema );
```

## `receiveFactoryForModel( modelName, factory = {} )`

Receives a `BaseEntity` factory for the given model and adds it to state.

### Arguments:

| Argument    | Type   | Description                              |
| ----------- | ------ | ---------------------------------------- |
| `modelName` | string | The name of the model the factory is for |
| `factory`   | Object | This should be a `BaseEntity` factory    |

### Example

```js
wp.data.dispatch( 'eventespresso/schema' ).receiveFactoryForModel( 'event', eventFactory );
```

## `receiveRelationEndpointForModelEntity( modelName, entityId, relationName, endpoint )`

Receives a relation endpoint for the given model, entity id and relation name.  This endpoint would be for retrieving relations for the given relation on that model (eg. `events/10/datetimes` ).  This is stored in state because it is not something that can be dynamically derived (it's retrieved from the schema exposed on a specific entity response).

### Arguments

| Argument    |  Type    | Description                                     |
| ----------- | -------- | ----------------------------------------------- |
| `modelName` |  string  | The name of the model the entity id belongs to. |
| `entityId`  |  string\|number | The id of the entity the relation belongs to.                                                 |
| `relationName`            | string          | The model name for the relation the endpoint is for                                                 |
| `endpoint`            | string          | The endpoint path for the relation.                                                 |

### Example:

```js
wp.data.dispatch( 'eventespresso/schema' )
  .receiveRelationEndpointForModelEntity( 'event', 10, 'datetimes', 'events/10/datetimes' );
```
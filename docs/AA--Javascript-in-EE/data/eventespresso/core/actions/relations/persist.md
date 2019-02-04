These are actions that result in queued relations being persisted to the database.

## `persistAddRelationsForModel( modelName )`

Triggers persisting any queued relation additions for the given model to the database.

This dispatch action has automatically generated model specific equivalents that can be used: `persistAddRelationsForEvent`, `persistAddRelationsForDatetime` etc.  When using a model specific equivalent you don't need to pass along any arguments.

This returns a promise that resolves to an object indexed by the originating entity id for the requested model and with values that are an object indexed by relation names with values of relation ids persisted.

**Note:**  If any of the entities in the relations being persisted are new, then those entities are first persisted to get their canonical id for use in the relation being persisted.

**Arguments:**

|Argument    | Type   | Description                                                  |
|----------- | ------ | ------------------------------------------------------------ |
|`modelName` | string | The name of the model for which relations will be persisted. |

**Example:**

```js
const persistedRelations = await wp.data.dispatch( 'eventespresso/core' ).persistAddRelationsForModel( 'event' );
```

## `persistDeleteRelationsForModel( modelName )`

Triggers persisting any queued relation deletions for the given model to the database.

This dispatch action has automatically generated model specific equivalents that can be used: `persistDeleteRelationsForEvent`, `persistDeleteRelationsForDatetime` etc.  When using a model specific equivalent you don't need to pass along any arguments.

This returns a promise that resolves to an object indexed by the originating entity id for the requested model and with values that are an object indexed by relation names with values of relation ids from relations deleted.

**Arguments:**

|Argument    | Type   | Description                                                           |
|----------- | ------ | --------------------------------------------------------------------- |
|`modelName` | string | The name of the model for which relations removals will be persisted. |

**Example:**

```js
const persistedRelationRemovals = await wp.data.dispatch( 'eventespresso/core' ).persistDeleteRelationsForModel( 'event' );
```

## `persistRelationsForEntityId( modelName, entityId, addRelation = true )`

Persists relations for the given model and entity id.  The type of relation persisted is determined by the `addRelation` argument.  If true, the any relations queued for adding are persisted, otherwise relations queued for removal are persisted.

This dispatch action has automatically generated model specific equivalents that can be used: `persistEventRelationsForId`, `persistDatetimeRelationsForId` etc.  When using a model specific equivalent you only need to provide the `entityId` and (optionally) `addRelation` arguments.

This returns a promise that resolves to an object indexed by relation names with the values an array of relation ids for each relation that was persisted.

**Note** if persisting add relations, any _new_ entities will be persisted first to get their canonical id for use in the relation being persisted.

**Arguments:**

|  Argument    | Type   | Description                                                          |
| ------------ | ------ | -------------------------------------------------------------------- |
|  `modelName` | string | The name of the model for which queued relations are being persisted |
|  `entityId`  | string\|number | The id of the entity for which queues relations are being persisted                                                                      |
| `addRelation` (optional)             | boolean        | True indicates that 'add' relations are being persisted, false means delete relations will be persisted.  Defaults to true.                                                                      |

**Example:**

```js
const persistedRelations = await wp.data.dispatch( 'eventespresso/core' ).persistRelationsForEntityId( 'event', 10 );
```

## `persistRelationsForEntityIdAndRelation( modelName, entityId, relationName, addRelation = true )`

Persists relations for the given model, entity id and relation.  The type of relation persisted is determined by the `addRelation` argument.  If true, the any relations queued for adding are persisted, otherwise relations queued for removal are persisted.

This dispatch action has automatically generated model specific equivalents that can be used: `persistEventRelationsForIdAndRelation`, `persistDatetimeRelationsForIdAndRelation` etc.  When using a model specific equivalent you only need to provide the `entityId`, `relationName`,  and (optionally) `addRelation` arguments.

This returns a promise that resolves to an array or relation ids persisted for the given relation.

**Note** if persisting add relations, any _new_ entities will be persisted first to get their canonical id for use in the relation being persisted.

**Arguments:**

|  Argument    | Type   | Description                                                          |
| ------------ | ------ | -------------------------------------------------------------------- |
|  `modelName` | string | The name of the model for which queued relations are being persisted |
|  `entityId`  | string\|number | The id of the entity for which queues relations are being persisted                                                                      |
| `relationName`             | string        | The name of the relation for which queued relations are being persisted                                                                      |
| `addRelation` (optional)             | boolean        | True indicates that 'add' relations are being persisted, false means delete relations will be persisted.  Defaults to true.                                                                      |

**Example:**

```js
const persistedRelations = await wp.data.dispatch( 'eventespresso/core' ).persistRelationsForEntityIdAndRelation( 'event', 10, 'datetime', false );
```

## `persistRelationsForEntityIdAndRelationId( modelName, entityId, relationName, relationId, addRelation = true )`

Persists relations for the given model, entity id, relation, and relation id.  The type of relation persisted is determined by the `addRelation` argument.  If true, the any relations queued for adding are persisted, otherwise relations queued for removal are persisted.

This dispatch action has automatically generated model specific equivalents that can be used: `persistEventRelationsForIdAndRelationId`, `persistDatetimeRelationsForIdAndRelationId` etc.  When using a model specific equivalent you only need to provide the `entityId`, `relationName`, `relationId`  and (optionally) `addRelation` arguments.

This returns a promise that resolves to either `0` which means the relation was not persisted or a positive integer representing the id of the relation persisted.

**Note** if persisting add relations, any _new_ entities will be persisted first to get their canonical id for use in the relation being persisted.

**Arguments:**

|  Argument    | Type   | Description                                                          |
| ------------ | ------ | -------------------------------------------------------------------- |
|  `modelName` | string | The name of the model for which queued relations are being persisted |
|  `entityId`  | string\|number | The id of the entity for which queues relations are being persisted                                                                      |
| `relationName`             | string        | The name of the relation for which queued relations are being persisted                                                                      |
| `relationId`             | string\|number        | The id of the relation for which queued relations are being persisted                                                                      |
| `addRelation` (optional)             | boolean        | True indicates that 'add' relations are being persisted, false means delete relations will be persisted.  Defaults to true.                                                                      |

**Example:**

```js
const persistedRelations = await wp.data.dispatch( 'eventespresso/core' ).persistRelationsForEntityIdAndRelationId( 'event', 10, 'datetime', 20 );
```